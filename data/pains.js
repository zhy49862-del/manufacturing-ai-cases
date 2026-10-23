/* 制造业 FDE 场景库 — 痛点语料与问题域
 * 来源:对 FDE-Manufacturing/sources 下 299 个仓库的全量检索(3 轮并行挖掘 + 一手文件直读)。
 * 语料分级(引用时务必保留):
 *   A = 真实一手口吻（客户/工人原话或访谈体）
 *   B = 由书面材料、代码注释、README 倒推改写
 *   C = 来源方自述的合成/虚构样例
 * 每条短语保留其出处仓库,便于回溯原文。
 */
window.MFG_PAINS = {
  meta: {
    total: 213,
    factory: 150,
    trade: 63,
    domains: 40,
    note: "这些抱怨的用途是「认领」：客户打开就能找到自己说过的那句话，再顺着看别人怎么解决。" +
          "多数条目是按口语化第一人称改写，不是逐字原话；对外材料引用前建议回原文核对。"
  },
  classes: {
    A: { name: "真实一手口吻", desc: "客户/工人原话或访谈体，可直接作为需求证据。" },
    B: { name: "书面口径倒推", desc: "由教材、面试题册、代码注释、README 反推改写，属推断而非原话。" },
    C: { name: "合成 / 虚构样例", desc: "来源方自述的 composite 或脱敏样例，只能当示意。" }
  },

  groups: [
   { id: "A1", side: "工厂侧", name: "生产计划 / 排产 / 交期", items: [
    ["排产全靠我和三个老计划员拍脑袋，一忙就排错，产线一边闲着一边赶工。", "zhyese/def--wiki"],
    ["计划员用 Excel 手工编次日计划，设备负荷和瓶颈全靠经验估。", "fde-diagnostic-copilot"],
    ["插单改单太频繁，计划重排耗时长，前后工序对不上，等料和积压一块来。", "fde-diagnostic-copilot"],
    ["车间任务靠早会口头分派，实际进度跟计划两条线，交期承诺没依据。", "fde-diagnostic-copilot"],
    ["设备空转和加班赶工同时存在，夜班利用率低，可我们连数都没有。", "fde-diagnostic-copilot"],
    ["客户交期就剩几天了，单子还没排上，急得我团团转。", "cockpit-fde-03-scheduling"],
    ["交期都过好几天了，我才发现这单压根没排产。", "cockpit-fde-03-scheduling"],
    ["两张单子排到同一条产线撞车了，我才知道得重排。", "cockpit-fde-03-scheduling"],
    ["今天干了多少活，全靠下班前跟班长口头报一声。", "cockpit-fde-03-scheduling"],
    ["我一插单、一缺料、设备一停，就说不清哪些订单要跟着延期。", "NewenergyEric/enterprise-ai-playbook"],
    ["订单一进车间就看不见了，我只能天天追着下面人问卡在哪。", "DaBinBinah/FDE"],
    ["订单卡在哪一步总是过后才知道，客户先来催我。", "moongioh/manufacturing-ax-portfolio"],
    ["生产指示书全靠手写打印再送去车间，一张单子四十多分钟。", "moongioh/manufacturing-ax-portfolio"],
    ["交期老延误，我一直以为是排产问题，其实是销售在车间口头答应了改单。", "JayceHuang/fde-handbook"],
    ["订单的真实入口是车间主任口袋里的小本子，先手写再拍照发微信群。", "JayceHuang/fde-handbook"]
   ]},

   { id: "A2", side: "工厂侧", name: "物料 / 库存 / 缺料 / 齐套", items: [
    ["安全库存凭经验设定，一边缺料紧急采购，一边呆滞料长期占压资金。", "fde-diagnostic-copilot"],
    ["账面数靠 ERP 维护，季度盘点差异率高，账实不符影响排产和交付承诺。", "fde-diagnostic-copilot"],
    ["物料先进先出难执行，批次混放导致客诉追溯困难，尾数管理一塌糊涂。", "fde-diagnostic-copilot"],
    ["仓库收发靠单据人工录入，录入滞后，系统数和现场两回事。", "fde-diagnostic-copilot"],
    ["缺料停线一个月三次，老板天天追着问到货没有。", "zhyese/def--wiki"],
    ["系统让我买五百件，我凭经验觉得该买六百件，到底听谁的我心里没底。", "zhyese/def--wiki"],
    ["最急的单偏偏缺料，一排产就被跳过，我又得回头催采购。", "cockpit-fde-07-material-planning"],
    ["账上看着有料，真开工才发现早被别的单占用了。", "cockpit-fde-07-material-planning"],
    ["每张单单独算都说能做，一起做就全卡住了。", "cockpit-fde-07-material-planning"],
    ["货在库里躺了大半年没人动，压的全是我的钱。", "cockpit-fde-08-inventory-turnover"],
    ["先进先出嘴上都讲，实际出货凭手快，老货一直压后面。", "cockpit-fde-08-inventory-turnover"],
    ["货快到期了没人提醒，等发现的时候已经过期了。", "cockpit-fde-08-inventory-turnover"],
    ["缺料和质检停线都没同步，排产还在表上手工排。", "dataPro-lgtm/fde-interview-fieldbook"],
    ["门店老是缺货，仓库却压着一堆货，这库存系统我真不敢信。", "dataPro-lgtm/fde-interview-fieldbook"],
    ["库存永远对不上账，业务说没货、仓库说有一堆，只能凭感觉补。", "bingyue/fde-skills"],
    ["补货全靠感觉，卖得动的断了货，卖不动的压一仓库。", "bingyue/fde-skills"],
    ["缺料总是生产当天才发现，半年停了十四次线，每次六小时。", "GodMaking/fde"],
    ["库存数散在六七个地方，盘一次库要折腾三四个月。", "moongioh/manufacturing-ax-portfolio"],
    ["仓库说系统里有货，走到货架前才发现那批料早被别的工单领走了。", "JanusChoi/where-fde-came-from"],
    ["手工做新品导入老出错，怕缺料停线只能多买料堆到过期。", "yeasy/forward_deployed_engineering_guide"]
   ]},

   { id: "A3", side: "工厂侧", name: "质量与判退", items: [
    ["首件、巡检、终检记在纸质检验单上，月底才由质量主管手工汇总成 Excel。", "fde-diagnostic-copilot"],
    ["客户投诉时翻纸质记录要以小时计，批次追溯困难，8D 报告靠人回忆。", "fde-diagnostic-copilot"],
    ["不良数据没结构化，Pareto 和尺寸趋势做不起来，改善选题靠经验。", "fde-diagnostic-copilot"],
    ["全检抽检靠检验员目视，尺寸超差和外观缺陷在前端拦不住。", "fde-diagnostic-copilot"],
    ["我们最怕的不是大批量报废，是那种时有时无的隐性缺陷，今天检不出、明天客户退货。", "zhyese/def--wiki"],
    ["同一个东西这个班说合格、那个班说不行，我自己都说不清标准。", "zhyese/def--wiki"],
    ["SOP 写着查六个面，工人实际只查四个；下午阳光一照进来漏检又上去了。", "zhyese/def--wiki"],
    ["质检员根本不认 AI：它说这个是好的，万一漏了呢？出了客诉谁担责任。", "zhyese/def--wiki"],
    ["系统一上线，工人故意往产线里放缺陷品看它查不查得出来。", "zhyese/def--wiki"],
    ["这批货不良率这么高，哪个班哪个工位出的说不清。", "cockpit-fde-04-quality"],
    ["缺陷记了一大堆，就是不知道先抓哪个才最管用。", "cockpit-fde-04-quality"],
    ["不良率今天高明天低，到底算不算失控没人判得了。", "cockpit-fde-04-quality"],
    ["不良品随手往边上一扔，什么原因造成的根本没记。", "cockpit-fde-04-quality"],
    ["质检单子一张张手填，晚上还得再往系统里录一遍。", "cockpit-fde-04-quality"],
    ["质检靠人填表、微信群发截图，漏没漏检领导根本不知道。", "MindSyncHub/ai-landing-cases"],
    ["换个型号调机要几个小时，质检全凭人眼盯，漏检总有百分之三。", "bingyue/fde-skills"],
    ["AOI 老是误报，机器喊有缺陷，最后全堆到人来复检，忙不过来。", "bingyue/fde-skills"],
    ["不良率一飙，我得从 MES、设备、Excel 里翻半天才找得出原因。", "Choon-Spring/manufacturing-quality-agent"],
    ["同一类毛病老是反复出现，每次只处理眼前这一批。", "NewenergyEric/enterprise-ai-playbook"],
    ["叶片上百万个孔全靠人工看，质检这道工序我们根本忙不过来。", "guminghao-avi/FDE-case-library"],
    ["质检是我最大一笔人工成本，人还越来越难招、越来越贵。", "jkang/FDE-Toolkit"]
   ]},

   { id: "A4", side: "工厂侧", name: "设备维护 / 点检 / 预测性维护", items: [
    ["年度保养计划贴在车间白板，执行率靠自觉，漏保设备故障率明显偏高。", "fde-diagnostic-copilot"],
    ["点检卡纸面填写，异常项没人闭环跟进，小隐患拖成大停机。", "fde-diagnostic-copilot"],
    ["维修记录停在纸质台账，同型号设备重复故障无法预警，备件靠老师傅记忆。", "fde-diagnostic-copilot"],
    ["停机损失没有统计口径，维修工的工作量与效果都没法量化。", "fde-diagnostic-copilot"],
    ["设备总在两次检修中间出故障，体检报告一切正常，第二天就心梗。", "zhyese/def--wiki"],
    ["设备上二十几个传感器，真正监控的就三个，剩下的数据全在 PLC 里睡着。", "zhyese/def--wiki"],
    ["一台设备计划外停机，一次就是几万到几十万，最怕不知道它什么时候停。", "zhyese/def--wiki"],
    ["设备多久没点检根本没人管，出事了才手忙脚乱。", "cockpit-fde-01-inspection"],
    ["车间报了个异常，转头就没人跟，修没修没人知道。", "cockpit-fde-01-inspection"],
    ["设备跑够点该保养了，没人提醒，就一直拖到坏。", "cockpit-fde-10-predictive-maintenance"],
    ["机器不坏就不管，坏了才知道温度早就超标好几天了。", "cockpit-fde-10-predictive-maintenance"],
    ["保养计划按日历排，机器停停开开，时间根本对不上。", "cockpit-fde-10-predictive-maintenance"],
    ["设备靠人工巡检、坏了才修，一停机一年损失上百万。", "heweidong-ecco/ai-field-delivery-toolkit"],
    ["机器差不多两天就停一次，一次损失上千万，我们只能事后维修。", "lijaz-s/fde-case-study-4"],
    ["维修记录全是不规范的大白话，还夹着算式，根本没法统计。", "lijaz-s/fde-case-study-4"],
    ["工人一报警就去翻那三百页手册，等他翻到，产线已经停了半小时。", "zhyese/def--wiki"],
    ["设备一坏，我们第一反应是拍照发微信群问班组长，那本手册根本没人翻。", "XiaoLeng-master/fde-interview-skill"],
    ["手册有三个版本还有扫描件，老师傅的手感全在脑子里，人一走就没了。", "XiaoLeng-master/fde-interview-skill"]
   ]},

   { id: "A5", side: "工厂侧", name: "追溯与合规", items: [
    ["客户来问这批货到底去哪了，我只能一张张翻单据对。", "cockpit-fde-09-batch-traceability"],
    ["出了质量问题，要查问题原料流到哪几家店，根本查不清。", "cockpit-fde-09-batch-traceability"],
    ["上下游批次号全靠人手工对，漏一个就整条链对不上。", "cockpit-fde-09-batch-traceability"],
    ["客诉来了，找三个月前那批的质检照片得翻一天微信群。", "carbonlife-yang/fde-chatdemo"],
    ["客户投诉过来了才回头查是哪条线哪一件漏出去的，全靠人翻记录反推。", "zhyese/def--wiki"],
    ["客户一催我就要翻五个系统才能证明这批货合规。", "cockpit-fde-09-batch-traceability"]
   ]},

   { id: "A6", side: "工厂侧", name: "报价与非标售前", items: [
    ["报价工时靠工艺工程师按类似件经验估，同类零件不同人报价差两位数百分比。", "fde-diagnostic-copilot"],
    ["历史报价数据没沉淀，新人无法复用，老师傅经验随退休流失。", "fde-diagnostic-copilot"],
    ["急单当天出价、常规单耗时一两天，响应速度直接影响成单率。", "fde-diagnostic-copilot"],
    ["报价漏算刀具损耗、外协与表面处理费用，事后才发现订单毛利为负。", "fde-diagnostic-copilot"],
    ["报价单刚发过去，客户第一反应就是太贵了，我只能一遍遍解释为什么值。", "zhyese/def--wiki"],
    ["图纸进来只有老师傅看得懂，他一忙报价就卡好几天，单子直接飞了。", "MindSyncHub/ai-landing-cases"],
    ["报一次价要等两天，全靠手动翻 Excel，再微信问同事历史成交价。", "jiji262/fde-guide"],
    ["客户催报价，我这边光等产品参数就要两三天，单子早凉了。", "bingyue/fde-skills"],
    ["报价本身二十分钟就干完，卡在审批两天，还有三成被退回。", "bingyue/fde-skills"],
    ["非标订单报个价全靠老师傅看图估，询价卡好几天，单子就这么丢了。", "JingHao-Leon/fde-case-lab"]
   ]},

   { id: "A7", side: "工厂侧", name: "采购与供应商", items: [
    ["安全库存与订货点靠采购员经验拍定，缺料停线与呆滞库存同时发生。", "fde-diagnostic-copilot"],
    ["询价比价靠邮件与微信，历史成交价没沉淀，同物料不同人采购价差明显。", "fde-diagnostic-copilot"],
    ["供应商交期、来料质量、价格波动分散在个人手里，年度评估靠印象打分。", "fde-diagnostic-copilot"],
    ["供应商拖了三天不回邮件，我一个个打电话催，还被人家的邮箱当垃圾邮件。", "zhyese/def--wiki"],
    ["采购每天花四小时手工核对三个系统的价格差异，一天不落。", "jiji262/fde-guide"],
    ["一天几十张采购单全靠手敲，还得一家家比价，人根本不够用。", "jkang/FDE-Toolkit"],
    ["采购单走审批一走好几天，等批下来料价都变了。", "jkang/FDE-Toolkit"],
    ["明明知道库里就有这个物料，我就是搜不出来，只好又重录一条。", "JingHao-Leon/fde-case-lab"],
    ["系统里供应商写着已通过，其实审查早过期了，差点放行。", "Datman701/fde-procurement-copilot"],
    ["一个供应商写了好几个名字，对账时我根本看不出是一家。", "RedBeret/fde-data-forge"],
    ["供应商一延期，我根本不知道哪条总装线要停，等停线了才发现。", "cloudzun/fde-course"],
    ["供应商一断供，我几十个采购员要手工核对好几周，窗口早错过了。", "cloudzun/fde-course"]
   ]},

   { id: "A8", side: "工厂侧", name: "图纸 / 工艺 / 经验传承", items: [
    ["图纸版本靠文件夹和文件名管理，车间用到旧版图纸导致批量返工。", "fde-diagnostic-copilot"],
    ["工艺知识与加工参数散在个人电脑，相似件重复摸索，编程效率低。", "fde-diagnostic-copilot"],
    ["客户图纸变更靠邮件通知，变更没同步到工艺卡与质检标准，执行靠人盯。", "fde-diagnostic-copilot"],
    ["老师傅陆续退休，经验全散在人脑和几十万条工单里，新人根本接不上手。", "ai-alchemy-lab/fde-arsenal"],
    ["系统第一句就照抄规程，不像老师傅说话，问两次就再也没人用了。", "ai-alchemy-lab/fde-arsenal"],
    ["戴着沾油的手套扶设备，还得摘手套打字提问，这系统谁高兴用？", "ai-alchemy-lab/fde-arsenal"],
    ["两千三百个账号周活只有三十七个，兄弟们宁可翻三年前的微信群记录。", "ai-alchemy-lab/fde-arsenal"],
    ["老师傅说，你把我的经验蒸走了，我以后在企业还有什么价值。", "RichardXu001/the-fde-handbook"],
    ["我脑子里的手艺儿子学不会，我也写不下来，因为不知道从哪儿写起。", "JayceHuang/fde-handbook"],
    ["新人问 316L 锻打烧到多少度，老师傅的经验都在脑子里，带不走也留不下。", "JingHao-Leon/fde-case-lab"],
    ["合同图纸散在每个人电脑里，找份最新版还得挨个问人。", "moongioh/manufacturing-ax-portfolio"]
   ]},

   { id: "A9", side: "工厂侧", name: "财务对账 / 成本 / 发票", items: [
    ["月度对账靠人工比对送货单、客户回签单与开票记录，集中加班数天才月结。", "fde-diagnostic-copilot"],
    ["对账差异定位靠翻单据，差异原因沉淀不下来，同类差异月月复现。", "fde-diagnostic-copilot"],
    ["付款与回款账期缺少预警，逾期应收影响现金流与采购议价空间。", "fde-diagnostic-copilot"],
    ["成本核算颗粒度粗，订单级毛利算不出来，接单报价缺少反馈闭环。", "fde-diagnostic-copilot"],
    ["开会时财务总监指着屏幕问我这数字哪来的，我只能说回去重新查一下。", "RichardXu001/the-fde-handbook"],
    ["每个月我要手工核对三天对账单，大促还得在群里被业务追着骂。", "ai-alchemy-lab/fde-arsenal"],
    ["同一张发票又来一遍，差点就让我重复付了款。", "travelinman1013/galatiq-case-invoices"],
    ["我们发票全靠手工录，一年赔进去两百万，错误率三成还拖五天。", "travelinman1013/galatiq-case-invoices"],
    ["一张发票手工录进 SAP 要十几二十分钟，金额还老录错。", "techmahato/forward-deployed-engineer-roadmap"]
   ]},

   { id: "A10", side: "工厂侧", name: "客诉 / 售后 / 派工", items: [
    ["客户咨询与投诉由业务员兼任，响应时效没标准，问题容易漏跟。", "fde-diagnostic-copilot"],
    ["售后问题清单、处理进展与责任归属没有统一台账，重复问题反复发生。", "fde-diagnostic-copilot"],
    ["客诉数据没回流到质量与工艺改进，同样的问题一年内重复出现。", "fde-diagnostic-copilot"],
    ["客诉是零容忍的，一次重大客诉，整个品牌的订单都可能被客户砍掉。", "zhyese/def--wiki"],
    ["紧急单老是压在微信群里没人看，谁闲着谁接单。", "carbonlife-yang/fde-chatdemo"],
    ["工单两成派错团队，客户还得把问题重复讲一遍。", "279458179/fde-handbook"]
   ]},

   { id: "A11", side: "工厂侧", name: "车间数据采集 / 报表自动化", items: [
    ["车间报表每天手工汇总，光填表就占掉大半时间。", "gxfde/fde-workbench"],
    ["每周手工拼七个报表，财务和运营的数字还是对不上。", "279458179/fde-handbook"],
    ["车间戴着手套点手机，忘了按保存，一天产量就白干。", "moongioh/manufacturing-ax-portfolio"],
    ["每天从五六个平台后台手工下载数据，员工到下午三点才更新完 daily 表。", "JayceHuang/fde-handbook"],
    ["数据从一个系统扒下来填 Excel，算完再誊到另一个模板。", "MindSyncHub/ai-landing-cases"],
    ["我们七成时间都花在把数据从一个系统搬出来、处理完再塞进另一个系统。", "zhyese/def--wiki"],
    ["老板每天早上要的那份经营简报，是我们人工一点点拼出来的。", "syngy-ai/octotpus-fde-toolkit"]
   ]},

   { id: "A12", side: "工厂侧", name: "能耗 / 资产 / 现场巡检", items: [
    ["电费单下来才知道能耗超了，那时候早干嘛去了。", "cockpit-fde-02-energy"],
    ["抄表靠人一趟趟跑着记，回来还得一条条往表里敲。", "cockpit-fde-02-energy"],
    ["账上写十台，现场数出七台，少的去哪了没人说得清。", "cockpit-fde-11-asset-inventory"],
    ["没盘到的资产就当没差异，这盘点是盘了个寂寞。", "cockpit-fde-11-asset-inventory"],
    ["夜班巡检老漏检，出问题也说不清在哪个货位哪一排。", "yeasy/forward_deployed_engineering_guide"]
   ]},

   { id: "A13", side: "工厂侧", name: "一线采用与 AI 抵触", items: [
    ["一线工人都怕 AI 把自己替了，没人愿意配合，什么活都推着走。", "zhyese/def--wiki"],
    ["又要我们额外录数据、标数据，一线是真的干不动了。", "cloudzun/lingwan"],
    ["去年花六十多万上的系统现在没人用，我不知道是买错了还是我们自己不行。", "JayceHuang/fde-handbook"],
    ["老板说要个问答机器人，可真出错的人根本不查资料。", "wangjialiang678/enterprise-ai-fde-skill"],
    ["知识库上线了没人用，答非所问，大家还是回去问老员工。", "bingyue/fde-skills"],
    ["客户说「数据都有」，打开一看两万条里三成字段是空的，日期八种写法。", "zhyese/def--wiki"],
    ["我干了五年 ERP 实施，不会写代码，就想六周内转到制造业 FDE。", "qiandewucimi-cpu/fde-mentor"],
    ["老板拍板五个站全上，还说他早把临时工合同停了。", "deeplethe/fde-gym"],
    ["夜班的兄弟说：你们的人从没在这楼里待到十点以后。", "deeplethe/fde-gym"],
    ["这事严不严重我不敢报，先在群里问一圈才敢提交。", "dlxeva/fde-operator-os"]
   ]},

   { id: "B1", side: "内贸外贸侧", name: "外贸询盘与客户跟进", items: [
    ["做机械配件出口，询盘进来全靠人一条条跟，回慢了就飞单。", "bingyue/fde-skills"],
    ["业务天天催询盘回得慢，邮件我又不敢让它自己发。", "bingyue/fde-skills"],
    ["英文询盘要 20 套、没写目的港，目录 MOQ 是 50 套，来回澄清好几轮。", "bingyue/fde-skills"],
    ["认证有效期、币种、单位、交期，多语言一不小心就写错。", "bingyue/fde-skills"],
    ["客户历史订单和偏好没沉淀，二次开发全靠我记忆。", "fde-diagnostic-copilot"],
    ["客户与商机信息散在业务员个人微信和 Excel，离职就带走客户关系。", "fde-diagnostic-copilot"],
    ["销售全在微信群里聊客户，聊天记录导不出来，CRM 还天天限流。", "XiaoLeng-master/fde-interview-skill"],
    ["同一个客户好几个人在跟，归属一写错就影响提成，天天为这个吵。", "XiaoLeng-master/fde-interview-skill"]
   ]},

   { id: "B2", side: "内贸外贸侧", name: "外贸单证 / 审单 / 报关", items: [
    ["一票货要拿出货单跟报关单逐项对，十来分钟，一累就容易看漏。", "JingHao-Leon/fde-case-lab"],
    ["毛重不符、数量短装、HS 归类错位、单价乘数量不等于总价、币制写错 —— 任何一处都要退单、补税甚至查验扣货。", "JingHao-Leon/fde-case-lab"],
    ["一份提单要逐项比对三五分钟，一天几百份，眼睛都看花了。", "zhyese/def--wiki"],
    ["提单上一个字段写错，货主就提不了货，滞期费加索赔全找上门。", "zhyese/def--wiki"],
    ["单证预填全靠人一个个核 SI 长尾字段，退回来返工，来回补两三轮。", "jkang/FDE-Toolkit"],
    ["新客第一单半小时起步，资料不齐还得来回补件，客户早跑了。", "jkang/FDE-Toolkit"],
    ["异常单没个分级标准，规则全在运营老员工脑子里，人一走就断。", "jkang/FDE-Toolkit"],
    ["订舱还在靠人工一单一单审，系统规则覆盖不全，时效提不上来。", "jkang/FDE-Toolkit"],
    ["货都备好了，哪张单证哪条信息会卡住出货我拿不准。", "NewenergyEric/enterprise-ai-playbook"],
    ["提单、报关单、港口费率全是 PDF 和 Excel，得一份份人去看。", "abhishekbhartiind/fde-case-logistics"]
   ]},

   { id: "B3", side: "内贸外贸侧", name: "跨境物流 / 装车 / 运费", items: [
    ["运费对账靠月度人工核对，差异发现滞后，索赔往往错过时限。", "fde-diagnostic-copilot"],
    ["运输在途状态不可见，客户问货只能打电话问司机，延误无法预警。", "fde-diagnostic-copilot"],
    ["物流从周五就没更新，我货到底哪天到？客户天天来催。", "sidhu-master/fde-sharing"],
    ["装车全靠老师傅经验，一辆车折腾五小时，有时候还装不满保本线（98 方）。", "JingHao-Leon/fde-case-lab"],
    ["车该发没发，客户电话打过来我才知道出事了。", "cockpit-fde-05-logistics"],
    ["车出去半天不见回来，路上到底啥情况我心里没底。", "cockpit-fde-05-logistics"],
    ["船改了、柜甩了，通知要等半天才到客户手里，电话早被打爆。", "jkang/FDE-Toolkit"],
    ["旺季舱位说没就没，甩柜改船都是事后才知道，客户天天追。", "jkang/FDE-Toolkit"],
    ["一出事要算替代方案，海运空运铁路库存全靠手工比，三天出不来一张表。", "zhyese/def--wiki"],
    ["只看报价最低就定，算上延误和破损其实一点不便宜。", "NewenergyEric/enterprise-ai-playbook"]
   ]},

   { id: "B4", side: "内贸外贸侧", name: "跨境电商库存 / 补货 / 广告联动", items: [
    ["补货就是我手动从后台扒数据填 Excel，断货了广告还在烧钱。", "JingHao-Leon/fde-case-lab"],
    ["客户下单却发不出货，SKU 断货了广告还在烧钱。", "JingHao-Leon/fde-case-lab"],
    ["十几人的团队、SKU 上千，补货全靠从 SaaS 扒数据套公式。", "JingHao-Leon/fde-case-lab"],
    ["物流照片回填一天要花四五个小时。", "583243/fde-ai-landing-skills"],
    ["每天翻 Excel 看谁该催：样品到了没、视频拍了没、截止日到没。", "MindSyncHub/ai-landing-cases"],
    ["客户说的是「帮我把两个系统打通」，其实背后是补货、广告、物流一整条链。", "583243/fde-ai-landing-skills"]
   ]},

   { id: "B5", side: "内贸外贸侧", name: "跨境经销与动销（Sell In / Sell Through）", items: [
    ["总部只看得见我发货，海外经销商到底卖了多少，我根本看不清。", "MindSyncHub/ai-landing-cases"],
    ["货一出境就成了黑箱，总部只能等经销商几周后的 Excel。", "DaBinBinah/FDE"],
    ["不同国家、不同渠道的数据格式完全不同，Excel、PDF、图片、手写凭证都有。", "MindSyncHub/ai-landing-cases"],
    ["促销买赠返利各市场记法不同，没业务理解根本判断不出真实销售。", "MindSyncHub/ai-landing-cases"],
    ["市场费用靠人工审：这费用合理吗？活动真实发生了吗？金额符合行业水平吗？", "MindSyncHub/ai-landing-cases"],
    ["企业知道需要管理，但没有足够的人力去管理。", "MindSyncHub/ai-landing-cases"],
    ["上了 BI 也没用，工具只能处理已结构化的数据，经销商原始数据恰恰不是。", "MindSyncHub/ai-landing-cases"],
    ["系统上线了还是换个地方看 Excel，两边口径照样对不上。", "MindSyncHub/ai-landing-cases"]
   ]},

   { id: "B6", side: "内贸外贸侧", name: "渠道经销与门店走访", items: [
    ["门店情况全靠下面人口头汇报，等我知道的时候黄花菜都凉了。", "jkang/FDE-Toolkit"],
    ["让业务员填表采集，他嫌费时间，走店的时候直接就跳过去了。", "jkang/FDE-Toolkit"],
    ["跑店的信息全记脑子里，回公司只剩个大概，细节全丢了。", "jkang/FDE-Toolkit"],
    ["调拨单写着到了，上面口头一说就当备好货，其实东西还没到。", "jkang/FDE-Toolkit"]
   ]},

   { id: "B7", side: "内贸外贸侧", name: "零售 / 门店结算对账", items: [
    ["商场那边一套数、我们收银一套数，每期都人工一笔笔核，耗一两天。", "JingHao-Leon/fde-case-lab"],
    ["门店收银和商场结算两套数，纸质单据我得一张张对，差异老是漏掉。", "SnoW-Wei/fde-case-library"],
    ["对账太费人工了，纸质单据肉眼核，一个周期搭进一两个人天。", "MindSyncHub/ai-landing-cases"],
    ["总部设了差异容忍区间，一两个点就不追了，被放弃的是真金白银。", "JingHao-Leon/fde-case-lab"],
    ["老板只看三个数：营收、坪效、缺货率，我却要拼一上午的 Excel。", "carbonlife-yang/fde-chatdemo"]
   ]},

   { id: "B8", side: "内贸外贸侧", name: "电商客服与售后", items: [
    ["我买的明明是两张墙贴，拆开只有一张，缺件还得我自己拍照去申诉。", "sidhu-master/fde-sharing"],
    ["下单时写着两天免费送到，结果从周二就卡在等待揽收，没人管。", "sidhu-master/fde-sharing"],
    ["六笔退货有四笔都提同一个轨道，我却还在凭感觉猜是哪一批货的问题。", "sidhu-master/fde-sharing"],
    ["客户问我为什么延误，系统里根本没写原因，我只能回一句不知道。", "sidhu-master/fde-sharing"],
    ["售前售后都缺产品规格，两边还各自建库，钱和人都浪费一遍。", "bingyue/fde-skills"],
    ["客服天天抱怨 AI 乱答，一查失败的全是已经下架的老商品。", "bingyue/fde-skills"],
    ["跨境咨询每种语言都得单独招人、单独培训，客户等一封回复要等好久。", "yeuxuan/fde-teach"]
   ]},

   { id: "B9", side: "内贸外贸侧", name: "内贸主数据 / 价格 / 对账", items: [
    ["价格全靠人工表格维护，报价和履约看到的版本总对不上。", "dataPro-lgtm/fde-interview-fieldbook"],
    ["CRM 里一个客户，ERP 里一堆结算账户，一公司多账户永远对不上。", "bingyue/fde-skills"],
    ["客户甩来的导出又乱又旧，编码不对表头还合并，全靠人肉清。", "RedBeret/fde-data-forge"]
   ]},

   { id: "B10", side: "内贸外贸侧", name: "交易安全与数据出境", items: [
    ["有人冒充管理员让我把全店价格改成一块钱，还叫我别问，差点就批了。", "sidhu-master/fde-sharing"],
    ["客户要求数据不出域，可又非要用你们最强的云端模型。", "dataPro-lgtm/fde-interview-fieldbook"]
   ]}
  ],

  domains: [
   ["生产计划 / 排产 / 交期承诺", 21, "有限产能排产（OR-Tools / MILP + 启发式 / RL）、插单影响模拟、扫码报工偏差预警"],
   ["物料库存 / 缺料 / 齐套 / 呆滞", 17, "安全库存与再订货点、BOM 净算与预留、呆滞 / 临期 / FIFO 规则、时序预测补货"],
   ["质量与判退 / 机器视觉质检", 14, "YOLOv8 / RT-DETR 缺陷检测、合成缺陷数据、SPC 控制图、OK/NG/DOUBT 三态 + 人工复核"],
   ["设备维护 / 点检 / 预测性维护", 13, "振动 / 电流 / 温度时序异常检测（Isolation Forest + LSTM-AE）、保养工单闭环、维修知识 RAG"],
   ["老师傅隐性经验传承 / 技能断代", 13, "跟岗萃取 + 口语化知识卡、混合检索（BM25 + 向量）、80% 召回验收线"],
   ["报价与非标售前", 13, "图纸多模态解析 → BOM / 工艺路线、显式成本模型 + 残差校准飞轮、人工校准回填"],
   ["采购与供应商 / 比价 / 发票应付", 12, "报价单抽取比价、供应商准入规则引擎、发票 OCR + 三单匹配、异常升级人工"],
   ["跨境物流 / 装车 / 运费对账", 10, "3D 装箱启发式搜索、ETA 预测与延误分级、运费差异对账、在途可视化"],
   ["追溯合规（批次 / 质量追溯）", 9, "批次有向图正反向遍历、本体 + LOT 证据图、扫码留痕、一键追溯"],
   ["财务对账 / 三单匹配 / 成本", 9, "多级模糊匹配 + 差异分类、规则映射科目、双角色交叉复核、订单级成本归集"],
   ["外贸单证 / 审单 / 报关", 8, "LLM 只做结构化抽取 + 确定性规则引擎（数字不过 LLM）、两单交叉对齐、飞书 Bot 落地"],
   ["客诉 / 售后工单与派工", 8, "SLA 着色置顶 + 建议派工（规则 + 负载）、工单分类路由、客诉归因回流质量"],
   ["经营透明 / 订单全链路可视化", 8, "事件流链路重建 + 单据级异常检测器、不推翻 ERP 只做只读二次加工"],
   ["图纸 / 工艺文档版本与检索", 8, "统一编码 + 版本受控、型号精确匹配 + 结构化过滤的混合检索、OCR 抽取工艺要素"],
   ["企业知识库 / RAG 问答", 8, "版本化切片 RAG、引用溯源、旧版隔离、术语表归一"],
   ["跨境经销与动销（Sell In / Through）", 7, "OCR / 多模态抽取非结构化单据、统一字段口径、每个数字可溯源"],
   ["跨境电商库存补货 / 广告联动", 7, "(s,S) 再订货点 + 断货暂停广告、蒙特卡洛 / 事件驱动回测、跨系统自动取数"],
   ["主数据治理 / 实体匹配与查重", 7, "词汇归一化 + n-gram / 模糊匹配、别名表、重复录入三态人工兜底"],
   ["数据口径 / 跨系统对账", 7, "数据地图 + 口径冲突登记、指标字典、多源对照与来源段落定位"],
   ["客服 / 售后知识应答", 6, "RAG 检索留出处、知识缺口变功能、高风险转人工确认、MCP 接入现有入口"],
   ["零售 / 门店结算对账", 5, "OCR + 记录链接、差异分类（漏记 / 漂移 / 转录错 / 拆单）、取消容忍区间"],
   ["跨境 / 多地合规与数据出境", 5, "数据分类与区域边界、权限感知检索、分阶段放量与可执行退出"],
   ["安全环保 / 消防 / 巡检", 4, "规范条文规则化 + 几何覆盖校验、图像语音证据入工单、低置信转人工"],
   ["销售线索 / CRM 回写", 4, "从会议纪要 / 邮件生成待确认草稿、幂等写入、归属审计"],
   ["电商客服与订单履约", 4, "多源订单 / 物流事件对齐、按金额与时限排序的每日简报、写操作暂存 + 人工确认"],
   ["电商内容 / 素材量产", 4, "参数化生成 + 多级校验器链 + 不合格回退人工"],
   ["达人建联 / 履约跟进", 3, "匹配排序（NDCG 评测）+ 状态机 SLA 提醒"],
   ["仓储分拣与调度", 3, "波次组波 + 首次适配递减装箱、SLA 超时预警看板"],
   ["渠道 / 门店走访与巡店", 3, "走访信息结构化采集、门店备货执行规则校验（调拨单 ≠ 收货）"],
   ["物流数据问答 / BI", 3, "自然语言转 SQL Agent、语义层 + 查询规划、确定性答案"],
   ["HR / 招聘与技能矩阵", 3, "JD 智能生成、七项硬门槛 + 强制补证、技能矩阵"],
   ["制造业 FDE 能力培养与现场演练", 3, "场景题题库 + 按提问释放隐藏证据、离线确定性模拟"],
   ["合同 / 单据初审", 2, "条款切片 + 禁限清单对照、原文高亮、强制人机回环"],
   ["实验室耗材 / 检测认证", 2, "批次出入库 + 效期预警、委托收样 → 检测 → 发证状态机"],
   ["港口作业调度", 1, "泊位 / 集卡半开区间冲突检测、堆场容量预留与状态机"],
   ["能耗管理", 1, "折标煤归一化、定额对标 + 进度折算、超标预警"],
   ["固定资产 / 资产盘点", 1, "台账 vs 实盘逐条比对、盘盈盘亏导出"],
   ["项目工时 / 成本", 1, "工时登记 + 预算对比、人工成本归集"],
   ["门店销售看板", 1, "门店汇总 + 同比环比、大屏可视化"],
   ["电力 / 公用事业客服派单", 1, "文本分类派单 + 职责路由 + 政策 RAG 溯源"]
  ]
};