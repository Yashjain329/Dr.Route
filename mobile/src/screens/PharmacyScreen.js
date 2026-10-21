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
  ShoppingCart,
  Upload,
  Zap,
  ShieldCheck,
  Snowflake,
  Plus,
  Minus,
  Check,
  ChevronRight,
  Info,
  Clock,
  Sparkles,
  Camera,
  MapPin,
} from 'lucide-react-native';
import { colors, radius, spacing } from '../theme/colors';
import { pharmacyProducts, otcCategories, currentUser } from '../data/mockData';
import { stitchImages } from '../assets/stitchImages';

export default function PharmacyScreen({ onNavigate }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState({ p1: 1, p2: 1 });
  const [selectedCategory, setSelectedCategory] = useState(null);

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  const handleAddToCart = (id, name) => {
    setCart((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
    Alert.alert('Added to Cart 🛒', `${name} added to your Dr.Route Pharmacy order.`);
  };

  const handleCartOpen = () => {
    const total = Object.entries(cart).reduce((sum, [id, qty]) => {
      const prod = pharmacyProducts.find((p) => p.id === id);
      return sum + (prod ? prod.price * qty : 0);
    }, 0);

    Alert.alert(
      `Dr.Route Express Pharmacy Cart (${cartCount} items)`,
      `Order Total: ₹${total}\nDeliver to: ${currentUser.cityShort}\nEst. Delivery: ~35 mins (Express)`,
      [
        { text: 'Continue Shopping', style: 'cancel' },
        {
          text: 'Place Order (₹' + total + ')',
          onPress: () => {
            setCart({});
            Alert.alert('Order Placed Successfully! 💊', 'Your express medicine delivery is being packed by Apollo Pharmacy Indiranagar.');
          },
        },
      ]
    );
  };

  const handleUploadRx = () => {
    Alert.alert(
      'Upload Doctor Prescription (Parchee)',
      'Choose method to upload your medical prescription:',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Take Camera Photo 📷',
          onPress: () => Alert.alert('Prescription Uploaded', 'Our certified clinical pharmacist is verifying the medicine doses.'),
        },
        {
          text: 'Select from ABHA Records 📁',
          onPress: () => onNavigate('Account'),
        },
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
        {/* Delivery Location & Cart Row */}
        <View style={styles.deliveryRow}>
          <View style={styles.deliveryLeft}>
            <MapPin size={14} color={colors.secondaryTeal} />
            <Text style={styles.deliveryLabel}>Deliver to: </Text>
            <Text style={styles.deliveryCity}>{currentUser.cityShort}</Text>
          </View>
          <TouchableOpacity
            style={styles.cartBtn}
            onPress={handleCartOpen}
            activeOpacity={0.8}
          >
            <ShoppingCart size={18} color={colors.primary} />
            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBox}>
          <Search size={18} color={colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search medicines, salts, health brands..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity onPress={handleUploadRx}>
            <Camera size={18} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Authentic Stitch Pharmacy Hero Banner */}
        <View style={styles.bannerWrapper}>
          <Image
            source={stitchImages.photoPharmacyBanner}
            style={styles.heroBannerImage}
            resizeMode="cover"
          />
          <View style={styles.bannerOverlay}>
            <View style={styles.bannerBadge}>
              <Zap size={11} color="#FFFFFF" />
              <Text style={styles.bannerBadgeText}>15-MIN EXPRESS HUB</Text>
            </View>
            <Text style={styles.bannerHeading}>Authentic Meds Delivered</Text>
            <Text style={styles.bannerSub}>100% Genuine batch verified • Cold chain storage</Text>
          </View>
        </View>

        {/* Prescription Notice & Direct OTC Order Card */}
        <View style={styles.promoGrid}>
          <View style={styles.otcNoticeCard}>
            <View style={styles.otcNoticeHeader}>
              <View style={styles.infoBadge}>
                <Info size={13} color={colors.secondaryTeal} />
              </View>
              <Text style={styles.otcNoticeTag}>OTC Direct</Text>
            </View>
            <Text style={styles.otcNoticeTitle}>Direct Order Notice</Text>
            <Text style={styles.otcNoticeSub}>
              Only daily healthcare essentials and OTC meds can be ordered without prescription.
            </Text>
            <View style={styles.doctorSlipRow}>
              <ShieldCheck size={12} color={colors.secondaryTeal} />
              <Text style={styles.doctorSlipText}>Doctor slip needed for Rx</Text>
            </View>
          </View>

          <View style={styles.rxUploadCard}>
            <View style={styles.rxHeaderRow}>
              <View style={styles.boltTag}>
                <Zap size={10} color="#FFFFFF" />
                <Text style={styles.boltTagText}>15-Min Delivery</Text>
              </View>
            </View>
            <Text style={styles.rxTitle}>Upload Prescription</Text>
            <Text style={styles.rxSub}>
              Have a doctor's slip? Upload a photo & let pharmacist arrange medicines.
            </Text>
            <TouchableOpacity
              style={styles.uploadRxBtn}
              onPress={handleUploadRx}
              activeOpacity={0.8}
            >
              <Upload size={13} color="#FFFFFF" />
              <Text style={styles.uploadRxBtnText}>Upload Parchee</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Express Delivery Guarantees */}
        <View style={styles.guaranteeCard}>
          <View style={styles.guaranteeCol}>
            <Zap size={16} color={colors.secondaryTeal} />
            <Text style={styles.guaranteeTitle}>Under 60 Min</Text>
            <Text style={styles.guaranteeSub}>Express delivery</Text>
          </View>
          <View style={styles.guaranteeDivider} />
          <View style={styles.guaranteeCol}>
            <ShieldCheck size={16} color={colors.secondaryTeal} />
            <Text style={styles.guaranteeTitle}>100% Genuine</Text>
            <Text style={styles.guaranteeSub}>Verified batch test</Text>
          </View>
          <View style={styles.guaranteeDivider} />
          <View style={styles.guaranteeCol}>
            <Snowflake size={16} color={colors.secondaryTeal} />
            <Text style={styles.guaranteeTitle}>Cold-Chain</Text>
            <Text style={styles.guaranteeSub}>2°C - 8°C box</Text>
          </View>
        </View>

        {/* Categories Horizontal */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionHeading}>Browse OTC Categories</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScroll}
          >
            {otcCategories.map((cat) => {
              const isSelected = selectedCategory === cat.name;
              return (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.categoryPill,
                    isSelected && styles.categoryPillSelected,
                  ]}
                  onPress={() => setSelectedCategory(isSelected ? null : cat.name)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.categoryPillText,
                      isSelected && styles.categoryPillTextSelected,
                    ]}
                  >
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Popular Essentials */}
        <View style={styles.productsSection}>
          <View style={styles.productsHeaderRow}>
            <Text style={styles.sectionHeading}>Quick OTC Re-Order</Text>
            <Text style={styles.noSlipSub}>No Doctor Slip Needed</Text>
          </View>

          <View style={styles.productsGrid}>
            {pharmacyProducts.map((prod) => (
              <View key={prod.id} style={styles.productCard}>
                <View style={styles.prodTopRow}>
                  <View style={styles.otcSafeBadge}>
                    <Text style={styles.otcSafeText}>{prod.tag}</Text>
                  </View>
                  <Text style={styles.discountText}>{prod.discount}</Text>
                </View>

                <Image
                  source={typeof prod.image === 'number' ? prod.image : { uri: prod.image }}
                  style={styles.productImage}
                  resizeMode="contain"
                />

                <Text style={styles.productName} numberOfLines={1}>
                  {prod.name}
                </Text>
                <Text style={styles.productUnit}>{prod.unit}</Text>

                <View style={styles.priceRow}>
                  <View>
                    <Text style={styles.priceText}>₹{prod.price}</Text>
                    <Text style={styles.originalPriceText}>₹{prod.originalPrice}</Text>
                  </View>

                  <TouchableOpacity
                    style={styles.addBtn}
                    onPress={() => handleAddToCart(prod.id, prod.name)}
                    activeOpacity={0.8}
                  >
                    <Plus size={14} color="#FFFFFF" />
                    <Text style={styles.addBtnText}>Add</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Floating Checkout Pill if cart has items */}
      {cartCount > 0 && (
        <View style={styles.floatingCartBar}>
          <View style={styles.floatingCartLeft}>
            <ShoppingCart size={18} color="#FFFFFF" />
            <Text style={styles.floatingCartItems}>{cartCount} items selected</Text>
          </View>

          <TouchableOpacity
            style={styles.floatingCheckoutBtn}
            onPress={handleCartOpen}
            activeOpacity={0.85}
          >
            <Text style={styles.floatingCheckoutText}>View Cart & Checkout</Text>
            <ChevronRight size={16} color={colors.primary} />
          </TouchableOpacity>
        </View>
      )}
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
  deliveryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.outline,
  },
  deliveryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  deliveryLabel: {
    fontSize: 11,
    color: colors.textMuted,
  },
  deliveryCity: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  cartBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.surfaceLow,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -3,
    right: -3,
    backgroundColor: colors.secondaryTeal,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FFFFFF',
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
  promoGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  otcNoticeCard: {
    flex: 1,
    backgroundColor: colors.surfaceLow,
    borderRadius: radius.md,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.surfaceVariant,
    justifyContent: 'space-between',
  },
  otcNoticeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.surfaceVariant,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otcNoticeTag: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.secondaryTeal,
  },
  otcNoticeTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primary,
    marginTop: 4,
  },
  otcNoticeSub: {
    fontSize: 10,
    color: colors.textSecondary,
    lineHeight: 13,
    marginTop: 2,
  },
  doctorSlipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: colors.surfaceVariant,
  },
  doctorSlipText: {
    fontSize: 9,
    fontWeight: '600',
    color: colors.secondaryTeal,
  },
  rxUploadCard: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    padding: 10,
    justifyContent: 'space-between',
    gap: 4,
  },
  rxHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boltTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: colors.secondaryTeal,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.full,
  },
  boltTagText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  rxTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  rxSub: {
    fontSize: 10,
    color: colors.surfaceVariant,
    lineHeight: 13,
  },
  uploadRxBtn: {
    backgroundColor: colors.secondaryTeal,
    borderRadius: radius.sm,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginTop: 4,
  },
  uploadRxBtnText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  guaranteeCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.outline,
    alignItems: 'center',
  },
  guaranteeCol: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  guaranteeTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.primary,
  },
  guaranteeSub: {
    fontSize: 9,
    color: colors.textMuted,
  },
  guaranteeDivider: {
    width: 1,
    height: 26,
    backgroundColor: colors.outline,
  },
  categoriesSection: {
    gap: 8,
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.primary,
  },
  categoryScroll: {
    flexDirection: 'row',
    gap: 6,
  },
  categoryPill: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.outline,
  },
  categoryPillSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  categoryPillTextSelected: {
    color: '#FFFFFF',
  },
  productsSection: {
    gap: 10,
  },
  productsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noSlipSub: {
    fontSize: 11,
    color: colors.secondaryTeal,
    fontWeight: '700',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  productCard: {
    width: '48.5%',
    backgroundColor: '#FFFFFF',
    borderRadius: radius.lg,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.outline,
    gap: 6,
  },
  prodTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  otcSafeBadge: {
    backgroundColor: colors.successLight,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  otcSafeText: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.secondaryTeal,
  },
  discountText: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.error,
  },
  productImage: {
    width: '100%',
    height: 90,
    borderRadius: radius.md,
  },
  productName: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  productUnit: {
    fontSize: 10,
    color: colors.textMuted,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  priceText: {
    fontSize: 14,
    fontWeight: '900',
    color: colors.primary,
  },
  originalPriceText: {
    fontSize: 10,
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },
  addBtn: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.sm,
  },
  addBtnText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  floatingCartBar: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  floatingCartLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  floatingCartItems: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  floatingCheckoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.secondaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: radius.full,
  },
  floatingCheckoutText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.primary,
  },
  bannerWrapper: {
    borderRadius: radius.xl,
    overflow: 'hidden',
    height: 120,
    marginBottom: spacing.md,
    backgroundColor: colors.primary,
    position: 'relative',
  },
  heroBannerImage: {
    width: '100%',
    height: '100%',
    opacity: 0.85,
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(11, 37, 69, 0.45)',
    padding: spacing.md,
    justifyContent: 'center',
  },
  bannerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.secondaryTeal,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
    marginBottom: 4,
  },
  bannerBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  bannerHeading: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  bannerSub: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 2,
  },
});
