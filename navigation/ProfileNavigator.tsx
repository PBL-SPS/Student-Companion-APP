import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ProfileScreen from "../screens/ProfileScreen";

const ProfileStack = createStackNavigator();

function ProfileNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerTitle: "Profiles" }}
      />
    </ProfileStack.Navigator>
  );
}

export default ProfileNavigator;
