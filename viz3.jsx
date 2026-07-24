/* =========================================================
   viz3.jsx — E10 multi-party collaboration & 3D sandboxes
   ---------------------------------------------------------
   Requires global THREE (three.min.js UMD). Extends the VIZ
   registry from viz2.jsx. Buildings are simple BoxGeometry
   compositions — readable in a teaching sandbox, not CAD.
   ========================================================= */

function threeReady() {
  return typeof THREE !== "undefined";
}

/** Shared: mount a Three.js scene into a container, return dispose + helpers. */
function useThreeScene(containerRef, buildScene) {
  const api = React.useRef({});
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el || !threeReady()) return undefined;
    const w = el.clientWidth || 640;
    const h = Math.max(320, Math.round(w * 0.55));
    const scene = new THREE.Scene();
    const dark = document.documentElement.getAttribute("data-theme") === "dark";
    scene.background = new THREE.Color(dark ? 0x1c1f24 : 0xf3efe6);
    const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 200);
    camera.position.set(0, 14, 22);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w, h);
    renderer.shadowMap.enabled = true;
    el.innerHTML = "";
    el.appendChild(renderer.domElement);

    const hemi = new THREE.HemisphereLight(0xfff6e8, 0x8a9a88, 0.85);
    scene.add(hemi);
    const dir = new THREE.DirectionalLight(0xffffff, 0.75);
    dir.position.set(8, 18, 6);
    dir.castShadow = true;
    scene.add(dir);

    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(28, 64),
      new THREE.MeshStandardMaterial({ color: dark ? 0x2a2e34 : 0xd9d2c3, roughness: 0.95 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    const grid = new THREE.GridHelper(40, 40, 0xb8b0a0, 0xcfc7b8);
    grid.position.y = 0.01;
    scene.add(grid);

    const ctx = { scene, camera, renderer, el, groups: {}, markers: [] };
    buildScene(ctx);

    let dragging = false, px = 0, py = 0, theta = 0.35, phi = 0.85, dist = 26;
    const applyCam = () => {
      camera.position.x = dist * Math.sin(phi) * Math.cos(theta);
      camera.position.y = dist * Math.cos(phi) + 2;
      camera.position.z = dist * Math.sin(phi) * Math.sin(theta);
      camera.lookAt(0, 1.2, 0);
    };
    applyCam();

    const onDown = (e) => { dragging = true; px = e.clientX; py = e.clientY; };
    const onUp = () => { dragging = false; };
    const onMove = (e) => {
      if (!dragging) return;
      theta -= (e.clientX - px) * 0.005;
      phi = Math.max(0.25, Math.min(1.35, phi + (e.clientY - py) * 0.004));
      px = e.clientX; py = e.clientY;
      applyCam();
    };
    const onWheel = (e) => {
      e.preventDefault();
      dist = Math.max(14, Math.min(40, dist + e.deltaY * 0.02));
      applyCam();
    };
    renderer.domElement.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointermove", onMove);
    renderer.domElement.addEventListener("wheel", onWheel, { passive: false });

    let raf = 0, t0 = performance.now();
    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      const t = (now - t0) / 1000;
      if (api.current.tick) api.current.tick(t, ctx);
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(loop);

    const onResize = () => {
      const nw = el.clientWidth || 640;
      const nh = Math.max(320, Math.round(nw * 0.55));
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", onResize);

    api.current.ctx = ctx;
    api.current.applyCam = applyCam;

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      renderer.domElement.removeEventListener("pointerdown", onDown);
      renderer.domElement.removeEventListener("wheel", onWheel);
      renderer.dispose();
      el.innerHTML = "";
    };
  }, [containerRef, buildScene]);
  return api;
}

