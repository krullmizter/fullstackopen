import express from "express";
import cors from "cors";
import diagnoses from "./data/diagnoses";
import patients from "./data/patients";
import { Diagnosis, PublicPatient } from "./types";

const app = express();
const PORT = 3001;

app.use(cors());

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
      gender,
      occupation,
    })
  );

  res.json(publicPatients);
});

app.listen(PORT, () => {
  console.log(`\nBackend server running on port ${PORT}`);
});
