import Constants from "expo-constants";
import { StyleSheet } from "react-native";

export const GlobalStyles = StyleSheet.create({
  topNavigation: {
    paddingTop: Constants.statusBarHeight + Constants.statusBarHeight / 2,
    paddingBottom: Constants.statusBarHeight / 2,
    paddingHorizontal: 20,
  },
});
