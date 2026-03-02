---
title: Physical Extensions
description: Guide to designing custom physical extensions for the TNY-360 robot using its universal mount system.
---

# Physical Extensions

Welcome to the TNY-360 physical modding guide! This section is specifically targeted at makers and 3D designers. The TNY-360 is designed to be a flexible platform, ready to be customized and expanded to fit your specific use cases.

## The Universal Mount

The TNY-360 features a universal mount on its back that provides convenient access to multiple power and data lines, making it straightforward to attach custom extensions.
This modular design allows you to expand the robot's capabilities without complex modifications.

To get started designing your own physical extensions, check out these two links :

::chevron
[Mount measurements](./1.measurements.md) - Detailed dimensions of the universal mount to help you design compatible attachments.
::

::chevron
[Exposed pins](./2.exposed-pins.md) - A list and description of the power and data lines accessible through the universal mount.
::

## Payload Constraints

While the TNY-360 is mechanically robust, adding physical extensions changes its center of gravity and increases the continuous load on the servos.

::info-box{title="Payload Limits" type="danger"}
It is critical that you respect the robot's payload limits.<br>
Exceeding the **1kg limit** will negatively impact the kinematics and may trigger the mechanical fuses or overheat the motors.
::
