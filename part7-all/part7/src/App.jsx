import { useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AnecdoteList from "./components/AnecdoteList";
import Anecdote from "./components/Anecdote";
import AddAnecdote from "./components/AddAnecdote";
import About from "./components/About";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Notification from "./components/Notification";
import "./styles.css";

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  const [notification, setNotification] = useState({ message: "", type: "" });
  const timeoutRef = useRef(null);

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
    setNotification({
      message: `Anecdote '${anecdote.content}' created!`,
      type: "success",
    });

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 5000);
  };

  return (
    <Router>
      <div>
        <Header />
        <Notification message={notification.message} type={notification.type} />
        <Routes>
          <Route
            path="/anecdotes/:id"
            element={<Anecdote anecdotes={anecdotes} />}
          />
          <Route path="/create" element={<AddAnecdote addNew={addNew} />} />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
