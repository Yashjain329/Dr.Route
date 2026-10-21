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
  ChevronRight
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
    { rank: 1, name: 'Paracetamol 650mg', class: 'Analgesic / Antipyretic', doses: 14820, share: '17.6%', trend: '+3.2%', aware: 'Access' },
    { rank: 2, name: 'Telmisartan 40mg', class: 'Antihypertensive (ARB)', doses: 11430, share: '13.5%', trend: '+8.1%', aware: 'Chronic' },
    { rank: 3, name: 'Metformin 500mg', class: 'Antidiabetic / Biguanide', doses: 9860, share: '11.7%', trend: '+5.4%', aware: 'Chronic' },
    { rank: 4, name: 'Pantoprazole 40mg', class: 'Gastro / PPI Acid Reducer', doses: 8940, share: '10.6%', trend: '+1.9%', aware: 'Supportive' },
    { rank: 5, name: 'Montelukast + Levocetirizine', class: 'Anti-allergy / Respiratory', doses: 7210, share: '8.6%', trend: '+14.2%', aware: 'Seasonal' },
    { rank: 6, name: 'Amoxicillin + Clavulanic Acid (Augmentin)', class: 'Beta-Lactam Antibiotic', doses: 5420, share: '6.4%', trend: '-4.1%', aware: 'Access' },
    { rank: 7, name: 'Atorvastatin 20mg', class: 'Lipid Lowering / Statin', doses: 4980, share: '5.9%', trend: '+6.8%', aware: 'Chronic' },
    { rank: 8, name: 'Azithromycin 500mg', class: 'Macrolide Antibiotic', doses: 3890, share: '4.6%', trend: '-11.3%', aware: 'Watch' },
    { rank: 9, name: 'Amlodipine 5mg', class: 'Calcium Channel Blocker', doses: 3420, share: '4.1%', trend: '+4.0%', aware: 'Chronic' },
    { rank: 10, name: 'Ondansetron 4mg', class: 'Antiemetic 5-HT3 Antagonist', doses: 2860, share: '3.4%', trend: '+0.5%', aware: 'Supportive' },
  ];

  const filteredDrugs = top10Drugs.filter(d => {
    if (selectedFilter === 'Antibiotics' && !d.class.toLowerCase().includes('antibiotic')) return false;
    if (selectedFilter === 'Cardiology' && !d.class.toLowerCase().includes('antihypertensive') && !d.class.toLowerCase().includes('calcium') && !d.class.toLowerCase().includes('statin')) return false;
    if (selectedFilter === 'Antidiabetic' && !d.class.toLowerCase().includes('antidiabetic')) return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in py-2 pb-16">
      
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/60 shadow-clinical">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold bg-primary text-primary-fixed px-2 py-0.5 rounded">
              9th Screen
            </span>
            <span className="text-xs font-mono font-bold text-secondary uppercase tracking-wider">
              Pharmacy Analytics
            </span>
          </div>
          <h1 className="text-xl font-extrabold text-primary font-headline">
            Hospital Drug Utilization &amp; Trends
          </h1>
          <p className="text-xs font-body text-on-surface-variant">
            Hospital Drug Trends &amp; Pharmacy Analytics Dashboard • Antimicrobial Stewardship Program (AMR)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => onNavigate('personal-profile')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-secondary-container text-on-secondary-container text-xs font-mono font-bold hover:bg-secondary/20 transition-colors"
          >
            <span>10th - Profile →</span>
          </button>
          <button 
            onClick={() => alert('WHO AWaRe Drug Stewardship Audit Log Downloaded.')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary text-on-primary text-xs font-mono font-bold hover:bg-primary-container transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Stewardship Logs</span>
          </button>
        </div>
      </div>

      {/* 3 Top KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* KPI 1: Total Doses */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical p-5 flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-xs font-mono font-medium text-outline uppercase">Total Doses Dispensed</div>
            <div className="text-3xl font-mono font-extrabold text-primary">84,290</div>
            <div className="text-[11px] font-mono text-secondary font-bold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+6.4% vs last 6 months</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-primary-fixed/40 text-primary flex items-center justify-center">
            <Pill className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 2: Top Class */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical p-5 flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-xs font-mono font-medium text-outline uppercase">Top Prescribed Class</div>
            <div className="text-xl font-headline font-extrabold text-on-surface">Cardiovascular &amp; HTN</div>
            <div className="text-[11px] font-mono text-primary font-bold">
              28,450 doses • 33.7% total share
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-secondary-container/50 text-secondary flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 3: Antibiotic Usage Index */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical p-5 flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-xs font-mono font-medium text-outline uppercase">Antibiotic Usage Index</div>
            <div className="text-3xl font-mono font-extrabold text-tertiary">16.8%</div>
            <div className="text-[11px] font-mono text-tertiary font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Well within WHO target &lt;20%</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-tertiary-fixed/40 text-tertiary flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Monthly Trajectory Banner of Top Therapeutic Classes */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-outline-variant/40 pb-3">
          <div>
            <h3 className="text-base font-extrabold text-primary font-headline">
              Monthly Prescription Trends of Top Therapeutic Classes
            </h3>
            <p className="text-xs font-body text-on-surface-variant">
              6-Month trajectory comparing chronic maintenance vs acute surges
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-primary"></span> Antihypertensives</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-secondary"></span> Antidiabetics</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-error"></span> Antibiotics</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-outline"></span> Analgesics</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 rounded-xl bg-surface-container-low border border-primary/20 space-y-1">
            <div className="text-outline uppercase text-[10px]">Antihypertensives</div>
            <div className="text-lg font-bold text-primary">28,450</div>
            <div className="text-[10px] text-secondary">Steady Growth (+8.1%)</div>
          </div>
          <div className="p-3 rounded-xl bg-surface-container-low border border-secondary/20 space-y-1">
            <div className="text-outline uppercase text-[10px]">Antidiabetics</div>
            <div className="text-lg font-bold text-secondary">18,240</div>
            <div className="text-[10px] text-secondary">Continuous Refills (+5.4%)</div>
          </div>
          <div className="p-3 rounded-xl bg-surface-container-low border border-error/20 space-y-1">
            <div className="text-outline uppercase text-[10px]">Antibiotics</div>
            <div className="text-lg font-bold text-error">14,160</div>
            <div className="text-[10px] text-tertiary">Reduced by 7.2% (Stewarded)</div>
          </div>
          <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/40 space-y-1">
            <div className="text-outline uppercase text-[10px]">Analgesics / Antipyretics</div>
            <div className="text-lg font-bold text-on-surface">23,440</div>
            <div className="text-[10px] text-outline">Seasonal Surge Peak</div>
          </div>
        </div>
      </div>

      {/* SECTION: Top 10 Prescribed Medications Table */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-outline-variant/40 pb-3">
          <div>
            <h3 className="text-base font-extrabold text-primary font-headline">
              Top 10 Hospital Prescribed Formulations
            </h3>
            <p className="text-xs font-body text-on-surface-variant">
              Central pharmacy dispensations with WHO AWaRe antibiotic stewardship tags
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 text-xs font-mono">
            {(['All', 'Antibiotics', 'Cardiology', 'Antidiabetic'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setSelectedFilter(tab)}
                className={`px-3 py-1 rounded-lg transition-all ${
                  selectedFilter === tab
                    ? 'bg-primary-container text-on-primary font-bold shadow-xs'
                    : 'bg-surface-container-low text-outline hover:text-on-surface'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-outline-variant/60 text-outline text-[10px] uppercase">
                <th className="py-2.5">Rank</th>
                <th className="py-2.5">Medication Name</th>
                <th className="py-2.5">Therapeutic Class</th>
                <th className="py-2.5">Total Doses</th>
                <th className="py-2.5">Share %</th>
                <th className="py-2.5">Trend</th>
                <th className="py-2.5 text-right">WHO AWaRe Tag</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {filteredDrugs.map((d) => (
                <tr key={d.rank} className="hover:bg-surface-container-low/40">
                  <td className="py-3 font-bold text-primary">#{d.rank}</td>
                  <td className="py-3 font-bold text-on-surface text-sm font-headline">{d.name}</td>
                  <td className="py-3 text-on-surface-variant">{d.class}</td>
                  <td className="py-3 font-bold text-primary">{d.doses.toLocaleString()}</td>
                  <td className="py-3 font-bold">{d.share}</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      d.trend.startsWith('+') ? 'text-secondary bg-secondary-container/50' : 'text-error bg-error-container'
                    }`}>
                      {d.trend}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      d.aware === 'Watch'
                        ? 'bg-error-container text-on-error-container'
                        : d.aware === 'Access'
                        ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                        : 'bg-surface-container text-on-surface-variant'
                    }`}>
                      {d.aware}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default DrugTrendsScreen;
