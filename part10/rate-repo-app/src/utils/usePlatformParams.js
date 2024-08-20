import { Platform } from "react-native";

export const usePlatformParams = () => {
  if (Platform.OS === "web") {
    return require("react-router-dom").useParams;
  } else {
    return require("react-router-native").useParams;
  }
};

export default usePlatformParams;
