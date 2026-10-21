import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Printer, 
  Download, 
  Search, 
  Filter, 
  Calendar, 
  Stethoscope, 
  ChevronRight, 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink,
  ShieldAlert,
  Layers,
  Heart,
  Wind,
  FolderOpen
} from 'lucide-react';
import { ScreenId, Patient } from '../types';

interface OldRecordsScreenProps {
  onNavigate: (screen: ScreenId) => void;
  selectedPatient: Patient;
}

export const OldRecordsScreen: React.FC<OldRecordsScreenProps> = ({
  onNavigate,
  selectedPatient,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedRecordModal, setSelectedRecordModal] = useState<any | null>(null);

  const activeTreatments = [
    {
      id: 'ACT-01',
      dept: 'Cardiology & Vascular Medicine',
      icon: Heart,
      condition: 'Stage 2 Essential Hypertension & Angina Pectoris',
      startDate: '12 Jan 2025',
      duration: 'Ongoing (3 Months)',
      doctor: 'Dr. Ritesh Khandelwal, MD',
      status: 'Active Monitoring',
      medicines: ['Amlodipine 5mg', 'Telmisartan 40mg', 'Atorvastatin 20mg'],
      notes: 'Blood pressure stabilised to 132/84 mmHg. Next ECG and 2D-Echo scheduled.',
    },
    {
      id: 'ACT-02',
      dept: 'Pulmonology & Respiratory Care',
      icon: Wind,
      condition: 'Chronic Bronchitis with Mild Asthma Exacerbation',
      startDate: '02 Feb 2025',
      duration: 'Ongoing (6 Weeks)',
      doctor: 'Dr. Priya Nair, MD',
      status: 'Active Inhaler Protocol',
      medicines: ['Budesonide + Formoterol Inhaler (200/6mcg)', 'Levocetirizine 5mg'],
      notes: 'Peak expiratory flow rate 420 L/min. Sputum clear, wheezing subsided.',
    },
  ];

  const archivedRecords = [
    {
      id: 'ARC-101',
      dept: 'Orthopedics & Joint Care',
      condition: 'Acute Right Knee Ligament Strain (Grade 1)',
      period: '01 Nov 2024 - 15 Dec 2024 (6 Weeks)',
      doctor: 'Dr. Rajesh Goel, MS (Ortho)',
      outcome: 'Resolved • Full Mobility Restored',
      medicines: ['Aceclofenac + Paracetamol', 'Collagen Peptide Sachets'],
      investigations: ['Knee MRI (No meniscal tear)', 'Weight-bearing X-ray'],
    },
    {
      id: 'ARC-102',
      dept: 'Gastroenterology',
      condition: 'Acute Infective Gastroenteritis & Mild Dehydration',
      period: '14 Aug 2024 - 28 Aug 2024 (2 Weeks)',
      doctor: 'Dr. Ananya Sen, MD (DM Gastro)',
      outcome: 'Full Recovery • Stool Culture Sterile',
      medicines: ['ORS Solution', 'Rifaximin 400mg', 'Probiotics'],
      investigations: ['Routine Stool Exam', 'Serum Electrolytes'],
    },
    {
      id: 'ARC-103',
      dept: 'ENT & Head-Neck Surgery',
      condition: 'Acute Purulent Sinusitis & Rhinitis',
      period: '10 Mar 2024 - 24 Mar 2024 (2 Weeks)',
      doctor: 'Dr. Sameer Khan, MS (ENT)',
      outcome: 'Infection Cleared • Nasal Airway Patent',
      medicines: ['Azithromycin 500mg', 'Fluticasone Nasal Spray', 'Saline Wash'],
      investigations: ['Nasal Endoscopy', 'X-Ray PNS Water View'],
    },
    {
      id: 'ARC-104',
      dept: 'Dermatology & Allergy',
      condition: 'Acute Contact Urticaria & Dermatitis',
      period: '18 Sep 2023 - 02 Oct 2023 (14 Days)',
      doctor: 'Dr. Meenakshi Sundaram, MD',
      outcome: 'Allergen Avoidance Protocol Initiated',
      medicines: ['Fexofenadine 180mg', 'Calamine Lotion', 'Hydrocortisone 1%'],
      investigations: ['Skin Prick Allergy Panel', 'Total Serum IgE (340 IU/mL)'],
    },
  ];

  const filteredArchived = archivedRecords.filter(rec => {
    if (selectedDept !== 'All' && !rec.dept.toLowerCase().includes(selectedDept.toLowerCase())) return false;
    if (searchTerm && !rec.condition.toLowerCase().includes(searchTerm.toLowerCase()) && !rec.dept.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in py-2 pb-16">
      
      {/* Top Header & Breadcrumb Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/60 shadow-clinical">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('prescription')}
            className="p-2 rounded-xl text-outline hover:text-on-surface hover:bg-surface-container-low transition-colors"
            title="Back to Prescription Hub"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-secondary uppercase tracking-wider">
                Old Records Archive
              </span>
            </div>
            <h1 className="text-xl font-extrabold text-primary font-headline">
              Patient Old Records &amp; Treatment History
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-outline-variant text-on-surface-variant hover:bg-surface-container-low text-xs font-mono font-medium transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Summary</span>
          </button>
          <button 
            onClick={() => alert('HL7 EHR Treatment Archive Exported.')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary text-on-primary text-xs font-mono font-bold hover:bg-primary-container transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export HL7/EHR</span>
          </button>
        </div>
      </div>

      {/* Patient Profile Strip (Rohit Mehta, PID: P-1028) */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/70 shadow-clinical p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary-container text-on-primary font-mono font-bold flex items-center justify-center text-xl shadow-xs">
              RM
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-extrabold text-on-surface font-headline tracking-tight">
                  Rohit Mehta
                </h2>
                <span className="bg-secondary-container text-on-secondary-container text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase">
                  Verified Patient
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-on-surface-variant pt-1">
                <span>Patient ID: <strong className="text-primary">P-1028</strong></span>
                <span>•</span>
                <span>Age/Gender: <strong>34 Yrs, Male</strong></span>
                <span>•</span>
                <span>Blood Group: <strong className="text-error">B+</strong></span>
              </div>
            </div>
          </div>

          {/* Active Allergies Pill List */}
          <div className="flex flex-col md:items-end gap-1.5 text-xs font-mono">
            <span className="text-outline font-semibold uppercase text-[10px] tracking-wider flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-error" />
              <span>Active Hypersensitivity / Allergies:</span>
            </span>
            <div className="flex items-center gap-2">
              <span className="bg-error-container text-on-error-container font-bold px-2.5 py-0.5 rounded-full text-[11px] border border-error/30">
                Penicillin G
              </span>
              <span className="bg-error-container text-on-error-container font-bold px-2.5 py-0.5 rounded-full text-[11px] border border-error/30">
                NSAIDs
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: Active Patient Treatments */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-outline-variant/40 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-primary font-headline">
                Active Patient Treatments
              </h3>
              <span className="bg-primary text-primary-fixed text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
                2 Active Protocols
              </span>
            </div>
            <p className="text-xs font-body text-on-surface-variant">
              Real-time Regimen Synchronization Active across departments
            </p>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse hidden sm:inline-block"></span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeTreatments.map((act) => {
            const Icon = act.icon;
            return (
              <div key={act.id} className="bg-surface-container-low/60 rounded-xl p-5 border border-outline-variant/70 space-y-3 hover:border-primary transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono font-bold text-outline uppercase tracking-wider">{act.id} • {act.dept}</div>
                      <h4 className="text-sm font-bold text-on-surface font-headline">{act.condition}</h4>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded">
                    {act.status}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs font-mono text-on-surface-variant bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/50">
                  <div className="flex items-center justify-between">
                    <span className="text-outline">Treatment Duration:</span>
                    <span className="font-bold text-on-surface">{act.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-outline">Started Date:</span>
                    <span>{act.startDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-outline">Attending Doctor:</span>
                    <span className="font-semibold text-primary">{act.doctor}</span>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <span className="text-[11px] font-mono font-bold text-outline">Active Prescribed Regimen:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {act.medicines.map((m, mIdx) => (
                      <span key={mIdx} className="bg-surface-container-lowest px-2 py-0.5 rounded border border-outline-variant text-[11px] font-mono font-semibold text-primary">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-outline-variant/40 text-xs">
                  <span className="text-[11px] font-mono text-outline">{act.notes}</span>
                  <button
                    onClick={() => setSelectedRecordModal(act)}
                    className="flex items-center gap-1 text-primary-container hover:underline font-bold font-mono text-xs"
                  >
                    <span>View Details</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: Treatment Completed - Archived Records */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-outline-variant/40 pb-3">
          <div>
            <h3 className="text-base font-extrabold text-primary font-headline">
              Treatment Completed - Archived Records
            </h3>
            <p className="text-xs font-body text-on-surface-variant">
              12 Archived Cases • Past clinical episodes, discharge summaries, and therapeutic outcomes
            </p>
          </div>

          {/* Department Filter Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-outline">Filter:</span>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-outline-variant text-xs font-mono bg-surface-container-low text-on-surface focus:outline-none"
            >
              <option value="All">All Departments</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Gastroenterology">Gastroenterology</option>
              <option value="ENT">ENT</option>
              <option value="Dermatology">Dermatology</option>
            </select>
          </div>
        </div>

        {/* Search Bar for Archived Records */}
        <div className="relative">
          <Search className="w-4 h-4 text-outline absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search past conditions, doctors, treatments, diagnostic tests..."
            className="w-full pl-9 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-xl text-xs font-mono text-on-surface focus:outline-none focus:border-primary"
          />
        </div>

        {/* Archived Records List */}
        <div className="space-y-3">
          {filteredArchived.map((rec) => (
            <div key={rec.id} className="bg-surface-container-low/50 hover:bg-surface-container-low rounded-xl p-4 border border-outline-variant/60 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold bg-surface-container text-outline px-2 py-0.5 rounded">
                    {rec.id}
                  </span>
                  <span className="text-xs font-mono font-bold text-secondary">{rec.dept}</span>
                  <span className="text-xs text-outline">•</span>
                  <span className="text-xs font-mono text-outline">{rec.period}</span>
                </div>
                <h4 className="text-sm font-bold text-on-surface font-headline">{rec.condition}</h4>
                <div className="text-xs font-mono text-on-surface-variant flex flex-wrap gap-x-4">
                  <span>Attending: <strong>{rec.doctor}</strong></span>
                  <span className="text-tertiary font-bold">Outcome: {rec.outcome}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end md:self-center">
                <button
                  onClick={() => alert(`Opening Discharge Summary for ${rec.condition}`)}
                  className="px-3 py-1.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-xs font-mono font-medium hover:bg-surface-container text-on-surface transition-colors"
                >
                  Summary
                </button>
                <button
                  onClick={() => setSelectedRecordModal(rec)}
                  className="px-3.5 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-mono font-bold hover:bg-primary-container transition-colors shadow-2xs"
                >
                  View Case
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Detailed Record View */}
      {selectedRecordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-surface-container-lowest max-w-xl w-full rounded-2xl border border-outline-variant p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-outline-variant/40 pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-primary bg-primary-fixed px-2 py-0.5 rounded">
                  {selectedRecordModal.id}
                </span>
                <h3 className="text-lg font-bold text-on-surface font-headline mt-1">
                  {selectedRecordModal.condition}
                </h3>
              </div>
              <button
                onClick={() => setSelectedRecordModal(null)}
                className="p-1 rounded-lg hover:bg-surface-container-low text-outline"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-surface-container-low space-y-1">
                <div><strong>Department:</strong> {selectedRecordModal.dept}</div>
                <div><strong>Consultant:</strong> {selectedRecordModal.doctor}</div>
                <div><strong>Duration/Period:</strong> {selectedRecordModal.duration || selectedRecordModal.period}</div>
              </div>

              {selectedRecordModal.medicines && (
                <div>
                  <div className="font-bold text-on-surface mb-1">Prescribed Pharmacotherapy:</div>
                  <ul className="list-disc pl-5 space-y-0.5 text-on-surface-variant">
                    {selectedRecordModal.medicines.map((m: string, idx: number) => (
                      <li key={idx}>{m}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedRecordModal.investigations && (
                <div>
                  <div className="font-bold text-on-surface mb-1">Diagnostic Investigations:</div>
                  <ul className="list-disc pl-5 space-y-0.5 text-on-surface-variant">
                    {selectedRecordModal.investigations.map((inv: string, idx: number) => (
                      <li key={idx}>{inv}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedRecordModal(null)}
                className="px-5 py-2 rounded-xl bg-primary text-on-primary font-mono font-bold text-xs shadow-xs"
              >
                Close Archive View
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default OldRecordsScreen;
