import {
  Airport,
  Airline,
  FlightFareQuote,
  RouteIndexData,
  NationalIndexSummary,
  BookingWindowMetric,
  CPISimulationData,
  SurgeAlertItem,
  DemoScenario,
  DemoScenarioKey
} from '../types';

export const AIRPORTS: Record<string, Airport> = {
  DEL: {
    code: 'DEL',
    name: 'Indira Gandhi International Airport',
    city: 'Delhi (NCR)',
    state: 'Delhi',
    lat: 28.5562,
    lng: 77.1000,
    tier: 'Metro'
  },
  BOM: {
    code: 'BOM',
    name: 'Chhatrapati Shivaji Maharaj International Airport',
    city: 'Mumbai',
    state: 'Maharashtra',
    lat: 19.0896,
    lng: 72.8656,
    tier: 'Metro'
  },
  BLR: {
    code: 'BLR',
    name: 'Kempegowda International Airport',
    city: 'Bengaluru',
    state: 'Karnataka',
    lat: 13.1986,
    lng: 77.7066,
    tier: 'Metro'
  },
  CCU: {
    code: 'CCU',
    name: 'Netaji Subhash Chandra Bose International Airport',
    city: 'Kolkata',
    state: 'West Bengal',
    lat: 22.6547,
    lng: 88.4467,
    tier: 'Metro'
  },
  HYD: {
    code: 'HYD',
    name: 'Rajiv Gandhi International Airport',
    city: 'Hyderabad',
    state: 'Telangana',
    lat: 17.2403,
    lng: 78.4294,
    tier: 'Metro'
  },
  MAA: {
    code: 'MAA',
    name: 'Chennai International Airport',
    city: 'Chennai',
    state: 'Tamil Nadu',
    lat: 12.9941,
    lng: 80.1709,
    tier: 'Metro'
  },
  PNQ: {
    code: 'PNQ',
    name: 'Pune International Airport',
    city: 'Pune',
    state: 'Maharashtra',
    lat: 18.5822,
    lng: 73.9197,
    tier: 'Tier-1'
  },
  AMD: {
    code: 'AMD',
    name: 'Sardar Vallabhbhai Patel International Airport',
    city: 'Ahmedabad',
    state: 'Gujarat',
    lat: 23.0772,
    lng: 72.6347,
    tier: 'Tier-1'
  },
  GOI: {
    code: 'GOI',
    name: 'Goa International Airport (Dabolim / Mopa)',
    city: 'Goa',
    state: 'Goa',
    lat: 15.3808,
    lng: 73.8314,
    tier: 'Tier-1'
  },
  GAU: {
    code: 'GAU',
    name: 'Lokpriya Gopinath Bordoloi International Airport',
    city: 'Guwahati',
    state: 'Assam',
    lat: 26.1061,
    lng: 91.5859,
    tier: 'Tier-2'
  }
};

export const AIRLINES: Record<string, Airline> = {
  '6E': {
    code: '6E',
    name: 'IndiGo',
    logoColor: '#003399',
    marketShare: 61.4,
    onTimePerformance: 87.2,
    avgFleetAge: 4.1
  },
  AI: {
    code: 'AI',
    name: 'Air India',
    logoColor: '#D81E28',
    marketShare: 14.8,
    onTimePerformance: 81.6,
    avgFleetAge: 8.5
  },
  UK: {
    code: 'UK',
    name: 'Vistara / AI Express',
    logoColor: '#582C4D',
    marketShare: 10.2,
    onTimePerformance: 89.4,
    avgFleetAge: 3.8
  },
  QP: {
    code: 'QP',
    name: 'Akasa Air',
    logoColor: '#FF6600',
    marketShare: 4.9,
    onTimePerformance: 85.1,
    avgFleetAge: 1.9
  },
  SG: {
    code: 'SG',
    name: 'SpiceJet',
    logoColor: '#ED1B24',
    marketShare: 3.7,
    onTimePerformance: 73.4,
    avgFleetAge: 11.2
  }
};

