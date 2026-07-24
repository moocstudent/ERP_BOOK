/* =========================================================
   i18n — Chinese / English switching
   ---------------------------------------------------------
   UI            : dictionary of interface strings { key: {zh, en} }
   LangContext   : current language ("zh" | "en")
   useLangState(): App-level state hook (persists to localStorage)
   useLang()     : read current language inside any component
   useT()        : returns t(key) -> localized UI string
   pick(lang,obj): localize a content object { zh, en } (or a plain string)
   ========================================================= */

const LANG_KEY = "erp_book_lang";

const LangContext = React.createContext("zh");

function useLangState() {
  const [lang, setLangRaw] = React.useState(() => {
    try { return localStorage.getItem(LANG_KEY) || "zh"; } catch (e) { return "zh"; }
  });
  React.useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-Hans" : "en";
    document.documentElement.setAttribute("data-lang", lang);
  }, [lang]);
  const setLang = (l) => {
    try { localStorage.setItem(LANG_KEY, l); } catch (e) {}
    setLangRaw(l);
  };
  const toggle = () => setLang(lang === "zh" ? "en" : "zh");
  return [lang, setLang, toggle];
}

function useLang() { return React.useContext(LangContext); }

function useT() {
  const lang = React.useContext(LangContext);
  return (key) => {
    const e = UI[key];
    if (e === undefined) return key;
    if (typeof e === "object") return e[lang] !== undefined ? e[lang] : e.zh;
    return e;
  };
}

// Localize a { zh, en } object; a bare string is returned as-is.
function pick(lang, obj) {
  if (obj == null) return "";
  if (typeof obj === "string") return obj;
  return obj[lang] !== undefined ? obj[lang] : (obj.zh !== undefined ? obj.zh : obj.en);
}
// The "other" language for a content object (used for the sub-title lines).
function other(lang, obj) { return pick(lang === "zh" ? "en" : "zh", obj); }

// "{n} 章" -> fmt("{n} 章", {n: 3})
function fmt(str, map) {
  return String(str).replace(/\{(\w+)\}/g, (_, k) => (map[k] !== undefined ? map[k] : `{${k}}`));
}

