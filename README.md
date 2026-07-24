# ERP 自学 · self-taught erp

中英双语的 ERP(企业资源计划)自学网站:**11 个模块、33 章**,每章「沙盘 + 解释」——含 MRP、三单匹配、角色驾驶舱、Three.js 多端协同,以及**工厂硬件图谱**(安灯、扫码、RFID、PLC、AGV…与 HARDWARE_BOOK 对照)。

A bilingual (zh/en) self-study site for ERP: **11 modules, 33 chapters**, each "sandbox + explanation" — including MRP, three-way match, role cockpits, Three.js multi-party scenes, and a **factory hardware map** (andon, scanners, RFID, PLC, AGV… bridged to HARDWARE_BOOK).

## 模块 Modules

| # | 模块 | Chapters |
| --- | --- | --- |
| E1 | ERP 基础与全景 Foundations | FD1–FD3 |
| E2 | 主数据与组织建模 Master Data | MD1–MD3 |
| E3 | 采购到付款 Procure-to-Pay | P2P1–P2P3 |
| E4 | 订单到收款 Order-to-Cash | O2C1–O2C3 |
| E5 | 生产与计划 Manufacturing & Planning | MFG1–MFG3 |
| E6 | 库存与仓储 Inventory & Warehousing | INV1–INV3 |
| E7 | 财务与成本 Finance & Controlling | FIN1–FIN3 |
| E8 | 实施与集成 Implementation & Integration | IMP1–IMP3 |
| E9 | 角色视角 Role Perspectives | ROLE1–ROLE3 |
| E10 | 多端协同与立体流转 Multi-party Sync | COL1–COL3 |
| E11 | 工厂硬件与现场采集 Factory Hardware | HW1–HW3 |

### E11 工厂硬件（结合 HARDWARE_BOOK）

- **HW1** `hwCatalog` — 15+ 类硬件图鉴(安灯/扫码/RFID/PLC/秤/标签机/拣选灯/AGV/视觉/IoT/考勤/边缘网关/语音拣选/扭矩工具…)映射到 ERP 单据
- **HW2** `andonBoard` — 安灯状态机:拉绳 → 响应 → 关闭原因码 → 冻结报工
- **HW3** `scanToPost` — 扫码/计件采集 → 边缘校验 → 幂等过账

## 技术 Stack

无构建:React 18 UMD + Babel + marked + Three.js r160。进度在 `localStorage`(`erp_book_*`)。

## 运行 Run

```bash
python -m http.server 5670 --directory D:/webcode/ERP_BOOK
```

打开 http://localhost:5670 — 硬件章从 http://localhost:5670/#/c/erp31 开始。

MIT · 2026