// 10 Core Representative Indian Basket Routes
export const BASKET_ROUTES: RouteIndexData[] = [
  {
    routeKey: 'DEL-BOM',
    origin: 'DEL',
    destination: 'BOM',
    originCity: 'Delhi',
    destinationCity: 'Mumbai',
    currentFare: 6240,
    indexValue: 121.4,
    monthlyChangePct: 7.4,
    yearlyChangePct: 14.1,
    volatility: 'High',
    surgeRisk: 'Medium',
    basketWeightPct: 18.5,
    history: [
      { date: '2024-03', index: 104.2, avgFare: 5350 },
      { date: '2024-04', index: 107.8, avgFare: 5540 },
      { date: '2024-05', index: 112.1, avgFare: 5760 },
      { date: '2024-06', index: 115.4, avgFare: 5930 },
      { date: '2024-07', index: 117.2, avgFare: 6020 },
      { date: '2024-08', index: 121.4, avgFare: 6240 }
    ],
    alternatives: [
      {
        altRoute: 'DEL-PNQ',
        origin: 'DEL',
        destination: 'PNQ',
        destinationCity: 'Pune',
        fare: 5700,
        savings: 540,
        distanceDiffKm: 145,
        transitNote: 'Pune is ~3 hrs expressway drive / Vande Bharat connection to Mumbai CBD'
      },
      {
        altRoute: 'DEL-AMD',
        origin: 'DEL',
        destination: 'AMD',
        destinationCity: 'Ahmedabad',
        fare: 5200,
        savings: 1040,
        distanceDiffKm: 520,
        transitNote: 'Connect via high-speed Vande Bharat express to Mumbai Central (5 hrs)'
      }
    ]
  },
  {
    routeKey: 'DEL-BLR',
    origin: 'DEL',
    destination: 'BLR',
    originCity: 'Delhi',
    destinationCity: 'Bengaluru',
    currentFare: 7450,
    indexValue: 123.8,
    monthlyChangePct: 8.9,
    yearlyChangePct: 16.5,
    volatility: 'High',
    surgeRisk: 'High',
    basketWeightPct: 15.0,
    history: [
      { date: '2024-03', index: 105.1, avgFare: 6320 },
      { date: '2024-04', index: 109.4, avgFare: 6580 },
      { date: '2024-05', index: 113.8, avgFare: 6850 },
      { date: '2024-06', index: 116.7, avgFare: 7020 },
      { date: '2024-07', index: 119.5, avgFare: 7190 },
      { date: '2024-08', index: 123.8, avgFare: 7450 }
    ],
    alternatives: [
      {
        altRoute: 'DEL-HYD',
        origin: 'DEL',
        destination: 'HYD',
        destinationCity: 'Hyderabad',
        fare: 5950,
        savings: 1500,
        distanceDiffKm: 570,
        transitNote: 'Connecting transit options available via South Central hubs'
      }
    ]
  },
  {
    routeKey: 'BOM-BLR',
    origin: 'BOM',
    destination: 'BLR',
    originCity: 'Mumbai',
    destinationCity: 'Bengaluru',
    currentFare: 4980,
    indexValue: 124.2,
    monthlyChangePct: 9.6,
    yearlyChangePct: 18.2,
    volatility: 'High',
    surgeRisk: 'Medium',
    basketWeightPct: 12.0,
    history: [
      { date: '2024-03', index: 102.8, avgFare: 4120 },
      { date: '2024-04', index: 106.3, avgFare: 4260 },
      { date: '2024-05', index: 110.9, avgFare: 4450 },
      { date: '2024-06', index: 114.5, avgFare: 4590 },
      { date: '2024-07', index: 118.1, avgFare: 4740 },
      { date: '2024-08', index: 124.2, avgFare: 4980 }
    ]
  },
  {
    routeKey: 'DEL-CCU',
    origin: 'DEL',
    destination: 'CCU',
    originCity: 'Delhi',
    destinationCity: 'Kolkata',
    currentFare: 6890,
    indexValue: 119.5,
    monthlyChangePct: 6.2,
    yearlyChangePct: 11.8,
    volatility: 'Medium',
    surgeRisk: 'High',
    basketWeightPct: 10.5,
    history: [
      { date: '2024-03', index: 106.0, avgFare: 6110 },
      { date: '2024-04', index: 108.7, avgFare: 6270 },
      { date: '2024-05', index: 111.4, avgFare: 6420 },
      { date: '2024-06', index: 113.8, avgFare: 6560 },
      { date: '2024-07', index: 116.1, avgFare: 6690 },
      { date: '2024-08', index: 119.5, avgFare: 6890 }
    ]
  },
  {
    routeKey: 'BLR-HYD',
    origin: 'BLR',
    destination: 'HYD',
    originCity: 'Bengaluru',
    destinationCity: 'Hyderabad',
    currentFare: 3650,
    indexValue: 110.2,
    monthlyChangePct: 2.1,
    yearlyChangePct: 5.4,
    volatility: 'Low',
    surgeRisk: 'Low',
    basketWeightPct: 8.5,
    history: [
      { date: '2024-03', index: 104.8, avgFare: 3470 },
      { date: '2024-04', index: 105.9, avgFare: 3510 },
      { date: '2024-05', index: 107.1, avgFare: 3550 },
      { date: '2024-06', index: 108.0, avgFare: 3580 },
      { date: '2024-07', index: 109.1, avgFare: 3610 },
      { date: '2024-08', index: 110.2, avgFare: 3650 }
    ]
  },
  {
    routeKey: 'MAA-DEL',
    origin: 'MAA',
    destination: 'DEL',
    originCity: 'Chennai',
    destinationCity: 'Delhi',
    currentFare: 6420,
    indexValue: 116.8,
    monthlyChangePct: 5.4,
    yearlyChangePct: 10.9,
    volatility: 'Medium',
    surgeRisk: 'Low',
    basketWeightPct: 9.0,
    history: [
      { date: '2024-03', index: 105.4, avgFare: 5790 },
      { date: '2024-04', index: 107.6, avgFare: 5910 },
      { date: '2024-05', index: 110.3, avgFare: 6060 },
      { date: '2024-06', index: 112.5, avgFare: 6180 },
      { date: '2024-07', index: 114.7, avgFare: 6300 },
      { date: '2024-08', index: 116.8, avgFare: 6420 }
    ]
  },
  {
    routeKey: 'DEL-HYD',
    origin: 'DEL',
    destination: 'HYD',
    originCity: 'Delhi',
    destinationCity: 'Hyderabad',
    currentFare: 5950,
    indexValue: 117.4,
    monthlyChangePct: 4.8,
    yearlyChangePct: 9.7,
    volatility: 'Medium',
    surgeRisk: 'Low',
    basketWeightPct: 8.5,
    history: [
      { date: '2024-03', index: 106.8, avgFare: 5410 },
      { date: '2024-04', index: 109.1, avgFare: 5530 },
      { date: '2024-05', index: 111.3, avgFare: 5640 },
      { date: '2024-06', index: 113.2, avgFare: 5740 },
      { date: '2024-07', index: 115.5, avgFare: 5850 },
      { date: '2024-08', index: 117.4, avgFare: 5950 }
    ]
  },
  {
    routeKey: 'BOM-DEL',
    origin: 'BOM',
    destination: 'DEL',
    originCity: 'Mumbai',
    destinationCity: 'Delhi',
    currentFare: 6310,
    indexValue: 120.9,
    monthlyChangePct: 6.9,
    yearlyChangePct: 13.5,
    volatility: 'High',
    surgeRisk: 'Medium',
    basketWeightPct: 9.0,
    history: [
      { date: '2024-03', index: 104.5, avgFare: 5450 },
      { date: '2024-04', index: 108.0, avgFare: 5640 },
      { date: '2024-05', index: 111.9, avgFare: 5840 },
      { date: '2024-06', index: 115.0, avgFare: 6000 },
      { date: '2024-07', index: 117.8, avgFare: 6150 },
      { date: '2024-08', index: 120.9, avgFare: 6310 }
    ]
  },
  {
    routeKey: 'BLR-MAA',
    origin: 'BLR',
    destination: 'MAA',
    originCity: 'Bengaluru',
    destinationCity: 'Chennai',
    currentFare: 3280,
    indexValue: 111.5,
    monthlyChangePct: 3.2,
    yearlyChangePct: 6.8,
    volatility: 'Low',
    surgeRisk: 'Low',
    basketWeightPct: 5.0,
    history: [
      { date: '2024-03', index: 104.2, avgFare: 3060 },
      { date: '2024-04', index: 105.7, avgFare: 3110 },
      { date: '2024-05', index: 107.4, avgFare: 3160 },
      { date: '2024-06', index: 108.8, avgFare: 3200 },
      { date: '2024-07', index: 110.1, avgFare: 3240 },
      { date: '2024-08', index: 111.5, avgFare: 3280 }
    ]
  },
  {
    routeKey: 'DEL-PNQ',
    origin: 'DEL',
    destination: 'PNQ',
    originCity: 'Delhi',
    destinationCity: 'Pune',
    currentFare: 5700,
    indexValue: 118.2,
    monthlyChangePct: 5.9,
    yearlyChangePct: 11.4,
    volatility: 'Medium',
    surgeRisk: 'Low',
    basketWeightPct: 4.0,
    history: [
      { date: '2024-03', index: 105.8, avgFare: 5100 },
      { date: '2024-04', index: 108.2, avgFare: 5220 },
      { date: '2024-05', index: 111.0, avgFare: 5350 },
      { date: '2024-06', index: 113.3, avgFare: 5460 },
      { date: '2024-07', index: 115.8, avgFare: 5580 },
      { date: '2024-08', index: 118.2, avgFare: 5700 }
    ]
  }
];

