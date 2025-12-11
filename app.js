// Global Chart.js style
Chart.defaults.color = "#e5e7eb";
Chart.defaults.borderColor = "rgba(148,163,184,0.35)";
Chart.defaults.font.family = '"Inter", system-ui, -apple-system, BlinkMacSystemFont, sans-serif';

const clusterData = [
  { name: "Cluster A – Magnolia", code: "A", total: 20, sold: 13, revenue: 8.2 },
  { name: "Cluster B – Serenade", code: "B", total: 18, sold: 15, revenue: 10.6 },
  { name: "Cluster C – Elmwood", code: "C", total: 14, sold: 8,  revenue: 4.6 },
];

const agents = [
  { name: "Andi", leads: 96, closing: 14, revenue: 4.2 },
  { name: "Sari", leads: 84, closing: 11, revenue: 3.5 },
  { name: "Budi", leads: 61, closing: 6,  revenue: 1.8 },
  { name: "Raka", leads: 72, closing: 4,  revenue: 1.1 },
  { name: "Maya", leads: 54, closing: 5,  revenue: 1.6 },
];

let chartCluster, chartPayment, chartTrend, chartTakeup, chartFunnel, chartChannel, chartAgents, chartPriceSegment, chartCity;

function initCharts() {
  const cBlue     = "rgba(59, 130, 246, 0.9)";
  const cBlueSoft = "rgba(59, 130, 246, 0.45)";
  const cCyan     = "rgba(56, 189, 248, 0.9)";
  const cEmerald  = "rgba(16, 185, 129, 0.9)";
  const cAmber    = "rgba(245, 158, 11, 0.9)";
  const cPink     = "rgba(236, 72, 153, 0.9)";
  const cSlate    = "rgba(148, 163, 184, 0.9)";
  const cRed      = "rgba(239, 68, 68, 0.9)"; // MERAH untuk KPR

  // CLUSTER BAR
  chartCluster = new Chart(document.getElementById("chartCluster"), {
    type: "bar",
    data: {
      labels: clusterData.map(c => c.code),
      datasets: [
        {
          label: "Revenue (Miliar)",
          data: clusterData.map(c => c.revenue),
          backgroundColor: cBlue,
          borderRadius: 10,
          maxBarThickness: 26,
        },
        {
          label: "Unit Terjual",
          data: clusterData.map(c => c.sold),
          backgroundColor: cCyan,
          borderRadius: 10,
          maxBarThickness: 26,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: { font: { size: 11 } },
        },
      },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 11 } } },
        y: { grid: { color: "rgba(148,163,184,0.2)" }, ticks: { font: { size: 11 } } },
      },
    },
  });

  // DONUT – KOMPOSISI PEMBAYARAN (KPR MERAH)
  chartPayment = new Chart(document.getElementById("chartPayment"), {
    type: "doughnut",
    data: {
      labels: ["Cash", "KPR", "Inhouse"],
      datasets: [{
        data: [18, 68, 14],
        // Cash = hijau, KPR = MERAH, Inhouse = kuning
        backgroundColor: [cEmerald, cRed, cAmber],
        borderWidth: 2,
        borderColor: "#020617",
        hoverOffset: 8,
        spacing: 3,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,   // penting supaya bulat
      aspectRatio: 1.4,
      cutout: "65%",
      rotation: -90,
      plugins: {
        legend: {
          position: "bottom",
          labels: { font: { size: 11 } },
        },
        tooltip: {
          backgroundColor: "rgba(15,23,42,0.95)",
          borderColor: "rgba(148,163,184,0.6)",
          borderWidth: 1,
          padding: 8,
        },
      },
      animation: {
        animateRotate: true,
        animateScale: true,
      },
    },
  });

  // TREND PENJUALAN BULANAN
  const ctxTrend = document.getElementById("chartTrend").getContext("2d");
  const gradUnit = ctxTrend.createLinearGradient(0, 0, 0, 260);
  gradUnit.addColorStop(0, "rgba(59,130,246,0.45)");
  gradUnit.addColorStop(1, "rgba(15,23,42,0)");

  const gradRevenue = ctxTrend.createLinearGradient(0, 0, 0, 260);
  gradRevenue.addColorStop(0, "rgba(16,185,129,0.45)");
  gradRevenue.addColorStop(1, "rgba(15,23,42,0)");

  chartTrend = new Chart(ctxTrend, {
    type: "line",
    data: {
      labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
      datasets: [
        {
          label: "Unit Terjual",
          data: [2,3,4,5,3,4,4,3,2,3,2,1],
          tension: 0.35,
          borderColor: cBlue,
          backgroundColor: gradUnit,
          fill: true,
          pointRadius: 0,
          pointHoverRadius: 4,
          borderWidth: 2.4,
        },
        {
          label: "Revenue (Miliar)",
          data: [1.1,1.4,1.9,2.4,1.7,2.1,2.2,1.8,1.4,1.7,1.3,0.9],
          tension: 0.35,
          borderColor: cEmerald,
          backgroundColor: gradRevenue,
          fill: true,
          pointRadius: 0,
          pointHoverRadius: 4,
          borderWidth: 2.4,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { font: { size: 11 } } },
        tooltip: {
          backgroundColor: "rgba(15,23,42,0.95)",
          borderColor: "rgba(148,163,184,0.6)",
          borderWidth: 1,
          padding: 8,
        },
      },
      interaction: {
        mode: "index",
        intersect: false,
      },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 11 } } },
        y: { grid: { color: "rgba(148,163,184,0.18)" }, ticks: { font: { size: 11 } } },
      },
    },
  });

  // TAKE UP RATE
  chartTakeup = new Chart(document.getElementById("chartTakeup"), {
    type: "bar",
    data: {
      labels: clusterData.map(c => c.code),
      datasets: [{
        label: "Take Up Rate (%)",
        data: clusterData.map(c => (c.sold / c.total) * 100),
        backgroundColor: cCyan,
        borderRadius: 10,
        maxBarThickness: 28,
      }],
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 11 } } },
        y: { grid: { color: "rgba(148,163,184,0.2)" }, ticks: { font: { size: 11 } } },
      },
    },
  });

  // FUNNEL
  chartFunnel = new Chart(document.getElementById("chartFunnel"), {
    type: "bar",
    data: {
      labels: ["Leads", "Visit", "Booking", "Closing"],
      datasets: [{
        data: [432, 210, 54, 36],
        backgroundColor: [cBlue, cBlueSoft, cAmber, cEmerald],
        borderRadius: 12,
        maxBarThickness: 32,
      }],
    },
    options: {
      indexAxis: "y",
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: "rgba(148,163,184,0.2)" }, ticks: { font: { size: 11 } } },
        y: { grid: { display: false }, ticks: { font: { size: 11 } } },
      },
    },
  });

  // CHANNEL PERFORMANCE
  chartChannel = new Chart(document.getElementById("chartChannel"), {
    type: "bar",
    data: {
      labels: ["IG Ads", "Google Ads", "Referral", "Walk-in"],
      datasets: [
        {
          label: "Leads",
          data: [160, 140, 80, 52],
          backgroundColor: cBlue,
          borderRadius: 10,
          maxBarThickness: 24,
        },
        {
          label: "Closing",
          data: [12, 9, 9, 6],
          backgroundColor: cEmerald,
          borderRadius: 10,
          maxBarThickness: 24,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { labels: { font: { size: 11 } } } },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 11 } } },
        y: { grid: { color: "rgba(148,163,184,0.2)" }, ticks: { font: { size: 11 } } },
      },
    },
  });

  // AGENTS
  chartAgents = new Chart(document.getElementById("chartAgents"), {
    type: "bar",
    data: {
      labels: agents.map(a => a.name),
      datasets: [{
        label: "Revenue (Miliar)",
        data: agents.map(a => a.revenue),
        backgroundColor: [cBlue, cCyan, cEmerald, cAmber, cPink],
        borderRadius: 10,
        maxBarThickness: 26,
      }],
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 11 } } },
        y: { grid: { color: "rgba(148,163,184,0.2)" }, ticks: { font: { size: 11 } } },
      },
    },
  });

  // PRICE SEGMENT
  chartPriceSegment = new Chart(document.getElementById("chartPriceSegment"), {
    type: "bar",
    data: {
      labels: ["<500jt", "500–750jt", "750jt–1M", ">1M"],
      datasets: [{
        label: "Unit Terjual",
        data: [6, 20, 8, 2],
        backgroundColor: [cSlate, cBlue, cCyan, cEmerald],
        borderRadius: 10,
        maxBarThickness: 26,
      }],
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 11 } } },
        y: { grid: { color: "rgba(148,163,184,0.2)" }, ticks: { font: { size: 11 } } },
      },
    },
  });

  // CITY
  chartCity = new Chart(document.getElementById("chartCity"), {
    type: "bar",
    data: {
      labels: ["Jakarta", "Bekasi", "Depok", "Bogor", "Tangerang"],
      datasets: [{
        label: "Unit Terjual",
        data: [11, 8, 7, 6, 4],
        backgroundColor: [cBlue, cCyan, cEmerald, cAmber, cPink],
        borderRadius: 10,
        maxBarThickness: 26,
      }],
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 11 } } },
        y: { grid: { color: "rgba(148,163,184,0.2)" }, ticks: { font: { size: 11 } } },
      },
    },
  });
}

