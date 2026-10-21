import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  ShieldCheck, 
  Lock, 
  Radio, 
  Bell, 
  FileText, 
  Database, 
  Save, 
  CheckCircle2, 
  RefreshCw, 
  Download, 
  KeyRound, 
  Server,
  ArrowRight,
  User
} from 'lucide-react';
import { ScreenId } from '../types';
import { mockDoctor } from '../data/mockData';

interface SettingsScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  onNavigate
}) => {
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [biometricLogin, setBiometricLogin] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState('30 mins');
  const [genericFirst, setGenericFirst] = useState(true);
  const [autoSign, setAutoSign] = useState(true);
  const [abdmConnected, setAbdmConnected] = useState(true);
  const [erAlertSound, setErAlertSound] = useState(true);
  const [labPanicAlerts, setLabPanicAlerts] = useState(true);
  const [outbreakAlerts, setOutbreakAlerts] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-primary via-slate-900 to-primary-container text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-700/60">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-secondary text-white text-xs font-bold px-2.5 py-0.5 rounded-md">
                12th
              </span>
              <span className="text-xs font-bold text-secondary-fixed uppercase tracking-wider">
                System Configuration • ABDM Standards & Practice
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white">
              System & Practice Settings
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              ABHA M1–M3 gateway configuration, clinical security, emergency alerts, and prescription defaults
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="bg-secondary hover:bg-secondary-light active:scale-95 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>{saveSuccess ? 'Preferences Saved!' : 'Save Changes'}</span>
            </button>
          </div>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>System configuration and security preferences synchronized to Dr. Route Cloud.</span>
        </div>
      )}

      {/* Settings Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Section 1: Clinical Security & 2FA */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Lock className="w-5 h-5 text-primary" />
            <h2 className="text-base font-bold text-slate-900 font-display">
              Authentication & Practice Security
            </h2>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <div>
                <span className="font-bold text-slate-800 block">Two-Factor Authentication (2FA)</span>
                <span className="text-[11px] text-slate-500">Require OTP token on untrusted clinic devices</span>
              </div>
              <input
                type="checkbox"
                checked={twoFactorAuth}
                onChange={() => setTwoFactorAuth(!twoFactorAuth)}
                className="w-4 h-4 rounded text-secondary focus:ring-secondary cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <div>
                <span className="font-bold text-slate-800 block">Biometric / Passkey Login</span>
                <span className="text-[11px] text-slate-500">Allow TouchID / FaceID instant authentication</span>
              </div>
              <input
                type="checkbox"
                checked={biometricLogin}
                onChange={() => setBiometricLogin(!biometricLogin)}
                className="w-4 h-4 rounded text-secondary focus:ring-secondary cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <div>
                <span className="font-bold text-slate-800 block">Clinical Session Auto-Lock</span>
                <span className="text-[11px] text-slate-500">HIPAA requirement for inactive terminals</span>
              </div>
              <select
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(e.target.value)}
                className="p-1.5 text-xs font-bold bg-white border border-slate-200 rounded-lg text-slate-700"
              >
                <option value="15 mins">15 mins</option>
                <option value="30 mins">30 mins</option>
                <option value="60 mins">60 mins</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: ABDM & Health Interoperability */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Server className="w-5 h-5 text-secondary" />
              <h2 className="text-base font-bold text-slate-900 font-display">
                ABDM National Gateway Sync
              </h2>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              Milestone M1–M3 Online
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Gateway Endpoint</span>
              <span className="font-mono text-xs font-semibold text-primary block">
                https://gateway.abdm.gov.in/v0.5/dr-route
              </span>
              <span className="text-[10px] text-slate-500">Bridge Identifier: IN-HPR-DELHI-54921</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <div>
                <span className="font-bold text-slate-800 block">FHIR R4 Format Transmission</span>
                <span className="text-[11px] text-slate-500">Standardized clinical document exchange</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                Active
              </span>
            </div>

            <button
              onClick={() => alert('ABDM Gateway Health: PING 24ms • 100% SLA')}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 text-secondary" />
              <span>Test ABDM Gateway Health</span>
            </button>
          </div>
        </div>

        {/* Section 3: Notification & Emergency Triage Preferences */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Bell className="w-5 h-5 text-amber-600" />
            <h2 className="text-base font-bold text-slate-900 font-display">
              Emergency & Triage Alerts
            </h2>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <div>
                <span className="font-bold text-slate-800 block">Code Blue / ER Triage Sound Alert</span>
                <span className="text-[11px] text-slate-500">Immediate priority override for acute cardiac admissions</span>
              </div>
              <input
                type="checkbox"
                checked={erAlertSound}
                onChange={() => setErAlertSound(!erAlertSound)}
                className="w-4 h-4 rounded text-secondary focus:ring-secondary cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <div>
                <span className="font-bold text-slate-800 block">Critical Lab Panic Value SMS</span>
                <span className="text-[11px] text-slate-500">Direct alert for extreme potassium, troponin, or platelets</span>
              </div>
              <input
                type="checkbox"
                checked={labPanicAlerts}
                onChange={() => setLabPanicAlerts(!labPanicAlerts)}
                className="w-4 h-4 rounded text-secondary focus:ring-secondary cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <div>
                <span className="font-bold text-slate-800 block">Epidemiology Outbreak Warnings</span>
                <span className="text-[11px] text-slate-500">District-level surge alerts for vector-borne diseases</span>
              </div>
              <input
                type="checkbox"
                checked={outbreakAlerts}
                onChange={() => setOutbreakAlerts(!outbreakAlerts)}
                className="w-4 h-4 rounded text-secondary focus:ring-secondary cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Practice & Prescription Defaults */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <FileText className="w-5 h-5 text-secondary" />
            <h2 className="text-base font-bold text-slate-900 font-display">
              Prescription & Clinical Defaults
            </h2>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <div>
                <span className="font-bold text-slate-800 block">Generic-First Drug Nomenclature</span>
                <span className="text-[11px] text-slate-500">Jan Aushadhi & NMC generic compliance mandate</span>
              </div>
              <input
                type="checkbox"
                checked={genericFirst}
                onChange={() => setGenericFirst(!genericFirst)}
                className="w-4 h-4 rounded text-secondary focus:ring-secondary cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <div>
                <span className="font-bold text-slate-800 block">Auto-Attach Cryptographic Signature</span>
                <span className="text-[11px] text-slate-500">Attach SHA-256 digital stamp upon submission</span>
              </div>
              <input
                type="checkbox"
                checked={autoSign}
                onChange={() => setAutoSign(!autoSign)}
                className="w-4 h-4 rounded text-secondary focus:ring-secondary cursor-pointer"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <span className="font-bold text-slate-800 block">Audit & Regulatory Log Export</span>
              <button
                onClick={() => alert('Full Clinical Audit Log CSV exported successfully.')}
                className="w-full bg-white hover:bg-slate-100 text-slate-700 py-2 rounded-xl font-bold text-xs border border-slate-200 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Clinical Audit Log (CSV)</span>
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default SettingsScreen;
