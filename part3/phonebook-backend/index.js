const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Morgan setup
morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

// MongoDB connection
const name = process.argv[2];
const number = process.argv[3];
const mongoUrl = process.env.MONGODB_URL;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = mongoose.model("Person", personSchema);

mongoose
  .set("strictQuery", false)
  .connect(mongoUrl, {})
  .then(() => {
    console.log(`Connected to MongoDB database: ${mongoUrl}`);

    if (name && number) {
      const person = new Person({ name, number });
      return person.save().then(() => {
        console.log(
          `Added: ${name} with number: ${number} to the database: ${mongoUrl}`
        );
        mongoose.connection.close();
      });
    } else {
      return Person.find({}).then((persons) => {
        persons.forEach((person) => {
          console.log(`${person.name} ${person.number}`);
        });
        mongoose.connection.close();
      });
    }
  })
  .catch((err) => {
    console.error(err);
    mongoose.connection.close();
  });

// Routes
app.get("/api/persons", (req, res) => {
  Person.find({})
    .then((persons) => res.json(persons))
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch persons" });
    });
});

app.get("/info", (req, res) => {
  Person.find({})
    .then((persons) => {
      res.send(
        `<p>Phonebook has info for ${
          persons.length
        } people</p><p>${new Date()}</p>`
      );
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch info" });
    });
});

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).json({ error: "Person not found" });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch person" });
    });
});

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: "Name or number is missing!" });
  }

  const newPerson = new Person({ name, number });

  newPerson
    .save()
    .then((savedPerson) => res.json(savedPerson))
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Failed to add person" });
    });
});

app.delete("/api/persons/:id", (req, res) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Failed to delete person" });
    });
});

app.put("/api/persons/:id", (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: "Name or number is missing!" });
  }

  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedPerson) => res.json(updatedPerson))
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Failed to update person" });
    });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
