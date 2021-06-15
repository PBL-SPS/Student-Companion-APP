import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { useQuery } from "react-query";
import AxiosInstance from "../axios";
import WhatsNewCard from "../components/WhatsNew/WhatsNewCard";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { getWhatsNew } from "../redux/reducers/whatsNewSlice";
import LoadingScreen from "./LoadingScreen";

export type WhatsNew = {
  id: number;
  heading: string;
  content: string;
  duration: string;
  file?: File;
  createdAt: string;
  updatedAt: string;
};

const WhatsNewScreen = () => {
  const whatsNewFeed = useAppSelector((state) => state.whatsnew.whatsnew);
  const dispatch = useAppDispatch();

  const {
    data: whatsnew,
    error,
    isLoading,
    refetch,
  } = useQuery("whatsnew", () =>
    AxiosInstance.get("/whatsnew/get-all").then((res) => {
      dispatch(getWhatsNew(res.data));
      return res.data;
    })
  );

  const renderItem = ({ item }: { item: WhatsNew }) => {
    return <WhatsNewCard whatsnewitem={item} />;
  };

  if (whatsNewFeed.length === 0 && isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <Layout style={styles.container}>
        <Text>Error</Text>
      </Layout>
    );
  }

  return (
    <Layout style={styles.container} level="4">
      <FlatList
        contentContainerStyle={{
          paddingTop: 10,
          paddingBottom: 10,
        }}
        style={{
          flex: 1,
        }}
        onRefresh={refetch}
        refreshing={isLoading}
        data={whatsNewFeed}
        renderItem={renderItem}
        keyExtractor={(item,index) => index.toString()}
      />
    </Layout>
  );
};

export default WhatsNewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spinner: {
    flex: 1,
    alignItems: "center",
    paddingTop: 30,
  },
});
