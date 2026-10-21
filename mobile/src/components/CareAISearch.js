import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Bot, Mic, Camera, Stethoscope, FileText, Thermometer, Sparkles } from 'lucide-react-native';
import { colors, radius, spacing } from '../theme/colors';

export default function CareAISearch({ onSearch, onChipSelect, onScanRx, onVoiceSearch }) {
  const [query, setQuery] = useState('');

  const chips = [
    { id: '1', label: 'Find Cardiologist', icon: Stethoscope, color: colors.secondaryTeal },
    { id: '2', label: 'Upload Parchee', icon: FileText, color: colors.primary },
    { id: '3', label: 'Fever Symptoms', icon: Thermometer, color: colors.error },
    { id: '4', label: 'Ask Care AI', icon: Sparkles, color: colors.secondaryTeal },
  ];

  const handleSearchChange = (text) => {
    setQuery(text);
    if (onSearch) onSearch(text);
  };

  const handleChipPress = (label) => {
    setQuery(label);
    if (onChipSelect) onChipSelect(label);
  };

  return (
    <View style={styles.container}>
      {/* Search Input Box with AI Gradient outline */}
      <View style={styles.gradientBorder}>
        <View style={styles.inputCard}>
          <View style={styles.aiIconBubble}>
            <Bot size={18} color={colors.secondaryTeal} />
          </View>
          <TextInput
            style={styles.textInput}
            placeholder="Ask Care AI or symptoms..."
            placeholderTextColor={colors.textMuted}
            value={query}
            onChangeText={handleSearchChange}
          />
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={onVoiceSearch}
            activeOpacity={0.7}
          >
            <Mic size={18} color={colors.textMuted} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionBtn, styles.cameraBtn]}
            onPress={onScanRx}
            activeOpacity={0.7}
          >
            <Camera size={17} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Suggestion Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsRow}
      >
        {chips.map((chip) => {
          const IconComp = chip.icon;
          return (
            <TouchableOpacity
              key={chip.id}
              style={styles.chip}
              onPress={() => handleChipPress(chip.label)}
              activeOpacity={0.7}
            >
              <IconComp size={13} color={chip.color} />
              <Text style={styles.chipText}>{chip.label}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.xs,
  },
  gradientBorder: {
    borderRadius: radius.md,
    padding: 1.5,
    backgroundColor: colors.secondaryContainer,
  },
  inputCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md - 1.5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 8,
  },
  aiIconBubble: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
    paddingVertical: 2,
  },
  actionBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraBtn: {
    backgroundColor: colors.surfaceLow,
  },
  chipsRow: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.outline,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  chipText: {
    fontSize: 12,
    color: colors.textPrimary,
    fontWeight: '600',
  },
});
