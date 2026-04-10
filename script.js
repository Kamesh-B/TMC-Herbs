const metrics = [
  { label: "Estimated outages", value: "12,840", note: "Peak between 8:10 PM and 11:30 PM" },
  { label: "Customers at risk", value: "48,600", note: "Across 4 service sections" },
  { label: "Crews to mobilize", value: "17", note: "11 line, 4 tree, 1 network, 1 troubleshooter" },
  { label: "Critical facilities", value: "26", note: "Hospitals, water, and shelters downstream" }
];

const territories = [
  {
    id: "north-center",
    code: "NC",
    name: "North Center",
    label: "North Center",
    area: "North Memphis / Millington / Raleigh",
    center: [35.272, -90.060],
    polygon: [
      [35.390, -90.290],
      [35.390, -89.905],
      [35.245, -89.885],
      [35.155, -89.980],
      [35.155, -90.290]
    ],
    outages: 2860,
    customersAtRisk: 11000,
    probability: 73,
    highRiskCircuits: 9,
    etr: "4.5-7.0 hr",
    crewDemand: 4,
    availableCrews: 4,
    criticalFacilities: 6,
    color: "#2f9e44",
    summary: "Wind exposure is highest along the northern feeders and wooded laterals near Raleigh, Frayser, and the northern Midtown ties.",
    troubleSpots: ["Northwest feeders 12 and 18", "Millington lateral", "Austin Peay tree corridor"]
  },
  {
    id: "brunswick-center",
    code: "BC",
    name: "Brunswick Center",
    label: "Brunswick Center",
    area: "Bartlett / Cordova / East Memphis northeast",
    center: [35.245, -89.765],
    polygon: [
      [35.390, -89.905],
      [35.390, -89.650],
      [35.155, -89.650],
      [35.155, -89.980],
      [35.245, -89.885]
    ],
    outages: 4060,
    customersAtRisk: 15300,
    probability: 85,
    highRiskCircuits: 12,
    etr: "5.5-9.0 hr",
    crewDemand: 5,
    availableCrews: 5,
    criticalFacilities: 7,
    color: "#d94f9c",
    summary: "The highest modeled gust corridor crosses the northeast service area, the East Memphis ties, and older overhead spans.",
    troubleSpots: ["Brunswick ridge circuit group", "Airline Road pole line", "I-40 vegetation fault cluster"]
  },
  {
    id: "south-center",
    code: "SC",
    name: "South Center",
    label: "South Center",
    area: "Southwest Memphis / Downtown / Midtown",
    center: [35.060, -90.120],
    polygon: [
      [35.155, -90.290],
      [35.155, -89.980],
      [35.080, -89.965],
      [35.000, -90.010],
      [35.000, -90.290]
    ],
    outages: 2390,
    customersAtRisk: 9700,
    probability: 60,
    highRiskCircuits: 6,
    etr: "3.5-6.5 hr",
    crewDemand: 4,
    availableCrews: 4,
    criticalFacilities: 5,
    color: "#7d4ac9",
    summary: "Lower outage probability, but access slows down near low-lying feeder roads, the downtown underground transition points, and river-adjacent circuits after heavy rainfall.",
    troubleSpots: ["Industrial park tie switches", "Southwest recloser bank", "Downtown network transition points"]
  },
  {
    id: "hickory-hill-center",
    code: "HH",
    name: "Hickory Hill Center",
    label: "Hickory Hill Center",
    area: "Hickory Hill / Germantown / Collierville south",
    center: [35.060, -89.770],
    polygon: [
      [35.155, -89.980],
      [35.155, -89.650],
      [35.000, -89.650],
      [35.000, -90.010],
      [35.080, -89.965]
    ],
    outages: 3530,
    customersAtRisk: 12600,
    probability: 80,
    highRiskCircuits: 10,
    etr: "4.0-8.0 hr",
    crewDemand: 4,
    availableCrews: 4,
    criticalFacilities: 8,
    color: "#e59a19",
    summary: "Wind, lightning, and dense customer pockets overlap around the southeast distribution spine and the expanded inner-east load now covered from Hickory Hill.",
    troubleSpots: ["Hickory Hill distribution spine", "Feeder H-9 capacitor bank", "Shelby Drive customer pocket"]
  }
];

const shelbyCountyBoundary = [
  [35.390, -90.290],
  [35.390, -89.650],
  [35.000, -89.650],
  [35.000, -90.290]
];

const severityWindows = [
  { window: "Next 6 hours", level: "High", detail: "Gust front approaches Memphis. Most likely escalation begins after 8:10 PM CT.", value: 74 },
  { window: "Next 12 hours", level: "Severe", detail: "Peak wind, lightning, and saturated soil overlap from 8:10 PM to 11:30 PM CT.", value: 88 },
  { window: "Next 24 hours", level: "Moderate", detail: "Backside winds keep restoration access constrained through the morning shift.", value: 55 }
];

const circuits = [
  {
    id: "E-09",
    territoryId: "brunswick-center",
    probability: 92,
    customers: 2160,
    driver: "Peak wind corridor",
    etr: "6-9 hr",
    path: [[35.225, -89.900], [35.200, -89.850], [35.165, -89.795], [35.125, -89.750]]
  },
  {
    id: "A-17",
    territoryId: "hickory-hill-center",
    probability: 88,
    customers: 1840,
    driver: "Tree strike and crosswind exposure",
    etr: "5-8 hr",
    path: [[35.095, -89.940], [35.065, -89.890], [35.040, -89.835], [35.020, -89.790]]
  },
  {
    id: "C-22",
    territoryId: "brunswick-center",
    probability: 76,
    customers: 1490,
    driver: "Wet soil and leaning poles",
    etr: "4-7 hr",
    path: [[35.165, -89.970], [35.180, -89.910], [35.185, -89.860], [35.170, -89.815]]
  },
  {
    id: "G-14",
    territoryId: "hickory-hill-center",
    probability: 69,
    customers: 1180,
    driver: "Roadside vegetation",
    etr: "4-6 hr",
    path: [[35.055, -89.945], [35.035, -89.890], [35.020, -89.820], [35.010, -89.720]]
  },
  {
    id: "D-11",
    territoryId: "north-center",
    probability: 64,
    customers: 980,
    driver: "Lightning faults",
    etr: "3-6 hr",
    path: [[35.200, -90.100], [35.185, -90.060], [35.165, -90.020], [35.135, -89.985]]
  },
  {
    id: "F-31",
    territoryId: "south-center",
    probability: 61,
    customers: 860,
    driver: "Underground transition faults",
    etr: "3-7 hr",
    path: [[35.160, -90.080], [35.145, -90.045], [35.125, -90.010], [35.105, -89.985]]
  }
];

const crewDemand = [
  { type: "Line crews", demand: 11, available: 12 },
  { type: "Tree crews", demand: 4, available: 5 },
  { type: "Network crews", demand: 1, available: 1 },
  { type: "Troubleshooters", demand: 1, available: 1 }
];

const facilitySummary = [
  { type: "Hospitals", count: 7, note: "Trauma, regional clinic, emergency departments" },
  { type: "Water", count: 6, note: "Pumping, lift, and booster stations" },
  { type: "Telecom", count: 5, note: "Switching sites and fiber huts" },
  { type: "Shelters", count: 8, note: "Emergency shelters and assisted living backup load" }
];

