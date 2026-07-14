export const LANGS = ["en", "zh", "ru"] as const;
export type Lang = (typeof LANGS)[number];
export type CorePage = "home" | "services" | "routes" | "about" | "contact" | "privacy";

export const HTML_LANG: Record<Lang, string> = {
  en: "en",
  zh: "zh-CN",
  ru: "ru",
};

const PAGE_SLUG: Record<CorePage, string> = {
  home: "",
  services: "services",
  routes: "routes",
  about: "about",
  contact: "contact",
  privacy: "privacy",
};

export function pagePath(lang: Lang, page: CorePage): string {
  const prefix = lang === "en" ? "" : `/${lang}`;
  if (page === "contact") return `${prefix}/about/#contact`;
  const slug = PAGE_SLUG[page];
  return slug ? `${prefix}/${slug}/` : `${prefix || ""}/`;
}

export const UI: Record<Lang, {
  nav: Record<CorePage, string>;
  inquiry: string;
  menu: string;
  close: string;
  language: string;
  skip: string;
  pending: string;
  source: string;
  industryImage: string;
  routeDirection: string;
  routeNote: string;
  footerLine: string;
  legalPending: string;
}> = {
  en: {
    nav: { home: "Home", services: "Services", routes: "Routes & network", about: "Company", contact: "Contact", privacy: "Privacy" },
    inquiry: "Request a route plan",
    menu: "Menu",
    close: "Close",
    language: "Language",
    skip: "Skip to content",
    pending: "Pending confirmation",
    source: "Source",
    industryImage: "Industry image; not an HPF.kz-owned asset",
    routeDirection: "Cargo flow: China → Europe, right to left",
    routeNote: "Provisional corridor illustration. Nodes and timing are confirmed for each shipment.",
    footerLine: "Every leg arranged. Every change answered.",
    legalPending: "Some contact and capability facts remain pending confirmation",
  },
  zh: {
    nav: { home: "首页", services: "服务", routes: "路线与网络", about: "公司", contact: "联系", privacy: "隐私政策" },
    inquiry: "获取运输方案",
    menu: "菜单",
    close: "关闭",
    language: "语言",
    skip: "跳到主要内容",
    pending: "待确认",
    source: "来源",
    industryImage: "行业场景图，不代表 HPF.kz 自有资产",
    routeDirection: "货物流向：中国 → 欧洲，由右向左",
    routeNote: "候选走廊示意。具体节点与时效按每票货物确认。",
    footerLine: "每一程有安排，每一处有回音。",
    legalPending: "部分联系方式与能力事实仍待核实",
  },
  ru: {
    nav: { home: "Главная", services: "Услуги", routes: "Маршруты и сеть", about: "Компания", contact: "Контакты", privacy: "Конфиденциальность" },
    inquiry: "Запросить маршрут",
    menu: "Меню",
    close: "Закрыть",
    language: "Язык",
    skip: "Перейти к содержанию",
    pending: "Ожидает подтверждения",
    source: "Источник",
    industryImage: "Отраслевое фото; это не актив HPF.kz",
    routeDirection: "Поток груза: Китай → Европа, справа налево",
    routeNote: "Предварительная схема коридора. Узлы и сроки подтверждаются для каждой перевозки.",
    footerLine: "Каждый этап организован. На каждое изменение есть ответ.",
    legalPending: "Часть контактных данных и сведений о возможностях ожидает подтверждения",
  },
};

type ContentSection = {
  label: string;
  title: string;
  text: string;
  points: string[];
};

type PageCopy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  lead: string;
  primary: string;
  secondary: string;
  sectionTitle: string;
  sectionLead: string;
  sections: ContentSection[];
  processTitle: string;
  process: Array<{ step: string; title: string; text: string }>;
  boundaryTitle: string;
  boundaryDo: string[];
  boundaryDont: string[];
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
};

