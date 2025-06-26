import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Logout from '@/components/Logout';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        headerRight: () => <Logout />,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>

      <Tabs.Screen
        name="index"
        options={{
          title: 'Home Feed',
          tabBarIcon: ({ focused, color }) => (
            <IconSymbol
              size={28}
              name={focused ? 'home' : 'home-outline'}
              color={color}
            />
          )
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ focused, color }) => (
            <IconSymbol
              size={28}
              name={focused ? 'search' : 'search-outline'}
              color={color}
            />
          )
        }}
      />

      <Tabs.Screen
        name="add-post"
        options={{
          title: 'Add Post',
          tabBarIcon: ({ focused, color }) => (
            <IconSymbol
              size={28}
              name={focused ? 'add' : 'add-outline'}
              color={color}
            />
          )
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ focused, color }) => (
            <IconSymbol
              size={28}
              name={focused ? 'star' : 'star-outline'}
              color={color}
            />
          )
        }}
      />

      <Tabs.Screen
        name="profile/index"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused, color }) => (
            <IconSymbol
              size={28}
              name={focused ? 'person' : 'person-outline'}
              color={color}
            />
          )
        }}
      />

      <Tabs.Screen
        name="profile/[id]"
        options={{
          title: 'Profile',
          href: null,
        }}
      />

    </Tabs>
  );
}