const criticalFacilities = [
  { name: "Regional Hospital", type: "hospital", code: "H", latlng: [35.138, -89.893] },
  { name: "Memphis Trauma Center", type: "hospital", code: "H", latlng: [35.058, -89.869] },
  { name: "Downtown Shelter Cluster", type: "shelter", code: "S", latlng: [35.150, -90.053] },
  { name: "North Pump Station", type: "water", code: "W", latlng: [35.190, -90.030] },
  { name: "South Lift Station", type: "water", code: "W", latlng: [35.020, -90.092] },
  { name: "Fiber Hub East", type: "telecom", code: "T", latlng: [35.111, -89.812] },
  { name: "Brunswick Emergency Shelter", type: "shelter", code: "S", latlng: [35.210, -89.835] }
];

const crewStaging = [
  { name: "North staging", crews: 4, latlng: [35.169, -90.055] },
  { name: "Central yard", crews: 6, latlng: [35.124, -90.020] },
  { name: "East staging", crews: 5, latlng: [35.091, -89.835] },
  { name: "South staging", crews: 2, latlng: [35.025, -90.120] }
];

const weeklyScenarioTemplates = [
  {
    tone: "low",
    severityLabel: "Low",
    icon: "cloud",
    incidents: 59,
    estimatedOutages: 1280,
    customersAtRisk: 4600,
    crewsToMobilize: 5,
    criticalFacilities: 8,
    low: 59,
    high: 81,
    windAvg: 7,
    windGust: 18,
    precip: 0.0,
    window: "11:00 AM - 4:00 PM",
    summary: "Carryover trouble calls and scattered vegetation cleanup.",
    crewBreakdown: [
      { type: "Line crews", demand: 3, available: 4 },
      { type: "Tree crews", demand: 1, available: 2 },
      { type: "Network crews", demand: 0, available: 1 },
      { type: "Troubleshooters", demand: 1, available: 1 }
    ],
    severityWindows: [
      { window: "Next 6 hours", level: "Low", detail: "Only isolated nuisance calls remain with dry road access across the service territory.", value: 22 },
      { window: "Next 12 hours", level: "Low", detail: "No organized severe signal. Trouble response is mostly cleanup and single-device replacement.", value: 28 },
      { window: "Next 24 hours", level: "Low", detail: "Restoration backlog continues to shrink with minimal new weather-driven exposure.", value: 18 }
    ],
    territoryBias: {
      "north-center": 0.95,
      "brunswick-center": 1.06,
      "south-center": 0.82,
      "hickory-hill-center": 0.90
    },
    probabilityScale: 0.42,
    highRiskScale: 0.40,
    etrScale: 0.58,
    radarSequence: [
      { label: "+0 hr: light echoes over north Shelby", center: [35.205, -90.030], intensity: 0.32, phase: 0.15 },
      { label: "+3 hr: isolated showers drift east", center: [35.185, -89.975], intensity: 0.36, phase: 0.50 },
      { label: "+6 hr: broken returns near Midtown", center: [35.145, -89.940], intensity: 0.33, phase: 0.85 },
      { label: "+9 hr: weak showers over east Memphis", center: [35.120, -89.885], intensity: 0.28, phase: 1.20 },
      { label: "+12 hr: radar clearing west to east", center: [35.090, -89.840], intensity: 0.22, phase: 1.55 }
    ]
  },
  {
    tone: "elevated",
    severityLabel: "Elevated",
    icon: "storm",
    incidents: 249,
    estimatedOutages: 7160,
    customersAtRisk: 26800,
    crewsToMobilize: 12,
    criticalFacilities: 18,
    low: 62,
    high: 84,
    windAvg: 12,
    windGust: 42,
    precip: 0.3,
    window: "4:00 PM - 10:00 PM",
    summary: "Storm line builds west of the city with rising feeder exposure east of I-240.",
    crewBreakdown: [
      { type: "Line crews", demand: 8, available: 9 },
      { type: "Tree crews", demand: 2, available: 3 },
      { type: "Network crews", demand: 1, available: 1 },
      { type: "Troubleshooters", demand: 1, available: 1 }
    ],
    severityWindows: [
      { window: "Next 6 hours", level: "Elevated", detail: "A developing west-to-east convective line increases fault exposure on overhead feeders.", value: 54 },
      { window: "Next 12 hours", level: "High", detail: "Feeder stress builds after 4 PM with stronger gust transfer into the eastern load pocket.", value: 69 },
      { window: "Next 24 hours", level: "Moderate", detail: "Residual lightning and wet-ground trouble calls continue into the overnight shift.", value: 43 }
    ],
    territoryBias: {
      "north-center": 0.92,
      "brunswick-center": 1.18,
      "south-center": 0.88,
      "hickory-hill-center": 1.12
    },
    probabilityScale: 0.74,
    highRiskScale: 0.72,
    etrScale: 0.86,
    radarSequence: [
      { label: "+0 hr: line entering southwest Shelby", center: [35.020, -90.220], intensity: 0.64, phase: 0.15 },
      { label: "+3 hr: organized band crossing south Memphis", center: [35.080, -90.110], intensity: 0.82, phase: 0.65 },
      { label: "+6 hr: stronger returns over Midtown", center: [35.130, -90.000], intensity: 0.94, phase: 1.15 },
      { label: "+9 hr: line lifts toward Brunswick", center: [35.195, -89.860], intensity: 0.78, phase: 1.65 },
      { label: "+12 hr: trailing rain east of Memphis", center: [35.240, -89.740], intensity: 0.58, phase: 2.15 }
    ]
  },
  {
    tone: "severe",
    severityLabel: "Severe",
    icon: "storm",
    incidents: 479,
    estimatedOutages: 22350,
    customersAtRisk: 48600,
    crewsToMobilize: 17,
    criticalFacilities: 26,
    low: 64,
    high: 87,
    windAvg: 17,
    windGust: 58,
    precip: 1.1,
    window: "3:00 PM - 11:00 PM",
    summary: "Most intense citywide stress window with high outage clustering and slower restoration access.",
    crewBreakdown: [
      { type: "Line crews", demand: 11, available: 12 },
      { type: "Tree crews", demand: 4, available: 5 },
      { type: "Network crews", demand: 1, available: 1 },
      { type: "Troubleshooters", demand: 1, available: 1 }
    ],
    severityWindows: [
      { window: "Next 6 hours", level: "High", detail: "Gust front approaches Memphis. Most likely escalation begins after 8:10 PM CT.", value: 74 },
      { window: "Next 12 hours", level: "Severe", detail: "Peak wind, lightning, and saturated soil overlap from 8:10 PM to 11:30 PM CT.", value: 88 },
      { window: "Next 24 hours", level: "Moderate", detail: "Backside winds keep restoration access constrained through the morning shift.", value: 55 }
    ],
    territoryBias: {
      "north-center": 1.00,
      "brunswick-center": 1.20,
      "south-center": 0.86,
      "hickory-hill-center": 1.23
    },
    probabilityScale: 1.00,
    highRiskScale: 1.00,
    etrScale: 1.00,
    radarSequence: [
      { label: "+0 hr: leading edge entering southwest Shelby", center: [35.015, -90.245], intensity: 0.84, phase: 0.0 },
      { label: "+3 hr: bowing line crossing South and Midtown", center: [35.075, -90.115], intensity: 1.02, phase: 0.9 },
      { label: "+6 hr: strongest core over Memphis", center: [35.135, -89.980], intensity: 1.16, phase: 1.8 },
      { label: "+9 hr: line lifting toward Brunswick", center: [35.200, -89.820], intensity: 0.96, phase: 2.7 },
      { label: "+12 hr: trailing rain near the east Shelby line", center: [35.260, -89.700], intensity: 0.70, phase: 3.6 }
    ]
  },
  {
    tone: "watch",
    severityLabel: "Moderate",
    icon: "rain",
    incidents: 188,
    estimatedOutages: 9640,
    customersAtRisk: 28400,
    crewsToMobilize: 11,
    criticalFacilities: 15,
    low: 60,
    high: 83,
    windAvg: 11,
    windGust: 33,
    precip: 0.4,
    window: "7:00 AM - 3:00 PM",
    summary: "Lingering showers and wet-ground faults keep secondary outages active.",
    crewBreakdown: [
      { type: "Line crews", demand: 7, available: 8 },
      { type: "Tree crews", demand: 2, available: 3 },
      { type: "Network crews", demand: 1, available: 1 },
      { type: "Troubleshooters", demand: 1, available: 1 }
    ],
    severityWindows: [
      { window: "Next 6 hours", level: "Moderate", detail: "Residual rain bands continue producing scattered lockout and reclose activity.", value: 52 },
      { window: "Next 12 hours", level: "Moderate", detail: "Wet-ground trouble calls remain concentrated across east and south service sections.", value: 47 },
      { window: "Next 24 hours", level: "Low", detail: "Storm-driven escalation fades as crews work through secondary outages and cleanup.", value: 31 }
    ],
    territoryBias: {
      "north-center": 1.02,
      "brunswick-center": 1.10,
      "south-center": 0.94,
      "hickory-hill-center": 1.04
    },
    probabilityScale: 0.66,
    highRiskScale: 0.64,
    etrScale: 0.82,
    radarSequence: [
      { label: "+0 hr: trailing showers over north Memphis", center: [35.200, -90.060], intensity: 0.60, phase: 0.20 },
      { label: "+3 hr: broken rain bands over Midtown", center: [35.150, -89.990], intensity: 0.66, phase: 0.75 },
      { label: "+6 hr: wet-weather returns over east Memphis", center: [35.120, -89.900], intensity: 0.62, phase: 1.30 },
      { label: "+9 hr: showers thinning across southeast Shelby", center: [35.085, -89.830], intensity: 0.52, phase: 1.85 },
      { label: "+12 hr: lingering cells exit east", center: [35.050, -89.760], intensity: 0.40, phase: 2.40 }
    ]
  },
  {
    tone: "recovery",
    severityLabel: "Recovery",
    icon: "cloud",
    incidents: 88,
    estimatedOutages: 3150,
    customersAtRisk: 10900,
    crewsToMobilize: 6,
    criticalFacilities: 7,
    low: 63,
    high: 85,
    windAvg: 8,
    windGust: 22,
    precip: 0.1,
    window: "9:00 AM - 1:00 PM",
    summary: "Restoration-focused day with smaller pockets remaining in east and north sectors.",
    crewBreakdown: [
      { type: "Line crews", demand: 4, available: 5 },
      { type: "Tree crews", demand: 1, available: 2 },
      { type: "Network crews", demand: 0, available: 1 },
      { type: "Troubleshooters", demand: 1, available: 1 }
    ],
    severityWindows: [
      { window: "Next 6 hours", level: "Low", detail: "Only isolated cleanup-related interruptions remain with strong crew availability.", value: 24 },
      { window: "Next 12 hours", level: "Low", detail: "Radar is mostly clear and outage activity trends down through the midday shift.", value: 18 },
      { window: "Next 24 hours", level: "Low", detail: "System conditions return closer to normal operating posture.", value: 12 }
    ],
    territoryBias: {
      "north-center": 1.05,
      "brunswick-center": 1.00,
      "south-center": 0.90,
      "hickory-hill-center": 0.96
    },
    probabilityScale: 0.48,
    highRiskScale: 0.45,
    etrScale: 0.64,
    radarSequence: [
      { label: "+0 hr: isolated showers near the county line", center: [35.220, -90.010], intensity: 0.24, phase: 0.10 },
      { label: "+3 hr: weak returns over north Memphis", center: [35.185, -89.960], intensity: 0.26, phase: 0.45 },
      { label: "+6 hr: stray cells near east Memphis", center: [35.145, -89.900], intensity: 0.23, phase: 0.80 },
      { label: "+9 hr: radar clearing across Shelby", center: [35.110, -89.845], intensity: 0.18, phase: 1.15 },
      { label: "+12 hr: quiet finish to the day", center: [35.080, -89.800], intensity: 0.14, phase: 1.50 }
    ]
  }
];

