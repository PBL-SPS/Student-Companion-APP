import { useNavigation } from "@react-navigation/core";
import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { WhatsNew } from "../../screens/WhatsNewScreen";

const WhatsNewCard = ({ whatsnewitem }: { whatsnewitem: WhatsNew }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("WhatsNewDetailScreen", {
          heading: whatsnewitem.heading,
          content: whatsnewitem.content,
          file: whatsnewitem?.file,
        })
      }
      activeOpacity={0.6}
    >
      <Layout style={styles.card}>
        {whatsnewitem.file && (
          <Image
            style={styles.image}
            source={{ uri: whatsnewitem.file.link }}
          />
        )}
        <View style={styles.textWrapper}>
          <Text category="h6">{whatsnewitem.heading}</Text>
        </View>
      </Layout>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 0.5,
    borderRadius: 15,
    elevation: 10,
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