export const PAGE_COPY: Record<Exclude<CorePage, "home" | "contact" | "privacy">, Record<Lang, PageCopy>> = {
  services: {
    en: {
      metaTitle: "Customs, transport, warehousing and delivery | HPF.kz",
      metaDescription: "HPF.kz coordinates customs preparation, cross-border transport, Almaty warehousing and Kazakhstan delivery as one operating sequence.",
      eyebrow: "Services / operating sequence",
      title: "Customs begins before the border.",
      lead: "A shipment does not need four disconnected suppliers. It needs one sequence in which documents, capacity, warehousing and final delivery hand over cleanly.",
      primary: "Describe your shipment",
      secondary: "View the corridor",
      sectionTitle: "Road, customs, warehouse and delivery—one operating order.",
      sectionLead: "Each service has a clear input, output and handover. The scope is configured around the cargo rather than sold as a fixed package.",
      sections: [
        { label: "Priority 01", title: "Customs and compliance coordination", text: "Review descriptions, HS classification, declaration elements, contracts, invoices, packing documents, certificates and EAEU requirements before departure.", points: ["Pre-shipment file review", "Declaration data check", "Inspection coordination", "Release record"] },
        { label: "Priority 02", title: "Cross-border TIR and linehaul", text: "Plan the road leg around cargo constraints, border conditions and receiving windows, with rail, sea or air alternatives where appropriate.", points: ["Pickup plan", "Border handover", "TIR coordination", "Alternative mode"] },
        { label: "Priority 03", title: "Almaty warehousing and distribution", text: "Connect receiving, inspection, put-away, labelling, picking, dispatch and returns to the same shipment record.", points: ["Receiving", "Storage", "Labelling and picking", "Dispatch and returns"] },
        { label: "Priority 04", title: "Kazakhstan local delivery", text: "Coordinate vehicle dispatch, consignee appointments, unloading and proof of delivery for the final leg.", points: ["Appointment", "Local dispatch", "Unloading", "POD"] },
      ],
      processTitle: "Customs workflow and responsibility",
      process: [
        { step: "01", title: "Document pre-check", text: "Identify missing or inconsistent data before cargo departure." },
        { step: "02", title: "Element verification", text: "Align goods description, tariff information and supporting files." },
        { step: "03", title: "Declaration and inspection", text: "State the current status, required action and next owner." },
        { step: "04", title: "Release or exception", text: "Archive the outcome and keep a record for the next shipment." },
      ],
      boundaryTitle: "A credible customs promise has boundaries.",
      boundaryDo: ["Move foreseeable questions upstream", "Name an owner for each exception", "Record release and supporting files"],
      boundaryDont: ["No ‘guaranteed clearance’ claim", "No certificate treated as route acceptance", "No hidden cost presented as certainty"],
      ctaTitle: "Start with the cargo, then choose the route.",
      ctaText: "Share the commodity, origin, destination, dimensions, Incoterms and required arrival window.",
      ctaButton: "Prepare a route request",
    },
    zh: {
      metaTitle: "清关、运输、仓储与本地交付｜HPF.kz",
      metaDescription: "HPF.kz 将清关预审、跨境运输、阿拉木图仓配与哈萨克斯坦本地交付组织成一条运营次序。",
      eyebrow: "服务 / 运营次序",
      title: "清关，不是到口岸才开始。",
      lead: "一票货不需要客户自己协调四个互不相连的服务商，而需要文件、运力、仓储与末端交付前后衔接的一条责任链。",
      primary: "说明货运需求",
      secondary: "查看路线走廊",
      sectionTitle: "车、关、仓、配，不让客户自己拼起来。",
      sectionLead: "每项服务都有明确输入、输出与交接。能力按货物约束配置，而不是作为固定套餐出售。",
      sections: [
        { label: "优先级 01", title: "清关与合规协同", text: "在发运前核对品名、HS 编码、申报要素、合同、发票、装箱单、证书与 EAEU 要求。", points: ["文件预审", "申报要素核对", "查验协同", "放行记录"] },
        { label: "优先级 02", title: "跨境 TIR 与干线运输", text: "根据货物约束、口岸条件与收货窗口安排公路段，并在适合时组合铁路、海运或空运备选。", points: ["提货计划", "口岸交接", "TIR 协同", "备选运式"] },
        { label: "优先级 03", title: "阿拉木图仓储与分拨", text: "把到货、质检、上架、贴标、拣选、出库与退换处理接入同一票货运记录。", points: ["到货接收", "仓储", "贴标与拣选", "出库与退换"] },
        { label: "优先级 04", title: "哈萨克斯坦本地交付", text: "协调本地派车、收货预约、卸货与签收回单，让最后一程真正落地。", points: ["收货预约", "本地派车", "卸货", "POD 回单"] },
      ],
      processTitle: "清关流程与责任次序",
      process: [
        { step: "01", title: "文件预审", text: "在货物出发前发现缺失或不一致信息。" },
        { step: "02", title: "要素核对", text: "统一品名、税则信息与支撑文件。" },
        { step: "03", title: "申报与查验", text: "说明当前状态、所需动作与下一责任人。" },
        { step: "04", title: "放行或异常", text: "归档结果，让本票经验留给下一票。" },
      ],
      boundaryTitle: "可信的清关承诺，必须有边界。",
      boundaryDo: ["把可预见问题前置", "每个异常指定责任人", "留存放行与支撑文件"],
      boundaryDont: ["不宣传“保证通关”", "不把证书等同于路线接受", "不把隐藏成本包装成确定性"],
      ctaTitle: "先看货，再看路。",
      ctaText: "告诉我们品名、起运地、目的地、尺寸、贸易条款与期望到达窗口。",
      ctaButton: "准备路线需求",
    },
    ru: {
      metaTitle: "Таможня, перевозка, склад и доставка | HPF.kz",
      metaDescription: "HPF.kz объединяет таможенную подготовку, трансграничную перевозку, склад в Алматы и доставку по Казахстану в один порядок работы.",
      eyebrow: "Услуги / порядок работы",
      title: "Таможня начинается до границы.",
      lead: "Клиенту не нужны четыре несвязанных подрядчика. Нужна одна цепочка, где документы, транспорт, склад и последняя миля передают работу без разрывов.",
      primary: "Описать перевозку",
      secondary: "Смотреть коридор",
      sectionTitle: "Транспорт, таможня, склад и доставка — в одном порядке.",
      sectionLead: "У каждой услуги есть входные данные, результат и точка передачи. Состав работ определяется грузом, а не готовым пакетом.",
      sections: [
        { label: "Приоритет 01", title: "Таможня и соответствие требованиям", text: "До отправки проверяем описание, код ТН ВЭД, сведения декларации, контракт, инвойс, упаковочные документы, сертификаты и требования ЕАЭС.", points: ["Проверка документов", "Сверка сведений", "Координация досмотра", "Запись выпуска"] },
        { label: "Приоритет 02", title: "TIR и магистральная перевозка", text: "Планируем автоплечо по ограничениям груза, условиям границы и окну приёмки; при необходимости рассматриваем железную дорогу, море или авиацию.", points: ["Забор груза", "Передача на границе", "Координация TIR", "Запасной вид транспорта"] },
        { label: "Приоритет 03", title: "Склад и распределение в Алматы", text: "Связываем приёмку, проверку, размещение, маркировку, комплектацию, отгрузку и возвраты с одной записью перевозки.", points: ["Приёмка", "Хранение", "Маркировка и сборка", "Отгрузка и возвраты"] },
        { label: "Приоритет 04", title: "Доставка по Казахстану", text: "Координируем машину, время приёмки, разгрузку и подтверждение доставки на последнем этапе.", points: ["Окно приёмки", "Местная машина", "Разгрузка", "POD"] },
      ],
      processTitle: "Таможенный процесс и ответственность",
      process: [
        { step: "01", title: "Проверка документов", text: "Находим пропуски и несоответствия до выхода груза." },
        { step: "02", title: "Сверка сведений", text: "Согласуем описание, тарифные данные и подтверждающие файлы." },
        { step: "03", title: "Декларирование и досмотр", text: "Сообщаем статус, требуемое действие и следующего ответственного." },
        { step: "04", title: "Выпуск или отклонение", text: "Архивируем результат для следующей перевозки." },
      ],
      boundaryTitle: "У надёжного таможенного обещания есть границы.",
      boundaryDo: ["Решаем предсказуемые вопросы заранее", "Назначаем ответственного за отклонение", "Сохраняем выпуск и документы"],
      boundaryDont: ["Не обещаем «гарантированное оформление»", "Не считаем сертификат принятием маршрута", "Не выдаём скрытые расходы за определённость"],
      ctaTitle: "Сначала груз, затем маршрут.",
      ctaText: "Укажите товар, отправление, назначение, размеры, Incoterms и требуемое окно прибытия.",
      ctaButton: "Подготовить запрос",
    },
  },
  routes: {
    en: {
      metaTitle: "China–Kazakhstan–Europe routes and network | HPF.kz",
      metaDescription: "A node-based view of HPF.kz route planning from China through Kazakhstan and the Caspian corridor toward Europe.",
      eyebrow: "Routes / Eurasian corridor",
      title: "Maps draw lines. Delivery runs through nodes.",
      lead: "A useful route answers who takes the next leg, where waiting can occur, which documents move with the cargo and what happens when conditions change.",
      primary: "Configure a route",
      secondary: "View services",
      sectionTitle: "One corridor, several operating decisions.",
      sectionLead: "The diagram is an orientation layer, not a promise of fixed timing or automatic route acceptance.",
      sections: [
        { label: "Origin", title: "China collection and export preparation", text: "Factory pickup, consolidation and export-document review establish the first reliable handover.", points: ["Pickup", "Consolidation", "Export files", "Dispatch window"] },
        { label: "Hub", title: "Kazakhstan entry and Almaty control point", text: "Border, customs, local dispatch and warehousing decisions meet in Kazakhstan.", points: ["Border status", "Customs", "Almaty hub", "Warehouse option"] },
        { label: "Caspian", title: "The trans-Caspian operating segment", text: "The sea segment introduces vessel windows and transloading dependencies that need explicit contingency. Port selection is confirmed per shipment.", points: ["Port window", "Transloading", "Caspian crossing", "Western handover"] },
        { label: "Destination", title: "Caucasus, Türkiye and Europe", text: "Transit formalities, final linehaul and consignee appointments shape the western leg.", points: ["Transit", "Linehaul", "Appointment", "POD"] },
      ],
      processTitle: "How a route becomes executable",
      process: [
        { step: "01", title: "Cargo constraints", text: "Commodity, dimensions, value and handling conditions." },
        { step: "02", title: "Promise boundary", text: "Required arrival window, budget and non-negotiable milestones." },
        { step: "03", title: "Primary and fallback", text: "Main corridor, trigger conditions and alternative route." },
        { step: "04", title: "Node ownership", text: "Responsible party, evidence and communication at each handover." },
      ],
      boundaryTitle: "Route information must stay honest.",
      boundaryDo: ["Show direction and handovers", "Name multimodal dependencies", "Confirm each route against current conditions"],
      boundaryDont: ["No decorative world map", "No unverified transit-time claim", "No route acceptance inferred from a permit or certificate"],
      ctaTitle: "A route plan starts with constraints.",
      ctaText: "Send the cargo profile and delivery requirement. We will map the operating questions before quoting.",
      ctaButton: "Send cargo details",
    },
    zh: {
      metaTitle: "中哈欧路线与网络｜HPF.kz",
      metaDescription: "以节点视角呈现 HPF.kz 从中国经哈萨克斯坦与里海走廊向欧洲延伸的路线规划方法。",
      eyebrow: "路线 / 欧亚走廊",
      title: "地图画的是线，交付走的是节点。",
      lead: "一条有用的路线要回答：下一程谁接、哪里可能等待、哪些文件随货移动，以及条件变化后如何继续。",
      primary: "配置路线",
      secondary: "查看服务",
      sectionTitle: "一条走廊，包含多次运营判断。",
      sectionLead: "路线图用于建立方向感，不代表固定时效，也不代表任何证书自动获得沿线接受。",
      sections: [
        { label: "始发", title: "中国集货与出口准备", text: "工厂提货、集拼与出口文件核验，建立第一处可靠交接。", points: ["工厂提货", "集拼", "出口文件", "发运窗口"] },
        { label: "枢纽", title: "哈萨克斯坦入境与阿拉木图控制点", text: "口岸、清关、本地调度与仓配决策在哈萨克斯坦汇合。", points: ["口岸状态", "清关", "阿拉木图枢纽", "仓储选项"] },
        { label: "里海", title: "跨里海运营段", text: "海运段引入船期与换装依赖，需要明确触发条件与备选安排；具体港口按每票确认。", points: ["港口窗口", "换装", "跨里海", "西岸交接"] },
        { label: "目的地", title: "外高加索、土耳其与欧洲", text: "转关、末段干线与收货预约共同决定西段执行。", points: ["转关", "干线", "收货预约", "POD 回单"] },
      ],
      processTitle: "路线如何变成可执行方案",
      process: [
        { step: "01", title: "货物约束", text: "品名、尺寸、价值与装卸条件。" },
        { step: "02", title: "承诺边界", text: "到达窗口、预算与不可变化的项目节点。" },
        { step: "03", title: "主线与备选", text: "主走廊、触发条件与替代路线。" },
        { step: "04", title: "节点责任", text: "每处交接的责任方、证据与沟通方式。" },
      ],
      boundaryTitle: "路线信息必须保持诚实。",
      boundaryDo: ["说明方向与交接", "标出多式联运依赖", "按当前条件逐票确认"],
      boundaryDont: ["不用装饰性世界地图", "不宣传未经核验的时效", "不由许可或证书推断路线接受"],
      ctaTitle: "路线方案从约束开始。",
      ctaText: "发来货物情况与交付要求，我们先梳理运营问题，再进入报价。",
      ctaButton: "发送货物信息",
    },
    ru: {
      metaTitle: "Маршруты Китай–Казахстан–Европа | HPF.kz",
      metaDescription: "Узловой подход HPF.kz к планированию маршрута из Китая через Казахстан и Каспийский коридор в Европу.",
      eyebrow: "Маршруты / Евразийский коридор",
      title: "Карта рисует линии. Доставка проходит через узлы.",
      lead: "Полезный маршрут отвечает, кто принимает следующий этап, где возможно ожидание, какие документы идут с грузом и что делать при изменении условий.",
      primary: "Настроить маршрут",
      secondary: "Смотреть услуги",
      sectionTitle: "Один коридор — несколько операционных решений.",
      sectionLead: "Схема даёт ориентацию, но не обещает фиксированный срок и не означает автоматическое принятие документов на всём пути.",
      sections: [
        { label: "Отправление", title: "Сбор груза и экспортная подготовка в Китае", text: "Забор с завода, консолидация и проверка экспортных документов формируют первую надёжную передачу.", points: ["Забор", "Консолидация", "Экспортные файлы", "Окно отправки"] },
        { label: "Узел", title: "Въезд в Казахстан и контрольная точка Алматы", text: "Граница, таможня, местная диспетчеризация и складские решения сходятся в Казахстане.", points: ["Статус границы", "Таможня", "Узел Алматы", "Складская опция"] },
        { label: "Каспий", title: "Транскаспийский операционный этап", text: "Морской этап зависит от судовых окон и перегрузки, поэтому требует запасного сценария; порты подтверждаются для каждой перевозки.", points: ["Окно порта", "Перегрузка", "Каспий", "Передача на западном берегу"] },
        { label: "Назначение", title: "Кавказ, Турция и Европа", text: "Транзит, западное автоплечо и время приёмки определяют последний участок.", points: ["Транзит", "Магистраль", "Приёмка", "POD"] },
      ],
      processTitle: "Как маршрут становится исполнимым",
      process: [
        { step: "01", title: "Ограничения груза", text: "Товар, размеры, стоимость и условия обработки." },
        { step: "02", title: "Граница обещания", text: "Окно прибытия, бюджет и неизменяемые этапы." },
        { step: "03", title: "Основной и запасной путь", text: "Главный коридор, условия переключения и альтернатива." },
        { step: "04", title: "Ответственность узлов", text: "Ответственный, подтверждение и связь на каждой передаче." },
      ],
      boundaryTitle: "Информация о маршруте должна быть честной.",
      boundaryDo: ["Показывать направление и передачи", "Отмечать мультимодальные зависимости", "Подтверждать путь по текущим условиям"],
      boundaryDont: ["Без декоративной карты мира", "Без непроверенных сроков", "Без вывода о принятии маршрута только по разрешению или сертификату"],
      ctaTitle: "Маршрут начинается с ограничений.",
      ctaText: "Пришлите профиль груза и требование к доставке. До ставки мы разберём операционные вопросы.",
      ctaButton: "Отправить данные груза",
    },
  },
  about: {
    en: {
      metaTitle: "Company and operating principles | HPF.kz",
      metaDescription: "How HPF.kz approaches cross-border logistics from Kazakhstan: local execution, documented handovers and explicit promise boundaries.",
      eyebrow: "Company / Kazakhstan",
      title: "Carry the cargo. Carry the responsibility.",
      lead: "HPF.kz is a Kazakhstan-based cross-border logistics company connecting Chinese shippers, Central Asian execution and European consignees. We exist to make every handover clear, every change answerable and every promise grounded in evidence.",
      primary: "Discuss a shipment",
      secondary: "See our services",
      sectionTitle: "Our values are operating choices.",
      sectionLead: "They shape how we plan, communicate and take responsibility—not how we decorate a presentation.",
      sections: [
        { label: "Customer outcome", title: "Let the result belong to the customer", text: "We measure our work by whether the customer can promise, receive and grow with greater confidence—not by how visible HPF.kz becomes.", points: ["Business outcome", "Stable delivery", "Reusable capability", "Long-term value"] },
        { label: "Responsibility", title: "Own the next answer", text: "A handover is not complete until the next owner, required action and confirmation method are explicit.", points: ["Named owner", "Clear next step", "Visible exception", "Closed loop"] },
        { label: "Truth", title: "Facts before adjectives", text: "We distinguish verified facts, current conditions and assumptions, so confidence never depends on a vague claim.", points: ["Evidence first", "Promise boundary", "Source record", "Honest status"] },
        { label: "Learning", title: "Make each shipment improve the next", text: "Time, cost, documents and exceptions become operating knowledge instead of disappearing in chats.", points: ["Milestones", "Files", "Exceptions", "Review"] },
      ],
      processTitle: "What we mean by a responsibility chain",
      process: [
        { step: "01", title: "Define", text: "State cargo, route, documents and non-negotiable conditions." },
        { step: "02", title: "Assign", text: "Name the owner at each operational handover." },
        { step: "03", title: "Record", text: "Keep status, evidence and changes in one shipment record." },
        { step: "04", title: "Review", text: "Turn the outcome into a better next plan." },
      ],
      boundaryTitle: "What company trust should—and should not—mean.",
      boundaryDo: ["Disclose verified legal information", "Separate resources from results", "Keep an auditable operating record"],
      boundaryDont: ["No ‘market leader’ claim", "No borrowed asset presented as owned", "No relationship wording before legal confirmation"],
      ctaTitle: "Judge us by the operating questions we ask.",
      ctaText: "Bring us a real shipment. We will start with the constraints, responsibilities and evidence required.",
      ctaButton: "Contact the team",
    },
    zh: {
      metaTitle: "公司与运营原则｜HPF.kz",
      metaDescription: "了解 HPF.kz 如何从哈萨克斯坦组织跨境物流：本地执行、节点留痕与清晰的承诺边界。",
      eyebrow: "公司 / 哈萨克斯坦",
      title: "承运货物，也承接责任。",
      lead: "HPF.kz 是一家立足哈萨克斯坦的跨境物流公司，连接中国发货方、中亚现场执行与欧洲收货方。我们存在的意义，是让每一次交接都清楚、每一次变化都有回答、每一个承诺都有证据。",
      primary: "讨论一票货",
      secondary: "查看服务",
      sectionTitle: "我们的价值观，是每天都要做出的运营选择。",
      sectionLead: "它决定我们如何计划、沟通和承担责任，而不是如何装饰一份介绍。",
      sections: [
        { label: "成果归客户", title: "让结果留在客户的生意里", text: "我们不以 HPF.kz 被看见多少衡量工作，而以客户能否更安心地承诺、收货和增长来衡量。", points: ["商业结果", "稳定交付", "可复用能力", "长期价值"] },
        { label: "责任到人", title: "主动认领下一个答案", text: "只有下一责任人、所需动作与确认方式都清楚，一次交接才算真正完成。", points: ["责任人", "下一步", "异常可见", "闭环"] },
        { label: "事实为先", title: "事实先于形容词", text: "我们区分已核验事实、当前条件与待确认判断，不让客户的信心建立在模糊表述上。", points: ["证据优先", "承诺边界", "来源记录", "诚实状态"] },
        { label: "持续复盘", title: "让每一票，都改善下一票", text: "时效、费用、文件与异常要沉淀为运营知识，而不是消失在聊天记录里。", points: ["节点", "文件", "异常", "复盘"] },
      ],
      processTitle: "我们所说的责任链是什么",
      process: [
        { step: "01", title: "定义", text: "说清货物、路线、文件与不可变化的条件。" },
        { step: "02", title: "分配", text: "为每处运营交接指定责任人。" },
        { step: "03", title: "记录", text: "把状态、证据与变化放进同一票记录。" },
        { step: "04", title: "复盘", text: "让本票结果成为下一票更好的方案。" },
      ],
      boundaryTitle: "公司信任应该意味着什么，也不该意味着什么。",
      boundaryDo: ["披露已核验法人信息", "区分资源与结果", "保留可审计运营记录"],
      boundaryDont: ["不宣传“行业领先”", "不把借用资源说成自有资产", "法务确认前不写集团关系口径"],
      ctaTitle: "请用我们提出的运营问题判断我们。",
      ctaText: "给我们一票真实货物，我们从约束、责任与所需证据开始。",
      ctaButton: "联系团队",
    },
    ru: {
      metaTitle: "Компания и принципы работы | HPF.kz",
      metaDescription: "Как HPF.kz организует трансграничную логистику из Казахстана: локальное исполнение, фиксированные передачи и ясные границы обещаний.",
      eyebrow: "Компания / Казахстан",
      title: "Везём груз. Принимаем ответственность.",
      lead: "HPF.kz — трансграничная логистическая компания из Казахстана, соединяющая китайских отправителей, исполнение в Центральной Азии и европейских получателей. Мы делаем каждую передачу понятной, каждое изменение — объяснимым, а каждое обещание — подтверждённым.",
      primary: "Обсудить перевозку",
      secondary: "Смотреть услуги",
      sectionTitle: "Наши ценности — это ежедневные операционные решения.",
      sectionLead: "Они определяют, как мы планируем, общаемся и принимаем ответственность, а не как оформляем презентацию.",
      sections: [
        { label: "Результат клиента", title: "Результат должен работать на клиента", text: "Мы оцениваем работу по тому, насколько увереннее клиент может обещать, получать и развивать бизнес, а не по заметности HPF.kz.", points: ["Бизнес-результат", "Стабильная доставка", "Повторяемая способность", "Долгосрочная ценность"] },
        { label: "Ответственность", title: "Взять на себя следующий ответ", text: "Передача завершена, только когда понятны следующий ответственный, действие и способ подтверждения.", points: ["Ответственный", "Следующий шаг", "Видимое отклонение", "Замкнутый цикл"] },
        { label: "Правда", title: "Факты раньше прилагательных", text: "Мы разделяем проверенные факты, текущие условия и предположения, чтобы доверие не зависело от расплывчатых заявлений.", points: ["Сначала доказательство", "Граница обещания", "Источник", "Честный статус"] },
        { label: "Обучение", title: "Каждая перевозка улучшает следующую", text: "Сроки, расходы, документы и отклонения становятся операционным знанием, а не теряются в чатах.", points: ["Этапы", "Файлы", "Отклонения", "Разбор"] },
      ],
      processTitle: "Что мы называем цепочкой ответственности",
      process: [
        { step: "01", title: "Определить", text: "Зафиксировать груз, маршрут, документы и неизменяемые условия." },
        { step: "02", title: "Назначить", text: "Указать ответственного на каждой операционной передаче." },
        { step: "03", title: "Записать", text: "Хранить статус, подтверждения и изменения в одной записи." },
        { step: "04", title: "Разобрать", text: "Превратить результат в лучший следующий план." },
      ],
      boundaryTitle: "Что должно и не должно означать доверие к компании.",
      boundaryDo: ["Публиковать проверенные юридические данные", "Разделять ресурсы и результат", "Вести проверяемую операционную запись"],
      boundaryDont: ["Без заявления «лидер рынка»", "Без выдачи привлечённого актива за собственный", "Без формулировки связи с группой до юридического согласования"],
      ctaTitle: "Оценивайте нас по операционным вопросам.",
      ctaText: "Покажите реальную перевозку. Мы начнём с ограничений, ответственности и нужных подтверждений.",
      ctaButton: "Связаться с командой",
    },
  },
};