const radarTrackPath = [
  [35.000, -90.290],
  [35.065, -90.175],
  [35.125, -90.040],
  [35.185, -89.880],
  [35.270, -89.650]
];

const radarScenarioSeed = Math.random() * 1000;
const radarBandConfigs = [
  {
    color: "#41c94f",
    opacity: 0.29,
    minOpacity: 0.20,
    maxOpacity: 0.40,
    cells: [
      {
        offset: [0.020, -0.050],
        latRadius: 0.050,
        lngRadius: 0.100,
        rotation: 24,
        jaggedness: 0.34,
        points: 24,
        seed: 11,
        fragments: [
          { offset: [0.060, 0.078], latRadius: 0.022, lngRadius: 0.044, rotation: 14, points: 16, seed: 111 },
          { offset: [-0.045, -0.088], latRadius: 0.018, lngRadius: 0.038, rotation: 28, points: 14, seed: 131 }
        ]
      },
      {
        offset: [0.090, 0.058],
        latRadius: 0.040,
        lngRadius: 0.070,
        rotation: 34,
        jaggedness: 0.37,
        points: 22,
        seed: 17,
        fragments: [
          { offset: [0.018, 0.070], latRadius: 0.016, lngRadius: 0.028, rotation: 10, points: 12, seed: 171 }
        ]
      }
    ]
  },
  {
    color: "#d7db2b",
    opacity: 0.38,
    minOpacity: 0.24,
    maxOpacity: 0.48,
    cells: [
      {
        offset: [0.010, -0.010],
        latRadius: 0.040,
        lngRadius: 0.082,
        rotation: 24,
        jaggedness: 0.38,
        points: 22,
        seed: 23,
        fragments: [
          { offset: [0.052, 0.055], latRadius: 0.020, lngRadius: 0.038, rotation: 18, points: 14, seed: 231 },
          { offset: [-0.040, -0.060], latRadius: 0.016, lngRadius: 0.032, rotation: 36, points: 12, seed: 251 }
        ]
      },
      {
        offset: [0.062, 0.082],
        latRadius: 0.028,
        lngRadius: 0.052,
        rotation: 30,
        jaggedness: 0.42,
        points: 18,
        seed: 29,
        fragments: []
      }
    ]
  },
  {
    color: "#ef8b1e",
    opacity: 0.46,
    minOpacity: 0.27,
    maxOpacity: 0.58,
    cells: [
      {
        offset: [0.002, 0.020],
        latRadius: 0.028,
        lngRadius: 0.056,
        rotation: 24,
        jaggedness: 0.44,
        points: 18,
        seed: 37,
        fragments: [
          { offset: [-0.032, -0.048], latRadius: 0.016, lngRadius: 0.030, rotation: 34, points: 12, seed: 371 }
        ]
      },
      {
        offset: [0.032, 0.096],
        latRadius: 0.022,
        lngRadius: 0.036,
        rotation: 22,
        jaggedness: 0.48,
        points: 14,
        seed: 41,
        fragments: []
      }
    ]
  },
  {
    color: "#d63d38",
    opacity: 0.54,
    minOpacity: 0.31,
    maxOpacity: 0.66,
    cells: [
      {
        offset: [0.004, 0.028],
        latRadius: 0.018,
        lngRadius: 0.034,
        rotation: 24,
        jaggedness: 0.50,
        points: 14,
        seed: 47,
        fragments: []
      },
      {
        offset: [-0.030, -0.030],
        latRadius: 0.015,
        lngRadius: 0.028,
        rotation: 30,
        jaggedness: 0.54,
        points: 12,
        seed: 53,
        fragments: []
      }
    ]
  }
];

