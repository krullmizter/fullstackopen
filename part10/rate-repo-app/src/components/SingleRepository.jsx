import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { FlatList } from "react-native";
import { Repository } from "../graphql/queries";
import RepoItem from "./RepoItem";
import Review from "./Review";
import CustomText from "./CustomText";
import { usePlatformParams } from "../utils/usePlatformParams";

const useParams = usePlatformParams();

const SingleRepository = () => {
  const { id } = useParams();
  const { data, loading, fetchMore } = useQuery(Repository, {
    variables: { id, first: 10 },
    fetchPolicy: "cache-and-network",
  });

  console.log(data);

  const [isFetchingMore, setIsFetchingMore] = useState(false);

  if (loading) {
    return <CustomText>Loading...</CustomText>;
  }

  if (!data || !data.repository) {
    return <CustomText>Error loading repository data</CustomText>;
  }

  const reviews = data.repository.reviews.edges.map((edge) => edge.node);
  const { endCursor, hasNextPage } = data.repository.reviews.pageInfo;

  const handleFetchMore = () => {
    if (!isFetchingMore && hasNextPage) {
      setIsFetchingMore(true);

      fetchMore({
        variables: {
          id,
          first: 10,
          after: endCursor,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          setIsFetchingMore(false);

          if (!fetchMoreResult) return previousResult;

          return {
            repository: {
              ...fetchMoreResult.repository,
              reviews: {
                ...fetchMoreResult.repository.reviews,
                edges: [
                  ...previousResult.repository.reviews.edges,
                  ...fetchMoreResult.repository.reviews.edges,
                ],
              },
            },
          };
        },
      });
    }
  };

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <Review review={item} />}
      ListHeaderComponent={() => (
        <RepoItem repository={data.repository} showGitHubButton={true} />
      )}
      onEndReached={handleFetchMore}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;
