const morgan = require('morgan')

const logger = (app) => {
  morgan.token('body', (req) => JSON.stringify(req.body))
  app.use(
    morgan(
      ':method :url :status :res[content-length] - :response-time ms :body'
    )
  )
}

module.exports = logger
