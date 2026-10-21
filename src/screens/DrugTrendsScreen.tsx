import React, { useState } from 'react';
import { 
  TrendingUp, 
  Pill, 
  AlertTriangle, 
  ShieldCheck, 
  Activity, 
  ArrowRight, 
  Filter, 
  Search, 
  CheckCircle2, 
  TrendingDown, 
  Building2, 
  Sparkles,
  Download
} from 'lucide-react';
import { ScreenId, DrugTrendItem } from '../types';
import { mockDrugTrends } from '../data/mockData';

interface DrugTrendsScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const DrugTrendsScreen: React.FC<DrugTrendsScreenProps> = ({
  onNavigate
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTrends = mockDrugTrends.filter(item => {
    const matchesCategory = 
      selectedCategory === 'all' || 
      item.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = 
      item.moleculeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.topPrescribedFor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-primary via-slate-900 to-teal-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-teal-800/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="bg-secondary text-white text-xs font-bold px-2.5 py-0.5 rounded-md">
                9th
              </span>
              <span className="text-xs font-bold text-secondary-fixed uppercase tracking-wider">
                Pharmaceutical Intelligence • AMR Sentinel Network
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white">
              Regional Drug Trends & Antimicrobial Stewardship
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Macro prescription consumption patterns, generic substitution metrics, and antimicrobial resistance (AMR) sentinel watchlists
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('disease-epi')}
              className="bg-white/10 hover:bg-white/20 active:scale-95 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl border border-white/20 backdrop-blur-md flex items-center gap-2 transition-all"
            >
              <span>Disease Surveillance (8th)</span>
            </button>
            <button
              onClick={() => onNavigate('new-prescription')}
              className="bg-secondary hover:bg-secondary-light active:scale-95 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 transition-all"
            >
              <Pill className="w-4 h-4" />
              <span>Write e-Rx (6th)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Macro Pharmaceutical KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Monitored Volume</span>
          <div className="text-3xl font-black text-slate-900 font-display">1.28M Rx</div>
          <div className="text-xs text-secondary-teal font-bold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            +11.4% Quarter Growth
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Generic Adoption</span>
          <div className="text-3xl font-black text-emerald-600 font-display">74.6%</div>
          <div className="text-xs text-slate-500">
            Jan Aushadhi & ABDM generic shift
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">AMR Flagged Molecules</span>
          <div className="text-3xl font-black text-emergency font-display">3 Antibiotics</div>
          <div className="text-xs text-rose-600 font-bold">
            Meropenem, Azithro, Cipro
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Critical Supply</span>
          <div className="text-3xl font-black text-amber-600 font-display">Optimal</div>
          <div className="text-xs text-slate-500">
            96.8% In-Stock Partner Pharmacies
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All Molecules' },
            { id: 'antibiotic', label: 'Antibiotics & AMR' },
            { id: 'antihypertensive', label: 'Antihypertensives' },
            { id: 'antidiabetic', label: 'Antidiabetics' },
            { id: 'statin', label: 'Statins' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === tab.id
                  ? 'bg-primary text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search molecule, indication..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-secondary focus:bg-white"
          />
        </div>
      </div>

      {/* Molecules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTrends.map((drug) => {
          return (
            <div
              key={drug.id}
              className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-sm hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {drug.category}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 font-display">
                      {drug.moleculeName}
                    </h3>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    drug.stockAvailability === 'Abundant'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : drug.stockAvailability === 'Optimal'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {drug.stockAvailability}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {drug.topPrescribedFor}
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Quarter Volume</span>
                    <span className="font-black text-slate-900 font-display">
                      {(drug.quarterPrescriptions / 1000).toFixed(1)}k Rx
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Growth Delta</span>
                    <span className={`font-black font-display flex items-center gap-0.5 ${
                      drug.growthPercentage >= 0 ? 'text-secondary-teal' : 'text-slate-500'
                    }`}>
                      {drug.growthPercentage >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {drug.growthPercentage}%
                    </span>
                  </div>
                </div>

                {/* AMR Warning if present */}
                {drug.amrResistanceRate !== undefined && (
                  <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-xs flex items-center justify-between text-emergency">
                    <span className="font-bold flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      AMR Resistance Rate:
                    </span>
                    <span className="font-black font-display text-sm">
                      {drug.amrResistanceRate}%
                    </span>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-500">
                  Generic Share: <strong className="text-slate-800">{drug.genericAdoptionRate}%</strong>
                </span>

                <button
                  onClick={() => onNavigate('new-prescription')}
                  className="text-xs font-bold text-secondary hover:underline flex items-center gap-1"
                >
                  <span>Prescribe</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};

export default DrugTrendsScreen;
