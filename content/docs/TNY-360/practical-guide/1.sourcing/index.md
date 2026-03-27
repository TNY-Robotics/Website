---
title: Sourcing & Preparation
description: Learn how to source all the components and tools needed to build your TNY-360 robot from scratch and how to flash the firmware.
---

# Sourcing & Preparation

*This is where your journey begins ...*

Hello and welcome to the TNY-360 Sourcing & Preparation Guide !

This section is designed for those who want to build their TNY-360 **from scratch**.
It will list all the components and tools you need to build a TNY-360 as well as the steps to create the custom MG996R servomotors and flash the firmware used in the robot.

## Ordering Components & Tools

Before starting, ensure you have gathered all the necessary hardware and tools for the build.

### Required Tools

| Tool                      | Recommendation | Link                                                               |
| ------------------------- | -------------- | ------------------------------------------------------------------ |
| Soldering Iron            | TS101          | [AliExpress](https://s.click.aliexpress.com/e/_c3MnB3SB)           |
| Lead-Free Solder Wire     | -              | [AliExpress](https://s.click.aliexpress.com/e/_c3S6N3lN)           |
| Tweezers Kit              | -              | [AliExpress](https://s.click.aliexpress.com/e/_c4rHYTvz)           |
| Solder Flux               | -              | [AliExpress](https://aliexpress.com)                               |
|                           |                |                                                                    |
| Solder Paste*             | -              | [AliExpress](https://fr.aliexpress.com/item/1005009851071408.html) |
| Hot Plate Solder Station* | -              | [AliExpress](https://s.click.aliexpress.com/e/_c4eMdVRt)           |

**Only needed if you plan to manufacture PCBs yourself.*

### PCBs to Order

The TNY-360 requires 7 different PCBs. You can find all design files in the [GitHub repository](https://github.com/TNY-Robotics/TNY-360/tree/main/Electronics/PCBs).

| PCB           | Purpose                                                                             | Files                                                                                                    |
| ------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Main Board    | Robot brain and main controller                                                     | [GitHub PCB Files](https://github.com/TNY-Robotics/TNY-360/tree/main/Electronics/PCBs/Main)              |
| Analog Reader | Sensor interface board                                                              | [GitHub PCB Files](https://github.com/TNY-Robotics/TNY-360/tree/main/Electronics/PCBs/Analog%20Reader)   |
| Motor Driver  | Motor control board                                                                 | [GitHub PCB Files](https://github.com/TNY-Robotics/TNY-360/tree/main/Electronics/PCBs/Motor%20Driver)    |
| Power Board   | Power distribution                                                                  | [GitHub PCB Files](https://github.com/TNY-Robotics/TNY-360/tree/main/Electronics/PCBs/Power)             |
| Paw Board     | Legs multiplexing and power management                                              | [GitHub PCB Files](https://github.com/TNY-Robotics/TNY-360/tree/main/Electronics/PCBs/Paw)               |
| Mount Board   | [Universal Mount](../../development-modding/physical-extensions/index.md) interface | [GitHub PCB Files](https://github.com/TNY-Robotics/TNY-360/tree/main/Electronics/PCBs/Universal%20Mount) |
| Servo Board   | Custom MG996R servo modification board                                              | [GitHub PCB Files](https://github.com/TNY-Robotics/TNY-360/tree/main/Electronics/PCBs/Servomotor)        |

To order the PCBs, please follow the [PCB Ordering Guide](./pcb-ordering.md) for detailed instructions on how to prepare the files and place your order with a PCB manufacturer.

### Components to Order

A complete Bill of Materials (BOM) for all the components needed in the TNY-360 build can be found in the [GitHub repository](https://github.com/TNY-Robotics/TNY-360/tree/main/BOM).

For your convenience, we have also compiled a list of the most critical and hard-to-find components with direct links to suppliers:

| Component         | Description                                              | Quantity | Link                                                               |
| ----------------- | -------------------------------------------------------- | :------: | ------------------------------------------------------------------ |
| Step down 7V      | DC-DC 300W 20A Buck Converter                            |    1     | [Aliexpress](https://s.click.aliexpress.com/e/_c3CWv1Vp)           |
| Step down 5V      | DC-DC 5V 3A Converter                                    |    1     | [Aliexpress](https://fr.aliexpress.com/item/1005008678729834.html) |
|                   |                                                          |          |                                                                    |
| VL53L0X           | Laser depth sensor                                       |    1     | [Aliexpress](https://s.click.aliexpress.com/e/_c4LPbeMT)           |
| SH1106            | OLED Screen 64x128                                       |    1     | [Aliexpress](https://s.click.aliexpress.com/e/_c4POAdYX)           |
| TTP223            | Touch sensor for menu navigation                         |    2     | [Aliexpress](https://fr.aliexpress.com/item/1005006087171183.html) |
| OV2640            | HD Camera  120° 75mm                                     |    1     | [Aliexpress](https://s.click.aliexpress.com/e/_c3eXa4EP)           |
| I2S Mic.          | I2S Microphone                                           |    1     | [Aliexpress](https://s.click.aliexpress.com/e/_c3CFAo5V)           |
|                   |                                                          |          |                                                                    |
| MG996R Servomotor | High-torque servo motor, compatible with the custom PCB. |    1     | [Aliexpress](https://s.click.aliexpress.com/e/_c37d8WVN)           |
| SG90              | Small servo motors, used for the ears                    |    2     | [Aliexpress](https://s.click.aliexpress.com/e/_c4PiVQKP)           |
|                   |                                                          |          |                                                                    |
| MPU6050           | 6-axis motion tracking sensor                            |    1     | [Aliexpress](https://s.click.aliexpress.com/e/_c4LXGDrH)           |
| Switches          | Tactile switches 6x6x5 mm to detect foot contact         |    4     | [Aliexpress](https://s.click.aliexpress.com/e/_c4koO1EL)           |
| Antenna           | Wi-Fi/Bluetooth 2.4Ghz antenna                           |    1     | [Aliexpress](https://s.click.aliexpress.com/e/_c3wCvBLz)           |

### Screws and Cables

The TNY-360 uses M2.5 screws and heat inserts for assembly, as well as various JST-PH and JST-XH cables for PCB connections.

A complete list of the required screws, heat inserts, and cables can be found in the [GitHub repository](https://github.com/TNY-Robotics/TNY-360/tree/main/BOM), but here's links to screws and cables kits that should cover all your needs:

| Item                  | Description                                                  | Version                       | Link                                                               |
| --------------------- | ------------------------------------------------------------ | ----------------------------- | ------------------------------------------------------------------ |
| M2.5 Screws           | Assorted kit of M2.5 screws & inserts in various lengths     | M2.5 500pcs                   | [Aliexpress](https://fr.aliexpress.com/item/1005007830491580.html) |
| Ring Crimp Connectors | Ring crimp connectors for secure DC-DC converter connections | M3 100pcs                     | [Aliexpress](https://s.click.aliexpress.com/e/_c2yxJCd5)           |
| JST-PH Cables         | Assorted kit of JST-PH cables with different number of pins  | -                             | [Aliexpress](https://s.click.aliexpress.com/e/_c3AtPZ9h)           |
| JST-XH Cables         | 4-Pins JST-XH cables (for customizing the servomotors)       | XH2.54mm  - 4P <br> 4x10cm + 8x30cm | [Aliexpress](https://s.click.aliexpress.com/e/_c3WRxkg7)           |

## Flashing the firmware

Before building the physical robot, you must flash the firmware onto the microcontroller. 

If you plan on digging into the firmware and customizing it, you can follow the instructions in the [Firmware & Software](../../anatomy/firmware/index.md) section of the documentation to download the source code and set up your development environment.

If you just want to get your robot up and running, you can follow the [Flashing Guide](./flashing-guide.md) for step-by-step instructions on how to flash the precompiled firmware onto the TNY-360 main board.

::info-box{title="USB Cable Info" type="info"}
A very common issue during this step is the use of a "charging-only" USB cable. A charging cable will power the board but will not allow data transfer.
Ensure your cable is capable of data transfer.
::

## Next Steps

Great, you are now ready to start the fabrication process and bring your TNY-360 to life!

Head over to the [Fabrication](../fabrication/index.md) section for the next steps of the build.
