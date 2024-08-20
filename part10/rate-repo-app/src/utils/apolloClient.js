import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Constants from "expo-constants";
import { onError } from "@apollo/client/link/error";

const apolloUri = Constants.expoConfig?.extra?.apolloUri;

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

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    }
    if (networkError) console.error(`[Network error]: ${networkError}`);
  });

  return new ApolloClient({
    link: errorLink.concat(authLink).concat(httpLink),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });
};

export default createApolloClient;
