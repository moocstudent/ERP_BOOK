/* =========================================================
   Curriculum data — 11 modules / 34 chapters
   ---------------------------------------------------------
   Metadata only (bilingual). The teaching content ("解释")
   for each chapter lives in content/<id>.<lang>.md and is
   fetched on demand by the chapter page. `viz` names an
   interactive business sandbox ("沙盘") from viz.jsx / viz2.jsx / viz3.jsx.
   `props` lists the key ERP concepts the chapter leans on.
   ========================================================= */

const MODULES = [
  {
    id: "e1", code: "E1", accent: "primary", level: 1,
    zh: "ERP 基础与全景", en: "Foundations & the Big Picture",
    tagline: { zh: "ERP 不是一个软件,是一套「让企业只有一个事实」的方法。", en: "ERP is not a piece of software — it is a method for giving the enterprise a single version of the truth." },
    description: {
      zh: "从 1960 年代的 MRP 到今天的云 ERP 与 AI 嵌入,ERP 的核心思想只有一个:把分散在各部门的账本合并成同一套数据。本模块建立全景:ERP 解决什么问题、企业业务流程如何跨部门流转、市场上有哪些主流产品与流派。",
      en: "From 1960s MRP to today's cloud ERP with embedded AI, the core idea has never changed: merge the ledgers scattered across departments into one shared dataset. This module builds the big picture — what problem ERP solves, how business processes cross departmental walls, and who the major products and schools of thought are.",
    },
  },
  {
    id: "e2", code: "E2", accent: "primary", level: 1,
    zh: "主数据与组织建模", en: "Master Data & Org Modeling",
    tagline: { zh: "流程是水,主数据是河道:河道错了,水一定流错。", en: "Processes are the water; master data is the riverbed. A wrong riverbed guarantees the water flows wrong." },
    description: {
      zh: "上线一套 ERP,一大半工夫花在建模:公司、工厂、仓库、销售组织怎么映射成系统里的组织单元;物料、客户、供应商、科目表这些主数据怎么定义。本模块讲清「静态数据」的设计——它决定了后面所有单据的走向。",
      en: "Half the work of any ERP rollout is modeling: mapping companies, plants, warehouses and sales organizations onto system org units, and defining the master data — materials, customers, vendors, the chart of accounts. This module covers the design of static data, which predetermines the path of every document that follows.",
    },
  },
  {
    id: "e3", code: "E3", accent: "primary", level: 2,
    zh: "采购到付款 P2P", en: "Procure-to-Pay",
    tagline: { zh: "从「我要买」到「钱付了」,每一步都留下一张单据。", en: "From 'we need to buy' to 'the money is paid', every step leaves a document behind." },
    description: {
      zh: "采购到付款是最经典的 ERP 闭环:采购申请 → 采购订单 → 收货 → 发票校验 → 付款。本模块走完全流程,重点讲三单匹配如何防错防弊,以及供应商管理与寻源如何决定采购质量。",
      en: "Procure-to-pay is the classic ERP loop: purchase requisition → purchase order → goods receipt → invoice verification → payment. This module walks the full flow, focusing on how three-way match prevents both error and fraud, and how vendor management and sourcing decide purchasing quality.",
    },
  },
  {
    id: "e4", code: "E4", accent: "primary", level: 2,
    zh: "订单到收款 O2C", en: "Order-to-Cash",
    tagline: { zh: "接单容易,按时发货、收回钱难。", en: "Taking an order is easy; delivering on time and collecting the cash is the hard part." },
    description: {
      zh: "订单到收款是企业的收入引擎:报价 → 销售订单 → 发货 → 开票 → 应收。本模块讲透可承诺量检查(ATP)如何决定交期承诺、信用管理如何拦截坏账、应收账龄如何暴露回款风险。",
      en: "Order-to-cash is the revenue engine: quotation → sales order → delivery → billing → receivables. This module digs into how available-to-promise decides the delivery dates you commit to, how credit management intercepts bad debt, and how AR aging exposes collection risk.",
    },
  },
  {
    id: "e5", code: "E5", accent: "accent", level: 3,
    zh: "生产与计划", en: "Manufacturing & Planning",
    tagline: { zh: "计划是 ERP 的心脏:MRP 每晚一跑,全厂知道明天干什么。", en: "Planning is ERP's heart: one MRP run each night tells the whole plant what tomorrow looks like." },
    description: {
      zh: "这是 ERP 的历史起点,也是逻辑最密的模块:从 S&OP 到主生产计划,再到 MRP 逐层展开——毛需求、净需求、计划订单;然后落到车间:生产工单、领料、报工、完工入库。学完它,你就懂了 ERP 的「计算内核」。",
      en: "This is where ERP historically began, and it is the most logic-dense module: from S&OP to the master production schedule, into the level-by-level MRP explosion — gross requirements, net requirements, planned orders — then down to the shop floor: production orders, material issues, confirmations, goods receipt of finished goods. Master this and you understand ERP's computational core.",
    },
  },
  {
    id: "e6", code: "E6", accent: "primary", level: 2,
    zh: "库存与仓储", en: "Inventory & Warehousing",
    tagline: { zh: "账实相符四个字,是整套 ERP 的信用基础。", en: "'Books match reality' — four words on which the credibility of the whole ERP rests." },
    description: {
      zh: "库存是业务与财务的交汇点:每一次收发存都同时改变数量与金额。本模块讲库存模型(类型、移动、批次)、补货策略(安全库存与再订货点),以及库存估价(移动平均、先进先出、标准成本)——它直接决定资产负债表上的存货数字。",
      en: "Inventory is where operations meet finance: every movement changes both a quantity and a value. This module covers the stock model (types, movements, batches), replenishment policy (safety stock and reorder point), and inventory valuation — moving average, FIFO, standard cost — which directly sets the inventory figure on the balance sheet.",
    },
  },
  {
    id: "e7", code: "E7", accent: "accent", level: 3,
    zh: "财务与成本", en: "Finance & Controlling",
    tagline: { zh: "业务每动一下,财务自动记一笔——这就是业财一体。", en: "Every operational move books itself automatically — that is finance-operations integration." },
    description: {
      zh: "ERP 与记账软件的本质区别:分录不是财务手工录的,而是收货、发货、报工这些业务动作自动抛转的。本模块从复式记账讲起,走完应付应收与月结流程,最后进入管理会计:成本中心、费用分摊与产品成本卷积。",
      en: "The essential difference between ERP and bookkeeping software: journal entries are not typed by accountants — they are auto-posted by operational events like goods receipts, deliveries and confirmations. This module starts from double-entry, walks AP/AR and the month-end close, then enters management accounting: cost centers, allocations and product cost roll-up.",
    },
  },
  {
    id: "e8", code: "E8", accent: "accent", level: 3,
    zh: "实施与集成", en: "Implementation & Integration",
    tagline: { zh: "ERP 项目失败,几乎从来不是软件问题。", en: "When an ERP project fails, it is almost never the software's fault." },
    description: {
      zh: "买对软件只是开始:蓝图设计、数据迁移、双轨并行、上线切换,每一步都有成熟方法论与著名翻车案例。本模块讲实施项目怎么管、ERP 如何与 MES/CRM/电商通过 API 与 EDI 集成,以及云化、选型与 AI 趋势。",
      en: "Buying the right software is only the start: blueprint design, data migration, parallel running and cutover each have mature methodologies — and famous disasters. This module covers how implementation projects are run, how ERP integrates with MES/CRM/e-commerce via APIs and EDI, and where cloud, selection and AI trends are heading.",
    },
  },
  {
    id: "e9", code: "E9", accent: "primary", level: 2,
    zh: "角色视角:谁在用 ERP", en: "Role Perspectives: Who Uses ERP",
    tagline: { zh: "同一套系统,总经理看例外,仓管员扫条码——角色不同,世界不同。", en: "Same system, different worlds: the CEO watches exceptions; the warehouse clerk scans barcodes." },
    description: {
      zh: "流程视角讲「事怎么走」,角色视角讲「人怎么用」。本模块按管理者与一线使用者拆开 ERP:总经理与 CFO 看什么仪表盘,销售/采购/计划/仓库/车间每天点哪些单据,权限与职责分离如何防舞弊——换一双鞋,再走进同一套系统。",
      en: "Process views show how work flows; role views show how people use the system. This module opens ERP by persona: what dashboards the CEO and CFO watch, which documents sales/purchasing/planning/warehouse/shop-floor touch each day, and how authorization and segregation of duties stop fraud — same system, different shoes.",
    },
  },
  {
    id: "e10", code: "E10", accent: "accent", level: 2,
    zh: "多端协同与立体流转", en: "Multi-party Sync & Spatial Flow",
    tagline: { zh: "供应商、工厂、办公室、仓库、客户——五端同时动,ERP 是共享的进度条。", en: "Supplier, plant, office, warehouse, customer — five ends move at once; ERP is the shared progress bar." },
    description: {
      zh: "单据不只在公司内部流转,还穿过上下游与客户。本模块用 3D 场景与端到端进度板,把「一张订单如何同时点亮五端」可视化:谁在等、卡在哪张单、现场工位与系统状态怎样对齐。",
      en: "Documents do not stay inside one company — they cross suppliers, plants and customers. This module uses a 3D scene and an end-to-end progress board to show how one order lights up five ends at once: who is waiting, which document is stuck, and how shop-floor stations stay aligned with system status.",
    },
  },
  {
    id: "e11", code: "E11", accent: "primary", level: 2,
    zh: "工厂硬件与现场采集", en: "Factory Hardware & Floor Capture",
    tagline: { zh: "ERP 不会自己长眼睛——安灯、扫码枪、PLC 才是工厂端的神经末梢。", en: "ERP has no eyes of its own — andon, scanners and PLCs are the plant's nerve endings." },
    description: {
      zh: "办公室录单撑不起真实工厂。本模块从硬件图谱、安灯、扫码过账讲到协议分层:现场常用 RS-485/Modbus 把设备串起来,边缘网关再经 MQTT/HTTPS 对接 MES/ERP——对照 HARDWARE_BOOK 的传感与总线,把「电信号」翻译成「单据」。",
      en: "Typing in the office cannot run a real plant. This module goes from hardware maps, andon and scan-to-post into protocol layering: RS-485/Modbus often links devices on the floor, then an edge gateway speaks MQTT/HTTPS to MES/ERP — bridging HARDWARE_BOOK sensing and buses so electrical signals become documents.",
    },
  },
];

