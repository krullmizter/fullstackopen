const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  const amountPeople = persons.length;
  const date = new Date();
  res.send(
    `<p>Phonebook has info for ${amountPeople} people</p><p>${date}</p>`
  );
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).send({ error: "Person not found" });
    console.error(res);
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: "Either name or number is missing!" });
  }

  if (persons.some((person) => person.name === name)) {
    return res.status(400).json({ error: "The name must be unique!" });
  }

  const newPerson = {
    id: (Math.random() * 100000).toFixed(0),
    name,
    number,
  };

  persons = persons.concat(newPerson);
  res.json(newPerson);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});
