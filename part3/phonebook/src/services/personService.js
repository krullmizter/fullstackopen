const baseUrl = "https://fullstackopen-2agf.onrender.com/api/persons";

const checkResponse = async (response) => {
  const contentType = response.headers.get("Content-Type");
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `HTTP error! Status: ${response.status}, Message: ${errorText}`
    );
  }
  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  } else {
    throw new Error("Received non-JSON response");
  }
};

const getAll = async () => {
  try {
    const response = await fetch(baseUrl);
    return await checkResponse(response);
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
    return await checkResponse(response);
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
    return await checkResponse(response);
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
    return response.status === 204 ? null : await checkResponse(response);
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
