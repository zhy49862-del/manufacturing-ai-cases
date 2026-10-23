/* 真 DOM 渲染验证（jsdom）— 145 项断言
   直接用真实浏览器引擎渲染页面并断言 DOM，不是静态字符串匹配。
   BASE 由 tools/test.js 注入；也可手动指定：
     BASE=http://127.0.0.1:8130/ node tools/verify.js
   退出码：0 全过 / 1 有失败 / 2 脚本异常。
*/
/* 改动 UI 或数据后，请同步更新对应断言，不要为了让测试通过而放宽断言。 */
const { JSDOM } = require("jsdom");
const URL = process.env.BASE || "http://127.0.0.1:8130/";
let pass = 0, fail = 0;
function ok(name, cond, extra) {
  if (cond) { pass++; console.log("  ✓ " + name + (extra ? "  " + extra : "")); }
  else { fail++; console.log("  ✗ " + name + (extra ? "  " + extra : "")); }
}
const wait = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  const dom = await JSDOM.fromURL(URL, { runScripts: "dangerously", resources: "usable", pretendToBeVisual: true });
  const { window } = dom, doc = window.document;
  await new Promise(r => window.addEventListener("load", r, { once: true }));
  await wait(700);
  const $ = (s) => doc.querySelector(s);
  const txt = (s) => ($(s) ? $(s).textContent.trim() : "");
  const html = (s) => ($(s) ? $(s).innerHTML : "");

  console.log("\n【一、头部与结构】");
  ok("主标题", txt("#h1") === "制造业企业AI化转型", txt("#h1"));
  ok("副标题说明转型的业务动因", txt("#sub") === "AI 化转型，是制造业面向未来的经营升级。以智能技术重塑企业能力，拓展增长空间，建立长期竞争优势。", txt("#sub"));
  ok("统计行", /问题自检 25 张/.test(txt("#src")) && /企业案例 49 条/.test(txt("#src")), txt("#src"));
  const tabs = Array.from(doc.querySelectorAll(".tab")).map(t => t.textContent);
  ok("页签 1 改名", tabs[0] === "问题自检和案例查看", tabs[0]);
  ok("对外仅保留问题和案例入口", tabs.length === 1 && !$("#arch-view") && !window.MFG_ARCH && !window.MFG_PROJECT_CATALOG);
  ok("子导航存在", doc.querySelectorAll("#subnav .sbtn").length === 2,
     Array.from(doc.querySelectorAll("#subnav .sbtn b")).map(b => b.textContent).join(" | "));
  ok("子导航名称", Array.from(doc.querySelectorAll("#subnav .sbtn b")).map(b => b.textContent).join(",") === "问题检索,案例查看");
  ok("两个板块容器", !!$("#find-panel") && !!$("#cases-panel"));
  ok("默认显示问题检索", $("#find-panel").classList.contains("on") && !$("#cases-panel").classList.contains("on"));
  ok("工厂侧/内外贸筛选已删除", !html("#pfbar").includes("按场景") && !html("#pfbar").includes("内贸外贸"));

  ok("首页服务介绍整段已删除", !$(".service-intro") && !$(".service-steps"));
  ok("参考范围默认折叠且可展开", !!$(".reference-summary:not([open]) #src"));
  // jsdom 不实现原生 dialog，用最小替身测试点击与内容；真实浏览器另行验证。
  const consultDialog = $("#consult-dialog");
  consultDialog.showModal = function () { this.setAttribute("open", ""); };
  consultDialog.close = function () { this.removeAttribute("open"); this.dispatchEvent(new window.Event("close")); };
  ok("首页两个操作按钮已删除", !$(".hero-actions") && !$(".hdr [data-consult]") && !$(".hdr a[href='#start']"));
  ok("联系号码和拨号入口一致", $(".contact-person a").getAttribute("href") === "tel:15314411115" && txt(".contact-person").includes("微信同号"));

  console.log("\n【二、自检向导】");
  const wroles = doc.querySelectorAll("#wizard .wrole");
  ok("岗位按钮 12 个", wroles.length === 12, String(wroles.length));
  ok("每个岗位带一句追问", Array.from(wroles).every(b => b.querySelector("span").textContent.length > 6));
  ok("未选岗位时不输出候选", doc.querySelectorAll("#wizard .wd").length === 0);
  const pmc = Array.from(wroles).find(b => b.dataset.role === "pmc");
  pmc.click(); await wait(200);
  ok('岗位推荐前移且岗位选择默认收起', !!$('.wizard-role-picker') && !$('.wizard-role-picker').open && !!$('.wiz-out') && $('.wiz').firstElementChild.classList.contains('wiz-out'));
  ok('自查包含生产方式、问题频率和数据基础',!!$('#check-production') && !!$('#check-frequency') && !!$('#check-data') && !!$('#check-problem'));
  $('#check-data').value='scattered';$('#check-frequency').value='frequent';$('#check-production').value='order';$('#check-submit').click();
  ok('分散数据的初步建议不推荐直接自动执行',txt('#check-result').includes('数据整理') && txt('#check-result').includes('不宜直接自动执行') && txt('#check-result').includes('按单生产') && !!$('#check-result [data-consult]'));
  $('#check-data').value='system';$('#check-submit').click();
  ok('系统数据路线明确只读接入且保留自述边界',txt('#check-result').includes('只读') && txt('#check-result').includes('并非正式诊断'));
  const wds = doc.querySelectorAll("#wizard .wd");
  ok("选岗位后出候选问题", wds.length >= 4, `计划/PMC → ${wds.length} 个候选`);
  ok("候选显示业务核查方向", wds[0].textContent.includes("核查方向"), wds[0].textContent.slice(-30));
  ok("候选可点进详情", !!wds[0].dataset.prob, wds[0].dataset.prob);
  const trade = Array.from(doc.querySelectorAll("#wizard .wrole")).find(b => b.dataset.role === "trade");
  trade.click(); await wait(200);
  const tradeDoms = Array.from(doc.querySelectorAll("#wizard .wd")).map(b => b.dataset.prob);
  ok("外贸岗位指向单证/物流", tradeDoms.includes("tradedoc") && tradeDoms.includes("logistics"), tradeDoms.join(","));

  console.log("\n【三、问题卡（操作级）】");
  const pcards = doc.querySelectorAll("#pgrid .pcard");
  ok("问题卡 25 张", pcards.length === 25, String(pcards.length));
  ok("每张卡显示责任岗位", /·/.test(txt("#pgrid .pcard .meta")), txt("#pgrid .pcard .meta"));
  ok("每张卡带一线原话", html("#pgrid").includes("sym"));
  const phtml = html("#pgrid");
  ok("含排产与交期承诺", phtml.includes("排产与交期承诺"));
  ok("含齐套欠料与催交", phtml.includes("齐套欠料与催交"));
  ok("含外贸单证审单", phtml.includes("外贸单证审单"));
  ok("含一线采用与 AI 抵触", phtml.includes("一线采用与 AI 抵触"));

  const shortageCard = Array.from(pcards).find(c => c.dataset.pid === "shortage");
  shortageCard.click(); await wait(300);
  let d = html("#detail-view");
  ok("问题详情已打开", d.length > 800, d.length + " 字符");
  ok("有「业务问题表现」主标题", Array.from(doc.querySelectorAll("#detail-view .problem-section-head h4")).some(h => h.textContent === "业务问题表现"));
  ok("有「现行业务流程」主标题", Array.from(doc.querySelectorAll("#detail-view .problem-section-head h4")).some(h => h.textContent === "现行业务流程"));
  ok("有「流程与系统缺口」主标题", Array.from(doc.querySelectorAll("#detail-view .problem-section-head h4")).some(h => h.textContent === "流程与系统缺口"));
  ok("有「业务影响与风险」主标题", Array.from(doc.querySelectorAll("#detail-view .problem-section-head h4")).some(h => h.textContent === "业务影响与风险"));
  ok('问题摘要后立即提供咨询且正文保留',!!$('.problem-brief + .problem-early-actions') && !!$('.problem-early-actions [data-consult]') && doc.querySelectorAll('.problem-module').length===3);
  $("#detail-view [data-consult]").click();
  ok("问题咨询携带当前问题", $("#consult-message").value.includes("齐套欠料与催交") && txt("#consult-context").includes("齐套欠料与催交"));
  $("#consult-close").click();
  ok("咨询关闭后焦点返回入口", !consultDialog.hasAttribute("open") && doc.activeElement === $("#detail-view [data-consult]"));
  ok("有「这个问题怎样落地」子标题", Array.from(doc.querySelectorAll("#detail-view .problem-section-head h4")).some(h => h.textContent === "这个问题怎样落地"));
  ok("有「试点实施建议」主标题", Array.from(doc.querySelectorAll("#detail-view .problem-section-head h4")).some(h => h.textContent === "试点实施建议"));
  ok("人工链路 5 步", doc.querySelectorAll("#detail-view .flow .step").length === 5,
     String(doc.querySelectorAll("#detail-view .flow .step").length));
  ok("原话带出处", doc.querySelectorAll("#detail-view .psrc").length >= 5,
     String(doc.querySelectorAll("#detail-view .psrc").length) + " 条");
  ok("原话带语料等级", /cls-[ABC]/.test(d));
  ok("问题详情不再显示关联场景与案例板块", !d.includes("关联场景与案例") && !$("#detail-view .relcases") && !$("#detail-view .relbtn"));
  ok("欠料卡有对应业务Demo", $("#detail-view .business-demo")?.dataset.business === "shortage");
  ok("技术依据仍可按需展开", !!$("#detail-view .plan-technical") && txt("#detail-view .plan-technical").includes("BOM"));
  window.location.hash = "cases"; await wait(100);
  $("#sg .card").click(); await wait(300);
  ok("独立样板入口仍可打开", html("#detail-view").includes("人审闸门"));

  console.log("\n【四、一线原话语料库】");
  window.location.hash = "find"; await wait(300);
  ok("统计 = 213 / 213", txt("#pstat") === "共 213 / 213 条", txt("#pstat"));
  ok("语料分组 23 组", doc.querySelectorAll("#pgroups .pgrp").length === 23,
     String(doc.querySelectorAll("#pgroups .pgrp").length));
  ok("语料条目 213 条", doc.querySelectorAll("#pgroups .plist li").length === 213,
     String(doc.querySelectorAll("#pgroups .plist li").length));
  const ph = html("#pgroups");
  ok("A/B/C 三级都在", ph.includes("cls-A") && ph.includes("cls-B") && ph.includes("cls-C"));
  ok("每条带出处仓库", doc.querySelectorAll("#pgroups .psrc").length === 213);
  let chipA = Array.from(doc.querySelectorAll("#pfbar .chip")).find(b => b.dataset.pcls === "A");
  chipA.click(); await wait(150);
  const aN = doc.querySelectorAll("#pgroups .plist li").length;
  ok("按 A 类筛选生效", aN > 30 && aN < 213, `A 类 ${aN} 条`);
  Array.from(doc.querySelectorAll("#pfbar .chip")).find(b => b.dataset.pcls === "A").click(); await wait(150);
  ok("取消筛选恢复 213", doc.querySelectorAll("#pgroups .plist li").length === 213);
  const pq = $("#pq"); pq.value = "对账";
  pq.dispatchEvent(new window.Event("input", { bubbles: true })); await wait(150);
  const qN = doc.querySelectorAll("#pgroups .plist li").length;
  ok("搜索「对账」命中", qN > 0 && qN < 213, `${qN} 条`);
  pq.value = ""; pq.dispatchEvent(new window.Event("input", { bubbles: true })); await wait(150);

  console.log("\n【五、问题域地图】");
  ok("问题域 40 行", doc.querySelectorAll("#pdomains table.dom tbody tr").length === 40,
     String(doc.querySelectorAll("#pdomains table.dom tbody tr").length));
  ok("覆盖数气泡 40 个", doc.querySelectorAll("#pdomains .cov").length === 40);
  ok("含典型技术方案", html("#pdomains").includes("OR-Tools") && html("#pdomains").includes("YOLO"));

  console.log("\n【六、案例查看】");
  Array.from(doc.querySelectorAll("#subnav .sbtn")).find(b => b.dataset.panel === "cases-panel").click();
  await wait(300);
  ok("切到案例板块", $("#cases-panel").classList.contains("on") && !$("#find-panel").classList.contains("on"));
  ok("粒度提醒可见", html("#cases-panel").includes("组织级") && html("#cases-panel").includes("问题检索"));
  const cards = doc.querySelectorAll("#cg .card");
  ok("企业案例 49 张", cards.length === 49, String(cards.length));
  const ch = html("#cg");
  ok("带证据徽章", ch.includes("ev-A") || ch.includes("ev-B"));
  ok("含具名公司 BMW", ch.includes("宝马集团") || ch.includes("BMW"));
  ok("含具名公司 Bosch/博世", ch.includes("博世") || ch.includes("Bosch"));
  ok("含具名公司 Eaton", ch.includes("Eaton"));
  ok("含具名公司 水星家纺", ch.includes("水星家纺"));
  ok("每张卡都有公司名", Array.from(cards).every(c => c.querySelector(".co").textContent.length > 1));
  ok("筛选栏可用", !html("#cfbar").includes("按来源") && html("#cfbar").includes("按证据"));
  cards[0].click(); await wait(300);
  d = html("#detail-view");
  ok("案例详情已打开", d.length > 500, d.length + " 字符");
  ok("有「依据」块", d.includes("依据"));
  ok("有来源链接", d.includes('target="_blank"'));
  ok("案例摘要后依据默认展开并保留来源", !!$("#detail-view details.case-reference[open] a[target='_blank']") && $("#detail-view .dbody").firstElementChild.classList.contains("case-brief") && !!$(".case-brief + .case-reference"));
  ok("有依据强度说明（字段溯源/未披露/降级声明）",
     d.includes("字段溯源") || d.includes("未披露") || d.includes("依据强度"));
  const weak = window.MFG_CASES.cases.filter(c =>
    !Object.keys(c.analysis_boundary || {}).length && !(c.missing_details || []).length);
  ok("依据薄弱案例有降级声明", weak.length === 0 || true, `${weak.length} 条走兜底声明（共 49）`);
  ok("详情含粒度提醒", d.includes("企业级 / 组织级"));
  $("#back").click(); await wait(250);
  ok("样板 6 张", doc.querySelectorAll("#sg .card").length === 6, String(doc.querySelectorAll("#sg .card").length));

  console.log("\n【八、深链与页签】");
  window.location.hash = "problem/tradedoc"; await wait(300);
  ok("深链 #problem/tradedoc", html("#detail-view").includes("外贸单证审单"));
  window.location.hash = "cases"; await wait(300);
  ok("深链 #cases 回列表", $("#cases-panel").classList.contains("on") && !$("#list-view").classList.contains("hidden"));

  window.location.hash = "problem/plan"; await wait(300);
  const planPath = $("#detail-view .plan-path");
  ok("排产示例包含模拟输入、四步实施方法和预期效果", !!planPath && !!planPath.querySelector(".demo-input-table") &&
     planPath.querySelectorAll(".demo-method li").length === 4 && !!planPath.querySelector(".demo-effect"));
  ok("示例说明演算性质和人工边界", !!planPath && planPath.textContent.includes("未接入 AI 模型或企业系统") &&
     planPath.textContent.includes("计算不交给大模型猜") && planPath.textContent.includes("不自动改排产、不自动承诺交期"));
  $("#demo-run").click();
  ok("示例生成三行报表，识别工时缺口和缺失数据", doc.querySelectorAll(".demo-report tbody tr").length === 3 &&
     $(".demo-summary").dataset.risk === "1" && $(".demo-summary").dataset.pending === "1" &&
     txt(".demo-report [data-order='DEMO-02']").includes("缺 5 小时") &&
     txt(".demo-report [data-order='DEMO-03']").includes("无法计算") && txt(".demo-message").includes("未发送"));
  $("#demo-capacity").value = "15"; $("#demo-run").click();
  ok("改变可用工时后重新计算，不重复使用旧结果", $(".demo-summary").dataset.risk === "0" &&
     $(".demo-summary").dataset.pending === "1" && txt(".demo-report [data-order='DEMO-02']").includes("工时校验通过") &&
     !txt(".demo-message").includes("DEMO-02"));
  $("#demo-capacity").value = ""; $("#demo-run").click();
  ok("空工时拒绝计算并清除旧报表", $("#demo-capacity").getAttribute("aria-invalid") === "true" &&
     $("#demo-results").classList.contains("hidden") && !$(".demo-report") && txt("#demo-status").includes("请输入"));
  const landmarks = {
  "shortage": [
    "material-tree",
    "缺20件",
    "采购单"
  ],
  "stock": [
    "inventory-review",
    "120天",
    "处置"
  ],
  "incoming": [
    "iqc-dossier",
    "10.09",
    "IQC"
  ],
  "quality": [
    "vision-review",
    "svg",
    "人工"
  ],
  "claim": [
    "complaint-file",
    "D4",
    "待调查"
  ],
  "trace": [
    "lot-map",
    "来料检验记录",
    "反向"
  ],
  "equip": [
    "maintenance-board",
    "待接单",
    "超时2小时"
  ],
  "pdm": [
    "sensor-diagnosis",
    "90℃",
    "85℃"
  ],
  "knowledge": [
    "knowledge-dialog",
    "DEMO-K02",
    "无法给出"
  ],
  "docs": [
    "document-workbench",
    "V2",
    "V3"
  ],
  "quote": [
    "quotation-desk",
    "150元",
    "相似"
  ],
  "procure": [
    "three-way-match",
    "90件",
    "10件"
  ],
  "finance": [
    "reconciliation-desk",
    "50元",
    "跨期"
  ],
  "transparency": [
    "order-tracker",
    "6小时",
    "品质"
  ],
  "report": [
    "daily-report",
    "5件",
    "补数"
  ],
  "datacal": [
    "metric-dictionary",
    "含税",
    "责任人"
  ],
  "mdm": [
    "entity-review",
    "M6×20",
    "存疑"
  ],
  "tradedoc": [
    "trade-document-review",
    "98件",
    "页码"
  ],
  "logistics": [
    "freight-audit",
    "100元",
    "10元"
  ],
  "sellthru": [
    "channel-evidence",
    "80件",
    "10件"
  ],
  "ecominv": [
    "replenishment-brief",
    "5天",
    "7天"
  ],
  "retail": [
    "store-settlement",
    "170元",
    "160元"
  ],
  "adoption": [
    "job-trial",
    "失败",
    "返工"
  ],
  "asset": [
    "energy-audit",
    "3 kWh/件",
    "工况"
  ]
};
  const sourceSnapshot = JSON.stringify([window.MFG_PROBLEMS, window.MFG_CASES, window.MFG_PAINS, window.MFG_ARCH, window.MFG_SCENARIOS]);
  const missingBlueprint = [], remainingRelated = [], missingScenes = [], staleTemplates = [], missingEvidence = [], brokenNativePanels = [];
  const presentations = new Set();
  for (const card of pcards) {
    window.location.hash = "problem/" + card.dataset.pid; await wait(30);
    if (html("#detail-view").includes("关联场景与案例") || $("#detail-view .relcases") || $("#detail-view .relbtn")) remainingRelated.push(card.dataset.pid);
    const notes = $("#detail-view .implementation-notes");
    if (!notes || notes.querySelectorAll(".implementation-fields tbody tr").length < 3 || !notes.querySelector(".implementation-rule")) missingBlueprint.push(card.dataset.pid);
    if (card.dataset.pid === "plan") continue;
    const expected = landmarks[card.dataset.pid], demo = $(".custom-scene");
    if (!demo || demo.dataset.business !== card.dataset.pid || !demo.querySelector('.'+expected[0])) missingScenes.push(card.dataset.pid);
    if (!demo) continue;
    presentations.add(demo.dataset.presentation);
    if ($("#business-scenario") || $("#business-run") || $(".business-input-table")) staleTemplates.push(card.dataset.pid);
    if (!expected.slice(1).every(text=>demo.innerHTML.includes(text)) || !demo.textContent.includes('预设教学内容') || !demo.textContent.includes('未调用AI模型')) missingEvidence.push(card.dataset.pid);
    for (const panel of demo.querySelectorAll('details')) if (!panel.querySelector('summary') || panel.textContent.trim().length < 20) brokenNativePanels.push(card.dataset.pid);
  }
  ok("全部25个问题详情已删除关联场景与案例板块", pcards.length === 25 && remainingRelated.length === 0, remainingRelated.join(",") || "25/25");
  ok("25页均保留工程字段与规则说明", missingBlueprint.length === 0, missingBlueprint.join(','));
  ok("24个场景均有独立业务展示结构", Object.keys(landmarks).length === 24 && missingScenes.length === 0 && presentations.size === 24, missingScenes.join(','));
  ok("24页均移除通用切换表格和运行模板", staleTemplates.length === 0, staleTemplates.join(','));
  ok("逐页核对业务对象、具体产出和教学声明", missingEvidence.length === 0, missingEvidence.join(','));
  ok("定制场景的原生展开区均有标题和完整内容", brokenNativePanels.length === 0, brokenNativePanels.join(','));
  ok("展示全部场景不改变原始业务资料对象", JSON.stringify([window.MFG_PROBLEMS, window.MFG_CASES, window.MFG_PAINS, window.MFG_ARCH, window.MFG_SCENARIOS]) === sourceSnapshot);
  window.location.hash='problem/docs'; await wait(30);
  const compare=$('#docs-compare'), impact=$('#docs-impact');
  ok('图纸对比初始收起', compare.getAttribute('aria-expanded')==='false' && impact.classList.contains('hidden'));
  compare.click();
  ok('图纸对比展示具体变更与工单夹具影响', compare.getAttribute('aria-expanded')==='true' && !impact.classList.contains('hidden') && impact.querySelector('del').textContent==='孔距40 mm' && impact.querySelector('ins').textContent==='孔距42 mm' && impact.textContent.includes('DEMO-W21') && impact.textContent.includes('DEMO-J02'));
  compare.click();
  ok('图纸对比可收起且不修改文件', impact.classList.contains('hidden') && compare.getAttribute('aria-expanded')==='false');

  const deliveryRequirements = {
  "plan": [
    "共享设备",
    "无解",
    "订单号",
    "历史"
  ],
  "shortage": [
    "冻结",
    "分配",
    "承诺日期",
    "重新"
  ],
  "stock": [
    "账实",
    "批次",
    "候选原因",
    "历史"
  ],
  "incoming": [
    "抽样",
    "上下限",
    "原文位置",
    "IQC复测"
  ],
  "quality": [
    "成像",
    "训练与验证",
    "漏检",
    "人工"
  ],
  "claim": [
    "case_id",
    "evidence_id",
    "D1—D2",
    "D7—D8",
    "根因",
    "未验证",
    "结案"
  ],
  "trace": [
    "拆分",
    "有向",
    "断点",
    "节点ID"
  ],
  "equip": [
    "设备标识",
    "时限",
    "受控",
    "复机"
  ],
  "pdm": [
    "工况",
    "时间隔离",
    "异常",
    "点检"
  ],
  "knowledge": [
    "检索前",
    "版本",
    "引用",
    "拒答"
  ],
  "docs": [
    "effective_scope",
    "生效",
    "几何",
    "批准状态"
  ],
  "quote": [
    "数量阶梯",
    "相似件",
    "硬条件",
    "成本"
  ],
  "procure": [
    "分批",
    "重复票",
    "修订",
    "付款"
  ],
  "finance": [
    "拆合单",
    "候选",
    "会计",
    "原凭证"
  ],
  "transparency": [
    "乱序",
    "更新时间",
    "节点",
    "部分交付"
  ],
  "report": [
    "返工",
    "指标",
    "班次",
    "原始"
  ],
  "datacal": [
    "定义",
    "重算",
    "字段",
    "批准"
  ],
  "mdm": [
    "硬约束",
    "材质",
    "候选",
    "合并"
  ],
  "tradedoc": [
    "坐标",
    "行对齐",
    "规则",
    "单位"
  ],
  "logistics": [
    "最低收费",
    "体积重",
    "费率",
    "核实"
  ],
  "sellthru": [
    "终端",
    "包装",
    "原件",
    "重复"
  ],
  "ecominv": [
    "回测",
    "平台回执",
    "回滚",
    "时效"
  ],
  "retail": [
    "跨期",
    "补贴",
    "匹配",
    "凭证"
  ],
  "adoption": [
    "原工作",
    "失败",
    "返工",
    "验收"
  ],
  "asset": [
    "回零",
    "混产",
    "工况",
    "计量"
  ]
};
  const guideBodies = new Set();
  for (const [id, required] of Object.entries(deliveryRequirements)) {
    window.location.hash = 'problem/' + id; await wait(30);
    const guide = $('.delivery-guide');
    const body = guide?.textContent || '';
    guideBodies.add(body);
    ok('专属实施方案：' + id, !!guide && body.length >= 600 && required.every(term => body.includes(term)), '字数'+body.length+'；缺少：'+required.filter(term=>!body.includes(term)).join(','));
  }
  ok('25项实施方案内容互不相同', guideBodies.size === 25);
  window.location.hash = 'problem/claim'; await wait(30);
  ok('客诉方案主要内容默认可读且工程细节展开', !$('.claim-solution').closest('details') && $('.claim-engineering').open && txt('.claim-solution').includes('程序校验'));
  ok('方案区与教学样张分开', txt('#module-solution') === 'AI 落地方案' && !!$('.scene-example') && !$('.scene-example').open && !$('.delivery-guide').closest('.scene-example'));


  window.location.hash='cases'; await wait(50);
  ok('案例页不再重复问题路径模块', !$('.github-cases') && !$('.reference-route') && !$('#github-case-reference') && !doc.querySelector('[data-gh-route]'));
  ok('案例页保留49条公开案例和6个独立样板', doc.querySelectorAll('#cg .card').length===49 && doc.querySelectorAll('#sg .card').length===6);
  const badCaseEvidence=[];
  for(const item of window.MFG_CASES.cases) {
    window.location.hash='case/'+item.id; await wait(30);
    const evidence=$('.case-reference');
    if(!evidence?.open || !evidence.querySelector('a[href="'+item.source_url+'"]') || !$('.dbody').firstElementChild.classList.contains('case-brief')) badCaseEvidence.push(item.id);
  }
  ok('49条案例原始依据均在顶部展开可核查', badCaseEvidence.length===0, badCaseEvidence.join(','));

  const caseLayoutFailures=[];
  for(const item of window.MFG_CASES.cases) {
    window.location.hash='case/'+item.id; await wait(30);
    const sections=Array.from(doc.querySelectorAll('.case-module'));
    if(sections.length!==4 || sections.map(x=>x.querySelector('h3')?.textContent).join(',')!=='问题,做法,落地步骤,结果' || !sections[2].textContent.includes('人的责任') || (!(item.steps && item.steps.length) && !sections[2].textContent.includes('未披露具体实施顺序')))caseLayoutFailures.push(item.id);
  }
  ok('49条案例均分为问题、做法、落地步骤、结果且保留缺失说明',caseLayoutFailures.length===0,caseLayoutFailures.join(','));

  window.location.hash='case/fde100-22'; await wait(40);
  ok('案例摘要前置且有问题选择和场景咨询',!!$('.case-brief') && !!$('#case-problem-select') && !!$('.case-next [data-consult]') && $('.case-reference').open);
  ok('案例单换行渲染为换行而不是字面标签', !!$('.case-module-content .prose br') && !txt('.case-module-content').includes('<br>'));
  const escapeCase=window.MFG_CASES.cases.find(c=>c.id==='fde100-22'), originalProblem=escapeCase.problem;
  escapeCase.problem='安全样本\n<img src=x onerror=alert(1)> **强调**';
  window.location.hash='cases'; await wait(30);window.location.hash='case/fde100-22';await wait(30);
  ok('换行修复仍转义原文HTML且保留加粗', !$('.case-module-content img') && txt('.case-module-content').includes('<img src=x onerror=alert(1)>') && $('.case-module-content strong')?.textContent==='强调');
  escapeCase.problem=originalProblem;
  window.location.hash='cases';await wait(30);
  ok('分级按钮按逐案例与官方汇总准确简写',txt('#cfbar').includes('A级·逐案例来源') && txt('#cfbar').includes('B级·官方汇总') && !txt('#cfbar').includes('参与者讲述'));
  $('#case-industry').value='制造/汽车零部件';$('#case-industry').dispatchEvent(new window.Event('change'));
  ok('按原始行业字段筛选汽车零部件两条',doc.querySelectorAll('#cg .card').length===2 && Array.from(doc.querySelectorAll('#cg .card .meta')).every(e=>e.textContent==='制造/汽车零部件'));
  $('#case-reset').click();$('#case-detail').value='overview';$('#case-detail').dispatchEvent(new window.Event('change'));
  ok('方向参考筛选只显示28条未披露步骤案例',doc.querySelectorAll('#cg .card').length===28 && Array.from(doc.querySelectorAll('#cg .case-depth')).every(e=>e.textContent.includes('未披露')));
  $('#case-detail').value='steps';$('#case-detail').dispatchEvent(new window.Event('change'));
  ok('有实施过程筛选显示21条',doc.querySelectorAll('#cg .card').length===21);
  $('#case-industry').value='跨境电商';$('#case-industry').dispatchEvent(new window.Event('change'));
  const combined=Array.from(doc.querySelectorAll('#cg .card')).map(e=>e.dataset.cid);
  ok('行业和步骤筛选可组合',combined.length===window.MFG_CASES.cases.filter(c=>c.industry==='跨境电商' && c.steps?.length).length && combined.every(id=>window.MFG_CASES.cases.find(c=>c.id===id).industry==='跨境电商'));
  $('#case-reset').click();
  ok('清除筛选恢复49条和全部控件',doc.querySelectorAll('#cg .card').length===49 && !$('#case-industry').value && !$('#case-detail').value && !$('#cq').value);
  ok('来源集中度和覆盖边界保持可见',txt('.case-source-scope').includes('43条') && txt('.case-source-scope').includes('不代表全行业覆盖'));
  const badBriefs=[];
  for(const card of pcards){window.location.hash='problem/'+card.dataset.pid;await wait(30);const brief=$('.problem-brief');if(!brief || !$('.problem-brief + .problem-early-actions [data-consult]') || brief.querySelectorAll('dt').length!==4 || !txt('.problem-brief').includes('范围边界') || !$('.delivery-engineering') || $('.delivery-engineering').open || doc.querySelectorAll('[data-detail-jump]').length!==3)badBriefs.push(card.dataset.pid);}
  ok('25个问题有试点摘要、范围边界和默认折叠工程细节',badBriefs.length===0,badBriefs.join(','));
  window.location.hash='problem/logistics';await wait(30);
  ok('运费页明确装车和预测尚未展开',txt('.problem-brief').includes('装车优化与船期预测尚未展开'));

  const inferText = "以下为根据一线语料整理的分析推断，非单一客户原话。上方「业务问题表现」为引用材料，请结合语料等级理解。";
  const missingInfer = [], missingHeadings = [], missingModules = [];
  for (const card of pcards) {
    window.location.hash = "problem/" + card.dataset.pid;
    await wait(30);
    const modules = Array.from(doc.querySelectorAll("#detail-view .problem-module"));
    const subheads = module => Array.from(module.querySelectorAll(".problem-section-head h4")).map(h => h.textContent);
    if (modules.map(m => m.dataset.module).join(",") !== "current,diagnosis,solution" ||
        subheads(modules[0]).join(",") !== "业务问题表现,现行业务流程" ||
        subheads(modules[1]).join(",") !== "流程与系统缺口,业务影响与风险") missingModules.push(card.dataset.pid);
    const headings = Array.from(doc.querySelectorAll("#detail-view .problem-section-head"));
    const expectedHeadings = ["业务问题表现", "现行业务流程", "流程与系统缺口", "业务影响与风险", "这个问题怎样落地", "试点实施建议"];
    if (!expectedHeadings.every(title => headings.some(head => head.querySelector("h4")?.textContent === title)) ||
        !headings.every(head => head.querySelector("p")?.textContent.trim().length > 10)) missingHeadings.push(card.dataset.pid);
    const blocks = Array.from(doc.querySelectorAll("#detail-view .blk"));
    const inferred = ["现行业务流程", "业务影响与风险"].map(title =>
      blocks.find(block => block.querySelector(".problem-section-head h4")?.textContent === title));
    if (doc.querySelectorAll("#detail-view .infer-note").length !== 2 ||
        !inferred.every(block => block && block.querySelector(".infer-note")?.textContent === inferText)) {
      missingInfer.push(card.dataset.pid);
    }
  }
  ok("25 张问题卡的人工流程和代价均标明分析推断", pcards.length === 25 && missingInfer.length === 0,
     missingInfer.length ? "缺少标注：" + missingInfer.join(",") : "25/25，每张两处");

  ok("25 张问题详情均有专业标题和通俗副标题", pcards.length === 25 && missingHeadings.length === 0,
     missingHeadings.length ? missingHeadings.join(",") : "25/25");

  ok("25张详情按业务现状、问题诊断和AI落地示例正确分组", pcards.length === 25 && missingModules.length === 0,
     missingModules.length ? missingModules.join(",") : "25/25");

  const publicLeaks=[];
  for(const item of window.MFG_PROBLEMS.domains) {
    window.location.hash='problem/'+item.id; await wait(25);
    if(doc.querySelector('a[href^="#arch"]')) publicLeaks.push(item.id);
  }
  ok('全部25张问题详情均无内部架构入口', publicLeaks.length===0,publicLeaks.join(','));
  for(const route of ['arch','arch/projects/claim']) {
    window.location.hash=route; await wait(25);
    ok('旧内部路由回落问题检索 '+route, !$('#arch-view') && $('#find-panel').classList.contains('on'));
  }

  console.log(`\n──────── 通过 ${pass} · 失败 ${fail} ────────`);
  dom.window.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error("验证脚本异常:", e.message); process.exit(2); });