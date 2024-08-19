import { Platform } from "react-native";

const theme = {
  colors: {
    primary: "#0366d6",
    textPrimary: "#24292e",
    textSecondary: "#586069",
    error: "#d73a4a",
    backgroundLight: "#e1e4e8",
    white: "#ffffff",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: "Roboto",
      ios: "Arial",
      default: "System",
    }),
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
  padding: {
    small: 8,
    medium: 16,
    large: 24,
  },
};

export default theme;
