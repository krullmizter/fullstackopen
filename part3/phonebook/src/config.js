// TODO config, ES
const env = "development";

const config = {
  baseUrl:
    env === "production"
      ? "https://fullstackopen-2agf.onrender.com/api/persons"
      : "http://localhost:3001/api/persons",
  constants: {
    NAME_MIN_LENGTH: 3,
    NUMBER_MIN_LENGTH: 8,
    NUMBER_REGEX: /^\d{2,3}-\d+$/,
    NOTIFICATION_TIMEOUT: 5000,
  },
  errorMessages: {
    invalidName: "Invalid name",
    invalidNumber: "Invalid number",
    nonJsonResponse: "Received non-JSON response",
    invalidPhone:
      "is already added to phonebook, replace the old number with a new one?",
    numberLength: `Phone number must be in the format: XX-XXXXXXX or XXX-XXXXXXX and at least 8 characters long`,
    nameLength: `Name must be at least three characters long`,
    tooManyRequests: "Too many requests, please try again later",
    invalidId: "Invalid ID format",
    personNotFound: "Person not found",
  },
  limit: {
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests, please try again later",
  },
};

export default config;
