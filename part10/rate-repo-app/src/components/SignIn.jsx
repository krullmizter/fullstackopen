import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-native";
import useSignIn from "../hooks/useSignIn";
import CustomText from "./CustomText";
import theme from "./theme";
import { showMessage } from "react-native-flash-message";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });

      if (data) {
        await showMessage({
          message: "Login Successful!",
          type: "success",
        });
        resetForm();
        navigate("/");
      }
    } catch (e) {
      console.error("Login error:", e);
      showMessage({
        message: "Login Failed. Please check your credentials.",
        type: "danger",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldTouched,
        isSubmitting,
      }) => (
        <View style={styles.container}>
          <TextInput
            placeholder="Username"
            style={[
              styles.input,
              touched.username && errors.username ? styles.inputError : null,
            ]}
            onChangeText={handleChange("username")}
            onBlur={() => setFieldTouched("username")}
            value={values.username}
            readOnly={isSubmitting}
          />
          {touched.username && errors.username && (
            <CustomText style={styles.errorText}>{errors.username}</CustomText>
          )}

          <TextInput
            placeholder="Password"
            style={[
              styles.input,
              touched.password && errors.password ? styles.inputError : null,
            ]}
            secureTextEntry
            onChangeText={handleChange("password")}
            onBlur={() => setFieldTouched("password")}
            value={values.password}
            readOnly={isSubmitting}
          />
          {touched.password && errors.password && (
            <CustomText style={styles.errorText}>{errors.password}</CustomText>
          )}

          <Pressable
            onPress={handleSubmit}
            disabled={isSubmitting}
            style={({ pressed }) => [
              styles.button,
              pressed ? styles.buttonPressed : null,
              isSubmitting ? styles.buttonDisabled : null,
            ]}
          >
            {isSubmitting ? (
              <ActivityIndicator color={theme.colors.textLight} />
            ) : (
              <CustomText style={styles.buttonText}>Sign In</CustomText>
            )}
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
    height: 40,
    borderColor: theme.colors.textSecondary,
    borderWidth: 1,
    marginBottom: theme.padding.small,
    paddingHorizontal: theme.padding.small,
    borderRadius: 5,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  errorText: {
    color: theme.colors.error,
    marginBottom: theme.padding.small,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.padding.medium,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonPressed: {
    backgroundColor: theme.colors.primaryDark,
  },
  buttonDisabled: {
    backgroundColor: theme.colors.primaryLight,
  },
  buttonText: {
    color: theme.colors.textLight,
    fontWeight: "bold",
  },
});

export default SignIn;
