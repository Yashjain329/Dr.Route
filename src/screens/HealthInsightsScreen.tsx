import React, { useState } from 'react';
import { 
  Sparkles, 
  Activity, 
  ShieldCheck, 
  TrendingDown, 
  TrendingUp, 
  Heart, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  BrainCircuit, 
  FolderClock, 
  PlusCircle,
  Clock,
  Dna
} from 'lucide-react';
import { ScreenId, Patient } from '../types';
import { mockDoctor } from '../data/mockData';

interface HealthInsightsScreenProps {
  onNavigate: (screen: ScreenId) => void;
  selectedPatient: Patient;
}

export const HealthInsightsScreen: React.FC<HealthInsightsScreenProps> = ({
  onNavigate,
  selectedPatient
}) => {
  const [activeTab, setActiveTab] = useState<'cardio' | 'metabolic' | 'adherence'>('cardio');

  const biomarkers = [
    { name: "Blood Pressure", value: "136/84", score: 84, target: "< 130/80", status: "Optimal" },
    { name: "LDL Direct", value: "78 mg/dL", score: 92, target: "< 100", status: "Controlled" },
    { name: "HbA1c", value: "6.8%", score: 78, target: "< 7.0%", status: "Acceptable" },
    { name: "Renal eGFR", value: "88 mL/min", score: 94, target: "> 60", status: "Protected" },
    { name: "Rx Adherence", value: "94.2%", score: 95, target: "> 90%", status: "Excellent" },
    { name: "Daily Activity", value: "6,420 steps", score: 75, target: "8,000", status: "Fair" },
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-primary to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-purple-800/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-purple-500/30 text-purple-200 text-xs font-bold px-2.5 py-0.5 rounded-md border border-purple-400/30">
                7th
              </span>
              <span className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Inside Health Insights • AI Clinical Intelligence
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white">
              AI Prognostic Insights: {selectedPatient.name}
            </h1>
            <p className="text-xs sm:text-sm text-purple-200/80 max-w-xl">
              Predictive cardiovascular risk stratification, longitudinal glycemic curves, and automated clinical guidelines
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('submit-open-chart')}
              className="bg-white/10 hover:bg-white/20 active:scale-95 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl border border-white/20 backdrop-blur-md flex items-center gap-1.5 transition-all"
            >
              <Activity className="w-4 h-4 text-secondary-fixed" />
              <span>Open Chart (4th)</span>
            </button>
            <button
              onClick={() => onNavigate('new-prescription')}
              className="bg-secondary hover:bg-secondary-light active:scale-95 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Modify Rx (6th)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3 Main Predictive Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Card 1: 10-Yr Cardiovascular ASCVD Risk */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">10-Year ASCVD Risk</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Heart className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-900 font-display">8.4%</div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold mt-1">
              <TrendingDown className="w-4 h-4" />
              <span>Reduced from 14.8% (Pre-treatment)</span>
            </div>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: '38%' }}></div>
          </div>
          <p className="text-[11px] text-slate-500">
            Framingham & South Asian ASCVD model. Statin + ARB therapy reduced event probability by 43%.
          </p>
        </div>

        {/* Card 2: Metabolic Glycemic Forecast */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Projected HbA1c (12M)</span>
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-secondary flex items-center justify-center">
              <Dna className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-900 font-display">6.4%</div>
            <div className="flex items-center gap-1.5 text-xs text-secondary-teal font-bold mt-1">
              <TrendingDown className="w-4 h-4" />
              <span>On-track to sub-6.5% remission</span>
            </div>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-secondary h-full rounded-full" style={{ width: '74%' }}></div>
          </div>
          <p className="text-[11px] text-slate-500">
            Current Metformin ER compliance and dietary adherence forecast long-term microvascular safety.
          </p>
        </div>

        {/* Card 3: Renal Preservation Index */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Renal Preservation</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-900 font-display">88 mL/min</div>
            <div className="flex items-center gap-1.5 text-xs text-purple-700 font-bold mt-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Stage 1 (Normal / High Reserve)</span>
            </div>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-purple-600 h-full rounded-full" style={{ width: '88%' }}></div>
          </div>
          <p className="text-[11px] text-slate-500">
            Telmisartan provides significant intraglomerular pressure reduction. Serum creatinine: 0.98.
          </p>
        </div>

      </div>

      {/* Biomarker Multi-axis Radar / Bar Comparison */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
              <Activity className="w-4 h-4 text-secondary" />
              <span>Patient Clinical Biomarker Radar</span>
            </h3>
            <p className="text-xs text-slate-500">
              Evaluated against ACC/AHA and Indian ICMR cardiometabolic targets
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Composite Score: 86 / 100
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {biomarkers.map((bm, idx) => (
            <div key={idx} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-800">{bm.name}</span>
                  <span className="text-[11px] text-slate-500 block">Target: {bm.target}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-slate-900 font-display">{bm.value}</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.2 rounded block mt-0.5">
                    {bm.status}
                  </span>
                </div>
              </div>

              <div className="w-full bg-slate-200/80 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-primary h-full rounded-full transition-all" 
                  style={{ width: `${bm.score}%` }} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Clinical Recommendations Engine */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-purple-600" />
          <span>AI Clinical Copilot Recommendations for {selectedPatient.name}</span>
        </h3>

        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <h4 className="font-bold text-purple-900">
                1. Statin Titration Candidate at 6-Month Review
              </h4>
              <p className="text-purple-800 leading-relaxed">
                Patient's LDL is stable at 78 mg/dL. If next lipid panel confirms LDL &lt; 70 mg/dL with zero coronary calcium progression, consider maintaining Atorvastatin 10mg or stepping down after risk verification.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <h4 className="font-bold text-teal-900">
                2. Microalbuminuria & Diabetic Nephropathy Screening
              </h4>
              <p className="text-teal-800 leading-relaxed">
                Schedule urine Spot Albumin-to-Creatinine Ratio (uACR) in 60 days to document lack of microalbuminuria under Telmisartan therapy.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <h4 className="font-bold text-amber-900">
                3. Regional Vector-Borne Surge Advisory
              </h4>
              <p className="text-amber-800 leading-relaxed">
                Active Dengue surge reported in patient's residential zip code (Delhi NCR). Advise prompt fever reporting, adequate oral hydration, and avoid NSAIDs for fever triage.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default HealthInsightsScreen;
