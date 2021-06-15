import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationState } from "@react-navigation/native";
import * as React from "react";
import Colors from "../constants/Colors";
import useThemeMode from "../hooks/useThemeMode";
import { BottomTabParamList } from "../types";
import CircularNavigator from "./CircularNavigator";
import ContactNavigator from "./ContactNavigator";
import ProfileNavigator from "./ProfileNavigator";
import TimetableNavigator from "./TimetableNavigator";
import WhatsNewNavigator from "./WhatsNewNavigator";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const isTabBarVisible = (navState: NavigationState) => {
  if (!navState) {
    return true;
  }
  return navState.index === 0;
};

export default function BottomTabNavigator() {
  const themeMode = useThemeMode();

  return (
    <BottomTab.Navigator
      initialRouteName="Circulars"
      tabBarOptions={{
        activeTintColor: Colors[themeMode].tint,
      }}
      screenOptions={({ navigation, route }) => ({
        tabBarVisible: isTabBarVisible(route.state),
        tabBarVisibilityAnimationConfig: {
          hide: {
            config: {
              duration: 100,
              delay: 0,
            },
          },
          show: {
            config: {
              duration: 100,
              delay: 0,
            },
          },
        },
      })}
    >
      <BottomTab.Screen
        name="Circulars"
        component={CircularNavigator}
        options={({ navigation, route }) => ({
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="albums-outline" color={color} />
          ),
        })}
      />
      <BottomTab.Screen
        name="Timetable"
        component={TimetableNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="time-outline" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="WhatsNew"
        component={WhatsNewNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="star-outline" color={color} />
          ),
          tabBarLabel: "Whats New",
        }}
      />
      <BottomTab.Screen
        name="Contacts"
        component={ContactNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="people-outline" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Other"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="grid-outline" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={25} style={{ marginBottom: -3 }} {...props} />;
}
