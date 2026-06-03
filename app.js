let map;
let routeLayer;
let markerLayer;

const $ = (id) => document.getElementById(id);
const planKicker = $("planKicker");
const planTitle = $("planTitle");
const planIntro = $("planIntro");
const planStats = $("planStats");
const planVerdict = $("planVerdict");
const timeline = $("timeline");
const dayCount = $("dayCount");
const overviewMapLink = $("overviewMapLink");
const buttons = [...document.querySelectorAll(".mode-button")];

function coord(key) {
  const point = points[key];
  return [point.lat, point.lng];
}

function amapNav(fromKey, toKey) {
  const from = points[fromKey];
  const to = points[toKey];
  return `https://uri.amap.com/navigation?from=${from.lng},${from.lat},${encodeURIComponent(from.name)}&to=${to.lng},${to.lat},${encodeURIComponent(to.name)}&mode=car&policy=1&coordinate=wgs84&callnative=1`;
}

function initMap() {
  const mapEl = $("routeMap");
  if (!window.L) {
    mapEl.classList.add("map-fallback");
    mapEl.innerHTML = "<span>地图组件未加载。请联网刷新，或使用每日高德导航链接。</span>";
    return;
  }
  map = L.map(mapEl, { zoomControl: false, attributionControl: false, scrollWheelZoom: false, dragging: true, tap: true });
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 18, attribution: "OpenStreetMap" }).addTo(map);
  L.control.zoom({ position: "bottomright" }).addTo(map);
  routeLayer = L.layerGroup().addTo(map);
  markerLayer = L.layerGroup().addTo(map);
}

function markerIcon(type) {
  const style = markerTypes[type] || markerTypes.supply;
  return L.divIcon({
    className: "route-stop-icon",
    html: `<span style="--marker-color:${style[1]}">${style[0]}</span>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
}

function renderMap(planName) {
  if (!window.L || !map) return;
  routeLayer.clearLayers();
  markerLayer.clearLayers();
  const path = routePaths[planName].map(coord);
  L.polyline(path, { color: "#34f0d0", weight: 5, opacity: 0.92, lineCap: "round", lineJoin: "round" }).addTo(routeLayer);
  L.polyline(path, { color: "#7b4dff", weight: 13, opacity: 0.18, lineCap: "round", lineJoin: "round" }).addTo(routeLayer);
  mapStops[planName].forEach(([key, type]) => {
    const p = points[key];
    const style = markerTypes[type] || markerTypes.supply;
    L.marker([p.lat, p.lng], { icon: markerIcon(type) })
      .bindTooltip(`${style[2]} · ${p.name}`, { direction: "top", offset: [0, -12] })
      .addTo(markerLayer);
  });
  map.fitBounds(L.latLngBounds(path), { padding: [22, 22] });
  setTimeout(() => map.invalidateSize(), 60);
}

function renderNodes(nodes) {
  return nodes.map((item) => {
    const style = markerTypes[item.type] || markerTypes.supply;
    return `<div class="route-node node-${item.type}"><span class="node-pin" style="--node-color:${style[1]}">${style[0]}</span><div><strong>${item.label}</strong><small>${item.detail}</small></div></div>`;
  }).join("");
}

function renderPlan(name) {
  const plan = plans[name];
  planKicker.textContent = plan.kicker;
  planTitle.textContent = plan.title;
  planIntro.textContent = plan.intro;
  planVerdict.textContent = plan.verdict;
  dayCount.textContent = `${plan.days.length} 个行程日`;
  overviewMapLink.href = amapNav("chengdu", "lhasa");
  planStats.innerHTML = plan.stats.map(([label, value]) => `<div class="stat-card"><span>${label}</span><strong>${value}</strong></div>`).join("");
  timeline.innerHTML = plan.days.map((item) => {
    const [place, condition, temp, risk] = weather[item.date] || weather["机动"];
    const detail = ops[item.opKey];
    return `<article class="day-card">
      <div class="day-visual"><img src="${detail.image}" alt="${item.route} 沿途景观" loading="lazy" /><div class="day-visual-shade"></div><div class="day-badge"><strong>${item.day}</strong><span>${item.date}</span></div><p>${detail.terrain}</p></div>
      <div class="day-content">
        <div class="day-title"><div><span class="section-kicker">Roadbook Segment</span><h3>${item.route}</h3></div><a class="nav-link" href="${amapNav(item.from, item.to)}" target="_blank" rel="noreferrer">导航</a></div>
        <p class="day-note">${item.note}</p>
        <div class="drive-meta"><span>${item.km}</span><span>${item.time}</span><span>休整：${item.rest}</span></div>
        <div class="route-flow">${renderNodes(detail.nodes)}</div>
        <div class="ops-grid">
          <section class="ops-panel weather-panel"><span>天气</span><strong>${place} · ${condition}</strong><small>${temp} · ${risk}</small></section>
          <section class="ops-panel budget-panel"><span>当日预算</span><strong>${detail.budget}</strong><small>${detail.charge}</small></section>
          <section class="ops-panel"><span>吃住门票</span><small>${detail.food}<br />${detail.lodge}<br />${detail.ticket}</small></section>
          <section class="ops-panel risk-panel"><span>穿衣/高反/注意</span><small>${detail.wear}<br />${detail.altitude}<br />${detail.advice}</small></section>
        </div>
      </div>
    </article>`;
  }).join("");
  renderMap(name);
}

function setupShare() {
  const shareButton = $("shareButton");
  const copyButton = $("copyButton");
  const status = $("shareStatus");
  const data = { title: "成都出发 · E5 Sportback 拉萨方向自驾路书", text: "成都往拉萨方向高原环线：12天限定与轻松游双方案。", url: window.location.href };
  shareButton.addEventListener("click", async () => {
    try {
      if (navigator.share) {
        await navigator.share(data);
        status.textContent = "已打开系统分享。";
      } else {
        await navigator.clipboard.writeText(window.location.href);
        status.textContent = "当前浏览器不支持系统分享，已复制链接。";
      }
    } catch {
      status.textContent = "分享已取消。";
    }
  });
  copyButton.addEventListener("click", async () => {
    await navigator.clipboard.writeText(window.location.href);
    status.textContent = "链接已复制。";
  });
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-selected", "false");
    });
    button.classList.add("active");
    button.setAttribute("aria-selected", "true");
    renderPlan(button.dataset.plan);
  });
});

initMap();
renderPlan("tight");
setupShare();

