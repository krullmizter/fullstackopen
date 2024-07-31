import sanitizeHtml from 'sanitize-html';

//const baseUrl = "https://fullstackopen-2agf.onrender.com/api/persons";
const baseUrl = "http://localhost:3001/api/persons";

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

const fetchOptions = (method, body) => ({
  method,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

const validatePerson = (person) => {
  if (!person.name || typeof person.name !== 'string') {
    throw new Error("Invalid name");
  }
  if (!person.number || typeof person.number !== 'string') {
    throw new Error("Invalid number");
  }
};

const sanitizePerson = (person) => ({
  name: sanitizeHtml(person.name),
  number: sanitizeHtml(person.number),
});

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
    validatePerson(newPerson);
    const sanitizedPerson = sanitizePerson(newPerson);
    const response = await fetch(baseUrl, fetchOptions("POST", sanitizedPerson));
    return await checkResponse(response);
  } catch (error) {
    console.error("Error creating person:", error);
    throw error;
  }
};

const update = async (id, updatedPerson) => {
  try {
    validatePerson(updatedPerson);
    const sanitizedPerson = sanitizePerson(updatedPerson);
    const response = await fetch(
      `${baseUrl}/${id}`,
      fetchOptions("PUT", sanitizedPerson)
    );
    return await checkResponse(response);
  } catch (error) {
    console.error(`Error updating person with id ${id}:`, error);
    throw error;
  }
};

const remove = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/${id}`, fetchOptions("DELETE"));
    return response.status === 204 ? null : await checkResponse(response);
  } catch (error) {
    console.error(`Error deleting person with id ${id}:`, error);
    throw error;
  }
};

export default {
  getAll,
  create,
  update,
  remove,
};