export const NATIONAL_INDEX: NationalIndexSummary = {
  currentIndex: 118.6,
  basePeriod: 'Jan 2024 = 100.0',
  baseValue: 100.0,
  dailyChangePct: +0.4,
  weeklyChangePct: +1.8,
  monthlyInflationPct: +6.8,
  yearlyInflationPct: +12.2,
  highestInflationRoute: {
    route: 'BOM → BLR',
    changePct: +9.6,
    currentFare: 4980
  },
  highestSurgeRoute: {
    route: 'DEL → BOM',
    deviationPct: +43.0,
    currentFare: 8900
  },
  mostVolatileRoute: {
    route: 'DEL → BLR',
    volatilityScore: 88.4
  },
  lowestGrowthRoute: {
    route: 'BLR → HYD',
    changePct: +2.1
  },
  basketRoutesCount: 10,
  lastUpdated: '2026-08-23 18:30 IST'
};

export const BOOKING_WINDOW_DATA: BookingWindowMetric[] = [
  { window: 'T+1 (1 Day)', days: 1, avgFare: 9200, fareElasticityScore: 2.84, sampleCount: 1420, priceStabilityScore: 22 },
  { window: 'T+7 (7 Days)', days: 7, avgFare: 7800, fareElasticityScore: 1.95, sampleCount: 2840, priceStabilityScore: 48 },
  { window: 'T+15 (15 Days)', days: 15, avgFare: 6700, fareElasticityScore: 1.22, sampleCount: 3950, priceStabilityScore: 74 },
  { window: 'T+30 (30 Days)', days: 30, avgFare: 5900, fareElasticityScore: 0.88, sampleCount: 4600, priceStabilityScore: 89 },
  { window: 'T+45 (45 Days)', days: 45, avgFare: 5600, fareElasticityScore: 0.72, sampleCount: 3820, priceStabilityScore: 94 }
];

