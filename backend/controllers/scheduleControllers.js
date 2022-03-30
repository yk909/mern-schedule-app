const Schedule = require('../models/scheduleModel');
const Business = require('../models/businessModel');


// @desc   Get all schadules for a business
// @route  GET /api/schadule/business/:id
// @access Private
const getAllSchedules = async (req, res) => {
    const { id } = req.params;  // id is the business id
    const { isArchived } = req.query; // isArchived is a boolean

    try {
        const schadules = await Schedule.find({business: id, isArchived: isArchived ? isArchived : false});

        if (!schadules) {
            return res.status(400).json({ msg: 'No schedules found' });
        }

        return res.status(200).json({ schadules });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Server Error' });
    }
};


// @desc   Get a schedule by id
// @route  GET /api/schadule/:id
// @access Private
const getScheduleById = async (req, res) => {
    const { id } = req.params;  // id is the schedule id

    try {
        const schedule = await Schedule.findById(id);
    
        if (!schedule) {
            return res.status(400).json({
                msg: 'No schedule found'
            });
        }

        return res.status(200).json({schedule});
    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: 'Server Error' });
    }
};


// @desc   Create a schedule
// @route  POST /api/schadule/business/:id
// @access Private
const createSchedule = async (req, res) => {
    const { id } = req.params;  // id is the business id
    const { startDate, endDate } = req.body;

    if(!startDate || !endDate) {
        return res.status(400).json({
            msg: 'Please enter all fields'
        });
    }

    try {
        const business = await Business.findById(id).populate('employees').exec();

        if (!business) {
            return res.status(400).json({
                msg: 'No business found'
            });
        }

        // get user instance from the employee array
        const userEmployee = business.employees.find(employee => employee.user.toString() === req.user._id.toString());

        // Check if logged in user is a manager  !company owner can't create schedule
        if ( userEmployee && userEmployee.isManager ) {
            const schedule = new Schedule({
                user: req.user._id,
                business: id,
                startDate,
                endDate
            });

            await schedule.save();

            return res.status(200).json({schedule});
        } else {
            return res.status(400).json({
                msg: 'You are not a manager'
            });
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: 'Server Error' });
    }
};


// @desc   Update a schedule
// @route  PUT /api/schadule/:id
// @access Private
const editSchedule = async (req, res) => {
    const { id } = req.params;  // id is the schedule id

    try {
        const schedule = await Schedule.findById(id).populate('business').exec();

        if (!schedule) {
            return res.status(400).json({
                msg: 'No schedule found'
            });
        }

        const business = await Business.findById(schedule.business._id).populate('employees').exec();

        if (!business) {
            return res.status(400).json({
                msg: 'No business found'
            });
        }

        // get user instance from the employee array
        const userEmployee = business.employees.find(employee => employee.user.toString() === req.user._id.toString());

        // Check if logged in user is an employee and a manager  !company owner can't create schedule
        if ( userEmployee && userEmployee.isManager ) {
            const updatedSchedule = await Schedule.findByIdAndUpdate(id, req.body, {new: true});

            return res.status(200).json({updatedSchedule});
        } else {
            return res.status(400).json({
                msg: 'You are not a manager'
            });
        }

    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: 'Server Error' });
    }
};


// @desc   Delete a schedule
// @route  DELETE /api/schadule/:id
// @access Private
const deleteSchedule = async (req, res) => {
    const { id } = req.params;  // id is the schedule id

    try {
        const schedule = await Schedule.findById(id).populate('business').exec();

        if (!schedule) {
            return res.status(400).json({
                msg: 'No schedule found'
            });
        }

        const business = await Business.findById(schedule.business._id).populate('employees').exec();

        if (!business) {
            return res.status(400).json({
                msg: 'No business found'
            });
        }

        // get user instance from the employee array
        const userEmployee = business.employees.find(employee => employee.user.toString() === req.user._id.toString());

        // Check if logged in user is an employee and a manager  !company owner can't create schedule
        if ( userEmployee && userEmployee.isManager ) {
            await schedule.remove();

            res.status(200).json({msg: 'Schedule deleted'});
        } else {
            return res.status(400).json({
                msg: 'You are not a manager'
            });
        }
    } catch (err){
        console.log(err)
        return res.status(500).json({ msg: 'Server Error' });
    }
}


module.exports = {
    getAllSchedules,
    getScheduleById,
    createSchedule,
    editSchedule,
    deleteSchedule
};