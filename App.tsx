import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import { IonIconsPack } from "./icons/IonIcons";
import Navigation from "./navigation";
import { persistor, store } from "./redux/store";
import LoginScreen from "./screens/LoginScreen";

const queryClient = new QueryClient();

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
                theme={colorScheme === "light" ? eva.light : eva.dark}
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
