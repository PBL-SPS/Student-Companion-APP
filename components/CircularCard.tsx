import React, { ReactElement, ReactPropTypes } from "react";
import { StyleSheet, View, ListRenderItem, ViewProps } from "react-native";
import { Card, Divider, Layout, ListItem, Text } from "@ui-kitten/components";
import { Ionicons } from "@expo/vector-icons";
import { CircularCardProps } from "../types";
import { RenderProp } from "@ui-kitten/components/devsupport";
import { useNavigation } from "@react-navigation/core";

const renderCircularIcon = () => <Ionicons name="person" size={20} />;

interface headingProps extends ViewProps {
  heading: string;
}

const CircularCard: ListRenderItem<CircularCardProps> = ({ item }) => {
  // const navigation = useNavigation();
  return (
    // <ListItem
    //   title={item.heading}
    //   description={item.content}
    //   accessoryLeft={renderCircularIcon}
    //   style={styles.circularItem}
    // />
    <Layout style={styles.outerContainer}>
      <Layout style={styles.containerIcon}>
        <Ionicons style={styles.imageIcon} name="person" size={30} />
      </Layout>
      <Layout style={styles.containerCard}>
        <Card style={styles.card}>
          <Layout
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 3,
            }}
          >
            <Text category="s1">{item.heading}</Text>
            <Text appearance="hint" category="c1">
              8m ago
            </Text>
          </Layout>
          <Text category="p2">{item.content.substr(0, 25)}</Text>
        </Card>
      </Layout>
    </Layout>
  );
};

export default CircularCard;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    flexDirection: "row",
    padding: 5,
  },
  containerIcon: {
    width: "10%",
    alignSelf: "center",
    borderRightWidth: 2,
    borderRightColor: "#dcdcdc",
  },
  containerCard: {
    width: "90%",
  },
  card: {
    margin: 2,
    // border: "0",
  },
  imageIcon: {
    flex: 1,
    textAlign: "center",
  },
});
