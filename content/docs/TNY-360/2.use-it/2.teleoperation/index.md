# Teleoperation

*A small step for your TNY-360, a giant leap towards learning robotics!*

In this section, we will explore the teleoperation feature of your TNY-360, and make it walk for the first time using a gamepad or a keyboard.

---

## Accessing the teleoperation page

Once your TNY-360 has been calibrated, it is ready to walk.

Connect to the robot's web interface. If you do not know how to connect to it, follow the [Getting Started](../get-started) guide first.

From the web interface, click the **Play with my TNY360** button to open the teleoperation page.

Once the teleoperation page is open, the robot will automatically stand up and be ready to walk.

## Controlling the robot

You can control your TNY-360 with a gamepad or with a keyboard.

When using a gamepad, the two joysticks have the following functions:

- **Left joystick:** translate the robot, moving it forwards, backwards, left, or right;
- **Right joystick:** rotate the robot to the left or right.

## Customizing the walk

You can customize the way your TNY-360 walks from the settings menu. Click the cog icon in the top-right corner of the teleoperation page to open it.

The following parameters are available:

### Gait type

The gait type determines the sequence in which the robot moves its feet:

- **Creep:** slow and stable. The robot moves one foot at a time, with three feet on the ground at all times;
- **Trot:** the default gait. The robot moves its front-left foot with its back-right foot, then its front-right foot with its back-left foot. Two feet are on the ground at all times;
- **Run:** the robot moves its front feet together, then its back feet together. Two feet are on the ground at all times, either at the front or at the back;
- **Jump:** all four feet leave the ground at the same time. This gait is only for fun and is not stable.

### Gait frequency

The gait frequency controls how quickly the robot switches between steps. A higher frequency makes the robot switch its feet faster.

### Gait ratio

The gait ratio controls how long the robot keeps its feet on the ground. A higher ratio means more time on the ground, while a lower ratio means more time in the air.

::info-box{title="Gait ratio warning" type="warning"}
For some gaits, a ratio below **0.5** can make the robot unstable because its feet stay in the air for too long. At a ratio of **1**, no feet are in the air, so the robot cannot move.
::

You are now ready to experiment with the different gaits and find the walking style that best suits your TNY-360!
