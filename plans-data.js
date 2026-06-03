function d(day, date, route, km, time, rest, from, to, note, opKey) {
  return { day, date, route, km, time, rest, from, to, note, opKey };
}

const tightDays = [
  d("D1", "6/5", "成都 → 雅安 → 泸定 → 康定", "290 km", "4.5-5.5 h", "康定", "chengdu", "kangding", "满电出发，康定补能过夜，第一晚适应海拔。", "chengduKangding"),
  d("D2", "6/6", "康定 → 折多山 → 新都桥 → 雅江", "210 km", "5-6 h", "雅江", "kangding", "yajiang", "新都桥短停拍照，雅江海拔相对友好。", "kangdingYajiang"),
  d("D3", "6/7", "雅江 → 理塘 → 海子山 → 巴塘", "300 km", "6-7 h", "巴塘", "yajiang", "batang", "理塘只短停，继续下到巴塘休整。", "yajiangBatang"),
  d("D4", "6/8", "巴塘 → 芒康 → 左贡", "260 km", "6-7 h", "左贡", "batang", "zuogong", "进藏后检查证件、胎压和补能。", "batangZuogong"),
  d("D5", "6/9", "左贡 → 邦达 → 八宿 → 然乌 → 波密", "420 km", "8.5-10 h", "波密", "zuogong", "bomi", "全程最紧之一，雨季早出发。", "zuogongBomi"),
  d("D6", "6/10", "波密 → 通麦 → 鲁朗 → 林芝 → 拉萨", "620 km", "9-10.5 h", "拉萨", "bomi", "lhasa", "非常长，天气差或疲劳就改住林芝。", "bomiLhasa"),
  d("D7", "6/11", "拉萨市区休整", "30 km", "轻量移动", "拉萨", "lhasa", "lhasa", "唯一完整休整日，布宫、大昭寺、八廓街任选。", "lhasaRest"),
  d("D8", "6/12", "拉萨 → 当雄 → 那曲", "330 km", "5.5-6.5 h", "那曲", "lhasa", "nagqu", "进入高海拔返程段，夜间低温会抬高电耗。", "lhasaNagqu"),
  d("D9", "6/13", "那曲 → 巴青 → 丁青", "430 km", "8-9.5 h", "丁青", "nagqu", "dingqing", "G317 县城间隔长，早上复核路况和充电。", "nagquDingqing"),
  d("D10", "6/14", "丁青 → 类乌齐 → 昌都 → 江达 → 德格", "520 km", "9.5-11 h", "德格", "dingqing", "dege", "晚到昌都仍疲劳，宁可住昌都。", "dingqingDege"),
  d("D11", "6/15", "德格 → 甘孜 → 炉霍 → 马尔康", "520 km", "9-10.5 h", "马尔康", "dege", "maerkang", "高原返川长距离，尽量白天通过山口。", "degeMaerkang"),
  d("D12", "6/16", "马尔康 → 汶川 → 都江堰 → 成都", "320 km", "5-6 h", "成都", "maerkang", "chengdu", "下午回成都更稳，还车前留出清洁、补能和检查时间。", "maerkangChengdu"),
];

