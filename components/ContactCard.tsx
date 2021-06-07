import { Button, Divider, Icon, Layout, Text } from "@ui-kitten/components";
import React from "react";
import { Alert, Linking, Platform, StyleSheet } from "react-native";
import { Contact } from "../screens/ContactScreen";

const ContactCard = ({ contact }: { contact: Contact }) => {
  const call = (mobileNo: string) => {
    let phoneNumber = mobileNo;
    if (Platform.OS !== "android") {
      phoneNumber = `telprompt:${mobileNo}`;
    } else {
      phoneNumber = `tel:${mobileNo}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) {
          Alert.alert("Number is not available");
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <Layout style={styles.card} level="1">
      <Layout style={styles.body} level="1">
        <Layout style={styles.nameInitial} level="1">
          <Layout style={styles.nameInitialContainer}>
            <Text style={styles.nameInitialText} category="h5">
              {contact.name[0].toUpperCase()}
            </Text>
          </Layout>
        </Layout>
        <Layout level="1">
          <Layout level="1">
            <Text category="h6">{contact.name}</Text>
          </Layout>
          <Layout level="1"  style={{width : "90%"}}>
            <Text category="s1">{contact.position}</Text>
          </Layout>
          <Layout level="1">
            <Text category="s1">{contact.phoneNum}</Text>
          </Layout>
          <Layout level="1">
            <Text category="s1">{contact.email}</Text>
          </Layout>
        </Layout>
      </Layout>
      <Divider style={styles.divider} />
      <Layout style={styles.footer}>
        <Button
          style={[
            { borderRightWidth: 0, borderBottomLeftRadius: 10 },
            styles.buttons,
          ]}
          appearance="filled"
          size="medium"
          onPress={() => call(contact.phoneNum)}
          accessoryLeft={(props) => (
            <Icon name="call-outline" pack="ion" {...props} />
          )}
        >
          Call
        </Button>
        <Button
          style={[{ borderBottomRightRadius: 10 }, styles.buttons]}
          appearance="filled"
          size="medium"
          onPress={() => Linking.openURL(`mailto:${contact.email}`)}
          accessoryLeft={(props) => (
            <Icon name="mail-outline" pack="ion" {...props} />
          )}
        >
          Mail
        </Button>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 15,
    marginBottom: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  footer: {
    flexDirection: "row",
  },
  divider: { marginTop: 10 },
  buttons: {
    flexGrow: 1,
    borderRadius: 0,
  },
  nameInitial: {
    width: 70,
    marginRight: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  nameInitialContainer: {
    width: 65,
    height: 65,
    backgroundColor: "#ECECEC",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  nameInitialText: {
    fontSize: 30,
    textAlign: "center",
    color: "#888888",
  },
  body: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
});
export default ContactCard;
