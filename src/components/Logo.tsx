import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md', 
  showText = true 
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-14 w-14'
  };

  const textClasses = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl'
  };

  const logoSrc = `${import.meta.env.BASE_URL}logo.png`;

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="relative flex items-center justify-center rounded-xl bg-white p-1 shadow-sm border border-slate-200/80 overflow-hidden">
        <img 
          src={logoSrc} 
          alt="Dr. Route Healthcare Navigation Logo" 
          className={`${sizeClasses[size]} object-contain`}
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = 'none';
          }}
        />
      </div>
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className={`font-display font-extrabold tracking-tight text-primary ${textClasses[size]}`}>
              Dr.<span className="text-secondary">Route</span>
            </span>
            <span className="bg-secondary/15 text-secondary-teal text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-secondary/20 uppercase tracking-wide">
              SuperApp
            </span>
          </div>
          <span className="text-[10px] font-medium text-slate-500 tracking-wide uppercase leading-tight">
            Healthcare Navigation
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
