import { useNavigation } from "@react-navigation/core";
import { Button, Icon, Input, Layout, Text } from "@ui-kitten/components";
import { Formik } from "formik";
import React, { useState } from "react";
import { StatusBar, StyleSheet } from "react-native";
import {
  ScrollView,
  TouchableWithoutFeedback
} from "react-native-gesture-handler";
import * as Yup from "yup";
import ErrorMessage from "../components/Error/ErrorMessage";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
  confPassword: Yup.string()
    .required()
    .min(6)
    .label("Confirm Password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  firstName: Yup.string().required().label("Firstname"),
  lastName: Yup.string().label("Lastname").required(),
});

const SignupScreen = () => {
  const [securePasswordEntry, setSecurePasswordEntry] = useState(true);
  const [secureConPassEntry, setSecureConPassEntry] = useState(true);
  const navigation = useNavigation();
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
      <Layout level="4" style={styles.container}>
        <Layout
          level="4"
          style={{
            minHeight: 150,
            flexDirection : "column",
            justifyContent : "center"
          }}
        >
          <Text
            category="h1"
          >
            Create{"\n"}Account.
          </Text>
        </Layout>
        <Layout level="4" style={{ flexGrow: 1 }}>
          <Formik
            initialValues={{
              email: "",
              password: "",
              confPassword: "",
              firstName: "",
              lastName: "",
            }}
            onSubmit={(data) => navigation.navigate("ProfileCreate", { data })}
            validationSchema={validationSchema}
          >
            {({
              handleChange,
              handleSubmit,
              errors,
              touched,
              setFieldTouched,
              values,
            }) => (
              <Layout level="4" style={styles.formContainer}>
                <Layout level="4" style={styles.input}>
                  <Input
                    label="Email"
                    placeholder="Email"
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={() => setFieldTouched("email")}
                  />
                  {errors.email && (
                    <ErrorMessage visible={touched["email"]}>
                      {errors.email}
                    </ErrorMessage>
                  )}
                </Layout>
                <Layout level="4" style={styles.input}>
                  <Input
                    label="Firstname"
                    placeholder="First Name"
                    value={values.firstName}
                    onChangeText={handleChange("firstName")}
                    onBlur={() => setFieldTouched("firstName")}
                  />
                  {errors.firstName && (
                    <ErrorMessage visible={touched["firstName"]}>
                      {errors.firstName}
                    </ErrorMessage>
                  )}
                </Layout>
                <Layout level="4" style={styles.input}>
                  <Input
                    label="Lastname"
                    placeholder="Last Name"
                    value={values.lastName}
                    onChangeText={handleChange("lastName")}
                    onBlur={() => setFieldTouched("lastName")}
                  />
                  {errors.lastName && (
                    <ErrorMessage visible={touched["lastName"]}>
                      {errors.lastName}
                    </ErrorMessage>
                  )}
                </Layout>

                <Layout level="4" style={styles.input}>
                  <Input
                    label="Password"
                    placeholder="Password"
                    value={values.password}
                    accessoryRight={(props: any) => (
                      <TouchableWithoutFeedback
                        onPress={() => setSecurePasswordEntry((old) => !old)}
                      >
                        <Icon
                          {...props}
                          name={securePasswordEntry ? "eye-off" : "eye"}
                        />
                      </TouchableWithoutFeedback>
                    )}
                    secureTextEntry={securePasswordEntry}
                    onChangeText={handleChange("password")}
                    onBlur={() => setFieldTouched("password")}
                  />
                  {errors.password && (
                    <ErrorMessage visible={touched["password"]}>
                      {errors.password}
                    </ErrorMessage>
                  )}
                </Layout>

                <Layout level="4" style={styles.input}>
                  <Input
                    label={"Confirm Password"}
                    placeholder="Confirm Password"
                    value={values.confPassword}
                    accessoryRight={(props: any) => (
                      <TouchableWithoutFeedback
                        onPress={() => setSecureConPassEntry((old) => !old)}
                      >
                        <Icon
                          {...props}
                          name={secureConPassEntry ? "eye-off" : "eye"}
                        />
                      </TouchableWithoutFeedback>
                    )}
                    secureTextEntry={secureConPassEntry}
                    onChangeText={handleChange("confPassword")}
                    onBlur={() => setFieldTouched("confPassword")}
                  />
                  {errors.confPassword && (
                    <ErrorMessage visible={touched["confPassword"]}>
                      {errors.confPassword}
                    </ErrorMessage>
                  )}
                </Layout>
                <Layout style={styles.footer} level="4">
                  <Button
                    appearance="filled"
                    style={{
                      paddingHorizontal: 50,
                      borderRadius: 50,
                    }}
                    onPress={handleSubmit}
                  >
                    Next
                  </Button>
                </Layout>
              </Layout>
            )}
          </Formik>
        </Layout>
      </Layout>
    </ScrollView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 40,
    overflow: "hidden",
    // alignItems: "center",
  },
  formContainer: {
    width: "100%",
  },
  input: {
    marginVertical: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
});
