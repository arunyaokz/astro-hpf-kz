import type { Lang } from "./site-v2";

type ServiceItem = {
  id: string;
  number: string;
  kicker: string;
  title: string;
  summary: string;
  fit: string;
  work: string[];
  outputs: string[];
  value: string;
};

type ServicePageContent = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  lead: string;
  primary: string;
  secondary: string;
  imageAlt: string;
  imageCaption: string;
  indexLabel: string;
  introEyebrow: string;
  introTitle: string;
  introText: string;
  principles: Array<{ title: string; text: string }>;
  servicesEyebrow: string;
  servicesTitle: string;
  servicesLead: string;
  labels: {
    fit: string;
    work: string;
    outputs: string;
    value: string;
    input: string;
    result: string;
    response: string;
  };
  services: ServiceItem[];
  sequenceEyebrow: string;
  sequenceTitle: string;
  sequenceLead: string;
  sequence: Array<{ step: string; title: string; text: string; result: string }>;
  exceptionEyebrow: string;
  exceptionTitle: string;
  exceptionLead: string;
  exceptions: Array<{ issue: string; response: string; update: string }>;
  boundaryEyebrow: string;
  boundaryTitle: string;
  boundaryLead: string;
  boundaryDoTitle: string;
  boundaryDo: string[];
  boundaryDontTitle: string;
  boundaryDont: string[];
  briefEyebrow: string;
  briefTitle: string;
  briefText: string;
  briefFields: string[];
  briefNote: string;
  ctaButton: string;
};

