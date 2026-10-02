# Firmware overview

The firmware is the software running inside your TNY-360. It connects the robot's electronics, movement system, sensors, interface, and network features together.

This page gives you a map of the firmware before we look at each part in more detail.

---

## A firmware made of cooperating subsystems

The firmware is not one large program that directly controls every component. It is divided into subsystems, each with a specific responsibility:

- **Locomotion** controls the body, legs, joints, kinematics, and motors;
- **Networking** connects the robot to the Web Portal, SDKs, and remote controllers;
- **User interface** manages the screen, buttons, menus, LEDs, and audio;
- **Hardware abstraction and drivers** provide a consistent way to use different hardware revisions;
- **Decision logic** interprets commands and applies safeguards or automatic behaviors;
- **Diagnostics and calibration** check the robot and prepare it for reliable movement.

The `Robot` class acts as the main orchestrator. It owns the main managers and loops, initializes them in the right order, and starts or stops the robot as a whole.

::mermaid
```text
flowchart TB
    Robot[Robot orchestrator]
    Brain[Core 0 - Brain]
    Reflex[Core 1 - Reflex]
    Network[Network manager]
    UI[UI manager]
    Audio[Audio manager]
    Decision[Decision loop]
    Control[Control loop]
    Body[Body and locomotion]
    Drivers[Hardware drivers]
    Hardware[Robot hardware]

    Robot --> Brain
    Robot --> Reflex
    Brain --> Network
    Brain --> UI
    Brain --> Audio
    Brain --> Decision
    Decision --> Control
    Reflex --> Control
    Control --> Body
    Body --> Drivers
    Drivers --> Hardware
```
::

## The Brain and the Reflex

The ESP32-S3 has two cores. The firmware uses them for two different kinds of work:

### Core 0 - Brain

The **Brain** handles tasks that are important but do not need to run at the strictest possible timing:

- Wi-Fi and WebSocket communication;
- the embedded web server;
- the Web Portal;
- menus, buttons, and audio;
- high-level decisions in the `DecisionLoop`;
- commands received from SDKs or controllers.

### Core 1 - Reflex

The **Reflex** handles the real-time movement system:

- the high-frequency `ControlLoop`;
- kinematics calculations;
- coordination of the legs and joints;
- communication with the motor drivers;
- applying the final control intent to the hardware.

This separation prevents a network request, a menu refresh, or an audio task from delaying the control loop responsible for keeping the robot stable.

The two sides exchange structured state and control information rather than directly manipulating each other's internal data.

::info-box{title="Core assignment" type="info"}
In the current firmware, **Core 0 is the Brain** and **Core 1 is the Reflex**. Keep this distinction in mind when reading task names and the firmware configuration.
::

## The robot lifecycle

The firmware follows a simple lifecycle:

```text
Boot
  ↓
Special boot check
  ↓
Initialization
  ↓
Start Brain and Reflex loops
  ↓
Stabilization delay
  ↓
Operational robot
```

### 1. Boot

The ESP32-S3 starts the firmware and enters `app_main()`, the firmware entry point.

Before starting the normal robot, the firmware checks whether a special boot mode has been requested. This can be used for operations such as diagnostics or update-related states.

If a special boot state is detected, the normal startup sequence is not launched.

### 2. Initialization

The `Robot` orchestrator initializes the main subsystems in sequence:

1. load the robot settings;
2. initialize the status LED;
3. initialize and start the network manager;
4. initialize the on-device user interface;
5. initialize the audio manager;
6. initialize the body and locomotion system;
7. initialize the `DecisionLoop`;
8. initialize the `ControlLoop`.

The network manager is started early so that the robot can remain reachable for investigation if a later initialization step fails.

During initialization, the status LED indicates that the robot is not operational yet.

### 3. Starting the control system

Once every subsystem has been initialized, the firmware prepares a default safe standing state:

- the requested body position is set to the default height;
- the requested body rotation is cleared;
- the requested body velocity is set to zero.

The `DecisionLoop` and `ControlLoop` are then started. The firmware waits briefly for hardware feedback and sensors to stabilize before declaring the robot operational.

When startup succeeds, the status LED changes to green and the normal robot interface is displayed.

### 4. Stopping and deinitializing

When the robot has to stop, the control loop is stopped before the decision loop. During deinitialization, the loops, locomotion, network, audio, interface, and settings systems are then released in an explicit shutdown sequence.

## From a command to a movement

A command can come from the Web Portal, an SDK, a block program, or another controller. It is first interpreted as a high-level intention, such as a body velocity or a target joint angle.

The decision system can accept, modify, or reject this intention depending on its current state and configured safeguards. The resulting control intent is then sent to the real-time control system.

::mermaid
```text
flowchart LR
    Source[Web Portal / SDK / Block code / Controller]
    Network[Network or input manager]
    Decision[DecisionLoop]
    Intent[Control intent]
    Control[ControlLoop]
    Kinematics[Kinematics]
    Joints[Joints and motor targets]
    Drivers[Motor drivers]

    Source --> Network
    Network --> Decision
    Decision --> Intent
    Intent --> Control
    Control --> Kinematics
    Kinematics --> Joints
    Joints --> Drivers
```
::

The important distinction is that a user request is not necessarily sent directly to a motor. The firmware has an opportunity to apply safety rules, convert coordinate systems, calculate the necessary joint angles, and keep all four legs coordinated.

## Where to go next

- Read [How the robot moves](../locomotion) to understand the `Body`, `Leg`, `Joint`, kinematics, and control loop.
- Read [Hardware abstraction](../hardware-abstraction) to understand how the firmware supports different hardware revisions.
- Read [Networking and communication](../networking) to follow commands from a remote client.
- Read [Diagnostics and calibration](../diagnostics-and-calibration) to understand how the robot checks and prepares itself.
