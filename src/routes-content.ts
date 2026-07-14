import type { Lang } from "./site-v2";

export type CorridorId = "north" | "middle" | "south";

type Corridor = {
  id: CorridorId;
  index: string;
  label: string;
  name: string;
  strap: string;
  summary: string;
  route: string[];
  bestForLabel: string;
  bestFor: string;
  modeLabel: string;
  mode: string;
  watchLabel: string;
  watch: string[];
  switchLabel: string;
  switchWhen: string;
};

type RouteNetworkContent = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  lead: string;
  primary: string;
  secondary: string;
  heroNotes: Array<{ value: string; label: string }>;
  atlasEyebrow: string;
  atlasTitle: string;
  atlasLead: string;
  atlasNote: string;
  corridors: Corridor[];
  detailEyebrow: string;
  detailTitle: string;
  detailLead: string;
  serviceEyebrow: string;
  serviceTitle: string;
  serviceLead: string;
  serviceSteps: Array<{ step: string; phase: string; title: string; text: string; outputs: string[] }>;
  updateTitle: string;
  updateText: string;
  updateItems: string[];
  switchEyebrow: string;
  switchTitle: string;
  switchText: string;
  switchTriggers: Array<{ title: string; text: string }>;
  requestEyebrow: string;
  requestTitle: string;
  requestText: string;
  requestItems: string[];
  promiseTitle: string;
  promiseText: string;
  ctaButton: string;
};

