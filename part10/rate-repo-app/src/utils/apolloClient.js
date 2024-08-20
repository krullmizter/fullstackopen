import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Constants from "expo-constants";

const apolloUri =
  Constants.expoConfig?.extra?.apolloUri ||
  "https://default-apollo-server.com/graphql";

if (!apolloUri) {
  console.error("Apollo URI is not defined in app configuration.");
}

const httpLink = createHttpLink({
  uri: apolloUri,
});
const createApolloClient = (authStorage) => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const token = await authStorage.getAccessToken();
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        },
      };
    } catch (error) {
      console.error("Error fetching the token:", error);
      return { headers };
    }
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
