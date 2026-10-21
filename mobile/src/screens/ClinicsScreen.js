import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import {
  Search,
  Stethoscope,
  Heart,
  Baby,
  Smile,
  Activity,
  Sparkles,
  Shield,
  Video,
  Calendar,
  Clock,
  Star,
  MapPin,
  CheckCircle2,
  ChevronRight,
  User,
} from 'lucide-react-native';
import { colors, radius, spacing } from '../theme/colors';
import { doctorsDirectory, departmentsList } from '../data/mockData';

export default function ClinicsScreen({ onNavigate }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');
  const [consultType, setConsultType] = useState('all');

  const filteredDoctors = doctorsDirectory.filter((doc) => {
    if (selectedDept !== 'all') {
      if (selectedDept === 'cardiology' && doc.department !== 'Cardiology') return false;
      if (selectedDept === 'general' && doc.department !== 'General Medicine') return false;
      if (selectedDept === 'pediatrics' && doc.department !== 'Pediatrics') return false;
      if (selectedDept === 'gynecology' && doc.department !== 'Gynecology') return false;
      if (selectedDept === 'orthopedics' && doc.department !== 'Orthopedics') return false;
      if (selectedDept === 'dermatology' && doc.department !== 'Dermatology') return false;
    }
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      return (
        doc.name.toLowerCase().includes(q) ||
        doc.department.toLowerCase().includes(q) ||
        doc.hospital.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleBookDoctor = (doc) => {
    Alert.alert(
      `Book Appointment`,
      `Confirm consultation booking with ${doc.name}?\nSlot: ${doc.nextSlot}\nFee: ${doc.fee}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Book In-Clinic',
          onPress: () =>
            Alert.alert(
              'Appointment Confirmed! 🩺',
              `Your in-clinic token has been reserved with ${doc.name} at ${doc.hospital}.\nDate/Time: ${doc.nextSlot}`
            ),
        },
        {
          text: 'Instant Video Call',
          onPress: () => onNavigate('VideoConsult'),
        },
      ]
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Search Input */}
      <View style={styles.searchBox}>
        <Search size={18} color={colors.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search clinic or specialist doctor..."
          placeholderTextColor={colors.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Select Department Horizontal Grid */}
      <View style={styles.sectionBlock}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionHeading}>Select Department</Text>
          <TouchableOpacity onPress={() => setSelectedDept('all')}>
            <Text style={styles.viewAllText}>Reset Filter</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.deptRow}
        >
          {departmentsList.map((dept) => {
            const isSelected = selectedDept === dept.id;
            return (
              <TouchableOpacity
                key={dept.id}
                style={[styles.deptCard, isSelected && styles.deptCardSelected]}
                onPress={() => setSelectedDept(dept.id)}
                activeOpacity={0.75}
              >
                <View
                  style={[
                    styles.deptIconCircle,
                    isSelected && styles.deptIconCircleSelected,
                  ]}
                >
                  <Stethoscope
                    size={20}
                    color={isSelected ? '#FFFFFF' : colors.secondaryTeal}
                  />
                </View>
                <Text
                  style={[styles.deptName, isSelected && styles.deptNameSelected]}
                  numberOfLines={1}
                >
                  {dept.name}
                </Text>
                <Text style={styles.deptCount}>{dept.count}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Consultation Type Selector */}
      <View style={styles.consultTypeBar}>
        <TouchableOpacity
          style={[styles.typeBtn, consultType === 'all' && styles.typeBtnActive]}
          onPress={() => setConsultType('all')}
        >
          <Text style={[styles.typeBtnText, consultType === 'all' && styles.typeBtnTextActive]}>
            All ({filteredDoctors.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.typeBtn, consultType === 'clinic' && styles.typeBtnActive]}
          onPress={() => setConsultType('clinic')}
        >
          <Text style={[styles.typeBtnText, consultType === 'clinic' && styles.typeBtnTextActive]}>
            Clinic Visit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.typeBtn, consultType === 'video' && styles.typeBtnActive]}
          onPress={() => onNavigate('VideoConsult')}
        >
          <Text style={[styles.typeBtnText, consultType === 'video' && styles.typeBtnTextActive]}>
            Instant Video Call
          </Text>
        </TouchableOpacity>
      </View>

      {/* Doctors List */}
      <View style={styles.doctorsSection}>
        <Text style={styles.sectionHeading}>Verified Doctors Available</Text>

        {filteredDoctors.map((doc) => (
          <View key={doc.id} style={styles.doctorCard}>
            <View style={styles.docTopRow}>
              <View style={styles.docImageWrapper}>
                <Image
                  source={typeof doc.image === 'number' ? doc.image : { uri: doc.image }}
                  style={styles.docImage}
                />
                {doc.isAvailableNow && (
                  <View style={styles.availableBadge}>
                    <View style={styles.liveGreenDot} />
                    <Text style={styles.availableText}>Available</Text>
                  </View>
                )}
              </View>

              <View style={styles.docInfo}>
                <View style={styles.docNameRow}>
                  <Text style={styles.docName}>{doc.name}</Text>
                  <View style={styles.ratingRow}>
                    <Star size={11} color="#EAB308" fill="#EAB308" />
                    <Text style={styles.ratingNumber}>{doc.rating}</Text>
                  </View>
                </View>

                <Text style={styles.docDept}>{doc.department}</Text>
                <Text style={styles.docQual}>{doc.qualifications}</Text>
                <Text style={styles.docExp}>{doc.experience}</Text>

                <View style={styles.clinicRow}>
                  <MapPin size={11} color={colors.secondaryTeal} />
                  <Text style={styles.clinicName} numberOfLines={1}>
                    {doc.hospital}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.docDivider} />

            <View style={styles.docBottomRow}>
              <View>
                <Text style={styles.feeLabel}>Consultation Fee</Text>
                <Text style={styles.feeAmount}>{doc.fee}</Text>
                <Text style={styles.slotText}>Next: {doc.nextSlot}</Text>
              </View>

              <View style={styles.docActions}>
                <TouchableOpacity
                  style={styles.videoQuickBtn}
                  onPress={() => onNavigate('VideoConsult')}
                  activeOpacity={0.7}
                >
                  <Video size={15} color={colors.secondaryTeal} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.bookSlotBtn}
                  onPress={() => handleBookDoctor(doc)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.bookSlotText}>Book Appointment</Text>
                  <ChevronRight size={14} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
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
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: colors.outline,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: colors.textPrimary,
  },
  sectionBlock: {
    gap: 8,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.primary,
  },
  viewAllText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.secondaryTeal,
  },
  deptRow: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 4,
  },
  deptCard: {
    width: 82,
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    padding: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.outline,
    gap: 4,
  },
  deptCardSelected: {
    borderColor: colors.secondaryTeal,
    backgroundColor: colors.surfaceLow,
  },
  deptIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.surfaceLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deptIconCircleSelected: {
    backgroundColor: colors.secondaryTeal,
  },
  deptName: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  deptNameSelected: {
    color: colors.secondaryTeal,
    fontWeight: '800',
  },
  deptCount: {
    fontSize: 9,
    color: colors.textMuted,
  },
  consultTypeBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    padding: 3,
    borderWidth: 1,
    borderColor: colors.outline,
    gap: 4,
  },
  typeBtn: {
    flex: 1,
    paddingVertical: 6,
    borderRadius: radius.sm,
    alignItems: 'center',
    backgroundColor: colors.surfaceLow,
  },
  typeBtnActive: {
    backgroundColor: colors.primary,
  },
  typeBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  typeBtnTextActive: {
    color: '#FFFFFF',
  },
  doctorsSection: {
    gap: 10,
  },
  doctorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.outline,
    gap: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  docTopRow: {
    flexDirection: 'row',
    gap: 12,
  },
  docImageWrapper: {
    width: 68,
    height: 68,
    borderRadius: radius.md,
    position: 'relative',
    backgroundColor: colors.surfaceLow,
  },
  docImage: {
    width: '100%',
    height: '100%',
    borderRadius: radius.md,
  },
  availableBadge: {
    position: 'absolute',
    bottom: -4,
    left: 2,
    right: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingVertical: 1,
    borderRadius: radius.full,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    borderWidth: 1,
    borderColor: colors.outline,
  },
  liveGreenDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: colors.secondaryTeal,
  },
  availableText: {
    fontSize: 8,
    fontWeight: '800',
    color: colors.secondaryTeal,
  },
  docInfo: {
    flex: 1,
    gap: 2,
  },
  docNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  docName: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.primary,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: '#FEF9C3',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
  },
  ratingNumber: {
    fontSize: 10,
    fontWeight: '800',
    color: '#854D0E',
  },
  docDept: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.secondaryTeal,
  },
  docQual: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  docExp: {
    fontSize: 10,
    color: colors.textMuted,
  },
  clinicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 2,
  },
  clinicName: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  docDivider: {
    height: 1,
    backgroundColor: colors.outline,
  },
  docBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  feeLabel: {
    fontSize: 9,
    color: colors.textMuted,
  },
  feeAmount: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.primary,
  },
  slotText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.secondaryTeal,
  },
  docActions: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  videoQuickBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceLow,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.surfaceVariant,
  },
  bookSlotBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  bookSlotText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
