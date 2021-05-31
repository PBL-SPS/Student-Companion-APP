import { useNavigation } from "@react-navigation/core";
import { Layout, Text } from "@ui-kitten/components";
import moment from "moment";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { WhatsNew } from "../../screens/WhatsNewScreen";

const WhatsNewCard = ({ whatsnewitem }: { whatsnewitem: WhatsNew }) => {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate("WhatsNewDetailScreen", {
          heading: whatsnewitem.heading,
          content: whatsnewitem.content,
          file: whatsnewitem?.file,
          createdAt: whatsnewitem.createdAt,
        })
      }
      // activeOpacity={0.6}
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
          <Text category="s1">
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
    </TouchableWithoutFeedback>
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
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
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
