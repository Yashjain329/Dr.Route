import React from 'react';
import { 
  LogIn, 
  LayoutDashboard, 
  FileText, 
  Activity, 
  FolderClock, 
  PlusCircle, 
  Sparkles, 
  Globe, 
  TrendingUp, 
  User, 
  GraduationCap, 
  Settings,
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

interface NavItem {
  id: ScreenId;
  number: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeType?: 'primary' | 'secondary' | 'alert' | 'success';
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentScreen,
  onNavigate,
  isOpen,
  onClose
}) => {
  const sections: NavSection[] = [
    {
      title: "Core Portal",
      items: [
        { id: 'login', number: '1st', label: 'Doctor Sign-in', icon: LogIn },
        { id: 'dashboard', number: '2nd', label: 'OPD Dashboard', icon: LayoutDashboard, badge: 'Live', badgeType: 'secondary' }
      ]
    },
    {
      title: "Prescription Suite",
      items: [
        { id: 'prescription', number: '3rd', label: 'Prescription Hub', icon: FileText },
        { id: 'submit-open-chart', number: '4th', label: 'Submit & Open Chart', icon: Activity, badge: '7-Day', badgeType: 'primary' },
        { id: 'old-records', number: '5th', label: 'Inside Old Records', icon: FolderClock },
        { id: 'new-prescription', number: '6th', label: 'Inside New Prescription', icon: PlusCircle, badge: '13 Boxes', badgeType: 'primary' },
        { id: 'health-insights', number: '7th', label: 'Inside Health Insights', icon: Sparkles, badge: 'Analytics', badgeType: 'secondary' }
      ]
    },
    {
      title: "Epidemiological Surveillance",
      items: [
        { id: 'disease-epi', number: '8th', label: 'Disease Epidemiology', icon: Globe, badge: 'Surveillance', badgeType: 'alert' },
        { id: 'drug-trends', number: '9th', label: 'Drug Trends & Pharmacy', icon: TrendingUp }
      ]
    },
    {
      title: "Provider Profile & Practice",
      items: [
        { id: 'personal-profile', number: '10th', label: 'Personal Profile', icon: User },
        { id: 'qualifications', number: '11th', label: 'Qualification & Exp.', icon: GraduationCap },
        { id: 'settings', number: '12th', label: 'Doctor Settings', icon: Settings }
      ]
    }
  ];

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

      {/* Sidebar drawer */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-surface-container-lowest border-r border-outline-variant/60 flex flex-col shadow-xl lg:shadow-none transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand & Station Header */}
        <div className="p-4 border-b border-outline-variant/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size="md" showText={false} />
            <div className="overflow-hidden">
              <div className="text-base font-bold text-primary tracking-tight font-headline flex items-center gap-1.5">
                Dr.<span className="text-secondary">Route</span>
                <span className="text-[9px] font-mono font-bold bg-primary-container text-on-primary px-1.5 py-0.5 rounded">OPD</span>
              </div>
              <div className="text-[11px] font-mono text-on-surface-variant truncate">
                Station 4B • Inpatient Care
              </div>
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

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto p-3 space-y-5 custom-scroll">
          {sections.map((sec, secIdx) => (
            <div key={secIdx} className="space-y-1">
              <div className="px-3 text-[10px] font-mono font-semibold uppercase tracking-wider text-outline">
                {sec.title}
              </div>
              <div className="space-y-0.5 pt-1">
                {sec.items.map((item) => {
                  const isActive = currentScreen === item.id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-primary-container text-on-primary font-semibold shadow-xs'
                          : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className={`text-[10px] font-mono px-1 py-0.2 rounded ${
                          isActive ? 'bg-primary text-primary-fixed' : 'text-outline bg-surface-container'
                        }`}>
                          {item.number}
                        </span>
                        <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-primary-fixed' : 'text-outline'}`} />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full uppercase ml-1 flex-shrink-0 ${
                          item.badgeType === 'alert'
                            ? 'bg-error-container text-on-error-container'
                            : item.badgeType === 'secondary'
                            ? 'bg-secondary-container text-on-secondary-container'
                            : 'bg-primary-fixed text-on-primary-fixed-variant'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* System Access & Security Footer */}
        <div className="p-3 border-t border-outline-variant/40 space-y-2 bg-surface-container-low/40">
          <div className="flex items-center justify-between px-2 text-[10px] font-mono text-outline uppercase tracking-wider">
            <span>System Access</span>
            <span className="text-secondary font-bold">ABDM M1-M3</span>
          </div>

          <div className="p-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant/60 flex items-center gap-2 text-xs">
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
