import React from "react";
import {
  Entry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  Diagnosis,
} from "../types";
import { Box, Typography } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

interface EntryDetailsProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const EntryDetails: React.FC<EntryDetailsProps> = ({ entry, diagnoses }) => {
  const getDiagnosisDescription = (code: string): string => {
    const diagnosis = diagnoses.find((d) => d.code === code);
    return diagnosis ? `${code} (${diagnosis.name})` : code;
  };

  switch (entry.type) {
    case "Hospital":
      const hospitalEntry = entry as HospitalEntry;
      return (
        <Box border={1} borderRadius={5} padding={2} marginBottom={2}>
          <Typography variant="h6">
            <LocalHospitalIcon /> Hospital Entry
          </Typography>
          <Typography>{hospitalEntry.description}</Typography>
          <Typography>
            Discharge: {hospitalEntry.discharge.date},{" "}
            {hospitalEntry.discharge.criteria}
          </Typography>
          <Typography>
            Diagnoses:{" "}
            {hospitalEntry.diagnosisCodes
              ?.map((code) => getDiagnosisDescription(code))
              .join(", ")}
          </Typography>
        </Box>
      );
    case "OccupationalHealthcare":
      const occupationalEntry = entry as OccupationalHealthcareEntry;
      return (
        <Box border={1} borderRadius={5} padding={2} marginBottom={2}>
          <Typography variant="h6">
            <WorkIcon /> Occupational Healthcare Entry
          </Typography>
          <Typography>{occupationalEntry.description}</Typography>
          <Typography>Employer: {occupationalEntry.employerName}</Typography>
          {occupationalEntry.sickLeave && (
            <Typography>
              Sick Leave: {occupationalEntry.sickLeave.startDate} -{" "}
              {occupationalEntry.sickLeave.endDate}
            </Typography>
          )}
          <Typography>
            Diagnoses:{" "}
            {occupationalEntry.diagnosisCodes
              ?.map((code) => getDiagnosisDescription(code))
              .join(", ")}
          </Typography>
        </Box>
      );
    default:
      return null;
  }
};

export default EntryDetails;
