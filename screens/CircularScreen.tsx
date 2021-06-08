import { useNavigation } from "@react-navigation/core";
import { Icon, Layout, List, Text, useTheme } from "@ui-kitten/components";
import moment from "moment";
import React from "react";
import { ListRenderItem, StyleSheet } from "react-native";
import { useQuery } from "react-query";
import AxiosInstance from "../axios";
import TouchableScale from "../components/Animated/TouchableScale";
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
      <TouchableScale
        onPress={() =>
          navigation.navigate("CircularDetailsScreen", {
            ...item,
          })
        }
      >
        <Layout style={styles.wrapper} level="1">
          <Layout style={styles.outerContainer} level="1">
            <Layout level="1" style={styles.containerIcon}>
              <Icon
                name="newspaper"
                pack="ion"
                style={{
                  ...styles.imageIcon,
                  color: theme["color-primary-400"],
                }}
              />
            </Layout>
            <Layout level="1" style={styles.containerCard}>
              <Layout level="1" style={styles.card}>
                <Layout
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    // marginBottom: 3,
                  }}
                >
                  <Text category="h6" style={styles.heading}>
                    {item.heading}
                  </Text>
                  {/* <Text appearance="hint" category="p2">
                  8m ago
                </Text> */}
                </Layout>
              </Layout>
              <Text category="s1" style={styles.content}>
                {item.content.length > 100
                  ? item.content.substr(0, 100) + "..."
                  : item.content}
              </Text>
            </Layout>
          </Layout>
          <Layout
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              paddingBottom: 15,
              paddingRight: 17,
            }}
          >
            <Text category="c2">{moment(item.createdAt).fromNow()}</Text>
          </Layout>
        </Layout>
      </TouchableScale>
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
    <Layout level="4" style={{ flexGrow: 1 }}>
      <List
        // style={{ flexGrow: 1 }}
        contentContainerStyle={{
          paddingTop : 5,
          paddingBottom : 10
        }}
        onRefresh={refetch}
        refreshing={isLoading}
        data={stateCircular}
        renderItem={CircularCard}
        style={{
          backgroundColor: theme["background-basic-color-4"],
          paddingTop: 5,
          paddingBottom: 10,
        }}
        // ItemSeparatorComponent={Divider}
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
    // padding: 5,
  },
  containerIcon: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "15%",
    paddingTop: 20,
    textAlign: "center",
  },
  containerCard: {
    width: "85%",
    paddingTop: 15,
    paddingRight: 17,
  },
  card: {
    // margin: 2,
    borderWidth: 0,
  },
  imageIcon: {
    width: 25,
    height: 25,
  },
  heading: {
    fontWeight: "bold",
    textTransform: "capitalize",
    // letterSpacing: 0.2,
  },
  content: {
    fontSize: 14,
    fontWeight: "200",
  },
  wrapper: {
    overflow: "hidden",
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
