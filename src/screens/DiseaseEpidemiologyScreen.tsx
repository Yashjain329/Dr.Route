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
  ChevronRight
} from 'lucide-react';
import { ScreenId } from '../types';

interface DiseaseEpidemiologyScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const DiseaseEpidemiologyScreen: React.FC<DiseaseEpidemiologyScreenProps> = ({
  onNavigate,
}) => {
  const [selectedSeason, setSelectedSeason] = useState('2025 All Seasons');
  const [activeTab, setActiveTab] = useState<'surveillance' | 'ncd' | 'cancer'>('surveillance');

  const top10Infectious = [
    { name: 'Influenza (Seasonal A/H3N2)', cases: 1120, share: '32.8%', trend: '+14%' },
    { name: 'Dengue Fever (Serotype 2)', cases: 890, share: '26.1%', trend: '+28%' },
    { name: 'COVID-19 (JN.1 / Sublineages)', cases: 480, share: '14.1%', trend: '-8%' },
    { name: 'Pulmonary Tuberculosis (PTB)', cases: 310, share: '9.1%', trend: '-2%' },
    { name: 'Enteric / Typhoid Fever', cases: 240, share: '7.0%', trend: '+5%' },
    { name: 'Malaria (P. vivax)', cases: 190, share: '5.6%', trend: '+12%' },
    { name: 'Acute Viral Gastroenteritis', cases: 150, share: '4.4%', trend: '-4%' },
    { name: 'Hepatitis A & E', cases: 110, share: '3.2%', trend: '+3%' },
    { name: 'Measles Outbreak Cluster', cases: 60, share: '1.8%', trend: '+50%' },
    { name: 'Chikungunya Arthritic Surge', cases: 45, share: '1.3%', trend: '+18%' },
  ];

  const top5Ncd = [
    { name: 'Essential Primary Hypertension (I10)', cases: 2840, pct: 41.3, delta: '+6.1%' },
    { name: 'Type-2 Diabetes Mellitus (E11)', cases: 2190, pct: 31.8, delta: '+5.4%' },
    { name: 'Ischemic Heart Disease / CAD (I25)', cases: 1240, pct: 18.0, delta: '+3.8%' },
    { name: 'Chronic Obstructive Pulmonary (J44)', cases: 880, pct: 12.8, delta: '+9.2%' },
    { name: 'Chronic Kidney Disease Stages 3-5 (N18)', cases: 540, pct: 7.9, delta: '+4.1%' },
  ];

  const cancerData = [
    { type: 'Breast Carcinoma', cases: 380, pct: 30.5 },
    { type: 'Bronchogenic / Lung Carcinoma', cases: 290, pct: 23.3 },
    { type: 'Oral Cavity & Squamous Cell', cases: 210, pct: 16.9 },
    { type: 'Colorectal Carcinoma', cases: 190, pct: 15.3 },
    { type: 'Cervical & Uterine Neoplasm', cases: 140, pct: 11.2 },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in py-2 pb-16">
      
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/60 shadow-clinical">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-error uppercase tracking-wider">
              Hospital Surveillance
            </span>
          </div>
          <h1 className="text-xl font-extrabold text-primary font-headline">
            Hospital Disease Epidemiology &amp; Clinical Analysis Dashboard
          </h1>
          <p className="text-xs font-body text-on-surface-variant">
            Live Epidemiological Surveillance System • Integrated ICMR &amp; IDSP Public Health Feeds
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => onNavigate('drug-trends')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-secondary-container text-on-secondary-container text-xs font-mono font-bold hover:bg-secondary/20 transition-colors"
          >
            <span>Drug Trends &amp; Pharmacy →</span>
          </button>
          <button 
            onClick={() => alert('Epidemiological Surveillance PDF Report Generated.')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary text-on-primary text-xs font-mono font-bold hover:bg-primary-container transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* 5 Top KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        
        {/* KPI 1 */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical p-4 space-y-1">
          <div className="text-[11px] font-mono font-medium text-outline uppercase">Total Admissions</div>
          <div className="text-2xl font-mono font-extrabold text-primary">12,842</div>
          <div className="text-[10px] font-mono text-secondary font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+8.4% vs prev 6 mo</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical p-4 space-y-1">
          <div className="text-[11px] font-mono font-medium text-outline uppercase">Infectious Diseases</div>
          <div className="text-2xl font-mono font-extrabold text-error">3,412</div>
          <div className="text-[10px] font-mono text-error font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+12.7% (Seasonal surge)</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical p-4 space-y-1">
          <div className="text-[11px] font-mono font-medium text-outline uppercase">Non-Communicable</div>
          <div className="text-2xl font-mono font-extrabold text-primary">6,873</div>
          <div className="text-[10px] font-mono text-primary font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+5.2% vs prev 6 mo</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical p-4 space-y-1">
          <div className="text-[11px] font-mono font-medium text-outline uppercase">Cancers / Oncology</div>
          <div className="text-2xl font-mono font-extrabold text-secondary">1,245</div>
          <div className="text-[10px] font-mono text-secondary font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+3.6% vs prev 6 mo</span>
          </div>
        </div>

        {/* KPI 5 */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical p-4 space-y-1">
          <div className="text-[11px] font-mono font-medium text-outline uppercase">Heart Diseases</div>
          <div className="text-2xl font-mono font-extrabold text-tertiary">2,418</div>
          <div className="text-[10px] font-mono text-tertiary font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+4.8% vs prev 6 mo</span>
          </div>
        </div>

      </div>

      {/* Outbreak Alert Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-error/15 via-error/5 to-transparent border-2 border-error/40 flex items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-error text-on-error flex items-center justify-center shrink-0">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="text-xs font-mono font-bold text-error uppercase">
              Epidemic Threshold Warning: Vector-Borne Dengue &amp; Chikungunya Cluster
            </div>
            <div className="text-xs font-body text-on-surface">
              Ward 4B &amp; North Jaipur Zone reporting 28% increase in IgM Dengue reactive cases over last 14 days. Vector control alerted.
            </div>
          </div>
        </div>
        <span className="text-[10px] font-mono font-bold bg-error text-on-error px-2.5 py-1 rounded-full whitespace-nowrap">
          IDSP Code #DNG-402
        </span>
      </div>

      {/* SECTION 1: Top 10 Communicable Diseases Table & Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Top 10 Communicable Diseases Table (2 Cols) */}
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-outline-variant/40 pb-3">
            <div>
              <h3 className="text-base font-extrabold text-primary font-headline">
                Top 10 Communicable Diseases (Number of cases)
              </h3>
              <p className="text-xs font-body text-on-surface-variant">
                Ranked by active inpatient admissions and confirmed diagnostic isolates
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-outline">3,412 Cases Total</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-outline-variant/60 text-outline text-[10px] uppercase">
                  <th className="py-2.5">#</th>
                  <th className="py-2.5">Infectious Disease</th>
                  <th className="py-2.5">Confirmed Cases</th>
                  <th className="py-2.5">Share %</th>
                  <th className="py-2.5 text-right">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                {top10Infectious.map((inf, idx) => (
                  <tr key={idx} className="hover:bg-surface-container-low/40">
                    <td className="py-2.5 font-bold text-outline">{idx + 1}</td>
                    <td className="py-2.5 font-bold text-on-surface">{inf.name}</td>
                    <td className="py-2.5 font-bold text-primary">{inf.cases}</td>
                    <td className="py-2.5 text-on-surface-variant">{inf.share}</td>
                    <td className="py-2.5 text-right">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        inf.trend.startsWith('+') ? 'bg-error-container text-error' : 'bg-tertiary-fixed text-tertiary'
                      }`}>
                        {inf.trend}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Department Disease Distribution (1 Col) */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical p-6 space-y-4">
          <div className="border-b border-outline-variant/40 pb-3">
            <h3 className="text-base font-extrabold text-primary font-headline">
              Disease Distribution (All departments)
            </h3>
            <p className="text-xs font-body text-on-surface-variant">Total Cases: 12,842</p>
          </div>

          <div className="space-y-3 text-xs font-mono">
            {[
              { label: 'Non-Communicable Diseases', pct: 53.5, color: 'bg-primary' },
              { label: 'Infectious Diseases', pct: 26.6, color: 'bg-error' },
              { label: 'Cancers / Malignancies', pct: 9.7, color: 'bg-secondary' },
              { label: 'Injuries & Trauma', pct: 2.4, color: 'bg-tertiary' },
              { label: 'Others / Undifferentiated', pct: 7.8, color: 'bg-outline' },
            ].map((cat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between">
                  <span className="font-bold text-on-surface">{cat.label}</span>
                  <span className="font-bold text-primary">{cat.pct}%</span>
                </div>
                <div className="w-full bg-outline-variant/30 h-2.5 rounded-full overflow-hidden">
                  <div className={`${cat.color} h-full rounded-full`} style={{ width: `${cat.pct}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-surface-container-low text-xs font-body text-on-surface-variant border border-outline-variant/40 space-y-1 mt-4">
            <div className="font-bold text-primary font-mono text-[11px] flex items-center gap-1">
              <Info className="w-3.5 h-3.5" />
              <span>Public Health Key Takeaway</span>
            </div>
            <p className="text-[11px]">
              Chronic NCDs comprise &gt;53% of hospital bed occupancy. Co-morbid infectious surges strain ICU capacity during post-monsoon transitions.
            </p>
          </div>
        </div>

      </div>

      {/* SECTION 2: Top 5 Non-Communicable Diseases & Oncology Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Top 5 NCDs */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical p-6 space-y-4">
          <div className="border-b border-outline-variant/40 pb-3">
            <h3 className="text-base font-extrabold text-primary font-headline">
              Top 5 Non-Communicable Diseases
            </h3>
            <p className="text-xs font-body text-on-surface-variant">Chronic cardiovascular and metabolic disease burden</p>
          </div>

          <div className="space-y-3">
            {top5Ncd.map((ncd, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/50 space-y-1.5 text-xs font-mono">
                <div className="flex justify-between font-bold text-on-surface">
                  <span>{ncd.name}</span>
                  <span className="text-primary">{ncd.cases} Cases</span>
                </div>
                <div className="w-full bg-outline-variant/30 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: `${ncd.pct}%` }} />
                </div>
                <div className="flex justify-between text-[10px] text-outline">
                  <span>Share of NCD Admissions: {ncd.pct}%</span>
                  <span className="text-error font-bold">{ncd.delta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cancer Cases by Type */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical p-6 space-y-4">
          <div className="border-b border-outline-variant/40 pb-3">
            <h3 className="text-base font-extrabold text-primary font-headline">
              Cancer Cases by Primary Anatomical Site
            </h3>
            <p className="text-xs font-body text-on-surface-variant">1,245 confirmed oncological registrations</p>
          </div>

          <div className="space-y-3">
            {cancerData.map((c, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/50 space-y-1.5 text-xs font-mono">
                <div className="flex justify-between font-bold text-on-surface">
                  <span>{c.type}</span>
                  <span className="text-secondary">{c.cases} Cases</span>
                </div>
                <div className="w-full bg-outline-variant/30 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-secondary h-full rounded-full" style={{ width: `${c.pct}%` }} />
                </div>
                <div className="flex justify-between text-[10px] text-outline">
                  <span>Oncology Proportion: {c.pct}%</span>
                  <span className="text-secondary font-bold">Biopsy Confirmed</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default DiseaseEpidemiologyScreen;
