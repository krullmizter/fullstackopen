import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthStorage {
  constructor(namespace = "auth") {
    this.namespace = namespace;
  }

  async getAccessToken() {
    try {
      return await AsyncStorage.getItem(`${this.namespace}:accessToken`);
    } catch (error) {
      console.error("Failed to get access token:", error);
      return null;
    }
  }

  async setAccessToken(accessToken) {
    try {
      await AsyncStorage.setItem(`${this.namespace}:accessToken`, accessToken);
    } catch (error) {
      console.error("Failed to save the access token:", error);
    }
  }

  async removeAccessToken() {
    try {
      await AsyncStorage.removeItem(`${this.namespace}:accessToken`);
    } catch (error) {
      console.error("Failed to remove access token:", error);
    }
  }
}

export default AuthStorage;
