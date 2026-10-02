# Diagnostics and calibration

Diagnostics and calibration are the robot's body-awareness mechanisms. Diagnostics asks whether the robot is healthy enough to operate; calibration measures how the physical robot differs from its ideal model.

This section complements the user-facing [Getting Started](../../../use-it/get-started) guide. That guide explains what to do; this page explains what the firmware is trying to establish internally.

---

## Diagnostics before normal operation

The firmware can enter a dedicated diagnostic path during boot or from the user interface. This is useful when startup should not immediately enable normal locomotion.

A diagnostic sequence can verify:

- whether required buses and peripherals initialize;
- whether the selected screen and IMU respond;
- whether motor feedback is available;
- whether sensors produce plausible values;
- whether the configuration matches the detected robot revision;
- whether the body can move through a safe test sequence.

::mermaid
```text
flowchart TD
    Boot[Boot or diagnostic request]
    Config[Load configuration]
    Hardware[Check buses and devices]
    Feedback[Check motor and sensor feedback]
    Decision{Checks passed?}
    Normal[Allow normal operation]
    Error[Show error and keep robot safe]

    Boot --> Config --> Hardware --> Feedback --> Decision
    Decision -->|yes| Normal
    Decision -->|no| Error
```
::

Diagnostics should fail visibly. A missing device must not be represented as a healthy zero value, because that could allow later code to command a body whose state is unknown.

## Calibration versus diagnosis

These two operations are related but different:

| Operation | Question |
| --- | --- |
| Diagnosis | Is the component responding and is the state plausible? |
| Calibration | What correction or physical parameter is needed for accurate control? |

Calibration is therefore not a substitute for checking hardware health. A disconnected motor cannot be calibrated successfully, and an IMU with invalid readings should not be used to compute a correction.

## Locomotion calibration

The locomotion calibration tools measure properties needed by the joint and motor control layers. The current firmware includes calibration paths for:

- feedback inversion;
- feedback deadband size;
- feedback latency;
- physical joint bounds.

These measurements help the controller relate a command to the actual motor response. The resulting values can then be used by the joint and motor-controller code instead of relying only on nominal hardware assumptions.

The calibration flow should keep the robot in a controlled posture and apply only the movement required for the current measurement:

::mermaid
```text
flowchart LR
    Prepare[Safe posture and checks]
    Measure[Apply controlled test]
    Observe[Read motor feedback]
    Calculate[Calculate correction]
    Store[Store calibration data]
    Reboot[Reload active configuration]

    Prepare --> Measure --> Observe --> Calculate --> Store --> Reboot
```
::

Calibration can affect physical movement. Keep the robot supported as recommended by the user-facing procedure and stop the process if a joint behaves unexpectedly.

## IMU and sensor calibration

The IMU layer corrects gyro bias and combines gyroscope and accelerometer information to estimate orientation. A stable initial posture is important because the estimator needs a reliable reference before stabilization can be trusted.

The diagnostics system should distinguish between:

- a sensor that is present but needs calibration;
- a sensor that returns implausible values;
- a sensor that cannot be reached at all.

Those cases require different user actions. Re-running calibration will not fix an incorrect I2C address, wiring problem, or wrong runtime sensor type.

## Persistent calibration data

Calibration values are configuration data rather than firmware code. They must be stored and loaded in a controlled way so that a firmware update does not accidentally erase the physical measurements needed by the robot.

The runtime hardware configuration is stored in `/userdata/settings.json`, with a backup at `/userdata/settings.json.bak`. Calibration data should follow the same principle of explicit persistence and validation. If a value is missing or invalid, the firmware should use a known default or block the affected operation rather than silently treating an unknown measurement as zero.

See [Hardware abstraction](../hardware-abstraction) and [Memory, partitions, and updates](../memory-partitions-and-updates) for the configuration and storage layers.

## Failure recovery

When a diagnostic check fails, the safest response depends on the component:

| Failure | Appropriate direction |
| --- | --- |
| Display unavailable | Preserve logs and expose the error through LED/network where possible |
| IMU unavailable or invalid | Prevent stabilization-dependent movement |
| Motor feedback invalid | Do not enable the affected joint normally |
| Network unavailable | Keep local controls and diagnostics available |
| Invalid configuration | Restore defaults or request correction and reboot |

The exact recovery path is subsystem-specific, but the principle is common: report the failure, reduce the robot's capabilities, and avoid continuing with an unverified body state.

## Diagnostics as robot awareness

Diagnostics and calibration are the foundation for future safeguards and autonomous behaviors. A robot cannot reliably decide that it is falling, blocked, or out of bounds unless its sensors and actuators have first been characterized.

The long-term relationship is:

```text
Diagnostics → trustworthy state
Calibration  → accurate body model
Safeguards   → safe reaction
Autonomy     → higher-level behavior
```

For the future autonomy model, see [Auto-life and robot awareness](../auto-life-and-robot-awareness). For the user procedure, see [Getting Started](../../../use-it/get-started).
