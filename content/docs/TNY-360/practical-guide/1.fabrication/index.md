---
title: Fabrication
description: Source materials, 3D print structural parts, and prepare electronics for your TNY-360 robot build.
---

# Fabrication

Welcome to the first step of building your TNY-360 quadruped robot!

This guide is designed specifically for builders starting with the ***Maker Kit*** (hardware only, no 3D printed parts).
Our goal here is to help you correctly source your materials, print your structural components, and prepare the core electronics.

---

::in-progress
::

## Bill of Materials (BOM) & Tools

Before starting, ensure you have gathered all the necessary hardware and tools for the build.

// TODO

## 3D Printing Guide

Printing the chassis with the correct materials and settings is critical for the robot's structural integrity and thermal safety.

### Material Selection
- **Main Chassis:** The structural components have been designed for PETG. This material offers a good balance of strength, flexibility, and heat resistance, which is essential for the robot's durability and performance.
- **Robot Feet:** The feet must be printed in TPU 95A. This flexible material ensures proper grip and shock absorption.
- **Aesthetic Covers:** The decorative covers can be printed in PLA or other materials, as they do not bear any mechanical load.

::info-box{title="Using other materials" type="warning"}
The robot's main chassis has be designed and tested with PETG printed parts.
Using other materials like PLA or ABS instead of PETG may work but it is not recommended, as they may deform differently or even break under stress or heat.
::

### Recommended Slicing Parameters
To ensure the parts have the correct balance of weight and strength, configure your slicer with the following settings:
* **Infill Pattern:** Gyroid. * **Infill Density:** 15%.
* **Walls/Perimeters:** 3 walls minimum.
* **Orientation:** Pay strict attention to the recommended orientation of the parts on the build plate to maximize strength along stress points. For part orientation details, refer to the [Part Orientation](./part-orientation.md) section.

## Flashing the firmware

Before building the physical robot, you must flash the firmware onto the microcontroller. 

If you plan on digging into the firmware and customizing it, you can follow the instructions in the [Firmware & Software](../anatomy/firmware/index.md) section of the documentation to download the source code and set up your development environment.

If you just want to get your robot up and running, you can follow the [Flashing Guide](./flashing-guide.md) for step-by-step instructions on how to flash the precompiled firmware onto the TNY-360 main board.

::info-box{title="USB Cable Info" type="info"}
A very common issue during this step is the use of a "charging-only" USB cable. A charging cable will power the board but will not allow data transfer.
Ensure your cable is capable of data transfer.
::

## Next Steps

Everything is good ? Great, you are now ready to start the assembly process and bring your TNY-360 to life!

Head over to the [Assembly & Calibration](../assembly-calibration/index.md) section for the next steps of the build.
