import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Home, Activity, AlertOctagon, FolderHeart, User } from 'lucide-react-native';
import { colors, radius, spacing } from '../theme/colors';

export default function BottomNav({ activeTab, onTabPress }) {
  const insets = useSafeAreaInsets();
  const tabs = [
    { id: 'Home', label: 'Home', icon: Home },
    { id: 'SelfCare', label: 'Self Care', icon: Activity },
    { id: 'SOS', label: 'SOS', icon: AlertOctagon, isEmergency: true },
    { id: 'Records', label: 'Records', icon: FolderHeart },
    { id: 'Account', label: 'Account', icon: User },
  ];

  return (
    <View style={[styles.container, { paddingBottom: Math.max(8, insets.bottom) }]}>
      {tabs.map((tab) => {
        const IconComponent = tab.icon;
        const isActive = activeTab === tab.id;

        if (tab.isEmergency) {
          return (
            <TouchableOpacity
              key={tab.id}
              style={styles.sosButton}
              onPress={() => onTabPress(tab.id)}
              activeOpacity={0.85}
            >
              <View style={[styles.sosInnerCircle, isActive && styles.sosInnerCircleActive]}>
                <IconComponent size={24} color="#FFFFFF" />
                <Text style={styles.sosText}>SOS</Text>
              </View>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tabButton, isActive && styles.tabButtonActive]}
            onPress={() => onTabPress(tab.id)}
            activeOpacity={0.7}
          >
            <IconComponent
              size={20}
              color={isActive ? colors.secondaryTeal : colors.textMuted}
            />
            <Text
              style={[
                styles.tabLabel,
                isActive ? styles.tabLabelActive : styles.tabLabelInactive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 8,
    paddingHorizontal: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.outline,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 8,
    overflow: 'visible',
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: radius.full,
    minWidth: 54,
  },
  tabButtonActive: {
    backgroundColor: colors.surfaceLow,
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 2,
  },
  tabLabelActive: {
    color: colors.secondaryTeal,
    fontWeight: '700',
  },
  tabLabelInactive: {
    color: colors.textMuted,
    fontWeight: '500',
  },
  sosButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20,
    marginBottom: 4,
  },
  sosInnerCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.error,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.error,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  sosInnerCircleActive: {
    backgroundColor: colors.errorDark,
    transform: [{ scale: 1.05 }],
  },
  sosText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    marginTop: -1,
    letterSpacing: 0.5,
  },
});
