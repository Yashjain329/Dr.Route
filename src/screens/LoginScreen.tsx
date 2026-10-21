import React, { useState, useEffect } from 'react';
import { 
  BadgeCheck, 
  Lock, 
  Eye, 
  EyeOff, 
  RefreshCw, 
  LogIn, 
  ShieldCheck, 
  Shield, 
  AlertCircle,
  HelpCircle,
  KeyRound,
  FileCheck
} from 'lucide-react';
import Logo from '../components/Logo';

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [employeeId, setEmployeeId] = useState('DOC-489201');
  const [password, setPassword] = useState('HospitalPass#2025');
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState(['7', '3', '9', '4', '1', '8']);
  const [countdown, setCountdown] = useState(272); // 4 min 32 sec
  const [stationName] = useState('Station 4B • Cardiology Wing');

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const updated = [...otp];
    updated[index] = val;
    setOtp(updated);

    // Auto-focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between antialiased">
      
      {/* Top Clinical Station Bar */}
      <header className="h-14 px-6 bg-surface-container-lowest border-b border-outline-variant/60 shadow-clinical flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo size="sm" showText={true} />
          <span className="text-outline/60">|</span>
          <span className="text-xs font-mono font-medium text-on-surface-variant">
            {stationName}
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="hidden sm:flex items-center gap-1.5 text-on-surface-variant">
            <span className="text-outline">Duty Session:</span>
            <span className="font-semibold text-primary">Today: 08:30 AM EST</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-tertiary text-[11px] font-semibold border border-outline-variant/50">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
            <span>System Online</span>
          </div>
        </div>
      </header>

      {/* Main Login Card Workspace */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-auto">
        <div className="max-w-md w-full space-y-6">
          
          {/* Brand Header */}
          <div className="text-center space-y-2">
            <div className="inline-block mx-auto mb-2">
              <Logo size="lg" showText={false} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-primary font-headline tracking-tight">
              Welcome to Dr.Route
            </h1>
            <p className="text-xs sm:text-sm font-medium text-on-surface-variant">
              Physician Sign-in &amp; Secure Duty Session Login
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/80 shadow-clinical-lg p-6 sm:p-8 space-y-5">
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Employee ID */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-on-surface font-sans" htmlFor="employee-id">
                  Employee ID / Medical Staff ID <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline">
                    <BadgeCheck className="w-4 h-4" />
                  </div>
                  <input
                    id="employee-id"
                    type="text"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    placeholder="e.g. DOC-489201"
                    className="h-11 w-full pl-10 pr-4 text-xs font-mono font-medium bg-surface-container-lowest border border-outline-variant rounded-xl focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 text-on-surface transition-all"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-on-surface font-sans" htmlFor="physician-pass">
                    Hospital Directory Password <span className="text-error">*</span>
                  </label>
                  <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Please contact Station 4B IT Administrator for password reset.'); }} className="text-[11px] font-mono text-primary-container hover:underline">
                    Forgot?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="physician-pass"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter directory password"
                    className="h-11 w-full pl-10 pr-10 text-xs font-mono bg-surface-container-lowest border border-outline-variant rounded-xl focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 text-on-surface transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-outline hover:text-on-surface"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* 2FA OTP */}
              <div className="space-y-2 pt-2 border-t border-outline-variant/40">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-on-surface font-sans">
                    Two-Factor Authentication (OTP) <span className="text-error">*</span>
                  </label>
                  <span className="text-[11px] font-mono text-secondary font-medium">
                    Sent to (555) •••-4820
                  </span>
                </div>
                
                {/* 6 Digit Inputs */}
                <div className="flex items-center justify-between gap-1.5 sm:gap-2">
                  {otp.slice(0, 3).map((val, idx) => (
                    <input
                      key={idx}
                      id={`otp-${idx}`}
                      type="text"
                      maxLength={1}
                      value={val}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(idx, e)}
                      className="w-10 sm:w-12 h-11 sm:h-12 text-center text-lg font-mono font-bold bg-surface-container-lowest border-2 border-primary-container rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-container text-on-surface shadow-xs"
                    />
                  ))}
                  <span className="text-outline font-bold text-base">-</span>
                  {otp.slice(3, 6).map((val, idx) => {
                    const actualIdx = idx + 3;
                    return (
                      <input
                        key={actualIdx}
                        id={`otp-${actualIdx}`}
                        type="text"
                        maxLength={1}
                        value={val}
                        onChange={(e) => handleOtpChange(actualIdx, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(actualIdx, e)}
                        className="w-10 sm:w-12 h-11 sm:h-12 text-center text-lg font-mono font-bold bg-surface-container-lowest border border-outline-variant rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-container text-on-surface shadow-xs"
                      />
                    );
                  })}
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono pt-1">
                  <span className="text-on-surface-variant">
                    Code expires in <span className="text-error font-semibold">{formatTimer(countdown)}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => { setCountdown(300); alert('New 6-digit OTP dispatched to registered physician terminal.'); }}
                    className="text-primary-container hover:underline flex items-center gap-1 font-semibold"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Resend OTP</span>
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-3 space-y-3">
                <button
                  type="submit"
                  className="w-full h-11 sm:h-12 bg-primary-container hover:bg-primary text-on-primary rounded-xl text-sm font-headline font-bold flex items-center justify-center gap-2 shadow-clinical-md hover:shadow-clinical-lg transition-all active:scale-[0.99]"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Enter Clinical Portal</span>
                </button>

                <div className="flex items-center justify-between pt-1 text-[11px] font-mono text-outline">
                  <span>
                    Need assistance?{' '}
                    <a href="#it" onClick={(e) => { e.preventDefault(); alert('IT Helpdesk Hotline: Ext 4022 (Cardiology Floor 4)'); }} className="text-primary hover:underline">
                      Contact IT Desk
                    </a>
                  </span>
                  <span className="font-semibold text-secondary">HIPAA &amp; DEA Compliant</span>
                </div>
              </div>

            </form>
          </div>

          {/* Security Verification Badges */}
          <div className="flex items-center justify-center gap-6 text-[11px] font-mono text-outline pt-1">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-secondary" />
              <span>256-Bit Encrypted Session</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-secondary" />
              <span>Workstation Verified</span>
            </div>
          </div>

        </div>
      </main>

      {/* Footer Info */}
      <footer className="py-3 px-6 text-center text-[11px] font-mono text-outline border-t border-outline-variant/40 bg-surface-container-lowest/60">
        Dr.Route SuperApp • National Health Stack ABDM Integrated Provider Gateway • Station 4B Node
      </footer>

    </div>
  );
};

export default LoginScreen;
