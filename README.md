# ERP 自学 · self-taught erp

中英双语的 ERP(企业资源计划)自学网站:**10 个模块、30 章**,每章「沙盘 + 解释」——含 MRP、三单匹配、复式记账、角色驾驶舱,以及 **Three.js 多端协同 3D 场景**(供应商 / 工厂 / 办公室 / 仓库 / 客户)。

A bilingual (zh/en) self-study site for ERP: **10 modules, 30 chapters**, each "sandbox + explanation" — including MRP, three-way match, double-entry, role cockpits, and **Three.js multi-party 3D scenes** (supplier / plant / office / warehouse / customer).

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

### E10 多端协同（含 3D）

- **COL1** `collabWorld` — 可旋转 3D 五端地图,单据粒子在供应链上飞行
- **COL2** `e2eProgress` — 五泳道端到端进度板(顺利 / 缺料 / 信用阻塞)
- **COL3** `factoryTwin` — 3D 工厂工位孪生,工单令牌随报工前进

## 技术 Stack

无构建(no build):React 18 UMD + Babel standalone + marked + **Three.js r160**,浏览器里直接跑 JSX。进度/主题/语言保存在 `localStorage`(键 `erp_book_*`)。

- `index.html` — 入口(CDN + 各 jsx)
- `styles.css` / `erp.css` — 设计系统与沙盘样式
- `i18n.jsx` / `data.jsx` / `viz.jsx` / `viz2.jsx` / `viz3.jsx` / `pages.jsx` / `app.jsx`
- `content/<id>.<zh|en>.md` — 双语讲义(需 http 访问)

## 运行 Run

```bash
python -m http.server 5670 --directory D:/webcode/ERP_BOOK
```

打开 http://localhost:5670 — 3D 章建议从 http://localhost:5670/#/c/erp28 开始。

MIT · 2026
