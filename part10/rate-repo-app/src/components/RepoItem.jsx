import React from "react";
import { View, Image, Pressable, StyleSheet } from "react-native";
import theme from "./theme";
import CustomText from "./CustomText";
import * as Linking from "expo-linking";

const styles = StyleSheet.create({
  container: {
    padding: theme.padding.medium,
    backgroundColor: theme.colors.white,
    maxWidth: 500,
    borderRadius: 5,
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
    marginBottom: theme.padding.medium,
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
    marginTop: theme.padding.small,
  },
  countsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: theme.padding.small,
  },
  countItem: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "#0366d6",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: theme.padding.medium,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

const formatCount = (count) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return String(count);
};

const RepoItem = ({ repository, showGitHubButton }) => {
  const openGitHub = () => {
    Linking.openURL(repository.url);
  };

  return (
    <View style={styles.container} testID="repositoryItem">
      <View style={styles.infoContainer}>
        <Image
          source={{ uri: repository.ownerAvatarUrl }}
          style={styles.avatar}
        />
        <View style={styles.details}>
          <CustomText testID="fullName">
            {repository.fullName || "N/A"}
          </CustomText>
          <CustomText testID="description">
            {repository.description || "No description available"}
          </CustomText>
          <CustomText style={styles.languageTag} testID="language">
            {repository.language || "Unknown"}
          </CustomText>
        </View>
      </View>
      <View style={styles.countsContainer}>
        <View style={styles.countItem}>
          <CustomText>Stars</CustomText>
          <CustomText testID="stargazersCount">
            {formatCount(repository.stargazersCount || 0)}
          </CustomText>
        </View>
        <View style={styles.countItem}>
          <CustomText>Forks</CustomText>
          <CustomText testID="forksCount">
            {formatCount(repository.forksCount || 0)}
          </CustomText>
        </View>
        <View style={styles.countItem}>
          <CustomText>Reviews</CustomText>
          <CustomText testID="reviewCount">
            {repository.reviewCount || 0}
          </CustomText>
        </View>
        <View style={styles.countItem}>
          <CustomText>Rating</CustomText>
          <CustomText testID="ratingAverage">
            {repository.ratingAverage || 0}
          </CustomText>
        </View>
      </View>
      {showGitHubButton && (
        <Pressable style={styles.button} onPress={openGitHub}>
          <CustomText style={styles.buttonText}>Open in GitHub</CustomText>
        </Pressable>
      )}
    </View>
  );
};

export default RepoItem;
