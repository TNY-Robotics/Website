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

## 3D Printing Guide

### Material Selection

Printing the chassis with the correct materials and settings is critical for the robot's structural integrity and thermal safety.

- **Main Chassis:** The structural components have been designed for **PETG**. This material offers a good balance of strength, flexibility, and heat resistance, which is essential for the robot's durability and performance.
- **Robot Feet:** The feet must be printed in **TPU 95A**. This flexible material ensures proper grip and shock absorption.
- **Aesthetic Covers:** The decorative covers can be printed in **PLA or other materials**, as they do not bear any mechanical load.

::info-box{title="Using other materials" type="warning"}
The robot's main chassis has be designed and tested with PETG printed parts.
Using other materials like PLA or ABS instead of PETG may work but it is not recommended, as they may deform differently or even break under stress or heat.
::

### Recommended Slicing Parameters
To ensure the parts have the correct balance of weight and strength, configure your slicer with the following settings:
* **Infill Pattern:** Gyroid. This pattern spreads the forces more evenly across the part, providing better strength and durability while keeping the weight low.
* **Infill Density:** 15%. This density provides sufficient strength for the robot's structural components while minimizing weight, which is crucial for optimal performance.
* **Walls/Perimeters:** minimum of 3. This ensures that the outer shell of the parts is strong enough to withstand mechanical stresses and impacts.
* **Ironing:** Some parts slide against each other (ex: the legs' joints). Enabling ironing on the top layers of these parts will create a smoother surface finish, reducing friction and improving the robot's movement.
* **Orientation:** Pay strict attention to the recommended orientation of the parts on the build plate to maximize strength along stress points. For part orientation details, refer to the [Part Orientation](./part-orientation.md) section.

### Pre-made .3MF file

For easier printing, a complete .3MF file with all the parts already oriented and configured with the recommended slicing settings is available in the [GitHub repository](https://github.com/TNY-Robotics/TNY-360/tree/main/CAD/Exported).

This file can be directly imported into your slicer software (like OrcaSlicer), and it will automatically apply the correct settings and orientations for each part, ensuring optimal print quality and performance.

::info-box{title="Filament Color" type="info"}
The color of the filament you choose for printing is entirely up to you and will not affect the robot's performance. But for a more authentic look, you may want to use the color indications on the .3mf file build plates.
::

## Next Steps

Everything is good ? Great, you are now ready to start the assembly process and bring your TNY-360 to life!

Head over to the [Assembly](../assembly/index.md) section for the next steps of the build.
