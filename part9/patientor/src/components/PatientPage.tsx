import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  List,
  ListItem,
} from "@mui/material";
import { apiBaseUrl } from "../constants";
import { Patient, Entry, Diagnosis } from "../types";
import { Male, Female, Transgender } from "@mui/icons-material";
import EntryDetails from "./EntryDetails";
import AddEntryForm from "./AddEntryForm";

interface PatientPageProps {
  diagnoses: Diagnosis[];
}

const PatientPage: React.FC<PatientPageProps> = ({ diagnoses }) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientData } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        setPatient(patientData);
      } catch (error) {
        console.error("Failed to fetch patient data", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchPatient();
  }, [id]);

  const handleEntryAdded = (newEntry: Entry) => {
    if (patient) {
      setPatient({
        ...patient,
        entries: [...patient.entries, newEntry],
      });
    }
  };

  if (loading) {
    return (
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!patient) {
    return <Typography variant="h6">Patient not found</Typography>;
  }

  const genderIcon = () => {
    switch (patient.gender) {
      case "male":
        return <Male />;
      case "female":
        return <Female />;
      case "other":
        return <Transgender />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <Typography variant="h4">
        {patient.name} {genderIcon()}
      </Typography>
      <Typography variant="body1">SSN: {patient.ssn}</Typography>
      <Typography variant="body1">Occupation: {patient.occupation}</Typography>
      <Typography variant="body1">
        Date of Birth: {patient.dateOfBirth}
      </Typography>
      <Typography variant="h6" style={{ marginTop: "1em" }}>
        Entries
      </Typography>
      <List>
        {patient.entries.map((entry: Entry) => (
          <ListItem key={entry.id}>
            <EntryDetails entry={entry} diagnoses={diagnoses} />
          </ListItem>
        ))}
      </List>
      <AddEntryForm patientId={patient.id} onEntryAdded={handleEntryAdded} />
    </Container>
  );
};

export default PatientPage;
