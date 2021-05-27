import { useRoute } from "@react-navigation/core";
import { Layout, Text } from "@ui-kitten/components";
import React from "react";

const WhatsNewDetailScreen = () => {
  const route = useRoute();
  return (
    <Layout>
      <Text>{route.params.heading}</Text>
    </Layout>
  );
};

export default WhatsNewDetailScreen;
