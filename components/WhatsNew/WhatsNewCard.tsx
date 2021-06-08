import { useNavigation } from "@react-navigation/core";
import { Layout, Text } from "@ui-kitten/components";
import moment from "moment";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { WhatsNew } from "../../screens/WhatsNewScreen";
import TouchableScale from "../Animated/TouchableScale";

const WhatsNewCard = ({ whatsnewitem }: { whatsnewitem: WhatsNew }) => {
  const navigation = useNavigation();

  return (
    <TouchableScale
      onPress={() =>
        navigation.navigate("WhatsNewDetailScreen", {
          heading: whatsnewitem.heading,
          content: whatsnewitem.content,
          file: whatsnewitem?.file,
          createdAt: whatsnewitem.createdAt,
        })
      }
    >
      <Layout style={styles.card} level="1">
        {whatsnewitem.file && (
          <Image
            style={styles.image}
            source={{ uri: whatsnewitem.file.link }}
          />
        )}
        <View style={styles.textWrapper}>
          <Text category="h6">{whatsnewitem.heading}</Text>
          <Text category="s2">
            {whatsnewitem.content.length > 80
              ? whatsnewitem.content.substr(0, 80) + "..."
              : whatsnewitem.content}
          </Text>
          <Text
            category="s2"
            appearance="hint"
            style={{
              textAlign: "right",
            }}
          >
            {moment(whatsnewitem.createdAt).fromNow()}
          </Text>
        </View>
      </Layout>
    </TouchableScale>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 0,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  image: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: 200,
    width: "100%",
  },
  textWrapper: {
    padding: 15,
  },
});

export default WhatsNewCard;
