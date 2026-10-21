import React, { useState } from 'react';
import { 
  FolderClock, 
  Search, 
  Filter, 
  FileText, 
  Activity, 
  Image as ImageIcon, 
  Syringe, 
  CheckCircle2, 
  Download, 
  Eye, 
  Calendar, 
  Building2, 
  ShieldCheck, 
  PlusCircle, 
  Sparkles,
  X,
  Printer
} from 'lucide-react';
import { ScreenId, Patient, MedicalRecordItem } from '../types';
import { mockOldRecords, mockLabReports } from '../data/mockData';

interface OldRecordsScreenProps {
  onNavigate: (screen: ScreenId) => void;
  selectedPatient: Patient;
}

export const OldRecordsScreen: React.FC<OldRecordsScreenProps> = ({
  onNavigate,
  selectedPatient
}) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecordItem | null>(null);

  const filteredRecords = mockOldRecords.filter(rec => {
    const matchesTab = 
      activeTab === 'all' || 
      rec.type.toLowerCase() === activeTab.toLowerCase();
    const matchesSearch = 
      rec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.facility.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.details.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getRecordIcon = (type: string) => {
    switch (type) {
      case 'Prescription': return FileText;
      case 'Lab Report': return Activity;
      case 'Imaging': return ImageIcon;
      case 'Vaccination': return Syringe;
      default: return Building2;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-md">5th</span>
            <span className="text-xs font-bold text-secondary uppercase tracking-wider">
              Inside Old Records • Longitudinal Health Vault
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 font-display mt-1">
            Historical Records: {selectedPatient.name}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            ABDM Milestones 1–3 certified longitudinal clinical vault • ABHA: {selectedPatient.abhaId}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('new-prescription')}
            className="bg-primary hover:bg-primary-light active:scale-95 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5 transition-all"
          >
            <PlusCircle className="w-4 h-4 text-secondary-fixed" />
            <span>Write New Rx (6th)</span>
          </button>
          <button
            onClick={() => onNavigate('submit-open-chart')}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold px-3.5 py-2.5 rounded-xl flex items-center gap-1.5 transition-all"
          >
            <Activity className="w-4 h-4 text-secondary" />
            <span>Open Chart (4th)</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All Records' },
            { id: 'prescription', label: 'Prescriptions' },
            { id: 'lab report', label: 'Lab Panels' },
            { id: 'imaging', label: 'Imaging & Echo' },
            { id: 'discharge summary', label: 'Inpatient Summaries' },
            { id: 'vaccination', label: 'Vaccines' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search records, tests, facilities..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-secondary focus:bg-white"
          />
        </div>

      </div>

      {/* Historical Records Timeline Grid */}
      <div className="space-y-4">
        {filteredRecords.map((record) => {
          const Icon = getRecordIcon(record.type);

          return (
            <div
              key={record.id}
              className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all space-y-3"
            >
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-teal-50 text-secondary flex items-center justify-center font-bold text-xs flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-bold text-slate-900">{record.title}</h3>
                      <span className="text-xs font-bold text-primary bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                        {record.tag}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {record.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5" />
                        {record.facility}
                      </span>
                      <span>•</span>
                      <span>Doctor: <strong className="text-slate-700">{record.doctor}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{record.status}</span>
                  </span>
                </div>
              </div>

              {/* Record Summary Body */}
              <p className="text-xs text-slate-700 leading-relaxed font-mono bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                {record.details}
              </p>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-slate-400 font-mono">
                  Record ID: {record.id}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedRecord(record)}
                    className="px-3 py-1.5 text-xs font-bold text-primary bg-slate-100 hover:bg-primary hover:text-white rounded-xl transition-all flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect Details</span>
                  </button>
                  <button
                    onClick={() => alert(`Downloading signed PDF export for ${record.title}`)}
                    className="p-1.5 text-slate-500 hover:text-primary hover:bg-slate-100 rounded-xl transition-all"
                    title="Download Verified File"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Record Inspection Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">
                  Verified Clinical Document
                </span>
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  {selectedRecord.title}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedRecord(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400 block font-semibold">Date of Examination</span>
                  <span className="font-bold text-slate-800">{selectedRecord.date}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Facility</span>
                  <span className="font-bold text-slate-800">{selectedRecord.facility}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Attending Clinician</span>
                  <span className="font-bold text-slate-800">{selectedRecord.doctor}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Document Category</span>
                  <span className="font-bold text-primary">{selectedRecord.type}</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 mb-1">Clinical Findings & Summary:</h4>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px] leading-relaxed">
                  {selectedRecord.details}
                </div>
              </div>

              {/* Lab Panel breakdown if Lab Report */}
              {selectedRecord.type === 'Lab Report' && mockLabReports[0] && (
                <div>
                  <h4 className="font-bold text-slate-800 mb-1">Detailed Parameter Breakdown:</h4>
                  <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 text-[11px]">
                    {mockLabReports[0].results.slice(0, 5).map((res, i) => (
                      <div key={i} className="p-2 flex items-center justify-between">
                        <span className="font-medium text-slate-700">{res.parameter}</span>
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${res.isAbnormal ? 'text-emergency' : 'text-slate-900'}`}>
                            {res.value} {res.unit}
                          </span>
                          <span className="text-slate-400 text-[10px]">({res.normalRange})</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert('ABHA Encrypted Document Downloaded');
                  setSelectedRecord(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-primary text-white hover:bg-primary-light flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download ABDM Record</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default OldRecordsScreen;
