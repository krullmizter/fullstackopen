export const getToken = () => {
  return localStorage.getItem("token");
};

export const setToken = (token) => {
  try {
    localStorage.setItem("token", token);
  } catch (error) {
    console.error("Failed to set token in localStorage:", error);
  }
};

export const removeToken = () => {
  try {
    localStorage.removeItem("token");
  } catch (error) {
    console.error("Failed to remove token from localStorage:", error);
  }
};

export const getUser = () => {
  try {
    const user = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user);
    }
    return null;
  } catch (error) {
    console.error("Failed to parse user from localStorage:", error);
    return null;
  }
};

export const setUser = (user) => {
  try {
    localStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    console.error("Failed to set user in localStorage:", error);
  }
};

export const removeUser = () => {
  try {
    localStorage.removeItem("user");
  } catch (error) {
    console.error("Failed to remove user from localStorage:", error);
  }
};
