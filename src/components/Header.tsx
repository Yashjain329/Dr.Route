import React, { useState } from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  HelpCircle, 
  AlertTriangle, 
  Flame, 
  HeartPulse, 
  ChevronDown 
} from 'lucide-react';
import { ScreenId, Patient } from '../types';

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
  const [showSosAlert, setShowSosAlert] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-20 flex items-center justify-between h-16 px-4 sm:px-6 bg-surface-container-lowest border-b border-outline-variant shadow-sm shrink-0">
        
        {/* Left: Mobile hamburger + Search Bar matching Stitch UI */}
        <div className="flex items-center gap-3 w-full max-w-md">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-low lg:hidden transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="relative w-full">
            <Search className="w-4 h-4 text-outline absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search patient by name, ID or phone..."
              className="w-full h-10 pl-10 pr-4 bg-background border border-outline-variant rounded-full text-xs font-mono text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 transition-all shadow-xs"
            />
          </div>
        </div>

        {/* Right: Telemetry + SOS Trigger + Doctor Context matching Stitch UI */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Active Patient Pill Selector */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-low border border-outline-variant text-on-surface text-xs font-mono">
            <HeartPulse className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
            <span className="text-[10px] text-outline font-semibold uppercase">Patient:</span>
            <select
              value={selectedPatient.id}
              onChange={(e) => onSelectPatient(e.target.value)}
              className="bg-transparent text-xs font-mono font-bold text-on-surface focus:outline-none cursor-pointer max-w-[140px] truncate"
            >
              {allPatients.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.uhid || p.id})
                </option>
              ))}
            </select>
          </div>

          {/* System Online Telemetry Indicator */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-low border border-outline-variant text-on-surface-variant text-[11px] font-mono">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            <span className="font-semibold text-tertiary">System Online</span>
          </div>

          {/* Emergency Blood SOS Trigger */}
          <button
            onClick={() => setShowSosAlert(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-error hover:bg-error/90 text-on-error text-xs font-mono font-bold shadow-sos transition-all active:scale-95"
            title="Emergency Hospital Blood Requisition"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Blood SOS</span>
          </button>

          {/* Notifications & Help Icons */}
          <div className="flex items-center gap-1 border-r border-outline-variant pr-3">
            <button 
              onClick={() => alert('No critical unread physician notifications at Station 4B.')}
              className="relative p-2 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors" 
              title="Notifications"
            >
              <Bell className="w-4 h-4 text-outline" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full"></span>
            </button>
            <button 
              onClick={() => alert('Dr. Route Physician Support Hotline: Extension 4022')}
              className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors" 
              title="Clinical Help"
            >
              <HelpCircle className="w-4 h-4 text-outline" />
            </button>
          </div>

          {/* Doctor Avatar & Profile Details (Matching Stitch Doctor Profile Header) */}
          <button
            onClick={() => onNavigate('personal-profile')}
            className="flex items-center gap-3 pl-1 text-left hover:opacity-90 transition-opacity"
            title="View Doctor Profile"
          >
            <div className="w-9 h-9 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-xs shadow-xs border border-outline-variant shrink-0 font-headline">
              DB
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-xs font-bold text-on-surface font-headline">Dr. Deshraj Burdak</span>
              <span className="text-[10px] font-mono text-on-surface-variant">General Physician</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-outline hidden sm:block" />
          </button>

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
                <p className="text-xs font-mono text-on-surface-variant">Station 4B Cardiology Inpatient &amp; OPD</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-error-container/30 border border-error/40 text-xs font-body space-y-2">
              <p className="font-bold text-error">
                Immediate Cross-Match &amp; Transfusion Requisition Initiated:
              </p>
              <ul className="list-disc pl-5 font-mono text-on-surface space-y-1">
                <li>Patient: <strong>{selectedPatient.name}</strong> ({selectedPatient.uhid || selectedPatient.id})</li>
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
                Dismiss
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
