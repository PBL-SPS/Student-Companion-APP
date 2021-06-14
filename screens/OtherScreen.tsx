import {
  Button,
  Icon,
  Input,
  Layout,
  Modal,
  Spinner,
  Text,
  Toggle,
  useTheme,
} from "@ui-kitten/components";
import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import Divider from "../components/Divider";
import ProfileItem from "../components/OtherScreen/ProfileItem";
import useAppSelector from "../hooks/useAppSelector";
import { addAuthData } from "../redux/reducers/authSlice";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/core";
import useAppDispatch from "../hooks/useAppDispatch";
import { useMutation } from "react-query";
import { Attendance, misCredentials } from "./MISDetailsScreen";
import AxiosInstance from "../axios";
import {
  addAttendanceData,
  addMISDetails,
} from "../redux/reducers/attendanceSlice";
import { Formik } from "formik";
import ErrorMessage from "../components/Error/ErrorMessage";

const validationSchema = Yup.object().shape({
  misId: Yup.string().required().label("MIS ID"),
  misPassword: Yup.string().required().label("MIS Password"),
});

const LoadingIndicator = (props: any) => (
  <View style={[props.style, styles.indicator]}>
    <Spinner size="small" style={{ borderColor: "white" }} />
  </View>
);

const OtherScreen = () => {
  const theme = useTheme();
  const authData = useAppSelector((state) => state.auth);
  const AttendanceState = useAppSelector((state) => state.attendance);
  const [visible, setVisible] = React.useState(false);

  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

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
        setVisible(false);
        return res.data;
      })
  );

  const onSubmit = (values: misCredentials) => {
    mutate(values);
  };

  return (
    <>
      {/* MIS Details Modal */}
      <Layout style={styles.modalContainer}>
        <Modal
          style={styles.modal}
          visible={visible}
          backdropStyle={styles.backdrop}
        >
          <Layout style={styles.closeIconContainer}>
            <Icon
              style={styles.iconClose}
              fill="#fff"
              name="close-outline"
              onPress={() => setVisible(false)}
            />
          </Layout>
          <Layout style={styles.container}>
            <Layout
              style={{
                flex: 0.4,
                justifyContent: "center",
                marginVertical: 30,
              }}
            >
              <Text category="h4">Enter your MIS Details</Text>
            </Layout>
            <Layout style={{ flex: 0.6 }}>
              <Formik
                initialValues={{ misId: "", misPassword: "" }}
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
                          Submit
                        </Button>
                      )}
                    </Layout>
                  </>
                )}
              </Formik>
            </Layout>
          </Layout>
        </Modal>
      </Layout>
      {/* OtherScreen */}
      <Layout level="4" style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("ProfileScreen")}
        >
          <Layout level="4" style={styles.header}>
            <Layout style={[styles.initialsWrapper]} level="1">
              <Text style={styles.initials}>
                {authData?.firstName[0]}
                {authData?.lastName[0]}
              </Text>
            </Layout>
            <Layout level="4" style={styles.headerText}>
              <Text category="h5" adjustsFontSizeToFit={true}>
                {authData.firstName} {authData.lastName}
              </Text>
              <Text category="s1" appearance="hint" adjustsFontSizeToFit={true}>
                {authData.year}-{authData.division} | {authData.department}
              </Text>
            </Layout>
          </Layout>
        </TouchableOpacity>
        <Divider />
        <Layout level="4" style={styles.body}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              AttendanceState
                ? navigation.navigate("AttendanceScreen")
                : setVisible(true);
            }}
          >
            <ProfileItem name="info-outline" text="Attendance" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8}>
            <ProfileItem
              name="calendar-outline"
              text="Calendar (Coming Soon)"
            />
          </TouchableOpacity>
          <Layout level="4" style={styles.darkMode}>
            {/* <ProfileItem name="moon-outline" text="Dark Mode" />
          <Toggle checked={true} /> */}
          </Layout>
        </Layout>
        <Divider />
        <Layout level="4" style={styles.body}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => dispatch({type : "USER_LOGOUT"})}
          >
            <ProfileItem name="corner-down-left-outline" text="Logout" />
          </TouchableOpacity>
        </Layout>
      </Layout>
    </>
  );
};

export default OtherScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  header: {
    marginVertical: 25,
    flexDirection: "row",
  },
  initialsWrapper: {
    height: 90,
    width: 90,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  initials: {
    fontSize: 35,
    textAlign: "center",
  },
  headerText: {
    alignSelf: "center",
    marginLeft: 20,
  },
  body: {
    marginTop: 10,
  },
  darkMode: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalContainer: {
    justifyContent: "center",
  },
  modal: {
    borderRadius: 10,
  },
  inputField: {
    marginBottom: 20,
  },
  button: {
    marginTop: 25,
    marginBottom: 30,
  },
  indicator: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconClose: {
    height: 32,
    width: 32,
  },
  closeIconContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
