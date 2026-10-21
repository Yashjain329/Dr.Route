import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Globe, 
  User, 
  Plus, 
  Settings, 
  LogOut, 
  ShieldCheck, 
  X 
} from 'lucide-react';
import { ScreenId } from '../types';
import Logo from './Logo';

interface SidebarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentScreen,
  onNavigate,
  isOpen,
  onClose
}) => {
  // Determine which of the 4 main menu items is active
  const isDashboardActive = currentScreen === 'dashboard';
  const isPrescriptionActive = [
    'prescription', 
    'submit-open-chart', 
    'old-records', 
    'new-prescription', 
    'health-insights'
  ].includes(currentScreen);
  const isEpidemiologyActive = [
    'disease-epi', 
    'drug-trends'
  ].includes(currentScreen);
  const isProfileActive = [
    'personal-profile', 
    'qualifications', 
    'settings'
  ].includes(currentScreen);

  const handleSelect = (id: ScreenId) => {
    onNavigate(id);
    onClose();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar drawer matching Stitch UI (w-64) */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-surface-container-lowest border-r border-outline-variant shadow-sm flex flex-col justify-between p-4 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col gap-5">
          
          {/* Brand & Clinic Header */}
          <div className="flex items-center justify-between px-2 py-1">
            <div className="flex items-center gap-3">
              <Logo size="md" showText={false} />
              <div className="flex flex-col">
                <span className="font-headline font-bold text-base text-primary tracking-tight">
                  Dr.<span className="text-secondary">Route</span>
                </span>
                <span className="text-[11px] font-mono text-on-surface-variant font-medium">
                  Doctor Panel
                </span>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-low lg:hidden"
              aria-label="Close navigation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Action / CTA: + New Prescription (from Stitch UI) */}
          <button 
            onClick={() => handleSelect('new-prescription')}
            className="w-full bg-primary-container hover:bg-primary text-on-primary rounded-xl py-2.5 px-3 flex items-center justify-center gap-2 text-xs font-mono font-bold transition-all shadow-sm active:scale-98"
          >
            <Plus className="w-4 h-4" />
            <span>New Prescription</span>
          </button>

          {/* Main Navigation Menu: Exactly 4 Items (matching Stitch UI) */}
          <nav aria-label="Main Navigation" className="flex flex-col gap-1.5 pt-1">
            
            {/* 1. Dashboard */}
            <button
              onClick={() => handleSelect('dashboard')}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-headline text-xs font-semibold transition-all ${
                isDashboardActive
                  ? 'bg-surface-container text-primary shadow-xs font-bold'
                  : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
              }`}
            >
              <LayoutDashboard className={`w-4 h-4 flex-shrink-0 ${isDashboardActive ? 'text-primary' : 'text-outline'}`} />
              <span className="flex-1 text-left">Dashboard</span>
              {isDashboardActive && <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>}
            </button>

            {/* 2. Prescription */}
            <button
              onClick={() => handleSelect('prescription')}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-headline text-xs font-semibold transition-all ${
                isPrescriptionActive
                  ? 'bg-surface-container text-primary shadow-xs font-bold'
                  : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
              }`}
            >
              <FileText className={`w-4 h-4 flex-shrink-0 ${isPrescriptionActive ? 'text-primary' : 'text-outline'}`} />
              <span className="flex-1 text-left">Prescription</span>
              {isPrescriptionActive && <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>}
            </button>

            {/* 3. Epidemiology */}
            <button
              onClick={() => handleSelect('disease-epi')}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-headline text-xs font-semibold transition-all ${
                isEpidemiologyActive
                  ? 'bg-surface-container text-primary shadow-xs font-bold'
                  : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
              }`}
            >
              <Globe className={`w-4 h-4 flex-shrink-0 ${isEpidemiologyActive ? 'text-primary' : 'text-outline'}`} />
              <span className="flex-1 text-left">Epidemiology</span>
              {isEpidemiologyActive && <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>}
            </button>

            {/* 4. Profile */}
            <button
              onClick={() => handleSelect('personal-profile')}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-headline text-xs font-semibold transition-all ${
                isProfileActive
                  ? 'bg-surface-container text-primary shadow-xs font-bold'
                  : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
              }`}
            >
              <User className={`w-4 h-4 flex-shrink-0 ${isProfileActive ? 'text-primary' : 'text-outline'}`} />
              <span className="flex-1 text-left">Profile</span>
              {isProfileActive && <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>}
            </button>

          </nav>
        </div>

        {/* Footer Navigation (Settings, Lock Session & Security) */}
        <div className="border-t border-outline-variant/50 pt-3 space-y-1">
          <div className="px-3 pb-1 text-[10px] font-mono text-outline uppercase tracking-wider">
            System Access
          </div>

          <button
            onClick={() => handleSelect('settings')}
            className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
              currentScreen === 'settings'
                ? 'bg-surface-container text-primary font-bold'
                : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
            }`}
          >
            <Settings className="w-4 h-4 text-outline" />
            <span>Settings</span>
          </button>

          <button
            onClick={() => handleSelect('login')}
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-mono font-medium text-outline hover:text-error hover:bg-error-container/20 transition-all"
            title="Lock Physician Session"
          >
            <LogOut className="w-4 h-4" />
            <span>Lock Station</span>
          </button>

          {/* Session Security Status */}
          <div className="mt-3 p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/60 flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse flex-shrink-0"></span>
            <span className="text-[11px] font-mono text-on-surface-variant truncate">
              TLS 1.3 Certified Encrypted
            </span>
            <ShieldCheck className="w-3.5 h-3.5 text-secondary ml-auto flex-shrink-0" />
          </div>
        </div>

      </aside>
    </>
  );
};

export default Sidebar;
