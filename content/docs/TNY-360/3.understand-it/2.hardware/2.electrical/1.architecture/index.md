# Electrical architecture

The TNY-360 electrical architecture defines how energy and information travel through the robot. It connects the battery and protection circuitry to the regulated electronics, motor system, sensors, and user-interface hardware.

---

## Main electrical paths

The architecture can be understood through four related paths:

- **Battery and protection**, which receives and protects the robot's main supply;
- **Voltage conversion**, which creates the rails required by low-voltage electronics, as well as the high-current supply for the motors;
- **Motor power and feedback**, which makes the bridge between the low-voltage control electronics and the high-current motors;
- **Logic and sensor buses**, which carry commands, measurements, and state information.

::mermaid
```text
flowchart LR
    Battery[3S Li-Po battery]
    Protection[Power protection]
    Conversion[Buck conversion]
    Logic[Logic electronics]
    Motors[Motor system]
    Sensors[Sensors and IMU]
    UI[Screen and audio]

    Battery --> Protection
    Protection --> Conversion
    Conversion --> Motors
    Conversion --> Logic
    Logic <--> Sensors
    Logic <--> UI
```
::

## Power domains

Different parts of the robot require different voltage levels. The architecture defines several **power domains** that are isolated from each other and connected through using Star-Grounding and other filtering techniques.

The robot has four main power domains:

| Domain | Voltage | Description |
| --- | --- | --- |
| Battery | 11.1V-12.6V | The main power source for the robot |
| Motor | 6.7V | The high-current supply for the motors |
| Noisy Logic | 5V | Supply voltage and signal levels for all sensors next to the motors and other high-current electronics |
| Clean Logic | 3.3V | Supply voltage and signal levels for the main processor, IMU, and other sensitive electronics |

These domains are physically separated along the body of the robot, with high-current electronics located near the motors and low-noise electronics located closer to the head.

## Communication buses

The TNY-360 uses several communication buses and protocols to talk between the main processor and the various sensors, drivers, and devices. The main buses are:

| Bus | Protocol | Description |
| --- | --- | --- |
| Primary I2C | I2C | The main bus for sensitive sensors (like the IMU and Motor Driver) |
| Secondary I2C | I2C | A secondary bus for less time-sensitive devices, also exposed through the [extension board](../pcb-ecosystem/extension-board) |
| Microphone PDM | PDM | The bus for the microphone at the front of the robot |
| Speaker I2S | I2S | The bus for the audio amplifier on the main board |
| Camera MIPI | MIPI CSI-2 | The bus for the camera module at the front of the robot |

The runtime pin and bus configuration is described by the firmware's `RobotConfig`. See [Hardware abstraction](../../../firmware/hardware-abstraction) for how software selects the appropriate configuration.

::info-box{title="Architecture before pinout" type="tip"}
Use this page to understand the role of each power domain and bus. Use the [PCB ecosystem](../pcb-ecosystem) for the physical location, connectors, and detailed pinout of each board.
::
