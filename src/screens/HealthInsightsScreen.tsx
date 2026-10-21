import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Activity, 
  Heart, 
  Wind, 
  Thermometer, 
  Droplet, 
  Pill, 
  Calendar, 
  Printer, 
  Sparkles, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle2, 
  AlertTriangle,
  Layers,
  Clock,
  ShieldCheck,
  ChevronRight
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

  // BP Longitudinal Trend Data Points
  const bpTrend = [
    { date: '14 Nov 24', sys: 154, dia: 98 },
    { date: '05 Jan 25', sys: 148, dia: 94 },
    { date: '28 Jan 25', sys: 142, dia: 90 },
    { date: '16 Feb 25', sys: 136, dia: 88 },
    { date: '10 Mar 25', sys: 132, dia: 84 },
    { date: '15 Apr 25', sys: 128, dia: 82 },
  ];

  // Fluid Balance Data (Last 5 Days)
  const fluidData = [
    { day: 'Day 1', intake: 2600, output: 2100, balance: '+500 mL' },
    { day: 'Day 2', intake: 2400, output: 2000, balance: '+400 mL' },
    { day: 'Day 3', intake: 2500, output: 1950, balance: '+550 mL' },
    { day: 'Day 4', intake: 2200, output: 1850, balance: '+350 mL' },
    { day: 'Today', intake: 2400, output: 1950, balance: '+450 mL' },
  ];

  // Disease Episodes / Timeline
  const diseaseEpisodes = [
    {
      disease: 'Stage 2 Essential Hypertension',
      dept: 'Cardiology',
      startDate: 'Nov 2024',
      status: 'Ongoing Regimen',
      duration: '6 Months',
      progress: 85,
      control: 'Controlled (128/82 mmHg)',
    },
    {
      disease: 'Chronic Bronchitis / Mild Asthma',
      dept: 'Pulmonology',
      startDate: 'Jan 2025',
      status: 'Active Maintenance',
      duration: '3 Months',
      progress: 70,
      control: 'Wheezing Resolved',
    },
    {
      disease: 'Acute Knee Ligament Strain',
      dept: 'Orthopedics',
      startDate: 'Nov 2024 - Dec 2024',
      status: 'Resolved & Discharged',
      duration: '6 Weeks',
      progress: 100,
      control: '100% Mobility Restored',
    },
  ];

  // Medication Cumulative Exposure Analytics
  const medicationAnalytics = [
    { name: 'Telmisartan 40mg', class: 'ARB', daysTaken: 152, adherence: '96%', compliance: 'Excellent', safety: 'K+ normal (4.3 mEq/L)' },
    { name: 'Amlodipine 5mg', class: 'CCB', daysTaken: 152, adherence: '94%', compliance: 'Optimal', safety: 'No ankle edema' },
    { name: 'Atorvastatin 20mg', class: 'Statin', daysTaken: 90, adherence: '91%', compliance: 'Good', safety: 'ALT/AST normal' },
    { name: 'Budesonide Inhaler', class: 'Corticosteroid', daysTaken: 45, adherence: '88%', compliance: 'Satisfactory', safety: 'Oral hygiene verified' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in py-2 pb-16">
      
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/60 shadow-clinical">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('prescription')}
            className="p-2 rounded-xl text-outline hover:text-on-surface hover:bg-surface-container-low transition-colors"
            title="Back to Prescription Hub"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold bg-primary text-primary-fixed px-2 py-0.5 rounded">
                7th Screen
              </span>
              <span className="text-xs font-mono font-bold text-secondary uppercase tracking-wider">
                Health Insights
              </span>
            </div>
            <h1 className="text-xl font-extrabold text-primary font-headline">
              Patient Vitals, Disease Burden &amp; Medication Duration Analytics
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Time Range Filter */}
          <div className="flex items-center bg-surface-container-low p-1 rounded-xl border border-outline-variant/60 text-xs font-mono">
            {(['30D', '90D', '1Y'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTimeRange(t)}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  timeRange === t ? 'bg-primary text-on-primary shadow-xs' : 'text-outline hover:text-on-surface'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <button 
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-outline-variant text-on-surface-variant hover:bg-surface-container-low text-xs font-mono font-medium transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Chart Sheet</span>
          </button>
        </div>
      </div>

      {/* Patient Demographic Banner (Rohit Mehta, PID-2025-88412) */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/70 shadow-clinical p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-secondary-container text-on-secondary-container font-mono font-bold flex items-center justify-center text-xl shadow-xs">
              RM
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-extrabold text-on-surface font-headline tracking-tight">
                  Rohit Mehta
                </h2>
                <span className="bg-primary text-primary-fixed text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase">
                  PID-2025-88412
                </span>
                <span className="bg-secondary-container text-on-secondary-container text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                  Active Regimen
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-on-surface-variant pt-1">
                <span>Age/Sex: <strong>34 Y / Male</strong></span>
                <span>•</span>
                <span>Blood: <strong className="text-error">B+ (Rh Positive)</strong></span>
                <span>•</span>
                <span>Attending: <strong>Dr. Ritesh Khandelwal, MD</strong></span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            <div className="bg-surface-container-low p-2.5 rounded-xl border border-outline-variant/40 text-center">
              <div className="text-base font-bold text-primary">18</div>
              <div className="text-[10px] text-outline">Total Visits</div>
            </div>
            <div className="bg-surface-container-low p-2.5 rounded-xl border border-outline-variant/40 text-center">
              <div className="text-base font-bold text-secondary">11</div>
              <div className="text-[10px] text-outline">Hospital Visits</div>
            </div>
            <div className="p-2.5 rounded-xl bg-error-container/30 border border-error/40 text-left">
              <div className="text-[10px] font-bold text-error uppercase">Known Hypersensitivity</div>
              <div className="font-bold text-on-surface text-[11px]">Penicillin G, Ciprofloxacin (Mild)</div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION: Longitudinal Vitals & Fluid Metrics (Spacious Independent Graphs) */}
      <div className="space-y-6">
        
        {/* Graph 1: Blood Pressure (BP) - Systolic & Diastolic */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-outline-variant/40 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-error" />
                <h3 className="text-base font-extrabold text-primary font-headline">
                  1. Blood Pressure (BP) - Systolic &amp; Diastolic
                </h3>
                <span className="bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                  Optimal Baseline Control
                </span>
              </div>
              <p className="text-xs font-body text-on-surface-variant">
                Clinical Normal Envelope: Systolic &lt; 120 mmHg • Diastolic &lt; 80 mmHg (Unit: mmHg)
              </p>
            </div>
            <div className="text-right">
              <div className="text-xs font-mono text-outline">Current Reading (15 Apr '25)</div>
              <div className="text-lg font-mono font-extrabold text-primary">128 / 82 <span className="text-xs font-normal text-outline">mmHg</span></div>
              <div className="text-[10px] font-mono text-secondary font-semibold">↓ 26 mmHg reduction vs Nov '24 baseline</div>
            </div>
          </div>

          {/* Visual Trend Bar Representation */}
          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-6 gap-2 text-center text-xs font-mono">
              {bpTrend.map((pt, idx) => (
                <div key={idx} className="bg-surface-container-low p-3 rounded-xl border border-outline-variant/50 space-y-1">
                  <div className="text-[10px] text-outline">{pt.date}</div>
                  <div className="text-sm font-bold text-primary">{pt.sys} / {pt.dia}</div>
                  <div className="w-full bg-outline-variant/40 h-1.5 rounded-full overflow-hidden mt-1">
                    <div 
                      className={`h-full rounded-full ${pt.sys > 140 ? 'bg-error' : pt.sys > 130 ? 'bg-secondary' : 'bg-tertiary'}`}
                      style={{ width: `${Math.min(100, (pt.sys / 170) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3 Secondary Vitals Cards Grid: PR, RR, Temp */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* 2. Pulse Rate */}
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-primary flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-primary" />
                <span>2. Pulse Rate (PR / min)</span>
              </span>
              <span className="text-[10px] font-mono font-bold bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5 rounded">
                Normal Sinus
              </span>
            </div>
            <div className="text-2xl font-extrabold font-mono text-primary">
              74 <span className="text-xs font-normal text-outline">bpm</span>
            </div>
            <div className="text-[11px] font-mono text-on-surface-variant">
              Envelope: 60 - 100 bpm • Telemetry 24h Average: 76 bpm
            </div>
          </div>

          {/* 3. Respiratory Rate */}
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-primary flex items-center gap-1.5">
                <Wind className="w-4 h-4 text-secondary" />
                <span>3. Respiratory Rate</span>
              </span>
              <span className="text-[10px] font-mono font-bold bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5 rounded">
                Regular
              </span>
            </div>
            <div className="text-2xl font-extrabold font-mono text-secondary">
              16 <span className="text-xs font-normal text-outline">breaths/min</span>
            </div>
            <div className="text-[11px] font-mono text-on-surface-variant">
              Envelope: 12 - 20 /min • Eupneic breathing pattern
            </div>
          </div>

          {/* 4. Body Temperature */}
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-primary flex items-center gap-1.5">
                <Thermometer className="w-4 h-4 text-tertiary" />
                <span>4. Body Temperature</span>
              </span>
              <span className="text-[10px] font-mono font-bold bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5 rounded">
                Afebrile
              </span>
            </div>
            <div className="text-2xl font-extrabold font-mono text-tertiary">
              98.4° <span className="text-xs font-normal text-outline">Fahrenheit</span>
            </div>
            <div className="text-[11px] font-mono text-on-surface-variant">
              Envelope: 97.8° - 99.1°F • No pyrexia recorded
            </div>
          </div>

        </div>

        {/* 5 & 6. Fluid Intake & Output Balance Analytics */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-outline-variant/40 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <Droplet className="w-5 h-5 text-secondary" />
                <h3 className="text-base font-extrabold text-primary font-headline">
                  5 &amp; 6. 24-Hour Fluid Intake &amp; Output Balance Matrix
                </h3>
              </div>
              <p className="text-xs font-body text-on-surface-variant">
                Hemodynamic hydration balance: Oral/IV intake vs urine volume + insensible losses
              </p>
            </div>
            <span className="bg-secondary-container text-on-secondary-container text-xs font-mono font-bold px-3 py-1 rounded-full">
              Net Balance: +450 mL (Euvolemic)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {fluidData.map((f, idx) => (
              <div key={idx} className="bg-surface-container-low p-3.5 rounded-xl border border-outline-variant/50 space-y-2 text-xs font-mono">
                <div className="font-bold text-on-surface text-center border-b border-outline-variant/30 pb-1">{f.day}</div>
                <div className="flex justify-between text-outline">
                  <span>Intake:</span>
                  <span className="font-bold text-primary">{f.intake} mL</span>
                </div>
                <div className="flex justify-between text-outline">
                  <span>Output:</span>
                  <span className="font-bold text-secondary">{f.output} mL</span>
                </div>
                <div className="pt-1 border-t border-outline-variant/30 flex justify-between font-bold text-tertiary">
                  <span>Balance:</span>
                  <span>{f.balance}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7. Patient Disease Episodes & Treatment Duration Analysis */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-outline-variant/40 pb-3">
            <div>
              <h3 className="text-base font-extrabold text-primary font-headline">
                7. Patient Disease Episodes &amp; Treatment Duration Analysis
              </h3>
              <p className="text-xs font-body text-on-surface-variant">
                Longitudinal progression, episodic recurrence, and therapeutic milestones
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-outline">Multi-Department Tracking</span>
          </div>

          <div className="space-y-3">
            {diseaseEpisodes.map((ep, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-surface-container-low/60 border border-outline-variant/60 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-mono">
                  <div className="font-bold text-on-surface text-sm font-headline">
                    {ep.disease} <span className="text-outline font-normal">({ep.dept})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-surface-container-lowest px-2 py-0.5 rounded border border-outline-variant text-[11px] font-bold text-primary">
                      {ep.status}
                    </span>
                    <span className="text-outline">{ep.duration}</span>
                  </div>
                </div>
                <div className="w-full bg-outline-variant/30 h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: `${ep.progress}%` }} />
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-on-surface-variant">
                  <span>Started: {ep.startDate}</span>
                  <span className="font-bold text-tertiary">Status: {ep.control}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 8. Patient Cumulative Medication Exposure & Duration Analytics */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-outline-variant/40 pb-3">
            <div>
              <h3 className="text-base font-extrabold text-primary font-headline">
                8. Patient Cumulative Medication Exposure &amp; Duration Analytics
              </h3>
              <p className="text-xs font-body text-on-surface-variant">
                Cumulative pharmacotherapy exposure, patient refill compliance &amp; safety surveillance
              </p>
            </div>
            <span className="text-xs font-mono font-bold bg-tertiary-fixed text-on-tertiary-fixed px-2.5 py-1 rounded-full">
              Overall Adherence: 94%
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-outline-variant/60 text-outline text-[10px] uppercase">
                  <th className="py-2.5">Medication Name</th>
                  <th className="py-2.5">Class</th>
                  <th className="py-2.5">Days Taken</th>
                  <th className="py-2.5">Adherence Rate</th>
                  <th className="py-2.5">Compliance</th>
                  <th className="py-2.5">Biochemical Safety</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                {medicationAnalytics.map((med, idx) => (
                  <tr key={idx} className="hover:bg-surface-container-low/40">
                    <td className="py-3 font-bold text-primary">{med.name}</td>
                    <td className="py-3 text-outline">{med.class}</td>
                    <td className="py-3 font-bold">{med.daysTaken} Days</td>
                    <td className="py-3 font-bold text-secondary">{med.adherence}</td>
                    <td className="py-3"><span className="bg-tertiary-fixed/30 text-tertiary px-2 py-0.5 rounded font-bold text-[10px]">{med.compliance}</span></td>
                    <td className="py-3 text-on-surface-variant text-[11px]">{med.safety}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
};

export default HealthInsightsScreen;
