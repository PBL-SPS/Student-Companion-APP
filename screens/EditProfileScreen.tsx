import {
  Button,
  IndexPath,
  Input,
  Layout,
  Select,
  SelectItem,
  Spinner,
  useTheme
} from "@ui-kitten/components";
import { AxiosError } from "axios";
import { Formik } from "formik";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Toast from "react-native-root-toast";
import { useMutation, useQuery } from "react-query";
import * as Yup from "yup";
import AxiosInstance from "../axios";
import ErrorMessage from "../components/Error/ErrorMessage";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { updateAuthData } from "../redux/reducers/authSlice";
import LoadingScreen from "./LoadingScreen";
import {
  CollegeData,
  DivisionsEntityOrDepartmentsEntityOrBatchesEntityOrYearsEntity
} from "./ProfileCreateScreen";

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required().label("Firstname"),
  lastname: Yup.string().required().label("Lastname"),
  email: Yup.string().required().email().label("Email"),
  year: Yup.number().required().label("Year"),
  batch: Yup.number().required().label("Batch"),
  department: Yup.number().required().label("Department"),
  division: Yup.number().required().label("Division"),
});

interface editValues {
  firstname?: string;
  lastname?: string;
  email?: string;
  batch?: number;
  division?: number;
  department?: number;
  year?: number;
}

interface EditData {
  firstName: string;
  lastName: string;
  email: string;
  batch: string;
  department: string;
  year: string;
  division: string;
}

const LoadingIndicator = (props: any) => (
  <View style={[props.style, styles.indicator]}>
    <Spinner size="small" style={{ borderColor: "white" }} />
  </View>
);

const EditProfileScreen = () => {
  const authData = useAppSelector((state) => state.auth);
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const { isLoading, mutate, error, isError } = useMutation<
    any,
    AxiosError,
    EditData
  >((editData) =>
    AxiosInstance.post("/student/profile/edit", editData)
      .then((res) => {
        const resData = res.data;
        console.log(resData, "Profile Data");
        dispatch(
          updateAuthData({
            firstName: resData.firstName,
            lastName: resData.lastName,
            email: resData.email,
            batch: resData.batch.name,
            batchId: resData.batchId,
            department: resData.department.name,
            departmentId: resData.departmentId,
            year: resData.year.name,
            yearId: resData.yearId,
            division: resData.division.name,
            divisionId: resData.divisionId,
          })
        );
        Toast.show("Updated Profile successfully", {
          duration: Toast.durations.LONG,
          textStyle: {
            fontSize: 14,
          },
        });
        return res.data;
      })
      .catch((err) => console.log(err.message))
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

  const onSubmit = (values: editValues) => {
    mutate({
      firstName: values.firstname,
      lastName: values.lastname,
      email: values.email,
      batch: collegeData.batches[values.batch],
      department: collegeData.departments[values.department],
      year: collegeData.years[values.year],
      division: collegeData.divisions[values.division],
    });
  };

  if (isColLoading) return <LoadingScreen />;

  return (
    <ScrollView
      style={{ backgroundColor: theme["background-basic-color-4"] }}
      contentContainerStyle={{
        paddingTop: 20,
      }}
    >
      <Layout level="4" style={styles.container}>
        <Layout level="4">
          <Formik
            initialValues={{
              firstname: authData.firstName,
              lastname: authData.lastName,
              email: authData.email,
              batch: collegeData.batches.indexOf(authData.batch),
              division: collegeData.divisions.indexOf(authData.division),
              department: collegeData.departments.indexOf(authData.department),
              year: collegeData.years.indexOf(authData.year),
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
              setFieldValue,
            }) => (
              <>
                <Layout level="4">
                  <View style={styles.inputField}>
                    <Input
                      label="Firstname"
                      placeholder="Firstname"
                      value={values.firstname}
                      onChangeText={handleChange("firstname")}
                      onBlur={() => setFieldTouched("firstname")}
                    />
                    {errors.firstname && (
                      <ErrorMessage visible={touched["firstname"]}>
                        {errors.firstname}
                      </ErrorMessage>
                    )}
                  </View>
                  <View style={styles.inputField}>
                    <Input
                      label="Lastname"
                      placeholder="Lastname"
                      value={values.lastname}
                      onChangeText={handleChange("lastname")}
                      onBlur={() => setFieldTouched("lastname")}
                    />
                    {errors.lastname && (
                      <ErrorMessage visible={touched["lastname"]}>
                        {errors.lastname}
                      </ErrorMessage>
                    )}
                  </View>
                  <View style={styles.inputField}>
                    <Input
                      label="Email"
                      placeholder="Email"
                      value={values.email}
                      keyboardType="email-address"
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
                  </View>
                  <View style={styles.inputField}>
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
                  </View>
                  <View style={styles.inputField}>
                    <Select
                      multiSelect={false}
                      selectedIndex={new IndexPath(values.department)}
                      onSelect={(index) =>
                        setFieldValue("department", index.row)
                      }
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
                  </View>
                  <View style={styles.inputField}>
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
                  </View>
                </Layout>
                <Layout level="4">
                  {isLoading ? (
                    <Button
                      accessoryLeft={LoadingIndicator}
                      style={styles.button}
                    ></Button>
                  ) : (
                    <Button onPress={handleSubmit} style={styles.button}>
                      Update Profile
                    </Button>
                  )}
                </Layout>
              </>
            )}
          </Formik>
        </Layout>
      </Layout>
    </ScrollView>
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
    marginBottom: 20,
  },
  indicator: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EditProfileScreen;
