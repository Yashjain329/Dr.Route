import React from 'react';
import { 
  Users, 
  Activity, 
  FileText, 
  AlertTriangle, 
  Clock, 
  ArrowRight, 
  CheckCircle, 
  HeartPulse, 
  PlusCircle, 
  ShieldAlert, 
  Search,
  Sparkles,
  TrendingUp,
  FolderClock,
  Radio,
  MapPin,
  Calendar
} from 'lucide-react';
import { ScreenId, Patient } from '../types';
import { mockDoctor, mockPatients, mockOutbreaks } from '../data/mockData';

interface DashboardScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onSelectPatient: (patientId: string) => void;
  selectedPatient: Patient;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  onNavigate,
  onSelectPatient,
  selectedPatient
}) => {
  return (
    <div className="space-y-6">
      
      {/* Top Welcome & Triage Announcement Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-primary-container to-slate-900 text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="bg-secondary/30 text-secondary-fixed text-xs font-bold px-3 py-1 rounded-full border border-secondary/40 flex items-center gap-1.5 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                OPD Clinical Session Active
              </span>
              <span className="text-xs text-slate-300 font-medium">
                Delhi NCR • Medanta Heart Institute
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white">
              Namaste, {mockDoctor.name} 🩺
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              You have <strong className="text-secondary-fixed">6 patients waiting</strong> in OPD, 
              <strong className="text-amber-300"> 1 acute triage case</strong> in ER, and 
              <strong className="text-rose-300"> 1 regional Dengue alert</strong> under active surveillance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => onNavigate('new-prescription')}
              className="bg-secondary hover:bg-secondary-light active:scale-95 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Write New Rx</span>
            </button>
            <button
              onClick={() => onNavigate('disease-epi')}
              className="bg-white/10 hover:bg-white/20 active:scale-95 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl border border-white/20 backdrop-blur-md flex items-center gap-2 transition-all"
            >
              <ShieldAlert className="w-4 h-4 text-amber-300" />
              <span>Outbreak Radar</span>
            </button>
          </div>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 4 Clinical KPI Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1 */}
        <div 
          onClick={() => onNavigate('prescription')}
          className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Today's Patients</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 font-display">24 Scheduled</div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
              <span className="font-bold text-emerald-600">6 waiting</span> • 1 in consultation
            </div>
          </div>
        </div>

        {/* Metric 2 */}
        <div 
          onClick={() => onNavigate('submit-open-chart')}
          className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Prescriptions</span>
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-secondary flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 font-display">142 Regimens</div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
              <span className="font-bold text-emerald-600">94.2%</span> avg. compliance score
            </div>
          </div>
        </div>

        {/* Metric 3 */}
        <div 
          onClick={() => onNavigate('disease-epi')}
          className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Surveillance Alert</span>
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-emergency flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-emergency font-display">Level 2 Surge</div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
              Dengue (DENV-2) • <span className="font-semibold text-rose-600">14.8k cases</span>
            </div>
          </div>
        </div>

        {/* Metric 4 */}
        <div 
          onClick={() => onNavigate('drug-trends')}
          className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">AMR Watchlist</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 font-display">38.6% Resistance</div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
              Azithromycin • <span className="text-amber-600 font-medium">Antibiotic stewardship</span>
            </div>
          </div>
        </div>

      </div>

      {/* Main Grid: Patient Queue (Left 2/3) + Real-time Telemetry & Quick Bento (Right 1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Today's Clinical Patient Queue */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
            
            {/* Queue Header */}
            <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
                  <Clock className="w-4 h-4 text-secondary" />
                  <span>Today's Consultation & Triage Queue</span>
                </h2>
                <p className="text-xs text-slate-500">
                  Select any patient to examine history, issue new Rx, or open clinical chart
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                  5 Patients Loaded
                </span>
              </div>
            </div>

            {/* Patients List */}
            <div className="divide-y divide-slate-100">
              {mockPatients.map((patient) => {
                const isSelected = selectedPatient.id === patient.id;

                return (
                  <div 
                    key={patient.id}
                    className={`p-4 sm:p-5 transition-colors ${
                      isSelected ? 'bg-teal-50/50 border-l-4 border-l-secondary' : 'hover:bg-slate-50/80'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      
                      {/* Patient Identity */}
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                          patient.triagePriority === 'Emergency'
                            ? 'bg-rose-100 text-rose-700'
                            : patient.triagePriority === 'Urgent'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {patient.bloodGroup}
                        </div>

                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-sm font-bold text-slate-900">{patient.name}</h3>
                            <span className="text-xs text-slate-500">
                              {patient.age}y • {patient.gender}
                            </span>
                            <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded border border-slate-200">
                              ABHA: {patient.abhaId}
                            </span>
                          </div>

                          <p className="text-xs text-slate-600 mt-1 line-clamp-1">
                            <strong className="text-slate-700">Complaint:</strong> {patient.chiefComplaint}
                          </p>

                          <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-500">
                            <span>BP: <strong className="text-slate-800">{patient.currentVitals.bloodPressure}</strong></span>
                            <span>HR: <strong className="text-slate-800">{patient.currentVitals.heartRate} bpm</strong></span>
                            <span>SpO2: <strong className="text-slate-800">{patient.currentVitals.spo2}%</strong></span>
                          </div>
                        </div>
                      </div>

                      {/* Actions for this patient */}
                      <div className="flex items-center gap-1.5 self-end sm:self-center flex-shrink-0">
                        <button
                          onClick={() => {
                            onSelectPatient(patient.id);
                            onNavigate('submit-open-chart');
                          }}
                          className="px-2.5 py-1.5 text-xs font-bold text-primary bg-slate-100 hover:bg-primary hover:text-white rounded-xl transition-all flex items-center gap-1"
                          title="Open Patient Chart (4th)"
                        >
                          <Activity className="w-3.5 h-3.5" />
                          <span>Open Chart</span>
                        </button>

                        <button
                          onClick={() => {
                            onSelectPatient(patient.id);
                            onNavigate('new-prescription');
                          }}
                          className="px-2.5 py-1.5 text-xs font-bold text-secondary-teal bg-teal-50 hover:bg-secondary hover:text-white rounded-xl transition-all flex items-center gap-1"
                          title="Write New Rx (6th)"
                        >
                          <PlusCircle className="w-3.5 h-3.5" />
                          <span>New Rx</span>
                        </button>

                        <button
                          onClick={() => {
                            onSelectPatient(patient.id);
                            onNavigate('old-records');
                          }}
                          className="px-2.5 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-all"
                          title="View Records (5th)"
                        >
                          <FolderClock className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

            {/* View All Prescriptions Link */}
            <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
              <button
                onClick={() => onNavigate('prescription')}
                className="text-xs font-bold text-secondary hover:underline flex items-center justify-center gap-1 mx-auto"
              >
                <span>Go to Prescription Management Hub (3rd)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

        {/* Right Column: Active Patient Live Telemetry + Quick Bento */}
        <div className="space-y-4">
          
          {/* Active Patient Vitals Card */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-emerald-500 animate-pulse" />
                <h3 className="text-sm font-bold text-slate-900 font-display">Selected Patient Stream</h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                PulseBand v2 Sync
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70">
              <div className="text-xs font-bold text-slate-800">{selectedPatient.name}</div>
              <div className="text-[11px] text-slate-500">{selectedPatient.abhaId} • {selectedPatient.gender}, {selectedPatient.age}y</div>
              
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">Blood Pressure</span>
                  <span className="text-sm font-bold text-slate-900 font-display">{selectedPatient.currentVitals.bloodPressure}</span>
                  <span className="text-[10px] text-slate-400 block">mmHg</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">Heart Rate</span>
                  <span className="text-sm font-bold text-slate-900 font-display">{selectedPatient.currentVitals.heartRate}</span>
                  <span className="text-[10px] text-slate-400 block">bpm (Resting)</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">SpO2 Oxygen</span>
                  <span className="text-sm font-bold text-emerald-600 font-display">{selectedPatient.currentVitals.spo2}%</span>
                  <span className="text-[10px] text-slate-400 block">Optimal</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">Blood Glucose</span>
                  <span className="text-sm font-bold text-slate-900 font-display">{selectedPatient.currentVitals.glucose}</span>
                  <span className="text-[10px] text-slate-400 block">mg/dL (Fasting)</span>
                </div>
              </div>
            </div>

            {/* Quick Links inside patient */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => onNavigate('health-insights')}
                className="p-2.5 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Insights (7th)</span>
              </button>
              <button
                onClick={() => onNavigate('old-records')}
                className="p-2.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <FolderClock className="w-3.5 h-3.5" />
                <span>Old Records (5th)</span>
              </button>
            </div>
          </div>

          {/* Regional Outbreak Alert Snippet */}
          <div className="bg-rose-50/70 border border-rose-200/80 p-5 rounded-3xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-emergency text-xs font-bold uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                <span>Epidemiology Sentinel</span>
              </div>
              <span className="text-[10px] bg-rose-200 text-rose-800 font-bold px-2 py-0.5 rounded-full">
                Active Surge
              </span>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900">Dengue Virus (DENV-2)</h4>
              <p className="text-xs text-slate-600 mt-0.5">
                14,820 cases logged in North & South India. ICU bed stress reaching 42% in public hospitals.
              </p>
            </div>

            <button
              onClick={() => onNavigate('disease-epi')}
              className="w-full bg-emergency hover:bg-emergency-dark text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Explore Disease Epidemiology (8th)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

export default DashboardScreen;
