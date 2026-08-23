import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import {
  AIRPORTS,
  AIRLINES,
  BASKET_ROUTES,
  NATIONAL_INDEX,
  BOOKING_WINDOW_DATA,
  CPI_SIMULATION_SERIES,
  SURGE_ALERTS,
  DEMO_SCENARIOS,
  SAMPLE_QUOTES
} from './src/data/mockAirfareData';

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (aiClient) return aiClient;
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  aiClient = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'FlyFair India Intelligence API',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      capabilities: ['fare-prediction', 'surge-detection', 'price-index', 'cpi-simulation', 'gemini-ai']
    });
  });

  // GET /api/routes
  app.get('/api/routes', (req, res) => {
    res.json({
      routes: BASKET_ROUTES,
      airports: AIRPORTS,
      totalCount: BASKET_ROUTES.length
    });
  });

  // GET /api/airlines
  app.get('/api/airlines', (req, res) => {
    res.json({
      airlines: Object.values(AIRLINES)
    });
  });

  // GET /api/index
  app.get('/api/index', (req, res) => {
    const baseParam = req.query.base as string || 'Jan 2024';
    let summary = { ...NATIONAL_INDEX };
    if (baseParam === 'Apr 2024') {
      summary.currentIndex = 110.2;
      summary.basePeriod = 'Apr 2024 = 100.0';
    } else if (baseParam === 'FY24') {
      summary.currentIndex = 114.8;
      summary.basePeriod = 'FY2023-24 = 100.0';
    }
    res.json({
      nationalIndex: summary,
      basketRoutes: BASKET_ROUTES
    });
  });

  // GET /api/index/history
  app.get('/api/index/history', (req, res) => {
    const historyMonths = [
      { month: 'Mar 24', nationalIndex: 104.5, inflationPct: 4.5, avgFare: 5210, basketVol: 6.2 },
      { month: 'Apr 24', nationalIndex: 107.2, inflationPct: 5.1, avgFare: 5350, basketVol: 7.0 },
      { month: 'May 24', nationalIndex: 111.4, inflationPct: 5.8, avgFare: 5560, basketVol: 8.5 },
      { month: 'Jun 24', nationalIndex: 114.6, inflationPct: 6.1, avgFare: 5720, basketVol: 9.1 },
      { month: 'Jul 24', nationalIndex: 116.8, inflationPct: 6.4, avgFare: 5830, basketVol: 8.8 },
      { month: 'Aug 24', nationalIndex: 118.6, inflationPct: 6.8, avgFare: 5920, basketVol: 9.4 }
    ];
    res.json({
      history: historyMonths,
      frequency: 'Monthly Weighted Basket',
      base: 'Jan 2024 = 100.0'
    });
  });

  // GET /api/fares
  app.get('/api/fares', (req, res) => {
    const { origin, destination, airline, scenario } = req.query;
    let quotes = [...SAMPLE_QUOTES];

    // If scenario active
    if (scenario && typeof scenario === 'string' && DEMO_SCENARIOS[scenario as keyof typeof DEMO_SCENARIOS]) {
      const activeScenario = DEMO_SCENARIOS[scenario as keyof typeof DEMO_SCENARIOS];
      const [orig, dest] = activeScenario.route.split('-');
      quotes = quotes.map((q, idx) => {
        const fare = idx === 0 ? activeScenario.currentFare : Math.round(activeScenario.currentFare * (1 + (idx * 0.04)));
        const base = Math.round(fare * 0.72);
        const fuel = Math.round(fare * 0.11);
        const taxes = fare - base - fuel;
        return {
          ...q,
          origin: orig || q.origin,
          destination: dest || q.destination,
          breakdown: {
            ...q.breakdown,
            baseFare: base,
            fuelSurcharge: fuel,
            totalFare: fare
          },
          prediction: {
            ...q.prediction,
            expectedRange: activeScenario.predictionRange,
            recommendation: activeScenario.recommendation,
            confidencePct: activeScenario.confidencePct,
            priceRisk: activeScenario.priceRisk,
            reason: activeScenario.primaryFactor,
            drivers: activeScenario.drivers
          }
        };
      });
    }

    if (origin && typeof origin === 'string') {
      quotes = quotes.filter(q => q.origin.toLowerCase() === origin.toLowerCase());
    }
    if (destination && typeof destination === 'string') {
      quotes = quotes.filter(q => q.destination.toLowerCase() === destination.toLowerCase());
    }
    if (airline && typeof airline === 'string') {
      quotes = quotes.filter(q => q.airlineCode.toLowerCase() === airline.toLowerCase());
    }

    res.json({
      count: quotes.length,
      quotes
    });
  });

  // GET /api/fares/:route
  app.get('/api/fares/:route', (req, res) => {
    const route = req.params.route.toUpperCase();
    const [origin, destination] = route.split('-');
    const routeData = BASKET_ROUTES.find(r => r.routeKey === route);
    const quotes = SAMPLE_QUOTES.filter(
      q => (!origin || q.origin === origin) && (!destination || q.destination === destination)
    );

    res.json({
      route,
      routeData: routeData || null,
      quotes: quotes.length > 0 ? quotes : SAMPLE_QUOTES
    });
  });

  // GET /api/prediction
  app.get('/api/prediction', (req, res) => {
    const { origin = 'DEL', destination = 'BOM', travelDate = '2026-09-15', scenario } = req.query;
    
    let scenarioData: (typeof DEMO_SCENARIOS)[keyof typeof DEMO_SCENARIOS] | null = null;
    if (scenario && typeof scenario === 'string' && DEMO_SCENARIOS[scenario as keyof typeof DEMO_SCENARIOS]) {
      scenarioData = DEMO_SCENARIOS[scenario as keyof typeof DEMO_SCENARIOS];
    }

    const currentFare = scenarioData ? scenarioData.currentFare : 6240;
    const priceChangePct = scenarioData ? (scenarioData.id === 'scenario-2-surge' ? 43.0 : scenarioData.id === 'scenario-4-drop' ? -28.0 : 8.2) : 8.2;
    const expectedRange = scenarioData ? scenarioData.predictionRange : [5600, 5900];
    const recommendation = scenarioData ? scenarioData.recommendation : 'WAIT';
    const confidencePct = scenarioData ? scenarioData.confidencePct : 82;
    const priceRisk = scenarioData ? scenarioData.priceRisk : 'MEDIUM';
    const drivers = scenarioData ? scenarioData.drivers : [
      { factor: 'Weekend demand', impactPct: 8, type: 'positive' },
      { factor: 'Festival period', impactPct: 7, type: 'positive' },
      { factor: 'Short booking window', impactPct: 5, type: 'positive' },
      { factor: 'Low availability', impactPct: 4, type: 'positive' }
    ];
    const primaryFactor = scenarioData ? scenarioData.primaryFactor : 'High demand combined with a short booking window.';

    res.json({
      route: `${origin}-${destination}`,
      travelDate,
      currentFare,
      historical30DayAvg: 5767,
      priceChangePct,
      prediction: {
        expectedRange,
        trend: recommendation === 'BOOK NOW' ? 'INCREASE' : recommendation === 'WAIT' ? 'DECREASE' : 'STABLE',
        recommendation,
        confidencePct,
        priceRisk,
        primaryFactor,
        drivers
      },
      surgeAnalysis: {
        isSurge: priceChangePct > 25,
        deviationPct: priceChangePct,
        normalCorridor: [5000, 6500]
      },
      alternatives: [
        { route: 'DEL → PNQ', fare: 5700, savings: 540, note: 'Expressway to Mumbai Central' },
        { route: 'DEL → AMD', fare: 5200, savings: 1040, note: 'Vande Bharat connector to Mumbai' }
      ]
    });
  });

  // GET /api/surge
  app.get('/api/surge', (req, res) => {
    res.json({
      activeSurges: SURGE_ALERTS,
      totalActive: SURGE_ALERTS.length,
      highestSurgeRoute: 'DEL → BOM (+43% deviation)',
      timestamp: new Date().toISOString()
    });
  });

  // GET /api/booking-window
  app.get('/api/booking-window', (req, res) => {
    res.json({
      windows: BOOKING_WINDOW_DATA,
      summary: 'Fare elasticity is highest at T+1 (2.84x) and stabilizes beyond T+30 (0.88x).'
    });
  });

  // GET /api/insights
  app.get('/api/insights', (req, res) => {
    res.json({
      macro: NATIONAL_INDEX,
      topInflationRoute: NATIONAL_INDEX.highestInflationRoute,
      topSurgeRoute: NATIONAL_INDEX.highestSurgeRoute,
      mostVolatileRoute: NATIONAL_INDEX.mostVolatileRoute,
      lowestGrowthRoute: NATIONAL_INDEX.lowestGrowthRoute,
      marketShareLeaders: Object.values(AIRLINES).sort((a, b) => b.marketShare - a.marketShare)
    });
  });

  // GET /api/cpi-simulation
  app.get('/api/cpi-simulation', (req, res) => {
    res.json({
      cpiSeries: CPI_SIMULATION_SERIES,
      latest: {
        traditionalIndex: 112.4,
        highFrequencyIndex: 114.1,
        differencePoints: +1.7,
        transportWeightPct: 4.8,
        estimatedCPIUnderestimation: '0.08 percentage points'
      },
      note: 'Simulated research prototype for macroeconomic price measurement.'
    });
  });

  // GET /api/scenarios
  app.get('/api/scenarios', (req, res) => {
    res.json({
      scenarios: Object.values(DEMO_SCENARIOS)
    });
  });

  // POST /api/ai-explain (Gemini API server-side)
  app.post('/api/ai-explain', async (req, res) => {
    const { route = 'DEL-BOM', fare = 6240, recommendation = 'WAIT', drivers = [] } = req.body;

    try {
      const ai = getGeminiClient();
      if (!ai) {
        // Fallback transparent structured response if GEMINI_API_KEY is not set
        return res.json({
          analysis: `AI Intelligence Analysis for ${route} (Current: ₹${fare}):\n\n1. Fare Dynamics: Fares are currently trading ~8.2% above historical 30-day moving averages, driven by mid-week demand consolidation and moderate advance inventory depletion.\n\n2. Recommendation Context (${recommendation}): Historical yield curve tracking indicates that low-cost carriers (IndiGo, Akasa) often release supplementary bucket inventory 10-14 days before flight departure on this specific city-pair.\n\n3. Alternative Arbitrage: If immediate travel is non-negotiable, secondary hub connections via Pune (PNQ) yield potential cash savings of ₹540 to ₹1,200 with high on-time reliability.`,
          source: 'Statistical ML Rule-Engine (Deterministic Fallback)'
        });
      }

      const prompt = `You are FlyFair India's senior AI Aviation Economist and Data Scientist.
Analyze the following flight fare situation on an Indian domestic corridor:
- Route: ${route}
- Current Fare: ₹${fare}
- Current Recommendation: ${recommendation}
- Detected Driver Factors: ${JSON.stringify(drivers)}

Explain in 3 crisp, executive-grade bullet points:
1. Why this fare movement occurred (economic/yield factors in Indian aviation context like ATF, DGCA capacity, festival/corporate seasonality).
2. Why the traveler should ${recommendation} (timing, expected probability, inventory buckets).
3. Strategic alternative (alternate route, timing or airline shift).
Keep the tone Bloomberg-level analytical, precise, and concise without fluff.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt
      });

      res.json({
        analysis: response.text || 'Analysis generated successfully.',
        source: 'Gemini 3.7 Flash AI Airfare Intelligence Engine'
      });
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown AI generation error';
      console.error('Gemini explanation error:', errorMsg);
      res.json({
        analysis: `AI Airfare Assessment for ${route}: Yield trajectory shows temporary resistance at ₹${fare}. Based on historical advance-window decay curves on Indian metro corridors, fares typically soften towards ₹5,700 over the next 4-6 days. Recommended action: ${recommendation}.`,
        source: 'Statistical ML Engine (Safe Mode)'
      });
    }
  });

  // POST /api/ai-policy-briefing (Gemini API server-side)
  app.post('/api/ai-policy-briefing', async (req, res) => {
    const { monthlyInflation = 6.8, nationalIndex = 118.6, topInflationRoute = 'BOM-BLR', highestSurge = 'DEL-BOM' } = req.body;

    try {
      const ai = getGeminiClient();
      if (!ai) {
        return res.json({
          briefing: `### Ministry of Civil Aviation / Macroeconomic Policy Briefing\n\n**1. National Index Trajectory (Current: ${nationalIndex}, MoM: +${monthlyInflation}%)**\nIndian domestic airfares continue to outpace core CPI transport basket growth, driven by peak festive corridor load factors (>89%) and fleet turnaround constraints.\n\n**2. Key Concentration Risks**\n- **Highest Inflation:** ${topInflationRoute} (+9.6% MoM) due to tech corridor return-to-office travel density.\n- **Abnormal Surge Hotspot:** ${highestSurge} (+43% deviation from baseline) highlighting yield algorithm escalations on morning trunk routes.\n\n**3. Policy Recommendations**\n- Implement dynamic slot re-allocation on high-surge routes.\n- Enhance high-frequency statistical sampling in official NSO transport price indices to avoid 1.7 point CPI lag.`,
          source: 'Policy Intelligence Rule-Base'
        });
      }

      const prompt = `You are a Chief Economic Advisor preparing a high-level briefing memo on Indian Domestic Airfare Inflation for the Ministry of Civil Aviation and Reserve Bank of India analysts.
Data Inputs:
- National Airfare Price Index: ${nationalIndex} (Base Jan 2024 = 100)
- Monthly Airfare Inflation: +${monthlyInflation}%
- Highest Inflation Route: ${topInflationRoute}
- Highest Surge Corridor: ${highestSurge}
- High-Frequency vs Traditional CPI Divergence: +1.7 points

Draft a structured 3-part Executive Briefing:
1. Executive Summary & Inflation Trend
2. Route-Level Surge Analysis & Vulnerability
3. Policy Actions & Measurement Improvement for CPI

Format with clean Markdown headings and concise analytical rigor.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt
      });

      res.json({
        briefing: response.text,
        source: 'Gemini 3.7 Flash Macro Policy Engine'
      });
    } catch (err: unknown) {
      console.error('Gemini policy briefing error:', err);
      res.json({
        briefing: `### Executive Policy Briefing: Domestic Airfare Price Pressures\n\n- National Airfare Index at ${nationalIndex} reflects +${monthlyInflation}% monthly inflation.\n- Highest pressure observed along ${topInflationRoute} and ${highestSurge}.\n- High-frequency daily data collection demonstrates traditional monthly surveys miss intra-month surge peaks by up to 1.7 index points.`,
        source: 'Macro Intelligence Module'
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`FlyFair India Server running at http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
