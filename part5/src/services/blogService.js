import axios from "axios";

const baseUrl = "/api/blogs";

export const getBlogs = async () => {
  try {
    const response = await axios.get(baseUrl);

    if (response.data.length === 0) {
      return null;
    }

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return [];
    }
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

export const createBlog = async (blog, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.post(baseUrl, blog, config);
    return response.data;
  } catch (error) {
    console.error("Error creating blog:", error);
    throw error;
  }
};

export const updateBlog = async (id, updatedBlog, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, config);
    return response.data;
  } catch (error) {
    console.error("Error updating blog:", error);
    throw error;
  }
};

export const deleteBlog = async (id, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    await axios.delete(`${baseUrl}/${id}`, config);
  } catch (error) {
    console.error("Error deleting blog:", error);
    throw error;
  }
};
