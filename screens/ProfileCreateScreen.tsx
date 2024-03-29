import { useNavigation, useRoute } from "@react-navigation/core";
import {
  Button,
  IndexPath,
  Layout,
  Select,
  SelectItem,
  Spinner,
  Text,
  useTheme
} from "@ui-kitten/components";
import { AxiosError } from "axios";
import { Formik } from "formik";
import React from "react";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { useMutation, useQuery } from "react-query";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import AxiosInstance from "../axios";
import ErrorMessage from "../components/Error/ErrorMessage";
import { addAuthData } from "../redux/reducers/authSlice";
import LoadingScreen from "./LoadingScreen";

const divisions = ["1", "2", "3", "4"];
const years = ["FE", "SE", "TE", "BE"];
const departments = ["COMP", "IT", "ENTC"];
const batches = ["E1", "F1", "G1", "H1"];

type SignUpData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "STUDENT";
  year: string;
  batch: string;
  department: string;
  division: string;
};

export interface SignupRes {
  user: User;
  accessToken: string;
  refreshToken: string;
  profile: Profile;
}
export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  updatedAt: string;
  createdAt: string;
}
export interface Profile {
  id: number;
  yearId: number;
  divisionId: number;
  batchId: number;
  departmentId: number;
  userId: number;
  updatedAt: string;
  createdAt: string;
  year: string;
  division: string;
  batch: string;
  department: string;
}

export interface CollegeDataResponse {
  divisions?:
    | DivisionsEntityOrDepartmentsEntityOrBatchesEntityOrYearsEntity[]
    | null;
  departments?:
    | DivisionsEntityOrDepartmentsEntityOrBatchesEntityOrYearsEntity[]
    | null;
  batches?:
    | DivisionsEntityOrDepartmentsEntityOrBatchesEntityOrYearsEntity[]
    | null;
  years?:
    | DivisionsEntityOrDepartmentsEntityOrBatchesEntityOrYearsEntity[]
    | null;
}

export interface CollegeData {
  divisions?: string[] | null;
  departments?: string[] | null;
  batches?: string[] | null;
  years?: string[] | null;
}
export interface DivisionsEntityOrDepartmentsEntityOrBatchesEntityOrYearsEntity {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
  confPassword: Yup.string()
    .required()
    .min(6)
    .label("ConfPassword")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  firstName: Yup.string().required().label("Firstname"),
  lastName: Yup.string().label("Lastname").required(),
  batch: Yup.number().label("Batch").required(),
  division: Yup.number().label("Division").required(),
  department: Yup.number().label("Department").required(),
  year: Yup.number().label("Year").required(),
});

const LoadingIndicator = (props: any) => (
  <View style={[props.style, styles.indicator]}>
    <Spinner size="small" style={{ borderColor: "white" }} />
  </View>
);

