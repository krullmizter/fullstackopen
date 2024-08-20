import React from "react";
import { useParams } from "react-router-native";
import { useQuery } from "@apollo/client";
import { FlatList } from "react-native";
import { Repository } from "../graphql/queries";
import RepoItem from "./RepoItem";
import Review from "./Review";
import CustomText from "./CustomText";

const SingleRepository = () => {
  const { id } = useParams();
  const { data, loading } = useQuery(Repository, { variables: { id } });

  if (loading) {
    return <CustomText>Loading...</CustomText>;
  }

  if (!data || !data.repository) {
    return <CustomText>Error loading repository data</CustomText>;
  }

  console.log("Repository Data:", data.repository);

  return (
    <FlatList
      data={data.repository.reviews.edges.map((edge) => edge.node)}
      renderItem={({ item }) => <Review review={item} />}
      ListHeaderComponent={() => (
        <RepoItem repository={data.repository} showGitHubButton={true} />
      )}
    />
  );
};

export default SingleRepository;