export const SERVICES_COPY: Record<Lang, ServicePageContent> = {
  zh: {
    metaTitle: "跨境物流服务｜运输、清关、仓储与哈萨克斯坦交付｜HPF.kz",
    metaDescription: "HPF.kz 将跨境 TIR 与干线运输、清关合规、阿拉木图仓配、多式联运及哈萨克斯坦本地交付组织为一条清楚的责任链。",
    eyebrow: "运输｜清关｜仓储｜本地交付",
    title: "不是把服务列出来，\n是把一票货接到底。",
    lead: "从货物与文件预审，到车辆、口岸、仓库和收货端衔接，HPF.kz 把跨境交付拆到每一个真实节点：谁来接、需要什么、交付什么、变化时如何继续。每一程有安排，每一处有回音。",
    primary: "说明我的货运需求",
    secondary: "先看服务范围",
    imageAlt: "仓内工作人员核对货物与清关资料",
    imageCaption: "清关前置与仓内作业场景",
    indexLabel: "本页服务",
    introEyebrow: "我们的服务方法",
    introTitle: "路越远，越要把交界处照看好。",
    introText: "跨境物流最容易失去控制的，往往不是行驶中的一段路，而是运输与清关、口岸与车队、仓库与收货人之间的交界。我们的工作，是让上一程的结果成为下一程可直接使用的输入，不让客户在不同服务商之间反复转述、催问和补漏。",
    principles: [
      { title: "先看货，再看路", text: "品名、尺寸、价值、包装、贸易条款与到达窗口不同，路线和合规要求也不同。方案从真实约束出发。" },
      { title: "先让文件走一遍", text: "能在发运前核对的品名、HS 编码、申报要素与证书要求，不留到货物抵达口岸后再猜。" },
      { title: "每一程都留下结果", text: "提货、放行、入仓、出库与签收，不只报一句“已完成”，还要留下下一环节能使用的状态与凭据。" },
    ],
    servicesEyebrow: "服务范围与交付颗粒",
    servicesTitle: "车、关、仓、配，按一条运营次序工作。",
    servicesLead: "以下不是必须整套购买的固定套餐。我们根据货物、路线和客户已有资源配置范围，并在报价前写清输入、工作内容、交付物与责任边界。",
    labels: { fit: "适用情形", work: "我们具体处理", outputs: "客户会收到", value: "为客户创造的价值", input: "输入", result: "阶段结果", response: "处理方式" },
    services: [
      {
        id: "customs",
        number: "01",
        kicker: "先于口岸",
        title: "清关与 EAEU 合规协同",
        summary: "清关不是货到边境才开始。我们在发运前把品名、税则、贸易文件与监管要求放到同一张核对表里，尽早发现缺项、矛盾与待确认事项。",
        fit: "首次进入哈萨克斯坦或 EAEU 市场、品类较多、型号复杂、涉及证书或监管条件、历史单证口径不一致的货物。",
        work: [
          "核对合同、商业发票、装箱单、运输文件与原产地资料之间的一致性",
          "根据品名、用途、材质、品牌与型号梳理 HS 归类和申报要素问题",
          "列明 EAEU 证书、许可或标签要求；对不能确认的事项标注依据与待办责任人",
          "协调申报、补件、改单、查验与放行节点，并同步当前状态和下一动作",
        ],
        outputs: ["发运前文件缺口清单", "申报资料核对结果", "证书与监管事项清单", "放行或异常记录"],
        value: "把可预见的问题留在货物出发之前处理，减少口岸补件、重复沟通与无计划等待。我们不承诺“保证通关”，承诺问题有依据、动作有责任人、结果有记录。",
      },
      {
        id: "transport",
        number: "02",
        kicker: "跨境主干",
        title: "跨境 TIR 超卡与公路干线",
        summary: "根据装载条件、口岸能力、通关安排与收货窗口组织公路运输。路线不是一条地图线，而是一组可执行的提货、过境、交接和到达节点。",
        fit: "中国—哈萨克斯坦—欧洲方向的整车、批量或时效敏感货物，以及需要减少换装和中间交接的运输任务。",
        work: [
          "确认货物重量、体积、包装、装卸方式与车辆适配条件",
          "安排提货时间、装车要求、司机与现场联系人，并核对随车文件",
          "规划口岸与跨境交接，跟进车辆位置、排队、通关和预计到达变化",
          "当道路、口岸或收货窗口变化时，说明影响、可选动作与新的时间判断",
        ],
        outputs: ["提货与装车计划", "路线及关键节点表", "在途状态更新", "到达与交接记录"],
        value: "客户不必分别追问司机、口岸与收货端。我们把信息汇到一条责任链上，让每一次变化都有解释，也有下一步。",
      },
      {
        id: "multimodal",
        number: "03",
        kicker: "路线组合",
        title: "跨里海与多式联运",
        summary: "公路、铁路、里海运输与必要的空运备选，各自有不同的容量、换装、船期和文件依赖。我们按货物与交付目标组合，不用单一运式套所有货。",
        fit: "需要从中国经哈萨克斯坦、里海、外高加索或土耳其向欧洲延伸，或需要在成本、时效与容量之间做取舍的货物。",
        work: [
          "比较候选路线的节点数量、换装要求、班期依赖与收货限制",
          "衔接铁路场站、港口窗口、滚装或集装箱作业及西向后续运输",
          "为关键依赖设置确认点，并明确何时继续等待、何时评估替代路线",
          "统一各运输段的文件、状态和交接信息，减少段与段之间的信息断层",
        ],
        outputs: ["主路线与备选路线", "节点依赖与切换条件", "交接与班期状态", "西向衔接安排"],
        value: "路线选择不只比较报价，还把等待、换装、班期和失败后的替代成本放在桌面上，帮助客户做可解释的商业判断。",
      },
      {
        id: "warehouse",
        number: "04",
        kicker: "阿拉木图节点",
        title: "仓储、分拨与订单处理",
        summary: "仓库不是让货停下来的地方，而是把跨境大批量货物转成可盘点、可分拨、可交付订单的运营节点。",
        fit: "需要阿拉木图中转、短中期存放、按 SKU 或批次管理、贴标分拣、分批出库或退换处理的业务。",
        work: [
          "预约到货，记录件数、外包装与可见异常；差异按约定方式留证",
          "按 SKU、批次、箱号或客户规则上架与维护库存状态",
          "执行贴标、换标、分拣、组合包装、拣货和出库复核等约定作业",
          "协调退货接收、状态判断、重新入库或后续处置，并保留处理记录",
        ],
        outputs: ["入库与差异记录", "库存与批次状态", "作业完成清单", "出库及退换记录"],
        value: "让客户知道货物在哪里、是什么状态、能否出库。库存不再只是一个数量，而成为销售与交付可以使用的信息。",
      },
      {
        id: "delivery",
        number: "05",
        kicker: "最后一程",
        title: "哈萨克斯坦本地配送",
        summary: "跨境路线只有在货物进入仓库、门店、经销商或项目现场并完成交接后，才算真正落地。我们把预约、派车、卸货与签收接到同一票货运记录里。",
        fit: "阿拉木图及哈萨克斯坦境内的仓库、门店、经销商、工厂和项目现场交付，或跨境到达后的多点分送。",
        work: [
          "确认收货地址、联系人、工作时间、车辆限制、卸货条件与预约规则",
          "按件数、体积、车型和时窗安排车辆及配送次序",
          "在出发、到场、等待、卸货和签收等关键状态发生时同步信息",
          "遇到拒收、地址变更、无人接货或数量差异时，先保全货物并确认处置指令",
        ],
        outputs: ["配送与预约计划", "到场状态", "异常与处置记录", "POD 签收回单"],
        value: "减少跨境主运输结束后的“最后一公里失联”，让客户能确认货物何时交、交给谁、结果如何。",
      },
      {
        id: "market-entry",
        number: "06",
        kicker: "业务落地",
        title: "中国企业进入哈萨克斯坦的履约协同",
        summary: "第一票货往往同时带着路线、清关、库存和本地交付问题。我们先把物流相关的落地事项拆开，帮助团队看清先后次序与需要本地协同的位置。",
        fit: "准备进入哈萨克斯坦市场、建设本地库存、服务经销网络，或需要验证首票进口与交付流程的中国企业。",
        work: [
          "从货物与交易链条出发，梳理进口、仓储、分拨与交付所需的物流动作",
          "识别首票货中的文件、标签、包装、库存与收货端约束",
          "安排小范围流程验证，再根据真实结果修正后续批量执行方式",
          "沉淀供应商、文件、节点、时效与异常记录，形成可复用的履约底稿",
        ],
        outputs: ["首票履约事项表", "本地节点与责任分工", "试运行结果", "后续批量执行底稿"],
        value: "不把“出海”说成一个抽象方案，而是从第一票货开始，把本地履约需要做的事情逐项落地。法律、税务与市场准入事项由相应专业机构确认。",
      },
    ],
    sequenceEyebrow: "一票货如何推进",
    sequenceTitle: "客户不需要盯住所有人，只需要看清下一步。",
    sequenceLead: "每个阶段都要有输入、有动作、有结果。范围会随货物调整，但责任次序不应含糊。",
    sequence: [
      { step: "01", title: "收货运简报", text: "确认货物、起讫地、重量体积、包装、贸易条款与期望到达窗口。", result: "需求缺口与待确认事项" },
      { step: "02", title: "预审货物与文件", text: "核对运输限制、申报要素、证书要求、装卸条件与收货约束。", result: "风险清单与补充资料" },
      { step: "03", title: "配置路线与责任", text: "确定运输方式、关键节点、时间判断、服务范围、费用边界与责任人。", result: "可执行方案与报价说明" },
      { step: "04", title: "发运与节点交接", text: "按计划提货、装车、申报、过境、转运、入仓或派送，并记录交接结果。", result: "节点状态与交接凭据" },
      { step: "05", title: "处理变化与异常", text: "说明发生了什么、影响什么、谁在处理、需要客户决定什么，以及下一次更新时间。", result: "异常记录与处置决定" },
      { step: "06", title: "签收、归档与复盘", text: "收回签收凭据，整理关键文件、实际节点、费用变化和可复用经验。", result: "POD、归档包与下一票建议" },
    ],
    exceptionEyebrow: "异常不是一句“正在处理”",
    exceptionTitle: "变化发生时，客户应该听见完整的回答。",
    exceptionLead: "我们无法承诺天气、口岸、查验或班期永远不变，但可以把异常说明得足够清楚，让客户知道现在在哪里、接下来做什么。",
    exceptions: [
      { issue: "文件缺失或口径不一致", response: "指出冲突字段、所需补件、可接受格式与提交责任人；在确认前不把猜测当结论。", update: "补件清单、截止时间、复核结果" },
      { issue: "口岸排队、查验或放行延迟", response: "区分排队、申报、查验与补件状态，说明当前控制方、已采取动作和对后续节点的影响。", update: "当前状态、下一动作、下次更新时间" },
      { issue: "车辆、船期或场站窗口变化", response: "核实原计划还能否执行，比较等待与切换的时间、费用和新增交接风险，再由客户确认关键取舍。", update: "影响说明与备选方案" },
      { issue: "到货数量或外包装异常", response: "按约定范围暂停相关作业、留存影像或数量记录、隔离争议货物，并等待处置指令。", update: "差异记录、货物状态、处置结果" },
      { issue: "收货地址、时窗或联系人变化", response: "先确认车辆与货物安全，再重新核对地址、预约和新增费用；未经确认不擅自改交。", update: "变更确认与新的配送安排" },
    ],
    boundaryEyebrow: "服务边界",
    boundaryTitle: "可信的承诺，不回避边界。",
    boundaryLead: "物流服务有能力边界，也受海关、承运人、场站、天气与收货条件影响。把边界写清楚，不是推卸责任，而是让双方知道什么可以管理、什么需要共同决策。",
    boundaryDoTitle: "我们承诺做到",
    boundaryDo: ["报价前说明已知范围、关键假设与待确认项", "为关键节点和异常指定责任人", "变化发生后说明影响、选择与下一次更新时间", "保留约定的交接、放行、入出库与签收记录"],
    boundaryDontTitle: "我们不会这样承诺",
    boundaryDont: ["不宣传“保证通关”或绝对无延误", "不把一张证书等同于沿线自动接受", "不以未经核验的数据包装时效或能力", "不把尚未确认的费用藏在笼统总价里"],
    briefEyebrow: "开始合作",
    briefTitle: "把下一票货，先放到桌面上。",
    briefText: "信息不必一次完美。先把已知情况告诉我们，我们会指出还缺什么，并从货物、文件、路线和收货条件开始梳理。",
    briefFields: ["货物品名、用途与 HS 编码（如已有）", "件数、毛重、体积与包装方式", "起运地、目的地与收发货联系人", "EXW / FOB / DAP 等贸易条款", "期望发运日与到达窗口", "温控、危险、超限、易损或高价值等特殊属性"],
    briefNote: "收到信息后，第一步不是急着报一个数字，而是先确认这票货能否按设想的方式走，以及报价需要基于哪些条件。",
    ctaButton: "提交货运需求",
  },
  en: {
    metaTitle: "Cross-border logistics services | Transport, customs, warehousing and Kazakhstan delivery | HPF.kz",
    metaDescription: "HPF.kz coordinates cross-border road freight, customs preparation, Almaty warehousing, multimodal transport and Kazakhstan delivery through one accountable operating sequence.",
    eyebrow: "Transport / customs / warehousing / delivery",
    title: "Not a list of services.\nOne shipment, carried through.",
    lead: "From cargo and document review to vehicles, borders, warehouses and the consignee, HPF.kz defines every practical handover: who owns it, what is needed, what is produced and how work continues when conditions change.",
    primary: "Describe your shipment",
    secondary: "Review the scope",
    imageAlt: "Warehouse staff checking cargo and customs documentation",
    imageCaption: "Pre-clearance and warehouse operations",
    indexLabel: "Services on this page",
    introEyebrow: "How we work",
    introTitle: "The longer the route, the more carefully its handovers must be managed.",
    introText: "Cross-border shipments most often lose control at the joins: transport to customs, border to carrier, warehouse to consignee. Our role is to make the output of one leg usable by the next, so customers do not have to repeat the same information, chase several providers or discover gaps after the cargo has moved.",
    principles: [
      { title: "Cargo before route", text: "Commodity, dimensions, value, packaging, Incoterms and arrival window determine the workable route and compliance questions." },
      { title: "Documents before departure", text: "Descriptions, HS classification, declaration data and certificate requirements are reviewed before the truck reaches the border." },
      { title: "A result at every handover", text: "Pickup, release, receiving, dispatch and delivery produce a status or record the next party can use—not only a message saying ‘done’." },
    ],
    servicesEyebrow: "Scope and deliverables",
    servicesTitle: "Transport, customs, warehouse and delivery—in one operating order.",
    servicesLead: "This is not a mandatory bundled package. We configure the scope around the cargo, route and capabilities the customer already has, then state inputs, work, deliverables and boundaries before execution.",
    labels: { fit: "When it fits", work: "What we handle", outputs: "What you receive", value: "Value created", input: "Input", result: "Stage result", response: "Our response" },
    services: [
      {
        id: "customs", number: "01", kicker: "Before the border", title: "Customs and EAEU compliance coordination",
        summary: "Customs does not begin when cargo reaches the border. We put descriptions, tariff data, trade documents and regulatory questions into one pre-shipment review and identify gaps, conflicts and open decisions early.",
        fit: "First entry into Kazakhstan or the EAEU, multi-SKU or model-heavy cargo, regulated goods, certificate dependencies or inconsistent legacy documentation.",
        work: ["Cross-check contracts, commercial invoices, packing lists, transport and origin documents", "Review questions around HS classification and declaration elements using commodity, use, material, brand and model data", "List EAEU certificate, permit or labelling questions and mark any unresolved item with a source and owner", "Coordinate declaration, additional documents, amendments, inspection and release status"],
        outputs: ["Pre-shipment document gap list", "Declaration data review", "Regulatory action list", "Release or exception record"],
        value: "Foreseeable issues are handled before departure, reducing border rework and unplanned waiting. We do not promise guaranteed clearance; we promise traceable questions, named actions and recorded outcomes.",
      },
      {
        id: "transport", number: "02", kicker: "Cross-border linehaul", title: "Cross-border TIR and road freight",
        summary: "We organise road transport around loading conditions, border capacity, customs arrangements and the receiving window. A route is treated as an executable sequence of pickup, transit, handover and arrival—not a line on a map.",
        fit: "Full-truck, batch or time-sensitive cargo between China, Kazakhstan and Europe, including shipments where fewer transloads and handovers matter.",
        work: ["Confirm weight, volume, packaging, loading method and vehicle constraints", "Arrange pickup timing, loading instructions, driver contacts and accompanying documents", "Plan the border and cross-border handover and follow vehicle, queue, customs and ETA changes", "When road, border or receiving conditions change, state the impact, options and revised timing"],
        outputs: ["Pickup and loading plan", "Route milestone sheet", "In-transit updates", "Arrival and handover record"],
        value: "The customer does not have to chase the driver, border party and consignee separately. Updates sit in one responsibility chain, with an explanation and next action when circumstances change.",
      },
      {
        id: "multimodal", number: "03", kicker: "Route design", title: "Trans-Caspian and multimodal transport",
        summary: "Road, rail, the Caspian crossing and air alternatives carry different capacity, transloading, schedule and document dependencies. We combine modes against the cargo and delivery objective rather than forcing every shipment into one product.",
        fit: "Cargo moving from China through Kazakhstan, the Caspian, the South Caucasus or Türkiye toward Europe, or shipments balancing cost, timing and capacity.",
        work: ["Compare candidate routes by handovers, transloading, schedule dependency and destination constraints", "Coordinate rail terminals, port windows, Ro-Ro or container activity and the western onward leg", "Set confirmation points for major dependencies and define when to wait or reassess an alternative", "Keep documents, status and handover information consistent across transport legs"],
        outputs: ["Primary and fallback route", "Dependencies and switch conditions", "Handover and schedule status", "Western-leg arrangement"],
        value: "The route decision considers waiting, transloading, schedules and failure recovery—not freight price alone—so the customer can make an explainable commercial choice.",
      },
      {
        id: "warehouse", number: "04", kicker: "Almaty node", title: "Warehousing, distribution and order handling",
        summary: "A warehouse is not simply where cargo stops. It is the operating node that turns cross-border bulk into inventory that can be counted, allocated and delivered.",
        fit: "Almaty transfer or storage, SKU or batch control, labelling, sorting, split dispatch, order preparation or return handling.",
        work: ["Book receiving and record units, visible packaging condition and agreed discrepancy evidence", "Put away and maintain status by SKU, batch, carton or customer rule", "Perform agreed labelling, relabelling, sorting, kitting, picking and dispatch checks", "Receive returns, record condition and coordinate restocking or the agreed next disposition"],
        outputs: ["Receiving and discrepancy record", "Inventory and batch status", "Work completion list", "Dispatch and returns record"],
        value: "Customers can see where goods are, their operational status and whether they are ready to dispatch. Inventory becomes usable information for sales and delivery, not only a quantity.",
      },
      {
        id: "delivery", number: "05", kicker: "Final leg", title: "Kazakhstan local delivery",
        summary: "The cross-border route is complete only when cargo reaches the warehouse, store, distributor or project site and the handover is recorded. We connect appointment, dispatch, unloading and POD to the same shipment file.",
        fit: "Delivery to warehouses, stores, distributors, factories and project sites in Almaty and across Kazakhstan, including multi-drop delivery after arrival.",
        work: ["Confirm address, contact, working hours, vehicle access, unloading and appointment rules", "Plan vehicles and drop order against units, volume, vehicle type and time windows", "Update departure, arrival, waiting, unloading and delivery milestones", "For rejection, address change, absent receiver or quantity discrepancy, protect the cargo and obtain disposition instructions"],
        outputs: ["Delivery and appointment plan", "Arrival status", "Exception and disposition record", "Proof of delivery"],
        value: "The customer does not lose visibility after international linehaul ends. It remains clear when the cargo was delivered, to whom and with what outcome.",
      },
      {
        id: "market-entry", number: "06", kicker: "Local execution", title: "Fulfilment coordination for companies entering Kazakhstan",
        summary: "A first shipment often combines route, customs, inventory and local-delivery questions. We separate the logistics work into a practical sequence and show where local coordination is required.",
        fit: "Chinese and international companies preparing to enter Kazakhstan, establish local stock, serve distributors or validate a first import and fulfilment flow.",
        work: ["Map logistics actions across import, storage, distribution and delivery from the cargo and transaction flow", "Identify first-shipment constraints in documents, labels, packaging, inventory and receiving", "Run a limited operational validation where appropriate and use actual results to adjust the next batch", "Record suppliers, documents, milestones, timing and exceptions as a reusable operating baseline"],
        outputs: ["First-shipment action list", "Local nodes and responsibility map", "Pilot result", "Repeatable execution baseline"],
        value: "Market entry becomes a sequence of concrete logistics decisions, starting with the first shipment. Legal, tax and market-access matters remain subject to confirmation by the relevant professional advisers.",
      },
    ],
    sequenceEyebrow: "How a shipment moves",
    sequenceTitle: "Customers should not have to monitor everyone—only understand the next step.",
    sequenceLead: "Every stage needs an input, an action and a result. The exact scope changes by cargo; the order of responsibility should not be vague.",
    sequence: [
      { step: "01", title: "Receive the freight brief", text: "Confirm cargo, origin, destination, weight, volume, packaging, Incoterms and required arrival window.", result: "Information gaps and open questions" },
      { step: "02", title: "Review cargo and files", text: "Check transport restrictions, declaration data, certificates, handling and receiving constraints.", result: "Risk list and required documents" },
      { step: "03", title: "Configure route and ownership", text: "Define mode, milestones, timing basis, scope, cost boundaries and owners.", result: "Executable plan and quotation notes" },
      { step: "04", title: "Move and hand over", text: "Pickup, load, declare, cross, transfer, receive or deliver, recording each agreed handover.", result: "Milestone status and evidence" },
      { step: "05", title: "Manage change and exceptions", text: "State what happened, the impact, who owns it, what decision is needed and when the next update will come.", result: "Exception record and disposition" },
      { step: "06", title: "Deliver, archive and review", text: "Collect POD and organise key files, actual milestones, cost changes and reusable lessons.", result: "POD, shipment file and next-shipment notes" },
    ],
    exceptionEyebrow: "An exception is more than ‘being handled’",
    exceptionTitle: "When conditions change, the customer deserves a complete answer.",
    exceptionLead: "We cannot promise that weather, borders, inspections or schedules never change. We can explain an exception clearly enough for the customer to know where the shipment stands and what happens next.",
    exceptions: [
      { issue: "Missing or conflicting documents", response: "Identify the conflicting field, required replacement, accepted format and owner; do not present an assumption as a conclusion.", update: "Document list, deadline and review result" },
      { issue: "Border queue, inspection or release delay", response: "Separate queue, declaration, inspection and document status; name the current controlling party and downstream impact.", update: "Current status, next action and next update time" },
      { issue: "Vehicle, sailing or terminal window change", response: "Check whether the plan remains executable and compare waiting with switching by time, cost and added handover risk.", update: "Impact note and available options" },
      { issue: "Quantity or visible packaging discrepancy", response: "Pause the relevant agreed work, preserve photo or count evidence, isolate disputed goods and await disposition.", update: "Discrepancy record, cargo status and outcome" },
      { issue: "Consignee address, window or contact change", response: "Protect vehicle and cargo first, then reconfirm address, appointment and added cost; do not redirect without confirmation.", update: "Change approval and revised delivery plan" },
    ],
    boundaryEyebrow: "Service boundary",
    boundaryTitle: "A credible promise does not hide its limits.",
    boundaryLead: "Logistics services depend on customs authorities, carriers, terminals, weather and receiving conditions. Stating boundaries is not avoiding responsibility; it defines what can be managed and what requires a joint decision.",
    boundaryDoTitle: "We commit to",
    boundaryDo: ["State known scope, assumptions and open items before quotation", "Name owners for key milestones and exceptions", "Explain impact, options and the next update time when conditions change", "Keep agreed handover, release, warehouse and POD records"],
    boundaryDontTitle: "We do not claim",
    boundaryDont: ["No guaranteed clearance or absolute no-delay promise", "No certificate treated as automatic route acceptance", "No unverified timing or capability figures", "No unconfirmed costs hidden inside a vague total"],
    briefEyebrow: "Start a shipment",
    briefTitle: "Put the next shipment on the table.",
    briefText: "The information does not need to be perfect on day one. Share what is known; we will identify what is missing and start with the cargo, documents, route and receiving conditions.",
    briefFields: ["Commodity, use and HS code if available", "Units, gross weight, volume and packaging", "Origin, destination and shipping contacts", "Incoterms such as EXW, FOB or DAP", "Planned ship date and arrival window", "Temperature, dangerous, oversized, fragile or high-value attributes"],
    briefNote: "Our first step is not to rush out a number. It is to confirm whether the shipment can move as expected and which assumptions the quotation must rely on.",
    ctaButton: "Submit freight details",
  },
  ru: {
    metaTitle: "Трансграничная логистика | Перевозка, таможня, склад и доставка по Казахстану | HPF.kz",
    metaDescription: "HPF.kz объединяет автоперевозку, таможенную подготовку, склад в Алматы, мультимодальную логистику и доставку по Казахстану в единый порядок работы.",
    eyebrow: "Перевозка / таможня / склад / доставка",
    title: "Не перечень услуг,\nа ответственность за весь маршрут.",
    lead: "От проверки груза и документов до транспорта, границы, склада и получателя: HPF.kz заранее определяет ответственного, входные данные, результат этапа и порядок действий при изменениях.",
    primary: "Описать перевозку",
    secondary: "Посмотреть состав услуг",
    imageAlt: "Сотрудники склада сверяют груз и таможенные документы",
    imageCaption: "Предварительная таможенная подготовка и складские операции",
    indexLabel: "Услуги на странице",
    introEyebrow: "Наш подход",
    introTitle: "Чем длиннее маршрут, тем важнее контроль на стыках.",
    introText: "Чаще всего управление теряется не в пути, а на переходах: от перевозки к таможне, от границы к перевозчику, от склада к получателю. Мы делаем результат одного этапа понятным входом для следующего, чтобы клиенту не приходилось повторять данные, искать ответственных и устранять пробелы после отправки.",
    principles: [
      { title: "Сначала груз, затем маршрут", text: "Товар, габариты, стоимость, упаковка, Incoterms и окно прибытия определяют маршрут и перечень проверок." },
      { title: "Сначала документы, затем отправка", text: "Описание, код ТН ВЭД, сведения для декларации и требования к документам проверяются до прибытия машины на границу." },
      { title: "На каждом этапе — результат", text: "Забор, выпуск, приёмка, отгрузка и доставка завершаются статусом или документом, который нужен следующему участнику." },
    ],
    servicesEyebrow: "Состав работ и результат",
    servicesTitle: "Транспорт, таможня, склад и доставка — в одном порядке.",
    servicesLead: "Это не обязательный пакет. Состав работ определяется грузом, маршрутом и ресурсами клиента. До начала мы фиксируем входные данные, действия, результат и границы ответственности.",
    labels: { fit: "Когда подходит", work: "Что мы выполняем", outputs: "Что получает клиент", value: "Практическая ценность", input: "Входные данные", result: "Результат этапа", response: "Порядок действий" },
    services: [
      {
        id: "customs", number: "01", kicker: "До границы", title: "Таможенное сопровождение и требования ЕАЭС",
        summary: "Таможенная работа начинается до прибытия груза на границу. Мы сводим описание товара, тарифные данные, коммерческие документы и регуляторные вопросы в одну предварительную проверку.",
        fit: "Первый ввоз в Казахстан или ЕАЭС, много позиций и моделей, регулируемые товары, зависимость от сертификатов или расхождения в прежних документах.",
        work: ["Сверяем контракт, инвойс, упаковочный лист, транспортные документы и сведения о происхождении", "Проверяем вопросы по коду ТН ВЭД и сведениям декларации на основании назначения, материала, марки и модели", "Формируем перечень вопросов по сертификатам, разрешениям и маркировке ЕАЭС с указанием источника и ответственного", "Координируем декларирование, дополнительные документы, корректировки, досмотр и статус выпуска"],
        outputs: ["Перечень недостающих документов", "Результат сверки сведений", "Список регуляторных действий", "Запись о выпуске или отклонении"],
        value: "Предсказуемые вопросы решаются до отправки, что сокращает повторную работу и незапланированное ожидание. Мы не обещаем «гарантированное оформление», но фиксируем основания, ответственных и результат.",
      },
      {
        id: "transport", number: "02", kicker: "Магистральное плечо", title: "TIR и трансграничные автоперевозки",
        summary: "Организуем автоперевозку с учётом погрузки, пропускной способности границы, таможенных процедур и окна приёмки. Маршрут — это последовательность исполнимых этапов, а не линия на карте.",
        fit: "Полные машины, партии и срочные грузы между Китаем, Казахстаном и Европой, особенно когда важно сократить перегрузки и передачи.",
        work: ["Подтверждаем вес, объём, упаковку, способ погрузки и требования к машине", "Согласуем время забора, инструкции по погрузке, контакты водителя и сопроводительные документы", "Планируем переход границы и контролируем движение, очередь, оформление и изменение ETA", "При изменении дороги, границы или окна приёмки указываем влияние, варианты и новое время"],
        outputs: ["План забора и погрузки", "Таблица маршрута и контрольных точек", "Статусы в пути", "Запись прибытия и передачи"],
        value: "Клиенту не нужно отдельно искать водителя, таможенного представителя и получателя. Информация и ответственность собраны в одной цепочке.",
      },
      {
        id: "multimodal", number: "03", kicker: "Комбинация маршрута", title: "Транскаспийские и мультимодальные перевозки",
        summary: "Авто, железная дорога, Каспий и авиационный резерв имеют разные ограничения по мощности, перегрузке, расписанию и документам. Комбинация определяется грузом и целью доставки.",
        fit: "Перевозки из Китая через Казахстан, Каспий, Южный Кавказ или Турцию в Европу, а также задачи с выбором между стоимостью, сроком и доступной мощностью.",
        work: ["Сравниваем варианты по числу передач, перегрузкам, расписанию и требованиям пункта назначения", "Координируем терминалы, портовые окна, Ro-Ro или контейнерные операции и западное плечо", "Определяем контрольные точки и условия ожидания либо перехода к альтернативе", "Сводим документы, статусы и передачу между всеми транспортными плечами"],
        outputs: ["Основной и резервный маршрут", "Зависимости и условия переключения", "Статус расписания и передач", "Организация западного плеча"],
        value: "Решение учитывает не только тариф, но и ожидание, перегрузки, расписание и стоимость восстановления после сбоя. Клиент видит основание выбора.",
      },
      {
        id: "warehouse", number: "04", kicker: "Узел в Алматы", title: "Склад, распределение и обработка заказов",
        summary: "Склад — это не просто место хранения. Здесь трансграничная партия становится запасом, который можно проверить, распределить и подготовить к доставке.",
        fit: "Перевалка и хранение в Алматы, учёт по SKU или партиям, маркировка, сортировка, частичные отгрузки, комплектация и возвраты.",
        work: ["Бронируем приёмку, фиксируем количество, состояние внешней упаковки и согласованные доказательства расхождений", "Размещаем и ведём статус по SKU, партии, коробу или правилам клиента", "Выполняем согласованную маркировку, сортировку, комплектацию, подбор и проверку отгрузки", "Принимаем возвраты, фиксируем состояние и согласуем повторное размещение либо дальнейшее действие"],
        outputs: ["Акт приёмки и расхождений", "Статус запасов и партий", "Перечень выполненных операций", "Запись отгрузок и возвратов"],
        value: "Клиент понимает, где находится товар, в каком он состоянии и готов ли к отгрузке. Остаток становится рабочей информацией для продаж и доставки.",
      },
      {
        id: "delivery", number: "05", kicker: "Последний этап", title: "Доставка по Казахстану",
        summary: "Маршрут завершён, когда груз передан складу, магазину, дистрибьютору или объекту и результат зафиксирован. Мы объединяем запись получателя, подачу машины, разгрузку и POD в одной карточке перевозки.",
        fit: "Доставка по Алматы и Казахстану на склады, в магазины, дистрибьюторам, на заводы и объекты, включая развоз по нескольким адресам.",
        work: ["Уточняем адрес, контакт, часы работы, ограничения для машины, разгрузку и правила записи", "Планируем транспорт и порядок точек по количеству, объёму, типу машины и окнам", "Передаём статусы выезда, прибытия, ожидания, разгрузки и вручения", "При отказе, смене адреса, отсутствии получателя или расхождении сохраняем груз и запрашиваем решение"],
        outputs: ["План доставки и записи", "Статус прибытия", "Запись отклонения и решения", "POD / подтверждение доставки"],
        value: "После международного плеча видимость не пропадает: понятно, когда, кому и с каким результатом передан груз.",
      },
      {
        id: "market-entry", number: "06", kicker: "Локальное исполнение", title: "Логистическое сопровождение выхода на рынок Казахстана",
        summary: "Первая поставка обычно объединяет маршрут, таможню, запас и местную доставку. Мы раскладываем логистические задачи по порядку и показываем, где требуется местная координация.",
        fit: "Компании, которые готовят выход на рынок Казахстана, создают местный запас, обслуживают дистрибьюторов или проверяют первую схему импорта и исполнения.",
        work: ["Описываем логистические действия по импорту, хранению, распределению и доставке исходя из товара и сделки", "Выявляем ограничения первой поставки по документам, маркировке, упаковке, запасу и приёмке", "При необходимости проводим ограниченную проверку процесса и корректируем следующую партию по фактическому результату", "Фиксируем поставщиков, документы, этапы, сроки и отклонения как основу повторяемого процесса"],
        outputs: ["План действий по первой поставке", "Схема местных узлов и ответственности", "Результат пробного исполнения", "Основа для повторных поставок"],
        value: "Выход на рынок становится последовательностью конкретных логистических решений. Юридические, налоговые вопросы и допуск товара подтверждаются профильными консультантами.",
      },
    ],
    sequenceEyebrow: "Порядок перевозки",
    sequenceTitle: "Клиенту не нужно контролировать всех участников — достаточно понимать следующий шаг.",
    sequenceLead: "У каждого этапа есть входные данные, действие и результат. Состав работ меняется по грузу, но порядок ответственности должен быть однозначным.",
    sequence: [
      { step: "01", title: "Получить заявку", text: "Подтвердить груз, отправление, назначение, вес, объём, упаковку, Incoterms и окно прибытия.", result: "Недостающие данные и открытые вопросы" },
      { step: "02", title: "Проверить груз и документы", text: "Проверить ограничения перевозки, сведения декларации, документы, обработку и условия приёмки.", result: "Перечень рисков и документов" },
      { step: "03", title: "Определить маршрут и ответственность", text: "Зафиксировать вид транспорта, этапы, основу срока, состав работ, границы стоимости и ответственных.", result: "Исполнимый план и пояснения к тарифу" },
      { step: "04", title: "Выполнить перевозку и передачи", text: "Забрать, погрузить, оформить, пересечь, перегрузить, принять или доставить с фиксацией этапов.", result: "Статусы и подтверждения передачи" },
      { step: "05", title: "Управлять изменениями", text: "Сообщить событие, влияние, ответственного, требуемое решение и время следующего обновления.", result: "Запись отклонения и решение" },
      { step: "06", title: "Доставить и закрыть перевозку", text: "Получить POD, собрать документы, фактические этапы, изменения стоимости и выводы.", result: "POD, архив и рекомендации" },
    ],
    exceptionEyebrow: "Отклонение — это не фраза «в работе»",
    exceptionTitle: "При изменении условий клиент должен получить полный ответ.",
    exceptionLead: "Мы не можем обещать неизменность погоды, границы, досмотра или расписания. Но можем объяснить ситуацию так, чтобы клиент понимал статус и следующий шаг.",
    exceptions: [
      { issue: "Нет документа или данные расходятся", response: "Указываем поле расхождения, требуемый документ, формат и ответственного; предположение не выдаём за вывод.", update: "Перечень, срок и результат проверки" },
      { issue: "Очередь, досмотр или задержка выпуска", response: "Разделяем очередь, декларацию, досмотр и документы; называем контролирующую сторону и влияние на следующие этапы.", update: "Статус, действие и время следующего сообщения" },
      { issue: "Изменение машины, рейса или окна терминала", response: "Проверяем исполнимость плана и сравниваем ожидание с заменой по сроку, стоимости и риску новой передачи.", update: "Описание влияния и варианты" },
      { issue: "Расхождение количества или упаковки", response: "Приостанавливаем согласованные операции, сохраняем фото или пересчёт, изолируем спорный товар и ждём решения.", update: "Акт расхождения, статус и итог" },
      { issue: "Изменение адреса, окна или контакта", response: "Сначала обеспечиваем безопасность машины и груза, затем подтверждаем адрес, запись и дополнительные расходы.", update: "Подтверждение изменения и новый план" },
    ],
    boundaryEyebrow: "Границы услуги",
    boundaryTitle: "Надёжное обещание не скрывает ограничений.",
    boundaryLead: "Логистика зависит от таможни, перевозчиков, терминалов, погоды и условий приёмки. Чёткие границы определяют, чем можно управлять и где требуется совместное решение.",
    boundaryDoTitle: "Мы обязуемся",
    boundaryDo: ["До тарифа указать известный состав, допущения и открытые вопросы", "Назначить ответственных за ключевые этапы и отклонения", "При изменении объяснить влияние, варианты и время следующего сообщения", "Хранить согласованные записи передачи, выпуска, склада и POD"],
    boundaryDontTitle: "Мы не заявляем",
    boundaryDont: ["Не обещаем гарантированное оформление или полное отсутствие задержек", "Не считаем сертификат автоматическим допуском на весь маршрут", "Не публикуем непроверенные сроки и показатели мощности", "Не скрываем неподтверждённые расходы в общей формулировке"],
    briefEyebrow: "Начать перевозку",
    briefTitle: "Начнём со следующего груза.",
    briefText: "Не обязательно иметь все данные сразу. Передайте известное — мы укажем, чего не хватает, и начнём с груза, документов, маршрута и условий приёмки.",
    briefFields: ["Товар, назначение и код ТН ВЭД, если известен", "Количество, брутто, объём и упаковка", "Пункт отправления, назначения и контакты", "Incoterms: EXW, FOB, DAP и другие", "Плановая дата отправки и окно прибытия", "Температурный режим, опасность, негабарит, хрупкость или высокая стоимость"],
    briefNote: "Первый шаг — не спешить с одной цифрой, а подтвердить исполнимость перевозки и условия, на которых будет основан тариф.",
    ctaButton: "Отправить данные груза",
  },
};
