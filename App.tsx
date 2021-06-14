import { IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import React from "react";
import { LogBox } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import { IonIconsPack } from "./icons/IonIcons";
import { persistor, store } from "./redux/store";
import ThemedApp from "./ThemedApp";

const queryClient = new QueryClient();
LogBox.ignoreLogs(["Setting a timer"]);

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <RootSiblingParent>
        <SafeAreaProvider>
          <PersistGate loading={null} persistor={persistor}>
            <Provider store={store}>
              <QueryClientProvider client={queryClient}>
                <IconRegistry icons={[EvaIconsPack, IonIconsPack]} />
                <ThemedApp />
              </QueryClientProvider>
            </Provider>
          </PersistGate>
        </SafeAreaProvider>
      </RootSiblingParent>
    );
  }
}
