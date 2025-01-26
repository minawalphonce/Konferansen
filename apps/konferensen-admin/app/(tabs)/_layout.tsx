import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from "@expo/vector-icons"
import { motifySvg } from 'moti/svg';
import { useAppTheme, TabBar } from "@konferensen/ui";

const MotiIonicons = motifySvg(Ionicons)();

export default function TabLayout() {
  return (
    <Tabs
      tabBar={props => <TabBar {...props} />}
      screenOptions={{
        headerShown: false
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ ...rest }) => {
            return <MotiIonicons name="home-outline"
              {...rest} />
          }
        }}
      />
      <Tabs.Screen
        name="scores"
        options={{
          title: "Scores",
          tabBarIcon: ({ ...rest }) => {
            return <MotiIonicons name="trophy-outline"
              {...rest} />
          }
        }}
      />
      <Tabs.Screen
        name="members"
        options={{
          title: "Members",
          tabBarIcon: ({ ...rest }) => {
            return <MotiIonicons name="people-outline"
              {...rest} />
          }
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notifications",
          tabBarIcon: ({ ...rest }) => {
            return <MotiIonicons
              name="notifications-outline"
              {...rest}
            />
          }
        }}
      />
    </Tabs>
  );
}
