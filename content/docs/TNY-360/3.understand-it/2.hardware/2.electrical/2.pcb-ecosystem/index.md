# PCB ecosystem

The TNY-360 uses several printed circuit boards distributed through the head, torso, back, and feet. Together, these boards distribute power, connect buses, drive the motors, read sensors, and expose the robot's user-interface hardware.

This page is the overview and navigation hub for the complete PCB reference.

---

<img src="/docs/images/PCBs/PCBs-overview.png" alt="PCB ecosystem overview" class="max-w-2xl mx-auto" />

::center
Overview of the TNY-360 PCB ecosystem.
::

## Board layout overview

:section-button{href="./power-board" icon="lucide:battery-charging" title="Power board" desc="Follow battery input, protection, and power distribution."}

:section-button{href="./buck-converter" icon="lucide:arrow-down-up" title="Buck converter" desc="Understand the regulated voltage rails used by the electronics."}

:section-button{href="./extension-board" icon="lucide:plug" title="Extension board" desc="See how the extension ports connect to the backbone and the rest of the robot."}

:section-button{href="./backbone" icon="lucide:git-branch" title="Backbone" desc="Explore the central torso board and its connections to the other subsystems."}

:section-button{href="./main-board" icon="lucide:cpu" title="Main board" desc="Discover the main processing and control electronics."}

:section-button{href="./visor-board" icon="lucide:monitor" title="Visor board" desc="Learn how the head display, sensors, and related signals are connected."}

:section-button{href="./motor-driver" icon="lucide:gamepad-directional" title="Motor driver" desc="See how the robot's 14 motors are controlled from a central controller."}

:section-button{href="./analog-reader" icon="lucide:activity" title="Analog reader" desc="Understand how position feedback and ground detection signals are read."}

:section-button{href="./imu-board" icon="lucide:compass" title="IMU board" desc="Explore the inertial sensor and its bus connection."}

:section-button{href="./contact-switches" icon="lucide:toggle-right" title="Contact switches" desc="Learn how the four Hall-effect contact switches detect contact at the feet."}

## How the boards work together

The boards form a connected ecosystem rather than a collection of isolated circuits:

::mermaid
```text
flowchart TB
    Power[Power board]
    Buck[Buck converter]
    Backbone[Backbone]
    Main[Main board]
    Motor[Motor driver]
    Analog[Analog reader]
    IMU[IMU board]
    Visor[Visor board]
    Contacts[Contact switches]
    Extension[Extension Board]

    Power --> Buck
    Buck --> Backbone
    Buck --> Extension
    Extension <--> Backbone
    Backbone <--> Main
    Backbone <--> Motor
    Backbone <--> Analog
    Backbone <--> IMU
    Backbone <--> Contacts
    Main <--> Visor
```
::

The exact physical connections and revision-specific pinouts belong to each board page. Begin with [Electrical architecture](../architecture) if you need the global power and bus model first.

::info-box{title="Check the board revision - QR Code" type="warning"}
Connector numbering, components, and pinouts can change between PCB revisions. Always verify the revision before wiring or troubleshooting a board.

You can find the revision printed on the board itself, or scan the QR code on the back of the robot to be directed to the appropriate documentation page for your revision.
::
