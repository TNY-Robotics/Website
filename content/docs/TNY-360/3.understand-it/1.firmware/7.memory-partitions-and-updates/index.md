# Memory, partitions, and updates

The firmware does not treat the ESP32 flash as one undivided file system. Code, boot metadata, configuration, web files, and crash information are placed in separate partitions so that they can be updated and recovered independently.

---

## The flash layout

The current partition table contains:

| Partition | Type | Purpose |
| --- | --- | --- |
| `nvs` | Data | Persistent ESP32 system and radio configuration |
| `otadata` | Data | Selects the active OTA application slot |
| `phy_init` | Data | Wi-Fi PHY initialization data |
| `ota_0` | App | First firmware image slot, 5 MiB |
| `ota_1` | App | Second firmware image slot, 5 MiB |
| `userdata` | LittleFS | Robot configuration such as `settings.json`, 1 MiB |
| `storage` | LittleFS | Web interface files, 4 MiB |
| `coredump` | Data | Crash dump storage, 128 KiB |

The layout is defined in `partitions.csv` and is part of the firmware's memory contract. Changing it affects flashing, updates, and the data already stored on the robot.

::mermaid
```text
flowchart TB
    Flash[ESP32 flash]
    System[nvs + otadata + phy_init]
    Apps[ota_0 and ota_1]
    Userdata[userdata LittleFS]
    Storage[storage LittleFS]
    Crash[coredump]

    Flash --> System
    Flash --> Apps
    Flash --> Userdata
    Flash --> Storage
    Flash --> Crash
```
::

## Code and data are separate

The two application slots contain firmware images. They are not the same as the LittleFS partitions:

- `ota_0` and `ota_1` contain executable firmware;
- `userdata` contains robot-specific configuration;
- `storage` contains the browser interface and its assets.

This separation means that changing a pinout in `settings.json` does not require rebuilding the web interface, and replacing web assets does not alter the compiled control loop.

The hardware abstraction layer uses the `userdata` partition for `/userdata/settings.json`. See [Hardware abstraction](../hardware-abstraction) for the settings lifecycle.

## OTA updates

OTA means Over-The-Air: a new firmware image is transferred to the robot through the network instead of being written over the current image in place.

The safe high-level sequence is:

1. obtain the new firmware image;
2. write it to the inactive OTA slot;
3. verify that the image is valid;
4. update OTA metadata to select the new slot;
5. reboot into the new image;
6. keep the previous slot available for recovery if the new image fails.

::mermaid
```text
flowchart LR
    Current[Running image]
    Inactive[Inactive OTA slot]
    Verify[Verify image]
    Metadata[Update otadata]
    Reboot[Reboot]
    New[New active image]
    Rollback[Rollback to previous image]

    Current --> Inactive --> Verify
    Verify -->|valid| Metadata --> Reboot --> New
    Verify -->|invalid| Current
    New -->|boot failure| Rollback
```
::

The two-slot design avoids erasing the only known-good application before the replacement has been checked. The exact update trigger can come from the embedded web interface or the on-device update menu.

## Configuration survives firmware updates

Because `settings.json` is stored in `userdata`, it is conceptually separate from the application image. A firmware update should not need to recreate the user's hardware configuration.

The firmware still has to handle schema changes carefully. New versions may add fields, apply defaults to missing values, or require a migration path. A setting that changes hardware initialization is applied after reboot, not by silently replacing already-running drivers.

## Recovery and crash information

The boot path checks special states before starting normal operation. This allows the robot to enter diagnostic or update-related flows when requested.

The `coredump` partition stores crash information for failures that occur at runtime. It is not a normal user-data partition and should not be treated as general storage.

If an update or startup fails, recovery should preserve three principles:

- keep a known-good firmware image available;
- avoid destroying user configuration unnecessarily;
- make the failure visible through the local UI, LED, logs, or network interface.

For the diagnostics path after a successful boot, see [Diagnostics and calibration](../diagnostics-and-calibration).

## Why the partition boundaries matter

Partitioning is an operational safety feature, not only a build detail. It limits what an update can overwrite and makes it possible to reason about the lifetime of each kind of data:

| Data | Expected lifetime |
| --- | --- |
| Firmware image | Replaced by firmware updates |
| `settings.json` | Preserved across normal firmware updates |
| Web files | Replaced when the web interface is updated |
| NVS data | Managed by ESP32 services and firmware |
| Coredump | Replaced or cleared as crash records are handled |

The partition table must therefore be changed together with the flashing and update process, never as an isolated file edit.
