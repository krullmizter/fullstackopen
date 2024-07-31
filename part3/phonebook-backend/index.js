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

// MongoDB connection setup
const mongoUrl = process.env.MONGODB_URL;

mongoose
  .connect(mongoUrl, {})
  .then(() => {
    console.log(`Connected to MongoDB database: ${mongoUrl}`);

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Schema and Model setup
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

// Routes
app.get("/api/persons", async (req, res) => {
  try {
    const persons = await Person.find({});
    res.json(persons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch persons" });
  }
});

app.get("/info", async (req, res) => {
  try {
    const persons = await Person.find({});
    res.send(
      `<p>Phonebook has info for ${
        persons.length
      } people</p><p>${new Date()}</p>`
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch info" });
  }
});

app.get("/api/persons/:id", async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (person) {
      res.json(person);
    } else {
      res.status(404).json({ error: "Person not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch person" });
  }
});

app.post("/api/persons", async (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: "Name or number is missing!" });
  }

  try {
    const newPerson = new Person({ name, number });
    const savedPerson = await newPerson.save();
    res.json(savedPerson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add person" });
  }
});

app.delete("/api/persons/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const result = await Person.findByIdAndRemove(req.params.id);

    if (!result) {
      return res.status(404).json({ error: "Person not found" });
    }

    res.status(204).end();
  } catch (error) {
    console.error("Failed to delete person:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/api/persons/:id", async (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: "Name or number is missing!" });
  }

  try {
    const updatedPerson = await Person.findByIdAndUpdate(
      req.params.id,
      { name, number },
      { new: true, runValidators: true, context: "query" }
    );
    res.json(updatedPerson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update person" });
  }
});
