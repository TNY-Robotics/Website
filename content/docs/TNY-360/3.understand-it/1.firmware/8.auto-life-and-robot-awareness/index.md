# Auto-life and robot awareness

The TNY-360 is being designed to do more than execute isolated commands. It should be able to observe its state, protect itself, and choose an appropriate behavior level.

This section describes the direction of that system. Some of the concepts already have architectural support, while others are still being implemented.

---

::info-box{title="Work in progress" type="experimental"}
The autonomy levels and behaviors described here are not all fully implemented or exposed to users yet. Names, safeguards, and configuration options may evolve.
::

## The DecisionLoop

The `DecisionLoop` runs on the Brain side of the firmware. It operates above the real-time control loop:

- the **DecisionLoop** decides what the robot should try to do;
- the **ControlLoop** decides how to make the body achieve the current intent safely.

This separation allows high-level behaviors to change posture, gait, or mode without putting planning logic inside the 200 Hz reflex path.

::mermaid
```text
flowchart TB
    Sensors[Body and sensor state]
    Decision[DecisionLoop]
    Intent[Movement or behavior intent]
    Control[ControlLoop]
    Actuators[Motors and body]

    Sensors --> Decision
    Decision --> Intent
    Intent --> Control
    Control --> Actuators
    Actuators --> Sensors
```
::

## Configurable levels of autonomy

The planned auto-life model uses levels so that users can decide how much initiative the robot is allowed to take:

| Level | Intended behavior |
| --- | --- |
| `Off` | Execute explicit commands without autonomous behavior |
| `Safeguard` | Apply protective reactions and prevent unsafe states |
| `Animate` | Allow predefined animations and expressive behavior |
| `Full` | Allow the complete set of planned autonomous behaviors |

These names describe the intended policy, not a promise that every behavior is already available in the current release.

## Safeguards

Safeguards are the robot's body-awareness layer. They should be able to recognize conditions such as:

- a fall or an unstable posture;
- a command that would exceed a joint or body limit;
- a loss of communication or stale movement intent;
- an unexpected sensor or motor state;
- a collision risk or blocked movement.

Possible reactions include stopping motion, lowering the body, avoiding a commanded direction, or attempting a self-righting sequence. A safeguard must have priority over an expressive behavior: a robot should abandon an animation if the body becomes unsafe.

::mermaid
```text
flowchart TD
    Behavior[Requested behavior]
    State[Observed body state]
    Safe{Safe to continue?}
    Execute[Continue behavior]
    Protect[Safeguard reaction]
    Stop[Stop or neutralize intent]

    Behavior --> Safe
    State --> Safe
    Safe -->|yes| Execute
    Safe -->|no| Protect --> Stop
```
::

## Autonomy and locomotion

Autonomous behavior should use the same body, gait, and joint abstractions as teleoperation. It should not bypass the locomotion pipeline by writing motor values directly.

For example, a wandering behavior could select a velocity and gait, while the gait planner, kinematics engine, joint limits, stabilization, and watchdog continue to protect the body:

```text
Autonomous behavior
    ↓
DecisionLoop intent
    ↓
Gait planner and inverse kinematics
    ↓
ControlLoop safeguards
    ↓
Motors
```

This makes autonomous behavior another command source rather than a second motor-control implementation.

## Future behaviors

The architecture is intended to support behaviors such as:

- idle animations and expressive reactions;
- automatic posture changes;
- wandering or exploration;
- automatic gait selection;
- fall avoidance and self-righting;
- collision-aware movement.

Each behavior should declare what it needs from the robot and what safety conditions can interrupt it. This is especially important for behaviors that keep running without continuous user input.

## A configurable “level of intelligence”

The auto-life setting is best understood as a permission boundary. A lower level can keep the robot predictable for development or teleoperation; a higher level can enable more reactive and autonomous behavior.

The final system should make the active level visible locally and remotely, and should provide a reliable way to return to a less autonomous mode. Autonomy must remain observable and interruptible.

For the mechanisms that detect faults and calibrate the body, see [Diagnostics and calibration](../diagnostics-and-calibration). For the real-time movement pipeline, see [Locomotion](../locomotion).
