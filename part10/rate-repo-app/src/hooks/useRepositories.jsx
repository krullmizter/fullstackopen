import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (
  sortBy = "CREATED_AT",
  orderDirection = "DESC",
  searchKeyword = ""
) => {
  const { data, loading, error, refetch } = useQuery(GET_REPOSITORIES, {
    variables: { orderBy: sortBy, orderDirection, searchKeyword },
    fetchPolicy: "cache-and-network",
  });

  if (error) {
    console.error("GraphQL query error:", error.message);
    throw new Error("Failed to fetch repositories");
  }

  return {
    repositories: data?.repositories.edges.map((edge) => edge.node) || [],
    loading,
    refetch,
  };
};

export default useRepositories;
