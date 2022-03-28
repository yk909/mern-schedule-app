const Schedule = require('../models/scheduleModel');
const Business = require('../models/businessModel');


// @desc   Get all schadules for a business
// @route  GET /api/schadule/business/:id
// @access Private
const getAllSchedules = async (req, res) => {
    const { id } = req.params;  // id is the business id

    const schedule = await Schedule.find({ business: id });

    if (!schedule) {
        return res.status(400).json({
            msg: 'No schedule found'
        });
    }

    res.status(200).json({schedule});
};


// @desc   Get a schedule by id
// @route  GET /api/schadule/:id
// @access Private
const getScheduleById = async (req, res) => {
    const { id } = req.params;  // id is the schedule id

    const schedule = await Schedule.findById(id);

    if (!schedule) {
        return res.status(400).json({
            msg: 'No schedule found'
        });
    }

    res.status(200).json({schedule});
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

    const business = await Business.findById(id);

    if (!business) {
        return res.status(400).json({
            msg: 'No business found'
        });
    }

    const schedule = await Schedule.create({
        startDate,
        endDate,
        business: id
    });

    await schedule.save();

    business.schedules.push(schedule._id);
    await business.save();

    res.status(200).json({schedule});
};


// @desc   Update a schedule
// @route  PUT /api/schadule/:id
// @access Private
const editSchedule = async (req, res) => {
    const { id } = req.params;  // id is the schedule id
    const { startDate, endDate } = req.body;

    if(!startDate || !endDate) {
        return res.status(400).json({
            msg: 'Please enter all fields'
        });
    }

    const schedule = await Schedule.findByIdAndUpdate(id, req.body, { new: true });

    if (!schedule) {
        return res.status(400).json({
            msg: 'No schedule found'
        });
    }

    await schedule.save();

    res.status(200).json({schedule});
};


// @desc   Delete a schedule
// @route  DELETE /api/schadule/:id
// @access Private
const deleteSchedule = async (req, res) => {
    const { id } = req.params;  // id is the schedule id

    const schedule = await Schedule.findById(id);

    if (!schedule) {
        return res.status(400).json({
            msg: 'No schedule found'
        });
    }

    await Schedule.findByIdAndDelete(id);

    res.status(200).json({msg: 'Schedule deleted'});
}


module.exports = {
    getAllSchedules,
    getScheduleById,
    createSchedule,
    editSchedule,
    deleteSchedule
};