export const CONTACT_COPY: Record<Lang, {
  metaTitle: string; metaDescription: string; eyebrow: string; title: string; lead: string;
  fields: { name: string; company: string; email: string; phone: string; cargo: string; origin: string; destination: string; window: string; message: string; consent: string; submit: string; required: string; };
  asideTitle: string; asideText: string; emailLabel: string; responseNote: string;
}> = {
  en: {
    metaTitle: "Contact the HPF.kz logistics team", metaDescription: "Share cargo, route and delivery requirements with the HPF.kz team in Almaty.",
    eyebrow: "Freight enquiry / Almaty", title: "Put the next shipment on the table.", lead: "Tell us where it starts, where it needs to arrive, what the cargo is and which conditions cannot change. We will begin with the route, files and risk questions.",
    fields: { name: "Your name", company: "Company", email: "Email", phone: "Phone or messenger", cargo: "Cargo description", origin: "Origin", destination: "Destination", window: "Required arrival window", message: "Constraints or notes", consent: "I agree to send these details by email and have read the privacy notice.", submit: "Open email request", required: "Complete the required fields before continuing." },
    asideTitle: "This form does not send data to a website backend.", asideText: "Until the data-storage and form-processing arrangement is legally confirmed, the form prepares an email in your own mail application.", emailLabel: "Business email", responseNote: "Please do not include passport, payment-card or other sensitive personal data.",
  },
  zh: {
    metaTitle: "联系 HPF.kz 物流团队", metaDescription: "向 HPF.kz 阿拉木图团队提交货物、路线与交付要求。",
    eyebrow: "货运需求 / 阿拉木图", title: "把下一票货，先放到桌面上。", lead: "告诉我们从哪里出发、送到哪里、是什么货，以及哪些条件不能变。我们先从路线、文件与风险问题开始。",
    fields: { name: "姓名", company: "公司", email: "邮箱", phone: "电话或即时通讯", cargo: "货物说明", origin: "起运地", destination: "目的地", window: "期望到达窗口", message: "约束或补充说明", consent: "我同意通过电子邮件发送以上信息，并已阅读隐私政策。", submit: "打开邮件需求", required: "请先填写必填项。" },
    asideTitle: "此表单不会把数据提交到网站后端。", asideText: "在数据存储地和表单处理方案完成法务确认前，表单只在你的邮件客户端中生成一封业务邮件。", emailLabel: "业务邮箱", responseNote: "请勿提交护照、银行卡等敏感个人信息。",
  },
  ru: {
    metaTitle: "Связаться с логистической командой HPF.kz", metaDescription: "Передайте команде HPF.kz в Алматы данные груза, маршрута и доставки.",
    eyebrow: "Запрос перевозки / Алматы", title: "Положим следующую перевозку на стол.", lead: "Укажите отправление, назначение, груз и условия, которые нельзя менять. Мы начнём с вопросов о маршруте, документах и рисках.",
    fields: { name: "Имя", company: "Компания", email: "Электронная почта", phone: "Телефон или мессенджер", cargo: "Описание груза", origin: "Отправление", destination: "Назначение", window: "Требуемое окно прибытия", message: "Ограничения или примечания", consent: "Я согласен отправить эти данные по электронной почте и прочитал уведомление о конфиденциальности.", submit: "Открыть письмо", required: "Заполните обязательные поля." },
    asideTitle: "Форма не отправляет данные на сервер сайта.", asideText: "До юридического подтверждения места хранения и обработки форма создаёт письмо в вашей почтовой программе.", emailLabel: "Деловая почта", responseNote: "Не указывайте паспортные, банковские и другие чувствительные персональные данные.",
  },
};