export const CPI_SIMULATION_SERIES: CPISimulationData[] = [
  { month: 'Mar 24', traditionalIndex: 105.0, highFrequencyIndex: 106.2, divergencePoints: +1.2, airfareWeightInTransportCPI: 4.8, simulatedCPIImpact: 0.06 },
  { month: 'Apr 24', traditionalIndex: 106.8, highFrequencyIndex: 108.4, divergencePoints: +1.6, airfareWeightInTransportCPI: 4.8, simulatedCPIImpact: 0.08 },
  { month: 'May 24', traditionalIndex: 109.1, highFrequencyIndex: 111.0, divergencePoints: +1.9, airfareWeightInTransportCPI: 4.8, simulatedCPIImpact: 0.09 },
  { month: 'Jun 24', traditionalIndex: 110.5, highFrequencyIndex: 112.7, divergencePoints: +2.2, airfareWeightInTransportCPI: 4.8, simulatedCPIImpact: 0.11 },
  { month: 'Jul 24', traditionalIndex: 111.4, highFrequencyIndex: 113.2, divergencePoints: +1.8, airfareWeightInTransportCPI: 4.8, simulatedCPIImpact: 0.09 },
  { month: 'Aug 24', traditionalIndex: 112.4, highFrequencyIndex: 114.1, divergencePoints: +1.7, airfareWeightInTransportCPI: 4.8, simulatedCPIImpact: 0.08 }
];

