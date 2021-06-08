import { Button, Icon, Layout, Text, useTheme } from "@ui-kitten/components";
import moment from "moment";
import React from "react";
import { Linking, StyleSheet } from "react-native";
import { useQuery } from "react-query";
import AxiosInstance from "../axios";
import Divider from "../components/Divider";

export interface File {
  id: number;
  name: string;
  link: string;
  fileType: string;
  createdAt: Date;
  updatedAt: Date;
  circularId: number;
  whatsNewId?: any;
}

const CircularDetailsScreen = (props: any) => {
  // const stateCircular = useAppSelector((state) => state.circulars.circulars);
  const { heading, content, createdAt, id } = props.route.params;
  const { data, isLoading, isError, error } = useQuery<File[], Error>(
    ["circulars", "files",id],
    () =>
      AxiosInstance.get<File[]>(`/circular/${id}/files`).then((res) => {
        return res.data;
      })
  );
  const theme = useTheme()
  return (
    <Layout style={styles.wrapper} level="4">
      <Layout style={styles.outerContainer} level="4">
        <Text category="h4" style={styles.heading}>
          {heading}
        </Text>
        <Layout style={styles.innerContainer1}  level="4">
          <Text appearance="hint" category="s1">
            {moment(createdAt).fromNow()}
          </Text>
          {/* <Text style={styles.author}>Prof. Preeti Jain</Text> */}
        </Layout>
        <Text style={styles.content} category="p1">
          {content}
        </Text>
        <Divider />
        {data && data.length > 0 && (
          <Text category="h6" style={styles.download}>
            Attachments
          </Text>
        )}

        {isError && <Text>error</Text>}

        {data &&
          data.map((file) => (
            <Layout
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                margin: 2,
                width: "100%",
              }}
              level="4"
              key={file.id.toString()}
            >
              <Layout
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  flexShrink: 1,
                }}
                level="4"
              >
                <Icon
                  name="document-outline"
                  pack="ion"
                  style={{ width: 25, height: 25, color : theme["text-basic-color"] }}
                />
                <Text style={{ marginLeft: 10, flexShrink: 1 }}>
                  {file.name}
                </Text>
              </Layout>
              <Button
                appearance="ghost"
                status="info"
                accessoryLeft={(props) => (
                  <Icon name="cloud-download-outline" pack="ion" {...props} />
                )}
                style={{
                  flexGrow: 1,
                }}
                onPress={() => Linking.openURL(file.link)}
              ></Button>
            </Layout>
          ))}
      </Layout>
    </Layout>
  );
};

export default CircularDetailsScreen;

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: "column",
  },
  innerContainer1: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 7,
  },
  heading: {
    // fontSize: 20,
    // fontWeight: "bold",
    // letterSpacing: 0.2,
  },
  content: {
    // fontSize: 14,
    // fontWeight: "200",
    paddingBottom: 10,
  },
  author: {
    fontSize: 16,
    fontWeight: "bold",
  },
  download: {
    marginTop: 10,
  },
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexGrow: 1,
  },
});
