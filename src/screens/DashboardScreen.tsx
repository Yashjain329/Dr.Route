import React, { useState } from 'react';
import { 
  Users, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Calendar, 
  Search, 
  ArrowRight, 
  Filter, 
  FileText, 
  Activity, 
  Sparkles,
  Stethoscope,
  ChevronRight,
  Flame,
  Droplet
} from 'lucide-react';
import { ScreenId, Patient } from '../types';

interface DashboardScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onSelectPatient: (patientId: string) => void;
  selectedPatient: Patient;
}

interface QueuePatient {
  token: string;
  id: string;
  initials: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  type: string;
  time: string;
  status: 'Waiting' | 'In-Consultation' | 'Priority' | 'Completed';
  actionText: string;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  onNavigate,
  onSelectPatient,
  selectedPatient,
}) => {
  const [filter, setFilter] = useState<'All' | 'Waiting' | 'In-Consultation' | 'Completed'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSosModal, setShowSosModal] = useState(false);

  const queuePatients: QueuePatient[] = [
    {
      token: 'OPD-021',
      id: 'p1',
      initials: 'AS',
      name: 'Aarav Sharma',
      age: 28,
      gender: 'Male',
      type: 'General OPD',
      time: '09:30 AM',
      status: 'Waiting',
      actionText: 'Open',
    },
    {
      token: 'OPD-022',
      id: 'p2',
      initials: 'PV',
      name: 'Priya Verma',
      age: 45,
      gender: 'Female',
      type: 'Follow-up',
      time: '09:45 AM',
      status: 'In-Consultation',
      actionText: 'Resume',
    },
    {
      token: 'OPD-023',
      id: 'p3',
      initials: 'RS',
      name: 'Rahul Singh',
      age: 34,
      gender: 'Male',
      type: 'Chronic Care',
      time: '10:00 AM',
      status: 'Waiting',
      actionText: 'Call Next',
    },
    {
      token: 'OPD-024',
      id: 'p4',
      initials: 'NJ',
      name: 'Neha Joshi',
      age: 52,
      gender: 'Female',
      type: 'Emergency Triage',
      time: '10:15 AM',
      status: 'Priority',
      actionText: 'Attend',
    },
    {
      token: 'OPD-025',
      id: 'p5',
      initials: 'SY',
      name: 'Suresh Yadav',
      age: 61,
      gender: 'Male',
      type: 'Routine Review',
      time: '10:30 AM',
      status: 'Waiting',
      actionText: 'Open',
    },
    {
      token: 'OPD-026',
      id: 'p6',
      initials: 'PM',
      name: 'Pooja Mehta',
      age: 23,
      gender: 'Female',
      type: 'Lab Follow-up',
      time: '10:45 AM',
      status: 'Completed',
      actionText: 'Summary',
    },
  ];

  const filteredQueue = queuePatients.filter(p => {
    if (filter !== 'All' && p.status !== filter) return false;
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase()) && !p.token.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handlePatientAction = (patient: QueuePatient) => {
    onSelectPatient(patient.id);
    onNavigate('prescription');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Banner Greeting */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold text-primary font-headline tracking-tight">
            OPD Dashboard
          </h1>
          <p className="text-sm font-body text-on-surface-variant">
            Good morning, <span className="font-semibold text-on-surface">Dr. Deshraj Burdak!</span> Here's your today's OPD clinical overview.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-low border border-outline-variant/60 text-on-surface">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            <span>Wed, 16 Apr 2025</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-low border border-outline-variant/60 text-on-surface">
            <Clock className="w-3.5 h-3.5 text-secondary" />
            <span>10:24 AM EST</span>
          </div>
        </div>
      </div>

      {/* 3 KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Card 1: Total Patients */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical p-5 flex items-center justify-between hover:shadow-clinical-md transition-shadow">
          <div className="space-y-1">
            <div className="text-xs font-mono font-medium text-on-surface-variant uppercase tracking-wider">
              Total Patients Today
            </div>
            <div className="text-3xl font-extrabold font-mono text-primary">
              52
            </div>
            <div className="text-[11px] font-body text-outline">
              Registered in Hospital OPD
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-primary-fixed/40 text-primary flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Waiting in Queue */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical p-5 flex items-center justify-between hover:shadow-clinical-md transition-shadow">
          <div className="space-y-1">
            <div className="text-xs font-mono font-medium text-on-surface-variant uppercase tracking-wider">
              Waiting in Queue
            </div>
            <div className="text-3xl font-extrabold font-mono text-secondary">
              08
            </div>
            <div className="text-[11px] font-body text-outline">
              Currently in Waiting Area 4B
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-secondary-container/60 text-on-secondary-container flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: Consultations Completed */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical p-5 flex items-center justify-between hover:shadow-clinical-md transition-shadow">
          <div className="space-y-1">
            <div className="text-xs font-mono font-medium text-on-surface-variant uppercase tracking-wider">
              Consultations Completed
            </div>
            <div className="text-3xl font-extrabold font-mono text-tertiary">
              36
            </div>
            <div className="text-[11px] font-body text-outline">
              Completed Today • On Target
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-tertiary-fixed/40 text-tertiary flex items-center justify-center">
            <Stethoscope className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Emergency Blood SOS Banner (Critical Alert) */}
      <div className="bg-gradient-to-r from-error/15 via-error/10 to-transparent border-2 border-error/50 rounded-2xl p-5 shadow-clinical flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-error text-on-error flex items-center justify-center flex-shrink-0 shadow-sos animate-pulse">
            <Droplet className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-error font-headline">
                Emergency Blood SOS
              </h2>
              <span className="bg-error text-on-error text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase">
                Critical Alert
              </span>
            </div>
            <p className="text-xs font-body text-on-surface">
              Direct hospital blood bank requisition &amp; immediate O-Negative / critical cross-match emergency dispatch.
            </p>
            <div className="flex items-center gap-3 text-[11px] font-mono text-on-surface-variant pt-0.5">
              <span>Urgent In-Stock:</span>
              <span className="font-bold text-error bg-error-container/60 px-2 py-0.5 rounded">
                O- (3 Units)
              </span>
              <span className="font-bold text-on-surface bg-surface-container px-2 py-0.5 rounded">
                B+ (Low - 5 Units)
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowSosModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-error hover:bg-error/90 text-on-error text-xs font-mono font-bold shadow-sos transition-all active:scale-95 whitespace-nowrap"
        >
          <Flame className="w-4 h-4 animate-bounce" />
          <span>Trigger Blood SOS</span>
        </button>
      </div>

      {/* Today's OPD Queue Section */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical overflow-hidden">
        
        {/* Table Header Controls */}
        <div className="p-5 border-b border-outline-variant/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-primary font-headline flex items-center gap-2">
              <span>Today's OPD Queue</span>
              <span className="text-xs font-mono font-semibold text-outline bg-surface-container px-2 py-0.5 rounded-full">
                {filteredQueue.length} Active Patients
              </span>
            </h2>
            <p className="text-xs font-body text-on-surface-variant">
              Token-based queue priority sequence with real-time status updates
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Filter Pills */}
            {(['All', 'Waiting', 'In-Consultation', 'Completed'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                  filter === tab
                    ? 'bg-primary-container text-on-primary font-bold shadow-xs'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Queue Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-surface-container-low/70 border-b border-outline-variant/50 text-[11px] font-mono uppercase tracking-wider text-outline">
                <th className="py-3 px-4 font-bold">Token No.</th>
                <th className="py-3 px-4 font-bold">Patient Details</th>
                <th className="py-3 px-4 font-bold">Time</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30 font-body">
              {filteredQueue.map((p) => {
                const statusStyles = {
                  'Waiting': 'bg-primary-fixed/40 text-primary border-primary/20',
                  'In-Consultation': 'bg-secondary-container text-on-secondary-container border-secondary/30',
                  'Priority': 'bg-error-container text-on-error-container border-error/30 font-bold',
                  'Completed': 'bg-surface-container text-outline border-outline-variant/30',
                }[p.status];

                return (
                  <tr key={p.token} className="hover:bg-surface-container-low/40 transition-colors">
                    
                    {/* Token */}
                    <td className="py-3.5 px-4 font-mono font-bold text-primary">
                      {p.token}
                    </td>

                    {/* Patient */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary font-mono font-bold flex items-center justify-center text-xs">
                          {p.initials}
                        </div>
                        <div>
                          <div className="font-bold text-on-surface text-sm font-headline">
                            {p.name}
                          </div>
                          <div className="text-[11px] font-mono text-on-surface-variant">
                            {p.age} Yrs • {p.gender} • <span className="text-secondary">{p.type}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Time */}
                    <td className="py-3.5 px-4 font-mono text-on-surface-variant">
                      {p.time}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono border ${statusStyles}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        <span>{p.status}</span>
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handlePatientAction(p)}
                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                          p.status === 'Priority'
                            ? 'bg-error text-on-error shadow-sos hover:bg-error/90'
                            : p.status === 'In-Consultation'
                            ? 'bg-secondary text-on-secondary hover:bg-secondary/90'
                            : 'bg-primary-container text-on-primary hover:bg-primary shadow-xs'
                        }`}
                      >
                        <span>{p.actionText}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer Link to All Queue */}
        <div className="p-3 bg-surface-container-low/40 border-t border-outline-variant/40 flex items-center justify-between text-xs font-mono text-on-surface-variant">
          <span>Showing {filteredQueue.length} queue entries</span>
          <button 
            onClick={() => onNavigate('prescription')}
            className="flex items-center gap-1 text-primary-container hover:underline font-bold"
          >
            <span>Proceed to Prescription Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Emergency SOS Modal */}
      {showSosModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-surface-container-lowest max-w-lg w-full rounded-2xl border-2 border-error p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-error">
              <div className="p-3 rounded-full bg-error-container text-on-error-container">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-headline">TRIGGER EMERGENCY BLOOD SOS</h3>
                <p className="text-xs font-mono text-on-surface-variant">Station 4B Cardiology Inpatient &amp; OPD</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-error-container/30 border border-error/40 text-xs font-body space-y-2">
              <p className="font-bold text-error">
                You are initiating a priority hospital emergency alert to Central Blood Transfusion Bank:
              </p>
              <ul className="list-disc pl-5 font-mono text-on-surface space-y-1">
                <li>Immediate O-Negative reserve allocation</li>
                <li>Emergency cross-match team notified via telemetry</li>
                <li>Automated runner alert to Station 4B / Trauma Room</li>
              </ul>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowSosModal(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-outline hover:text-on-surface hover:bg-surface-container-low"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Emergency Blood Bank Requisition Transmitted! Runner Dispatched with O- PRBC units.');
                  setShowSosModal(false);
                }}
                className="px-5 py-2 rounded-lg text-xs font-bold font-mono bg-error text-on-error shadow-sos hover:bg-error/90"
              >
                TRANSMIT PRIORITY DISPATCH
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default DashboardScreen;