export const SURGE_ALERTS: SurgeAlertItem[] = [
  {
    id: 'surge-1',
    route: 'DEL-BOM',
    originCity: 'Delhi',
    destinationCity: 'Mumbai',
    airline: 'IndiGo / Vistara',
    currentFare: 8900,
    normalMin: 5000,
    normalMax: 6500,
    deviationPct: 43.0,
    severity: 'Severe',
    detectedAt: '12 mins ago',
    probableCause: 'Ganesh Chaturthi weekend surge + Business corridor morning slot depletion',
    status: 'ACTIVE'
  },
  {
    id: 'surge-2',
    route: 'DEL-CCU',
    originCity: 'Delhi',
    destinationCity: 'Kolkata',
    airline: 'Air India',
    currentFare: 9850,
    normalMin: 5800,
    normalMax: 7100,
    deviationPct: 38.7,
    severity: 'High',
    detectedAt: '34 mins ago',
    probableCause: 'Pre-Durga Puja homecoming booking spike on T+7 departures',
    status: 'ACTIVE'
  },
  {
    id: 'surge-3',
    route: 'BOM-BLR',
    originCity: 'Mumbai',
    destinationCity: 'Bengaluru',
    airline: 'Akasa Air / IndiGo',
    currentFare: 6920,
    normalMin: 4200,
    normalMax: 5100,
    deviationPct: 35.6,
    severity: 'Moderate',
    detectedAt: '1 hr ago',
    probableCause: 'Tech corridor Monday morning demand spike',
    status: 'ACTIVE'
  },
  {
    id: 'surge-4',
    route: 'DEL-BLR',
    originCity: 'Delhi',
    destinationCity: 'Bengaluru',
    airline: 'Vistara',
    currentFare: 11200,
    normalMin: 6200,
    normalMax: 7800,
    deviationPct: 43.5,
    severity: 'Severe',
    detectedAt: '2 hrs ago',
    probableCause: 'Evening corporate non-stop flights 95%+ booked',
    status: 'RESOLVING'
  }
];

