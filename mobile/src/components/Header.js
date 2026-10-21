import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Bell, MapPin, ChevronDown, Watch, Wallet, ArrowLeft, ShieldCheck } from 'lucide-react-native';
import { colors, radius, spacing } from '../theme/colors';
import { currentUser } from '../data/mockData';
import { stitchImages } from '../assets/stitchImages';

export default function Header({
  title,
  subtitle,
  showBack,
  onBack,
  showTelemetry = true,
  rightAction,
  onNotificationPress,
  onLocationPress,
  onProfilePress,
}) {
  return (
    <View style={styles.container}>
      {/* Upper Tier */}
      <View style={styles.topRow}>
        {showBack ? (
          <View style={styles.backContainer}>
            <TouchableOpacity
              onPress={onBack}
              style={styles.backButton}
              activeOpacity={0.7}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <ArrowLeft size={22} color={colors.primary} />
            </TouchableOpacity>
            <View style={styles.titleColumn}>
              <View style={styles.brandRow}>
                <Image
                  source={stitchImages.logoRound}
                  style={styles.miniLogo}
                  resizeMode="contain"
                />
                <Text style={styles.screenTitle} numberOfLines={1}>
                  {title || 'Dr.Route'}
                </Text>
              </View>
              {subtitle ? (
                <Text style={styles.screenSubtitle} numberOfLines={1}>
                  {subtitle}
                </Text>
              ) : null}
            </View>
          </View>
        ) : (
          <View style={styles.profileContainer}>
            <TouchableOpacity
              onPress={onProfilePress}
              activeOpacity={0.8}
              style={styles.avatarWrapper}
            >
              <Image
                source={stitchImages.userAvatar}
                style={styles.avatar}
              />
              <View style={styles.verifiedBadge}>
                <ShieldCheck size={11} color="#FFFFFF" />
              </View>
            </TouchableOpacity>

            <View style={styles.userInfo}>
              <View style={styles.brandRow}>
                <Image
                  source={stitchImages.logoRound}
                  style={styles.logoImage}
                  resizeMode="contain"
                />
                <Text style={styles.brandText}>Dr.Route</Text>
              </View>

              <View style={styles.subUserRow}>
                <Text style={styles.greetingText}>Namaste, Rahul</Text>
                <Text style={styles.dotSeparator}>•</Text>
                <TouchableOpacity
                  style={styles.locationBtn}
                  onPress={onLocationPress}
                  activeOpacity={0.7}
                >
                  <MapPin size={12} color={colors.secondaryTeal} />
                  <Text style={styles.locationText} numberOfLines={1}>
                    {currentUser.cityShort}
                  </Text>
                  <ChevronDown size={12} color={colors.textMuted} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* Right side actions */}
        <View style={styles.rightActions}>
          {rightAction ? (
            rightAction
          ) : (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={onNotificationPress}
              activeOpacity={0.7}
            >
              <Bell size={22} color={colors.primary} />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Quick Telemetry & Health Wallet Sub-Strip */}
      {showTelemetry && (
        <View style={styles.subStrip}>
          {/* Smart Band Pill */}
          <View style={styles.telemetryPill}>
            <View style={styles.livePulse}>
              <View style={styles.pingCircle} />
              <View style={styles.solidCircle} />
            </View>
            <Watch size={13} color={colors.secondaryTeal} />
            <Text style={styles.telemetryText}>
              {currentUser.bandModel} •{' '}
              <Text style={styles.boldTeal}>{currentUser.pulseRate} bpm</Text>
            </Text>
          </View>

          {/* Dual Wallet Pill */}
          <View style={styles.walletPill}>
            <Wallet size={13} color={colors.primary} />
            <Text style={styles.walletText}>₹{currentUser.walletBalance.toLocaleString()}</Text>
            <View style={styles.sosReserveTag}>
              <Text style={styles.sosReserveText}>SOS ₹5k</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: colors.outline,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
    paddingBottom: spacing.sm,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
    zIndex: 10,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
    borderColor: colors.secondaryContainer,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: colors.secondaryTeal,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  userInfo: {
    flex: 1,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  logoImage: {
    width: 24,
    height: 24,
  },
  miniLogo: {
    width: 20,
    height: 20,
  },
  brandText: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: -0.3,
  },
  subUserRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 1,
  },
  greetingText: {
    fontSize: 12,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  dotSeparator: {
    color: colors.textMuted,
    fontSize: 10,
  },
  locationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  locationText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.secondaryTeal,
    maxWidth: 110,
  },
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleColumn: {
    flex: 1,
  },
  screenTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  screenSubtitle: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.surfaceLow,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.error,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  subStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    marginTop: 6,
    borderTopWidth: 1,
    borderTopColor: colors.surfaceHigh,
    gap: 8,
  },
  telemetryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.surfaceLow,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.surfaceVariant,
    flex: 1,
  },
  livePulse: {
    width: 8,
    height: 8,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pingCircle: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.secondaryTeal,
    opacity: 0.4,
  },
  solidCircle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.secondaryTeal,
  },
  telemetryText: {
    fontSize: 11,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  boldTeal: {
    color: colors.secondaryTeal,
    fontWeight: '700',
  },
  walletPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.surfaceLow,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.surfaceVariant,
  },
  walletText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
  },
  sosReserveTag: {
    backgroundColor: colors.errorContainer,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
  },
  sosReserveText: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.onErrorContainer,
  },
});
