const TaskItem = require('../../models/task/taskItemModel');
const TaskList = require('../../models/task/taskListModel');
const Employee = require('../../models/employeeModel');


// @route   POST api/taskItems
// @desc    Create a task item
// @access  Private
const createTaskItem = async (req, res) => {
    try {
        const taskList = await TaskList.findById(req.body.taskList);

        if (!taskList) {
            return res.status(400).json({msg: 'Task list not found'});
        }

        const employee = await Employee.findOne({ user: req.user._id, business: taskList.business }).populate('company');

        if (!employee) {
            return res.status(400).json({msg: 'You are not an employee of this business'});
        }

        if(employee.isManager || employee.company.owners.includes(req.user._id)) {

            const taskItem = await TaskItem.create(req.body);

            taskList.taskItems.push(taskItem);
            await taskList.save();

            return res.status(200).json(taskItem);
        } else {
            return res.status(400).json({msg: 'You are not authorized to create a task item'});
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error'});
    }
}


// @route   PUT api/taskItems/:id
// @desc    Update a task item
// @access  Private
const updateTaskItem = async (req, res) => {
    try {
        const taskList = await TaskList.find({ taskItems: req.params.id });

        if (!taskList) {
            return res.status(400).json({msg: 'Task list not found'});
        }

        const employee = await Employee.findOne({ user: req.user._id, business: taskList.business }).populate('company');

        if (!employee) {
            return res.status(400).json({msg: 'You are not an employee of this business'});
        }

        if(employee.isManager || employee.company.owners.includes(req.user._id)) {
            const taskItem = await TaskItem.findByIdAndUpdate(req.params.id, req.body, { new: true });

            return res.status(200).json(taskItem);
        } else {
            return res.status(400).json({msg: 'You are not authorized to update a task item'});
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error'});
    }
}


// @route   DELETE api/taskItems/:id
// @desc    Delete a task item
// @access  Private
const deleteTaskItem = async (req, res) => {
    try {
        const taskList = await TaskList.find({ taskItems: req.params.id });

        if (!taskList) {
            return res.status(400).json({msg: 'Task list not found'});
        }

        const employee = await Employee.findOne({ user: req.user._id, business: taskList.business }).populate('company');

        if (!employee) {
            return res.status(400).json({msg: 'You are not an employee of this business'});
        }

        if(employee.isManager || employee.company.owners.includes(req.user._id)) {
            const taskItem = await TaskItem.findById(req.params.id);

            if (!taskItem) {
                return res.status(400).json({msg: 'Task item not found'});
            }

            await taskItem.remove();

            return res.status(200).json({msg: 'Task item deleted'});
        } else {
            return res.status(400).json({msg: 'You are not authorized to delete a task item'});
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error'});
    }
}


module.exports = {
    createTaskItem,
    updateTaskItem,
    deleteTaskItem
}