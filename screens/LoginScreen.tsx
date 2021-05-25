import {
  Button,
  Icon,
  Input,
  Layout,
  Spinner,
  Text,
} from "@ui-kitten/components";
import { Formik } from "formik";
import React, { useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import * as Yup from "yup";
import ErrorMessage from "../components/Error/ErrorMessage";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

const LoginScreen = () => {
  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const AlertIcon = (props: any) => (
    <Icon {...props} name="alert-circle-outline" />
  );

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props: any) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  const onSubmit = () => {};

  return (
    <Layout style={styles.container}>
      {loading ? (
        <Layout>
          <Spinner size="giant" />
        </Layout>
      ) : (
        <>
          <Layout style={{ flex: 0.4, justifyContent: "center" }}>
            <Text category="h1">Hey,</Text>
            <Text category="h1">Login Now.</Text>
          </Layout>
          <Layout style={{ flex: 0.6 }}>
            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={onSubmit}
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
                <>
                  <Layout>
                    <View style={styles.inputField}>
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
                    </View>
                    <View style={styles.inputField}>
                      <Input
                        label="Password"
                        placeholder="Password"
                        value={values.password}
                        caption="Should contain at least 6 characters"
                        accessoryRight={renderIcon}
                        secureTextEntry={secureTextEntry}
                        onChangeText={handleChange("password")}
                        onBlur={() => setFieldTouched("password")}
                      />
                      {errors.password && (
                        <ErrorMessage visible={touched["password"]}>
                          {errors.password}
                        </ErrorMessage>
                      )}
                    </View>
                  </Layout>
                  <Layout>
                    <Button
                      onPress={handleSubmit}
                      style={styles.button}
                      status="success"
                    >
                      Sign In
                    </Button>
                  </Layout>
                  <Layout>
                    <Text style={styles.forgotText} appearance="hint">
                      Forgot Password ?
                    </Text>
                  </Layout>
                  <Layout style={styles.signUpWrapper}>
                    <Text style={styles.forgotText}>
                      <View>
                        <Text style={styles.signUpText} appearance="hint">
                          Not Registered?
                        </Text>
                      </View>{" "}
                      <View>
                        <Text style={styles.signUpText}>Sign Up</Text>
                      </View>
                    </Text>
                  </Layout>
                </>
              )}
            </Formik>
          </Layout>
        </>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: "center",
  },
  inputField: {
    marginBottom: 20,
  },
  button: {
    marginTop: 25,
  },
  forgotText: {
    marginTop: 10,
  },
  signUpWrapper: {
    alignItems: "center",
    marginTop: 30,
  },
  signUpText: {
    paddingTop: 10,
  },
});

export default LoginScreen;
