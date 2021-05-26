import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";
import Divider from "../components/Divider";
import AcademicItem from "../components/OtherScreen/AcademicItem";

const ProfileScreen = () => {
  return (
    <Layout style={styles.container}>
      <Layout style={styles.header}>
        <Layout style={styles.initialsWrapper}>
          <Text style={styles.initials}>JD</Text>
        </Layout>
        <Layout style={styles.headerText}>
          <Text category="h5" adjustsFontSizeToFit={true} numberOfLines={1}>
            John Doe
          </Text>
          <Text
            category="s1"
            appearance="hint"
            adjustsFontSizeToFit={true}
            numberOfLines={1}
          >
            jdoe@gmail.com
          </Text>
        </Layout>
      </Layout>
      <Divider />
      <Layout style={styles.body}>
        <Text style={styles.academicText} category="p1" appearance="hint">
          Academic Details
        </Text>
        <Layout>
          <AcademicItem category="mis id" value="C2K29106156" />
          <AcademicItem category="year" value="SE" />
          <AcademicItem category="batch" value="G1" />
          <AcademicItem category="department" value="comp" />
          <AcademicItem category="division" value="1" />
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
  academicText: {
    marginBottom: 10,
  },
});

export default ProfileScreen;
