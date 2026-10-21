import React from 'react';
import { 
  FolderSearch, 
  FileEdit, 
  Activity, 
  ArrowRight, 
  Sparkles, 
  Search, 
  FileText, 
  Clock, 
  CheckCircle2, 
  User, 
  Calendar,
  Layers,
  BarChart3
} from 'lucide-react';
import { ScreenId, Prescription } from '../types';

interface PrescriptionHubScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onSelectPatient: (patientId: string) => void;
  prescriptions: Prescription[];
}

export const PrescriptionHubScreen: React.FC<PrescriptionHubScreenProps> = ({
  onNavigate,
  onSelectPatient,
  prescriptions,
}) => {
  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in py-2">
      
      {/* Header Context Banner */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-mono font-semibold text-secondary uppercase tracking-wider">
            Clinical Prescription Suite
          </span>
          <h1 className="text-2xl font-extrabold text-primary font-headline tracking-tight">
            Prescription Selection &amp; Clinical Records
          </h1>
          <p className="text-sm font-body text-on-surface-variant">
            Choose ongoing patient treatment archives or initialize a comprehensive pharmacotherapy regimen.
          </p>
        </div>

        {/* Quick Shortcut to Submit & Open Chart */}
        <button
          onClick={() => onNavigate('submit-open-chart')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/60 text-primary text-xs font-mono font-bold shadow-xs transition-all active:scale-95 whitespace-nowrap"
        >
          <Activity className="w-4 h-4 text-primary" />
          <span>Submit &amp; Open Chart →</span>
        </button>
      </div>

      {/* Two Large Interactive Action Cards Side by Side (Exact Stitch Screen 3) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch w-full">
        
        {/* Card 1: Old Record */}
        <div className="group relative bg-surface-container-lowest rounded-2xl border-2 border-outline-variant hover:border-primary transition-all duration-200 shadow-clinical hover:shadow-clinical-md flex flex-col justify-between p-8 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary/20 group-hover:bg-primary transition-colors"></div>
          
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="w-14 h-14 rounded-2xl bg-surface-container text-primary flex items-center justify-center border border-outline-variant shrink-0 shadow-xs">
                <FolderSearch className="w-7 h-7" />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-extrabold text-on-surface group-hover:text-primary transition-colors font-headline mb-2">
                Old Record
              </h2>
              <p className="text-xs font-body text-on-surface-variant leading-relaxed">
                Review historical prescriptions, past diagnoses, archived laboratory reports, and ongoing multi-department treatment timelines.
              </p>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-outline-variant/50">
            <button
              onClick={() => onNavigate('old-records')}
              className="w-full bg-surface-container-low hover:bg-surface-container border-2 border-outline-variant text-primary font-bold py-3.5 px-5 rounded-xl text-xs font-mono flex items-center justify-center gap-2 transition-all duration-150 active:scale-98 shadow-xs"
            >
              <Search className="w-4 h-4" />
              <span>Search Past Records</span>
            </button>
          </div>
        </div>

        {/* Card 2: New Prescription */}
        <div className="group relative bg-surface-container-lowest rounded-2xl border-2 border-primary shadow-clinical-md hover:shadow-clinical-lg transition-all duration-200 flex flex-col justify-between p-8 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary transition-colors"></div>
          
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="w-14 h-14 rounded-2xl bg-primary text-on-primary flex items-center justify-center shadow-xs shrink-0">
                <FileEdit className="w-7 h-7" />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-extrabold text-primary font-headline mb-2">
                New Prescription
              </h2>
              <p className="text-xs font-body text-on-surface-variant leading-relaxed">
                Launch the 13-box clinical protocol workspace: symptoms, examination signs, lab orders, drug formulary with interaction safeguards, and lifestyle guidance.
              </p>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-outline-variant/50">
            <button
              onClick={() => onNavigate('new-prescription')}
              className="w-full bg-primary hover:bg-primary-container text-on-primary py-3.5 px-5 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all duration-150 active:scale-98 shadow-clinical"
            >
              <FileEdit className="w-4 h-4" />
              <span>Create New Prescription</span>
            </button>
          </div>
        </div>

      </div>

      {/* Health Insights Interactive Analytics Card (Exact Stitch Screen 3) */}
      <section className="w-full bg-surface-container-lowest rounded-2xl border-2 border-outline-variant/70 shadow-clinical flex flex-col p-6 hover:border-secondary transition-all">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-surface-container text-primary flex items-center justify-center border border-outline-variant shrink-0 shadow-xs">
              <BarChart3 className="w-7 h-7" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h3 className="text-xl font-extrabold text-on-surface font-headline tracking-tight">
                  Health Insights
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-surface-container text-primary border border-primary font-bold">
                  Interactive Analytics
                </span>
              </div>
              <p className="text-xs font-body text-on-surface-variant">
                Patient longitudinal vitals, systolic/diastolic BP envelopes, fluid intake/output metrics, and medication duration analytics.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('health-insights')}
            className="w-full sm:w-auto px-6 py-3 bg-primary hover:bg-primary-container text-on-primary font-mono font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all duration-150 active:scale-98 shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>Open Health Insights →</span>
          </button>
        </div>
      </section>

      {/* Patient Information & Recent Protocols Quick Reference */}
      <div className="bg-surface-container-low/60 rounded-2xl border border-outline-variant/50 p-5 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="font-bold text-on-surface flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" />
            <span>Recent Prescriptions Generated Today:</span>
          </span>
          <span className="text-outline">{prescriptions.length} Records In-Memory</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {prescriptions.slice(0, 3).map((rx, idx) => (
            <div key={rx.id || idx} className="bg-surface-container-lowest rounded-xl p-3 border border-outline-variant/60 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="font-bold text-primary">{rx.id}</span>
                <span className="text-outline">{rx.date}</span>
              </div>
              <div className="text-xs font-bold text-on-surface font-headline truncate">
                {rx.diagnosis || rx.primaryDiagnosis}
              </div>
              <div className="text-[10px] font-mono text-secondary truncate">
                {(rx.medicines?.length || rx.medications?.length || 0)} Meds • By {rx.doctorName}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default PrescriptionHubScreen;
