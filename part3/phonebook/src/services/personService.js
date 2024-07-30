const baseUrl = "http://localhost:3001/api/persons";

const getAll = async () => {
  try {
    const response = await fetch(baseUrl);

    const contentType = response.headers.get("Content-Type");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      throw new Error("Received non-JSON response");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const create = async (newPerson) => {
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPerson),
    });

    const contentType = response.headers.get("Content-Type");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      throw new Error("Received non-JSON response");
    }
  } catch (error) {
    console.error("Error creating person:", error);
    throw error;
  }
};

const update = async (id, updatedPerson) => {
  try {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPerson),
    });

    const contentType = response.headers.get("Content-Type");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      throw new Error("Received non-JSON response");
    }
  } catch (error) {
    console.error("Error updating person:", error);
    throw error;
  }
};

const remove = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.status === 204 ? null : await response.json();
  } catch (error) {
    console.error("Error deleting person:", error);
    throw error;
  }
};

export default {
  getAll,
  create,
  update,
  remove,
};
