const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const Person = require('./models/personModel')
const { errorHandler, commonMiddleware, logger } = require('./middleware')
const cors = require('cors')
const { body, validationResult, param } = require('express-validator')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(helmet())
commonMiddleware(app)
logger(app)

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later'
})

app.use(limiter)

// MongoDB connection setup
const mongoUrl = process.env.MONGODB_URL

mongoose
  .set('strictQuery', false)
  .connect(mongoUrl, {})
  .then(() => {
    console.log(`Connected to MongoDB database: ${mongoUrl}`)

    const PORT = process.env.PORT || 3001
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`)
    })
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err)
    process.exit(1)
  })

// Routes
app.get('/api/persons', async (req, res, next) => {
  try {
    const persons = await Person.find({})
    res.json(persons)
  } catch (error) {
    next(error)
  }
})

app.get('/info', async (req, res, next) => {
  try {
    const persons = await Person.find({})
    res.send(
      `<p>Phonebook has info for ${
        persons.length
      } people</p><p>${new Date()}</p>`
    )
  } catch (error) {
    next(error)
  }
})

app.get('/api/persons/:id', [
  param('id').isMongoId().withMessage('Invalid ID format')
], async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const person = await Person.findById(req.params.id)
    if (person) {
      res.json(person)
    } else {
      res.status(404).json({ error: 'Person not found' })
    }
  } catch (error) {
    next(error)
  }
})

app.post('/api/persons', [
  body('name').isLength({ min: 3 }).trim().escape(),
  body('number').matches(/^\d{2,3}-\d+$/).isLength({ min: 8 }).trim().escape(),
], async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { name, number } = req.body

  try {
    const newPerson = new Person({ name, number })
    const savedPerson = await newPerson.save()
    res.status(201).json(savedPerson)
  } catch (error) {
    next(error)
  }
})

app.put('/api/persons/:id', [
  param('id').isMongoId().withMessage('Invalid ID format'),
  body('name').isLength({ min: 3 }).trim().escape(),
  body('number').matches(/^\d{2,3}-\d+$/).isLength({ min: 8 }).trim().escape(),
], async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { name, number } = req.body

  try {
    const updatedPerson = await Person.findByIdAndUpdate(
      req.params.id,
      { name, number },
      { new: true, runValidators: true, context: 'query' }
    )
    if (updatedPerson) {
      res.json(updatedPerson)
    } else {
      res.status(404).json({ error: 'Person not found' })
    }
  } catch (error) {
    next(error)
  }
})

app.delete('/api/persons/:id', [
  param('id').isMongoId().withMessage('Invalid ID format')
], async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const result = await Person.findByIdAndDelete(req.params.id)
    if (!result) {
      return res.status(404).json({ error: 'Person not found' })
    }
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

app.use(errorHandler)