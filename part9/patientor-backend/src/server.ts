import express from "express";
import cors from "cors";
import { v1 as uuid } from "uuid";
import diagnoses from "./data/diagnoses";
import patients from "./data/patients";
import { Diagnosis, Patient, PublicPatient, Gender } from "./types";
import { toNewPatient } from "./utils";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

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
    const addedPatient: Patient = { id: uuid(), ...newPatient };
    patients.push(addedPatient);
    res.json(addedPatient);
  } catch (error) {
    console.error(error);
    res.status(400).send(`Error when adding new patient: ${error.message}`);
  }
});

app.listen(PORT, () => {
  console.log(`\nBackend server running on port: ${PORT}`);
});
