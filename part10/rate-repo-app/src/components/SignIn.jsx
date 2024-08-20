import React from "react";
import { useNavigate } from "react-router-native";
import useSignIn from "../hooks/useSignIn";
import { showMessage } from "react-native-flash-message";
import SignInForm from "./SignInForm";

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

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;
