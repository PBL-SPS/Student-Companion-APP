import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import refreshTokenInterceptor from "../axios/refreshTokenInterceptor";
import useAppSelector from "../hooks/useAppSelector";
import LoginScreen from "../screens/LoginScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import ProfileCreateScreen from "../screens/ProfileCreateScreen";
import SignupScreen from "../screens/SignupScreen";
import { RootStackParamList } from "../types";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";

refreshTokenInterceptor();

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const AuthState = useAppSelector((state) => state.auth);

  React.useEffect(() => {
    axios.defaults.baseURL = "https://studentcompanion.herokuapp.com/api/v1/";
    if (AuthState && AuthState.access_token) {
      console.log("acces token", axios.defaults.headers.authorization);
      axios.defaults.headers.authorization = "Bearer " + AuthState.access_token;
      console.log("acces token", axios.defaults.headers.authorization);
    }
    return () => {};
  }, [AuthState]);
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? { ...DarkTheme } : DefaultTheme}
    >
      {AuthState ? <RootNavigator /> : <RootAuthNavigator />}
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
}

function RootAuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ProfileCreate" component={ProfileCreateScreen} />
    </Stack.Navigator>
  );
}
