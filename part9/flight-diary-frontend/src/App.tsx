import { useEffect, useState } from "react";
import axios from "axios";
import { DiaryEntry } from "./types";
import NewDiaryForm from "./NewDiaryForm";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const response = await axios.get<DiaryEntry[]>(
          "http://localhost:3000/api/diaries"
        );
        setDiaries(response.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setErrorMessage(
            error.response.data.error ||
              "An error occurred while fetching diaries"
          );
        } else {
          setErrorMessage("Network error. Please try again later.");
        }
      }
    };
    fetchDiaries();
  }, []);

  return (
    <div className="app-container">
      <h1>Flight Diaries</h1>
      {errorMessage && <p className="notification error">{errorMessage}</p>}
      {successMessage && (
        <p className="notification success">{successMessage}</p>
      )}
      <NewDiaryForm
        setDiaries={setDiaries}
        setErrorMessage={setErrorMessage}
        setSuccessMessage={setSuccessMessage}
      />
      <div className="diary-grid">
        {diaries.slice().map((diary) => (
          <div key={diary.id} className="diary-card">
            <h3>{diary.date}</h3>
            <p>Weather: {diary.weather}</p>
            <p>Visibility: {diary.visibility}</p>
            {diary.comment && <p>Comment: {diary.comment}</p>}{" "}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
