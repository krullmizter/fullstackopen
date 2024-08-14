// reducers/blogReducer.js
const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_BLOGS":
      return action.data;
    case "ADD_BLOG":
      return [...state, action.data];
    case "LIKE_BLOG":
      return state.map((blog) =>
        blog.id === action.data.id ? action.data : blog
      );
    case "REMOVE_BLOG":
      return state.filter((blog) => blog.id !== action.data.id);
    default:
      return state;
  }
};

export const setBlogs = (blogs) => ({
  type: "SET_BLOGS",
  data: blogs,
});

export const addBlog = (blog) => ({
  type: "ADD_BLOG",
  data: blog,
});

export const likeBlog = (blog) => ({
  type: "LIKE_BLOG",
  data: blog,
});

export const removeBlog = (id) => ({
  type: "REMOVE_BLOG",
  data: { id },
});

export default blogReducer;
