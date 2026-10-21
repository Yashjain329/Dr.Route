import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  PlusCircle, 
  Activity, 
  FolderClock, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Download, 
  Printer, 
  ChevronRight,
  ShieldCheck,
  Calendar,
  Pill
} from 'lucide-react';
import { ScreenId, Prescription, Patient } from '../types';
import { mockPrescriptions, mockPatients } from '../data/mockData';

interface PrescriptionHubScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onSelectPatient: (patientId: string) => void;
  prescriptions?: Prescription[];
}

export const PrescriptionHubScreen: React.FC<PrescriptionHubScreenProps> = ({
  onNavigate,
  onSelectPatient,
  prescriptions = mockPrescriptions
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPrescriptions = prescriptions.filter(rx => {
    const matchesFilter = filterStatus === 'all' || rx.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch = 
      rx.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rx.primaryDiagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rx.icd10Code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rx.medications.some(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Header with Title & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-md">3rd</span>
            <span className="text-xs font-bold text-secondary uppercase tracking-wider">Prescription Suite</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 font-display mt-1">
            Prescription Management Hub
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage active e-prescriptions, clinical protocols, adherence tracking, and patient charting
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('new-prescription')}
            className="bg-primary hover:bg-primary-light active:scale-95 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 transition-all"
          >
            <PlusCircle className="w-4 h-4 text-secondary-fixed" />
            <span>Create New Prescription (6th)</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
        
        {/* Status Filters */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All Regimens', count: prescriptions.length },
            { id: 'active', label: 'Active', count: prescriptions.filter(p => p.status === 'Active').length },
            { id: 'needs renewal', label: 'Needs Renewal', count: prescriptions.filter(p => p.status === 'Needs Renewal').length }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                filterStatus === tab.id
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                filterStatus === tab.id ? 'bg-white/20 text-white' : 'bg-white text-slate-500'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by drug, diagnosis, patient..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-secondary focus:bg-white"
          />
        </div>

      </div>

      {/* Prescriptions List */}
      <div className="space-y-4">
        {filteredPrescriptions.map((rx) => {
          return (
            <div 
              key={rx.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-6 hover:shadow-md transition-all space-y-4"
            >
              {/* Header row: Patient details + Status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-teal-50 text-secondary flex items-center justify-center font-bold text-xs flex-shrink-0">
                    <Pill className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-bold text-slate-900">{rx.patientName}</h3>
                      <span className="text-xs text-slate-500">{rx.age}y • {rx.gender}</span>
                      <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                        {rx.id}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <span>Prescribed: {rx.date}</span>
                      <span>•</span>
                      <span>By: <strong className="text-slate-700">{rx.doctorName}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                    rx.status === 'Active'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                    {rx.status}
                  </span>

                  <span className="text-xs font-bold bg-teal-50 text-secondary-teal px-2.5 py-1 rounded-full border border-teal-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-secondary" />
                    <span>Adherence: {rx.adherenceRate}%</span>
                  </span>
                </div>

              </div>

              {/* Diagnosis & ICD-10 */}
              <div className="flex items-center gap-2 flex-wrap text-xs">
                <span className="font-bold text-slate-700">Diagnosis:</span>
                <span className="text-slate-900 font-medium">{rx.primaryDiagnosis}</span>
                <span className="bg-primary/10 text-primary font-mono text-[10px] font-bold px-2 py-0.5 rounded-md">
                  ICD-10: {rx.icd10Code}
                </span>
                {rx.secondaryDiagnosis && (
                  <span className="text-slate-500 text-[11px]">
                    + {rx.secondaryDiagnosis}
                  </span>
                )}
              </div>

              {/* Prescribed Drugs Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {rx.medications.map((med) => (
                  <div key={med.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{med.name}</span>
                      <span className="text-[10px] font-bold text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                        {med.dosage}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-600">
                      Freq: <strong className="text-secondary-teal">{med.frequency}</strong> • {med.timing}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Duration: {med.duration} • Route: {med.route}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1 text-[11px] text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Digital Hash: {rx.digitalSignatureHash.substring(0, 16)}...</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onSelectPatient(rx.patientId);
                      onNavigate('submit-open-chart');
                    }}
                    className="bg-primary hover:bg-primary-light active:scale-95 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 shadow-xs transition-all"
                  >
                    <Activity className="w-3.5 h-3.5 text-secondary-fixed" />
                    <span>Submit & Open Chart (4th)</span>
                  </button>

                  <button
                    onClick={() => {
                      onSelectPatient(rx.patientId);
                      onNavigate('old-records');
                    }}
                    className="bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all"
                  >
                    <FolderClock className="w-3.5 h-3.5" />
                    <span>Old Records (5th)</span>
                  </button>

                  <button
                    onClick={() => {
                      onSelectPatient(rx.patientId);
                      onNavigate('health-insights');
                    }}
                    className="bg-purple-50 hover:bg-purple-100 active:scale-95 text-purple-700 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Insights (7th)</span>
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};

export default PrescriptionHubScreen;
