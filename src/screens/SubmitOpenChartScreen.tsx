import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Activity, 
  Heart, 
  Wind, 
  Thermometer, 
  Droplet, 
  Pill, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Printer, 
  Share2, 
  Calendar, 
  Stethoscope, 
  ShieldAlert, 
  ArrowLeft,
  ChevronDown,
  Sparkles,
  Layers,
  Utensils,
  Eye,
  Check,
  Video
} from 'lucide-react';
import { ScreenId, Patient, Prescription } from '../types';

interface SubmitOpenChartScreenProps {
  onNavigate: (screen: ScreenId) => void;
  selectedPatient: Patient;
  prescription: Prescription;
}

export const SubmitOpenChartScreen: React.FC<SubmitOpenChartScreenProps> = ({
  onNavigate,
  selectedPatient,
  prescription,
}) => {
  const [isSigned, setIsSigned] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'allergies' | 'vitals' | 'consultation'>('all');

  // 7-Day Vitals Matrix Data
  const vitalsMatrix = [
    {
      param: 'Blood Pressure (BP)',
      normal: 'Normal: ~120/80 mmHg',
      today: '142/92',
      todayAlert: 'Stage-1 Alert',
      todayStatus: 'alert',
      d6: '136/88',
      d5: '140/90',
      d4: '168/104',
      d4Alert: 'Crisis Alert',
      d3: '148/94',
      d2: '154/98',
      d1: '160/100',
    },
    {
      param: 'Heart Rate / Pulse',
      normal: 'Normal: 60-100 bpm',
      today: '86 bpm',
      todayAlert: 'Normal Sinus',
      todayStatus: 'normal',
      d6: '88 bpm',
      d5: '92 bpm',
      d4: '96 bpm',
      d3: '94 bpm',
      d2: '114 bpm',
      d2Alert: 'Tachycardia',
      d1: '108 bpm',
    },
    {
      param: 'Oxygen Saturation (SpO2)',
      normal: 'Normal: 95-100%',
      today: '98%',
      todayAlert: 'Room Air',
      todayStatus: 'normal',
      d6: '97%',
      d5: '96%',
      d4: '95%',
      d3: '91%',
      d3Alert: 'Hypoxia Alert',
      d2: '93% (2L O2)',
      d1: '94%',
    },
    {
      param: 'Body Temperature',
      normal: 'Normal: 97.8° - 99.1°F',
      today: '98.4°F',
      todayAlert: 'Afebrile',
      todayStatus: 'normal',
      d6: '98.6°F',
      d5: '101.8°F',
      d5Alert: 'Febrile Spike',
      d4: '99.2°F',
      d3: '98.8°F',
      d2: '98.6°F',
      d1: '99.0°F',
    },
    {
      param: 'Respiratory Rate (RR)',
      normal: 'Normal: 12-20 breaths/min',
      today: '16 /min',
      todayAlert: 'Regular',
      todayStatus: 'normal',
      d6: '18 /min',
      d5: '18 /min',
      d4: '20 /min',
      d3: '24 /min',
      d3Alert: 'Tachypneic',
      d2: '22 /min',
      d1: '20 /min',
    },
    {
      param: 'Random Blood Sugar (RBS)',
      normal: 'Target: 100-140 mg/dL',
      today: '142 mg/dL',
      todayAlert: 'Subtle Borderline',
      todayStatus: 'warn',
      d6: '148 mg/dL',
      d5: '162 mg/dL',
      d4: '178 mg/dL',
      d3: '190 mg/dL',
      d2: '210 mg/dL',
      d1: '238 mg/dL',
      d1Alert: 'Hyperglycemia',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in py-2 pb-16">
      
      {/* Top Breadcrumb & Action Strip */}
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
                4th Screen
              </span>
              <span className="text-xs font-mono font-bold text-secondary uppercase tracking-wider">
                Prescription &amp; Chart
              </span>
            </div>
            <h1 className="text-xl font-extrabold text-primary font-headline">
              7-Day Vitals Trend &amp; Clinical Prescription Protocol
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-outline-variant text-on-surface-variant hover:bg-surface-container-low text-xs font-mono font-medium transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Chart</span>
          </button>
          <button 
            onClick={() => alert('HL7 FHIR Clinical Chart Exported to Central Hospital EMR.')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-secondary-container text-on-secondary-container text-xs font-mono font-bold hover:bg-secondary/20 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Export FHIR</span>
          </button>
        </div>
      </div>

      {/* Patient Clinical Context Banner */}
      <div className="bg-gradient-to-r from-primary-container via-primary to-primary-container text-on-primary rounded-2xl p-6 shadow-clinical-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-mono font-bold flex items-center justify-center text-xl shadow-xs">
              AS
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-extrabold font-headline tracking-tight text-white">
                  Aarav Sharma
                </h2>
                <span className="bg-white/20 text-white text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase border border-white/30">
                  Ward 4B • Bed 12
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-primary-fixed pt-1">
                <span>UHID-2024-88491</span>
                <span>•</span>
                <span>42 Yrs • Male</span>
                <span>•</span>
                <span className="bg-error/30 text-white px-2 py-0.2 rounded font-bold">Blood: O+ve</span>
                <span>•</span>
                <span>Adm: 08 Oct 2024</span>
              </div>
            </div>
          </div>

          <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 border-white/20 pt-3 md:pt-0 text-xs font-mono">
            <span className="text-white/80">Attending Consultant:</span>
            <span className="font-bold text-white text-sm">Dr. Deshraj Burdak, MD</span>
            <span className="text-[11px] text-tertiary-fixed font-semibold">Continuous Telemetry Active</span>
          </div>
        </div>
      </div>

      {/* SECTION 1: Critical Patient Allergies & Adverse Reactions */}
      <div className="bg-surface-container-lowest rounded-2xl border-2 border-error/40 shadow-clinical p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-outline-variant/40 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-error-container text-on-error-container">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-error font-headline">
                Critical Patient Allergies &amp; Adverse Reactions (Review Before Prescribing)
              </h3>
              <p className="text-xs font-body text-on-surface-variant">
                Mandatory clinical contraindication screening before approving new therapeutic orders
              </p>
            </div>
          </div>
          <span className="bg-error text-on-error text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase self-start sm:self-center">
            High Clinical Risk
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Medicine Allergies */}
          <div className="bg-surface-container-low/70 rounded-xl p-4 border border-outline-variant/60 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-primary flex items-center gap-1.5">
                <Pill className="w-4 h-4 text-primary" />
                <span>Medicine Allergies</span>
              </span>
              <span className="text-[10px] font-mono font-bold text-error bg-error-container px-2 py-0.5 rounded-full">
                Severe
              </span>
            </div>
            <div className="space-y-1.5 text-xs font-body">
              <div className="p-2 rounded-lg bg-surface-container-lowest border border-error/30">
                <div className="font-bold text-on-surface flex items-center justify-between">
                  <span>Penicillin / Amoxicillin</span>
                  <span className="text-[10px] font-mono text-error font-bold">Severe</span>
                </div>
                <div className="text-[11px] font-mono text-error">
                  Anaphylaxis Risk - Strict Beta-Lactam Contraindication
                </div>
              </div>
              <div className="p-2 rounded-lg bg-surface-container-lowest border border-outline-variant/60">
                <div className="font-bold text-on-surface flex items-center justify-between">
                  <span>Sulfa Drugs / Sulfonamides</span>
                  <span className="text-[10px] font-mono text-secondary font-bold">Moderate</span>
                </div>
                <div className="text-[11px] font-mono text-on-surface-variant">
                  Urticaria &amp; Generalized Skin Rash
                </div>
              </div>
            </div>
          </div>

          {/* Food Allergies */}
          <div className="bg-surface-container-low/70 rounded-xl p-4 border border-outline-variant/60 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-primary flex items-center gap-1.5">
                <Utensils className="w-4 h-4 text-secondary" />
                <span>Food Allergies</span>
              </span>
              <span className="text-[10px] font-mono font-bold text-error bg-error-container px-2 py-0.5 rounded-full">
                Severe
              </span>
            </div>
            <div className="space-y-1.5 text-xs font-body">
              <div className="p-2 rounded-lg bg-surface-container-lowest border border-error/30">
                <div className="font-bold text-on-surface flex items-center justify-between">
                  <span>Peanuts &amp; Tree Nuts</span>
                  <span className="text-[10px] font-mono text-error font-bold">Severe</span>
                </div>
                <div className="text-[11px] font-mono text-error">
                  Angioedema &amp; Airway Constriction Risk
                </div>
              </div>
              <div className="p-2 rounded-lg bg-surface-container-lowest border border-outline-variant/60">
                <div className="font-bold text-on-surface flex items-center justify-between">
                  <span>Shellfish</span>
                  <span className="text-[10px] font-mono text-secondary font-bold">Moderate</span>
                </div>
                <div className="text-[11px] font-mono text-on-surface-variant">
                  Gastrointestinal distress &amp; hives
                </div>
              </div>
            </div>
          </div>

          {/* Environmental Allergies */}
          <div className="bg-surface-container-low/70 rounded-xl p-4 border border-outline-variant/60 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-primary flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-outline" />
                <span>Environmental / Other</span>
              </span>
              <span className="text-[10px] font-mono font-bold text-outline bg-surface-container px-2 py-0.5 rounded-full">
                Mild/Mod
              </span>
            </div>
            <div className="space-y-1.5 text-xs font-body">
              <div className="p-2 rounded-lg bg-surface-container-lowest border border-outline-variant/60">
                <div className="font-bold text-on-surface flex items-center justify-between">
                  <span>Contrast Dye / Iodine</span>
                  <span className="text-[10px] font-mono text-outline font-bold">Mild</span>
                </div>
                <div className="text-[11px] font-mono text-on-surface-variant">
                  Flushing, sensation of warmth &amp; mild nausea
                </div>
              </div>
              <div className="p-2 rounded-lg bg-surface-container-lowest border border-outline-variant/60">
                <div className="font-bold text-on-surface flex items-center justify-between">
                  <span>Latex</span>
                  <span className="text-[10px] font-mono text-secondary font-bold">Moderate</span>
                </div>
                <div className="text-[11px] font-mono text-on-surface-variant">
                  Contact dermatitis (Use latex-free gloves/cannulas)
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* SECTION 2: Active Ongoing Treatments Across Departments */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-outline-variant/40 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary-fixed/40 text-primary">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-primary font-headline">
                Active Ongoing Treatments Across Departments
              </h3>
              <p className="text-xs font-body text-on-surface-variant">
                Currently active hospital treatments, running protocols &amp; primary attending departments
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-secondary bg-secondary-container px-3 py-1 rounded-full">
            3 Departments Collaborating
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Department 1: Cardiology */}
          <div className="bg-surface-container-low/60 rounded-xl p-4 border border-outline-variant/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-primary font-headline text-sm flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-error" />
                <span>Cardiology</span>
              </span>
              <span className="text-[10px] font-mono font-bold bg-primary text-primary-fixed px-2 py-0.5 rounded">
                Active Inpatient
              </span>
            </div>
            <div className="text-xs space-y-1 font-body">
              <div className="text-[11px] font-mono text-outline uppercase">Disease / Condition</div>
              <div className="font-bold text-on-surface">Hypertensive Emergency &amp; CAD</div>
              <div className="text-[11px] font-mono text-outline uppercase pt-1">Treatment Plan</div>
              <div className="text-[11px] text-on-surface-variant">BP stabilization via oral titration, continuous telemetry ECG monitoring</div>
              <div className="text-[11px] font-mono text-outline uppercase pt-1">Active Medicine(s)</div>
              <div className="flex flex-wrap gap-1 pt-0.5 font-mono text-[10px]">
                <span className="bg-surface-container-lowest px-2 py-0.5 rounded border border-outline-variant/60 text-primary font-bold">Amlodipine 5mg</span>
                <span className="bg-surface-container-lowest px-2 py-0.5 rounded border border-outline-variant/60 text-primary font-bold">Atorvastatin 20mg</span>
                <span className="bg-surface-container-lowest px-2 py-0.5 rounded border border-outline-variant/60 text-primary font-bold">Aspirin 75mg</span>
              </div>
            </div>
          </div>

          {/* Department 2: Nephrology */}
          <div className="bg-surface-container-low/60 rounded-xl p-4 border border-outline-variant/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-primary font-headline text-sm flex items-center gap-1.5">
                <Droplet className="w-4 h-4 text-secondary" />
                <span>Nephrology</span>
              </span>
              <span className="text-[10px] font-mono font-bold bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded">
                Monitoring
              </span>
            </div>
            <div className="text-xs space-y-1 font-body">
              <div className="text-[11px] font-mono text-outline uppercase">Disease / Condition</div>
              <div className="font-bold text-on-surface">Early Diabetic Nephropathy (Stage 2)</div>
              <div className="text-[11px] font-mono text-outline uppercase pt-1">Treatment Plan</div>
              <div className="text-[11px] text-on-surface-variant">Renoprotective therapy, eGFR &amp; serum creatinine tracking, urine microalbumin</div>
              <div className="text-[11px] font-mono text-outline uppercase pt-1">Active Medicine(s)</div>
              <div className="flex flex-wrap gap-1 pt-0.5 font-mono text-[10px]">
                <span className="bg-surface-container-lowest px-2 py-0.5 rounded border border-outline-variant/60 text-secondary font-bold">Telmisartan 40mg</span>
              </div>
            </div>
          </div>

          {/* Department 3: Endocrinology */}
          <div className="bg-surface-container-low/60 rounded-xl p-4 border border-outline-variant/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-primary font-headline text-sm flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-tertiary" />
                <span>Endocrinology</span>
              </span>
              <span className="text-[10px] font-mono font-bold bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5 rounded">
                Protocol Active
              </span>
            </div>
            <div className="text-xs space-y-1 font-body">
              <div className="text-[11px] font-mono text-outline uppercase">Disease / Condition</div>
              <div className="font-bold text-on-surface">Type 2 Diabetes Mellitus</div>
              <div className="text-[11px] font-mono text-outline uppercase pt-1">Treatment Plan</div>
              <div className="text-[11px] text-on-surface-variant">Glycemic management, pre-prandial glucose charting, HbA1c target &lt; 7.0%</div>
              <div className="text-[11px] font-mono text-outline uppercase pt-1">Active Medicine(s)</div>
              <div className="flex flex-wrap gap-1 pt-0.5 font-mono text-[10px]">
                <span className="bg-surface-container-lowest px-2 py-0.5 rounded border border-outline-variant/60 text-tertiary font-bold">Metformin 500mg ER</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* SECTION 3: 7-Day Longitudinal Vitals Chart & Telemetry Tracking (Exact Stitch Screen 4) */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical overflow-hidden">
        <div className="p-5 border-b border-outline-variant/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-container-low/40">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-primary font-headline">
                7-Day Longitudinal Vitals Chart &amp; Telemetry Tracking
              </h3>
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            </div>
            <p className="text-xs font-body text-on-surface-variant">
              Continuous patient vital parameters over the last 7 days. Today (Day 7) highlighted with abnormal clinical thresholds.
            </p>
          </div>
          <div className="text-xs font-mono font-semibold text-outline">
            Telemetry Bed 12 • Live Telemetry Synchronized
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-[11px] font-mono uppercase tracking-wider text-outline border-b border-outline-variant/60">
                <th className="py-3 px-4 font-bold min-w-[200px]">Vitals Parameter</th>
                <th className="py-3 px-4 font-bold bg-primary-container text-on-primary min-w-[140px] text-center border-x border-primary">
                  Active / Today<br/><span className="text-[10px] font-normal text-primary-fixed">14 Oct (Day 7)</span>
                </th>
                <th className="py-3 px-3 font-semibold text-center">13 Oct (D6)</th>
                <th className="py-3 px-3 font-semibold text-center">12 Oct (D5)</th>
                <th className="py-3 px-3 font-semibold text-center">11 Oct (D4)</th>
                <th className="py-3 px-3 font-semibold text-center">10 Oct (D3)</th>
                <th className="py-3 px-3 font-semibold text-center">09 Oct (D2)</th>
                <th className="py-3 px-3 font-semibold text-center">08 Oct (D1 - Adm)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30 font-mono text-xs">
              {vitalsMatrix.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-surface-container-low/50 transition-colors">
                  
                  {/* Parameter Name */}
                  <td className="py-3.5 px-4 font-sans font-bold text-on-surface">
                    <div>{row.param}</div>
                    <div className="text-[10px] font-mono font-normal text-outline">{row.normal}</div>
                  </td>

                  {/* Day 7 / Today (Highlighted Column) */}
                  <td className="py-3.5 px-3 bg-primary-fixed/30 border-x border-primary/20 text-center">
                    <div className="font-extrabold text-sm text-primary">{row.today}</div>
                    <span className={`inline-block text-[9px] font-bold px-1.5 py-0.2 rounded mt-0.5 ${
                      row.todayStatus === 'alert'
                        ? 'bg-error text-on-error'
                        : row.todayStatus === 'warn'
                        ? 'bg-secondary text-on-secondary'
                        : 'bg-tertiary-fixed text-on-tertiary-fixed'
                    }`}>
                      {row.todayAlert}
                    </span>
                  </td>

                  {/* Day 6 */}
                  <td className="py-3.5 px-3 text-center text-on-surface-variant">{row.d6}</td>

                  {/* Day 5 */}
                  <td className="py-3.5 px-3 text-center">
                    <div className="text-on-surface-variant">{row.d5}</div>
                    {row.d5Alert && (
                      <span className="text-[9px] font-bold text-error bg-error-container px-1 py-0.2 rounded">
                        {row.d5Alert}
                      </span>
                    )}
                  </td>

                  {/* Day 4 */}
                  <td className="py-3.5 px-3 text-center">
                    <div className="text-on-surface-variant">{row.d4}</div>
                    {row.d4Alert && (
                      <span className="text-[9px] font-bold text-error bg-error-container px-1 py-0.2 rounded">
                        {row.d4Alert}
                      </span>
                    )}
                  </td>

                  {/* Day 3 */}
                  <td className="py-3.5 px-3 text-center">
                    <div className="text-on-surface-variant">{row.d3}</div>
                    {row.d3Alert && (
                      <span className="text-[9px] font-bold text-error bg-error-container px-1 py-0.2 rounded">
                        {row.d3Alert}
                      </span>
                    )}
                  </td>

                  {/* Day 2 */}
                  <td className="py-3.5 px-3 text-center">
                    <div className="text-on-surface-variant">{row.d2}</div>
                    {row.d2Alert && (
                      <span className="text-[9px] font-bold text-error bg-error-container px-1 py-0.2 rounded">
                        {row.d2Alert}
                      </span>
                    )}
                  </td>

                  {/* Day 1 */}
                  <td className="py-3.5 px-3 text-center">
                    <div className="text-on-surface-variant">{row.d1}</div>
                    {row.d1Alert && (
                      <span className="text-[9px] font-bold text-error bg-error-container px-1 py-0.2 rounded">
                        {row.d1Alert}
                      </span>
                    )}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 4: Today's Clinical Treatment & Consultation Record (Aaj Ka Elaaj) */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-outline-variant/40 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-extrabold text-primary font-headline">
                Today's Clinical Treatment &amp; Consultation Record
              </h3>
              <span className="text-xs font-mono font-bold bg-primary-fixed text-primary px-2 py-0.5 rounded">
                Aaj Ka Elaaj
              </span>
            </div>
            <p className="text-xs font-body text-on-surface-variant">
              Encounter Date: Today, 14 Oct 2024 • Attending Physician: Dr. Deshraj Burdak, MD (Cardiology)
            </p>
          </div>
          <span className="bg-tertiary-fixed text-on-tertiary-fixed text-[11px] font-mono font-bold px-3 py-1 rounded-full uppercase self-start sm:self-center">
            OPD / Inpatient Live Session
          </span>
        </div>

        {/* 1. Chief Complaint & Symptoms */}
        <div className="p-4 rounded-xl bg-surface-container-low/60 border border-outline-variant/60 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-primary font-headline text-sm">
              1. Chief Complaint &amp; Presenting Symptoms (Chef Complane)
            </span>
            <span className="text-[10px] font-mono font-bold text-error bg-error-container px-2 py-0.5 rounded">
              High Urgency
            </span>
          </div>
          <p className="text-xs font-body text-on-surface">
            Acute retrosternal chest discomfort radiating to left shoulder (onset 2 hrs ago), accompanied by mild diaphoresis and breathlessness on exertion.
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1 font-mono text-[11px]">
            <span className="bg-surface-container-lowest px-2.5 py-0.5 rounded-full border border-outline-variant text-primary font-bold">Chest Pain ✓</span>
            <span className="bg-surface-container-lowest px-2.5 py-0.5 rounded-full border border-outline-variant text-primary font-bold">Dyspnea (Breathlessness) ✓</span>
            <span className="bg-surface-container-lowest px-2.5 py-0.5 rounded-full border border-outline-variant text-primary font-bold">Diaphoresis (Sweating) ✓</span>
            <span className="bg-surface-container-lowest px-2.5 py-0.5 rounded-full border border-outline-variant text-outline">No Palpitations</span>
          </div>
        </div>

        {/* 2. Investigations & Diagnostic Orders */}
        <div className="p-4 rounded-xl bg-surface-container-low/60 border border-outline-variant/60 space-y-2">
          <span className="font-bold text-primary font-headline text-sm">
            2. Investigations &amp; Diagnostic Orders (Kon-kon se test karane hain)
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-1 text-xs font-mono">
            {[
              { name: 'ECG 12-Lead STAT', status: 'Completed • Sinus Rhythm with ST depression', urgent: true },
              { name: 'Serum Troponin I (High Sensitivity)', status: 'Pending Lab Result • Stat order', urgent: true },
              { name: '2D Echocardiography', status: 'Scheduled 11:30 AM • EF ~52%', urgent: false },
              { name: 'Lipid Profile & HbA1c', status: 'Sample Collected 07:00 AM', urgent: false },
              { name: 'Kidney Function Test (KFT)', status: 'Completed • Creatinine 1.1 mg/dL', urgent: false },
              { name: 'Chest X-Ray (PA View)', status: 'Completed • No Cardiomegaly', urgent: false },
            ].map((test, idx) => (
              <div key={idx} className="bg-surface-container-lowest p-2.5 rounded-lg border border-outline-variant/60 space-y-1">
                <div className="font-bold text-on-surface flex items-center justify-between">
                  <span>{test.name}</span>
                  {test.urgent && <span className="text-[9px] bg-error text-on-error px-1.5 py-0.2 rounded">STAT</span>}
                </div>
                <div className="text-[10px] text-on-surface-variant">{test.status}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Provisional & Final Diagnosis */}
        <div className="p-4 rounded-xl bg-surface-container-low/60 border border-outline-variant/60 space-y-2">
          <span className="font-bold text-primary font-headline text-sm">
            3. Provisional &amp; Final Diagnosis (Provisional Dignosh)
          </span>
          <div className="p-3 bg-surface-container-lowest rounded-lg border border-primary/30 flex items-center justify-between">
            <div>
              <div className="font-extrabold text-primary text-sm font-headline">
                Acute Coronary Syndrome (Unstable Angina) with Essential Hypertension
              </div>
              <div className="text-[11px] font-mono text-outline">
                ICD-10 Reference: <strong>I20.0</strong> (Unstable Angina) &amp; <strong>I10</strong> (Essential Primary HTN)
              </div>
            </div>
            <span className="bg-primary text-primary-fixed font-mono font-bold text-xs px-2.5 py-1 rounded">
              Verified Diagnosis
            </span>
          </div>
        </div>

        {/* 4. New Disease Medication Prescription */}
        <div className="p-4 rounded-xl bg-surface-container-low/60 border border-outline-variant/60 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-primary font-headline text-sm">
              4. New Disease Medication Prescription (Naye Disease ke liye Medicine)
            </span>
            <span className="text-[10px] font-mono text-secondary font-bold">
              Checked for Beta-Lactam / Sulfa Allergies: Passed ✓
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-outline-variant/60 text-outline text-[10px] uppercase">
                  <th className="py-2">Medicine Name</th>
                  <th className="py-2">Dosage &amp; Route</th>
                  <th className="py-2">Frequency</th>
                  <th className="py-2">Timing</th>
                  <th className="py-2">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30 text-xs">
                <tr>
                  <td className="py-2 font-bold text-primary">Tab. Ticagrelor 90mg</td>
                  <td className="py-2">1 Tablet • Oral</td>
                  <td className="py-2"><span className="bg-surface-container px-2 py-0.5 rounded font-bold">1 - 0 - 1</span></td>
                  <td className="py-2 text-on-surface-variant">After Meals</td>
                  <td className="py-2 font-bold">30 Days</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold text-primary">Tab. Rosuvastatin 20mg</td>
                  <td className="py-2">1 Tablet • Oral</td>
                  <td className="py-2"><span className="bg-surface-container px-2 py-0.5 rounded font-bold">0 - 0 - 1</span></td>
                  <td className="py-2 text-on-surface-variant">At Bedtime</td>
                  <td className="py-2 font-bold">30 Days</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold text-primary">Tab. Metoprolol Succinate 25mg</td>
                  <td className="py-2">1 Tablet • Oral</td>
                  <td className="py-2"><span className="bg-surface-container px-2 py-0.5 rounded font-bold">1 - 0 - 0</span></td>
                  <td className="py-2 text-on-surface-variant">Morning After Food</td>
                  <td className="py-2 font-bold">30 Days</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold text-primary">Syp. Sucralfate 10ml</td>
                  <td className="py-2">2 Tsp • Oral</td>
                  <td className="py-2"><span className="bg-surface-container px-2 py-0.5 rounded font-bold">1 - 1 - 1</span></td>
                  <td className="py-2 text-on-surface-variant">30 Mins Before Food</td>
                  <td className="py-2 font-bold">14 Days</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 5. Patient Lifestyle Guidance */}
        <div className="p-4 rounded-xl bg-surface-container-low/60 border border-outline-variant/60 space-y-2">
          <span className="font-bold text-primary font-headline text-sm flex items-center gap-2">
            <Video className="w-4 h-4 text-secondary" />
            <span>5. Patient Lifestyle Guidance: Diet &amp; Exercise Video Prescriptions</span>
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <div className="p-3 bg-surface-container-lowest rounded-lg border border-outline-variant/60 flex items-start gap-3">
              <Utensils className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <div className="font-bold text-on-surface">Cardioprotective Low-Sodium Diet (DASH)</div>
                <div className="text-on-surface-variant text-[11px]">Strict restriction of salt &lt; 3g daily. Avoid processed snacks, papad, pickles, and high-fat fried items.</div>
              </div>
            </div>
            <div className="p-3 bg-surface-container-lowest rounded-lg border border-outline-variant/60 flex items-start gap-3">
              <Activity className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <div className="font-bold text-on-surface">Supervised Cardiac Walking Protocol</div>
                <div className="text-on-surface-variant text-[11px]">Gradual 20-minute daily walking on level ground. Stop immediately if feeling chest pressure or dyspnea.</div>
              </div>
            </div>
          </div>
        </div>

        {/* 6. Future Plan & 7. Follow-up Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-surface-container-low/60 border border-outline-variant/60 space-y-2">
            <span className="font-bold text-primary font-headline text-sm">
              6. Future Treatment Plan &amp; Clinical Notes
            </span>
            <p className="text-xs font-body text-on-surface">
              Coronary Angiography (CAG) planned for tomorrow 09:00 AM post stabilization. Keep NPO after midnight. Maintain continuous 12-lead telemetry ECG monitoring.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-surface-container-low/60 border border-outline-variant/60 space-y-2">
            <span className="font-bold text-primary font-headline text-sm">
              7. Follow-up Consultation Date
            </span>
            <div className="flex items-center gap-3 pt-1">
              <Calendar className="w-5 h-5 text-secondary" />
              <div>
                <div className="font-extrabold text-sm font-mono text-primary">Monday, 21 Oct 2024</div>
                <div className="text-[11px] font-mono text-outline">OPD Room 4B • Post-Discharge Review</div>
              </div>
            </div>
          </div>
        </div>

        {/* 8. Electronic Physician Attestation */}
        <div className="p-5 rounded-2xl bg-surface-container-low border-2 border-primary/40 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-sm font-bold font-headline text-primary">
                8. Electronic Physician Attestation &amp; Legal Sign-off
              </h4>
              <p className="text-xs font-body text-on-surface-variant">
                Digitally attested under National Health Stack Electronic Prescription Guidelines.
              </p>
            </div>
            <div className="text-xs font-mono text-on-surface-variant">
              Status: {isSigned ? (
                <span className="text-tertiary font-bold bg-tertiary-fixed/40 px-2.5 py-1 rounded">Digitally Signed ✓</span>
              ) : (
                <span className="text-error font-bold bg-error-container px-2.5 py-1 rounded">Pending Approval</span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="text-xs font-mono text-outline">
              Attending: <strong>Dr. Deshraj Burdak, MD</strong> (Reg. No: 12345)
            </div>
            <button
              onClick={() => {
                setIsSigned(true);
                alert('Prescription Digitally Signed and Transmitted to Patient Portal and Hospital Pharmacy.');
              }}
              disabled={isSigned}
              className={`px-6 py-2.5 rounded-xl font-mono text-xs font-bold transition-all shadow-clinical ${
                isSigned
                  ? 'bg-tertiary text-on-tertiary cursor-default'
                  : 'bg-primary hover:bg-primary-container text-on-primary active:scale-95'
              }`}
            >
              {isSigned ? 'Prescription Approved & Transmitted ✓' : 'Digitally Sign & Approve Prescription'}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default SubmitOpenChartScreen;
