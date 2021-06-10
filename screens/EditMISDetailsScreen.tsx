import { useNavigation } from "@react-navigation/core";
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
import { useMutation } from "react-query";
import * as Yup from "yup";
import AxiosInstance from "../axios";
import ErrorMessage from "../components/Error/ErrorMessage";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import {
  addAttendanceData,
  addMISDetails,
} from "../redux/reducers/attendanceSlice";
import { Attendance, misCredentials } from "./MISDetailsScreen";

const validationSchema = Yup.object().shape({
  misId: Yup.string().required().label("MIS ID"),
  misPassword: Yup.string().required().label("MIS Password"),
});

const LoadingIndicator = (props: any) => (
  <View style={[props.style, styles.indicator]}>
    <Spinner size="small" style={{ borderColor: "white" }} />
  </View>
);

const EditMISDetailsScreen = () => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const AttendanceState = useAppSelector((state) => state.attendance);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props: any) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  const { isLoading, mutate, error, isError } = useMutation<Attendance, Error>(
    (attendanceData) =>
      AxiosInstance.post<Attendance>(
        "/student/attendance",
        attendanceData
      ).then((res) => {
        const resData = res.data;
        console.log(res.config);
        dispatch(addMISDetails(JSON.parse(res.config.data)));
        dispatch(
          addAttendanceData({
            totalAverage: resData.totalAverage,
            attendance: resData.attendance,
          })
        );
        navigation.navigate("AttendanceScreen");
        return res.data;
      })
  );

  const onSubmit = (values: misCredentials) => {
    mutate(values);
  };

  return (
    <Layout style={styles.container}>
      <Layout style={{ flex: 0.6 }}>
        <Formik
          initialValues={{
            misId: AttendanceState.formDetails.misId,
            misPassword: AttendanceState.formDetails.misPassword,
          }}
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
                    label="MIS ID"
                    placeholder="C2K90279586"
                    value={values.misId}
                    onChangeText={handleChange("misId")}
                    onBlur={() => setFieldTouched("misId")}
                  />
                  {errors.misId && (
                    <ErrorMessage visible={touched["misId"]}>
                      {errors.misId}
                    </ErrorMessage>
                  )}
                </View>
                <View style={styles.inputField}>
                  <Input
                    label="MIS Password"
                    placeholder="MIS Password"
                    value={values.misPassword}
                    caption="Should contain at least 6 characters"
                    accessoryRight={renderIcon}
                    secureTextEntry={secureTextEntry}
                    onChangeText={handleChange("misPassword")}
                    onBlur={() => setFieldTouched("misPassword")}
                  />
                  {errors.misPassword && (
                    <ErrorMessage visible={touched["misPassword"]}>
                      {errors.misPassword}
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
                    Update
                  </Button>
                )}
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

export default EditMISDetailsScreen;
