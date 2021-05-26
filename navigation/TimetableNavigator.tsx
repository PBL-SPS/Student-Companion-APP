import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import TimetableScreen from "../screens/TimetableScreen";

const TimetableStack = createStackNavigator();

function TimetableNavigator() {
  return (
    <TimetableStack.Navigator>
      <TimetableStack.Screen
        name="TimetableScreen"
        component={TimetableScreen}
        options={{ headerTitle: "Timetable" }}
      />
    </TimetableStack.Navigator>
  );
}

export default TimetableNavigator;
