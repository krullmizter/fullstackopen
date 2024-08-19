import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Entry } from "../types";

interface Props {
  patientId: string;
  onEntryAdded: (newEntry: Entry) => void;
}

const AddEntryForm: React.FC<Props> = ({ patientId, onEntryAdded }) => {
  const [entryType, setEntryType] = useState("Hospital");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    let newEntry: object = {
      date,
      description,
      specialist,
      diagnosisCodes: diagnosisCodes.split(",").map((code) => code.trim()),
    };

    if (entryType === "Hospital") {
      newEntry = {
        ...newEntry,
        type: "Hospital",
        discharge: {
          date: dischargeDate,
          criteria: dischargeCriteria,
        },
      };
    } else if (entryType === "OccupationalHealthcare") {
      newEntry = {
        ...newEntry,
        type: "OccupationalHealthcare",
        employerName,
        sickLeave:
          sickLeaveStartDate && sickLeaveEndDate
            ? {
                startDate: sickLeaveStartDate,
                endDate: sickLeaveEndDate,
              }
            : undefined,
      };
    }

    try {
      const { data: addedEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patientId}/entries`,
        newEntry
      );
      onEntryAdded(addedEntry);
      setDescription("");
      setDate("");
      setSpecialist("");
      setDiagnosisCodes("");
      setDischargeDate("");
      setDischargeCriteria("");
      setEmployerName("");
      setSickLeaveStartDate("");
      setSickLeaveEndDate("");
      setError(null);
    } catch (e) {
      console.error(e);
      setError("Failed to add entry. Please check the input data.");
    }
  };

  return (
    <Box mt={4}>
      <Typography variant="h6">Add New Entry</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Entry Type</InputLabel>
          <Select
            value={entryType}
            onChange={(e) => setEntryType(e.target.value)}
          >
            <MenuItem value="Hospital">Hospital</MenuItem>
            <MenuItem value="OccupationalHealthcare">
              Occupational Healthcare
            </MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Date"
          type="date"
          fullWidth
          value={date}
          onChange={(e) => setDate(e.target.value)}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={(e) => setSpecialist(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Diagnosis Codes (comma separated)"
          fullWidth
          value={diagnosisCodes}
          onChange={(e) => setDiagnosisCodes(e.target.value)}
          margin="normal"
        />
        {entryType === "Hospital" && (
          <>
            <TextField
              label="Discharge Date"
              type="date"
              fullWidth
              value={dischargeDate}
              onChange={(e) => setDischargeDate(e.target.value)}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Discharge Criteria"
              fullWidth
              value={dischargeCriteria}
              onChange={(e) => setDischargeCriteria(e.target.value)}
              margin="normal"
            />
          </>
        )}
        {entryType === "OccupationalHealthcare" && (
          <>
            <TextField
              label="Employer Name"
              fullWidth
              value={employerName}
              onChange={(e) => setEmployerName(e.target.value)}
              margin="normal"
            />
            <TextField
              label="Sick Leave Start Date"
              type="date"
              fullWidth
              value={sickLeaveStartDate}
              onChange={(e) => setSickLeaveStartDate(e.target.value)}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Sick Leave End Date"
              type="date"
              fullWidth
              value={sickLeaveEndDate}
              onChange={(e) => setSickLeaveEndDate(e.target.value)}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </>
        )}
        <Button type="submit" variant="contained" color="primary">
          Add Entry
        </Button>
      </form>
    </Box>
  );
};

export default AddEntryForm;