const UI = {
  /* nav */
  nav_home:    { zh: "首页", en: "Home" },
  nav_about:   { zh: "关于", en: "About" },
  nav_modules: { zh: "模块", en: "Modules" },
  lang_title:  { zh: "切换语言", en: "Switch language" },
  theme_title: { zh: "切换主题", en: "Toggle theme" },

  /* hero */
  hero_badge:  { zh: "开源 · 中英双语 · ERP 自学", en: "Open · bilingual · self-taught ERP" },
  hero_l1:     { zh: "先跑通业务,", en: "First run the business," },
  hero_l2a:    { zh: "再讲清", en: "then nail the" },
  hero_l2b:    { zh: "系统。", en: "system." },
  hero_sub:    {
    zh: "一站式 ERP 自学地图:业务闭环、角色、多端 3D 协同、工厂硬件,以及 RS-485/Modbus→MQTT/HTTPS→ERP 的协议分层对接。共 {M} 个模块、{C} 章。",
    en: "A self-study ERP map: business loops, roles, multi-party 3D sync, factory hardware, and protocol layering RS-485/Modbus→MQTT/HTTPS→ERP. {M} modules, {C} chapters.",
  },
  cta_start:   { zh: "从第一章开始 →", en: "Start chapter 1 →" },
  cta_howto:   { zh: "如何使用", en: "How it works" },
  cta_roadmap: { zh: "查看路线图", en: "See the roadmap" },

  meta_modules:  { zh: "模块", en: "Modules" },
  meta_chapters: { zh: "章", en: "Chapters" },
  meta_demos:    { zh: "业务沙盘", en: "Live sandboxes" },
  meta_hours:    { zh: "小时", en: "Hours" },

  your_progress: { zh: "你的进度", en: "Your progress" },
  synced:        { zh: "本地保存 · 无需登录", en: "Saved locally · no login" },

  /* sections */
  sec01:       { zh: "学习路线图", en: "Learning roadmap" },
  sec01_aside: { zh: "从一张采购申请到整套业财闭环", en: "From one purchase requisition to the full business loop" },
  sec02:       { zh: "课程模块", en: "Course modules" },
  sec02_aside: { zh: "点击进入任意模块", en: "Click any module to enter" },
  sec03:       { zh: "学习方法", en: "The method" },
  sec03_aside: { zh: "先沙盘,再解释,后复盘", en: "Sandbox, then explanation, then replay" },

  rm_notstarted: { zh: "未开始", en: "Not started" },
  rm_done:       { zh: "已完成", en: "Done" },

  hours_unit:    { zh: "小时", en: "h" },
  modules_count: { zh: "章", en: "chapters" },
  done_word:     { zh: "完成", en: "done" },
  enter_word:    { zh: "进入 →", en: "Enter →" },

  phil1_zh: { zh: "先玩沙盘", en: "Play the sandbox" },
  phil1_b:  {
    zh: "每一章开头就是一个可交互的业务沙盘:改需求数量、调提前期、放一张收货单,立刻看到 MRP 计算、库存曲线或会计分录怎么变。ERP 不是背出来的,是「跑」出来的。",
    en: "Every chapter opens with an interactive business sandbox: change a demand quantity, tune a lead time, post a goods receipt — and watch the MRP run, the stock curve or the journal entries respond instantly. You don't memorize ERP — you run it.",
  },
  phil2_zh: { zh: "再读解释", en: "Read the explanation" },
  phil2_b:  {
    zh: "沙盘背后是逻辑:单据为什么长这样、三单匹配在防什么、MRP 逐层展开的算法、每一笔业务如何自动生成借贷分录。「解释」部分把每个字段与每条规则的动机讲清楚。",
    en: "Behind the sandbox sits the logic: why documents look the way they do, what three-way match protects against, how MRP explodes level by level, how every operational event auto-generates debits and credits. The explanation section motivates every field and every rule.",
  },
  phil3_zh: { zh: "最后复盘", en: "Replay it yourself" },
  phil3_b:  {
    zh: "每章的练习会要求你脱离本站,用纸笔或电子表格把流程重算一遍:自己做一次 MRP 展开、自己配平一组分录、自己算一次移动平均——能重算,才算真的懂。",
    en: "The exercises then ask you to replay the process away from this site, on paper or in a spreadsheet: run an MRP explosion yourself, balance a set of journal entries yourself, compute a moving average yourself — if you can recompute it, you truly understand it.",
  },

  footer_tag:  { zh: "self-taught erp · ERP 自学 · 2026", en: "self-taught erp · 2026" },
  footer_sync: { zh: "进度本地保存", en: "progress saved locally" },

  /* module page */
  bc_home:    { zh: "首页", en: "Home" },
  bc_modules: { zh: "模块", en: "Modules" },
  module_word:{ zh: "模块", en: "Module" },
  of_word:    { zh: "共", en: "of" },
  m_meta_chapters: { zh: "章数", en: "Chapters" },
  m_meta_hours:    { zh: "预计小时", en: "Est. hours" },
  m_meta_level:    { zh: "难度", en: "Level" },
  m_meta_progress: { zh: "进度", en: "Progress" },
  chapter_list: { zh: "本模块章节", en: "Chapters in this module" },
  click_enter:  { zh: "点击任意章节进入", en: "Click a chapter to enter" },
  no_prereq:    { zh: "无先修", en: "No prereq" },
  prereq_n:     { zh: "{n} 项先修", en: "{n} prereq" },
  not_found_m:  { zh: "未找到该模块。", en: "Module not found." },

  diff_1: { zh: "入门", en: "Intro" },
  diff_2: { zh: "进阶", en: "Core" },
  diff_3: { zh: "挑战", en: "Advanced" },

  /* chapter page */
  ch_sec_intro:   { zh: "本章导读", en: "Overview" },
  ch_sec_obj:     { zh: "学习目标", en: "Objectives" },
  ch_sec_outline: { zh: "内容大纲", en: "Outline" },
  ch_sec_viz:     { zh: "沙盘 · 可交互演练", en: "The sandbox · live demo" },
  ch_sec_notes:   { zh: "解释 · 核心讲义", en: "The explanation · core notes" },
  viz_hint:     { zh: "改动参数,亲眼看单据、库存与账目如何联动;数字是活的,大胆试。", en: "Change the parameters and watch documents, stock and ledgers move together; the numbers are live — experiment freely." },
  key_badge:    { zh: "重点", en: "Key" },
  loading_notes:{ zh: "正在加载讲义……", en: "Loading notes…" },
  notes_soon:   { zh: "本章深度讲义正在编写中。以上目标与大纲即为本章脉络,先把上面的沙盘玩透。", en: "The deep-dive notes for this chapter are being written. Use the objectives and outline above as your map — and play with the sandbox first." },
  back_to:      { zh: "返回", en: "Back to" },
  est_word:     { zh: "预计", en: "Est." },
  level_word:   { zh: "难度", en: "Level" },
  props_word:   { zh: "关键概念", en: "Key concepts" },
  mark_done_btn:{ zh: "标记为已完成", en: "Mark as complete" },
  marked_done:  { zh: "已完成", en: "Completed" },
  not_found_c:  { zh: "未找到该章节。", en: "Chapter not found." },

  /* about */
  about_kicker: { zh: "关于本站", en: "About" },
  about_q:      { zh: "为什么造这个站?", en: "Why this site?" },
  about_sub:    { zh: "把 ERP 讲成「沙盘 + 解释」,而不只是软件按钮说明书。", en: "Teach ERP as sandbox + explanation, not a manual of software buttons." },
  about_h1: { zh: "这是什么", en: "What this is" },
  about_p1: {
    zh: "一个面向自学者的 ERP 教程,共 {M} 个模块、{C} 章。覆盖主数据与三大闭环、财务与实施、角色与多端协同,以及工厂硬件(安灯、扫码、RFID、PLC 等)如何支撑现场采集——概念上与 HARDWARE_BOOK 的传感/总线互相参照。",
    en: "A self-study ERP course — {M} modules, {C} chapters. Covers master data and the three loops, finance and implementation, roles and multi-party sync, plus factory hardware (andon, scanners, RFID, PLC…) that powers floor capture — cross-referenced with HARDWARE_BOOK sensing and buses.",
  },
  about_p1b: { zh: "全部内容中英双语,支持浅色/深色主题,进度保存在你自己的浏览器里,无需注册。", en: "Everything is bilingual (Chinese/English), supports light and dark themes, and keeps your progress in your own browser — no signup." },
  about_h2: { zh: "「沙盘与解释」是什么意思", en: "What 'sandbox & explanation' means" },
  about_p2: {
    zh: "市面上的 ERP 培训大多是某个软件的按钮操作手册——会点,但不懂。本站每章都拆成两半:「沙盘」是一个可交互的业务演练,你改数量、调参数就能看到单据流、库存曲线与会计分录怎么联动;「解释」讲清 ERP 在背后维护的逻辑:为什么要三单匹配、MRP 怎么逐层展开、移动平均价怎么算、月结到底在结什么。看得见的联动 + 讲得清的逻辑,才构成理解——而且不绑定任何一家厂商。",
    en: "Most ERP training out there is a click-here manual for one vendor's software — you learn the buttons, not the ideas. Every chapter here splits in two: the sandbox is an interactive business exercise where changing quantities and parameters shows you how document flows, stock curves and journal entries move together; the explanation covers the logic ERP maintains underneath — why three-way match exists, how MRP explodes level by level, how a moving average price is computed, what a month-end close actually closes. Visible cause-and-effect plus clear logic is what understanding is made of — and none of it is tied to a single vendor.",
  },
  about_h3: { zh: "不绑定任何厂商", en: "Vendor-neutral by design" },
  about_p3: {
    zh: "SAP、Oracle、用友、金蝶、Odoo 的界面各不相同,但底层概念高度一致:主数据、单据流、MRP、库存估价、复式记账。本站只讲这些「不随厂商变化的骨架」,并在需要时对照各家的叫法。学会骨架,再上手任何一套 ERP 都只是「换了皮肤」。",
    en: "SAP, Oracle, Yonyou, Kingdee and Odoo all look different, yet the underlying concepts are nearly identical: master data, document flows, MRP, inventory valuation, double-entry bookkeeping. This site teaches only that vendor-invariant skeleton, mapping each vendor's terminology where it helps. Learn the skeleton, and any ERP you touch afterwards is just a different skin.",
  },
  about_h4: { zh: "如何使用", en: "How to use it" },
  about_p4: {
    zh: "按路线图学:业务闭环 → 角色 → 多端协同 → 工厂硬件采集。每章先沙盘后讲义。硬件章可与 HARDWARE_BOOK 对照阅读。",
    en: "Follow the roadmap: business loops → roles → multi-party sync → factory hardware capture. Sandbox first, notes second. Hardware chapters pair with HARDWARE_BOOK.",
  },
};

window.LangContext = LangContext;
window.useLangState = useLangState;
window.useLang = useLang;
window.useT = useT;
window.pick = pick;
window.other = other;
window.fmt = fmt;
window.UI = UI;