const ProfileCreateScreen = () => {
  const theme = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const prevData = route.params?.data;
  console.log(prevData, "prevData");
  const dispatch = useDispatch();
  const { isLoading, mutate, error, isError } = useMutation<
    SignupRes,
    AxiosError,
    SignUpData
  >((signupData) =>
    AxiosInstance.post<SignupRes>("/auth/signup", signupData).then((res) => {
      dispatch(
        addAuthData({
          ...res.data.user,
          ...res.data.profile,
          access_token: res.data.accessToken,
          refresh_token: res.data.refreshToken,
        })
      );
      return res.data;
    })
  );
  const {
    data: collegeData,
    isLoading: isColLoading,
    isError: isColError,
    error: colError,
  } = useQuery<CollegeData, AxiosError>(["collegeData"], () =>
    AxiosInstance.get(`/collegeData`).then((res) => {
      return {
        batches: res.data.batches.map(
          (
            batch: DivisionsEntityOrDepartmentsEntityOrBatchesEntityOrYearsEntity
          ) => batch.name
        ),
        divisions: res.data.divisions.map(
          (
            division: DivisionsEntityOrDepartmentsEntityOrBatchesEntityOrYearsEntity
          ) => division.name
        ),
        departments: res.data.departments.map(
          (
            department: DivisionsEntityOrDepartmentsEntityOrBatchesEntityOrYearsEntity
          ) => department.name
        ),
        years: res.data.years.map(
          (
            year: DivisionsEntityOrDepartmentsEntityOrBatchesEntityOrYearsEntity
          ) => year.name
        ),
      };
    })
  );

  if (isColLoading) {
    return <LoadingScreen />;
  }

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
      <Layout level="4" style={styles.container}>
        <Layout
          level="4"
          style={{
            minHeight: 180,
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Text category="h1">Just{"\n"}Few Details.</Text>
        </Layout>
        <Layout level="4">
          {error && (
            <ErrorMessage visible={true}>
              {error.response.data.message}
            </ErrorMessage>
          )}
          <Formik
            initialValues={{
              ...prevData,
            }}
            onSubmit={(data) =>
              mutate({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
                role: "STUDENT",
                year: collegeData.years[data.year],
                batch: collegeData.batches[data.batch],
                department: collegeData.departments[data.department],
                division: collegeData.divisions[data.division],
              })
            }
            validationSchema={validationSchema}
          >
            {({
              handleChange,
              handleSubmit,
              setFieldValue,
              errors,
              touched,
              setFieldTouched,
              values,
            }) => (
              <Layout level="4" style={styles.formContainer}>
                <Layout level="4" style={styles.input}>
                  <Select
                    multiSelect={false}
                    selectedIndex={new IndexPath(values.year)}
                    onSelect={(index) => setFieldValue("year", index.row)}
                    label={"Year"}
                    onBlur={() => setFieldTouched("year")}
                    value={collegeData.years[values.year]}
                  >
                    {collegeData.years.map((year, index) => (
                      <SelectItem key={index.toString()} title={year} />
                    ))}
                  </Select>
                  {errors.year && (
                    <ErrorMessage visible={touched["year"]}>
                      {errors.year}
                    </ErrorMessage>
                  )}
                </Layout>

                <Layout level="4" style={styles.input}>
                  <Select
                    multiSelect={false}
                    selectedIndex={new IndexPath(values.department)}
                    onSelect={(index) => setFieldValue("department", index.row)}
                    label={"Department"}
                    onBlur={() => setFieldTouched("department")}
                    value={collegeData.departments[values.department]}
                  >
                    {collegeData.departments.map((department, index) => (
                      <SelectItem key={index.toString()} title={department} />
                    ))}
                  </Select>
                  {errors.department && (
                    <ErrorMessage visible={touched["department"]}>
                      {errors.department}
                    </ErrorMessage>
                  )}
                </Layout>

                <Layout level="4" style={styles.input}>
                  <Select
                    multiSelect={false}
                    selectedIndex={new IndexPath(values.batch)}
                    onSelect={(index) => setFieldValue("batch", index.row)}
                    label={"Batch"}
                    onBlur={() => setFieldTouched("batch")}
                    value={collegeData.batches[values.batch]}
                  >
                    {collegeData.batches.map((batch, index) => (
                      <SelectItem key={index.toString()} title={batch} />
                    ))}
                  </Select>
                  {errors.batch && (
                    <ErrorMessage visible={touched["batch"]}>
                      {errors.batch}
                    </ErrorMessage>
                  )}
                </Layout>

                <Layout level="4" style={styles.input}>
                  <Select
                    multiSelect={false}
                    selectedIndex={new IndexPath(values.division)}
                    onSelect={(index) => setFieldValue("division", index.row)}
                    label={"Division"}
                    onBlur={() => setFieldTouched("division")}
                    value={collegeData.divisions[values.division]}
                  >
                    {collegeData.divisions.map((division, index) => (
                      <SelectItem key={index.toString()} title={division} />
                    ))}
                  </Select>
                  {errors.division && (
                    <ErrorMessage visible={touched["division"]}>
                      {errors.division}
                    </ErrorMessage>
                  )}
                </Layout>
                <Layout style={styles.footer} level="4">
                  {!isLoading ? (
                    <Button
                      appearance="filled"
                      style={{
                        paddingHorizontal: 50,
                        borderRadius: 50,
                      }}
                      onPress={handleSubmit}
                    >
                      Create
                    </Button>
                  ) : (
                    <Button
                      appearance="filled"
                      style={{
                        paddingHorizontal: 50,
                        borderRadius: 50,
                      }}
                      accessoryLeft={LoadingIndicator}
                    ></Button>
                  )}
                  <Button
                    appearance="outline"
                    style={{
                      paddingHorizontal: 20,
                      borderRadius: 50,
                      marginTop: 20,
                    }}
                    onPress={() =>
                      navigation.navigate("Signup", {
                        data: {
                          batch: values.batch,
                          division: values.division,
                          department: values.department,
                          year: values.year,
                        },
                      })
                    }
                  >
                    Back
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

export default ProfileCreateScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
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
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 20,
  },
  indicator: {
    justifyContent: "center",
    alignItems: "center",
  },
});
