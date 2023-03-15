const Task = require("../models/Task")

const getAllTasks = async (req, res) => {
  const tasks = await Task.find({})
  res.status(200).json({tasks})
}

const createTask = async (req, res) => {
  const task = await Task.create(req.body)
  res.status(201).json({task})
}

const getTask = async (req, res) => {
  const {id} = req.params
  const task = await Task.findOne({_id: id})
  if (!task) {
    return res.status(404).send('Task not found')
  }
  res.status(200).json({task})
}

const updateTask = async (req, res) => {
  const {id} = req.params
  const task = await Task.findOneAndUpdate({_id: id}, req.body, {
    new: true,
    runValidators: true
  })
  if (!task) {
    return res.status(404).send('Task not found')
  }
  res.status(200).json({task})
}

const deleteTask = async (req, res) => {
  const {id} = req.params
  const task = await Task.findOneAndDelete({_id: id})
  if (!task) {
    return res.status(404).send('Task not found')
  }
  res.status(200).json({task})
}

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask
}
