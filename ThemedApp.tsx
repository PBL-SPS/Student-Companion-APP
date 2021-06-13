import * as eva from "@eva-design/eva";
import {
    dark as materialDark,
    light as materialLight
} from "@eva-design/material";
import { ApplicationProvider } from "@ui-kitten/components";
import React from "react";
import useAppSelector from "./hooks/useAppSelector";
import useColorScheme from "./hooks/useColorScheme";
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
  const storedThemeState = useAppSelector((state) => state.settings.appearance);
  const colorScheme = useColorScheme();
  return (
    <ApplicationProvider
      {...eva}
      theme={
        storedThemeState === "DARK"
          ? darkTheme
          : storedThemeState === "SYSTEM_PREF"
          ? colorScheme === "light"
            ? lightTheme
            : darkTheme
          : lightTheme
      }
    >
      <Navigation
        colorScheme={
          storedThemeState === "DARK"
            ? "dark"
            : storedThemeState === "SYSTEM_PREF"
            ? colorScheme === "light"
              ? "light"
              : "dark"
            : "light"
        }
      />
    </ApplicationProvider>
  );
};

export default ThemedApp;
