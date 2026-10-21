import React, { useState } from 'react';
import { ScreenId, Patient, Prescription } from './types';
import { mockPatients, mockPrescriptions, mockDoctor } from './data/mockData';

// Components
import Sidebar from './components/Sidebar';
import Header from './components/Header';

// 12 Screens matching Stitch Project 8626820118209556628
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
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('dashboard');
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
    <div className="min-h-screen bg-background text-on-surface flex flex-col antialiased">
      
      {/* Screen Render */}
      {currentScreen === 'login' ? (
        <LoginScreen onLogin={() => setCurrentScreen('dashboard')} />
      ) : (
        <div className="flex flex-1">
          
          {/* Collapsible Clinical Sidebar (Exact 4 main options matching Stitch UI) */}
          <Sidebar
            currentScreen={currentScreen}
            onNavigate={(screen) => setCurrentScreen(screen)}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />

          {/* Main Content Area */}
          <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
            
            {/* Top Clinical Header matching Stitch UI */}
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

            {/* Global Hospital Footer */}
            <footer className="mt-auto border-t border-outline-variant/50 bg-surface-container-lowest/80 py-4 px-6 text-center text-xs text-on-surface-variant font-mono">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 max-w-7xl mx-auto">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="font-bold text-primary font-headline">Dr.Route Healthcare Navigation</span>
                  <span>•</span>
                  <span>National Health Stack ABDM Integrated</span>
                </div>
                <div>
                  Licensed to {mockDoctor.hospital} • Secure 256-Bit SSL Workstation Verified
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
