import { Layout, Text, Toggle, useTheme } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Divider from "../components/Divider";
import ProfileItem from "../components/OtherScreen/ProfileItem";

const OtherScreen = ({ navigation }: any) => {
  const theme = useTheme();
  return (
    <Layout style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate("ProfileScreen")}
      >
        <Layout style={styles.header}>
          <Layout
            style={[
              styles.initialsWrapper,
              { backgroundColor: theme["background-basic-color-4"] },
            ]}
          >
            <Text style={styles.initials}>JD</Text>
          </Layout>
          <Layout style={styles.headerText}>
            <Text category="h5" adjustsFontSizeToFit={true}>
              John Doe
            </Text>
            <Text category="s1" appearance="hint" adjustsFontSizeToFit={true}>
              SE-1 | COMP
            </Text>
          </Layout>
        </Layout>
      </TouchableOpacity>
      <Divider />
      <Layout style={styles.body}>
        <TouchableOpacity activeOpacity={0.8}>
          <ProfileItem name="info-outline" text="Attendance" />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8}>
          <ProfileItem name="calendar-outline" text="Calendar" />
        </TouchableOpacity>
        <Layout style={styles.darkMode}>
          <ProfileItem name="moon-outline" text="Dark Mode" />
          <Toggle checked={true} />
        </Layout>
      </Layout>
      <Divider />
      <Layout style={styles.body}>
        <TouchableOpacity activeOpacity={0.8}>
          <ProfileItem name="corner-down-left-outline" text="Logout" />
        </TouchableOpacity>
      </Layout>
    </Layout>
  );
};

export default OtherScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  header: {
    marginVertical: 25,
    flexDirection: "row",
  },
  initialsWrapper: {
    height: 90,
    width: 90,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  initials: {
    fontSize: 35,
    textAlign: "center",
  },
  headerText: {
    alignSelf: "center",
    marginLeft: 20,
  },
  body: {
    marginTop: 10,
  },
  darkMode: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
