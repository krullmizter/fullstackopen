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
      <CustomText style={styles.rating}>{review.rating}</CustomText>
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
  rating: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
});

export default Review;