// NAVIGATION antar section
const navItems = document.querySelectorAll(".nav-item");
const sections = {
  executive: document.getElementById("section-executive"),
  cluster:   document.getElementById("section-cluster"),
  funnel:    document.getElementById("section-funnel"),
  agents:    document.getElementById("section-agents"),
  profile:   document.getElementById("section-profile"),
};

navItems.forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.section;
    navItems.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    Object.values(sections).forEach(sec => sec.classList.remove("active"));
    sections[target].classList.add("active");
  });
});

// FILTERS → update KPI (dummy logic)
const filterPeriod  = document.getElementById("filter-period");
const filterCluster = document.getElementById("filter-cluster");
const filterChannel = document.getElementById("filter-channel");
const filterMode    = document.getElementById("filter-mode");
const btnReset      = document.getElementById("btn-reset");

function updateKPI() {
  const period  = filterPeriod.value;
  const cluster = filterCluster.value;
  const channel = filterChannel.value;
  const mode    = filterMode.value;

  const revenueEl      = document.getElementById("revenue-value");
  const unitsEl        = document.getElementById("units-value");
  const convEl         = document.getElementById("conv-value");
  const cancelEl       = document.getElementById("cancel-value");
  const revenueTrendEl = document.getElementById("revenue-trend");
  const takeupTrendEl  = document.getElementById("takeup-trend");

  let revenue      = 23.4;
  let units        = 36;
  let conv         = 12.4;
  let cancel       = 4.6;
  let revenueDelta = 18.2;
  let takeup       = 69;

  if (cluster === "B") {
    revenue = 10.6; units = 15; conv = 14.2; takeup = 78;
  } else if (cluster === "A") {
    revenue = 8.2; units = 13; conv = 11.8; takeup = 65;
  } else if (cluster === "C") {
    revenue = 4.6; units = 8; conv = 9.4; takeup = 57; cancel = 7.1;
  }

  if (channel === "Referral") conv += 3.5;
  else if (channel === "Walk-in") conv += 1.2;

  if (period === "2025Q1") {
    revenue *= 0.3;
    units = Math.round(units * 0.3);
  } else if (period === "2025Q2") {
    revenue *= 0.45;
    units = Math.round(units * 0.45);
  }

  // KPI text
  revenueEl.textContent = mode === "revenue"
    ? `Rp ${revenue.toFixed(1)}B`
    : `${units} Unit`;

  unitsEl.textContent  = `${units} Unit`;
  convEl.textContent   = `${conv.toFixed(1)}%`;
  cancelEl.textContent = `${cancel.toFixed(1)}%`;
  revenueTrendEl.textContent = `▲ ${revenueDelta.toFixed(1)}% vs last year`;
  takeupTrendEl.textContent  = `Take up rate ${takeup.toFixed(0)}%`;
}

