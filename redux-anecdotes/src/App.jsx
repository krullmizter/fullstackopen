import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import "./styles.css";

const App = () => {
  return (
    <div>
      <Notification />
      <h1>Anecdotes</h1>
      <Filter />
      <AnecdoteList />
      <h2>Add Anecdote</h2>
      <AnecdoteForm />
    </div>
  );
};

export default App;
