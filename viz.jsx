/* =========================================================
   viz.jsx — live business sandboxes ("沙盘"), part 1: E1–E4
   ---------------------------------------------------------
   Dependency-free. Each chapter sets `viz: "<name>"` in
   data.jsx; the chapter page renders <Viz name={...} />.
   Every sandbox computes the *real* ERP logic (netting,
   matching, valuation, postings…) live from its controls.
   Part 2 (E5–E8) and the registry live in viz2.jsx.
   ========================================================= */

const round2 = (x) => Math.round(x * 100) / 100;
const fm = (n) => Number(round2(n)).toLocaleString("en-US");

// Bilingual inline label helper (viz-local; the site language context).
function useL() {
  const lang = useLang();
  return (zh, en) => (lang === "zh" ? zh : en);
}

// A labelled slider.
function Slider({ label, min, max, step, value, onChange, unit, fmt }) {
  return (
    <label>
      <span>{label}</span>
      <input type="range" min={min} max={max} step={step || 1} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))} />
      <span className="val">{fmt ? fmt(value) : value}{unit || ""}</span>
    </label>
  );
}
// A labelled <select>. options: ["a","b"] or [{v, l}]
function Choice({ label, value, onChange, options }) {
  return (
    <label>
      <span>{label}</span>
      <select className="erp-select" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => {
          const v = typeof o === "object" ? o.v : o;
          const l = typeof o === "object" ? o.l : o;
          return <option key={v} value={v}>{l}</option>;
        })}
      </select>
    </label>
  );
}
// Monospace readout block.
function CodeOut({ code }) {
  return <pre className="erp-code">{code}</pre>;
}
// Prev / next step buttons for the flow demos.
function StepCtl({ cur, setCur, max, L }) {
  return (
    <div className="erp-btnrow">
      <button className="btn erp-minibtn" disabled={cur <= 0} onClick={() => setCur(cur - 1)}>← {L("上一步", "Back")}</button>
      <button className="btn btn-accent erp-minibtn" disabled={cur >= max} onClick={() => setCur(cur + 1)}>{L("下一步", "Next")} →</button>
      <button className="btn erp-minibtn" onClick={() => setCur(0)}>{L("重置", "Reset")}</button>
    </div>
  );
}
// Generic document-flow demo: cards + detail of the current doc.
function DocFlow({ docs, L }) {
  const [cur, setCur] = React.useState(0);
  const d = docs[cur];
  return (
    <div>
      <div className="erp-stage">
        <div className="erp-flow">
          {docs.map((doc, i) => (
            <React.Fragment key={i}>
              {i > 0 && <div className="erp-flow-arrow">→</div>}
              <div className={`erp-doc ${i < cur ? "on" : ""} ${i === cur ? "now" : ""}`} onClick={() => setCur(i)}>
                <div className="d-code">{doc.code}</div>
                <div className="d-name">{L(doc.zh, doc.en)}</div>
                <div className="d-sub">{L(doc.subZh, doc.subEn)}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
        <div className="erp-doc-detail">
          <strong>{d.code} · {L(d.zh, d.en)}</strong> — {L(d.descZh, d.descEn)}
          {d.fields && (
            <div className="fields">{d.fields.map((f, i) => <span key={i}>{f}</span>)}</div>
          )}
          {d.posting && <div className="erp-posting">{L("自动分录 auto-posting:\n", "Auto-posting:\n")}{d.posting}</div>}
          {!d.posting && <div className="erp-note">{L("这一步不产生会计分录——只有货或钱动了,账才动。", "No journal entry here — the books only move when goods or money move.")}</div>}
        </div>
      </div>
      <StepCtl cur={cur} setCur={setCur} max={docs.length - 1} L={L} />
    </div>
  );
}

/* ============================================================
   FD1 · erpEvolution — MRP → MRP II → ERP → Cloud timeline
   ============================================================ */
function ErpEvolutionViz() {
  const L = useL();
  const [era, setEra] = React.useState(0);
  const ERAS = [
    {
      code: "1960s–70s", zh: "MRP 物料需求计划", en: "MRP — Material Requirements Planning",
      scopeZh: "库存 + BOM + 提前期", scopeEn: "Stock + BOM + lead times",
      descZh: "只回答一个问题:为了按期交货,什么物料、什么时候、买/造多少?输入是主生产计划、BOM 与库存,输出是采购与生产建议。财务、人事都不在系统里。",
      descEn: "Answers a single question: to deliver on time, which materials, when, and how many to buy or make? Inputs: the master schedule, BOMs and stock; outputs: purchase and production proposals. Finance and HR live elsewhere.",
      inSys: ["物料计划 Material planning"],
    },
    {
      code: "1980s", zh: "MRP II 制造资源计划", en: "MRP II — Manufacturing Resource Planning",
      scopeZh: "MRP + 产能 + 车间 + 财务反馈", scopeEn: "MRP + capacity + shop floor + finance feedback",
      descZh: "MRP 的计划常常「算得出、干不了」——因为没考虑产能。MRP II 加入产能计划、车间执行与成本核算,形成闭环:计划 → 执行 → 反馈 → 修正计划。",
      descEn: "MRP plans were often computable but not executable — capacity was ignored. MRP II adds capacity planning, shop-floor control and costing, closing the loop: plan → execute → feed back → replan.",
      inSys: ["物料计划", "产能计划 Capacity", "车间执行 Shop floor", "成本 Costing"],
    },
    {
      code: "1990s–2000s", zh: "ERP 企业资源计划", en: "ERP — Enterprise Resource Planning",
      scopeZh: "全企业一套数据库", scopeEn: "One database for the whole enterprise",
      descZh: "Gartner 1990 年造出 ERP 这个词:把财务、人事、销售、采购、库存、生产全部搬进同一套集成数据库。一笔收货在仓库过账,财务的账同一秒更新——「单一事实来源」诞生。",
      descEn: "Gartner coined 'ERP' in 1990: finance, HR, sales, purchasing, inventory and production all move into one integrated database. A goods receipt posted in the warehouse updates the books in the same second — the single source of truth is born.",
      inSys: ["物料计划", "产能与车间", "财务会计 Finance", "销售采购 Sales & purchasing", "人事 HR"],
    },
    {
      code: "2010s–", zh: "云 ERP 与智能化", en: "Cloud ERP & Intelligence",
      scopeZh: "SaaS 订阅 + 生态集成 + AI", scopeEn: "SaaS subscription + ecosystem + AI",
      descZh: "系统从机房搬进云端:按用户订阅、厂商统一升级、通过 API 与电商/MES/银行互联。内存计算让实时分析成为默认,AI 开始接管预测、对账与异常检测。",
      descEn: "The system leaves the server room for the cloud: per-user subscription, vendor-managed upgrades, API links to e-commerce, MES and banks. In-memory computing makes real-time analytics the default, and AI starts taking over forecasting, reconciliation and anomaly detection.",
      inSys: ["ERP 全模块 All ERP modules", "电商/MES/银行集成 Integrations", "实时分析 Real-time analytics", "AI 预测与自动化 AI"],
    },
  ];
  const e = ERAS[era];
  return (
    <div>
      <div className="erp-stage">
        <div className="erp-flow">
          {ERAS.map((x, i) => (
            <React.Fragment key={i}>
              {i > 0 && <div className="erp-flow-arrow">→</div>}
              <div className={`erp-doc ${i < era ? "on" : ""} ${i === era ? "now" : ""}`} onClick={() => setEra(i)}>
                <div className="d-code">{x.code}</div>
                <div className="d-name">{L(x.zh, x.en).split("—")[0].split(" ")[0]}</div>
                <div className="d-sub">{L(x.scopeZh, x.scopeEn)}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
        <div className="erp-doc-detail">
          <strong>{L(e.zh, e.en)}</strong>
          <p style={{ margin: "8px 0" }}>{L(e.descZh, e.descEn)}</p>
          <div className="fields">
            {e.inSys.map((s, i) => <span key={i}>✓ {s}</span>)}
          </div>
        </div>
      </div>
      <div className="viz-ctrl">
        <Slider label={L("拖动年代", "Drag the era")} min={0} max={3} step={1} value={era} onChange={setEra}
          fmt={(v) => ERAS[v].code} />
      </div>
      <div className="viz-readout">
        {L("每个时代都在回答同一个问题的更大版本:企业的资源,如何用同一套数字来计划?",
           "Each era answers a bigger version of the same question: how do we plan the enterprise's resources with one shared set of numbers?")}
      </div>
    </div>
  );
}

/* ============================================================
   FD2 · processFlow — one order crossing the company (swimlanes)
   ============================================================ */
function ProcessFlowViz() {
  const L = useL();
  const [cur, setCur] = React.useState(0);
  const LANES = [
    { zh: "销售", en: "SALES" }, { zh: "计划", en: "PLAN" }, { zh: "采购", en: "PURCH" },
    { zh: "仓库", en: "WHSE" }, { zh: "车间", en: "SHOP" }, { zh: "财务", en: "FIN" },
  ];
  const STEPS = [
    { lane: 0, zh: "接到客户订单 500 台", en: "Customer order: 500 units", sysZh: "创建销售订单,ATP 检查交期,信用检查通过", sysEn: "Create sales order; ATP checks the date; credit check passes" },
    { lane: 1, zh: "MRP 运算展开需求", en: "MRP run explodes demand", sysZh: "净需求 = 500 − 现有库存;按 BOM 生成生产与采购建议", sysEn: "Net requirement = 500 − stock; BOM explosion yields production & purchase proposals" },
    { lane: 2, zh: "下采购订单买缺料", en: "PO for missing parts", sysZh: "采购申请转采购订单,发给供应商", sysEn: "Requisitions become purchase orders sent to vendors" },
    { lane: 3, zh: "收货入库", en: "Goods receipt", sysZh: "按订单收货,库存 +,自动记账:借 原材料 / 贷 GR-IR", sysEn: "Receive against PO; stock up; auto-post Dr Raw Materials / Cr GR-IR" },
    { lane: 4, zh: "生产工单开工与报工", en: "Production order runs", sysZh: "领料(库存 −)、报工时、完工入库(成品 +)", sysEn: "Issue components (stock down), confirm hours, receive finished goods" },
    { lane: 3, zh: "拣货、发货给客户", en: "Pick & ship to customer", sysZh: "交货单拣配,发货过账:借 主营成本 / 贷 库存商品", sysEn: "Delivery picked; goods issue posts Dr COGS / Cr Finished Goods" },
    { lane: 5, zh: "开票、收款、核销", en: "Bill, collect, clear", sysZh: "开票:借 应收 / 贷 收入;银行到账后核销应收", sysEn: "Billing posts Dr AR / Cr Revenue; incoming payment clears AR" },
  ];
  const s = STEPS[cur];
  return (
    <div>
      <div className="erp-stage">
        <div className="erp-lanes">
          {LANES.map((lane, li) => (
            <div className="erp-lane" key={li}>
              <div className="l-name">{L(lane.zh, lane.en)}</div>
              <div className="l-track">
                {STEPS.map((st, si) => st.lane === li ? (
                  <div key={si} className={`l-step ${si < cur ? "on" : ""} ${si === cur ? "now" : ""}`} onClick={() => setCur(si)}>
                    <span className="s-no">{String(si + 1).padStart(2, "0")}</span>
                    <span>{L(st.zh, st.en)}</span>
                  </div>
                ) : <div key={si} className="l-slot" />)}
              </div>
            </div>
          ))}
        </div>
        <div className="erp-doc-detail">
          <strong>{String(cur + 1).padStart(2, "0")} · {L(s.zh, s.en)}</strong>
          <div className="erp-posting">{L("系统动作:", "System action: ")}{L(s.sysZh, s.sysEn)}</div>
        </div>
      </div>
      <StepCtl cur={cur} setCur={setCur} max={STEPS.length - 1} L={L} />
      <div className="viz-readout">
        {L("注意:七步跨了六个部门。任何一步断掉,交期就滑——这就是「流程视角」为什么必须取代「部门视角」。",
           "Notice: seven steps cross six departments. Break any one and the delivery date slips — which is why the process view must replace the department view.")}
      </div>
    </div>
  );
}

/* ============================================================
   FD3 · marketMap — vendor landscape quadrant
   ============================================================ */
function MarketMapViz() {
  const L = useL();
  const [sel, setSel] = React.useState(0);
  // x: 0 SME → 100 large enterprise; y: 0 本土/垂直 → 100 全球/通用
  const V = [
    { nm: "SAP", x: 88, y: 88, zh: "大型企业绝对霸主。S/4HANA(内存计算)+ Business One(中小)。以流程严谨、行业方案全著称,实施重、成本高。", en: "The enterprise heavyweight. S/4HANA (in-memory) plus Business One for SMEs. Famous for process rigor and industry depth; heavy, costly implementations." },
    { nm: "Oracle", x: 84, y: 78, zh: "数据库巨头的 ERP 线:Fusion Cloud ERP 与 NetSuite(云原生中型市场开创者)。强在财务与云基建。", en: "The database giant's ERP line: Fusion Cloud ERP and NetSuite (the cloud-native midmarket pioneer). Strong in finance and cloud infrastructure." },
    { nm: "Microsoft D365", x: 62, y: 70, zh: "Dynamics 365:与 Office/Teams/Power BI 无缝协同,生态与低代码是王牌,中型市场增长快。", en: "Dynamics 365: seamless with Office/Teams/Power BI. Its ecosystem and low-code story win the midmarket." },
    { nm: "用友 Yonyou", x: 58, y: 26, zh: "中国大中型企业市占第一,财务基因深厚。U8/U9 到 BIP 云平台,本土财税合规是护城河。", en: "China's #1 for larger local enterprises, with deep finance DNA. From U8/U9 to the BIP cloud platform; local tax compliance is the moat." },
    { nm: "金蝶 Kingdee", x: 40, y: 22, zh: "深耕中小与成长型企业,云转型激进(星空/苍穹)。上手快、价格亲民。", en: "Focused on SMEs and growth companies, aggressively cloud-first (Cosmic/Galaxy). Quick to adopt, friendly pricing." },
    { nm: "Odoo", x: 22, y: 62, zh: "开源模块化之王:CRM 到制造 40+ 应用按需启用,社区版免费。中小企业与开发者的最爱。", en: "The open-source modular champion: 40+ apps from CRM to MRP, enable what you need; community edition free. Beloved by SMEs and developers." },
    { nm: "ERPNext", x: 12, y: 48, zh: "完全开源免费的全功能 ERP(Frappe 框架),小团队自部署的常见选择。", en: "Fully open-source, full-featured ERP on the Frappe framework — a common self-hosted pick for small teams." },
  ];
  const v = V[sel];
  return (
    <div>
      <div className="erp-stage">
        <div className="erp-quad">
          <span className="q-axis" style={{ left: 8, top: 6 }}>{L("↑ 全球化 / 通用", "↑ GLOBAL / HORIZONTAL")}</span>
          <span className="q-axis" style={{ left: 8, bottom: 6 }}>{L("↓ 本土化 / 行业", "↓ LOCAL / VERTICAL")}</span>
          <span className="q-axis" style={{ right: 8, bottom: 6 }}>{L("企业规模 →", "COMPANY SIZE →")}</span>
          {V.map((p, i) => (
            <div key={i} className={`q-dot ${i === sel ? "sel" : ""}`}
              style={{ left: `${6 + p.x * 0.88}%`, top: `${92 - p.y * 0.84}%` }}
              onClick={() => setSel(i)}>
              <span className="dot" /><span className="nm">{p.nm}</span>
            </div>
          ))}
        </div>
        <div className="erp-doc-detail">
          <strong>{v.nm}</strong> — {L(v.zh, v.en)}
        </div>
      </div>
      <div className="viz-readout">
        {L("横轴是目标企业规模,纵轴是全球通用 vs 本土/行业深耕。点击任意厂商看定位——没有「最好的 ERP」,只有「最合适的象限」。",
           "X: target company size. Y: global-horizontal vs. local-vertical. Click any vendor — there is no 'best ERP', only the right quadrant for you.")}
      </div>
    </div>
  );
}

/* ============================================================
   MD1 · orgModel — build the org structure tree
   ============================================================ */
function OrgModelViz() {
  const L = useL();
  const [ccs, setCcs] = React.useState(2);
  const [plants, setPlants] = React.useState(2);
  const [slocs, setSlocs] = React.useState(2);
  const totalPlants = ccs * plants;
  const totalSlocs = totalPlants * slocs;
  return (
    <div>
      <div className="erp-stage">
        <div className="erp-tree">
          <div className="t-node"><span className="erp-tag acc">{L("集团", "GROUP")}</span><strong>{L("华成集团", "Huacheng Group")}</strong>
            <span className="erp-note" style={{ margin: 0 }}>{L("(合并报表层)", "(consolidation level)")}</span></div>
          <div className="t-kids">
            {Array.from({ length: ccs }, (_, ci) => (
              <div key={ci}>
                <div className="t-node">
                  <span className="erp-tag pri">{L("公司代码", "CO.CODE")} {1000 + ci * 1000}</span>
                  <strong>{L(ci === 0 ? "华成制造有限公司" : "华成贸易有限公司", ci === 0 ? "Huacheng Manufacturing Ltd." : "Huacheng Trading Ltd.")}</strong>
                  <span className="erp-note" style={{ margin: 0 }}>{L("独立法人 · 独立账套", "legal entity · own ledger")}</span>
                </div>
                <div className="t-kids">
                  {Array.from({ length: plants }, (_, pi) => (
                    <div key={pi}>
                      <div className="t-node">
                        <span className="erp-tag">{L("工厂", "PLANT")} {1000 + ci * 1000 + (pi + 1) * 100}</span>
                        {L(pi === 0 ? "苏州工厂" : pi === 1 ? "成都工厂" : "东莞工厂", pi === 0 ? "Suzhou plant" : pi === 1 ? "Chengdu plant" : "Dongguan plant")}
                      </div>
                      <div className="t-kids">
                        {Array.from({ length: slocs }, (_, si) => (
                          <div className="t-node" key={si}>
                            <span className="erp-tag">{L("库存地点", "S.LOC")} {String(si + 1).padStart(4, "0")}</span>
                            {L(["原材料库", "成品库", "退货库", "线边仓"][si], ["Raw materials", "Finished goods", "Returns", "Line-side"][si])}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="viz-ctrl">
        <Slider label={L("法人(公司代码)", "Legal entities")} min={1} max={2} value={ccs} onChange={setCcs} />
        <Slider label={L("每法人工厂数", "Plants per entity")} min={1} max={3} value={plants} onChange={setPlants} />
        <Slider label={L("每工厂库存地点", "S.locs per plant")} min={1} max={4} value={slocs} onChange={setSlocs} />
      </div>
      <CodeOut code={`${L("组织单元统计", "Org unit count")}:
${L("公司代码", "company codes")} = ${ccs}   ${L("工厂", "plants")} = ${totalPlants}   ${L("库存地点", "storage locations")} = ${totalSlocs}
${L("→ 每张单据都必须落在这棵树的某个节点上:", "→ every document must land on a node of this tree:")}
   ${L("采购订单 → 工厂", "purchase order → plant")} · ${L("收货 → 库存地点", "goods receipt → storage location")} · ${L("分录 → 公司代码", "journal entry → company code")}`} />
      <div className="viz-readout">
        {L("试试把法人调到 2:两个公司代码之间买卖,就不再是「转库」,而是「公司间交易」——要开发票、要对账。法人边界 = 账套边界。",
           "Set legal entities to 2: selling between the two company codes is no longer a stock transfer but an intercompany transaction — invoices and reconciliation required. Legal boundary = ledger boundary.")}
      </div>
    </div>
  );
}

/* ============================================================
   MD2 · materialMaster — the multi-view material record
   ============================================================ */
function MaterialMasterViz() {
  const L = useL();
  const [mtype, setMtype] = React.useState("FERT");
  const [tab, setTab] = React.useState(0);
  const TYPES = {
    ROH:  { zh: "原材料", en: "Raw material", views: [0, 1, 3, 4] },
    HALB: { zh: "半成品", en: "Semi-finished", views: [0, 3, 4] },
    FERT: { zh: "成品", en: "Finished good", views: [0, 2, 3, 4] },
    HAWA: { zh: "贸易商品", en: "Trading good", views: [0, 1, 2, 3, 4] },
  };
  const VIEWS = [
    { zh: "基本视图", en: "Basic", ownerZh: "研发/主数据组", ownerEn: "R&D / MDM team", fields: [
      ["物料编号 Material no.", "FG-BIKE-26"], ["描述 Description", L("26寸城市自行车", '26" city bicycle')],
      ["基本计量单位 Base UoM", L("台 EA", "EA")], ["物料组 Material group", L("整车 BIKES", "BIKES")], ["重量 Gross weight", "14.2 kg"]] },
    { zh: "采购视图", en: "Purchasing", ownerZh: "采购部", ownerEn: "Purchasing", fields: [
      ["采购组 Purchasing group", "P01"], ["订购单位 Order UoM", L("箱 CAR(=10 台)", "CAR (=10 EA)")],
      ["计划交货天数 Pl. deliv. days", "14"], ["最小起订量 Min. order qty", "50"], ["收货处理天数 GR proc. days", "1"]] },
    { zh: "销售视图", en: "Sales", ownerZh: "销售部", ownerEn: "Sales", fields: [
      ["销售单位 Sales UoM", L("台 EA", "EA")], ["税分类 Tax class.", L("13% 增值税", "13% VAT")],
      ["交货工厂 Delivering plant", "1100"], ["最小交货量 Min. delivery", "1"], ["定价参考 Pricing ref.", "PR00"]] },
    { zh: "库存/工厂视图", en: "Storage / Plant", ownerZh: "仓库/计划", ownerEn: "Warehouse / Planning", fields: [
      ["MRP 类型 MRP type", L("PD(MRP 计划)", "PD (MRP)")], ["批量规则 Lot size", L("EX 批对批", "EX lot-for-lot")],
      ["安全库存 Safety stock", "40"], ["批次管理 Batch mgmt", L("是", "Yes")], ["仓储条件 Storage cond.", L("常温", "Ambient")]] },
    { zh: "财务/会计视图", en: "Accounting", ownerZh: "财务部", ownerEn: "Finance", fields: [
      ["估价分类 Valuation class", "7920"], ["价格控制 Price control", L("S 标准价 / V 移动平均", "S standard / V moving avg.")],
      ["标准价 Standard price", "¥ 1,180.00"], ["科目确定 → Account det.", L("库存商品 1405", "Finished goods 1405")]] },
  ];
  const active = TYPES[mtype].views;
  const shownTab = active.includes(tab) ? tab : active[0];
  const v = VIEWS[shownTab];
  return (
    <div>
      <div className="erp-stage">
        <div className="erp-tabs">
          {VIEWS.map((view, i) => active.includes(i) ? (
            <div key={i} className={`erp-tab ${i === shownTab ? "on" : ""}`} onClick={() => setTab(i)}>
              {L(view.zh, view.en)}
            </div>
          ) : (
            <div key={i} className="erp-tab" style={{ opacity: 0.3, cursor: "not-allowed", textDecoration: "line-through" }}>
              {L(view.zh, view.en)}
            </div>
          ))}
        </div>
        <div className="erp-tabpane">
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
            <strong>{L(v.zh, v.en)}</strong>
            <span className="erp-tag acc">{L("维护部门:", "Owned by: ")}{L(v.ownerZh, v.ownerEn)}</span>
          </div>
          <div className="erp-kv">
            {v.fields.map(([k, val], i) => (
              <div className="pair" key={i}><span className="k">{k}</span><span>{val}</span></div>
            ))}
          </div>
        </div>
      </div>
      <div className="viz-ctrl">
        <Choice label={L("物料类型", "Material type")} value={mtype} onChange={setMtype}
          options={Object.keys(TYPES).map((k) => ({ v: k, l: `${k} · ${L(TYPES[k].zh, TYPES[k].en)}` }))} />
      </div>
      <div className="viz-readout">
        {L("同一条物料记录,五个部门各管各的视图——这正是「一物一档」的含义。切换物料类型:原材料没有销售视图(不能直接卖),成品没有采购视图(不能直接买)。",
           "One material record, five views each owned by a different department — that is 'one record per thing'. Switch the type: raw materials have no sales view (you don't sell them), finished goods no purchasing view (you don't buy them).")}
      </div>
    </div>
  );
}

/* ============================================================
   MD3 · bomExplosion — multi-level BOM quantity explosion
   ============================================================ */
function BomExplosionViz() {
  const L = useL();
  const [qty, setQty] = React.useState(100);
  const [scrap, setScrap] = React.useState(2);
  const wheelQty = Math.ceil(qty * 2 * (1 + scrap / 100));
  const BOM = [
    { lvl: 0, zh: "自行车(成品)", en: "Bicycle (FG)", per: "—", total: qty, tag: "FERT" },
    { lvl: 1, zh: "车架", en: "Frame", per: "1", total: qty, tag: "ROH" },
    { lvl: 1, zh: "车轮(含损耗)", en: "Wheel (incl. scrap)", per: `2 ×(1+${scrap}%)`, total: wheelQty, tag: "HALB" },
    { lvl: 2, zh: "轮毂", en: "Hub", per: "1", total: wheelQty, tag: "ROH" },
    { lvl: 2, zh: "辐条", en: "Spoke", per: "36", total: wheelQty * 36, tag: "ROH" },
    { lvl: 2, zh: "外胎", en: "Tire", per: "1", total: wheelQty, tag: "ROH" },
    { lvl: 1, zh: "链条", en: "Chain", per: "1", total: qty, tag: "ROH" },
    { lvl: 1, zh: "变速器", en: "Derailleur", per: "1", total: qty, tag: "ROH" },
  ];
  return (
    <div>
      <div className="erp-stage">
        <table className="erp-table">
          <thead>
            <tr>
              <th>{L("层级 · 物料", "Level · material")}</th>
              <th>{L("单位用量", "Qty per")}</th>
              <th>{L("需求总量", "Total req.")}</th>
            </tr>
          </thead>
          <tbody>
            {BOM.map((r, i) => (
              <tr key={i} className={r.lvl === 0 ? "hl" : ""}>
                <td style={{ paddingLeft: 10 + r.lvl * 26 }}>
                  <span className="erp-tag" style={{ marginRight: 8 }}>{"·".repeat(r.lvl + 1)} L{r.lvl}</span>
                  {L(r.zh, r.en)} <span className="erp-tag pri">{r.tag}</span>
                </td>
                <td className="lbl">{r.per}</td>
                <td className="erp-qty">{fm(r.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="viz-ctrl">
        <Slider label={L("成品需求", "FG demand")} min={10} max={500} step={10} value={qty} onChange={setQty} unit={L(" 台", " EA")} />
        <Slider label={L("车轮损耗率", "Wheel scrap")} min={0} max={10} step={0.5} value={scrap} onChange={setScrap} unit=" %" />
      </div>
      <CodeOut code={`${L("展开算法(每层)", "Explosion (per level)")}:
${L("子项需求", "component req.")} = ${L("父项需求", "parent req.")} × ${L("单位用量", "qty-per")} × (1 + ${L("损耗率", "scrap")})
${L("例", "e.g.")}: ${L("辐条", "spokes")} = ${fm(wheelQty)} ${L("车轮", "wheels")} × 36 = ${fm(wheelQty * 36)}`} />
      <div className="viz-readout">
        {L("把损耗率从 0 调到 10%:上层一个小小的百分比,逐层相乘后在底层变成上千根辐条的差异——这就是 BOM 数据必须精确的原因。",
           "Slide scrap from 0 to 10%: a tiny percentage at the top, multiplied down the levels, becomes thousands of spokes at the bottom — which is why BOM data must be exact.")}
      </div>
    </div>
  );
}

/* ============================================================
   P2P1 · p2pFlow — requisition to payment document chain
   ============================================================ */
function P2pFlowViz() {
  const L = useL();
  const docs = [
    { code: "PR", zh: "采购申请", en: "Purchase requisition", subZh: "内部需求", subEn: "internal demand",
      descZh: "车间或 MRP 说「需要 100 件 M6 螺栓」。内部单据,不发给供应商,等待审批。", descEn: "The shop floor or MRP says 'we need 100 M6 bolts'. Internal only, not sent to any vendor; awaits approval.",
      fields: [L("物料:M6 螺栓", "Mat: M6 bolt"), L("数量:100", "Qty: 100"), L("需求日期:07-30", "Req. date: 07-30"), L("申请人:车间A", "Requester: Shop A")] },
    { code: "PO", zh: "采购订单", en: "Purchase order", subZh: "对外承诺", subEn: "external commitment",
      descZh: "审批通过后转成采购订单发给供应商——这是有法律效力的合同:物料、数量、单价 ¥5、交期、付款条件全部锁定。", descEn: "After release it becomes a PO sent to the vendor — a legally binding contract locking material, quantity, ¥5 unit price, delivery date and payment terms.",
      fields: [L("供应商:S-100 华峰五金", "Vendor: S-100"), L("单价:¥5.00", "Price: ¥5.00"), L("金额:¥500", "Value: ¥500"), L("付款:月结30天", "Terms: net 30")] },
    { code: "GR", zh: "收货单", en: "Goods receipt", subZh: "货到了", subEn: "goods arrive",
      descZh: "参照 PO 收货 100 件,库存立即 +100。注意:发票还没到,系统先按订单价「暂估」入账。", descEn: "Receive 100 against the PO; stock instantly +100. The invoice hasn't arrived, so the system posts an estimate at PO price.",
      fields: [L("实收:100", "Received: 100"), L("库存 +100", "Stock +100"), L("移动类型:101", "Mvmt type: 101")],
      posting: L("借:原材料      ¥500\n贷:GR/IR 暂估   ¥500", "Dr Raw materials   ¥500\nCr GR/IR clearing  ¥500") },
    { code: "IV", zh: "发票校验", en: "Invoice verification", subZh: "三单匹配", subEn: "3-way match",
      descZh: "供应商发票到达,系统自动与 PO、GR 对数量与价格(三单匹配)。一致则过账,应付正式成立。", descEn: "The vendor invoice arrives; the system matches it against PO and GR on quantity and price. If it agrees, the payable is booked.",
      fields: [L("发票:100 × ¥5", "Inv: 100 × ¥5"), L("税 13%:¥65", "VAT 13%: ¥65"), L("匹配:✓ 通过", "Match: ✓ pass")],
      posting: L("借:GR/IR 暂估   ¥500\n借:进项税      ¥65\n贷:应付账款    ¥565", "Dr GR/IR clearing  ¥500\nDr Input VAT       ¥65\nCr Accounts payable ¥565") },
    { code: "PAY", zh: "付款", en: "Payment", subZh: "钱付了", subEn: "cash out",
      descZh: "付款程序按到期日与付款条件挑出应付项,生成付款并核销。P2P 闭环完成。", descEn: "The payment run selects due items by terms, pays and clears them. The P2P loop is closed.",
      fields: [L("到期:08-30", "Due: 08-30"), L("方式:银行转账", "Method: bank transfer")],
      posting: L("借:应付账款    ¥565\n贷:银行存款    ¥565", "Dr Accounts payable ¥565\nCr Bank             ¥565") },
  ];
  return (
    <div>
      <DocFlow docs={docs} L={L} />
      <div className="viz-readout">
        {L("每张后续单据都「参照」前一张创建——数量、价格自动带出,改不了的字段就是内控。点击任意单据看它的字段与分录。",
           "Each document is created with reference to the previous one — quantities and prices carry over, and the fields you cannot change are the internal control. Click any document to see its fields and postings.")}
      </div>
    </div>
  );
}

/* ============================================================
   P2P2 · threeWayMatch — PO / GR / invoice matching
   ============================================================ */
function ThreeWayMatchViz() {
  const L = useL();
  const [grQty, setGrQty] = React.useState(95);
  const [ivQty, setIvQty] = React.useState(100);
  const [ivPrice, setIvPrice] = React.useState(10.0);
  const [tol, setTol] = React.useState(2);
  const poQty = 100, poPrice = 10.0;
  const qtyDev = grQty === 0 ? 100 : ((ivQty - grQty) / grQty) * 100;
  const priceDev = ((ivPrice - poPrice) / poPrice) * 100;
  const qtyOk = ivQty <= grQty;
  const priceOk = Math.abs(priceDev) <= tol;
  const pass = qtyOk && priceOk;
  return (
    <div>
      <div className="erp-stage">
        <table className="erp-table">
          <thead>
            <tr><th>{L("单据", "Document")}</th><th>{L("数量", "Qty")}</th><th>{L("单价", "Price")}</th><th>{L("金额", "Value")}</th></tr>
          </thead>
          <tbody>
            <tr><td>PO {L("采购订单", "purchase order")}</td><td>{poQty}</td><td>¥{poPrice.toFixed(2)}</td><td>¥{fm(poQty * poPrice)}</td></tr>
            <tr><td>GR {L("收货单", "goods receipt")}</td><td>{grQty}</td><td className="lbl">—</td><td className="lbl">—</td></tr>
            <tr className={pass ? "" : "hl"}><td>IV {L("供应商发票", "vendor invoice")}</td><td>{ivQty}</td><td>¥{ivPrice.toFixed(2)}</td><td>¥{fm(ivQty * ivPrice)}</td></tr>
          </tbody>
        </table>
        <div className="erp-doc-detail" style={{ borderLeftColor: pass ? "var(--primary)" : "var(--accent)" }}>
          <strong>{pass ? L("✓ 匹配通过 — 发票过账,进入付款队列", "✓ Match passed — invoice posted, queued for payment")
                        : L("✗ 匹配失败 — 发票冻结,等待处理", "✗ Match failed — invoice blocked for review")}</strong>
          <div className="erp-posting">
            {L("数量检查", "Qty check")}: {L("发票", "inv")} {ivQty} {ivQty <= grQty ? "≤" : ">"} {L("已收货", "received")} {grQty} → {qtyOk ? "OK" : L("超收货量,冻结", "exceeds GR — block")}{"\n"}
            {L("价格检查", "Price check")}: {priceDev >= 0 ? "+" : ""}{round2(priceDev)}% {L("偏差", "deviation")} {Math.abs(priceDev) <= tol ? "≤" : ">"} {L("容差", "tolerance")} {tol}% → {priceOk ? "OK" : L("超容差,冻结", "beyond tolerance — block")}
          </div>
          {!pass && <div className="erp-note">
            {!qtyOk && L("处理:等仓库补收货,或让供应商改开发票。", "Fix: wait for a further goods receipt, or have the vendor re-issue the invoice. ")}
            {!priceOk && L("处理:采购确认新价格(改 PO)或供应商开红字发票。", "Fix: purchasing confirms a new price (change the PO) or the vendor issues a credit note.")}
          </div>}
        </div>
      </div>
      <div className="viz-ctrl">
        <Slider label={L("实际收货数量 GR", "GR quantity")} min={0} max={120} value={grQty} onChange={setGrQty} />
        <Slider label={L("发票数量 IV", "Invoice qty")} min={0} max={120} value={ivQty} onChange={setIvQty} />
        <Slider label={L("发票单价", "Invoice price")} min={8} max={12} step={0.05} value={ivPrice} onChange={setIvPrice} fmt={(v) => "¥" + v.toFixed(2)} />
        <Slider label={L("价格容差", "Price tolerance")} min={0} max={10} step={0.5} value={tol} onChange={setTol} unit=" %" />
      </div>
      <div className="viz-readout">
        {L("试试:发票开 105 件而只收货 95 件——多开的 10 件没有任何人确认收到,系统拒付。三单匹配防的就是「没收到的货、被抬高的价」。",
           "Try invoicing 105 when only 95 were received — nobody confirmed those extra 10 units, so the system refuses to pay. Three-way match exists to stop goods never received and prices quietly raised.")}
      </div>
    </div>
  );
}

/* ============================================================
   P2P3 · vendorScore — weighted vendor rating
   ============================================================ */
function VendorScoreViz() {
  const L = useL();
  const [wp, setWp] = React.useState(40);
  const [wd, setWd] = React.useState(30);
  const [wq, setWq] = React.useState(20);
  const [ws, setWs] = React.useState(10);
  // raw sub-scores 0-100 (already normalized: cheaper=higher, OTD%, pass rate, service)
  const V = [
    { nm: L("华峰五金", "Huafeng"), p: 95, d: 62, q: 70, s: 60, noteZh: "最便宜,但交付与质量拖后腿", noteEn: "cheapest, but delivery and quality lag" },
    { nm: L("精工部件", "Seiko Parts"), p: 70, d: 95, q: 92, s: 85, noteZh: "贵一些,交期与质量稳定", noteEn: "pricier, rock-solid delivery and quality" },
    { nm: L("联达供应链", "Lianda"), p: 82, d: 80, q: 78, s: 90, noteZh: "各项均衡,服务响应最好", noteEn: "balanced across the board, best service" },
  ];
  const wsum = wp + wd + wq + ws || 1;
  const scored = V.map((v) => ({ ...v, score: (v.p * wp + v.d * wd + v.q * wq + v.s * ws) / wsum }))
    .sort((a, b) => b.score - a.score);
  return (
    <div>
      <div className="erp-stage">
        <table className="erp-table">
          <thead>
            <tr><th>{L("供应商", "Vendor")}</th>
              <th>{L("价格分", "Price")}</th><th>{L("交期分", "Delivery")}</th>
              <th>{L("质量分", "Quality")}</th><th>{L("服务分", "Service")}</th>
              <th>{L("加权总分", "Weighted")}</th></tr>
          </thead>
          <tbody>
            {scored.map((v, i) => (
              <tr key={v.nm} className={i === 0 ? "hl" : ""}>
                <td>{i === 0 ? "★ " : ""}{v.nm}</td>
                <td>{v.p}</td><td>{v.d}</td><td>{v.q}</td><td>{v.s}</td>
                <td className="erp-qty">{round2(v.score).toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="erp-bars" style={{ marginTop: 14 }}>
          {scored.map((v, i) => (
            <div className="erp-bar-row" key={v.nm}>
              <span>{v.nm}</span>
              <div className="b-track"><div className={`b-fill ${i === 0 ? "acc" : ""}`} style={{ width: `${v.score}%` }} /></div>
              <span className="b-val">{round2(v.score).toFixed(1)}</span>
            </div>
          ))}
        </div>
        <div className="erp-note">★ {scored[0].nm}: {L(scored[0].noteZh, scored[0].noteEn)}</div>
      </div>
      <div className="viz-ctrl">
        <Slider label={L("价格权重", "Price weight")} min={0} max={60} value={wp} onChange={setWp} unit=" %" />
        <Slider label={L("交期权重", "Delivery weight")} min={0} max={60} value={wd} onChange={setWd} unit=" %" />
        <Slider label={L("质量权重", "Quality weight")} min={0} max={60} value={wq} onChange={setWq} unit=" %" />
        <Slider label={L("服务权重", "Service weight")} min={0} max={60} value={ws} onChange={setWs} unit=" %" />
      </div>
      <div className="viz-readout">
        {L("把价格权重拉满:最便宜的华峰登顶;把交期与质量权重调高:精工反超。评分模型没有对错,权重就是你的采购战略——关键是交期分、质量分来自收货与检验单据的自动统计,谁也改不了。",
           "Max the price weight and the cheapest vendor wins; raise delivery and quality and Seiko overtakes. No weighting is 'correct' — the weights are your purchasing strategy. What matters: delivery and quality scores are computed automatically from receipt and inspection documents, and nobody can fudge them.")}
      </div>
    </div>
  );
}

/* ============================================================
   O2C1 · o2cFlow — quotation to cash document chain
   ============================================================ */
function O2cFlowViz() {
  const L = useL();
  const docs = [
    { code: "QT", zh: "报价单", en: "Quotation", subZh: "售前承诺", subEn: "pre-sales offer",
      descZh: "给客户的正式报价:50 台 × ¥1,600,含有效期。客户在有效期内下单,价格照报价执行。", descEn: "A formal offer: 50 units × ¥1,600 with a validity period. Order within it and the quoted price holds.",
      fields: [L("客户:C-200 城骑公司", "Cust: C-200"), L("数量:50 台", "Qty: 50"), L("单价:¥1,600", "Price: ¥1,600"), L("有效期:30 天", "Valid: 30 days")] },
    { code: "SO", zh: "销售订单", en: "Sales order", subZh: "接单", subEn: "order accepted",
      descZh: "客户确认后参照报价创建销售订单。系统立刻跑两道检查:ATP 算交期承诺,信用检查看额度——都过了才接单。", descEn: "Created with reference to the quotation. The system immediately runs two checks: ATP for the promise date, credit for the limit — both must pass.",
      fields: [L("ATP:07-29 可发", "ATP: ship 07-29"), L("信用:✓ 额度内", "Credit: ✓ within limit"), L("金额:¥80,000", "Value: ¥80,000")] },
    { code: "DN", zh: "交货单 + 拣货", en: "Delivery + picking", subZh: "仓库执行", subEn: "warehouse runs",
      descZh: "到发货日,参照订单创建交货单,仓库按单拣货、包装、装车。此刻库存还没动账——货还在自家仓库。", descEn: "On the ship date a delivery is created from the order; the warehouse picks, packs and loads. No posting yet — the goods are still yours.",
      fields: [L("拣货:50/50 ✓", "Picked: 50/50 ✓"), L("批次:B-0725", "Batch: B-0725")] },
    { code: "GI", zh: "发货过账", en: "Goods issue", subZh: "库存与成本动了", subEn: "stock & cost move",
      descZh: "卡车离场,过账发货:库存 −50,成本结转,所有权转移。这是 O2C 里第一笔自动分录。", descEn: "The truck leaves; goods issue posts: stock −50, cost of sales books, title transfers. The first auto-posting in O2C.",
      fields: [L("库存 −50 台", "Stock −50"), L("单位成本:¥1,180", "Unit cost: ¥1,180")],
      posting: L("借:主营业务成本  ¥59,000\n贷:库存商品     ¥59,000", "Dr Cost of goods sold ¥59,000\nCr Finished goods     ¥59,000") },
    { code: "BI", zh: "开票", en: "Billing", subZh: "收入确认", subEn: "revenue booked",
      descZh: "参照交货单开票:收入与销项税成立,应收挂到客户名下。发多少开多少——开票参照交货而非订单,防止「没发货先开票」。", descEn: "Billed with reference to the delivery: revenue and output VAT post, the receivable lands on the customer. Billing references the delivery, not the order — you cannot bill what never shipped.",
      fields: [L("收入:¥80,000", "Revenue: ¥80,000"), L("销项税 13%:¥10,400", "VAT 13%: ¥10,400")],
      posting: L("借:应收账款   ¥90,400\n贷:主营收入   ¥80,000\n贷:销项税     ¥10,400", "Dr Accounts receivable ¥90,400\nCr Revenue             ¥80,000\nCr Output VAT          ¥10,400") },
    { code: "PAY", zh: "收款核销", en: "Payment & clearing", subZh: "钱到了", subEn: "cash in",
      descZh: "客户按月结 30 天付款,银行到账后核销该笔应收。O2C 闭环完成——从报价到现金。", descEn: "The customer pays at net 30; the bank receipt clears the open item. O2C is closed — quote to cash.",
      fields: [L("到账:¥90,400", "Received: ¥90,400"), L("未清项:0", "Open items: 0")],
      posting: L("借:银行存款   ¥90,400\n贷:应收账款   ¥90,400", "Dr Bank                ¥90,400\nCr Accounts receivable ¥90,400") },
  ];
  return (
    <div>
      <DocFlow docs={docs} L={L} />
      <div className="viz-readout">
        {L("对照上一模块的 P2P:两条链是镜像——你的发货是客户的收货,你的应收是客户的应付。点击 GI 与 BI,注意「成本」与「收入」是两笔独立分录,毛利 = 两者之差。",
           "Mirror this against P2P: your shipment is the customer's receipt, your receivable their payable. Click GI and BI — cost and revenue are two separate postings, and gross margin is their difference.")}
      </div>
    </div>
  );
}

/* ============================================================
   O2C2 · atpCheck — available-to-promise timeline
   ============================================================ */
function AtpCheckViz() {
  const L = useL();
  const [req, setReq] = React.useState(250);
  const [wk, setWk] = React.useState(2);
  const [credit, setCredit] = React.useState(600);
  const onhand = 100;
  const receipts = [0, 200, 0, 200, 0, 0];   // planned receipts per week 1..6
  const commits = [80, 0, 150, 0, 0, 0];     // already-promised orders
  const price = 1.6; // k¥ per unit
  const exposure = 380; // existing AR + open orders (k¥)
  const weeks = [1, 2, 3, 4, 5, 6];
  let cum = onhand;
  const rows = weeks.map((w, i) => {
    cum += receipts[i] - commits[i];
    return { w, rec: receipts[i], com: commits[i], avail: cum };
  });
  // promisable at week wk = min of avail from wk..end
  const fromIdx = wk - 1;
  const promisable = Math.max(0, Math.min(...rows.slice(fromIdx).map((r) => r.avail)));
  const atpOk = req <= promisable;
  const newExposure = exposure + req * price;
  const creditOk = newExposure <= credit;
  return (
    <div>
      <div className="erp-stage">
        <table className="erp-table">
          <thead>
            <tr><th>{L("周", "Week")}</th>{rows.map((r) => <th key={r.w}>W{r.w}</th>)}</tr>
          </thead>
          <tbody>
            <tr><td>{L("计划流入(采购/生产)", "Planned receipts")}</td>{rows.map((r) => <td key={r.w} className={r.rec ? "pos" : "lbl"}>{r.rec ? "+" + r.rec : "·"}</td>)}</tr>
            <tr><td>{L("已承诺(先来的订单)", "Committed (earlier orders)")}</td>{rows.map((r) => <td key={r.w} className={r.com ? "neg" : "lbl"}>{r.com ? "−" + r.com : "·"}</td>)}</tr>
            <tr><td>{L("累计可用(期初 100)", "Cumulative available (opening 100)")}</td>{rows.map((r) => <td key={r.w} className="erp-qty">{r.avail}</td>)}</tr>
          </tbody>
        </table>
        <div className="erp-doc-detail" style={{ borderLeftColor: atpOk && creditOk ? "var(--primary)" : "var(--accent)" }}>
          <strong>
            {atpOk && creditOk
              ? L(`✓ 接单:W${wk} 可承诺 ${req} 件(该周起最小可用量 ${promisable})`, `✓ Accept: ${req} units promisable in W${wk} (min availability from that week: ${promisable})`)
              : L("✗ 拦截:", "✗ Blocked: ") + (!atpOk ? L(`ATP 不足 — W${wk} 起最多可承诺 ${promisable} 件;`, `ATP short — at most ${promisable} promisable from W${wk}; `) : "")
                + (!creditOk ? L(`信用超限 — 暴露 ¥${fm(newExposure)}k > 额度 ¥${fm(credit)}k`, `credit exceeded — exposure ¥${fm(newExposure)}k > limit ¥${fm(credit)}k`) : "")}
          </strong>
          <div className="erp-posting">
            ATP(W{wk}) = min{L("(该周起各周累计可用)", "(cumulative availability from that week on)")} = {promisable}{"\n"}
            {L("信用暴露", "Credit exposure")} = {L("已有应收与订单", "existing AR + open orders")} ¥{exposure}k + {L("本单", "this order")} {req}×¥{price}k = ¥{fm(newExposure)}k {creditOk ? "≤" : ">"} {L("额度", "limit")} ¥{fm(credit)}k
          </div>
        </div>
      </div>
      <div className="viz-ctrl">
        <Slider label={L("新订单数量", "New order qty")} min={0} max={500} step={10} value={req} onChange={setReq} />
        <Slider label={L("要求交货周", "Requested week")} min={1} max={6} value={wk} onChange={setWk} fmt={(v) => "W" + v} />
        <Slider label={L("客户信用额度", "Credit limit")} min={200} max={1200} step={20} value={credit} onChange={setCredit} fmt={(v) => "¥" + v + "k"} />
      </div>
      <div className="viz-readout">
        {L("试试 W2 要 250 件:虽然 W2 当周可用 220,但 W3 有先来的订单要拿走 150——承诺量必须取「该周之后所有周的最小值」,否则你答应的货会被后面的承诺挖走。",
           "Try 250 units in W2: W2 alone shows 220 available, but an earlier order takes 150 in W3 — the promise must be the minimum across all later weeks, or stock you promised gets eaten by commitments behind it.")}
      </div>
    </div>
  );
}

/* ============================================================
   O2C3 · arAging — receivables aging & DSO
   ============================================================ */
function ArAgingViz() {
  const L = useL();
  const [ages, setAges] = React.useState([15, 35, 50, 80, 110]);
  const amounts = [120, 90, 60, 45, 30]; // k¥
  const setAge = (i, v) => setAges((a) => a.map((x, j) => (j === i ? v : x)));
  const buckets = [
    { zh: "未逾期 0–30", en: "Current 0–30", lo: 0, hi: 30 },
    { zh: "逾期 31–60", en: "Overdue 31–60", lo: 31, hi: 60 },
    { zh: "逾期 61–90", en: "Overdue 61–90", lo: 61, hi: 90 },
    { zh: "逾期 > 90", en: "Overdue > 90", lo: 91, hi: 9999 },
  ];
  const total = amounts.reduce((s, a) => s + a, 0);
  const bAmt = buckets.map((b) => amounts.reduce((s, a, i) => (ages[i] >= b.lo && ages[i] <= b.hi ? s + a : s), 0));
  const dso = Math.round(amounts.reduce((s, a, i) => s + a * ages[i], 0) / total);
  const dun = (age) => age <= 30 ? L("—", "—") : age <= 60 ? L("催款函 1 级", "Dunning L1") : age <= 90 ? L("催款函 2 级 · 停止发货", "Dunning L2 · stop shipments") : L("3 级 · 移交法务 · 计提坏账", "L3 · legal · provision");
  return (
    <div>
      <div className="erp-stage">
        <table className="erp-table">
          <thead><tr><th>{L("发票", "Invoice")}</th><th>{L("金额 k¥", "Amount k¥")}</th><th>{L("账龄(天)", "Age (days)")}</th><th>{L("催收动作", "Dunning")}</th></tr></thead>
          <tbody>
            {amounts.map((a, i) => (
              <tr key={i} className={ages[i] > 90 ? "hl" : ""}>
                <td>INV-{2301 + i}</td><td>{a}</td><td className="erp-qty">{ages[i]}</td>
                <td style={{ textAlign: "left" }}>{dun(ages[i])}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="erp-bars" style={{ marginTop: 14 }}>
          {buckets.map((b, i) => (
            <div className="erp-bar-row" key={i}>
              <span>{L(b.zh, b.en)}</span>
              <div className="b-track"><div className={`b-fill ${i >= 2 ? "acc" : i === 1 ? "warn" : ""}`} style={{ width: `${(bAmt[i] / total) * 100}%` }} /></div>
              <span className="b-val">{bAmt[i]} k¥</span>
            </div>
          ))}
        </div>
        <div className="erp-note">
          {L("加权平均账龄(近似 DSO)", "Weighted average age (≈ DSO)")}: <strong>{dso} {L("天", "days")}</strong> · {L("应收总额", "total AR")}: ¥{total}k
        </div>
      </div>
      <div className="viz-ctrl">
        {amounts.map((a, i) => (
          <Slider key={i} label={`INV-${2301 + i} (¥${a}k)`} min={0} max={150} value={ages[i]} onChange={(v) => setAge(i, v)} unit={L(" 天", " d")} />
        ))}
      </div>
      <div className="viz-readout">
        {L("把几张大发票拖过 90 天:账龄尾部一重,DSO 立刻飙升——DSO 每多一天,相当于全年收入的 1/365 被客户无息占用。账龄表是财务每周必看的回款雷达。",
           "Drag the big invoices past 90 days and DSO jumps — every extra day of DSO means 1/365 of annual revenue financed interest-free for your customers. The aging report is finance's weekly collection radar.")}
      </div>
    </div>
  );
}

window.ErpEvolutionViz = ErpEvolutionViz;
window.ProcessFlowViz = ProcessFlowViz;
window.MarketMapViz = MarketMapViz;
window.OrgModelViz = OrgModelViz;
window.MaterialMasterViz = MaterialMasterViz;
window.BomExplosionViz = BomExplosionViz;
window.P2pFlowViz = P2pFlowViz;
window.ThreeWayMatchViz = ThreeWayMatchViz;
window.VendorScoreViz = VendorScoreViz;
window.O2cFlowViz = O2cFlowViz;
window.AtpCheckViz = AtpCheckViz;
window.ArAgingViz = ArAgingViz;
window.Slider = Slider;
window.Choice = Choice;
window.CodeOut = CodeOut;
window.StepCtl = StepCtl;
window.DocFlow = DocFlow;
window.useL = useL;
window.fm = fm;
window.round2 = round2;
