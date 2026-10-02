# Hardware drivers

Hardware drivers are the part of the firmware that knows how to communicate with a specific physical component.

The rest of the robot should not need to know whether an IMU is an MPU6050 or an LSM6DS3, or whether a screen is an SH1106 or an SSD1309. That separation is provided by the [hardware abstraction layer](../hardware-abstraction). This page focuses on the concrete drivers behind those interfaces and on the low-level devices that do not have several interchangeable implementations.

---

## From a firmware object to an electronic component

A driver usually performs four jobs:

1. configure the ESP32 peripheral, GPIOs, or communication bus;
2. initialize the external component;
3. translate hardware data into firmware types;
4. expose errors and status when the component cannot be used.

The relationship between the layers is:

::mermaid
```text
flowchart LR
    Subsystem[High-level subsystem]
    Interface[Abstract interface]
    Driver[Concrete driver]
    Bus[ESP32 peripheral or bus]
    Device[Physical component]

    Subsystem --> Interface
    Interface --> Driver
    Driver --> Bus
    Bus --> Device
```
::

For components with multiple supported models, the interface and driver are separate classes. For components that are specific to the robot electronics, the subsystem can use a dedicated driver directly.

## Display drivers

The display interface is defined by `Screen`. The current implementations are:

| Firmware class | Controller | Role |
| --- | --- | --- |
| `ScreenSH` | SH1106 | V1 screen |
| `ScreenSSD` | SSD1309 | V2 screen |

The driver owns the controller-specific initialization commands and the transfer of the display buffer over I2C. The menu and face code only draws pixels into the common buffer and asks the selected screen to upload it.

This keeps details such as addressing mode, controller commands, and buffer layout out of the user-interface code. See [Hardware abstraction](../hardware-abstraction) for the selection mechanism.

## IMU drivers

The IMU implementations provide the raw sensor readings required by the shared `IMU` estimator:

| Firmware class | Sensor | Robot revision |
| --- | --- | --- |
| `IMUMPU` | MPU6050 | V1 |
| `IMULSM` | LSM6DS3 | V2 |

An IMU driver is responsible for sensor-specific register access, startup configuration, and reading acceleration and angular velocity. Bias correction, quaternion integration, accelerometer correction, and the down vector are handled by the common IMU layer.

This division is important for locomotion: stabilization and state estimation can consume the same orientation API even when the underlying sensor changes.

## Motor and power drivers

The motor path is more direct because the motor electronics are part of the robot's actuation system:

```text
Body and joints
    ↓
ControlLoop
    ↓
MotorController
    ↓
MotorDriver
    ↓
PWM and feedback electronics
    ↓
Servo motors
```

`MotorController` turns joint targets into commands for individual motors. `MotorDriver` handles the low-level output and feedback channels, while the control loop remains responsible for timing, limits, watchdog behavior, and stabilization.

The power driver exposes measurements and power-related state to the firmware. It is used by higher-level code to report battery information and to apply safety decisions without making the user interface responsible for ADC or GPIO details.

## Camera and analog drivers

The camera driver converts the runtime camera pinout into the configuration expected by the ESP32 camera peripheral. Because the camera wiring differs between robot revisions, the GPIO mapping is part of `RobotConfig`.

The analog driver handles the GPIOs used to select an analog channel and reads the resulting value. The application asks for a logical channel; the driver deals with the multiplexer selection pins and ADC access.

This is another example of the abstraction boundary:

| Caller knows | Driver knows |
| --- | --- |
| “Read the battery or sensor channel” | Which multiplexer pins to toggle |
| “Start the camera” | Which GPIO is connected to each camera signal |
| “Send a motor command” | Which PWM and feedback channel implements it |

## Audio, LED, and common peripherals

Audio has several concrete paths in the current firmware:

- PDM or I2S speakers;
- I2S or PDM microphones;
- a shared audio manager and sound providers above those drivers.

The audio manager mixes or schedules sound providers, while the selected speaker or microphone implementation configures the corresponding ESP32 peripheral. This lets menus and behaviors request audio without embedding I2S or PDM setup code.

The LED driver is intentionally small, but it is used throughout the lifecycle to provide immediate status feedback: startup, errors, diagnostic mode, and successful initialization.

## Initialization and failure handling

Drivers are initialized as part of the robot startup sequence, after settings have selected the appropriate pinout and device types. A typical initialization path is:

::mermaid
```text
flowchart TD
    Start[Robot initialization]
    Settings[Load RobotConfig]
    Buses[Initialize buses and peripherals]
    Drivers[Create and initialize drivers]
    Check{All required devices ready?}
    Ready[Start normal operation]
    Diagnostic[Keep error visible and enter diagnostic path]

    Start --> Settings --> Buses --> Drivers --> Check
    Check -->|yes| Ready
    Check -->|no| Diagnostic
```
::

A driver failure must remain visible to the caller. The firmware can then stop startup, show an error, or enter a diagnostic flow instead of pretending that a missing sensor or motor is working.

## Adding a new hardware component

For a component with several compatible implementations, the usual sequence is:

1. add the shared operations to the abstract interface;
2. implement the hardware-specific initialization and I/O;
3. add a configuration type if the choice must be made at runtime;
4. update the factory or selection logic;
5. initialize and validate the new driver in the relevant subsystem.

The goal is not to hide meaningful hardware differences. It is to keep those differences at the boundary so that locomotion, menus, networking, and other high-level systems remain stable.

For the runtime configuration model, see [Hardware abstraction](../hardware-abstraction). For the systems that consume driver data, see [Locomotion](../locomotion) and [Diagnostics and calibration](../diagnostics-and-calibration).
