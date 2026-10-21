import React, { useState } from 'react';
import { 
  Globe, 
  AlertTriangle, 
  TrendingUp, 
  ShieldAlert, 
  Activity, 
  MapPin, 
  Users, 
  Building2, 
  Filter, 
  ArrowRight, 
  Download, 
  FileText,
  Search,
  Radio
} from 'lucide-react';
import { ScreenId, OutbreakData } from '../types';
import { mockOutbreaks } from '../data/mockData';

interface DiseaseEpidemiologyScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const DiseaseEpidemiologyScreen: React.FC<DiseaseEpidemiologyScreenProps> = ({
  onNavigate
}) => {
  const [selectedPathogen, setSelectedPathogen] = useState<string>('all');
  const [selectedOutbreak, setSelectedOutbreak] = useState<OutbreakData>(mockOutbreaks[0]);

  const filteredOutbreaks = mockOutbreaks.filter(o => 
    selectedPathogen === 'all' || o.pathogenType.toLowerCase() === selectedPathogen.toLowerCase()
  );

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-primary to-slate-800 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-700/60">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="bg-emergency/80 text-white text-xs font-bold px-2.5 py-0.5 rounded-md flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                8th
              </span>
              <span className="text-xs font-bold text-rose-300 uppercase tracking-wider">
                Epidemiological Surveillance • National Health Grid
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white">
              Disease Epidemiology & Outbreak Intelligence
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Integrated Disease Surveillance Programme (IDSP) & ICMR sentinel network analytics with regional transmission velocity tracking
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('drug-trends')}
              className="bg-secondary hover:bg-secondary-light active:scale-95 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 transition-all"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Drug Trends & AMR (9th)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Macro Surveillance KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Surveillance Cases</span>
          <div className="text-3xl font-black text-slate-900 font-display">32,800</div>
          <div className="text-xs text-rose-600 font-bold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            +14.2% Weekly Velocity
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Reproduction Rate (Rt)</span>
          <div className="text-3xl font-black text-emergency font-display">1.84</div>
          <div className="text-xs text-slate-500">
            DENV-2 Strain • Rapid Local Spread
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">ICU Bed Stress</span>
          <div className="text-3xl font-black text-amber-600 font-display">42.0%</div>
          <div className="text-xs text-slate-500">
            Public & Partner Hospital Reserve
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Hotspots</span>
          <div className="text-3xl font-black text-primary font-display">4 Metros</div>
          <div className="text-xs text-slate-500">
            Delhi NCR, BLR, CCU, HYD
          </div>
        </div>
      </div>

      {/* Outbreak Heatmap & Regional Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Outbreaks List & Pathogen Filter (Left 2/3) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-emergency" />
                  <span>Sentinel Pathogen Surveillance</span>
                </h2>
                <p className="text-xs text-slate-500">
                  Select an outbreak to examine cluster telemetry and clinical guidelines
                </p>
              </div>

              {/* Pathogen Filter Chips */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
                {['all', 'vector-borne', 'viral', 'bacterial'].map(type => (
                  <button
                    key={type}
                    onClick={() => setSelectedPathogen(type)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all whitespace-nowrap ${
                      selectedPathogen === type
                        ? 'bg-primary text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Outbreaks Cards */}
            <div className="space-y-3">
              {filteredOutbreaks.map((outbreak) => {
                const isSelected = selectedOutbreak.id === outbreak.id;

                return (
                  <div
                    key={outbreak.id}
                    onClick={() => setSelectedOutbreak(outbreak)}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-rose-50/60 border-rose-300 shadow-sm' 
                        : 'bg-slate-50/70 border-slate-200/80 hover:bg-slate-100/70'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base font-bold text-slate-900">{outbreak.disease}</h3>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            outbreak.riskLevel === 'Severe Alert'
                              ? 'bg-emergency text-white'
                              : outbreak.riskLevel === 'High'
                              ? 'bg-amber-500 text-white'
                              : 'bg-slate-200 text-slate-700'
                          }`}>
                            {outbreak.riskLevel}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500">
                          Hotspots: <strong className="text-slate-800">{outbreak.hotspots.join(', ')}</strong>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs">
                        <div className="text-right">
                          <span className="font-black text-slate-900 font-display text-sm block">
                            {outbreak.cases.toLocaleString()} cases
                          </span>
                          <span className="text-[10px] text-slate-500">
                            Rt: {outbreak.r0} • Peak: {outbreak.seasonalPeak}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* Selected Outbreak Drilldown (Right 1/3) */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-secondary uppercase tracking-wider">
                Cluster Telemetry
              </span>
              <span className="text-xs font-mono text-slate-400">
                {selectedOutbreak.id}
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 font-display">
                {selectedOutbreak.disease}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Pathogen Classification: <strong className="text-primary">{selectedOutbreak.pathogenType}</strong>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block font-semibold">Total Cases</span>
                <span className="text-base font-black text-slate-900 font-display">{selectedOutbreak.cases}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block font-semibold">Reproduction Rt</span>
                <span className="text-base font-black text-emergency font-display">{selectedOutbreak.r0}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block font-semibold">Positivity Rate</span>
                <span className="text-base font-black text-slate-900 font-display">{selectedOutbreak.positivityRate}%</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block font-semibold">ICU Occupancy</span>
                <span className="text-base font-black text-amber-600 font-display">{selectedOutbreak.icuOccupancy}%</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                Primary Affected States:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedOutbreak.primaryAffectedStates.map((state, i) => (
                  <span key={i} className="text-xs font-bold bg-slate-100 text-slate-800 px-2.5 py-1 rounded-lg border border-slate-200">
                    📍 {state}
                  </span>
                ))}
              </div>
            </div>

            {/* Clinical Advisory Pill */}
            <div className="p-3 bg-rose-50 rounded-2xl border border-rose-200 text-xs text-rose-900 space-y-1">
              <strong className="block">Clinical Directive for Physicians:</strong>
              <p className="text-[11px] text-rose-800 leading-relaxed">
                Maintain high suspicion for thrombocytopenia. Avoid prescribing NSAIDs (Ibuprofen, Mefenamic acid) for febrile episodes; use Paracetamol only. Monitor hematocrit for plasma leakage.
              </p>
            </div>

            <button
              onClick={() => onNavigate('drug-trends')}
              className="w-full bg-primary hover:bg-primary-light text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <span>Examine Related Drug Trends (9th)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default DiseaseEpidemiologyScreen;
