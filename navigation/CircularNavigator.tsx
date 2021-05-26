import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import CircularDetailsScreen from "../screens/CircularDetailsScreen";
import CircularScreen from "../screens/CircularScreen";

const CircularStack = createStackNavigator();

function CircularNavigator() {
  return (
    <CircularStack.Navigator>
      <CircularStack.Screen
        name="CircularScreen"
        component={CircularScreen}
        options={{
          headerTitle: "Circulars",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "500",
          },
        }}
      />
      <CircularStack.Screen
        name="CircularDetailsScreen"
        component={CircularDetailsScreen}
      />
    </CircularStack.Navigator>
  );
}

export default CircularNavigator;