function box(w, h, d, color, y = 0) {
  const m = new THREE.Mesh(
    new THREE.BoxGeometry(w, h, d),
    new THREE.MeshStandardMaterial({ color, roughness: 0.7, metalness: 0.05 })
  );
  m.position.y = y + h / 2;
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

function makeBuilding(kind, accent) {
  const g = new THREE.Group();
  if (kind === "supplier") {
    g.add(box(2.8, 1.6, 2.2, 0x6b7c5e));
    g.add(box(1.4, 0.9, 1.2, 0x8a9a7a, 1.6));
    const silo = new THREE.Mesh(
      new THREE.CylinderGeometry(0.35, 0.35, 2.2, 12),
      new THREE.MeshStandardMaterial({ color: 0xc4b59a })
    );
    silo.position.set(1.5, 1.1, 0.9);
    silo.castShadow = true;
    g.add(silo);
  } else if (kind === "factory") {
    g.add(box(4.2, 2.2, 3.0, 0x4a5a6a));
    g.add(box(1.6, 1.4, 1.6, 0x3d4d5c, 2.2));
    const chim = new THREE.Mesh(
      new THREE.CylinderGeometry(0.28, 0.32, 3.2, 10),
      new THREE.MeshStandardMaterial({ color: 0x2f3a44 })
    );
    chim.position.set(-1.4, 3.0, -0.8);
    chim.castShadow = true;
    g.add(chim);
    g.add(box(0.8, 0.5, 2.4, accent || 0xc45c3e, 0.9));
  } else if (kind === "office") {
    g.add(box(2.4, 3.6, 2.0, 0x5c6d7e));
    for (let i = 0; i < 4; i++) {
      const band = box(2.45, 0.18, 0.08, 0xd8e4ef, 0.7 + i * 0.7);
      band.position.z = 1.02;
      g.add(band);
    }
    g.add(box(0.9, 0.15, 0.9, accent || 0xc45c3e, 3.6));
  } else if (kind === "warehouse") {
    g.add(box(3.4, 1.8, 2.6, 0x8b7355));
    const roof = new THREE.Mesh(
      new THREE.ConeGeometry(2.4, 0.9, 4),
      new THREE.MeshStandardMaterial({ color: 0x6e5a42 })
    );
    roof.position.y = 2.25;
    roof.rotation.y = Math.PI / 4;
    roof.castShadow = true;
    g.add(roof);
    g.add(box(1.2, 1.1, 0.15, 0x3a3a3a, 0.2));
  } else {
    // customer storefront
    g.add(box(2.6, 2.0, 2.2, 0x7a5c6e));
    g.add(box(1.6, 1.0, 0.12, 0xe8d5c4, 0.6));
    g.add(box(0.7, 0.35, 0.7, accent || 0xc45c3e, 2.0));
  }
  // ground pad
  const pad = new THREE.Mesh(
    new THREE.CylinderGeometry(2.6, 2.6, 0.08, 24),
    new THREE.MeshStandardMaterial({ color: 0xe8e2d6, roughness: 1 })
  );
  pad.position.y = 0.04;
  g.add(pad);
  return g;
}

function makeRoad(a, b) {
  const dir = new THREE.Vector3().subVectors(b, a);
  const len = dir.length();
  const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.35, 0.06, len),
    new THREE.MeshStandardMaterial({ color: 0xb0a898, roughness: 0.9 })
  );
  mesh.position.copy(mid);
  mesh.position.y = 0.05;
  mesh.lookAt(b.x, 0.05, b.z);
  return mesh;
}

/* ============================================================
   COL1 · collabWorld — 3D five-end supply network
   ============================================================ */
