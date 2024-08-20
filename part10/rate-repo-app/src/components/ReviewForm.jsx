import React from "react";
import { View, TextInput, Pressable } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";
import CustomText from "./CustomText";
import { formStyles } from "./theme";
import { useNavigate } from "react-router-native";
import { showMessage } from "react-native-flash-message";

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
        showMessage({
          message: "Review Submitted Successfully!",
          type: "success",
        });
        navigate(`/repository/${data.createReview.repositoryId}`);
        resetForm();
      }
    } catch (error) {
      console.error("Error creating review:", error);
      showMessage({
        message: "Failed to submit the review. Please try again.",
        type: "danger",
      });
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
        <View style={formStyles.container}>
          <TextInput
            placeholder="Repository owner name"
            onChangeText={handleChange("ownerName")}
            onBlur={handleBlur("ownerName")}
            value={values.ownerName}
            style={[
              formStyles.input,
              touched.ownerName && errors.ownerName
                ? formStyles.inputError
                : null,
            ]}
          />
          {touched.ownerName && errors.ownerName && (
            <CustomText style={formStyles.errorText}>
              {errors.ownerName}
            </CustomText>
          )}

          <TextInput
            placeholder="Repository name"
            onChangeText={handleChange("repositoryName")}
            onBlur={handleBlur("repositoryName")}
            value={values.repositoryName}
            style={[
              formStyles.input,
              touched.repositoryName && errors.repositoryName
                ? formStyles.inputError
                : null,
            ]}
          />
          {touched.repositoryName && errors.repositoryName && (
            <CustomText style={formStyles.errorText}>
              {errors.repositoryName}
            </CustomText>
          )}

          <TextInput
            placeholder="Rating between 0 and 100"
            onChangeText={handleChange("rating")}
            onBlur={handleBlur("rating")}
            value={values.rating}
            style={[
              formStyles.input,
              touched.rating && errors.rating ? formStyles.inputError : null,
            ]}
            keyboardType="numeric"
          />
          {touched.rating && errors.rating && (
            <CustomText style={formStyles.errorText}>
              {errors.rating}
            </CustomText>
          )}

          <TextInput
            placeholder="Review"
            onChangeText={handleChange("text")}
            onBlur={handleBlur("text")}
            value={values.text}
            style={[
              formStyles.input,
              touched.text && errors.text ? formStyles.inputError : null,
            ]}
            multiline
          />

          <Pressable onPress={handleSubmit} style={formStyles.button}>
            <CustomText style={formStyles.buttonText}>
              Create a review
            </CustomText>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default ReviewForm;