export type CompanyStory = {
  compassEyebrow: string;
  compassTitle: string;
  compassLead: string;
  pillars: Array<{ number: string; label: string; title: string; text: string }>;
  valuesEyebrow: string;
  valuesTitle: string;
};

export const COMPANY_STORY: Record<Lang, CompanyStory> = {
  en: {
    compassEyebrow: "Purpose / direction / character",
    compassTitle: "A company needs a compass before it needs scale.",
    compassLead: "Our culture is not a slogan for the wall. It is the shared decision system we use when routes change, documents disagree and a customer needs a clear answer.",
    pillars: [
      { number: "01", label: "Mission", title: "Turn cross-border uncertainty into an answerable operating sequence.", text: "Connect customs, transport, warehousing and delivery so customers know what happens next, who owns it and what evidence confirms it." },
      { number: "02", label: "Vision", title: "Make certainty the default standard for the Middle Corridor.", text: "Build the most trusted end-to-end operating network between China, Kazakhstan and Europe—shipment by shipment, node by node." },
      { number: "03", label: "Culture", title: "Clear facts. Named owners. Quiet follow-through.", text: "We speak directly, expose boundaries early, solve at the scene and leave every shipment with a record that improves the next one." },
    ],
    valuesEyebrow: "Values / visible in the work",
    valuesTitle: "Values only count when customers can see them in the handover.",
  },
  zh: {
    compassEyebrow: "使命 / 愿景 / 文化",
    compassTitle: "一家公司，先要有方向，再谈规模。",
    compassLead: "企业文化不是挂在墙上的口号，而是当路线变化、文件不一致、客户需要答案时，所有人共同使用的一套判断方式。",
    pillars: [
      { number: "01", label: "使命", title: "把跨境物流的不确定，变成可回答的运营次序。", text: "连接清关、运输、仓储与交付，让客户知道下一步发生什么、由谁负责、用什么证据确认。" },
      { number: "02", label: "愿景", title: "让确定性，成为中间走廊的默认标准。", text: "在中国、哈萨克斯坦与欧洲之间，逐票、逐节点构建最值得信赖的端到端运营网络。" },
      { number: "03", label: "文化", title: "讲清事实，认领责任，安静地把事做完。", text: "我们直接沟通，提前说明边界，在现场解决问题，并让每一票货都留下可供下一票复用的记录。" },
    ],
    valuesEyebrow: "价值观 / 落在交接里",
    valuesTitle: "价值观，只有被客户在每一次交接中看见，才算数。",
  },
  ru: {
    compassEyebrow: "Миссия / видение / культура",
    compassTitle: "Сначала компании нужен компас, затем масштаб.",
    compassLead: "Культура — не лозунг на стене. Это общий способ принимать решения, когда маршрут меняется, документы расходятся, а клиенту нужен ясный ответ.",
    pillars: [
      { number: "01", label: "Миссия", title: "Превращать неопределённость трансграничной логистики в понятный порядок действий.", text: "Связывать таможню, перевозку, склад и доставку так, чтобы клиент знал следующий шаг, ответственного и подтверждение результата." },
      { number: "02", label: "Видение", title: "Сделать определённость стандартом Среднего коридора.", text: "Создавать самую надёжную сквозную операционную сеть между Китаем, Казахстаном и Европой — перевозка за перевозкой, узел за узлом." },
      { number: "03", label: "Культура", title: "Точные факты. Личная ответственность. Спокойное исполнение.", text: "Мы говорим прямо, заранее обозначаем границы, решаем вопросы на месте и сохраняем опыт каждой перевозки для следующей." },
    ],
    valuesEyebrow: "Ценности / видимые в работе",
    valuesTitle: "Ценности имеют смысл, только когда клиент видит их в каждой передаче.",
  },
};

