import { Layout } from "@ui-kitten/components";
import React from "react";
import useThemeMode from "../hooks/useThemeMode";

const Divider = () => {
  const themeMode = useThemeMode();

  if (themeMode === "dark")
    return <Layout level="1" style={{ height: 2 }}></Layout>;

  if (themeMode === "light")
    return (
      <Layout
        level="4"
        style={{ height: 2, backgroundColor: "#f3f3f3" }}
      ></Layout>
    );
};

export default Divider;
