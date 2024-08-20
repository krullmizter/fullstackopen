import React from "react";
import { View, StyleSheet } from "react-native";
import CustomText from "./CustomText";
import { format } from "date-fns";

const Review = ({ review }) => {
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.header}>
        <CustomText style={styles.username}>{review.user.username}</CustomText>
        <CustomText style={styles.date}>
          {format(new Date(review.createdAt), "dd.MM.yyyy")}
        </CustomText>
      </View>
      <View style={styles.numberCircle}>
        <CustomText style={styles.numberText}>{review.rating}</CustomText>
      </View>
      <CustomText>{review.text}</CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewContainer: {
    padding: 15,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 5,
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  username: {
    fontWeight: "bold",
  },
  date: {
    color: "#888",
  },
  numberCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#0366d6",
    justifyContent: "center",
    alignItems: "center",
  },
  numberText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Review;
