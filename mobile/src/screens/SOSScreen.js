import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Animated,
  Linking,
} from 'react-native';
import {
  AlertOctagon,
  ShieldAlert,
  MapPin,
  Ambulance,
  PhoneCall,
  Crown,
  Droplet,
  HeartHandshake,
  Shield,
  ArrowRight,
  Info,
  Radio,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react-native';
import { colors, radius, spacing } from '../theme/colors';
import { currentUser, nationalHelplines } from '../data/mockData';
import { stitchImages } from '../assets/stitchImages';

export default function SOSScreen({ onNavigate }) {
  const [isHolding, setIsHolding] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [isDispatched, setIsDispatched] = useState(false);

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const timerRef = useRef(null);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  const handleStartHold = () => {
    setIsHolding(true);
    setCountdown(3);
    let count = 3;

    timerRef.current = setInterval(() => {
      count -= 1;
      setCountdown(count);
      if (count <= 0) {
        clearInterval(timerRef.current);
        triggerEmergencyBroadcast();
      }
    }, 1000);
  };

  const handleCancelHold = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsHolding(false);
    setCountdown(3);
  };

  const triggerEmergencyBroadcast = () => {
    setIsHolding(false);
    setIsDispatched(true);
    Alert.alert(
      '🚨 EMERGENCY SIGNAL BROADCASTED!',
      `Nearest ALS Ambulance dispatched to:\n${currentUser.gpsAddress}\n\nSMS & live GPS telemetry dispatched to guardian: ${currentUser.emergencyContact.name} (${currentUser.emergencyContact.phone}).`,
      [{ text: 'View Ambulance Tracking', onPress: () => onNavigate('Ambulance') }]
    );
  };

  const handleCall = (num, name) => {
    Alert.alert(
      `Call Helpline ${num}`,
      `Connect directly to ${name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call Now', onPress: () => Linking.openURL(`tel:${num}`) },
      ]
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* 1. Calming Reassurance Bar */}
      <View style={styles.reassuranceBar}>
        <View style={styles.reassuranceTop}>
          <Text style={styles.reassuranceTitle}>🧘 Don't Panic • You Are Safe</Text>
          <View style={styles.hindiPill}>
            <Text style={styles.hindiPillText}>शांत रहें</Text>
          </View>
        </View>
        <Text style={styles.reassuranceSub}>मदद पास में है • Medical emergency team is on standby</Text>
      </View>

      {/* 2. GPS Location Bar */}
      <View style={styles.gpsCard}>
        <View style={styles.gpsLeft}>
          <View style={styles.gpsIconCircle}>
            <MapPin size={16} color={colors.secondaryTeal} />
          </View>
          <View style={styles.gpsTextCol}>
            <View style={styles.gpsStatusRow}>
              <View style={styles.liveGreenDot} />
              <Text style={styles.gpsStatusText}>GPS LOCKED • 3m Accuracy</Text>
            </View>
            <Text style={styles.gpsAddress} numberOfLines={1}>
              {currentUser.gpsAddress}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => Alert.alert('GPS Location', `Current location:\n${currentUser.gpsAddress}`)}
          style={styles.gpsChangeBtn}
        >
          <Text style={styles.gpsChangeText}>Verify</Text>
        </TouchableOpacity>
      </View>

      {/* 3. Emergency Protocol Alert Banner */}
      <View style={styles.protocolBanner}>
        <ShieldAlert size={18} color={colors.error} />
        <Text style={styles.protocolText}>
          INSTANT DISPATCH PROTOCOL ARMED - Hold button for 3 seconds
        </Text>
      </View>

      {/* 4. Master SOS Trigger Button */}
      <View style={styles.sosButtonContainer}>
        {/* Animated Radar Rings */}
        <Animated.View
          style={[
            styles.radarRingOuter,
            { transform: [{ scale: pulseAnim }] },
          ]}
        />
        <Animated.View
          style={[
            styles.radarRingInner,
            { transform: [{ scale: pulseAnim }] },
          ]}
        />

        <TouchableOpacity
          style={[styles.sosMasterBtn, isHolding && styles.sosMasterBtnActive]}
          onPressIn={handleStartHold}
          onPressOut={handleCancelHold}
          activeOpacity={0.9}
        >
          <AlertOctagon size={44} color="#FFFFFF" />
          <Text style={styles.sosMainText}>
            {isHolding ? `HOLD (${countdown})` : 'SOS'}
          </Text>
          <Text style={styles.sosSubText}>
            {isHolding ? 'RELEASING CANCELS' : 'HOLD 3 SEC'}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sosHintText}>
        Press & hold for 3 seconds to send live GPS coordinates, medical ID & trigger nearest trauma ambulance.
      </Text>

      {/* 5. 24x7 Ambulance Dispatch Quick Card */}
      <View style={styles.ambulanceSection}>
        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionHeaderLeft}>
            <View style={styles.ambHeaderIcon}>
              <Ambulance size={18} color={colors.error} />
            </View>
            <Text style={styles.sectionHeading}>Ambulance Service 24*7</Text>
          </View>
          <View style={styles.etaPill}>
            <Text style={styles.etaPillText}>~6 MINS ARRIVAL</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.ambulanceCard}
          onPress={() => onNavigate('Ambulance')}
          activeOpacity={0.85}
        >
          <View style={styles.ambCardTop}>
            <Image
              source={stitchImages.photoAmbulanceVan}
              style={styles.ambCardImage}
              resizeMode="cover"
            />
            <View style={styles.ambCardContent}>
              <View style={styles.nearestBadge}>
                <View style={styles.liveGreenDot} />
                <Text style={styles.nearestBadgeText}>Nearest Unit Available</Text>
              </View>
              <Text style={styles.ambCardTitle}>ALS / BLS ICU Ambulance</Text>
              <Text style={styles.ambCardDesc}>
                Oxygen support, Automated External Defibrillator & Paramedic crew dispatch.
              </Text>
            </View>
          </View>

          <View style={styles.dispatchBtn}>
            <Ambulance size={17} color="#FFFFFF" />
            <Text style={styles.dispatchBtnText}>Select Fleet & Dispatch</Text>
            <ArrowRight size={16} color="#FFFFFF" />
          </View>
        </TouchableOpacity>
      </View>

      {/* 6. Dr.Route Prime Emergency Privilege Network */}
      <View style={styles.primeCard}>
        <View style={styles.primeHeader}>
          <View style={styles.primeTitleRow}>
            <View style={styles.crownBox}>
              <Crown size={20} color={colors.secondaryContainer} />
            </View>
            <View>
              <Text style={styles.primeHeading}>Dr.Route Prime</Text>
              <Text style={styles.primeSub}>Emergency Privilege Network</Text>
            </View>
          </View>
          <View style={styles.primeActiveTag}>
            <View style={styles.liveGreenDot} />
            <Text style={styles.primeActiveText}>Active 24×7</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.joinPrimeBtn}
          onPress={() => Alert.alert('Dr.Route Prime', 'Rahul Sharma is enrolled with Prime Emergency Care Privileges.')}
          activeOpacity={0.85}
        >
          <Crown size={16} color={colors.secondaryContainer} />
          <Text style={styles.joinPrimeBtnText}>Dr.Route Prime Member • Active</Text>
        </TouchableOpacity>

        <View style={styles.primeGrid}>
          <TouchableOpacity
            style={styles.primeGridItem}
            onPress={() => onNavigate('VideoConsult')}
            activeOpacity={0.7}
          >
            <Image source={stitchImages.iconVideoDoctor3D} style={{ width: 34, height: 34, borderRadius: 8 }} resizeMode="contain" />
            <View style={{ flex: 1 }}>
              <Text style={styles.primeItemTitle}>Doctor on Call</Text>
              <Text style={styles.primeItemSub}>Priority Triage</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.primeGridItem}
            onPress={() => onNavigate('Hospitals')}
            activeOpacity={0.7}
          >
            <Image source={stitchImages.iconTrauma3D} style={{ width: 34, height: 34, borderRadius: 8 }} resizeMode="contain" />
            <View style={{ flex: 1 }}>
              <Text style={styles.primeItemTitle}>Trauma Ward</Text>
              <Text style={styles.primeItemSub}>Reserved Bed</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Blood SOS Network */}
        <TouchableOpacity
          style={styles.bloodSosCard}
          onPress={() => Alert.alert('Blood SOS Network', 'Live blood units available in Connaught Place Blood Bank:\n• O+ (14 units)\n• B+ (9 units)\n• A+ (11 units)\n• AB+ (5 units)')}
          activeOpacity={0.8}
        >
          <Image source={stitchImages.iconBlood3D} style={{ width: 44, height: 44, borderRadius: 10 }} resizeMode="contain" />
          <View style={styles.bloodContent}>
            <View style={styles.bloodHeaderRow}>
              <Text style={styles.bloodTitle}>BLOOD SOS NETWORK</Text>
              <View style={styles.bloodGroupPill}>
                <Text style={styles.bloodGroupPillText}>O+, B+, All Groups</Text>
              </View>
            </View>
            <Text style={styles.bloodSub}>
              Nearby Blood Banks & 34 Verified Live Donors within 4 km
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* 7. National Helplines Bar */}
      <View style={styles.helplinesSection}>
        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionHeaderLeft}>
            <PhoneCall size={18} color={colors.primary} />
            <Text style={styles.sectionHeading}>National Helplines</Text>
          </View>
          <View style={styles.tollFreeBadge}>
            <View style={styles.redPingDot} />
            <Text style={styles.tollFreeText}>Toll-Free 24×7</Text>
          </View>
        </View>

        <View style={styles.helplinesGrid}>
          {nationalHelplines.map((item) => {
            const helplineImage =
              item.number === '112'
                ? stitchImages.iconPolice3D
                : item.number === '108'
                ? stitchImages.iconAmbulance3D
                : item.number === '1091'
                ? stitchImages.iconWomenShield3D
                : stitchImages.iconSeniorCare3D;

            return (
              <TouchableOpacity
                key={item.id}
                style={styles.helplineCard}
                onPress={() => handleCall(item.number, item.name)}
                activeOpacity={0.75}
              >
                <View style={styles.helplineCardTop}>
                  <Image
                    source={helplineImage}
                    style={{ width: 38, height: 38, borderRadius: 8 }}
                    resizeMode="contain"
                  />
                  <View
                    style={[
                      styles.helplinePhonePill,
                      {
                        backgroundColor:
                          item.color === colors.error ? colors.errorContainer : colors.surfaceLow,
                      },
                    ]}
                  >
                    <PhoneCall size={13} color={item.color} />
                  </View>
                </View>
                <View style={styles.helplineTextCol}>
                  <Text style={[styles.helplineNumber, { color: item.color }]}>
                    {item.number}
                  </Text>
                  <Text style={[styles.helplineName, { color: item.color }]} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.helplineDesc} numberOfLines={1}>
                    {item.desc}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* 8. Critical Advisory: Golden Hour Protocol */}
      <View style={styles.advisoryBox}>
        <View style={styles.advisoryBoxHeader}>
          <Info size={16} color={colors.secondaryTeal} />
          <Text style={styles.advisoryBoxTitle}>Golden Hour Protocol</Text>
          <View style={styles.mandatoryPill}>
            <Text style={styles.mandatoryText}>MANDATORY</Text>
          </View>
        </View>
        <Text style={styles.advisoryBoxText}>
          Remain at your reported location and keep your phone line open. Our emergency response team, dispatch doctor, or paramedic ambulance crew may contact you immediately for triage. Do not move an injured patient without medical guidance.
        </Text>
      </View>

      {/* 9. Brand & Compliance Footer */}
      <View style={styles.footer}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.footerLogo}
          resizeMode="contain"
        />
        <Text style={styles.footerBrand}>Dr.Route</Text>
        <Text style={styles.footerTagline}>Your 24×7 Lifeline & Emergency Super-App</Text>
        <View style={styles.complianceRow}>
          <View style={styles.compliancePill}>
            <Text style={styles.complianceText}>NDHM / ABHA Compliant</Text>
          </View>
          <View style={styles.compliancePill}>
            <Text style={styles.complianceText}>256-bit Encrypted</Text>
          </View>
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
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: 32,
    gap: spacing.md,
  },
  reassuranceBar: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.secondaryContainer,
    padding: 10,
    gap: 3,
  },
  reassuranceTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reassuranceTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.primary,
  },
  hindiPill: {
    backgroundColor: colors.secondaryTeal,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.full,
  },
  hindiPillText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  reassuranceSub: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  gpsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.outline,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  gpsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  gpsIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gpsTextCol: {
    flex: 1,
  },
  gpsStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  liveGreenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.secondaryTeal,
  },
  gpsStatusText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.secondaryTeal,
  },
  gpsAddress: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    marginTop: 1,
  },
  gpsChangeBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  gpsChangeText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.secondaryTeal,
  },
  protocolBanner: {
    backgroundColor: colors.errorContainer,
    borderRadius: radius.md,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(220, 38, 38, 0.25)',
  },
  protocolText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.onErrorContainer,
    textAlign: 'center',
  },
  sosButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 190,
    position: 'relative',
    marginVertical: 4,
  },
  radarRingOuter: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(220, 38, 38, 0.12)',
  },
  radarRingInner: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(220, 38, 38, 0.22)',
  },
  sosMasterBtn: {
    width: 124,
    height: 124,
    borderRadius: 62,
    backgroundColor: colors.error,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
    shadowColor: colors.error,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 14,
    elevation: 10,
    zIndex: 5,
  },
  sosMasterBtnActive: {
    backgroundColor: colors.errorDark,
    transform: [{ scale: 0.94 }],
  },
  sosMainText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.5,
    marginTop: 2,
  },
  sosSubText: {
    fontSize: 9,
    fontWeight: '800',
    color: 'rgba(255, 255, 255, 0.85)',
    letterSpacing: 0.5,
  },
  sosHintText: {
    fontSize: 11,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 15,
    marginHorizontal: 12,
  },
  ambulanceSection: {
    gap: 8,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ambHeaderIcon: {
    width: 26,
    height: 26,
    borderRadius: 6,
    backgroundColor: colors.errorContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
  },
  etaPill: {
    backgroundColor: colors.errorContainer,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.full,
  },
  etaPillText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.onErrorContainer,
  },
  ambulanceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.outline,
    padding: spacing.md,
    gap: 12,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  ambCardTop: {
    flexDirection: 'row',
    gap: 12,
  },
  ambCardImage: {
    width: 72,
    height: 72,
    borderRadius: radius.md,
  },
  ambCardContent: {
    flex: 1,
    gap: 3,
  },
  nearestBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  nearestBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.secondaryTeal,
  },
  ambCardTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.primary,
  },
  ambCardDesc: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 15,
  },
  dispatchBtn: {
    backgroundColor: colors.error,
    borderRadius: radius.md,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  dispatchBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  primeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: colors.secondaryContainer,
    padding: spacing.md,
    gap: 10,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  primeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.outline,
  },
  primeTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  crownBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primeHeading: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.primary,
  },
  primeSub: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  primeActiveTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.surfaceLow,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.surfaceVariant,
  },
  primeActiveText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.secondaryTeal,
  },
  joinPrimeBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 9,
    borderRadius: radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  joinPrimeBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  primeGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  primeGridItem: {
    flex: 1,
    backgroundColor: colors.surfaceLow,
    borderRadius: radius.md,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: colors.surfaceVariant,
  },
  primeItemTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  primeItemSub: {
    fontSize: 10,
    color: colors.secondaryTeal,
    fontWeight: '600',
  },
  bloodSosCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: 'rgba(220, 38, 38, 0.3)',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  bloodIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.error,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bloodContent: {
    flex: 1,
    gap: 2,
  },
  bloodHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bloodTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.error,
  },
  bloodGroupPill: {
    backgroundColor: colors.errorContainer,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  bloodGroupPillText: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.onErrorContainer,
  },
  bloodSub: {
    fontSize: 10,
    color: colors.textSecondary,
    lineHeight: 13,
  },
  helplinesSection: {
    gap: 8,
  },
  tollFreeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  redPingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.error,
  },
  tollFreeText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.error,
  },
  helplinesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  helplineCard: {
    width: '48.5%',
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.outline,
    padding: 10,
    gap: 6,
  },
  helplineCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  helplinePhonePill: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  helplineIconBox: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  helplineNumber: {
    fontSize: 13,
    fontWeight: '900',
  },
  helplineTextCol: {
    gap: 2,
  },
  helplineName: {
    fontSize: 11,
    fontWeight: '800',
  },
  helplineDesc: {
    fontSize: 9,
    color: colors.textMuted,
  },
  advisoryBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.secondaryContainer,
    padding: 12,
    gap: 6,
  },
  advisoryBoxHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  advisoryBoxTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primary,
    flex: 1,
  },
  mandatoryPill: {
    backgroundColor: colors.secondaryContainer,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: radius.full,
  },
  mandatoryText: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.onSecondaryContainer,
  },
  advisoryBoxText: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 16,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 16,
    gap: 4,
  },
  footerLogo: {
    width: 44,
    height: 44,
  },
  footerBrand: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
  },
  footerTagline: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  complianceRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 4,
  },
  compliancePill: {
    backgroundColor: colors.surfaceLow,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.outline,
  },
  complianceText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.textMuted,
  },
});
