## Core notes

### Andon is a state machine, not mood lighting

Toyota-style **andon** means: anyone who sees an abnormality can make line state visible and force a response. Hardware usually includes:

- **Tower lights** (R/Y/G or multi-segment LED);
- **Cord / button / pedal** (debounced into MCU or PLC input);
- **Station or aisle screens** (station, reason, minutes waiting);
- **Audible/visual alarms** (factory-scale buzzers and LEDs from HARDWARE_BOOK).

Andon that never writes to the system only “lit up once”.

### Recommended state machine

```
Green (running) → Call (red) → Lead ack (amber) → Fix & clear → Green
                      ↓ timeout
                   Escalate to plant / planning / sales
```

Clearing **must** carry a reason code (material, equipment, quality, manpower…). Codes feed:

1. **Downtime** → OEE availability;
2. **Cost center / internal order** → who pays for the stop;
3. **WO freeze** → block fake confirms while red (same token discipline as COL3).

### Escalation ladder and outward impact

| Level | Trigger | Action |
| --- | --- | --- |
| L1 | Call | Team responds |
| L2 | Open longer than N minutes | Plant lead + materials/maintenance |
| L3 | Quality or due-date risk | Planning re-promises; portal milestone may update |

If a material andon dies in a WeChat group while sales still promises on-time, the plant lane on the COL2 board is lying.

### Lock points with ERP/MES

- MES: timestamps for call / ack / clear in real time;
- ERP: receives rolled-up downtime and WO state (not always per-second, but **never lost**);
- Forbid: station UI still allows “complete 100%” while red.

## Exercises

1. Set timeout minutes and CC roles for each of four reason codes.
2. Sketch an andon-clear form: which fields are mandatory, which auto-fill.
3. Explain why clearing as “Other” every time poisons OEE and cost analysis.
