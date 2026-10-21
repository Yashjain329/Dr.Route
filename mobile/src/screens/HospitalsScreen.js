import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  TextInput,
  Alert,
  Linking,
  Modal,
} from 'react-native';
import {
  ArrowLeft,
  Search,
  Mic,
  MapPin,
  ChevronDown,
  ChevronRight,
  Star,
  PhoneCall,
  ShieldCheck,
  Bookmark,
  Calendar,
  Building2,
  Clock,
  User,
  CheckCircle2,
  X,
  Stethoscope,
  HeartPulse,
} from 'lucide-react-native';
import { colors, radius, spacing } from '../theme/colors';
import { hospitalsDirectory, currentUser } from '../data/mockData';
import { stitchImages } from '../assets/stitchImages';

export default function HospitalsScreen({ onNavigate, onSelectHospital }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [bookmarkedIds, setBookmarkedIds] = useState(['h-medanta']);

  // OPD Appointment Booking Modal State
  const [bookingModalVisible, setBookingModalVisible] = useState(false);
  const [activeHospitalForBooking, setActiveHospitalForBooking] = useState(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState('Cardiology');
  const [selectedSlot, setSelectedSlot] = useState('Today, 4:30 PM');
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const filterTabs = [
    { id: 'all', label: 'All Hospitals', icon: Building2 },
    { id: 'multi', label: 'Multi-Super', icon: Building2 },
    { id: 'specialty', label: 'Specialty', icon: HeartPulse },
  ];

  const filteredHospitals = hospitalsDirectory.filter((h) => {
    if (selectedFilter === 'multi' && !h.type.toLowerCase().includes('multi')) return false;
    if (selectedFilter === 'specialty' && !h.specialties.includes('Cardiology')) return false;
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      return (
        h.name.toLowerCase().includes(q) ||
        h.specialties.some((s) => s.toLowerCase().includes(q)) ||
        h.address.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const toggleBookmark = (id) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(bookmarkedIds.filter((item) => item !== id));
    } else {
      setBookmarkedIds([...bookmarkedIds, id]);
      Alert.alert('Saved to Account', 'Hospital added to your saved wishlist.');
    }
  };

  const handleCall = (phone, name) => {
    Alert.alert(`Direct OPD & Emergency Desk`, `Call ${name} at ${phone}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Call Desk', onPress: () => Linking.openURL(`tel:${phone}`) },
    ]);
  };

  const openOpdBooking = (hospital) => {
    setActiveHospitalForBooking(hospital);
    if (hospital.opdDoctors && hospital.opdDoctors.length > 0) {
      setSelectedDoctor(hospital.opdDoctors[0]);
    }
    setBookingModalVisible(true);
  };

  const confirmOpdAppointment = () => {
    const tokenNumber = `#${activeHospitalForBooking?.name.slice(0, 3).toUpperCase()}-OPD-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingModalVisible(false);
    Alert.alert(
      'OPD Appointment Confirmed! 🩺',
      `Hospital: ${activeHospitalForBooking?.name}\nDoctor: ${selectedDoctor?.name || 'Senior Consultant'}\nDepartment: ${selectedSpecialty}\nTime Slot: ${selectedSlot}\nToken ID: ${tokenNumber}\n\nFastTrack VIP OPD Entry: Present this token at the Dr.Route Priority Helpdesk on Ground Floor for 0-minute waiting.`,
      [{ text: 'Great, Thank You!', style: 'default' }]
    );
  };

  return (
    <View style={styles.screenWrapper}>
      {/* 1. Authentic Stitch Top Header Bar */}
      <View style={styles.headerBar}>
        <View style={styles.headerTopRow}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => onNavigate('Home')}
            activeOpacity={0.7}
          >
            <ArrowLeft size={22} color={colors.primary} />
          </TouchableOpacity>

          <View style={styles.headerTitleCenter}>
            <View style={styles.breadcrumbRow}>
              <Text style={styles.breadcrumbHome}>HOME</Text>
              <ChevronRight size={11} color={colors.textMuted} />
              <Text style={styles.breadcrumbActive}>HOSPITALS</Text>
            </View>
            <Text style={styles.headerTitle}>Hospitals Directory</Text>
            <TouchableOpacity
              style={styles.locationPill}
              onPress={() => Alert.alert('Location', 'Currently searching within 10 km of New Delhi')}
              activeOpacity={0.7}
            >
              <MapPin size={12} color={colors.secondaryTeal} />
              <Text style={styles.locationText}>New Delhi • Within 10 km</Text>
              <ChevronDown size={13} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <Image
            source={stitchImages.logoRound}
            style={styles.headerLogo}
            resizeMode="contain"
          />
        </View>

        {/* Live Search Bar */}
        <View style={styles.searchBox}>
          <Search size={18} color={colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search hospital, specialty (Cardiology, ICU)..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity
            onPress={() => Alert.alert('Voice Search', 'Listening for hospital or specialty...')}
            activeOpacity={0.7}
          >
            <Mic size={18} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* 2. Featured Partner Hero Banner (Medanta - The Medicity) */}
        <ImageBackground
          source={stitchImages.photoHospitalModern}
          style={styles.featuredCard}
          imageStyle={styles.featuredBgImage}
          resizeMode="cover"
        >
          <View style={styles.featuredInner}>
            <View style={styles.featuredTopRow}>
              <View style={styles.partnerBadge}>
                <ShieldCheck size={13} color={colors.secondaryContainer} />
                <Text style={styles.partnerBadgeText}>FEATURED PARTNER</Text>
              </View>
              <View style={styles.featuredTopRight}>
                <View style={styles.adPill}>
                  <Text style={styles.adPillText}>AD • PROMOTED</Text>
                </View>
                <TouchableOpacity
                  style={styles.wishlistBtn}
                  onPress={() => toggleBookmark('h-medanta')}
                  activeOpacity={0.8}
                >
                  <Bookmark
                    size={15}
                    color="#FFFFFF"
                    fill={bookmarkedIds.includes('h-medanta') ? colors.secondaryContainer : 'transparent'}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.featuredTitleRow}>
              <View style={{ flex: 1, paddingRight: 8 }}>
                <Text style={styles.featuredHospitalName}>Medanta - The Medicity</Text>
                <Text style={styles.featuredSub}>
                  Super-Speciality Institute • Multi-Organ Transplant & Robotic Surgery Centre
                </Text>
              </View>
              <View style={styles.ratingBadge}>
                <Star size={13} color="#FFFFFF" fill="#FFFFFF" />
                <Text style={styles.ratingText}>4.9</Text>
              </View>
            </View>

            {/* 3 Key Promotional Highlights Grid */}
            <View style={styles.highlightsGrid}>
              <View style={styles.highlightCol}>
                <Text style={styles.highlightMetric}>20% OFF</Text>
                <Text style={styles.highlightSub}>Full Body Checkup</Text>
              </View>
              <View style={styles.highlightCol}>
                <Text style={[styles.highlightMetric, { color: colors.secondaryContainer }]}>0 min</Text>
                <Text style={styles.highlightSub}>VIP OPD Queue</Text>
              </View>
              <View style={styles.highlightCol}>
                <Text style={[styles.highlightMetric, { color: colors.secondaryFixed }]}>Cashless</Text>
                <Text style={styles.highlightSub}>PM-JAY & CGHS</Text>
              </View>
            </View>

            {/* Action buttons: Desk Call, Details & Primary Book OPD Appointment */}
            <View style={styles.featuredActionsCol}>
              <View style={styles.featuredActionsRow}>
                <TouchableOpacity
                  style={styles.featuredCallBtn}
                  onPress={() => handleCall('+91 124 4141 414', 'Medanta - The Medicity')}
                  activeOpacity={0.8}
                >
                  <View style={styles.callIconBubble}>
                    <PhoneCall size={14} color={colors.secondaryTeal} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.featuredCallNumber}>+91 124 4141 414</Text>
                    <Text style={styles.featuredCallSub}>Emergency 24x7 • OPD 8 AM – 8 PM</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.featuredDetailsBtn}
                  onPress={() => {
                    if (onSelectHospital) onSelectHospital(hospitalsDirectory[0]);
                    onNavigate('HospitalDetail');
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={styles.featuredDetailsText}>Details</Text>
                </TouchableOpacity>
              </View>

              {/* Primary Hero Button: Book OPD Appointment */}
              <TouchableOpacity
                style={styles.featuredBookOpdBtn}
                onPress={() => openOpdBooking(hospitalsDirectory[0])}
                activeOpacity={0.85}
              >
                <Calendar size={16} color="#FFFFFF" />
                <Text style={styles.featuredBookOpdText}>Book OPD Appointment</Text>
                <ChevronRight size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>

        {/* 3. Specialty Quick Filter Chips (Matching Stitch) */}
        <View style={styles.filtersRow}>
          {filterTabs.map((tab) => {
            const isSelected = selectedFilter === tab.id;
            const IconComponent = tab.icon;
            return (
              <TouchableOpacity
                key={tab.id}
                style={[styles.filterChip, isSelected && styles.filterChipActive]}
                onPress={() => setSelectedFilter(tab.id)}
                activeOpacity={0.7}
              >
                <IconComponent
                  size={14}
                  color={isSelected ? '#FFFFFF' : colors.secondaryTeal}
                />
                <Text
                  style={[
                    styles.filterChipText,
                    isSelected && styles.filterChipTextActive,
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* 4. Partner Hospitals Directory List */}
        <View style={styles.listHeaderRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.listHeading}>Partner Hospitals</Text>
            <Text style={styles.listSub}>
              Verified live bed inventory & FastTrack queue •{' '}
              <Text style={{ color: colors.secondaryTeal, fontWeight: '700' }}>
                Saved sync to Wishlist
              </Text>
            </Text>
          </View>
        </View>

        {filteredHospitals.map((hospital) => {
          const isBookmarked = bookmarkedIds.includes(hospital.id);
          return (
            <View key={hospital.id} style={styles.hospitalCard}>
              <View style={styles.cardImageContainer}>
                <Image
                  source={typeof hospital.image === 'number' ? hospital.image : { uri: hospital.image }}
                  style={styles.hospitalImage}
                  resizeMode="cover"
                />
                <View style={styles.distPill}>
                  <MapPin size={11} color="#FFFFFF" />
                  <Text style={styles.distText}>{hospital.distance} away</Text>
                </View>

                <View style={styles.cardRatingBadge}>
                  <Star size={11} color="#FFFFFF" fill="#FFFFFF" />
                  <Text style={styles.cardRatingText}>{hospital.rating}</Text>
                </View>

                <TouchableOpacity
                  style={styles.bookmarkBtn}
                  onPress={() => toggleBookmark(hospital.id)}
                  activeOpacity={0.8}
                >
                  <Bookmark
                    size={15}
                    color={isBookmarked ? colors.secondaryTeal : '#FFFFFF'}
                    fill={isBookmarked ? colors.secondaryTeal : 'transparent'}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.cardBody}>
                <View style={styles.cardBodyHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.cardHospitalTitle}>{hospital.name}</Text>
                    <Text style={styles.cardHospitalType}>{hospital.type}</Text>
                  </View>
                </View>

                <Text style={styles.cardAddress} numberOfLines={1}>
                  {hospital.address}
                </Text>

                {/* OPD Consultation & Booking Info Strip */}
                <View style={styles.opdChargeRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.opdChargeLabel}>Consultation / OPD Charge</Text>
                    <View style={styles.opdPriceRow}>
                      <Text style={styles.opdPriceText}>{hospital.opdFee || '₹800'}</Text>
                      <Text style={styles.opdBookingFeeText}>• Booking Fee: Free</Text>
                    </View>
                  </View>
                  <View style={styles.opdBadge}>
                    <ShieldCheck size={12} color={colors.secondaryTeal} />
                    <Text style={styles.opdBadgeText}>OPD Desk</Text>
                  </View>
                </View>

                {/* Direct Hospital Desk Call Bar */}
                <TouchableOpacity
                  style={styles.directDeskBar}
                  onPress={() => handleCall(hospital.phone, hospital.name)}
                  activeOpacity={0.8}
                >
                  <View style={styles.directDeskLeft}>
                    <View style={styles.directDeskIcon}>
                      <PhoneCall size={14} color="#FFFFFF" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <Text style={styles.directDeskTag}>DIRECT DESK</Text>
                        <Text style={styles.directDeskNumber}>{hospital.phone}</Text>
                      </View>
                      <Text style={styles.directDeskTiming}>
                        {hospital.opdTimings || 'Call Timings: 8:00 AM – 9:00 PM'}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.callNowPill}>
                    <Text style={styles.callNowPillText}>Call Now</Text>
                  </View>
                </TouchableOpacity>

                {/* Card Action Buttons: Details & Book OPD Appointment */}
                <View style={styles.cardActionsRow}>
                  <TouchableOpacity
                    style={styles.cardDetailsBtn}
                    onPress={() => {
                      if (onSelectHospital) onSelectHospital(hospital);
                      onNavigate('HospitalDetail');
                    }}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.cardDetailsText}>Details</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.cardBookOpdBtn}
                    onPress={() => openOpdBooking(hospital)}
                    activeOpacity={0.85}
                  >
                    <Calendar size={15} color="#FFFFFF" />
                    <Text style={styles.cardBookOpdText}>Book OPD Appointment</Text>
                    <ChevronRight size={14} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* 5. Interactive OPD Appointment Booking Modal */}
      <Modal
        visible={bookingModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setBookingModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.modalTitle}>Book OPD Appointment</Text>
                <Text style={styles.modalSub} numberOfLines={1}>
                  {activeHospitalForBooking?.name}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.modalCloseBtn}
                onPress={() => setBookingModalVisible(false)}
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

              {/* Doctors List */}
              <Text style={styles.modalSectionLabel}>2. Available OPD Specialists</Text>
              {(activeHospitalForBooking?.opdDoctors || [
                { id: 'd-1', name: 'Dr. Vivek Saxena', dept: 'Senior Consultant', slot: 'Today, 4:30 PM', fee: '₹800' },
                { id: 'd-2', name: 'Dr. Meenakshi Rao', dept: 'Associate Director', slot: 'Today, 5:15 PM', fee: '₹950' },
              ]).map((doc) => {
                const isSelectedDoc = selectedDoctor?.id === doc.id;
                return (
                  <TouchableOpacity
                    key={doc.id}
                    style={[styles.doctorOptionCard, isSelectedDoc && styles.doctorOptionCardActive]}
                    onPress={() => setSelectedDoctor(doc)}
                    activeOpacity={0.8}
                  >
                    <View style={styles.docAvatarCircle}>
                      <Stethoscope size={16} color={colors.secondaryTeal} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.docName}>{doc.name}</Text>
                      <Text style={styles.docDept}>{doc.dept}</Text>
                      <Text style={styles.docSlotText}>Available: {doc.slot}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                      <Text style={styles.docFeeText}>{doc.fee}</Text>
                      <Text style={styles.docCashlessText}>Cashless TPA</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}

              {/* Time Slots */}
              <Text style={styles.modalSectionLabel}>3. Select Appointment Slot</Text>
              <View style={styles.slotsGrid}>
                {['Today, 4:30 PM', 'Today, 5:15 PM', 'Today, 6:00 PM', 'Tomorrow, 10:00 AM', 'Tomorrow, 11:30 AM'].map((slot) => {
                  const isSelSlot = selectedSlot === slot;
                  return (
                    <TouchableOpacity
                      key={slot}
                      style={[styles.slotPill, isSelSlot && styles.slotPillActive]}
                      onPress={() => setSelectedSlot(slot)}
                    >
                      <Clock size={11} color={isSelSlot ? '#FFFFFF' : colors.textSecondary} />
                      <Text style={[styles.slotPillText, isSelSlot && styles.slotPillTextActive]}>
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
  headerBar: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(196, 198, 207, 0.3)',
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF4FF',
  },
  headerTitleCenter: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  breadcrumbRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  breadcrumbHome: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 0.5,
  },
  breadcrumbActive: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.secondaryTeal,
    letterSpacing: 0.5,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.primary,
    marginTop: 1,
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 2,
  },
  locationText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  headerLogo: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF4FF',
    borderRadius: radius.lg,
    paddingHorizontal: 12,
    height: 42,
    borderWidth: 1,
    borderColor: 'rgba(196, 198, 207, 0.4)',
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: colors.textPrimary,
    marginLeft: 8,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 36,
  },
  featuredCard: {
    borderRadius: radius.xl,
    overflow: 'hidden',
    backgroundColor: '#001026',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  featuredBgImage: {
    borderRadius: radius.xl,
    opacity: 0.22,
  },
  featuredInner: {
    padding: 16,
    backgroundColor: 'rgba(0, 16, 38, 0.45)',
  },
  featuredTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  partnerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  partnerBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.secondaryContainer,
    letterSpacing: 0.5,
  },
  featuredTopRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  adPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.xs,
  },
  adPillText: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.surfaceVariant,
    letterSpacing: 0.5,
  },
  wishlistBtn: {
    width: 28,
    height: 28,
    borderRadius: radius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featuredTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  featuredHospitalName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  featuredSub: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 2,
    lineHeight: 16,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: colors.secondaryContainer,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.primary,
  },
  highlightsGrid: {
    flexDirection: 'row',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.14)',
    paddingTop: 10,
    marginBottom: 14,
  },
  highlightCol: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: radius.md,
    padding: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  highlightMetric: {
    fontSize: 14,
    fontWeight: '900',
    color: colors.secondaryContainer,
  },
  highlightSub: {
    fontSize: 9,
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 2,
    textAlign: 'center',
  },
  featuredActionsCol: {
    gap: 8,
  },
  featuredActionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  featuredCallBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: radius.lg,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  callIconBubble: {
    width: 28,
    height: 28,
    borderRadius: radius.full,
    backgroundColor: 'rgba(0, 106, 97, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featuredCallNumber: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primary,
  },
  featuredCallSub: {
    fontSize: 9,
    color: colors.textSecondary,
  },
  featuredDetailsBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    paddingHorizontal: 14,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.28)',
  },
  featuredDetailsText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  featuredBookOpdBtn: {
    backgroundColor: colors.secondaryTeal,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 11,
    borderRadius: radius.lg,
    marginTop: 2,
  },
  featuredBookOpdText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  filtersRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  filterChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    backgroundColor: '#FFFFFF',
    paddingVertical: 9,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(196, 198, 207, 0.4)',
    elevation: 1,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterChipText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  listHeaderRow: {
    marginBottom: 12,
  },
  listHeading: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.primary,
  },
  listSub: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  hospitalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(196, 198, 207, 0.4)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 16,
  },
  cardImageContainer: {
    height: 150,
    width: '100%',
    position: 'relative',
    backgroundColor: '#EFF4FF',
  },
  hospitalImage: {
    width: '100%',
    height: '100%',
  },
  distPill: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(0, 16, 38, 0.75)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  distText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  cardRatingBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: colors.primaryContainer,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.md,
  },
  cardRatingText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.secondaryContainer,
  },
  bookmarkBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: radius.full,
    backgroundColor: 'rgba(0, 16, 38, 0.65)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBody: {
    padding: 14,
    gap: 10,
  },
  cardBodyHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  cardHospitalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
  },
  cardHospitalType: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  cardAddress: {
    fontSize: 11,
    color: colors.textMuted,
  },
  opdChargeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8F9FF',
    padding: 8,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: 'rgba(196, 198, 207, 0.25)',
  },
  opdChargeLabel: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  opdPriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    marginTop: 2,
  },
  opdPriceText: {
    fontSize: 15,
    fontWeight: '900',
    color: colors.primary,
  },
  opdBookingFeeText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.secondaryTeal,
  },
  opdBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(0, 106, 97, 0.1)',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: radius.sm,
  },
  opdBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.secondaryTeal,
  },
  directDeskBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EFF4FF',
    padding: 8,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(0, 106, 97, 0.2)',
  },
  directDeskLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  directDeskIcon: {
    width: 28,
    height: 28,
    borderRadius: radius.full,
    backgroundColor: colors.secondaryTeal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  directDeskTag: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.secondaryTeal,
  },
  directDeskNumber: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.primary,
  },
  directDeskTiming: {
    fontSize: 9,
    color: colors.textSecondary,
  },
  callNowPill: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: 'rgba(0, 106, 97, 0.25)',
  },
  callNowPillText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.secondaryTeal,
  },
  cardActionsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 2,
  },
  cardDetailsBtn: {
    backgroundColor: '#EFF4FF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(196, 198, 207, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardDetailsText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  cardBookOpdBtn: {
    flex: 1,
    backgroundColor: colors.secondaryTeal,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: radius.lg,
  },
  cardBookOpdText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
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
  doctorOptionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    borderRadius: radius.lg,
    backgroundColor: '#F8F9FF',
    borderWidth: 1,
    borderColor: 'rgba(196, 198, 207, 0.3)',
    marginBottom: 6,
  },
  doctorOptionCardActive: {
    borderColor: colors.secondaryTeal,
    backgroundColor: 'rgba(0, 106, 97, 0.05)',
  },
  docAvatarCircle: {
    width: 32,
    height: 32,
    borderRadius: radius.full,
    backgroundColor: 'rgba(0, 106, 97, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  docName: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.primary,
  },
  docDept: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  docSlotText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.secondaryTeal,
    marginTop: 1,
  },
  docFeeText: {
    fontSize: 13,
    fontWeight: '900',
    color: colors.primary,
  },
  docCashlessText: {
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
