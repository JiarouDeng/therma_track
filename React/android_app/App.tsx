import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "./LoginPage"; // your component
import SignupPage from "./SignupPage"; // your component
import DoctorPage from "./DoctorPage";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="SignUp" component={SignupPage} />
        <Stack.Screen name="Doctor" component={DoctorPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
