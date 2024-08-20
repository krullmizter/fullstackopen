import React from "react";
import { View, TextInput, Pressable, ActivityIndicator } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-native";
import { showMessage } from "react-native-flash-message";
import useSignIn from "../hooks/useSignIn";
import CustomText from "./CustomText";
import { formStyles, theme } from "./theme";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const SignInForm = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });

      console.log(data);

      if (data && data.authenticate) {
        console.log("Sign-in successful:", data);
        showMessage({
          message: "Login Successful!",
          type: "success",
        });
        navigate("/");

        setSubmitting(false);
      } else {
        console.log("No authenticate data returned after sign-in.");
        showMessage({
          message: "Sign-in failed. Please check your credentials.",
          type: "danger",
        });
        setSubmitting(false);
      }
    } catch (e) {
      console.error("Login error:", e);
      showMessage({
        message: "An error occurred during sign-in.",
        type: "danger",
      });
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={handleSubmit}
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
        <View style={formStyles.container}>
          <TextInput
            placeholder="Username"
            style={[
              formStyles.input,
              touched.username && errors.username
                ? formStyles.inputError
                : null,
            ]}
            onChangeText={handleChange("username")}
            onBlur={() => setFieldTouched("username")}
            value={values.username}
            editable={!isSubmitting}
            testID="usernameField"
          />
          {touched.username && errors.username && (
            <CustomText style={formStyles.errorText}>
              {errors.username}
            </CustomText>
          )}

          <TextInput
            placeholder="Password"
            style={[
              formStyles.input,
              touched.password && errors.password
                ? formStyles.inputError
                : null,
            ]}
            secureTextEntry
            onChangeText={handleChange("password")}
            onBlur={() => setFieldTouched("password")}
            value={values.password}
            editable={!isSubmitting}
            testID="passwordField"
          />
          {touched.password && errors.password && (
            <CustomText style={formStyles.errorText}>
              {errors.password}
            </CustomText>
          )}

          <Pressable
            onPress={handleSubmit}
            disabled={isSubmitting}
            style={({ pressed }) => [
              formStyles.button,
              pressed ? formStyles.buttonPressed : null,
              isSubmitting ? formStyles.buttonDisabled : null,
            ]}
            testID="submitButton"
          >
            {isSubmitting ? (
              <ActivityIndicator color={theme.colors.textLight} />
            ) : (
              <CustomText style={formStyles.buttonText}>Sign In</CustomText>
            )}
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default SignInForm;
