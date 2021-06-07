import {
  Button,
  Icon,
  IndexPath,
  Input,
  Layout,
  Select,
  SelectItem,
  Spinner,
  Text,
  useTheme,
} from "@ui-kitten/components";
import { Formik } from "formik";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import ErrorMessage from "../components/Error/ErrorMessage";
import * as Yup from "yup";
import useAppSelector from "../hooks/useAppSelector";
import { useMutation } from "react-query";
import AxiosInstance from "../axios";
import useAppDispatch from "../hooks/useAppDispatch";
import { updateAuthData } from "../redux/reducers/authSlice";
import { useNavigation } from "@react-navigation/core";

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required().label("Firstname"),
  lastname: Yup.string().required().label("Lastname"),
  email: Yup.string().required().email().label("Email"),
  year: Yup.number().required().label("Year"),
  batch: Yup.number().required().label("Batch"),
  department: Yup.number().required().label("Department"),
  division: Yup.number().required().label("Division"),
});

const divisions = ["1", "2", "3", "4"];
const years = ["FE", "SE", "TE", "BE"];
const departments = ["COMP", "IT", "ENTC"];
const batches = ["E1", "F1", "G1", "H1"];

interface editValues {
  firstname?: string;
  lastname?: string;
  email?: string;
  batch?: number;
  division?: number;
  department?: number;
  year?: number;
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

  const { isLoading, mutate, error, isError } = useMutation((editData) =>
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
        return res.data;
      })
      .catch((err) => console.log(err.message))
  );

  const onSubmit = (values: editValues) => {
    mutate({
      firstName: values.firstname,
      lastName: values.lastname,
      email: values.email,
      batch: batches[values.batch],
      department: departments[values.department],
      year: years[values.year],
      division: divisions[values.division],
    });
  };

  return (
    <ScrollView style={{ backgroundColor: theme["background-basic-color-4"] }}
    contentContainerStyle={{
      paddingTop : 20
    }}
    >
      <Layout level="4" style={styles.container}>
        <Layout level="4">
          <Formik
            initialValues={{
              firstname: authData.firstName,
              lastname: authData.lastName,
              email: authData.email,
              batch: batches.indexOf(authData.batch),
              division: divisions.indexOf(authData.division),
              department: departments.indexOf(authData.department),
              year: years.indexOf(authData.year),
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
                      value={years[values.year]}
                    >
                      {years.map((year, index) => (
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
                      value={batches[values.batch]}
                    >
                      {batches.map((batch, index) => (
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
                      value={departments[values.department]}
                    >
                      {departments.map((department, index) => (
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
                      value={divisions[values.division]}
                    >
                      {divisions.map((division, index) => (
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
