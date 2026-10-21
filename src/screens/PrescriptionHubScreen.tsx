import React, { useState } from 'react';
import { 
  FolderSearch, 
  FileEdit, 
  Activity, 
  ArrowRight, 
  Search, 
  Clock, 
  CheckCircle2, 
  User, 
  Calendar,
  Layers,
  BarChart3,
  BadgeAlert,
  Lock,
  Unlock,
  ShieldCheck,
  ChevronRight,
  RotateCcw
} from 'lucide-react';
import { ScreenId, Prescription, Patient } from '../types';

interface PrescriptionHubScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onSelectPatient: (patientId: string) => void;
  selectedPatient?: Patient;
  prescriptions: Prescription[];
}

interface QuickPatient {
  id: string;
  uhid: string;
  name: string;
  age: number;
  gender: string;
  dept: string;
  blood: string;
  status: string;
}

export const PrescriptionHubScreen: React.FC<PrescriptionHubScreenProps> = ({
  onNavigate,
  onSelectPatient,
  selectedPatient,
  prescriptions,
}) => {
  // Two-state workflow: Show Patient ID entry screen first as required by Stitch UI
  const [isPatientSubmitted, setIsPatientSubmitted] = useState<boolean>(false);
  const [patientIdInput, setPatientIdInput] = useState<string>('UHID-2024-88492');

  const quickPatients: QuickPatient[] = [
    {
      id: 'p1',
      uhid: 'UHID-2024-88492',
      name: 'Aarav Sharma',
      age: 28,
      gender: 'Male',
      dept: 'General OPD',
      blood: 'O+ (Rh Positive)',
      status: 'In-Consultation'
    },
    {
      id: 'p2',
      uhid: 'PID-2025-88412',
      name: 'Rohit Mehta',
      age: 34,
      gender: 'Male',
      dept: 'Internal Medicine',
      blood: 'B+ (Rh Positive)',
      status: 'Active Regimen'
    },
    {
      id: 'p3',
      uhid: 'UHID-2024-77219',
      name: 'Priya Verma',
      age: 45,
      gender: 'Female',
      dept: 'Follow-up Cardiology',
      blood: 'A+ (Rh Positive)',
      status: 'Routine Review'
    }
  ];

  const [activePatient, setActivePatient] = useState<QuickPatient>(quickPatients[0]);

  const handleSubmitPatientId = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!patientIdInput.trim()) return;

    // Check if input matches one of our known patients
    const matched = quickPatients.find(
      p => p.uhid.toLowerCase() === patientIdInput.trim().toLowerCase() ||
           p.name.toLowerCase().includes(patientIdInput.trim().toLowerCase())
    );

    if (matched) {
      setActivePatient(matched);
      onSelectPatient(matched.id);
    } else {
      setActivePatient({
        id: 'custom-p',
        uhid: patientIdInput.trim().toUpperCase(),
        name: selectedPatient ? selectedPatient.name : 'Aarav Sharma',
        age: 32,
        gender: 'Male',
        dept: 'OPD Care',
        blood: 'B+ (Rh Positive)',
        status: 'Active Chart'
      });
    }

    setIsPatientSubmitted(true);
  };

  const handleSelectQuickPatient = (p: QuickPatient) => {
    setPatientIdInput(p.uhid);
    setActivePatient(p);
    onSelectPatient(p.id);
    setIsPatientSubmitted(true);
  };

  // =========================================================================
  // VIEW 1: Patient Prescription Registry (Unique Patient ID Mentioning Page)
  // Matching Stitch Screen 02 (patient_id_search.html)
  // =========================================================================
  if (!isPatientSubmitted) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-8 py-10 max-w-4xl w-full mx-auto animate-fade-in">
        
        {/* Patient Prescription Registry Search Card */}
        <div className="w-full bg-surface-container-lowest border border-[#cbd5e1] rounded-2xl shadow-clinical p-8 md:p-10 flex flex-col items-center">
          
          {/* Header Badge & Icon matching Stitch */}
          <div className="w-16 h-16 rounded-2xl bg-[#004357] text-white flex items-center justify-center mb-4 border border-[#0d5c75] shadow-sm">
            <Activity className="w-8 h-8" />
          </div>

          {/* Title & Explanatory Subtitle */}
          <h1 className="text-2xl sm:text-3xl font-bold font-headline text-slate-900 text-center tracking-tight">
            Patient Prescription Registry
          </h1>
          <p className="text-sm font-body text-slate-600 text-center max-w-xl mt-2 leading-relaxed">
            Enter <span className="text-[#004357] font-bold font-mono">Unique Patient ID (PID/ Aadhar linked mobile no.)</span> to open active medical chart &amp; issue prescription
          </p>

          {/* Search Form with Direct Submit Button */}
          <form className="w-full mt-8 flex flex-col gap-5" onSubmit={handleSubmitPatientId}>
            <div className="flex flex-col gap-1.5">
              <label 
                className="text-xs font-mono font-bold text-[#004357] flex items-center justify-between" 
                htmlFor="patient-search-input"
              >
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#004357]" />
                  Unique Patient ID (PID/ Aadhar linked mobile no.)
                </span>
                <span className="text-[10px] font-mono font-normal text-slate-500 uppercase bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  Required
                </span>
              </label>

              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Search className="w-5 h-5" />
                </div>
                <input 
                  id="patient-search-input"
                  type="text"
                  value={patientIdInput}
                  onChange={(e) => setPatientIdInput(e.target.value)}
                  placeholder="UHID-2024-88492"
                  required
                  spellCheck="false"
                  autoComplete="off"
                  className="w-full h-12 pl-11 pr-20 rounded-xl bg-white border border-[#cbd5e1] text-slate-900 font-mono text-sm font-bold focus:border-[#004357] focus:ring-2 focus:ring-[#004357]/20 transition-all placeholder:text-slate-400"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold text-slate-500 border border-slate-300 rounded bg-slate-50">
                    ID
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-1">
              <button 
                type="submit"
                className="h-12 w-full sm:w-auto px-8 rounded-xl bg-[#004357] hover:bg-[#0d5c75] active:scale-95 text-white font-headline text-sm font-semibold flex items-center justify-center gap-2.5 transition-all shadow-md shrink-0 whitespace-nowrap border border-[#002f3e]"
              >
                <Unlock className="w-4 h-4" />
                <span>Submit &amp; Open Chart</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Divider line */}
          <div className="w-full h-px bg-slate-200 my-8" />

          {/* Recent Searched Patients & Quick Selection Section */}
          <div className="w-full flex flex-col gap-4">
            <div className="flex items-center justify-between text-xs font-mono text-slate-500">
              <span className="font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#004357]" />
                Recent Queue Patients (Quick Selection)
              </span>
              <span>Click to auto-load chart</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {quickPatients.map((p) => (
                <div 
                  key={p.uhid}
                  onClick={() => handleSelectQuickPatient(p)}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-[#004357] cursor-pointer transition-all flex flex-col justify-between gap-2 shadow-2xs group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#004357] group-hover:underline">
                      {p.uhid}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold">
                      {p.status}
                    </span>
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm font-headline">
                      {p.name}
                    </div>
                    <div className="text-[11px] font-mono text-slate-600">
                      {p.age} Y • {p.gender} • {p.dept}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Trust Badges & Clinical Safeguards Footer matching Stitch */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-slate-600 font-mono text-xs">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            ABHA / ABDM Integrated
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-[#004357]" />
            HL7 FHIR R4 Compliant
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-slate-600" />
            256-Bit TLS End-to-End Encryption
          </span>
        </div>

      </div>
    );
  }

  // =========================================================================
  // VIEW 2: Patient Chart Unlocked & Clinical Prescription Suite
  // Matching Image 5 & Stitch Screen 3
  // =========================================================================
  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in py-2">
      
      {/* Patient Active Chart Context Banner */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-semibold text-secondary uppercase tracking-wider">
              Active Medical Chart
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-primary text-on-primary">
              {activePatient.uhid}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
              {activePatient.status}
            </span>
          </div>
          
          <h1 className="text-2xl font-extrabold text-primary font-headline tracking-tight flex items-center gap-3">
            <span>{activePatient.name}</span>
            <span className="text-sm font-normal text-on-surface-variant font-mono">
              ({activePatient.age} Y / {activePatient.gender} • {activePatient.blood})
            </span>
          </h1>

          <p className="text-xs font-body text-on-surface-variant">
            Department: <strong className="text-slate-800">{activePatient.dept}</strong> • Attending: <strong className="text-slate-800">Dr. Deshraj Burdak, MD</strong>
          </p>
        </div>

        {/* Change Patient ID / Re-search Trigger */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsPatientSubmitted(false)}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 text-xs font-mono font-bold transition-all active:scale-95 whitespace-nowrap"
            title="Change Patient Unique ID"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-700" />
            <span>Change Patient ID</span>
          </button>

          <button
            onClick={() => onNavigate('submit-open-chart')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#004357] hover:bg-[#0d5c75] text-white text-xs font-mono font-bold shadow-xs transition-all active:scale-95 whitespace-nowrap"
          >
            <Activity className="w-4 h-4 text-white" />
            <span>Submit &amp; Open Chart →</span>
          </button>
        </div>
      </div>

      {/* Two Large Interactive Action Cards Side by Side (Exact Stitch Screen 3) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch w-full">
        
        {/* Card 1: Old Record */}
        <div className="group relative bg-surface-container-lowest rounded-2xl border-2 border-outline-variant hover:border-primary transition-all duration-200 shadow-clinical hover:shadow-clinical-md flex flex-col justify-between p-8 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary/20 group-hover:bg-primary transition-colors"></div>
          
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="w-14 h-14 rounded-2xl bg-surface-container text-primary flex items-center justify-center border border-outline-variant shrink-0 shadow-xs">
                <FolderSearch className="w-7 h-7" />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-extrabold text-on-surface group-hover:text-primary transition-colors font-headline mb-2">
                Old Record
              </h2>
              <p className="text-xs font-body text-on-surface-variant leading-relaxed">
                Review historical prescriptions, past diagnoses, archived laboratory reports, and ongoing multi-department treatment timelines.
              </p>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-outline-variant/50">
            <button
              onClick={() => onNavigate('old-records')}
              className="w-full bg-surface-container-low hover:bg-surface-container border-2 border-outline-variant text-primary font-bold py-3.5 px-5 rounded-xl text-xs font-mono flex items-center justify-center gap-2 transition-all duration-150 active:scale-98 shadow-xs"
            >
              <Search className="w-4 h-4" />
              <span>Search Past Records</span>
            </button>
          </div>
        </div>

        {/* Card 2: New Prescription */}
        <div className="group relative bg-surface-container-lowest rounded-2xl border-2 border-primary shadow-clinical-md hover:shadow-clinical-lg transition-all duration-200 flex flex-col justify-between p-8 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary transition-colors"></div>
          
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="w-14 h-14 rounded-2xl bg-primary text-on-primary flex items-center justify-center shadow-xs shrink-0">
                <FileEdit className="w-7 h-7" />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-extrabold text-primary font-headline mb-2">
                New Prescription
              </h2>
              <p className="text-xs font-body text-on-surface-variant leading-relaxed">
                Launch the 13-box clinical protocol workspace: symptoms, examination signs, lab orders, drug formulary with interaction safeguards, and lifestyle guidance.
              </p>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-outline-variant/50">
            <button
              onClick={() => onNavigate('new-prescription')}
              className="w-full bg-primary hover:bg-primary-container text-on-primary py-3.5 px-5 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all duration-150 active:scale-98 shadow-clinical"
            >
              <FileEdit className="w-4 h-4" />
              <span>Create New Prescription</span>
            </button>
          </div>
        </div>

      </div>

      {/* Health Insights Interactive Analytics Card (Exact Stitch Screen 3) */}
      <section className="w-full bg-surface-container-lowest rounded-2xl border-2 border-outline-variant/70 shadow-clinical flex flex-col p-6 hover:border-secondary transition-all">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-surface-container text-primary flex items-center justify-center border border-outline-variant shrink-0 shadow-xs">
              <BarChart3 className="w-7 h-7" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h3 className="text-xl font-extrabold text-on-surface font-headline tracking-tight">
                  Health Insights
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-surface-container text-primary border border-primary font-bold">
                  Interactive Analytics
                </span>
              </div>
              <p className="text-xs font-body text-on-surface-variant">
                Patient longitudinal vitals, systolic/diastolic BP envelopes, fluid intake/output metrics, and medication duration analytics.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('health-insights')}
            className="w-full sm:w-auto px-6 py-3 bg-primary hover:bg-primary-container text-on-primary font-mono font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all duration-150 active:scale-98 shrink-0"
          >
            <span>Open Health Insights</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
};

export default PrescriptionHubScreen;
