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
    eyebrow: "中国 · 哈萨克斯坦 · 欧洲",
    title: "路越远，越要心中有数。",
    lead: "从中国到哈萨克斯坦，再向欧洲延伸。HPF.kz 把路线、运力、清关、仓储与末端交付统筹在一条责任链上——每一程有安排，每一处有回音。",
    primary: "获取运输方案",
    secondary: "查看路线网络",
    short: "扎根哈萨克斯坦，连接中国与欧洲。",
    imageAlt: "山脉公路上的跨境运输行业场景",
    imageNote: "行业场景图，不代表 HPF.kz 自有车辆",
    trust: {
      title: "一家公司可以年轻，能力不必从零开始。",
      body: "HPF KZ 于 2024 年在哈萨克斯坦完成首次国家登记，创办方 HPF CO., LIMITED 载于 eGov 法人证明。车队、仓储与更广泛的集团关系，仅在证据与公开口径确认后披露。",
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
      title: "清关，从发运前开始。",
      body: "口岸不是解决问题的地方，是检验准备的地方。HPF.kz 把清关工作放在发运之前：文件先走一遍，风险先摆上桌面，责任先落到人。",
      boundary: "我们不承诺“包通关”。通关是行政结果，我们管理的是风险、准备与异常发生后的下一步。",
      button: "查看清关与合规能力",
      stages: [
        { phase: "准备", title: "文件预审", text: "合同、发票、箱单、证书与原产地资料齐套核验。" },
        { phase: "核对", title: "申报要素", text: "品名、材质、用途与申报要素逐项确认。" },
        { phase: "归类", title: "HS 归类", text: "HS 编码与 EAEU 进口要求交叉核对。" },
        { phase: "申报", title: "进出口申报", text: "在已确认的业务范围内衔接中国出口与哈萨克斯坦进口资料。" },
        { phase: "现场", title: "查验应对", text: "补件、改单或口岸查验时，说明责任人、响应时限与下一步。" },
        { phase: "结果", title: "放行复盘", text: "异常记录归档，为下一票留下依据。" },
      ],
    },
    services: {
      title: "关、车、仓、配，不让客户自己拼起来。",
      intro: "跨境交付不是几个服务名称的相加，而是前后衔接的一套次序。HPF.kz 将关键环节放进同一条运营链，让上一程的结果，成为下一程的起点。",
      items: [
        { title: "清关与合规协同", text: "申报要素与 HS 归类事先核对，单证齐套后再发运；查验与补件有责任人、有时限。", href: "/services/#customs" },
        { title: "跨境 TIR 与干线运输", text: "按货物、时效与通关条件组织中哈欧跨境公路运输，并在适合时组合铁路、海运或空运方案。", href: "/services/" },
        { title: "阿拉木图仓储与分拨", text: "从到货、质检、上架，到贴标、分拣与出库，每一步有记录、有反馈。", href: "/services/" },
        { title: "哈萨克斯坦本地交付", text: "协调车辆、预约、卸货与签收，把跨境路线的最后一程，真正落到仓库、门店或项目现场。", href: "/services/" },
      ],
    },
    route: {
      title: "地图画的是线，交付走的是节点。",
      body: "从中国集货，经中哈口岸入境；从阿拉木图枢纽，到跨里海走廊与欧洲收货端。我们为每一段安排运输方式、文件要求、时间边界与备选方案。",
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
    eyebrow: "CHINA · KAZAKHSTAN · EUROPE",
    title: "The farther the road, the clearer the plan.",
    lead: "From China into Kazakhstan and onward to Europe, HPF.kz brings routing, capacity, customs, warehousing and final delivery into one accountable operating chain—every leg arranged, every change answered.",
    primary: "Request a transport plan",
    secondary: "View route network",
    short: "Based in Kazakhstan. Connecting China and Europe.",
    imageAlt: "Freight transport on a mountain highway",
    imageNote: "Industry image; not an HPF.kz-owned vehicle",
    trust: {
      title: "A company can be young without starting from zero.",
      body: "HPF KZ completed its initial state registration in Kazakhstan in 2024, with HPF CO., LIMITED named as founder in the eGov legal-entity certificate. Fleet, warehousing and wider group-relationship claims remain gated until evidence and public wording are confirmed.",
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
      title: "Customs clearance starts before shipment.",
      body: "The border is where preparation is tested, not where it should begin. HPF.kz reviews files, classification and declaration data before departure, then names the owner and next action when conditions change.",
      boundary: "We do not promise guaranteed clearance. Clearance is an administrative result; we manage preparation, risk and the next action when an exception occurs.",
      button: "View customs capability",
      stages: [
        { phase: "Prepare", title: "Documents", text: "Check contract, invoice, packing list, certificates and origin documents for completeness." },
        { phase: "Verify", title: "Declaration", text: "Confirm description, material, use and declaration elements." },
        { phase: "Classify", title: "HS code", text: "Cross-check the HS code against EAEU import requirements." },
        { phase: "Declare", title: "Customs filing", text: "Coordinate China export and Kazakhstan import files within the confirmed operating scope." },
        { phase: "Respond", title: "Inspection", text: "For additions, amendments or inspection, state the owner, response window and next action." },
        { phase: "Record", title: "Release", text: "Archive exceptions and supporting evidence for the next shipment." },
      ],
    },
    services: {
      title: "Customs, road, warehouse and delivery—one operating order.",
      intro: "Cross-border delivery is not a list of services. HPF.kz connects the key stages so the result of one leg becomes the starting point of the next.",
      items: [
        { title: "Customs and compliance coordination", text: "Files, tariffs and certificates are reviewed early so questions are answered before the truck reaches the border.", href: "/services/#customs" },
        { title: "Cross-border TIR and linehaul", text: "We organise China–Kazakhstan–Europe road freight around cargo, border and delivery constraints, combining rail, sea or air where appropriate.", href: "/services/" },
        { title: "Almaty warehousing and distribution", text: "Receiving, inspection, put-away, labelling, picking and dispatch are recorded with clear status updates.", href: "/services/" },
        { title: "Kazakhstan local delivery", text: "Vehicle coordination, appointments, unloading and proof of delivery bring the final leg to warehouses, stores and project sites.", href: "/services/" },
      ],
    },
    route: {
      title: "Maps draw lines. Delivery runs through nodes.",
      body: "From China origin through a China–Kazakhstan border point, Almaty, the Caspian corridor and European consignees, each leg receives a transport mode, document requirement, time boundary and alternative.",
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
    eyebrow: "КИТАЙ · КАЗАХСТАН · ЕВРОПА",
    title: "Чем дальше путь, тем яснее должен быть план.",
    lead: "Из Китая в Казахстан и далее в Европу. HPF.kz объединяет маршрут, транспорт, таможню, склад и доставку в одну цепочку ответственности — каждый этап организован, на каждое изменение есть ответ.",
    primary: "Запросить план перевозки",
    secondary: "Смотреть маршруты",
    short: "Работаем в Казахстане. Соединяем Китай и Европу.",
    imageAlt: "Грузовой транспорт на горной автомагистрали",
    imageNote: "Отраслевое фото; это не автомобиль HPF.kz",
    trust: {
      title: "Компания может быть молодой, но её возможности — не с нуля.",
      body: "Первичная государственная регистрация HPF KZ в Казахстане состоялась в 2024 году; учредитель HPF CO., LIMITED указан в справке eGov. Сведения об автопарке, складе и более широкой связи с группой публикуются после подтверждения доказательств и формулировок.",
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
      title: "Таможенное оформление начинается до отгрузки.",
      body: "Граница проверяет подготовку, а не заменяет её. До отправки HPF.kz сверяет документы, классификацию и сведения декларации, а при изменениях указывает ответственного и следующее действие.",
      boundary: "Мы не обещаем гарантированное оформление. Выпуск — административный результат; мы управляем подготовкой, риском и следующим действием при отклонении.",
      button: "Смотреть возможности таможни",
      stages: [
        { phase: "Подготовка", title: "Документы", text: "Проверяем контракт, инвойс, упаковочный лист, сертификаты и документы о происхождении." },
        { phase: "Сверка", title: "Декларация", text: "Подтверждаем наименование, материал, назначение и элементы декларации." },
        { phase: "Классификация", title: "Код ТН ВЭД", text: "Сопоставляем код ТН ВЭД с требованиями импорта ЕАЭС." },
        { phase: "Подача", title: "Оформление", text: "Координируем файлы экспорта из Китая и импорта в Казахстан в подтверждённом объёме работ." },
        { phase: "Реакция", title: "Досмотр", text: "При дополнении, корректировке или досмотре указываем ответственного, срок и следующий шаг." },
        { phase: "Запись", title: "Выпуск", text: "Архивируем отклонения и подтверждения для следующей перевозки." },
      ],
    },
    services: {
      title: "Таможня, транспорт, склад и доставка — в одном порядке.",
      intro: "Трансграничная доставка — это не перечень услуг. HPF.kz соединяет этапы так, чтобы результат одного становился началом следующего.",
      items: [
        { title: "Таможня и соответствие требованиям", text: "Проверяем документы, тарифы и сертификаты заранее, чтобы вопросы были решены до прибытия на границу.", href: "/services/#customs" },
        { title: "TIR и магистральные перевозки", text: "Организуем автоперевозки Китай–Казахстан–Европа по условиям груза, границы и приёмки, при необходимости сочетая железную дорогу, море или авиацию.", href: "/services/" },
        { title: "Склад и распределение в Алматы", text: "Приёмка, проверка, размещение, маркировка, комплектация и отгрузка фиксируются с понятным статусом.", href: "/services/" },
        { title: "Доставка по Казахстану", text: "Координируем транспорт, время приёмки, разгрузку и POD до склада, магазина или площадки проекта.", href: "/services/" },
      ],
    },
    route: {
      title: "Карта рисует линии. Доставка проходит через узлы.",
      body: "От отправления в Китае через пункт Китай–Казахстан, Алматы и Каспийский коридор до получателя в Европе — у каждого этапа есть вид транспорта, документы, срок и запасной вариант.",
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
