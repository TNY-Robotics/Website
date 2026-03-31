---
title: Fabrication
description: 
---

# Fabrication

Welcome to the first step of building your TNY-360 quadruped robot!

This guide is designed specifically for builders starting with the ***Maker Kit*** (hardware only, no 3D printed parts) or people who have already sourced their materials.

Our goal here is to help you 3D print the parts of your TNY-360 robot with the right settings and materials to ensure optimal performance and durability.

---

## 1 - Material Selection

Printing the chassis with the correct materials and settings is critical for the robot's structural integrity and thermal safety.

Here are the recommended materials for each part of the robot, along with the reasons for these choices:

| **Part**              | **Recommended Material** | **Reason**                                                                                      |
| --------------------- | ------------------------ | ----------------------------------------------------------------------------------------------- |
| **Main Chassis**      | PETG                     | Offers a good balance of strength, flexibility, heat resistance & durability.  |
| **Robot Feet**        | TPU 95A                  | Provides proper grip and shock absorption, crucial for the robot's stability.      |
| **Aesthetic Covers**  | PLA or other             | Suitable for non-structural parts, allowing for easier printing & more color options. |

::info-box{title="Using other materials" type="warning"}
The robot's main chassis has be designed and tested with PETG printed parts.
Using other materials like PLA or ABS instead of PETG may work but it is not recommended, as they may deform differently or even break under stress or heat.
::

---

## 2 - Slicing Parameters

To ensure the parts have the correct balance of weight and strength, we recommend using the following slicing settings for all the 3D printed parts of the TNY-360:

| **Parameter**        | **Recommended Value** | **Reason**                                                                                                                                                                    |
| -------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Infill Pattern**   | Gyroid                | Spreads forces evenly across the part, providing better strength and durability while keeping weight low.                                                                     |
| **Infill Density**   | 15%                   | Provides sufficient strength for structural components while minimizing weight, crucial for optimal performance.                                                              |
| **Number of walls**  | Minimum of 3          | Ensures the outer shell is strong enough to withstand mechanical stresses and impacts.                                                                                        |
| **Ironing**          | Enabled on top layers | Creates a smoother surface finish on parts that slide against each other (e.g., leg joints), reducing friction and improving movement.                                        |

::info-box{title="Temperature & Speed" type="tip"}
The optimal printing temperature and speed can vary based on the specific filament brand and your printer's capabilities. But keep in mind that increasing the printing temperature can improve layer adhesion and strength, while reducing the speed can enhance print quality and durability.
::

---

## 3- Pre-made .3MF file

For easier printing, a complete .3MF file with all the parts already oriented and configured with the recommended slicing settings is available in the [GitHub repository](https://github.com/TNY-Robotics/TNY-360/tree/main/CAD/Exported).

This file can be directly imported into your slicer software (like [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer)), and it will automatically apply the correct settings and orientations for each part, ensuring optimal print quality and performance.

Keep in mind that even if the .3MF file provides a good starting point, you may need to adjust the settings based on your specific printer and filament to achieve the best results, for example :

* Calibrating the printing temperature and speed for your specific filament brand.
* Calibrating the hole-compensation settings to ensure the holes are the correct size.
* Adding supports for overhangs if your printer struggles with them.
* Adjusting the bed adhesion settings or adding a raft if you encounter warping issues.
* Tweaking the ironing settings to achieve a smoother finish on the leg joints.

A great guide for printer / filament calibration can be found in the [OrcaSlicer documentation](https://www.orcaslicer.com/wiki/#calibrations).

::info-box{title="Filament Color" type="info"}
The color of the filament you choose for printing is entirely up to you and will not affect the robot's performance. But for a more authentic look, you may want to use the color indications on the .3mf file **build plates names**.
::

---

## 4 - Printing the parts

Once you have selected the materials, configured the slicing settings, and prepared the .3MF file, you can start printing the parts of your TNY-360 robot.

Make sure to monitor the printing process, especially for the first few layers, to ensure proper adhesion and to catch any issues early on.
After printing, allow the parts to cool down completely before removing them from the print bed to prevent warping or damage.

be aware that the entire robot can take a significant amount of time to print, especially if you are using slower speeds for better quality, so be patient and plan accordingly.

*Good luck to you (and your printer) !*

---

## Next Steps

Everything is printed ? Great, you are now ready to start the assembly process and bring your TNY-360 to life!

Head over to the [Assembly](../assembly/index.md) section for the next steps of the build.
