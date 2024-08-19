import React from "react";
import { Text, StyleSheet } from "react-native";
import theme from "./theme";

const CustomText = ({ style, ...props }) => {
  return <Text style={[styles.text, style]} {...props} />;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: theme.fonts.main,
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
  },
});

export default CustomText;
