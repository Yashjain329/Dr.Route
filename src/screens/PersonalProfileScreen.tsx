import React from 'react';
import { 
  User, 
  ShieldCheck, 
  Award, 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  GraduationCap, 
  Settings, 
  ArrowRight, 
  Download, 
  FileBadge,
  CheckCircle2,
  Stethoscope,
  HeartPulse
} from 'lucide-react';
import { ScreenId } from '../types';
import { mockDoctor } from '../data/mockData';

interface PersonalProfileScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const PersonalProfileScreen: React.FC<PersonalProfileScreenProps> = ({
  onNavigate
}) => {
  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-primary via-slate-900 to-primary-container text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-700/60">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-secondary text-white text-xs font-bold px-2.5 py-0.5 rounded-md">
                10th
              </span>
              <span className="text-xs font-bold text-secondary-fixed uppercase tracking-wider">
                Clinician Identity • National Provider Registry
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white">
              Personal Clinical Profile
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Verified clinician credentials, digital stamp, ABHA HPR identity and institutional privileges
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('qualifications')}
              className="bg-secondary hover:bg-secondary-light active:scale-95 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 transition-all"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Qualification & Exp. (11th)</span>
            </button>
            <button
              onClick={() => onNavigate('settings')}
              className="bg-white/10 hover:bg-white/20 active:scale-95 text-white text-xs sm:text-sm font-bold px-3.5 py-2.5 rounded-xl border border-white/20 backdrop-blur-md flex items-center gap-1.5 transition-all"
            >
              <Settings className="w-4 h-4" />
              <span>Settings (12th)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Profile Identity Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
        
        {/* Profile Avatar & Reg info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          
          <div className="flex items-start gap-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-primary text-white flex items-center justify-center font-black font-display text-2xl sm:text-3xl shadow-md border-4 border-slate-50 flex-shrink-0">
              AM
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                  {mockDoctor.name}
                </h2>
                <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Verified NMC Specialist
                </span>
              </div>

              <p className="text-xs sm:text-sm font-semibold text-secondary-teal">
                {mockDoctor.title}
              </p>

              <div className="flex items-center gap-3 text-xs text-slate-500 pt-1 flex-wrap">
                <span className="font-mono bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  Reg: {mockDoctor.regNumber}
                </span>
                <span>•</span>
                <span className="font-mono bg-teal-50 text-secondary-teal px-2 py-0.5 rounded border border-teal-200">
                  HPR ID: {mockDoctor.abhaHprId}
                </span>
                <span>•</span>
                <span>{mockDoctor.council}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <button
              onClick={() => alert('Digital Visiting Card Downloaded (VCF + QR)')}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1.5 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Digital Card</span>
            </button>
          </div>

        </div>

        {/* 4 Clinical Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-center space-y-0.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Experience</span>
            <div className="text-2xl font-black text-slate-900 font-display">{mockDoctor.experienceYears}+ Years</div>
            <span className="text-[11px] text-slate-500">Post-DM Cardiology</span>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-center space-y-0.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">PCI Procedures</span>
            <div className="text-2xl font-black text-primary font-display">{mockDoctor.surgeriesCount.toLocaleString()}</div>
            <span className="text-[11px] text-slate-500">Angioplasties & TAVR</span>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-center space-y-0.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Clinical Success</span>
            <div className="text-2xl font-black text-emerald-600 font-display">{mockDoctor.successRate}%</div>
            <span className="text-[11px] text-emerald-700 font-semibold">Quality Benchmark</span>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-center space-y-0.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Publications</span>
            <div className="text-2xl font-black text-secondary font-display">{mockDoctor.publicationsCount} Papers</div>
            <span className="text-[11px] text-slate-500">Lancet, Circulation</span>
          </div>
        </div>

        {/* Contact & Practice Locations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <Building2 className="w-4 h-4 text-primary" />
              <span>Hospital Chambers & Consultation</span>
            </h3>
            <div className="space-y-1 text-slate-700">
              <div className="font-semibold text-slate-900">{mockDoctor.hospital}</div>
              <div className="text-slate-500">{mockDoctor.roomNumber}</div>
              <div className="text-secondary-teal font-medium">{mockDoctor.opdTimings}</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <Phone className="w-4 h-4 text-primary" />
              <span>Direct Tele-Consultation & ER Line</span>
            </h3>
            <div className="space-y-1 text-slate-700">
              <div>Phone: <strong className="text-slate-900">{mockDoctor.phone}</strong></div>
              <div>Official Email: <strong className="text-slate-900">{mockDoctor.email}</strong></div>
              <div className="text-slate-500">Emergency Trauma Interventional Code: ON-CALL</div>
            </div>
          </div>

        </div>

        {/* Biography */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-slate-900 font-display">
            Clinical Biography & South Asian Heart Health Mission
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200 font-sans">
            {mockDoctor.bio}
          </p>
        </div>

        {/* Official Digital Signature Seal Preview */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-dashed border-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Cryptographic Medical Council Seal:
            </span>
            <div className="text-sm font-bold text-slate-800 font-display">
              Dr. Aarav Mehta, MD, DM (Cardiology), FACC
            </div>
            <div className="text-xs text-slate-500">
              NMC Reg # 54921-A • Verified ABDM Health Professional
            </div>
          </div>

          <div className="w-28 h-12 bg-white rounded-xl border border-slate-300 flex items-center justify-center p-2 shadow-xs">
            <span className="font-serif italic text-base text-primary font-bold">Aarav Mehta</span>
          </div>
        </div>

      </div>

    </div>
  );
};

export default PersonalProfileScreen;
