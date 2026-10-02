# API Reference

Welcome to the TNY-360 API Reference!

This section documents the commands and data types available to control your TNY-360 from the different SDKs (JavaScript, Python, C/C++, ...).

The API is the common language shared by the robot firmware and these SDKs. Once you understand how the API is organized, you can move between languages without having to learn a completely different control model.

---

## How the API works

The API is organized into **modules**, and each module contains a set of **actions**.

A module represents one of the robot's subsystems, such as the body, motors, or IMU. An action is a specific command or request handled by that subsystem.

::mermaid
```text
flowchart LR
    Robot[TNY-360]
    Body[Body module]
    Velocity[setVelocity action]
    Status[getEnabled action]
    IMU[IMU module]
    Orientation[getOrientation action]
    Robot --> Body
    Robot --> IMU
    Body --> Velocity
    Body --> Status
    IMU --> Orientation
```
::

## Modules and actions in the SDKs

The same API concepts are exposed in each SDK, but the naming follows the conventions of the target language:

```js [javascript]
await robot.body.setVelocity(0.4, 0.0, 0.0);
```

```py [python]
await robot.body.set_velocity(0.4, 0.0, 0.0)
```

```cpp [C++]
robot.body.setVelocity(0.4f, 0.0f, 0.0f);
```

In this example, the three values represent the target body velocity along the X axis, along the Y axis, and around the Z axis. The exact asynchronous syntax may vary depending on the SDK.

> `setVelocity` controls the body, not an individual motor. Low-level motor commands are available in the [Motor](./motor) module, but should be used carefully because they bypass part of the robot's normal locomotion control.

### Naming conventions

| Concept | JavaScript / TypeScript | Python |
| --- | --- | --- |
| Module | `robot.body` | `robot.body` |
| Action | `setVelocity()` | `set_velocity()` |
| Type names | `BodyVelocity` | `BodyVelocity` |

The API reference uses the protocol and JavaScript names for actions. The Python page for each module shows the corresponding `snake_case` name when it differs.

### Asynchronous actions

Most actions communicate with the robot and therefore return asynchronously:

- in JavaScript, use `await` or handle the returned `Promise`;
- in Python, use `await` inside an `asyncio` event loop;
- in C++, use the asynchronous mechanism provided by the SDK.

Always connect to the robot before calling module actions and disconnect cleanly when your program is finished. See the [Python SDK](../1.python) and [JavaScript SDK](../2.javascript) guides for complete connection examples.

### Arguments, results, and errors

Each action page documents:

- its arguments and their types;
- the result returned by the robot, when there is one;
- possible error or response statuses;
- the module and action identifiers used by the binary protocol.

An action completing its network request does not necessarily mean that the robot accepted every requested value. Check the returned status and validate the result of actions that return data.

## API modules

The following table lists the modules currently exposed by the API reference. Open a module to see its actions and types.

| Module | Protocol ID | Description |
| --- | ---: | --- |
| [**System**](./system) | `0x00` | System actions such as pinging, rebooting, and managing robot-level state. |
| [**Protocol**](./protocol) | `0x01` | Communication settings such as stream frequency and stream flags. |
| [**Gait**](./gait) | `0x02` | Gait type and gait timing. |
| [**Body**](./body) | `0x03` | Body velocity, posture, and body-level control. |
| [**Leg**](./leg) | `0x04` | Leg positions and leg-level control. |
| [**Joint**](./joint) | `0x05` | Joint angles, states, and joint-level control. |
| [**Motor**](./motor) | `0x06` | Motor duty cycles, calibration state, and low-level motor control. |
| [**Imu**](./imu) | `0x07` | Orientation, acceleration, and inertial measurements. |
| [**Power**](./power) | `0x09` | Battery voltage, current, and power information. |
| [**Face**](./face) | `0x0B` | Facial expressions and animations. |
| [**I2C**](./i2c) | `0x0E` | Communication with devices connected to the I2C bus. |
| [**ADC**](./adc) | `0x0F` | Analog-to-digital conversion and analog readings. |
| [**Wi-Fi**](./wifi) | `0x10` | Wi-Fi configuration and network information. |
| [**Bluetooth**](./bluetooth) | `0x11` | Bluetooth communication and controller support. |
| [**LED**](./led) | `0x12` | Status and auxiliary LED control. |
| [**Error**](./error) | `0x13` | Error information and error handling. |
| [**Diagnostic**](./diagnostic) | `0x14` | Diagnostic checks and component health monitoring. |

The API reference also contains pages for [Laser](./laser), [Camera](./camera), [Speaker](./speaker), and [Microphone](./microphone). Their availability can depend on the installed hardware and the firmware version.

::info-box{type="warning" title="Hardware and firmware availability"}
Not every module is available on every TNY-360 revision or firmware build. A module page documents the API surface, but the connected robot may still report that a feature is unavailable or unsupported.
::

## Where to go next

- Use the [Python SDK](../1.python) if you want to control the robot from Python.
- Use the [JavaScript SDK](../2.javascript) if you want to build a web or Node.js application.
- Open a module above when you already know which part of the robot you want to control.