const relaxedDays = [
  ...tightDays.slice(0, 4),
  d("D5", "6/9", "左贡 → 邦达 → 八宿 → 然乌", "290 km", "6.5-7.5 h", "然乌/八宿", "zuogong", "ranwu", "把紧张的左贡到波密拆开，留时间看然乌湖。", "zuogongRanwu"),
  d("D6", "6/10", "然乌 → 米堆冰川 → 波密", "130 km", "3-4 h", "波密", "ranwu", "bomi", "轻松日，适合洗车、整理行李、修复体力。", "ranwuBomi"),
  d("D7", "6/11", "波密 → 通麦 → 鲁朗 → 林芝", "230 km", "4.5-5.5 h", "林芝", "bomi", "nyingchi", "林芝海拔友好，是全线最适合恢复的一站。", "bomiNyingchi"),
  d("D8", "6/12", "林芝休整 / 巴松措 / 鲁朗慢游", "80-180 km", "2-4 h", "林芝", "nyingchi", "nyingchi", "机动日。雨大就休息，天气好再去湖区或鲁朗。", "nyingchiRest"),
  d("D9", "6/13", "林芝 → 工布江达 → 拉萨", "400 km", "5.5-6.5 h", "拉萨", "nyingchi", "lhasa", "高速段相对友好，到拉萨后不要立刻安排密集景点。", "nyingchiLhasa"),
  d("D10", "6/14", "拉萨休整", "30 km", "轻量移动", "拉萨", "lhasa", "lhasa", "布宫、大昭寺、八廓街。提前确认布宫预约。", "lhasaRest"),
  d("D11", "6/15", "拉萨继续休整", "30-80 km", "轻量移动", "拉萨", "lhasa", "lhasa", "给身体和车辆都留一个真正的缓冲日。", "lhasaSecond"),
  d("D12", "6/16", "拉萨 → 羊湖 → 江孜 → 日喀则", "360 km", "6-7 h", "日喀则", "lhasa", "shigatse", "高海拔湖区日照强，早出发，带外套和防晒。", "lhasaShigatse"),
  d("D13", "6/17", "日喀则 → 羊八井 / 当雄", "310 km", "5.5-6.5 h", "当雄", "shigatse", "damxung", "从日喀则转回北线，不急着硬顶到那曲。", "shigatseDamxung"),
  d("D14", "6/18+", "当雄 → 纳木错 → 那曲", "230 km", "4.5-6 h", "那曲", "damxung", "nagqu", "天气好再进纳木错；风大或低温就直去那曲。", "damxungNagqu"),
  d("D15", "机动", "那曲 → 巴青 / 丁青", "330-430 km", "7-9 h", "巴青或丁青", "nagqu", "dingqing", "按充电和身体状态二选一。", "nagquDingqingFlex"),
  d("D16", "机动", "丁青 → 类乌齐 → 昌都", "240 km", "5-6 h", "昌都", "dingqing", "qamdo", "短一点，把 G317 的风险拆散。", "dingqingQamdo"),
  d("D17", "机动", "昌都 → 江达 → 德格", "330 km", "6.5-8 h", "德格", "qamdo", "dege", "德格适合停一晚，给第二天返川做准备。", "qamdoDege"),
  d("D18", "机动", "德格 → 甘孜 → 马尔康", "520 km", "9-10 h", "马尔康", "dege", "maerkang", "想更轻松可拆成德格到甘孜、甘孜到马尔康两天。", "degeMaerkang"),
  d("D19", "机动", "马尔康 → 汶川 → 成都", "320 km", "5-6 h", "成都", "maerkang", "chengdu", "舒展收尾，避免夜间还车。", "maerkangChengdu"),
];

const plans = {
  tight: {
    kicker: "12-Day Sprint",
    title: "12天限定环线",
    intro: "G318 进藏到拉萨，G317 北线回成都。它满足不原路返回，但后半段连续长距离驾驶，属于高强度执行型路书。",
    stats: [["周期", "12天"], ["总里程", "约 4,550 km"], ["完整休整", "拉萨 1 天"], ["预算口径", "2人1车/不含租车"]],
    verdict: "能跑完，但不像轻松旅行。雨季塌方、充电排队、限速或高反任何一项延误，都会挤压拉萨停留和返程安全余量。",
    days: tightDays,
  },
  relaxed: {
    kicker: "Open-Date Journey",
    title: "不强制限定时间的轻松游",
    intro: "按 19 天左右设计，把高海拔适应、林芝恢复、拉萨停留、羊湖/日喀则和 G317 回川机动日都留出来。",
    stats: [["推荐周期", "18-20天"], ["总里程", "约 4,850 km"], ["完整休整", "4-5 天"], ["预算口径", "2人1车/不含租车"]],
    verdict: "更适合纯电车和第一次川藏进出。每天有补能冗余，遇到雨、管制、身体不适或想多拍一天，都有空间调整。",
    days: relaxedDays,
  },
};


