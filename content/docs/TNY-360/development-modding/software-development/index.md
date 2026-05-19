---
title: Software Development
description: Access SDKs, WebSocket API docs, and ROS2 integration guides to directly control your TNY-360 robot.
---

# Software Development

Welcome to the software development hub for the TNY-360! This section is specifically targeted at software developers.

Whether you want to build a custom interface, automate tasks, or hook the robot into a larger network, you will find all the necessary tools here. 

---

## Reaching a low-level control (Bypassing TNY-Coder)

While [TNY-Coder](https://github.com/TNY-Robotics/TNY-Coder) provides a fantastic out-of-the-box experience, developers often need raw access to the hardware.
The TNY-360 firmware runs a lightweight WebSocket server on the ESP32-S3, allowing for real-time, low-latency, bidirectional communication.

::info-box{title="Network Connection" type="info"}
Before attempting to send direct commands, ensure your TNY-360 is powered on, connected to your local Wi-Fi network, and that you have identified its local IP address.
::

### SDKs

Software Development Kits (SDKs) for popular programming languages are in active development and will provide a high-level interface for interacting with the TNY-360.

As of today, only the [Javascript/TypeScript SDK](./javascript) is available, but the Python and C/C++ SDKs are coming soon!

---

## API References

Here are the links to the API references for the different SDKs :

::chevron
[Python SDK](./python)<br>
The Python SDK is currently in development, but will provide a high-level interface to control your TNY-360 from Python scripts and applications.
::

::chevron
[Javascript/TypeScript SDK](./javascript)<br>
The Javascript/TypeScript SDK is available now and allows you to control your TNY-360 from any JavaScript environment, including Node.js and web browsers.
::

::chevron
[C/C++ SDK](./cpp)<br>
The C/C++ SDK is currently in development, but will provide a high-performance interface for low-level control and robotics programming on your TNY-360.
::

::chevron
[ROS2 Integration](./ros2)<br>
The ROS2 Integration is under active development. It will allow you to talk to your TNY-360 through ROS2 topics, services, and actions, enabling advanced robotics applications and integration with the ROS2 ecosystem.
::

---

## SDK Documentation

All the SDKs (Python, Javascript/TypeScript, C/C++, ...) are built on top of the same underlying API that uses Websockets to communicate with the robot.

This makes all SDKs structured in a similar way. So we built a dedicated [SDK Documentation](./sdk-doc) section where you can find all the details about the available methods, classes, you can use in every SDK.

<br>

::center
:big-button{label="SDK Documentation" href="./sdk-doc" icon="i-lucide-chevron-right" inline}
::