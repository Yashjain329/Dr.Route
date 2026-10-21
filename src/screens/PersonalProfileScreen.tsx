import React from 'react';
import { 
  User, 
  GraduationCap, 
  Settings, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Award, 
  Clock, 
  Users, 
  Stethoscope, 
  Edit3, 
  Share2,
  FileCheck,
  Building,
  ShieldCheck
} from 'lucide-react';
import { ScreenId } from '../types';

interface PersonalProfileScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const PersonalProfileScreen: React.FC<PersonalProfileScreenProps> = ({
  onNavigate,
}) => {
  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in py-2 pb-16">
      
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/60 shadow-clinical">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-secondary uppercase tracking-wider">
              Doctor Profile
            </span>
          </div>
          <h1 className="text-xl font-extrabold text-primary font-headline">
            Doctor Profile &amp; Practice Information
          </h1>
          <p className="text-xs font-body text-on-surface-variant">
            Manage your professional identity, clinical credentials, and contact details
          </p>
        </div>

        <button 
          onClick={() => alert('Profile Edit Mode Unlocked.')}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-mono font-bold hover:bg-primary-container transition-colors shadow-xs"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Edit Profile</span>
        </button>
      </div>

      {/* Doctor Header Banner with Verification Badge */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/70 shadow-clinical p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-primary-container text-on-primary font-headline font-bold flex items-center justify-center text-2xl shadow-clinical-md border-2 border-primary/20">
              RK
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5">
                <h2 className="text-2xl font-extrabold text-on-surface font-headline tracking-tight">
                  Dr. Ritesh Khandelwal
                </h2>
                <span className="bg-tertiary-fixed text-on-tertiary-fixed text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Physician</span>
                </span>
              </div>
              <div className="text-xs font-mono text-on-surface-variant flex flex-wrap gap-x-3 gap-y-1">
                <span className="font-bold text-primary">General Physician</span>
                <span>•</span>
                <span>MBBS, MD (Internal Medicine)</span>
                <span>•</span>
                <span>Reg. No.: <strong>12345 (RMC)</strong></span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-outline pt-0.5">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-secondary" /> Jaipur, Rajasthan</span>
                <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-primary" /> dr.ritesh@drroute.in</span>
                <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-tertiary" /> +91 98765 43210</span>
              </div>
            </div>
          </div>

          {/* Consultation Stats Widget */}
          <div className="flex items-center gap-3 bg-surface-container-low p-3 rounded-2xl border border-outline-variant/50 self-start md:self-center">
            <div className="text-center px-3 border-r border-outline-variant/40">
              <div className="text-xl font-mono font-extrabold text-primary">36</div>
              <div className="text-[10px] font-mono text-outline uppercase">Today</div>
            </div>
            <div className="text-center px-3 border-r border-outline-variant/40">
              <div className="text-xl font-mono font-extrabold text-secondary">184</div>
              <div className="text-[10px] font-mono text-outline uppercase">This Week</div>
            </div>
            <div className="text-center px-3">
              <div className="text-xl font-mono font-extrabold text-tertiary">712</div>
              <div className="text-[10px] font-mono text-outline uppercase">This Month</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Linked Profile Tabs Strip (Exact Stitch Linked Tabs) */}
      <div className="flex items-center gap-2 border-b border-outline-variant/60 pb-1 text-xs font-mono font-bold">
        <button
          onClick={() => onNavigate('personal-profile')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary shadow-xs"
        >
          <User className="w-4 h-4" />
          <span>Personal Information</span>
        </button>
        <button
          onClick={() => onNavigate('qualifications')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
        >
          <GraduationCap className="w-4 h-4" />
          <span>Qualification &amp; Experience</span>
        </button>
        <button
          onClick={() => onNavigate('settings')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
        >
          <Settings className="w-4 h-4" />
          <span>Doctor Settings</span>
        </button>
      </div>

      {/* Basic Information Card */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical p-6 space-y-5">
        <div className="border-b border-outline-variant/40 pb-3">
          <h3 className="text-base font-extrabold text-primary font-headline">
            Basic Demographics &amp; Hospital Station
          </h3>
          <p className="text-xs font-body text-on-surface-variant">
            Primary provider identification recorded on the hospital directory
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/40 space-y-1">
            <div className="text-outline uppercase text-[10px]">Full Legal Name</div>
            <div className="font-bold text-on-surface text-sm">Dr. Ritesh Khandelwal</div>
          </div>
          <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/40 space-y-1">
            <div className="text-outline uppercase text-[10px]">Gender &amp; DOB</div>
            <div className="font-bold text-on-surface">Male • 15 Jan 1999 (26 Yrs)</div>
          </div>
          <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/40 space-y-1">
            <div className="text-outline uppercase text-[10px]">Blood Group</div>
            <div className="font-bold text-error">B+ Positive</div>
          </div>
          <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/40 space-y-1">
            <div className="text-outline uppercase text-[10px]">Hospital Station Unit</div>
            <div className="font-bold text-primary">Station 4B • Cardiology &amp; General OPD</div>
          </div>
          <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/40 space-y-1">
            <div className="text-outline uppercase text-[10px]">Primary Department</div>
            <div className="font-bold text-on-surface">Department of Internal Medicine</div>
          </div>
          <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/40 space-y-1">
            <div className="text-outline uppercase text-[10px]">Languages Spoken</div>
            <div className="font-bold text-on-surface">English, Hindi, Rajasthani (Marwari)</div>
          </div>
        </div>
      </div>

      {/* Clinic & Communication Information */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-clinical p-6 space-y-5">
        <div className="border-b border-outline-variant/40 pb-3">
          <h3 className="text-base font-extrabold text-primary font-headline">
            Official Hospital Contact &amp; Clinical Chamber
          </h3>
          <p className="text-xs font-body text-on-surface-variant">
            Official endpoints for patient tele-consultations and referral communications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/40 space-y-2">
            <div className="font-bold text-primary flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              <span>Hospital Directory Email</span>
            </div>
            <div className="text-sm font-bold text-on-surface">dr.ritesh@drroute.in</div>
            <div className="text-[11px] text-outline">Encrypted S/MIME communication enabled</div>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/40 space-y-2">
            <div className="font-bold text-secondary flex items-center gap-2">
              <Phone className="w-4 h-4 text-secondary" />
              <span>Direct Duty Phone / Intercom</span>
            </div>
            <div className="text-sm font-bold text-on-surface">+91 98765 43210 (Ext. 4022)</div>
            <div className="text-[11px] text-outline">Duty Hours: Mon - Sat 08:00 AM - 04:00 PM</div>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/40 space-y-2 md:col-span-2">
            <div className="font-bold text-on-surface flex items-center gap-2">
              <Building className="w-4 h-4 text-primary" />
              <span>OPD Chamber Location</span>
            </div>
            <div className="text-xs text-on-surface-variant font-sans">
              Chamber 402, Level 4, Block B (Cardiology &amp; Medicine Wing), Dr. Route Memorial Super-Specialty Hospital, JLN Marg, Jaipur, Rajasthan 302004.
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default PersonalProfileScreen;
