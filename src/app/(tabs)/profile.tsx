import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

// Mock user data
const USER_PROFILE = {
  name: 'Zchiavoni Songuitan Tad-awan',
  email: 'student@university.edu',
  joined: 'March 2026',
};

export default function ProfileScreen() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [offlineMode, setOfflineMode] = useState(true);

  const handleLogout = () => {
    router.replace('/');
  };

  const SettingsRow = ({ icon, label, rightElement, onPress, color = '#111827' }: any) => (
    <TouchableOpacity 
      style={styles.settingsRow} 
      onPress={onPress} 
      disabled={!onPress}
      activeOpacity={0.7}
    >
      <View style={styles.settingsRowLeft}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={22} color={color} />
        </View>
        <Text style={[styles.settingsLabel, { color }]}>{label}</Text>
      </View>
      {rightElement ? rightElement : (
        onPress && <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <View style={styles.headerContainer}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>ZS</Text>
        </View>
        <Text style={styles.userName}>{USER_PROFILE.name}</Text>
        <Text style={styles.userEmail}>{USER_PROFILE.email}</Text>
      </View>

      {/* App Preferences Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.sectionCard}>
          <SettingsRow 
            icon="language-outline" 
            label="Translation Language" 
            rightElement={<Text style={styles.rightText}>FSL</Text>}
          />
          <View style={styles.divider} />
          <SettingsRow 
            icon="moon-outline" 
            label="Dark Mode" 
            rightElement={
              <Switch 
                value={isDarkMode} 
                onValueChange={setIsDarkMode} 
                trackColor={{ false: '#E5E7EB', true: '#4F46E5' }}
                thumbColor={'#ffffff'}
              />
            }
          />
          <View style={styles.divider} />
          <SettingsRow 
            icon="cloud-offline-outline" 
            label="Offline FSL Dictionary" 
            rightElement={
              <Switch 
                value={offlineMode} 
                onValueChange={setOfflineMode} 
                trackColor={{ false: '#E5E7EB', true: '#4F46E5' }}
                thumbColor={'#ffffff'}
              />
            }
          />
        </View>
      </View>

      {/* Account Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.sectionCard}>
          <SettingsRow 
            icon="person-outline" 
            label="Edit Profile" 
            onPress={() => console.log('Edit Profile')}
          />
          <View style={styles.divider} />
          <SettingsRow 
            icon="notifications-outline" 
            label="Notifications" 
            onPress={() => console.log('Notifications')}
          />
        </View>
      </View>

      {/* Logout Button */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
          <Ionicons name="log-out-outline" size={22} color="#EF4444" style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  headerContainer: {
    alignItems: 'center',
    paddingVertical: 48,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  avatarCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#4F46E5', // Indigo accent
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '800',
    color: '#ffffff',
  },
  userName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
  },
  userEmail: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
    fontWeight: '500',
  },
  section: {
    marginTop: 32,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
    marginLeft: 12,
  },
  sectionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#111827',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden', // Keeps the inner elements from breaking the rounded corners
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  settingsRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 32,
    alignItems: 'center',
    marginRight: 12,
  },
  settingsLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  rightText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginLeft: 60, // Skips the icon to align perfectly with the text
  },
  logoutContainer: {
    marginTop: 40,
    marginBottom: 60,
    paddingHorizontal: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#FEF2F2', // Very light red background
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '700',
  },
});