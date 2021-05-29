import { useNavigation } from "@react-navigation/core";
import {
  Layout,
  Text,
  List,
  Divider,
  ButtonGroup,
  Button,
  Card,
  useTheme,
} from "@ui-kitten/components";
import React from "react";
import { ListRenderItem, StyleSheet, TouchableOpacity } from "react-native";
import { useQuery } from "react-query";
import AxiosInstance from "../axios";
import { Ionicons } from "@expo/vector-icons";
import CircularCard from "../components/CircularCard";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { getCirculars } from "../redux/reducers/circularSlice";
import { CircularCardProps } from "../types";

const CircularScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const stateCircular = useAppSelector((state) => state.circulars.circulars);
  const dispatch = useAppDispatch();
  //Circular Card
  const CircularCard: ListRenderItem<CircularCardProps> = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("CircularDetailsScreen", {
            ...item,
          })
        }
      >
        <Layout style={styles.outerContainer}>
          <Layout style={styles.containerIcon}>
            <Ionicons
              style={{
                color: theme["color-info-500"],
                ...styles.imageIcon,
              }}
              name="person"
              size={25}
            />
          </Layout>
          <Layout style={styles.containerCard}>
            <Card style={styles.card} disabled>
              <Layout
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 3,
                }}
              >
                <Text category="h6" style={styles.heading}>
                  {item.heading}
                </Text>
                <Text appearance="hint" category="p2">
                  8m ago
                </Text>
              </Layout>
              <Text category="s1" style={styles.content}>
                {item.content.substr(0, 25)}
              </Text>
            </Card>
          </Layout>
        </Layout>
      </TouchableOpacity>
    );
  };
  const {
    data: circulars,
    error,
    isLoading,
    refetch,
  } = useQuery("circulars", () =>
    AxiosInstance.get("/circular").then((res) => {
      dispatch(getCirculars(res.data));
      return res.data;
    })
  );
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
      {/* <Button onPress={() => navigation.navigate("CircularDetailsScreen")}>
        Press me
      </Button> */}
    </Layout>
  );
};

export default CircularScreen;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    flexDirection: "row",
    padding: 5,
  },
  containerIcon: {
    width: "15%",
    borderRightWidth: 1,
    borderRightColor: "#dcdcdc",
    alignSelf: "center",
  },
  containerCard: {
    width: "85%",
  },
  card: {
    margin: 2,
    borderWidth: 0,
  },
  imageIcon: {
    textAlign: "center",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 0.2,
  },
  content: {
    fontSize: 14,
    fontWeight: "200",
  },
});
