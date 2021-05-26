import { Button, Icon, Layout, Text, useTheme } from "@ui-kitten/components";
import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useQuery } from "react-query";
import AxiosInstance from "../axios";
import Divider from "../components/Divider";
import LectureCard from "../components/LectureCard";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { addTimetable } from "../redux/reducers/timetableSlice";

export type Lecture = {
  id: number;
  name: string;
  day: string;
  startedAt: string;
  endedAt: string;
  lecturer: string;
  batchId: number | null;
};

export type Timetable = {
  id: number;
  lectures: Lecture[];
};

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const TimetableScreen = () => {
  const stateTimetable = useAppSelector((state) => state.timetable.timetable);
  const dispatch = useAppDispatch();
  const { data, error, isLoading, refetch } = useQuery<Timetable, Error>(
    "timetable",
    () =>
      AxiosInstance.get(
        "/timetable/academics?yearId=1&departmentId=1&divisionId=1"
      )
        .then((res) => {
          console.log(res.data);
          dispatch(addTimetable(res.data));
          return res.data;
        })
        .catch((error) => error)
  );
  const [day, setDay] = useState(new Date().getDay());
  const theme = useTheme();
  const setNextDay = () => {
    setDay((oldDay) => (oldDay + 1 < weekdays.length ? oldDay + 1 : 0));
  };
  const setPrevDay = () => {
    setDay((oldDay) => (oldDay - 1 >= 0 ? oldDay - 1 : weekdays.length - 1));
  };

  if (!stateTimetable && isLoading)
    return (
      <Layout style={styles.container}>
        <Text>Loading</Text>
      </Layout>
    );

  if (error)
    return (
      <Layout style={styles.container}>
        <Text>Error</Text>
      </Layout>
    );
  return (
    <Layout style={styles.container} level="4">
      <Layout style={styles.header} level="2">
        <Button
          appearance="ghost"
          status="primary"
          onPress={setPrevDay}
          accessoryLeft={(props) => (
            <Icon name="chevron-back-outline" pack="ion" {...props} />
          )}
        />

        <Text category="h6">{weekdays[day]}</Text>
        <Button
          onPress={setNextDay}
          appearance="ghost"
          status="primary"
          accessoryLeft={(props) => (
            <Icon name="chevron-forward-outline" pack="ion" {...props} />
          )}
        />
      </Layout>
      <Divider />
      <FlatList
        onRefresh={refetch}
        refreshing={isLoading}
        data={stateTimetable?.lectures
          .filter((lecture) => lecture.day === weekdays[day])
          .sort(
            (b, a) =>
              new Date(b.startedAt).getHours() -
              new Date(a.startedAt).getHours()
          )}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => <LectureCard lecture={item} />}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Layout
            style={{
              flexGrow: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 100,
            }}
            level="4"
          >
            <Icon
              name="happy-outline"
              pack="ion"
              style={{
                width: 40,
                height: 40,
                color: theme["text-hint-color"],
              }}
            />
            <Text appearance="hint">No lectures here</Text>
          </Layout>
        }
      />
    </Layout>
  );
};

export default TimetableScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "space-around",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  icon: {
    width: 25,
    height: 25,
  },
});
