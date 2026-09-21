import { Ionicons } from '@expo/vector-icons';
import { detectHandLandmarks } from 'expo-vision-camera-v4-mediapipe';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission, useFrameProcessor } from 'react-native-vision-camera';
import { useRunOnJS } from 'react-native-worklets-core';

export default function CameraScreen() {
  const [facing, setFacing] = useState<'front' | 'back'>('front');
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice(facing);
  
  const [translation, setTranslation] = useState('Waiting for sign...');

  // 1. Thread-safe JS callback hook to update UI from the background thread
  const updateFSLTranslation = useRunOnJS((handData: any) => {
    if (handData && handData.length > 0) {
      // You have access to handData[0] for the first hand's 21 3D coordinates
      setTranslation('Hands Detected!'); 
    } else {
      setTranslation('Waiting for sign...');
    }
  }, []);

  // 2. Background Frame Processor running at 30+ FPS
  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    // Run MediaPipe natively on the raw camera frame
    const result = detectHandLandmarks(frame);
    
    // Call the JS function safely (useRunOnJS bridges the native C++ thread to JS)
    updateFSLTranslation(result?.hands);
  }, []);

  if (!hasPermission) {
    return (
      <View style={styles.permissionContainer}>
        <View style={styles.iconBackground}>
          <Ionicons name="camera-outline" size={60} color="#4F46E5" />
        </View>
        <Text style={styles.permissionTitle}>Camera Access</Text>
        <Text style={styles.permissionText}>
          We need access to your camera to translate your FSL gestures in real-time.
        </Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission} activeOpacity={0.8}>
          <Text style={styles.permissionButtonText}>Allow Camera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!device) {
    return <View style={styles.container} />; // Or a loading spinner
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  return (
    <View style={styles.container}>
      <Camera 
        style={styles.camera} 
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
        pixelFormat="yuv"
      />

      <View style={styles.overlay}>
        
        {/* Top Controls */}
        <View style={styles.topControls}>
          <TouchableOpacity style={styles.iconButton} onPress={toggleCameraFacing} activeOpacity={0.7}>
            <Ionicons name="camera-reverse" size={24} color="#111827" />
          </TouchableOpacity>
        </View>

        {/* Center Guide Box */}
        <View style={styles.guideContainer}>
          <View style={styles.guideBox}>
            <View style={styles.guideLabelContainer}>
              <Text style={styles.guideText}>Frame hands here</Text>
            </View>
          </View>
        </View>

        {/* Bottom Translation Flashcard */}
        <View style={styles.translationContainer}>
          <View style={styles.flashcard}>
            <View style={styles.flashcardHeader}>
              <Ionicons name="language" size={16} color="#4F46E5" style={styles.flashcardIcon} />
              <Text style={styles.translationLabel}>Live Translation</Text>
            </View>
            <Text style={styles.translationOutput}>{translation}</Text>
          </View>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
  },
  
  // Permissions Screen Styling
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#F9FAFB',
  },
  iconBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 12,
  },
  permissionText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    color: '#4B5563',
    lineHeight: 24,
  },
  permissionButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  permissionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  // Live Camera UI Styling
  topControls: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 24,
    paddingTop: 60, 
  },
  iconButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
    padding: 12,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  guideContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  guideBox: {
    width: 280,
    height: 320,
    borderWidth: 3,
    borderColor: 'rgba(79, 70, 229, 0.8)', // Indigo border
    borderStyle: 'dashed',
    borderRadius: 24,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 16,
  },
  guideLabelContainer: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: -32, // Pulls the label down onto the border line
  },
  guideText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  translationContainer: {
    padding: 24,
    paddingBottom: 40,
  },
  flashcard: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#111827',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 5,
  },
  flashcardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  flashcardIcon: {
    marginRight: 6,
  },
  translationLabel: {
    color: '#4F46E5',
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  translationOutput: {
    color: '#111827',
    fontSize: 28,
    fontWeight: '800',
  },
});