const pointRows = [
  ["chengdu", "成都", 30.5728, 104.0668],
  ["yaan", "雅安", 30.0156, 103.0398],
  ["luding", "泸定", 29.9142, 102.2346],
  ["kangding", "康定", 30.0495, 101.9638],
  ["xinduqiao", "新都桥", 30.0477, 101.5072],
  ["yajiang", "雅江", 30.0322, 101.0145],
  ["litang", "理塘", 29.996, 100.2698],
  ["batang", "巴塘", 30.0056, 99.1107],
  ["markam", "芒康", 29.6866, 98.593],
  ["zuogong", "左贡", 29.6714, 97.84],
  ["bangda", "邦达", 30.4673, 97.1076],
  ["basu", "八宿", 30.0532, 96.9178],
  ["ranwu", "然乌", 29.5056, 96.7711],
  ["bomi", "波密", 29.858, 95.7682],
  ["tongmai", "通麦", 30.1035, 95.0854],
  ["lulang", "鲁朗", 29.7654, 94.7351],
  ["nyingchi", "林芝", 29.6547, 94.3615],
  ["gongbu", "工布江达", 29.8846, 93.2461],
  ["lhasa", "拉萨", 29.65, 91.1175],
  ["yamdrok", "羊卓雍措", 28.9306, 90.699],
  ["gyantse", "江孜", 28.9116, 89.604],
  ["shigatse", "日喀则", 29.2669, 88.8806],
  ["yangbajain", "羊八井", 30.1007, 90.5226],
  ["damxung", "当雄", 30.4748, 91.1012],
  ["namtso", "纳木错", 30.7191, 90.6256],
  ["nagqu", "那曲", 31.476, 92.0514],
  ["baqing", "巴青", 31.9186, 94.0542],
  ["dingqing", "丁青", 31.4106, 95.5975],
  ["riwoqe", "类乌齐", 31.2114, 96.6014],
  ["qamdo", "昌都", 31.1407, 97.172],
  ["jiangda", "江达", 31.4995, 98.2184],
  ["dege", "德格", 31.8067, 98.5809],
  ["ganzi", "甘孜", 31.6227, 99.993],
  ["luhuo", "炉霍", 31.3906, 100.6766],
  ["maerkang", "马尔康", 31.8997, 102.2214],
  ["wenchuan", "汶川", 31.4746, 103.5904],
  ["dujiangyan", "都江堰", 30.9885, 103.6469],
];

const points = Object.fromEntries(pointRows.map(([key, name, lat, lng]) => [key, { name, lat, lng }]));

const images = {
  pass: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=82",
  canyon: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=82",
  lake: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Yamdrok-tso.jpg/1280px-Yamdrok-tso.jpg",
  ranwu: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Ranwu_lake.jpg/1280px-Ranwu_lake.jpg",
  snow: "https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=1400&q=82",
  lhasa: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1400&q=82",
  road: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1400&q=82",
};

const weather = {
  "6/5": ["康定", "阵雨概率高", "约 20/11°C", "山路湿滑，第一天别赶夜路。"],
  "6/6": ["雅江", "小雨/云雾", "约 24/12°C", "折多山能见度波动，谨慎超车。"],
  "6/7": ["巴塘", "多云转阵雨", "约 28/15°C", "理塘风大，短停后下撤到巴塘。"],
  "6/8": ["左贡", "阵雨", "约 21/9°C", "芒康到左贡山口多，电耗保守估算。"],
  "6/9": ["波密/然乌", "中雨可能", "约 23/14°C", "雨季落石风险高，尽量白天通过。"],
  "6/10": ["林芝/拉萨", "林芝小雨，拉萨多云", "约 24/11°C", "天气差或疲劳就住林芝。"],
  "6/11": ["拉萨", "多云", "约 25/11°C", "适合休整，紫外线仍强。"],
  "6/12": ["那曲/林芝", "高原偏冷", "约 14/3°C", "北线夜间低温明显，满电离开拉萨。"],
  "6/13": ["丁青/拉萨", "阵雨", "约 18/7°C", "G317 县城间隔长，早确认充电。"],
  "6/14": ["德格/日喀则", "阵雨到多云", "约 20/8°C", "高原日照和风都强，补水防晒。"],
  "6/15": ["马尔康/拉萨", "多云有雨", "约 22/12°C", "返川雨雾概率仍在，避免夜路。"],
  "6/16": ["成都/日喀则", "成都偏热，日喀则晴间多云", "成都约 34/24°C", "12天版收车，轻松版转羊湖日喀则。"],
  "6/17": ["当雄", "超出稳定预报窗口", "需临近刷新", "提前 1-2 天重查天气、路况、充电。"],
  "6/18+": ["纳木错/那曲", "超出稳定预报窗口", "需临近刷新", "风大或低温就跳过纳木错。"],
  "机动": ["G317 北线", "滚动刷新", "需临近刷新", "按天气、身体和充电状态拆分当天路段。"],
};

const routePaths = {
  tight: "chengdu yaan luding kangding xinduqiao yajiang litang batang markam zuogong bangda basu ranwu bomi tongmai lulang nyingchi gongbu lhasa damxung nagqu baqing dingqing riwoqe qamdo jiangda dege ganzi luhuo maerkang wenchuan dujiangyan chengdu".split(" "),
  relaxed: "chengdu yaan luding kangding xinduqiao yajiang litang batang markam zuogong bangda basu ranwu bomi tongmai lulang nyingchi gongbu lhasa yamdrok gyantse shigatse yangbajain damxung namtso nagqu baqing dingqing riwoqe qamdo jiangda dege ganzi luhuo maerkang wenchuan dujiangyan chengdu".split(" "),
};

const markerTypes = {
  charge: ["充", "#31f2d1", "快充/补能点"],
  supply: ["补", "#3ba4ff", "补给点"],
  scenic: ["景", "#ffd166", "景观点"],
  rest: ["宿", "#ff5ac8", "住宿/休整点"],
  risk: ["高", "#ff6b6b", "高海拔风险点"],
};

const mapStops = {
  tight: [["chengdu", "supply"], ["kangding", "charge"], ["xinduqiao", "scenic"], ["litang", "risk"], ["batang", "charge"], ["markam", "supply"], ["zuogong", "charge"], ["ranwu", "scenic"], ["bomi", "rest"], ["lulang", "scenic"], ["lhasa", "rest"], ["nagqu", "charge"], ["dingqing", "charge"], ["qamdo", "supply"], ["dege", "rest"], ["maerkang", "charge"]],
  relaxed: [["chengdu", "supply"], ["kangding", "charge"], ["xinduqiao", "scenic"], ["litang", "risk"], ["batang", "charge"], ["zuogong", "charge"], ["ranwu", "scenic"], ["bomi", "rest"], ["lulang", "scenic"], ["nyingchi", "rest"], ["lhasa", "rest"], ["yamdrok", "scenic"], ["shigatse", "charge"], ["damxung", "charge"], ["namtso", "risk"], ["nagqu", "charge"], ["qamdo", "supply"], ["dege", "rest"], ["maerkang", "charge"]],
};

function n(type, label, detail) {
  return { type, label, detail };
}

function op(image, terrain, budget, charge, food, lodge, ticket, wear, altitude, advice, nodes) {
  return { image: images[image], terrain, budget, charge, food, lodge, ticket, wear, altitude, advice, nodes };
}


