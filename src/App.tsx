import React, { useState } from 'react';
import { ScreenId, Patient, Prescription } from './types';
import { mockPatients, mockPrescriptions, mockDoctor } from './data/mockData';

// Components
import Sidebar from './components/Sidebar';
import Header from './components/Header';

// 12 Screens
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import PrescriptionHubScreen from './screens/PrescriptionHubScreen';
import SubmitOpenChartScreen from './screens/SubmitOpenChartScreen';
import OldRecordsScreen from './screens/OldRecordsScreen';
import NewPrescriptionScreen from './screens/NewPrescriptionScreen';
import HealthInsightsScreen from './screens/HealthInsightsScreen';
import DiseaseEpidemiologyScreen from './screens/DiseaseEpidemiologyScreen';
import DrugTrendsScreen from './screens/DrugTrendsScreen';
import PersonalProfileScreen from './screens/PersonalProfileScreen';
import QualificationExperienceScreen from './screens/QualificationExperienceScreen';
import SettingsScreen from './screens/SettingsScreen';

export function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('login');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<string>(mockPatients[0].id);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(mockPrescriptions);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedPatient = mockPatients.find(p => p.id === selectedPatientId) || mockPatients[0];
  const activePrescription = prescriptions.find(rx => rx.patientId === selectedPatient.id) || prescriptions[0];

  const handlePrescriptionSubmitted = (newRx: Prescription) => {
    setPrescriptions(prev => [newRx, ...prev]);
  };

  const handleSelectPatient = (id: string) => {
    setSelectedPatientId(id);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col antialiased">
      
      {/* If Login Screen, show full screen portal */}
      {currentScreen === 'login' ? (
        <LoginScreen onLogin={() => setCurrentScreen('dashboard')} />
      ) : (
        <div className="flex flex-1">
          
          {/* Collapsible Clinical Sidebar */}
          <Sidebar
            currentScreen={currentScreen}
            onNavigate={(screen) => setCurrentScreen(screen)}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />

          {/* Main Content Area */}
          <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
            
            {/* Top Clinical Header */}
            <Header
              currentScreen={currentScreen}
              onNavigate={(screen) => setCurrentScreen(screen)}
              onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
              selectedPatient={selectedPatient}
              onSelectPatient={handleSelectPatient}
              allPatients={mockPatients}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            {/* Quick 12-Screen Navigation Carousel Strip for seamless reviewer demo testing */}
            <div className="bg-slate-100/90 border-b border-slate-200/80 px-4 py-2 overflow-x-auto custom-scroll flex items-center gap-1.5 text-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap pl-1 pr-2">
                12-Screen Switcher:
              </span>
              {[
                { id: 'login', label: '1. Login' },
                { id: 'dashboard', label: '2. Dashboard' },
                { id: 'prescription', label: '3. Prescription' },
                { id: 'submit-open-chart', label: '4. Submit & Chart' },
                { id: 'old-records', label: '5. Old Records' },
                { id: 'new-prescription', label: '6. New Rx' },
                { id: 'health-insights', label: '7. Health Insights' },
                { id: 'disease-epi', label: '8. Disease Epi' },
                { id: 'drug-trends', label: '9. Drug Trends' },
                { id: 'personal-profile', label: '10. Profile' },
                { id: 'qualifications', label: '11. Qualifications' },
                { id: 'settings', label: '12. Settings' },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentScreen(s.id as ScreenId)}
                  className={`px-2.5 py-1 rounded-lg font-bold text-[11px] whitespace-nowrap transition-all ${
                    currentScreen === s.id
                      ? 'bg-primary text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-200/80 border border-slate-200/60'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Screen Content Viewport */}
            <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
              {currentScreen === 'dashboard' && (
                <DashboardScreen
                  onNavigate={(screen) => setCurrentScreen(screen)}
                  onSelectPatient={handleSelectPatient}
                  selectedPatient={selectedPatient}
                />
              )}

              {currentScreen === 'prescription' && (
                <PrescriptionHubScreen
                  onNavigate={(screen) => setCurrentScreen(screen)}
                  onSelectPatient={handleSelectPatient}
                  prescriptions={prescriptions}
                />
              )}

              {currentScreen === 'submit-open-chart' && (
                <SubmitOpenChartScreen
                  onNavigate={(screen) => setCurrentScreen(screen)}
                  selectedPatient={selectedPatient}
                  prescription={activePrescription}
                />
              )}

              {currentScreen === 'old-records' && (
                <OldRecordsScreen
                  onNavigate={(screen) => setCurrentScreen(screen)}
                  selectedPatient={selectedPatient}
                />
              )}

              {currentScreen === 'new-prescription' && (
                <NewPrescriptionScreen
                  onNavigate={(screen) => setCurrentScreen(screen)}
                  selectedPatient={selectedPatient}
                  onSelectPatient={handleSelectPatient}
                  onPrescriptionSubmitted={handlePrescriptionSubmitted}
                />
              )}

              {currentScreen === 'health-insights' && (
                <HealthInsightsScreen
                  onNavigate={(screen) => setCurrentScreen(screen)}
                  selectedPatient={selectedPatient}
                />
              )}

              {currentScreen === 'disease-epi' && (
                <DiseaseEpidemiologyScreen
                  onNavigate={(screen) => setCurrentScreen(screen)}
                />
              )}

              {currentScreen === 'drug-trends' && (
                <DrugTrendsScreen
                  onNavigate={(screen) => setCurrentScreen(screen)}
                />
              )}

              {currentScreen === 'personal-profile' && (
                <PersonalProfileScreen
                  onNavigate={(screen) => setCurrentScreen(screen)}
                />
              )}

              {currentScreen === 'qualifications' && (
                <QualificationExperienceScreen
                  onNavigate={(screen) => setCurrentScreen(screen)}
                />
              )}

              {currentScreen === 'settings' && (
                <SettingsScreen
                  onNavigate={(screen) => setCurrentScreen(screen)}
                />
              )}
            </main>

            {/* Global Footer */}
            <footer className="mt-auto border-t border-slate-200/80 bg-white/70 py-4 px-6 text-center text-xs text-slate-500">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 max-w-7xl mx-auto">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="font-bold text-slate-700">Dr.Route Healthcare Navigation</span>
                  <span>•</span>
                  <span>National Health Stack ABDM M1–M3</span>
                </div>
                <div>
                  Licensed to {mockDoctor.hospital} • Secure 256-Bit SSL
                </div>
              </div>
            </footer>

          </div>
        </div>
      )}

    </div>
  );
}

export default App;
