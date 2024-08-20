import React from "react";
import { View, StyleSheet } from "react-native";
import CustomText from "./CustomText";
import { format } from "date-fns";
import { cardStyles } from "./theme";

const Review = ({ review }) => {
  return (
    <View style={cardStyles.container}>
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
    marginBottom: 10,
  },
  numberText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Review;
