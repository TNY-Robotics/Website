# On-device interface and audio

The on-device interface gives the robot a way to communicate without a browser or external controller. It combines the screen, buttons, LEDs, and audio system.

The interface is intentionally above the hardware drivers. Menus draw using the common `Screen` API and request sounds through the audio manager; they do not need to know which display controller or speaker bus is installed.

---

## The interface components

The main feedback channels are:

- the screen and its drawing buffer;
- the left and right buttons;
- the status LED;
- the speaker and sound providers;
- the microphone, where a feature requires audio input.

The `UIManager` coordinates the active screen and menu. Individual menus are responsible for their content and actions, while shared widgets provide reusable elements such as lists, icons, animations, and QR codes.

## Screen rendering

The screen abstraction exposes a common buffer and operations to clear and upload it. The concrete driver handles the controller-specific transfer:

```text
Menu or face
    ↓ draw
Screen buffer
    ↓ upload
ScreenSH or ScreenSSD
    ↓
SH1106 or SSD1309
```

The rendering loop can therefore remain the same across V1 and V2. The selected implementation comes from the runtime screen configuration described in [Hardware abstraction](../hardware-abstraction).

The display is used for both persistent information and short-lived feedback:

- the face and main menu;
- network and system status;
- errors and diagnostic messages;
- configuration menus;
- update and reboot states.

## Buttons and menu navigation

The button driver polls the configured GPIOs and applies the configured timing for polling and long presses. Menus interpret those logical button events rather than reading GPIOs directly.

This creates a simple separation:

| Layer | Responsibility |
| --- | --- |
| Button input | Detect press, release, and long-press timing |
| `UIManager` | Route input to the active menu |
| Menu | Change selection or trigger an action |
| Subsystem | Apply the requested configuration or command |

The menu hierarchy contains entries for system information, network settings, audio, IMU and I2C configuration, motor calibration, diagnostics, updates, Bluetooth, and reboot actions.

## Status feedback

Not every state needs a full screen transition. LEDs and audio provide fast feedback during boot and while the robot is operating:

::mermaid
```text
flowchart TD
    Event[System event]
    UI[UIManager]
    Screen[Screen and menu]
    LED[Status LED]
    Audio[Audio manager]

    Event --> UI
    UI --> Screen
    UI --> LED
    UI --> Audio
```
::

For example, startup can show a splash or face, illuminate the LED when initialization succeeds, and display an error when a required subsystem cannot start. The same information can also be sent through the network layer for remote users.

## Audio architecture

The audio manager sits above the concrete speaker and microphone implementations. Sound providers generate or supply audio data, and the selected output driver sends it through PDM or I2S hardware.

```text
Menu, event, or behavior
    ↓
AudioManager
    ↓
SoundProvider / mixer
    ↓
SpeakerPDM or SpeakerI2S
    ↓
Physical speaker
```

The microphone follows the reverse direction: the input driver configures the selected bus and exposes samples to the component that needs them. Sample rate, gain, volume, and provider count are part of the runtime audio configuration.

## UI and the two-core model

The interface runs on the Brain side of the firmware, on Core 0. It can spend time rendering, handling buttons, or serving network requests without taking the real-time motor loop off its schedule on Core 1.

This does not make the interface independent of robot state. It reads status from shared robot objects and can request actions such as changing a mode, starting diagnostics, or rebooting. Those requests still pass through the relevant subsystem and safety checks.

## Face, menus, and remote interfaces

The on-device UI and the web interface are two views of the same robot state. They should not be considered two separate control systems:

::mermaid
```text
flowchart LR
    State[Robot state]
    Local[On-device menus and face]
    Remote[Web interface]
    Commands[Validated commands]

    State --> Local
    State --> Remote
    Local --> Commands
    Remote --> Commands
```
::

The local interface remains useful when Wi-Fi is unavailable, especially for diagnostics, calibration, and recovery. The web interface is better suited to detailed telemetry and remote operation.

For the user-facing remote controls, see [Teleoperation](../../../use-it/teleoperation). For self-checks and calibration, see [Diagnostics and calibration](../diagnostics-and-calibration).