const radarFrames = [
  radarFrame("+0 hr: leading edge entering southwest Shelby", [35.015, -90.245], 0.84, 0.0),
  radarFrame("+3 hr: bowing line crossing South and Midtown", [35.075, -90.115], 1.02, 0.9),
  radarFrame("+6 hr: strongest core over Memphis", [35.135, -89.980], 1.16, 1.8),
  radarFrame("+9 hr: line lifting toward Brunswick", [35.200, -89.820], 0.96, 2.7),
  radarFrame("+12 hr: trailing rain near the east Shelby line", [35.260, -89.700], 0.70, 3.6)
];

const radarWindowHours = 12;
let forecastAsOfDate = new Date();

const elements = {
  forecastAsOf: document.getElementById("forecastAsOf"),
  kpiGrid: document.getElementById("kpiGrid"),
  weeklyForecast: document.getElementById("weeklyForecast"),
  mapFallback: document.getElementById("mapFallback"),
  radarClock: document.getElementById("radarClock"),
  radarInfoButton: document.getElementById("radarInfoButton"),
  radarTooltipCard: document.getElementById("radarTooltipCard"),
  playBarToggle: document.getElementById("playBarToggle"),
  playBarIcon: document.getElementById("playBarIcon"),
  playCurrentTime: document.getElementById("playCurrentTime"),
  playCurrentDay: document.getElementById("playCurrentDay"),
  playEndTime: document.getElementById("playEndTime"),
  playNowText: document.getElementById("playNowText"),
  playBarProgress: document.getElementById("playBarProgress"),
  playBarThumb: document.getElementById("playBarThumb"),
  radarScrubber: document.getElementById("radarScrubber"),
  territoryTitle: document.getElementById("territoryTitle"),
  territoryRisk: document.getElementById("territoryRisk"),
  territoryList: document.getElementById("territoryList"),
  territoryDetails: document.getElementById("territoryDetails"),
  severityGrid: document.getElementById("severityGrid"),
  probabilityRows: document.getElementById("probabilityRows"),
  crewRows: document.getElementById("crewRows"),
  circuitRows: document.getElementById("circuitRows"),
  facilityRows: document.getElementById("facilityRows"),
  etrRows: document.getElementById("etrRows")
};

let map;
let selectedTerritoryId = territories[1].id;
const layerGroups = {};
const territoryLayers = {};
const territoryMarkers = {};
const radarLayers = [];
const radarAnimationMs = 18000;
const radarPlayer = { progress: 0, isPlaying: true, lastTimestamp: 0 };
let radarAnimationStarted = false;
const baseOutageTotal = territories.reduce((sum, territory) => sum + territory.outages, 0);
const baseRiskTotal = territories.reduce((sum, territory) => sum + territory.customersAtRisk, 0);
const baseCriticalTotal = facilitySummary.reduce((sum, facility) => sum + facility.count, 0);
const weeklyForecastDays = buildWeeklyForecastDays(forecastAsOfDate);
let selectedForecastDayIndex = 2;
let activeTerritories = [];
let activeSeverityWindows = [];
let activeCircuits = [];
let activeCrewDemand = [];
let activeFacilitySummary = [];
let activeCrewStaging = [];
let activeRadarFrames = radarFrames;

applyForecastDay(selectedForecastDayIndex, { render: false, resetRadar: true });

renderForecastTime();
renderMetrics();
renderWeeklyForecast();
renderTerritoryButtons();
renderSeverity();
renderProbabilityRows();
renderCrewRows();
renderCircuitRows();
renderFacilityRows();
renderEtrRows();
setupRadarControls();
selectTerritory(selectedTerritoryId, { pan: false });
initMap();

function renderForecastTime() {
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/Chicago",
    timeZoneName: "short"
  });

  elements.forecastAsOf.textContent = formatter.format(forecastAsOfDate);
}

function renderMetrics() {
  const day = getSelectedForecastDay();
  const crewNote = day.crewBreakdown
    .map((crew) => `${crew.demand} ${crew.type.toLowerCase().replace(" crews", "").replace("troubleshooters", "troubleshooter")}`)
    .join(", ");
  const items = [
    { label: "Estimated outages", value: formatNumber(day.estimatedOutages), note: `Peak during ${day.window}` },
    { label: "Customers at risk", value: formatNumber(day.customersAtRisk), note: "Across 4 service sections" },
    { label: "Crews to mobilize", value: String(day.crewsToMobilize), note: crewNote },
    { label: "Critical facilities", value: String(day.criticalFacilities), note: "Hospitals, water, telecom, and shelters downstream" }
  ];

  elements.kpiGrid.innerHTML = items.map((metric) => `
    <article class="kpi-card">
      <p class="kpi-label">${metric.label}</p>
      <p class="kpi-value">${metric.value}</p>
      <p class="kpi-note">${metric.note}</p>
    </article>
  `).join("");
}

function renderWeeklyForecast() {
  elements.weeklyForecast.innerHTML = weeklyForecastDays.map((day, index) => `
    <button
      class="forecast-day-card tone-${day.tone} ${index === selectedForecastDayIndex ? "is-active" : "is-inactive"}"
      type="button"
      data-forecast-day="${index}"
      aria-pressed="${String(index === selectedForecastDayIndex)}"
    >
      <div class="forecast-day-top">
        <div class="forecast-day-date">
          <code>${formatForecastDate(day.date)}</code>
          <strong>${formatForecastWeekday(day.date)}</strong>
        </div>
        <span class="forecast-day-chip">${day.severityLabel}</span>
      </div>

      <div class="forecast-day-stats">
        <div class="forecast-day-stat">
          <span>Incidents</span>
          <strong>${formatNumber(day.incidents)}</strong>
        </div>
        <div class="forecast-day-stat">
          <span>Customers</span>
          <strong>${formatNumber(day.estimatedOutages)}</strong>
        </div>
      </div>

      <div class="forecast-day-weather">
        ${forecastWeatherIcon(day.icon)}
        <div class="forecast-day-weather-grid">
          <div>
            <span>Temp.</span>
            <strong>${day.low}° / ${day.high}°</strong>
          </div>
          <div>
            <span>Wind</span>
            <strong>${day.windAvg} avg.</strong>
          </div>
          <div>
            <span>Prcp.</span>
            <strong>${day.precip.toFixed(1)} in.</strong>
          </div>
          <div>
            <span>Gusts</span>
            <strong>${day.windGust} mph</strong>
          </div>
          <div>
            <span>Window</span>
            <strong>${day.window}</strong>
          </div>
        </div>
      </div>

      <p class="forecast-day-summary">${day.summary}</p>
    </button>
  `).join("");

  elements.weeklyForecast.querySelectorAll("[data-forecast-day]").forEach((button) => {
    button.addEventListener("click", () => {
      const dayIndex = Number(button.dataset.forecastDay);
      applyForecastDay(dayIndex);
    });
  });
}

