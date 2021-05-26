import { useNavigation } from "@react-navigation/native";
import { CardStyleInterpolators } from "@react-navigation/stack";
import {
  Icon,
  Text,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import React from "react";
import { Pressable } from "react-native";
import { GlobalStyles } from "../styles/globalStyles";

// common screen options for statck navigators
// const screenOptions = (theme) => ({
//   headerStyle: {
//     backgroundColor: theme["text-alternate-color"],
//     elevation: 0,
//     shadowColor: "transparent",
//   },
//   headerTintColor: theme["text-basic-color"],
//   gestureEnabled: false,
//   // gestureDirection: "horizontal",
//   cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
// });

// top navigation component for only text headers
const TopNavigationOnlyText = ({ title, ...props }: { title: string }) => {
  return (
    <TopNavigation
      style={GlobalStyles.topNavigation}
      {...props}
      alignment="start"
      title={<Text category="h5">{title}</Text>}
    />
  );
};

// top navigation for components with back button
export const ArrowLeftIcon = (props: any) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.goBack()}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      android_ripple={{
        color: "grey",
        borderless: true,
      }}
    >
      <Icon {...props} name="arrow-back-outline" />
    </Pressable>
  );
};

export const renderBackButtonAction = () => {
  return (
    <TopNavigationAction icon={ArrowLeftIcon} style={{ marginRight: 20 }} />
  );
};

const TopNavigationWithBackButton = ({
  title,
  ...props
}: {
  title: string;
}) => {
  return (
    <TopNavigation
      style={[GlobalStyles.topNavigation, { paddingHorizontal: 5 }]}
      {...props}
      accessoryLeft={renderBackButtonAction}
      alignment="start"
      title={<Text category="h5">{title}</Text>}
    />
  );
};

export { TopNavigationOnlyText, TopNavigationWithBackButton };
