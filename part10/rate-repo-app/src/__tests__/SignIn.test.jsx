import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import SignInForm from "../components/SignInForm";

describe("SignIn", () => {
  describe("SignInForm", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      const mockOnSubmit = jest.fn();
      render(<SignInForm onSubmit={mockOnSubmit} />);

      fireEvent.changeText(screen.getByTestId("usernameField"), "kalle");
      fireEvent.changeText(screen.getByTestId("passwordField"), "password");
      fireEvent.press(screen.getByTestId("submitButton"));

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
        expect(mockOnSubmit.mock.calls[0][0]).toEqual({
          username: "kalle",
          password: "password",
        });
      });
    });
  });
});