[filterPeriod, filterCluster, filterChannel, filterMode].forEach(sel => {
  sel.addEventListener("change", updateKPI);
});

btnReset.addEventListener("click", () => {
  filterPeriod.value  = "YTD";
  filterCluster.value = "ALL";
  filterChannel.value = "ALL";
  filterMode.value    = "revenue";
  updateKPI();
});

// INIT
initCharts();
updateKPI();
// Global Chart.js style
Chart.defaults.color = "#e5e7eb";
Chart.defaults.borderColor = "rgba(148,163,184,0.35)";
Chart.defaults.font.family = '"Inter", system-ui, -apple-system, BlinkMacSystemFont, sans-serif';

const clusterData = [
  { name: "Cluster A – Magnolia", code: "A", total: 20, sold: 13, revenue: 8.2 },
  { name: "Cluster B – Serenade", code: "B", total: 18, sold: 15, revenue: 10.6 },
  { name: "Cluster C – Elmwood", code: "C", total: 14, sold: 8,  revenue: 4.6 },
];

const agents = [
  { name: "Andi", leads: 96, closing: 14, revenue: 4.2 },
  { name: "Sari", leads: 84, closing: 11, revenue: 3.5 },
  { name: "Budi", leads: 61, closing: 6,  revenue: 1.8 },
  { name: "Raka", leads: 72, closing: 4,  revenue: 1.1 },
  { name: "Maya", leads: 54, closing: 5,  revenue: 1.6 },
];

