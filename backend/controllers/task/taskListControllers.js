const TaskList = require('../../models/task/taskListModel');
const Employee = require('../../models/employeeModel');
const Company = require('../../models/companyModel');


// @route   GET api/taskList/business
// @desc    Get all task lists for a company
// @access  Private
const getAllCompanyTaskLists = async (req, res) => {
    try {
        const company = await Company
        .findOne({ user: req.user._id })
        .populate('businesses');

        const taskLists = await TaskList
        .find({ company: company})
        .populate('businesses');
            
        return res.status(200).json(taskLists);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error'});
    }
}


// @route   GET api/taskList/user
// @desc    Get all task lists for a user
// @access  Private
const getAllUserTaskLists = async (req, res) => {
    try {
        const userEmployee = await Employee.find({ user: req.user._id});

        if (!userEmployee) {
            return res.status(400).json({msg: 'No employee found'});
        }

        const taskLists = await TaskList
            .find({ company: userEmployee[0].company })
            .populate('businesses');

        const userLists = [];

        taskLists.forEach(taskList => {
            userEmployee.forEach(employee => {
                if (taskList.businesses.find(business => business._id.toString() === employee.business.toString()) && taskList.positions.includes(employee.position)) {
                    const userTaskList = {
                        ...taskList._doc,
                        businesses: taskList.businesses.filter(business => business._id.toString() === employee.business.toString()),
                        positions: [employee.position]
                    }
                    userLists.push(userTaskList);
                }
            });
        });

        return res.status(200).json(userLists);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error'});
    }
}


// @route   POST api/taskList
// @desc    Create a task list
// @access  Private
const createTaskList = async (req, res) => {
    try {
        const { businesses, positions, title, frequency, color, taskItems, company } = req.body;

        const companyObj = await Company.findById(company);

        if (!companyObj) {
            return res.status(400).json({msg: 'Company not found'});
        }

        const employee = await Employee.findOne({ user: req.user._id, company: company._id, isManager: true });

        if(
            employee ||
            companyObj.owners.includes(req.user._id)
        ) {
            const taskList = await TaskList.create({
                businesses,
                company,
                positions,
                title,
                frequency,
                color,
                taskItems,
                createdBy: req.user._id
            });

            const newTaskList = await taskList.save();

            return res.status(200).json(newTaskList);
        } else {
            return res.status(400).json({msg: 'You are not authorized to create a task list'});
        }

    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error'});
    }
}


// @route   PUT api/taskList/:id
// @desc    Update a task list
// @access  Private
const updateTaskList = async (req, res) => {
    try {
        const task = await TaskList.findById(req.params.id).populate('businesses');

        if (!task) {
            return res.status(400).json({msg: 'Task list not found'});
        }

        const company = await Company.findById(task.company);

        if (!company) {
            return res.status(400).json({msg: 'Company not found'});
        }

        const employee = await Employee.findOne({ user: req.user._id, business: task.business });

        if(
            (employee && employee.isManager) || company.owners.includes(req.user._id)
        ) {
            if(req.body.action === 'addTaskItem') {
                task.taskItems.push(req.body.taskItem);
            } else if(req.body.action === 'removeTaskItem') {
                // Remove task item from task list by task item _id
                task.taskItems = task.taskItems.filter(taskItem => taskItem._id.toString() !== req.body.taskItemId);
            } else {
                const updatedTaskList = await TaskList.findByIdAndUpdate(req.params.id, req.body, { new: true });

                updatedTaskList.businesses = task.businesses;
                return res.status(200).json(updatedTaskList);
            }
            
            await task.save();

            return res.status(200).json(task);
        } else {
            return res.status(400).json({msg: 'You are not authorized to update a task list'});
        }

    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error'});
    }
}


// @route   DELETE api/taskList/:id
// @desc    Delete a task list
// @access  Private
const deleteTaskList = async (req, res) => {
    try {
        const employee = await Employee.findOne({ user: req.user._id, business: req.body.business }).populate('company');

        if (!employee) {
            return res.status(400).json({msg: 'You are not an employee of this business'});
        }

        if(employee.isManager || employee.company.owners.includes(req.user._id)) {
            const taskList = await TaskList.findById(req.params.id);

            if (!taskList) {
                return res.status(400).json({msg: 'Task list not found'});
            }

            await taskList.remove();

            return res.status(200).json({taskList, msg: 'Task list deleted'});
        } else {
            return res.status(400).json({msg: 'You are not authorized to delete a task list'});
        }

    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error'});
    }
}


module.exports = {
    getAllCompanyTaskLists,
    getAllUserTaskLists,
    createTaskList,
    updateTaskList,
    deleteTaskList
}