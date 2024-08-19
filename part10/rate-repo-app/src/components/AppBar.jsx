import React, { useMemo } from "react";
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

  const isAuthenticated = useMemo(() => !!data?.me, [data]);

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
      <ScrollView role="tablist" style={styles.scrollView}>
        <Link to="/" component={Pressable} style={styles.tab}>
          <CustomText style={styles.text}>Repositories</CustomText>
        </Link>
        {isAuthenticated ? (
          <Pressable onPress={handleSignOut} style={styles.tab}>
            <CustomText style={styles.text}>Sign Out</CustomText>
          </Pressable>
        ) : (
          <Link to="/signin" component={Pressable} style={styles.tab}>
            <CustomText style={styles.text}>Sign In</CustomText>
          </Link>
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
  },
  scrollView: {
    flexDirection: "row",
  },
  tab: {
    paddingHorizontal: theme.padding.medium,
    paddingVertical: theme.padding.small,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: theme.colors.white,
  },
});

export default AppBar;