export const DEMO_SCENARIOS: Record<DemoScenarioKey, DemoScenario> = {
  'scenario-1-normal': {
    id: 'scenario-1-normal',
    title: 'Scenario 1 — Normal Fare',
    subtitle: 'DEL → BOM Standard Pricing',
    badge: 'Normal Baseline',
    route: 'DEL-BOM',
    currentFare: 6240,
    recommendation: 'WAIT',
    confidencePct: 82,
    priceRisk: 'MEDIUM',
    predictionRange: [5700, 5950],
    primaryFactor: 'Historical data indicates fares on this route generally decrease during the current booking window.',
    drivers: [
      { factor: 'Weekend demand', impactPct: +8, type: 'positive' },
      { factor: 'Festival period', impactPct: +7, type: 'positive' },
      { factor: 'Short booking window', impactPct: +5, type: 'positive' },
      { factor: 'Low availability', impactPct: +4, type: 'positive' }
    ],
    description: 'Current fare is ₹6,240 (+8.2% above 30d avg). AI ML models project a dip to ₹5,700–₹5,950 over the next 4-6 days as additional seat inventory opens.'
  },
  'scenario-2-surge': {
    id: 'scenario-2-surge',
    title: 'Scenario 2 — Price Surge',
    subtitle: 'DEL → BOM Abnormal Spike (+43%)',
    badge: 'Abnormal Surge Alert',
    route: 'DEL-BOM',
    currentFare: 8900,
    recommendation: 'WAIT',
    confidencePct: 91,
    priceRisk: 'HIGH',
    predictionRange: [6100, 6600],
    primaryFactor: 'Abnormal surge detected due to sudden bulk corporate block booking; expected to normalize.',
    drivers: [
      { factor: 'Sudden demand velocity', impactPct: +24, type: 'positive' },
      { factor: 'Yield algorithm spike', impactPct: +12, type: 'positive' },
      { factor: 'Weekend morning peak', impactPct: +7, type: 'positive' }
    ],
    description: 'Normal range is ₹5,000–₹6,500. Current price of ₹8,900 reflects a +43% deviation. Consider alternative route DEL → PNQ (₹5,700, Save ₹3,200).'
  },
  'scenario-3-festival': {
    id: 'scenario-3-festival',
    title: 'Scenario 3 — Festival Demand',
    subtitle: 'DEL → CCU Durga Puja Surge',
    badge: 'High Festive Season',
    route: 'DEL-CCU',
    currentFare: 9850,
    recommendation: 'BOOK NOW',
    confidencePct: 88,
    priceRisk: 'HIGH',
    predictionRange: [11500, 13200],
    primaryFactor: 'Festive seat capacity exhaustion underway. Further steep fare escalations projected.',
    drivers: [
      { factor: 'Durga Puja travel demand', impactPct: +32, type: 'positive' },
      { factor: 'Load factor > 92%', impactPct: +18, type: 'positive' },
      { factor: 'Tight seat inventory', impactPct: +14, type: 'positive' }
    ],
    description: 'Fares on DEL → CCU are already ₹9,850 and projected to jump to ₹11,500–₹13,200 as departure approaches. Recommended action: Lock in immediately.'
  },
  'scenario-4-drop': {
    id: 'scenario-4-drop',
    title: 'Scenario 4 — Fare Drop',
    subtitle: 'BLR → HYD Price Plummet',
    badge: 'Flash Drop / Discount',
    route: 'BLR-HYD',
    currentFare: 2950,
    recommendation: 'BOOK NOW',
    confidencePct: 94,
    priceRisk: 'LOW',
    predictionRange: [3600, 4100],
    primaryFactor: 'Airline flash inventory clearance. Price is 28% below historical 30-day baseline.',
    drivers: [
      { factor: 'Airline seat dump sale', impactPct: -22, type: 'negative' },
      { factor: 'Mid-week low load factor', impactPct: -12, type: 'negative' },
      { factor: 'High competitor seat supply', impactPct: -8, type: 'negative' }
    ],
    description: 'Fare has dipped to a rare ₹2,950 (Normal ₹3,600–₹4,200). Expected to rebound back above ₹3,800 within 24 hours. Prime buying opportunity.'
  },
  'scenario-5-monsoon': {
    id: 'scenario-5-monsoon',
    title: 'Scenario 5 — Monsoon Soft Demand',
    subtitle: 'BOM → GOI Leisure Corridor',
    badge: 'Stable / Monitor',
    route: 'BOM-GOI',
    currentFare: 3800,
    recommendation: 'MONITOR',
    confidencePct: 79,
    priceRisk: 'LOW',
    predictionRange: [3600, 3950],
    primaryFactor: 'Off-peak monsoon seasonality stabilizing price movements in a narrow corridor.',
    drivers: [
      { factor: 'Off-season leisure demand', impactPct: -14, type: 'negative' },
      { factor: 'Stable aviation turbine fuel', impactPct: -2, type: 'negative' },
      { factor: 'Ample seat inventory', impactPct: -6, type: 'negative' }
    ],
    description: 'Prices are stable around ₹3,800. Set a price drop alert for ₹3,400 or monitor over the next 10 days.'
  }
};

