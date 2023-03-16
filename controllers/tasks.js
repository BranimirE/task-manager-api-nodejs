const mongoose = require("mongoose")
const { createCustomError } = require("../errors/custom-error")
const Task = require("../models/Task")

const getAllTasks = async (req, res) => {
  const tasks = await Task.find({})
  res.status(200).json({tasks})
}

const createTask = async (req, res) => {
  const task = await Task.create(req.body)
  res.status(201).json({task})
}

const getTask = async (req, res, next) => {
  const {id} = req.params
  // const idObject = new mongoose.Types.ObjectId(id)
  // const task = await Task.findOne({_id: idObject})
  const task = await Task.findOne({_id: id})
  if (!task) {
    return next(createCustomError(`Task with id: ${id} not found`, 404))
  }
  res.status(200).json({task})
}

const updateTask = async (req, res, next) => {
  const {id} = req.params
  const task = await Task.findOneAndUpdate({_id: id}, req.body, {
    new: true,
    runValidators: true
  })
  if (!task) {
    return next(createCustomError(`Task with id: ${id} not found`, 404))
  }
  res.status(200).json({task})
}

const deleteTask = async (req, res, next) => {
  const {id} = req.params
  const task = await Task.findOneAndDelete({_id: id})
  if (!task) {
    return next(createCustomError(`Task with id: ${id} not found`, 404))
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
