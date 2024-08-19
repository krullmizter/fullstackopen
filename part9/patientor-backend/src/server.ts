import express from "express";
import cors from "cors";
import { v4 as uuid } from "uuid";
import diagnoses from "./data/diagnoses";
import patients from "./data/patients";
import { Diagnosis, Patient, PublicPatient, Gender, Entry } from "./types";
import { toNewPatient } from "./utils";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use(
  (
    error: unknown,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred." });
    }
  }
);

app.get("/api/ping", (_req, res) => {
  res.send("pong...");
});

app.get("/api/diagnoses", (_req, res) => {
  res.json(diagnoses as Diagnosis[]);
});

app.get("/api/patients", (_req, res) => {
  const publicPatients: PublicPatient[] = patients.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender: gender as Gender,
      occupation,
    })
  );

  res.json(publicPatients);
});

app.post("/api/patients", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient: Patient = {
      id: uuid(),
      ...newPatient,
      entries: [],
    };
    patients.push(addedPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error(errorMessage);
    res.status(400).send(`Error when adding new patient: ${errorMessage}`);
  }
});

app.get("/api/patients/:id", (req, res) => {
  const patient = patients.find((p) => p.id === req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).send({ error: "Patient not found" });
  }
});

app.post("/api/patients/:id/entries", (req, res) => {
  const { id } = req.params;
  const patient = patients.find((p) => p.id === id);

  if (!patient) {
    return res.status(404).send({ error: "Patient not found" });
  }

  const newEntry: Entry = {
    ...req.body,
    id: uuid(),
  };

  patient.entries.push(newEntry);
  return res.json(newEntry);
});

app.listen(PORT, () => {
  console.log(`\nBackend server running on port: ${PORT}`);
});
