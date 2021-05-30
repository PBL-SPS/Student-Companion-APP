import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Icon,
  Input,
  Layout,
  Spinner,
  Text
} from "@ui-kitten/components";
import { Formik } from "formik";
import React, { useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { useMutation } from "react-query";
import * as Yup from "yup";
import AxiosInstance from "../axios";
import ErrorMessage from "../components/Error/ErrorMessage";
import useAppDispatch from "../hooks/useAppDispatch";
import { addAuthData } from "../redux/reducers/authSlice";

export interface LoginData {
  user: User;
  profile: Profile;
}

export interface LoginInput {
  email: string;
  password: string;
}
export interface User {
  userData: UserData;
}
export interface UserData {
  accessToken: string;
  refreshToken: string;
  user: User1;
}
export interface User1 {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  roles?: RolesEntity[] | null;
}
export interface RolesEntity {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  UserRole: UserRole;
}
export interface UserRole {
  id: number;
  userId: number;
  roleId: number;
  createdAt: string;
  updatedAt: string;
}
export interface Profile {
  id: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
  yearId: number;
  departmentId: number;
  divisionId: number;
  batchId: number;
  department: DepartmentOrYearOrBatchOrDivision;
  year: DepartmentOrYearOrBatchOrDivision;
  batch: DepartmentOrYearOrBatchOrDivision;
  division: DepartmentOrYearOrBatchOrDivision;
}
export interface DepartmentOrYearOrBatchOrDivision {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

const LoadingIndicator = (props: any) => (
  <View style={[props.style, styles.indicator]}>
    <Spinner size="small" style={{ borderColor: "white" }} />
  </View>
);

const LoginScreen = () => {
  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const { isLoading, mutate, error, isError } = useMutation<LoginData, Error>(
    (loginData) =>
      AxiosInstance.post<LoginData>("/auth/signin", loginData).then((res) => {
        const resData = res.data;
        dispatch(
          addAuthData({
            ...resData.user.userData.user,
            access_token: resData.user.userData.accessToken,
            refresh_token: resData.user.userData.refreshToken,
            batch: resData.profile.batch.name,
            batchId: resData.profile.batchId,
            division: resData.profile.division.name,
            divisionId: resData.profile.divisionId,
            year: resData.profile.year.name,
            yearId: resData.profile.yearId,
            department: resData.profile.department.name,
            departmentId: resData.profile.departmentId,
          })
        );
        return res.data;
      })
  );

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

  const onSubmit = (values: LoginInput) => {
    mutate(values);
  };

  return (
    <Layout style={styles.container}>
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
                {isLoading ? (
                  <Button
                    accessoryLeft={LoadingIndicator}
                    style={styles.button}
                  ></Button>
                ) : (
                  <Button onPress={handleSubmit} style={styles.button}>
                    Sign In
                  </Button>
                )}
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
                    <TouchableWithoutFeedback
                      onPress={() => navigation.navigate("Signup")}
                    >
                      <Text style={styles.signUpText}>Sign Up</Text>
                    </TouchableWithoutFeedback>
                  </View>
                </Text>
              </Layout>
            </>
          )}
        </Formik>
      </Layout>
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
  indicator: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoginScreen;