export const ROUTE_NETWORK_COPY: Record<Lang, RouteNetworkContent> = {
  zh: {
    metaTitle: "中亚欧北线、中线与南线路线网络｜HPF.kz",
    metaDescription: "HPF.kz 以北线、中线与南线构建中亚欧路线组合，按货物、合规、交期、预算与收货条件配置主线、备选线和节点责任。",
    eyebrow: "路线与网络 / 欧亚三走廊",
    title: "路越远，越不能只准备一条路。",
    lead: "北线看重连续干线，中线重在跨里海节点协同，南线提供另一组中亚陆路连接。HPF.kz 不替客户押注某一条线；我们把货物、合规、交期、预算与收货条件放在一起，配置主线、备选线和切换条件。",
    primary: "配置我的路线",
    secondary: "先看三条走廊",
    heroNotes: [
      { value: "3 条", label: "候选欧亚走廊" },
      { value: "1 套", label: "统一节点责任" },
      { value: "逐票", label: "核验路线与条件" },
    ],
    atlasEyebrow: "网络总览 / 由东向西",
    atlasTitle: "同一票货，可以有不同的西行答案。",
    atlasLead: "地图负责说明方向，操作方案负责说明代价。每条路线均为候选走廊，实际口岸、港口、班列、承运主体、过境条件与时效，在接单前按当期条件确认。",
    atlasNote: "货物流向：中国在右，欧洲在左。点击路线查看关键取舍。",
    detailEyebrow: "走廊判断 / 不是路线罗列",
    detailTitle: "选哪条线，取决于哪种不确定性更能被管理。",
    detailLead: "我们比较的不只是运价，还包括换装次数、班期依赖、国别合规、边境拥堵、保险与结算条件，以及异常发生后是否有可执行的下一步。",
    corridors: [
      {
        id: "north", index: "01", label: "北线", name: "欧亚北部陆桥", strap: "少海运换装，重国别与贸易合规审查。",
        summary: "由中国经哈萨克斯坦向北接入俄罗斯、白俄罗斯与欧盟铁路网络。它的价值在于较连续的陆路干线；它的前提，是货物、交易方、承运与保险安排都通过当期合规核验。",
        route: ["中国集货地", "霍尔果斯 / 阿拉山口候选口岸", "哈萨克斯坦铁路节点", "俄罗斯", "白俄罗斯", "波兰 / 欧洲"],
        bestForLabel: "更值得评估", bestFor: "标准化集装箱、稳定批量、希望减少海运换装，且国别与商品合规边界清晰的货物。",
        modeLabel: "主要组织方式", mode: "铁路为主，可衔接公路提送与欧洲末段配送。",
        watchLabel: "接单前重点核验", watch: ["制裁、出口管制与交易方筛查", "班列与换轨节点安排", "保险、结算与欧盟入境条件"],
        switchLabel: "切换判断", switchWhen: "合规边界、承运接受、班期或目的国入境条件变化时，不等待货物进入不可逆节点再讨论备选。",
      },
      {
        id: "middle", index: "02", label: "中线", name: "跨里海中间走廊", strap: "多式联运，重港口、船期与每次交接。",
        summary: "由中国进入哈萨克斯坦，经阿克套或库雷克候选港口跨越里海，在巴库衔接外高加索，再经土耳其或黑海方向进入欧洲。它提供地缘分散，也增加港口与换装依赖。",
        route: ["中国集货地", "哈萨克斯坦口岸 / 阿拉木图", "阿克套 / 库雷克候选港", "里海 / 巴库", "格鲁吉亚", "土耳其 / 黑海 / 欧洲"],
        bestForLabel: "更值得评估", bestFor: "希望分散北部通道风险、可接受多式联运，并需要连接高加索、土耳其或欧洲市场的货物。",
        modeLabel: "主要组织方式", mode: "铁路、公路、里海船舶与西段铁路或公路组合。",
        watchLabel: "接单前重点核验", watch: ["港口受理、堆场与船期窗口", "换装、箱体与单证衔接", "西岸接续运力和收货预约"],
        switchLabel: "切换判断", switchWhen: "港口等待、船期变化或西岸接续失配时，以已约定阈值判断等待、改港或改走其他走廊。",
      },
      {
        id: "south", index: "03", label: "南线", name: "中亚—伊朗—土耳其走廊", strap: "另一组陆路连接，重逐国过境与金融合规。",
        summary: "由中国经哈萨克斯坦向乌兹别克斯坦、土库曼斯坦与伊朗延伸，再由土耳其接入欧洲。它为土耳其、南欧方向或其他走廊受限时提供评估空间，但必须逐国核验过境、承运、保险与结算可行性。",
        route: ["中国集货地", "哈萨克斯坦 / 阿拉木图", "乌兹别克斯坦", "土库曼斯坦", "伊朗", "土耳其 / 欧洲"],
        bestForLabel: "更值得评估", bestFor: "目的地偏土耳其或南欧、需要补充陆路备选，且货物与交易结构能够通过沿线国别审查的项目。",
        modeLabel: "主要组织方式", mode: "公路与铁路组合，按边境、轨距和目的地条件配置。",
        watchLabel: "接单前重点核验", watch: ["各国过境许可与口岸受理", "制裁、银行、保险与承运限制", "多次边境交接和文件一致性"],
        switchLabel: "切换判断", switchWhen: "任一国别的过境、保险、结算或承运条件未获确认时，该线不进入正式承诺。",
      },
    ],
    serviceEyebrow: "服务颗粒度 / 一票货的完整照看",
    serviceTitle: "地图之外，我们把每次交接照看清楚。",
    serviceLead: "客户不应在货物出发后才发现还缺一个文件、一个车位或一个决定。我们把路线拆成可确认、可汇报、可追溯的操作次序。",
    serviceSteps: [
      { step: "01", phase: "发运前", title: "先把不能出错的事说清楚", text: "核对货物、贸易条款、文件、装卸条件与目的地要求；比较候选走廊，写明报价包含项、依赖项与不包含项。", outputs: ["货物与文件缺口清单", "主线 / 备选线", "节点责任与报价边界"] },
      { step: "02", phase: "在途中", title: "每到一处，都知道谁在接", text: "跟进入境、清关、换装、港口、接续运力与收货预约。状态不只写“运输中”，而要说明当前节点、下一动作和责任人。", outputs: ["里程碑状态", "异常选项与影响", "下一次更新时间"] },
      { step: "03", phase: "到达后", title: "交付不是卸完货就结束", text: "衔接预约、卸货、签收、POD、短期仓储或再次分拨；把本票发生的偏差和处理结果留给下一票。", outputs: ["签收与回单", "异常关闭记录", "下一票优化建议"] },
    ],
    updateTitle: "遇到变化，先给答案，再给安慰。",
    updateText: "一个有温度的服务，不是反复说“请耐心等待”，而是在客户需要决定时，把事实和选择摆在桌面上。每次异常更新至少包含：",
    updateItems: ["发生了什么，影响哪个节点", "我们正在做什么，有哪些可选方案", "成本或时间可能如何变化", "客户最晚何时需要决定", "下一次明确更新时间"],
    switchEyebrow: "主备切换 / 把退路写进方案",
    switchTitle: "备选线不是出事后临时找的另一家供应商。",
    switchText: "在发运前，我们与客户确认可接受的切换范围。条件触发时，先报告事实、影响和选择，再根据授权推进；不擅自改线，也不让货物停在信息真空里。",
    switchTriggers: [
      { title: "合规变化", text: "货物、交易方、承运或过境条件出现新的限制。" },
      { title: "节点失配", text: "班列、船期、港口或末段预约无法按原计划衔接。" },
      { title: "等待超阈值", text: "实际等待触及双方预先约定的复核点。" },
      { title: "商业边界变化", text: "新增成本或交期影响超过客户授权范围。" },
    ],
    requestEyebrow: "询价准备 / 信息不必完美",
    requestTitle: "给我们一票货的轮廓，我们先把路问清楚。",
    requestText: "已有信息先发来，缺失项由我们标出。以下内容越完整，路线比较与报价边界越可靠。",
    requestItems: ["起运地与最终目的地", "品名、HS 编码（如有）与用途", "件数、重量、体积和单件尺寸", "包装、温控、危险品或装卸要求", "贸易条款与货值区间", "期望到达窗口与不可变节点", "收发货主体及必要的合规信息", "可接受的走廊、换装与备选范围"],
    promiseTitle: "路会变化，责任不能失联。",
    promiseText: "我们不承诺不存在延误；我们承诺让每一处变化有人看见、有人解释、有人继续往下做。",
    ctaButton: "发送货物信息",
  },
  en: {
    metaTitle: "Northern, Middle and Southern Eurasian corridors | HPF.kz",
    metaDescription: "HPF.kz compares Northern, Middle and Southern Eurasian corridors and configures a primary route, fallback and node ownership around each shipment.",
    eyebrow: "Routes & network / three Eurasian corridors",
    title: "The longer the journey, the less it should depend on one route.",
    lead: "The Northern Corridor favours continuous inland linehaul. The Middle Corridor depends on disciplined Trans-Caspian handovers. The Southern Corridor adds another Central Asian land option. HPF.kz does not ask customers to bet on a line; we compare cargo, compliance, arrival window, budget and receiving conditions before defining the primary route, fallback and switch rules.",
    primary: "Configure my route", secondary: "See the three corridors",
    heroNotes: [{ value: "3", label: "candidate corridors" }, { value: "1", label: "node-ownership method" }, { value: "Per load", label: "conditions confirmed" }],
    atlasEyebrow: "Network overview / east to west", atlasTitle: "One shipment can have more than one westbound answer.",
    atlasLead: "The map shows direction; the operating plan explains the trade-offs. Border points, ports, services, carriers, transit acceptance and timing are confirmed against current conditions before booking.",
    atlasNote: "Cargo moves from China on the right to Europe on the left. Select a corridor to read its operating logic.",
    detailEyebrow: "Corridor judgement / not a list of places", detailTitle: "The route choice depends on which uncertainty can be managed best.",
    detailLead: "We compare more than freight cost: transloading, schedule dependency, country compliance, border congestion, insurance and payment conditions, and whether an exception still leaves an executable next move.",
    corridors: [
      { id: "north", index: "01", label: "Northern", name: "Northern Eurasian land bridge", strap: "Fewer sea transfers; heavier country and trade-compliance review.", summary: "The corridor runs from China through Kazakhstan into the Russian, Belarusian and EU rail networks. Its value is a relatively continuous inland trunk; its prerequisite is current acceptance of the cargo, counterparties, carrier, insurance and payment structure.", route: ["China origin", "Horgos / Alashankou candidate gateway", "Kazakhstan rail nodes", "Russia", "Belarus", "Poland / Europe"], bestForLabel: "Worth assessing for", bestFor: "Standard containers, repeat volumes and cargo that benefits from fewer sea transfers and has a clear compliance profile.", modeLabel: "Typical configuration", mode: "Rail-led, with road pickup, delivery and European onward distribution.", watchLabel: "Confirm before booking", watch: ["Sanctions, export controls and counterparty screening", "Train schedule and gauge-change arrangements", "Insurance, payment and EU entry conditions"], switchLabel: "Switch logic", switchWhen: "If compliance, carrier acceptance, schedule or destination-entry conditions change, the fallback is reviewed before the shipment reaches an irreversible node." },
      { id: "middle", index: "02", label: "Middle", name: "Trans-Caspian Middle Corridor", strap: "Multimodal by design; dependent on ports, vessels and clean handovers.", summary: "The corridor crosses Kazakhstan to the candidate ports of Aktau or Kuryk, continues over the Caspian to Baku and the South Caucasus, then reaches Europe through Türkiye or the Black Sea. It diversifies geography while adding port and transloading dependencies.", route: ["China origin", "Kazakhstan gateway / Almaty", "Aktau / Kuryk candidate port", "Caspian / Baku", "Georgia", "Türkiye / Black Sea / Europe"], bestForLabel: "Worth assessing for", bestFor: "Cargo seeking geographic diversification and able to accommodate multimodal handling, especially for the Caucasus, Türkiye and Europe.", modeLabel: "Typical configuration", mode: "Rail, road, Caspian vessel and western rail or road in one operating sequence.", watchLabel: "Confirm before booking", watch: ["Port acceptance, yard status and vessel window", "Transloading, equipment and document continuity", "Western onward capacity and consignee appointment"], switchLabel: "Switch logic", switchWhen: "Port waiting, vessel changes or a missed western connection are assessed against agreed thresholds: wait, change port or move to another corridor." },
      { id: "south", index: "03", label: "Southern", name: "Central Asia–Iran–Türkiye corridor", strap: "Another inland option; country-by-country transit and financial checks are decisive.", summary: "The route extends from China through Kazakhstan toward Uzbekistan, Turkmenistan and Iran, then through Türkiye into Europe. It creates an option for Türkiye and Southern Europe or when other corridors are constrained, subject to country, carrier, insurance and payment feasibility.", route: ["China origin", "Kazakhstan / Almaty", "Uzbekistan", "Turkmenistan", "Iran", "Türkiye / Europe"], bestForLabel: "Worth assessing for", bestFor: "Türkiye or Southern Europe destinations and projects needing another inland fallback with a cargo and trade structure acceptable along the route.", modeLabel: "Typical configuration", mode: "Road and rail combined around border, gauge and destination conditions.", watchLabel: "Confirm before booking", watch: ["Transit permits and border acceptance in each country", "Sanctions, banking, insurance and carrier restrictions", "Document consistency across multiple border handovers"], switchLabel: "Switch logic", switchWhen: "If transit, insurance, payment or carrier acceptance is not confirmed in any country, this corridor does not enter the formal commitment." },
    ],
    serviceEyebrow: "Operating detail / care for one shipment", serviceTitle: "Beyond the map, we look after every handover.",
    serviceLead: "Customers should not discover a missing file, vehicle or decision after departure. We turn the route into a sequence that can be confirmed, reported and reviewed.",
    serviceSteps: [
      { step: "01", phase: "Before departure", title: "Make the non-negotiables explicit", text: "Review cargo, Incoterms, files, handling and destination requirements; compare corridors and state inclusions, dependencies and exclusions.", outputs: ["Cargo and file gap list", "Primary and fallback route", "Node owners and rate boundary"] },
      { step: "02", phase: "In transit", title: "Know who owns the next handover", text: "Follow entry, customs, transloading, port, onward capacity and appointment. Status names the node, next action and owner—not simply ‘in transit’. ", outputs: ["Milestone status", "Exception options and impact", "Next update time"] },
      { step: "03", phase: "After arrival", title: "Delivery continues through evidence", text: "Connect appointment, unloading, POD, temporary storage or redistribution, then carry the lessons into the next shipment.", outputs: ["POD and receipt", "Closed exception record", "Next-shipment improvement"] },
    ],
    updateTitle: "When conditions change, give an answer before reassurance.", updateText: "Care is not repeating ‘please wait’. It is putting facts and choices on the table when the customer needs to decide. Every exception update should include:", updateItems: ["What happened and which node is affected", "What we are doing and the available options", "Possible time or cost impact", "The latest time for a customer decision", "The next definite update time"],
    switchEyebrow: "Primary and fallback / design the way out", switchTitle: "A fallback is not another supplier found after the problem starts.", switchText: "Before departure, we agree the acceptable switch range. When a trigger is reached, we report facts, impact and options before acting under the agreed authority—no silent rerouting and no information vacuum.",
    switchTriggers: [{ title: "Compliance change", text: "A new restriction affects cargo, counterparties, carrier or transit." }, { title: "Node mismatch", text: "Train, vessel, port or final appointment no longer connects as planned." }, { title: "Waiting threshold", text: "Actual waiting reaches the review point agreed with the customer." }, { title: "Commercial boundary", text: "Added cost or timing impact exceeds the authorised range." }],
    requestEyebrow: "Route request / information can start incomplete", requestTitle: "Give us the outline of one shipment. We will start by asking the route questions.", requestText: "Send what is known; we will identify the gaps. The more complete these inputs are, the more reliable the comparison and rate boundary become.", requestItems: ["Origin and final destination", "Commodity, HS code if known, and use", "Packages, weight, volume and piece dimensions", "Packaging, temperature, dangerous-goods or handling needs", "Incoterms and cargo-value range", "Target arrival window and fixed milestones", "Shipper, consignee and required compliance information", "Acceptable corridors, transfers and fallback range"],
    promiseTitle: "Routes change. Responsibility should not disappear.", promiseText: "We do not promise that delays cannot happen. We promise that each change is seen, explained and carried forward by an owner.", ctaButton: "Send cargo details",
  },
  ru: {
    metaTitle: "Северный, Средний и Южный коридоры Китай–Европа | HPF.kz",
    metaDescription: "HPF.kz сравнивает северный, средний и южный евразийские коридоры и определяет основной маршрут, резервный сценарий и ответственность по узлам.",
    eyebrow: "Маршруты и сеть / три евразийских коридора", title: "Чем длиннее путь, тем опаснее зависеть от одного маршрута.",
    lead: "Северный коридор даёт более непрерывное сухопутное плечо. Средний требует точной координации на Каспии. Южный добавляет ещё один вариант через Центральную Азию. HPF.kz не предлагает клиенту делать ставку на одну линию: мы сопоставляем груз, комплаенс, срок, бюджет и условия приёмки, затем определяем основной путь, резерв и правила переключения.",
    primary: "Подобрать маршрут", secondary: "Смотреть три коридора", heroNotes: [{ value: "3", label: "кандидатных коридора" }, { value: "1", label: "система ответственности" }, { value: "Каждый груз", label: "проверка условий" }],
    atlasEyebrow: "Обзор сети / с востока на запад", atlasTitle: "У одной перевозки может быть несколько вариантов движения на запад.", atlasLead: "Карта показывает направление, а операционный план — цену каждого решения. Пункты пропуска, порты, сервисы, перевозчики, условия транзита и сроки подтверждаются до бронирования по текущей ситуации.", atlasNote: "Груз идёт из Китая справа в Европу слева. Выберите коридор, чтобы увидеть логику работы.",
    detailEyebrow: "Выбор коридора / не перечень городов", detailTitle: "Маршрут выбирают по тому, какой риск можно контролировать лучше.", detailLead: "Мы сравниваем не только ставку: перегрузки, зависимость от расписаний, страновой комплаенс, очереди на границе, страхование и расчёты, а также наличие реального следующего шага при отклонении.",
    corridors: [
      { id: "north", index: "01", label: "Северный", name: "Северный евразийский сухопутный мост", strap: "Меньше морских перегрузок; больше внимания страновому и торговому комплаенсу.", summary: "Маршрут идёт из Китая через Казахстан в железнодорожные сети России, Беларуси и ЕС. Его преимущество — сравнительно непрерывное сухопутное плечо; обязательное условие — актуальная проверка груза, сторон сделки, перевозчика, страхования и расчётов.", route: ["Пункт отправления в Китае", "Хоргос / Алашанькоу — кандидатные переходы", "Железнодорожные узлы Казахстана", "Россия", "Беларусь", "Польша / Европа"], bestForLabel: "Стоит рассматривать для", bestFor: "Стандартных контейнеров, регулярных партий и грузов, которым важно сократить морские перегрузки при ясном комплаенс-профиле.", modeLabel: "Типовая схема", mode: "Железная дорога как основа, автозабор, доставка и европейское плечо.", watchLabel: "Проверить до бронирования", watch: ["Санкции, экспортный контроль и стороны сделки", "Расписание поездов и смена колеи", "Страхование, расчёты и условия входа в ЕС"], switchLabel: "Условие переключения", switchWhen: "При изменении комплаенса, допуска перевозчика, расписания или условий въезда резерв пересматривается до необратимого этапа." },
      { id: "middle", index: "02", label: "Средний", name: "Транскаспийский Средний коридор", strap: "Мультимодальный по своей природе; зависит от портов, судов и точной передачи груза.", summary: "Маршрут проходит через Казахстан к кандидатным портам Актау или Курык, далее через Каспий в Баку и Южный Кавказ, а затем через Турцию или Чёрное море в Европу. Он диверсифицирует географию, но добавляет портовые и перегрузочные зависимости.", route: ["Пункт отправления в Китае", "Переход в Казахстан / Алматы", "Актау / Курык — кандидатный порт", "Каспий / Баку", "Грузия", "Турция / Чёрное море / Европа"], bestForLabel: "Стоит рассматривать для", bestFor: "Грузов, которым нужна географическая диверсификация и допустима мультимодальная обработка, особенно на Кавказ, в Турцию и Европу.", modeLabel: "Типовая схема", mode: "Железная дорога, автотранспорт, каспийское судно и западное плечо в одной цепочке.", watchLabel: "Проверить до бронирования", watch: ["Приём порта, терминал и окно судна", "Перегрузка, оборудование и непрерывность документов", "Западная провозная способность и окно получателя"], switchLabel: "Условие переключения", switchWhen: "Ожидание в порту, изменение судового окна или срыв западной стыковки сравниваются с согласованным порогом: ждать, менять порт или коридор." },
      { id: "south", index: "03", label: "Южный", name: "Коридор Центральная Азия–Иран–Турция", strap: "Ещё один сухопутный вариант; решают проверки транзита и финансов по каждой стране.", summary: "Маршрут идёт из Китая через Казахстан в направлении Узбекистана, Туркменистана и Ирана, затем через Турцию в Европу. Он может быть вариантом для Турции и Южной Европы или при ограничениях на других путях — при подтверждённой страновой, страховой и платёжной возможности.", route: ["Пункт отправления в Китае", "Казахстан / Алматы", "Узбекистан", "Туркменистан", "Иран", "Турция / Европа"], bestForLabel: "Стоит рассматривать для", bestFor: "Направлений в Турцию и Южную Европу и проектов, которым нужен дополнительный сухопутный резерв с допустимой структурой груза и сделки.", modeLabel: "Типовая схема", mode: "Авто и железная дорога с учётом границ, колеи и условий назначения.", watchLabel: "Проверить до бронирования", watch: ["Транзитные разрешения и приём на каждой границе", "Санкции, банки, страхование и ограничения перевозчиков", "Единообразие документов при нескольких передачах"], switchLabel: "Условие переключения", switchWhen: "Если хотя бы в одной стране не подтверждены транзит, страхование, расчёты или перевозчик, маршрут не включается в обязательство." },
    ],
    serviceEyebrow: "Операционная детализация / забота об одной перевозке", serviceTitle: "За пределами карты мы отвечаем за каждую передачу.", serviceLead: "Клиент не должен узнавать о недостающем документе, машине или решении после отправки. Мы превращаем маршрут в порядок действий, который можно подтвердить, показать и разобрать.",
    serviceSteps: [{ step: "01", phase: "До отправки", title: "Зафиксировать то, что нельзя упустить", text: "Проверяем груз, Incoterms, документы, обработку и требования назначения; сравниваем коридоры и указываем состав ставки, зависимости и исключения.", outputs: ["Список пробелов по грузу и документам", "Основной и резервный маршрут", "Ответственные и границы ставки"] }, { step: "02", phase: "В пути", title: "Знать, кто принимает следующий этап", text: "Контролируем въезд, таможню, перегрузку, порт, дальнейший транспорт и приёмку. Статус называет узел, следующее действие и ответственного, а не только «в пути».", outputs: ["Статус контрольных точек", "Варианты и последствия отклонения", "Время следующего обновления"] }, { step: "03", phase: "После прибытия", title: "Доставка заканчивается подтверждением", text: "Связываем приёмку, разгрузку, POD, временное хранение или распределение и переносим выводы в следующую перевозку.", outputs: ["POD и подтверждение", "Закрытие отклонений", "Улучшения для следующей отправки"] }],
    updateTitle: "Когда условия меняются, сначала нужен ответ, потом успокоение.", updateText: "Забота — не повторять «ожидайте». Это вовремя положить на стол факты и варианты. Каждое сообщение об отклонении должно содержать:", updateItems: ["Что произошло и какой узел затронут", "Что мы делаем и какие есть варианты", "Возможное влияние на срок или стоимость", "До какого момента клиенту нужно принять решение", "Точное время следующего обновления"],
    switchEyebrow: "Основной и резервный путь / выход продуман заранее", switchTitle: "Резерв — не новый подрядчик, которого начинают искать после проблемы.", switchText: "До отправки мы согласуем допустимые границы переключения. При срабатывании условия сначала сообщаем факты, последствия и варианты, затем действуем в рамках полномочий — без молчаливой смены маршрута и без информационного вакуума.", switchTriggers: [{ title: "Изменение комплаенса", text: "Новое ограничение затрагивает груз, стороны, перевозчика или транзит." }, { title: "Срыв стыковки", text: "Поезд, судно, порт или приёмка больше не соединяются по плану." }, { title: "Порог ожидания", text: "Фактическое ожидание достигает согласованной точки пересмотра." }, { title: "Коммерческая граница", text: "Дополнительные затраты или срок выходят за пределы полномочий." }],
    requestEyebrow: "Запрос маршрута / можно начать с неполных данных", requestTitle: "Дайте контур одной перевозки — мы начнём с правильных вопросов о пути.", requestText: "Пришлите то, что уже известно; пробелы обозначим мы. Чем полнее данные, тем надёжнее сравнение и границы ставки.", requestItems: ["Пункт отправления и конечное назначение", "Товар, код ТН ВЭД при наличии и назначение", "Места, вес, объём и размеры одного места", "Упаковка, температура, опасный груз и погрузка", "Incoterms и диапазон стоимости груза", "Требуемое окно прибытия и фиксированные этапы", "Отправитель, получатель и данные для комплаенса", "Допустимые коридоры, перегрузки и резерв"],
    promiseTitle: "Маршрут может измениться. Ответственность не должна пропасть.", promiseText: "Мы не обещаем, что задержек не бывает. Мы обещаем: каждое изменение будет замечено, объяснено и передано ответственному до следующего шага.", ctaButton: "Отправить данные груза",
  },
};
