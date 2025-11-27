---
title: Programming in JavaScript
description: Learn how to program your TNY-360 using JavaScript, with examples, libraries, and best practices for effective development.
---

# Programming in JavaScript
Here is a test of code :

```js [test.js]
import { TNY360 } from 'tny-360';

const robot = new TNY360('192.168.1.42')

console.log("Connecting to robot...");
const success = await robot.connect();

if (success) {
    console.log("Robot connected");
} else {
    console.log("Robot not connected");
}
```