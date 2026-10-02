# Locomotion

This section explains how the TNY-360 turns a movement request into coordinated leg and motor movements.

The locomotion system works in layers. High-level code asks the body to move, the gait planner decides how the feet should move, the kinematics engine calculates joint angles, and the joints finally send those targets to the motors.

---

## The locomotion hierarchy

The main objects form a hierarchy that follows the physical structure of the robot:

```text
Body
├── Front-left Leg
│   ├── Hip roll Joint
│   ├── Hip pitch Joint
│   └── Knee pitch Joint
├── Back-left Leg
├── Back-right Leg
├── Front-right Leg
├── Left ear Joint
└── Right ear Joint
```

The body contains four legs and two additional joints for the ears. Each leg has three joints:

- **Hip roll:** moves the leg sideways;
- **Hip pitch:** moves the leg forwards or backwards;
- **Knee pitch:** folds or extends the leg.

The firmware identifies the legs in this order:

1. front left;
2. back left;
3. back right;
4. front right.

## From body commands to foot targets

A movement request is expressed at the body level. For example, a controller can ask the robot to move forwards, sideways, or rotate around its vertical axis.

The `DecisionLoop` receives this request and produces a control intent. The real-time locomotion pipeline then combines that intent with the current body posture, the gait planner, leg overrides, and joint overrides.

At this stage, the robot is still working with Cartesian positions: the desired position of each foot relative to the body.

::mermaid
```text
flowchart LR
    Command[Body velocity or posture command]
    Decision[DecisionLoop]
    Intent[Control intent]
    Gait[GaitPlanner]
    Feet[Target foot positions]
    IK[KinematicsEngine]
    Angles[Target joint angles]
    Joints[Joint objects]
    Motors[Motor controllers]

    Command --> Decision
    Decision --> Intent
    Intent --> Gait
    Gait --> Feet
    Feet --> IK
    IK --> Angles
    Angles --> Joints
    Joints --> Motors
```
::

## Gait planning

The `GaitPlanner` turns a body velocity into a periodic movement for the four feet. It tracks a main gait phase between `0` and `1`, then applies a phase offset to each leg.

Each leg alternates between two phases:

- **Swing:** the foot is in the air and moves towards its next position;
- **Stance:** the foot is on the ground and pushes against it while the body moves forward.

The planner uses a smooth trajectory during the swing phase. The step height controls how far the foot is lifted, while the stance depth controls how far it is pushed into the ground reference.

The main gait settings are:

| Setting | Meaning |
| --- | --- |
| Step frequency | Number of gait cycles per second. |
| Duty factor | Portion of the cycle spent in the stance phase. |
| Step height | Height of the foot during the swing phase. |
| Stance depth | Downward offset applied during the stance phase. |
| Leg spread | Default distance of the feet from the body center. |

### Available gait types

The current firmware defines three gait types:

- **Creep:** moves one leg at a time. It is the most stable gait and should normally use a duty factor above `0.75`, so that enough legs remain on the ground;
- **Walk:** uses an alternating diagonal pattern. The front-left and back-right legs share one phase, while the back-left and front-right legs share the other;
- **Run:** moves the front legs together and the back legs together.

The gait names and available options can evolve with the firmware. The current implementation does not define `Jump` as an active gait type.

::info-box{title="Gait timing and stability" type="warning"}
A lower duty factor keeps the feet in the air for more of the cycle and can make the robot less stable. In particular, the `Creep` gait expects a duty factor of at least `0.75`.
::

When the requested velocity is zero, the planner stops advancing the gait and returns the feet to their default positions.

## Kinematics: from feet to joints

The `KinematicsEngine` converts the desired Cartesian position of each foot into three joint angles. This is called **inverse kinematics**: instead of asking where the foot will be for known angles, the firmware calculates the angles required to reach a target foot position.

The calculation uses the physical geometry of the robot, including:

- the position of each hip relative to the body center;
- the offset between the hip and the leg;
- the thigh length;
- the calf length;
- the side on which the leg is mounted.

The engine first computes the inverse kinematics of each leg, then assembles the four results into a complete `BodyJointState`. If a target cannot be converted into a valid configuration, the control pipeline reports an error instead of producing a normal joint command.

