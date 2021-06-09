import React from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import {
  Drawer,
  DrawerGroup,
  DrawerItem,
  Icon,
  Layout,
  Text,
} from "@ui-kitten/components";
import useAppSelector from "../hooks/useAppSelector";
import { useMutation } from "react-query";
import { Attendance } from "./MISDetailsScreen";
import AxiosInstance from "../axios";
import useAppDispatch from "../hooks/useAppDispatch";
import { addAttendanceData } from "../redux/reducers/attendanceSlice";

const AttendanceScreen = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const AttendanceState = useAppSelector((state) => state.attendance);
  const dispatch = useAppDispatch();

  const { isLoading, mutate, error, isError } = useMutation<Attendance, Error>(
    (attendanceData) =>
      AxiosInstance.post<Attendance>(
        "/student/attendance",
        attendanceData
      ).then((res) => {
        const resData = res.data;
        dispatch(
          addAttendanceData({
            totalAverage: resData.totalAverage,
            attendance: resData.attendance,
          })
        );
        return res.data;
      })
  );

  const titleText = (title: any, percent: any) => {
    return (
      <View style={styles.textContainer}>
        <Text style={styles.textTitle}>{title}</Text>
        <Text>{percent} %</Text>
      </View>
    );
  };

  const attendedText = (text: any, number: any) => {
    return (
      <View style={styles.textContainer}>
        <Text style={styles.textInside}>{text}</Text>
        <Text>{number}</Text>
      </View>
    );
  };

  const totalText = (text: any, number: any) => {
    return (
      <View style={styles.textContainer}>
        <Text style={styles.textInside}>{text}</Text>
        <Text>{number}</Text>
      </View>
    );
  };

  const leftIcon = (props: any) => {
    return <Icon {...props} name="radio-button-off-outline" />;
  };

  const onRefresh = () => {
    if (AttendanceState.formDetails) {
      mutate({
        misId: AttendanceState?.formDetails.misId,
        misPassword: AttendanceState?.formDetails.misPassword,
      });
    }
  };

  return (
    <Layout level="4" style={styles.container}>
      <Layout level="4" style={styles.header}>
        <Text category="h5">Total Attendance</Text>
        <Text category="h5">{AttendanceState?.totalAverage} %</Text>
      </Layout>
      <Layout style={styles.body}>
        <ScrollView
          refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={isLoading} />
          }
        >
          <Drawer
            style={{ marginBottom: 70 }}
            selectedIndex={selectedIndex}
            onSelect={(index) => setSelectedIndex(index)}
          >
            {AttendanceState.attendance.map((attend) => (
              <DrawerGroup
                style={styles.drawerGroup}
                title={() => titleText(attend.subject, attend.average)}
                accessoryLeft={leftIcon}
              >
                <DrawerItem
                  title={() =>
                    attendedText("Attended Lectures", attend.attendedLectures)
                  }
                />
                <DrawerItem
                  title={() =>
                    totalText("Total Lectures", attend.totalLectures)
                  }
                />
              </DrawerGroup>
            ))}
          </Drawer>
        </ScrollView>
      </Layout>
    </Layout>
  );
};

export default AttendanceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: 20,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  body: {
    marginTop: 20,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textTitle: {
    flex: 0.8,
  },
  textInside: {
    flex: 0.9,
  },
  drawerGroup: {
    paddingVertical: 20,
  },
});