function renderTerritoryButtons() {
  elements.territoryList.innerHTML = activeTerritories.map((territory) => `
    <button class="territory-button" type="button" data-territory="${territory.id}" style="--territory-color: ${territory.color}">
      <span>
        <strong>${territory.name}</strong>
        <small>${territory.area}</small>
      </span>
      <span>${territory.outages.toLocaleString()} outages</span>
    </button>
  `).join("");

  elements.territoryList.querySelectorAll("[data-territory]").forEach((button) => {
    button.addEventListener("click", () => selectTerritory(button.dataset.territory));
  });
}

function renderSeverity() {
  elements.severityGrid.innerHTML = activeSeverityWindows.map((item) => `
    <article class="severity-card">
      <div class="severity-topline">
        <span class="severity-label">${item.window}</span>
        <span class="severity-level">${item.level}</span>
      </div>
      <div class="bar-track" aria-hidden="true">
        <div class="bar-fill" style="--bar-value: ${item.value}%"></div>
      </div>
      <p>${item.detail}</p>
    </article>
  `).join("");
}

function renderProbabilityRows() {
  elements.probabilityRows.innerHTML = activeTerritories.map((territory) => `
    <article class="row-card">
      <div class="row-topline">
        <strong>${territory.name}</strong>
        <span class="row-value">${territory.probability}%</span>
      </div>
      <div class="bar-track" aria-hidden="true">
        <div class="bar-fill" style="--bar-value: ${territory.probability}%"></div>
      </div>
      <p>${territory.outages.toLocaleString()} predicted customers interrupted from ${territory.customersAtRisk.toLocaleString()} at risk.</p>
    </article>
  `).join("");
}

function renderCrewRows() {
  const totalDemand = activeCrewDemand.reduce((sum, crew) => sum + crew.demand, 0);
  const totalAvailable = activeCrewDemand.reduce((sum, crew) => sum + crew.available, 0);
  const reserve = Math.max(totalAvailable - totalDemand, 0);

  elements.crewRows.innerHTML = [
    `<article class="row-card">
      <div class="row-topline">
        <strong>Total mobilization</strong>
        <span class="row-value">${totalDemand} required / ${totalAvailable} available</span>
      </div>
      <div class="bar-track" aria-hidden="true">
        <div class="bar-fill crew-ok" style="--bar-value: ${Math.min((totalDemand / totalAvailable) * 100, 100)}%"></div>
      </div>
      <p>Mobilize ${totalDemand} crews and hold ${reserve} in reserve for late-cycle trouble calls.</p>
    </article>`,
    ...activeCrewDemand.map((crew) => `
      <article class="row-card">
        <div class="row-topline">
          <strong>${crew.type}</strong>
          <span class="row-value">${crew.demand} / ${crew.available}</span>
        </div>
        <div class="bar-track" aria-hidden="true">
          <div class="bar-fill crew-ok" style="--bar-value: ${Math.min((crew.demand / crew.available) * 100, 100)}%"></div>
        </div>
      </article>
    `)
  ].join("");
}

function renderCircuitRows() {
  elements.circuitRows.innerHTML = activeCircuits.map((circuit) => {
    const territory = activeTerritories.find((item) => item.id === circuit.territoryId);
    return `
      <tr>
        <td><strong>${circuit.id}</strong></td>
        <td>${territory.name}</td>
        <td><span class="probability-badge">${circuit.probability}%</span></td>
        <td>${circuit.customers.toLocaleString()}</td>
        <td>${circuit.driver}</td>
        <td>${circuit.etr}</td>
      </tr>
    `;
  }).join("");
}

function renderFacilityRows() {
  elements.facilityRows.innerHTML = activeFacilitySummary.map((facility) => `
    <article class="row-card">
      <div class="row-topline">
        <strong>${facility.type}</strong>
        <span class="row-value">${facility.count}</span>
      </div>
      <p>${facility.note}</p>
    </article>
  `).join("");
}

function renderEtrRows() {
  elements.etrRows.innerHTML = activeTerritories.map((territory) => `
    <article class="row-card">
      <div class="row-topline">
        <strong>${territory.name}</strong>
        <span class="row-value">${territory.etr}</span>
      </div>
      <p>${territory.crewDemand} crews assigned; ${territory.criticalFacilities} critical facilities downstream.</p>
    </article>
  `).join("");
}

function applyForecastDay(index, options = {}) {
  selectedForecastDayIndex = clamp(index, 0, weeklyForecastDays.length - 1);
  const day = getSelectedForecastDay();

  forecastAsOfDate = new Date(day.date);
  forecastAsOfDate.setHours(12, 0, 0, 0);

  activeTerritories = buildActiveTerritories(day);
  activeSeverityWindows = buildActiveSeverityWindows(day);
  activeCircuits = buildActiveCircuits(day);
  activeCrewDemand = day.crewBreakdown.map((crew) => ({ ...crew }));
  activeFacilitySummary = buildActiveFacilitySummary(day);
  activeCrewStaging = buildActiveCrewStaging(day);
  activeRadarFrames = buildActiveRadarFrames(day);

  if (options.render === false) {
    return;
  }

  if (options.resetRadar !== false) {
    radarPlayer.progress = 0;
  }
  radarPlayer.lastTimestamp = 0;

  renderForecastTime();
  renderMetrics();
  renderWeeklyForecast();
  renderTerritoryButtons();
  renderSeverity();
  renderProbabilityRows();
  renderCrewRows();
  renderCircuitRows();
  renderFacilityRows();
  renderEtrRows();

  if (map) {
    refreshMapScenario();
  }

  selectTerritory(selectedTerritoryId, { pan: false, popup: false });
}

function buildWeeklyForecastDays(referenceDate) {
  const anchor = new Date(referenceDate);
  anchor.setHours(12, 0, 0, 0);

  return weeklyScenarioTemplates.map((template, index) => {
    const date = new Date(anchor);
    date.setDate(anchor.getDate() + index);
    return {
      ...template,
      date
    };
  });
}

function buildActiveTerritories(day) {
  const outageShares = buildNormalizedShares(
    territories.map((territory) => territory.outages * (day.territoryBias[territory.id] || 1))
  );
  const riskShares = buildNormalizedShares(
    territories.map((territory) => territory.customersAtRisk * (day.territoryBias[territory.id] || 1))
  );
  const crewShares = buildNormalizedShares(
    territories.map((territory) => Math.max(territory.crewDemand, 1) * (day.territoryBias[territory.id] || 1))
  );
  const criticalShares = buildNormalizedShares(
    territories.map((territory) => territory.criticalFacilities * (day.territoryBias[territory.id] || 1))
  );

  const outagesByTerritory = allocateByShares(day.estimatedOutages, outageShares);
  const riskByTerritory = allocateByShares(day.customersAtRisk, riskShares);
  const crewsByTerritory = allocateByShares(day.crewsToMobilize, crewShares);
  const criticalByTerritory = allocateByShares(day.criticalFacilities, criticalShares);

  return territories.map((territory, index) => {
    const bias = day.territoryBias[territory.id] || 1;
    return {
      ...territory,
      outages: outagesByTerritory[index],
      customersAtRisk: riskByTerritory[index],
      probability: clamp(Math.round(territory.probability * day.probabilityScale * bias), 14, 96),
      highRiskCircuits: Math.max(1, Math.round(territory.highRiskCircuits * day.highRiskScale * bias)),
      etr: scaleEtrRange(territory.etr, day.etrScale),
      crewDemand: crewsByTerritory[index],
      availableCrews: crewsByTerritory[index],
      criticalFacilities: criticalByTerritory[index]
    };
  });
}

function buildActiveSeverityWindows(day) {
  return day.severityWindows.map((item) => ({ ...item }));
}

