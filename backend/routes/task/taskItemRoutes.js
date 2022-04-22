const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    createTaskItem,
    updateTaskItem,
    deleteTaskItem,
} = require('../../controllers/task/taskItemControllers');


router.route('/')
    .post(protect, createTaskItem);

router.route('/:id')
    .put(protect, updateTaskItem)
    .delete(protect, deleteTaskItem);


module.exports = router;