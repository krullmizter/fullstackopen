import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import Blog from "../Blog";

const mockGetToken = vi.fn();
const mockGetUser = vi.fn();
vi.mock("../utils/localStorage", () => ({
  getToken: mockGetToken,
  getUser: mockGetUser,
}));

const mockUpdateBlog = vi.fn();
vi.mock("../services/blogService", () => ({
  updateBlog: mockUpdateBlog,
}));

afterEach(() => {
  vi.clearAllMocks();
});

describe("Blog Component", () => {
  // 5.13
  it("renders blog title and author but not by default the URL or likes", () => {
    const blog = {
      id: "66b93a30c857b58c5b6a9704",
      title: "Test Blog",
      author: "Spiderman",
      url: "https://google.com",
      likes: 2,
      user: {
        id: "66b8fe29a360e9f8b6d32ac4",
        name: "Spiderman",
      },
    };

    const mockOnBlogUpdated = vi.fn();

    render(<Blog blog={blog} onBlogUpdated={mockOnBlogUpdated} />);

    expect(screen.getByText("Test Blog")).toBeInTheDocument();
    expect(screen.getByText("Spiderman")).toBeInTheDocument();
    expect(screen.queryByText("https://google.com")).toBeNull();
    expect(screen.queryByText("Likes: 2")).toBeNull();
  });

  // 5.14
  it("blog URL and number of likes shown when detail toggler is being clicked", async () => {
    const blog = {
      id: "66b93a30c857b58c5b6a9704",
      title: "Test Blog",
      author: "Spiderman",
      url: "https://google.com",
      likes: 2,
      user: {
        id: "66b8fe29a360e9f8b6d32ac4",
        name: "Spiderman",
      },
    };

    const mockOnBlogUpdated = vi.fn();

    render(<Blog blog={blog} onBlogUpdated={mockOnBlogUpdated} />);

    fireEvent.click(screen.getByText("View"));

    await waitFor(() => {
      expect(screen.getByText("https://google.com")).toBeInTheDocument();
      expect(screen.getByText("Likes: 2")).toBeInTheDocument();
    });
  });

  // 5.15
  it("clicking likes button twice", async () => {
    mockGetToken.mockReturnValue("fake-token");
    mockGetUser.mockReturnValue({ id: "user-id" });
    mockUpdateBlog.mockResolvedValueOnce({ likes: 1 });
    mockUpdateBlog.mockResolvedValueOnce({ likes: 2 });

    const onBlogUpdated = vi.fn();

    const blog = {
      id: "66b93a30c857b58c5b6a9704",
      title: "Test Blog",
      author: "Spiderman",
      url: "https://google.com",
      likes: 2,
      user: {
        id: "66b8fe29a360e9f8b6d32ac4",
        name: "Spiderman",
      },
    };

    render(<Blog blog={blog} onBlogUpdated={onBlogUpdated} />);

    const likeButton = screen.getByText("Like");

    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    await waitFor(() => {
      expect(onBlogUpdated).toHaveBeenCalledTimes(2);
    });
  });
});