function buildActiveCircuits(day) {
  const outageScale = day.estimatedOutages / baseOutageTotal;

  return circuits
    .map((circuit) => {
      const bias = day.territoryBias[circuit.territoryId] || 1;
      return {
        ...circuit,
        probability: clamp(Math.round(circuit.probability * day.probabilityScale * bias), 12, 97),
        customers: Math.max(80, Math.round(circuit.customers * outageScale * bias)),
        etr: scaleEtrRange(circuit.etr, day.etrScale)
      };
    })
    .sort((left, right) => right.probability - left.probability);
}

function buildActiveFacilitySummary(day) {
  const shares = buildNormalizedShares(facilitySummary.map((facility) => facility.count));
  const allocated = allocateByShares(day.criticalFacilities, shares);

  return facilitySummary.map((facility, index) => ({
    ...facility,
    count: allocated[index]
  }));
}

function buildActiveCrewStaging(day) {
  const shares = buildNormalizedShares(crewStaging.map((crew) => crew.crews));
  const allocated = allocateByShares(day.crewsToMobilize, shares);

  return crewStaging.map((crew, index) => ({
    ...crew,
    crews: allocated[index]
  }));
}

function buildActiveRadarFrames(day) {
  return day.radarSequence.map((frame) => radarFrame(frame.label, frame.center, frame.intensity, frame.phase));
}

function refreshMapScenario() {
  radarLayers.length = 0;

  Object.keys(territoryLayers).forEach((key) => delete territoryLayers[key]);
  Object.keys(territoryMarkers).forEach((key) => delete territoryMarkers[key]);

  layerGroups.territories.clearLayers();
  layerGroups.radar.clearLayers();
  layerGroups.circuits.clearLayers();
  layerGroups.facilities.clearLayers();
  layerGroups.crews.clearLayers();

  renderTerritoryMapLayers();
  renderRadarLayer();
  renderCircuitHeatLayer();
  renderFacilityLayer();
  renderCrewLayer();
}

function buildNormalizedShares(values) {
  const total = values.reduce((sum, value) => sum + value, 0);
  return values.map((value) => value / total);
}

function allocateByShares(total, shares) {
  const raw = shares.map((share) => share * total);
  const rounded = raw.map((value) => Math.floor(value));
  let remainder = total - rounded.reduce((sum, value) => sum + value, 0);

  raw
    .map((value, index) => ({ index, fraction: value - rounded[index] }))
    .sort((left, right) => right.fraction - left.fraction)
    .forEach((item) => {
      if (remainder <= 0) return;
      rounded[item.index] += 1;
      remainder -= 1;
    });

  return rounded;
}

function scaleEtrRange(rangeLabel, scale) {
  const [start, end] = rangeLabel.split("-").map((value) => Number.parseFloat(value));
  const nextStart = Math.max(1.0, Math.round(start * scale * 10) / 10);
  const nextEnd = Math.max(nextStart + 0.5, Math.round(end * scale * 10) / 10);
  return `${nextStart.toFixed(1)}-${nextEnd.toFixed(1)} hr`;
}

function getSelectedForecastDay() {
  return weeklyForecastDays[selectedForecastDayIndex];
}

function formatForecastDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatForecastWeekday(date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long"
  }).format(date);
}

function forecastWeatherIcon(type) {
  const icons = {
    cloud: `
      <svg class="forecast-weather-icon" viewBox="0 0 64 48" aria-hidden="true">
        <path fill="#f2f6fb" d="M22 35h24a12 12 0 0 0 1-24 14 14 0 0 0-27-1A11 11 0 0 0 22 35Z"></path>
        <circle cx="21" cy="22" r="11" fill="#ffffff"></circle>
      </svg>
    `,
    rain: `
      <svg class="forecast-weather-icon" viewBox="0 0 64 48" aria-hidden="true">
        <path fill="#f2f6fb" d="M22 28h24a12 12 0 0 0 1-24 14 14 0 0 0-27-1A11 11 0 0 0 22 28Z"></path>
        <circle cx="21" cy="16" r="11" fill="#ffffff"></circle>
        <circle cx="23" cy="38" r="3" fill="#63c9ff"></circle>
        <circle cx="33" cy="40" r="3" fill="#63c9ff"></circle>
        <circle cx="43" cy="38" r="3" fill="#63c9ff"></circle>
      </svg>
    `,
    storm: `
      <svg class="forecast-weather-icon" viewBox="0 0 64 48" aria-hidden="true">
        <path fill="#f2f6fb" d="M22 26h24a12 12 0 0 0 1-24 14 14 0 0 0-27-1A11 11 0 0 0 22 26Z"></path>
        <circle cx="21" cy="14" r="11" fill="#ffffff"></circle>
        <path fill="#f4a531" d="M31 26h8l-4 8h6L29 47l4-11h-6z"></path>
        <circle cx="23" cy="38" r="3" fill="#63c9ff"></circle>
        <circle cx="43" cy="38" r="3" fill="#63c9ff"></circle>
      </svg>
    `
  };

  return icons[type] || icons.cloud;
}

function setupRadarControls() {
  let scrubbing = false;

  const scrubToClientX = (clientX) => {
    const rect = elements.radarScrubber.getBoundingClientRect();
    const progress = clamp((clientX - rect.left) / rect.width, 0, 1);
    radarPlayer.progress = progress;
    radarPlayer.isPlaying = false;
    radarPlayer.lastTimestamp = 0;
    renderRadarAtProgress(radarPlayer.progress);
    updateRadarPlaybackUi();
  };

  elements.playBarToggle.addEventListener("click", () => {
    radarPlayer.isPlaying = !radarPlayer.isPlaying;
    radarPlayer.lastTimestamp = 0;
    updateRadarPlaybackUi();
  });

  elements.radarInfoButton.addEventListener("click", () => {
    const expanded = elements.radarInfoButton.getAttribute("aria-expanded") === "true";
    elements.radarInfoButton.setAttribute("aria-expanded", String(!expanded));
    elements.radarTooltipCard.hidden = expanded;
  });

  elements.radarScrubber.addEventListener("pointerdown", (event) => {
    scrubbing = true;
    scrubToClientX(event.clientX);
  });

  window.addEventListener("pointermove", (event) => {
    if (!scrubbing) return;
    scrubToClientX(event.clientX);
  });

  window.addEventListener("pointerup", () => {
    scrubbing = false;
  });

  updateRadarPlaybackUi();
}

function initMap() {
  if (typeof L === "undefined") {
    elements.mapFallback.hidden = false;
    return;
  }

  map = L.map("memphisMap", {
    center: [35.130, -89.930],
    zoom: 10,
    zoomControl: false,
    scrollWheelZoom: true
  });

  L.control.zoom({ position: "bottomright" }).addTo(map);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    maxZoom: 19,
    subdomains: "abcd",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
  }).addTo(map);

  layerGroups.territories = L.layerGroup().addTo(map);
  layerGroups.radar = L.layerGroup().addTo(map);
  layerGroups.circuits = L.layerGroup().addTo(map);
  layerGroups.facilities = L.layerGroup().addTo(map);
  layerGroups.crews = L.layerGroup().addTo(map);

  renderTerritoryMapLayers();
  renderRadarLayer();
  renderCircuitHeatLayer();
  renderFacilityLayer();
  renderCrewLayer();
  setupLayerToggles();

  const bounds = L.latLngBounds(activeTerritories.flatMap((territory) => territory.polygon));
  map.fitBounds(bounds.pad(0.12));
  map.whenReady(() => {
    selectTerritory(selectedTerritoryId, { pan: false, popup: false });
    window.setTimeout(() => map.invalidateSize(), 50);
  });
}

