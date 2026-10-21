import React, { useState } from 'react';
import { 
  Activity, 
  CheckCircle2, 
  ShieldCheck, 
  AlertTriangle, 
  Heart, 
  TrendingDown, 
  TrendingUp, 
  Clock, 
  Printer, 
  Download, 
  FileText, 
  FolderClock, 
  PlusCircle, 
  Sparkles,
  Pill,
  Share2
} from 'lucide-react';
import { ScreenId, Patient, Prescription } from '../types';
import { mockDoctor, mockPrescriptions, mockPatients } from '../data/mockData';

interface SubmitOpenChartScreenProps {
  onNavigate: (screen: ScreenId) => void;
  selectedPatient: Patient;
  prescription?: Prescription;
}

export const SubmitOpenChartScreen: React.FC<SubmitOpenChartScreenProps> = ({
  onNavigate,
  selectedPatient,
  prescription = mockPrescriptions[0]
}) => {
  const [activeTab, setActiveTab] = useState<'vitals' | 'glucose' | 'adherence'>('vitals');
  const [printSuccess, setPrintSuccess] = useState(false);

  // Historical data points for charts
  const bpHistory = [
    { month: 'May 2026', systolic: 162, diastolic: 98, note: 'Pre-treatment peak' },
    { month: 'Jun 2026', systolic: 154, diastolic: 94, note: 'Started Telmisartan 20' },
    { month: 'Jul 2026', systolic: 148, diastolic: 90, note: 'Titrated Telmisartan 40' },
    { month: 'Aug 2026', systolic: 142, diastolic: 88, note: 'Added lifestyle protocol' },
    { month: 'Sep 2026', systolic: 138, diastolic: 86, note: 'Stable response' },
    { month: 'Oct 2026', systolic: 136, diastolic: 84, note: 'Current optimal range' }
  ];

  const glucoseHistory = [
    { month: 'May 2026', fbg: 178, hba1c: 7.9 },
    { month: 'Jun 2026', fbg: 162, hba1c: 7.6 },
    { month: 'Jul 2026', fbg: 148, hba1c: 7.3 },
    { month: 'Aug 2026', fbg: 136, hba1c: 7.1 },
    { month: 'Sep 2026', fbg: 124, hba1c: 6.9 },
    { month: 'Oct 2026', fbg: 114, hba1c: 6.8 }
  ];

  const handlePrint = () => {
    setPrintSuccess(true);
    setTimeout(() => setPrintSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Screen Title & Submission Seal Banner */}
      <div className="bg-gradient-to-r from-primary via-slate-900 to-primary-container text-white p-6 rounded-3xl shadow-lg border border-slate-700/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-secondary text-white text-xs font-bold px-2.5 py-0.5 rounded-md">
                4th
              </span>
              <span className="text-xs font-bold text-secondary-fixed uppercase tracking-wider">
                Inside Prescription • Submit & Open Chart
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white">
              Clinical Medical Chart & Trajectory
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Real-time physiological response trajectory and digital prescription audit seal
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-white/10 hover:bg-white/20 active:scale-95 text-white text-xs font-bold px-3.5 py-2.5 rounded-xl border border-white/20 backdrop-blur-md flex items-center gap-1.5 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>{printSuccess ? 'Printed!' : 'Print Chart'}</span>
            </button>
            <button
              onClick={() => onNavigate('new-prescription')}
              className="bg-secondary hover:bg-secondary-light active:scale-95 text-white text-xs font-bold px-3.5 py-2.5 rounded-xl shadow-md flex items-center gap-1.5 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Modify / New Rx (6th)</span>
            </button>
          </div>
        </div>

        {/* Digital Signature Seal Pill */}
        <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold">Rx Verified & Signed by {mockDoctor.name} ({mockDoctor.regNumber})</span>
          </div>
          <div className="font-mono text-[11px] text-slate-400 bg-black/30 px-2.5 py-1 rounded-lg">
            SHA-256 Seal: {prescription.digitalSignatureHash}
          </div>
        </div>
      </div>

      {/* Patient Demographic & Allergy Alert Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center text-lg font-black font-display shadow-sm">
              {selectedPatient.bloodGroup}
            </div>

            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-xl font-black text-slate-900 font-display">
                  {selectedPatient.name}
                </h2>
                <span className="text-sm font-semibold text-slate-500">
                  {selectedPatient.age} Years • {selectedPatient.gender}
                </span>
                <span className="bg-teal-50 text-secondary-teal text-xs font-bold px-2 py-0.5 rounded-md border border-teal-200">
                  ABHA: {selectedPatient.abhaId}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 flex-wrap">
                <span>Phone: <strong className="text-slate-700">{selectedPatient.phone}</strong></span>
                <span>•</span>
                <span>Last Exam: <strong className="text-slate-700">{selectedPatient.lastVisit}</strong></span>
                <span>•</span>
                <span>Status: <strong className="text-secondary-teal">{selectedPatient.status}</strong></span>
              </div>
            </div>
          </div>

          {/* Known Allergies Warning Box */}
          <div className="bg-rose-50 border border-rose-200 p-3 rounded-2xl max-w-sm">
            <div className="flex items-center gap-1.5 text-emergency text-xs font-bold uppercase tracking-wider mb-1">
              <AlertTriangle className="w-4 h-4 text-emergency" />
              <span>Critical Allergies Flag</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {selectedPatient.allergies.map((allergy, i) => (
                <span key={i} className="text-[11px] font-bold bg-white text-rose-700 px-2 py-0.5 rounded-md border border-rose-200">
                  ⚠️ {allergy}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Quick Tabs to Explore Details */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 flex-wrap">
          <button
            onClick={() => onNavigate('old-records')}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <FolderClock className="w-3.5 h-3.5" />
            <span>Examine Old Records (5th)</span>
          </button>
          <button
            onClick={() => onNavigate('health-insights')}
            className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Risk Insights (7th)</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Charts & Response Trajectory */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-6">
        
        {/* Chart View Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
              <Activity className="w-5 h-5 text-secondary" />
              <span>Therapeutic Response Curve</span>
            </h3>
            <p className="text-xs text-slate-500">
              Physiological response trajectory monitored following initiation of current prescription
            </p>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => setActiveTab('vitals')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'vitals' ? 'bg-white text-primary shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Blood Pressure (mmHg)
            </button>
            <button
              onClick={() => setActiveTab('glucose')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'glucose' ? 'bg-white text-primary shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Glycemic / HbA1c
            </button>
            <button
              onClick={() => setActiveTab('adherence')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'adherence' ? 'bg-white text-primary shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Adherence Meter
            </button>
          </div>
        </div>

        {/* Tab 1: Blood Pressure Chart Visualizer */}
        {activeTab === 'vitals' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-primary inline-block"></span>
                  <strong>Systolic BP</strong> (Target: &lt;130)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-secondary inline-block"></span>
                  <strong>Diastolic BP</strong> (Target: &lt;85)
                </span>
              </div>
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <TrendingDown className="w-4 h-4" />
                -26 mmHg Systolic Reduction
              </span>
            </div>

            {/* Visual SVG Line / Bar Chart */}
            <div className="relative h-64 w-full bg-slate-50/70 rounded-2xl p-4 border border-slate-200/70 flex flex-col justify-end">
              
              {/* Target threshold guideline */}
              <div className="absolute top-[40%] left-0 right-0 border-b border-dashed border-emerald-400 pointer-events-none flex items-center justify-end pr-2">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-1.5 py-0.5 rounded">
                  Clinical Target 130 mmHg
                </span>
              </div>

              {/* Data Bars / Columns */}
              <div className="grid grid-cols-6 gap-3 items-end h-44 z-10">
                {bpHistory.map((item, idx) => {
                  const systolicHeight = ((item.systolic - 80) / 100) * 100;
                  const diastolicHeight = ((item.diastolic - 50) / 60) * 100;

                  return (
                    <div key={idx} className="flex flex-col items-center gap-1 h-full justify-end group">
                      <div className="text-[10px] font-bold text-slate-700 opacity-80 group-hover:opacity-100">
                        {item.systolic}/{item.diastolic}
                      </div>

                      <div className="w-full max-w-[48px] flex items-end justify-center gap-1 h-full">
                        {/* Systolic Bar */}
                        <div 
                          style={{ height: `${systolicHeight}%` }} 
                          className="w-1/2 bg-primary group-hover:bg-primary-light rounded-t-md transition-all relative"
                          title={`Systolic: ${item.systolic} mmHg`}
                        />
                        {/* Diastolic Bar */}
                        <div 
                          style={{ height: `${diastolicHeight}%` }} 
                          className="w-1/2 bg-secondary group-hover:bg-secondary-light rounded-t-md transition-all relative"
                          title={`Diastolic: ${item.diastolic} mmHg`}
                        />
                      </div>

                      <span className="text-[10px] font-semibold text-slate-500 whitespace-nowrap mt-1">
                        {item.month.split(' ')[0]}
                      </span>
                    </div>
                  );
                })}
              </div>

            </div>

            <div className="p-3 bg-teal-50/60 rounded-xl border border-teal-200/60 text-xs text-slate-700">
              <strong className="text-secondary-teal">Clinical Interpretation:</strong> The progression reflects remarkable therapeutic control. Initiation of Telmisartan 40mg alongside salt restriction produced a steady decrement from hypertensive Stage II (162/98) to normotensive target (136/84).
            </div>
          </div>
        )}

        {/* Tab 2: Glycemic / HbA1c Chart Visualizer */}
        {activeTab === 'glucose' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>HbA1c Target: &lt; 7.0% (American Diabetes Association)</span>
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <TrendingDown className="w-4 h-4" />
                HbA1c: 7.9% → 6.8%
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
              {glucoseHistory.map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">{item.month}</div>
                  <div className="text-lg font-black text-slate-900 font-display">{item.hba1c}%</div>
                  <div className="text-xs text-secondary-teal font-semibold">FBG: {item.fbg} mg/dL</div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-200/60 text-xs text-slate-700">
              <strong className="text-primary">Metformin Response:</strong> Consistent reduction in glycated hemoglobin from 7.9% to 6.8%. Fasting glucose stabilized below 120 mg/dL with zero reported hypoglycemic episodes.
            </div>
          </div>
        )}

        {/* Tab 3: Adherence Meter */}
        {activeTab === 'adherence' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-1">
                <span className="text-xs font-bold text-emerald-800 uppercase">Overall Adherence</span>
                <div className="text-3xl font-black text-emerald-700 font-display">94.2%</div>
                <span className="text-[11px] text-emerald-600 block">PulseBand Smart Log</span>
              </div>
              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200 text-center space-y-1">
                <span className="text-xs font-bold text-blue-800 uppercase">Doses Taken</span>
                <div className="text-3xl font-black text-primary font-display">85 / 90</div>
                <span className="text-[11px] text-slate-500 block">Past 30 Days</span>
              </div>
              <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 text-center space-y-1">
                <span className="text-xs font-bold text-purple-800 uppercase">Next Refill Due</span>
                <div className="text-3xl font-black text-purple-700 font-display">18 Days</div>
                <span className="text-[11px] text-purple-600 block">Auto-Sync Pharmacy</span>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Real-time Drug-Drug Interaction Safety Matrix */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900 font-display">
              Drug-Drug & Food Interaction Matrix
            </h3>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Safety Score: 100/100 (Clean)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="font-bold text-slate-800">Telmisartan + Metformin</div>
            <p className="text-slate-600 text-[11px]">
              No pharmacokinetic collision. Synergistic organoprotection against hypertensive diabetic nephropathy.
            </p>
            <span className="text-[10px] font-bold text-emerald-600">● Interaction: None</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="font-bold text-slate-800">Telmisartan + Atorvastatin</div>
            <p className="text-slate-600 text-[11px]">
              Concurrent statin & ARB therapy is established standard-of-care for cardiovascular risk reduction.
            </p>
            <span className="text-[10px] font-bold text-emerald-600">● Interaction: None</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="font-bold text-slate-800">Metformin + Atorvastatin</div>
            <p className="text-slate-600 text-[11px]">
              Safe combination. Monitor renal parameters (eGFR) and liver transaminases biannually.
            </p>
            <span className="text-[10px] font-bold text-emerald-600">● Interaction: None</span>
          </div>
        </div>
      </div>

      {/* Clinical Notes & Doctor Observation */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-3">
        <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
          <FileText className="w-4 h-4 text-secondary" />
          <span>Attending Physician Clinical Notes</span>
        </h3>
        <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200/80 font-mono">
          "Patient reviewed in OPD on 21-Oct-2026. Blood pressure is well-controlled on Telmisartan 40mg OD. Fasting glycemic levels under 120 mg/dL. No ankle swelling, no orthostatic symptoms. Salt restriction to continue. Retain current regimen for 90 days. Next review scheduled for January 2027 with repeat lipid profile and microalbuminuria screening."
        </p>
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span>Signed: Dr. Aarav Mehta, MD, DM (Cardiology), FACC</span>
          <span>Timestamp: 2026-10-21 11:30 AM IST</span>
        </div>
      </div>

    </div>
  );
};

export default SubmitOpenChartScreen;
