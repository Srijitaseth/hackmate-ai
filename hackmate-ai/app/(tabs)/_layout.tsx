import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0f172a', // dark navy
          borderTopWidth: 0,
          height: 70,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: '#38bdf8', // cyan
        tabBarInactiveTintColor: '#64748b',
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View>
              <Ionicons
                name="home-outline"
                size={20}
                color={color}
                style={focused ? styles.glow : undefined}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="projects"
        options={{
          title: 'Projects',
          tabBarIcon: ({ color, focused }) => (
            <View>
              <Ionicons
                name="grid-outline"
                size={20}
                color={color}
                style={focused ? styles.glow : undefined}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="ai"
        options={{
          title: 'AI',
          tabBarIcon: ({ color,focused }) => (
            <View>
              <Ionicons
                name="hardware-chip-outline"
                size={20}
                color={color}
                style={focused ? styles.glow : undefined}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color,focused }) => (
            <View>
              <Ionicons
                name="chatbubble-outline"
                size={20}
                color={color}
                style={focused ? styles.glow : undefined}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color,focused }) => (
            <View>
              <Ionicons
                name="person-outline"
                size={20}
                color={color}
                style={focused ? styles.glow : undefined}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = {
  glow:{
    shadowColor: "#22d3ee",
  }
}