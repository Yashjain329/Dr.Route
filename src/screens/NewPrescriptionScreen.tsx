import React, { useState } from 'react';
import { 
  PlusCircle, 
  Trash2, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  Activity, 
  Pill, 
  Heart, 
  Clock, 
  Sparkles, 
  ArrowRight,
  Info
} from 'lucide-react';
import { ScreenId, Patient, Medication, Prescription } from '../types';
import { mockDoctor, mockPatients } from '../data/mockData';

interface NewPrescriptionScreenProps {
  onNavigate: (screen: ScreenId) => void;
  selectedPatient: Patient;
  onSelectPatient: (patientId: string) => void;
  onPrescriptionSubmitted?: (newRx: Prescription) => void;
}

export const NewPrescriptionScreen: React.FC<NewPrescriptionScreenProps> = ({
  onNavigate,
  selectedPatient,
  onSelectPatient,
  onPrescriptionSubmitted
}) => {
  const [primaryDiagnosis, setPrimaryDiagnosis] = useState("Essential (Primary) Hypertension with Early Cardiomegaly");
  const [icd10Code, setIcd10Code] = useState("I10.9");
  const [secondaryDiagnosis, setSecondaryDiagnosis] = useState("Type 2 Diabetes Mellitus without complications (E11.9)");
  
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: "MED-101",
      name: "Telmisartan (Telma 40)",
      genericName: "Telmisartan 40 mg",
      dosage: "40 mg",
      frequency: "1-0-0",
      timing: "Morning after breakfast",
      duration: "90 Days",
      route: "Oral",
      instructions: "Take consistently at the same time each morning. Monitor standing BP.",
      refillsAllowed: 2
    },
    {
      id: "MED-102",
      name: "Metformin ER (Glycomet SR 500)",
      genericName: "Metformin Hydrochloride Extended-Release 500 mg",
      dosage: "500 mg",
      frequency: "1-0-1",
      timing: "With principal meals (Lunch & Dinner)",
      duration: "90 Days",
      route: "Oral",
      instructions: "Swallow whole, do not crush or chew. Take with meals.",
      refillsAllowed: 2
    }
  ]);

  const [newDrugName, setNewDrugName] = useState("");
  const [newDosage, setNewDosage] = useState("10 mg");
  const [newFrequency, setNewFrequency] = useState("0-0-1");
  const [newTiming, setNewTiming] = useState("At bedtime");
  const [newDuration, setNewDuration] = useState("90 Days");
  const [newRoute, setNewRoute] = useState("Oral");
  const [newInstructions, setNewInstructions] = useState("Take after food with water.");
  
  const [notes, setNotes] = useState("Patient shows favorable BP control response. Salt restricted to <5g/day. Continue moderate exercise.");
  const [selectedAdvice, setSelectedAdvice] = useState<string[]>([
    "Strict DASH diet adherence (low sodium <5g/day)",
    "Daily 40-minute brisk walk before breakfast",
    "Log blood pressure twice weekly via PulseBand v2"
  ]);

  const [allergyAlert, setAllergyAlert] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Common diagnosis chips
  const diagnosisSuggestions = [
    { name: "Essential Hypertension", code: "I10.9" },
    { name: "Type 2 Diabetes Mellitus", code: "E11.9" },
    { name: "Moderate Bronchial Asthma", code: "J45.41" },
    { name: "Coronary Artery Disease (CAD)", code: "I25.10" },
    { name: "Dengue Fever with Thrombocytopenia", code: "A90" },
    { name: "Dyslipidemia", code: "E78.5" }
  ];

  const handleAddMedication = () => {
    if (!newDrugName.trim()) return;

    // Check allergy safety
    if (selectedPatient.allergies.some(a => a.toLowerCase().includes('penicillin')) && 
        (newDrugName.toLowerCase().includes('amoxicillin') || newDrugName.toLowerCase().includes('augmentin') || newDrugName.toLowerCase().includes('penicillin'))) {
      setAllergyAlert(`CRITICAL ALLERGY ALERT: Patient ${selectedPatient.name} has a documented Penicillin allergy! Prescribing ${newDrugName} may trigger anaphylaxis.`);
      return;
    }

    setAllergyAlert(null);

    const newMed: Medication = {
      id: `MED-${Date.now()}`,
      name: newDrugName,
      genericName: newDrugName,
      dosage: newDosage,
      frequency: newFrequency,
      timing: newTiming,
      duration: newDuration,
      route: newRoute,
      instructions: newInstructions,
      refillsAllowed: 1
    };

    setMedications([...medications, newMed]);
    setNewDrugName("");
  };

  const handleRemoveMedication = (id: string) => {
    setMedications(medications.filter(m => m.id !== id));
  };

  const toggleAdvice = (adv: string) => {
    if (selectedAdvice.includes(adv)) {
      setSelectedAdvice(selectedAdvice.filter(a => a !== adv));
    } else {
      setSelectedAdvice([...selectedAdvice, adv]);
    }
  };

  // Primary Action: Submit & Open Chart (takes user straight to Screen 4)
  const handleSubmitAndOpenChart = () => {
    setIsSubmitting(true);

    const generatedRx: Prescription = {
      id: `RX-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      abhaId: selectedPatient.abhaId,
      age: selectedPatient.age,
      gender: selectedPatient.gender,
      doctorName: mockDoctor.name,
      doctorId: mockDoctor.regNumber,
      date: "21 Oct 2026",
      primaryDiagnosis,
      icd10Code,
      secondaryDiagnosis,
      medications,
      notes,
      lifestyleAdvice: selectedAdvice,
      status: "Active",
      interactionRisk: "None",
      adherenceRate: 95,
      digitalSignatureHash: `0x${Array.from({length: 32}, () => Math.floor(Math.random()*16).toString(16)).join('').toUpperCase()}`
    };

    setTimeout(() => {
      setIsSubmitting(false);
      if (onPrescriptionSubmitted) {
        onPrescriptionSubmitted(generatedRx);
      }
      onNavigate('submit-open-chart');
    }, 700);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-md">6th</span>
            <span className="text-xs font-bold text-secondary uppercase tracking-wider">
              Inside New Prescription • e-Rx Authoring Suite
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 font-display mt-1">
            Author New e-Prescription
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time allergy checking, ICD-10 codification & 1-click transition to Clinical Chart
          </p>
        </div>

        <button
          onClick={handleSubmitAndOpenChart}
          disabled={isSubmitting || medications.length === 0}
          className="bg-secondary hover:bg-secondary-light active:scale-95 text-white text-sm font-bold px-5 py-3 rounded-2xl shadow-md hover:shadow-lg flex items-center gap-2 transition-all disabled:opacity-50"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Cryptographically Signing...</span>
            </div>
          ) : (
            <>
              <Activity className="w-4 h-4" />
              <span>Submit & Open Chart (4th)</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      {/* Patient Selector & Critical Allergy Strip */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center font-bold text-xs">
              {selectedPatient.bloodGroup}
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Prescribing For:</span>
              <div className="flex items-center gap-2">
                <select
                  value={selectedPatient.id}
                  onChange={(e) => onSelectPatient(e.target.value)}
                  className="text-base font-bold text-slate-900 bg-transparent border-b border-dashed border-slate-300 focus:outline-none cursor-pointer"
                >
                  {mockPatients.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.gender}, {p.age}y)
                    </option>
                  ))}
                </select>
                <span className="text-xs text-slate-500 font-mono">ABHA: {selectedPatient.abhaId}</span>
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-600">
            Vitals: <strong className="text-slate-800">{selectedPatient.currentVitals.bloodPressure} mmHg</strong> • 
            HR: <strong className="text-slate-800">{selectedPatient.currentVitals.heartRate} bpm</strong> • 
            SpO2: <strong className="text-secondary-teal">{selectedPatient.currentVitals.spo2}%</strong>
          </div>
        </div>

        {/* Allergy Alert Banner */}
        <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs">
            <AlertTriangle className="w-4 h-4 text-emergency flex-shrink-0" />
            <span className="font-bold text-rose-900">Documented Allergies:</span>
            <div className="flex flex-wrap gap-1">
              {selectedPatient.allergies.map((allergy, idx) => (
                <span key={idx} className="bg-white text-emergency text-[11px] font-bold px-2 py-0.5 rounded border border-rose-200">
                  ⚠️ {allergy}
                </span>
              ))}
            </div>
          </div>
          <span className="text-[10px] text-rose-600 font-semibold hidden sm:inline">
            Automatic collision check active
          </span>
        </div>

        {allergyAlert && (
          <div className="p-3 rounded-2xl bg-emergency text-white text-xs font-bold flex items-center gap-2 animate-pulse">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <span>{allergyAlert}</span>
          </div>
        )}
      </div>

      {/* Clinical Diagnosis with ICD-10 Suggestion Chips */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
          <Heart className="w-4 h-4 text-secondary" />
          <span>Clinical Diagnosis & ICD-10 Codification</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Primary Diagnosis
            </label>
            <input
              type="text"
              value={primaryDiagnosis}
              onChange={(e) => setPrimaryDiagnosis(e.target.value)}
              className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-secondary focus:bg-white text-slate-800 font-medium"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              ICD-10 Code
            </label>
            <input
              type="text"
              value={icd10Code}
              onChange={(e) => setIcd10Code(e.target.value)}
              className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-secondary focus:bg-white text-slate-800 font-mono font-bold"
            />
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
            Quick ICD-10 Presets:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {diagnosisSuggestions.map((d, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setPrimaryDiagnosis(d.name);
                  setIcd10Code(d.code);
                }}
                className="text-[11px] font-semibold bg-slate-100 hover:bg-teal-50 hover:text-secondary-teal text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 transition-colors"
              >
                {d.name} <span className="font-mono text-[10px] text-slate-400">({d.code})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Medication Formulary Adder */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
          <Pill className="w-4 h-4 text-secondary" />
          <span>Prescribed Medications ({medications.length})</span>
        </h3>

        {/* Current Meds List */}
        <div className="space-y-3">
          {medications.map((med) => (
            <div key={med.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-bold text-slate-900">{med.name}</span>
                  <span className="text-xs font-bold text-secondary-teal bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                    {med.dosage}
                  </span>
                  <span className="text-xs font-semibold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {med.frequency} • {med.timing}
                  </span>
                </div>
                <div className="text-xs text-slate-500">
                  Duration: <strong className="text-slate-700">{med.duration}</strong> • Route: {med.route} • Instructions: {med.instructions}
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleRemoveMedication(med.id)}
                className="p-2 text-slate-400 hover:text-emergency hover:bg-rose-50 rounded-xl transition-colors self-end sm:self-center"
                title="Remove Medication"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Add Drug Sub-form */}
        <div className="p-4 rounded-2xl bg-teal-50/40 border border-teal-200/60 space-y-3">
          <span className="text-xs font-bold text-secondary-teal uppercase tracking-wider block">
            + Add Molecule to Regimen
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Drug Name / Brand</label>
              <input
                type="text"
                placeholder="e.g. Atorvastatin (Atorva)"
                value={newDrugName}
                onChange={(e) => setNewDrugName(e.target.value)}
                className="w-full p-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-secondary"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Dosage</label>
              <input
                type="text"
                placeholder="e.g. 10 mg"
                value={newDosage}
                onChange={(e) => setNewDosage(e.target.value)}
                className="w-full p-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-secondary"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Frequency</label>
              <select
                value={newFrequency}
                onChange={(e) => setNewFrequency(e.target.value)}
                className="w-full p-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-secondary"
              >
                <option value="1-0-0">1-0-0 (Morning only)</option>
                <option value="1-0-1">1-0-1 (Morning & Night)</option>
                <option value="0-0-1">0-0-1 (Bedtime)</option>
                <option value="1-1-1">1-1-1 (Thrice daily)</option>
                <option value="SOS">SOS (As needed)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Timing</label>
              <select
                value={newTiming}
                onChange={(e) => setNewTiming(e.target.value)}
                className="w-full p-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-secondary"
              >
                <option value="After Meals">After Meals</option>
                <option value="Before Breakfast">Before Breakfast</option>
                <option value="With Meals">With Meals</option>
                <option value="At bedtime">At Bedtime</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Duration</label>
              <select
                value={newDuration}
                onChange={(e) => setNewDuration(e.target.value)}
                className="w-full p-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-secondary"
              >
                <option value="15 Days">15 Days</option>
                <option value="30 Days">30 Days</option>
                <option value="60 Days">60 Days</option>
                <option value="90 Days">90 Days</option>
                <option value="180 Days">180 Days (Long-term)</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                type="button"
                onClick={handleAddMedication}
                className="w-full bg-primary hover:bg-primary-light text-white text-xs font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add Medication</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dietary & Lifestyle Prescriptions */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-secondary" />
          <span>Lifestyle & Dietary Protocol</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {[
            "Strict DASH diet adherence (low sodium <5g/day)",
            "Daily 40-minute brisk walk before breakfast",
            "Log blood pressure twice weekly via PulseBand v2",
            "Avoid grapefruit juice with statin medication",
            "Adequate hydration (2.5 - 3.0 Litres/day)",
            "Limit screen time 1 hour before sleep for circadian BP dip"
          ].map((adv, idx) => {
            const isChecked = selectedAdvice.includes(adv);

            return (
              <label 
                key={idx}
                className={`p-3 rounded-2xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                  isChecked ? 'bg-teal-50/70 border-secondary/50 text-slate-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleAdvice(adv)}
                  className="rounded text-secondary focus:ring-secondary"
                />
                <span className="text-xs">{adv}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Clinical Notes & Big Submit Action */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          Doctor Clinical Observations & Audit Notes
        </label>
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-secondary focus:bg-white text-slate-800 font-medium"
        />

        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-100">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Digital Signature will be attached: {mockDoctor.name} ({mockDoctor.regNumber})</span>
          </div>

          <button
            type="button"
            onClick={handleSubmitAndOpenChart}
            disabled={isSubmitting || medications.length === 0}
            className="bg-secondary hover:bg-secondary-light active:scale-95 text-white text-sm font-bold px-6 py-3 rounded-2xl shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Signing and Dispatching...</span>
            ) : (
              <>
                <Activity className="w-4 h-4" />
                <span>Submit & Open Chart (4th)</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>

    </div>
  );
};

export default NewPrescriptionScreen;
