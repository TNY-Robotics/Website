# Networking and communication

Networking is the path between a remote user and the firmware running on the robot. It carries commands, telemetry, configuration requests, and files for the embedded web interface.

The network layer is intentionally separated from locomotion. It receives and validates a request, then hands it to the appropriate subsystem. The real-time control loop remains responsible for producing safe movement.

---

## Wi-Fi and access modes

The firmware uses Wi-Fi as the main connection for the web interface and remote control. The network manager coordinates the connection, while the Wi-Fi manager handles the ESP32 Wi-Fi state.

Depending on the current configuration and connection state, the robot can be used through its own access point or through an existing Wi-Fi network. DNS support allows the browser interface to remain easy to reach when the robot provides the local network.

The important distinction is:

- Wi-Fi transports packets;
- the web server serves the interface and HTTP resources;
- WebSocket carries live interaction;
- the protocol modules interpret robot commands.

## The embedded web server

The robot contains an embedded web server for its browser interface. The web files are stored separately from the firmware code in the `storage` partition; see [Memory, partitions, and updates](../memory-partitions-and-updates).

The server provides pages and static assets, but it is not the robot's control logic. A button or joystick action in the browser becomes a protocol message that is handled by firmware modules.

::mermaid
```text
flowchart LR
    Browser[Browser]
    HTTP[Embedded web server]
    Files[Web files in storage]
    Socket[WebSocket]
    Protocol[Binary protocol]
    Module[Protocol module]
    Robot[Robot subsystem]

    Browser --> HTTP
    HTTP --> Files
    Browser <--> Socket
    Socket <--> Protocol
    Protocol --> Module --> Robot
```
::

## WebSocket and the binary protocol

WebSocket is used for the persistent, bidirectional connection needed by teleoperation and live status updates. Unlike a single request/response exchange, the robot can send telemetry or state changes back to the browser while the user is connected.

Messages are encoded by the firmware's binary reader and writer utilities and interpreted by the protocol dispatcher. Protocol modules group commands by feature, including:

- body and gait control;
- joints, legs, and motors;
- IMU data;
- LEDs and system state;
- diagnostics.

Keeping modules separate makes the wire protocol easier to extend without putting every command in one large handler.

## From a remote command to movement

A simplified command path is:

::mermaid
```text
sequenceDiagram
    participant User as Browser or SDK
    participant WS as WebSocket
    participant P as Protocol dispatcher
    participant M as Body module
    participant I as Control intent
    participant C as Reflex control loop
    participant B as Body and joints

    User->>WS: Send command
    WS->>P: Decode message
    P->>M: Dispatch module and command
    M->>I: Update validated intent
    C->>I: Read latest intent
    C->>B: Compute and apply movement
    B-->>WS: State or telemetry update
```
::

The command is not a direct motor write. It updates an intent or high-level state that is consumed by the real-time loop. This protects the control path from network latency and keeps motor timing deterministic.

## Brain and Reflex responsibilities

Networking belongs primarily to the Brain side of the firmware. Core 0 handles the network manager, web server, protocol processing, and decision logic. Core 1 runs the Reflex side, including the time-sensitive control loop.

This separation means a temporary network stall should not directly block the 200 Hz control loop. A watchdog also limits how long an old movement intent may remain active when commands stop arriving.

See [Firmware overview](../overview) for the complete Brain/Reflex architecture and [Locomotion](../locomotion) for the control-side behavior.

## Bluetooth support

Bluetooth support is being developed as an additional communication path for Xbox controllers and other wireless gamepads.

The intended architecture is to translate controller input into the same logical movement intent used by the web interface. This avoids creating a separate locomotion implementation for every input device:

```text
Web interface ─┐
               ├──> logical command and intent ──> locomotion
Bluetooth  ────┘
```

This feature is in development. Its exact pairing flow, supported controller models, and user-facing configuration may change as the implementation progresses.

## Communication and safety

Remote control should be treated as an input to the robot, not as a replacement for local safeguards. The firmware can reject invalid values, stop or neutralize stale commands, and route failures to the diagnostics system.

For memory and update transport details, see [Memory, partitions, and updates](../memory-partitions-and-updates). For the user-facing controls, see [Teleoperation](../../../use-it/teleoperation).
