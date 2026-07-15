# Modifying the motors

Here's one of the most important steps of the build, and one of the best features of the TNY-360 : Getting feedback from the motors !

Don't worry, this step is pretty easy once explained, and we'll go through it together step by step.

---

## Understanding the modification

Before we start, let's talk a little bit about the motors of the TNY-360.

The robot uses a total of **12 MG996R motors**. These motors are called "servos" because they have a built-in feedback mechanism that allows them to know their position, and to move to a specific position when commanded.

MG996R motors are pretty common in the hobby robotics world, and are often used in projects that require a lot of torque, like robotic arms or legs.
But one of their biggest downsides is that **they don't provide any way to get feedback** from them out of the box, which means that **you can't know their position**.

### Getting the feedback out of the motors

Since MG996R motors *(and any other position-controlled servomotor)* have a built-in potentiometer that allows them to know their position, we can use this potentiometer to get feedback from the motors !

Getting the potentiometer feedback out of the motors is a bit tricky, but we'll be using the custom PCBs that we designed for the TNY-360 to do it!

If you want to learn more about this modification, check out the [MG996R Feedback Mod](../../../anatomy/electronics/mg996r-mod) page :)

---

## Section overview

This section will be splitted in 2 parts :

- [**Soldering the PCBs**](./soldering)<br>
    In this part, we'll be soldering the SMD components on the custom PCBs.

- [**Adding the custom PCBs**](./modifying)<br>
    Then, we'll use the custom PCBs to modify the motors and get the feedback out of them.

---

All clear ? Well, let's do it !

:nav-buttons{left="Preparing the components" left-link="./preparing" left-icon="lucide:chevron-left" right="Soldering the PCBs" right-link="./soldering" right-icon="lucide:chevron-right"}