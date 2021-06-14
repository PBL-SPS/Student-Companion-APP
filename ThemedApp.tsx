import * as eva from "@eva-design/eva";
import {
  dark as materialDark,
  light as materialLight
} from "@eva-design/material";
import { ApplicationProvider } from "@ui-kitten/components";
import { StatusBar } from "expo-status-bar";
import React from "react";
import useThemeMode from "./hooks/useThemeMode";
import Navigation from "./navigation";
import { customEvaTheme } from "./theme/customTheme";

const lightTheme = {
  ...materialLight,
  ...customEvaTheme,
  ...{
    "background-basic-color-2": "#ffffff",
    "background-basic-color-3": "#ffffff",
    "background-basic-color-4": "#ffffff",
  },
};

const darkTheme = {
  ...materialDark,
  ...customEvaTheme,
  ...{
    "background-basic-color-1": "#2D2D2D",
    "background-basic-color-2": "#272727",
    "background-basic-color-3": "#222222",
    "background-basic-color-4": "#1E1E1E",
  },
};

const ThemedApp = () => {
  const themeMode = useThemeMode();
  return (
    <ApplicationProvider
      {...eva}
      theme={themeMode === "dark" ? darkTheme : lightTheme}
    >
      <Navigation colorScheme={themeMode} />
      <StatusBar style={themeMode === "dark" ? "light" : "dark"} />
    </ApplicationProvider>
  );
};

export default ThemedApp;