function renderTerritoryMapLayers() {
  L.polygon(shelbyCountyBoundary, {
    color: "#17202e",
    weight: 2,
    opacity: 0.62,
    fill: false,
    dashArray: "8 7",
    interactive: false
  }).addTo(layerGroups.territories);

  activeTerritories.forEach((territory) => {
    const polygon = L.polygon(territory.polygon, territoryStyle(territory, territory.id === selectedTerritoryId))
      .addTo(layerGroups.territories)
      .bindTooltip(
        `${territory.name}: ${territory.outages.toLocaleString()} predicted outages, ${territory.probability}% probability, ${territory.customersAtRisk.toLocaleString()} customers at risk`,
        { sticky: true }
      );

    polygon.on("click", () => selectTerritory(territory.id));
    territoryLayers[territory.id] = polygon;

    const marker = L.marker(territory.center, {
      icon: L.divIcon({
        className: "service-center-marker",
        html: `<span class="marker-shell" style="--territory-color: ${territory.color}"><span class="marker-code">${territory.code}</span><span class="marker-name">${territory.label}</span></span>`,
        iconSize: [168, 50],
        iconAnchor: [84, 25]
      })
    }).addTo(layerGroups.territories);

    marker.bindPopup(territoryPopup(territory));
    marker.on("click", () => selectTerritory(territory.id));
    territoryMarkers[territory.id] = marker;
  });
}

function renderRadarLayer() {
  activeRadarFrames[0].bands.forEach((band, index) => {
    const layer = L.polygon(band.polygon, {
      stroke: false,
      fillColor: band.color,
      fillOpacity: band.fillOpacity,
      className: "radar-cell"
    }).addTo(layerGroups.radar);

    layer.bindTooltip(dopplerTooltip(index), { sticky: true });
    radarLayers.push(layer);
  });

  L.polyline(radarTrackPath, {
    color: "#17202e",
    weight: 3,
    opacity: 0.52,
    dashArray: "12 10",
    className: "radar-path"
  }).addTo(layerGroups.radar).bindTooltip("12 hr Doppler motion: southwest to northeast");

  renderRadarAtProgress(radarPlayer.progress);
  if (!radarAnimationStarted) {
    radarAnimationStarted = true;
    window.requestAnimationFrame(animateRadar);
  }
}

function animateRadar(timestamp) {
  if (!radarPlayer.lastTimestamp) {
    radarPlayer.lastTimestamp = timestamp;
  }

  if (radarPlayer.isPlaying) {
    const delta = timestamp - radarPlayer.lastTimestamp;
    radarPlayer.progress = (radarPlayer.progress + delta / radarAnimationMs) % 1;
    renderRadarAtProgress(radarPlayer.progress);
    updateRadarPlaybackUi();
  }

  radarPlayer.lastTimestamp = timestamp;
  window.requestAnimationFrame(animateRadar);
}

function renderRadarAtProgress(progress) {
  if (!radarLayers.length) return;

  const frameSpan = activeRadarFrames.length - 1;
  const scaledProgress = progress * frameSpan;
  const fromIndex = Math.min(Math.floor(scaledProgress), activeRadarFrames.length - 2);
  const toIndex = fromIndex + 1;
  const frameProgress = scaledProgress - fromIndex;
  const fromFrame = activeRadarFrames[fromIndex];
  const toFrame = activeRadarFrames[toIndex];

  radarLayers.forEach((layer, index) => {
    const fromBand = fromFrame.bands[index];
    const toBand = toFrame.bands[index];

    layer.setLatLngs(interpolateShape(fromBand.polygon, toBand.polygon, frameProgress));
    layer.setStyle({
      fillColor: fromBand.color,
      fillOpacity: lerp(fromBand.fillOpacity, toBand.fillOpacity, frameProgress)
    });
  });

  const currentFrame = activeRadarFrames[Math.min(Math.round(scaledProgress), activeRadarFrames.length - 1)];
  elements.radarClock.textContent = `${formatForecastWeekday(getSelectedForecastDay().date)} 12 hr Doppler ${currentFrame.label}`;
}

function updateRadarPlaybackUi() {
  const currentDate = new Date(forecastAsOfDate.getTime() + radarPlayer.progress * radarWindowHours * 60 * 60 * 1000);
  const endDate = new Date(forecastAsOfDate.getTime() + radarWindowHours * 60 * 60 * 1000);
  const percent = radarPlayer.progress * 100;
  const offsetHours = radarPlayer.progress * radarWindowHours;
  const offsetLabel = offsetHours < 0.05 ? "Now" : `+${offsetHours.toFixed(1)} hr`;

  elements.playBarIcon.classList.toggle("is-playing", radarPlayer.isPlaying);
  elements.playBarIcon.classList.toggle("is-paused", !radarPlayer.isPlaying);
  elements.playBarToggle.setAttribute("aria-label", radarPlayer.isPlaying ? "Pause radar playback" : "Play radar playback");
  elements.playCurrentTime.textContent = formatRadarTime(currentDate);
  elements.playCurrentDay.textContent = offsetLabel;
  elements.playEndTime.textContent = formatRadarTime(endDate);
  elements.playBarProgress.style.width = `${percent}%`;
  elements.playBarThumb.style.left = `${percent}%`;
  elements.playNowText.style.left = `${percent}%`;
  elements.playNowText.textContent = offsetLabel;
}

function formatRadarTime(date) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/Chicago"
  }).format(date);
}

function dopplerTooltip(index) {
  const labels = [
    "Light shower echoes",
    "Moderate reflectivity cells",
    "Heavy rain cores",
    "Severe embedded cores"
  ];
  return labels[index] || "Doppler return";
}

function renderCircuitHeatLayer() {
  activeCircuits.forEach((circuit) => {
    const color = riskColor(circuit.probability);
    const weight = 10 + Math.round(circuit.probability / 7);

    L.polyline(circuit.path, {
      color,
      weight: weight + 12,
      opacity: 0.18,
      lineCap: "round"
    }).addTo(layerGroups.circuits);

    L.polyline(circuit.path, {
      color,
      weight,
      opacity: 0.78,
      lineCap: "round"
    }).addTo(layerGroups.circuits).bindTooltip(`${circuit.id}: ${circuit.probability}% outage probability`);

    L.circleMarker(circuit.path[Math.floor(circuit.path.length / 2)], {
      radius: 6 + Math.round(circuit.probability / 11),
      color: "#ffffff",
      weight: 2,
      fillColor: color,
      fillOpacity: 0.94
    }).addTo(layerGroups.circuits).bindTooltip(`${circuit.id}: ${circuit.customers.toLocaleString()} customers interrupted`);
  });
}

function renderFacilityLayer() {
  criticalFacilities.forEach((facility) => {
    L.marker(facility.latlng, {
      icon: L.divIcon({
        className: `facility-marker ${facility.type}`,
        html: facility.code,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      })
    }).addTo(layerGroups.facilities).bindTooltip(`${facility.name} (${facility.type})`);
  });
}

function renderCrewLayer() {
  activeCrewStaging.forEach((crew) => {
    L.marker(crew.latlng, {
      icon: L.divIcon({
        className: "crew-marker",
        html: String(crew.crews),
        iconSize: [34, 34],
        iconAnchor: [17, 17]
      })
    }).addTo(layerGroups.crews).bindTooltip(`${crew.name}: ${crew.crews} crews`);
  });
}

function setupLayerToggles() {
  document.querySelectorAll(".layer-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const layerName = button.dataset.layer;
      const group = layerGroups[layerName];
      if (!group) return;

      const active = !button.classList.contains("active");
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));

      if (active) {
        group.addTo(map);
      } else {
        map.removeLayer(group);
      }
    });
  });
}

