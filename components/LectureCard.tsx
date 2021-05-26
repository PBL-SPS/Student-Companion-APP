import { Layout, Text, useTheme } from "@ui-kitten/components";
import moment from "moment";
import React from "react";
import { StyleSheet } from "react-native";
import { Lecture } from "../screens/TimetableScreen";

type LectureCardProps = {
  lecture: Lecture;
};

const LectureCard = ({ lecture }: LectureCardProps) => {
  const theme = useTheme();
  return (
    <Layout style={styles.card} level="3">
      <Layout level="3" style={styles.initialContainer}>
        <Layout level="3"
          style={[
            { backgroundColor: theme["color-primary-400"] },
            styles.initialLetter,
          ]}
        >
          <Text style={styles.initialText} category="h5">
            {lecture.name[0].toUpperCase()}
          </Text>
        </Layout>
      </Layout>
      <Layout level="3" style={styles.infoContainer}>
        <Layout level="3" style={{ flexDirection: "row", flexBasis: 10 }}>
          <Text category="p1" style={styles.lectureName}>
            {lecture.name}
          </Text>
        </Layout>

        <Text category="p2">{lecture.lecturer}</Text>
        <Layout level="3"
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <Text category="p2">
            {moment(lecture.startedAt).format("hh:mm A")} -{" "}
            {moment(lecture.endedAt).format("hh:mm A")}
          </Text>
          {lecture.batchId && (
            <Layout level="3" style={[styles.tag]}>
              <Text
                category="label"
                style={[
                  {
                    backgroundColor: theme["color-info-400"],
                    flexShrink: 1,
                    paddingVertical: 1,
                    paddingHorizontal: 7,
                    borderRadius: 5,
                  },
                ]}
                status="control"
              >
                LAB
              </Text>
            </Layout>
          )}
        </Layout>
      </Layout>
    </Layout>
  );
};

export default LectureCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  initialContainer: {
    width: 70,
    marginRight: 0,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  initialLetter: {
    width: 50,
    height: 50,

    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  initialText: { fontSize: 25, textAlign: "center", color: "white" },
  infoContainer: {
    flexShrink: 1,
    flexDirection: "column",
  },
  lectureName: {
    fontWeight: "700",
    flexShrink: 1,
    width : "100%"
  },
  tag: {
    flexDirection: "row",
  },
});
