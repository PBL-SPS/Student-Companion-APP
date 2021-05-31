import { useNavigation } from "@react-navigation/core";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Icon,
  Text,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import React from "react";
import EditProfileScreen from "../screens/EditProfileScreen";
import OtherScreen from "../screens/OtherScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { GlobalStyles } from "../styles/globalStyles";
import {
  renderBackButtonAction,
  TopNavigationWithBackButton,
} from "./CommonNavigation";

const ProfileStack = createStackNavigator();

export const AccountEditIcon = (props: any) => (
  <Icon {...props} name="edit-outline" />
);

const renderEditAction = () => {
  const navigation = useNavigation();
  return (
    <TopNavigationAction
      icon={AccountEditIcon}
      onPress={() => navigation.navigate("EditProfile")}
    />
  );
};

function ProfileNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="OtherScreen"
        component={OtherScreen}
        options={{ headerTitle: "Other" }}
      />
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          header: (props) => (
            <TopNavigation
              style={GlobalStyles.topNavigation}
              alignment="start"
              title={<Text category="h5">My Profile</Text>}
              accessoryRight={renderEditAction}
              accessoryLeft={renderBackButtonAction}
            />
          ),
        }}
      />
      <ProfileStack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          header: (props) => (
            <TopNavigationWithBackButton title="Edit Profile" />
          ),
        }}
      />
    </ProfileStack.Navigator>
  );
}

export default ProfileNavigator;
