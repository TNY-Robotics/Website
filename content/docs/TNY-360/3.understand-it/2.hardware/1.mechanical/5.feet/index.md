# Feet design

The feet are the contact point between the robot and the ground. Their design combines mechanical compliance, grip, impact absorption, and sensing.

---

## Core design principles

The feet are designed to:

- Absorb part of the impact when the robot lands;
- Provide more grip than a rigid printed surface;
- Bring a magnet close to the foot's Hall-effect contact switch when the foot is pressed (see [Contact switches](../../../electrical/pcb-ecosystem/contact-switches)).

## Ground-contact detection

Each TPU foot integrates a 4x2mm magnet. Combined with the Hall-effect sensor on the contact-switch assembly, this allows the robot to detect when a foot is in contact with the ground.

When the foot is compressed against the ground, the distance between the magnet and the sensor changes. This change is detected by the Hall-effect sensor, which produces a signal that is sent to the robot's firmware.

The resulting signal gives the firmware information about whether a leg is bearing against the ground. It can support gait timing, stabilization, diagnostics, and future safeguards.
