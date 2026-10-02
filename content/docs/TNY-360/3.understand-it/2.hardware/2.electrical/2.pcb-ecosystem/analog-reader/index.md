---
title: Analog Reader
---

::split{side="right"}

#left
# Analog reader

The analog reader is a `74HC4067` analog multiplexer. It lets the ESP32-S3 read the position feedback of the 12 body motors and the four contact switches through a shared ADC path.

#right
<img src="/docs/images/V2/PCBs/Analog-Reader.png" alt="Analog reader board" class="w-42 h-42" />

::

---

## Useful links

:section-button{href="./" icon="lucide:hammer" title="Go to the Assembly Step" desc="Go to the assembly step where the analog reader is being installed."}

---

## Board reference

### Role

- select one of the analog channels through the `74HC4067`;
- read feedback from the 12 body motors;
- read the four contact-switch signals;
- send the selected signal to an ESP32-S3 ADC input.

### Location

The board is installed directly on the backbone with 2 mm headers.

### Main topics

- `74HC4067` multiplexer and channel mapping;
- 12 motor position-feedback inputs;
- four contact-switch inputs;
- multiplexer selection and ADC signals;
- 2 mm header connections to the backbone.

## Pinout

Add a photo of the board with numbered pins here, followed by the completed table:

| Pin | Header | Signal | Connected subsystem | Notes |
| --- | --- | --- | --- | --- |
| 1 | To be numbered | To be completed | To be completed | To be completed |

The two ear motors do not have position feedback and are therefore not connected to this reader.

## Status LED

The analog reader has an addressable LED that can report the state of the analog-reading subsystem independently, for example by turning red when its diagnostic checks fail.

See [Hardware abstraction](../../../../firmware/hardware-abstraction) for the runtime analog configuration.
