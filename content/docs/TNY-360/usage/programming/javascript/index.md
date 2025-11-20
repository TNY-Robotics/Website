---
title: JavaScript
description: Learn how to program your TNY-360 using JavaScript.
---

# JavaScript

Here is a test of code :

```js [test.js]
robot = new TNY360('192.168.1.42')

if (robot.connected) {
    alert("Robot connected");
} else {
    alert("Robot not connected");
}
```