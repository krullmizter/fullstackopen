import { Gender, Patient } from "./types";

const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const createStringParser =
  (field: string) =>
  (input: any): string => {
    if (!input || !isString(input)) {
      throw new Error(`Malformed or missing: ${field}`);
    }
    return input;
  };

const parseName = createStringParser("name");
const parseSsn = createStringParser("SSN");
const parseOccupation = createStringParser("occupation");

const parseDateOfBirth = (dateOfBirth: any): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error("Malformed or missing date of birth");
  }
  return dateOfBirth;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Malformed or missing gender type");
  }
  return gender;
};

export const toNewPatient = (object: any): Omit<Patient, "id"> => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
  };
};
