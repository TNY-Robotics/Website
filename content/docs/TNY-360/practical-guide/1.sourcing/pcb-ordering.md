# PCB Ordering Guide

This guide provides detailed instructions on how to prepare and order the PCBs required for the TNY-360 robot build. It covers file preparation, recommended manufacturers, and tips for ensuring a successful order.

---

## PCB Files Preparation

For each of the 7 PCBs used in the TNY-360, you will find the design files in the [GitHub repository](https://github.com/TNY-Robotics/TNY-360/tree/main/Electronics/PCBs).

Each PCB folder contains these files :

- **Gerber Files:** These are the standard files required by PCB manufacturers to fabricate the boards. They include all the necessary layers (copper, silkscreen, solder mask, etc.) and drill information.
- **Bill of Materials (BOM):** A list of all the components needed for the PCB, including part numbers and recommended suppliers.
- **Pick and Place Files:** These files indicate the exact placement of components on the PCB, which can be used for automated assembly if supported by the manufacturer.

## Recommended Parameters for PCB Manufacturing

When placing your order with a PCB manufacturer, ensure you specify the following parameters to match the design requirements of the TNY-360 PCBs:

| Parameter         | Recommended Value | Description                                                                                   |
| ----------------- | ----------------- | --------------------------------------------------------------------------------------------- |
| Layers            | 2                 | Standard two-layer PCB for cost-effectiveness and sufficient functionality.                   |
| Board Thickness   | 1.6mm             | Standard thickness for durability and mechanical stability.                                   |
| Copper Weight     | 1oz (35µm)        | Standard copper thickness for reliable electrical performance.                                |
| Solder Mask Color | Black or Green    | Aesthetic choice. Green is more common and may be cheaper, while black can give a sleek look. |
| Silkscreen Color  | White             | Provides good contrast for component labels and markings.                                     |
| Material Type     | FR4               | Standard PCB material for reliability and performance.                                        |


::info-box{title="Servo board thickness" type="warning"}
Please use a **thickness of 0.8mm** for the Servo Board to ensure it fits properly within the MG996R servo casing.<br>
Using a thicker board may cause fitting issues and could require modifications of the servo shell.
::