function CollabWorldViz() {
  const L = useL();
  const wrapRef = React.useRef(null);
  const [step, setStep] = React.useState(0);
  const [playing, setPlaying] = React.useState(true);
  const stepRef = React.useRef(0);
  stepRef.current = step;

  const NODES = React.useMemo(() => ([
    { id: "SUP", kind: "supplier", zh: "供应商", en: "Supplier", x: -9, z: 1, color: 0x6b7c5e },
    { id: "FAC", kind: "factory", zh: "工厂", en: "Plant", x: -2.5, z: 3.5, color: 0x4a5a6a },
    { id: "OFF", kind: "office", zh: "办公室", en: "HQ Office", x: 0.5, z: -3.5, color: 0x5c6d7e },
    { id: "WH", kind: "warehouse", zh: "成品仓", en: "FG Warehouse", x: 4.5, z: 3.2, color: 0x8b7355 },
    { id: "CUS", kind: "customer", zh: "客户", en: "Customer", x: 10, z: 0.5, color: 0x7a5c6e },
  ]), []);

  const STEPS = React.useMemo(() => ([
    { from: "CUS", to: "OFF", doc: "SO", zh: "客户下单 → 销售订单进办公室", en: "Customer order → sales order at HQ",
      erpZh: "建 SO · ATP/信用检查 · 承诺交期写回", erpEn: "Create SO · ATP/credit · promise date back" },
    { from: "OFF", to: "FAC", doc: "PRD", zh: "计划下达生产工单到工厂", en: "Planning releases production order to plant",
      erpZh: "计划订单 → 生产工单下达", erpEn: "Planned order → production order release" },
    { from: "FAC", to: "SUP", doc: "PO", zh: "缺料触发采购订单飞向供应商", en: "Shortage triggers PO to supplier",
      erpZh: "MRP 申请转 PO · 发给供应商(EDI/门户)", erpEn: "MRP PR→PO · send via EDI/portal" },
    { from: "SUP", to: "FAC", doc: "ASN", zh: "供应商发货通知 / 原料在途", en: "Supplier ASN / inbound materials",
      erpZh: "ASN 写入在途 · 收货参照 PO", erpEn: "ASN as in-transit · GR vs PO" },
    { from: "FAC", to: "WH", doc: "GR", zh: "完工入库到成品仓", en: "Finished goods receipt into warehouse",
      erpZh: "工单完工确认 → 成品收货过账", erpEn: "Final confirm → FG goods receipt" },
    { from: "WH", to: "CUS", doc: "DN", zh: "拣配发货 → 客户收货", en: "Pick & ship → customer receipt",
      erpZh: "交货单 · 发货过账 · 库存与销货成本", erpEn: "Delivery · GI · stock + COGS" },
    { from: "OFF", to: "CUS", doc: "INV", zh: "办公室开票 → 客户应付", en: "HQ bills → customer AP",
      erpZh: "参照交货开票 · 应收挂账", erpEn: "Bill vs delivery · AR open" },
    { from: "CUS", to: "OFF", doc: "PAY", zh: "客户付款回笼办公室", en: "Customer payment returns to HQ",
      erpZh: "收款核销 · 清应收", erpEn: "Incoming payment clears AR" },
  ]), []);

  const buildScene = React.useCallback((ctx) => {
    const { scene } = ctx;
    const pos = {};
    NODES.forEach((n) => {
      const b = makeBuilding(n.kind, 0xc45c3e);
      b.position.set(n.x, 0, n.z);
      scene.add(b);
      pos[n.id] = new THREE.Vector3(n.x, 0, n.z);
      ctx.groups[n.id] = b;
    });
    // roads between common pairs
    [["SUP", "FAC"], ["FAC", "OFF"], ["FAC", "WH"], ["WH", "CUS"], ["OFF", "CUS"], ["OFF", "SUP"]].forEach(([a, b]) => {
      scene.add(makeRoad(pos[a], pos[b]));
    });
    // glowing packet
    const packet = new THREE.Mesh(
      new THREE.SphereGeometry(0.28, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0xc45c3e, emissive: 0xc45c3e, emissiveIntensity: 0.55, roughness: 0.35 })
    );
    packet.position.set(0, 1.8, 0);
    scene.add(packet);
    ctx.packet = packet;
    ctx.pos = pos;
    // halo rings under active nodes
    ctx.halos = {};
    NODES.forEach((n) => {
      const halo = new THREE.Mesh(
        new THREE.RingGeometry(2.2, 2.55, 32),
        new THREE.MeshBasicMaterial({ color: 0xc45c3e, transparent: true, opacity: 0, side: THREE.DoubleSide })
      );
      halo.rotation.x = -Math.PI / 2;
      halo.position.set(n.x, 0.08, n.z);
      scene.add(halo);
      ctx.halos[n.id] = halo;
    });
  }, [NODES]);

  const api = useThreeScene(wrapRef, buildScene);

  React.useEffect(() => {
    api.current.tick = (t) => {
      const ctx = api.current.ctx;
      if (!ctx || !ctx.packet) return;
      const s = STEPS[stepRef.current];
      const a = ctx.pos[s.from], b = ctx.pos[s.to];
      const u = (Math.sin(t * 1.4) * 0.5 + 0.5);
      ctx.packet.position.lerpVectors(a, b, u);
      ctx.packet.position.y = 1.6 + Math.sin(t * 3) * 0.25;
      Object.keys(ctx.halos).forEach((id) => {
        const on = id === s.from || id === s.to;
        ctx.halos[id].material.opacity = on ? 0.55 + Math.sin(t * 4) * 0.15 : 0;
      });
    };
  }, [api, STEPS]);

  React.useEffect(() => {
    if (!playing) return undefined;
    const id = setInterval(() => setStep((s) => (s + 1) % STEPS.length), 2800);
    return () => clearInterval(id);
  }, [playing, STEPS.length]);

  const cur = STEPS[step];
  if (!threeReady()) {
    return <div className="erp-note">{L("正在加载 Three.js…刷新页面或检查网络。", "Loading Three.js… refresh or check the network.")}</div>;
  }

  return (
    <div>
      <div className="erp-3d-shell">
        <div className="erp-3d-canvas" ref={wrapRef} />
        <div className="erp-3d-legend">
          {NODES.map((n) => (
            <span key={n.id} className={`erp-3d-chip ${(cur.from === n.id || cur.to === n.id) ? "on" : ""}`}>
              <i style={{ background: "#" + n.color.toString(16).padStart(6, "0") }} />
              {L(n.zh, n.en)}
            </span>
          ))}
          <span className="erp-3d-hint">{L("拖拽旋转 · 滚轮缩放", "Drag to orbit · scroll to zoom")}</span>
        </div>
      </div>
      <div className="erp-doc-detail" style={{ marginTop: 12 }}>
        <strong>{String(step + 1).padStart(2, "0")} / {STEPS.length} · {cur.doc} · {L(cur.zh, cur.en)}</strong>
        <div className="fields" style={{ marginTop: 8 }}>
          <span>{L("从", "From")} {L(NODES.find((n) => n.id === cur.from).zh, NODES.find((n) => n.id === cur.from).en)}</span>
          <span>{L("到", "To")} {L(NODES.find((n) => n.id === cur.to).zh, NODES.find((n) => n.id === cur.to).en)}</span>
        </div>
        <div className="erp-posting">ERP · {L(cur.erpZh, cur.erpEn)}</div>
      </div>
      <div className="viz-ctrl" style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
        <button className="btn erp-minibtn" onClick={() => setPlaying((p) => !p)}>{playing ? L("暂停", "Pause") : L("自动播放", "Autoplay")}</button>
        <StepCtl cur={step} setCur={setStep} max={STEPS.length - 1} L={L} />
      </div>
      <div className="viz-readout">
        {L("光点飞过的不是「物流动画片」,而是 ERP 单据状态在五端之间的投影:供应商门户、工厂报工、办公室开票、仓库发货、客户收货——物理分散,事实唯一。拖动视角,找找哪条路上还没有光——那就是协同断点。",
           "The flying light is not a logistics cartoon — it is ERP document status projected across five ends: supplier portal, plant confirmation, HQ billing, warehouse GI, customer receipt. Physically scattered, one truth. Orbit and spot the dark road — that is where collaboration breaks.")}
      </div>
    </div>
  );
}

