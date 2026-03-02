---
title: Software Development
description: Access SDKs, WebSocket API docs, and ROS2 integration guides to directly control your TNY-360 robot.
---

# Software Development

Welcome to the software development hub for the TNY-360! This section is specifically targeted at software developers.

Whether you want to build a custom interface, automate tasks, or hook the robot into a larger network, you will find all the necessary tools here. 

This guide explains how to send direct commands to the robot without relying on the default TNY-Coder interface.

---

## Direct Control (Bypassing TNY-Coder)

While TNY-Coder provides a fantastic out-of-the-box experience, developers often need raw access to the hardware.
The TNY-360 firmware runs a lightweight WebSocket server on the ESP32-S3, allowing for real-time, low-latency, bidirectional communication.

::info-box{title="Network Connection" type="info"}
Before attempting to send direct commands, ensure your TNY-360 is powered on, connected to your local Wi-Fi network, and that you have identified its local IP address.
::

Software Development Kits (SDKs) for popular programming languages will soon be available to simplify the process of sending commands and receiving feedback from the robot.
In the meantime, you can interact with the WebSocket API directly using any WebSocket client library in your preferred programming language.

## API References

Here are the links to the API references for direct control of the TNY-360 :

::chevron
[Python SDK](./1.python.md) - A Python library for controlling the TNY-360, including installation instructions and usage examples.
::

::chevron
[Javascript SDK](./2.javascript.md) - A Javascript library for controlling the TNY-360, suitable for web applications and Node.js environments, with installation and usage guides.
::

::chevron
[C++ SDK](./3.cpp.md) - A C++ library for controlling the TNY-360, ideal for performance-critical applications, with setup instructions and code examples.
::

::chevron
[ROS2 Integration](./5.ros2.md) - A guide to integrating the TNY-360 with the Robot Operating System 2 (ROS2) for advanced robotics applications, including setup and example nodes.
::

::chevron
[WebSocket API Reference](./4.websocket-api.md) - Detailed documentation of the WebSocket endpoints, command formats, and expected responses for controlling the TNY-360 at a low level.
::