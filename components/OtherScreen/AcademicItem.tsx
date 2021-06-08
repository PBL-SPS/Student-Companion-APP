import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, View } from "react-native";

interface propTypes {
  category: string;
  value: string;
}

const AcademicItem = ({ category, value }: propTypes) => {
  return (
    <Layout style={styles.textWrapper} level="4">
      <View>
        <Text style={styles.categoryText}>{category}</Text>
      </View>
      <View>
        <Text style={styles.valueText}>{value}</Text>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  textWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  categoryText: {
    textTransform: "uppercase",
  },
  valueText: {
    textTransform: "uppercase",
  },
});

export default AcademicItem;
