import { useNavigation } from "@react-navigation/core";
import {
  Layout,
  Text,
  List,
  Divider,
  ButtonGroup,
  Button,
} from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";
import { useQuery } from "react-query";
import AxiosInstance from "../axios";
import CircularCard from "../components/CircularCard";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { getCirculars } from "../redux/reducers/circularSlice";

const CircularScreen = () => {
  const navigation: any = useNavigation();
  const stateCircular = useAppSelector((state) => state.circulars.circulars);
  const dispatch = useAppDispatch();
  const {
    data: circulars,
    error,
    isLoading,
    refetch,
  } = useQuery("circulars", () => {
    AxiosInstance.get("/circulars").then((res) => {
      dispatch(getCirculars(res.data));
      return res.data;
    });
  });
  if (stateCircular.length == 0 && isLoading)
    return (
      <Layout>
        <Text>Loading</Text>
      </Layout>
    );

  if (error)
    return (
      <Layout>
        <Text>Error</Text>
      </Layout>
    );

  return (
    <Layout>
      <List
        onRefresh={refetch}
        refreshing={isLoading}
        data={stateCircular}
        renderItem={CircularCard}
        ItemSeparatorComponent={Divider}
      />
      <Button onPress={navigation.navigate("CircularDetailsScreen")}>
        Press me
      </Button>
    </Layout>
  );
};

export default CircularScreen;

const styles = StyleSheet.create({});
