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
  labels: { fit: string; work: string; outputs: string; value: string; input: string; result: string; response: string };
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
    metaDescription: "HPF.kz 连接跨境运输、清关、仓储与哈萨克斯坦本地交付，让一票货由一条责任链接到底。",
    eyebrow: "运输｜清关｜仓储｜本地交付",
    title: "一票货，\n一路有人管。",
    lead: "运输、清关、仓储、交付，由一支团队接到底。",
    primary: "获取运输方案",
    secondary: "查看服务",
    imageAlt: "仓内工作人员核对货物与清关资料",
    imageCaption: "清关前置与仓内作业",
    indexLabel: "六项服务",
    introEyebrow: "我们的做法",
    introTitle: "每次交接，都有人管。",
    introText: "我们接好车辆、口岸、仓库与收货端。客户少追问一步，货物多向前一步。",
    principles: [
      { title: "先看货", text: "货物决定路线，不拿模板套方案。" },
      { title: "文件前置", text: "能在发运前发现的问题，不留到口岸。" },
      { title: "交接留痕", text: "每个节点有状态、有凭据、有下一步。" },
    ],
    servicesEyebrow: "服务范围",
    servicesTitle: "六项能力，一条交付链。",
    servicesLead: "选一项，或整票托付。范围、责任和结果，发运前说清。",
    labels: { fit: "适合谁", work: "我们来做", outputs: "你会拿到", value: "客户价值", input: "输入", result: "结果", response: "处理" },
    services: [
      {
        id: "customs", number: "01", kicker: "先于口岸", title: "清关合规",
        summary: "货到口岸前，先把文件和要求走一遍。",
        fit: "首票进口、SKU 多、证书复杂或单证口径不一。",
        work: ["核对合同、发票、装箱单", "梳理 HS 编码与申报要素", "跟进补件、查验与放行"],
        outputs: ["文件缺口", "申报核对", "放行记录"],
        value: "问题前置，少补件，少等待。",
      },
      {
        id: "transport", number: "02", kicker: "跨境主干", title: "TIR 跨境干线",
        summary: "从提货到过境，把车辆和节点接起来。",
        fit: "中哈欧整车、批量货与时效敏感货物。",
        work: ["匹配车型与装载条件", "安排提货、口岸和交接", "同步位置、变化与 ETA"],
        outputs: ["提货计划", "节点状态", "交接记录"],
        value: "不用四处追问，一处看清进度。",
      },
      {
        id: "multimodal", number: "03", kicker: "路线组合", title: "跨里海联运",
        summary: "公路、铁路与里海运输，按目标组合。",
        fit: "需要连接高加索、土耳其或欧洲的货物。",
        work: ["比较主线与备选线", "衔接场站、港口与船期", "设定等待与切换条件"],
        outputs: ["路线组合", "节点依赖", "切换条件"],
        value: "不只比运价，更看哪条路走得成。",
      },
      {
        id: "warehouse", number: "04", kicker: "阿拉木图节点", title: "仓储分拨",
        summary: "让大批量货物变成可盘点、可分拨的订单。",
        fit: "中转、存放、贴标、分拣、分批出库与退换。",
        work: ["预约收货并记录差异", "按 SKU 或批次管理", "执行贴标、拣选与出库"],
        outputs: ["入库记录", "库存状态", "出库清单"],
        value: "货在哪里、能否出库，一目了然。",
      },
      {
        id: "delivery", number: "05", kicker: "最后一程", title: "本地配送",
        summary: "把跨境货送到仓库、门店或项目现场。",
        fit: "阿拉木图及哈萨克斯坦境内单点或多点交付。",
        work: ["确认预约与卸货条件", "安排车辆和配送次序", "跟进到场、签收与异常"],
        outputs: ["配送计划", "到场状态", "POD 回单"],
        value: "国际干线结束，服务不断线。",
      },
      {
        id: "market-entry", number: "06", kicker: "业务落地", title: "入哈履约",
        summary: "从第一票货开始，搭好本地交付路径。",
        fit: "准备进入哈萨克斯坦或验证首票流程的企业。",
        work: ["梳理进口、仓储与配送", "识别首票文件和包装约束", "用试运行结果优化批量执行"],
        outputs: ["首票清单", "责任分工", "复用底稿"],
        value: "不谈空泛出海，先把第一票做成。",
      },
    ],
    sequenceEyebrow: "一票货如何推进",
    sequenceTitle: "你只需看清下一步。",
    sequenceLead: "每一步，都有动作和结果。",
    sequence: [
      { step: "01", title: "说清需求", text: "货物、起讫地、重量与时间。", result: "待确认清单" },
      { step: "02", title: "预审货物", text: "先查限制、文件与收货条件。", result: "风险与补件" },
      { step: "03", title: "配置方案", text: "定路线、费用边界和责任人。", result: "方案与报价" },
      { step: "04", title: "执行交接", text: "提货、过境、入仓或派送。", result: "节点与凭据" },
      { step: "05", title: "处理变化", text: "给事实、选项和下次更新时间。", result: "处理决定" },
      { step: "06", title: "签收复盘", text: "收回 POD，留下下一票经验。", result: "归档与建议" },
    ],
    exceptionEyebrow: "异常管理",
    exceptionTitle: "有变化，就给方案。",
    exceptionLead: "不只说“正在处理”，还要说清现在、选择和下一步。",
    exceptions: [
      { issue: "文件不一致", response: "指出差异、补件和责任人。", update: "清单、截止时间、结果" },
      { issue: "口岸延迟", response: "拆清排队、查验与放行状态。", update: "状态、动作、更新时间" },
      { issue: "车辆或船期变化", response: "比较等待、切换和新增成本。", update: "影响与备选方案" },
      { issue: "货物差异", response: "留证、隔离并等待处置指令。", update: "差异、状态、结果" },
      { issue: "收货条件变化", response: "先保全货物，再确认新安排。", update: "确认与配送计划" },
    ],
    boundaryEyebrow: "服务边界",
    boundaryTitle: "边界清楚，承诺才有分量。",
    boundaryLead: "能管理的，我们负责到底；需共同决定的，我们提前说清。",
    boundaryDoTitle: "我们做到",
    boundaryDo: ["报价前写清范围与假设", "关键节点指定责任人", "变化后给出影响和选项", "保留交接与签收记录"],
    boundaryDontTitle: "我们不说",
    boundaryDont: ["不说“保证通关”", "不承诺绝对无延误", "不使用未经核验的数据", "不隐藏待确认费用"],
    briefEyebrow: "开始合作",
    briefTitle: "给一票货，拿一份方案。",
    briefText: "先发来已知信息，缺什么由我们标出。",
    briefFields: ["品名、用途与 HS 编码", "件数、重量、体积与包装", "起运地、目的地与联系人", "EXW / FOB / DAP 等条款", "发运日与到达窗口", "温控、危险、超限或高价值属性"],
    briefNote: "先确认走得成，再给有条件的报价。",
    ctaButton: "获取运输方案",
  },

  en: {
    metaTitle: "Cross-border logistics services | Transport, customs, warehousing and delivery | HPF.kz",
    metaDescription: "HPF.kz connects transport, customs, warehousing and Kazakhstan delivery through one accountable shipment chain.",
    eyebrow: "Transport / customs / warehousing / delivery",
    title: "One shipment.\nOne team in charge.",
    lead: "Transport, customs, warehousing and delivery—connected end to end.",
    primary: "Get a route plan",
    secondary: "See the services",
    imageAlt: "Warehouse staff checking cargo and customs documentation",
    imageCaption: "Pre-clearance and warehouse operations",
    indexLabel: "Six services",
    introEyebrow: "How we work",
    introTitle: "Every handover, owned.",
    introText: "We connect vehicles, borders, warehouses and consignees. Less chasing for you. More movement for the cargo.",
    principles: [
      { title: "Cargo first", text: "The cargo shapes the route—not a template." },
      { title: "Files first", text: "Find document gaps before the border." },
      { title: "Proof at every step", text: "Every handover leaves a status and a next move." },
    ],
    servicesEyebrow: "Service scope",
    servicesTitle: "Six services. One delivery chain.",
    servicesLead: "Choose one service or hand us the shipment. Scope, owner and result are clear before departure.",
    labels: { fit: "Best for", work: "We handle", outputs: "You receive", value: "Your value", input: "Input", result: "Result", response: "Response" },
    services: [
      {
        id: "customs", number: "01", kicker: "Before the border", title: "Customs compliance",
        summary: "Review the cargo and files before they reach the border.",
        fit: "First imports, many SKUs, certificates or inconsistent files.",
        work: ["Check invoice, packing list and contract", "Review HS and declaration questions", "Follow missing files, inspection and release"],
        outputs: ["File-gap list", "Declaration check", "Release record"],
        value: "Fewer surprises. Less border waiting.",
      },
      {
        id: "transport", number: "02", kicker: "Cross-border trunk", title: "TIR road freight",
        summary: "Connect pickup, border and arrival in one road plan.",
        fit: "Full loads, repeat volumes and time-sensitive China–Kazakhstan–Europe cargo.",
        work: ["Match vehicle and loading needs", "Arrange pickup, border and handover", "Update position, changes and ETA"],
        outputs: ["Pickup plan", "Milestone status", "Handover record"],
        value: "One place to see what happens next.",
      },
      {
        id: "multimodal", number: "03", kicker: "Route combination", title: "Trans-Caspian freight",
        summary: "Combine road, rail and Caspian legs around the delivery goal.",
        fit: "Cargo moving toward the Caucasus, Türkiye or Europe.",
        work: ["Compare primary and fallback routes", "Connect terminals, ports and vessel windows", "Set wait and switch rules"],
        outputs: ["Route options", "Node dependencies", "Switch conditions"],
        value: "Choose the route that can perform—not only the lowest rate.",
      },
      {
        id: "warehouse", number: "04", kicker: "Almaty node", title: "Warehousing & fulfilment",
        summary: "Turn bulk cargo into visible, dispatch-ready inventory.",
        fit: "Storage, SKU control, labelling, picking, split dispatch or returns.",
        work: ["Book and record receiving", "Track SKU or batch status", "Label, pick and check dispatch"],
        outputs: ["Receiving record", "Inventory status", "Dispatch list"],
        value: "Know where the goods are and whether they can ship.",
      },
      {
        id: "delivery", number: "05", kicker: "Final leg", title: "Kazakhstan delivery",
        summary: "Deliver to the warehouse, store or project site.",
        fit: "Single or multi-drop delivery across Almaty and Kazakhstan.",
        work: ["Confirm appointment and unloading", "Plan vehicle and drop order", "Track arrival, POD and exceptions"],
        outputs: ["Delivery plan", "Arrival status", "POD"],
        value: "Visibility continues after international linehaul.",
      },
      {
        id: "market-entry", number: "06", kicker: "Local execution", title: "Kazakhstan market entry",
        summary: "Build the local delivery flow from the first shipment.",
        fit: "Companies entering Kazakhstan or testing a first import flow.",
        work: ["Map import, storage and delivery", "Find first-load file and packaging gaps", "Use the pilot to improve repeat shipments"],
        outputs: ["First-load plan", "Owner map", "Repeatable baseline"],
        value: "Make the first shipment work before scaling.",
      },
    ],
    sequenceEyebrow: "How it moves",
    sequenceTitle: "You only need to see the next move.",
    sequenceLead: "Every step has an action and a result.",
    sequence: [
      { step: "01", title: "Share the brief", text: "Cargo, route, size and timing.", result: "Open questions" },
      { step: "02", title: "Review the cargo", text: "Check restrictions, files and receiving.", result: "Risks and gaps" },
      { step: "03", title: "Build the plan", text: "Set route, cost boundary and owners.", result: "Plan and quote" },
      { step: "04", title: "Move and hand over", text: "Pickup, cross, receive or deliver.", result: "Status and proof" },
      { step: "05", title: "Manage change", text: "Give facts, options and next update time.", result: "Decision record" },
      { step: "06", title: "Close and learn", text: "Collect POD and improve the next load.", result: "File and notes" },
    ],
    exceptionEyebrow: "Exception management",
    exceptionTitle: "A change needs options.",
    exceptionLead: "Not just ‘being handled’. You get the status, choices and next move.",
    exceptions: [
      { issue: "Conflicting files", response: "Name the gap, replacement and owner.", update: "List, deadline, result" },
      { issue: "Border delay", response: "Separate queue, inspection and release.", update: "Status, action, next update" },
      { issue: "Vehicle or vessel change", response: "Compare waiting, switching and added cost.", update: "Impact and options" },
      { issue: "Cargo discrepancy", response: "Record, isolate and await instruction.", update: "Difference, status, result" },
      { issue: "Receiving change", response: "Protect the cargo, then confirm the new plan.", update: "Approval and delivery plan" },
    ],
    boundaryEyebrow: "Service boundary",
    boundaryTitle: "Clear limits make stronger promises.",
    boundaryLead: "We own what can be managed and flag what needs a joint decision.",
    boundaryDoTitle: "We commit to",
    boundaryDo: ["State scope and assumptions before quoting", "Name owners for key milestones", "Give impact and options when plans change", "Keep handover and POD records"],
    boundaryDontTitle: "We do not claim",
    boundaryDont: ["No guaranteed clearance", "No absolute no-delay promise", "No unverified performance figures", "No hidden unconfirmed costs"],
    briefEyebrow: "Start a shipment",
    briefTitle: "One shipment in. One plan back.",
    briefText: "Send what you know. We will mark what is missing.",
    briefFields: ["Commodity, use and HS code", "Units, weight, volume and packaging", "Origin, destination and contacts", "EXW / FOB / DAP terms", "Ship date and arrival window", "Temperature, dangerous, oversized or high-value needs"],
    briefNote: "First confirm it can move. Then quote on clear conditions.",
    ctaButton: "Get my route plan",
  },

  ru: {
    metaTitle: "Трансграничная логистика | Перевозка, таможня, склад и доставка | HPF.kz",
    metaDescription: "HPF.kz объединяет перевозку, таможню, склад и доставку по Казахстану в одну ответственную цепочку.",
    eyebrow: "Перевозка / таможня / склад / доставка",
    title: "Один груз.\nОдна команда отвечает.",
    lead: "Перевозка, таможня, склад и доставка — в одной цепочке.",
    primary: "Получить маршрут",
    secondary: "Смотреть услуги",
    imageAlt: "Сотрудники склада сверяют груз и таможенные документы",
    imageCaption: "Подготовка документов и складские операции",
    indexLabel: "Шесть услуг",
    introEyebrow: "Как мы работаем",
    introTitle: "Каждая передача — под контролем.",
    introText: "Мы соединяем машину, границу, склад и получателя. Клиент меньше ищет ответы. Груз быстрее движется дальше.",
    principles: [
      { title: "Сначала груз", text: "Маршрут строится под груз, а не по шаблону." },
      { title: "Документы заранее", text: "Пробелы находим до прибытия на границу." },
      { title: "Результат этапа", text: "После каждой передачи есть статус и следующий шаг." },
    ],
    servicesEyebrow: "Состав услуг",
    servicesTitle: "Шесть услуг. Одна цепочка доставки.",
    servicesLead: "Выберите одну услугу или передайте всю перевозку. Объём, ответственный и результат понятны до отправки.",
    labels: { fit: "Для каких задач", work: "Что делаем", outputs: "Что получаете", value: "Ваша выгода", input: "Вход", result: "Результат", response: "Действие" },
    services: [
      {
        id: "customs", number: "01", kicker: "До границы", title: "Таможня и комплаенс",
        summary: "Проверяем груз и документы до прибытия на границу.",
        fit: "Первый импорт, много SKU, сертификаты или разночтения в документах.",
        work: ["Сверяем контракт, инвойс и упаковочный лист", "Проверяем код ТН ВЭД и сведения", "Сопровождаем документы, досмотр и выпуск"],
        outputs: ["Список пробелов", "Проверка сведений", "Запись выпуска"],
        value: "Меньше сюрпризов. Меньше ожидания на границе.",
      },
      {
        id: "transport", number: "02", kicker: "Магистраль", title: "TIR и автоперевозка",
        summary: "Связываем забор, границу и прибытие в одном плане.",
        fit: "Полные машины, регулярные партии и срочные грузы Китай–Казахстан–Европа.",
        work: ["Подбираем машину и условия погрузки", "Организуем забор, границу и передачу", "Сообщаем позицию, изменения и ETA"],
        outputs: ["План забора", "Статус этапов", "Запись передачи"],
        value: "Один источник статуса и следующего шага.",
      },
      {
        id: "multimodal", number: "03", kicker: "Комбинация маршрута", title: "Транскаспийская перевозка",
        summary: "Соединяем авто, железную дорогу и Каспий под цель доставки.",
        fit: "Грузы на Кавказ, в Турцию и Европу.",
        work: ["Сравниваем основной и резервный путь", "Связываем терминалы, порты и суда", "Задаём условия ожидания и переключения"],
        outputs: ["Варианты маршрута", "Зависимости узлов", "Условия переключения"],
        value: "Выбор по исполнимости, а не только по тарифу.",
      },
      {
        id: "warehouse", number: "04", kicker: "Узел Алматы", title: "Склад и фулфилмент",
        summary: "Превращаем партию в видимый, готовый к отгрузке запас.",
        fit: "Хранение, SKU-учёт, маркировка, подбор, частичные отгрузки и возвраты.",
        work: ["Бронируем и фиксируем приёмку", "Ведём статус SKU или партии", "Маркируем, подбираем и проверяем отгрузку"],
        outputs: ["Запись приёмки", "Статус запасов", "Лист отгрузки"],
        value: "Понятно, где товар и готов ли он к отгрузке.",
      },
      {
        id: "delivery", number: "05", kicker: "Последний этап", title: "Доставка по Казахстану",
        summary: "Доставляем на склад, в магазин или на объект.",
        fit: "Одна или несколько точек по Алматы и Казахстану.",
        work: ["Подтверждаем запись и разгрузку", "Планируем машину и порядок точек", "Контролируем прибытие, POD и отклонения"],
        outputs: ["План доставки", "Статус прибытия", "POD"],
        value: "Видимость не заканчивается после международного плеча.",
      },
      {
        id: "market-entry", number: "06", kicker: "Локальное исполнение", title: "Выход на рынок Казахстана",
        summary: "Строим местную схему с первой поставки.",
        fit: "Компании, которые выходят в Казахстан или тестируют первый импорт.",
        work: ["Описываем импорт, склад и доставку", "Находим пробелы первой поставки", "Улучшаем повторные отправки по результату пилота"],
        outputs: ["План первой поставки", "Схема ответственных", "Повторяемая основа"],
        value: "Сначала успешная поставка. Затем масштабирование.",
      },
    ],
    sequenceEyebrow: "Как движется груз",
    sequenceTitle: "Вам достаточно видеть следующий шаг.",
    sequenceLead: "У каждого шага есть действие и результат.",
    sequence: [
      { step: "01", title: "Передать заявку", text: "Груз, маршрут, размер и срок.", result: "Открытые вопросы" },
      { step: "02", title: "Проверить груз", text: "Ограничения, документы и приёмка.", result: "Риски и пробелы" },
      { step: "03", title: "Собрать план", text: "Маршрут, стоимость и ответственные.", result: "План и тариф" },
      { step: "04", title: "Выполнить перевозку", text: "Забор, граница, склад или доставка.", result: "Статус и подтверждение" },
      { step: "05", title: "Управлять изменением", text: "Факты, варианты и время обновления.", result: "Решение" },
      { step: "06", title: "Закрыть и улучшить", text: "POD и выводы для следующего груза.", result: "Архив и рекомендации" },
    ],
    exceptionEyebrow: "Работа с отклонениями",
    exceptionTitle: "Есть изменение — есть варианты.",
    exceptionLead: "Не просто «в работе». Вы получаете статус, выбор и следующий шаг.",
    exceptions: [
      { issue: "Документы расходятся", response: "Называем пробел, замену и ответственного.", update: "Список, срок, результат" },
      { issue: "Задержка на границе", response: "Разделяем очередь, досмотр и выпуск.", update: "Статус, действие, обновление" },
      { issue: "Изменение машины или судна", response: "Сравниваем ожидание, замену и расходы.", update: "Влияние и варианты" },
      { issue: "Расхождение по грузу", response: "Фиксируем, изолируем и ждём решения.", update: "Разница, статус, итог" },
      { issue: "Изменилась приёмка", response: "Сохраняем груз и подтверждаем новый план.", update: "Согласование и доставка" },
    ],
    boundaryEyebrow: "Границы услуги",
    boundaryTitle: "Чёткие границы усиливают обещание.",
    boundaryLead: "Управляемым отвечаем сами. Совместные решения обозначаем заранее.",
    boundaryDoTitle: "Мы обязуемся",
    boundaryDo: ["До тарифа указать объём и допущения", "Назначить ответственных за этапы", "При изменении дать влияние и варианты", "Сохранить записи передачи и POD"],
    boundaryDontTitle: "Мы не обещаем",
    boundaryDont: ["Гарантированное оформление", "Полное отсутствие задержек", "Непроверенные показатели", "Скрытые неподтверждённые расходы"],
    briefEyebrow: "Начать перевозку",
    briefTitle: "Один груз — один готовый план.",
    briefText: "Передайте известное. Мы отметим, чего не хватает.",
    briefFields: ["Товар, назначение и код ТН ВЭД", "Количество, вес, объём и упаковка", "Отправление, назначение и контакты", "Условия EXW / FOB / DAP", "Дата отправки и окно прибытия", "Температура, опасность, негабарит или высокая стоимость"],
    briefNote: "Сначала подтверждаем исполнимость. Затем даём тариф с ясными условиями.",
    ctaButton: "Получить маршрут",
  },
};