/* ============================================================
   COL2 · e2eProgress — five-lane end-to-end progress board
   ============================================================ */
function E2eProgressViz() {
  const L = useL();
  const [scene, setScene] = React.useState("happy");
  const [tick, setTick] = React.useState(4);

  const SCENES = {
    happy: {
      zh: "顺利交付", en: "Happy path",
      lanes: [
        { id: "SUP", zh: "供应商", en: "Supplier", pct: 100, doc: "PO-7781 ✓ ASN ✓", wait: false,
          tipZh: "原料已到厂并完成收货", tipEn: "Materials received at plant" },
        { id: "FAC", zh: "工厂", en: "Plant", pct: 100, doc: "WO-5521 完工", wait: false,
          tipZh: "全部工序报工完成", tipEn: "All operations confirmed" },
        { id: "OFF", zh: "办公室", en: "Office", pct: 85, doc: "SO-11040 · 待开票", wait: false,
          tipZh: "等发货过账后自动可开票", tipEn: "Billing unlocks after GI" },
        { id: "WH", zh: "仓库", en: "Warehouse", pct: 70, doc: "DN-80331 拣配中", wait: false,
          tipZh: "拣配完成后发货过账", tipEn: "GI after pick complete" },
        { id: "CUS", zh: "客户", en: "Customer", pct: 40, doc: "门户:生产完成", wait: false,
          tipZh: "对外只显示里程碑,不暴露内部阻塞细节", tipEn: "Portal shows milestones, not internal blockers" },
      ],
    },
    blocked: {
      zh: "缺料阻塞", en: "Material shortage",
      lanes: [
        { id: "SUP", zh: "供应商", en: "Supplier", pct: 55, doc: "PO-7781 逾期", wait: true,
          tipZh: "确认交期未回写 → MRP 在途失真", tipEn: "No confirmed date → MRP in-transit wrong" },
        { id: "FAC", zh: "工厂", en: "Plant", pct: 20, doc: "WO-5521 缺料冻结", wait: true,
          tipZh: "工单不能开工,进度条故意停住", tipEn: "Order frozen — progress bar must stop" },
        { id: "OFF", zh: "办公室", en: "Office", pct: 35, doc: "SO 承诺风险", wait: true,
          tipZh: "销售应改承诺或加急,而不是假装绿灯", tipEn: "Sales must re-promise or expedite — not fake green" },
        { id: "WH", zh: "仓库", en: "Warehouse", pct: 0, doc: "无交货单", wait: false,
          tipZh: "上游未完工,仓库无单可拣", tipEn: "Nothing to pick until upstream finishes" },
        { id: "CUS", zh: "客户", en: "Customer", pct: 15, doc: "门户:排产中", wait: true,
          tipZh: "对外文案保持诚实区间,避免「已发货」谎言", tipEn: "Honest milestone band — never claim 'shipped'" },
      ],
    },
    credit: {
      zh: "信用冻结", en: "Credit block",
      lanes: [
        { id: "SUP", zh: "供应商", en: "Supplier", pct: 0, doc: "—", wait: false,
          tipZh: "订单未确认,尚未触发采购", tipEn: "SO not confirmed — purchasing not triggered" },
        { id: "FAC", zh: "工厂", en: "Plant", pct: 0, doc: "—", wait: false,
          tipZh: "无工单", tipEn: "No production order" },
        { id: "OFF", zh: "办公室", en: "Office", pct: 25, doc: "SO 信用拦截", wait: true,
          tipZh: "责任:信用专员 / 销售经理特批", tipEn: "Owner: credit clerk / sales exception" },
        { id: "WH", zh: "仓库", en: "Warehouse", pct: 0, doc: "—", wait: false,
          tipZh: "无交货", tipEn: "No delivery" },
        { id: "CUS", zh: "客户", en: "Customer", pct: 5, doc: "门户:审核中", wait: true,
          tipZh: "不要对客户说「系统坏了」——说「信用评估中」", tipEn: "Don't say 'system down' — say 'credit review'" },
      ],
    },
  };

  const TIMELINE = [
    { zh: "客户下单", en: "Customer orders" },
    { zh: "信用/ATP", en: "Credit / ATP" },
    { zh: "计划排产", en: "Plan & release" },
    { zh: "采购到料", en: "Buy & receive" },
    { zh: "生产报工", en: "Produce & confirm" },
    { zh: "拣配发货", en: "Pick & ship" },
    { zh: "开票收款", en: "Bill & collect" },
  ];

  const sc = SCENES[scene];
  const overall = Math.round(sc.lanes.reduce((s, l) => s + l.pct, 0) / sc.lanes.length);

  return (
    <div>
      <div className="erp-stage">
        <div className="erp-e2e-head">
          <div>
            <div className="mono" style={{ fontSize: 11, letterSpacing: "0.12em", color: "var(--muted)" }}>SO-11040 · BIKE-26 × 500</div>
            <div style={{ fontFamily: "Noto Serif SC, serif", fontSize: 22, marginTop: 4 }}>{L("端到端协同进度", "E2E collaboration progress")}</div>
          </div>
          <div className="erp-e2e-overall">
            <span className="mono">{L("综合", "Overall")}</span>
            <strong>{overall}%</strong>
          </div>
        </div>

        <div className="erp-e2e-timeline">
          {TIMELINE.map((t, i) => (
            <div key={i} className={`erp-e2e-node ${i <= tick ? "on" : ""} ${i === tick ? "now" : ""}`}
              onClick={() => setTick(i)}>
              <span className="n">{String(i + 1).padStart(2, "0")}</span>
              <span className="l">{L(t.zh, t.en)}</span>
            </div>
          ))}
        </div>

        <div className="erp-e2e-lanes">
          {sc.lanes.map((lane) => (
            <div key={lane.id} className={`erp-e2e-lane ${lane.wait ? "wait" : ""}`}>
              <div className="lane-meta">
                <strong>{L(lane.zh, lane.en)}</strong>
                <span className="mono">{lane.pct}%</span>
              </div>
              <div className="lane-track">
                <div className="lane-fill" style={{ width: `${lane.pct}%` }} />
              </div>
              <div className="lane-doc mono">{lane.doc}</div>
              <div className="lane-tip">{L(lane.tipZh, lane.tipEn)}</div>
              {lane.wait && <div className="lane-flag">{L("阻塞 · 需升级", "BLOCKED · escalate")}</div>}
            </div>
          ))}
        </div>
      </div>
      <div className="viz-ctrl">
        <Choice label={L("情景", "Scenario")} value={scene} onChange={setScene}
          options={Object.keys(SCENES).map((k) => ({ v: k, l: L(SCENES[k].zh, SCENES[k].en) }))} />
      </div>
      <div className="viz-readout">
        {L("进度条的每一个百分点都必须能点回一张单据状态——手工填「完成 80%」的协同看板,三周后就会变成互不信任的 Excel。切换到「缺料阻塞」:工厂与供应商变红,仓库保持 0% 是正确的诚实,不是系统失灵。",
           "Every percent on these bars must drill to a document state — a board where people type '80% done' becomes an untrusted spreadsheet in three weeks. Switch to Material shortage: plant and supplier go red; warehouse staying at 0% is honest, not a bug.")}
      </div>
    </div>
  );
}

