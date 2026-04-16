# Soldering the PCBs

In this guide, we will cover the basics of soldering the PCBs for the TNY-360, and see what components go where on the boards.

---

## How to solder SMD components

Soldering Surface Mount Devices (SMD) is a bit more challenging than soldering through-hole components, but with the right tools and techniques, everyone can do it!

First of all, make sure you have a good quality tools to tackle the job, such as the ones listed in the [Component Sourcing section](./components#_1-get-the-necessary-tools).

### SMD components packaging

SMD components can come in different types of packaging, but the most common one you'll encounter is the **Tape and Reel** packaging.

This type of packaging consists of a long strip of paper-like material with pockets that hold the components in place, plus a fine transparent cover to keep them in place.

To access the components, carefully peel back the transparent cover to free the component from its pocket. Be gentle to avoid throwing the components around or losing them.

::info-box{title="Handling SMD components" type="tip"}
Use fine tweezers to handle the SMD components, especially the smaller ones. This will give you better control and precision when placing them on the PCB.
::

### Solder paste usage

If you choose to solder the boards yourself, you likely ordered some solder paste. Here's how to use it:

- **If you have a stencil**<br>
Place the stencil on top of the PCB, aligning the holes with the pads. Tape the stencil in place to prevent it from moving.<br>
Then, create a fat line of solder paste across the edge of the stencil, and use a squeegee, a card, or any flat edge to spread the paste across the stencil, filling the holes with the paste.<br>
Finally, carefully remove the stencil, leaving the solder paste deposited on the pads of the PCB.<br>

- **If you don't have a stencil**<br>
*Firtly, that's a shame*. You will have to be extra careful to avoid making a mess and creating solder bridges between the pads. But it's still doable!<br>
If your solder paste comes in a syringe, you can use the needle to apply small dots of solder paste directly onto the pads of the PCB. Take your time and be precise to avoid applying too much paste.<br>
If you did put too much paste, use a toothpick or tweezers to remove the excess (for example, between pads to avoid creating solder bridges).
If your solder paste doesn't come in a syringe, you can use a toothpick to pick up a small amount of paste and apply it to the pads. Again, be careful not to apply too much.

### Soldering process

For every PCB assembly, the process is the same:

1. Apply solder paste to the pads of the PCB (using a stencil or manually).
2. Place the components on the PCB. make sure the components are correctly oriented (check the markings on the PCB or the component datasheet if there is any confusion).
3. Once all the components are placed, use a hot plate or a reflow oven to heat the PCB to the melting point of the solder paste (around 220°C).
4. Inspect the PCB after soldering to ensure all components are properly soldered and there are no solder bridges or cold joints.

### Troubleshooting

If you encounter any issues during the soldering process, such as solder bridges, cold joints, or misaligned components, don't worry! These issues can be fixed with a bit of patience and the right tools.

Use a **soldering iron with a fine tip**, and some **solder flux**. Place the solder flux on the affected area, and then use the soldering iron to reflow the solder and fix the issue by brushing off the excess solder or repositioning the component.

---

Now that you know how to solder the PCBs, let's solder the boards!

::nav-buttons{right="The Plug PCB" right-link="./plug" right-icon="i-lucide-chevron-right"}