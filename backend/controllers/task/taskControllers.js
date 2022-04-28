const Task = require('../../models/task/taskModel');
const Employee = require('../../models/employeeModel');


// @route   GET api/tasks/:taskListId
// @desc    Get a task
// @access  Private
const getAllTasksForList = async (req, res) => {
    try {
        const tasks = await Task.find({ taskList: req.params.taskListId });
        
        return res.status(200).json(tasks);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
};


// @route   GET api/tasks
// @desc    Get get Recent User Tasks is limited of 10
// @access  Private
const getRecentUserTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ completedBy: req.user.id }).sort({ completedDate: -1 }).limit(10);

        return res.status(200).json(tasks);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
};


// @route   POST api/tasks
// @desc    Create a task
// @access  Private
// const createTask = async (req, res) => {
//     try {
//         const taskItem = await TaskItem.findById(req.body.taskItem).populate('taskList');

//         if (!taskItem) {
//             return res.status(400).json({msg: 'Task item not found'});
//         }

//         const employee = await Employee.findOne({ user: req.user._id, business: taskItem.taskList.business });

//         if (!employee) {
//             return res.status(400).json({ msg: 'You are not an employee of this business' });
//         }

//         const task = await Task.create({
//             taskItem: taskItem,
//             taskList: taskItem.taskList,
//             completedDate: new Date(),
//             completedBy: req.user._id
//         });

//         return res.status(200).json(task);
//     } catch (err) {
//         console.error(err.message);
//         return res.status(500).json({ msg: 'Server Error' });
//     }
// }


// @route   DELETE api/tasks/:id
// @desc    Delete a task
// @access  Private
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        
        if (task.completedBy === req.user._id) {
            const deletedTask = await task.remove();
            return res.status(200).json(deletedTask);
        } else {
            return res.status(400).json({ msg: 'You are not authorized to delete a task' });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: 'Server Error' });
    }
}


module.exports = {
    getAllTasksForList,
    getRecentUserTasks,
    // createTask,
    deleteTask
};