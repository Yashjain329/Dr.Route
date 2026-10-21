import React, { useState } from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  AlertTriangle, 
  HeartPulse,
  User,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { ScreenId, Patient } from '../types';
import Logo from './Logo';

interface HeaderProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  onToggleSidebar: () => void;
  selectedPatient: Patient;
  onSelectPatient: (patientId: string) => void;
  allPatients: Patient[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

const screenMeta: Record<ScreenId, { number: string; title: string; category: string }> = {
  'login': { number: '1st', title: 'Doctor Portal Entry & Duty Session', category: 'Authentication' },
  'dashboard': { number: '2nd', title: 'OPD Clinical Dashboard', category: 'Executive Dashboard' },
  'prescription': { number: '3rd', title: 'Prescription Selection Workspace', category: 'Prescription Suite' },
  'submit-open-chart': { number: '4th', title: '7-Day Vitals & Clinical Protocol Record', category: 'Prescription Suite' },
  'old-records': { number: '5th', title: 'Old Records & Patient Treatment History', category: 'Prescription Suite' },
  'new-prescription': { number: '6th', title: 'New Prescription Protocol Workspace (Boxes 1-13)', category: 'Prescription Suite' },
  'health-insights': { number: '7th', title: 'Patient Vitals, Disease Burden & Duration Analytics', category: 'Prescription Suite' },
  'disease-epi': { number: '8th', title: 'Hospital Disease Epidemiology Surveillance', category: 'Public Health' },
  'drug-trends': { number: '9th', title: 'Hospital Drug Trends & Pharmacy Analytics', category: 'Pharmacy Stewardship' },
  'personal-profile': { number: '10th', title: 'Doctor Profile — Personal Information', category: 'Provider Practice' },
  'qualifications': { number: '11th', title: 'Doctor Profile — Qualification & Experience', category: 'Provider Practice' },
  'settings': { number: '12th', title: 'Doctor Profile Settings & Preferences', category: 'System Configuration' },
};

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  onToggleSidebar,
  selectedPatient,
  onSelectPatient,
  allPatients,
  searchQuery,
  onSearchChange
}) => {
  const meta = screenMeta[currentScreen] || { number: '', title: 'Dr. Route', category: '' };
  const [showSosAlert, setShowSosAlert] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 bg-surface-container-lowest/95 backdrop-blur-md border-b border-outline-variant/60 px-4 sm:px-6 py-2.5 shadow-clinical">
        <div className="flex items-center justify-between gap-3">
          
          {/* Left: Hamburger + Brand Context */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleSidebar}
              className="p-2 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-low lg:hidden transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5">
              <span className="hidden sm:inline-flex bg-primary text-primary-fixed text-[10px] font-mono font-bold px-2 py-0.5 rounded tracking-wider">
                {meta.number}
              </span>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-bold text-on-surface font-headline truncate max-w-[200px] sm:max-w-xs md:max-w-md">
                  {meta.title}
                </h1>
                <span className="hidden md:inline text-outline/60">|</span>
                <span className="hidden md:inline text-xs font-mono text-on-surface-variant font-medium">
                  Station 4B • Cardiology Wing
                </span>
              </div>
            </div>
          </div>

          {/* Center: Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-sm mx-3">
            <div className="relative w-full">
              <Search className="w-3.5 h-3.5 text-outline absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search patient UHID, ICD-10, medicine..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-primary-container focus:bg-surface-container-lowest text-on-surface font-mono"
              />
            </div>
          </div>

          {/* Right: Telemetry + SOS Trigger + Doctor Context */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Real-time Telemetry Pill */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container text-tertiary text-[11px] font-mono font-semibold border border-outline-variant/50">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
              <span>System Online</span>
            </div>

            {/* Patient Context Dropdown */}
            <div className="flex items-center gap-1.5 bg-surface-container-low border border-outline-variant/60 px-2 py-1 rounded-lg">
              <HeartPulse className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
              <select
                value={selectedPatient.id}
                onChange={(e) => onSelectPatient(e.target.value)}
                className="bg-transparent text-xs font-mono font-semibold text-on-surface focus:outline-none cursor-pointer max-w-[120px] sm:max-w-[160px] truncate"
              >
                {allPatients.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.uhid || p.id})
                  </option>
                ))}
              </select>
            </div>

            {/* Emergency Blood SOS Trigger Button */}
            <button
              onClick={() => setShowSosAlert(true)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-error hover:bg-error/90 text-on-error text-xs font-mono font-bold shadow-sos transition-all active:scale-95"
              title="Emergency Hospital Blood Requisition"
            >
              <AlertTriangle className="w-3.5 h-3.5 animate-bounce" />
              <span className="hidden sm:inline">Blood SOS</span>
            </button>

            {/* Doctor Profile Quick Icon */}
            <button
              onClick={() => onNavigate('personal-profile')}
              className="flex items-center gap-2 p-1 pl-2 pr-2.5 rounded-lg hover:bg-surface-container-low transition-colors border border-transparent hover:border-outline-variant/40"
            >
              <div className="w-7 h-7 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-xs">
                RD
              </div>
              <div className="hidden xl:block text-left">
                <div className="text-xs font-bold text-on-surface font-headline leading-tight">Dr. Deshraj Burdak</div>
                <div className="text-[10px] font-mono text-on-surface-variant">Attending MD</div>
              </div>
            </button>

          </div>

        </div>
      </header>

      {/* Emergency SOS Modal */}
      {showSosAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-surface-container-lowest max-w-lg w-full rounded-2xl border-2 border-error p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-error">
              <div className="p-3 rounded-full bg-error-container text-on-error-container">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-headline">CRITICAL BLOOD BANK SOS DISPATCH</h3>
                <p className="text-xs font-mono text-on-surface-variant">Protocol #SOS-CARDIOLOGY-4B-991</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-error-container/30 border border-error/40 text-xs font-body space-y-2">
              <p className="font-semibold text-error">
                Immediate Cross-Match & Transfusion Requisition Initiated:
              </p>
              <ul className="list-disc pl-5 font-mono text-on-surface space-y-1">
                <li>Patient: <strong>{selectedPatient.name}</strong> ({selectedPatient.uhid || selectedPatient.abhaId})</li>
                <li>Blood Group: <strong>{selectedPatient.bloodGroup}</strong> • Station 4B Bed 12</li>
                <li>Required: <strong>2 Units Packed Red Blood Cells (PRBC)</strong></li>
                <li>Emergency Status: O-Negative emergency donor stock dispatched from Central Blood Vault.</li>
              </ul>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowSosAlert(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-outline hover:text-on-surface hover:bg-surface-container-low"
              >
                Dismiss Alert
              </button>
              <button
                onClick={() => {
                  alert(`SOS Emergency Dispatch Confirmed for ${selectedPatient.name}. Blood Bank Runner Dispatched.`);
                  setShowSosAlert(false);
                }}
                className="px-5 py-2 rounded-lg text-xs font-bold font-mono bg-error text-on-error shadow-sos hover:bg-error/90"
              >
                CONFIRM RUNNER DISPATCH
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
