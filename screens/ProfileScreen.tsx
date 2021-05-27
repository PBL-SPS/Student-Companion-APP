import { Layout, Text, useTheme } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";
import Divider from "../components/Divider";
import AcademicItem from "../components/OtherScreen/AcademicItem";

const ProfileScreen = () => {
  const theme = useTheme();
  return (
    <Layout style={styles.container}>
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
