import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {
  User,
  ShieldCheck,
  AlertTriangle,
  Heart,
  Droplet,
  FileText,
  Download,
  Share2,
  ChevronRight,
  Settings,
  HelpCircle,
  LogOut,
  Sparkles,
  PhoneCall,
  Clock,
  Radio,
} from 'lucide-react-native';
import { colors, radius, spacing } from '../theme/colors';
import { currentUser, healthRecords } from '../data/mockData';
import { stitchImages } from '../assets/stitchImages';

export default function AccountScreen({ onNavigate }) {
  const [nfcActive, setNfcActive] = useState(false);

  const handleNfcBroadcast = () => {
    setNfcActive(!nfcActive);
    Alert.alert(
      nfcActive ? 'NFC Beacon Disabled' : 'Paramedic NFC Beacon Active 📡',
      nfcActive
        ? 'Lock screen emergency broadcast is paused.'
        : 'Emergency first-responders can now tap their smartphone to read your blood group (O+), drug allergies (Penicillin), and emergency contact.'
    );
  };

  const handleDownloadRecord = (title) => {
    Alert.alert('Record Downloaded 📄', `${title} downloaded to your device storage.`);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* 1. Hero Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.profileTopRow}>
          <View style={styles.avatarWrapper}>
            <Image
              source={stitchImages.userAvatar}
              style={styles.avatarImage}
            />
            <View style={styles.verifiedBadge}>
              <ShieldCheck size={13} color="#FFFFFF" />
            </View>
          </View>

          <View style={styles.profileDetails}>
            <View style={styles.nameRow}>
              <Text style={styles.userName}>{currentUser.name}</Text>
              <View style={styles.agePill}>
                <Text style={styles.agePillText}>{currentUser.age} Yrs</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{currentUser.gender} • </Text>
              <Text style={styles.bloodGroupBadge}>{currentUser.bloodGroup}</Text>
            </View>

            <View style={styles.abhaIdRow}>
              <ShieldCheck size={12} color={colors.secondaryTeal} />
              <Text style={styles.abhaIdText}>ABHA: {currentUser.abhaIdSecondary}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => Alert.alert('Edit Profile', 'Update personal details & emergency contacts')}
            activeOpacity={0.7}
          >
            <Text style={styles.editBtnText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Telemetry & Health Score Bar */}
        <View style={styles.profileMetricsRow}>
          <View style={styles.metricCol}>
            <Text style={styles.metricColLabel}>Health Score</Text>
            <Text style={styles.metricColValue}>
              {currentUser.healthScore}
              <Text style={styles.scoreMax}>/100</Text>
            </Text>
          </View>
          <View style={styles.metricDivider} />
          <View style={styles.metricCol}>
            <Text style={styles.metricColLabel}>Appointments</Text>
            <Text style={[styles.metricColValue, { color: colors.primary }]}>
              {currentUser.todayAppointmentsCount} Today
            </Text>
          </View>
          <View style={styles.metricDivider} />
          <View style={styles.metricCol}>
            <Text style={styles.metricColLabel}>Active Meds</Text>
            <Text style={[styles.metricColValue, { color: colors.secondaryTeal }]}>
              {currentUser.activeMedsCount} Daily
            </Text>
          </View>
        </View>
      </View>

      {/* 2. Paramedic Medical Card (Emergency Lock Screen Access) */}
      <View style={styles.emergencyCard}>
        <View style={styles.emergencyCardHeader}>
          <View style={styles.emergencyHeaderLeft}>
            <View style={styles.beaconCircle}>
              <AlertTriangle size={18} color="#FFFFFF" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.emergencyHeading} numberOfLines={1}>Paramedic Medical Card</Text>
              <Text style={styles.emergencySub}>Instant First-Responder Beacon</Text>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.nfcBtn, nfcActive && styles.nfcBtnActive]}
            onPress={handleNfcBroadcast}
            activeOpacity={0.8}
          >
            <Radio size={12} color={nfcActive ? '#FFFFFF' : colors.error} />
            <Text style={[styles.nfcBtnText, nfcActive && { color: '#FFFFFF' }]}>
              {nfcActive ? 'NFC ON' : 'NFC Beacon'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Critical Clinical Matrix */}
        <View style={styles.clinicalMatrix}>
          <View style={styles.matrixBox}>
            <Text style={styles.matrixLabel}>ALLERGIES</Text>
            <Text style={styles.matrixValue}>{currentUser.allergies.join(', ')}</Text>
          </View>

          <View style={styles.matrixBox}>
            <Text style={styles.matrixLabel}>CHRONIC CONDITIONS</Text>
            <Text style={styles.matrixValue}>{currentUser.chronicConditions.join(', ')}</Text>
          </View>

          <View style={styles.matrixBox}>
            <Text style={styles.matrixLabel}>ORGAN DONOR</Text>
            <Text style={[styles.matrixValue, { color: colors.secondaryTeal }]}>
              {currentUser.organDonor}
            </Text>
          </View>

          <View style={styles.matrixBox}>
            <Text style={styles.matrixLabel}>GUARDIAN CONTACT</Text>
            <Text style={styles.matrixValue}>{currentUser.emergencyContact.name}</Text>
            <Text style={styles.matrixSub}>{currentUser.emergencyContact.phone}</Text>
          </View>
        </View>
      </View>

      {/* 3. Health Locker & ABHA Clinical Records */}
      <View style={styles.recordsSection}>
        <View style={styles.recordsHeader}>
          <Text style={styles.sectionHeading}>ABHA Clinical Records</Text>
          <TouchableOpacity
            onPress={() => Alert.alert('Sync ABHA Records', 'Connecting to National Health Network gateway...')}
          >
            <Text style={styles.syncText}>Sync Gateway</Text>
          </TouchableOpacity>
        </View>

        {healthRecords.map((rec) => (
          <View key={rec.id} style={styles.recordCard}>
            <View style={styles.recordLeft}>
              <View style={styles.recordIconBox}>
                <FileText size={20} color={colors.secondaryTeal} />
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.recordTagRow}>
                  <Text style={styles.recordTag}>{rec.tag}</Text>
                  <Text style={styles.recordSize}>{rec.size}</Text>
                </View>
                <Text style={styles.recordTitle}>{rec.title}</Text>
                <Text style={styles.recordMeta}>
                  {rec.doctor} • {rec.hospital}
                </Text>
                <Text style={styles.recordDate}>{rec.date}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.downloadBtn}
              onPress={() => handleDownloadRecord(rec.title)}
              activeOpacity={0.7}
            >
              <Download size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* 4. App Preferences & Support Links */}
      <View style={styles.settingsSection}>
        <Text style={styles.sectionHeading}>Preferences & Support</Text>

        <TouchableOpacity
          style={styles.settingsRow}
          onPress={() => onNavigate('Hospitals')}
          activeOpacity={0.7}
        >
          <View style={styles.settingsRowLeft}>
            <ShieldCheck size={18} color={colors.secondaryTeal} />
            <Text style={styles.settingsTitle}>Ayushman Bharat & TPA Insurance</Text>
          </View>
          <ChevronRight size={16} color={colors.textMuted} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingsRow}
          onPress={() => Alert.alert('Customer Care 24x7', 'Dr.Route Dedicated Care Manager:\n+91 1800 200 4000\nsupport@drroute.in')}
          activeOpacity={0.7}
        >
          <View style={styles.settingsRowLeft}>
            <HelpCircle size={18} color={colors.primary} />
            <Text style={styles.settingsTitle}>24x7 Patient Support & Triage</Text>
          </View>
          <ChevronRight size={16} color={colors.textMuted} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingsRow}
          onPress={() => Alert.alert('Dr.Route Version', 'Dr.Route Mobile App v1.0.0 (Expo SDK 58)\nDesign System: Arogya Pulse\nStitch Project ID: 12693612839997683271')}
          activeOpacity={0.7}
        >
          <View style={styles.settingsRowLeft}>
            <Settings size={18} color={colors.primary} />
            <Text style={styles.settingsTitle}>App Settings & Security</Text>
          </View>
          <ChevronRight size={16} color={colors.textMuted} />
        </TouchableOpacity>
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
    paddingTop: spacing.xs,
    paddingBottom: 24,
    gap: spacing.md,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.outline,
    gap: 12,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  profileTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.secondaryTeal,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileDetails: {
    flex: 1,
    gap: 2,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  userName: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
  },
  agePill: {
    backgroundColor: colors.surfaceLow,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  agePillText: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoLabel: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  bloodGroupBadge: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.error,
    backgroundColor: colors.errorContainer,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  abhaIdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  abhaIdText: {
    fontSize: 10,
    color: colors.secondaryTeal,
    fontWeight: '700',
  },
  editBtn: {
    backgroundColor: colors.surfaceLow,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.outline,
  },
  editBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
  },
  profileMetricsRow: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceLow,
    borderRadius: radius.md,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.surfaceVariant,
    alignItems: 'center',
  },
  metricCol: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  metricColLabel: {
    fontSize: 9,
    color: colors.textMuted,
    fontWeight: '600',
  },
  metricColValue: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.secondaryTeal,
  },
  scoreMax: {
    fontSize: 10,
    color: colors.textMuted,
    fontWeight: '400',
  },
  metricDivider: {
    width: 1,
    height: 24,
    backgroundColor: colors.surfaceVariant,
  },
  emergencyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 2,
    borderColor: 'rgba(220, 38, 38, 0.3)',
    gap: 12,
  },
  emergencyCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(220, 38, 38, 0.15)',
  },
  emergencyHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  beaconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.error,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emergencyHeading: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.primary,
  },
  emergencySub: {
    fontSize: 10,
    color: colors.error,
    fontWeight: '700',
  },
  nfcBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.errorContainer,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  nfcBtnActive: {
    backgroundColor: colors.error,
  },
  nfcBtnText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.onErrorContainer,
  },
  clinicalMatrix: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  matrixBox: {
    width: '48.5%',
    backgroundColor: colors.surfaceLow,
    borderRadius: radius.md,
    padding: 8,
    borderWidth: 1,
    borderColor: colors.outline,
    gap: 2,
  },
  matrixLabel: {
    fontSize: 8,
    fontWeight: '800',
    color: colors.textMuted,
  },
  matrixValue: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  matrixSub: {
    fontSize: 9,
    color: colors.textSecondary,
  },
  recordsSection: {
    gap: 10,
  },
  recordsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.primary,
  },
  syncText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.secondaryTeal,
  },
  recordCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.lg,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.outline,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  recordLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    flex: 1,
  },
  recordIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: colors.surfaceLow,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  recordTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  recordTag: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.secondaryTeal,
    backgroundColor: colors.surfaceLow,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  recordSize: {
    fontSize: 9,
    color: colors.textMuted,
  },
  recordTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    marginTop: 2,
  },
  recordMeta: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 1,
  },
  recordDate: {
    fontSize: 9,
    color: colors.textMuted,
    marginTop: 1,
  },
  downloadBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.surfaceLow,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.outline,
  },
  settingsSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.outline,
    gap: 10,
  },
  settingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.outline,
  },
  settingsRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  settingsTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textPrimary,
  },
});
