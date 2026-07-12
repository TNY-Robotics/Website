# Error System

The TNY-360 robot has an advanced error handling and diagnostic system which allows it to detect and report various issues that may arise during operation.

This system is designed to help users quickly identify and resolve problems, ensuring that the robot continues to function optimally.

---

## Where to find the errors

Depending on the severity of the error, the TNY-360 robot may or may not report the errors directly to the user (using its screen).

If you want to get a complete list of all the errors that have occurred, you can use the [Error module](../../development-modding/software-development/api-ref/error) of the TNY-360 API.

## Error structure

The errors are structured in a way that allows for easy identification and categorization. Each error has the following attributes:

- **Module ID**: This is a unique identifier for the module where the error occurred.<br>
    *Examples of module IDs include `System`, `Motor`, `LED`, etc.*
- **Subsystem ID**: This is a unique identifier for the specific subsystem within a module.<br>
    *Examples of subsystem IDs include `Initialization`, `Calibration`, `Runtime`, etc.*
- **Error Code**: This is a unique identifier for the specific error that occurred withing the module and subsystem.<br>
    *Examples of error codes include `MemoryError`, `MotorOverload`, etc.*
- **Category**: This is a classification of the error based on its severity and impact on the robot's operation.<br>
    *Examples of categories include `Critical`, `Error`, `Warning`, `Trace`, etc.*

Each error also has custom data associated with it, which is available under the `payload` attribute.
This data provides additional context about the error, such as the specific parameters or conditions that led to the error occurring.

## Error Codes List

As we said above, the TNY-360 robot classifies errors into different categories. Here's the list :


| Module                                    | Description                                                                                    |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------- |
| [**System**](./system)                    | Errors accuring in the management of the robot, such as memory issues, firmware problems, etc. |
| Protocol *(nothing here yet)*             | Errors related to communication protocols and data exchange with external systems.             |
| Gait *(nothing here yet)*                 | Gait control actions, such as setting gait type, frequency, etc.                               |
| Body *(nothing here yet)*                 | Body related actions, such as setting body velocity or posture.                                |
| Leg *(nothing here yet)*                  | Leg control actions, such as setting leg positions, enabling or disabling the legs, etc.       |
| Joint *(nothing here yet)*                | Joint control actions, such as setting joint angles, getting joint states, etc.                |
| [**Motor Driver**](./motordriver)         | Motor driver actions, such as sending PWM signals, enabling or disabling the motors, etc.      |
| [**Motor Controller**](./motorcontroller) | Motor controller actions, such as triggering motor calibration, sending raw duty cycles, etc.  |
| [**IMU**](./imu)                          | IMU related actions, such as getting the current orientation or acceleration of the robot.     |
| Laser *(nothing here yet)*                | Laser related actions, such as getting the distance to a front object.                         |
| [**Power**](./power)                      | Power management actions, such as getting battery status or controlling power consumption.     |
| Face *(nothing here yet)*                 | Face recognition and display actions.                                                          |
| [**Camera**](./camera)                    | Camera control actions, such as capturing images or recording video.                           |
| Speaker *(nothing here yet)*              | Audio playback actions, such as playing sounds or music.                                       |
| Microphone *(nothing here yet)*           | Audio recording actions, such as capturing voice input.                                        |
| I2C *(nothing here yet)*                  | I2C communication actions, such as reading from or writing to I2C devices.                     |
| [**ADC**](./adc)                          | ADC (Analog-to-Digital Conversion) actions, such as reading analog sensor values.              |
| Wi-Fi *(nothing here yet)*                | Wi-Fi network actions, such as connecting to a network or retrieving network information.      |
| Bluetooth *(nothing here yet)*            | Bluetooth communication actions, such as pairing with devices or transferring data.            |
| [**LED**](./led)                          | LED control actions, such as setting LED colors or brightness.                                 |
| [**Screen**](./screen)                    | Screen control actions, such as displaying information or images.                              |
| Error *(nothing here yet)*                | Error handling actions, such as retrieving error codes or clearing errors.                     |