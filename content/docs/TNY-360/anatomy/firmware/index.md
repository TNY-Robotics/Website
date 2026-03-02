---
title: Firmware & Software
description: Explore the TNY-360 embedded firmware architecture, control loop, and communication protocols for low-level developers.
---

# Firmware & Software

Welcome to the core of the TNY-360. This section is designed for low-level developers who want to understand, modify, or rewrite the robot's embedded logic.

---

::in-progress
::

## Firmware Architecture


## Firmware Lifecycle


## The Main Control Loop

::info-box{title="Performance" type="tip"}
To ensure execution stability, the main control loop runs on a dedicated core (Core 1), while Wi-Fi and WebSocket communications are pinned to Core 0.
::

## Communication Protocols
