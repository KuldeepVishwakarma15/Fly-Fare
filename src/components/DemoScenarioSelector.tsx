import React from 'react';
import { DEMO_SCENARIOS } from '../data/mockAirfareData';
import { DemoScenarioKey } from '../types';
import { Sparkles, Zap, Flame, TrendingDown, Sun, PlayCircle } from 'lucide-react';

interface DemoScenarioSelectorProps {
  id?: string;
  activeScenarioKey: DemoScenarioKey;
  onSelectScenario: (key: DemoScenarioKey) => void;
}

export const DemoScenarioSelector: React.FC<DemoScenarioSelectorProps> = ({
  id,
  activeScenarioKey,
  onSelectScenario
}) => {
  const scenarios = Object.values(DEMO_SCENARIOS);

  const getIcon = (key: DemoScenarioKey) => {
    switch (key) {
      case 'scenario-1-normal':
        return <PlayCircle className="w-3.5 h-3.5" />;
      case 'scenario-2-surge':
        return <Zap className="w-3.5 h-3.5 text-rose-500" />;
      case 'scenario-3-festival':
        return <Flame className="w-3.5 h-3.5 text-amber-500" />;
      case 'scenario-4-drop':
        return <TrendingDown className="w-3.5 h-3.5 text-emerald-500" />;
      case 'scenario-5-monsoon':
        return <Sun className="w-3.5 h-3.5 text-blue-500" />;
    }
  };

  return (
    <div
      id={id}
      className="bg-[#0A0A0A] border-b border-slate-800 text-slate-300 px-4 py-2.5 shadow-sm"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Sparkles className="w-3 h-3 text-blue-400" />
            Hackathon Live Demo Mode
          </span>
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            Simulate realistic Indian airfare market conditions:
          </span>
        </div>

        {/* Predefined Scenarios Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {scenarios.map((sc) => {
            const isActive = activeScenarioKey === sc.id;
            return (
              <button
                key={sc.id}
                onClick={() => onSelectScenario(sc.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-950/50 border border-blue-500'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
                }`}
              >
                {getIcon(sc.id)}
                <span>{sc.title.split('—')[1] || sc.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
