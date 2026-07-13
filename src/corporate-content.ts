import type { SiteLang } from "./site-content";

type HomeContent = {
  eyebrow: string;
  title: string;
  lead: string;
  primary: string;
  secondary: string;
  short: string;
  imageAlt: string;
  imageNote: string;
  trust: { title: string; body: string; note: string; items: Array<{ value: string; label: string }> };
  problem: { title: string; body: string; items: Array<{ title: string; text: string }> };
  method: { title: string; body: string; definition: string; items: Array<{ title: string; text: string }> };
  customs: {
    eyebrow: string;
    title: string;
    body: string;
    boundary: string;
    button: string;
    stages: Array<{ phase: string; title: string; text: string }>;
  };
  services: { title: string; intro: string; items: Array<{ title: string; text: string; href: string }> };
  route: { title: string; body: string; detail: string; button: string; direction: string };
  process: { title: string; items: Array<{ no: string; title: string; text: string }> };
  final: { title: string; body: string; button: string; signoff: string };
};

export const HOME_V2: Record<SiteLang, HomeContent> = {
  zh: {
    eyebrow: "中国｜哈萨克斯坦｜欧洲",
    title: "路越远，越要心中有数。",
    lead: "从中国到哈萨克斯坦，再向欧洲延伸。HPF.kz 把路线、运力、清关、仓储与末端交付统筹在一条责任链上——每一程有安排，每一处有回音。",
    primary: "获取运输方案",
    secondary: "查看路线网络",
    short: "扎根哈萨克斯坦，连接中国与欧洲。",
    imageAlt: "山脉公路上的跨境运输行业场景",
    imageNote: "行业场景图，不代表 HPF.kz 自有车辆",
    trust: {
      title: "一家公司可以年轻，能力不必从零开始。",
      body: "HPF.kz 扎根哈萨克斯坦一年有余，背后连接中国上市公司体系的治理经验、供应链资源与车队能力。中国的效率、哈萨克斯坦的现场、欧洲的规则，在同一支团队里相互理解。",
      note: "以上只陈述资源，不把资源直接等同于结果。结果要由案例、回单和持续运营证明。",
      items: [
        { value: "上市公司体系", label: "治理经验与长期经营能力" },
        { value: "182 台集团车队资源", label: "Volvo、Scania 干线运力" },
        { value: "5 台哈萨克斯坦本地车辆", label: "本地调度与交付" },
        { value: "阿拉木图仓配能力", label: "仓储、分拨、贴标与逆向处理" },
      ],
    },
    problem: {
      title: "货在路上，生意不能悬着。",
      body: "跨境物流的不确定，往往不在路上，而在交界处：运输与清关之间，口岸与车队之间，仓库与收货人之间。事情一旦落进缝隙，等待就变成成本，沉默就变成风险。",
      items: [
        { title: "路线不该只有价格", text: "没有把等待、换装、清关与末端交付算进去的低价，往往是最昂贵的路线。" },
        { title: "进度不该依靠追问", text: "信息散在不同人的聊天记录里。货走了多远，客户心里却没有底。" },
        { title: "异常不该互相转手", text: "运输、清关、仓储各管一段，真正出问题时，责任常常落在缝隙里。" },
        { title: "经验不该随订单归零", text: "一票货走完，没有记录，也没有复盘。下一票，仍要重新摸索。" },
      ],
    },
    method: {
      title: "我们不消灭远方，只减少失控。",
      body: "跨境没有绝对的确定。天气会变，口岸会等，船期与政策也可能调整。所谓稳，不是假装变化不会发生，而是在出发之前知道风险在哪里；变化发生之后，知道谁来处理，下一步往哪里走。",
      definition: "这就是 HPF.kz 所理解的确定性交付。",
      items: [
        { title: "先看货，再看路", text: "品名、尺寸、价值、贸易条款与到达要求不同，合适的路线也不同。路线从货物的真实约束出发，而不是从一张固定价目表出发。" },
        { title: "先让文件走一遍，再让货出发", text: "在发运前核对申报资料、HS 编码、证书与 EAEU 要求。能在桌面上解决的问题，不留到口岸上解决。" },
        { title: "每一程，都有责任人", text: "取货、出口、入境、转运、入仓、派送与签收，各有节点，各有回音。事情不悬空，责任不落进缝隙。" },
        { title: "每一票，都为下一票留下经验", text: "时效、费用、文件与异常被记录下来。走过的路，不必每一次都重新摸索。" },
      ],
    },
    customs: {
      eyebrow: "清关与合规",
      title: "清关，不是到口岸才开始。",
      body: "真正影响通关节奏的工作，往往发生在发车之前。HPF.kz 从品名、HS 编码、申报要素、合同发票、装箱资料、证书与 EAEU 要求入手，先核对货、单、证是否彼此一致，再衔接中国出口、哈萨克斯坦进口与转关节点。",
      boundary: "我们不承诺不存在的“保证通关”。我们把能够前置的问题前置，把必须现场处理的问题明确到责任人。",
      button: "查看清关与合规能力",
      stages: [
        { phase: "发运前", title: "货物与单证预审", text: "核对品名、用途、材质、品牌型号、HS 编码、申报要素及贸易文件的一致性。" },
        { phase: "口岸中", title: "申报与查验协同", text: "衔接出口、进口与转关节点；需要补件、改单或查验时，明确当前状态与下一责任人。" },
        { phase: "放行后", title: "文件归档与复盘", text: "留存关键单证、放行节点与异常记录，让本票结果成为下一票的可用经验。" },
      ],
    },
    services: {
      title: "车、关、仓、配，不让客户自己拼起来。",
      intro: "跨境交付不是几个服务名称的相加，而是前后衔接的一套次序。HPF.kz 将关键环节放进同一条运营链，让上一程的结果，成为下一程的起点。",
      items: [
        { title: "清关与合规协同", text: "从文件、税则与证书入手，把风险尽量前移。不是等货到口岸再找答案，而是在出发前把问题问完。", href: "/services/#customs" },
        { title: "跨境 TIR 与干线运输", text: "依托集团车队资源与哈萨克斯坦本地调度能力，组织中哈欧跨境公路运输，并按货物、时效与通关条件组合铁路、海运或空运方案。", href: "/services/" },
        { title: "阿拉木图仓储与分拨", text: "从到货、质检、上架，到贴标、分拣、出库与退换处理，让库存状态与交付节奏彼此看得见。", href: "/services/" },
        { title: "哈萨克斯坦本地交付", text: "协调车辆、预约、卸货与签收，把跨境路线的最后一程，真正落到仓库、门店或项目现场。", href: "/services/" },
      ],
    },
    route: {
      title: "地图画的是线，交付走的是节点。",
      body: "从中国集货，到哈萨克斯坦入境；从阿拉木图枢纽，到库雷克、巴库与欧洲收货端。我们为每一段安排运输方式、文件要求、时间边界与备选方案。",
      detail: "路线不只告诉客户“从哪里到哪里”，更要回答：这一程由谁接，可能在哪里等，变化发生时如何继续。",
      button: "查看完整路线",
      direction: "货物流向：由右向左，中国 → 欧洲",
    },
    process: {
      title: "一票货，先把四件事说清楚。",
      items: [
        { no: "01", title: "货是什么", text: "品名、数量、重量、体积、包装，以及危险、温控或超限属性。" },
        { no: "02", title: "从哪里到哪里", text: "起运地、目的地、收货方式与期望到达时间。" },
        { no: "03", title: "哪些条件不能变", text: "贸易条款、预算边界、项目节点与合规要求。" },
        { no: "04", title: "变化时怎么办", text: "主路线、备选路线、异常责任人与沟通方式。" },
      ],
    },
    final: {
      title: "把下一票货，先放到桌面上。",
      body: "告诉我们从哪里出发、送到哪里、是什么货、何时要到。我们先把路线、文件、时间与风险一一讲清楚。",
      button: "提交货运需求",
      signoff: "HPF.kz｜路越远，越要心中有数。",
    },
  },
  en: {
    eyebrow: "CHINA | KAZAKHSTAN | EUROPE",
    title: "The farther the road, the clearer the plan.",
    lead: "From China into Kazakhstan and onward to Europe, HPF.kz brings routing, capacity, customs, warehousing and final delivery into one accountable operating chain—every leg arranged, every change answered.",
    primary: "Request a transport plan",
    secondary: "View route network",
    short: "Based in Kazakhstan. Connecting China and Europe.",
    imageAlt: "Freight transport on a mountain highway",
    imageNote: "Industry image; not an HPF.kz-owned vehicle",
    trust: {
      title: "A company can be young without starting from zero.",
      body: "HPF.kz has been rooted in Kazakhstan for over a year, connected to the governance experience, supply-chain resources and fleet capability of a Chinese listed-company group. Chinese operating speed, Kazakhstan field knowledge and European rules are understood by one team.",
      note: "These statements describe resources, not guaranteed outcomes. Outcomes must be demonstrated through cases, signed delivery records and sustained operations.",
      items: [
        { value: "Listed-company group", label: "Governance and long-term operating capacity" },
        { value: "182 group fleet units", label: "Volvo and Scania linehaul capacity" },
        { value: "5 Kazakhstan vehicles", label: "Local dispatch and delivery" },
        { value: "Almaty fulfilment", label: "Storage, distribution, labelling and returns" },
      ],
    },
    problem: {
      title: "Cargo can be moving. Business cannot be left hanging.",
      body: "Cross-border uncertainty often sits at the handovers: between transport and customs, border and fleet, warehouse and consignee. When work falls into those gaps, waiting becomes cost and silence becomes risk.",
      items: [
        { title: "A route is more than a price", text: "A low quote that omits waiting, transloading, customs and final delivery can become the most expensive route." },
        { title: "Progress should not require chasing", text: "When updates live in separate chat threads, the cargo moves while the customer remains unsure." },
        { title: "Exceptions need one owner", text: "When transport, customs and warehousing each own a fragment, responsibility can disappear at the handover." },
        { title: "Experience should compound", text: "Without records and review, each shipment starts from the same uncertainty as the last." },
      ],
    },
    method: {
      title: "We do not eliminate distance. We reduce loss of control.",
      body: "Cross-border logistics is never absolutely certain. Weather changes, borders queue, sailings and policies move. Stability means knowing the risk before departure and knowing the owner and next move when conditions change.",
      definition: "That is what accountable delivery means at HPF.kz.",
      items: [
        { title: "Start with the cargo", text: "Commodity, dimensions, value, Incoterms and arrival requirements determine the route—not a fixed rate sheet." },
        { title: "Run the documents first", text: "Declarations, HS codes, certificates and EAEU requirements are checked before the cargo reaches the border." },
        { title: "Name an owner for every leg", text: "Pickup, export, entry, transfer, warehousing, dispatch and POD each have a node and a responsible owner." },
        { title: "Keep the learning from every load", text: "Time, cost, documents and exceptions are recorded so the next shipment does not start over." },
      ],
    },
    customs: {
      eyebrow: "Customs & compliance",
      title: "Customs does not begin at the border.",
      body: "The work that shapes clearance usually happens before departure. HPF.kz reviews the commodity description, HS code, declaration data, contract, invoice, packing documents, certificates and EAEU requirements, then coordinates China export, Kazakhstan import and transit-customs milestones.",
      boundary: "We do not promise an unrealistic ‘guaranteed clearance’. We move preventable issues upstream and assign a named owner to issues that must be handled at the border.",
      button: "View customs capability",
      stages: [
        { phase: "Before departure", title: "Cargo and document review", text: "Check description, use, material, model, HS code, declaration elements and consistency across trade documents." },
        { phase: "At the border", title: "Declaration and inspection coordination", text: "Connect export, import and transit nodes; when files, amendments or inspection are required, state the current status and next owner." },
        { phase: "After release", title: "Archive and review", text: "Retain key files, release milestones and exception records so one shipment improves the next." },
      ],
    },
    services: {
      title: "Road, customs, warehouse and delivery—one operating order.",
      intro: "Cross-border delivery is not a list of services. HPF.kz connects the key stages so the result of one leg becomes the starting point of the next.",
      items: [
        { title: "Customs and compliance coordination", text: "Files, tariffs and certificates are reviewed early so questions are answered before the truck reaches the border.", href: "/services/#customs" },
        { title: "Cross-border TIR and linehaul", text: "We organise China–Kazakhstan–Europe road freight with group fleet resources and local dispatch, combining rail, sea or air where cargo and customs conditions require it.", href: "/services/" },
        { title: "Almaty warehousing and distribution", text: "Receiving, inspection, put-away, labelling, picking, dispatch and returns keep inventory and delivery cadence visible.", href: "/services/" },
        { title: "Kazakhstan local delivery", text: "Vehicle coordination, appointments, unloading and proof of delivery bring the final leg to warehouses, stores and project sites.", href: "/services/" },
      ],
    },
    route: {
      title: "Maps draw lines. Delivery runs through nodes.",
      body: "From China origin to Kazakhstan entry, Almaty, Kuryk, Baku and European consignees, each leg receives a transport mode, document requirement, time boundary and alternative.",
      detail: "A route must answer who receives each leg, where it may wait and how work continues when conditions change.",
      button: "View full route",
      direction: "Cargo direction: right to left, China → Europe",
    },
    process: {
      title: "Clarify four things before one shipment moves.",
      items: [
        { no: "01", title: "What is the cargo?", text: "Commodity, quantity, weight, volume, packaging and any dangerous, temperature or oversized attributes." },
        { no: "02", title: "From where to where?", text: "Origin, destination, receiving method and required arrival date." },
        { no: "03", title: "What cannot change?", text: "Incoterms, budget boundary, project milestones and compliance requirements." },
        { no: "04", title: "What happens if conditions change?", text: "Primary route, alternative route, exception owner and communication method." },
      ],
    },
    final: {
      title: "Put the next shipment on the table.",
      body: "Tell us where it starts, where it goes, what it is and when it must arrive. We will clarify the route, files, timing and risks first.",
      button: "Submit freight request",
      signoff: "HPF.kz | The farther the road, the clearer the plan.",
    },
  },
  ru: {
    eyebrow: "КИТАЙ | КАЗАХСТАН | ЕВРОПА",
    title: "Чем дальше путь, тем яснее должен быть план.",
    lead: "Из Китая в Казахстан и далее в Европу. HPF.kz объединяет маршрут, транспорт, таможню, склад и доставку в одну цепочку ответственности — каждый этап организован, на каждое изменение есть ответ.",
    primary: "Запросить план перевозки",
    secondary: "Смотреть маршруты",
    short: "Работаем в Казахстане. Соединяем Китай и Европу.",
    imageAlt: "Грузовой транспорт на горной автомагистрали",
    imageNote: "Отраслевое фото; это не автомобиль HPF.kz",
    trust: {
      title: "Компания может быть молодой, но её возможности — не с нуля.",
      body: "HPF.kz работает в Казахстане более года и опирается на управленческий опыт, ресурсы цепочки поставок и автопарк группы китайской публичной компании. Скорость Китая, знание Казахстана и правила Европы понимает одна команда.",
      note: "Здесь указаны ресурсы, а не гарантированные результаты. Результаты подтверждаются кейсами, документами о доставке и стабильной работой.",
      items: [
        { value: "Группа публичной компании", label: "Управление и долгосрочная работа" },
        { value: "182 единицы автопарка группы", label: "Магистральные Volvo и Scania" },
        { value: "5 автомобилей в Казахстане", label: "Локальная диспетчеризация и доставка" },
        { value: "Складская работа в Алматы", label: "Хранение, распределение, маркировка и возвраты" },
      ],
    },
    problem: {
      title: "Груз может быть в пути. Бизнес не должен зависать.",
      body: "Неопределённость часто возникает на стыках: транспорта и таможни, границы и автопарка, склада и получателя. Когда задача попадает в зазор, ожидание становится затратой, а молчание — риском.",
      items: [
        { title: "Маршрут — это не только цена", text: "Низкая ставка без ожидания, перегруза, таможни и последней мили часто оказывается самым дорогим маршрутом." },
        { title: "Статус не нужно выпрашивать", text: "Если данные разбросаны по чатам, груз движется, а у клиента нет ясной картины." },
        { title: "У отклонения должен быть владелец", text: "Когда транспорт, таможня и склад отвечают только за свой фрагмент, ответственность теряется на стыке." },
        { title: "Опыт должен накапливаться", text: "Без записи и разбора каждый следующий груз начинает путь с прежней неопределённости." },
      ],
    },
    method: {
      title: "Мы не сокращаем расстояние. Мы уменьшаем потерю контроля.",
      body: "В трансграничной логистике нет абсолютной определённости. Меняется погода, возникают очереди, сдвигаются рейсы и правила. Устойчивость — знать риск до отправки и знать ответственного и следующий шаг после изменения.",
      definition: "Так HPF.kz понимает управляемую доставку.",
      items: [
        { title: "Сначала груз, затем маршрут", text: "На выбор пути влияют товар, размеры, стоимость, Incoterms и срок прибытия, а не фиксированный прайс-лист." },
        { title: "Сначала проходят документы", text: "Декларации, коды ТН ВЭД, сертификаты и требования ЕАЭС проверяются до выхода груза." },
        { title: "Ответственный на каждом этапе", text: "Забор, экспорт, ввоз, перегрузка, склад, доставка и POD имеют свой узел и владельца." },
        { title: "Каждая перевозка оставляет опыт", text: "Сроки, расходы, документы и отклонения фиксируются, чтобы не начинать заново." },
      ],
    },
    customs: {
      eyebrow: "Таможня и соответствие",
      title: "Таможня начинается не на границе.",
      body: "Работа, от которой зависит ритм оформления, начинается до отправки. HPF.kz проверяет описание товара, код ТН ВЭД, сведения для декларации, контракт, инвойс, упаковочные документы, сертификаты и требования ЕАЭС, а затем координирует экспорт из Китая, импорт в Казахстан и транзитные узлы.",
      boundary: "Мы не обещаем нереальную «гарантию оформления». Предотвратимые вопросы решаем заранее, а пограничные задачи закрепляем за конкретным ответственным.",
      button: "Смотреть возможности таможни",
      stages: [
        { phase: "До отправки", title: "Проверка груза и документов", text: "Сверяем наименование, назначение, материал, модель, код ТН ВЭД, сведения декларации и торговые документы." },
        { phase: "На границе", title: "Декларирование и досмотр", text: "Связываем экспорт, импорт и транзит; при дополнении, корректировке или досмотре сообщаем статус и следующего ответственного." },
        { phase: "После выпуска", title: "Архив и разбор", text: "Сохраняем ключевые документы, этапы выпуска и отклонения, чтобы результат одной перевозки помогал следующей." },
      ],
    },
    services: {
      title: "Транспорт, таможня, склад и доставка — в одном порядке.",
      intro: "Трансграничная доставка — это не перечень услуг. HPF.kz соединяет этапы так, чтобы результат одного становился началом следующего.",
      items: [
        { title: "Таможня и соответствие требованиям", text: "Проверяем документы, тарифы и сертификаты заранее, чтобы вопросы были решены до прибытия на границу.", href: "/services/#customs" },
        { title: "TIR и магистральные перевозки", text: "Организуем автоперевозки Китай–Казахстан–Европа с ресурсами группы и местной диспетчеризацией, при необходимости сочетая железную дорогу, море или авиацию.", href: "/services/" },
        { title: "Склад и распределение в Алматы", text: "Приёмка, проверка, размещение, маркировка, комплектация, отгрузка и возвраты делают запас и ритм доставки видимыми.", href: "/services/" },
        { title: "Доставка по Казахстану", text: "Координируем транспорт, время приёмки, разгрузку и POD до склада, магазина или площадки проекта.", href: "/services/" },
      ],
    },
    route: {
      title: "Карта рисует линии. Доставка проходит через узлы.",
      body: "От отправления в Китае через въезд в Казахстан, Алматы, Курык и Баку до получателя в Европе — у каждого этапа есть вид транспорта, документы, срок и запасной вариант.",
      detail: "Маршрут должен отвечать, кто принимает этап, где возможно ожидание и как продолжится работа при изменениях.",
      button: "Смотреть весь маршрут",
      direction: "Направление груза: справа налево, Китай → Европа",
    },
    process: {
      title: "До отправки нужно уточнить четыре вещи.",
      items: [
        { no: "01", title: "Что за груз", text: "Наименование, количество, вес, объём, упаковка, опасные, температурные или негабаритные свойства." },
        { no: "02", title: "Откуда и куда", text: "Место отправления, назначения, способ приёмки и требуемая дата." },
        { no: "03", title: "Что нельзя менять", text: "Incoterms, бюджет, этапы проекта и требования соответствия." },
        { no: "04", title: "Что делать при изменениях", text: "Основной и запасной маршрут, ответственный за отклонение и способ связи." },
      ],
    },
    final: {
      title: "Положим следующую перевозку на стол.",
      body: "Сообщите откуда, куда, какой груз и к какому сроку. Сначала мы разберём маршрут, документы, сроки и риски.",
      button: "Отправить запрос",
      signoff: "HPF.kz | Чем дальше путь, тем яснее план.",
    },
  },
};