const CHAPTERS = [
  /* ============ E1 ERP 基础与全景 ============ */
  {
    id: "erp1", code: "FD1", moduleId: "e1", difficulty: 1, hours: 3, prereq: [], viz: "erpEvolution",
    props: ["MRP", "MRP II", "ERP", "云 ERP / Cloud ERP", "一体化 / integration"],
    title: { zh: "什么是 ERP:从物料清单到一体化", en: "What is ERP: From Parts Lists to Integration" },
    summary: {
      zh: "1960 年代的工厂只想算清「造 100 辆自行车要买多少辐条」,六十年后这个算法长成了管理整个企业的系统。理解 MRP → MRP II → ERP → 云 ERP 的演化,就理解了 ERP 每个模块存在的理由。",
      en: "In the 1960s a factory just wanted to know how many spokes to buy for 100 bicycles; sixty years later that calculation has grown into a system that runs entire enterprises. Understand the MRP → MRP II → ERP → cloud evolution and you understand why every ERP module exists.",
    },
    objectives: [
      { zh: "说清 ERP 与记账软件、Excel 台账的本质区别", en: "Articulate how ERP fundamentally differs from bookkeeping software and Excel trackers" },
      { zh: "讲出 MRP → MRP II → ERP → 云 ERP 各阶段解决的新问题", en: "Name the new problem each stage solved: MRP → MRP II → ERP → cloud ERP" },
      { zh: "理解「单一事实来源」为什么是 ERP 的核心价值", en: "Understand why a single source of truth is ERP's core value" },
      { zh: "能画出一家制造企业的核心信息流草图", en: "Sketch the core information flows of a manufacturing company" },
    ],
    outline: [
      { zh: "信息孤岛:各部门各记各的账会发生什么", en: "Information silos: what happens when every department keeps its own books" },
      { zh: "MRP 的诞生:库存 + BOM + 提前期的一次计算", en: "The birth of MRP: one calculation over stock, BOM and lead times" },
      { zh: "MRP II 与闭环:产能、财务加入计算", en: "MRP II and closing the loop: capacity and finance join in" },
      { zh: "ERP 与云时代:一套数据库管全企业,再到订阅制", en: "ERP and the cloud era: one database for the enterprise, then subscription" },
    ],
  },
  {
    id: "erp2", code: "FD2", moduleId: "e1", difficulty: 1, hours: 3, prereq: ["erp1"], viz: "processFlow",
    props: ["业务流程 / business process", "部门协同", "单据流 / document flow", "端到端 / end-to-end"],
    title: { zh: "业务流程:一张订单穿过整个公司", en: "Business Processes: One Order Crosses the Whole Company" },
    summary: {
      zh: "客户下了一张 500 台的订单,销售、计划、采购、车间、仓库、财务各自要做什么?跟着这张订单走一遍公司,看清「流程」为什么必须跨部门,而 ERP 为什么必须一体化。",
      en: "A customer orders 500 units — what must sales, planning, purchasing, the shop floor, the warehouse and finance each do? Follow the order through the company and see why processes must cross departments, and why ERP must be integrated.",
    },
    objectives: [
      { zh: "用泳道图描述一个跨部门端到端流程", en: "Describe an end-to-end cross-departmental process with a swimlane diagram" },
      { zh: "识别流程中的关键交接点与常见断点", en: "Identify the key hand-offs in a process and where they typically break" },
      { zh: "理解「单据」是流程在系统里的化身", en: "See documents as the system's embodiment of a process" },
      { zh: "分清三大核心闭环:P2P、O2C、计划到生产", en: "Distinguish the three core loops: P2P, O2C, plan-to-produce" },
    ],
    outline: [
      { zh: "部门视角 vs 流程视角:职能墙与穿墙的订单", en: "Department view vs. process view: functional walls and the order that crosses them" },
      { zh: "泳道图:角色、活动、交接与系统动作", en: "Swimlanes: roles, activities, hand-offs and system actions" },
      { zh: "单据流:申请、订单、收发货单、发票如何前后引用", en: "Document flow: how requisitions, orders, delivery notes and invoices reference each other" },
      { zh: "三大闭环总览与本课程的学习路径", en: "The three loops at a glance, and this course's path through them" },
    ],
  },
  {
    id: "erp3", code: "FD3", moduleId: "e1", difficulty: 1, hours: 3, prereq: ["erp1"], viz: "marketMap",
    props: ["SAP", "Oracle", "用友 / 金蝶", "Odoo / 开源", "垂直行业 ERP"],
    title: { zh: "ERP 市场版图:厂商、流派与选择", en: "The ERP Landscape: Vendors, Schools, Choices" },
    summary: {
      zh: "SAP 与 Oracle 统治大企业,用友金蝶深耕本土财务,Odoo 靠开源与模块化吃下中小企业,还有无数行业专属 ERP。看懂市场版图,才能在概念学习与将来选型时对号入座。",
      en: "SAP and Oracle rule the enterprise, Yonyou and Kingdee own local finance, Odoo wins SMEs with open source and modularity — plus countless vertical ERPs. Reading this landscape correctly anchors both your concept learning and any future selection.",
    },
    objectives: [
      { zh: "按企业规模与行业给主流 ERP 厂商定位", en: "Position the major ERP vendors by company size and industry" },
      { zh: "理解套装 ERP、开源 ERP 与自研的取舍", en: "Weigh packaged ERP vs. open-source ERP vs. building your own" },
      { zh: "了解各家对同一概念的不同叫法", en: "Recognize different vendor names for the same concept" },
      { zh: "知道评估一款 ERP 应看的核心维度", en: "Know the core dimensions for evaluating an ERP product" },
    ],
    outline: [
      { zh: "两大巨头:SAP 与 Oracle 的产品线与理念", en: "The two giants: SAP's and Oracle's product lines and philosophies" },
      { zh: "本土力量:用友、金蝶与财务基因", en: "The local powers: Yonyou, Kingdee and their finance DNA" },
      { zh: "开源与新势力:Odoo、ERPNext 与 SaaS 原生厂商", en: "Open source and challengers: Odoo, ERPNext and SaaS-native vendors" },
      { zh: "同义词对照表:一个概念在各家叫什么", en: "A synonym table: one concept, many vendor names" },
    ],
  },

  /* ============ E2 主数据与组织建模 ============ */
  {
    id: "erp4", code: "MD1", moduleId: "e2", difficulty: 1, hours: 4, prereq: ["erp2"], viz: "orgModel",
    props: ["公司代码 / company code", "工厂 / plant", "库存地点 / storage location", "销售组织 / sales org"],
    title: { zh: "组织建模:把公司画进系统", en: "Org Modeling: Drawing the Company into the System" },
    summary: {
      zh: "集团、法人、工厂、仓库、销售大区——现实中的组织如何映射成系统里的组织单元?建错组织结构是 ERP 项目最贵的错误,因为所有单据、库存与报表都挂在它上面。",
      en: "Group, legal entity, plant, warehouse, sales region — how does a real organization map onto system org units? Getting this wrong is the most expensive ERP mistake, because every document, stock quantity and report hangs off it.",
    },
    objectives: [
      { zh: "掌握公司代码、工厂、库存地点、销售组织的层级关系", en: "Master the hierarchy of company code, plant, storage location and sales org" },
      { zh: "理解法人边界决定账套边界", en: "Understand why legal-entity boundaries define ledger boundaries" },
      { zh: "能为一家两法人三工厂的企业设计组织模型", en: "Design the org model for a two-entity, three-plant enterprise" },
      { zh: "知道组织结构一旦上线为何难以更改", en: "Know why org structures are so hard to change after go-live" },
    ],
    outline: [
      { zh: "现实组织 vs 系统组织:不是一比一照抄", en: "Real orgs vs. system orgs: not a one-to-one copy" },
      { zh: "财务视角:公司代码与科目表的挂接", en: "The finance view: company codes and their chart of accounts" },
      { zh: "物流视角:工厂、库存地点与仓库", en: "The logistics view: plants, storage locations, warehouses" },
      { zh: "销售视角:销售组织、分销渠道与产品组", en: "The sales view: sales orgs, distribution channels, divisions" },
    ],
  },
  {
    id: "erp5", code: "MD2", moduleId: "e2", difficulty: 2, hours: 4, prereq: ["erp4"], viz: "materialMaster",
    props: ["物料主数据 / material master", "物料类型", "计量单位 / UoM", "视图 / views", "客商主数据"],
    title: { zh: "物料与客商:主数据的一物一档", en: "Materials & Partners: One Record to Rule Each Thing" },
    summary: {
      zh: "同一颗螺丝,采购叫它「M6 螺栓」,仓库叫它「六角螺丝」,财务按「五金耗材」记账——ERP 用一条物料主数据终结混乱。理解主数据的多视图结构,你就理解了部门如何共享同一条记录。",
      en: "The same screw: purchasing calls it 'M6 bolt', the warehouse says 'hex screw', finance books it as 'hardware consumables' — ERP ends the chaos with one material master record. Understand its multi-view structure and you understand how departments share a single record.",
    },
    objectives: [
      { zh: "说清物料主数据的视图结构与各视图归属部门", en: "Explain the material master's view structure and which department owns each view" },
      { zh: "掌握物料类型、计量单位与物料组的作用", en: "Master material types, units of measure and material groups" },
      { zh: "理解客户与供应商主数据的关键字段", en: "Understand the key fields of customer and vendor master data" },
      { zh: "建立主数据治理意识:重复、错漏的代价", en: "Build governance awareness: the cost of duplicates and errors" },
    ],
    outline: [
      { zh: "为什么要有主数据:一物多名的灾难现场", en: "Why master data exists: the disaster of many names for one thing" },
      { zh: "物料主数据解剖:基本、采购、销售、库存、财务视图", en: "Anatomy of the material master: basic, purchasing, sales, storage, accounting views" },
      { zh: "客户与供应商:往来户主数据与付款条款", en: "Customers and vendors: partner master data and payment terms" },
      { zh: "主数据治理:编码规则、审批流与数据责任人", en: "Governance: numbering rules, approval flows, data owners" },
    ],
  },
  {
    id: "erp6", code: "MD3", moduleId: "e2", difficulty: 2, hours: 5, prereq: ["erp5"], viz: "bomExplosion",
    props: ["BOM 物料清单", "层级展开 / explosion", "工艺路线 / routing", "工作中心 / work center"],
    title: { zh: "BOM 与工艺路线:产品的配方与做法", en: "BOM & Routing: the Product's Recipe and Method" },
    summary: {
      zh: "BOM 回答「用什么造」,工艺路线回答「怎么造、在哪造、多久」。这两份主数据是 MRP 计算与产品成本的共同地基——改动一行 BOM,计划与成本同时改变。",
      en: "The BOM answers 'made of what'; the routing answers 'made how, where, and how long'. Together they are the shared foundation of MRP and product costing — change one BOM line and both planning and cost change with it.",
    },
    objectives: [
      { zh: "读懂多层 BOM 并手工展开需求数量", en: "Read a multi-level BOM and explode quantities by hand" },
      { zh: "理解用量、损耗率与替代料的表达", en: "Express quantities-per, scrap factors and substitute components" },
      { zh: "掌握工艺路线:工序、工作中心与工时", en: "Master routings: operations, work centers, standard times" },
      { zh: "知道 BOM 版本与生效日期如何管理变更", en: "Manage change with BOM versions and validity dates" },
    ],
    outline: [
      { zh: "单层与多层 BOM:父项、子项与层级码", en: "Single- vs. multi-level BOMs: parents, components, level codes" },
      { zh: "数量逻辑:单位用量、批量用量与损耗", en: "Quantity logic: per-unit, per-lot and scrap" },
      { zh: "工艺路线:工序顺序、工作中心与准备/加工工时", en: "Routing: operation sequence, work centers, setup and run times" },
      { zh: "工程变更:版本、生效日期与新旧料切换", en: "Engineering change: versions, effectivity dates, phase-in/out" },
    ],
  },

  /* ============ E3 采购到付款 ============ */
  {
    id: "erp7", code: "P2P1", moduleId: "e3", difficulty: 2, hours: 4, prereq: ["erp5"], viz: "p2pFlow",
    props: ["采购申请 / PR", "采购订单 / PO", "审批流 / approval", "单据流"],
    title: { zh: "采购流程:从申请到订单", en: "Purchasing: From Requisition to Order" },
    summary: {
      zh: "车间说「料快没了」,到供应商收到一张有法律效力的采购订单,中间隔着申请、审批、询价、定价。走一遍采购前半程,看懂每张单据的字段与承接关系。",
      en: "Between the shop floor saying 'we're running low' and a supplier holding a legally binding purchase order sit requisition, approval, sourcing and pricing. Walk the first half of P2P and read every document's fields and hand-offs.",
    },
    objectives: [
      { zh: "分清采购申请与采购订单的角色", en: "Distinguish the roles of purchase requisition and purchase order" },
      { zh: "理解审批策略:金额、品类与授权矩阵", en: "Understand release strategies: value, category, authority matrix" },
      { zh: "掌握价格来源:信息记录、合同与询报价", en: "Know where prices come from: info records, contracts, RFQs" },
      { zh: "能画出 PR → PO 的完整单据流", en: "Draw the complete PR → PO document flow" },
    ],
    outline: [
      { zh: "需求从哪来:手工申请、MRP 建议与再订货点", en: "Where demand originates: manual PRs, MRP proposals, reorder points" },
      { zh: "审批策略:谁能批多大金额", en: "Release strategy: who may approve how much" },
      { zh: "定价:采购信息记录、框架协议与询报价", en: "Pricing: info records, outline agreements, RFQs" },
      { zh: "采购订单解剖:抬头、行项目与交货计划", en: "PO anatomy: header, line items, delivery schedule" },
    ],
  },
  {
    id: "erp8", code: "P2P2", moduleId: "e3", difficulty: 2, hours: 5, prereq: ["erp7"], viz: "threeWayMatch",
    props: ["收货 / goods receipt", "三单匹配 / 3-way match", "发票校验", "GR/IR 暂估", "容差 / tolerance"],
    title: { zh: "收货与三单匹配:付款前的最后防线", en: "Goods Receipt & Three-Way Match: the Last Line Before Payment" },
    summary: {
      zh: "订了 100 个、到了 95 个、发票开了 105 个——该付多少钱?三单匹配把订单、收货单、发票放在一起对数量对价格,是 ERP 里最著名的内控设计。",
      en: "Ordered 100, received 95, invoiced 105 — how much do you pay? Three-way match lines up the PO, the goods receipt and the invoice, quantity against quantity, price against price: ERP's most famous internal control.",
    },
    objectives: [
      { zh: "走通收货 → 发票校验 → 付款的后半程", en: "Walk the second half of P2P: receipt → invoice verification → payment" },
      { zh: "掌握三单匹配的数量与价格核对逻辑", en: "Master the quantity and price checks of three-way match" },
      { zh: "理解容差:什么偏差自动放行、什么触发冻结", en: "Understand tolerances: what passes automatically, what blocks" },
      { zh: "理解收货即入账:GR/IR 暂估科目的作用", en: "See how receipts post instantly: the role of the GR/IR clearing account" },
    ],
    outline: [
      { zh: "收货:参照订单收、检验与上架", en: "Goods receipt: against the PO, inspection, putaway" },
      { zh: "三单匹配:逐行核对数量与价格", en: "Three-way match: line-by-line quantity and price checks" },
      { zh: "容差与例外:冻结发票的处理流程", en: "Tolerances and exceptions: handling blocked invoices" },
      { zh: "GR/IR:货到票未到的会计处理", en: "GR/IR: accounting for goods received, invoice pending" },
    ],
  },
  {
    id: "erp9", code: "P2P3", moduleId: "e3", difficulty: 2, hours: 4, prereq: ["erp7"], viz: "vendorScore",
    props: ["供应商评估 / vendor rating", "寻源 / sourcing", "框架协议", "货源清单 / source list"],
    title: { zh: "供应商管理:评估、寻源与协议", en: "Vendor Management: Rating, Sourcing, Agreements" },
    summary: {
      zh: "价格最低的供应商,交货老是迟到,质量还不稳——到底该给谁下单?供应商评估把价格、交期、质量做成量化评分,寻源策略与框架协议再把「选谁、买多少」固化成规则。",
      en: "The cheapest vendor delivers late and their quality wobbles — so who gets the order? Vendor rating quantifies price, delivery and quality into scores; sourcing strategy and outline agreements then turn 'who and how much' into rules.",
    },
    objectives: [
      { zh: "设计一个多维度加权的供应商评分模型", en: "Design a multi-criteria weighted vendor scoring model" },
      { zh: "理解交期、质量数据如何从单据自动沉淀", en: "See how delivery and quality data accumulate automatically from documents" },
      { zh: "掌握框架协议与配额安排的用法", en: "Use outline agreements and quota arrangements" },
      { zh: "了解集中采购与分散采购的组织取舍", en: "Weigh centralized vs. decentralized purchasing" },
    ],
    outline: [
      { zh: "评估维度:价格、交期、质量、服务与权重", en: "Rating criteria: price, delivery, quality, service — and weights" },
      { zh: "数据来源:收货准时率与检验合格率的自动统计", en: "Data sources: on-time-delivery and inspection pass rates, computed automatically" },
      { zh: "寻源工具:货源清单、配额与框架协议", en: "Sourcing tools: source lists, quotas, outline agreements" },
      { zh: "供应商生命周期:准入、绩效、淘汰", en: "Vendor lifecycle: onboarding, performance, phase-out" },
    ],
  },

  /* ============ E4 订单到收款 ============ */
  {
    id: "erp10", code: "O2C1", moduleId: "e4", difficulty: 2, hours: 4, prereq: ["erp5"], viz: "o2cFlow",
    props: ["报价 / quotation", "销售订单 / sales order", "交货单 / delivery", "拣配发货", "单据流"],
    title: { zh: "销售流程:从报价到发货", en: "Sales: From Quotation to Shipment" },
    summary: {
      zh: "订单到收款的前半程:报价、接单、创建交货单、拣货、过账发货。发货过账是 O2C 里第一笔「业务动财务」的时刻——库存减少、成本结转,全部自动发生。",
      en: "The first half of O2C: quote, take the order, create the delivery, pick, post goods issue. Goods issue is the first moment in O2C where operations moves finance — stock drops and cost of goods sold posts, all automatically.",
    },
    objectives: [
      { zh: "走通报价 → 订单 → 交货 → 发货的单据链", en: "Walk the quotation → order → delivery → goods issue chain" },
      { zh: "理解销售订单的定价过程:价格、折扣、税", en: "Understand order pricing: prices, discounts, taxes" },
      { zh: "掌握交货单与拣配、批次确定的关系", en: "Relate deliveries to picking and batch determination" },
      { zh: "理解发货过账触发的库存与会计变化", en: "See the stock and accounting impact of posting goods issue" },
    ],
    outline: [
      { zh: "售前:询价、报价与报价有效期", en: "Pre-sales: inquiries, quotations, validity" },
      { zh: "销售订单解剖:售达方、送达方、定价与计划行", en: "Order anatomy: sold-to, ship-to, pricing, schedule lines" },
      { zh: "仓库执行:交货单、拣货与装运", en: "Warehouse execution: delivery, picking, shipping" },
      { zh: "发货过账:数量、成本与所有权的同时转移", en: "Goods issue: quantity, cost and title move together" },
    ],
  },
  {
    id: "erp11", code: "O2C2", moduleId: "e4", difficulty: 3, hours: 5, prereq: ["erp10"], viz: "atpCheck",
    props: ["可承诺量 / ATP", "信用管理 / credit", "计划行 / schedule line", "交期承诺"],
    title: { zh: "ATP 与信用:接单前的两道闸门", en: "ATP & Credit: Two Gates Before You Accept" },
    summary: {
      zh: "客户问「下周五能交 300 台吗」,销售拍胸脯之前,系统先算:现有库存 + 在途在产 − 已承诺 = 可承诺量;再看:这家客户的欠款加上这单,超没超信用额度。两道闸门,一道保交付,一道保回款。",
      en: "Customer asks: '300 units by next Friday?' Before sales promises anything, the system computes on-hand + inbound − already-committed = available-to-promise, then checks whether this order pushes the customer past their credit limit. Two gates: one protects delivery, the other protects cash.",
    },
    objectives: [
      { zh: "手工计算一条 ATP 时间轴", en: "Compute an ATP timeline by hand" },
      { zh: "理解已承诺量:先来的订单锁定库存", en: "Understand commitments: earlier orders lock stock" },
      { zh: "掌握信用额度检查的公式与拦截动作", en: "Master the credit-check formula and blocking actions" },
      { zh: "了解缺货时的分配策略与部分交货", en: "Know allocation strategies and partial deliveries under shortage" },
    ],
    outline: [
      { zh: "ATP 公式:现有 + 计划流入 − 已承诺", en: "The ATP formula: on-hand + planned receipts − commitments" },
      { zh: "检查时点:下单时算,改单重算", en: "When checks run: at order entry, again on changes" },
      { zh: "信用暴露:应收 + 未清订单 + 在途", en: "Credit exposure: receivables + open orders + in transit" },
      { zh: "拦截之后:冻结、审批放行与额度调整", en: "After the block: holds, release approvals, limit changes" },
    ],
  },
  {
    id: "erp12", code: "O2C3", moduleId: "e4", difficulty: 2, hours: 4, prereq: ["erp10"], viz: "arAging",
    props: ["开票 / billing", "应收 / AR", "账龄 / aging", "收款核销", "坏账"],
    title: { zh: "开票与应收:把发货变成现金", en: "Billing & Receivables: Turning Shipments into Cash" },
    summary: {
      zh: "发货只是收入的开始:开票产生应收,收款核销应收,拖着不付的进账龄表。账龄每多滚 30 天,回款概率就掉一截——应收管理是把「纸面收入」变成「银行存款」的最后一棒。",
      en: "Shipping is only the start of revenue: billing raises a receivable, incoming payment clears it, and whatever drags lands in the aging report. Every 30 days a receivable ages, its collection odds drop — AR management is the last leg turning paper revenue into bank balance.",
    },
    objectives: [
      { zh: "理解开票如何参照交货单并自动生成分录", en: "See how billing references the delivery and auto-posts entries" },
      { zh: "掌握收款核销:先进先出、指定核销与差额", en: "Master cash application: FIFO, targeted clearing, residuals" },
      { zh: "会读账龄表并识别回款风险", en: "Read an aging report and spot collection risk" },
      { zh: "了解催收流程与坏账计提", en: "Know dunning procedures and bad-debt provisions" },
    ],
    outline: [
      { zh: "开票:参照交货、发票分录与税", en: "Billing: reference to delivery, invoice postings, tax" },
      { zh: "收款:银行到账与未清项核销", en: "Payment: bank receipt and open-item clearing" },
      { zh: "账龄分析:区间、DSO 与风险信号", en: "Aging analysis: buckets, DSO, warning signs" },
      { zh: "催收与坏账:催款等级到计提核销", en: "Dunning and bad debt: levels through provision and write-off" },
    ],
  },

  /* ============ E5 生产与计划 ============ */
  {
    id: "erp13", code: "MFG1", moduleId: "e5", difficulty: 2, hours: 4, prereq: ["erp6"], viz: "planningPyramid",
    props: ["S&OP", "主生产计划 / MPS", "需求管理", "计划层级", "滚动计划"],
    title: { zh: "计划体系:从年度到本周的层层落地", en: "The Planning Stack: From Annual to This Week" },
    summary: {
      zh: "「明年卖多少」到「这周产线排什么」,中间隔着一整套计划层级:销售与运营计划定总量,主生产计划定型号与周次,MRP 再算到每颗物料。看懂这座金字塔,后面的 MRP 才有上下文。",
      en: "Between 'how much will we sell next year' and 'what runs on the line this week' sits a whole planning hierarchy: S&OP sets volumes, the master production schedule fixes models and weeks, MRP computes down to every component. See the pyramid first — MRP only makes sense inside it.",
    },
    objectives: [
      { zh: "分清 S&OP、MPS、MRP 三层的输入输出与周期", en: "Separate S&OP, MPS and MRP by inputs, outputs and cadence" },
      { zh: "理解预测与实际订单如何合成需求", en: "See how forecasts and real orders combine into demand" },
      { zh: "掌握滚动计划与时栅/冻结期的概念", en: "Master rolling plans and time fences / frozen zones" },
      { zh: "了解按库存生产与按订单生产的计划策略", en: "Know make-to-stock vs. make-to-order planning strategies" },
    ],
    outline: [
      { zh: "计划金字塔:期间、颗粒度与责任人", en: "The planning pyramid: horizon, granularity, owners" },
      { zh: "需求管理:预测消耗与订单承接", en: "Demand management: forecast consumption by orders" },
      { zh: "MPS:关键产品的主计划与粗产能", en: "MPS: master scheduling key products, rough-cut capacity" },
      { zh: "时栅:冻结期内为什么不许改计划", en: "Time fences: why the frozen zone resists change" },
    ],
  },
  {
    id: "erp14", code: "MFG2", moduleId: "e5", difficulty: 3, hours: 6, prereq: ["erp13"], viz: "mrpRun",
    props: ["MRP 运算", "毛需求 / 净需求", "BOM 展开", "提前期偏置", "批量规则 / lot sizing"],
    title: { zh: "MRP 运算:需求如何逐层展开", en: "The MRP Run: Exploding Demand Level by Level" },
    summary: {
      zh: "ERP 最核心的一次计算:拿到成品需求,减库存得净需求,按 BOM 乘用量往下炸一层,再按提前期往前推日期——逐层重复,直到最底层的螺丝钉。本章手把手拆解这套算法。",
      en: "ERP's single most important calculation: take finished-goods demand, net it against stock, explode one BOM level down multiplying by usage, offset dates back by lead time — and repeat level by level down to the last screw. This chapter dismantles the algorithm step by step.",
    },
    objectives: [
      { zh: "手工完成一个两层 BOM 的完整 MRP 展开", en: "Run a complete two-level MRP explosion by hand" },
      { zh: "掌握净需求公式:毛需求 − 库存 − 在途", en: "Master netting: gross requirements − stock − open receipts" },
      { zh: "理解提前期偏置如何倒推下单日期", en: "Understand lead-time offsetting of order dates" },
      { zh: "比较批对批、固定批量、定期批量的效果", en: "Compare lot-for-lot, fixed and period lot-sizing" },
    ],
    outline: [
      { zh: "输入:需求、库存、在途、BOM、提前期", en: "Inputs: demand, stock, open receipts, BOM, lead times" },
      { zh: "净算:毛需求到净需求", en: "Netting: gross to net requirements" },
      { zh: "展开与偏置:逐层下炸、日期前推", en: "Explosion and offsetting: down a level, back in time" },
      { zh: "输出:计划订单、采购申请与例外信息", en: "Outputs: planned orders, purchase requisitions, exception messages" },
    ],
  },
  {
    id: "erp15", code: "MFG3", moduleId: "e5", difficulty: 3, hours: 5, prereq: ["erp14"], viz: "workOrder",
    props: ["生产工单 / production order", "领料 / goods issue", "报工 / confirmation", "完工入库", "在制品 / WIP"],
    title: { zh: "车间执行:工单、领料与报工", en: "Shop-Floor Execution: Orders, Issues, Confirmations" },
    summary: {
      zh: "计划订单一转成生产工单,车间的一天就开始了:领料把原料变成在制品,报工记录工时与产出,完工入库把在制品变成成品。每一步都同时动库存、动成本——这正是业财一体在车间的样子。",
      en: "Convert a planned order into a production order and the shop floor's day begins: material issues turn raw stock into WIP, confirmations log hours and output, goods receipt turns WIP into finished goods. Every step moves both stock and cost — finance-operations integration, shop-floor edition.",
    },
    objectives: [
      { zh: "走通工单生命周期:创建、下达、报工、完工、关闭", en: "Walk the order lifecycle: create, release, confirm, complete, close" },
      { zh: "理解领料与倒冲的差别与适用场景", en: "Contrast picking issues with backflushing and when each fits" },
      { zh: "掌握报工数据:工时、合格数、报废数", en: "Capture confirmations: hours, yield, scrap" },
      { zh: "理解在制品成本的归集与结转", en: "Understand WIP cost collection and settlement" },
    ],
    outline: [
      { zh: "工单解剖:组件清单、工序与状态链", en: "Order anatomy: component list, operations, status chain" },
      { zh: "领料与倒冲:何时扣料、差异从哪来", en: "Issue vs. backflush: when stock moves, where variances arise" },
      { zh: "报工:数量、工时与自动过账", en: "Confirmation: quantities, times, automatic postings" },
      { zh: "完工与差异:入库、工单结算与料工费分析", en: "Completion and variance: receipt, settlement, cost breakdown" },
    ],
  },

  /* ============ E6 库存与仓储 ============ */
  {
    id: "erp16", code: "INV1", moduleId: "e6", difficulty: 2, hours: 4, prereq: ["erp5"], viz: "stockMovement",
    props: ["库存类型 / stock type", "移动类型 / movement type", "批次 / batch", "库存转移", "盘点"],
    title: { zh: "库存模型:类型、移动与批次", en: "The Stock Model: Types, Movements, Batches" },
    summary: {
      zh: "同样 1000 件库存:800 件非限制、150 件质检中、50 件已冻结——能卖的只有 800。ERP 用库存类型、移动类型与批次把「一堆货」变成一套精确的状态机,每一次收发都有据可查。",
      en: "The same 1,000 units: 800 unrestricted, 150 in quality inspection, 50 blocked — only 800 are sellable. ERP turns 'a pile of goods' into a precise state machine of stock types, movement types and batches, with every movement accounted for.",
    },
    objectives: [
      { zh: "掌握非限制、质检、冻结三种库存状态", en: "Master unrestricted, in-inspection and blocked stock" },
      { zh: "理解移动类型:每种收发对应的编码与分录", en: "Understand movement types: codes and postings per movement" },
      { zh: "掌握批次管理与效期、追溯的关系", en: "Relate batch management to shelf life and traceability" },
      { zh: "了解周期盘点与年度盘点的差异处理", en: "Handle count differences in cycle and annual counting" },
    ],
    outline: [
      { zh: "库存状态机:三种类型与状态转移", en: "The stock state machine: three types and their transitions" },
      { zh: "移动类型:收货、发货、转储、报废", en: "Movement types: receipts, issues, transfers, scrapping" },
      { zh: "批次:效期、先进先出与召回追溯", en: "Batches: shelf life, FIFO picking, recall tracing" },
      { zh: "盘点:账实差异的调整与审计要求", en: "Physical inventory: adjusting book-to-actual, audit demands" },
    ],
  },
  {
    id: "erp17", code: "INV2", moduleId: "e6", difficulty: 2, hours: 4, prereq: ["erp16"], viz: "reorderPoint",
    props: ["安全库存 / safety stock", "再订货点 / reorder point", "提前期需求", "服务水平", "EOQ"],
    title: { zh: "安全库存与再订货点:补货的数学", en: "Safety Stock & Reorder Point: the Math of Replenishment" },
    summary: {
      zh: "库存太多压资金,太少断生产——补货策略就是在两者之间找平衡点。再订货点 = 提前期需求 + 安全库存,一条锯齿曲线讲清什么时候订货、订多少,以及安全库存到底在保什么险。",
      en: "Too much stock ties up cash; too little stops production — replenishment policy walks the line between them. Reorder point = lead-time demand + safety stock: one sawtooth curve explains when to order, how much, and exactly what risk safety stock insures against.",
    },
    objectives: [
      { zh: "计算再订货点:日均需求 × 提前期 + 安全库存", en: "Compute the reorder point: daily demand × lead time + safety stock" },
      { zh: "理解安全库存对冲的两种波动:需求与交期", en: "See the two variabilities safety stock hedges: demand and lead time" },
      { zh: "理解服务水平与安全库存的非线性关系", en: "Grasp the nonlinear link between service level and safety stock" },
      { zh: "了解经济订货批量 EOQ 的思想与局限", en: "Know the EOQ idea and its limits" },
    ],
    outline: [
      { zh: "锯齿曲线:消耗、订货点、到货的循环", en: "The sawtooth: consumption, trigger, arrival, repeat" },
      { zh: "再订货点公式与各参数的估计", en: "The reorder-point formula and estimating its inputs" },
      { zh: "安全库存:波动、服务水平与 σ 的角色", en: "Safety stock: variability, service level, the role of σ" },
      { zh: "订多少:EOQ 与实践中的批量规则", en: "How much: EOQ and practical lot-size rules" },
    ],
  },
  {
    id: "erp18", code: "INV3", moduleId: "e6", difficulty: 3, hours: 5, prereq: ["erp16"], viz: "valuation",
    props: ["移动平均 / moving average", "先进先出 / FIFO", "标准成本 / standard cost", "存货价值", "价差"],
    title: { zh: "库存估价:这批货到底值多少钱", en: "Inventory Valuation: What Is This Stock Worth" },
    summary: {
      zh: "先按 10 元买了 100 个,又按 13 元买了 100 个,领用 120 个该记多少成本?移动平均、先进先出、标准成本给出三个不同答案——而答案直接改写资产负债表与利润表。",
      en: "You bought 100 at ¥10, then 100 more at ¥13, and now issue 120 — what cost do you book? Moving average, FIFO and standard cost give three different answers, and the answer rewrites both the balance sheet and the P&L.",
    },
    objectives: [
      { zh: "手工计算移动平均价的逐笔更新", en: "Update a moving average price by hand, receipt by receipt" },
      { zh: "掌握 FIFO 分层出库的成本计算", en: "Cost issues from FIFO layers" },
      { zh: "理解标准成本与价差科目的机制", en: "Understand standard costing and price-difference accounts" },
      { zh: "能比较三种方法在涨价周期下的报表影响", en: "Compare the three methods' statement impact when prices rise" },
    ],
    outline: [
      { zh: "为什么需要估价方法:同物不同价的现实", en: "Why valuation methods exist: same item, different prices" },
      { zh: "移动平均:每次收货重算单价", en: "Moving average: reprice at every receipt" },
      { zh: "先进先出:成本分层与出库次序", en: "FIFO: cost layers and issue order" },
      { zh: "标准成本:定价入账、差异归集", en: "Standard cost: fixed booking price, variance collection" },
    ],
  },

  /* ============ E7 财务与成本 ============ */
  {
    id: "erp19", code: "FIN1", moduleId: "e7", difficulty: 2, hours: 5, prereq: ["erp8"], viz: "doubleEntry",
    props: ["复式记账", "借贷 / debit & credit", "科目表 / CoA", "自动过账", "业财一体"],
    title: { zh: "复式记账与自动过账:业务如何变成分录", en: "Double-Entry & Auto-Posting: How Business Becomes Journal Entries" },
    summary: {
      zh: "收一次货,系统立刻记「借:原材料,贷:应付暂估」;发一次货,立刻记「借:主营成本,贷:库存商品」。本章从复式记账的第一性原理讲起,看懂 ERP 里每张业务单据背后自动生成的借贷分录。",
      en: "Post a goods receipt and the system instantly books 'Dr Raw Materials / Cr GR-IR'; post a goods issue and it books 'Dr COGS / Cr Finished Goods'. Starting from first principles of double-entry, this chapter reads the automatic journal entry behind every operational document.",
    },
    objectives: [
      { zh: "掌握借贷规则:资产、负债、收入、费用的方向", en: "Master debit/credit direction for assets, liabilities, revenue, expense" },
      { zh: "读懂科目表的结构与科目分类", en: "Read a chart of accounts and its account classes" },
      { zh: "写出 P2P 与 O2C 关键节点的自动分录", en: "Write the auto-postings at the key P2P and O2C events" },
      { zh: "理解科目确定:系统怎么知道该记哪个科目", en: "Understand account determination: how the system picks accounts" },
    ],
    outline: [
      { zh: "复式记账:每笔业务动两个以上科目", en: "Double-entry: every event touches at least two accounts" },
      { zh: "科目表:资产负债表科目与损益科目", en: "The chart of accounts: balance-sheet vs. P&L accounts" },
      { zh: "业务事件与分录对照:收货、发票、发货、收款", en: "Event-to-entry map: receipt, invoice, issue, payment" },
      { zh: "科目确定:物料分类 + 移动类型 → 科目", en: "Account determination: material class + movement type → account" },
    ],
  },
  {
    id: "erp20", code: "FIN2", moduleId: "e7", difficulty: 3, hours: 5, prereq: ["erp19"], viz: "monthEnd",
    props: ["应付 / AP", "应收 / AR", "总账 / GL", "月结 / month-end close", "对账"],
    title: { zh: "总账、明细账与月结:每月一次的收官", en: "GL, Subledgers & the Month-End Close" },
    summary: {
      zh: "平时业务自动记账,月底财务要「关账」:核对明细账与总账、清 GR/IR、计提折旧与费用、结转损益、出三大报表。月结是 ERP 财务的节拍器——本章按清单走完一个完整的月结。",
      en: "Business posts itself all month; at month-end finance closes the books: reconcile subledgers to the GL, clear GR/IR, accrue depreciation and expenses, roll P&L into retained earnings, produce the statements. The close is ERP finance's metronome — this chapter walks one complete close, checklist in hand.",
    },
    objectives: [
      { zh: "理解总账与应收应付明细账的对账关系", en: "Reconcile AR/AP subledgers to the general ledger" },
      { zh: "掌握月结清单:计提、摊销、清账、结转", en: "Master the close checklist: accruals, amortization, clearing, carry-forward" },
      { zh: "理解期间控制:为什么要关闭过账期间", en: "Understand period control: why posting periods get locked" },
      { zh: "能从试算平衡表读出三大报表的雏形", en: "Read the trial balance into draft financial statements" },
    ],
    outline: [
      { zh: "账簿体系:总账、明细账与统驭科目", en: "The ledger system: GL, subledgers, reconciliation accounts" },
      { zh: "月结清单:从止单到出表的十个步骤", en: "The close checklist: ten steps from cutoff to statements" },
      { zh: "计提与摊销:权责发生制的体现", en: "Accruals and deferrals: accrual accounting in action" },
      { zh: "期间锁定与审计轨迹", en: "Period locking and the audit trail" },
    ],
  },
  {
    id: "erp21", code: "FIN3", moduleId: "e7", difficulty: 3, hours: 5, prereq: ["erp19"], viz: "costRollup",
    props: ["成本中心 / cost center", "费用分摊 / allocation", "成本卷积 / cost roll-up", "料工费", "差异分析"],
    title: { zh: "成本中心与产品成本:一台产品的成本从哪来", en: "Cost Centers & Product Cost: Where a Unit's Cost Comes From" },
    summary: {
      zh: "财务会计回答「公司赚了多少」,管理会计回答「哪个产品、哪个部门赚的」。费用先归集到成本中心,再经分摊与工时费率进入产品;BOM 与工艺路线一卷积,一台产品的料、工、费便水落石出。",
      en: "Financial accounting answers 'how much did the company make'; management accounting answers 'which product, which department'. Expenses collect in cost centers, flow through allocations and activity rates into products; roll up the BOM and routing, and a unit's material, labor and overhead stand revealed.",
    },
    objectives: [
      { zh: "区分财务会计与管理会计的目标", en: "Separate financial from management accounting" },
      { zh: "掌握成本中心归集与分摊的两步法", en: "Master the two steps: collect in cost centers, then allocate" },
      { zh: "手工完成一次两层 BOM 的成本卷积", en: "Roll up cost through a two-level BOM by hand" },
      { zh: "会做实际 vs 标准的差异分析", en: "Analyze actual-vs-standard variances" },
    ],
    outline: [
      { zh: "成本对象:成本中心、内部订单与产品", en: "Cost objects: cost centers, internal orders, products" },
      { zh: "分摊:分摊基准与作业费率", en: "Allocation: bases and activity rates" },
      { zh: "成本卷积:BOM × 价格 + 工时 × 费率", en: "Roll-up: BOM × prices + hours × rates" },
      { zh: "差异分析:价差、量差与效率差", en: "Variance analysis: price, quantity, efficiency" },
    ],
  },

  /* ============ E8 实施与集成 ============ */
  {
    id: "erp22", code: "IMP1", moduleId: "e8", difficulty: 3, hours: 5, prereq: ["erp2"], viz: "implPlan",
    props: ["实施方法论", "业务蓝图 / blueprint", "UAT", "上线切换 / cutover", "变更管理"],
    title: { zh: "实施方法论:从蓝图到上线", en: "Implementation: From Blueprint to Go-Live" },
    summary: {
      zh: "ERP 项目动辄百万投入、半年到数年周期,失败率却居高不下——而失败原因几乎总是管理而非软件。本章讲实施五阶段:准备、蓝图、实现、测试、上线,以及每阶段最容易翻车的地方。",
      en: "ERP projects burn serious money over six months to several years, yet failure rates stay stubbornly high — and the cause is almost always management, not software. This chapter covers the five phases — preparation, blueprint, realization, testing, go-live — and where each most often goes wrong.",
    },
    objectives: [
      { zh: "掌握实施五阶段的产出物与里程碑", en: "Know each phase's deliverables and milestones" },
      { zh: "理解业务蓝图:现状、未来与差异分析", en: "Understand blueprinting: as-is, to-be, fit-gap" },
      { zh: "分清单元测试、集成测试与 UAT", en: "Distinguish unit, integration and user-acceptance testing" },
      { zh: "了解切换策略:一次切换、并行与分步", en: "Compare cutover strategies: big bang, parallel, phased" },
    ],
    outline: [
      { zh: "五阶段地图:时间、角色与产出", en: "The five-phase map: time, roles, deliverables" },
      { zh: "蓝图:流程访谈、差异清单与二开决策", en: "Blueprint: process workshops, gap lists, customization calls" },
      { zh: "测试金字塔与真实数据演练", en: "The test pyramid and rehearsals with real data" },
      { zh: "上线:切换清单、应急预案与超级用户", en: "Go-live: cutover checklist, fallback plan, super users" },
    ],
  },
  {
    id: "erp23", code: "IMP2", moduleId: "e8", difficulty: 3, hours: 5, prereq: ["erp22"], viz: "integration",
    props: ["数据迁移", "API / REST", "EDI", "中间件 / iPaaS", "主数据同步"],
    title: { zh: "数据迁移与系统集成", en: "Data Migration & Integration" },
    summary: {
      zh: "老系统里十年的物料、客商与未清单据怎么搬进新 ERP?上线后 MES、CRM、电商、银行又怎么和 ERP 实时对话?迁移决定上线成败,集成决定 ERP 能否成为真正的数据中枢。",
      en: "How do ten years of materials, partners and open documents move from the legacy system into the new ERP? And after go-live, how do MES, CRM, e-commerce and banks talk to it in real time? Migration decides whether go-live succeeds; integration decides whether ERP truly becomes the data hub.",
    },
    objectives: [
      { zh: "设计迁移范围:主数据、期初余额与未清单据", en: "Scope a migration: master data, opening balances, open items" },
      { zh: "掌握清洗、映射、试迁移、核对的循环", en: "Run the cleanse-map-trial-verify cycle" },
      { zh: "分清 API、EDI、文件与消息队列的适用场景", en: "Match APIs, EDI, files and message queues to their use cases" },
      { zh: "理解集成的错误处理与幂等设计", en: "Grasp error handling and idempotency in integrations" },
    ],
    outline: [
      { zh: "迁移对象分类与优先级", en: "What migrates: categories and priorities" },
      { zh: "迁移循环:清洗 → 映射 → 试跑 → 核对", en: "The migration loop: cleanse → map → trial → reconcile" },
      { zh: "集成方式:点对点、中间件与事件驱动", en: "Integration styles: point-to-point, middleware, event-driven" },
      { zh: "典型场景:MES 报工、电商订单、银企直联", en: "Typical scenes: MES confirmations, e-commerce orders, bank connectivity" },
    ],
  },
  {
    id: "erp24", code: "IMP3", moduleId: "e8", difficulty: 2, hours: 4, prereq: ["erp22"], viz: "tcoCompare",
    props: ["选型 / selection", "TCO 总拥有成本", "云 ERP / SaaS", "二次开发", "AI 趋势"],
    title: { zh: "选型、云化与趋势:下一个十年的 ERP", en: "Selection, Cloud & Trends: ERP's Next Decade" },
    summary: {
      zh: "本地部署一次性投入大、掌控力强;云 ERP 订阅制起步轻、随人数滚雪球——五年总拥有成本怎么算?再加上低代码、组合式 ERP 与嵌入式 AI,选型这道题的变量正越来越多。终章给你一套评估框架。",
      en: "On-premise means heavy upfront spend and full control; cloud ERP starts light but subscription costs snowball with headcount — how do you compare five-year TCO? Add low-code, composable ERP and embedded AI, and selection keeps gaining variables. The final chapter hands you an evaluation framework.",
    },
    objectives: [
      { zh: "搭建一个五年 TCO 对比模型", en: "Build a five-year TCO comparison model" },
      { zh: "掌握选型流程:需求清单、演示脚本与打分", en: "Run a selection: requirement list, demo scripts, scoring" },
      { zh: "理解「标准优先、少改二开」的原则与例外", en: "Understand 'standard first, customize last' — and its exceptions" },
      { zh: "了解组合式 ERP 与 AI 嵌入的趋势", en: "Survey composable ERP and embedded-AI trends" },
    ],
    outline: [
      { zh: "部署形态:本地、私有云、公有云 SaaS", en: "Deployment: on-premise, private cloud, public SaaS" },
      { zh: "TCO 模型:许可、实施、运维与隐性成本", en: "The TCO model: licenses, implementation, operations, hidden costs" },
      { zh: "选型方法:长名单到打分卡", en: "Selection method: long list to scorecard" },
      { zh: "趋势:组合式、低代码与 AI 助手", en: "Trends: composable, low-code, AI copilots" },
    ],
  },

  /* ============ E9 角色视角 ============ */
  {
    id: "erp25", code: "ROLE1", moduleId: "e9", difficulty: 1, hours: 3, prereq: ["erp2"], viz: "roleDesk",
    props: ["角色 / persona", "管理驾驶舱 / cockpit", "KPI", "例外管理 / exception Mgmt", "CFO / CEO"],
    title: { zh: "高层与财务:驾驶舱里的 ERP", en: "Executives & Finance: ERP from the Cockpit" },
    summary: {
      zh: "总经理早上打开的不是采购订单,而是「交期违约 12 单、超期应收 ¥280 万、本月毛利率跌 1.2 个点」。CFO 盯现金与关账进度,总账会计盯分录与期间。本章从管理层与财务角色走进 ERP——他们几乎不录单据,却决定系统值不值得上。",
      en: "The CEO does not open purchase orders in the morning — she opens '12 late deliveries, ¥2.8M overdue AR, margin down 1.2 pts this month'. The CFO watches cash and close progress; the GL accountant watches journals and periods. This chapter enters ERP through executive and finance roles — they rarely enter documents, yet decide whether the system is worth having.",
    },
    objectives: [
      { zh: "说清管理层用 ERP 看的是例外与趋势,不是单据录入", en: "Explain that leaders use ERP for exceptions and trends, not data entry" },
      { zh: "对照 CEO、CFO、总账会计各自的首页与核心 KPI", en: "Contrast the home screens and KPIs of CEO, CFO and GL accountant" },
      { zh: "理解「下钻」:从红灯指标点进单据与责任人", en: "Understand drill-down: from a red KPI into documents and owners" },
      { zh: "知道财务角色如何用期间控制与关账清单约束业务", en: "See how finance uses period control and close checklists to constrain ops" },
    ],
    outline: [
      { zh: "角色 ≠ 部门:同一个人可兼多个角色,权限按角色授", en: "Role ≠ department: one person can wear many roles; rights follow roles" },
      { zh: "CEO 驾驶舱:交付、毛利、库存周转与例外清单", en: "CEO cockpit: delivery, margin, inventory turns, exception list" },
      { zh: "CFO 视角:现金、应收账龄、应付到期与关账进度", en: "CFO view: cash, AR aging, AP due, close progress" },
      { zh: "总账会计:自动过账复核、期间开关与科目余额核对", en: "GL accountant: auto-post review, period switches, account reconciliation" },
    ],
  },
  {
    id: "erp26", code: "ROLE2", moduleId: "e9", difficulty: 2, hours: 4, prereq: ["erp25", "erp7", "erp10"], viz: "dayInLife",
    props: ["销售 / sales", "采购 / buyer", "计划员 / planner", "仓管 / warehouse", "车间 / shop floor"],
    title: { zh: "业务一线:一天里点哪些单据", en: "Front-line Ops: Which Documents a Day Touches" },
    summary: {
      zh: "销售员从报价到信用检查,采购员从申请到催货,计划员处理 MRP 例外,仓管员扫码收发,车间主任报工入库——一线用户才是 ERP「每天在跑」的人。跟着五个角色各过一天,看清菜单背后连着哪条闭环。",
      en: "Sales moves from quote to credit check, buyers from requisition to expediting, planners clear MRP exceptions, warehouse clerks scan receipts and issues, supervisors confirm and receive — front-line users are who make ERP 'run every day'. Follow five roles through a workday and see which loop each menu tile belongs to.",
    },
    objectives: [
      { zh: "为销售、采购、计划、仓库、车间各画出「一日关键动作」", en: "Sketch a day's key actions for sales, purchasing, planning, warehouse and shop floor" },
      { zh: "把每个动作映射到 P2P / O2C / 计划到生产的具体单据", en: "Map each action onto a concrete P2P / O2C / plan-to-produce document" },
      { zh: "识别一线最常踩的坑:跳过参照、事后补录、例外不处理", en: "Name the classic front-line traps: skipping references, backfilling, ignoring exceptions" },
      { zh: "理解「超级用户」为何是上线后的关键角色", en: "Understand why the super user is the critical post-go-live role" },
    ],
    outline: [
      { zh: "销售一天:报价 → 订单 → ATP/信用 → 催交与改单", en: "A sales day: quote → order → ATP/credit → expedite & change" },
      { zh: "采购一天:申请转订单 → 跟催 → 价格异常处理", en: "A buyer day: PR→PO → expedite → price-exception handling" },
      { zh: "计划一天:读 MRP 例外 → 改计划订单 → 重跑局部", en: "A planner day: MRP exceptions → reschedule → local re-run" },
      { zh: "仓库与车间:扫码过账、差异处理与报工闭环", en: "Warehouse & shop floor: scan-posting, variance handling, confirmation loop" },
    ],
  },
  {
    id: "erp27", code: "ROLE3", moduleId: "e9", difficulty: 2, hours: 4, prereq: ["erp25", "erp8"], viz: "sodMatrix",
    props: ["权限 / authorization", "职责分离 / SoD", "角色设计", "内控 / internal control", "审计轨迹"],
    title: { zh: "权限与职责分离:谁能做什么", en: "Authorization & SoD: Who May Do What" },
    summary: {
      zh: "ERP 最危险的配置不是算错 MRP,而是「同一个人既能下采购订单又能做收货又能过发票」——舞弊的温床。本章讲角色与权限如何设计、职责分离(SoD)冲突怎么查、审计轨迹如何追溯每一次点击。",
      en: "The most dangerous ERP misconfiguration is not a wrong MRP — it is giving one person create-PO, goods-receipt and invoice-post rights together: a fraud incubator. This chapter covers designing roles and authorizations, detecting segregation-of-duties conflicts, and how the audit trail reconstructs every click.",
    },
    objectives: [
      { zh: "用「最小权限」原则为一个岗位设计角色包", en: "Design a role pack for a job under least privilege" },
      { zh: "识别至少五组经典的职责分离冲突", en: "Identify at least five classic segregation-of-duties conflicts" },
      { zh: "理解审批流与权限的分工:能做 ≠ 能批", en: "Separate 'can execute' from 'can approve' in workflows vs. rights" },
      { zh: "知道审计如何从变更日志与单据流还原事实", en: "Know how audit reconstructs facts from change logs and document flow" },
    ],
    outline: [
      { zh: "角色、配置文件与用户:三层权限模型", en: "Roles, profiles and users: the three-layer auth model" },
      { zh: "职责分离矩阵:采购×收货×付款等冲突对", en: "SoD matrix: conflicting pairs like buy × receive × pay" },
      { zh: "审批流:金额门槛、替补与紧急通道的风险", en: "Approval flows: amount thresholds, substitutes, emergency paths" },
      { zh: "审计轨迹:谁、何时、改了什么、参照哪张单", en: "Audit trail: who, when, what changed, which document referenced" },
    ],
  },

  /* ============ E10 多端协同与立体流转 ============ */
  {
    id: "erp28", code: "COL1", moduleId: "e10", difficulty: 1, hours: 4, prereq: ["erp2"], viz: "collabWorld",
    props: ["多端协同", "供应链网络", "单据飞行 / doc flight", "3D 全景", "上下游"],
    title: { zh: "立体协同全景:五端如何被一张单点亮", en: "Spatial Collaboration: One Order Lights Five Ends" },
    summary: {
      zh: "供应商园区、自家工厂、总部办公室、成品仓、客户门店——物理上分散,在 ERP 里却是同一条单据链上的节点。本章用可旋转的 3D 场景,看「单据粒子」如何在五端之间飞,每一步系统里留下什么状态。",
      en: "Supplier park, own plant, HQ office, finished-goods warehouse, customer site — physically scattered, yet one document chain in ERP. This chapter’s rotatable 3D scene shows document particles flying between five ends, and which system status each hop leaves behind.",
    },
    objectives: [
      { zh: "说出五端各自在 O2C/P2P 中扮演的节点角色", en: "Name each of the five ends as a node in O2C/P2P" },
      { zh: "把「飞过的光点」映射到具体单据与过账", en: "Map each flying particle to a concrete document and posting" },
      { zh: "理解外部伙伴看到的往往是门户/EDI,内核仍是 ERP", en: "See that partners often touch a portal/EDI while the core stays ERP" },
      { zh: "识别跨端等待:谁在等谁的哪张单", en: "Spot cross-end waits: who waits on whose document" },
    ],
    outline: [
      { zh: "五端地图:供应商、工厂、办公室、仓库、客户", en: "Five-end map: supplier, plant, office, warehouse, customer" },
      { zh: "单据飞行:PO/ASN/SO/交货/发票在链上的轨迹", en: "Doc flight: PO/ASN/SO/delivery/invoice trajectories" },
      { zh: "状态同步:一端过账,其余端立刻可见", en: "Status sync: one end posts, all ends see it" },
      { zh: "门户与 EDI:伙伴不登录你的 ERP,仍写入同一事实", en: "Portal & EDI: partners never log into your ERP, yet write the same truth" },
    ],
  },
  {
    id: "erp29", code: "COL2", moduleId: "e10", difficulty: 2, hours: 4, prereq: ["erp28", "erp10", "erp7"], viz: "e2eProgress",
    props: ["端到端进度", "协同看板", "阻塞 / blocker", "SLA", "单据流进度"],
    title: { zh: "端到端进度板:卡在哪一端一目了然", en: "E2E Progress Board: See Which End Is Stuck" },
    summary: {
      zh: "客户只问「货到哪了」,内部却要同时盯采购在途、车间报工、仓库拣配、财务开票。本章做一张五泳道进度板:每端完成度、当前单据、阻塞原因与下一步责任人——这就是运营会议里 ERP 该投到墙上的画面。",
      en: "Customers only ask 'where is my order?'; internally you must watch inbound POs, shop confirmations, picking and billing at once. This chapter builds a five-lane progress board: completion per end, current document, blocker and next owner — the picture ERP should throw on the war-room wall.",
    },
    objectives: [
      { zh: "为一条订单画出五端进度百分比与关键单据", en: "Draw five-end % complete and key docs for one order" },
      { zh: "用阻塞类型区分:缺料、信用、质检、匹配失败", en: "Classify blockers: shortage, credit, QI, match failure" },
      { zh: "设计对外可视进度 vs 对内操作进度的信息差", en: "Design the info gap: customer-visible vs internal ops progress" },
      { zh: "理解「进度」必须来自单据状态,不能靠人工填报", en: "Insist progress comes from document status, never manual fill-in" },
    ],
    outline: [
      { zh: "进度定义:以单据状态机为唯一真相", en: "Defining progress: document state machine as sole truth" },
      { zh: "五泳道看板:供应商→工厂→办公室→仓库→客户", en: "Five-lane board: supplier → plant → office → warehouse → customer" },
      { zh: "阻塞与升级:红灯归属与 SLA", en: "Blockers & escalation: who owns the red light and the SLA" },
      { zh: "对外门户:客户看到的里程碑如何从内部单据投影", en: "Customer portal: projecting milestones from internal docs" },
    ],
  },
  {
    id: "erp30", code: "COL3", moduleId: "e10", difficulty: 2, hours: 4, prereq: ["erp28", "erp15"], viz: "factoryTwin",
    props: ["数字孪生", "工位 / station", "工单进度", "现场↔系统", "MES 边界"],
    title: { zh: "工厂数字孪生:工位跑起来,工单才算真进度", en: "Factory Twin: Stations Move, Then the Order Is Real" },
    summary: {
      zh: "办公室里的工单状态若与车间工位脱节,计划、成本、交期全是幻觉。本章用 3D 工厂切片:收料、加工、组装、包装、出货五个工位,看一枚工单令牌如何移动,以及每次报工怎样回写 ERP——并分清 MES 实时采集与 ERP 管理账的边界。",
      en: "If office work-order status drifts from shop stations, planning, cost and due dates are illusions. This chapter’s 3D factory slice — receive, machine, assemble, pack, ship — shows a work-order token moving and each confirmation writing back to ERP, and draws the line between MES real-time capture and ERP’s management ledger.",
    },
    objectives: [
      { zh: "把工单状态映射到物理工位序列", en: "Map work-order status onto a physical station sequence" },
      { zh: "解释报工如何同时推动库存、成本与计划可见性", en: "Explain how confirmations move stock, cost and planning visibility together" },
      { zh: "分清 MES「秒级现场」与 ERP「管理闭环」", en: "Separate MES second-level floor from ERP management loop" },
      { zh: "识别虚报工位进度对下游仓库与客户承诺的伤害", en: "See how fake station progress damages warehouse and customer promises" },
    ],
    outline: [
      { zh: "工位链:从收料到出货的物理顺序", en: "Station chain: physical order from receive to ship" },
      { zh: "令牌与报工:现场动作 → ERP 状态跃迁", en: "Token & confirmation: floor action → ERP state jump" },
      { zh: "MES 与 ERP:谁记秒、谁记账", en: "MES vs ERP: who keeps the seconds, who keeps the books" },
      { zh: "异常工位:停机、返工如何冻结下游进度", en: "Exception stations: how downtime and rework freeze downstream progress" },
    ],
  },

  /* ============ E11 工厂硬件与现场采集 ============ */
  {
    id: "erp31", code: "HW1", moduleId: "e11", difficulty: 1, hours: 4, prereq: ["erp15", "erp30"], viz: "hwCatalog",
    props: ["安灯 / andon", "扫码 / barcode", "RFID", "PLC", "工位终端", "物联网 / IoT"],
    title: { zh: "工厂硬件图谱:ERP 需要哪些神经末梢", en: "Factory Hardware Map: The Nerve Endings ERP Needs" },
    summary: {
      zh: "没有硬件,ERP 在工厂只是墙上的显示器。本章系统枚举安灯、扫码枪、RFID 门、工位平板、PLC/OPC-UA、电子秤、标签机、拣选灯、AGV、视觉检测、考勤与边缘网关等,说明每类设备触发什么现场事件、最终写成哪张 ERP/MES 单据——并对照 HARDWARE_BOOK 的传感器、显示与总线。",
      en: "Without hardware, ERP on the floor is just a wall monitor. This chapter catalogs andon, scanners, RFID gates, station tablets, PLC/OPC-UA, scales, labelers, pick-to-light, AGVs, vision, time clocks and edge gateways — what floor event each fires and which ERP/MES document it becomes — bridging HARDWARE_BOOK sensors, displays and buses.",
    },
    objectives: [
      { zh: "按车间/仓库/质检/物流分区列出关键硬件清单", en: "List key hardware by shop / warehouse / QI / logistics zones" },
      { zh: "把每类硬件映射到至少一种 ERP/MES 事务", en: "Map each hardware class to at least one ERP/MES transaction" },
      { zh: "用 HARDWARE_BOOK 词汇解释传感器→MCU→总线→网关链路", en: "Explain sensor → MCU → bus → gateway in HARDWARE_BOOK terms" },
      { zh: "区分「必须上」与「可后上」的硬件优先级", en: "Separate must-have vs later-wave hardware priorities" },
    ],
    outline: [
      { zh: "为什么纯键盘录单撑不起工厂 ERP", en: "Why keyboard entry alone cannot run plant ERP" },
      { zh: "硬件分区图谱:产线、仓储、质检、物流、基础设施", en: "Hardware zone map: line, warehouse, QI, logistics, infra" },
      { zh: "设备 → 事件 → 单据对照表(安灯到 AGV)", en: "Device → event → document table (andon to AGV)" },
      { zh: "与 HARDWARE_BOOK 的桥:传感、显示、总线、边缘计算", en: "Bridge to HARDWARE_BOOK: sense, display, bus, edge" },
    ],
  },
  {
    id: "erp32", code: "HW2", moduleId: "e11", difficulty: 2, hours: 4, prereq: ["erp31", "erp15"], viz: "andonBoard",
    props: ["安灯系统", "停机码 / downtime", "原因码", "升级 / escalation", "OEE"],
    title: { zh: "安灯与异常升级:红灯如何冻住工单进度", en: "Andon & Escalation: How a Red Light Freezes the Order" },
    summary: {
      zh: "安灯(Andon)不是装饰灯塔:拉绳/按钮/传感器触发后,产线灯塔变色、班组长到场、原因码入系统——停机开始计入 OEE,工单进度应冻结,必要时冻结下游交货承诺。本章演练安灯板与 ERP/MES 状态如何咬合。",
      en: "Andon is not decorative: a cord/button/sensor turns the tower light, summons the lead, and posts a reason code — downtime hits OEE, the work order should freeze, and downstream delivery promises may freeze too. This chapter rehearses how the andon board locks with ERP/MES state.",
    },
    objectives: [
      { zh: "描述安灯从触发到关闭的完整状态机", en: "Describe the andon state machine from pull to clear" },
      { zh: "把停机原因码连接到工单、成本中心与 OEE", en: "Connect downtime reason codes to WO, cost center and OEE" },
      { zh: "设计升级阶梯:工位 → 班组 → 车间 → 计划/销售", en: "Design escalation: station → team → plant → planning/sales" },
      { zh: "说明虚报「绿灯」对客户门户与成本差异的伤害", en: "Show how fake green harms the portal and cost variances" },
    ],
    outline: [
      { zh: "安灯硬件:灯塔、拉绳、工位屏、声光报警", en: "Andon hardware: towers, cords, station screens, alarms" },
      { zh: "状态机:呼叫 → 响应 → 处置 → 关闭与防呆", en: "State machine: call → acknowledge → fix → close & poka-yoke" },
      { zh: "写入系统:停机工时、原因码、冻结报工", en: "System write: downtime, reason codes, freeze confirmations" },
      { zh: "升级与对外影响:何时改客户承诺", en: "Escalation & outward impact: when to re-promise the customer" },
    ],
  },
  {
    id: "erp33", code: "HW3", moduleId: "e11", difficulty: 2, hours: 4, prereq: ["erp31", "erp16"], viz: "scanToPost",
    props: ["条码 / QR", "RFID", "自动过账", "防重 / idempotency", "边缘网关"],
    title: { zh: "扫码到过账:一次采集如何写进库存与成本", en: "Scan-to-Post: One Capture Writes Stock and Cost" },
    summary: {
      zh: "仓库 RF 枪扫托盘、产线固定扫码头扫流转卡、RFID 门过料、电子秤回传重量、PLC 计件脉冲——这些采集若设计正确,会直接驱动收发货、报工与倒冲;若设计错误,就变成「先干活后补单」。本章走通「采集 → 校验 → 幂等写入 ERP」的链路。",
      en: "RF-gun pallet scans, fixed mount scans of travelers, RFID gate passes, scale weights, PLC piece pulses — done right they drive GR/GI, confirmations and backflush; done wrong they become 'work first, backfill later'. This chapter walks capture → validate → idempotent ERP write.",
    },
    objectives: [
      { zh: "为收货/发料/报工/盘点各选合适的自动识别方式", en: "Pick the right auto-ID mode for GR, issue, confirm, count" },
      { zh: "解释扫描必须携带的最小数据(单号、物料、数量、库位)", en: "Name the minimum scan payload (doc, material, qty, bin)" },
      { zh: "设计断网缓存与防重复过账", en: "Design offline buffer and anti-duplicate posting" },
      { zh: "画出边缘网关在 PLC/扫码器与 ERP 之间的位置", en: "Place the edge gateway between PLC/scanners and ERP" },
    ],
    outline: [
      { zh: "自动识别手段对照:一维码、二维码、RFID、视觉", en: "Auto-ID compared: 1D, 2D, RFID, vision" },
      { zh: "典型闭环:扫码收货、扫码发料、计件报工、循环盘点", en: "Typical loops: scan-GR, scan-issue, piece confirm, cycle count" },
      { zh: "可靠性:校验、幂等键、断网队列、时钟同步", en: "Reliability: validation, idempotency keys, offline queue, clock sync" },
      { zh: "从 HARDWARE_BOOK 到产线:MCU、总线与工业协议", en: "HARDWARE_BOOK to the line: MCU, buses, industrial protocols" },
    ],
  },
  {
    id: "erp34", code: "HW4", moduleId: "e11", difficulty: 3, hours: 5, prereq: ["erp33", "erp23"], viz: "protoStack",
    props: ["RS-485", "Modbus", "MQTT", "OPC-UA", "边缘网关", "REST / API"],
    title: { zh: "协议分层对接:485 连设备,MQTT 进 ERP", en: "Protocol Layers: RS-485 to Devices, MQTT into ERP" },
    summary: {
      zh: "传感器、仪表、PLC 之间常用 RS-485 + Modbus 互联;ERP 却听不懂 485 帧。中间必须有边缘网关做协议翻译,再经 MQTT 主题或 HTTPS API 把「业务事件」交给 MES/ERP。本章用可切换场景把分层画清楚,并给出主题命名、载荷字段与幂等约定的落地样例。",
      en: "Sensors, meters and PLCs often talk RS-485 + Modbus to each other; ERP cannot parse 485 frames. An edge gateway must translate, then hand business events to MES/ERP over MQTT topics or HTTPS APIs. This chapter’s switchable scenes make the layers concrete, with topic naming, payload fields and idempotency conventions you can ship.",
    },
    objectives: [
      { zh: "画出「现场总线层 / 边缘层 / 消息层 / ERP 事务层」四层图", en: "Draw the four layers: fieldbus / edge / messaging / ERP transaction" },
      { zh: "说明为何设备侧用 485/Modbus,IT 侧用 MQTT/HTTPS", en: "Explain why the floor uses 485/Modbus and IT uses MQTT/HTTPS" },
      { zh: "为一个报工事件设计 MQTT topic 与 JSON 载荷", en: "Design an MQTT topic and JSON payload for a confirmation event" },
      { zh: "分清 OPC-UA、MQTT、REST 各自卡在哪一层", en: "Place OPC-UA, MQTT and REST on the correct layers" },
    ],
    outline: [
      { zh: "现场层:RS-485 物理层与 Modbus RTU 寄存器", en: "Field layer: RS-485 physical + Modbus RTU registers" },
      { zh: "边缘网关:轮询、映射工单号、本地缓存", en: "Edge gateway: poll, map WO ids, local buffer" },
      { zh: "消息层:MQTT 主题树、QoS、与 REST 回调对比", en: "Message layer: MQTT topic tree, QoS, vs REST callbacks" },
      { zh: "ERP 落账:订阅→校验→幂等过账→回执", en: "ERP posting: subscribe → validate → idempotent post → ack" },
    ],
  },
];

/* Derived stats used on the home page */
const TOTAL_HOURS = CHAPTERS.reduce((s, c) => s + c.hours, 0);
const DEMO_COUNT = CHAPTERS.filter((c) => c.viz).length;
const ALL_PROPS = [...new Set(CHAPTERS.flatMap((c) => c.props || []))];

window.MODULES = MODULES;
window.CHAPTERS = CHAPTERS;
window.TOTAL_HOURS = TOTAL_HOURS;
window.DEMO_COUNT = DEMO_COUNT;
window.ALL_PROPS = ALL_PROPS;
