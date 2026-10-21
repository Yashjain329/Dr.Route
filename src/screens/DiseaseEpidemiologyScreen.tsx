import React, { useState } from 'react';
import { 
  Globe, 
  TrendingUp, 
  AlertTriangle, 
  ShieldAlert, 
  Activity, 
  Calendar, 
  Download, 
  Filter, 
  Users, 
  Heart, 
  Bug, 
  Flame, 
  Info,
  CheckCircle2,
  ChevronRight,
  BarChart2,
  PieChart,
  LineChart
} from 'lucide-react';
import { ScreenId } from '../types';

interface DiseaseEpidemiologyScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const DiseaseEpidemiologyScreen: React.FC<DiseaseEpidemiologyScreenProps> = ({
  onNavigate,
}) => {
  const [selectedSeason, setSelectedSeason] = useState('01 Apr 2025 – 30 Sep 2025');

  // Top 10 Communicable Diseases Data
  const communicableDiseases = [
    { name: 'Influenza', cases: 1102, color: '#0284c7' },
    { name: 'COVID-19', cases: 876, color: '#14b8a6' },
    { name: 'Dengue', cases: 642, color: '#f97316' },
    { name: 'Tuberculosis', cases: 521, color: '#a855f7' },
    { name: 'Typhoid', cases: 368, color: '#f43f5e' },
    { name: 'Hepatitis A', cases: 287, color: '#38bdf8' },
    { name: 'Chickenpox', cases: 243, color: '#4ade80' },
    { name: 'Malaria', cases: 198, color: '#fbbf24' },
    { name: 'RSV', cases: 164, color: '#818cf8' },
    { name: 'Measles', cases: 121, color: '#2dd4bf' },
  ];

  // Helper to render SVG Donut slices
  const renderDonutSlices = (slices: { label: string; pct: number; color: string }[], radius: number, cx: number, cy: number, strokeWidth: number) => {
    const circumference = 2 * Math.PI * radius;
    let accumulatedPct = 0;

    return slices.map((slice, i) => {
      const strokeDasharray = `${(slice.pct / 100) * circumference} ${circumference}`;
      const strokeDashoffset = -((accumulatedPct / 100) * circumference);
      accumulatedPct += slice.pct;

      return (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={radius}
          fill="transparent"
          stroke={slice.color}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500 hover:opacity-90"
        />
      );
    });
  };

  const diseaseDistribution = [
    { label: 'Non-Communicable Diseases', pct: 53.5, color: '#10b981' },
    { label: 'Infectious Diseases', pct: 26.6, color: '#0284c7' },
    { label: 'Cancers', pct: 9.7, color: '#a855f7' },
    { label: 'Others', pct: 7.8, color: '#94a3b8' },
    { label: 'Injuries & Trauma', pct: 2.4, color: '#f97316' },
  ];

  const cancerTypes = [
    { label: 'Breast', pct: 32.5, color: '#ec4899' },
    { label: 'Lung', pct: 21.3, color: '#38bdf8' },
    { label: 'Others', pct: 17.3, color: '#94a3b8' },
    { label: 'Colorectal', pct: 12.8, color: '#f59e0b' },
    { label: 'Prostate', pct: 9.4, color: '#10b981' },
    { label: 'Cervical', pct: 6.7, color: '#a855f7' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in py-2 pb-16">
      
      {/* Top Header & Breadcrumbs matching Stitch Screen 8 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/60 shadow-clinical">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-error uppercase tracking-wider">
              Surveillance Network
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-headline">
            Hospital Disease Epidemiology &amp; Clinical Analysis
          </h1>
          <p className="text-xs font-body text-slate-600">
            Real-time insights for better decisions, healthier communities • Integrated IDSP surveillance feeds
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => onNavigate('drug-trends')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-mono font-bold border border-slate-300 transition-colors"
          >
            <span>Drug Trends &amp; Pharmacy →</span>
          </button>
          <button 
            onClick={() => alert('Epidemiological Surveillance PDF Report Generated.')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#004357] hover:bg-[#0d5c75] text-white text-xs font-mono font-bold transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* 5 Top Stat Cards (Exact Stitch Screen 8) */}
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Card 1: Total Admissions */}
        <div className="bg-surface-container-lowest rounded-2xl border border-slate-200 p-4 flex items-center gap-3.5 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-medium text-slate-500 block">Total Admissions</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xl font-bold font-mono text-slate-800">12,842</span>
              <span className="text-[11px] font-semibold text-emerald-600 flex items-center">↑ 8.4%</span>
            </div>
            <span className="text-[10px] text-slate-400 block mt-0.5">vs. prev 6 mo</span>
          </div>
        </div>

        {/* Card 2: Infectious Diseases */}
        <div className="bg-surface-container-lowest rounded-2xl border border-slate-200 p-4 flex items-center gap-3.5 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
            <Bug className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-medium text-slate-500 block">Infectious Diseases</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xl font-bold font-mono text-slate-800">3,412</span>
              <span className="text-[11px] font-semibold text-emerald-600 flex items-center">↑ 12.7%</span>
            </div>
            <span className="text-[10px] text-slate-400 block mt-0.5">vs. prev 6 mo</span>
          </div>
        </div>

        {/* Card 3: Non-Communicable */}
        <div className="bg-surface-container-lowest rounded-2xl border border-slate-200 p-4 flex items-center gap-3.5 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-medium text-slate-500 block">Non-Communicable</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xl font-bold font-mono text-slate-800">6,873</span>
              <span className="text-[11px] font-semibold text-emerald-600 flex items-center">↑ 5.2%</span>
            </div>
            <span className="text-[10px] text-slate-400 block mt-0.5">vs. prev 6 mo</span>
          </div>
        </div>

        {/* Card 4: Cancers */}
        <div className="bg-surface-container-lowest rounded-2xl border border-slate-200 p-4 flex items-center gap-3.5 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-medium text-slate-500 block">Cancers</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xl font-bold font-mono text-slate-800">1,245</span>
              <span className="text-[11px] font-semibold text-emerald-600 flex items-center">↑ 3.6%</span>
            </div>
            <span className="text-[10px] text-slate-400 block mt-0.5">vs. prev 6 mo</span>
          </div>
        </div>

        {/* Card 5: Heart Diseases */}
        <div className="bg-surface-container-lowest rounded-2xl border border-slate-200 p-4 flex items-center gap-3.5 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-medium text-slate-500 block">Heart Diseases</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xl font-bold font-mono text-slate-800">2,418</span>
              <span className="text-[11px] font-semibold text-emerald-600 flex items-center">↑ 4.8%</span>
            </div>
            <span className="text-[10px] text-slate-400 block mt-0.5">vs. prev 6 mo</span>
          </div>
        </div>
      </section>

      {/* Outbreak Alert Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-red-500/15 via-red-500/5 to-transparent border-2 border-red-500/30 flex items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="text-xs font-mono font-bold text-red-700 uppercase">
              Epidemic Threshold Warning: Vector-Borne Dengue &amp; Chikungunya Cluster
            </div>
            <div className="text-xs font-body text-slate-800">
              Ward 4B &amp; North Jaipur Zone reporting 28% increase in IgM Dengue reactive cases over last 14 days. Vector control alerted.
            </div>
          </div>
        </div>
        <span className="text-[10px] font-mono font-bold bg-red-600 text-white px-2.5 py-1 rounded-full whitespace-nowrap">
          IDSP Code #DNG-402
        </span>
      </div>

      {/* ========================================================================= */}
      {/* GRAPH 1: TOP 10 COMMUNICABLE DISEASES (VERTICAL BAR CHART)                */}
      {/* ========================================================================= */}
      <section className="bg-surface-container-lowest rounded-2xl border border-slate-200 p-6 shadow-clinical space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-headline">
              Top 10 Communicable Diseases
            </h3>
            <span className="text-xs text-slate-500">(Number of confirmed cases across inpatient &amp; outpatient registries)</span>
          </div>
          <span className="text-xs font-mono font-bold text-[#004357] bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
            3,412 Cases Total
          </span>
        </div>

        {/* SVG Vertical Bar Chart Canvas */}
        <div className="bg-slate-50/60 rounded-xl border border-slate-200 p-4">
          <div className="relative flex w-full" style={{ height: '280px' }}>
            {/* Y-Axis scale */}
            <div className="w-14 shrink-0 flex flex-col justify-between text-right pr-3 font-mono text-xs font-bold text-slate-600 select-none pb-12 border-r border-slate-300">
              <span>1200</span>
              <span>1000</span>
              <span>800</span>
              <span>600</span>
              <span>400</span>
              <span>200</span>
              <span>0</span>
            </div>

            {/* Bars container */}
            <div className="flex-1 relative flex flex-col pl-4 overflow-visible">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 800 230">
                {/* Horizontal gridlines */}
                <line stroke="#e2e8f0" strokeDasharray="3,3" strokeWidth="1" x1="0" x2="800" y1="10" y2="10" />
                <line stroke="#e2e8f0" strokeDasharray="3,3" strokeWidth="1" x1="0" x2="800" y1="45" y2="45" />
                <line stroke="#e2e8f0" strokeDasharray="3,3" strokeWidth="1" x1="0" x2="800" y1="80" y2="80" />
                <line stroke="#e2e8f0" strokeDasharray="3,3" strokeWidth="1" x1="0" x2="800" y1="115" y2="115" />
                <line stroke="#e2e8f0" strokeDasharray="3,3" strokeWidth="1" x1="0" x2="800" y1="150" y2="150" />
                <line stroke="#e2e8f0" strokeDasharray="3,3" strokeWidth="1" x1="0" x2="800" y1="185" y2="185" />
                <line stroke="#cbd5e1" strokeWidth="1.5" x1="0" x2="800" y1="215" y2="215" />

                {/* 10 Vertical Bars */}
                {communicableDiseases.map((d, idx) => {
                  const barWidth = 46;
                  const x = 30 + idx * 76;
                  // Max value 1200 maps to y=15; 0 maps to y=215 (height 200px)
                  const barHeight = (d.cases / 1200) * 200;
                  const y = 215 - barHeight;

                  return (
                    <g key={d.name} className="group cursor-pointer">
                      {/* Bar rectangle */}
                      <rect
                        x={x}
                        y={y}
                        width={barWidth}
                        height={barHeight}
                        fill={d.color}
                        rx="6"
                        className="transition-all duration-200 hover:brightness-110"
                      />
                      {/* Value label above bar */}
                      <text
                        x={x + barWidth / 2}
                        y={y - 6}
                        fill="#0f172a"
                        fontFamily="JetBrains Mono"
                        fontSize="11"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {d.cases}
                      </text>
                      {/* Rotated X label below baseline */}
                      <text
                        x={x + barWidth / 2}
                        y={228}
                        transform={`rotate(25, ${x + barWidth / 2}, 228)`}
                        fill="#334155"
                        fontFamily="Inter"
                        fontSize="10"
                        fontWeight="600"
                        textAnchor="start"
                      >
                        {d.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* GRAPH 2: SEASONAL TREND OF COMMON INFECTIOUS DISEASES (MULTI-LINE)        */}
      {/* ========================================================================= */}
      <section className="bg-surface-container-lowest rounded-2xl border border-slate-200 p-6 shadow-clinical space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-headline">
              Seasonal Trend of Common Infectious Diseases
            </h3>
            <span className="text-xs text-slate-500">(Monthly cases over Apr 2025 - Sep 2025)</span>
          </div>

          {/* Custom Multi-Series Legend */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-700">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7]"></span> Influenza
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f97316]"></span> Dengue
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span> COVID-19
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200">
              <span className="w-2.5 h-2.5 rounded-full bg-[#a855f7]"></span> Tuberculosis
            </span>
          </div>
        </div>

        {/* SVG Multi-Line Chart Canvas */}
        <div className="bg-slate-50/60 rounded-xl border border-slate-200 p-4">
          <div className="relative flex w-full" style={{ height: '260px' }}>
            <div className="w-14 shrink-0 flex flex-col justify-between text-right pr-3 font-mono text-xs font-bold text-slate-600 select-none pb-7 border-r border-slate-300">
              <span>500</span>
              <span>400</span>
              <span>300</span>
              <span>200</span>
              <span>100</span>
              <span>0</span>
            </div>

            <div className="flex-1 relative flex flex-col pl-4 overflow-hidden">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 750 200">
                {/* Gridlines */}
                <line stroke="#e2e8f0" strokeDasharray="3,3" strokeWidth="1" x1="0" x2="750" y1="10" y2="10" />
                <line stroke="#e2e8f0" strokeDasharray="3,3" strokeWidth="1" x1="0" x2="750" y1="48" y2="48" />
                <line stroke="#e2e8f0" strokeDasharray="3,3" strokeWidth="1" x1="0" x2="750" y1="86" y2="86" />
                <line stroke="#e2e8f0" strokeDasharray="3,3" strokeWidth="1" x1="0" x2="750" y1="124" y2="124" />
                <line stroke="#e2e8f0" strokeDasharray="3,3" strokeWidth="1" x1="0" x2="750" y1="162" y2="162" />
                <line stroke="#cbd5e1" strokeWidth="1.5" x1="0" x2="750" y1="195" y2="195" />

                {/* 1. Influenza Line (#0284c7): [260, 290, 410, 430, 335, 305] */}
                <path d="M 40 100 C 120 90, 180 45, 300 38 C 420 30, 480 65, 580 75 C 640 82, 680 88, 710 90" fill="none" stroke="#0284c7" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="40" cy="100" r="5" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
                <circle cx="174" cy="90" r="5" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
                <circle cx="308" cy="42" r="5" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
                <circle cx="442" cy="35" r="5.5" fill="#0284c7" stroke="#ffffff" strokeWidth="2.5" />
                <circle cx="576" cy="72" r="5" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
                <circle cx="710" cy="85" r="5" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />

                {/* 2. Dengue Line (#f97316): [50, 60, 160, 245, 295, 220] */}
                <path d="M 40 178 C 120 174, 180 135, 300 135 C 420 100, 480 82, 580 85 C 640 86, 680 105, 710 115" fill="none" stroke="#f97316" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="40" cy="178" r="5" fill="#f97316" stroke="#ffffff" strokeWidth="2" />
                <circle cx="174" cy="174" r="5" fill="#f97316" stroke="#ffffff" strokeWidth="2" />
                <circle cx="308" cy="135" r="5" fill="#f97316" stroke="#ffffff" strokeWidth="2" />
                <circle cx="442" cy="102" r="5" fill="#f97316" stroke="#ffffff" strokeWidth="2" />
                <circle cx="576" cy="84" r="5.5" fill="#f97316" stroke="#ffffff" strokeWidth="2.5" />
                <circle cx="710" cy="115" r="5" fill="#f97316" stroke="#ffffff" strokeWidth="2" />

                {/* 3. COVID-19 Line (#10b981): [195, 175, 165, 145, 115, 95] */}
                <path d="M 40 125 C 120 132, 180 135, 300 138 C 420 144, 480 155, 580 162 C 640 166, 680 168, 710 169" fill="none" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="40" cy="125" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                <circle cx="174" cy="132" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                <circle cx="308" cy="136" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                <circle cx="442" cy="144" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                <circle cx="576" cy="158" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                <circle cx="710" cy="169" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />

                {/* 4. Tuberculosis Line (#a855f7): [95, 90, 85, 80, 85, 75] */}
                <path d="M 40 162 C 120 164, 180 166, 300 168 C 420 170, 480 168, 580 168 C 640 168, 680 172, 710 174" fill="none" stroke="#a855f7" strokeWidth="3" strokeDasharray="4,3" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="40" cy="162" r="4.5" fill="#a855f7" stroke="#ffffff" strokeWidth="2" />
                <circle cx="174" cy="164" r="4.5" fill="#a855f7" stroke="#ffffff" strokeWidth="2" />
                <circle cx="308" cy="167" r="4.5" fill="#a855f7" stroke="#ffffff" strokeWidth="2" />
                <circle cx="442" cy="170" r="4.5" fill="#a855f7" stroke="#ffffff" strokeWidth="2" />
                <circle cx="576" cy="168" r="4.5" fill="#a855f7" stroke="#ffffff" strokeWidth="2" />
                <circle cx="710" cy="174" r="4.5" fill="#a855f7" stroke="#ffffff" strokeWidth="2" />
              </svg>

              {/* Month Markers */}
              <div className="flex justify-between items-center text-xs text-slate-800 font-mono pt-2 border-t border-slate-300 mt-1">
                <span className="font-bold text-center">Apr '25</span>
                <span className="font-bold text-center">May '25</span>
                <span className="font-bold text-center">Jun '25</span>
                <span className="font-bold text-center">Jul '25 (Peak Surge)</span>
                <span className="font-bold text-center">Aug '25</span>
                <span className="font-bold text-center">Sep '25</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* ROW 3: DONUT & PROGRESS VISUALIZATIONS                                    */}
      {/* ========================================================================= */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* DONUT 1: Disease Distribution (4 Cols) */}
        <article className="md:col-span-4 bg-surface-container-lowest rounded-2xl border border-slate-200 p-6 shadow-clinical flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 font-headline">Disease Distribution</h3>
            <span className="text-xs text-slate-500 block mb-4">(All departments • 12,842 Total Cases)</span>
            
            <div className="flex flex-col items-center">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                  {renderDonutSlices(diseaseDistribution, 38, 50, 50, 14)}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total</span>
                  <span className="text-lg font-extrabold text-slate-900 font-mono">12,842</span>
                </div>
              </div>

              {/* Legend with exact values */}
              <div className="w-full mt-5 space-y-2 text-xs font-medium">
                {diseaseDistribution.map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-slate-700">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="truncate">{item.label}</span>
                    </span>
                    <span className="font-bold font-mono text-slate-900">{item.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* TOP 5 NON-COMMUNICABLE DISEASES (4 Cols) */}
        <article className="md:col-span-4 bg-surface-container-lowest rounded-2xl border border-slate-200 p-6 shadow-clinical flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 font-headline">Top 5 Non-Communicable Diseases</h3>
            <span className="text-xs text-slate-500 block mb-4">(Number of recorded cases)</span>

            <div className="space-y-4">
              {[
                { name: 'Hypertension', cases: 2184, pct: '87.3%', color: 'bg-blue-500' },
                { name: 'Type 2 Diabetes', cases: 1876, pct: '75.0%', color: 'bg-emerald-500' },
                { name: 'COPD', cases: 1243, pct: '49.7%', color: 'bg-amber-500' },
                { name: 'Ischemic Heart Disease', cases: 982, pct: '39.2%', color: 'bg-purple-500' },
                { name: 'Chronic Kidney Disease', cases: 876, pct: '35.0%', color: 'bg-cyan-500' },
              ].map((ncd, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">{ncd.name}</span>
                    <span className="font-bold font-mono text-slate-900">{ncd.cases.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                    <div className={`${ncd.color} h-3 rounded-full transition-all duration-500`} style={{ width: ncd.pct }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-6 pt-2 border-t border-slate-200">
            <span>0</span>
            <span>500</span>
            <span>1,000</span>
            <span>1,500</span>
            <span>2,000</span>
            <span>2,500</span>
          </div>
        </article>

        {/* DONUT 2: Cancer Cases by Type (4 Cols) */}
        <article className="md:col-span-4 bg-surface-container-lowest rounded-2xl border border-slate-200 p-6 shadow-clinical flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 font-headline">Cancer Cases by Type</h3>
            <span className="text-xs text-slate-500 block mb-4">(1,245 Total Cancer Cases)</span>

            <div className="flex flex-col items-center">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                  {renderDonutSlices(cancerTypes, 38, 50, 50, 14)}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                  <span className="text-lg font-extrabold text-slate-900 font-mono">1,245</span>
                  <span className="text-[9px] text-slate-500 font-semibold tracking-tight">Total Oncology</span>
                </div>
              </div>

              {/* Grid Legend */}
              <div className="w-full mt-5 grid grid-cols-2 gap-x-3 gap-y-2 text-xs font-medium">
                {cancerTypes.map((c, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-700 truncate">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                      <span className="truncate">{c.label}</span>
                    </span>
                    <span className="font-bold font-mono text-slate-900">{c.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>

      </section>

    </div>
  );
};

export default DiseaseEpidemiologyScreen;
