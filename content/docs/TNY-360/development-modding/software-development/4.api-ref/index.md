# API Reference

Welcome to the TNY-360 API Reference!

This section goes into the details of the TNY-360 API and how to use it with the different SDKs (Javascript, Python, C/C++, ...) to control your robot and unleash its full potential!

---

## API Structure

The TNY-360 API is structured in modules, and each module contains a set of actions.

A module represents one of the robot's subsystems, such as the motors, and each action represents a specific command that can be sent to this subsystem, such as setting the velocity of the motors.

::mermaid
```text
flowchart TD
	Module[Module]
	Action1[Action 1]
	Action2[Action 2]
	Action3[Action 3]
	Module --> Action1
	Module --> Action2
	Module --> Action3
```
::

### Using modules and actions in the SDKs

Each modules and actions are accessible in the same way accross all the SDKs. For example, to set the velocity of one motor, you would use the `motor` module and the `setVelocity` action, like this:

```js [javascript]
robot.motor.setVelocity(...);
```
```py [python]
robot.motor.set_velocity(...);
```
```cpp [C++]
robot.motor.set_velocity(...);
```

## Overview

The TNY-360 API has quite a few modules. Here's a complete list of the modules :

| Module                             | Description                                                                                |
| ---------------------------------- | ------------------------------------------------------------------------------------------ |
| [**System**](./system)             | System-level actions, such as rebooting the robot, getting basic status info, etc.         |
| [**Protocol**](./protocol)         | Actions related to the network protocol, such as data stream frequency, etc.               |
| [**Gait**](./gait)                 | Gait control actions, such as setting gait type, frequency, etc.                           |
| [**Body**](./body)                 | Body related actions, such as setting body velocity or posture.                            |
| [**Leg**](./leg)                   | Leg control actions, such as setting leg positions, enabling or disabling the legs, etc.   |
| [**Joint**](./joint)               | Joint control actions, such as setting joint angles, getting joint states, etc.            |
| [**Motor**](./motor)               | Motor control actions, such as triggering motor calibration, sending raw duty cycles, etc. |
| [**Imu**](./imu)                   | IMU related actions, such as getting the current orientation or acceleration of the robot. |
| Laser *(not yet implemented)*      | Laser related actions, such as getting the distance to a front object.                     |
| [**Power**](./power)               | Power management actions, such as getting battery status or controlling power consumption. |
| Face *(not yet implemented)*       | Face recognition and display actions.                                                      |
| Camera *(not yet implemented)*     | Camera control actions, such as capturing images or recording video.                       |
| Speaker *(not yet implemented)*    | Audio playback actions, such as playing sounds or music.                                   |
| Microphone *(not yet implemented)* | Audio recording actions, such as capturing voice input.                                    |
| [**I2C**](./i2c)                   | I2C communication actions, such as reading from or writing to I2C devices.                 |
| [**ADC**](./adc)                   | ADC (Analog-to-Digital Conversion) actions, such as reading analog sensor values.          |
| [**Wi-Fi**](./wifi)                | Wi-Fi network actions, such as connecting to a network or retrieving network information.  |
