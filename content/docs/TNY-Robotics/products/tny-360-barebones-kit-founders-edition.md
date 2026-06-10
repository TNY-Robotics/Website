# TNY-360 | BareBones Kit (Founder's Edition)

Here's a detailed overview of the TNY-360 Robot Dog BareBones Kit (Founder's Edition), which contains all the components used in the TNY-360 robot. It does not include the 3D printed parts, which you can print yourself or purchase separately.

---

## What is included

The TNY-360 Robot Dog BareBones Kit (Founder's Edition) includes the following components:

### Electronics

| PCBs                                                                      | Description                                                               | Quantity |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | -------- |
| [Main Board PCB](../../tny-360/anatomy/electronics/PCBs/main)             | The Main Board PCB with all its components and connectors soldered on.    | 1        |
| [Motor Driver PCB](../../tny-360/anatomy/electronics/PCBs/motor-driver)   | The Motor Driver PCB with all its components and connectors soldered on.  | 1        |
| [Analog Reader PCB](../../tny-360/anatomy/electronics/PCBs/analog-reader) | The Analog Reader PCB with all its components and connectors soldered on. | 1        |
| [Plug/Mount PCB](../../tny-360/anatomy/electronics/PCBs/plug)             | The Plug PCB with all its components and connectors soldered on.          | 1        |
| [Paw PCB](../../tny-360/anatomy/electronics/PCBs/paw)                     | The Paw PCB with all its components and connectors soldered on.           | 2        |
| [Power PCB](../../tny-360/anatomy/electronics/PCBs/power)                 | The Power PCB with all its components and connectors soldered on.         | 1        |

| Components | Description                                                             | Quantity |
| ---------- | ----------------------------------------------------------------------- | -------- |
| SH1106     | 128x64 OLED Screen with SH1106 Controller with 10cm JST-PH 4-Pins cable | 1        |
| MPU6050    | 6-axis IMU sensor with 20cm JST-PH 4-Pins cable                         | 1        |
| VL53L0X    | Time-of-Flight Distance Sensor with 10cm JST-PH 4-Pins cable            | 1        |
| TTP223     | Touch Sensor with 5cm JST-PH 3-Pins cable                               | 2        |
| OV2640     | 120° Camera Module with 75mm cable                                      | 1        |
| INMP441    | Microphone with 10cm JST-PH 5-Pins cable                                | 1        |
| Switch     | 6x6x5mm Contact Switch for feet contact detection                       | 4        |
| Speaker    | 2W 8Ω Speaker of size 25x35x5mm                                         | 1        |
| Antenna    | 2.4Ghz Antenna with 5cm cable and U.FL connector                        | 1        |

### Hardware

| Component          | Description                                                                    | Quantity |
| ------------------ | ------------------------------------------------------------------------------ | -------- |
| MG996R Servomotors | Custom 180° MG996R servomotors with position feedback and JST-XH 4-Pins cables | 12       |
| SG90 Servomotors   | 180° SG90 Servomotor with 3-Pins Dupont cables                                 | 2        |
| Buck Converter     | 20A 300W DC-DC Buck Converter, set to 6V output                                | 1        |

### Screws and Wires

| Screw / Insert | Description                       | Quantity |
| -------------- | --------------------------------- | -------- |
| M1.4x5 Screws  | M1.4 Screws with a length of 5mm  | 32       |
| M2.5x4 Screws  | M2.5 Screws with a length of 4mm  | 49       |
| M2.5x6 Screws  | M2.5 Screws with a length of 6mm  | 28       |
| M2.5x10 Screws | M2.5 Screws with a length of 10mm | 12       |
| M2.5x2 Inserts | M2.5 Inserts with a length of 2mm | 61       |
| M2.5x4 Inserts | M2.5 Inserts with a length of 4mm | 16       |
| M2.5x6 Inserts | M2.5 Inserts with a length of 6mm | 12       |

::info-box{title="Quantities" type="note"}
You may find more screws and/or inserts in the kits (to ensure that you have enough), but the quantities listed above are the ones you will need to assemble the robot.
::

| Wire                                  | Description                                    | Quantity |
| ------------------------------------- | ---------------------------------------------- | -------- |
| JST-PH 2-Pins - 10cm                  | 4-Wire cable with JST-PH with a 10cm length    | 1        |
| JST-PH 3-Pins - 10cm                  | 4-Wire cable with JST-PH with a 10cm length    | 4        |
| JST-PH 4-Pins - 10cm                  | 4-Wire cable with JST-PH with a 10cm length    | 4        |
| JST-PH 5-Pins - 10cm                  | 4-Wire cable with JST-PH with a 10cm length    | 1        |
| JST-PH 7-Pins - 10cm                  | 4-Wire cable with JST-PH with a 10cm length    | 1        |
| JST-PH 2-Pins - 20cm                  | 4-Wire cable with JST-PH with a 20cm length    | 2        |
| JST-PH 4-Pins - 20cm                  | 4-Wire cable with JST-PH with a 20cm length    | 2        |
| JST-PH 2-Pins to Dupont 3-pins - 40cm | Custom cable with JST-PH and Dupont connectors | 4        |

---

## What is not included

Be aware that the TNY-360 Robot Dog BareBones Kit (Founder's Edition) does not include the following components:

### 3D Printed Parts

The "BareBones" Kit does not come with the 3D printed parts, which are essential for assembling the robot.

All the parts are available for free on our [GitHub repository](https://github.com/TNY-Robotics/TNY-360) and can be printed using a FDM 3D printer with a minimum build volume of `220x200x100mm`.

### Battery

The TNY-360 Robot Dog needs a 3S LiPo battery with an XT30 connector. The battery is not included in the kit, but you can purchase it separately from various online retailers.

::info-box{title="Battery size" type="note"}
Please ensure that the battery you purchase doesn't exceed a size of `140x50x25mm`, so it doesn't interfere with the robot's movement.

We recommend a battery capacity of around `2500mAh` for a good balance between runtime and weight, but you can choose a different capacity based on your needs.
::

### Tools

To build the TNY-360 Robot Dog, you will need a couple of tools :

- **A Phillips screwdriver *(size PH1 and PH00)*** - To tighten the screws that hold the 3D printed parts together.
- **A heat insert tool** - To place the heat inserts into the 3D printed parts, which are used to create strong threaded holes for the screws.
- **A 3D printer** - To print the 3D printed parts, which are used to create the body of the robot.

You will find links to recommended tools in the [Sourcing](../../tny-360/practical-guide/sourcing/components#_1-get-the-necessary-tools) guide of the TNY-360 Robot Dog documentation.