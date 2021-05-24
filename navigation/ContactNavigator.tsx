import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ContactScreen from "../screens/ContactScreen";

const ContactStack = createStackNavigator();

function ContactNavigator() {
  return (
    <ContactStack.Navigator>
      <ContactStack.Screen
        name="ContactScreen"
        component={ContactScreen}
        options={{ headerTitle: "Contacts" }}
      />
    </ContactStack.Navigator>
  );
}

export default ContactNavigator;
