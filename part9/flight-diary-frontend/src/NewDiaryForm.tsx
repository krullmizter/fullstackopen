import React, { useState } from "react";
import axios from "axios";
import { DiaryEntry } from "./types";

interface NewDiaryFormProps {
  setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
  setSuccessMessage: React.Dispatch<React.SetStateAction<string | null>>;
}

const NewDiaryForm: React.FC<NewDiaryFormProps> = ({
  setDiaries,
  setErrorMessage,
  setSuccessMessage,
}) => {
  const [date, setDate] = useState<string>("");
  const [weather, setWeather] = useState<string>("sunny");
  const [visibility, setVisibility] = useState<string>("great");
  const [comment, setComment] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!date || !weather || !visibility) {
      setErrorMessage("All fields are required.");
      return;
    }

    const newEntry = { date, weather, visibility, comment };

    try {
      const response = await axios.post<DiaryEntry>(
        "http://localhost:3000/api/diaries",
        newEntry
      );
      setDiaries((prevDiaries) => [response.data, ...prevDiaries]);
      setDate("");
      setWeather("sunny");
      setVisibility("great");
      setComment("");
      setSuccessMessage("New diary entry added successfully!");
      setErrorMessage(null);

      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(
          error.response.data.error || "Failed to add diary entry."
        );
      } else {
        setErrorMessage("Network error. Please try again later.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="diary-card diary-form">
      <div className="form-group">
        <label>Date: </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Weather:</label>
        <div className="form-options">
          <label>
            <input
              type="radio"
              value="sunny"
              checked={weather === "sunny"}
              onChange={(e) => setWeather(e.target.value)}
            />
            Sunny
          </label>
          <label>
            <input
              type="radio"
              value="rainy"
              checked={weather === "rainy"}
              onChange={(e) => setWeather(e.target.value)}
            />
            Rainy
          </label>
          <label>
            <input
              type="radio"
              value="cloudy"
              checked={weather === "cloudy"}
              onChange={(e) => setWeather(e.target.value)}
            />
            Cloudy
          </label>
          <label>
            <input
              type="radio"
              value="stormy"
              checked={weather === "stormy"}
              onChange={(e) => setWeather(e.target.value)}
            />
            Stormy
          </label>
        </div>
      </div>
      <div className="form-group">
        <label>Visibility:</label>
        <div className="form-options">
          <label>
            <input
              type="radio"
              value="great"
              checked={visibility === "great"}
              onChange={(e) => setVisibility(e.target.value)}
            />
            Great
          </label>
          <label>
            <input
              type="radio"
              value="good"
              checked={visibility === "good"}
              onChange={(e) => setVisibility(e.target.value)}
            />
            Good
          </label>
          <label>
            <input
              type="radio"
              value="ok"
              checked={visibility === "ok"}
              onChange={(e) => setVisibility(e.target.value)}
            />
            Ok
          </label>
          <label>
            <input
              type="radio"
              value="poor"
              checked={visibility === "poor"}
              onChange={(e) => setVisibility(e.target.value)}
            />
            Poor
          </label>
        </div>
      </div>
      <div className="form-group">
        <label>Comment:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
        />
      </div>
      <button type="submit" className="submit-button">
        Add Entry
      </button>
    </form>
  );
};

export default NewDiaryForm;