export const PRIVACY_COPY: Record<Lang, {
  metaTitle: string; metaDescription: string; eyebrow: string; title: string; lead: string;
  sections: Array<{ title: string; text: string }>;
}> = {
  en: {
    metaTitle: "Privacy notice | HPF.kz", metaDescription: "How HPF.kz handles information submitted through this website.",
    eyebrow: "Legal / privacy", title: "Privacy notice", lead: "This launch version avoids website-side collection until the processing route, storage location and legal wording are confirmed.",
    sections: [
      { title: "Information you choose to send", text: "The enquiry worksheet prepares an email in your own mail application. HPF.kz may receive the contact and shipment details included in that email." },
      { title: "Purpose", text: "The information is used to review a freight request, clarify route and compliance requirements and respond to the sender." },
      { title: "Legal basis and location", text: "The final consent wording, retention period, data controller identity and storage location remain pending legal confirmation under Kazakhstan Law No. 94-V on Personal Data and Their Protection." },
      { title: "Your choices", text: "Do not send sensitive personal data through a freight enquiry. You may contact bd@hpf.kz to request correction or deletion, subject to legal retention duties." },
    ],
  },
  zh: {
    metaTitle: "隐私政策｜HPF.kz", metaDescription: "HPF.kz 如何处理通过本网站提交的信息。",
    eyebrow: "法律 / 隐私", title: "隐私政策", lead: "在处理路径、存储地点与法务口径确认前，本上线版本不在网站端收集表单数据。",
    sections: [
      { title: "你主动发送的信息", text: "货运需求表只在你的邮件客户端中生成邮件。HPF.kz 可能接收邮件中填写的联系方式与货物信息。" },
      { title: "使用目的", text: "这些信息用于评估货运需求、澄清路线与合规条件，并回复发件人。" },
      { title: "法律依据与存储地点", text: "最终同意条款、保存期限、数据控制者身份与存储地点，仍需根据哈萨克斯坦《个人数据及其保护法》（№94-V）完成法务确认。" },
      { title: "你的选择", text: "请勿通过货运询价发送敏感个人信息。你可以联系 bd@hpf.kz 请求更正或删除，但依法需要保留的记录除外。" },
    ],
  },
  ru: {
    metaTitle: "Уведомление о конфиденциальности | HPF.kz", metaDescription: "Как HPF.kz обрабатывает информацию, переданную через сайт.",
    eyebrow: "Правовая информация / данные", title: "Уведомление о конфиденциальности", lead: "До подтверждения способа обработки, места хранения и юридических формулировок сайт не собирает данные формы на сервере.",
    sections: [
      { title: "Информация, которую вы отправляете", text: "Форма запроса создаёт письмо в вашей почтовой программе. HPF.kz может получить указанные в письме контакты и данные груза." },
      { title: "Цель", text: "Информация используется для рассмотрения запроса, уточнения маршрута и требований соответствия, а также ответа отправителю." },
      { title: "Правовое основание и место хранения", text: "Окончательный текст согласия, срок хранения, личность оператора и место хранения требуют юридического подтверждения по Закону Республики Казахстан №94-V «О персональных данных и их защите»." },
      { title: "Ваш выбор", text: "Не отправляйте в запросе чувствительные персональные данные. Для исправления или удаления напишите на bd@hpf.kz с учётом обязательных сроков хранения." },
    ],
  },
};
