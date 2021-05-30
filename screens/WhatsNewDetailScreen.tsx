import { useRoute } from "@react-navigation/core";
import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import Moment from "moment";

const WhatsNewDetailScreen = () => {
  const route: any = useRoute();
  const headingDetail = route.params.heading;
  const contentDetail = route.params.content;
  const fileDetail = route.params.file;
  const createdAtDetail = route.params.createdAt;
  return (
    <Layout style={styles.container}>
      {fileDetail?.link && (
        <Image style={styles.img} source={{ uri: fileDetail?.link }} />
      )}
      <ScrollView>
        <Layout style={styles.body}>
          <View style={styles.textWrapper}>
            <Text style={styles.heading} category="h3">
              {headingDetail}
            </Text>
            <Text appearance="hint" style={styles.date}>
              {Moment(createdAtDetail).fromNow()}
            </Text>
          </View>

          <View>
            <Text style={styles.content} category="s1">
              {contentDetail}
            </Text>
          </View>
        </Layout>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    height: 250,
    width: "100%",
  },
  body: {
    paddingHorizontal: 20,
  },
  heading: {
    marginVertical: 15,
  },
  date: {
    fontStyle: "italic",
  },
  content: {
    textAlign: "justify",
    letterSpacing: 0.5,
    marginVertical: 20,
  },
});

export default WhatsNewDetailScreen;
