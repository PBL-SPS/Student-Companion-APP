import { Card, Layout, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, View } from "react-native";

const CircularDetailsScreen = (props: any) => {
  // const stateCircular = useAppSelector((state) => state.circulars.circulars);
  const { heading, content } = props.route.params;
  console.log(heading, content);
  return (
    <Layout>
      <Card>
        <Layout style={styles.outerContainer}>
          <Text style={styles.heading}>{heading}</Text>
          <Layout style={styles.innerContainer1}>
            <Text style={styles.author}>Prof. Preeti Jain</Text>
            <Text appearance="hint" category="p2">
              8m ago
            </Text>
          </Layout>
          <Text style={styles.content} category="s1">
            {content}
          </Text>
          <Text category="s1" style={styles.download}>
            Downloads
          </Text>
          <Card>
            <Text>File1</Text>
          </Card>
          <Card>
            <Text>File1</Text>
          </Card>
          <Card>
            <Text>File1</Text>
          </Card>
        </Layout>
      </Card>
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
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 0.2,
  },
  content: {
    fontSize: 14,
    fontWeight: "200",
  },
  author: {
    fontSize: 16,
    fontWeight: "bold",
  },
  download: {
    fontSize: 14,
  },
});
