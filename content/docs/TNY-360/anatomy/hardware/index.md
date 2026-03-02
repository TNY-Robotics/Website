---
title: Hardware & Mechanics
description: Explore the mechanical design, kinematics, and structural engineering of the TNY-360 quadruped robot, including dimensions, DOF, and protective design.
---

# Hardware & Mechanics

Welcome to the mechanical documentation of the TNY-360. This section is specifically designed for engineers, students, and curious minds who want to understand the physical architecture and the structural engineering behind the robot. 

Here, we will break down the physical dimensions, the kinematic model, the Degrees of Freedom (DOF), structural protection system, and other hardware design philosophies that make the TNY-360 a robust and versatile quadruped platform.

---

::in-progress
::

## Dimensions & Form Factor

The TNY-360 is designed to be compact and lightweight, making it ideal for indoor use, easy to transport, and easy to print.

This robot may be small, but its size does matter. So here are the dimensions of the key parts of the TNY-360:

### Main body block

The core of the robot is a rectangular block that houses the hip roll motors, power distribution boards and other central components.
Knowing the dimensions of this block is crucial for any modifications or extensions you might want to add.

| **Dimension** | **Measurement** |
| ------------- | --------------- |
| Length        | 220mm           |
| Width         | 130mm           |
| Height        | 30mm            |


## Kinematics and Degrees of Freedom (DOF)

To achieve natural, mammalian-like locomotion, the TNY-360 relies on a carefully calculated kinematic model. 

The robot features a total of **12 Degrees of Freedom (DOF)**, distributed as **3 DOF per leg**.
This configuration is the standard for advanced quadruped robots, allowing the end-effector (the foot) to be positioned anywhere in 3D space relative to the shoulder joint.

Each leg consists of the following joints:
1.  **Hip Roll:** Controls the lateral (abduction/adduction) movement.
2.  **Hip Pitch:** Controls the forward and backward swing.
3.  **Knee Pitch:** Controls the extension and compression of the lower leg.

::info-box{title="Kinematic Computations" type="experimental"}
The TNY-360 uses Inverse Kinematics (IK) to calculate the precise angle required for each of the 3 servos to place the foot at a specific (X, Y, Z) coordinate. If you are developing your own gaits, ensure your coordinate requests do not exceed the physical reach (workspace) of the leg assembly!
::

::info-box{title="Learn more" type="info"}
To learn more about the kinematics calculations and how to implement your own gaits, check out the [Kinematics & Gaits](../firmware/2.kinematics-gaits.md) section of the documentation.
::


## The "Mechanical Fuses" Concept

One of the most important hardware design philosophies of the TNY-360 is the integration of **"mechanical fuses"**. 

When developing and testing a quadruped, falls are inevitable. The MG996R servos used in the TNY-360 have metal gears, but the torque applied during a sudden drop or a software glitch could strip them or burn out the internal motors.

Instead of making every 3D-printed part as rigid as possible, we intentionally designed specific connecting joints to be the weakest link in the structural chain. 

* **How it works:** In the event of a heavy impact or a severe fall, these specific 3D-printed parts are designed to snap or break cleanly.
* **The benefit:** This absorbs the kinetic energy of the impact, completely protecting the expensive servomotors from taking the brunt of the force.


::info-box{title="Do not reinforce these parts!" type="danger"}
It might be tempting to print these "fuse" joints in stronger materials, or to use 100% infill.<br>
**Do not do this.** By reinforcing the mechanical fuses, you transfer the shock directly to the servo gears or other parts of the robot, which will result in broken hardware that is much harder and more expensive to replace than a 20-minute PLA/PETG print.
::
