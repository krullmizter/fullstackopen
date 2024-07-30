const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const app = express();

const dbPath = path.join(__dirname, "db.json");

app.use(cors());
app.use(express.json());

morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

const readDb = () => {
  const data = fs.readFileSync(dbPath);
  return JSON.parse(data);
};

const writeDb = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

app.get("/api/persons", (req, res) => {
  const db = readDb();
  res.json(db.persons);
});

app.get("/info", (req, res) => {
  const db = readDb();
  res.send(
    `<p>Phonebook has info for ${
      db.persons.length
    } people</p><p>${new Date()}</p>`
  );
});

app.get("/api/persons/:id", (req, res) => {
  const db = readDb();
  const person = db.persons.find((p) => p.id === req.params.id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).json({ error: "Person not found" });
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const db = readDb();
  const personIndex = db.persons.findIndex((p) => p.id === req.params.id);
  if (personIndex === -1) {
    return res.status(404).json({ error: "Person not found" });
  }

  db.persons.splice(personIndex, 1);
  writeDb(db);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;
  if (!name || !number) {
    return res.status(400).json({ error: "Name or number is missing!" });
  }

  const db = readDb();
  if (db.persons.some((p) => p.name === name)) {
    return res.status(400).json({ error: "Name must be unique!" });
  }

  const newPerson = {
    id: (Math.random() * 100000).toFixed(0),
    name,
    number,
  };
  db.persons.push(newPerson);
  writeDb(db);
  res.json(newPerson);
});

app.put("/api/persons/:id", (req, res) => {
  const { name, number } = req.body;
  if (!name || !number) {
    return res.status(400).json({ error: "Name or number is missing!" });
  }

  const db = readDb();
  const personIndex = db.persons.findIndex((p) => p.id === req.params.id);
  if (personIndex === -1) {
    return res.status(404).json({ error: "Person not found!" });
  }

  db.persons[personIndex] = { ...db.persons[personIndex], name, number };
  writeDb(db);
  res.json(db.persons[personIndex]);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
