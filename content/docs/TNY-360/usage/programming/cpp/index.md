---
title: C++
description: Learn how to program your TNY-360 using C++.
---

# C++

Here is a test of code :

```cpp [test.cpp]
TNY360* robot = TNY360("192.168.1.42");
robot.connect();

if (robot.connected) {
    std::cout << "Robot connected" << std::endl;
} else {
    std::cout << "Robot not connected" << std::endl;
}
```