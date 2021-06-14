import { Layout, useTheme } from "@ui-kitten/components";
import React from "react";
import { ActivityIndicator } from "react-native";

const LoadingScreen = () => {
  const theme = useTheme();
  return (
    <Layout
      level="4"
      style={{
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator size="large" color={theme["color-primary-default"]} />
    </Layout>
  );
};

export default LoadingScreen;
