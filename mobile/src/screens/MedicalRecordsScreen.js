import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {
  FileText,
  Search,
  Mic,
  ChevronDown,
  ChevronUp,
  Download,
  Eye,
  CheckCircle2,
  Lock,
  Building2,
  Calendar,
  User,
  HeartPulse,
  Activity,
  Share2,
} from 'lucide-react-native';
import { colors, radius, spacing } from '../theme/colors';

export default function MedicalRecordsScreen({ onNavigate }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [openRx, setOpenRx] = useState(true);
  const [openLabs, setOpenLabs] = useState(true);
  const [openDischarge, setOpenDischarge] = useState(false);

  const prescriptions = [
    {
      id: 'rx-1',
      date: '18 OCT 2026',
      status: 'Active Course',
      hospital: 'Max Super Speciality',
      doctor: 'Dr. Arvind Swaminathan',
      specialty: 'MD, DM Cardiology • Post-Angioplasty Care',
      meds: [
        'Metformin 500mg (1-0-1)',
        'Atorvastatin 10mg (0-0-1)',
        'Ecosprin 75mg (0-1-0)',
      ],
    },
    {
      id: 'rx-2',
      date: '02 SEP 2026',
      status: 'Completed',
      hospital: 'Apollo Indraprastha',
      doctor: 'Dr. Rajesh Sen',
      specialty: 'MD Pulmonology • Seasonal Bronchitis',
      meds: ['Azithromycin 500mg', 'Levocetirizine 5mg'],
    },
  ];

  const labReports = [
    {
      id: 'lab-1',
      title: 'Comprehensive Lipid Profile & HbA1c',
      date: '15 OCT 2026',
      lab: 'Dr. Lal PathLabs • NABL Certified',
      result: 'HbA1c: 6.8% (Borderline Controlled)',
      status: 'Normal',
    },
    {
      id: 'lab-2',
      title: 'Complete Blood Count (CBC) + ESR',
      date: '12 OCT 2026',
      lab: 'Max Diagnostic Center • Saket',
      result: 'Platelets: 2.4 Lakhs • Hemoglobin: 14.2 g/dL',
      status: 'Optimal',
    },
  ];

  const dischargeSummaries = [
    {
      id: 'dc-1',
      hospital: 'Fortis Escorts Heart Institute',
      admissionDate: '10 AUG 2026 - 14 AUG 2026',
      procedure: 'Elective Coronary Angioplasty (Single Stent)',
      doctor: 'Dr. Ashok Seth (Chief Cardiologist)',
      summary: 'Patient discharged hemodynamically stable on dual antiplatelet regimen.',
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* 1. Patient Identity Card */}
      <View style={styles.patientCard}>
        <View style={styles.patientLeft}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>RS</Text>
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.patientNameRow}>
              <Text style={styles.patientName} numberOfLines={1}>Ramesh Sharma</Text>
              <View style={styles.verifiedBadge}>
                <CheckCircle2 size={11} color="#FFFFFF" />
              </View>
              <Text style={styles.selfLabel}>(Self)</Text>
            </View>
            <Text style={styles.patientPid}>ABHA PID: 91-8273-4412-9081</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.switchBtn}
          onPress={() => Alert.alert('Switch Profile', 'Family profiles:\n• Ramesh Sharma (Self)\n• Suman Sharma (Spouse)\n• Aarav Sharma (Child)')}
          activeOpacity={0.7}
        >
          <Text style={styles.switchText}>Switch</Text>
          <ChevronDown size={14} color={colors.secondaryTeal} />
        </TouchableOpacity>
      </View>

      {/* 2. Search & Filter */}
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Search size={16} color={colors.textSecondary} style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search doctor, hospital, lab, Rx..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity onPress={() => Alert.alert('Voice Search', 'Listening for medical record...')}>
            <Mic size={16} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 3. Treatment History Summary Cards */}
      <View style={styles.sectionHeadingRow}>
        <View style={styles.headingWithIcon}>
          <Activity size={18} color={colors.secondaryTeal} />
          <Text style={styles.sectionTitle}>Treatment History</Text>
        </View>
        <View style={styles.episodeTag}>
          <Text style={styles.episodeTagText}>ABDM Synced</Text>
        </View>
      </View>

      <View style={styles.historyGrid}>
        <TouchableOpacity
          style={styles.historyCardActive}
          onPress={() => setOpenRx(true)}
          activeOpacity={0.8}
        >
          <View style={styles.historyTopRow}>
            <HeartPulse size={20} color={colors.secondaryTeal} />
            <View style={styles.activePill}>
              <View style={styles.pulseDot} />
              <Text style={styles.activePillText}>Active</Text>
            </View>
          </View>
          <Text style={styles.historyTitle}>Ongoing Care</Text>
          <Text style={styles.historyDesc} numberOfLines={2}>
            Max Super Speciality • Cardiology Care & 3 Active Meds
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.historyCardPast}
          onPress={() => setOpenDischarge(true)}
          activeOpacity={0.8}
        >
          <View style={styles.historyTopRow}>
            <Building2 size={20} color={colors.primary} />
            <View style={styles.pastPill}>
              <Text style={styles.pastPillText}>Archived</Text>
            </View>
          </View>
          <Text style={styles.historyTitle}>Past Episodes</Text>
          <Text style={styles.historyDesc} numberOfLines={2}>
            Previous Admissions, Surgeries & Old Rx Vault
          </Text>
        </TouchableOpacity>
      </View>

      {/* 4. Portal 1: Doctor Prescriptions (Rx) */}
      <View style={styles.accordionBox}>
        <TouchableOpacity
          style={styles.accordionHeader}
          onPress={() => setOpenRx(!openRx)}
          activeOpacity={0.7}
        >
          <View style={styles.accordionHeaderLeft}>
            <View style={[styles.accordionIconBox, { backgroundColor: colors.secondaryContainer }]}>
              <FileText size={18} color={colors.secondaryTeal} />
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.accordionTitleRow}>
                <Text style={styles.accordionTitle}>Doctor Prescriptions (Rx)</Text>
                <View style={styles.countBadge}>
                  <Text style={styles.countBadgeText}>{prescriptions.length} Records</Text>
                </View>
              </View>
              <Text style={styles.accordionSub}>ABDM Digital Clinical Vault</Text>
            </View>
          </View>
          {openRx ? (
            <ChevronUp size={18} color={colors.textSecondary} />
          ) : (
            <ChevronDown size={18} color={colors.textSecondary} />
          )}
        </TouchableOpacity>

        {openRx && (
          <View style={styles.accordionContent}>
            {prescriptions.map((rx) => (
              <View key={rx.id} style={styles.recordItem}>
                <View style={styles.recordItemHeader}>
                  <View style={styles.dateChip}>
                    <Calendar size={12} color={colors.secondaryTeal} />
                    <Text style={styles.dateChipText}>{rx.date}</Text>
                  </View>
                  <View
                    style={[
                      styles.statusPill,
                      {
                        backgroundColor:
                          rx.status === 'Active Course'
                            ? colors.secondaryContainer
                            : colors.surfaceHigh,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusPillText,
                        {
                          color:
                            rx.status === 'Active Course'
                              ? colors.onSecondaryContainer
                              : colors.textSecondary,
                        },
                      ]}
                    >
                      {rx.status}
                    </Text>
                  </View>
                </View>

                <Text style={styles.recordDoctor}>{rx.doctor}</Text>
                <Text style={styles.recordSpecialty}>{rx.specialty}</Text>
                <Text style={styles.recordHospital}>{rx.hospital}</Text>

                <View style={styles.medsListSubBox}>
                  {rx.meds.map((m, idx) => (
                    <Text key={idx} style={styles.medBulletText}>• {m}</Text>
                  ))}
                </View>

                <View style={styles.recordActionRow}>
                  <TouchableOpacity
                    style={styles.viewRxBtn}
                    onPress={() => Alert.alert('View Prescription', `Prescription by ${rx.doctor}\nDate: ${rx.date}\nHospital: ${rx.hospital}`)}
                    activeOpacity={0.8}
                  >
                    <Eye size={13} color="#FFFFFF" />
                    <Text style={styles.viewRxBtnText}>View Rx</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.iconActionBtn}
                    onPress={() => Alert.alert('Download PDF', 'Prescription PDF downloaded to device storage.')}
                    activeOpacity={0.7}
                  >
                    <Download size={15} color={colors.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.iconActionBtn}
                    onPress={() => Alert.alert('Share Rx', 'Secure ABDM share link generated.')}
                    activeOpacity={0.7}
                  >
                    <Share2 size={15} color={colors.primary} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* 5. Portal 2: Diagnostic Lab Reports */}
      <View style={styles.accordionBox}>
        <TouchableOpacity
          style={styles.accordionHeader}
          onPress={() => setOpenLabs(!openLabs)}
          activeOpacity={0.7}
        >
          <View style={styles.accordionHeaderLeft}>
            <View style={[styles.accordionIconBox, { backgroundColor: '#EEF2FF' }]}>
              <Activity size={18} color="#1D4ED8" />
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.accordionTitleRow}>
                <Text style={styles.accordionTitle}>Diagnostic Lab Reports</Text>
                <View style={[styles.countBadge, { backgroundColor: '#EEF2FF' }]}>
                  <Text style={[styles.countBadgeText, { color: '#1D4ED8' }]}>{labReports.length} Tests</Text>
                </View>
              </View>
              <Text style={styles.accordionSub}>NABL Certified Digital Reports</Text>
            </View>
          </View>
          {openLabs ? (
            <ChevronUp size={18} color={colors.textSecondary} />
          ) : (
            <ChevronDown size={18} color={colors.textSecondary} />
          )}
        </TouchableOpacity>

        {openLabs && (
          <View style={styles.accordionContent}>
            {labReports.map((lab) => (
              <View key={lab.id} style={styles.recordItem}>
                <View style={styles.recordItemHeader}>
                  <Text style={styles.labDate}>{lab.date}</Text>
                  <View style={styles.optimalBadge}>
                    <Text style={styles.optimalText}>{lab.status}</Text>
                  </View>
                </View>
                <Text style={styles.recordDoctor}>{lab.title}</Text>
                <Text style={styles.recordSpecialty}>{lab.lab}</Text>
                <View style={styles.labResultBox}>
                  <Text style={styles.labResultText}>{lab.result}</Text>
                </View>
                <View style={styles.recordActionRow}>
                  <TouchableOpacity
                    style={[styles.viewRxBtn, { backgroundColor: '#1D4ED8' }]}
                    onPress={() => Alert.alert('Lab Report', `${lab.title}\n${lab.result}`)}
                    activeOpacity={0.8}
                  >
                    <Eye size={13} color="#FFFFFF" />
                    <Text style={styles.viewRxBtnText}>View Report</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.iconActionBtn}
                    onPress={() => Alert.alert('Download', 'Lab report downloaded as PDF.')}
                    activeOpacity={0.7}
                  >
                    <Download size={15} color={colors.primary} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* 6. Portal 3: Hospital Discharge Summaries */}
      <View style={styles.accordionBox}>
        <TouchableOpacity
          style={styles.accordionHeader}
          onPress={() => setOpenDischarge(!openDischarge)}
          activeOpacity={0.7}
        >
          <View style={styles.accordionHeaderLeft}>
            <View style={[styles.accordionIconBox, { backgroundColor: colors.surfaceHigh }]}>
              <Building2 size={18} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.accordionTitleRow}>
                <Text style={styles.accordionTitle}>Discharge Summaries</Text>
                <View style={styles.countBadge}>
                  <Text style={styles.countBadgeText}>{dischargeSummaries.length} Records</Text>
                </View>
              </View>
              <Text style={styles.accordionSub}>Inpatient Clinical Summaries</Text>
            </View>
          </View>
          {openDischarge ? (
            <ChevronUp size={18} color={colors.textSecondary} />
          ) : (
            <ChevronDown size={18} color={colors.textSecondary} />
          )}
        </TouchableOpacity>

        {openDischarge && (
          <View style={styles.accordionContent}>
            {dischargeSummaries.map((dc) => (
              <View key={dc.id} style={styles.recordItem}>
                <Text style={styles.dcHospital}>{dc.hospital}</Text>
                <Text style={styles.dcDates}>Stay: {dc.admissionDate}</Text>
                <Text style={styles.dcProcedure}>Procedure: {dc.procedure}</Text>
                <Text style={styles.dcDoc}>Consultant: {dc.doctor}</Text>
                <Text style={styles.dcSummary}>{dc.summary}</Text>
                <View style={styles.recordActionRow}>
                  <TouchableOpacity
                    style={styles.viewRxBtn}
                    onPress={() => Alert.alert('Discharge Summary', `${dc.hospital}\n${dc.procedure}\n${dc.summary}`)}
                    activeOpacity={0.8}
                  >
                    <Eye size={13} color="#FFFFFF" />
                    <Text style={styles.viewRxBtnText}>View Summary</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.iconActionBtn}
                    onPress={() => Alert.alert('Download', 'Discharge summary PDF saved.')}
                    activeOpacity={0.7}
                  >
                    <Download size={15} color={colors.primary} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Security Footer Note */}
      <View style={styles.securityNote}>
        <Lock size={14} color={colors.secondaryTeal} />
        <Text style={styles.securityText}>
          Encrypted 256-bit ABDM Health Locker. Compliant with Ayushman Bharat Digital Mission.
        </Text>
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
  patientCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.xl,
    padding: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.outline,
    marginBottom: spacing.md,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  patientLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  avatarCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  patientNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  patientName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primary,
  },
  verifiedBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.secondaryTeal,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selfLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  patientPid: {
    fontSize: 11,
    color: colors.textSecondary,
    fontFamily: 'monospace',
    marginTop: 2,
  },
  switchBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceLow,
  },
  switchText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.secondaryTeal,
  },
  searchRow: {
    marginBottom: spacing.md,
  },
  searchBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.outline,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    height: 44,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: colors.textPrimary,
  },
  sectionHeadingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headingWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primary,
  },
  episodeTag: {
    backgroundColor: colors.secondaryContainer,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  episodeTagText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.onSecondaryContainer,
  },
  historyGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: spacing.md,
  },
  historyCardActive: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: radius.xl,
    padding: 12,
    borderWidth: 1.5,
    borderColor: colors.secondaryTeal,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  historyCardPast: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: radius.xl,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.outline,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  historyTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  activePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.secondaryContainer,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.full,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.secondaryTeal,
  },
  activePillText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.secondaryTeal,
  },
  pastPill: {
    backgroundColor: colors.surfaceHigh,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.full,
  },
  pastPillText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  historyTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 3,
  },
  historyDesc: {
    fontSize: 10,
    color: colors.textSecondary,
    lineHeight: 14,
  },
  accordionBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.outline,
    overflow: 'hidden',
    marginBottom: spacing.md,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  accordionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  accordionIconBox: {
    width: 36,
    height: 36,
    borderRadius: radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accordionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  accordionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  countBadge: {
    backgroundColor: colors.surfaceLow,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: radius.full,
  },
  countBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.secondaryTeal,
  },
  accordionSub: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 1,
  },
  accordionContent: {
    paddingHorizontal: 12,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: colors.outline,
  },
  recordItem: {
    backgroundColor: colors.surfaceLow,
    borderRadius: radius.lg,
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.outline,
  },
  recordItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  dateChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.outline,
  },
  dateChipText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.secondaryTeal,
  },
  statusPill: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.full,
  },
  statusPillText: {
    fontSize: 9,
    fontWeight: '700',
  },
  recordDoctor: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  recordSpecialty: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 1,
  },
  recordHospital: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.secondaryTeal,
    marginTop: 2,
  },
  medsListSubBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    padding: 8,
    marginTop: 6,
    borderWidth: 1,
    borderColor: colors.outline,
  },
  medBulletText: {
    fontSize: 11,
    color: colors.primary,
    lineHeight: 16,
  },
  recordActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  viewRxBtn: {
    flex: 1,
    backgroundColor: colors.secondaryTeal,
    borderRadius: radius.md,
    paddingVertical: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  viewRxBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  iconActionBtn: {
    width: 32,
    height: 32,
    borderRadius: radius.md,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.outline,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labDate: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  optimalBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.full,
  },
  optimalText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#059669',
  },
  labResultBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    padding: 6,
    marginTop: 4,
    borderWidth: 1,
    borderColor: colors.outline,
  },
  labResultText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.primary,
  },
  dcHospital: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  dcDates: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 1,
  },
  dcProcedure: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.secondaryTeal,
    marginTop: 2,
  },
  dcDoc: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 1,
  },
  dcSummary: {
    fontSize: 11,
    color: colors.primary,
    marginTop: 4,
    lineHeight: 15,
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.surfaceLow,
    padding: 10,
    borderRadius: radius.lg,
    marginTop: 6,
    borderWidth: 1,
    borderColor: colors.outline,
  },
  securityText: {
    flex: 1,
    fontSize: 10,
    color: colors.textSecondary,
    lineHeight: 14,
  },
});
