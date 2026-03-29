---
title: Electronics & Wiring
description: Explore the internal electrical design of TNY-360 including power management, microcontrollers, and custom circuit modifications.
---

# Electronics & Wiring

This section details the internal electrical design of the TNY-360. It is primarily intended for electronics enthusiasts and engineers looking to understand the core wiring, power management, and custom circuit modifications.

---

## Power Architecture

Learn how the TNY-360 manages power distribution to its components while balancing performance and reliability.

::chevron
[Power Architecture](./power-architecture) - An in-depth look at the power management strategies employed in the TNY-360.
::

## Data flow & Wiring

Learn how the TNY-360 manages data flow and wiring to its sensors and ICs.

::chevron
[Data flow & Wiring](./data-flow) - An in-depth look at how the TNY-360 manages its internal data connections.
::

## Microcontrollers and Integrated Circuits

::info-box{title="Hardware Note" type="info"}
The N16R8 variant is specifically chosen to handle the multiple web servers, web dashboard, and the camera stream simultaneously without any performance issues.<br>
Downgrading to a less powerful microcontroller may lead to performance bottlenecks or memory issues.
::

## MG996R Feedback Mod

Learn about our custom position feedback mod for the MG996R servo, to enable precise control without needing additional hardware.

::chevron
[MG996R Feedback Mod](./mg996r-mod) - A detailed explanation of how we implemented position feedback for the MG996R servo.
::

## Prototype Battery Pack

Learn more about our custom battery pack, how to create it, handle it, and use it safely for your TNY-360 robot.

::chevron
[Prototype Battery Pack](./battery-pack) - A guide to creating and using the custom battery pack designed for the TNY-360.
::