let chartCluster, chartPayment, chartTrend, chartTakeup, chartFunnel, chartChannel, chartAgents, chartPriceSegment, chartCity;

function initCharts() {
  const cBlue     = "rgba(59, 130, 246, 0.9)";
  const cBlueSoft = "rgba(59, 130, 246, 0.45)";
  const cCyan     = "rgba(56, 189, 248, 0.9)";
  const cEmerald  = "rgba(16, 185, 129, 0.9)";
  const cAmber    = "rgba(245, 158, 11, 0.9)";
  const cPink     = "rgba(236, 72, 153, 0.9)";
  const cSlate    = "rgba(148, 163, 184, 0.9)";
  const cRed      = "rgba(239, 68, 68, 0.9)"; // MERAH untuk KPR

  // CLUSTER BAR
  chartCluster = new Chart(document.getElementById("chartCluster"), {
    type: "bar",
    data: {
      labels: clusterData.map(c => c.code),
      datasets: [
        {
          label: "Revenue (Miliar)",
          data: clusterData.map(c => c.revenue),
          backgroundColor: cBlue,
          borderRadius: 10,
          maxBarThickness: 26,
        },
        {
          label: "Unit Terjual",
          data: clusterData.map(c => c.sold),
          backgroundColor: cCyan,
          borderRadius: 10,
          maxBarThickness: 26,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: { font: { size: 11 } },
        },
      },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 11 } } },
        y: { grid: { color: "rgba(148,163,184,0.2)" }, ticks: { font: { size: 11 } } },
      },
    },
  });

  // DONUT – KOMPOSISI PEMBAYARAN (KPR MERAH)
  chartPayment = new Chart(document.getElementById("chartPayment"), {
    type: "doughnut",
    data: {
      labels: ["Cash", "KPR", "Inhouse"],
      datasets: [{
        data: [18, 68, 14],
        // Cash = hijau, KPR = MERAH, Inhouse = kuning
        backgroundColor: [cEmerald, cRed, cAmber],
        borderWidth: 2,
        borderColor: "#020617",
        hoverOffset: 8,
        spacing: 3,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,   // penting supaya bulat
      aspectRatio: 1.4,
      cutout: "65%",
      rotation: -90,
      plugins: {
        legend: {
          position: "bottom",
          labels: { font: { size: 11 } },
        },
        tooltip: {
          backgroundColor: "rgba(15,23,42,0.95)",
          borderColor: "rgba(148,163,184,0.6)",
          borderWidth: 1,
          padding: 8,
        },
      },
      animation: {
        animateRotate: true,
        animateScale: true,
      },
    },
  });

  // TREND PENJUALAN BULANAN
  const ctxTrend = document.getElementById("chartTrend").getContext("2d");
  const gradUnit = ctxTrend.createLinearGradient(0, 0, 0, 260);
  gradUnit.addColorStop(0, "rgba(59,130,246,0.45)");
  gradUnit.addColorStop(1, "rgba(15,23,42,0)");

  const gradRevenue = ctxTrend.createLinearGradient(0, 0, 0, 260);
  gradRevenue.addColorStop(0, "rgba(16,185,129,0.45)");
  gradRevenue.addColorStop(1, "rgba(15,23,42,0)");

  chartTrend = new Chart(ctxTrend, {
    type: "line",
    data: {
      labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
      datasets: [
        {
          label: "Unit Terjual",
          data: [2,3,4,5,3,4,4,3,2,3,2,1],
          tension: 0.35,
          borderColor: cBlue,
          backgroundColor: gradUnit,
          fill: true,
          pointRadius: 0,
          pointHoverRadius: 4,
          borderWidth: 2.4,
        },
        {
          label: "Revenue (Miliar)",
          data: [1.1,1.4,1.9,2.4,1.7,2.1,2.2,1.8,1.4,1.7,1.3,0.9],
          tension: 0.35,
          borderColor: cEmerald,
          backgroundColor: gradRevenue,
          fill: true,
          pointRadius: 0,
          pointHoverRadius: 4,
          borderWidth: 2.4,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { font: { size: 11 } } },
        tooltip: {
          backgroundColor: "rgba(15,23,42,0.95)",
          borderColor: "rgba(148,163,184,0.6)",
          borderWidth: 1,
          padding: 8,
        },
      },
      interaction: {
        mode: "index",
        intersect: false,
      },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 11 } } },
        y: { grid: { color: "rgba(148,163,184,0.18)" }, ticks: { font: { size: 11 } } },
      },
    },
  });

  // TAKE UP RATE
  chartTakeup = new Chart(document.getElementById("chartTakeup"), {
    type: "bar",
    data: {
      labels: clusterData.map(c => c.code),
      datasets: [{
        label: "Take Up Rate (%)",
        data: clusterData.map(c => (c.sold / c.total) * 100),
        backgroundColor: cCyan,
        borderRadius: 10,
        maxBarThickness: 28,
      }],
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 11 } } },
        y: { grid: { color: "rgba(148,163,184,0.2)" }, ticks: { font: { size: 11 } } },
      },
    },
  });

  // FUNNEL
  chartFunnel = new Chart(document.getElementById("chartFunnel"), {
    type: "bar",
    data: {
      labels: ["Leads", "Visit", "Booking", "Closing"],
      datasets: [{
        data: [432, 210, 54, 36],
        backgroundColor: [cBlue, cBlueSoft, cAmber, cEmerald],
        borderRadius: 12,
        maxBarThickness: 32,
      }],
    },
    options: {
      indexAxis: "y",
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: "rgba(148,163,184,0.2)" }, ticks: { font: { size: 11 } } },
        y: { grid: { display: false }, ticks: { font: { size: 11 } } },
      },
    },
  });

  // CHANNEL PERFORMANCE
  chartChannel = new Chart(document.getElementById("chartChannel"), {
    type: "bar",
    data: {
      labels: ["IG Ads", "Google Ads", "Referral", "Walk-in"],
      datasets: [
        {
          label: "Leads",
          data: [160, 140, 80, 52],
          backgroundColor: cBlue,
          borderRadius: 10,
          maxBarThickness: 24,
        },
        {
          label: "Closing",
          data: [12, 9, 9, 6],
          backgroundColor: cEmerald,
          borderRadius: 10,
          maxBarThickness: 24,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { labels: { font: { size: 11 } } } },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 11 } } },
        y: { grid: { color: "rgba(148,163,184,0.2)" }, ticks: { font: { size: 11 } } },
      },
    },
  });

  // AGENTS
  chartAgents = new Chart(document.getElementById("chartAgents"), {
    type: "bar",
    data: {
      labels: agents.map(a => a.name),
      datasets: [{
        label: "Revenue (Miliar)",
        data: agents.map(a => a.revenue),
        backgroundColor: [cBlue, cCyan, cEmerald, cAmber, cPink],
        borderRadius: 10,
        maxBarThickness: 26,
      }],
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 11 } } },
        y: { grid: { color: "rgba(148,163,184,0.2)" }, ticks: { font: { size: 11 } } },
      },
    },
  });

  // PRICE SEGMENT
  chartPriceSegment = new Chart(document.getElementById("chartPriceSegment"), {
    type: "bar",
    data: {
      labels: ["<500jt", "500–750jt", "750jt–1M", ">1M"],
      datasets: [{
        label: "Unit Terjual",
        data: [6, 20, 8, 2],
        backgroundColor: [cSlate, cBlue, cCyan, cEmerald],
        borderRadius: 10,
        maxBarThickness: 26,
      }],
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 11 } } },
        y: { grid: { color: "rgba(148,163,184,0.2)" }, ticks: { font: { size: 11 } } },
      },
    },
  });

  // CITY
  chartCity = new Chart(document.getElementById("chartCity"), {
    type: "bar",
    data: {
      labels: ["Jakarta", "Bekasi", "Depok", "Bogor", "Tangerang"],
      datasets: [{
        label: "Unit Terjual",
        data: [11, 8, 7, 6, 4],
        backgroundColor: [cBlue, cCyan, cEmerald, cAmber, cPink],
        borderRadius: 10,
        maxBarThickness: 26,
      }],
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 11 } } },
        y: { grid: { color: "rgba(148,163,184,0.2)" }, ticks: { font: { size: 11 } } },
      },
    },
  });
}

