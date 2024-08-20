import React from "react";
import { View, FlatList, Pressable, StyleSheet, Alert } from "react-native";
import { useQuery, useMutation } from "@apollo/client";
import { ME } from "../graphql/queries";
import { DELETE_REVIEW } from "../graphql/mutations";
import CustomText from "./CustomText";
import theme, { formStyles, cardStyles } from "./theme";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    ...cardStyles.container,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: theme.padding.small,
  },
  button: {
    padding: theme.padding.small,
    borderRadius: 5,
    alignItems: "center",
    flexGrow: 1,
  },
  viewButton: {
    backgroundColor: theme.colors.primary,
    marginRight: theme.padding.small,
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
  },
  ratingCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  ratingText: {
    color: theme.colors.primary,
    fontWeight: "bold",
  },
});

const ReviewItem = ({ review, refetch }) => {
  const navigate = useNavigate();
  const [deleteReview] = useMutation(DELETE_REVIEW);

  const handleDelete = () => {
    if (Platform.OS === "web") {
      const confirmed = confirm("Are you sure you want to delete this review?");
      if (confirmed) {
        performDelete();
      }
    } else {
      Alert.alert(
        "Delete Review",
        "Are you sure you want to delete this review?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: performDelete,
          },
        ]
      );
    }
  };

  const performDelete = async () => {
    try {
      const { data } = await deleteReview({ variables: { id: review.id } });

      if (data?.deleteReview) {
        refetch();
      } else {
        Alert.alert("Error", "Failed to delete the review.");
      }
    } catch (e) {
      Alert.alert("Error", "An error occurred while deleting the review.");
      console.error("Error deleting review:", e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.ratingCircle}>
        <CustomText style={styles.ratingText}>{review.rating}</CustomText>
      </View>
      <CustomText>{review.repository.fullName}</CustomText>
      <CustomText>{new Date(review.createdAt).toLocaleDateString()}</CustomText>
      <CustomText>{review.text}</CustomText>
      <View style={styles.buttonsContainer}>
        <Pressable
          style={[styles.button, styles.viewButton]}
          onPress={() => navigate(`/repository/${review.repository.id}`)}
        >
          <CustomText style={{ color: "white" }}>View repository</CustomText>
        </Pressable>
        <Pressable
          style={[styles.button, styles.deleteButton]}
          onPress={handleDelete}
        >
          <CustomText style={{ color: "white" }}>Delete review</CustomText>
        </Pressable>
      </View>
    </View>
  );
};

const MyReviews = () => {
  const { data, loading, refetch } = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network",
  });

  if (loading) {
    return <CustomText>Loading...</CustomText>;
  }

  return (
    <FlatList
      data={data?.me?.reviews?.edges.map((edge) => edge.node)}
      renderItem={({ item }) => <ReviewItem review={item} refetch={refetch} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default MyReviews;