export const SAMPLE_QUOTES: FlightFareQuote[] = [
  {
    id: 'quote-101',
    origin: 'DEL',
    destination: 'BOM',
    originName: 'Indira Gandhi Intl, Delhi',
    destinationName: 'CSMI Airport, Mumbai',
    airlineCode: '6E',
    airlineName: 'IndiGo',
    flightNumber: '6E 2145',
    departureTime: '06:15',
    arrivalTime: '08:35',
    duration: '2h 20m',
    stops: 0,
    travelDate: '15 September 2026',
    daysToDeparture: 23,
    fareClass: 'Economy',
    breakdown: {
      baseFare: 4420,
      fuelSurcharge: 650,
      userDevelopmentFee: 410,
      passengerServiceFee: 180,
      aviationSecurityFee: 160,
      gst: 240,
      convenienceFee: 180,
      totalFare: 6240
    },
    historical30DayAvg: 5767,
    priceChangePct: 8.2,
    normalRange: [5000, 6500],
    isSurge: false,
    prediction: {
      expectedRange: [5600, 5900],
      trend: 'DECREASE',
      recommendation: 'WAIT',
      confidencePct: 82,
      priceRisk: 'MEDIUM',
      reason: 'Historical data indicates fares on this route generally decrease during the current booking window.',
      drivers: [
        { factor: 'Weekend demand', impactPct: 8, type: 'positive' },
        { factor: 'Festival period', impactPct: 7, type: 'positive' },
        { factor: 'Short booking window', impactPct: 5, type: 'positive' },
        { factor: 'Low availability', impactPct: 4, type: 'positive' }
      ]
    },
    availabilityStatus: 'Moderate',
    source: 'Direct Airline Feed',
    timestamp: '2026-08-23T12:00:00Z'
  },
  {
    id: 'quote-102',
    origin: 'DEL',
    destination: 'BOM',
    originName: 'Indira Gandhi Intl, Delhi',
    destinationName: 'CSMI Airport, Mumbai',
    airlineCode: 'AI',
    airlineName: 'Air India',
    flightNumber: 'AI 865',
    departureTime: '08:00',
    arrivalTime: '10:15',
    duration: '2h 15m',
    stops: 0,
    travelDate: '15 September 2026',
    daysToDeparture: 23,
    fareClass: 'Economy',
    breakdown: {
      baseFare: 4680,
      fuelSurcharge: 700,
      userDevelopmentFee: 410,
      passengerServiceFee: 180,
      aviationSecurityFee: 160,
      gst: 260,
      convenienceFee: 190,
      totalFare: 6580
    },
    historical30DayAvg: 5920,
    priceChangePct: 11.1,
    normalRange: [5200, 6800],
    isSurge: false,
    prediction: {
      expectedRange: [5800, 6150],
      trend: 'DECREASE',
      recommendation: 'WAIT',
      confidencePct: 80,
      priceRisk: 'MEDIUM',
      reason: 'Full-service carrier meal-inclusive inventory remains stable; price moderation anticipated.',
      drivers: [
        { factor: 'Corporate morning departure', impactPct: 9, type: 'positive' },
        { factor: 'Baggage allowance factor', impactPct: 4, type: 'positive' },
        { factor: 'Booking horizon elasticity', impactPct: 6, type: 'positive' }
      ]
    },
    availabilityStatus: 'Moderate',
    source: 'Ethical GDS Cache',
    timestamp: '2026-08-23T12:00:00Z'
  },
  {
    id: 'quote-103',
    origin: 'DEL',
    destination: 'BOM',
    originName: 'Indira Gandhi Intl, Delhi',
    destinationName: 'CSMI Airport, Mumbai',
    airlineCode: 'UK',
    airlineName: 'Vistara / AI Express',
    flightNumber: 'UK 995',
    departureTime: '10:20',
    arrivalTime: '12:35',
    duration: '2h 15m',
    stops: 0,
    travelDate: '15 September 2026',
    daysToDeparture: 23,
    fareClass: 'Economy',
    breakdown: {
      baseFare: 4890,
      fuelSurcharge: 720,
      userDevelopmentFee: 410,
      passengerServiceFee: 180,
      aviationSecurityFee: 160,
      gst: 280,
      convenienceFee: 180,
      totalFare: 6820
    },
    historical30DayAvg: 6150,
    priceChangePct: 10.9,
    normalRange: [5400, 7000],
    isSurge: false,
    prediction: {
      expectedRange: [6050, 6350],
      trend: 'DECREASE',
      recommendation: 'WAIT',
      confidencePct: 78,
      priceRisk: 'MEDIUM',
      reason: 'Mid-day slot fares expected to align closer to low-cost carrier baselines.',
      drivers: [
        { factor: 'Premium economy spillover', impactPct: 6, type: 'positive' },
        { factor: 'Advance window slope', impactPct: 7, type: 'positive' }
      ]
    },
    availabilityStatus: 'Ample',
    source: 'Direct Airline Feed',
    timestamp: '2026-08-23T12:00:00Z'
  },
  {
    id: 'quote-104',
    origin: 'DEL',
    destination: 'BOM',
    originName: 'Indira Gandhi Intl, Delhi',
    destinationName: 'CSMI Airport, Mumbai',
    airlineCode: 'QP',
    airlineName: 'Akasa Air',
    flightNumber: 'QP 1301',
    departureTime: '14:45',
    arrivalTime: '17:05',
    duration: '2h 20m',
    stops: 0,
    travelDate: '15 September 2026',
    daysToDeparture: 23,
    fareClass: 'Economy',
    breakdown: {
      baseFare: 4120,
      fuelSurcharge: 580,
      userDevelopmentFee: 410,
      passengerServiceFee: 180,
      aviationSecurityFee: 160,
      gst: 220,
      convenienceFee: 150,
      totalFare: 5820
    },
    historical30DayAvg: 5420,
    priceChangePct: 7.4,
    normalRange: [4800, 6200],
    isSurge: false,
    prediction: {
      expectedRange: [5300, 5600],
      trend: 'DECREASE',
      recommendation: 'WAIT',
      confidencePct: 85,
      priceRisk: 'LOW',
      reason: 'Competitive market pricing pressure from new entrant; fare softening expected.',
      drivers: [
        { factor: 'Fleet addition capacity', impactPct: -6, type: 'negative' },
        { factor: 'Aggressive challenger pricing', impactPct: -5, type: 'negative' }
      ]
    },
    availabilityStatus: 'Ample',
    source: 'Public Aggregator API',
    timestamp: '2026-08-23T12:00:00Z'
  },
  {
    id: 'quote-105',
    origin: 'DEL',
    destination: 'BOM',
    originName: 'Indira Gandhi Intl, Delhi',
    destinationName: 'CSMI Airport, Mumbai',
    airlineCode: 'SG',
    airlineName: 'SpiceJet',
    flightNumber: 'SG 8169',
    departureTime: '19:10',
    arrivalTime: '21:30',
    duration: '2h 20m',
    stops: 0,
    travelDate: '15 September 2026',
    daysToDeparture: 23,
    fareClass: 'Economy',
    breakdown: {
      baseFare: 3950,
      fuelSurcharge: 550,
      userDevelopmentFee: 410,
      passengerServiceFee: 180,
      aviationSecurityFee: 160,
      gst: 210,
      convenienceFee: 150,
      totalFare: 5610
    },
    historical30DayAvg: 5290,
    priceChangePct: 6.0,
    normalRange: [4600, 6000],
    isSurge: false,
    prediction: {
      expectedRange: [5100, 5450],
      trend: 'STABLE',
      recommendation: 'MONITOR',
      confidencePct: 74,
      priceRisk: 'LOW',
      reason: 'Lowest base fare currently on route; moderate price volatility.',
      drivers: [
        { factor: 'Evening discount slot', impactPct: -4, type: 'negative' },
        { factor: 'Advance window rate', impactPct: +3, type: 'positive' }
      ]
    },
    availabilityStatus: 'Moderate',
    source: 'Ethical GDS Cache',
    timestamp: '2026-08-23T12:00:00Z'
  }
];
