import React from "react";
import { Route, Routes, Navigate } from "react-router-native";
import { View, StyleSheet } from "react-native";
import AppBar from "./AppBar";
import RepoList from "./RepoList";
import SignIn from "./SignIn";
import SingleRepository from "./SingleRepository";
import ReviewForm from "./ReviewForm";
import SignUpForm from "./SignUpForm";
import ErrorBoundary from "./ErrorBoundary";
import MyReviews from "./MyReviews";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e1e4e8",
  },
});

const Main = () => {
  return (
    <ErrorBoundary>
      <View style={styles.container}>
        <AppBar />
        <Routes>
          <Route path="/" element={<RepoList />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/repository/:id" element={<SingleRepository />} />
          <Route path="/create-review" element={<ReviewForm />} />
          <Route path="/my-reviews" element={<MyReviews />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </View>
    </ErrorBoundary>
  );
};

export default Main;
