const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getAllBusinessTaskLists,
    getAllUserTaskLists,
    createTaskList,
    updateTaskList,
    deleteTaskList,
} = require('../../controllers/task/taskListControllers');


router.route('/:businessId')
    .get(protect, getAllBusinessTaskLists);

router.route('/user')
    .get(protect, getAllUserTaskLists);

router.route('/')
    .post(protect, createTaskList);

router.route('/:id')
    .put(protect, updateTaskList)
    .delete(protect, deleteTaskList);


module.exports = router;