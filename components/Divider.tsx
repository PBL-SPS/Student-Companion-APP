import { Layout } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, useColorScheme } from "react-native";

const Divider = () => {
  const colorScheme = useColorScheme();
  if (colorScheme === "dark")
    return <Layout level="4" style={{ height: 2 }}></Layout>;

  return (
    <Layout
      level="4"
      style={{ height: 2, backgroundColor: "#f3f3f3" }}
    ></Layout>
  );
};

export default Divider;

const styles = StyleSheet.create({});
