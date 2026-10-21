import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Switch,
} from 'react-native';
import {
  Ambulance,
  MapPin,
  Navigation,
  Wind,
  Accessibility,
  Calendar,
  Clock,
  Repeat,
  Check,
  ShieldCheck,
  Zap,
  Radio,
  ArrowRight,
  Sparkles,
} from 'lucide-react-native';
import Svg, { Rect, Path, Circle } from 'react-native-svg';
import { colors, radius, spacing } from '../theme/colors';
import { currentUser, ambulanceFleet } from '../data/mockData';
import { stitchImages } from '../assets/stitchImages';

export default function AmbulanceScreen({ onNavigate }) {
  const [isEmergency, setIsEmergency] = useState(true);
  const [selectedFleet, setSelectedFleet] = useState('als-icu');
  const [oxygenSupport, setOxygenSupport] = useState(true);
  const [stretcherNeeded, setStretcherNeeded] = useState(true);
  const [roundTrip, setRoundTrip] = useState(false);
  const [selectedDate, setSelectedDate] = useState('24 Oct');
  const [selectedSlot, setSelectedSlot] = useState('10:00 AM');

  const selectedAmbulance = ambulanceFleet.find((f) => f.id === selectedFleet) || ambulanceFleet[0];
  const totalPrice = selectedAmbulance.price * (roundTrip ? 1.8 : 1);

  const handleConfirmBooking = () => {
    Alert.alert(
      isEmergency ? '🚑 Ambulance Dispatched!' : '📅 Ambulance Scheduled!',
      isEmergency
        ? `${selectedAmbulance.title} is en-route from Connaught Place hub.\nETA: ${selectedAmbulance.eta}.\nDriver tracking link sent via SMS.`
        : `Your ${selectedAmbulance.title} has been booked for ${selectedDate} at ${selectedSlot}.\nPickup: ${currentUser.gpsAddress}`,
      [
        { text: 'OK', onPress: () => onNavigate('Home') },
      ]
    );
  };

  return (
    <View style={styles.screenWrapper}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Triage Banner */}
        <View style={styles.triageBanner}>
          <View style={styles.triageBannerLeft}>
            <ShieldCheck size={16} color={colors.secondaryTeal} />
            <Text style={styles.triageBannerText}>Sanitized, verified medical transit</Text>
          </View>
          <View style={styles.surgeTag}>
            <Text style={styles.surgeTagText}>Zero Surge Fee</Text>
          </View>
        </View>

        {/* Emergency vs Schedule Mode Switcher */}
        <View style={styles.modeToggleCard}>
          <TouchableOpacity
            style={[styles.modeTab, isEmergency && styles.modeTabEmergencyActive]}
            onPress={() => setIsEmergency(true)}
            activeOpacity={0.8}
          >
            <Ambulance size={16} color={isEmergency ? '#FFFFFF' : colors.primary} />
            <Text style={[styles.modeTabText, isEmergency && styles.modeTabTextActive]}>
              Emergency (Instant)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.modeTab, !isEmergency && styles.modeTabScheduleActive]}
            onPress={() => setIsEmergency(false)}
            activeOpacity={0.8}
          >
            <Calendar size={16} color={!isEmergency ? '#FFFFFF' : colors.primary} />
            <Text style={[styles.modeTabText, !isEmergency && styles.modeTabTextActive]}>
              Schedule (Future)
            </Text>
          </TouchableOpacity>
        </View>

        {/* 2. Route & Destination Card */}
        <View style={styles.routeCard}>
          <View style={styles.routeHeader}>
            <View style={styles.routeHeaderLeft}>
              <Navigation size={16} color={colors.secondaryTeal} />
              <Text style={styles.routeTitle}>Trip Route</Text>
            </View>
            <View style={styles.gpsAccuracyPill}>
              <Text style={styles.gpsAccuracyText}>GPS High Accuracy</Text>
            </View>
          </View>

          {/* Pickup */}
          <View style={styles.addressBox}>
            <View style={styles.pickupIndicator}>
              <View style={styles.pickupDot} />
              <View style={styles.pickupLine} />
            </View>
            <View style={styles.addressInfo}>
              <View style={styles.addressLabelRow}>
                <Text style={styles.addressLabel}>CURRENT PICKUP</Text>
                <TouchableOpacity onPress={() => Alert.alert('Pickup Location', currentUser.gpsAddress)}>
                  <Text style={styles.changeLabel}>Change</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.addressMain}>Connaught Place, Block B</Text>
              <Text style={styles.addressSub}>Central Delhi, 110001</Text>
            </View>
          </View>

          {/* Destination */}
          <View style={styles.addressBox}>
            <View style={styles.destIndicator}>
              <MapPin size={16} color={colors.error} />
            </View>
            <View style={styles.addressInfo}>
              <View style={styles.addressLabelRow}>
                <Text style={styles.addressLabel}>DESTINATION HOSPITAL</Text>
                <Text style={styles.distanceBadge}>6.2 km (14m)</Text>
              </View>
              <Text style={styles.addressMain}>Apollo Indraprastha Hospital</Text>
              <Text style={styles.addressSub}>Mathura Road, Sarita Vihar</Text>
            </View>
            <Image
              source={stitchImages.photoHospitalModern}
              style={{ width: 48, height: 48, borderRadius: radius.md, marginLeft: 8 }}
              resizeMode="cover"
            />
          </View>

          {/* Medical Equipment Toggles */}
          <View style={styles.equipmentGrid}>
            <TouchableOpacity
              style={[styles.equipCard, oxygenSupport && styles.equipCardActive]}
              onPress={() => setOxygenSupport(!oxygenSupport)}
              activeOpacity={0.8}
            >
              <View style={styles.equipLeft}>
                <Wind size={16} color={colors.secondaryTeal} />
                <View>
                  <Text style={styles.equipTitle}>Oxygen Support</Text>
                  <Text style={styles.equipSub}>Cylinder Attached</Text>
                </View>
              </View>
              <Switch
                value={oxygenSupport}
                onValueChange={setOxygenSupport}
                trackColor={{ false: colors.outline, true: colors.secondaryTeal }}
                thumbColor="#FFFFFF"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.equipCard, stretcherNeeded && styles.equipCardActive]}
              onPress={() => setStretcherNeeded(!stretcherNeeded)}
              activeOpacity={0.8}
            >
              <View style={styles.equipLeft}>
                <Accessibility size={16} color={colors.secondaryTeal} />
                <View>
                  <Text style={styles.equipTitle}>Stretcher / Ramp</Text>
                  <Text style={styles.equipSub}>Wheelchair ready</Text>
                </View>
              </View>
              <Switch
                value={stretcherNeeded}
                onValueChange={setStretcherNeeded}
                trackColor={{ false: colors.outline, true: colors.secondaryTeal }}
                thumbColor="#FFFFFF"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Schedule Date & Time (Conditional) */}
        {!isEmergency && (
          <View style={styles.scheduleCard}>
            <View style={styles.scheduleHeader}>
              <View style={styles.scheduleHeaderLeft}>
                <Calendar size={16} color={colors.secondaryTeal} />
                <Text style={styles.scheduleTitle}>Select Pickup Date & Time</Text>
              </View>
              <View style={styles.zeroSurgeTag}>
                <Text style={styles.zeroSurgeText}>Zero Surge</Text>
              </View>
            </View>

            {/* Date Selection */}
            <View style={styles.dateSelectorRow}>
              {['24 Oct (Today)', '25 Oct (Tomorrow)', '26 Oct (Sat)', '27 Oct (Sun)'].map((d) => {
                const label = d.split(' ')[0] + ' ' + d.split(' ')[1];
                const isSelected = selectedDate === label;
                return (
                  <TouchableOpacity
                    key={d}
                    style={[styles.dateBtn, isSelected && styles.dateBtnSelected]}
                    onPress={() => setSelectedDate(label)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.dateBtnText, isSelected && styles.dateBtnTextSelected]}>
                      {d}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Slot Selection */}
            <View style={styles.slotSelectorRow}>
              {['08:30 AM', '10:00 AM', '02:30 PM', '05:00 PM'].map((slot) => {
                const isSelected = selectedSlot === slot;
                return (
                  <TouchableOpacity
                    key={slot}
                    style={[styles.slotBtn, isSelected && styles.slotBtnSelected]}
                    onPress={() => setSelectedSlot(slot)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.slotBtnText, isSelected && styles.slotBtnTextSelected]}>
                      {slot}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Round trip toggle */}
            <View style={styles.roundTripRow}>
              <View style={styles.roundTripLeft}>
                <Repeat size={16} color={colors.secondaryTeal} />
                <View>
                  <Text style={styles.roundTripTitle}>Book Round Trip (Return Journey)?</Text>
                  <Text style={styles.roundTripSub}>Driver will wait or pick up after treatment</Text>
                </View>
              </View>
              <Switch
                value={roundTrip}
                onValueChange={setRoundTrip}
                trackColor={{ false: colors.outline, true: colors.secondaryTeal }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        )}

        {/* 3. Live Green Corridor Visual Route */}
        <View style={styles.corridorCard}>
          <View style={styles.svgContainer}>
            <Svg height="90" width="100%" viewBox="0 0 400 90">
              <Rect x="0" y="0" width="400" height="90" fill="#EFF4FF" />
              <Path
                d="M -10,25 Q 120,35 180,15 T 420,30"
                fill="none"
                stroke="#D3E4FE"
                strokeWidth="7"
              />
              <Path
                d="M 55,30 C 110,25 140,65 220,50 S 320,40 345,55"
                fill="none"
                stroke={colors.secondaryTeal}
                strokeWidth="3.5"
                strokeDasharray="4, 3"
              />
              <Circle cx="55" cy="30" r="5" fill={colors.secondaryTeal} />
              <Circle cx="345" cy="55" r="6" fill={colors.error} />
            </Svg>

            <View style={styles.corridorBadge}>
              <View style={styles.liveGreenDot} />
              <Text style={styles.corridorBadgeText}>Hospital Green Corridor: Active</Text>
            </View>
          </View>
        </View>

        {/* 4. Fleet Selection (Only Ambulances) */}
        <View style={styles.fleetSection}>
          <View style={styles.fleetHeader}>
            <Text style={styles.fleetHeading}>Select Ambulance Type</Text>
            <View style={styles.queueTag}>
              <View style={styles.liveRedDot} />
              <Text style={styles.queueTagText}>Emergency Priority Queue</Text>
            </View>
          </View>

          {ambulanceFleet.map((fleet) => {
            const isSelected = selectedFleet === fleet.id;
            return (
              <TouchableOpacity
                key={fleet.id}
                style={[
                  styles.fleetCard,
                  isSelected && styles.fleetCardSelected,
                  fleet.recommended && styles.fleetCardRecommended,
                ]}
                onPress={() => setSelectedFleet(fleet.id)}
                activeOpacity={0.85}
              >
                {fleet.badge ? (
                  <View
                    style={[
                      styles.fleetBadgePill,
                      { backgroundColor: fleet.recommended ? colors.error : colors.secondaryTeal },
                    ]}
                  >
                    <Text style={styles.fleetBadgeText}>{fleet.badge}</Text>
                  </View>
                ) : null}

                <View style={styles.fleetCardTop}>
                  <View style={[styles.fleetIconBox, { width: 56, height: 56, overflow: 'hidden' }]}>
                    <Image
                      source={
                        fleet.id === 'patient-transfer'
                          ? stitchImages.photoMedicalCabCar
                          : stitchImages.photoAmbulanceVan
                      }
                      style={{ width: '100%', height: '100%', borderRadius: radius.md }}
                      resizeMode="cover"
                    />
                  </View>

                  <View style={styles.fleetInfo}>
                    <Text style={styles.fleetTitle}>{fleet.title}</Text>
                    <Text style={styles.fleetCategory}>{fleet.category}</Text>
                    <Text style={styles.fleetDesc}>{fleet.description}</Text>

                    <View style={styles.fleetMetaRow}>
                      <View style={styles.etaBadge}>
                        <Zap size={11} color={colors.error} />
                        <Text style={styles.etaBadgeText}>{fleet.eta}</Text>
                      </View>
                      <Text style={styles.subsidizedText}>{fleet.rateType}</Text>
                    </View>
                  </View>

                  <View style={styles.fleetPriceCol}>
                    <Text style={styles.fleetPrice}>₹{fleet.price}</Text>
                    <Text style={styles.fleetOriginalPrice}>₹{fleet.originalPrice}</Text>
                    <View
                      style={[
                        styles.selectRadio,
                        isSelected && styles.selectRadioActive,
                      ]}
                    >
                      {isSelected && <Check size={14} color="#FFFFFF" />}
                    </View>
                  </View>
                </View>

                {/* Features row */}
                <View style={styles.fleetFeaturesRow}>
                  {fleet.features.map((feat, idx) => (
                    <Text key={idx} style={styles.fleetFeatureText}>
                      • {feat}
                    </Text>
                  ))}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* 5. Dr.Route CarePlus Add-ons */}
        <View style={styles.carePlusCard}>
          <View style={styles.carePlusHeader}>
            <Sparkles size={16} color={colors.secondaryTeal} />
            <Text style={styles.carePlusTitle}>Dr.Route CarePlus™ Included</Text>
          </View>
          <Text style={styles.carePlusSub}>
            Includes direct hospital admission pre-checkin, telemetry broadcast to ER trauma team, and emergency guardian tracking link.
          </Text>
        </View>
      </ScrollView>

      {/* Floating Bottom Dispatch Confirmation Strip */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomPriceCol}>
          <Text style={styles.totalPriceLabel}>Total Estimated Fare</Text>
          <View style={styles.totalPriceRow}>
            <Text style={styles.totalPrice}>₹{Math.round(totalPrice)}</Text>
            {roundTrip && <Text style={styles.roundTripBadge}>Round Trip</Text>}
          </View>
        </View>

        <TouchableOpacity
          style={styles.confirmDispatchBtn}
          onPress={handleConfirmBooking}
          activeOpacity={0.85}
        >
          <Ambulance size={18} color="#FFFFFF" />
          <Text style={styles.confirmDispatchText}>
            {isEmergency ? 'Confirm & Dispatch' : 'Schedule Booking'}
          </Text>
          <ArrowRight size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
    paddingBottom: 24,
    gap: spacing.md,
  },
  triageBanner: {
    backgroundColor: colors.surfaceLow,
    borderRadius: radius.full,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.surfaceVariant,
  },
  triageBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  triageBannerText: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  surgeTag: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.full,
  },
  surgeTagText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.secondaryTeal,
  },
  modeToggleCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    padding: 4,
    borderWidth: 1,
    borderColor: colors.outline,
    gap: 6,
  },
  modeTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceLow,
  },
  modeTabEmergencyActive: {
    backgroundColor: colors.error,
  },
  modeTabScheduleActive: {
    backgroundColor: colors.secondaryTeal,
  },
  modeTabText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  modeTabTextActive: {
    color: '#FFFFFF',
  },
  routeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.outline,
    gap: 12,
  },
  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  routeHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  routeTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.primary,
  },
  gpsAccuracyPill: {
    backgroundColor: colors.surfaceLow,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.full,
  },
  gpsAccuracyText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.secondaryTeal,
  },
  addressBox: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: colors.surfaceLow,
    padding: 10,
    borderRadius: radius.md,
  },
  pickupIndicator: {
    alignItems: 'center',
    paddingTop: 3,
  },
  pickupDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.secondaryTeal,
  },
  pickupLine: {
    width: 2,
    height: 24,
    backgroundColor: colors.outlineVariant,
    marginTop: 2,
  },
  destIndicator: {
    alignItems: 'center',
    paddingTop: 2,
  },
  addressInfo: {
    flex: 1,
  },
  addressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addressLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.textMuted,
  },
  changeLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
  },
  distanceBadge: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.secondaryTeal,
  },
  addressMain: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
    marginTop: 1,
  },
  addressSub: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  equipmentGrid: {
    flexDirection: 'row',
    gap: 8,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: colors.outline,
  },
  equipCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceBright,
    borderRadius: radius.md,
    padding: 8,
    borderWidth: 1,
    borderColor: colors.outline,
  },
  equipCardActive: {
    borderColor: colors.secondaryTeal,
  },
  equipLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  equipTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
  },
  equipSub: {
    fontSize: 9,
    color: colors.textMuted,
  },
  scheduleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.secondaryContainer,
    gap: 12,
  },
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scheduleHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  scheduleTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.primary,
  },
  zeroSurgeTag: {
    backgroundColor: colors.secondaryContainer,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: radius.full,
  },
  zeroSurgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.onSecondaryContainer,
  },
  dateSelectorRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  dateBtn: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.surfaceLow,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: radius.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.outline,
  },
  dateBtnSelected: {
    backgroundColor: colors.surfaceVariant,
    borderColor: colors.secondaryTeal,
  },
  dateBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  dateBtnTextSelected: {
    fontWeight: '800',
    color: colors.secondaryTeal,
  },
  slotSelectorRow: {
    flexDirection: 'row',
    gap: 6,
  },
  slotBtn: {
    flex: 1,
    backgroundColor: colors.surfaceLow,
    paddingVertical: 6,
    borderRadius: radius.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.outline,
  },
  slotBtnSelected: {
    backgroundColor: colors.secondaryTeal,
    borderColor: colors.secondaryTeal,
  },
  slotBtnText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  slotBtnTextSelected: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  roundTripRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surfaceLow,
    padding: 10,
    borderRadius: radius.md,
  },
  roundTripLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  roundTripTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
  },
  roundTripSub: {
    fontSize: 9,
    color: colors.textMuted,
  },
  corridorCard: {
    borderRadius: radius.lg,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.outline,
  },
  svgContainer: {
    position: 'relative',
    height: 90,
    width: '100%',
  },
  corridorBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    borderColor: colors.outline,
  },
  liveGreenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.secondaryTeal,
  },
  corridorBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.secondaryTeal,
  },
  fleetSection: {
    gap: 10,
  },
  fleetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fleetHeading: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.primary,
  },
  queueTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  liveRedDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.error,
  },
  queueTagText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.error,
  },
  fleetCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.outline,
    gap: 8,
    position: 'relative',
  },
  fleetCardSelected: {
    borderColor: colors.secondaryTeal,
    backgroundColor: '#FAFDFF',
  },
  fleetCardRecommended: {
    borderColor: colors.error,
  },
  fleetBadgePill: {
    position: 'absolute',
    top: -10,
    right: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.full,
    zIndex: 2,
  },
  fleetBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  fleetCardTop: {
    flexDirection: 'row',
    gap: 10,
  },
  fleetIconBox: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fleetInfo: {
    flex: 1,
    gap: 2,
  },
  fleetTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.primary,
  },
  fleetCategory: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.secondaryTeal,
  },
  fleetDesc: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 15,
  },
  fleetMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  etaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: colors.errorContainer,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  etaBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.error,
  },
  subsidizedText: {
    fontSize: 10,
    color: colors.secondaryTeal,
    fontWeight: '700',
  },
  fleetPriceCol: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  fleetPrice: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.primary,
  },
  fleetOriginalPrice: {
    fontSize: 11,
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },
  selectRadio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.outlineVariant,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  selectRadioActive: {
    backgroundColor: colors.secondaryTeal,
    borderColor: colors.secondaryTeal,
  },
  fleetFeaturesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: colors.outline,
  },
  fleetFeatureText: {
    fontSize: 10,
    color: colors.textMuted,
    fontWeight: '500',
  },
  carePlusCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.secondaryContainer,
    padding: 12,
    gap: 4,
  },
  carePlusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  carePlusTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primary,
  },
  carePlusSub: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 15,
  },
  bottomBar: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: colors.outline,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 8,
  },
  bottomPriceCol: {
    gap: 1,
  },
  totalPriceLabel: {
    fontSize: 10,
    color: colors.textMuted,
    fontWeight: '600',
  },
  totalPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.primary,
  },
  roundTripBadge: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.secondaryTeal,
    backgroundColor: colors.surfaceLow,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
  },
  confirmDispatchBtn: {
    backgroundColor: colors.error,
    borderRadius: radius.md,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  confirmDispatchText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
