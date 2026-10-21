import React from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  AlertTriangle, 
  ShieldCheck, 
  User, 
  Activity,
  HeartPulse,
  Radio
} from 'lucide-react';
import { ScreenId, Patient } from '../types';
import { mockDoctor } from '../data/mockData';

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
  'login': { number: '1st', title: 'Healthcare Provider Portal Login', category: 'Authentication' },
  'dashboard': { number: '2nd', title: 'Clinical Navigation Command Center', category: 'Executive Dashboard' },
  'prescription': { number: '3rd', title: 'Prescription Management Hub', category: 'Prescription Suite' },
  'submit-open-chart': { number: '4th', title: 'Prescription Review & Interactive Clinical Chart', category: 'Prescription Suite' },
  'old-records': { number: '5th', title: 'Inside Old Records & Electronic Health Vault', category: 'Prescription Suite' },
  'new-prescription': { number: '6th', title: 'Inside New Prescription Console', category: 'Prescription Suite' },
  'health-insights': { number: '7th', title: 'Inside AI Patient & Population Health Insights', category: 'Prescription Suite' },
  'disease-epi': { number: '8th', title: 'Disease Epidemiology & Outbreak Intelligence', category: 'Surveillance' },
  'drug-trends': { number: '9th', title: 'Pharmaceutical & Antimicrobial Drug Trends', category: 'Surveillance' },
  'personal-profile': { number: '10th', title: 'Clinician Personal Profile & Credentials', category: 'Provider Practice' },
  'qualifications': { number: '11th', title: 'Qualification, Experience & Academic Timeline', category: 'Provider Practice' },
  'settings': { number: '12th', title: 'System, Interoperability & Practice Settings', category: 'System Configuration' },
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

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-3 shadow-xs">
      <div className="flex items-center justify-between gap-4">
        
        {/* Left: Hamburger + Screen Title Breadcrumbs */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl text-slate-600 hover:text-primary hover:bg-slate-100 lg:hidden transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-md tracking-wider">
                {meta.number}
              </span>
              <span className="text-[11px] font-semibold text-secondary uppercase tracking-wider hidden sm:inline">
                {meta.category}
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 font-display leading-tight truncate">
              {meta.title}
            </h1>
          </div>
        </div>

        {/* Center: Search & Patient Context Selector */}
        <div className="hidden md:flex items-center gap-3 flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search patients, medicines, ICD-10..."
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-100/80 border border-slate-200/80 rounded-xl focus:outline-none focus:border-secondary focus:bg-white transition-all"
            />
          </div>

          {/* Active Patient Pill Selector */}
          <div className="flex items-center gap-1.5 bg-teal-50/70 border border-teal-200/70 px-2.5 py-1 rounded-xl flex-shrink-0">
            <HeartPulse className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
            <span className="text-[10px] font-medium text-slate-500">Patient:</span>
            <select
              value={selectedPatient.id}
              onChange={(e) => onSelectPatient(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer max-w-[130px] truncate"
            >
              {allPatients.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.id})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right: Emergency Telemetry, Notifications & Doctor Pill */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Live GPS / Emergency Beacon */}
          <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emergency-container/40 border border-emergency/20 text-emergency text-[11px] font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emergency opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emergency"></span>
            </span>
            <span>Surveillance Alert: Dengue DENV-2 Active</span>
          </div>

          {/* Telemetry status */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 text-slate-600 text-[11px] font-medium">
            <Radio className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
            <span>ABDM Sync: Online</span>
          </div>

          {/* Notification Bell */}
          <button 
            onClick={() => onNavigate('dashboard')}
            className="relative p-2 rounded-xl text-slate-500 hover:text-primary hover:bg-slate-100 transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emergency rounded-full ring-2 ring-white"></span>
          </button>

          {/* Doctor Profile Quick Switch */}
          <button
            onClick={() => onNavigate('personal-profile')}
            className="flex items-center gap-2 p-1 pl-2 sm:pr-2.5 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200/70"
            title="View Doctor Profile"
          >
            <div className="w-7 h-7 rounded-lg bg-primary text-white flex items-center justify-center text-xs font-bold font-display">
              AM
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-bold text-slate-800 leading-none">{mockDoctor.name}</div>
              <div className="text-[10px] text-slate-400 leading-tight">Cardiology</div>
            </div>
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;