/* ============================================================
   COL3 · factoryTwin — 3D factory stations + work-order token
   ============================================================ */
function FactoryTwinViz() {
  const L = useL();
  const wrapRef = React.useRef(null);
  const [st, setSt] = React.useState(0);
  const [auto, setAuto] = React.useState(true);
  const stRef = React.useRef(0);
  stRef.current = st;

  const STATIONS = React.useMemo(() => ([
    { id: "RCV", zh: "收料", en: "Receive", x: -8, z: 0, erpZh: "参照 PO 收货 · 质检库存", erpEn: "GR vs PO · QI stock" },
    { id: "MCH", zh: "机加", en: "Machine", x: -4, z: 2, erpZh: "工序 0010 报工 · 倒冲材料", erpEn: "Op 0010 confirm · backflush" },
    { id: "ASM", zh: "组装", en: "Assemble", x: 0, z: 0, erpZh: "工序 0020 报工 · 工时进成本", erpEn: "Op 0020 confirm · hours to cost" },
    { id: "PKG", zh: "包装", en: "Pack", x: 4, z: 2, erpZh: "工序 0030 · 序列号/批次", erpEn: "Op 0030 · serial/batch" },
    { id: "SHP", zh: "出货", en: "Ship", x: 8, z: 0, erpZh: "完工入库 → 可建交货单", erpEn: "FG receipt → delivery eligible" },
  ]), []);

  const buildScene = React.useCallback((ctx) => {
    const { scene } = ctx;
    // factory hall shell
    const hall = box(22, 0.2, 10, 0xcfc6b6, 0);
    hall.position.set(0, 0, 0);
    scene.add(hall);
    // back wall
    const wall = box(22, 3.2, 0.25, 0x9aa3ad);
    wall.position.set(0, 0, -4.8);
    scene.add(wall);

    ctx.stations = {};
    STATIONS.forEach((s, i) => {
      const g = new THREE.Group();
      const bench = box(2.2, 1.1, 1.6, i % 2 ? 0x5a6a78 : 0x6a5a4a);
      g.add(bench);
      const arm = box(0.35, 1.6, 0.35, 0x333333, 1.1);
      arm.position.x = 0.7;
      g.add(arm);
      const light = new THREE.Mesh(
        new THREE.SphereGeometry(0.22, 12, 12),
        new THREE.MeshStandardMaterial({ color: 0x88aa88, emissive: 0x224422, emissiveIntensity: 0.2 })
      );
      light.position.set(0, 2.0, 0);
      g.add(light);
      g.position.set(s.x, 0, s.z);
      scene.add(g);
      ctx.stations[s.id] = { group: g, light };
      // conveyor segment
      if (i < STATIONS.length - 1) {
        const n = STATIONS[i + 1];
        const a = new THREE.Vector3(s.x, 0, s.z);
        const b = new THREE.Vector3(n.x, 0, n.z);
        scene.add(makeRoad(a, b));
      }
    });

    const token = new THREE.Mesh(
      new THREE.BoxGeometry(0.7, 0.5, 0.7),
      new THREE.MeshStandardMaterial({ color: 0xc45c3e, emissive: 0xc45c3e, emissiveIntensity: 0.35 })
    );
    token.position.set(STATIONS[0].x, 1.4, STATIONS[0].z);
    scene.add(token);
    ctx.token = token;

    // office balcony hint (small office block overlooking floor)
    const office = makeBuilding("office", 0xc45c3e);
    office.scale.set(0.55, 0.55, 0.55);
    office.position.set(-10.5, 0, -3.5);
    scene.add(office);
  }, [STATIONS]);

  const api = useThreeScene(wrapRef, buildScene);

  React.useEffect(() => {
    api.current.tick = (t) => {
      const ctx = api.current.ctx;
      if (!ctx || !ctx.token) return;
      const i = stRef.current;
      const s = STATIONS[i];
      const next = STATIONS[Math.min(i + 1, STATIONS.length - 1)];
      const phase = (Math.sin(t * 1.6) * 0.5 + 0.5);
      const a = new THREE.Vector3(s.x, 1.4, s.z);
      const b = new THREE.Vector3(next.x, 1.4, next.z);
      if (i < STATIONS.length - 1) ctx.token.position.lerpVectors(a, b, phase * 0.35);
      else ctx.token.position.copy(a);
      ctx.token.rotation.y = t * 0.8;
      STATIONS.forEach((stn, idx) => {
        const lit = ctx.stations[stn.id].light;
        const on = idx === i;
        lit.material.emissiveIntensity = on ? 0.9 + Math.sin(t * 5) * 0.2 : 0.15;
        lit.material.color.setHex(on ? 0xc45c3e : idx < i ? 0x6aaa6a : 0x556655);
      });
    };
  }, [api, STATIONS]);

  React.useEffect(() => {
    if (!auto) return undefined;
    const id = setInterval(() => setSt((s) => (s + 1) % STATIONS.length), 2400);
    return () => clearInterval(id);
  }, [auto, STATIONS.length]);

  const cur = STATIONS[st];
  const pct = Math.round(((st + 1) / STATIONS.length) * 100);

  if (!threeReady()) {
    return <div className="erp-note">{L("正在加载 Three.js…", "Loading Three.js…")}</div>;
  }

  return (
    <div>
      <div className="erp-3d-shell">
        <div className="erp-3d-canvas" ref={wrapRef} />
        <div className="erp-3d-legend">
          {STATIONS.map((s, i) => (
            <button key={s.id} className={`erp-3d-chip ${i === st ? "on" : i < st ? "done" : ""}`}
              onClick={() => setSt(i)}>
              {L(s.zh, s.en)}
            </button>
          ))}
          <span className="erp-3d-hint">{L("左侧小楼 = 办公室俯瞰现场", "Small building = office overlooking the floor")}</span>
        </div>
      </div>
      <div className="erp-doc-detail" style={{ marginTop: 12 }}>
        <strong>WO-5521 · {L(cur.zh, cur.en)} · {L("工单进度", "WO progress")} {pct}%</strong>
        <div className="erp-posting" style={{ marginTop: 8 }}>ERP ← {L(cur.erpZh, cur.erpEn)}</div>
        <div className="erp-note" style={{ marginTop: 8 }}>
          {L("令牌只在报工成功后才应跳到下一工位——现场「看起来做完了」但没扫码,办公室进度条不得前进。",
             "The token should advance only after a successful confirmation — if the floor 'looks done' but nobody scanned, the office progress bar must not move.")}
        </div>
      </div>
      <div className="viz-ctrl" style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
        <button className="btn erp-minibtn" onClick={() => setAuto((p) => !p)}>{auto ? L("暂停", "Pause") : L("自动流转", "Auto flow")}</button>
        <StepCtl cur={st} setCur={setSt} max={STATIONS.length - 1} L={L} />
      </div>
      <div className="viz-readout">
        {L("MES 可以按秒采集机台信号;ERP 要的是管理账上的状态跃迁与成本归集。两者之间靠报工/接口对齐——这就是「数字孪生」在制造 ERP 里的务实含义:不是炫酷的 3D 本身,而是现场与系统同一步伐。",
           "MES may sample machines by the second; ERP needs management-ledger state jumps and cost collection. Confirmations/APIs align the two — that is the practical meaning of a digital twin in manufacturing ERP: not the 3D gloss itself, but floor and system in lockstep.")}
      </div>
    </div>
  );
}

/* ---- register into viz2's VIZ map ---- */
if (typeof VIZ !== "undefined") {
  VIZ.collabWorld = () => <CollabWorldViz />;
  VIZ.e2eProgress = () => <E2eProgressViz />;
  VIZ.factoryTwin = () => <FactoryTwinViz />;
}
window.CollabWorldViz = CollabWorldViz;
window.E2eProgressViz = E2eProgressViz;
window.FactoryTwinViz = FactoryTwinViz;
