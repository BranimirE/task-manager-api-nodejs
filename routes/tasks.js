const express = require('express');
const { getAllTasks, createTask, getTask, updateTask, deleteTask } = require('../controllers/tasks');
const asyncWrapper = require('../middleware/async');
const router = express.Router();

router.route('/').get(asyncWrapper(getAllTasks)).post(asyncWrapper(createTask))
router.route('/:id').get(asyncWrapper(getTask)).patch(asyncWrapper(updateTask)).delete(asyncWrapper(deleteTask))

module.exports = router

