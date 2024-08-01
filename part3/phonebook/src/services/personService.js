import sanitizeHtml from "sanitize-html";
import config from "../config";
const { baseUrl, errorMessages } = config;

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
    throw new Error(errorMessages.nonJsonResponse);
  }
};

const fetchOptions = (method, body) => ({
  method,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

const validatePerson = (person) => {
  if (!person.name || typeof person.name !== "string") {
    throw new Error(errorMessages.invalidName);
  }
  if (!person.number || typeof person.number !== "string") {
    throw new Error(errorMessages.invalidNumber);
  }
};

const sanitizePerson = (person) => ({
  name: sanitizeHtml(person.name),
  number: sanitizeHtml(person.number),
});

const getAll = async () => {
  const response = await fetch(baseUrl);
  return await checkResponse(response);
};

const create = async (newPerson) => {
  validatePerson(newPerson);
  const sanitizedPerson = sanitizePerson(newPerson);
  const response = await fetch(baseUrl, fetchOptions("POST", sanitizedPerson));
  return await checkResponse(response);
};

const update = async (id, updatedPerson) => {
  validatePerson(updatedPerson);
  const sanitizedPerson = sanitizePerson(updatedPerson);
  const response = await fetch(
    `${baseUrl}/${id}`,
    fetchOptions("PUT", sanitizedPerson)
  );
  return await checkResponse(response);
};

const remove = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`, fetchOptions("DELETE"));
  return response.status === 204 ? null : await checkResponse(response);
};

export default {
  getAll,
  create,
  update,
  remove,
};
