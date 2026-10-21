import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
} from 'react-native';
import {
  Shield,
  ArrowRight,
  ClipboardList,
  Pill,
  MessageSquare,
  Clock,
  Calendar,
  ChevronDown,
  ChevronUp,
  Ambulance,
  PhoneCall,
  CheckCircle2,
  Lock,
  Building2,
  Sparkles,
  Search,
  Mic,
  FileScan,
  Activity,
  Video,
  Stethoscope,
  TestTube,
  HeartPulse,
  Dumbbell,
  ShoppingBag,
  Upload,
  AlertTriangle,
} from 'lucide-react-native';
import { colors, radius, spacing } from '../theme/colors';
import { stitchImages } from '../assets/stitchImages';
import { currentUser, activeRegimen, smartReminders } from '../data/mockData';

export default function HomeScreen({ onNavigate }) {
  const [doseTaken, setDoseTaken] = useState(false);
  const [portalOpen, setPortalOpen] = useState(true);
  const [activeHospitalTab, setActiveHospitalTab] = useState('max');

  const handleTakeDose = () => {
    setDoseTaken(!doseTaken);
    Alert.alert(
      doseTaken ? 'Dose Marked Pending' : 'Dose Taken Successfully! ✅',
      doseTaken
        ? 'Glycomet GP 1 scheduled for 2:00 PM'
        : 'Glycomet GP 1 marked as taken at ' +
            new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );
  };

  const handleQuickSOS = () => {
    Alert.alert(
      'Activating Emergency Protocol 🚨',
      'Sending high-priority SOS signal to 108 Ambulance and emergency contacts with your live GPS location.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open SOS Hub', onPress: () => onNavigate('SOS') },
      ]
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* 1. Search & AI Assist Module */}
      <View style={styles.searchBarContainer}>
        <TouchableOpacity
          style={styles.aiAssistBtn}
          onPress={() => onNavigate('VideoConsult')}
          activeOpacity={0.8}
        >
          <Sparkles size={14} color="#1D4ED8" />
          <Text style={styles.aiAssistText}>Dr.Route AI</Text>
        </TouchableOpacity>
        <Search size={17} color={colors.textSecondary} style={{ marginHorizontal: 6 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search doctors, medicines, or symptoms..."
          placeholderTextColor={colors.textMuted}
        />
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => Alert.alert('Voice Search', 'Speak doctor or symptom...')}
          activeOpacity={0.7}
        >
          <Mic size={18} color={colors.textSecondary} />
        </TouchableOpacity>
        <View style={styles.vDivider} />
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => onNavigate('Pharmacy')}
          activeOpacity={0.7}
        >
          <FileScan size={18} color={colors.secondaryTeal} />
        </TouchableOpacity>
      </View>

      {/* 2. Emergency SOS Strip (High Priority Quick Response) */}
      <View style={styles.emergencySosStrip}>
        <View style={styles.sosTopRow}>
          <View style={styles.sosIconBox}>
            <Image
              source={stitchImages.iconAmbulance3D}
              style={styles.sos3DIcon}
              resizeMode="contain"
            />
          </View>
          <View style={styles.sosTextCol}>
            <View style={styles.sosHeadingRow}>
              <Text style={styles.sosHeading}>Emergency SOS</Text>
              <View style={styles.sosPill}>
                <Text style={styles.sosPillText}>108</Text>
              </View>
            </View>
            <Text style={styles.sosSub} numberOfLines={2}>
              Instant 24x7 Medical Assistance & Live Dispatch
            </Text>
          </View>
        </View>

        <View style={styles.sosActionsRow}>
          <TouchableOpacity
            style={styles.call108Btn}
            onPress={() => Alert.alert('Calling 108', 'Dialing national emergency ambulance 108...')}
            activeOpacity={0.8}
          >
            <Ambulance size={15} color={colors.error} />
            <Text style={styles.call108Text}>Call 108 Ambulance</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.activateSosBtn}
            onPress={handleQuickSOS}
            activeOpacity={0.8}
          >
            <Text style={styles.activateSosText}>ACTIVATE SOS</Text>
            <ArrowRight size={14} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* 3. Core Care Services (Exact 8-Grid from Attached Stitch UI) */}
      <View style={styles.sectionHeaderRow}>
        <View style={{ flex: 1 }}>
          <View style={styles.titleBadgeRow}>
            <Text style={styles.sectionTitle}>Core Care Services</Text>
            <View style={styles.allInOneBadge}>
              <Text style={styles.allInOneText}>All-in-One Care</Text>
            </View>
          </View>
          <Text style={styles.sectionSubtitle} numberOfLines={1}>
            Verified medical facilities, doorstep care & health management
          </Text>
        </View>
      </View>

      {/* Top 2: Hospitals & Clinics */}
      <View style={styles.twoColGrid}>
        {/* 1. Hospitals */}
        <TouchableOpacity
          style={styles.serviceBox}
          onPress={() => onNavigate('Hospitals')}
          activeOpacity={0.85}
        >
          <View style={styles.serviceImageContainer}>
            <Image
              source={stitchImages.photoHospitalModern}
              style={styles.serviceImg}
              resizeMode="cover"
            />
            <View style={styles.imgIconOverlay}>
              <Building2 size={14} color={colors.secondaryTeal} />
            </View>
          </View>
          <Text style={styles.serviceBoxTitle}>1. Hospitals</Text>
          <Text style={styles.serviceBoxSub} numberOfLines={1}>
            Top Hospitals • ICU Beds
          </Text>
          <View style={styles.serviceCardBottom}>
            <Text style={styles.verifiedTag}>✓ Verified</Text>
            <ArrowRight size={13} color={colors.textSecondary} />
          </View>
        </TouchableOpacity>

        {/* 2. Clinics */}
        <TouchableOpacity
          style={styles.serviceBox}
          onPress={() => onNavigate('Clinics')}
          activeOpacity={0.85}
        >
          <View style={styles.serviceImageContainer}>
            <Image
              source={stitchImages.photoEmergencyDoctor}
              style={styles.serviceImg}
              resizeMode="cover"
            />
            <View style={styles.imgIconOverlay}>
              <Stethoscope size={14} color={colors.secondaryTeal} />
            </View>
            <View style={styles.instantOpdBadge}>
              <Text style={styles.instantOpdText}>Instant OPD</Text>
            </View>
          </View>
          <Text style={styles.serviceBoxTitle}>2. Clinics</Text>
          <Text style={styles.serviceBoxSub} numberOfLines={1}>
            Top Specialists • Same-Day
          </Text>
          <View style={styles.serviceCardBottom}>
            <Text style={styles.verifiedTag}>✓ Verified</Text>
            <ArrowRight size={13} color={colors.textSecondary} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Video Consultation Full Width Hero */}
      <TouchableOpacity
        style={styles.videoConsultCard}
        onPress={() => onNavigate('VideoConsult')}
        activeOpacity={0.85}
      >
        <View style={styles.videoLeft}>
          <View style={styles.videoAvatarBox}>
            <Image
              source={stitchImages.iconVideoDoctor3D}
              style={styles.videoDocImg}
              resizeMode="cover"
            />
            <View style={styles.livePulseDot} />
            <View style={styles.liveTag}>
              <Video size={9} color={colors.secondaryTeal} />
              <Text style={styles.liveTagText}>LIVE</Text>
            </View>
          </View>
          <View style={{ flex: 1, minWidth: 0 }}>
            <View style={styles.instantSchedTag}>
              <Text style={styles.instantSchedText}>⚡ Instant & Scheduled</Text>
            </View>
            <Text style={styles.videoTitle} numberOfLines={1}>Video Consultation</Text>
            <Text style={styles.videoSub} numberOfLines={1}>Top MBBS & MD Doctors • ₹XYZ</Text>
          </View>
        </View>
        <View style={styles.consultNowBtn}>
          <Video size={13} color="#FFFFFF" />
          <Text style={styles.consultNowText}>Consult Now</Text>
          <ArrowRight size={12} color="#FFFFFF" />
        </View>
      </TouchableOpacity>

      {/* 3. Home Services & Diagnostics (Horizontal Carousel) */}
      <View style={styles.homeServicesCard}>
        <View style={styles.homeServicesHeader}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flex: 1 }}>
            <Text style={styles.homeServicesTitle} numberOfLines={1}>3. Home Services & Diagnostics</Text>
            <View style={styles.doorstepBadge}>
              <Text style={styles.doorstepText}>At Doorstep</Text>
            </View>
          </View>
          <Text style={styles.swipeText}>Swipe →</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.homeServicesCarousel}
        >
          {/* Card 1: Doctor at Home */}
          <View style={styles.carouselCard}>
            <View style={styles.carouselImgWrapper}>
              <Image source={stitchImages.photoDoctorHomeVisit} style={styles.carouselImg} resizeMode="cover" />
              <View style={styles.carouselImgTag}>
                <Text style={styles.carouselImgTagText}>Doctor Visit</Text>
              </View>
            </View>
            <Text style={styles.carouselItemTitle}>1. Doctor at Home</Text>
            <Text style={styles.carouselItemSub}>General & Specialist visit</Text>
            <TouchableOpacity
              style={styles.carouselActionBtn}
              onPress={() => onNavigate('Clinics')}
              activeOpacity={0.8}
            >
              <Calendar size={12} color="#FFFFFF" />
              <Text style={styles.carouselActionText}>Book Now</Text>
            </TouchableOpacity>
          </View>

          {/* Card 2: Lab & Tests */}
          <View style={[styles.carouselCard, { borderColor: '#86EFAC' }]}>
            <View style={styles.carouselImgWrapper}>
              <Image source={stitchImages.photoBloodDonation} style={styles.carouselImg} resizeMode="cover" />
              <View style={[styles.carouselImgTag, { backgroundColor: '#059669' }]}>
                <Text style={styles.carouselImgTagText}>60m Fast</Text>
              </View>
            </View>
            <Text style={[styles.carouselItemTitle, { color: '#059669' }]}>2. Lab & Tests</Text>
            <Text style={styles.carouselItemSub}>Home Phlebotomy & Blood</Text>
            <View
              style={[styles.carouselActionBtn, { backgroundColor: '#059669' }]}
            >
              <TestTube size={12} color="#FFFFFF" />
              <Text style={styles.carouselActionText}>Book Now</Text>
            </View>
          </View>

          {/* Card 3: Home Nurse & Care */}
          <View style={[styles.carouselCard, { borderColor: '#C7D2FE' }]}>
            <View style={styles.carouselImgWrapper}>
              <Image source={stitchImages.photoHomeNursing} style={styles.carouselImg} resizeMode="cover" />
              <View style={[styles.carouselImgTag, { backgroundColor: '#1D4ED8' }]}>
                <Text style={styles.carouselImgTagText}>At Home</Text>
              </View>
            </View>
            <Text style={styles.carouselItemTitle}>3. Home Nurse & Care</Text>
            <Text style={styles.carouselItemSub}>Qualified staff at Doorstep</Text>
            <TouchableOpacity
              style={[styles.carouselActionBtn, { backgroundColor: '#1D4ED8' }]}
              onPress={() => onNavigate('NursingHomes')}
              activeOpacity={0.8}
            >
              <HeartPulse size={12} color="#FFFFFF" />
              <Text style={styles.carouselActionText}>Book Nurse</Text>
            </TouchableOpacity>
          </View>

          {/* Card 4: Therapy & Rehab */}
          <View style={styles.carouselCard}>
            <View style={styles.carouselImgWrapper}>
              <Image source={stitchImages.photoPhysiotherapy} style={styles.carouselImg} resizeMode="cover" />
              <View style={styles.carouselImgTag}>
                <Text style={styles.carouselImgTagText}>Certified Physio</Text>
              </View>
            </View>
            <Text style={styles.carouselItemTitle}>4. Therapy & Rehab</Text>
            <Text style={styles.carouselItemSub}>Physio, Post-op & Mobility</Text>
            <TouchableOpacity
              style={styles.carouselActionBtn}
              onPress={() => onNavigate('SelfCare')}
              activeOpacity={0.8}
            >
              <Dumbbell size={12} color="#FFFFFF" />
              <Text style={styles.carouselActionText}>Book Session</Text>
            </TouchableOpacity>
          </View>

          {/* Card 5: Other Care */}
          <View style={styles.carouselCard}>
            <View style={styles.carouselImgWrapper}>
              <Image source={stitchImages.photoElderRehab} style={styles.carouselImg} resizeMode="cover" />
              <View style={styles.carouselImgTag}>
                <Text style={styles.carouselImgTagText}>All Specialties</Text>
              </View>
            </View>
            <Text style={styles.carouselItemTitle}>5. Other Care</Text>
            <Text style={styles.carouselItemSub}>Dialysis, ICU Setup & More</Text>
            <TouchableOpacity
              style={styles.carouselActionBtn}
              onPress={() => onNavigate('NursingHomes')}
              activeOpacity={0.8}
            >
              <Text style={styles.carouselActionText}>Explore All</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* Online Pharmacy Banner Card */}
      <View style={styles.pharmacyHeroCard}>
        <View style={styles.pharmacyBannerImgWrapper}>
          <Image source={stitchImages.photoPharmacyBanner} style={styles.pharmacyBannerImg} resizeMode="cover" />
          <View style={styles.pharmacyExpressPill}>
            <Text style={styles.pharmacyExpressText}>⚡ 1-Hr Express Delivery</Text>
          </View>
        </View>
        <View style={styles.pharmacyContent}>
          <Text style={styles.pharmacyTitle}>Online Pharmacy</Text>
          <Text style={styles.pharmacySub} numberOfLines={2}>
            Upload prescription or order genuine medicines & healthcare essentials at doorstep
          </Text>
          <View style={styles.pharmacyBtnRow}>
            <TouchableOpacity
              style={styles.orderMedsBtn}
              onPress={() => onNavigate('Pharmacy')}
              activeOpacity={0.8}
            >
              <ShoppingBag size={14} color="#FFFFFF" />
              <Text style={styles.orderMedsText}>Order Medicines</Text>
              <ArrowRight size={13} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.uploadRxBtn}
              onPress={() => onNavigate('Pharmacy')}
              activeOpacity={0.8}
            >
              <Upload size={14} color={colors.onSecondaryContainer} />
              <Text style={styles.uploadRxText}>Upload Rx</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* 4-Grid Cards: Row 1 - Nursing Homes & Reminders */}
      <View style={styles.twoColGrid}>
        {/* Nursing Homes */}
        <TouchableOpacity
          style={styles.serviceBox}
          onPress={() => onNavigate('NursingHomes')}
          activeOpacity={0.85}
        >
          <View style={styles.serviceImageContainer}>
            <Image source={stitchImages.photoHomeNursing} style={styles.serviceImg} resizeMode="cover" />
            <View style={styles.elderBadge}>
              <Text style={styles.elderBadgeText}>Elder Care</Text>
            </View>
          </View>
          <Text style={styles.serviceBoxTitle} numberOfLines={1}>Nursing Homes</Text>
          <Text style={styles.serviceBoxSub} numberOfLines={1}>Assisted living, recovery</Text>
          <View style={styles.serviceCardBottom}>
            <Text style={styles.exploreCareText}>Explore Care</Text>
            <ArrowRight size={13} color={colors.textSecondary} />
          </View>
        </TouchableOpacity>

        {/* Reminders & Alarms */}
        <TouchableOpacity
          style={styles.serviceBox}
          onPress={() => onNavigate('SelfCare')}
          activeOpacity={0.85}
        >
          <View style={styles.serviceImageContainer}>
            <Image source={stitchImages.photoPillOrganizer} style={styles.serviceImg} resizeMode="cover" />
            <View style={[styles.elderBadge, { backgroundColor: '#F3E8FF' }]}>
              <Text style={[styles.elderBadgeText, { color: '#9333EA' }]}>Smart Track</Text>
            </View>
          </View>
          <Text style={styles.serviceBoxTitle} numberOfLines={1}>Reminders & Alarms</Text>
          <Text style={styles.serviceBoxSub} numberOfLines={1}>Smart pill schedule</Text>
          <View style={styles.serviceCardBottom}>
            <Text style={[styles.exploreCareText, { color: '#9333EA' }]}>Set Schedule</Text>
            <ArrowRight size={13} color={colors.textSecondary} />
          </View>
        </TouchableOpacity>
      </View>

      {/* 4-Grid Cards: Row 2 - Medical Records & Medicine Library */}
      <View style={styles.twoColGrid}>
        {/* Medical Records */}
        <TouchableOpacity
          style={styles.serviceBox}
          onPress={() => onNavigate('Records')}
          activeOpacity={0.85}
        >
          <View style={styles.serviceImageContainer}>
            <Image source={stitchImages.photoMedicineLibrary} style={styles.serviceImg} resizeMode="cover" />
            <View style={styles.elderBadge}>
              <Text style={styles.elderBadgeText}>ABHA Vault</Text>
            </View>
          </View>
          <Text style={styles.serviceBoxTitle} numberOfLines={1}>Medical Records</Text>
          <Text style={styles.serviceBoxSub} numberOfLines={1}>Reports & history</Text>
          <View style={styles.serviceCardBottom}>
            <Text style={styles.exploreCareText}>🔒 Secure Locker</Text>
            <ArrowRight size={13} color={colors.textSecondary} />
          </View>
        </TouchableOpacity>

        {/* Medicine Library (Non-clickable as requested) */}
        <View style={styles.serviceBox}>
          <View style={styles.serviceImageContainer}>
            <Image source={stitchImages.iconSmartTech3D} style={styles.serviceImg} resizeMode="cover" />
            <View style={[styles.elderBadge, { backgroundColor: '#EEF2FF' }]}>
              <Text style={[styles.elderBadgeText, { color: '#1D4ED8' }]}>Drug Guide</Text>
            </View>
          </View>
          <Text style={styles.serviceBoxTitle} numberOfLines={1}>Medicine Library</Text>
          <Text style={styles.serviceBoxSub} numberOfLines={1}>Safe dosages & salt info</Text>
          <View style={styles.serviceCardBottom}>
            <Text style={[styles.exploreCareText, { color: '#1D4ED8' }]}>✓ Verified Drug</Text>
          </View>
        </View>
      </View>

      {/* 4. Ongoing Treatment Portal (Interactive Inpatient Care) */}
      <View style={styles.treatmentPortalCard}>
        <TouchableOpacity
          style={styles.portalHeader}
          onPress={() => setPortalOpen(!portalOpen)}
          activeOpacity={0.7}
        >
          <View style={styles.portalHeaderLeft}>
            <View style={styles.portalMonitorIcon}>
              <Building2 size={20} color={colors.secondaryTeal} />
              <View style={styles.activeMonitorPulse} />
            </View>
            <View style={{ flex: 1, minWidth: 0 }}>
              <View style={styles.portalTitleRow}>
                <Text style={styles.portalTitle} numberOfLines={1}>Ongoing Treatment Portal</Text>
                <View style={styles.activeHospBadge}>
                  <Text style={styles.activeHospText}>2 Active Hospitals</Text>
                </View>
              </View>
              <Text style={styles.portalSub} numberOfLines={1}>
                Max (Pulmo) & Fortis (Cardiac) • Inpatient Care
              </Text>
            </View>
          </View>
          <View style={styles.portalCollapseBtn}>
            <Text style={styles.portalCollapseText}>{portalOpen ? 'Collapse' : 'View'}</Text>
            {portalOpen ? (
              <ChevronUp size={14} color={colors.secondaryTeal} />
            ) : (
              <ChevronDown size={14} color={colors.secondaryTeal} />
            )}
          </View>
        </TouchableOpacity>

        {portalOpen && (
          <View style={styles.portalBody}>
            {/* 2 Hospital Selector Tabs */}
            <View style={styles.hospitalTabsRow}>
              <TouchableOpacity
                style={[
                  styles.hospitalTabBtn,
                  activeHospitalTab === 'max' && styles.hospitalTabBtnActive,
                ]}
                onPress={() => setActiveHospitalTab('max')}
                activeOpacity={0.8}
              >
                <View style={styles.hospTabTop}>
                  <Text style={styles.hospTabFocus}>Active Focus • 1/2</Text>
                  <View style={styles.greenLiveDot} />
                </View>
                <Text style={styles.hospTabName} numberOfLines={1}>1. Max Super Speciality</Text>
                <Text style={styles.hospTabDept}>Pulmonology • Day 3 of 5</Text>
                <View style={styles.hospTabFooter}>
                  <Text style={styles.hospTabCity}>Saket, Delhi</Text>
                  <Text style={styles.hospTabBed}>Bed #ICU-08</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.hospitalTabBtn,
                  activeHospitalTab === 'fortis' && styles.hospitalTabBtnActive,
                ]}
                onPress={() => setActiveHospitalTab('fortis')}
                activeOpacity={0.8}
              >
                <View style={styles.hospTabTop}>
                  <Text style={styles.hospTabFocus}>In-Care • 2/2</Text>
                  <View style={[styles.greenLiveDot, { backgroundColor: '#1D4ED8' }]} />
                </View>
                <Text style={styles.hospTabName} numberOfLines={1}>2. Fortis Escorts Heart</Text>
                <Text style={[styles.hospTabDept, { color: '#1D4ED8' }]}>Cardiology • Day 12 of 21</Text>
                <View style={styles.hospTabFooter}>
                  <Text style={styles.hospTabCity}>Okhla, Delhi</Text>
                  <Text style={styles.hospTabBed}>Bed #C-204</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Selected Hospital Details Subcard */}
            <View style={styles.hospDetailSubcard}>
              <View style={styles.hospDetailHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.consultantDoc}>
                    {activeHospitalTab === 'max'
                      ? 'Dr. Rajesh Sen (Lead Pulmonologist)'
                      : 'Dr. Arvind Swaminathan (Lead Cardiologist)'}
                  </Text>
                  <Text style={styles.consultantSub}>
                    {activeHospitalTab === 'max'
                      ? 'Next Rounds: Today 4:30 PM • O₂ Weaning in progress'
                      : 'Post-Angioplasty observation • Stable ECG telemetry'}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.contactDeskBtn}
                  onPress={() => Alert.alert('Station Helpdesk', 'Connecting to Nursing Station #04...')}
                  activeOpacity={0.7}
                >
                  <PhoneCall size={13} color={colors.secondaryTeal} />
                  <Text style={styles.contactDeskText}>Nurse Desk</Text>
                </TouchableOpacity>
              </View>

              {/* Active Meds in Hospital */}
              <View style={styles.inpatientMedsBox}>
                <View style={styles.inpatientMedsHeader}>
                  <Pill size={14} color={colors.secondaryTeal} />
                  <Text style={styles.inpatientMedsTitle}>Active Hospital Regimen</Text>
                </View>
                <Text style={styles.inpatientMedItem}>• IV Piperacillin-Tazobactam (1.2g q8h)</Text>
                <Text style={styles.inpatientMedItem}>• Nebulization Budecort 0.5mg BID</Text>
                <Text style={styles.inpatientMedItem}>• Oral Glycomet GP 1 after dinner</Text>
              </View>
            </View>
          </View>
        )}
      </View>

      {/* 5. Ayushman Bharat / ABHA National Scheme Banner */}
      <View style={styles.abhaBanner}>
        <View style={styles.abhaTopRow}>
          <View style={styles.abhaTextCol}>
            <View style={styles.abhaPill}>
              <Shield size={12} color="#FFFFFF" />
              <Text style={styles.abhaPillText}>ABHA LINKED</Text>
            </View>
            <Text style={styles.abhaTitle}>Ayushman Bharat Coverage</Text>
            <Text style={styles.abhaSub}>
              100% Cashless hospitalization at 2,400+ empanelled institutions.
            </Text>
          </View>
          <View style={styles.abhaCrest}>
            <Shield size={32} color={colors.secondaryContainer} />
          </View>
        </View>

        <View style={styles.abhaBottomRow}>
          <Text style={styles.abhaIdText}>ABHA ID: {currentUser.abhaId}</Text>
          <TouchableOpacity
            style={styles.abhaBtn}
            onPress={() => onNavigate('Hospitals')}
            activeOpacity={0.8}
          >
            <Text style={styles.abhaBtnText}>Check Eligibility</Text>
            <ArrowRight size={13} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: spacing.md,
    paddingBottom: 32,
  },
  searchBarContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.outline,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    height: 48,
    marginBottom: spacing.md,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  aiAssistBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EEF2FF',
    borderWidth: 1,
    borderColor: '#C7D2FE',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: radius.md,
  },
  aiAssistText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1D4ED8',
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    color: colors.textPrimary,
  },
  iconBtn: {
    padding: 6,
  },
  vDivider: {
    width: 1,
    height: 18,
    backgroundColor: colors.outline,
    marginHorizontal: 2,
  },
  emergencySosStrip: {
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FCA5A5',
    borderRadius: radius.xl,
    padding: 12,
    marginBottom: spacing.md,
    shadowColor: colors.error,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  sosTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sosIconBox: {
    width: 48,
    height: 48,
    borderRadius: radius.lg,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FECDD3',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  sos3DIcon: {
    width: 42,
    height: 42,
  },
  sosTextCol: {
    flex: 1,
    minWidth: 0,
  },
  sosHeadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sosHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.onErrorContainer,
  },
  sosPill: {
    backgroundColor: colors.error,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: radius.sm,
  },
  sosPillText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  sosSub: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
    lineHeight: 15,
  },
  sosActionsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#FECDD3',
  },
  call108Btn: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FCA5A5',
    borderRadius: radius.lg,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  call108Text: {
    color: colors.error,
    fontSize: 11,
    fontWeight: '700',
  },
  activateSosBtn: {
    flex: 1,
    backgroundColor: colors.error,
    borderRadius: radius.lg,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  activateSosText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  titleBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.primary,
  },
  allInOneBadge: {
    backgroundColor: colors.secondaryContainer,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.full,
  },
  allInOneText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.onSecondaryContainer,
    textTransform: 'uppercase',
  },
  sectionSubtitle: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  twoColGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  serviceBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: radius.xl,
    padding: 10,
    borderWidth: 1.5,
    borderColor: colors.outline,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  serviceImageContainer: {
    width: '100%',
    height: 90,
    borderRadius: radius.lg,
    overflow: 'hidden',
    marginBottom: 8,
    position: 'relative',
  },
  serviceImg: {
    width: '100%',
    height: '100%',
  },
  imgIconOverlay: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    width: 26,
    height: 26,
    borderRadius: radius.md,
    backgroundColor: 'rgba(255,255,255,0.92)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  instantOpdBadge: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    backgroundColor: colors.secondaryContainer,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.full,
  },
  instantOpdText: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.onSecondaryContainer,
  },
  elderBadge: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    backgroundColor: colors.primaryContainer,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.full,
  },
  elderBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  serviceBoxTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  serviceBoxSub: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 1,
  },
  serviceCardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: colors.outline,
  },
  verifiedTag: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.secondaryTeal,
  },
  exploreCareText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.secondaryTeal,
  },
  videoConsultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.xl,
    padding: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(0,106,97,0.3)',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  videoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    minWidth: 0,
  },
  videoAvatarBox: {
    width: 48,
    height: 48,
    borderRadius: radius.lg,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: colors.primaryContainer,
  },
  videoDocImg: {
    width: '100%',
    height: '100%',
  },
  livePulseDot: {
    position: 'absolute',
    top: 3,
    right: 3,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#10B981',
  },
  liveTag: {
    position: 'absolute',
    bottom: 2,
    left: 2,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 3,
    paddingVertical: 1,
    borderRadius: radius.xs,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  liveTagText: {
    fontSize: 8,
    fontWeight: '800',
    color: colors.secondaryTeal,
  },
  instantSchedTag: {
    marginBottom: 2,
  },
  instantSchedText: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.secondaryTeal,
    textTransform: 'uppercase',
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  videoSub: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 1,
  },
  consultNowBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  consultNowText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  homeServicesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.xl,
    padding: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(0,106,97,0.25)',
    marginBottom: 10,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  homeServicesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  homeServicesTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  doorstepBadge: {
    backgroundColor: colors.secondaryTeal,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: radius.full,
  },
  doorstepText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
  },
  swipeText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.secondaryTeal,
  },
  homeServicesCarousel: {
    gap: 10,
    paddingBottom: 4,
  },
  carouselCard: {
    width: 175,
    backgroundColor: colors.surfaceLow,
    borderRadius: radius.lg,
    padding: 8,
    borderWidth: 1,
    borderColor: colors.outline,
  },
  carouselImgWrapper: {
    width: '100%',
    height: 95,
    borderRadius: radius.md,
    overflow: 'hidden',
    marginBottom: 6,
    position: 'relative',
  },
  carouselImg: {
    width: '100%',
    height: '100%',
  },
  carouselImgTag: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    backgroundColor: colors.secondaryTeal,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.sm,
  },
  carouselImgTagText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '700',
  },
  carouselItemTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  carouselItemSub: {
    fontSize: 9,
    color: colors.textSecondary,
    marginTop: 1,
  },
  carouselActionBtn: {
    backgroundColor: colors.secondaryTeal,
    borderRadius: radius.md,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginTop: 6,
  },
  carouselActionText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  pharmacyHeroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.xl,
    borderWidth: 1.5,
    borderColor: 'rgba(0,106,97,0.3)',
    overflow: 'hidden',
    marginBottom: 10,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  pharmacyBannerImgWrapper: {
    width: '100%',
    height: 110,
    position: 'relative',
  },
  pharmacyBannerImg: {
    width: '100%',
    height: '100%',
  },
  pharmacyExpressPill: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: colors.secondaryTeal,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  pharmacyExpressText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  pharmacyContent: {
    padding: 12,
  },
  pharmacyTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.primary,
  },
  pharmacySub: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
    lineHeight: 15,
  },
  pharmacyBtnRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.outline,
  },
  orderMedsBtn: {
    flex: 1,
    backgroundColor: colors.secondaryTeal,
    borderRadius: radius.lg,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  orderMedsText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  uploadRxBtn: {
    flex: 1,
    backgroundColor: colors.secondaryContainer,
    borderRadius: radius.lg,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  uploadRxText: {
    color: colors.onSecondaryContainer,
    fontSize: 11,
    fontWeight: '700',
  },
  treatmentPortalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.xl,
    borderWidth: 1.5,
    borderColor: 'rgba(0,106,97,0.3)',
    marginBottom: spacing.md,
    overflow: 'hidden',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  portalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  portalHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    minWidth: 0,
  },
  portalMonitorIcon: {
    width: 38,
    height: 38,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceLow,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: colors.outline,
  },
  activeMonitorPulse: {
    position: 'absolute',
    top: 3,
    right: 3,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#059669',
  },
  portalTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  portalTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  activeHospBadge: {
    backgroundColor: '#059669',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: radius.full,
  },
  activeHospText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  portalSub: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 1,
  },
  portalCollapseBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: colors.surfaceLow,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.md,
  },
  portalCollapseText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.secondaryTeal,
  },
  portalBody: {
    padding: 12,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: colors.outline,
  },
  hospitalTabsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  hospitalTabBtn: {
    flex: 1,
    backgroundColor: colors.surfaceLow,
    borderRadius: radius.lg,
    padding: 8,
    borderWidth: 1,
    borderColor: colors.outline,
  },
  hospitalTabBtnActive: {
    borderColor: colors.secondaryTeal,
    borderWidth: 1.5,
    backgroundColor: '#FFFFFF',
  },
  hospTabTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hospTabFocus: {
    fontSize: 8,
    fontWeight: '800',
    color: colors.secondaryTeal,
    textTransform: 'uppercase',
  },
  greenLiveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#059669',
  },
  hospTabName: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.primary,
    marginTop: 3,
  },
  hospTabDept: {
    fontSize: 9,
    fontWeight: '600',
    color: colors.secondaryTeal,
    marginTop: 1,
  },
  hospTabFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: colors.outline,
  },
  hospTabCity: {
    fontSize: 9,
    color: colors.textSecondary,
  },
  hospTabBed: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.primary,
  },
  hospDetailSubcard: {
    backgroundColor: colors.surfaceLow,
    borderRadius: radius.lg,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.outline,
  },
  hospDetailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  consultantDoc: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  consultantSub: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 2,
    lineHeight: 14,
  },
  contactDeskBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.outline,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: radius.md,
  },
  contactDeskText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.secondaryTeal,
  },
  inpatientMedsBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    padding: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: colors.outline,
  },
  inpatientMedsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  inpatientMedsTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
  },
  inpatientMedItem: {
    fontSize: 10,
    color: colors.primary,
    lineHeight: 15,
  },
  abhaBanner: {
    backgroundColor: colors.primary,
    borderRadius: radius.xxl,
    padding: spacing.md,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  abhaTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  abhaTextCol: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  abhaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.full,
    alignSelf: 'flex-start',
    marginBottom: spacing.xs,
  },
  abhaPillText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  abhaTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
  },
  abhaSub: {
    color: colors.outlineVariant,
    fontSize: 11,
    lineHeight: 15,
    marginTop: 2,
  },
  abhaCrest: {
    width: 48,
    height: 48,
    borderRadius: radius.xl,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  abhaBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.15)',
  },
  abhaIdText: {
    color: colors.secondaryFixed,
    fontSize: 11,
    fontWeight: '600',
    fontFamily: 'monospace',
  },
  abhaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.secondaryContainer,
    paddingHorizontal: spacing.sm,
    paddingVertical: 5,
    borderRadius: radius.full,
  },
  abhaBtnText: {
    color: colors.onSecondaryContainer,
    fontSize: 11,
    fontWeight: '700',
  },
});
