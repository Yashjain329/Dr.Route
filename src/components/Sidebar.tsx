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
  ChevronRight,
  ShieldCheck,
  X
} from 'lucide-react';
import { ScreenId } from '../types';
import Logo from './Logo';
import { mockDoctor } from '../data/mockData';

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
        { id: 'login', number: '1st', label: 'Login Page', icon: LogIn },
        { id: 'dashboard', number: '2nd', label: 'Dashboard', icon: LayoutDashboard, badge: 'Live' }
      ]
    },
    {
      title: "Prescription Suite",
      items: [
        { id: 'prescription', number: '3rd', label: 'Prescription Hub', icon: FileText },
        { id: 'submit-open-chart', number: '4th', label: 'Submit & Open Chart', icon: Activity, badge: 'Interactive' },
        { id: 'old-records', number: '5th', label: 'Inside Old Records', icon: FolderClock },
        { id: 'new-prescription', number: '6th', label: 'Inside New Prescription', icon: PlusCircle },
        { id: 'health-insights', number: '7th', label: 'Inside Health Insights', icon: Sparkles, badge: 'AI' }
      ]
    },
    {
      title: "Epidemiological Surveillance",
      items: [
        { id: 'disease-epi', number: '8th', label: 'Disease Epidemiology', icon: Globe, badge: 'Alert' },
        { id: 'drug-trends', number: '9th', label: 'Drug Trends & AMR', icon: TrendingUp }
      ]
    },
    {
      title: "Provider Profile & Practice",
      items: [
        { id: 'personal-profile', number: '10th', label: 'Personal Profile', icon: User },
        { id: 'qualifications', number: '11th', label: 'Qualification & Exp.', icon: GraduationCap },
        { id: 'settings', number: '12th', label: 'Practice Settings', icon: Settings }
      ]
    }
  ];

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
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-slate-200/90 flex flex-col shadow-xl lg:shadow-none transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <Logo size="md" />
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              <h3 className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {section.title}
              </h3>
              <div className="space-y-0.5 mt-1.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentScreen === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onNavigate(item.id);
                        onClose();
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-sm font-medium transition-all group ${
                        isActive 
                          ? 'bg-primary text-white shadow-sm' 
                          : 'text-slate-700 hover:bg-slate-100/80 hover:text-primary'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          isActive 
                            ? 'bg-white/20 text-white' 
                            : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                        }`}>
                          {item.number}
                        </span>
                        <Icon className={`w-4 h-4 flex-shrink-0 ${
                          isActive ? 'text-secondary-fixed' : 'text-slate-400 group-hover:text-primary'
                        }`} />
                        <span className="truncate">{item.label}</span>
                      </div>

                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {item.badge && (
                          <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider ${
                            isActive
                              ? 'bg-secondary text-white'
                              : item.badge === 'Alert'
                              ? 'bg-emergency-container text-emergency'
                              : 'bg-teal-50 text-teal-700 border border-teal-200'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                        <ChevronRight className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ${
                          isActive ? 'opacity-100 text-white/60' : 'text-slate-400'
                        }`} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Doctor Status Footer Pill */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-xs">
                AM
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-slate-800 truncate">{mockDoctor.name}</span>
                <ShieldCheck className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
              </div>
              <span className="text-[10px] text-slate-500 truncate block">{mockDoctor.regNumber} • Medanta</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
