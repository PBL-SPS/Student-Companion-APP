import { Icon, Layout, Text, useTheme } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";

interface propTypes {
  name: string;
  text: string;
}

const ProfileItem = ({ name, text, ...props }: propTypes) => {
  const theme = useTheme();
  return (
    <Layout style={styles.container}>
      <Icon name={name} fill={theme["color-primary-500"]} style={styles.icon} />
      <Text category="h6" {...props}>
        {text}
      </Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  icon: {
    height: 30,
    width: 30,
    marginRight: 25,
  },
});

export default ProfileItem;
