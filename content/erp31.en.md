## Core notes

### ERP has no eyes of its own

If the plant relies on office keyboards for confirmations and GR/GI, progress, stock and cost lag by design. **Hardware is the nerve ending of ERP/MES**: it turns physical events into postable signals and messages.

That matches **HARDWARE_BOOK**’s spine — sensors read the world, actuators/displays make it visible, buses and MCUs ship the signal — assembled on the floor into andon, scanners, PLCs and edge gateways.

### Zone hardware map (learn many classes)

| Zone | Common hardware | Typical writes |
| --- | --- | --- |
| **Line** | Andon towers/cords, station tablets/HMI, PLC/CNC, smart torque, IoT vibration/energy | Downtime codes, confirmations, utilization, mandatory QI |
| **Warehouse** | Handheld/fixed scanners, RFID gates, RF guns, pick-to-light, voice pick, labelers | GR/GI, pick confirm, batch/serial labels |
| **QI** | Checkweighers, vision/AOI, temp/RH probes | Pass/fail, scrap reason, env breaches |
| **Logistics** | AGV/AMR, conveyor photoeyes | Bin transfers, line-side delivery done |
| **Infra** | Edge gateways, IPCs, time clocks/access, industrial switches/UPS | Protocol convert, offline buffer, labor & identity |

Open each card in the sandbox: hardware shape → floor event → ERP/MES document → HARDWARE_BOOK bridge.

### Rollout priority (practical order)

**Wave one (usually best ROI)**:

1. Barcode/QR scanners + label printers (make material and docs scannable);
2. Station tablets or simple confirm terminals (end end-of-shift backfill);
3. Andon (exceptions visible, downtime measurable);
4. Stable wired/wireless network and edge buffering.

**Wave two**: PLC/OPC-UA piece counts, RFID gates, pick-to-light, checkweigh and vision.  
**Wave three**: AGV fleets and plant-wide twin walls — without waves one and two, the wall is a cartoon.

### Concept bridge to HARDWARE_BOOK

| HARDWARE_BOOK | Factory landing |
| --- | --- |
| Sensors (light, temp/RH, load, distance) | Scan engines, env probes, checkweighers, photoeyes |
| Actuators & displays (LED, buzzer, screens) | Andon towers, pick lights, HMI |
| Digital I/O / debounce | Andon cords, confirm buttons |
| MCU (Arduino/ESP/Pico mindset) | Edge nodes, protocol gateways |
| UART / I²C / SPI | Grown into RS-485/Modbus, CAN, EtherNet/IP, OPC-UA |

You study hardware not to solder perfboard on the line, but to **understand integrators** and judge whether a chain will write dirty signals into the ledger.

### Fake-ERP symptoms without hardware

- Books match reality only on count day;
- WO progress is the supervisor’s verbal report;
- OEE is all green while customers miss dates;
- Andon lights that never post — red as ambience.

## Exercises

1. List a wave-one four-item BOM for an assembly plant; write the cost of *not* buying each.
2. Choose RFID gate or fixed mount scanner; say which fits pallet GR vs piece confirmation better.
3. In HARDWARE_BOOK vocabulary, trace an andon cord press to a red tower light through likely layers.
