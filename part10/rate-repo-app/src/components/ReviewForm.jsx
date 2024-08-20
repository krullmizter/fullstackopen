import React from "react";
import { View, StyleSheet, Pressable, TextInput } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";
import CustomText from "./CustomText";
import theme from "./theme";
import { useNavigate } from "react-router-native";

const validationSchema = Yup.object().shape({
  ownerName: Yup.string().required("Repository owner name is required"),
  repositoryName: Yup.string().required("Repository name is required"),
  rating: Yup.number()
    .required("Rating is required")
    .min(0, "Rating must be at least 0")
    .max(100, "Rating must be 100 or less"),
  text: Yup.string(),
});

const ReviewForm = () => {
  const [createReview] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const { data } = await createReview({
        variables: {
          review: {
            ownerName: values.ownerName,
            repositoryName: values.repositoryName,
            rating: parseInt(values.rating),
            text: values.text,
          },
        },
      });

      if (data?.createReview?.repositoryId) {
        navigate(`/repository/${data.createReview.repositoryId}`);
        resetForm();
      }
    } catch (error) {
      console.error("Error creating review:", error);
    }
  };

  return (
    <Formik
      initialValues={{
        ownerName: "",
        repositoryName: "",
        rating: "",
        text: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.container}>
          <TextInput
            placeholder="Repository owner name"
            onChangeText={handleChange("ownerName")}
            onBlur={handleBlur("ownerName")}
            value={values.ownerName}
            style={styles.input}
            error={touched.ownerName && errors.ownerName}
          />
          {touched.ownerName && errors.ownerName && (
            <CustomText style={styles.errorText}>{errors.ownerName}</CustomText>
          )}
          <TextInput
            placeholder="Repository name"
            onChangeText={handleChange("repositoryName")}
            onBlur={handleBlur("repositoryName")}
            value={values.repositoryName}
            style={styles.input}
            error={touched.repositoryName && errors.repositoryName}
          />
          {touched.repositoryName && errors.repositoryName && (
            <CustomText style={styles.errorText}>
              {errors.repositoryName}
            </CustomText>
          )}
          <TextInput
            placeholder="Rating between 0 and 100"
            onChangeText={handleChange("rating")}
            onBlur={handleBlur("rating")}
            value={values.rating}
            style={styles.input}
            keyboardType="numeric"
            error={touched.rating && errors.rating}
          />
          {touched.rating && errors.rating && (
            <CustomText style={styles.errorText}>{errors.rating}</CustomText>
          )}
          <TextInput
            placeholder="Review"
            onChangeText={handleChange("text")}
            onBlur={handleBlur("text")}
            value={values.text}
            style={styles.input}
            multiline
            error={touched.text && errors.text}
          />
          <Pressable onPress={handleSubmit} style={styles.submitButton}>
            <CustomText style={styles.submitButtonText}>
              Create a review
            </CustomText>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.padding.medium,
    backgroundColor: theme.colors.white,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: 5,
    padding: theme.padding.small,
    marginBottom: theme.padding.small,
  },
  errorText: {
    color: theme.colors.error,
    marginBottom: theme.padding.small,
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.padding.medium,
    borderRadius: 5,
    alignItems: "center",
    marginTop: theme.padding.medium,
  },
  submitButtonText: {
    color: theme.colors.white,
    fontWeight: "bold",
  },
});

export default ReviewForm;
