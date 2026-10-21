import React from 'react';
import { 
  GraduationCap, 
  Award, 
  Briefcase, 
  BookOpen, 
  Calendar, 
  Building2, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  User, 
  Settings,
  ExternalLink
} from 'lucide-react';
import { ScreenId } from '../types';
import { mockDoctor } from '../data/mockData';

interface QualificationExperienceScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const QualificationExperienceScreen: React.FC<QualificationExperienceScreenProps> = ({
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
                11th
              </span>
              <span className="text-xs font-bold text-secondary-fixed uppercase tracking-wider">
                Academic Pedigree • Clinical Career Journey
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white">
              Qualifications & Clinical Experience
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              AIIMS & PGIMER medical education, international cardiology fellowships, and 16-year career timeline
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('personal-profile')}
              className="bg-white/10 hover:bg-white/20 active:scale-95 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl border border-white/20 backdrop-blur-md flex items-center gap-1.5 transition-all"
            >
              <User className="w-4 h-4" />
              <span>Personal Profile (10th)</span>
            </button>
            <button
              onClick={() => onNavigate('settings')}
              className="bg-secondary hover:bg-secondary-light active:scale-95 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5 transition-all"
            >
              <Settings className="w-4 h-4" />
              <span>Practice Settings (12th)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Academic Degrees & Honors */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-secondary" />
          <span>Medical Education & University Degrees</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockDoctor.qualifications.map((q, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 flex flex-col justify-between">
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-secondary-teal bg-teal-50 px-2 py-0.5 rounded border border-teal-200 inline-block">
                  Class of {q.year}
                </span>
                <h3 className="text-sm font-bold text-slate-900">{q.degree}</h3>
                <p className="text-xs text-slate-600 font-medium">{q.institution}</p>
              </div>

              {q.honor && (
                <div className="p-2.5 bg-amber-50/70 border border-amber-200 rounded-xl text-[11px] text-amber-900 font-semibold flex items-center gap-1.5 mt-2">
                  <Award className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>{q.honor}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* International Board Certifications & Fellowships */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
          <Award className="w-5 h-5 text-primary" />
          <span>International Cardiology Fellowships & Accreditations</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {mockDoctor.fellowships.map((f, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary-container text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                ★
              </div>
              <div>
                <span className="font-bold text-slate-900 block">{f}</span>
                <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Active Peer Standing
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Career Experience Timeline */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-secondary" />
          <span>Chronological Clinical Career Milestones</span>
        </h2>

        <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
          {mockDoctor.careerMilestones.map((milestone, idx) => (
            <div key={idx} className="relative space-y-1">
              <span className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-secondary ring-4 ring-white"></span>
              
              <div className="text-xs font-bold text-secondary uppercase tracking-wider">
                {milestone.period}
              </div>
              <h3 className="text-base font-bold text-slate-900 font-display">
                {milestone.role}
              </h3>
              <div className="text-xs font-semibold text-slate-600">
                {milestone.institution}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed pt-1">
                {milestone.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Landmark Research Publications */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <span>Select Landmark Clinical Publications ({mockDoctor.publicationsCount})</span>
          </h2>
          <span className="text-xs font-bold text-slate-500">Google Scholar h-index: 18</span>
        </div>

        <div className="space-y-3 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="font-bold text-slate-900">
              1. "Accelerated Atherosclerosis in South Asian Young Adults: Mechanistic Analysis of Microvascular Endothelial Dysfunction"
            </div>
            <div className="text-slate-500">
              Mehta A., Aggarwal S.K., et al. — <strong className="text-primary font-semibold">The Lancet Regional Health (2025)</strong>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="font-bold text-slate-900">
              2. "Long-Term Hemodynamic Outcomes in Bifurcation Percutaneous Coronary Intervention with Drug-Eluting Resorbable Scaffolds"
            </div>
            <div className="text-slate-500">
              Mehta A., Sethi V., et al. — <strong className="text-primary font-semibold">Circulation: Cardiovascular Interventions (2023)</strong>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="font-bold text-slate-900">
              3. "Interoperable Clinical Decision Support and ABHA Digital Health Data Standards in Acute Coronary Triage"
            </div>
            <div className="text-slate-500">
              Mehta A., et al. — <strong className="text-primary font-semibold">Indian Heart Journal (2022)</strong>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default QualificationExperienceScreen;
