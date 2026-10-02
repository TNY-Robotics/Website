# Hardware abstraction

The TNY-360 firmware can support different hardware revisions through a configurable abstraction layer.

The goal is to let the rest of the firmware work with a **capability** rather than with one specific electronic component. For example, the user interface asks for a screen buffer to be displayed, but it does not need to know whether the robot contains an SH1106 or an SSD1309 display.

---

## Why use an abstraction layer?

The TNY-360 exists in more than one hardware revision. The V1 and V2 do not use exactly the same screen, IMU, I2C pinout, audio hardware, or camera wiring.

Without an abstraction layer, every subsystem using one of these components would need to contain hardware-specific checks:

```text
if V1:
    use MPU6050
else if V2:
    use LSM6DS3
```

With an abstraction layer, the high-level code uses one common interface:

```text
IMU interface
    ├── MPU6050 implementation
    └── LSM6DS3 implementation
```

The locomotion system can therefore ask the IMU for its orientation without knowing which sensor produced it. The same principle applies to screens, audio devices, and other configurable peripherals.

## Three layers of hardware support

The firmware separates hardware support into three layers:

1. **Configuration** describes which hardware is present and which pins or buses it uses;
2. **Abstraction** defines the common operations expected by the rest of the firmware;
3. **Implementation or driver** communicates with the concrete physical component.

::mermaid
```text
flowchart TB
    Settings[settings.json]
    Config[RobotConfig]
    Interface[Abstract interface]
    Factory[Selection logic]
    ImplementationV1[V1 implementation]
    ImplementationV2[V2 implementation]
    Hardware[Physical component]

    Settings --> Config
    Config --> Factory
    Factory --> Interface
    Interface --> ImplementationV1
    Interface --> ImplementationV2
    ImplementationV1 --> Hardware
    ImplementationV2 --> Hardware
```
::

The application code depends on the interface. Only the selected implementation depends directly on the concrete hardware driver.

## Hardware configuration at runtime

The `RobotConfig` structure contains the configuration used by the firmware. It includes settings for:

- primary and secondary I2C buses;
- speaker and microphone types and pins;
- camera GPIOs and clock frequency;
- screen type;
- button GPIOs and timing;
- analog multiplexer pins and channel;
- IMU type.

The configuration is stored as JSON in the `userdata` LittleFS partition:

```text
/userdata/settings.json
```

This means that the firmware can keep hardware-specific settings separate from the application code and from the Web Portal files stored in `storage`.

### Default configuration for each robot revision

At startup, the settings system detects the robot revision and starts with the corresponding default configuration:

| Robot revision | Screen | IMU |
| --- | --- | --- |
| V1 | SH1106 | MPU6050 |
| V2 | SSD1309 | LSM6DS3 |

The V1 and V2 defaults also contain different I2C pins, camera pinouts, button pins, analog configuration, and audio configuration.

The default is only the starting point. The firmware then loads `/userdata/settings.json` when the file exists, allowing the stored configuration to override the defaults.

### Loading and saving settings

The settings lifecycle is:

1. detect whether the robot is V1 or V2;
2. copy the matching built-in default configuration;
3. initialize LittleFS;
4. load `/userdata/settings.json` if it exists;
5. keep the defaults for values that are not present in the file;
6. save the resulting configuration back to the file.

When settings are saved, the previous file is copied to:

```text
/userdata/settings.json.bak
```

Changing settings does not automatically reconfigure every running driver. The current firmware expects the configuration to be saved and the robot to reboot before the new hardware configuration is applied.

::info-box{title="Configuration changes require a reboot" type="warning"}
Do not change the hardware configuration and continue using already initialized drivers as if they had been recreated. Use the firmware's save-and-reboot flow so that every subsystem is initialized from the same configuration.
::

## Interfaces and implementations

An abstract class defines the operations shared by several possible components.

### Screen abstraction

The `Screen` class defines the common screen contract:

- initialize and deinitialize the display;
- clear the display buffer;
- upload the buffer to the physical screen;
- expose the screen buffer dimensions and data.

