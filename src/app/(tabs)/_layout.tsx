import { Tabs } from 'expo-router';
import { Animated, View, StyleSheet, Platform, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';

// 1. Custom Animated Icon Component
const TabIcon = ({ name, focused, color, size }: any) => {
  const scale = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (focused) {
      // Spring animation when the tab is active
      Animated.parallel([
        Animated.spring(scale, {
          toValue: 1.2, // Scale up by 20%
          friction: 5,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: -4, // Nudge up by 4 pixels
          friction: 5,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      // Return to resting state when inactive
      Animated.parallel([
        Animated.spring(scale, {
          toValue: 1,
          friction: 5,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          friction: 5,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [focused]);

  return (
    <Animated.View style={{ transform: [{ scale }, { translateY }] }}>
      <View style={styles.iconContainer}>
        <Ionicons name={name} size={size} color={color} />
      </View>
    </Animated.View>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#4F46E5', // Vibrant Indigo accent
        tabBarInactiveTintColor: '#9CA3AF', // Soft gray
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.tabBarLabel,
        headerShown: false, // Prevents the double-header issue
        // This removes the default Android dark circle ripple and iOS highlight
        tabBarButton: (props) => (
          <Pressable 
            {...props as any} 
            android_ripple={{ color: 'transparent' }} 
            style={props.style}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'History',
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon 
              name={focused ? "time" : "time-outline"} 
              focused={focused} 
              color={color} 
              size={24} 
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="camera"
        options={{
          title: 'Translate',
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon 
              name={focused ? "camera" : "camera-outline"} 
              focused={focused} 
              color={color} 
              size={24} 
            />
          ),
        }}
      />

      <Tabs.Screen
        name="dictionary"
        options={{
          title: 'Dictionary',
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon 
              name={focused ? "book" : "book-outline"} 
              focused={focused} 
              color={color} 
              size={24} 
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon 
              name={focused ? "person" : "person-outline"} 
              focused={focused} 
              color={color} 
              size={24} 
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    height: Platform.OS === 'android' ? 88 : 68,
    paddingBottom: Platform.OS === 'android' ? 28 : 12,
    paddingTop: 12,
    shadowColor: '#111827',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 10,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 4,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});