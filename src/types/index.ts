export interface Airport {
  code: string;
  name: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  tier: 'Metro' | 'Tier-1' | 'Tier-2';
  routesCount?: number;
  avgFare?: number;
  fareChangePct?: number;
  activity?: 'High' | 'Medium' | 'Low';
}

export interface Airline {
  code: string;
  name: string;
  logoColor: string;
  marketShare: number; // in percentage e.g. 61.2 for IndiGo
  onTimePerformance: number;
  avgFleetAge: number;
}

export interface FareBreakdown {
  baseFare: number;
  fuelSurcharge: number;
  userDevelopmentFee: number; // UDF
  passengerServiceFee: number; // PSF
  aviationSecurityFee: number; // ASF
  gst: number;
  convenienceFee: number;
  totalFare: number;
}

export interface FlightFareQuote {
  id: string;
  origin: string;
  destination: string;
  originName: string;
  destinationName: string;
  airlineCode: string;
  airlineName: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  travelDate: string;
  daysToDeparture: number;
  fareClass: 'Economy' | 'Premium Economy' | 'Business';
  breakdown: FareBreakdown;
  historical30DayAvg: number;
  priceChangePct: number; // relative to 30d avg
  normalRange: [number, number];
  isSurge: boolean;
  surgeDeviationPct?: number;
  prediction: {
    expectedRange: [number, number];
    trend: 'INCREASE' | 'DECREASE' | 'STABLE';
    recommendation: 'BOOK NOW' | 'WAIT' | 'MONITOR';
    confidencePct: number;
    priceRisk: 'LOW' | 'MEDIUM' | 'HIGH';
    reason: string;
    drivers: {
      factor: string;
      impactPct: number;
      type: 'positive' | 'negative';
    }[];
  };
  availabilityStatus: 'Ample' | 'Moderate' | 'Low' | 'Critical';
  source: 'Ethical GDS Cache' | 'Direct Airline Feed' | 'Public Aggregator API';
  timestamp: string;
}

export interface RouteIndexData {
  routeKey: string; // e.g. "DEL-BOM"
  origin: string;
  destination: string;
  originCity: string;
  destinationCity: string;
  currentFare: number;
  indexValue: number; // e.g. 121.4
  monthlyChangePct: number;
  yearlyChangePct: number;
  volatility: 'Low' | 'Medium' | 'High';
  surgeRisk: 'Low' | 'Medium' | 'High';
  basketWeightPct: number; // weight in national index
  distanceKm?: number;
  typicalDuration?: string;
  baseFare2023?: number;
  dailyFlights?: number;
  passengerSharePct?: number;
  history: {
    date: string;
    index: number;
    avgFare: number;
  }[];
  alternatives?: {
    altRoute: string;
    origin: string;
    destination: string;
    destinationCity: string;
    fare: number;
    savings: number;
    distanceDiffKm: number;
    transitNote: string;
  }[];
}

export interface NationalIndexSummary {
  currentIndex: number;
  basePeriod: string;
  baseValue: number;
  dailyChangePct: number;
  weeklyChangePct: number;
  monthlyInflationPct: number;
  yearlyInflationPct: number;
  highestInflationRoute: {
    route: string;
    changePct: number;
    currentFare: number;
  };
  highestSurgeRoute: {
    route: string;
    deviationPct: number;
    currentFare: number;
  };
  mostVolatileRoute: {
    route: string;
    volatilityScore: number;
  };
  lowestGrowthRoute: {
    route: string;
    changePct: number;
  };
  basketRoutesCount: number;
  lastUpdated: string;
}

export interface BookingWindowMetric {
  window: string; // "T+1", "T+7", "T+15", "T+30", "T+45"
  days: number;
  avgFare: number;
  fareElasticityScore: number;
  sampleCount: number;
  priceStabilityScore: number;
}

export interface CPISimulationData {
  month: string;
  traditionalIndex: number;
  highFrequencyIndex: number;
  divergencePoints: number;
  airfareWeightInTransportCPI: number;
  simulatedCPIImpact: number;
}

export interface SurgeAlertItem {
  id: string;
  route: string;
  originCity: string;
  destinationCity: string;
  airline: string;
  currentFare: number;
  normalMin: number;
  normalMax: number;
  deviationPct: number;
  severity: 'Moderate' | 'High' | 'Severe';
  detectedAt: string;
  probableCause: string;
  status: 'ACTIVE' | 'RESOLVING' | 'WATCH';
}

export type DemoScenarioKey = 'scenario-1-normal' | 'scenario-2-surge' | 'scenario-3-festival' | 'scenario-4-drop' | 'scenario-5-monsoon';

export interface DemoScenario {
  id: DemoScenarioKey;
  title: string;
  subtitle: string;
  badge: string;
  route: string;
  currentFare: number;
  recommendation: 'BOOK NOW' | 'WAIT' | 'MONITOR';
  confidencePct: number;
  priceRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  predictionRange: [number, number];
  primaryFactor: string;
  drivers: { factor: string; impactPct: number; type: 'positive' | 'negative' }[];
  description: string;
}
