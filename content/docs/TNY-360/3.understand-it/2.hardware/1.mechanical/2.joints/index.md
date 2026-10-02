# Joint design and protection

The TNY-360 joints must be precise enough for locomotion while surviving repeated loads and occasional falls. Their design combines rigid support, controlled travel, and calibration references.

---

## The disk technique

The joint structure uses disks to reduce unwanted flex around the articulation. Keeping the motor and joint support aligned helps the actuator apply its torque to the intended axis, and avoids the servomotor's axle from bending under load.

This improves repeatability and makes the relationship between commanded angle and actual body position easier to model.

### YouTube Video

As we document the entire robot, videos are being produced to explain these mechanical concepts in detail.

If you want to learn more about this disk technique, see the [:icon{name="lucide:play"} YouTube video](https://youtu.be/tYgDMAzQG5E).

## Mechanical stops

Mechanical stops can be found in the joint structure. They serve two main purposes:

- **Protect the actuator and printed structure from excessive travel**

    Servomotors can be damaged if they are forced to rotate beyond their physical limits. The mechanical stops prevent the joint from reaching a position that would damage the motor or the printed structure.

- **Provide a repeatable physical reference for calibration**

    The TNY-360 has [automatic calibration routines](../../../firmware/diagnostics-and-calibration) that use the physical stops to measure the joint's travel range. This allows the firmware to know the exact position of each joint, check for assembly errors, and automatically center the servomotor.
