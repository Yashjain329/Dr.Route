import React from 'react';
import { 
  User, 
  GraduationCap, 
  Settings, 
  Award, 
  Calendar, 
  Building, 
  CheckCircle2, 
  Clock, 
  Briefcase, 
  ShieldCheck, 
  FileCheck,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { ScreenId } from '../types';

interface QualificationExperienceScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const QualificationExperienceScreen: React.FC<QualificationExperienceScreenProps> = ({
  onNavigate,
}) => {
  const qualifications = [
    {
      degree: 'MD in Internal Medicine',
      institution: 'Sawai Man Singh (SMS) Medical College, Jaipur',
      period: '2021 - 2024',
      grade: 'Gold Medalist • First Order of Merit',
      council: 'National Medical Commission (NMC) Certified',
    },
    {
      degree: 'MBBS (Bachelor of Medicine & Bachelor of Surgery)',
      institution: 'Rajasthan University of Health Sciences (RUHS), Jaipur',
      period: '2015 - 2021',
      grade: 'First Class with Honours in Pharmacology & Pathology',
      council: 'Rajasthan Medical Council Reg. #12345',
    },
    {
      degree: 'Fellowship in Non-Invasive Cardiology',
      institution: 'Apollo Hospitals Education & Research Foundation',
      period: '2024 - 2025',
      grade: 'Specialized Training in 2D Echo & Telemetry',
      council: 'Indian Academy of Echocardiography Certified',
    },
    {
      degree: 'Higher Secondary School Certificate (Science Biology)',
      institution: 'Central Board of Secondary Education (CBSE)',
      period: '2014',
      grade: '96.4% Aggregate • State Science Merit',
      council: 'Pre-Medical Entrance AIR 412',
    },
  ];

  const experience = [
    {
      role: 'Senior Consultant Physician',
      hospital: 'Dr. Route Memorial Super-Specialty Hospital, Jaipur',
      period: '2024 - Present (Current)',
      type: 'Full-Time Inpatient & Emergency Triage',
      responsibilities: 'Head of Station 4B Cardiology & Medical Floor, daily 50+ OPD consultations, inpatient ICU telemetry surveillance.',
    },
    {
      role: 'Senior Resident / Registrar (Dept. of Medicine)',
      hospital: 'SMS Medical College & Attached Hospitals, Jaipur',
      period: '2022 - 2024 (2 Years)',
      type: 'Postgraduate Residency',
      responsibilities: 'Supervised acute poisoning emergency, CCU hemodynamic management, clinical bedside student teaching.',
    },
    {
      role: 'Junior Resident Doctor',
      hospital: 'Mahatma Gandhi Medical College & Hospital, Jaipur',
      period: '2021 - 2022 (1 Year)',
      type: 'Critical Care & CCU Unit',
      responsibilities: 'Invasive arterial line placement, mechanical ventilation, emergency cardioversion protocols.',
    },
    {
      role: 'Compulsory Rotatory Residential Internship (CRRI)',
      hospital: 'Government Medical College Hospital, Kota',
      period: '2020 - 2021 (1 Year)',
      type: 'Clinical Internship',
      responsibilities: 'Rotations in Medicine, Surgery, OBGYN, Pediatrics, and Rural Community Health Centers.',
    },
  ];

  const skills = [
    'Advanced Cardiac Life Support (ACLS)',
    'Basic Life Support (BLS)',
    '2D Transthoracic Echocardiography',
    'Mechanical Ventilation & NIV',
    'Arterial Blood Gas (ABG) Analysis',
    'Central Venous Line Cannulation',
    'Endotracheal Intubation',
    'Lumbar Puncture & Thoracentesis',
    'Antimicrobial Stewardship',
    'Clinical Pharmacovigilance',
    'National Health Stack ABDM Interoperability',
    'HL7 FHIR EMR Protocol',
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in py-2 pb-16">
      
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/60 shadow-clinical">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold bg-primary text-primary-fixed px-2 py-0.5 rounded">
              11th Screen
            </span>
            <span className="text-xs font-mono font-bold text-secondary uppercase tracking-wider">
              Doctor Credentials
            </span>
          </div>
          <h1 className="text-xl font-extrabold text-primary font-headline">
            Doctor Qualifications &amp; Clinical Experience
          </h1>
          <p className="text-xs font-body text-on-surface-variant">
            Verified academic milestones, medical degrees, hospital appointments, and clinical procedures
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono font-bold text-tertiary bg-tertiary-fixed/30 px-3 py-1.5 rounded-xl border border-tertiary/20">
          <ShieldCheck className="w-4 h-4 text-tertiary" />
          <span>NMC Verified Credentials</span>
        </div>
      </div>

      {/* 3 Linked Profile Tabs Strip (Exact Stitch Linked Tabs) */}
      <div className="flex items-center gap-2 border-b border-outline-variant/60 pb-1 text-xs font-mono font-bold">
        <button
          onClick={() => onNavigate('personal-profile')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
        >
          <User className="w-4 h-4" />
          <span>10th - Personal Information</span>
        </button>
        <button
          onClick={() => onNavigate('qualifications')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary shadow-xs"
        >
          <GraduationCap className="w-4 h-4" />
          <span>11th - Qualification &amp; Experience</span>
        </button>
        <button
          onClick={() => onNavigate('settings')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
        >
          <Settings className="w-4 h-4" />
          <span>12th - Doctor Settings</span>
        </button>
      </div>

      {/* SECTION 1: Medical Qualifications & Academic Timeline */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical p-6 space-y-5">
        <div className="border-b border-outline-variant/40 pb-3 flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-primary font-headline flex items-center gap-2">
              <Award className="w-5 h-5 text-secondary" />
              <span>Medical Qualifications &amp; Degrees</span>
            </h3>
            <p className="text-xs font-body text-on-surface-variant">
              Postgraduate medical specializations accredited by the Medical Council
            </p>
          </div>
          <span className="text-xs font-mono text-outline">4 Qualifications</span>
        </div>

        <div className="space-y-4">
          {qualifications.map((q, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-surface-container-low/60 border border-outline-variant/60 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-on-surface font-headline">{q.degree}</h4>
                  <span className="bg-primary text-primary-fixed text-[10px] font-mono font-bold px-2 py-0.2 rounded">
                    {q.period}
                  </span>
                </div>
                <div className="text-xs font-mono text-primary font-semibold">{q.institution}</div>
                <div className="text-[11px] font-mono text-outline">{q.grade}</div>
              </div>
              <div className="text-left md:text-right text-[11px] font-mono text-secondary font-bold">
                ✓ {q.council}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: Clinical Experience & Hospital Appointments */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical p-6 space-y-5">
        <div className="border-b border-outline-variant/40 pb-3 flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-primary font-headline flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" />
              <span>Clinical Experience &amp; Hospital Appointments</span>
            </h3>
            <p className="text-xs font-body text-on-surface-variant">
              Hospital clinical residency, senior registrar, and consultant postings
            </p>
          </div>
          <span className="text-xs font-mono text-secondary font-bold">5+ Years Clinical Practice</span>
        </div>

        <div className="space-y-4">
          {experience.map((exp, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-surface-container-low/60 border border-outline-variant/60 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-mono">
                <div className="font-bold text-on-surface text-sm font-headline">
                  {exp.role}
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-secondary-container text-on-secondary-container font-bold px-2 py-0.5 rounded text-[10px]">
                    {exp.type}
                  </span>
                  <span className="text-outline">{exp.period}</span>
                </div>
              </div>
              <div className="text-xs font-mono font-semibold text-primary">{exp.hospital}</div>
              <p className="text-xs font-body text-on-surface-variant">{exp.responsibilities}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: Clinical Skills & Competencies */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical p-6 space-y-4">
        <div className="border-b border-outline-variant/40 pb-3">
          <h3 className="text-base font-extrabold text-primary font-headline">
            Clinical Procedures &amp; Procedural Competencies
          </h3>
          <p className="text-xs font-body text-on-surface-variant">
            Certified technical procedures and patient clinical life-support certifications
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs font-mono">
          {skills.map((s, idx) => (
            <span key={idx} className="px-3 py-1.5 rounded-xl bg-surface-container-low border border-outline-variant/60 font-semibold text-primary flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-secondary" />
              <span>{s}</span>
            </span>
          ))}
        </div>
      </div>

    </div>
  );
};

export default QualificationExperienceScreen;
