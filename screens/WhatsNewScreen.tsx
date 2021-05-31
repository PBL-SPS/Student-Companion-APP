import { Layout, Spinner, Text } from "@ui-kitten/components";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { useQuery } from "react-query";
import AxiosInstance from "../axios";
import WhatsNewCard from "../components/WhatsNew/WhatsNewCard";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { getWhatsNew } from "../redux/reducers/whatsNewSlice";

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

  if (isLoading) {
    return (
      <Layout style={styles.spinner}>
        <Spinner size="giant" />
      </Layout>
    );
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
        onRefresh={refetch}
        refreshing={isLoading}
        data={whatsNewFeed}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
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
