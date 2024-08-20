import React from "react";
import { Route, Routes, Navigate } from "react-router-native";
import { View, StyleSheet } from "react-native";
import AppBar from "./AppBar";
import RepoList from "./RepoList";
import SignIn from "./SignIn";
import SingleRepository from "./SingleRepository";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e1e4e8",
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepoList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/repository/:id" element={<SingleRepository />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </View>
  );
};

export default Main;
