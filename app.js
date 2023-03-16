const express = require('express');
require('dotenv').config()
const connectDB = require('./db/connect');
const errorHandlerMiddleware = require('./middleware/error-handler');
const notFoundHandlerMiddleware = require('./middleware/not-found');
const app = express();
const tasks = require('./routes/tasks')

// express middlewares
app.use(express.static('./public'))
app.use(express.json())

//routes
app.use('/api/v1/tasks', tasks)

// custom middlewares
app.use(notFoundHandlerMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    console.log("Connected to the DB")
    app.listen(port, () => {
      console.log(`Listening on port ${port}`)
    })
  } catch (e) {
    console.error(e)
  }
}

start();