The concrete implementations are:

```text
Screen
├── ScreenSH  → SH1106
└── ScreenSSD → SSD1309
```

The menu system can draw into the common screen buffer. It does not need to know the command sequence or buffer format required by each display controller.

### IMU abstraction

The `IMU` class provides a common interface for inertial sensing. The concrete sensor implementation only has to provide raw acceleration and angular velocity data.

The common class then handles the shared state estimation:

- gyro bias correction;
- orientation integration;
- accelerometer-based correction;
- quaternion normalization;
- down-vector calculation;
- orientation, angular velocity, and acceleration output.

The current implementations are:

```text
IMU
├── IMUMPU  → MPU6050
└── IMULSM  → LSM6DS3
```

This keeps sensor-specific register access inside the concrete driver while allowing locomotion and stabilization code to consume the same orientation API.

::mermaid
```text
flowchart LR
    Body[Body]
    IMUInterface[IMU interface]
    Factory[IMU::Create]
    MPU[IMUMPU]
    LSM[IMULSM]
    MPU6050[MPU6050 sensor]
    LSM6DS3[LSM6DS3 sensor]
    Estimator[Shared orientation estimator]

    Body --> IMUInterface
    IMUInterface --> Factory
    Factory --> MPU
    Factory --> LSM
    MPU --> MPU6050
    LSM --> LSM6DS3
    MPU --> Estimator
    LSM --> Estimator
    Estimator --> Body
```
::

## Factory-based selection

The factory pattern centralizes the choice of implementation. For the IMU, `IMU::Create()` reads the configured `IMUType` and creates the matching class:

```cpp [IMU.cpp]
IMU* IMU::Create()
{
    IMUType type = Settings::GetConfig().imu.type;

    if (type == IMUType::IMU_MPU6050)
        return new IMUMPU();

    if (type == IMUType::IMU_LSM6DS3)
        return new IMULSM();

    return nullptr;
}
```

The caller uses the returned `IMU*` through the abstract interface. It does not need to contain a second V1/V2 branch.

The screen follows the same design principle: the UI manager reads the configured `ScreenType` and creates either `ScreenSH` or `ScreenSSD`, while the rest of the UI stores and uses a `Screen*`.

::info-box{title="One interface, several implementations" type="tip"}
When adding support for a new component, the usual pattern is to define the operations in the abstract class, implement them in a concrete driver, add a configuration value, and update the selection logic.
::

## What is shared and what is hardware-specific?

The abstraction boundary is not meant to hide every difference. It hides the details that should not leak into high-level code, while keeping hardware-specific behavior inside the implementation where it belongs.

| Shared by the abstraction | Kept in the implementation |
| --- | --- |
| IMU orientation and acceleration API | Sensor registers and initialization sequence |
| Screen buffer, clear, and upload operations | Display controller commands and pixel packing |
| Audio playback operations | I2S or PDM peripheral setup |
| Logical I2C bus selection | GPIO pin configuration |
| Analog channel access | Multiplexer and ADC details |

This makes the common firmware easier to reason about, while still allowing each hardware revision to use the pins and peripherals that match its electronics.

## Abstraction and hardware drivers

Hardware abstraction and hardware drivers are related but not identical:

- the **abstraction** defines what a subsystem can do;
- the **driver** defines how a specific component does it.

For example, `IMU` is the common interface and `IMUMPU` is a concrete implementation. The more detailed driver documentation is available in [Hardware drivers](../hardware-drivers).

The abstraction layer is also used by the locomotion system. Read [How the robot moves](../locomotion) to see how the body consumes an `IMU*` without depending on the MPU6050 or LSM6DS3 directly.

## Where to go next

- Read [Hardware drivers](../hardware-drivers) to explore concrete component implementations.
- Read [Networking and communication](../networking) to see how remote commands reach the firmware.
- Read [Memory, partitions, and updates](../memory-partitions-and-updates) to understand where `settings.json` is stored.
