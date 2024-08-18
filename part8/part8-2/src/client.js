import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  concat,
} from "@apollo/client";

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("auth-token");
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });
  return forward(operation);
});

const client = new ApolloClient({
  link: concat(
    authLink,
    new HttpLink({
      uri: "http://localhost:4000/graphql",
    })
  ),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          allBooks: {
            keyArgs: ["filter"],
          },
          allAuthors: {
            keyArgs: ["filter"],
          },
        },
      },
    },
  }),
});

export default client;