// NAVIGATION antar section
const navItems = document.querySelectorAll(".nav-item");
const sections = {
  executive: document.getElementById("section-executive"),
  cluster:   document.getElementById("section-cluster"),
  funnel:    document.getElementById("section-funnel"),
  agents:    document.getElementById("section-agents"),
  profile:   document.getElementById("section-profile"),
};

navItems.forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.section;
    navItems.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    Object.values(sections).forEach(sec => sec.classList.remove("active"));
    sections[target].classList.add("active");
  });
});

// FILTERS → update KPI (dummy logic)
const filterPeriod  = document.getElementById("filter-period");
const filterCluster = document.getElementById("filter-cluster");
const filterChannel = document.getElementById("filter-channel");
const filterMode    = document.getElementById("filter-mode");
const btnReset      = document.getElementById("btn-reset");

function updateKPI() {
  const period  = filterPeriod.value;
  const cluster = filterCluster.value;
  const channel = filterChannel.value;
  const mode    = filterMode.value;

  const revenueEl      = document.getElementById("revenue-value");
  const unitsEl        = document.getElementById("units-value");
  const convEl         = document.getElementById("conv-value");
  const cancelEl       = document.getElementById("cancel-value");
  const revenueTrendEl = document.getElementById("revenue-trend");
  const takeupTrendEl  = document.getElementById("takeup-trend");

  let revenue      = 23.4;
  let units        = 36;
  let conv         = 12.4;
  let cancel       = 4.6;
  let revenueDelta = 18.2;
  let takeup       = 69;

  if (cluster === "B") {
    revenue = 10.6; units = 15; conv = 14.2; takeup = 78;
  } else if (cluster === "A") {
    revenue = 8.2; units = 13; conv = 11.8; takeup = 65;
  } else if (cluster === "C") {
    revenue = 4.6; units = 8; conv = 9.4; takeup = 57; cancel = 7.1;
  }

  if (channel === "Referral") conv += 3.5;
  else if (channel === "Walk-in") conv += 1.2;

  if (period === "2025Q1") {
    revenue *= 0.3;
    units = Math.round(units * 0.3);
  } else if (period === "2025Q2") {
    revenue *= 0.45;
    units = Math.round(units * 0.45);
  }

  // KPI text
  revenueEl.textContent = mode === "revenue"
    ? `Rp ${revenue.toFixed(1)}B`
    : `${units} Unit`;

  unitsEl.textContent  = `${units} Unit`;
  convEl.textContent   = `${conv.toFixed(1)}%`;
  cancelEl.textContent = `${cancel.toFixed(1)}%`;
  revenueTrendEl.textContent = `▲ ${revenueDelta.toFixed(1)}% vs last year`;
  takeupTrendEl.textContent  = `Take up rate ${takeup.toFixed(0)}%`;
}

