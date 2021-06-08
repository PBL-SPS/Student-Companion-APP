import { Layout, Text, useTheme } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";
import Divider from "../components/Divider";
import AcademicItem from "../components/OtherScreen/AcademicItem";
import useAppSelector from "../hooks/useAppSelector";

const ProfileScreen = () => {
  const theme = useTheme();
  const authData = useAppSelector((state) => state.auth);

  return (
    <Layout level="4" style={styles.container}>
      <Layout level="4" style={styles.header}>
        <Layout level="1" style={[styles.initialsWrapper]}>
          <Text style={styles.initials}>
            {authData.firstName[0]}
            {authData.lastName[0]}
          </Text>
        </Layout>
        <Layout level="4" style={styles.headerText}>
          <Text category="h5" adjustsFontSizeToFit={true} numberOfLines={1}>
            {authData.firstName} {authData.lastName}
          </Text>
          <Text
            category="s1"
            appearance="hint"
            adjustsFontSizeToFit={true}
            numberOfLines={1}
          >
            {authData.email}
          </Text>
        </Layout>
      </Layout>
      <Divider />
      <Layout level="4" style={styles.body}>
        <Text style={styles.academicText} category="p1" appearance="hint">
          Academic Details
        </Text>
        <Layout level="4">
          <AcademicItem category="year" value={authData.year} />
          <AcademicItem category="batch" value={authData.batch} />
          <AcademicItem category="department" value={authData.department} />
          <AcademicItem category="division" value={authData.division} />
        </Layout>
      </Layout>
    </Layout>
  );
};

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
  academicText: {
    marginBottom: 10,
  },
});

export default ProfileScreen;
