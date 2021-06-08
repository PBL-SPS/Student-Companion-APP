import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Drawer,
  DrawerGroup,
  DrawerItem,
  Icon,
  Layout,
  Text,
} from "@ui-kitten/components";

const AttendanceScreen = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const titleText = () => {
    return (
      <View style={styles.textContainer}>
        <Text style={styles.textTitle}>
          CE- DATA STRUCTURES & ALGORITHMS-TH
        </Text>
        <Text>100%</Text>
      </View>
    );
  };

  const attendedText = () => {
    return (
      <View style={styles.textContainer}>
        <Text style={styles.textInside}>Attended Lectures</Text>
        <Text>20</Text>
      </View>
    );
  };

  const totalText = () => {
    return (
      <View style={styles.textContainer}>
        <Text style={styles.textInside}>Total Lectures</Text>
        <Text>22</Text>
      </View>
    );
  };

  const leftIcon = (props: any) => {
    return <Icon {...props} name="radio-button-off-outline" />;
  };

  return (
    <Layout level="4" style={styles.container}>
      <Layout level="4" style={styles.header}>
        <Text category="h5">Sanket Kulkarni</Text>
        <Text category="h5">94.23 %</Text>
      </Layout>
      <Layout style={styles.body}>
        <ScrollView>
          <Drawer
            style={{ marginBottom: 70 }}
            selectedIndex={selectedIndex}
            onSelect={(index) => setSelectedIndex(index)}
          >
            <DrawerGroup
              style={styles.drawerGroup}
              title={titleText}
              accessoryLeft={leftIcon}
            >
              <DrawerItem title={attendedText} />
              <DrawerItem title={totalText} />
            </DrawerGroup>
            <DrawerGroup
              style={styles.drawerGroup}
              title={titleText}
              accessoryLeft={leftIcon}
            >
              <DrawerItem title={attendedText} />
              <DrawerItem title={totalText} />
            </DrawerGroup>
            <DrawerGroup
              style={styles.drawerGroup}
              title={titleText}
              accessoryLeft={leftIcon}
            >
              <DrawerItem title={attendedText} />
              <DrawerItem title={totalText} />
            </DrawerGroup>
            <DrawerGroup
              style={styles.drawerGroup}
              title={titleText}
              accessoryLeft={leftIcon}
            >
              <DrawerItem title={attendedText} />
              <DrawerItem title={totalText} />
            </DrawerGroup>
            <DrawerGroup
              style={styles.drawerGroup}
              title={titleText}
              accessoryLeft={leftIcon}
            >
              <DrawerItem title={attendedText} />
              <DrawerItem title={totalText} />
            </DrawerGroup>
            <DrawerGroup
              style={styles.drawerGroup}
              title={titleText}
              accessoryLeft={leftIcon}
            >
              <DrawerItem title={attendedText} />
              <DrawerItem title={totalText} />
            </DrawerGroup>
            <DrawerGroup
              style={styles.drawerGroup}
              title={titleText}
              accessoryLeft={leftIcon}
            >
              <DrawerItem title={attendedText} />
              <DrawerItem title={totalText} />
            </DrawerGroup>
            <DrawerGroup
              style={styles.drawerGroup}
              title={titleText}
              accessoryLeft={leftIcon}
            >
              <DrawerItem title={attendedText} />
              <DrawerItem title={totalText} />
            </DrawerGroup>
            <DrawerGroup
              style={styles.drawerGroup}
              title={titleText}
              accessoryLeft={leftIcon}
            >
              <DrawerItem title={attendedText} />
              <DrawerItem title={totalText} />
            </DrawerGroup>
          </Drawer>
        </ScrollView>
      </Layout>
    </Layout>
  );
};

export default AttendanceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: 20,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  body: {
    marginTop: 20,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textTitle: {
    flex: 0.8,
  },
  textInside: {
    flex: 0.9,
  },
  drawerGroup: {
    paddingVertical: 20,
  },
});
