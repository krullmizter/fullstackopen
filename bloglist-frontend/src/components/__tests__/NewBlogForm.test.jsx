import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import NewBlogForm from "../NewBlogForm";

describe("NewBlogForm Component", () => {
  // 5.16
  it("new blog form calls event handler, and gets props with correct details are submitted", () => {
    const mockCreateBlog = vi.fn();
    const mockSetNotification = vi.fn();
    const mockOnBlogCreated = vi.fn();

    render(
      <NewBlogForm
        createBlog={mockCreateBlog}
        setNotification={mockSetNotification}
        onBlogCreated={mockOnBlogCreated}
      />
    );

    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "Test Title" },
    });
    fireEvent.change(screen.getByLabelText("Author"), {
      target: { value: "Spiderman" },
    });
    fireEvent.change(screen.getByLabelText("URL"), {
      target: { value: "https://google.com" },
    });

    fireEvent.submit(screen.getByText("Create Blog"));

    expect(mockCreateBlog).toHaveBeenCalled();
    expect(mockCreateBlog.mock.calls[0][0]).toMatchObject({
      title: "Test Title",
      author: "Spiderman",
      url: "https://google.com",
    });
  });
});
