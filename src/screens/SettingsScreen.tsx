import React, { useState } from 'react';
import { 
  User, 
  GraduationCap, 
  Settings, 
  Sliders, 
  KeyRound, 
  ShieldCheck, 
  FileCheck, 
  Bell, 
  Printer, 
  Globe, 
  Lock, 
  CheckCircle2, 
  Smartphone,
  Save,
  RotateCcw
} from 'lucide-react';
import { ScreenId } from '../types';

interface SettingsScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  onNavigate,
}) => {
  // Settings State
  const [autoSign, setAutoSign] = useState(true);
  const [audioChime, setAudioChime] = useState(true);
  const [rapidIcd, setRapidIcd] = useState(true);
  const [allergyModal, setAllergyModal] = useState(true);
  const [printFormat, setPrintFormat] = useState<'A4' | 'Thermal' | 'FHIR'>('A4');
  const [dispenseDays, setDispenseDays] = useState('7 Days');
  const [stationPin, setStationPin] = useState('4821');
  const [sessionTimeout, setSessionTimeout] = useState('30 Minutes');
  const [language, setLanguage] = useState<'English' | 'Hindi'>('English');

  const handleSave = () => {
    alert('Physician Practice Preferences & Security Settings Saved Successfully.');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in py-2 pb-16">
      
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/60 shadow-clinical">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold bg-primary text-primary-fixed px-2 py-0.5 rounded">
              12th Screen
            </span>
            <span className="text-xs font-mono font-bold text-secondary uppercase tracking-wider">
              Practice Configuration
            </span>
          </div>
          <h1 className="text-xl font-extrabold text-primary font-headline">
            Doctor Profile Settings &amp; Practice Preferences
          </h1>
          <p className="text-xs font-body text-on-surface-variant">
            Simplified, doctor-friendly configuration for clinical workflows, digital signatures, and station security
          </p>
        </div>

        <button 
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-mono font-bold hover:bg-primary-container transition-colors shadow-xs active:scale-95"
        >
          <Save className="w-4 h-4" />
          <span>Save Preferences</span>
        </button>
      </div>

      {/* 3 Linked Profile Tabs Strip (Exact Stitch Linked Tabs) */}
      <div className="flex items-center gap-2 border-b border-outline-variant/60 pb-1 text-xs font-mono font-bold">
        <button
          onClick={() => onNavigate('personal-profile')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
        >
          <User className="w-4 h-4" />
          <span>10th - Personal Information</span>
        </button>
        <button
          onClick={() => onNavigate('qualifications')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
        >
          <GraduationCap className="w-4 h-4" />
          <span>11th - Qualification &amp; Experience</span>
        </button>
        <button
          onClick={() => onNavigate('settings')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary shadow-xs"
        >
          <Settings className="w-4 h-4" />
          <span>12th - Doctor Settings</span>
        </button>
      </div>

      {/* SECTION 1: Consultation & OPD Preferences */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical p-6 space-y-5">
        <div className="border-b border-outline-variant/40 pb-3 flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-primary font-headline flex items-center gap-2">
              <Sliders className="w-5 h-5 text-primary" />
              <span>Consultation &amp; OPD Preferences</span>
            </h3>
            <p className="text-xs font-body text-on-surface-variant">
              Streamline your day-to-day clinic flow and prescription actions
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-secondary">Doctor Friendly</span>
        </div>

        <div className="space-y-4">
          
          {/* Toggle 1: Prescription Auto-Signature */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low/60 border border-outline-variant/60">
            <div className="space-y-0.5 max-w-xl">
              <div className="font-bold text-sm text-on-surface flex items-center gap-2 font-headline">
                <span>Prescription Auto-Signature</span>
                <span className="bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-mono font-bold px-2 py-0.2 rounded">
                  Verified
                </span>
              </div>
              <p className="text-xs text-on-surface-variant font-body">
                Automatically append digital signature and medical council seal to outgoing approved prescriptions.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={autoSign} 
                onChange={(e) => setAutoSign(e.target.checked)} 
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-outline-variant/60 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          {/* Toggle 2: OPD Chime */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low/60 border border-outline-variant/60">
            <div className="space-y-0.5 max-w-xl">
              <div className="font-bold text-sm text-on-surface font-headline">
                OPD Consultation Queue Audio Chime
              </div>
              <p className="text-xs text-on-surface-variant font-body">
                Play soft chime in Chamber 402 whenever the next waiting patient token is queued or triage priority arrives.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={audioChime} 
                onChange={(e) => setAudioChime(e.target.checked)} 
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-outline-variant/60 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
            </label>
          </div>

          {/* Toggle 3: Rapid ICD-10 Search */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low/60 border border-outline-variant/60">
            <div className="space-y-0.5 max-w-xl">
              <div className="font-bold text-sm text-on-surface font-headline">
                Rapid ICD-10 Search &amp; EMR Auto-complete
              </div>
              <p className="text-xs text-on-surface-variant font-body">
                Display intelligent ICD-10 disease suggestions and Indian formulary codes while typing in provisional diagnosis.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={rapidIcd} 
                onChange={(e) => setRapidIcd(e.target.checked)} 
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-outline-variant/60 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          {/* Toggle 4: High-Risk Allergy Warning Modal */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low/60 border border-outline-variant/60">
            <div className="space-y-0.5 max-w-xl">
              <div className="font-bold text-sm text-error font-headline flex items-center gap-1.5">
                <span>High-Risk Allergy Warning Modal</span>
              </div>
              <p className="text-xs text-on-surface-variant font-body">
                Mandate explicit double physician sign-off if prescribing Beta-Lactams, NSAIDs, or Sulfa to flagged patients.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={allergyModal} 
                onChange={(e) => setAllergyModal(e.target.checked)} 
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-outline-variant/60 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-error"></div>
            </label>
          </div>

          {/* Selector 1: Print Format */}
          <div className="p-4 rounded-xl bg-surface-container-low/60 border border-outline-variant/60 space-y-2">
            <div className="font-bold text-sm text-on-surface font-headline">
              Preferred Prescription Print Layout
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-mono">
              {[
                { id: 'A4', label: 'A4 Standard Clinical PDF', desc: 'Hospital letterhead with Rx Rx boxes' },
                { id: 'Thermal', label: '80mm Thermal Receipt', desc: 'Fast OPD counter pharmacy print' },
                { id: 'FHIR', label: 'HL7 FHIR JSON Bundle', desc: 'Direct National Health Stack push' },
              ].map(fmt => (
                <button
                  key={fmt.id}
                  type="button"
                  onClick={() => setPrintFormat(fmt.id as any)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    printFormat === fmt.id
                      ? 'bg-primary-container text-on-primary border-primary shadow-xs'
                      : 'bg-surface-container-lowest border-outline-variant text-on-surface hover:bg-surface-container'
                  }`}
                >
                  <div className="font-bold">{fmt.label}</div>
                  <div className={`text-[10px] ${printFormat === fmt.id ? 'text-primary-fixed' : 'text-outline'}`}>{fmt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Selector 2: Default Dispense Days */}
          <div className="p-4 rounded-xl bg-surface-container-low/60 border border-outline-variant/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="font-bold text-sm text-on-surface font-headline">
                Default Medication Dispensation Duration
              </div>
              <div className="text-xs text-on-surface-variant font-body">Pre-selected duration for acute OPD prescriptions</div>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono">
              {['5 Days', '7 Days', '14 Days', '30 Days'].map(d => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDispenseDays(d)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    dispenseDays === d
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'bg-surface-container-lowest border border-outline-variant text-outline hover:text-on-surface'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* SECTION 2: Doctor's Digital Signature & Stamp */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical p-6 space-y-4">
        <div className="border-b border-outline-variant/40 pb-3 flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-primary font-headline flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-secondary" />
              <span>Doctor's Digital Signature &amp; Council Seal</span>
            </h3>
            <p className="text-xs font-body text-on-surface-variant">
              Class-3 DSC Token attestation for legally valid electronic prescriptions
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-tertiary bg-tertiary-fixed/30 px-3 py-1 rounded-full">
            Valid until 31 Dec 2026
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-surface-container-low border border-dashed border-primary/50 flex flex-col items-center justify-center text-center p-6 space-y-2">
            <div className="font-serif italic text-2xl font-bold text-primary">
              Dr. Ritesh Khandelwal
            </div>
            <div className="text-[11px] font-mono text-outline">
              MD (Medicine) • Reg. No: 12345 (RMC)
            </div>
            <div className="text-[9px] font-mono text-tertiary bg-tertiary-fixed/40 px-2 py-0.5 rounded">
              Digitally Encrypted 2048-bit RSA Key
            </div>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/40 space-y-2 text-xs font-mono">
            <div className="font-bold text-on-surface">DSC Security Details:</div>
            <div className="text-[11px] text-on-surface-variant space-y-1">
              <div>Certificate Issuer: eMudhra Sub-CA Medical Class 3</div>
              <div>Serial Number: 4B-9912-E5-2025</div>
              <div>Hash Algorithm: SHA-256 with RSA Encryption</div>
              <div>Hospital Node: Station 4B Dr. Route Gateway</div>
            </div>
            <button
              type="button"
              onClick={() => alert('Certificate Sync & Renewal wizard loaded.')}
              className="text-primary-container font-bold hover:underline text-xs pt-1 block"
            >
              Re-sync or Replace Token →
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 3: Security & Station PIN */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical p-6 space-y-5">
        <div className="border-b border-outline-variant/40 pb-3">
          <h3 className="text-base font-extrabold text-primary font-headline flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary" />
            <span>Security &amp; Workstation Access</span>
          </h3>
          <p className="text-xs font-body text-on-surface-variant">
            Station 4B quick lock credentials and dual-factor authentication parameters
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/40 space-y-1.5">
            <div className="text-outline uppercase text-[10px]">Quick 4-Digit Station PIN</div>
            <input
              type="password"
              maxLength={4}
              value={stationPin}
              onChange={(e) => setStationPin(e.target.value)}
              className="h-10 w-full px-3 text-center text-lg font-bold font-mono tracking-widest bg-surface-container-lowest border border-outline-variant rounded-lg text-primary focus:outline-none"
            />
            <div className="text-[10px] text-outline text-center">Fast terminal resume</div>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/40 space-y-1.5">
            <div className="text-outline uppercase text-[10px]">Session Idle Lock</div>
            <select
              value={sessionTimeout}
              onChange={(e) => setSessionTimeout(e.target.value)}
              className="h-10 w-full px-3 text-xs font-mono font-bold bg-surface-container-lowest border border-outline-variant rounded-lg text-on-surface focus:outline-none"
            >
              <option value="15 Minutes">15 Minutes</option>
              <option value="30 Minutes">30 Minutes</option>
              <option value="1 Hour">1 Hour</option>
              <option value="Never during OPD">Never during OPD</option>
            </select>
            <div className="text-[10px] text-outline text-center">Auto HIPAA Screen Blanking</div>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/40 space-y-1.5">
            <div className="text-outline uppercase text-[10px]">Portal Language</div>
            <div className="flex items-center gap-1.5 pt-1">
              {(['English', 'Hindi'] as const).map(lang => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLanguage(lang)}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                    language === lang
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'bg-surface-container-lowest border border-outline-variant text-outline'
                  }`}
                >
                  {lang === 'Hindi' ? 'हिंदी (Hindi)' : 'English'}
                </button>
              ))}
            </div>
            <div className="text-[10px] text-outline text-center">Bilingual EMR Support</div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SettingsScreen;
