import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  SwitchCamera,
  MessageSquare,
  ShieldCheck,
  Activity,
  Heart,
  Pill,
  ChevronDown,
} from 'lucide-react-native';
import { colors, radius, spacing } from '../theme/colors';
import { currentUser } from '../data/mockData';
import { stitchImages } from '../assets/stitchImages';

export default function VideoConsultScreen({ onBack, onNavigate }) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [showRxDrawer, setShowRxDrawer] = useState(false);

  const handleEndCall = () => {
    Alert.alert(
      'End Consultation?',
      'Are you sure you want to end this clinical teleconsultation session?',
      [
        { text: 'Stay in Call', style: 'cancel' },
        {
          text: 'End Call',
          style: 'destructive',
          onPress: () => onNavigate('Home'),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Main Doctor Video Feed */}
      <View style={styles.videoCanvas}>
        <Image
          source={stitchImages.photoEmergencyDoctor}
          style={styles.doctorVideoImage}
        />
        <View style={styles.videoOverlayGradient} />

        {/* Top In-Call Header HUD */}
        <View style={styles.callHeader}>
          <View style={styles.doctorBadge}>
            <View style={styles.liveGreenDot} />
            <View>
              <Text style={styles.doctorName}>Dr. Ananya Sharma</Text>
              <Text style={styles.doctorRole}>Senior Cardiologist • Apollo</Text>
            </View>
          </View>

          <View style={styles.callDurationPill}>
            <Text style={styles.callDurationText}>04:18</Text>
          </View>
        </View>

        {/* Live Patient Telemetry HUD Overlay */}
        <View style={styles.telemetryHud}>
          <View style={styles.hudItem}>
            <Heart size={12} color={colors.secondaryContainer} />
            <Text style={styles.hudText}>{currentUser.pulseRate} bpm</Text>
          </View>
          <View style={styles.hudItem}>
            <Activity size={12} color={colors.secondaryContainer} />
            <Text style={styles.hudText}>SpO₂ 98%</Text>
          </View>
          <View style={styles.hudItem}>
            <ShieldCheck size={12} color={colors.secondaryContainer} />
            <Text style={styles.hudText}>BP 118/76</Text>
          </View>
        </View>

        {/* Patient PIP Self Camera */}
        <View style={styles.pipCamera}>
          {!isVideoOff ? (
            <Image
              source={stitchImages.userAvatar}
              style={styles.pipImage}
            />
          ) : (
            <View style={styles.pipCameraOff}>
              <VideoOff size={16} color="#FFFFFF" />
            </View>
          )}
          <Text style={styles.pipLabel}>You</Text>
        </View>

        {/* Live Prescription Peek Drawer */}
        <TouchableOpacity
          style={styles.rxPeekBar}
          onPress={() => setShowRxDrawer(!showRxDrawer)}
          activeOpacity={0.85}
        >
          <View style={styles.rxPeekLeft}>
            <Pill size={16} color={colors.secondaryContainer} />
            <Text style={styles.rxPeekTitle}>Live Prescription Sync (2 Medicines)</Text>
          </View>
          <Text style={styles.rxPeekAction}>{showRxDrawer ? 'Hide' : 'View'}</Text>
        </TouchableOpacity>

        {showRxDrawer && (
          <View style={styles.rxDrawerContent}>
            <View style={styles.rxItem}>
              <Text style={styles.rxDrugName}>1. Paracetamol 650mg</Text>
              <Text style={styles.rxDrugDosage}>SOS for fever • After food</Text>
            </View>
            <View style={styles.rxItem}>
              <Text style={styles.rxDrugName}>2. Electrolyte Rehydration (ORS)</Text>
              <Text style={styles.rxDrugDosage}>1 Sachet in 1 Litre water daily</Text>
            </View>
          </View>
        )}
      </View>

      {/* Floating Bottom In-Call Controls */}
      <View style={styles.controlsBar}>
        <TouchableOpacity
          style={[styles.controlBtn, isMuted && styles.controlBtnActive]}
          onPress={() => setIsMuted(!isMuted)}
          activeOpacity={0.7}
        >
          {isMuted ? <MicOff size={22} color="#FFFFFF" /> : <Mic size={22} color="#FFFFFF" />}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlBtn, isVideoOff && styles.controlBtnActive]}
          onPress={() => setIsVideoOff(!isVideoOff)}
          activeOpacity={0.7}
        >
          {isVideoOff ? <VideoOff size={22} color="#FFFFFF" /> : <Video size={22} color="#FFFFFF" />}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlBtn}
          onPress={() => Alert.alert('Camera Switched', 'Switched to rear examination camera.')}
          activeOpacity={0.7}
        >
          <SwitchCamera size={22} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlBtn}
          onPress={() => Alert.alert('In-Call Chat', 'Type message to Dr. Ananya Sharma')}
          activeOpacity={0.7}
        >
          <MessageSquare size={22} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.endCallBtn}
          onPress={handleEndCall}
          activeOpacity={0.8}
        >
          <PhoneOff size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001026',
  },
  videoCanvas: {
    flex: 1,
    position: 'relative',
  },
  doctorVideoImage: {
    width: '100%',
    height: '100%',
  },
  videoOverlayGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 16, 38, 0.25)',
  },
  callHeader: {
    position: 'absolute',
    top: 48,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  doctorBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(11, 37, 69, 0.85)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  liveGreenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  doctorName: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  doctorRole: {
    fontSize: 10,
    color: colors.surfaceVariant,
  },
  callDurationPill: {
    backgroundColor: 'rgba(220, 38, 38, 0.85)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  callDurationText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  telemetryHud: {
    position: 'absolute',
    top: 104,
    left: 16,
    backgroundColor: 'rgba(11, 37, 69, 0.8)',
    borderRadius: radius.md,
    padding: 8,
    gap: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  hudItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  hudText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  pipCamera: {
    position: 'absolute',
    top: 104,
    right: 16,
    width: 90,
    height: 120,
    borderRadius: radius.md,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    backgroundColor: '#001026',
  },
  pipImage: {
    width: '100%',
    height: '100%',
  },
  pipCameraOff: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pipLabel: {
    position: 'absolute',
    bottom: 4,
    left: 6,
    fontSize: 9,
    fontWeight: '800',
    color: '#FFFFFF',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 2,
  },
  rxPeekBar: {
    position: 'absolute',
    bottom: 96,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(11, 37, 69, 0.9)',
    borderRadius: radius.md,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.secondaryContainer,
  },
  rxPeekLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rxPeekTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  rxPeekAction: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.secondaryContainer,
  },
  rxDrawerContent: {
    position: 'absolute',
    bottom: 144,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(11, 37, 69, 0.95)',
    borderRadius: radius.md,
    padding: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  rxItem: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    paddingBottom: 4,
  },
  rxDrugName: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.secondaryContainer,
  },
  rxDrugDosage: {
    fontSize: 10,
    color: '#FFFFFF',
  },
  controlsBar: {
    height: 84,
    backgroundColor: 'rgba(11, 37, 69, 0.98)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  controlBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlBtnActive: {
    backgroundColor: colors.error,
  },
  endCallBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.error,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.error,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
});
