import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Activity, 
  Heart, 
  Wind, 
  Thermometer, 
  Droplet, 
  Calendar, 
  Printer, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle2, 
  AlertTriangle,
  Layers,
  Clock,
  ShieldCheck,
  ChevronRight,
  Share2,
  FileText
} from 'lucide-react';
import { ScreenId, Patient } from '../types';

interface HealthInsightsScreenProps {
  onNavigate: (screen: ScreenId) => void;
  selectedPatient: Patient;
}

export const HealthInsightsScreen: React.FC<HealthInsightsScreenProps> = ({
  onNavigate,
  selectedPatient,
}) => {
  const [timeRange, setTimeRange] = useState<'30D' | '90D' | '1Y'>('90D');

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in py-2 pb-16">
      
      {/* Top Header & Breadcrumbs matching Stitch */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/60 shadow-clinical">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('prescription')}
            className="p-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary border border-outline-variant transition-colors"
            title="Back to Prescriptions"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-outline">
              <span>Prescription Suite</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-secondary font-bold">Health Insights</span>
            </div>
            <h1 className="text-xl font-extrabold text-primary font-headline">
              Patient Treatment Summary &amp; Longitudinal Clinical Analytics
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Time Range Selector */}
          <div className="flex items-center bg-surface-container-low p-1 rounded-xl border border-outline-variant/50 text-xs font-mono">
            {(['30D', '90D', '1Y'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-3 py-1 rounded-lg transition-all ${
                  timeRange === r 
                    ? 'bg-primary-container text-on-primary font-bold shadow-xs' 
                    : 'text-outline hover:text-on-surface'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-container text-primary text-xs font-mono font-bold hover:bg-surface-container-high border border-outline-variant transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print Chart Sheet</span>
          </button>
        </div>
      </div>

      {/* Patient Profile Card (Matching Stitch Screen 7) */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#004357] text-white flex items-center justify-center font-bold text-2xl border border-[#0d5c75] shadow-sm">
              RM
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-extrabold text-slate-900 font-headline tracking-tight">
                  Rohit Mehta
                </h2>
                <span className="bg-slate-100 text-[#004357] border border-slate-300 text-xs font-mono font-bold px-2.5 py-0.5 rounded uppercase">
                  PID-2025-88412
                </span>
                <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-mono font-bold px-2.5 py-0.5 rounded-full">
                  Active Regimen
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-slate-700 pt-1.5">
                <span>Age/Sex: <strong>34 Y / Male</strong></span>
                <span className="text-slate-300">•</span>
                <span>Blood Group: <strong className="text-teal-800 font-mono">B+ (Rh Positive)</strong></span>
                <span className="text-slate-300">•</span>
                <span>Attending: <strong>Dr. Ritesh Khandelwal, MD</strong></span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            <div className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-300 text-center min-w-[100px]">
              <div className="text-xl font-bold font-mono text-[#004357]">18</div>
              <div className="text-[10px] text-slate-500 font-semibold uppercase">Total Visits</div>
            </div>
            <div className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-300 text-center min-w-[100px]">
              <div className="text-xl font-bold font-mono text-teal-800">11</div>
              <div className="text-[10px] text-slate-500 font-semibold uppercase">Hospital Visits</div>
            </div>
            <div className="px-4 py-2 rounded-xl bg-amber-50 border border-amber-300 text-amber-950">
              <div className="text-[10px] font-bold text-amber-900 uppercase tracking-wide">Known Hypersensitivity</div>
              <div className="font-bold text-amber-950 font-mono text-xs">Penicillin G, Ciprofloxacin (Mild)</div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION TITLE BANNER */}
      <div className="flex flex-wrap items-center justify-between bg-surface-container-lowest border border-outline-variant/60 rounded-2xl px-5 py-4 shadow-clinical">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-800 text-white flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 font-headline">
              Patient Longitudinal Vitals &amp; Fluid Metrics (Spacious Independent Graphs)
            </h3>
            <p className="text-xs text-slate-600">
              Patient Prescription Treatment &amp; Longitudinal Analytics Portal — Dedicated longitudinal graphs with clinical envelopes, fluid balance, and recurrence analytics.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span> Live Telemetry Connected
          </span>
        </div>
      </div>

      {/* KHULE-KHULE INDEPENDENT VITALS CHARTS (EXACT REPRODUCTION FROM STITCH SCREEN 7) */}
      <div className="space-y-6">
        
        {/* ========================================================================= */}
        {/* 1. BLOOD PRESSURE CHART (BP) - Systolic & Diastolic                       */}
        {/* ========================================================================= */}
        <section className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 p-6 shadow-clinical">
          <div className="flex flex-wrap items-start justify-between pb-4 border-b border-slate-200 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0d5c75] text-white flex items-center justify-center shadow-xs">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h4 className="text-base font-bold text-slate-900 font-headline">
                    1. Blood Pressure (BP) - Systolic &amp; Diastolic
                  </h4>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                    Optimal Baseline Control
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  Clinical Normal Envelope: Systolic &lt; 120 mmHg • Diastolic &lt; 80 mmHg (Unit: mmHg)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <span className="text-xs text-slate-500 font-medium block">Current Reading (15 Oct '25)</span>
                <div className="font-mono text-2xl font-bold text-[#0d5c75]">
                  128 / 82 <span className="text-xs font-normal text-slate-600">mmHg</span>
                </div>
                <span className="text-[11px] font-mono text-emerald-700 font-bold">
                  ↓ 10 mmHg reduction vs Nov '24 baseline
                </span>
              </div>
              <div className="border-l border-slate-200 pl-4 flex flex-col gap-1.5 text-xs font-medium">
                <span className="flex items-center gap-2 text-slate-800">
                  <span className="w-4 h-1.5 bg-[#0d5c75] rounded-full inline-block"></span> Systolic BP (SYS)
                </span>
                <span className="flex items-center gap-2 text-slate-800">
                  <span className="w-4 h-1.5 bg-[#006a63] rounded-full inline-block"></span> Diastolic BP (DIA)
                </span>
              </div>
            </div>
          </div>

          {/* Large Clear Chart Canvas with Y-Axis */}
          <div className="mt-5 bg-white rounded-xl border border-slate-200 p-4">
            <div className="relative flex w-full" style={{ height: '250px' }}>
              <div className="w-16 shrink-0 flex flex-col justify-between text-right pr-3 font-mono text-xs font-bold text-slate-800 select-none pb-7 border-r border-slate-300">
                <span>160</span>
                <span>140</span>
                <span>120</span>
                <span>100</span>
                <span>80</span>
                <span>60</span>
              </div>
              <div className="flex-1 relative flex flex-col pl-3 overflow-hidden">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 750 170">
                  {/* Grid Lines */}
                  <line stroke="#94a3b8" strokeDasharray="3,3" strokeWidth="1.2" x1="0" x2="750" y1="10" y2="10" />
                  <line stroke="#94a3b8" strokeDasharray="3,3" strokeWidth="1.2" x1="0" x2="750" y1="42" y2="42" />
                  <line stroke="#006a63" strokeDasharray="5,4" strokeWidth="1.5" x1="0" x2="750" y1="74" y2="74" />
                  <line stroke="#94a3b8" strokeDasharray="3,3" strokeWidth="1.2" x1="0" x2="750" y1="106" y2="106" />
                  <line stroke="#006a63" strokeDasharray="5,4" strokeWidth="1.5" x1="0" x2="750" y1="138" y2="138" />
                  <line stroke="#94a3b8" strokeDasharray="3,3" strokeWidth="1.2" x1="0" x2="750" y1="165" y2="165" />
                  
                  {/* Systolic Spline Curve (#0d5c75) */}
                  <path d="M 35 48 C 110 42, 170 34, 275 52 C 380 70, 485 64, 595 48 C 640 42, 680 40, 715 42" fill="none" stroke="#0d5c75" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
                  <circle cx="35" cy="48" fill="#0d5c75" r="6.5" stroke="#ffffff" strokeWidth="2.5" />
                  <circle cx="155" cy="38" fill="#0d5c75" r="6.5" stroke="#ffffff" strokeWidth="2.5" />
                  <circle cx="275" cy="52" fill="#0d5c75" r="6.5" stroke="#ffffff" strokeWidth="2.5" />
                  <circle cx="395" cy="66" fill="#0d5c75" r="6.5" stroke="#ffffff" strokeWidth="2.5" />
                  <circle cx="505" cy="62" fill="#0d5c75" r="6.5" stroke="#ffffff" strokeWidth="2.5" />
                  <circle cx="615" cy="48" fill="#0d5c75" r="6.5" stroke="#ffffff" strokeWidth="2.5" />
                  <circle cx="715" cy="42" fill="#0d5c75" r="7.5" stroke="#ffffff" strokeWidth="3" />

                  {/* Diastolic Spline Curve (#006a63) */}
                  <path d="M 35 128 C 110 132, 170 125, 275 124 C 380 120, 485 116, 595 118 C 640 120, 680 122, 715 123" fill="none" stroke="#006a63" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" />
                  <circle cx="35" cy="128" fill="#006a63" r="6" stroke="#ffffff" strokeWidth="2.5" />
                  <circle cx="155" cy="125" fill="#006a63" r="6" stroke="#ffffff" strokeWidth="2.5" />
                  <circle cx="275" cy="124" fill="#006a63" r="6" stroke="#ffffff" strokeWidth="2.5" />
                  <circle cx="395" cy="120" fill="#006a63" r="6" stroke="#ffffff" strokeWidth="2.5" />
                  <circle cx="505" cy="116" fill="#006a63" r="6" stroke="#ffffff" strokeWidth="2.5" />
                  <circle cx="615" cy="118" fill="#006a63" r="6" stroke="#ffffff" strokeWidth="2.5" />
                  <circle cx="715" cy="123" fill="#006a63" r="7" stroke="#ffffff" strokeWidth="3" />

                  {/* Latest Reading Indicator Tag */}
                  <rect fill="#0d5c75" height="24" rx="4" width="84" x="644" y="12" />
                  <text fill="#ffffff" fontFamily="JetBrains Mono" fontSize="12" fontWeight="bold" textAnchor="middle" x="686" y="28">128 / 82</text>
                </svg>

                {/* Date Columns along X-Axis */}
                <div className="flex justify-between items-center text-xs text-slate-800 font-mono pt-2.5 border-t border-slate-300 mt-1">
                  <div className="text-center"><span className="font-bold text-slate-900 block">14 Nov '24</span><span className="text-[11px] font-bold text-slate-700">138/92</span></div>
                  <div className="text-center"><span className="font-bold text-slate-900 block">05 Jan '25</span><span className="text-[11px] font-bold text-slate-700">144/90</span></div>
                  <div className="text-center"><span className="font-bold text-slate-900 block">22 Mar '25</span><span className="text-[11px] font-bold text-slate-700">134/86</span></div>
                  <div className="text-center"><span className="font-bold text-slate-900 block">10 May '25</span><span className="text-[11px] font-bold text-slate-700">126/82</span></div>
                  <div className="text-center"><span className="font-bold text-slate-900 block">18 Jul '25</span><span className="text-[11px] font-bold text-slate-700">130/80</span></div>
                  <div className="text-center"><span className="font-bold text-slate-900 block">02 Sep '25</span><span className="text-[11px] font-bold text-slate-700">132/82</span></div>
                  <div className="text-center px-2.5 py-1 rounded bg-teal-100 border border-teal-400 text-teal-950 font-bold">
                    <span className="block text-teal-950 font-bold">15 Oct '25 (Latest)</span>
                    <span className="text-[11px] font-bold text-teal-900">128/82 mmHg</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. PULSE RATE CHART (PR / MIN)                                            */}
        {/* ========================================================================= */}
        <section className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 p-6 shadow-clinical">
          <div className="flex flex-wrap items-start justify-between pb-4 border-b border-slate-200 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-700 text-white flex items-center justify-center shadow-xs">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h4 className="text-base font-bold text-slate-900 font-headline">2. Pulse Rate (PR / min)</h4>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                    Normal Sinus Rhythm
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">Target Clinical Envelope: 60 - 100 Beats Per Minute (Unit: bpm)</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500 font-medium block">Current Pulse</span>
              <div className="font-mono text-2xl font-bold text-teal-800">
                74 <span className="text-xs font-normal text-slate-600">bpm</span>
              </div>
              <span className="text-[11px] font-mono text-emerald-700 font-bold">Stable resting pulse</span>
            </div>
          </div>

          <div className="mt-5 bg-white rounded-xl border border-slate-200 p-4">
            <div className="relative flex w-full" style={{ height: '230px' }}>
              <div className="w-16 shrink-0 flex flex-col justify-between text-right pr-3 font-mono text-xs font-bold text-slate-800 select-none pb-7 border-r border-slate-300">
                <span>120</span>
                <span>100</span>
                <span>80</span>
                <span>60</span>
                <span>40</span>
              </div>
              <div className="flex-1 relative flex flex-col pl-3 overflow-hidden">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 750 150">
                  <line stroke="#94a3b8" strokeDasharray="3,3" strokeWidth="1.2" x1="0" x2="750" y1="10" y2="10" />
                  <line stroke="#006a63" strokeDasharray="5,4" strokeWidth="1.5" x1="0" x2="750" y1="42" y2="42" />
                  <line stroke="#94a3b8" strokeDasharray="3,3" strokeWidth="1.2" x1="0" x2="750" y1="78" y2="78" />
                  <line stroke="#006a63" strokeDasharray="5,4" strokeWidth="1.5" x1="0" x2="750" y1="112" y2="112" />
                  <line stroke="#94a3b8" strokeDasharray="3,3" strokeWidth="1.2" x1="0" x2="750" y1="145" y2="145" />

                  {/* PR Curve (#004730) */}
                  <path d="M 35 68 C 110 52, 170 48, 275 62 C 380 75, 485 80, 595 72 C 640 68, 680 74, 715 76" fill="none" stroke="#004730" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
                  <circle cx="35" cy="68" fill="#004730" r="6.5" stroke="#ffffff" strokeWidth="2.5" />
                  <circle cx="155" cy="52" fill="#004730" r="6.5" stroke="#ffffff" strokeWidth="2.5" />
                  <circle cx="275" cy="62" fill="#004730" r="6.5" stroke="#ffffff" strokeWidth="2.5" />
                  <circle cx="395" cy="78" fill="#004730" r="6.5" stroke="#ffffff" strokeWidth="2.5" />
                  <circle cx="505" cy="74" fill="#004730" r="6.5" stroke="#ffffff" strokeWidth="2.5" />
                  <circle cx="615" cy="70" fill="#004730" r="6.5" stroke="#ffffff" strokeWidth="2.5" />
                  <circle cx="715" cy="76" fill="#004730" r="7.5" stroke="#ffffff" strokeWidth="3" />

                  <rect fill="#004730" height="22" rx="4" width="68" x="656" y="46" />
                  <text fill="#ffffff" fontFamily="JetBrains Mono" fontSize="12" fontWeight="bold" textAnchor="middle" x="690" y="61">74 bpm</text>
                </svg>

                <div className="flex justify-between items-center text-xs text-slate-800 font-mono pt-2.5 border-t border-slate-300 mt-1">
                  <div className="text-center"><span className="font-bold text-slate-900 block">14 Nov '24</span><span className="text-[11px] font-bold text-slate-700">82 bpm</span></div>
                  <div className="text-center"><span className="font-bold text-slate-900 block">05 Jan '25</span><span className="text-[11px] font-bold text-slate-700">88 bpm</span></div>
                  <div className="text-center"><span className="font-bold text-slate-900 block">22 Mar '25</span><span className="text-[11px] font-bold text-slate-700">78 bpm</span></div>
                  <div className="text-center"><span className="font-bold text-slate-900 block">10 May '25</span><span className="text-[11px] font-bold text-slate-700">72 bpm</span></div>
                  <div className="text-center"><span className="font-bold text-slate-900 block">18 Jul '25</span><span className="text-[11px] font-bold text-slate-700">76 bpm</span></div>
                  <div className="text-center"><span className="font-bold text-slate-900 block">02 Sep '25</span><span className="text-[11px] font-bold text-slate-700">75 bpm</span></div>
                  <div className="text-center px-2.5 py-1 rounded bg-emerald-100 border border-emerald-400 text-emerald-950 font-bold">
                    <span className="block font-bold text-emerald-950">15 Oct '25 (Latest)</span>
                    <span className="text-[11px] font-bold text-emerald-900">74 bpm</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. RESPIRATORY RATE CHART (RR / MIN)                                      */}
        {/* ========================================================================= */}
        <section className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 p-6 shadow-clinical">
          <div className="flex flex-wrap items-start justify-between pb-4 border-b border-slate-200 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-800 text-white flex items-center justify-center shadow-xs">
                <Wind className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h4 className="text-base font-bold text-slate-900 font-headline">3. Respiratory Rate (RR / min)</h4>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                    Eupneic / Normal
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">Target Range: 12 - 20 Breaths Per Minute (Unit: breaths/min)</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500 font-medium block">Current RR</span>
              <div className="font-mono text-2xl font-bold text-sky-900">
                16 <span className="text-xs font-normal text-slate-600">breaths/min</span>
              </div>
              <span className="text-[11px] font-mono text-emerald-700 font-bold">Unlabored respiration</span>
            </div>
          </div>

          <div className="mt-5 bg-white rounded-xl border border-slate-200 p-4">
            <div className="relative flex w-full" style={{ height: '230px' }}>
              <div className="w-16 shrink-0 flex flex-col justify-between text-right pr-3 font-mono text-xs font-bold text-slate-800 select-none pb-7 border-r border-slate-300">
                <span>30</span>
                <span>25</span>
                <span>20</span>
                <span>16</span>
                <span>12</span>
              </div>
              <div className="flex-1 relative flex flex-col pl-3 overflow-hidden">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 750 150">
                  <line stroke="#94a3b8" strokeDasharray="3,3" strokeWidth="1.2" x1="0" x2="750" y1="10" y2="10" />
                  <line stroke="#94a3b8" strokeDasharray="3,3" strokeWidth="1.2" x1="0" x2="750" y1="45" y2="45" />
                  <line stroke="#0284c7" strokeDasharray="5,4" strokeWidth="1.5" x1="0" x2="750" y1="80" y2="80" />
                  <line stroke="#94a3b8" strokeDasharray="3,3" strokeWidth="1.2" x1="0" x2="750" y1="110" y2="110" />
                  <line stroke="#0284c7" strokeDasharray="5,4" strokeWidth="1.5" x1="0" x2="750" y1="145" y2="145" />

                  {/* RR Curve (#0284c7) */}
                  <path d="M 35 90 C 110 50, 160 40, 275 85 C 380 115, 485 110, 595 110 C 640 110, 680 110, 715 110" fill="none" stroke="#0284c7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
                  <circle cx="35" cy="90" fill="#0284c7" r="6.5" stroke="#ffffff" strokeWidth="2.5" />
                  <circle cx="155" cy="46" fill="#ba1a1a" r="7.5" stroke="#ffffff" strokeWidth="3" />
                  <circle cx="275" cy="85" fill="#0284c7" r="6.5" stroke="#ffffff" strokeWidth="2.5" />
                  <circle cx="395" cy="110" fill="#0284c7" r="6.5" stroke="#ffffff" strokeWidth="2.5" />
                  <circle cx="505" cy="110" fill="#0284c7" r="6.5" stroke="#ffffff" strokeWidth="2.5" />
                  <circle cx="615" cy="110" fill="#0284c7" r="6.5" stroke="#ffffff" strokeWidth="2.5" />
                  <circle cx="715" cy="110" fill="#0284c7" r="7.5" stroke="#ffffff" strokeWidth="3" />

                  {/* Tachypnea Alert on Jan 25 */}
                  <rect fill="#ba1a1a" height="20" rx="4" width="92" x="110" y="18" />
                  <text fill="#ffffff" fontFamily="JetBrains Mono" fontSize="11" fontWeight="bold" textAnchor="middle" x="156" y="32">24 Tachypnea</text>

                  <rect fill="#0284c7" height="22" rx="4" width="76" x="650" y="78" />
                  <text fill="#ffffff" fontFamily="JetBrains Mono" fontSize="12" fontWeight="bold" textAnchor="middle" x="688" y="93">16 / min</text>
                </svg>

                <div className="flex justify-between items-center text-xs text-slate-800 font-mono pt-2.5 border-t border-slate-300 mt-1">
                  <div className="text-center"><span className="font-bold text-slate-900 block">14 Nov '24</span><span className="text-[11px] font-bold text-slate-700">18 / min</span></div>
                  <div className="text-center"><span className="font-bold text-red-700 block">05 Jan '25</span><span className="text-[11px] font-bold text-red-700">24 (Tachypnea)</span></div>
                  <div className="text-center"><span className="font-bold text-slate-900 block">22 Mar '25</span><span className="text-[11px] font-bold text-slate-700">19 / min</span></div>
                  <div className="text-center"><span className="font-bold text-slate-900 block">10 May '25</span><span className="text-[11px] font-bold text-slate-700">16 / min</span></div>
                  <div className="text-center"><span className="font-bold text-slate-900 block">18 Jul '25</span><span className="text-[11px] font-bold text-slate-700">16 / min</span></div>
                  <div className="text-center"><span className="font-bold text-slate-900 block">02 Sep '25</span><span className="text-[11px] font-bold text-slate-700">16 / min</span></div>
                  <div className="text-center px-2.5 py-1 rounded bg-sky-100 border border-sky-400 text-sky-950 font-bold">
                    <span className="block font-bold text-sky-950">15 Oct '25 (Latest)</span>
                    <span className="text-[11px] font-bold text-sky-900">16 / min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. BODY TEMPERATURE CHART (TEMP °F)                                      */}
        {/* ========================================================================= */}
        <section className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 p-6 shadow-clinical">
          <div className="flex flex-wrap items-start justify-between pb-4 border-b border-slate-200 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-700 text-white flex items-center justify-center shadow-xs">
                <Thermometer className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h4 className="text-base font-bold text-slate-900 font-headline">4. Body Temperature (Temp °F / °C)</h4>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                    Normothermic / Afebrile
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">Target Normothermic Range: 97.7°F – 99.5°F (36.5°C – 37.5°C)</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500 font-medium block">Current Temp</span>
              <div className="font-mono text-2xl font-bold text-rose-800">
                98.4 <span className="text-xs font-normal text-slate-600">°F (36.9°C)</span>
              </div>
              <span className="text-[11px] font-mono text-emerald-700 font-bold">Afebrile over last 6 months</span>
            </div>
          </div>

          <div className="mt-5 bg-white rounded-xl border border-slate-200 p-4">
            <div className="relative flex w-full" style={{ height: '230px' }}>
              <div className="w-16 shrink-0 flex flex-col justify-between text-right pr-3 font-mono text-xs font-bold text-slate-800 select-none pb-7 border-r border-slate-300">
                <span>104°F</span>
                <span>102°F</span>
                <span>100°F</span>
                <span>98.6°F</span>
                <span>96.0°F</span>
              </div>
              <div className="flex-1 relative flex flex-col pl-3 overflow-hidden">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 750 150">
                  <line stroke="#94a3b8" strokeDasharray="3,3" strokeWidth="1.2" x1="0" x2="750" y1="10" y2="10" />
                  <line stroke="#94a3b8" strokeDasharray="3,3" strokeWidth="1.2" x1="0" x2="750" y1="42" y2="42" />
                  <line stroke="#f87171" strokeDasharray="5,4" strokeWidth="1.5" x1="0" x2="750" y1="80" y2="80" />
                  <line stroke="#006a63" strokeDasharray="5,4" strokeWidth="1.5" x1="0" x2="750" y1="112" y2="112" />
                  <line stroke="#94a3b8" strokeDasharray="3,3" strokeWidth="1.2" x1="0" x2="750" y1="145" y2="145" />

                  {/* Temp Curve (#e11d48) */}
                  <path d="M 35 110 C 100 65, 140 38, 275 106 C 380 115, 485 114, 595 116 C 640 115, 680 115, 715 116" fill="none" stroke="#e11d48" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
                  <circle cx="35" cy="110" fill="#e11d48" r="6.5" stroke="#ffffff" strokeWidth="2.5" />
                  <circle cx="155" cy="38" fill="#ba1a1a" r="8" stroke="#ffffff" strokeWidth="3" />
                  <circle cx="275" cy="106" fill="#e11d48" r="6.5" stroke="#ffffff" strokeWidth="2.5" />
                  <circle cx="395" cy="114" fill="#e11d48" r="6.5" stroke="#ffffff" strokeWidth="2.5" />
                  <circle cx="505" cy="114" fill="#e11d48" r="6.5" stroke="#ffffff" strokeWidth="2.5" />
                  <circle cx="615" cy="116" fill="#e11d48" r="6.5" stroke="#ffffff" strokeWidth="2.5" />
                  <circle cx="715" cy="116" fill="#e11d48" r="7.5" stroke="#ffffff" strokeWidth="3" />

                  {/* Fever Peak Badge */}
                  <rect fill="#ba1a1a" height="20" rx="4" width="102" x="104" y="12" />
                  <text fill="#ffffff" fontFamily="JetBrains Mono" fontSize="11" fontWeight="bold" textAnchor="middle" x="155" y="26">102.4°F (Fever)</text>

                  <rect fill="#e11d48" height="22" rx="4" width="74" x="652" y="84" />
                  <text fill="#ffffff" fontFamily="JetBrains Mono" fontSize="12" fontWeight="bold" textAnchor="middle" x="689" y="99">98.4°F</text>
                </svg>

                <div className="flex justify-between items-center text-xs text-slate-800 font-mono pt-2.5 border-t border-slate-300 mt-1">
                  <div className="text-center"><span className="font-bold text-slate-900 block">14 Nov '24</span><span className="text-[11px] font-bold text-slate-700">98.8°F</span></div>
                  <div className="text-center"><span className="font-bold text-red-700 block">05 Jan '25</span><span className="text-[11px] font-bold text-red-700">102.4°F (Fever)</span></div>
                  <div className="text-center"><span className="font-bold text-slate-900 block">22 Mar '25</span><span className="text-[11px] font-bold text-slate-700">99.1°F</span></div>
                  <div className="text-center"><span className="font-bold text-slate-900 block">10 May '25</span><span className="text-[11px] font-bold text-slate-700">98.6°F</span></div>
                  <div className="text-center"><span className="font-bold text-slate-900 block">18 Jul '25</span><span className="text-[11px] font-bold text-slate-700">98.5°F</span></div>
                  <div className="text-center"><span className="font-bold text-slate-900 block">02 Sep '25</span><span className="text-[11px] font-bold text-slate-700">98.4°F</span></div>
                  <div className="text-center px-2.5 py-1 rounded bg-rose-100 border border-rose-400 text-rose-950 font-bold">
                    <span className="block font-bold text-rose-950">15 Oct '25 (Latest)</span>
                    <span className="text-[11px] font-bold text-rose-900">98.4°F (36.9°C)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. FLUID INTAKE CHART (ML / 24H)                                          */}
        {/* ========================================================================= */}
        <section className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 p-6 shadow-clinical">
          <div className="flex flex-wrap items-start justify-between pb-4 border-b border-slate-200 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-700 text-white flex items-center justify-center shadow-xs">
                <Droplet className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h4 className="text-base font-bold text-slate-900 font-headline">5. Fluid Intake (mL / 24 Hours)</h4>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-300">
                    Adequate Hydration
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">Recommended Clinical Intake: 2000 - 2500 mL / 24h (Oral Fluids + IV Infusions)</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500 font-medium block">24h Fluid Intake</span>
              <div className="font-mono text-2xl font-bold text-blue-800">
                2,200 <span className="text-xs font-normal text-slate-600">mL / day</span>
              </div>
              <span className="text-[11px] font-mono text-blue-700 font-bold">Oral: 1,800 mL • IV: 400 mL</span>
            </div>
          </div>

          <div className="mt-5 bg-white rounded-xl border border-slate-200 p-4">
            <div className="relative flex w-full" style={{ height: '230px' }}>
              <div className="w-16 shrink-0 flex flex-col justify-between text-right pr-3 font-mono text-xs font-bold text-slate-800 select-none pb-7 border-r border-slate-300">
                <span>3000</span>
                <span>2500</span>
                <span>2000</span>
                <span>1500</span>
                <span>1000</span>
              </div>
              <div className="flex-1 relative flex flex-col pl-3 overflow-hidden">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 750 150">
                  <line stroke="#94a3b8" strokeDasharray="3,3" strokeWidth="1.2" x1="0" x2="750" y1="10" y2="10" />
                  <line stroke="#1d4ed8" strokeDasharray="5,4" strokeWidth="1.5" x1="0" x2="750" y1="44" y2="44" />
                  <line stroke="#1d4ed8" strokeDasharray="5,4" strokeWidth="1.5" x1="0" x2="750" y1="78" y2="78" />
                  <line stroke="#94a3b8" strokeDasharray="3,3" strokeWidth="1.2" x1="0" x2="750" y1="112" y2="112" />
                  <line stroke="#94a3b8" strokeDasharray="3,3" strokeWidth="1.2" x1="0" x2="750" y1="145" y2="145" />

                  {/* Fluid Intake Curve (#1d4ed8) */}
                  <path d="M 35 88 C 110 50, 160 30, 275 75 C 380 65, 485 58, 595 62 C 640 60, 680 60, 715 62" fill="none" stroke="#1d4ed8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
                  <circle cx="35" cy="88" fill="#1d4ed8" r="6.5" stroke="#ffffff" strokeWidth="2.5" />
                  <circle cx="155" cy="30" fill="#1d4ed8" r="7.5" stroke="#ffffff" strokeWidth="3" />
                  <circle cx="275" cy="75" fill="#1d4ed8" r="6.5" stroke="#ffffff" strokeWidth="2.5" />
                  <circle cx="395" cy="65" fill="#1d4ed8" r="6.5" stroke="#ffffff" strokeWidth="2.5" />
                  <circle cx="505" cy="58" fill="#1d4ed8" r="6.5" stroke="#ffffff" strokeWidth="2.5" />
                  <circle cx="615" cy="62" fill="#1d4ed8" r="6.5" stroke="#ffffff" strokeWidth="2.5" />
                  <circle cx="715" cy="62" fill="#1d4ed8" r="7.5" stroke="#ffffff" strokeWidth="3" />

                  <rect fill="#1d4ed8" height="22" rx="4" width="86" x="644" y="30" />
                  <text fill="#ffffff" fontFamily="JetBrains Mono" fontSize="12" fontWeight="bold" textAnchor="middle" x="687" y="45">2,200 mL</text>
                </svg>

                <div className="flex justify-between items-center text-xs text-slate-800 font-mono pt-2.5 border-t border-slate-300 mt-1">
                  <div className="text-center"><span className="font-bold text-slate-900 block">14 Nov '24</span><span className="text-[11px] font-bold text-slate-700">1,900 mL</span></div>
                  <div className="text-center"><span className="font-bold text-blue-900 block">05 Jan '25</span><span className="text-[11px] font-bold text-blue-800">2,750 mL (IV)</span></div>
                  <div className="text-center"><span className="font-bold text-slate-900 block">22 Mar '25</span><span className="text-[11px] font-bold text-slate-700">2,050 mL</span></div>
                  <div className="text-center"><span className="font-bold text-slate-900 block">10 May '25</span><span className="text-[11px] font-bold text-slate-700">2,200 mL</span></div>
                  <div className="text-center"><span className="font-bold text-slate-900 block">18 Jul '25</span><span className="text-[11px] font-bold text-slate-700">2,300 mL</span></div>
                  <div className="text-center"><span className="font-bold text-slate-900 block">02 Sep '25</span><span className="text-[11px] font-bold text-slate-700">2,250 mL</span></div>
                  <div className="text-center px-2.5 py-1 rounded bg-blue-100 border border-blue-400 text-blue-950 font-bold">
                    <span className="block font-bold text-blue-950">15 Oct '25 (Latest)</span>
                    <span className="text-[11px] font-bold text-blue-900">2,200 mL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. FLUID OUTPUT / URINE VOLUME CHART (ML / 24H)                           */}
        {/* ========================================================================= */}
        <section className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 p-6 shadow-clinical">
          <div className="flex flex-wrap items-start justify-between pb-4 border-b border-slate-200 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-800 text-white flex items-center justify-center shadow-xs">
                <Droplet className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h4 className="text-base font-bold text-slate-900 font-headline">6. Fluid Output / Urine Volume (mL / 24 Hours)</h4>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                    Normal Renal Output
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">Target Clinical Range: 1200 - 1800 mL / 24h • Net 24h Fluid Balance: +550 mL (Positive Balance)</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500 font-medium block">24h Urine Output</span>
              <div className="font-mono text-2xl font-bold text-teal-800">
                1,650 <span className="text-xs font-normal text-slate-600">mL / day</span>
              </div>
              <span className="text-[11px] font-mono text-emerald-700 font-bold">Adequate diuresis (&gt; 0.5 mL/kg/h)</span>
            </div>
          </div>

          <div className="mt-5 bg-white rounded-xl border border-slate-200 p-4">
            <div className="relative flex w-full" style={{ height: '230px' }}>
              <div className="w-16 shrink-0 flex flex-col justify-between text-right pr-3 font-mono text-xs font-bold text-slate-800 select-none pb-7 border-r border-slate-300">
                <span>2500</span>
                <span>2000</span>
                <span>1500</span>
                <span>1000</span>
                <span>500</span>
              </div>
              <div className="flex-1 relative flex flex-col pl-3 overflow-hidden">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 750 150">
                  <line stroke="#94a3b8" strokeDasharray="3,3" strokeWidth="1.2" x1="0" x2="750" y1="10" y2="10" />
                  <line stroke="#94a3b8" strokeDasharray="3,3" strokeWidth="1.2" x1="0" x2="750" y1="44" y2="44" />
                  <line stroke="#006a63" strokeDasharray="5,4" strokeWidth="1.5" x1="0" x2="750" y1="78" y2="78" />
                  <line stroke="#006a63" strokeDasharray="5,4" strokeWidth="1.5" x1="0" x2="750" y1="112" y2="112" />
                  <line stroke="#94a3b8" strokeDasharray="3,3" strokeWidth="1.2" x1="0" x2="750" y1="145" y2="145" />

                  {/* Output Curve (#0f766e) */}
                  <path d="M 35 90 C 110 55, 160 38, 275 80 C 380 72, 485 68, 595 72 C 640 70, 680 70, 715 69" fill="none" stroke="#0f766e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
                  <circle cx="35" cy="90" fill="#0f766e" r="6.5" stroke="#ffffff" strokeWidth="2.5" />
                  <circle cx="155" cy="38" fill="#0f766e" r="7.5" stroke="#ffffff" strokeWidth="3" />
                  <circle cx="275" cy="80" fill="#0f766e" r="6.5" stroke="#ffffff" strokeWidth="2.5" />
                  <circle cx="395" cy="72" fill="#0f766e" r="6.5" stroke="#ffffff" strokeWidth="2.5" />
                  <circle cx="505" cy="68" fill="#0f766e" r="6.5" stroke="#ffffff" strokeWidth="2.5" />
                  <circle cx="615" cy="72" fill="#0f766e" r="6.5" stroke="#ffffff" strokeWidth="2.5" />
                  <circle cx="715" cy="69" fill="#0f766e" r="7.5" stroke="#ffffff" strokeWidth="3" />

                  <rect fill="#0f766e" height="22" rx="4" width="86" x="644" y="40" />
                  <text fill="#ffffff" fontFamily="JetBrains Mono" fontSize="12" fontWeight="bold" textAnchor="middle" x="687" y="55">1,650 mL</text>
                </svg>

                <div className="flex justify-between items-center text-xs text-slate-800 font-mono pt-2.5 border-t border-slate-300 mt-1">
                  <div className="text-center"><span className="font-bold text-slate-900 block">14 Nov '24</span><span className="text-[11px] font-bold text-slate-700">1,400 mL</span></div>
                  <div className="text-center"><span className="font-bold text-slate-900 block">05 Jan '25</span><span className="text-[11px] font-bold text-slate-700">2,100 mL</span></div>
                  <div className="text-center"><span className="font-bold text-slate-900 block">22 Mar '25</span><span className="text-[11px] font-bold text-slate-700">1,500 mL</span></div>
                  <div className="text-center"><span className="font-bold text-slate-900 block">10 May '25</span><span className="text-[11px] font-bold text-slate-700">1,600 mL</span></div>
                  <div className="text-center"><span className="font-bold text-slate-900 block">18 Jul '25</span><span className="text-[11px] font-bold text-slate-700">1,700 mL</span></div>
                  <div className="text-center"><span className="font-bold text-slate-900 block">02 Sep '25</span><span className="text-[11px] font-bold text-slate-700">1,620 mL</span></div>
                  <div className="text-center px-2.5 py-1 rounded bg-teal-100 border border-teal-400 text-teal-950 font-bold">
                    <span className="block font-bold text-teal-950">15 Oct '25 (Latest)</span>
                    <span className="text-[11px] font-bold text-teal-900">1,650 mL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. PATIENT DISEASE EPISODES & TREATMENT DURATION ANALYSIS                 */}
        {/* ========================================================================= */}
        <section className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 p-6 shadow-clinical space-y-6">
          <div className="flex flex-wrap items-start justify-between pb-4 border-b border-slate-200 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0d5c75] text-white flex items-center justify-center shadow-xs">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h4 className="text-base font-bold text-slate-900 font-headline">
                    7. Patient Disease Episodes &amp; Treatment Duration Analysis
                  </h4>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-100 text-teal-950 border border-teal-400">
                    Longitudinal Cohort Data
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  Date-wise chronology of diagnosed conditions, frequency of recurrence, and active vs resolved treatment durations
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-rose-100 text-rose-950 border border-rose-400">
                Most Frequent: Acute Bronchitis (3 Episodes)
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-blue-100 text-blue-950 border border-blue-400">
                Longest Duration: Essential HTN (Ongoing 340+ Days)
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-slate-100 text-slate-800 border border-slate-300">
                Total Conditions Tracked: 5
              </span>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wide text-slate-800">
                  Disease Recurrence &amp; Cumulative Burden
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-600">Ranked by Episodes &amp; Cumulative Active Days</span>
            </div>

            <div className="space-y-3">
              {[
                { title: '1. Acute Bronchitis / Lower Respiratory Infection', tag: 'Highest Recurrence', episodes: '3 Episodes', duration: '48 Days Total Duration', width: '68%', color: 'bg-rose-700' },
                { title: '2. Essential Hypertension (Primary)', tag: 'Chronic Ongoing', episodes: 'Continuous Care', duration: '340+ Days Monitored', width: '95%', color: 'bg-blue-700' },
                { title: '3. Type 2 Diabetes Mellitus', tag: 'Metabolic Chronic', episodes: 'Continuous Care', duration: '280+ Days Monitored', width: '78%', color: 'bg-teal-700' },
                { title: '4. Acute Gastroenteritis', tag: 'Infectious / Acute', episodes: '2 Episodes', duration: '16 Days Total Duration', width: '25%', color: 'bg-emerald-600' },
                { title: '5. Allergic Contact Dermatitis', tag: 'Isolated Episode', episodes: '1 Episode', duration: '10 Days Total Duration', width: '14%', color: 'bg-slate-400' },
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{item.title}</span>
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-slate-100 text-slate-700 border border-slate-300">
                        {item.tag}
                      </span>
                    </div>
                    <div className="font-mono text-xs">
                      <span className="font-bold text-slate-900">{item.episodes}</span>
                      <span className="text-slate-400 mx-1.5">•</span>
                      <span className="font-bold text-slate-700">{item.duration}</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden flex">
                    <div className={`${item.color} h-2.5 rounded-full`} style={{ width: item.width }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. PATIENT CUMULATIVE MEDICATION EXPOSURE & DURATION ANALYTICS           */}
        {/* ========================================================================= */}
        <section className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 p-6 shadow-clinical space-y-6">
          <div className="flex flex-wrap items-start justify-between pb-4 border-b border-slate-200 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-800 text-white flex items-center justify-center shadow-xs">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h4 className="text-base font-bold text-slate-900 font-headline">
                    8. Patient Cumulative Medication Exposure &amp; Duration Analytics
                  </h4>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-100 text-teal-950 border border-teal-400">
                    Pharmacotherapy Regimen
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  Longitudinal analysis of all prescribed medications ranked by total active treatment duration (days), frequency of prescription courses, and adherence status.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-blue-100 text-blue-950 border border-blue-400">
                Longest Continuous Rx: Telmisartan + Amlodipine (340+ Days Active)
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-rose-100 text-rose-950 border border-rose-400">
                Most Repeated Acute Course: Azithromycin 500mg (4 Distinct Courses)
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-slate-100 text-slate-800 border border-slate-300">
                Total Tracked Molecules: 8 Drugs
              </span>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <h5 className="text-xs font-bold uppercase tracking-wide text-slate-800">
                Medication Duration &amp; Cumulative Exposure (Dawai Kitne Din Chali)
              </h5>
              <span className="text-[11px] font-mono text-slate-600">Ranked by Total Exposure Days &amp; Prescription Cycles</span>
            </div>

            <div className="space-y-3">
              {[
                { name: '1. Telmisartan 40mg + Amlodipine 5mg (Cardiovascular / HTN)', regimen: 'Active • Daily (OD Morning)', days: '340+ Days Continuous', refills: '12 Refills / Continuous Care', width: '95%', color: 'bg-blue-700' },
                { name: '2. Metformin Hydrochloride 500mg (Endocrine / Glycemic Control)', regimen: 'Active • Twice Daily (BD Post Meals)', days: '280+ Days Continuous', refills: '10 Refills', width: '78%', color: 'bg-teal-700' },
                { name: '3. Pantoprazole 40mg (Gastroprotective / PPI)', regimen: 'Episodic • OD Empty Stomach', days: '95 Days Cumulative', refills: '6 Clinical Visits', width: '45%', color: 'bg-[#0d5c75]' },
                { name: '4. Montelukast 10mg + Levocetirizine 5mg (Respiratory / Antiallergic)', regimen: 'Course Resolved • OD Bedtime', days: '48 Days Total', refills: '3 Episodes Bronchitis & Rhinitis', width: '30%', color: 'bg-sky-800' },
                { name: '5. Azithromycin 500mg (Antibiotic / Anti-infective)', regimen: 'Completed • OD Post Lunch', days: '21 Days Total', refills: '4 Acute Courses (5d, 5d, 5d, 6d)', width: '22%', color: 'bg-rose-700' },
                { name: '6. Paracetamol 650mg (Antipyretic & Analgesic)', regimen: 'Completed • PRN / SOS', days: '18 Days Cumulative', refills: 'Across Fever Episodes', width: '18%', color: 'bg-slate-400' },
                { name: '7. ORS Hydration Sachet + Zinc Supplement (Electrolyte Fluid Therapy)', regimen: 'Completed • Sips ad libitum', days: '12 Days Total', refills: '2 Gastroenteritis Episodes', width: '14%', color: 'bg-emerald-600' },
                { name: '8. Clobetasol Propionate 0.05% Cream (Topical Corticosteroid)', regimen: 'Completed • Topical BD', days: '10 Days Total', refills: '1 Episode Contact Dermatitis', width: '10%', color: 'bg-slate-300' },
              ].map((drug, idx) => (
                <div key={idx} className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{drug.name}</span>
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-slate-100 text-slate-700 border border-slate-300">
                        {drug.regimen}
                      </span>
                    </div>
                    <div className="font-mono text-xs">
                      <span className="font-bold text-slate-900">{drug.days}</span>
                      <span className="text-slate-400 mx-1.5">•</span>
                      <span className="font-bold text-slate-700">{drug.refills}</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden flex">
                    <div className={`${drug.color} h-2.5 rounded-full`} style={{ width: drug.width }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>

      {/* FOOTER ACTIONS */}
      <footer className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 p-4 shadow-clinical flex flex-wrap items-center justify-between gap-4 mt-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('prescription')}
            className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-teal-950 font-bold text-xs transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Prescription Selection</span>
          </button>
          <span className="text-xs font-mono text-slate-600 hidden md:inline">
            Records authenticated under Indian Digital Health Mission (ABHA: 91-4829-1029)
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('Summary sent to specialist consultation queue.')}
            className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-800 hover:bg-slate-100 font-bold text-xs transition-colors flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            <span>Share with Specialist</span>
          </button>
          <button
            onClick={() => window.print()}
            className="px-5 py-2.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs shadow-sm transition-colors flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print Complete Clinical Summary (A4)</span>
          </button>
        </div>
      </footer>

    </div>
  );
};

export default HealthInsightsScreen;
