import React, { useState } from 'react';
import { 
  TrendingUp, 
  Pill, 
  ShieldCheck, 
  Heart, 
  Activity, 
  Download, 
  Filter, 
  AlertCircle, 
  Calendar,
  Layers,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  FileText
} from 'lucide-react';
import { ScreenId } from '../types';

interface DrugTrendsScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const DrugTrendsScreen: React.FC<DrugTrendsScreenProps> = ({
  onNavigate,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Antibiotics' | 'Cardiology' | 'Antidiabetic'>('All');

  const top10Drugs = [
    { rank: 1, name: 'Paracetamol 650mg', class: 'Analgesic / Antipyretic', doses: 14820, share: '17.6%', width: '100%', color: 'bg-[#004357]' },
    { rank: 2, name: 'Telmisartan 40mg', class: 'Antihypertensive', doses: 11430, share: '13.5%', width: '77%', color: 'bg-[#0d5c75]' },
    { rank: 3, name: 'Metformin 500mg', class: 'Antidiabetic / Biguanide', doses: 9860, share: '11.7%', width: '66.5%', color: 'bg-[#006a63]' },
    { rank: 4, name: 'Pantoprazole 40mg', class: 'Gastro / PPI', doses: 8940, share: '10.6%', width: '60.3%', color: 'bg-[#1e667f]' },
    { rank: 5, name: 'Montelukast + Levocetirizine', class: 'Anti-allergy / Respiratory', doses: 7210, share: '8.5%', width: '48.6%', color: 'bg-[#0d5c75]' },
    { rank: 6, name: 'Azithromycin 500mg', class: 'Antibiotic / Macrolide', doses: 6150, share: '7.3%', width: '41.5%', color: 'bg-[#ba1a1a]' },
    { rank: 7, name: 'Atorvastatin 10mg', class: 'Lipid Regulating / Statin', doses: 5480, share: '6.5%', width: '37%', color: 'bg-[#006a63]' },
    { rank: 8, name: 'Amoxicillin + Clavulanate', class: 'Broad Antibiotic', doses: 4890, share: '5.8%', width: '33%', color: 'bg-[#991b1b]' },
    { rank: 9, name: 'Amlodipine 5mg', class: 'Antihypertensive', doses: 4120, share: '4.9%', width: '27.8%', color: 'bg-[#004357]' },
    { rank: 10, name: 'Cetirizine 10mg', class: 'Antihistamine', doses: 3640, share: '4.3%', width: '24.5%', color: 'bg-[#475569]' },
  ];

  const controlledFormulary = [
    { name: 'Meropenem 1g IV', tag: 'Strict Reserve', tagColor: 'bg-rose-100 text-rose-800 border-rose-300', desc: 'Carbapenem reserve requiring ID clearance', rx: 68 },
    { name: 'Tacrolimus 1mg', tag: 'Controlled', tagColor: 'bg-sky-100 text-sky-900 border-sky-300', desc: 'Post-transplant immunosuppressant', rx: 92 },
    { name: 'Colistin 1MIU', tag: 'Strict ICU Reserve', tagColor: 'bg-rose-100 text-rose-800 border-rose-300', desc: 'Pan-drug resistant pathogens only', rx: 114 },
    { name: 'Enoxaparin 40mg', tag: 'Specialized Anticoagulant', tagColor: 'bg-teal-100 text-teal-900 border-teal-300', desc: 'Deep vein thrombosis inpatient prophylaxis', rx: 185 },
    { name: 'Haloperidol 5mg', tag: 'Restricted Neuro', tagColor: 'bg-indigo-100 text-indigo-900 border-indigo-200', desc: 'Acute agitation & delirium psychiatric reserve', rx: 210 },
    { name: 'Remdesivir 100mg', tag: 'Rare Inpatient', tagColor: 'bg-slate-100 text-slate-800 border-slate-300', desc: 'Designated viral pneumonia protocol', rx: 245 },
  ];

  const therapeuticClasses = [
    { label: 'Cardiovascular / Antihypertensive', pct: 32, color: 'bg-[#004357]' },
    { label: 'Metabolic / Diabetes', pct: 24, color: 'bg-[#006a63]' },
    { label: 'Antimicrobials / Antibiotics', pct: 18, color: 'bg-[#ba1a1a]' },
    { label: 'Gastrointestinal', pct: 14, color: 'bg-[#0d5c75]' },
    { label: 'Respiratory & Anti-allergy', pct: 8, color: 'bg-[#90cfec]' },
    { label: 'Others & Rare Formulations', pct: 4, color: 'bg-[#70787d]' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in py-2 pb-16">
      
      {/* Top Header & Breadcrumbs matching Stitch Screen 9 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/60 shadow-clinical">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-secondary uppercase tracking-wider">
              Pharmacy Analytics
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-headline">
            Hospital Drug Utilization &amp; Trends
          </h1>
          <p className="text-xs font-body text-slate-600">
            Hospital Drug Trends &amp; Pharmacy Analytics Dashboard • Antimicrobial Stewardship Program (AMR)
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => onNavigate('disease-epi')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-mono font-bold border border-slate-300 transition-colors"
          >
            <span>← Disease Epidemiology</span>
          </button>
          <button 
            onClick={() => alert('WHO AWaRe Drug Stewardship Audit Log Downloaded.')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#004357] hover:bg-[#0d5c75] text-white text-xs font-mono font-bold transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Formulary Report</span>
          </button>
        </div>
      </div>

      {/* 3 Top Summary KPI Cards (Exact Stitch Screen 9) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Total Doses Dispensed */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-slate-300 shadow-clinical flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold font-mono text-slate-700 uppercase">Total Doses Dispensed</span>
              <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-[#004357]">
                <Pill className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-slate-900 font-mono tracking-tight">84,290</div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold text-emerald-800 font-mono bg-emerald-50 border border-emerald-200">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+6.4% vs last 6 months</span>
            </span>
          </div>
        </div>

        {/* Card 2: Top Prescribed Class */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-slate-300 shadow-clinical flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold font-mono text-slate-700 uppercase">Top Prescribed Class</span>
              <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-[#006a63]">
                <Heart className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl font-bold font-headline text-slate-900 tracking-tight truncate">
              Cardiovascular &amp; HTN
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold font-mono text-slate-800 bg-slate-100 border border-slate-300">
              28,450 doses
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold font-mono text-teal-900 bg-teal-50 border border-teal-200">
              33.7% share
            </span>
          </div>
        </div>

        {/* Card 3: Antibiotic Usage Index */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-slate-300 shadow-clinical flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold font-mono text-slate-700 uppercase">Antibiotic Usage Index</span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#006142]">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-slate-900 font-mono tracking-tight">16.8%</div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold text-emerald-800 font-mono bg-emerald-50 border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Well within WHO target &lt;20%</span>
            </span>
          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* GRAPH: MONTHLY PRESCRIPTION TRENDS TRAJECTORY (MULTI-LINE SVG CHART)     */}
      {/* ========================================================================= */}
      <section className="bg-surface-container-lowest rounded-2xl border border-slate-300 p-6 shadow-clinical space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-headline">
              Monthly Prescription Trends of Top Therapeutic Classes
            </h3>
            <p className="text-xs font-body text-slate-600">
              6-Month trajectory comparing chronic maintenance vs acute surges
            </p>
          </div>

          {/* Trajectory Legend */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 border border-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-[#004357]"></span> Antihypertensives
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 border border-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1e667f]"></span> Analgesics
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 border border-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006a63]"></span> Antidiabetics
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 border border-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a]"></span> Antibiotics (Stewarded)
            </span>
          </div>
        </div>

        {/* SVG Multi-Line Trajectory Canvas */}
        <div className="bg-slate-50/70 rounded-xl border border-slate-200 p-4">
          <div className="relative flex w-full" style={{ height: '260px' }}>
            <div className="w-16 shrink-0 flex flex-col justify-between text-right pr-3 font-mono text-xs font-bold text-slate-600 select-none pb-7 border-r border-slate-300">
              <span>30,000</span>
              <span>25,000</span>
              <span>20,000</span>
              <span>15,000</span>
              <span>10,000</span>
              <span>5,000</span>
              <span>0</span>
            </div>

            <div className="flex-1 relative flex flex-col pl-4 overflow-hidden">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 750 200">
                <line stroke="#e2e8f0" strokeDasharray="3,3" strokeWidth="1" x1="0" x2="750" y1="10" y2="10" />
                <line stroke="#e2e8f0" strokeDasharray="3,3" strokeWidth="1" x1="0" x2="750" y1="42" y2="42" />
                <line stroke="#e2e8f0" strokeDasharray="3,3" strokeWidth="1" x1="0" x2="750" y1="74" y2="74" />
                <line stroke="#e2e8f0" strokeDasharray="3,3" strokeWidth="1" x1="0" x2="750" y1="106" y2="106" />
                <line stroke="#e2e8f0" strokeDasharray="3,3" strokeWidth="1" x1="0" x2="750" y1="138" y2="138" />
                <line stroke="#e2e8f0" strokeDasharray="3,3" strokeWidth="1" x1="0" x2="750" y1="168" y2="168" />
                <line stroke="#cbd5e1" strokeWidth="1.5" x1="0" x2="750" y1="195" y2="195" />

                {/* 1. Antihypertensives Curve (#004357): 21.2k -> 28.45k */}
                <path d="M 40 68 C 120 62, 200 52, 320 44 C 440 36, 560 28, 710 20" fill="none" stroke="#004357" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="40" cy="68" r="5" fill="#004357" stroke="#ffffff" strokeWidth="2" />
                <circle cx="174" cy="58" r="5" fill="#004357" stroke="#ffffff" strokeWidth="2" />
                <circle cx="308" cy="46" r="5" fill="#004357" stroke="#ffffff" strokeWidth="2" />
                <circle cx="442" cy="36" r="5" fill="#004357" stroke="#ffffff" strokeWidth="2" />
                <circle cx="576" cy="28" r="5" fill="#004357" stroke="#ffffff" strokeWidth="2" />
                <circle cx="710" cy="20" r="6" fill="#004357" stroke="#ffffff" strokeWidth="2.5" />

                {/* 2. Analgesics Curve (#1e667f): 19.4k -> peak 26.8k in Jul -> 23.44k */}
                <path d="M 40 78 C 120 72, 200 62, 320 52 C 440 30, 560 42, 710 52" fill="none" stroke="#1e667f" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="40" cy="78" r="5" fill="#1e667f" stroke="#ffffff" strokeWidth="2" />
                <circle cx="174" cy="72" r="5" fill="#1e667f" stroke="#ffffff" strokeWidth="2" />
                <circle cx="308" cy="60" r="5" fill="#1e667f" stroke="#ffffff" strokeWidth="2" />
                <circle cx="442" cy="30" r="5.5" fill="#1e667f" stroke="#ffffff" strokeWidth="2.5" />
                <circle cx="576" cy="42" r="5" fill="#1e667f" stroke="#ffffff" strokeWidth="2" />
                <circle cx="710" cy="52" r="5.5" fill="#1e667f" stroke="#ffffff" strokeWidth="2" />

                {/* 3. Antidiabetics Curve (#006a63): 15.1k -> 18.24k */}
                <path d="M 40 105 C 120 102, 200 98, 320 94 C 440 90, 560 86, 710 82" fill="none" stroke="#006a63" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="40" cy="105" r="5" fill="#006a63" stroke="#ffffff" strokeWidth="2" />
                <circle cx="174" cy="102" r="5" fill="#006a63" stroke="#ffffff" strokeWidth="2" />
                <circle cx="308" cy="98" r="5" fill="#006a63" stroke="#ffffff" strokeWidth="2" />
                <circle cx="442" cy="94" r="5" fill="#006a63" stroke="#ffffff" strokeWidth="2" />
                <circle cx="576" cy="90" r="5" fill="#006a63" stroke="#ffffff" strokeWidth="2" />
                <circle cx="710" cy="82" r="5.5" fill="#006a63" stroke="#ffffff" strokeWidth="2" />

                {/* 4. Antibiotics Curve (#ba1a1a): 18.9k -> 14.16k (Downward stewardship trend) */}
                <path d="M 40 82 C 120 88, 200 94, 320 102 C 440 110, 560 116, 710 120" fill="none" stroke="#ba1a1a" strokeWidth="3" strokeDasharray="5,3" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="40" cy="82" r="4.5" fill="#ba1a1a" stroke="#ffffff" strokeWidth="2" />
                <circle cx="174" cy="88" r="4.5" fill="#ba1a1a" stroke="#ffffff" strokeWidth="2" />
                <circle cx="308" cy="94" r="4.5" fill="#ba1a1a" stroke="#ffffff" strokeWidth="2" />
                <circle cx="442" cy="102" r="4.5" fill="#ba1a1a" stroke="#ffffff" strokeWidth="2" />
                <circle cx="576" cy="110" r="4.5" fill="#ba1a1a" stroke="#ffffff" strokeWidth="2" />
                <circle cx="710" cy="120" r="5" fill="#ba1a1a" stroke="#ffffff" strokeWidth="2" />

                {/* Latest value tag */}
                <rect fill="#004357" height="22" rx="4" width="94" x="638" y="4" />
                <text fill="#ffffff" fontFamily="JetBrains Mono" fontSize="11" fontWeight="bold" textAnchor="middle" x="685" y="19">28,450 (Top)</text>
              </svg>

              <div className="flex justify-between items-center text-xs text-slate-800 font-mono pt-2 border-t border-slate-300 mt-1">
                <span className="font-bold text-center">Apr '25</span>
                <span className="font-bold text-center">May '25</span>
                <span className="font-bold text-center">Jun '25</span>
                <span className="font-bold text-center">Jul '25 (Seasonal Surge)</span>
                <span className="font-bold text-center">Aug '25</span>
                <span className="font-bold text-center text-[#004357]">Sep '25 (Latest)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PRIMARY SECTION: MOST PRESCRIBED VS LEAST PRESCRIBED (BENTO PANE)         */}
      {/* ========================================================================= */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* CARD 1: TOP 10 MOST PRESCRIBED DRUGS (7 COLUMNS) */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-2xl border border-slate-300 p-6 shadow-clinical flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-4 pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900 font-headline">
                Top 10 Most Prescribed Hospital Drugs
              </h3>
              <p className="text-xs font-body text-slate-500">
                Ranked by dispensed volume in inpatient &amp; outpatient registries
              </p>
            </div>

            {/* Ranked Bar List */}
            <div className="space-y-3.5">
              {top10Drugs.map((d) => (
                <div key={d.rank}>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-500 w-5 text-center">
                        {d.rank}
                      </span>
                      <span className="font-bold text-slate-900 text-sm">
                        {d.name}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                        {d.class}
                      </span>
                    </div>
                    <div className="font-mono text-xs text-slate-900 font-bold">
                      {d.doses.toLocaleString()} <span className="text-slate-500 font-semibold">({d.share})</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
                    <div className={`${d.color} h-full rounded-full`} style={{ width: d.width }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600 font-medium">
            <span>Showing Top 10 of 418 formulary compounds</span>
            <span className="font-mono font-bold text-[#004357] bg-slate-100 px-2 py-1 rounded border border-slate-200">
              OPD Prescription Velocity: 14.2 / hr
            </span>
          </div>
        </div>

        {/* CARD 2: LEAST PRESCRIBED & CONTROLLED FORMULARY (5 COLUMNS) */}
        <div className="lg:col-span-5 bg-surface-container-lowest rounded-2xl border border-slate-300 p-6 shadow-clinical flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-headline flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-rose-700" />
                  Least Prescribed &amp; Controlled Formulary
                </h3>
                <p className="text-xs font-body text-slate-500 mt-0.5">
                  Reserve antimicrobials and high-vigilance drugs
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-rose-100 text-rose-900 border border-rose-300">
                Strict Audit
              </span>
            </div>

            {/* List of Controlled Formulary Items */}
            <div className="mt-4 space-y-3">
              {controlledFormulary.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between hover:bg-slate-50 transition-colors shadow-2xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{item.name}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${item.tagColor}`}>
                        {item.tag}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{item.desc}</p>
                  </div>
                  <div className="text-right pl-3">
                    <span className="font-mono text-base font-bold text-slate-900">{item.rx}</span>
                    <span className="block text-[11px] text-slate-500 font-mono font-semibold">Rx Total</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-700 font-semibold">
            <span className="flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              100% Prescription Audit Compliance
            </span>
            <button 
              onClick={() => alert('Opening Antimicrobial Stewardship Review Logs...')}
              className="text-[#004357] hover:underline text-xs font-bold"
            >
              View Stewardship Logs
            </button>
          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* THERAPEUTIC CLASS DISTRIBUTION                                            */}
      {/* ========================================================================= */}
      <section className="bg-surface-container-lowest rounded-2xl border border-slate-300 p-6 shadow-clinical space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-headline">
              Therapeutic Class Distribution
            </h3>
            <p className="text-xs font-body text-slate-500">
              Percentage share across all inpatient &amp; outpatient departments
            </p>
          </div>
          <span className="font-mono text-xs font-bold text-[#004357] bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
            100% Formulary Total
          </span>
        </div>

        {/* Split Progress Bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
          {therapeuticClasses.map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                <span className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded ${item.color}`} />
                  <span>{item.label}</span>
                </span>
                <span className="font-mono font-bold text-slate-900">{item.pct}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.pct}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600 font-mono">
          <span>Primary Driver: Chronic Lifestyle Care (Cardiology &amp; Endocrinology)</span>
          <span className="text-[#006a63] font-bold">56% Combined Share</span>
        </div>
      </section>

    </div>
  );
};

export default DrugTrendsScreen;
