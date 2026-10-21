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
  Footprints,
  Flame,
  Droplet,
  Moon,
  Activity,
  Plus,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Shield,
  Apple,
  Clock,
  Dumbbell,
  Sun,
  Wind,
  MessageSquare,
  Scale,
  Brain,
  Award,
  Check,
} from 'lucide-react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors, radius, spacing } from '../theme/colors';
import { stitchImages } from '../assets/stitchImages';

export default function SelfCareScreen({ onNavigate }) {
  const [waterIntake, setWaterIntake] = useState(2.4);
  const [stepsCount, setStepsCount] = useState(8450);
  const [menTab, setMenTab] = useState('Workouts');
  const [womenTab, setWomenTab] = useState('Yoga');

  const handleAddWater = () => {
    const updated = Math.min(3.5, parseFloat((waterIntake + 0.25).toFixed(2)));
    setWaterIntake(updated);
    Alert.alert('Hydration Logged 💧', `Added 250ml. Total today: ${updated}L / 3.0L goal.`);
  };

  const handleAddWalk = () => {
    const newSteps = stepsCount + 500;
    setStepsCount(newSteps);
    Alert.alert('Walk Recorded 🚶', `Added 500 steps. Total today: ${newSteps.toLocaleString()} steps!`);
  };

  const stepPercent = Math.min(100, Math.round((stepsCount / 10000) * 100));

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* ========================================================================= */}
      {/* 1. TOP COMMON HEALTH & ACTIVITY TRACKER                                    */}
      {/* ========================================================================= */}
      <View style={styles.sectionHeadingRow}>
        <View style={styles.headingWithBadge}>
          <Text style={styles.sectionTitle}>Daily Activity & Vitals</Text>
          <View style={styles.metricsBadge}>
            <Text style={styles.metricsBadgeText}>ALL METRICS</Text>
          </View>
        </View>
        <Text style={styles.dateText}>Mon, 24 Oct</Text>
      </View>

      {/* Prominent Steps & Daily Burn Card */}
      <View style={styles.stepGoalCard}>
        <View style={styles.stepTopRow}>
          <View style={styles.stepInfoCol}>
            <View style={styles.stepGoalLabel}>
              <Footprints size={14} color={colors.secondaryContainer} />
              <Text style={styles.stepGoalLabelText}>Daily Step Goal</Text>
            </View>
            <View style={styles.stepNumberRow}>
              <Text style={styles.stepMainNumber}>{stepsCount.toLocaleString()}</Text>
              <Text style={styles.stepGoalTotal}>/ 10,000 steps</Text>
            </View>
            <Text style={styles.stepsRemaining}>
              {Math.max(0, 10000 - stepsCount).toLocaleString()} steps left to reach 100% daily target
            </Text>
          </View>

          {/* Mini Goal Ring Progress */}
          <View style={styles.ringWrapper}>
            <Svg height="64" width="64" viewBox="0 0 36 36">
              <Circle
                cx="18"
                cy="18"
                r="15"
                stroke="rgba(255, 255, 255, 0.15)"
                strokeWidth="3.5"
                fill="none"
              />
              <Circle
                cx="18"
                cy="18"
                r="15"
                stroke={colors.secondaryContainer}
                strokeWidth="3.5"
                strokeDasharray={`${stepPercent}, 100`}
                strokeLinecap="round"
                fill="none"
                transform="rotate(-90 18 18)"
              />
            </Svg>
            <View style={styles.ringInnerLabel}>
              <Text style={styles.ringPercentText}>{stepPercent}%</Text>
            </View>
          </View>
        </View>

        {/* Distance & Burn Strip */}
        <View style={styles.stepSubGrid}>
          <View style={styles.subMetricBox}>
            <View style={styles.metricIconBox}>
              <Footprints size={14} color={colors.secondaryContainer} />
            </View>
            <View>
              <Text style={styles.subMetricLabel}>DISTANCE</Text>
              <Text style={styles.subMetricValue}>5.8 km</Text>
            </View>
          </View>

          <View style={styles.subMetricBox}>
            <View style={[styles.metricIconBox, { backgroundColor: 'rgba(245, 158, 11, 0.25)' }]}>
              <Flame size={14} color="#FDE68A" />
            </View>
            <View>
              <Text style={styles.subMetricLabel}>CALORIES BURNED</Text>
              <Text style={styles.subMetricValue}>485 kcal</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.logStepBtn}
          onPress={handleAddWalk}
          activeOpacity={0.8}
        >
          <Plus size={13} color={colors.primary} />
          <Text style={styles.logStepText}>Log +500 Steps</Text>
        </TouchableOpacity>
      </View>

      {/* 3 Quick Health Cards: Hydration, Sleep, Vitals */}
      <View style={styles.threeCardsRow}>
        {/* Water Intake */}
        <View style={styles.quickCard}>
          <View style={styles.quickCardTop}>
            <Droplet size={18} color="#0284C7" />
            <TouchableOpacity
              style={styles.add250Btn}
              onPress={handleAddWater}
              activeOpacity={0.7}
            >
              <Text style={styles.add250Text}>+250ml</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.quickCardValue}>{waterIntake}L</Text>
            <Text style={styles.quickCardSub}>/ 3.0L goal</Text>
          </View>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${Math.min(100, (waterIntake / 3.0) * 100)}%` },
              ]}
            />
          </View>
        </View>

        {/* Sleep Recovery */}
        <View style={styles.quickCard}>
          <View style={styles.quickCardTop}>
            <Moon size={18} color={colors.secondaryTeal} />
            <View style={styles.optimalTag}>
              <Text style={styles.optimalTagText}>Optimal</Text>
            </View>
          </View>
          <View>
            <Text style={styles.quickCardValue}>7h 40m</Text>
            <Text style={styles.quickCardSub}>Restful sleep</Text>
          </View>
          <Text style={styles.quickCardDeepText}>Deep 2h 15m</Text>
        </View>

        {/* Vital Signs (BP & Heart Rate) */}
        <View style={styles.quickCard}>
          <View style={styles.quickCardTop}>
            <Activity size={18} color={colors.error} />
            <View style={styles.fitZoneTag}>
              <Text style={styles.fitZoneText}>Fit Zone</Text>
            </View>
          </View>
          <View>
            <Text style={styles.quickCardValue}>68 bpm</Text>
            <Text style={styles.quickCardSub}>BP 118/76</Text>
          </View>
          <Text style={styles.quickCardSteadyText}>Steady & Normal</Text>
        </View>
      </View>

      {/* ========================================================================= */}
      {/* 2. GENDER-SPECIFIC CARE SECTION (Men & Women 2 Prominent Visual Boxes)     */}
      {/* ========================================================================= */}
      <View style={styles.sectionHeadingRow}>
        <View>
          <Text style={styles.sectionTitle}>Daily Health & Fitness</Text>
          <Text style={styles.sectionSubtitle}>Simple daily care for men & women</Text>
        </View>
        <View style={styles.personalizedTag}>
          <Sparkles size={11} color={colors.secondaryTeal} />
          <Text style={styles.personalizedTagText}>Personalized</Text>
        </View>
      </View>

      {/* 1. MEN'S FITNESS & MEDICAL WELLNESS PORTAL (FIRST) */}
      <View style={styles.genderPortalCard}>
        <View style={styles.genderImgContainer}>
          <Image
            source={stitchImages.photoMenFitness}
            style={styles.genderHeroImg}
            resizeMode="cover"
          />
          <View style={styles.genderOverlayPillLeft}>
            <Text style={styles.genderPillText}>♂ Men's Health</Text>
          </View>
          <View style={styles.genderOverlayPillRight}>
            <Text style={styles.portalPillText}>✓ Clinical Portal</Text>
          </View>
          <View style={styles.genderImgBottomTitle}>
            <Text style={styles.genderImgHeading}>Men's Health & Stamina</Text>
            <Text style={styles.genderImgSub} numberOfLines={1}>
              Cardiac endurance, functional strength & posture
            </Text>
          </View>
        </View>

        <View style={styles.genderBody}>
          {/* 4 Tabs */}
          <View style={styles.tabButtonsRow}>
            {['Workouts', 'Diet', 'Physio', 'Analysis'].map((t) => (
              <TouchableOpacity
                key={t}
                style={[styles.pillTabBtn, menTab === t && styles.pillTabBtnActive]}
                onPress={() => setMenTab(t)}
                activeOpacity={0.7}
              >
                <Text style={[styles.pillTabText, menTab === t && styles.pillTabTextActive]}>
                  {t}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Routine Item */}
          <View style={styles.routineBox}>
            <View style={{ flex: 1 }}>
              <Text style={styles.routineTitle}>Beginner • 15m Mobility Reset</Text>
              <Text style={styles.routineSub}>Spine decompression & desk posture</Text>
            </View>
            <TouchableOpacity
              style={styles.startRoutineBtn}
              onPress={() => Alert.alert('Mobility Routine Started 🧘', '15-min desk stretch timer active.')}
              activeOpacity={0.8}
            >
              <Text style={styles.startRoutineText}>Start</Text>
            </TouchableOpacity>
          </View>

          {/* VIP Advance Portal Button */}
          <TouchableOpacity
            style={styles.vipMenBtn}
            onPress={() => Alert.alert('Advance Men\'s Portal ⚡', 'Accessing exclusive stamina, hormonal & care protocols.')}
            activeOpacity={0.85}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 }}>
              <View style={styles.vipBoltBox}>
                <Text style={{ fontSize: 13, color: '#006A61', fontWeight: 'bold' }}>⚡</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.vipBtnTitle}>⚡ Open Advance Men's Portal</Text>
                <Text style={styles.vipBtnSub} numberOfLines={1}>
                  Exclusive Stamina, Hormonal & Care Protocols
                </Text>
              </View>
            </View>
            <View style={styles.vipEnterBtn}>
              <Text style={styles.vipEnterText}>Enter</Text>
              <ArrowRight size={12} color="#FFFFFF" />
            </View>
          </TouchableOpacity>

          {/* Specialized Tags */}
          <View style={styles.tagsContainer}>
            <Text style={styles.tagsHeader}>ADVANCE PORTAL INCLUDES:</Text>
            <View style={styles.tagsWrap}>
              {[
                '🔥 Sexual Health',
                'Hormonal Health',
                'Hair Care & Regrowth',
                'Beard & Grooming',
                'Advance Workout',
                'Specialty Diet Chart',
                'Advance Tips',
                'Skin Care',
                'Personal Hygiene',
              ].map((tag, idx) => (
                <View key={idx} style={styles.chipTag}>
                  <Text style={styles.chipTagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>

      {/* 2. WOMEN'S WELLNESS & PERIOD TRACKER (SECOND) */}
      <View style={[styles.genderPortalCard, { borderColor: '#FDA4AF' }]}>
        <View style={styles.genderImgContainer}>
          <Image
            source={stitchImages.photoWomenWellness}
            style={styles.genderHeroImg}
            resizeMode="cover"
          />
          <View style={[styles.genderOverlayPillLeft, { backgroundColor: '#FFF1F2' }]}>
            <Text style={[styles.genderPillText, { color: '#9F1239' }]}>♀ Women's Health</Text>
          </View>
          <View style={[styles.genderOverlayPillRight, { backgroundColor: 'rgba(225, 29, 72, 0.85)' }]}>
            <Text style={styles.portalPillText}>Cycle & Hormones</Text>
          </View>
          <View style={styles.genderImgBottomTitle}>
            <Text style={styles.genderImgHeading}>Women's Health & Wellness</Text>
            <Text style={styles.genderImgSub} numberOfLines={1}>
              Cycle tracking, fertility insights & gentle yoga
            </Text>
          </View>
        </View>

        <View style={[styles.genderBody, { backgroundColor: '#FFFDFD' }]}>
          {/* 4 Tabs */}
          <View style={styles.tabButtonsRow}>
            {['Yoga', 'Diet', 'Physio', 'Cycle'].map((t) => (
              <TouchableOpacity
                key={t}
                style={[
                  styles.pillTabBtn,
                  womenTab === t && [styles.pillTabBtnActive, { backgroundColor: '#FFF1F2', borderColor: '#FDA4AF' }],
                ]}
                onPress={() => setWomenTab(t)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.pillTabText,
                    womenTab === t && { color: '#9F1239', fontWeight: '700' },
                  ]}
                >
                  {t}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Routine Item */}
          <View style={[styles.routineBox, { borderColor: '#FECDD3' }]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.routineTitle}>Beginner • 15m Pelvic & Spine Flow</Text>
              <Text style={styles.routineSub}>Gentle mindful stretching for hormone balance</Text>
            </View>
            <TouchableOpacity
              style={[styles.startRoutineBtn, { borderColor: '#FDA4AF', backgroundColor: '#FFF1F2' }]}
              onPress={() => Alert.alert('Gentle Yoga Flow 🧘', '15-min pelvic restoration session started.')}
              activeOpacity={0.8}
            >
              <Text style={[styles.startRoutineText, { color: '#BE123C' }]}>Start</Text>
            </TouchableOpacity>
          </View>

          {/* Cycle & Hormone Status Bar */}
          <View style={styles.cycleStatusBar}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Clock size={14} color="#E11D48" />
              <Text style={styles.cycleDayText}>Cycle Day 14</Text>
              <View style={styles.ovulationPill}>
                <Text style={styles.ovulationPillText}>Ovulation Phase</Text>
              </View>
            </View>
            <Text style={styles.highEnergyText}>High Energy</Text>
          </View>

          {/* VIP Advance Women's Portal Button */}
          <TouchableOpacity
            style={styles.vipWomenBtn}
            onPress={() => Alert.alert('Advance Women\'s Portal ✨', 'Opening Hormonal Balance, PCOS & Care Protocols.')}
            activeOpacity={0.85}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 }}>
              <View style={[styles.vipBoltBox, { backgroundColor: '#FFF1F2' }]}>
                <Text style={{ fontSize: 13, color: '#E11D48', fontWeight: 'bold' }}>✨</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.vipBtnTitle}>✨ Open Advance Women's Portal</Text>
                <Text style={styles.vipBtnSub} numberOfLines={1}>
                  Hormonal Balance, PCOS & Care Protocols
                </Text>
              </View>
            </View>
            <View style={[styles.vipEnterBtn, { backgroundColor: '#E11D48' }]}>
              <Text style={styles.vipEnterText}>Enter</Text>
              <ArrowRight size={12} color="#FFFFFF" />
            </View>
          </TouchableOpacity>

          {/* Specialized Tags */}
          <View style={styles.tagsContainer}>
            <Text style={styles.tagsHeader}>ADVANCE PORTAL INCLUDES:</Text>
            <View style={styles.tagsWrap}>
              {[
                '❤️ Sexual & Reproductive',
                'Pregnancy Care',
                'PCOS Care',
                'Breast Health',
                'Advance Nutrition',
                'Menopause Care',
                'Skin & Glow Care',
                'Hair Care & Scalp',
                'Intimate Hygiene',
              ].map((tag, idx) => (
                <View key={idx} style={[styles.chipTag, { borderColor: '#FECDD3' }]}>
                  <Text style={[styles.chipTagText, { color: '#9F1239' }]}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>

      {/* ========================================================================= */}
      {/* 3. DAILY WELLNESS & HOLISTIC HEALTH GRID                                   */}
      {/* ========================================================================= */}
      <View style={styles.sectionHeadingRow}>
        <View>
          <Text style={styles.sectionTitle}>Daily Wellness & Holistic Health</Text>
          <Text style={styles.sectionSubtitle}>Mind, habits, preventive scores & education</Text>
        </View>
        <Text style={styles.viewAllText}>View All →</Text>
      </View>

      <View style={styles.bentoGrid}>
        {/* Card 1: Mental Wellness */}
        <TouchableOpacity
          style={styles.bentoCard}
          onPress={() => Alert.alert('Mental Wellness', 'Guided calm & stress breathing exercises.')}
          activeOpacity={0.8}
        >
          <View style={styles.bentoImgWrapper}>
            <Image source={stitchImages.iconHealthScore3D} style={styles.bentoImg} resizeMode="contain" />
            <View style={styles.bentoCornerTag}>
              <Text style={styles.bentoCornerText}>Calm</Text>
            </View>
          </View>
          <Text style={styles.bentoTitle}>Mental Wellness</Text>
          <Text style={styles.bentoSub}>Stress & Mood Log</Text>
          <View style={styles.bentoBottom}>
            <Text style={styles.bentoChipText}>Guided Calm</Text>
            <ArrowRight size={12} color={colors.secondaryTeal} />
          </View>
        </TouchableOpacity>

        {/* Card 2: BMI & Weight */}
        <TouchableOpacity
          style={styles.bentoCard}
          onPress={() => Alert.alert('BMI & Weight', 'Smart weight goal: 68 kg. Current BMI: 22.4 (Normal).')}
          activeOpacity={0.8}
        >
          <View style={styles.bentoImgWrapper}>
            <Image source={stitchImages.iconScale3D} style={styles.bentoImg} resizeMode="contain" />
            <View style={styles.bentoCornerTag}>
              <Text style={styles.bentoCornerText}>Smart Scale</Text>
            </View>
          </View>
          <Text style={styles.bentoTitle}>BMI & Weight</Text>
          <Text style={styles.bentoSub}>Smart Scale & Goals</Text>
          <View style={styles.bentoBottom}>
            <Text style={styles.bentoChipText}>BMI 22.4 • Normal</Text>
            <ArrowRight size={12} color={colors.secondaryTeal} />
          </View>
        </TouchableOpacity>

        {/* Card 3: Health Score */}
        <TouchableOpacity
          style={styles.bentoCard}
          onPress={() => Alert.alert('Health Score 88/100', 'Top 5% optimal biomarkers in your demographic.')}
          activeOpacity={0.8}
        >
          <View style={styles.bentoImgWrapper}>
            <Image source={stitchImages.iconHealthScore3D} style={styles.bentoImg} resizeMode="contain" />
            <View style={styles.bentoCornerTag}>
              <Text style={styles.bentoCornerText}>Top 5%</Text>
            </View>
          </View>
          <Text style={styles.bentoTitle}>Health Score</Text>
          <Text style={styles.bentoSub}>Holistic Biomarkers</Text>
          <View style={styles.bentoBottom}>
            <Text style={styles.bentoChipText}>88/100 • Optimal</Text>
            <ArrowRight size={12} color={colors.secondaryTeal} />
          </View>
        </TouchableOpacity>

        {/* Card 4: Habit Tracker */}
        <TouchableOpacity
          style={styles.bentoCard}
          onPress={() => Alert.alert('Habit Tracker', 'Clean streak: 14 days without smoking or processed sugar.')}
          activeOpacity={0.8}
        >
          <View style={styles.bentoImgWrapper}>
            <Image source={stitchImages.iconHabit3D} style={styles.bentoImg} resizeMode="contain" />
            <View style={[styles.bentoCornerTag, { backgroundColor: '#FEF3C7' }]}>
              <Text style={[styles.bentoCornerText, { color: '#92400E' }]}>Active</Text>
            </View>
          </View>
          <Text style={styles.bentoTitle}>Habit Tracker</Text>
          <Text style={styles.bentoSub}>Routine & Streaks</Text>
          <View style={styles.bentoBottom}>
            <Text style={styles.bentoChipText}>Clean • 14d</Text>
            <ArrowRight size={12} color={colors.secondaryTeal} />
          </View>
        </TouchableOpacity>

        {/* Card 5: Self Health Check */}
        <TouchableOpacity
          style={styles.bentoCard}
          onPress={() => Alert.alert('Self Health Check', 'AI Symptom & Vitals Assessment: All systems normal.')}
          activeOpacity={0.8}
        >
          <View style={styles.bentoImgWrapper}>
            <Image source={stitchImages.iconDoctor3D} style={styles.bentoImg} resizeMode="contain" />
            <View style={styles.bentoCornerTag}>
              <Text style={styles.bentoCornerText}>AI Triage</Text>
            </View>
          </View>
          <Text style={styles.bentoTitle}>Self Health Check</Text>
          <Text style={styles.bentoSub}>Symptom Assessment</Text>
          <View style={styles.bentoBottom}>
            <Text style={styles.bentoChipText}>Quick 2-min triage</Text>
            <ArrowRight size={12} color={colors.secondaryTeal} />
          </View>
        </TouchableOpacity>

        {/* Card 6: Health Education */}
        <TouchableOpacity
          style={styles.bentoCard}
          onPress={() => Alert.alert('Dr.Route Edu', 'Daily 3-min read: Circadian timing for cardiometabolic health.')}
          activeOpacity={0.8}
        >
          <View style={styles.bentoImgWrapper}>
            <Image source={stitchImages.photoMedicineLibrary} style={styles.bentoImg} resizeMode="cover" />
            <View style={[styles.bentoCornerTag, { backgroundColor: '#FEF3C7' }]}>
              <Text style={[styles.bentoCornerText, { color: '#92400E' }]}>Dr.Route Edu</Text>
            </View>
          </View>
          <Text style={styles.bentoTitle}>Health Education</Text>
          <Text style={styles.bentoSub}>Expert Guides & Diet</Text>
          <View style={styles.bentoBottom}>
            <Text style={styles.bentoChipText}>Daily 3-min read</Text>
            <ArrowRight size={12} color={colors.secondaryTeal} />
          </View>
        </TouchableOpacity>
      </View>

      {/* ========================================================================= */}
      {/* 4. DR.ROUTE PRIME PASS & LIFESTYLE HABITS                                  */}
      {/* ========================================================================= */}
      <View style={styles.sectionHeadingRow}>
        <Text style={styles.sectionTitle}>Dr.Route Prime & Habits</Text>
        <Text style={styles.doneCountText}>2 of 3 Done</Text>
      </View>

      {/* Prime Concierge Mini Card */}
      <View style={styles.primeCard}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 }}>
          <View style={styles.primeDocAvatar}>
            <Image source={stitchImages.photoEmergencyDoctor} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Text style={styles.primeDocTitle}>AI Longevity Doctor 24/7</Text>
              <View style={styles.primeVipBadge}>
                <Text style={styles.primeVipText}>PRIME VIP</Text>
              </View>
            </View>
            <Text style={styles.primeDocSub} numberOfLines={1}>
              Biometric review & dietary answers anytime
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.primeChatBtn}
          onPress={() => onNavigate('VideoConsult')}
          activeOpacity={0.7}
        >
          <MessageSquare size={16} color={colors.secondaryContainer} />
        </TouchableOpacity>
      </View>

      {/* Habits List */}
      <View style={styles.habitItem}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <View style={[styles.habitIconBox, { backgroundColor: '#FEF3C7' }]}>
            <Sun size={16} color="#B45309" />
          </View>
          <View>
            <Text style={styles.habitTitle}>Morning Sunlight & Posture</Text>
            <Text style={styles.habitSub}>10m circadian reset • Completed 8:15 AM</Text>
          </View>
        </View>
        <CheckCircle2 size={18} color={colors.secondaryTeal} />
      </View>

      <View style={styles.habitItem}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <View style={[styles.habitIconBox, { backgroundColor: colors.surfaceHigh }]}>
            <Wind size={16} color={colors.primary} />
          </View>
          <View>
            <Text style={styles.habitTitle}>4-7-8 Breathwork & Mind Calm</Text>
            <Text style={styles.habitSub}>5m before sleep tonight</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.startHabitBtn}
          onPress={() => Alert.alert('Breathwork Session', 'Starting 4-7-8 breathing timer... Inhale 4s, Hold 7s, Exhale 8s.')}
          activeOpacity={0.8}
        >
          <Text style={styles.startHabitText}>Start</Text>
        </TouchableOpacity>
      </View>

      {/* Footer Branding */}
      <View style={styles.footerBranding}>
        <View style={styles.footerLogoRow}>
          <Image source={stitchImages.logoRound} style={styles.footerLogo} resizeMode="contain" />
          <Text style={styles.footerBrandName}>Dr.Route</Text>
        </View>
        <Text style={styles.footerTagline}>Your 24×7 Lifeline & Wellness Super-App</Text>
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
  sectionHeadingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 6,
  },
  headingWithBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
  },
  sectionSubtitle: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  metricsBadge: {
    backgroundColor: colors.secondaryContainer,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.full,
  },
  metricsBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.onSecondaryContainer,
  },
  dateText: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  stepGoalCard: {
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
  stepTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepInfoCol: {
    flex: 1,
  },
  stepGoalLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.full,
    alignSelf: 'flex-start',
  },
  stepGoalLabelText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.secondaryContainer,
  },
  stepNumberRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    marginTop: 6,
  },
  stepMainNumber: {
    fontSize: 26,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  stepGoalTotal: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '600',
  },
  stepsRemaining: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  ringWrapper: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  ringInnerLabel: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringPercentText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  stepSubGrid: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.12)',
  },
  subMetricBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: radius.lg,
    padding: 8,
  },
  metricIconBox: {
    width: 28,
    height: 28,
    borderRadius: radius.md,
    backgroundColor: 'rgba(0, 106, 97, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subMetricLabel: {
    fontSize: 8,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '700',
  },
  subMetricValue: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 1,
  },
  logStepBtn: {
    backgroundColor: colors.secondaryContainer,
    borderRadius: radius.md,
    paddingVertical: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 10,
  },
  logStepText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '800',
  },
  threeCardsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: spacing.md,
  },
  quickCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: radius.xl,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.outline,
    justifyContent: 'space-between',
    minHeight: 110,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  quickCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  add250Btn: {
    backgroundColor: colors.surfaceLow,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: radius.sm,
  },
  add250Text: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.secondaryTeal,
  },
  quickCardValue: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.primary,
    marginTop: 6,
  },
  quickCardSub: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: colors.surfaceLow,
    borderRadius: radius.full,
    overflow: 'hidden',
    marginTop: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.secondaryTeal,
    borderRadius: radius.full,
  },
  optimalTag: {
    backgroundColor: colors.surfaceLow,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: radius.sm,
  },
  optimalTagText: {
    fontSize: 8,
    fontWeight: '800',
    color: colors.secondaryTeal,
  },
  quickCardDeepText: {
    fontSize: 9,
    color: colors.secondaryTeal,
    fontWeight: '700',
    marginTop: 4,
  },
  fitZoneTag: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: radius.sm,
  },
  fitZoneText: {
    fontSize: 8,
    fontWeight: '800',
    color: colors.error,
  },
  quickCardSteadyText: {
    fontSize: 9,
    color: colors.secondaryTeal,
    fontWeight: '600',
    marginTop: 4,
  },
  personalizedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.surfaceLow,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  personalizedTagText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.secondaryTeal,
  },
  genderPortalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.xxl,
    borderWidth: 1.5,
    borderColor: 'rgba(0, 106, 97, 0.3)',
    overflow: 'hidden',
    marginBottom: spacing.md,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  genderImgContainer: {
    width: '100%',
    height: 130,
    position: 'relative',
    backgroundColor: colors.primary,
  },
  genderHeroImg: {
    width: '100%',
    height: '100%',
    opacity: 0.85,
  },
  genderOverlayPillLeft: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  genderPillText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.secondaryTeal,
  },
  genderOverlayPillRight: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 16, 38, 0.85)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  portalPillText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  genderImgBottomTitle: {
    position: 'absolute',
    bottom: 8,
    left: 10,
    right: 10,
  },
  genderImgHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  genderImgSub: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 1,
  },
  genderBody: {
    padding: 12,
  },
  tabButtonsRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 10,
  },
  pillTabBtn: {
    flex: 1,
    backgroundColor: colors.surfaceLow,
    borderRadius: radius.md,
    paddingVertical: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.outline,
  },
  pillTabBtnActive: {
    backgroundColor: colors.secondaryContainer,
    borderColor: colors.secondaryTeal,
  },
  pillTabText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  pillTabTextActive: {
    color: colors.primary,
    fontWeight: '800',
  },
  routineBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surfaceLow,
    borderRadius: radius.lg,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.outline,
    marginBottom: 10,
  },
  routineTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  routineSub: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 1,
  },
  startRoutineBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.secondaryTeal,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: radius.md,
  },
  startRoutineText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.secondaryTeal,
  },
  vipMenBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.xl,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.secondaryTeal,
    marginBottom: 10,
  },
  vipWomenBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.xl,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#FDA4AF',
    marginBottom: 10,
  },
  vipBoltBox: {
    width: 28,
    height: 28,
    borderRadius: radius.md,
    backgroundColor: colors.secondaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vipBtnTitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  vipBtnSub: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 9,
    marginTop: 1,
  },
  vipEnterBtn: {
    backgroundColor: colors.secondaryTeal,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  vipEnterText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  tagsContainer: {
    marginTop: 4,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.outline,
  },
  tagsHeader: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.textSecondary,
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  tagsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  chipTag: {
    backgroundColor: colors.surfaceLow,
    borderWidth: 1,
    borderColor: colors.outline,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  chipTagText: {
    fontSize: 9,
    fontWeight: '600',
    color: colors.primary,
  },
  cycleStatusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF1F2',
    borderRadius: radius.lg,
    padding: 8,
    borderWidth: 1,
    borderColor: '#FECDD3',
    marginBottom: 10,
  },
  cycleDayText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.primary,
  },
  ovulationPill: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: '#FECDD3',
  },
  ovulationPillText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#BE123C',
  },
  highEnergyText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#9F1239',
  },
  viewAllText: {
    fontSize: 11,
    color: colors.secondaryTeal,
    fontWeight: '700',
  },
  bentoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: spacing.md,
  },
  bentoCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: radius.xl,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.outline,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  bentoImgWrapper: {
    width: '100%',
    height: 85,
    backgroundColor: colors.surfaceLow,
    borderRadius: radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    position: 'relative',
    overflow: 'hidden',
  },
  bentoImg: {
    width: '100%',
    height: '100%',
  },
  bentoCornerTag: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: colors.surfaceLow,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.outline,
  },
  bentoCornerText: {
    fontSize: 8,
    fontWeight: '800',
    color: colors.secondaryTeal,
  },
  bentoTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  bentoSub: {
    fontSize: 9,
    color: colors.textSecondary,
    marginTop: 1,
  },
  bentoBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: colors.outline,
  },
  bentoChipText: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.secondaryTeal,
  },
  doneCountText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.secondaryTeal,
  },
  primeCard: {
    backgroundColor: colors.primary,
    borderRadius: radius.xl,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  primeDocAvatar: {
    width: 38,
    height: 38,
    borderRadius: radius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.secondaryContainer,
  },
  primeDocTitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  primeVipBadge: {
    backgroundColor: 'rgba(245, 158, 11, 0.25)',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: radius.xs,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.5)',
  },
  primeVipText: {
    color: '#FDE68A',
    fontSize: 8,
    fontWeight: '800',
  },
  primeDocSub: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 10,
    marginTop: 2,
  },
  primeChatBtn: {
    width: 32,
    height: 32,
    borderRadius: radius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  habitItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.lg,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.outline,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  habitIconBox: {
    width: 32,
    height: 32,
    borderRadius: radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  habitTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  habitSub: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 1,
  },
  startHabitBtn: {
    backgroundColor: colors.secondaryTeal,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  startHabitText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  footerBranding: {
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.outline,
  },
  footerLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  footerLogo: {
    width: 24,
    height: 24,
  },
  footerBrandName: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.primary,
  },
  footerTagline: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 3,
  },
});
