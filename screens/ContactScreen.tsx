import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";
import { useQuery } from "react-query";
import AxiosInstance from "../axios";

type Contact = {
  id: number;
  name: string;
  phoneNum: string;
  email: string;
  position: string;
  createdAt: string;
  updatedAt: string;
};

const ContactScreen = () => {
  const { data, error, isLoading } = useQuery("contacts", () =>
    AxiosInstance.get("/contacts")
  );

  if (isLoading)
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
  if (data)
    return (
      <Layout>
        {data.data.map((res: Contact,i:number) => (
          <Layout key={i.toString()}>
            <Text>{res.name}</Text>
            <Text>{res.email}</Text>
            <Text>{res.position}</Text>
          </Layout>
        ))}
      </Layout>
    );
};

export default ContactScreen;

const styles = StyleSheet.create({});
