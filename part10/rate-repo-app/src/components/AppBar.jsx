import React from "react";
import { View, ScrollView, Pressable, StyleSheet } from "react-native";
import { Link } from "react-router-native";
import { useApolloClient, useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";
import useAuthStorage from "../hooks/useAuthStorage";
import CustomText from "./CustomText";
import theme from "./theme";
import Constants from "expo-constants";

const AppBar = () => {
  const { data } = useQuery(ME);
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const isAuthenticated = !!data?.me;

  const handleSignOut = async () => {
    try {
      await authStorage.removeAccessToken();
      await apolloClient.resetStore();
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollView}>
        <Link to="/" component={Pressable} style={styles.tab}>
          <CustomText style={styles.text}>Repositories</CustomText>
        </Link>
        {isAuthenticated && (
          <>
            <Link to="/create-review" component={Pressable} style={styles.tab}>
              <CustomText style={styles.text}>Create a Review</CustomText>
            </Link>
            <Link to="/my-reviews" component={Pressable} style={styles.tab}>
              <CustomText style={styles.text}>My Reviews</CustomText>
            </Link>
            <Pressable onPress={handleSignOut} style={styles.tab}>
              <CustomText style={styles.text}>Sign Out</CustomText>
            </Pressable>
          </>
        )}
        {!isAuthenticated && (
          <>
            <Link to="/signin" component={Pressable} style={styles.tab}>
              <CustomText style={styles.text}>Sign In</CustomText>
            </Link>
            <Link to="/signup" component={Pressable} style={styles.tab}>
              <CustomText style={styles.text}>Sign Up</CustomText>
            </Link>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.primary,
    paddingBottom: theme.padding.small,
    elevation: 4,
    shadowColor: theme.colors.shadowColor,
    shadowOffset: theme.shadowOffset,
    shadowOpacity: theme.shadowOpacity,
    shadowRadius: theme.shadowRadius,
  },
  scrollView: {
    flexDirection: "row",
    paddingHorizontal: theme.padding.medium,
  },
  tab: {
    paddingHorizontal: theme.padding.medium,
    paddingVertical: theme.padding.small,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: theme.colors.white,
    fontWeight: theme.fontWeights.bold,
  },
});

export default AppBar;
