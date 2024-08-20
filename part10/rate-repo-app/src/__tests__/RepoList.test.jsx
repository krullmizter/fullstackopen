import React from "react";
import { render, screen, within } from "@testing-library/react-native";
import RepoList from "../components/RepoList";

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      render(<RepoList />);

      const repositoryItems = screen.getAllByTestId("repositoryItem");
      expect(repositoryItems).toHaveLength(4);

      const firstRepository = repositoryItems[0];
      expect(within(firstRepository).getByTestId("fullName")).toHaveTextContent(
        "jaredpalmer/formik"
      );
      expect(
        within(firstRepository).getByTestId("description")
      ).toHaveTextContent("Build forms in React, without the tears");
      expect(within(firstRepository).getByTestId("language")).toHaveTextContent(
        "TypeScript"
      );
      expect(
        within(firstRepository).getByTestId("stargazersCount")
      ).toHaveTextContent("21.6k");
      expect(
        within(firstRepository).getByTestId("forksCount")
      ).toHaveTextContent("1.6k");
      expect(
        within(firstRepository).getByTestId("reviewCount")
      ).toHaveTextContent("4");
      expect(
        within(firstRepository).getByTestId("ratingAverage")
      ).toHaveTextContent("88");
    });
  });
});
