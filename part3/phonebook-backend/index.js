const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const Person = require("./models/person");
const { errorHandler, commonMiddleware, logger } = require("./middleware");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
commonMiddleware(app);
logger(app);

// MongoDB connection setup
const mongoUrl = process.env.MONGODB_URL;

mongoose
  .set("strictQuery", false)
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

// Routes
app.get("/api/persons", async (req, res, next) => {
  try {
    const persons = await Person.find({});
    res.json(persons);
  } catch (error) {
    next(error);
  }
});

app.get("/info", async (req, res, next) => {
  try {
    const persons = await Person.find({});
    res.send(
      `<p>Phonebook has info for ${
        persons.length
      } people</p><p>${new Date()}</p>`
    );
  } catch (error) {
    next(error);
  }
});

app.get("/api/persons/:id", async (req, res, next) => {
  try {
    const person = await Person.findById(req.params.id);
    if (person) {
      res.json(person);
    } else {
      res.status(404).json({ error: "Person not found" });
    }
  } catch (error) {
    next(error);
  }
});

app.post("/api/persons", async (req, res, next) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: "Name or number is missing!" });
  } else if (name.length < 3) {
    return res
      .status(400)
      .json({ error: "Name must be at least 3 characters long" });
  }

  const validateNumber = /^\d{2,3}-\d+$/;
  if (!validateNumber.test(number) || number.length < 8) {
    return res.status(400).json({
      error:
        "Phone number must be in the format XX-XXXXXXX or XXX-XXXXXXX and at least 8 characters long",
    });
  }

  try {
    const newPerson = new Person({ name, number });
    const savedPerson = await newPerson.save();
    res.status(201).json(savedPerson);
  } catch (error) {
    next(error);
  }
});

app.put("/api/persons/:id", async (req, res, next) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: "Name or number is missing!" });
  } else if (name.length < 3) {
    return res
      .status(400)
      .json({ error: "Name must be at least 3 characters long" });
  }

  const validateNumber = /^\d{2,3}-\d+$/;
  if (!validateNumber.test(number) || number.length < 8) {
    return res.status(400).json({
      error:
        "Phone number must be in the format XX-XXXXXXX or XXX-XXXXXXX and at least 8 characters long",
    });
  }

  try {
    const updatedPerson = await Person.findByIdAndUpdate(
      req.params.id,
      { name, number },
      { new: true, runValidators: true, context: "query" }
    );
    if (updatedPerson) {
      res.json(updatedPerson);
    } else {
      res.status(404).json({ error: "Person not found" });
    }
  } catch (error) {
    next(error);
  }
});

app.delete("/api/persons/:id", async (req, res, next) => {
  const personId = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(personId)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const result = await Person.findByIdAndDelete(personId);

    if (!result) {
      return res.status(404).json({ error: "Person not found" });
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

app.use(errorHandler);
