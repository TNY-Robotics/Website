# PCBs

In this section, we will take a closer look at the different Printed Circuit Boards (PCBs) used in the TNY-360, their design, and their roles in the robot's electronics.

---

The robot has a total of 6 PCBs, each one handling a specific aspect of the robot's electronics, from power distribution to sensor management and communication interfaces.

::chevron
[Main PCB](./main) - Hosting the ESP32-S3 microcontroller, and other high-level components.
::

::chevron
[Motor Driver PCB](./driver) - Dedicated to controlling the MG996R servos.
::

::chevron
[Analog Reader PCB](./reader) - Communication interface between the analog sensors and the microcontroller.
::

::chevron
[Paw PCB](./paw) - Used for power distribution and interface between the `motor driver` / `analog reader` PCBs and the motors.
::

::chevron
[Power PCB](./power) - Main power distribution board, used for voltage and current monitoring and for connecting the battery.
::

::chevron
[Plug PCB](./plug) - Use in the universal plug system to connect modules by exposing connection pads for power & signals.
::
