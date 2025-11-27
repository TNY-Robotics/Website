---
title: Programming in C++
description: Learn how to program your TNY-360 using C++, with examples, libraries, and best practices for effective development.
---

# Programming in C++
Here is a test of code :

```cpp [test.cpp]
#include <iostream>
#include "tny-360.hpp"

TNY360 robot("192.168.1.42");

std::cout << "Connecting to robot..." << std::endl;
bool success = robot.connect().wait();

if (success) {
    std::cout << "Robot connected" << std::endl;
} else {
    std::cout << "Robot not connected" << std::endl;
}
```