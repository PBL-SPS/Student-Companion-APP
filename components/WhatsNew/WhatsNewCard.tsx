import { Divider, Layout, Text } from "@ui-kitten/components";
import React from "react";
import { WhatsNew } from "../../screens/WhatsNewScreen";

const WhatsNewCard = ({ whatsnewitem }: { whatsnewitem: WhatsNew }) => {
  return (
    <Layout>
      <Text>{whatsnewitem.heading}</Text>
      <Text>{whatsnewitem.content}</Text>
      <Text>{whatsnewitem.duration}</Text>
      <Divider />
    </Layout>
  );
};

export default WhatsNewCard;