```text
BodyCartesianState
    ├── body position
    ├── body rotation
    └── four target foot positions
             ↓
      KinematicsEngine
             ↓
BodyJointState
    ├── four sets of hip/knee angles
    └── ear joint angles
```

## The real-time control loop

The `ControlLoop` runs on **Core 1, the Reflex core**, at **200 Hz**. This deterministic loop is responsible for repeatedly reading the robot state, calculating the next command, and sending it to the hardware.

At each iteration, it performs the following operations:

1. read the latest control intent shared by the Brain core;
2. check the control-intent watchdog;
3. read analog inputs such as foot contact signals;
4. estimate the body and joint state using sensor feedback;
5. update the gait planner;
6. apply body, leg, and joint overrides;
7. apply temporary body stabilization;
8. compute inverse kinematics;
9. apply the resulting joint targets;
10. send the new motor values;
11. process pending low-level jobs.

::mermaid
```text
flowchart TB
    Intent[Control intent from Brain]
    Watchdog[Watchdog check]
    Sensors[Read analog inputs and IMU]
    Estimate[Estimate body, leg, and joint state]
    Gait[Update gait planner]
    Overrides[Apply body, leg, and joint overrides]
    Stabilization[Apply temporary stabilization]
    IK[Compute body inverse kinematics]
    Apply[Apply joint commands]
    Send[Send motor values]

    Intent --> Watchdog
    Watchdog --> Sensors
    Sensors --> Estimate
    Estimate --> Gait
    Gait --> Overrides
    Overrides --> Stabilization
    Stabilization --> IK
    IK --> Apply
    Apply --> Send
```
::

The separate `DecisionLoop` runs on **Core 0, the Brain core**, at **30 Hz**. It does not directly drive the motors. Instead, it prepares control intentions that the Reflex core consumes at the higher control frequency.

### Control-intent watchdog

The control loop checks the timestamp of the latest intent received from the Brain. If no fresh intent has been received for **500 ms**, the watchdog forces the requested body velocity to zero.

This provides a basic safety response if the Brain core becomes overloaded, stops responding, or loses the ability to update the shared control intent.

## Body and posture control

The locomotion pipeline does not only control horizontal walking. The body state also contains:

- a position offset, for example to stand higher or lower;
- a rotation around the roll, pitch, and yaw axes;
- the target position of each foot.

The control loop can combine these requests with stabilization feedback from the IMU. In the current implementation, a temporary roll and pitch stabilization step adjusts the body pose before inverse kinematics is calculated.

This means that the final position sent to the legs can differ from the original user request: the firmware may add a correction to help the robot remain balanced.

## Joints, feedback, and motor commands

Each `Joint` stores more than a target angle. It also tracks:

- the target angle requested by the control loop;
- the measured feedback angle;
- the model-predicted angle;
- an estimated angle combining feedback and prediction;
- the estimated uncertainty;
- the configured angle limits and velocity.

The joint uses this state to apply a command through its `MotorController`. The firmware can also enable or disable joints and clamp their maximum angular velocity.

The estimated position is intentionally different from raw feedback: the firmware combines sensor feedback and the joint model to obtain a more useful state estimate. This is important when feedback has latency or temporary noise.

## Overrides and control layers

The locomotion system supports overrides at several levels:

- **Body override:** replace or adjust the body position and rotation;
- **Leg override:** replace or adjust one leg's target foot position;
- **Joint override:** replace or adjust one joint's target angle.

An override can be:

- **Absolute:** replace the value produced by the normal pipeline;
- **Relative:** add an offset to the value produced by the normal pipeline;
- **None:** leave the normal pipeline untouched.

This layered approach is useful for animations, direct joint control, and higher-level behaviors, while keeping the normal gait and kinematics pipeline available underneath.

## Where to go next

- Read [Hardware abstraction](../hardware-abstraction) to understand how locomotion uses different IMU and motor hardware implementations.
- Read [Diagnostics and calibration](../diagnostics-and-calibration) to understand how joints and sensors are prepared before movement.
- Read the [Body API reference](../../../use-it/programming/api-ref/body) to control the robot at body level.
- Read the [Gait API reference](../../../use-it/programming/api-ref/gait) to configure gait behavior.
- Read the [Joint API reference](../../../use-it/programming/api-ref/joint) for lower-level joint commands.
