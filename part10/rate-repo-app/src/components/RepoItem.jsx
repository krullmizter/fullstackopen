import React from "react";
import { View, Image, Pressable, StyleSheet } from "react-native";
import theme, { cardStyles } from "./theme";
import CustomText from "./CustomText";
import * as Linking from "expo-linking";

const styles = StyleSheet.create({
  container: {
    ...cardStyles.container,
    marginBottom: theme.padding.medium,
    maxWidth: "100%",
  },
  avatar: {
    width: 60,
    height: 60,
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
    marginTop: theme.padding.medium,
  },
  countItem: {
    alignItems: "center",
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.padding.small,
    borderRadius: 5,
    alignItems: "center",
    marginTop: theme.padding.medium,
    minHeight: 48,
    justifyContent: "center",
  },
  buttonText: {
    color: theme.colors.white,
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
          <CustomText testID="fullName" numberOfLines={1}>
            {repository.fullName || <CustomText>"N/A"</CustomText>}
          </CustomText>
          <CustomText testID="description" numberOfLines={2}>
            {repository.description || (
              <CustomText>"No description available"</CustomText>
            )}
          </CustomText>
          <CustomText style={styles.languageTag} testID="language">
            {repository.language || <CustomText>"Unknown"</CustomText>}
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
