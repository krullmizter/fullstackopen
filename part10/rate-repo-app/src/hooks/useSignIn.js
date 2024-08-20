import { useMutation } from "@apollo/client";
import { useApolloClient } from "@apollo/client";
import useAuthStorage from "./useAuthStorage";
import { AUTHENTICATE } from "../graphql/mutations";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    try {
      const { data } = await mutate({
        variables: { credentials: { username, password } },
      });

      if (data?.authenticate) {
        await authStorage.setAccessToken(data.authenticate.accessToken);
        await apolloClient.resetStore();

        return data;
      }

      return null;
    } catch (error) {
      console.error("Sign-in failed:", error);
      throw error;
    }
  };

  return [signIn, result];
};

export default useSignIn;
