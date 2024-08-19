import React from "react";
import { View, Image, StyleSheet } from "react-native";
import theme from "./theme";
import CustomText from "./CustomText";

const styles = StyleSheet.create({
  container: {
    padding: theme.padding.medium,
    backgroundColor: theme.colors.white,
    maxWidth: 500,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  infoContainer: {
    flexDirection: "row",
    marginBottom: theme.padding.small,
  },
  details: {
    marginLeft: theme.padding.small,
    flexShrink: 1,
  },
  languageTag: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    padding: theme.padding.small,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  countsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: theme.padding.small,
  },
  countItem: {
    alignItems: "center",
  },
});

const formatCount = (count) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return String(count);
};

const RepoItem = ({ repository }) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Image
          source={{ uri: repository.ownerAvatarUrl }}
          style={styles.avatar}
        />
        <View style={styles.details}>
          <CustomText>{repository.fullName}</CustomText>
          <CustomText>{repository.description}</CustomText>
          <CustomText style={styles.languageTag}>
            {repository.language}
          </CustomText>
        </View>
      </View>
      <View style={styles.countsContainer}>
        <View style={styles.countItem}>
          <CustomText>Stars</CustomText>
          <CustomText>{formatCount(repository.stargazersCount)}</CustomText>
        </View>
        <View style={styles.countItem}>
          <CustomText>Forks</CustomText>
          <CustomText>{formatCount(repository.forksCount)}</CustomText>
        </View>
        <View style={styles.countItem}>
          <CustomText>Reviews</CustomText>
          <CustomText>{repository.reviewCount}</CustomText>
        </View>
        <View style={styles.countItem}>
          <CustomText>Rating</CustomText>
          <CustomText>{repository.ratingAverage}</CustomText>
        </View>
      </View>
    </View>
  );
};

export default RepoItem;
