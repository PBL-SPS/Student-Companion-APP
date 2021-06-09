import * as eva from "@eva-design/eva";
import {
  dark as materialDark,
  light as materialLight
} from "@eva-design/material";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { LogBox } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import { IonIconsPack } from "./icons/IonIcons";
import Navigation from "./navigation";
import { persistor, store } from "./redux/store";
import { customEvaTheme } from "./theme/customTheme";

const queryClient = new QueryClient();
LogBox.ignoreLogs(["Setting a timer"]);

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <PersistGate loading={null} persistor={persistor}>
          <Provider store={store}>
            <QueryClientProvider client={queryClient}>
              <IconRegistry icons={[EvaIconsPack, IonIconsPack]} />
              <ApplicationProvider
                {...eva}
                theme={
                  colorScheme === "light"
                    ? {
                        ...materialLight,
                        ...customEvaTheme,
                        ...{
                          "background-basic-color-2": "#ffffff",
                          "background-basic-color-3": "#ffffff",
                          "background-basic-color-4": "#ffffff",
                        },
                      }
                    : {
                        ...materialDark,
                        ...customEvaTheme,
                        ...{
                          "background-basic-color-1": "#2D2D2D",
                          "background-basic-color-2": "#272727",
                          "background-basic-color-3": "#222222",
                          "background-basic-color-4": "#1E1E1E",
                        },
                      }
                }
              >
                <Navigation colorScheme={colorScheme} />
                {/* <LoginScreen /> */}
              </ApplicationProvider>
            </QueryClientProvider>
          </Provider>
        </PersistGate>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
