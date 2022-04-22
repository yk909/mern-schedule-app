const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getAllTasksForList,
    getRecentUserTasks,
    createTask,
    deleteTask,
} = require('../../controllers/task/taskControllers');


router.route('/:taskListId')
    .get(getAllTasksForList);

router.route('/')
    .get(protect, getRecentUserTasks)
    .post(protect, createTask);

router.route('/:id')
    .delete(protect, deleteTask);


module.exports = router;