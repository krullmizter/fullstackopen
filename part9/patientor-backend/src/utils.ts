import {
  Gender,
  NewPatient,
  Entry,
  Diagnosis,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "./types";
import diagnoses from "./data/diagnoses";

const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isDiagnosisCode = (code: any): code is Diagnosis["code"] => {
  return diagnoses.some((diagnosis) => diagnosis.code === code);
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

const parseDiagnosisCodes = (codes: any): Array<Diagnosis["code"]> => {
  if (!Array.isArray(codes) || !codes.every(isDiagnosisCode)) {
    throw new Error("Malformed or missing diagnosis codes");
  }
  return codes;
};

const parseEntry = (entry: any): Entry => {
  if (!entry || !entry.type || !isString(entry.type)) {
    throw new Error("Malformed or missing entry type");
  }

  const baseEntry = {
    id: createStringParser("id")(entry.id),
    description: createStringParser("description")(entry.description),
    date: parseDateOfBirth(entry.date),
    specialist: createStringParser("specialist")(entry.specialist),
    diagnosisCodes: entry.diagnosisCodes
      ? parseDiagnosisCodes(entry.diagnosisCodes)
      : undefined,
  };

  switch (entry.type) {
    case "Hospital":
      return {
        ...baseEntry,
        type: "Hospital",
        discharge: {
          date: parseDateOfBirth(entry.discharge.date),
          criteria: createStringParser("criteria")(entry.discharge.criteria),
        },
      } as HospitalEntry;

    case "OccupationalHealthcare":
      return {
        ...baseEntry,
        type: "OccupationalHealthcare",
        employerName: createStringParser("employerName")(entry.employerName),
        sickLeave: entry.sickLeave
          ? {
              startDate: parseDateOfBirth(entry.sickLeave.startDate),
              endDate: parseDateOfBirth(entry.sickLeave.endDate),
            }
          : undefined,
      } as OccupationalHealthcareEntry;

    default:
      throw new Error("Unsupported entry type");
  }
};

export const toNewPatient = (object: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
  };

  return newPatient;
};

export const toNewEntry = (object: any): Entry => {
  return parseEntry(object);
};
