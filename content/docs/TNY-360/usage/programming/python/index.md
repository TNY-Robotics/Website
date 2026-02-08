---
title: Programming in Python
description: Learn how to program your TNY-360 using Python, with examples, libraries, and best practices for effective development.
---

# Programming in Python

::in-progress
::

It should look something like this, though :
```py [test.py]
from tny_360 import TNY360

robot = TNY360('192.168.1.42')

print("Connecting to robot...")
success = robot.connect()

if success:
    print("Robot connected")
else:
    print("Robot not connected")
```