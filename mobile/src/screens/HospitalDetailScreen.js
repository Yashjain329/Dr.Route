import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Linking,
  Modal,
} from 'react-native';
import {
  ShieldCheck,
  Star,
  MapPin,
  PhoneCall,
  Bed,
  Heart,
  Activity,
  CheckCircle2,
  Calendar,
  Share2,
  Bookmark,
  ChevronRight,
  Shield,
  Stethoscope,
  Award,
  Clock,
  User,
  X,
  ArrowLeft,
} from 'lucide-react-native';
import { colors, radius, spacing } from '../theme/colors';
import { hospitalsDirectory, currentUser } from '../data/mockData';

export default function HospitalDetailScreen({ hospital, onBack, onNavigate }) {
  const currentHospital = hospital || hospitalsDirectory[1]; // default Max Super Speciality Saket
  const [isBookmarked, setIsBookmarked] = useState(true);

  // OPD Booking Modal State
  const [opdModalVisible, setOpdModalVisible] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState(
    currentHospital.specialties?.[0] || 'Cardiology'
  );
  const [selectedSlot, setSelectedSlot] = useState('Today, 4:30 PM');
  const [selectedDoctor, setSelectedDoctor] = useState(
    currentHospital.opdDoctors?.[0] || null
  );

  const handleBookBed = () => {
    Alert.alert(
      'Admission Desk Pre-Checkin',
      `Request priority bed admission / consultation at ${currentHospital.name} under Ayushman Bharat / Cashless TPA?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm FastTrack',
          onPress: () => {
            Alert.alert(
              'Admission Token Generated ✅',
              `Your FastTrack Triage Token: #MAX-2026-9041\nPlease present this at the Dr.Route Priority Helpdesk on Ground Floor.`
            );
          },
        },
      ]
    );
  };

  const openOpdBookingForDoctor = (doc) => {
    if (doc) setSelectedDoctor(doc);
    setOpdModalVisible(true);
  };

  const confirmOpdAppointment = () => {
    const tokenNumber = `#${currentHospital.name.slice(0, 3).toUpperCase()}-OPD-${Math.floor(1000 + Math.random() * 9000)}`;
    setOpdModalVisible(false);
    Alert.alert(
      'OPD Appointment Confirmed! 🩺',
      `Hospital: ${currentHospital.name}\nDoctor: ${selectedDoctor?.name || 'Senior Consultant'}\nDepartment: ${selectedDoctor?.dept || selectedSpecialty}\nTime Slot: ${selectedSlot}\nFastTrack Token: ${tokenNumber}\n\nFastTrack VIP Entry: Present this token at the Dr.Route Priority OPD Helpdesk on Ground Floor for 0-minute queue waiting.`,
      [{ text: 'Done', style: 'default' }]
    );
  };

  return (
    <View style={styles.screenWrapper}>
      {/* Top Header Bar */}
      <View style={styles.topNavHeader}>
        <TouchableOpacity
          style={styles.topBackBtn}
          onPress={onBack || (() => onNavigate('Hospitals'))}
          activeOpacity={0.7}
        >
          <ArrowLeft size={20} color={colors.primary} />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.topNavTitle} numberOfLines={1}>
            {currentHospital.name}
          </Text>
          <Text style={styles.topNavSub}>OPD Appointments & Hospital Care</Text>
        </View>
        <TouchableOpacity
          style={styles.topShareBtn}
          onPress={() => Alert.alert('Share Hospital', `Sharing ${currentHospital.name} link...`)}
          activeOpacity={0.7}
        >
          <Share2 size={18} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Image Section */}
        <View style={styles.heroImageWrapper}>
          <Image
            source={typeof currentHospital.image === 'number' ? currentHospital.image : { uri: currentHospital.image }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay} />

          <View style={styles.emergencyActiveBadge}>
            <View style={styles.liveRedDot} />
            <Text style={styles.emergencyActiveText}>24X7 EMERGENCY & OPD ACTIVE</Text>
          </View>

          <View style={styles.photosBadge}>
            <Text style={styles.photosText}>32 Photos</Text>
          </View>
        </View>

        {/* Overview Card */}
        <View style={styles.overviewCard}>
          <View style={styles.nameRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.hospitalTitle}>{currentHospital.name}</Text>
              <Text style={styles.hospitalSub}>{currentHospital.type}</Text>
            </View>
            <View style={styles.ratingBadge}>
              <Star size={12} color="#FFFFFF" fill="#FFFFFF" />
              <Text style={styles.ratingText}>{currentHospital.rating}</Text>
            </View>
          </View>

          <View style={styles.rankRow}>
            <Text style={styles.reviewCount}>{currentHospital.reviews}</Text>
            <Text style={styles.dotSeparator}>•</Text>
            <Text style={styles.rankText}>Top Ranked in Cardiology & Oncology</Text>
          </View>

          {/* Address & Directions */}
          <View style={styles.addressRow}>
            <View style={styles.addressCol}>
              <Text style={styles.addressText}>{currentHospital.address}</Text>
              <Text style={styles.distText}>
                {currentHospital.distance} away • {currentHospital.timeAway}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.directionsBtn}
              onPress={() =>
                Alert.alert('Navigation Route', `Opening directions to:\n${currentHospital.name}`)
              }
              activeOpacity={0.7}
            >
              <MapPin size={13} color={colors.secondaryTeal} />
              <Text style={styles.directionsText}>Directions</Text>
            </TouchableOpacity>
          </View>

          {/* Metric Grid: Beds, ICU, Operation Theatres */}
          <View style={styles.metricGrid}>
            <View style={styles.metricItem}>
              <Text style={styles.metricNumber}>{currentHospital.bedsTotal}</Text>
              <Text style={styles.metricLabel}>TOTAL BEDS</Text>
            </View>
            <View style={[styles.metricItem, styles.metricDivider]}>
              <Text style={[styles.metricNumber, { color: colors.secondaryTeal }]}>
                {currentHospital.bedsIcu}
              </Text>
              <Text style={styles.metricLabel}>ICU BEDS</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricNumber}>{currentHospital.ots || '35+'}</Text>
              <Text style={styles.metricLabel}>OP. THEATRES</Text>
            </View>
          </View>

          {/* Direct Reception Line */}
          <TouchableOpacity
            style={styles.helplineBox}
            onPress={() => Linking.openURL(`tel:${currentHospital.phone}`)}
            activeOpacity={0.8}
          >
            <View style={styles.helplineLeft}>
              <View style={styles.phoneIconBox}>
                <PhoneCall size={16} color={colors.primary} />
              </View>
              <View>
                <Text style={styles.helplineTitle}>DIRECT RECEPTION & OPD DESK</Text>
                <Text style={styles.helplineNumber}>{currentHospital.phone}</Text>
              </View>
            </View>
            <View style={styles.timingBadge}>
              <Text style={styles.timingText}>{currentHospital.opdTimings || '8 AM - 9 PM'}</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* PRIMARY SPOTLIGHT: Book OPD Doctor Consultation */}
        <View style={styles.opdSectionCard}>
          <View style={styles.opdSectionHeader}>
            <View style={styles.opdSectionIconCircle}>
              <Stethoscope size={20} color="#FFFFFF" />
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Text style={styles.opdSectionTitle}>Book OPD Appointment</Text>
                <View style={styles.zeroWaitBadge}>
                  <Text style={styles.zeroWaitBadgeText}>0 min VIP Queue</Text>
                </View>
              </View>
              <Text style={styles.opdSectionSub}>
                Verified specialists on OPD duty • FastTrack queue entry
              </Text>
            </View>
          </View>

          {/* OPD Pricing Banner */}
          <View style={styles.opdRateBanner}>
            <View style={{ flex: 1 }}>
              <Text style={styles.opdRateLabel}>Consultation / OPD Charge</Text>
              <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
                <Text style={styles.opdRateAmount}>{currentHospital.opdFee || '₹800'}</Text>
                <Text style={styles.opdRateSub}>• Booking Fee: Free</Text>
              </View>
            </View>
            <View style={styles.cashlessSchemeBadge}>
              <ShieldCheck size={12} color={colors.secondaryTeal} />
              <Text style={styles.cashlessSchemeText}>Cashless PM-JAY & CGHS</Text>
            </View>
          </View>

          {/* Available OPD Doctors List */}
          <Text style={styles.opdDoctorsHeading}>Specialists on OPD Schedule</Text>
          {currentHospital.opdDoctors && currentHospital.opdDoctors.length > 0 ? (
            currentHospital.opdDoctors.map((doc) => (
              <View key={doc.id} style={styles.docScheduleCard}>
                <View style={styles.docAvatarBox}>
                  <User size={18} color={colors.secondaryTeal} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.docScheduleName}>{doc.name}</Text>
                  <Text style={styles.docScheduleDept}>{doc.dept}</Text>
                  <Text style={styles.docScheduleSlot}>Next Slot: {doc.slot}</Text>
                </View>
                <TouchableOpacity
                  style={styles.bookSlotMiniBtn}
                  onPress={() => openOpdBookingForDoctor(doc)}
                  activeOpacity={0.8}
                >
                  <Calendar size={13} color="#FFFFFF" />
                  <Text style={styles.bookSlotMiniText}>Book Slot</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <View style={styles.docScheduleCard}>
              <View style={styles.docAvatarBox}>
                <User size={18} color={colors.secondaryTeal} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.docScheduleName}>Chief Consultant Physician</Text>
                <Text style={styles.docScheduleDept}>General Medicine & Cardiology</Text>
                <Text style={styles.docScheduleSlot}>Next Slot: Today, 4:30 PM</Text>
              </View>
              <TouchableOpacity
                style={styles.bookSlotMiniBtn}
                onPress={() => openOpdBookingForDoctor(null)}
                activeOpacity={0.8}
              >
                <Calendar size={13} color="#FFFFFF" />
                <Text style={styles.bookSlotMiniText}>Book Slot</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Quick Action Button */}
          <TouchableOpacity
            style={styles.fullBookOpdBtn}
            onPress={() => openOpdBookingForDoctor(null)}
            activeOpacity={0.85}
          >
            <Calendar size={16} color="#FFFFFF" />
            <Text style={styles.fullBookOpdText}>Select Department & Book OPD Slot</Text>
            <ChevronRight size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Government Schemes & Cards Accepted */}
        <View style={styles.schemesSection}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionHeaderLeft}>
              <View style={styles.crestCircle}>
                <ShieldCheck size={18} color="#FFFFFF" />
              </View>
              <View>
                <Text style={styles.schemesHeading}>Government Schemes Accepted</Text>
                <Text style={styles.schemesSub}>Empanelled for 100% Cashless Treatments</Text>
              </View>
            </View>
          </View>

          {/* Scheme 1: PM-JAY */}
          <View style={styles.schemeCard}>
            <View style={styles.schemeCardHeader}>
              <View style={styles.schemeIconBox}>
                <Award size={20} color={colors.secondaryTeal} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.schemeName}>Ayushman Bharat PM-JAY</Text>
                <Text style={styles.schemeCoverage}>Up to ₹5,00,000 / Family Per Year</Text>
              </View>
              <View style={styles.activePill}>
                <Text style={styles.activePillText}>100% Cashless</Text>
              </View>
            </View>
            <Text style={styles.schemeDesc}>
              Covers secondary and tertiary care hospitalization across all major surgical, cardiac, oncology, and intensive care specialties.
            </Text>
          </View>

          {/* Scheme 2: CGHS */}
          <View style={styles.schemeCard}>
            <View style={styles.schemeCardHeader}>
              <View style={[styles.schemeIconBox, { backgroundColor: colors.surfaceLow }]}>
                <Shield size={20} color={colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.schemeName}>Central Govt Health Scheme (CGHS)</Text>
                <Text style={styles.schemeCoverage}>Serving & Pensioner Beneficiaries</Text>
              </View>
              <View style={styles.activePill}>
                <Text style={styles.activePillText}>Empanelled</Text>
              </View>
            </View>
            <Text style={styles.schemeDesc}>
              Direct credit admission for pensioners and approved cashless reimbursement rate parity.
            </Text>
          </View>
        </View>

        {/* Super-Specialties & Facilities */}
        <View style={styles.specialtiesCard}>
          <Text style={styles.specialtiesHeading}>Super-Specialities & Centres of Excellence</Text>
          <View style={styles.specialtyChipsGrid}>
            {[
              'Cardiac Sciences',
              'Neurosciences',
              'Cancer Care & Oncology',
              'Renal Sciences & Dialysis',
              'Bone & Joint Surgery',
              'Liver Transplant',
              'Pediatric ICU',
              'Pulmonology',
            ].map((spec, idx) => (
              <View key={idx} style={styles.specChip}>
                <CheckCircle2 size={12} color={colors.secondaryTeal} />
                <Text style={styles.specChipText}>{spec}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Fixed Bottom Booking Bar: Primary Book OPD Appointment */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomBarRow}>
          <TouchableOpacity
            style={styles.callReceptionBtn}
            onPress={() => Linking.openURL(`tel:${currentHospital.phone}`)}
            activeOpacity={0.8}
          >
            <PhoneCall size={16} color={colors.secondaryTeal} />
            <Text style={styles.callReceptionText}>Call Desk</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.primaryBookOpdBtn}
            onPress={() => openOpdBookingForDoctor(null)}
            activeOpacity={0.85}
          >
            <Calendar size={16} color="#FFFFFF" />
            <Text style={styles.primaryBookOpdText}>Book OPD Appointment</Text>
          </TouchableOpacity>
        </View>

        {/* Secondary Bed Triage Link */}
        <TouchableOpacity
          style={styles.bedTriageLink}
          onPress={handleBookBed}
          activeOpacity={0.7}
        >
          <Bed size={13} color={colors.textSecondary} />
          <Text style={styles.bedTriageLinkText}>
            Need inpatient bed / ICU admission? Tap for Bed Triage
          </Text>
        </TouchableOpacity>
      </View>

      {/* Interactive OPD Booking Modal */}
      <Modal
        visible={opdModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setOpdModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.modalTitle}>Book OPD Appointment</Text>
                <Text style={styles.modalSub} numberOfLines={1}>
                  {currentHospital.name}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.modalCloseBtn}
                onPress={() => setOpdModalVisible(false)}
              >
                <X size={18} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 420 }}>
              {/* Select Department */}
              <Text style={styles.modalSectionLabel}>1. Select OPD Specialty</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsScroll}>
                {['Cardiology', 'General Medicine', 'Orthopedics', 'Pediatrics', 'Oncology', 'Neurology'].map((dept) => {
                  const isSel = selectedSpecialty === dept;
                  return (
                    <TouchableOpacity
                      key={dept}
                      style={[styles.modalChip, isSel && styles.modalChipActive]}
                      onPress={() => setSelectedSpecialty(dept)}
                    >
                      <Text style={[styles.modalChipText, isSel && styles.modalChipTextActive]}>
                        {dept}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              {/* Specialist Details */}
              <Text style={styles.modalSectionLabel}>2. Specialist on OPD Duty</Text>
              <View style={styles.docAvatarCard}>
                <View style={styles.docAvatarCircle}>
                  <Stethoscope size={18} color={colors.secondaryTeal} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.docNameTitle}>
                    {selectedDoctor?.name || 'Dr. Ananya Sharma'}
                  </Text>
                  <Text style={styles.docDeptTitle}>
                    {selectedDoctor?.dept || `${selectedSpecialty} Specialist`}
                  </Text>
                  <Text style={styles.docSlotHighlight}>
                    Slot: {selectedDoctor?.slot || 'Today, 4:30 PM'}
                  </Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.docFeeAmount}>{currentHospital.opdFee || '₹800'}</Text>
                  <Text style={styles.docCashlessNotice}>Cashless TPA</Text>
                </View>
              </View>

              {/* Select Slot */}
              <Text style={styles.modalSectionLabel}>3. Preferred Time Slot</Text>
              <View style={styles.slotsGrid}>
                {['Today, 4:30 PM', 'Today, 6:00 PM', 'Tomorrow, 10:30 AM', 'Tomorrow, 5:00 PM'].map((slot) => {
                  const isSel = selectedSlot === slot;
                  return (
                    <TouchableOpacity
                      key={slot}
                      style={[styles.slotPill, isSel && styles.slotPillActive]}
                      onPress={() => setSelectedSlot(slot)}
                    >
                      <Clock size={12} color={isSel ? '#FFFFFF' : colors.textSecondary} />
                      <Text style={[styles.slotPillText, isSel && styles.slotPillTextActive]}>
                        {slot}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Patient ABHA Info */}
              <View style={styles.patientInfoBox}>
                <User size={15} color={colors.secondaryTeal} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.patientName}>{currentUser.name} (Age {currentUser.age})</Text>
                  <Text style={styles.patientSub}>ABHA ID: {currentUser.abhaId} • Blood: {currentUser.bloodGroup}</Text>
                </View>
                <CheckCircle2 size={16} color={colors.secondaryTeal} />
              </View>
            </ScrollView>

            <TouchableOpacity
              style={styles.modalConfirmBtn}
              onPress={confirmOpdAppointment}
              activeOpacity={0.85}
            >
              <CheckCircle2 size={16} color="#FFFFFF" />
              <Text style={styles.modalConfirmText}>Confirm OPD Appointment</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: '#F8F9FF',
  },
  topNavHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(196, 198, 207, 0.3)',
  },
  topBackBtn: {
    width: 38,
    height: 38,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF4FF',
  },
  topNavTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.primary,
  },
  topNavSub: {
    fontSize: 10,
    color: colors.secondaryTeal,
    fontWeight: '700',
  },
  topShareBtn: {
    width: 38,
    height: 38,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF4FF',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 110,
    gap: spacing.md,
  },
  heroImageWrapper: {
    height: 190,
    width: '100%',
    position: 'relative',
    backgroundColor: colors.surfaceLow,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 16, 38, 0.4)',
  },
  emergencyActiveBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0, 16, 38, 0.85)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  liveRedDot: {
    width: 7,
    height: 7,
    borderRadius: radius.full,
    backgroundColor: colors.error,
  },
  emergencyActiveText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  photosBadge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(0, 16, 38, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.sm,
  },
  photosText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  overviewCard: {
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: radius.xl,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(196, 198, 207, 0.4)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  hospitalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
  },
  hospitalSub: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: colors.secondaryTeal,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.md,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  rankRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  reviewCount: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.secondaryTeal,
  },
  dotSeparator: {
    color: colors.textMuted,
  },
  rankText: {
    fontSize: 11,
    color: colors.textSecondary,
    flex: 1,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EFF4FF',
    padding: 10,
    borderRadius: radius.lg,
  },
  addressCol: {
    flex: 1,
    paddingRight: 8,
  },
  addressText: {
    fontSize: 12,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  distText: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  directionsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: 'rgba(0, 106, 97, 0.25)',
  },
  directionsText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.secondaryTeal,
  },
  metricGrid: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(196, 198, 207, 0.3)',
    paddingVertical: 10,
  },
  metricItem: {
    flex: 1,
    alignItems: 'center',
  },
  metricDivider: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'rgba(196, 198, 207, 0.3)',
  },
  metricNumber: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.primary,
  },
  metricLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.textSecondary,
    letterSpacing: 0.5,
    marginTop: 2,
  },
  helplineBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EFF4FF',
    padding: 10,
    borderRadius: radius.lg,
  },
  helplineLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  phoneIconBox: {
    width: 32,
    height: 32,
    borderRadius: radius.full,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  helplineTitle: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.textSecondary,
    letterSpacing: 0.5,
  },
  helplineNumber: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.primary,
    marginTop: 1,
  },
  timingBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.sm,
  },
  timingText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.secondaryTeal,
  },

  // OPD Section Card Styles
  opdSectionCard: {
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: radius.xl,
    padding: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(0, 106, 97, 0.25)',
    gap: 12,
    shadowColor: colors.secondaryTeal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  opdSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  opdSectionIconCircle: {
    width: 38,
    height: 38,
    borderRadius: radius.full,
    backgroundColor: colors.secondaryTeal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  opdSectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
  },
  zeroWaitBadge: {
    backgroundColor: 'rgba(0, 106, 97, 0.12)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.full,
  },
  zeroWaitBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.secondaryTeal,
  },
  opdSectionSub: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 1,
  },
  opdRateBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EFF4FF',
    padding: 10,
    borderRadius: radius.lg,
  },
  opdRateLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  opdRateAmount: {
    fontSize: 17,
    fontWeight: '900',
    color: colors.primary,
  },
  opdRateSub: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.secondaryTeal,
  },
  cashlessSchemeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: 'rgba(0, 106, 97, 0.2)',
  },
  cashlessSchemeText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.secondaryTeal,
  },
  opdDoctorsHeading: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.primary,
    marginTop: 2,
  },
  docScheduleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#F8F9FF',
    padding: 10,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(196, 198, 207, 0.3)',
  },
  docAvatarBox: {
    width: 34,
    height: 34,
    borderRadius: radius.full,
    backgroundColor: '#EFF4FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  docScheduleName: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.primary,
  },
  docScheduleDept: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  docScheduleSlot: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.secondaryTeal,
    marginTop: 1,
  },
  bookSlotMiniBtn: {
    backgroundColor: colors.secondaryTeal,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.md,
  },
  bookSlotMiniText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  fullBookOpdBtn: {
    backgroundColor: colors.secondaryTeal,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderRadius: radius.lg,
    marginTop: 2,
  },
  fullBookOpdText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  // Schemes Section Styles
  schemesSection: {
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: radius.xl,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(196, 198, 207, 0.4)',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  crestCircle: {
    width: 32,
    height: 32,
    borderRadius: radius.full,
    backgroundColor: colors.secondaryTeal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  schemesHeading: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.primary,
  },
  schemesSub: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  schemeCard: {
    backgroundColor: '#F8F9FF',
    borderRadius: radius.lg,
    padding: 12,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(196, 198, 207, 0.3)',
  },
  schemeCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  schemeIconBox: {
    width: 32,
    height: 32,
    borderRadius: radius.md,
    backgroundColor: '#EFF4FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  schemeName: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primary,
  },
  schemeCoverage: {
    fontSize: 10,
    color: colors.secondaryTeal,
    fontWeight: '700',
  },
  activePill: {
    backgroundColor: 'rgba(0, 106, 97, 0.1)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.xs,
  },
  activePillText: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.secondaryTeal,
  },
  schemeDesc: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 16,
  },

  // Specialties
  specialtiesCard: {
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: radius.xl,
    padding: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: 'rgba(196, 198, 207, 0.4)',
  },
  specialtiesHeading: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.primary,
  },
  specialtyChipsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  specChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EFF4FF',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: radius.md,
  },
  specChipText: {
    fontSize: 11,
    color: colors.primary,
    fontWeight: '600',
  },

  // Fixed Bottom Bar
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 14,
    borderTopWidth: 1,
    borderTopColor: 'rgba(196, 198, 207, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 8,
    gap: 6,
  },
  bottomBarRow: {
    flexDirection: 'row',
    gap: 10,
  },
  callReceptionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#EFF4FF',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(0, 106, 97, 0.25)',
  },
  callReceptionText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.secondaryTeal,
  },
  primaryBookOpdBtn: {
    flex: 1,
    backgroundColor: colors.secondaryTeal,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderRadius: radius.lg,
  },
  primaryBookOpdText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  bedTriageLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 2,
  },
  bedTriageLinkText: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },

  // Modal Styles
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 16, 38, 0.6)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: 18,
    gap: 12,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(196, 198, 207, 0.3)',
    paddingBottom: 10,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.primary,
  },
  modalSub: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  modalCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: radius.full,
    backgroundColor: '#EFF4FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalSectionLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primary,
    marginTop: 8,
    marginBottom: 6,
  },
  chipsScroll: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  modalChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#EFF4FF',
    borderRadius: radius.full,
    marginRight: 6,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  modalChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  modalChipText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  modalChipTextActive: {
    color: '#FFFFFF',
  },
  docAvatarCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    borderRadius: radius.lg,
    backgroundColor: '#F8F9FF',
    borderWidth: 1,
    borderColor: colors.secondaryTeal,
    marginBottom: 6,
  },
  docAvatarCircle: {
    width: 34,
    height: 34,
    borderRadius: radius.full,
    backgroundColor: 'rgba(0, 106, 97, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  docNameTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.primary,
  },
  docDeptTitle: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  docSlotHighlight: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.secondaryTeal,
    marginTop: 1,
  },
  docFeeAmount: {
    fontSize: 14,
    fontWeight: '900',
    color: colors.primary,
  },
  docCashlessNotice: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.secondaryTeal,
  },
  slotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  slotPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EFF4FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  slotPillActive: {
    backgroundColor: colors.secondaryTeal,
    borderColor: colors.secondaryTeal,
  },
  slotPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  slotPillTextActive: {
    color: '#FFFFFF',
  },
  patientInfoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#EFF4FF',
    padding: 10,
    borderRadius: radius.lg,
    marginTop: 12,
  },
  patientName: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primary,
  },
  patientSub: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 1,
  },
  modalConfirmBtn: {
    backgroundColor: colors.secondaryTeal,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderRadius: radius.lg,
    marginTop: 6,
  },
  modalConfirmText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
