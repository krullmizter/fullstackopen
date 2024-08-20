import { Platform, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const theme = {
  colors: {
    primary: "#0366d6",
    primaryDark: "#024c94",
    primaryLight: "#478cc7",
    textPrimary: "#24292e",
    textSecondary: "#586069",
    textLight: "#ffffff",
    error: "#d73a4a",
    backgroundLight: "#e1e4e8",
    white: "#ffffff",
  },
  fontSizes: {
    body: width > 360 ? 16 : 14,
    subheading: width > 360 ? 18 : 16,
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
  shadow: {
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
};

export const formStyles = {
  container: {
    padding: theme.padding.medium,
    backgroundColor: theme.colors.white,
  },
  input: {
    height: 40,
    borderColor: theme.colors.textSecondary,
    borderWidth: 1,
    marginBottom: theme.padding.small,
    paddingHorizontal: theme.padding.small,
    borderRadius: 5,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  errorText: {
    color: theme.colors.error,
    marginBottom: theme.padding.small,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.padding.medium,
    borderRadius: 5,
    alignItems: "center",
    marginTop: theme.padding.medium,
  },
  buttonText: {
    color: theme.colors.white,
    fontWeight: "bold",
  },
  buttonPressed: {
    backgroundColor: theme.colors.primaryDark,
  },
  buttonDisabled: {
    backgroundColor: theme.colors.primaryLight,
  },
};

export const cardStyles = {
  container: {
    padding: 15,
    backgroundColor: theme.colors.white,
    marginBottom: 10,
    borderRadius: 5,
    elevation: theme.shadow.elevation,
    shadowColor: theme.shadow.shadowColor,
    shadowOffset: theme.shadow.shadowOffset,
    shadowOpacity: theme.shadow.shadowOpacity,
    shadowRadius: theme.shadow.shadowRadius,
  },
};

export default theme;
