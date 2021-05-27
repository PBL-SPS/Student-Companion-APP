import { createStackNavigator } from "@react-navigation/stack";
import { Text, TopNavigation } from "@ui-kitten/components";
import React from "react";
import WhatsNewDetailScreen from "../screens/WhatsNewDetailScreen";
import WhatsNewScreen from "../screens/WhatsNewScreen";
import { GlobalStyles } from "../styles/globalStyles";
import { renderBackButtonAction } from "./CommonNavigation";

const WhatsNewStack = createStackNavigator();

function WhatsNewNavigator() {
  return (
    <WhatsNewStack.Navigator>
      <WhatsNewStack.Screen
        name="WhatsNewScreen"
        component={WhatsNewScreen}
        options={{ headerTitle: "Whats New" }}
      />
      <WhatsNewStack.Screen
        name="WhatsNewDetailScreen"
        component={WhatsNewDetailScreen}
        options={{
          header: (props: any) => (
            <TopNavigation
              style={GlobalStyles.topNavigation}
              alignment="start"
              accessoryLeft={renderBackButtonAction}
            />
          ),
        }}
      />
    </WhatsNewStack.Navigator>
  );
}

export default WhatsNewNavigator;
