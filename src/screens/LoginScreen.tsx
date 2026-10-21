import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  UserCheck, 
  Building2, 
  Fingerprint, 
  ArrowRight, 
  CheckCircle2, 
  KeyRound,
  FileBadge,
  Sparkles
} from 'lucide-react';
import Logo from '../components/Logo';
import { mockDoctor } from '../data/mockData';

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [doctorId, setDoctorId] = useState(mockDoctor.regNumber);
  const [password, setPassword] = useState('••••••••••••');
  const [selectedHospital, setSelectedHospital] = useState('Medanta - The Medicity, Gurugram');
  const [authMethod, setAuthMethod] = useState<'credentials' | 'abha' | 'biometric'>('credentials');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 600);
  };

  const handleQuickDemo = (role: 'cardiologist' | 'triage' | 'abha') => {
    if (role === 'cardiologist') {
      setDoctorId(mockDoctor.regNumber);
      setPassword('DocPass@2026!');
      setSelectedHospital('Medanta - The Medicity, Gurugram');
    } else if (role === 'triage') {
      setDoctorId('NMC-67120-ER');
      setPassword('TriageER#911');
      setSelectedHospital('Apollo Emergency Trauma Center');
    } else {
      setDoctorId('aarav.mehta@hpr.abdm');
      setPassword('ABHA#AuthToken88');
      setSelectedHospital('AIIMS National Healthcare Network');
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/20 to-blue-50/40 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Background ambient decorative glows */}
      <div className="fixed top-1/4 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-10 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="p-3 bg-white rounded-2xl shadow-md border border-slate-200/80 mb-4 inline-block">
            <Logo size="lg" showText={false} />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 font-display tracking-tight">
            Dr.<span className="text-secondary">Route</span> Clinical Portal
          </h2>
          <p className="mt-2 text-sm text-slate-600 font-medium max-w-sm">
            Empowering Clinicians, Healthcare Navigators & Epidemiological Disease Intelligence
          </p>
          <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>ABDM National Health Gateway M1–M3 Verified</span>
          </div>
        </div>

        {/* Main Login Card */}
        <div className="bg-white py-8 px-6 shadow-xl shadow-slate-200/60 rounded-3xl border border-slate-200/80 sm:px-10">
          
          {/* Method Switcher Tabs */}
          <div className="flex rounded-xl bg-slate-100 p-1 mb-6 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setAuthMethod('credentials')}
              className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                authMethod === 'credentials' 
                  ? 'bg-white text-primary shadow-xs font-bold' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>NMC / MCI Reg</span>
            </button>
            <button
              type="button"
              onClick={() => setAuthMethod('abha')}
              className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                authMethod === 'abha' 
                  ? 'bg-white text-primary shadow-xs font-bold' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileBadge className="w-3.5 h-3.5" />
              <span>ABHA HPR ID</span>
            </button>
            <button
              type="button"
              onClick={() => setAuthMethod('biometric')}
              className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                authMethod === 'biometric' 
                  ? 'bg-white text-primary shadow-xs font-bold' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Fingerprint className="w-3.5 h-3.5" />
              <span>Passkey / Bio</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Hospital / Health Facility Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Medical Facility / Hospital
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={selectedHospital}
                  onChange={(e) => setSelectedHospital(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-secondary focus:bg-white text-slate-800 font-medium"
                >
                  <option value="Medanta - The Medicity, Gurugram">Medanta - The Medicity, Gurugram</option>
                  <option value="Apollo Multispecialty Hospitals Network">Apollo Multispecialty Hospitals Network</option>
                  <option value="Max Super Speciality Hospital, Saket">Max Super Speciality Hospital, Saket</option>
                  <option value="AIIMS Department of Cardiology, New Delhi">AIIMS Department of Cardiology, New Delhi</option>
                  <option value="Fortis Escorts Heart Institute">Fortis Escorts Heart Institute</option>
                </select>
              </div>
            </div>

            {/* Doctor ID / Reg Number */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                {authMethod === 'abha' ? 'ABHA Health Professional ID' : 'NMC Registration Number'}
              </label>
              <div className="relative">
                <UserCheck className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={doctorId}
                  onChange={(e) => setDoctorId(e.target.value)}
                  placeholder={authMethod === 'abha' ? 'name@hpr.abdm' : 'e.g. NMC-54921-A'}
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-secondary focus:bg-white text-slate-800 font-medium"
                />
              </div>
            </div>

            {/* Password / Token */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Password / Passkey
                </label>
                <a href="#reset" onClick={(e) => e.preventDefault()} className="text-[11px] font-semibold text-secondary hover:underline">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-secondary focus:bg-white text-slate-800 font-medium"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary-light text-white py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-[0.99] disabled:opacity-70"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Verifying Clinical Credentials...</span>
                  </div>
                ) : (
                  <>
                    <span>Enter Dr. Route Command Center</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Demo Pre-fill Pills */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-secondary" />
                Quick Demo 1-Click Launch:
              </span>
            </div>
            
            <div className="grid grid-cols-1 gap-1.5">
              <button
                type="button"
                onClick={() => handleQuickDemo('cardiologist')}
                className="text-left p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-teal-50 hover:border-secondary/50 transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-bold text-slate-800 group-hover:text-secondary-teal">
                    Dr. Aarav Mehta (Chief Cardiologist)
                  </div>
                  <div className="text-[10px] text-slate-500">
                    NMC-54921-A • Full OPD & Surveillance access
                  </div>
                </div>
                <span className="text-[10px] font-bold text-secondary bg-white px-2 py-0.5 rounded-md border border-slate-200">
                  Auto-fill
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('triage')}
                className="text-left p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-400 transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-bold text-slate-800 group-hover:text-primary">
                    Emergency Triage & Trauma Officer
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Apollo Trauma Center • Code Blue & Bed Dispatch
                  </div>
                </div>
                <span className="text-[10px] font-bold text-slate-600 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                  Auto-fill
                </span>
              </button>
            </div>
          </div>

        </div>

        {/* Security & Regulatory Compliance Banner */}
        <div className="mt-6 text-center space-y-1">
          <p className="text-xs text-slate-500 flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 inline" />
            <span>256-Bit SHA-3 Cryptographic Encryption • HIPAA & Indian EHR Guidelines Compliant</span>
          </p>
          <p className="text-[11px] text-slate-400">
            Powered by Dr. Route Intelligent Healthcare Navigation Protocol v2.4
          </p>
        </div>

      </div>
    </div>
  );
};

export default LoginScreen;
