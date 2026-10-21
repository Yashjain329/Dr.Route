import React, { useState } from 'react';
import { 
  ArrowLeft, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Plus, 
  Trash2, 
  Sparkles, 
  FileText, 
  Activity, 
  Heart, 
  Stethoscope, 
  ShieldAlert, 
  Pill, 
  Utensils, 
  Video, 
  Calendar, 
  Send,
  Layers,
  Thermometer,
  Wind,
  Droplet,
  Search
} from 'lucide-react';
import { ScreenId, Patient, Prescription } from '../types';

interface NewPrescriptionScreenProps {
  onNavigate: (screen: ScreenId) => void;
  selectedPatient: Patient;
  onSelectPatient: (patientId: string) => void;
  onPrescriptionSubmitted: (prescription: Prescription) => void;
}

interface MedicineRow {
  name: string;
  dosage: string;
  frequency: string;
  timing: string;
  duration: string;
  notes: string;
}

export const NewPrescriptionScreen: React.FC<NewPrescriptionScreenProps> = ({
  onNavigate,
  selectedPatient,
  onSelectPatient,
  onPrescriptionSubmitted,
}) => {
  // Collapsible box state (all open by default or toggleable)
  const [openBoxes, setOpenBoxes] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
    8: true,
    9: true,
    10: true,
    11: true,
    12: true,
    13: true,
  });

  const toggleBox = (num: number) => {
    setOpenBoxes(prev => ({ ...prev, [num]: !prev[num] }));
  };

  const expandAll = () => {
    const all: Record<number, boolean> = {};
    for (let i = 1; i <= 13; i++) all[i] = true;
    setOpenBoxes(all);
  };

  const collapseAll = () => {
    const all: Record<number, boolean> = {};
    for (let i = 1; i <= 13; i++) all[i] = false;
    setOpenBoxes(all);
  };

  // Prescription Form State
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([
    'Chest Discomfort',
    'Productive Cough',
    'Dizziness / Vertigo'
  ]);
  const [diagnosis, setDiagnosis] = useState('Stage 2 Essential Hypertension with CAD & Dyslipidemia (I10 / I25.1)');
  const [medicines, setMedicines] = useState<MedicineRow[]>([
    {
      name: 'Tab. Telmisartan 40mg',
      dosage: '1 Tablet (40mg)',
      frequency: '1 - 0 - 0',
      timing: 'Morning after breakfast',
      duration: '30 Days',
      notes: 'Check BP weekly, monitor potassium',
    },
    {
      name: 'Tab. Amlodipine 5mg',
      dosage: '1 Tablet (5mg)',
      frequency: '0 - 0 - 1',
      timing: 'Bedtime',
      duration: '30 Days',
      notes: 'Watch for pedal edema',
    },
    {
      name: 'Tab. Atorvastatin 20mg',
      dosage: '1 Tablet (20mg)',
      frequency: '0 - 0 - 1',
      timing: 'After dinner at night',
      duration: '30 Days',
      notes: 'Lipid lowering profile repeat at 6 weeks',
    },
  ]);

  const [dietPlan, setDietPlan] = useState('DASH Cardioprotective Diet (Low Sodium < 2.4g/day, High Fiber)');
  const [exercisePlan, setExercisePlan] = useState('Supervised 30-min brisk walk daily, 5 days/week on level ground');
  const [followUpDays, setFollowUpDays] = useState('14 Days (05 May 2025)');

  const availableSymptoms = [
    '+ Chest Discomfort',
    '+ High Fever (Chills)',
    '+ Productive Cough',
    '+ Burning Micturition',
    '+ Dizziness / Vertigo',
    '+ Dyspnea on Exertion',
    '+ Headache (Occipital)',
  ];

  const handleToggleSymptom = (sym: string) => {
    const clean = sym.replace('+ ', '');
    if (selectedSymptoms.includes(clean)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== clean));
    } else {
      setSelectedSymptoms([...selectedSymptoms, clean]);
    }
  };

  const handleAddMedicine = () => {
    setMedicines([
      ...medicines,
      {
        name: 'Tab. Pantoprazole 40mg',
        dosage: '1 Tablet (40mg)',
        frequency: '1 - 0 - 0',
        timing: '30 mins before breakfast',
        duration: '14 Days',
        notes: 'Gastric mucosal protection',
      },
    ]);
  };

  const handleRemoveMedicine = (index: number) => {
    setMedicines(medicines.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRx: Prescription = {
      id: `RX-${Date.now().toString().slice(-5)}`,
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      patientUhid: selectedPatient.uhid || selectedPatient.abhaId,
      doctorName: 'Dr. Deshraj Burdak, MD',
      department: 'Cardiology & General Medicine',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      diagnosis,
      vitals: {
        bp: '132/84 mmHg',
        pulse: '76 bpm',
        spo2: '99%',
        temp: '98.4°F',
        respRate: '16 /min',
        weight: '80.5 kg',
      },
      allergies: ['Penicillin G (Severe)', 'Beta-Lactams'],
      medicines: medicines.map((m, idx) => ({
        id: `m-${idx}`,
        name: m.name,
        dosage: m.dosage,
        frequency: m.frequency,
        duration: m.duration,
        timing: m.timing,
      })),
      dietaryAdvice: dietPlan,
      exerciseAdvice: exercisePlan,
      followUpDate: followUpDays,
      status: 'Active',
      isSigned: true,
    };

    onPrescriptionSubmitted(newRx);
    alert('New Prescription Registered! Launching Submit & Open Chart View.');
    onNavigate('submit-open-chart');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in py-2 pb-16">
      
      {/* Top Header & Breadcrumb Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/60 shadow-clinical">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('prescription')}
            className="p-2 rounded-xl text-outline hover:text-on-surface hover:bg-surface-container-low transition-colors"
            title="Back to Prescription Selection"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-secondary uppercase tracking-wider">
                Clinical Workspace
              </span>
            </div>
            <h1 className="text-xl font-extrabold text-primary font-headline">
              New Prescription Protocol Workspace (Structured Modules)
            </h1>
          </div>
        </div>

        {/* Global Expand / Collapse Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={expandAll}
            className="px-3 py-1.5 rounded-lg border border-outline-variant bg-surface-container-low hover:bg-surface-container text-xs font-mono font-semibold text-primary transition-colors"
          >
            Expand All Boxes
          </button>
          <button
            type="button"
            onClick={collapseAll}
            className="px-3 py-1.5 rounded-lg border border-outline-variant bg-surface-container-low hover:bg-surface-container text-xs font-mono font-semibold text-outline hover:text-on-surface transition-colors"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Patient Demographic Banner (Rohit Mehta, PID-2025-88412) */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/70 shadow-clinical p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary-container text-on-primary font-mono font-bold flex items-center justify-center text-xl shadow-xs">
              B+
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-extrabold text-on-surface font-headline tracking-tight">
                  Rohit Mehta
                </h2>
                <span className="bg-primary text-primary-fixed text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase">
                  PID-2025-88412
                </span>
                <span className="bg-surface-container text-outline text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                  OPD Morning Session
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-on-surface-variant pt-1">
                <span>Age/Sex: <strong>34 Yrs / Male</strong></span>
                <span>•</span>
                <span>Status: <strong>Married</strong></span>
                <span>•</span>
                <span>Blood: <strong className="text-error">B+ Positive</strong></span>
                <span>•</span>
                <span>Visit: <strong>21 Apr 2025, 10:15 AM</strong></span>
              </div>
            </div>
          </div>

          <div className="flex md:flex-col items-start md:items-end gap-1 text-xs font-mono">
            <span className="text-on-surface-variant">Attending: <strong>Dr. Ritesh Khandelwal, MD</strong></span>
            <span className="text-outline">Height: 175 cm • Weight: 80.5 kg • BMI: <strong className="text-secondary">26.2 kg/m²</strong></span>
            <span className="text-[10px] text-tertiary font-bold bg-tertiary-fixed/30 px-2 py-0.2 rounded">Verified Identity</span>
          </div>
        </div>
      </div>

      {/* Main 13 Structured Boxes Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* BOX 1: Critical Clinical Alerts & Patient Flags */}
        <div className="bg-surface-container-lowest rounded-2xl border-2 border-error/50 shadow-clinical overflow-hidden">
          <button
            type="button"
            onClick={() => toggleBox(1)}
            className="w-full p-4 bg-error-container/20 flex items-center justify-between text-left border-b border-error/20"
          >
            <div className="flex items-center gap-2.5 text-error font-headline font-bold text-sm">
              <ShieldAlert className="w-5 h-5 flex-shrink-0" />
              <span>Box 1: Critical Clinical Alerts &amp; Patient Flags</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold bg-error text-on-error px-2 py-0.5 rounded-full uppercase">
                High Risk
              </span>
              {openBoxes[1] ? <ChevronUp className="w-4 h-4 text-error" /> : <ChevronDown className="w-4 h-4 text-error" />}
            </div>
          </button>
          
          {openBoxes[1] && (
            <div className="p-4 space-y-2 text-xs font-mono bg-error-container/10">
              <div className="p-3 rounded-xl bg-surface-container-lowest border border-error/30 flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-bold text-error flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    <span>HIGH ALERT: AVOID BETA-LACTAM ANTIBIOTICS</span>
                  </div>
                  <div className="text-[11px] text-on-surface-variant font-sans">
                    Documented severe anaphylactoid hypersensitivity to Penicillin G, Ampicillin &amp; Cephalosporins.
                  </div>
                </div>
                <span className="text-[10px] font-bold text-tertiary bg-tertiary-fixed/40 px-2 py-1 rounded">
                  Validated by Pharmacy Safety Bot • 10:16 AM
                </span>
              </div>
            </div>
          )}
        </div>

        {/* BOX 2: Family Medical History */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical overflow-hidden">
          <button
            type="button"
            onClick={() => toggleBox(2)}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-surface-container-low transition-colors"
          >
            <div className="flex items-center gap-2.5 text-primary font-headline font-bold text-sm">
              <Heart className="w-4 h-4 flex-shrink-0 text-secondary" />
              <span>Box 2: Family Medical History</span>
            </div>
            {openBoxes[2] ? <ChevronUp className="w-4 h-4 text-outline" /> : <ChevronDown className="w-4 h-4 text-outline" />}
          </button>
          {openBoxes[2] && (
            <div className="p-4 pt-0 border-t border-outline-variant/40 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/40">
                <span className="text-outline font-bold">Father:</span>
                <div className="font-bold text-on-surface mt-1">Essential HTN &amp; CAD (Post-CABG 2018)</div>
              </div>
              <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/40">
                <span className="text-outline font-bold">Mother:</span>
                <div className="font-bold text-on-surface mt-1">Type-2 Diabetes Mellitus (On Oral Hypoglycemics)</div>
              </div>
              <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/40">
                <span className="text-outline font-bold">Siblings:</span>
                <div className="font-bold text-on-surface mt-1">No premature cardiovascular diseases reported</div>
              </div>
            </div>
          )}
        </div>

        {/* BOX 3: Social & Habitual History */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical overflow-hidden">
          <button
            type="button"
            onClick={() => toggleBox(3)}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-surface-container-low transition-colors"
          >
            <div className="flex items-center gap-2.5 text-primary font-headline font-bold text-sm">
              <Activity className="w-4 h-4 flex-shrink-0 text-primary" />
              <span>Box 3: Social &amp; Habitual History</span>
            </div>
            {openBoxes[3] ? <ChevronUp className="w-4 h-4 text-outline" /> : <ChevronDown className="w-4 h-4 text-outline" />}
          </button>
          {openBoxes[3] && (
            <div className="p-4 pt-0 border-t border-outline-variant/40 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/40">
                <span className="text-outline font-bold">Tobacco / Smoking:</span>
                <div className="font-bold text-on-surface mt-1">Non-smoker (Occasional secondhand exposure)</div>
              </div>
              <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/40">
                <span className="text-outline font-bold">Alcohol Intake:</span>
                <div className="font-bold text-on-surface mt-1">Social drinker (1-2 drinks/month)</div>
              </div>
              <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/40">
                <span className="text-outline font-bold">Physical Activity:</span>
                <div className="font-bold text-error mt-1">Sedentary (Desk job 9-10 hrs daily)</div>
              </div>
            </div>
          )}
        </div>

        {/* BOX 4: General Physical Examination (Systemic Signs) */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical overflow-hidden">
          <button
            type="button"
            onClick={() => toggleBox(4)}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-surface-container-low transition-colors"
          >
            <div className="flex items-center gap-2.5 text-primary font-headline font-bold text-sm">
              <Stethoscope className="w-4 h-4 flex-shrink-0 text-secondary" />
              <span>Box 4: General Physical Examination (Systemic Signs)</span>
            </div>
            {openBoxes[4] ? <ChevronUp className="w-4 h-4 text-outline" /> : <ChevronDown className="w-4 h-4 text-outline" />}
          </button>
          {openBoxes[4] && (
            <div className="p-4 pt-0 border-t border-outline-variant/40 flex flex-wrap gap-2 text-xs font-mono">
              {[
                { label: 'Pallor', val: 'Absent (No clinical anemia)', ok: true },
                { label: 'Icterus', val: 'Absent (Sclera normal)', ok: true },
                { label: 'Cyanosis', val: 'Absent', ok: true },
                { label: 'Clubbing', val: 'Absent', ok: true },
                { label: 'Lymphadenopathy', val: 'No cervical or axillary enlargement', ok: true },
                { label: 'Pedal Edema', val: 'Mild bilateral pitting (+1)', ok: false },
              ].map((s, idx) => (
                <div key={idx} className={`p-2.5 rounded-xl border flex items-center gap-2 ${
                  s.ok ? 'bg-surface-container-low border-outline-variant/40' : 'bg-secondary-container/40 border-secondary'
                }`}>
                  <span className="font-bold text-on-surface">{s.label}:</span>
                  <span className={s.ok ? 'text-on-surface-variant' : 'text-secondary font-bold'}>{s.val}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* BOX 5: Clinical Vitals Strip (Real-time telemetry) */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical overflow-hidden">
          <button
            type="button"
            onClick={() => toggleBox(5)}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-surface-container-low transition-colors"
          >
            <div className="flex items-center gap-2.5 text-primary font-headline font-bold text-sm">
              <Activity className="w-4 h-4 flex-shrink-0 text-error" />
              <span>Box 5: Clinical Vitals Strip (Real-time telemetry)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold bg-secondary text-on-secondary px-2 py-0.5 rounded">
                Live Telemetry
              </span>
              {openBoxes[5] ? <ChevronUp className="w-4 h-4 text-outline" /> : <ChevronDown className="w-4 h-4 text-outline" />}
            </div>
          </button>
          {openBoxes[5] && (
            <div className="p-4 pt-0 border-t border-outline-variant/40 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-xs font-mono text-center">
              <div className="p-3 rounded-xl bg-surface-container-low border border-primary/20">
                <div className="text-[10px] text-outline uppercase">BP (Today)</div>
                <div className="text-base font-bold text-primary mt-1">132/84</div>
                <div className="text-[9px] text-secondary">Controlled</div>
              </div>
              <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/40">
                <div className="text-[10px] text-outline uppercase">Pulse / HR</div>
                <div className="text-base font-bold text-on-surface mt-1">76 bpm</div>
                <div className="text-[9px] text-outline">Normal Sinus</div>
              </div>
              <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/40">
                <div className="text-[10px] text-outline uppercase">SpO2</div>
                <div className="text-base font-bold text-on-surface mt-1">99%</div>
                <div className="text-[9px] text-outline">Room Air</div>
              </div>
              <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/40">
                <div className="text-[10px] text-outline uppercase">Resp Rate</div>
                <div className="text-base font-bold text-on-surface mt-1">16 /min</div>
                <div className="text-[9px] text-outline">Regular</div>
              </div>
              <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/40">
                <div className="text-[10px] text-outline uppercase">Temp</div>
                <div className="text-base font-bold text-on-surface mt-1">98.4°F</div>
                <div className="text-[9px] text-outline">Afebrile</div>
              </div>
              <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/40">
                <div className="text-[10px] text-outline uppercase">RBS</div>
                <div className="text-base font-bold text-on-surface mt-1">118 mg/dL</div>
                <div className="text-[9px] text-secondary">Euglycemic</div>
              </div>
            </div>
          )}
        </div>

        {/* BOX 6: Chief Presenting Complaints */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical overflow-hidden">
          <button
            type="button"
            onClick={() => toggleBox(6)}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-surface-container-low transition-colors"
          >
            <div className="flex items-center gap-2.5 text-primary font-headline font-bold text-sm">
              <FileText className="w-4 h-4 flex-shrink-0 text-primary" />
              <span>Box 6: Chief Presenting Complaints</span>
            </div>
            {openBoxes[6] ? <ChevronUp className="w-4 h-4 text-outline" /> : <ChevronDown className="w-4 h-4 text-outline" />}
          </button>
          {openBoxes[6] && (
            <div className="p-4 pt-0 border-t border-outline-variant/40 space-y-3">
              <div className="flex flex-wrap gap-2">
                {availableSymptoms.map((sym, idx) => {
                  const clean = sym.replace('+ ', '');
                  const isSelected = selectedSymptoms.includes(clean);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleToggleSymptom(sym)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                        isSelected
                          ? 'bg-primary-container text-on-primary shadow-xs'
                          : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                      }`}
                    >
                      {isSelected ? `✓ ${clean}` : sym}
                    </button>
                  );
                })}
              </div>
              <textarea
                rows={2}
                placeholder="Detailed clinical notes on symptom onset, duration, triggers..."
                defaultValue="Patient presents with intermittent exertional tightness in chest since 5 days, aggravated after heavy meals. Dry morning cough with occasional white phlegm."
                className="w-full p-3 rounded-xl border border-outline-variant bg-surface-container-low text-xs font-body text-on-surface focus:outline-none focus:border-primary"
              />
            </div>
          )}
        </div>

        {/* BOX 7: Laboratory Investigation Requisitions */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical overflow-hidden">
          <button
            type="button"
            onClick={() => toggleBox(7)}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-surface-container-low transition-colors"
          >
            <div className="flex items-center gap-2.5 text-primary font-headline font-bold text-sm">
              <Droplet className="w-4 h-4 flex-shrink-0 text-secondary" />
              <span>Box 7: Laboratory Investigation Requisitions</span>
            </div>
            {openBoxes[7] ? <ChevronUp className="w-4 h-4 text-outline" /> : <ChevronDown className="w-4 h-4 text-outline" />}
          </button>
          {openBoxes[7] && (
            <div className="p-4 pt-0 border-t border-outline-variant/40 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
              {['Complete Blood Count (CBC)', 'Lipid Profile Fasting', 'HbA1c & Fasting Glucose', 'Liver Function Test (LFT)', 'Serum Creatinine & Electrolytes', 'Urine Routine & Microalbumin', 'Thyroid Stimulating Hormone (TSH)', 'Serum Uric Acid'].map((lab, idx) => (
                <label key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-low border border-outline-variant/40 cursor-pointer hover:bg-surface-container">
                  <input type="checkbox" defaultChecked={idx < 4} className="rounded text-primary focus:ring-primary" />
                  <span className="truncate">{lab}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* BOX 8: Radiology & Imaging Orders */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical overflow-hidden">
          <button
            type="button"
            onClick={() => toggleBox(8)}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-surface-container-low transition-colors"
          >
            <div className="flex items-center gap-2.5 text-primary font-headline font-bold text-sm">
              <Layers className="w-4 h-4 flex-shrink-0 text-primary" />
              <span>Box 8: Radiology &amp; Imaging Orders</span>
            </div>
            {openBoxes[8] ? <ChevronUp className="w-4 h-4 text-outline" /> : <ChevronDown className="w-4 h-4 text-outline" />}
          </button>
          {openBoxes[8] && (
            <div className="p-4 pt-0 border-t border-outline-variant/40 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
              {['ECG 12-Lead Rest', 'Chest X-Ray (PA View)', '2D Transthoracic Echo', 'Treadmill Stress Test (TMT)', 'Ultrasound Whole Abdomen', 'Carotid Doppler'].map((rad, idx) => (
                <label key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-low border border-outline-variant/40 cursor-pointer hover:bg-surface-container">
                  <input type="checkbox" defaultChecked={idx < 3} className="rounded text-primary focus:ring-primary" />
                  <span className="truncate">{rad}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* BOX 9: Final Diagnosis / Clinical Diagnosis */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical overflow-hidden">
          <button
            type="button"
            onClick={() => toggleBox(9)}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-surface-container-low transition-colors"
          >
            <div className="flex items-center gap-2.5 text-primary font-headline font-bold text-sm">
              <Stethoscope className="w-4 h-4 flex-shrink-0 text-primary" />
              <span>Box 9: Final Diagnosis / Clinical Diagnosis</span>
            </div>
            {openBoxes[9] ? <ChevronUp className="w-4 h-4 text-outline" /> : <ChevronDown className="w-4 h-4 text-outline" />}
          </button>
          {openBoxes[9] && (
            <div className="p-4 pt-0 border-t border-outline-variant/40 space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  className="flex-1 p-2.5 rounded-xl border border-outline-variant bg-surface-container-low text-xs font-mono font-bold text-primary focus:outline-none focus:border-primary"
                />
                <button
                  type="button"
                  className="px-4 py-2 rounded-xl bg-surface-container font-mono text-xs font-bold text-primary hover:bg-surface-container-high"
                >
                  ICD-10 Search
                </button>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-mono text-outline">
                <span>ICD-10 Matches:</span>
                <span className="bg-surface-container-low px-2 py-0.5 rounded border border-outline-variant">I10 (Essential HTN)</span>
                <span className="bg-surface-container-low px-2 py-0.5 rounded border border-outline-variant">I25.1 (Atherosclerotic Heart Disease)</span>
                <span className="bg-surface-container-low px-2 py-0.5 rounded border border-outline-variant">E78.5 (Dyslipidemia)</span>
              </div>
            </div>
          )}
        </div>

        {/* BOX 10: Digital Prescription & Pharmacotherapy Plan */}
        <div className="bg-surface-container-lowest rounded-2xl border-2 border-primary/50 shadow-clinical overflow-hidden">
          <button
            type="button"
            onClick={() => toggleBox(10)}
            className="w-full p-4 bg-primary/5 flex items-center justify-between text-left border-b border-primary/20"
          >
            <div className="flex items-center gap-2.5 text-primary font-headline font-bold text-sm">
              <Pill className="w-5 h-5 flex-shrink-0" />
              <span>Box 10: Digital Prescription &amp; Pharmacotherapy Plan</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); handleAddMedicine(); }}
                className="px-3 py-1 rounded-lg bg-primary text-on-primary text-xs font-mono font-bold hover:bg-primary-container"
              >
                + Add Medication
              </button>
              {openBoxes[10] ? <ChevronUp className="w-4 h-4 text-primary" /> : <ChevronDown className="w-4 h-4 text-primary" />}
            </div>
          </button>
          {openBoxes[10] && (
            <div className="p-4 space-y-3">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-outline-variant/60 text-outline uppercase text-[10px]">
                      <th className="py-2 px-2">Drug Name &amp; Strength</th>
                      <th className="py-2 px-2">Frequency</th>
                      <th className="py-2 px-2">Timing</th>
                      <th className="py-2 px-2">Duration</th>
                      <th className="py-2 px-2 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/30">
                    {medicines.map((med, idx) => (
                      <tr key={idx} className="hover:bg-surface-container-low/40">
                        <td className="py-2.5 px-2 font-bold text-primary">{med.name}</td>
                        <td className="py-2.5 px-2"><span className="bg-surface-container px-2 py-0.5 rounded font-bold">{med.frequency}</span></td>
                        <td className="py-2.5 px-2 text-on-surface-variant">{med.timing}</td>
                        <td className="py-2.5 px-2 font-bold">{med.duration}</td>
                        <td className="py-2.5 px-2 text-right">
                          <button
                            type="button"
                            onClick={() => handleRemoveMedicine(idx)}
                            className="p-1 rounded text-outline hover:text-error transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* BOX 11: Clinical Diet Protocol Selection (Diet Chart) */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical overflow-hidden">
          <button
            type="button"
            onClick={() => toggleBox(11)}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-surface-container-low transition-colors"
          >
            <div className="flex items-center gap-2.5 text-primary font-headline font-bold text-sm">
              <Utensils className="w-4 h-4 flex-shrink-0 text-secondary" />
              <span>Box 11: Clinical Diet Protocol Selection (Diet Chart)</span>
            </div>
            {openBoxes[11] ? <ChevronUp className="w-4 h-4 text-outline" /> : <ChevronDown className="w-4 h-4 text-outline" />}
          </button>
          {openBoxes[11] && (
            <div className="p-4 pt-0 border-t border-outline-variant/40 space-y-2">
              <input
                type="text"
                value={dietPlan}
                onChange={(e) => setDietPlan(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-outline-variant bg-surface-container-low text-xs font-mono text-on-surface focus:outline-none"
              />
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                {['DASH Diet', 'Low Sodium (<2g)', 'Diabetic High Fiber', 'Renal Low Potassium', 'Weight Loss (1600 kcal)'].map((d, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setDietPlan(d)}
                    className="px-2.5 py-1 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high"
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* BOX 12: Exercise & Physical Activity Selection */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical overflow-hidden">
          <button
            type="button"
            onClick={() => toggleBox(12)}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-surface-container-low transition-colors"
          >
            <div className="flex items-center gap-2.5 text-primary font-headline font-bold text-sm">
              <Activity className="w-4 h-4 flex-shrink-0 text-primary" />
              <span>Box 12: Exercise &amp; Physical Activity Selection</span>
            </div>
            {openBoxes[12] ? <ChevronUp className="w-4 h-4 text-outline" /> : <ChevronDown className="w-4 h-4 text-outline" />}
          </button>
          {openBoxes[12] && (
            <div className="p-4 pt-0 border-t border-outline-variant/40 space-y-2">
              <input
                type="text"
                value={exercisePlan}
                onChange={(e) => setExercisePlan(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-outline-variant bg-surface-container-low text-xs font-mono text-on-surface focus:outline-none"
              />
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                {['Brisk Walking 30 mins', 'Light Aerobics', 'Breathing Pranayama', 'Cardiac Rehab Phase-2'].map((ex, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setExercisePlan(ex)}
                    className="px-2.5 py-1 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* BOX 13: Follow-Up & Emergency Escalation Protocol */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical overflow-hidden">
          <button
            type="button"
            onClick={() => toggleBox(13)}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-surface-container-low transition-colors"
          >
            <div className="flex items-center gap-2.5 text-primary font-headline font-bold text-sm">
              <Calendar className="w-4 h-4 flex-shrink-0 text-secondary" />
              <span>Box 13: Follow-Up &amp; Emergency Escalation Protocol</span>
            </div>
            {openBoxes[13] ? <ChevronUp className="w-4 h-4 text-outline" /> : <ChevronDown className="w-4 h-4 text-outline" />}
          </button>
          {openBoxes[13] && (
            <div className="p-4 pt-0 border-t border-outline-variant/40 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
              <div className="space-y-1">
                <span className="text-outline font-bold">Follow-Up Schedule:</span>
                <input
                  type="text"
                  value={followUpDays}
                  onChange={(e) => setFollowUpDays(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-outline-variant bg-surface-container-low font-bold text-primary focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <span className="text-error font-bold">SOS Red Flag Warnings:</span>
                <div className="p-2.5 rounded-xl bg-error-container/30 border border-error/30 text-on-surface font-sans text-[11px]">
                  Seek emergency ER care immediately if sudden chest pain, syncope, breathlessness at rest, or vision disturbance occurs.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Master Submit Action Bar */}
        <div className="sticky bottom-4 z-20 bg-surface-container-lowest p-4 rounded-2xl border-2 border-primary shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs font-mono">
            <span className="font-bold text-primary">All 13 Clinical Modules Completed</span>
            <div className="text-outline text-[11px]">Ready for digital sign-off and EMR chart synthesis</div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('prescription')}
              className="px-4 py-2.5 rounded-xl border border-outline-variant text-outline hover:text-on-surface font-mono text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-mono text-xs font-bold shadow-clinical transition-all active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>Submit Prescription &amp; Open Master Chart</span>
            </button>
          </div>
        </div>

      </form>

    </div>
  );
};

export default NewPrescriptionScreen;
