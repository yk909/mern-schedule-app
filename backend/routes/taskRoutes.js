const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getAllBusinessTaskLists,
    getAllUserTaskLists,
    createTaskList,
    updateTaskList,
    deleteTaskList,
} = require('../controllers/task/taskListControllers');

const {
    createTaskItem,
    updateTaskItem,
    deleteTaskItem,
} = require('../controllers/task/taskItemControllers');

const {
    getAllTasksForList,
    getRecentUserTasks,
    createTask,
    deleteTask,
} = require('../controllers/task/taskControllers');


// Task List Routes
router.route('/list/:businessId')
    .get(protect, getAllBusinessTaskLists);

router.route('/list/user')
    .get(protect, getAllUserTaskLists);

router.route('/list/')
    .post(protect, createTaskList);

router.route('/list/:id')
    .put(protect, updateTaskList)
    .delete(protect, deleteTaskList);


// Task Item Routes
router.route('/item/')
    .post(protect, createTaskItem);

router.route('/item/:id')
    .put(protect, updateTaskItem)
    .delete(protect, deleteTaskItem);


// Task Routes
router.route('/task/:taskListId')
    .get(getAllTasksForList);

router.route('/task/')
    .get(protect, getRecentUserTasks)
    .post(protect, createTask);

router.route('/task/:id')
    .delete(protect, deleteTask);


module.exports = router;