# Hardware

Welcome to the hardware section of the TNY-360 documentation.

This part is designed for readers who want to understand the physical limits, capabilities, and design choices behind the TNY-360 quadruped robot. It explains both the mechanical structure of the robot and the electronic systems that make it move, sense its environment, and communicate with the firmware.

You do not need to manufacture or repair the robot to benefit from this section. Understanding the hardware helps explain the robot's behavior, its physical limits, and the way the firmware interacts with the body.

---

## Mechanical design

The mechanical section explains how the robot is built, how its parts move, and why specific construction techniques were chosen.

:section-button{href="./mechanical" icon="lucide:box" title="Mechanical design" desc="Discover the main parts of the robot, its materials, dimensions, joints, modularity, and feet."}

## Electrical design

The electrical section explains how power and signals travel through the robot, where the printed circuit boards are located, and what role each board plays.

:section-button{href="./electrical/architecture" icon="lucide:zap" title="Electrical architecture" desc="Follow the power rails, voltage levels, buses, and signal paths through the robot."}

:section-button{href="./electrical/pcb-ecosystem" icon="lucide:network" title="PCB ecosystem" desc="Start with the PCB overview, then explore each board by location, role, connectors, and pinout."}

## Hardware and firmware

Hardware and firmware are documented separately, but they are designed as one system. The firmware's [hardware abstraction](../firmware/hardware-abstraction) hides differences between supported components, while the [hardware drivers](../firmware/hardware-drivers) communicate with the concrete electronics.

The [locomotion documentation](../firmware/locomotion) explains how motor commands, joint feedback, the IMU, and foot-contact information are combined to move the robot.

::info-box{title="Hardware revisions matter" type="warning"}
Pinouts, components, and board layouts may differ between revisions. A connector or signal documented for one hardware revision should not be assumed to be identical on another revision without checking its corresponding reference page.
::
