import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { useQuery } from "react-query";
import AxiosInstance from "../axios";
import ContactCard from "../components/ContactCard";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { addContacts } from "../redux/reducers/contactsSlice";
import LoadingScreen from "./LoadingScreen";


export type Contact = {
  id: number;
  name: string;
  phoneNum: string;
  email: string;
  position: string;
  createdAt: string;
  updatedAt: string;
};

const ContactScreen = () => {
  const stateContacts = useAppSelector((state) => state.contacts.contacts);
  const dispatch = useAppDispatch();
  const {
    data: contacts,
    error,
    isLoading,
    refetch,
  } = useQuery("contacts", () =>
    AxiosInstance.get("/contacts").then((res) => {
      dispatch(addContacts(res.data));
      return res.data;
    })
  );

  const renderItem = ({ item }: { item: Contact }) => (
    <ContactCard contact={item} />
  );

  if (stateContacts.length == 0 && isLoading) return <LoadingScreen />;

  if (error)
    return (
      <Layout>
        <Text>{error.toString()}</Text>
      </Layout>
    );

  return (
    <Layout style={styles.container} level="4">
      <FlatList
        contentContainerStyle={{
          paddingBottom: 10,
        }}
        onRefresh={refetch}
        refreshing={isLoading}
        data={stateContacts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        // ListFooterComponent={() => <Layout level="4" style={{ paddingTop: 15 }}></Layout>}
      />
    </Layout>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 5,
  },
});
