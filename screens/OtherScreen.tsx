import { Layout, Text, Toggle, useTheme } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import Divider from "../components/Divider";
import ProfileItem from "../components/OtherScreen/ProfileItem";
import useAppSelector from "../hooks/useAppSelector";
import { addAuthData } from "../redux/reducers/authSlice";

const OtherScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const authData = useAppSelector((state) => state.auth);

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
            <Text style={styles.initials}>
              {authData?.firstName[0]}
              {authData?.lastName[0]}
            </Text>
          </Layout>
          <Layout style={styles.headerText}>
            <Text category="h5" adjustsFontSizeToFit={true}>
              {authData.firstName} {authData.lastName}
            </Text>
            <Text category="s1" appearance="hint" adjustsFontSizeToFit={true}>
              {authData.year}-{authData.division} | {authData.department}
            </Text>
          </Layout>
        </Layout>
      </TouchableOpacity>
      <Divider />
      <Layout style={styles.body}>
        <TouchableOpacity activeOpacity={0.8}>
          <ProfileItem name="info-outline" text="Attendance (Coming Soon)" />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8}>
          <ProfileItem name="calendar-outline" text="Calendar (Coming Soon)" />
        </TouchableOpacity>
        <Layout style={styles.darkMode}>
          {/* <ProfileItem name="moon-outline" text="Dark Mode" />
          <Toggle checked={true} /> */}
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
    height: 90,
    width: 90,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
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