function selectTerritory(territoryId, options = {}) {
  const territory = activeTerritories.find((item) => item.id === territoryId);
  if (!territory) return;

  selectedTerritoryId = territoryId;
  elements.territoryTitle.textContent = territory.name;
  elements.territoryRisk.textContent = `${territory.probability}% outage probability`;
  elements.territoryRisk.style.background = territory.color;
  elements.territoryDetails.innerHTML = [
    detailCard("Coverage area", territory.area),
    detailCard("Estimated outages", `${territory.outages.toLocaleString()} predicted customers interrupted from ${territory.customersAtRisk.toLocaleString()} customers at risk.`),
    detailCard("High-risk circuits", `${territory.highRiskCircuits} circuits above the dispatch watch threshold.`),
    detailCard("Critical facilities", `${territory.criticalFacilities} hospitals, water, telecom, or shelter loads downstream.`),
    detailCard("Predicted restoration time", `${territory.etr} with ${territory.crewDemand} crews assigned and ${territory.availableCrews} currently available.`),
    detailCard("Likely trouble spots", `<ul>${territory.troubleSpots.map((spot) => `<li>${spot}</li>`).join("")}</ul>`),
    detailCard("Operating note", territory.summary)
  ].join("");

  elements.territoryList.querySelectorAll("[data-territory]").forEach((button) => {
    button.classList.toggle("active", button.dataset.territory === territoryId);
  });

  Object.entries(territoryLayers).forEach(([id, layer]) => {
    const layerTerritory = activeTerritories.find((item) => item.id === id);
    layer.setStyle(territoryStyle(layerTerritory, id === territoryId));
  });

  Object.entries(territoryMarkers).forEach(([id, marker]) => {
    const markerElement = marker.getElement();
    if (markerElement) {
      markerElement.classList.toggle("selected", id === territoryId);
    }
  });

  if (map && options.pan !== false) {
    map.flyTo(territory.center, 11, { duration: 0.45 });
  }

  if (map && options.popup !== false && territoryMarkers[territoryId]) {
    territoryMarkers[territoryId].openPopup();
  }
}

function territoryStyle(territory, active) {
  const riskOpacity = 0.12 + (territory.probability / 100) * 0.28;

  return {
    color: active ? "#17202e" : territory.color,
    weight: active ? 5 : 3,
    opacity: active ? 0.96 : 0.72,
    fillColor: territory.color,
    fillOpacity: active ? Math.min(riskOpacity + 0.10, 0.54) : riskOpacity
  };
}

function territoryPopup(territory) {
  return `
    <strong class="popup-title">${territory.name}</strong>
    <p class="popup-line">${territory.area}</p>
    <p class="popup-line">${territory.outages.toLocaleString()} predicted outages</p>
    <p class="popup-line">${territory.probability}% outage probability</p>
    <p class="popup-line">${territory.etr} ETR range</p>
  `;
}

function detailCard(title, body) {
  return `
    <article class="detail-card">
      <strong>${title}</strong>
      <div class="detail-body">${body}</div>
    </article>
  `;
}

function riskColor(probability) {
  if (probability >= 85) return "#d94b4b";
  if (probability >= 70) return "#e59a19";
  if (probability >= 55) return "#008c95";
  return "#316dca";
}

function radarFrame(label, center, intensity, phase) {
  return {
    label,
    bands: radarBandConfigs.map((config, index) => buildRadarBand(center, intensity, phase, config, index))
  };
}

function buildRadarBand(center, intensity, phase, config, bandIndex) {
  return {
    color: config.color,
    fillOpacity: clamp(config.opacity * intensity, config.minOpacity, config.maxOpacity),
    polygon: config.cells.flatMap((cell, cellIndex) =>
      buildRadarCellCluster(center, intensity, phase, cell, bandIndex, cellIndex)
    )
  };
}

function buildRadarCellCluster(center, intensity, phase, cell, bandIndex, cellIndex) {
  const baseSeed = radarScenarioSeed + cell.seed + bandIndex * 41 + cellIndex * 17;
  const anchor = driftedRadarPoint(center, cell.offset, intensity, baseSeed, phase);
  const pulse = 0.92 + 0.14 * Math.sin(phase * 1.3 + baseSeed * 0.07);
  const polygons = [
    radarBlobPolygon(
      anchor,
      cell.latRadius * intensity * pulse,
      cell.lngRadius * intensity * pulse,
      cell.rotation,
      baseSeed,
      phase,
      cell.jaggedness,
      cell.points
    )
  ];

  cell.fragments.forEach((fragment, fragmentIndex) => {
    const fragmentSeed = baseSeed + fragment.seed + fragmentIndex * 13;
    const fragmentAnchor = driftedRadarPoint(anchor, fragment.offset, intensity * 0.94, fragmentSeed, phase + 0.35);

    polygons.push(
      radarBlobPolygon(
        fragmentAnchor,
        fragment.latRadius * intensity,
        fragment.lngRadius * intensity,
        fragment.rotation,
        fragmentSeed,
        phase + 0.35,
        cell.jaggedness + 0.06,
        fragment.points
      )
    );
  });

  return polygons;
}

function driftedRadarPoint(center, offset, intensity, seed, phase) {
  const driftLat = 0.010 * intensity * Math.sin(phase * 0.95 + seed * 0.11);
  const driftLng = 0.014 * intensity * Math.cos(phase * 0.82 + seed * 0.09);

  return [
    center[0] + offset[0] * intensity + driftLat,
    center[1] + offset[1] * intensity + driftLng
  ];
}

function radarBlobPolygon(center, latRadius, lngRadius, rotationDegrees, seed, phase, jaggedness, pointCount) {
  const rotation = (rotationDegrees * Math.PI) / 180;
  const points = [];

  for (let index = 0; index < pointCount; index += 1) {
    const angle = (index / pointCount) * Math.PI * 2;
    const waveA = Math.sin(angle * 2.7 + seed * 0.37 + phase * 1.2);
    const waveB = Math.cos(angle * 5.4 - seed * 0.21 + phase * 1.7);
    const waveC = Math.sin(angle * 8.9 + seed * 0.13 - phase * 1.4);
    const lobe = 1 + 0.18 * Math.cos(angle - rotation + seed * 0.03);
    const bite = Math.max(0, Math.sin(angle * 3.4 + seed * 0.29 + phase));
    const edgeNoise = clamp(
      1 + jaggedness * (0.42 * waveA + 0.28 * waveB + 0.20 * waveC) - jaggedness * 0.16 * bite * bite,
      0.56,
      1.48
    );
    const localLng = Math.cos(angle) * lngRadius * edgeNoise * lobe;
    const localLat = Math.sin(angle) * latRadius * edgeNoise * (1 + 0.14 * Math.sin(angle * 2.2 + seed * 0.05 - phase));

    points.push([
      center[0] + localLng * Math.sin(rotation) + localLat * Math.cos(rotation),
      center[1] + localLng * Math.cos(rotation) - localLat * Math.sin(rotation)
    ]);
  }

  return points;
}

function interpolateShape(fromShape, toShape, progress) {
  if (typeof fromShape[0] === "number") {
    return [
      lerp(fromShape[0], toShape[0], progress),
      lerp(fromShape[1], toShape[1], progress)
    ];
  }

  return fromShape.map((part, index) => interpolateShape(part, toShape[index], progress));
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function lerp(start, end, progress) {
  return start + (end - start) * progress;
}
