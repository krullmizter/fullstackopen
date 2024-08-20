import React from "react";
import { View, StyleSheet, Pressable, TextInput } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";
import CustomText from "./CustomText";
import theme from "./theme";
import { useNavigate } from "react-router-native";
import useSignIn from "../hooks/useSignIn";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(5, "Username must be at least 5 characters")
    .max(30, "Username must be 30 characters or less"),
  password: Yup.string()
    .required("Password is required")
    .min(5, "Password must be at least 5 characters")
    .max(50, "Password must be 50 characters or less"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});

const SignUpForm = () => {
  const [createUser] = useMutation(CREATE_USER);
  const [signIn] = useSignIn(); // <-- Destructure the signIn function from the hook
  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const { data } = await createUser({
        variables: {
          user: {
            username: values.username,
            password: values.password,
          },
        },
      });

      if (data?.createUser) {
        const signInResult = await signIn({
          username: values.username,
          password: values.password,
        });

        if (signInResult) {
          navigate("/");
          resetForm();
        }
      }
    } catch (error) {
      console.error("Error during sign up:", error);
    }
  };

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        passwordConfirm: "",
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
            placeholder="Username"
            onChangeText={handleChange("username")}
            onBlur={handleBlur("username")}
            value={values.username}
            style={styles.input}
            error={touched.username && errors.username}
          />
          {touched.username && errors.username && (
            <CustomText style={styles.errorText}>{errors.username}</CustomText>
          )}
          <TextInput
            placeholder="Password"
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
            secureTextEntry
            style={styles.input}
            error={touched.password && errors.password}
          />
          {touched.password && errors.password && (
            <CustomText style={styles.errorText}>{errors.password}</CustomText>
          )}
          <TextInput
            placeholder="Password confirmation"
            onChangeText={handleChange("passwordConfirm")}
            onBlur={handleBlur("passwordConfirm")}
            value={values.passwordConfirm}
            secureTextEntry
            style={styles.input}
            error={touched.passwordConfirm && errors.passwordConfirm}
          />
          {touched.passwordConfirm && errors.passwordConfirm && (
            <CustomText style={styles.errorText}>
              {errors.passwordConfirm}
            </CustomText>
          )}
          <Pressable onPress={handleSubmit} style={styles.submitButton}>
            <CustomText style={styles.submitButtonText}>Sign up</CustomText>
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

export default SignUpForm;
