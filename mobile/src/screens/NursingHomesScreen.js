import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import {
  Search,
  Mic,
  Star,
  MapPin,
  Phone,
  ArrowRight,
  ShieldCheck,
  Building,
  Heart,
  Calendar,
} from 'lucide-react-native';
import { colors, radius, spacing } from '../theme/colors';
import { stitchImages } from '../assets/stitchImages';

export default function NursingHomesScreen({ onNavigate }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const nursingHomes = [
    {
      id: 'nh-1',
      name: 'Aarogya Vridhi Senior Living & Nursing Care',
      tag: 'Featured Partner',
      rating: 4.9,
      accreditation: 'NABH Accredited • 24×7 Geriatric & Post-Op Recovery',
      location: 'Indiranagar, Bengaluru • 2.4 km',
      dailyCharge: '₹XYZ / day',
      nurse: '100% Verified RN',
      admissionFee: '₹XYZ Free',
      phone: '+91 11 4141 4141',
      image: stitchImages.photoHomeNursing,
    },
    {
      id: 'nh-2',
      name: 'Sanjeevani Elder Care & Rehabilitation',
      tag: 'Ortho & Neuro',
      rating: 4.8,
      accreditation: 'Ortho, Neuro & Tracheostomy Post-Hospital Care',
      location: 'HSR Layout Sector 3 • 4.1 km',
      dailyCharge: '₹XYZ / day',
      nurse: 'Dedicated Physio',
      admissionFee: '₹XYZ Free',
      phone: '+91 11 4713 5000',
      image: stitchImages.photoElderRehab,
    },
    {
      id: 'nh-3',
      name: 'Smriti Dementia & Senior Sanctuary',
      tag: 'Memory Care',
      rating: 4.7,
      accreditation: 'Memory Wing Open • RFID Secured Alzheimer Care',
      location: 'Whitefield, Bengaluru • 5.8 km',
      dailyCharge: '₹XYZ / day',
      nurse: 'Specialized Attendants',
      admissionFee: '₹XYZ Free',
      phone: '+91 11 2692 5858',
      image: stitchImages.photoPhysiotherapy,
    },
  ];

  const filteredHomes =
    activeFilter === 'All'
      ? nursingHomes
      : activeFilter === 'Assisted'
      ? nursingHomes.filter((h) => h.id === 'nh-1' || h.id === 'nh-2')
      : nursingHomes.filter((h) => h.id === 'nh-3');

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* 1. Search Bar */}
      <View style={styles.searchBox}>
        <Search size={16} color={colors.textSecondary} style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search nursing home, care type (Elder Care, ICU...)"
          placeholderTextColor={colors.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={() => Alert.alert('Voice Search', 'Speak care type...')}>
          <Mic size={16} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* 2. Featured Partner Hero Banner (Medanta / Aarogya Vridhi style) */}
      <View style={styles.heroCard}>
        <View style={styles.heroTopRow}>
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredBadgeText}>FEATURED PARTNER</Text>
          </View>
          <View style={styles.ratingBadge}>
            <Star size={11} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.ratingText}>4.9</Text>
          </View>
        </View>

        <View style={styles.heroImageWrapper}>
          <Image
            source={stitchImages.photoHomeNursing}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </View>

        <Text style={styles.heroTitle}>Aarogya Vridhi Senior Living & Nursing Care</Text>
        <Text style={styles.heroSub}>
          NABH Accredited • 24×7 Geriatric & Post-Op Recovery Centre
        </Text>

        {/* 3 Metric Boxes */}
        <View style={styles.metricsRow}>
          <View style={styles.metricCol}>
            <Text style={styles.metricLabel}>Daily Charge</Text>
            <Text style={styles.metricVal}>₹XYZ<Text style={styles.metricUnit}>/day</Text></Text>
          </View>
          <View style={styles.metricCol}>
            <Text style={styles.metricLabel}>RN Nurse</Text>
            <Text style={[styles.metricVal, { color: colors.secondaryTeal }]}>100% Verified</Text>
          </View>
          <View style={styles.metricCol}>
            <Text style={styles.metricLabel}>Admission Fee</Text>
            <Text style={[styles.metricVal, { color: colors.secondaryTeal }]}>₹XYZ Free</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.heroBookBtn}
          onPress={() => Alert.alert('Book Admission Visit', 'Appointment request sent to Aarogya Vridhi Care Desk.')}
          activeOpacity={0.85}
        >
          <Calendar size={15} color="#FFFFFF" />
          <Text style={styles.heroBookBtnText}>Book Admission / Visit</Text>
          <ArrowRight size={14} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* 3. Filter Chips */}
      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[styles.filterBtn, activeFilter === 'All' && styles.filterBtnActive]}
          onPress={() => setActiveFilter('All')}
          activeOpacity={0.7}
        >
          <Building size={14} color={activeFilter === 'All' ? '#FFFFFF' : colors.textPrimary} />
          <Text style={[styles.filterBtnText, activeFilter === 'All' && styles.filterBtnTextActive]}>
            All Nursing
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterBtn, activeFilter === 'Assisted' && styles.filterBtnActive]}
          onPress={() => setActiveFilter('Assisted')}
          activeOpacity={0.7}
        >
          <Heart size={14} color={activeFilter === 'Assisted' ? '#FFFFFF' : colors.secondaryTeal} />
          <Text style={[styles.filterBtnText, activeFilter === 'Assisted' && styles.filterBtnTextActive]}>
            Assisted Living
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterBtn, activeFilter === 'Memory' && styles.filterBtnActive]}
          onPress={() => setActiveFilter('Memory')}
          activeOpacity={0.7}
        >
          <ShieldCheck size={14} color={activeFilter === 'Memory' ? '#FFFFFF' : colors.secondaryTeal} />
          <Text style={[styles.filterBtnText, activeFilter === 'Memory' && styles.filterBtnTextActive]}>
            Memory Care
          </Text>
        </TouchableOpacity>
      </View>

      {/* 4. Partner Nursing Homes List */}
      <View style={styles.listHeaderRow}>
        <Text style={styles.listHeaderTitle}>Partner Facilities</Text>
        <Text style={styles.listHeaderSub}>Live Bed Inventory & Care Queue</Text>
      </View>

      {filteredHomes.map((home) => (
        <View key={home.id} style={styles.homeCard}>
          <View style={styles.cardImageWrapper}>
            <Image source={home.image} style={styles.cardImage} resizeMode="cover" />
            <View style={styles.cardRatingChip}>
              <Star size={11} color="#F59E0B" fill="#F59E0B" />
              <Text style={styles.cardRatingText}>{home.rating}</Text>
            </View>
          </View>

          <View style={styles.cardContent}>
            <View style={styles.cardHeaderLine}>
              <Text style={styles.cardName} numberOfLines={1}>{home.name}</Text>
              <ShieldCheck size={16} color={colors.secondaryTeal} />
            </View>
            <Text style={styles.cardAccreditation} numberOfLines={2}>
              {home.accreditation}
            </Text>
            <View style={styles.locationRow}>
              <MapPin size={12} color={colors.secondaryTeal} />
              <Text style={styles.locationText}>{home.location}</Text>
            </View>

            <View style={styles.priceStrip}>
              <View>
                <Text style={styles.priceLabel}>Daily Stay Charge</Text>
                <Text style={styles.priceVal}>{home.dailyCharge}</Text>
              </View>
              <View style={styles.feeBadge}>
                <Text style={styles.feeBadgeText}>Admission Fee: {home.admissionFee}</Text>
              </View>
            </View>

            <View style={styles.cardActionsRow}>
              <TouchableOpacity
                style={styles.callBtn}
                onPress={() => Alert.alert('Calling Helpdesk', `Dialing ${home.phone}`)}
                activeOpacity={0.7}
              >
                <Phone size={13} color={colors.secondaryTeal} />
                <Text style={styles.callBtnText}>Call Now</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.bookBtn}
                onPress={() => Alert.alert('Admission Request', `Admission inquiry sent to ${home.name}.`)}
                activeOpacity={0.8}
              >
                <Text style={styles.bookBtnText}>Book Visit</Text>
                <ArrowRight size={13} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
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
  searchBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.outline,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    height: 44,
    marginBottom: spacing.md,
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    color: colors.textPrimary,
  },
  heroCard: {
    backgroundColor: colors.primary,
    borderRadius: radius.xxl,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  featuredBadge: {
    backgroundColor: colors.secondaryTeal,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.sm,
  },
  featuredBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  heroImageWrapper: {
    width: '100%',
    height: 120,
    borderRadius: radius.lg,
    overflow: 'hidden',
    marginBottom: 10,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
  },
  heroSub: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 11,
    marginTop: 2,
    lineHeight: 15,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 12,
  },
  metricCol: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: radius.md,
    padding: 8,
    alignItems: 'center',
  },
  metricLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 9,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  metricVal: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 2,
  },
  metricUnit: {
    fontSize: 9,
    fontWeight: '400',
  },
  heroBookBtn: {
    backgroundColor: colors.secondaryTeal,
    borderRadius: radius.lg,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  heroBookBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: spacing.md,
  },
  filterBtn: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.outline,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  filterBtnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  filterBtnTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  listHeaderRow: {
    marginBottom: 10,
  },
  listHeaderTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primary,
  },
  listHeaderSub: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 1,
  },
  homeCard: {
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
  cardImageWrapper: {
    width: '100%',
    height: 120,
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardRatingChip: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0,16,38,0.8)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.sm,
  },
  cardRatingText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  cardContent: {
    padding: 12,
  },
  cardHeaderLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
    flex: 1,
    marginRight: 6,
  },
  cardAccreditation: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
    lineHeight: 15,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
  },
  locationText: {
    fontSize: 11,
    color: colors.secondaryTeal,
    fontWeight: '600',
  },
  priceStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surfaceLow,
    borderRadius: radius.md,
    padding: 8,
    marginTop: 8,
  },
  priceLabel: {
    fontSize: 9,
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
  priceVal: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  feeBadge: {
    backgroundColor: colors.secondaryContainer,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  feeBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.onSecondaryContainer,
  },
  cardActionsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  callBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.secondaryTeal,
    borderRadius: radius.md,
    paddingVertical: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  callBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.secondaryTeal,
  },
  bookBtn: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  bookBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
