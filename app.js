const express = require('express');
const connectDB = require('./db/connect');
const app = express();
const tasks = require('./routes/tasks')

const mongoURI= 'mongodb+srv://branimir:<password>@branimircluster.h9htdtx.mongodb.net/TasksDB?retryWrites=true&w=majority'

//middlewares
app.use(express.static('./public'))
app.use(express.json())


app.use('/api/v1/tasks', tasks)

const start = async () => {
  try {
    await connectDB(mongoURI)
    console.log("Connected to the DB")
    app.listen(3000, () => {
      console.log('Listening on port 3000')
    })
  } catch (e) {
    console.error(e)
  }
}

start();
