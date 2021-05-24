import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import WhatsNewScreen from "../screens/WhatsNewScreen";

const WhatsNewStack = createStackNavigator();

function WhatsNewNavigator() {
  return (
    <WhatsNewStack.Navigator>
      <WhatsNewStack.Screen
        name="WhatsNewScreen"
        component={WhatsNewScreen}
        options={{ headerTitle: "Whats New" }}
      />
    </WhatsNewStack.Navigator>
  );
}

export default WhatsNewNavigator;
