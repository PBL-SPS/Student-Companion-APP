import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from "react-native";

export const IonIconsPack = {
  name: "ion",
  icons: createIconsMap(),
};

function createIconsMap() {
  return new Proxy(
    {},
    {
      get(target, name) {
        return IconProvider(name);
      },
    }
  );
}

const IconProvider = (name: any) => ({
  toReactElement: (props: any) => IonIcon({ name, ...props }),
});

function IonIcon({ name, style }: { name: any; style: any }) {
  const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
  return (
    <Ionicons name={name} size={height} color={tintColor} style={iconStyle} />
  );
}
