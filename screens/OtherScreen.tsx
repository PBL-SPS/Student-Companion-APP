import { Layout, Text, Toggle } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import Divider from "../components/Divider";
import ProfileItem from "../components/OtherScreen/ProfileItem";
import { addAuthData } from "../redux/reducers/authSlice";

const OtherScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  return (
    <Layout style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate("ProfileScreen")}
      >
        <Layout style={styles.header}>
          <Layout style={styles.initialsWrapper}>
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
          <Toggle />
        </Layout>
      </Layout>
      <Divider />
      <Layout style={styles.body}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => dispatch(addAuthData(null))}
        >
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
    backgroundColor: "#000",
    height: 90,
    width: 90,
    borderRadius: 45,
    position: "relative",
  },
  initials: {
    fontSize: 35,
    position: "absolute",
    top: 15,
    left: 20,
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