[filterPeriod, filterCluster, filterChannel, filterMode].forEach(sel => {
  sel.addEventListener("change", updateKPI);
});

btnReset.addEventListener("click", () => {
  filterPeriod.value  = "YTD";
  filterCluster.value = "ALL";
  filterChannel.value = "ALL";
  filterMode.value    = "revenue";
  updateKPI();
});

// EXPORT SCREENSHOT
const btnExport = document.getElementById("btn-export");

if (btnExport) {
  btnExport.addEventListener("click", () => {
    const target = document.querySelector(".app");
    if (!target) return;

    const originalText = btnExport.innerHTML;
    btnExport.disabled = true;
    btnExport.innerHTML = `<span class="icon">⏳</span><span>Generating...</span>`;

    html2canvas(target, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#020617",
    }).then(canvas => {
      const link = document.createElement("a");
      link.download = "permata-cluster-dashboard.png";
      link.href = canvas.toDataURL("image/png");
      link.click();

      btnExport.disabled = false;
      btnExport.innerHTML = originalText;
    }).catch(err => {
      console.error("Screenshot error:", err);
      btnExport.disabled = false;
      btnExport.innerHTML = originalText;
      alert("Gagal generate screenshot, coba ulang lagi ya.");
    });
  });
}

// INIT
initCharts();
updateKPI();
