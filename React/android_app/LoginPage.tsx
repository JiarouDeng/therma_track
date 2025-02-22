import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import LoginComp from "./LoginComp";
import { useNavigation } from "@react-navigation/native";
import utilsFuncs from "./utils";

function LoginPage() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <LoginComp
        nameClass="username"
        auxClass="password"
        buttonText="Login"
        onLoginSubmit={(name, password) => {
          if (name == "doctor") navigation.navigate("Doctor");
          else if (password) navigation.navigate("Patient");
        }}
        onAuxChecker={utilsFuncs.parseUserNameAndPassword}
      />
      <TouchableOpacity
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "SignUp" }],
          })
        }
      >
        <Text style={styles.signupText}>
          Don't have an account? Sign up here!
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  signupText: {
    textDecorationLine: "underline",
    textDecorationColor: "blue",
    cursor: "pointer", // This won't work in React Native, but you can style it for interaction.
    marginTop: 20,
  },
});

export default LoginPage;
