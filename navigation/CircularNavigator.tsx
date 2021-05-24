import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import CircularScreen from "../screens/CircularScreen";

const CircularStack = createStackNavigator();

function CircularNavigator() {
  return (
    <CircularStack.Navigator>
      <CircularStack.Screen
        name="CircularScreen"
        component={CircularScreen}
        options={{ headerTitle: "Circulars" }}
      />
    </CircularStack.Navigator>
  );
}

export default CircularNavigator;
