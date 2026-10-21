import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from './src/theme/colors';
import Header from './src/components/Header';
import BottomNav from './src/components/BottomNav';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import SOSScreen from './src/screens/SOSScreen';
import AmbulanceScreen from './src/screens/AmbulanceScreen';
import HospitalsScreen from './src/screens/HospitalsScreen';
import HospitalDetailScreen from './src/screens/HospitalDetailScreen';
import ClinicsScreen from './src/screens/ClinicsScreen';
import PharmacyScreen from './src/screens/PharmacyScreen';
import SelfCareScreen from './src/screens/SelfCareScreen';
import AccountScreen from './src/screens/AccountScreen';
import VideoConsultScreen from './src/screens/VideoConsultScreen';
import MedicalRecordsScreen from './src/screens/MedicalRecordsScreen';
import NursingHomesScreen from './src/screens/NursingHomesScreen';

function AppContent() {
  const insets = useSafeAreaInsets();
  const [currentScreen, setCurrentScreen] = useState('Home');
  const [navHistory, setNavHistory] = useState(['Home']);
  const [selectedHospital, setSelectedHospital] = useState(null);

  const navigateTo = (screen, params = {}) => {
    if (params.hospital) {
      setSelectedHospital(params.hospital);
    }
    setNavHistory((prev) => [...prev, screen]);
    setCurrentScreen(screen);
  };

  const goBack = () => {
    if (navHistory.length > 1) {
      const newHistory = [...navHistory];
      newHistory.pop();
      const prevScreen = newHistory[newHistory.length - 1];
      setNavHistory(newHistory);
      setCurrentScreen(prevScreen);
    } else {
      setCurrentScreen('Home');
    }
  };

  const handleTabPress = (tabId) => {
    setCurrentScreen(tabId);
    setNavHistory(['Home', tabId]);
  };

  const getHeaderProps = () => {
    switch (currentScreen) {
      case 'Home':
        return {
          title: 'Dr.Route',
          showBack: false,
          showTelemetry: true,
        };
      case 'SOS':
        return {
          title: 'Emergency Response Hub',
          subtitle: '24×7 Rapid Response • GPS Armed',
          showBack: true,
          showTelemetry: false,
        };
      case 'Ambulance':
        return {
          title: 'Ambulance Fleet',
          subtitle: '24×7 Emergency Transit Active',
          showBack: true,
          showTelemetry: false,
        };
      case 'Hospitals':
        return {
          title: 'Hospitals Directory',
          subtitle: 'Verified Bed Inventory & Cashless TPA',
          showBack: true,
          showTelemetry: false,
        };
      case 'HospitalDetail':
        return {
          title: selectedHospital?.name || 'Hospital Details',
          subtitle: 'Ayushman Bharat & PM-JAY Empanelled',
          showBack: true,
          showTelemetry: false,
        };
      case 'Clinics':
        return {
          title: 'Clinics & Doctors',
          subtitle: 'Verified In-Clinic & Video Consultations',
          showBack: true,
          showTelemetry: false,
        };
      case 'Pharmacy':
        return {
          title: 'Pharmacy Express',
          subtitle: 'Under 60 Min • Genuine OTC Meds',
          showBack: true,
          showTelemetry: false,
        };
      case 'SelfCare':
        return {
          title: 'Self-Care & Wellness',
          subtitle: 'Daily Step Goal, Hydration & Vitals',
          showBack: true,
          showTelemetry: true,
        };
      case 'Account':
        return {
          title: 'Account & Medical ID',
          subtitle: 'ABHA Locker & Paramedic NFC Beacon',
          showBack: true,
          showTelemetry: false,
        };
      case 'VideoConsult':
        return {
          title: 'Clinical Video Consultation',
          showBack: true,
          showTelemetry: false,
        };
      case 'Records':
        return {
          title: 'Medical Records Hub',
          subtitle: 'ABDM Health Locker & Digital Rx',
          showBack: true,
          showTelemetry: false,
        };
      case 'NursingHomes':
        return {
          title: 'Nursing Homes & Care',
          subtitle: 'Verified Bed Inventory & Elder Care',
          showBack: true,
          showTelemetry: false,
        };
      default:
        return {
          title: 'Dr.Route',
          showBack: false,
          showTelemetry: true,
        };
    }
  };

  const headerProps = getHeaderProps();
  const isVideoCall = currentScreen === 'VideoConsult';
  const topPadding = Math.max(StatusBar.currentHeight || 0, insets.top);

  return (
    <View style={[styles.rootContainer, { paddingTop: topPadding }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={true} />

      {/* Top Header (except full screen video call or Hospitals/HospitalDetail which have custom headers) */}
      {!isVideoCall && currentScreen !== 'Hospitals' && currentScreen !== 'HospitalDetail' && (
        <Header
          title={headerProps.title}
          subtitle={headerProps.subtitle}
          showBack={headerProps.showBack}
          onBack={goBack}
          showTelemetry={headerProps.showTelemetry}
          onNotificationPress={() =>
            Alert.alert(
              'Dr.Route Notifications 🔔',
              '• 2:00 PM Dose Reminder: Glycomet GP 1 due in 25 mins.\n• OPD Follow-up: Cardiology review in 3 days.\n• Lab Report: HbA1c test synced to ABHA.'
            )
          }
          onLocationPress={() =>
            Alert.alert(
              'Change Active Location',
              'Currently: Indiranagar, Bengaluru (110001)\nEmergency Hub: Connaught Place, New Delhi'
            )
          }
          onProfilePress={() => setCurrentScreen('Account')}
        />
      )}

      {/* Main Screen Router Canvas */}
      <View style={styles.screenContainer}>
        {currentScreen === 'Home' && <HomeScreen onNavigate={navigateTo} />}
        {currentScreen === 'SOS' && <SOSScreen onNavigate={navigateTo} />}
        {currentScreen === 'Ambulance' && <AmbulanceScreen onNavigate={navigateTo} />}
        {currentScreen === 'Hospitals' && (
          <HospitalsScreen
            onNavigate={navigateTo}
            onSelectHospital={(h) => setSelectedHospital(h)}
          />
        )}
        {currentScreen === 'HospitalDetail' && (
          <HospitalDetailScreen
            hospital={selectedHospital}
            onBack={goBack}
            onNavigate={navigateTo}
          />
        )}
        {currentScreen === 'Clinics' && <ClinicsScreen onNavigate={navigateTo} />}
        {currentScreen === 'Pharmacy' && <PharmacyScreen onNavigate={navigateTo} />}
        {currentScreen === 'SelfCare' && <SelfCareScreen onNavigate={navigateTo} />}
        {currentScreen === 'Account' && <AccountScreen onNavigate={navigateTo} />}
        {currentScreen === 'Records' && <MedicalRecordsScreen onNavigate={navigateTo} />}
        {currentScreen === 'NursingHomes' && <NursingHomesScreen onNavigate={navigateTo} />}
        {currentScreen === 'VideoConsult' && (
          <VideoConsultScreen onBack={goBack} onNavigate={navigateTo} />
        )}
      </View>

      {/* Persistent Bottom Navigation Bar */}
      {!isVideoCall && (
        <BottomNav activeTab={currentScreen} onTabPress={handleTabPress} />
      )}
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
