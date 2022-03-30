const Shift = require('../models/shiftModel');
const User = require('../models/userModel');
const Business = require('../models/businessModel');
const Schedule = require('../models/scheduleModel');


// @desc   Get all shifts for a user
// @route  GET /api/shifts/user/:id
// @access Private
const getAllUserShifts = async (req, res) => {
    const { id } = req.params;  // id is the user id

    try {
        const shifts = await Shift.find({user: id});

        if (!shifts) {
            return res.status(400).json({ msg: 'No shifts found' });
        }

        return res.status(200).json({ shifts });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: 'Server Error' });
    }
};


// @desc   Get a shift by id
// @route  GET /api/shifts/:id
// @access Private
const getShiftById = async (req, res) => {
    const { id } = req.params;  // id is the shift id

    try {
        const shift = await Shift.findById(id);
    
        if (!shift) {
            return res.status(400).json({
                msg: 'No shift found'
            });
        }
    
        return res.status(200).json({shift});
    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: 'Server Error' });
    }
}


// @desc   Get all shifts for a user in current schedule
// @route  GET /api/shifts/user/:userId/schedule/:scheduleId'
// @access Private
const getAllUserShiftsInSchedule = async (req, res) => {
    const { userId, scheduleId } = req.params;

    try {

        const shifts = await Shift.find({ user: userId, schedule: scheduleId });

        if (!shifts) {
            return res.status(400).json({ msg: 'No shifts found' });
        }

        return res.status(200).json({ shifts });
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ msg: 'Server Error' });
    }
}


// @desc   Create a shift
// @route  POST /api/shifts/user/:userId/schedule/:scheduleId'
// @access Private
const createShift = async (req, res) => {
    const { userId, scheduleId } = req.params;
    const { date, startTime, endTime } = req.body;

    if(!date || !startTime || !endTime) {
        return res.status(400).json({
            msg: 'Please enter all fields'
        });
    }

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                msg: 'No user found'
            });
        }

        console.log(scheduleId)
        const schedule = await Schedule.findById(scheduleId);
        
        if (!schedule) {
            return res.status(400).json({
                msg: 'No schedule found'
            });
        }

        const business = await Business.findById(schedule.business).populate('employees').exec();

        if (!business) {
            return res.status(400).json({
                msg: 'No business found'
            });
        }

        // check if logged in user is a manager
        const userEmployee = business.employees.find(employee => employee.user.toString() === req.user._id.toString());

        if ( userEmployee && userEmployee.isManager ) {
            const shift = await Shift.create({
                user: user,
                scheduledBy: req.user,
                schedule: schedule,
                business: business,
                date,
                startTime,
                endTime
            });

            return res.status(200).json({shift});
        } else {
            return res.status(400).json({
                msg: 'You are not authorized to create shift'
            });
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: 'Server Error' });
    }

}


// @desc   Update a shift
// @route  PUT /api/shifts/:id
// @access Private
const editShift = async (req, res) => {
    const { id } = req.params;  // id is the shift id
    
    try {
        const shift = await Shift.findById(id);

        if (!shift) {
            return res.status(400).json({
                msg: 'No shift found'
            });
        }

        const business = await Business.findById(shift.business).populate('employees').exec();

        if(!business) {
            return res.status(400).json({
                msg: 'No business found'
            });
        }

        // check if logged in user is a manager
        const userEmployee = business.employees.find(employee => employee.user.toString() === req.user._id.toString());

        if ( userEmployee && userEmployee.isManager ) {
            const updatedShift = await Shift.findByIdAndUpdate(id, req.body, { new: true });

            return res.status(200).json({updatedShift});
        } else {
            return res.status(400).json({
                msg: 'You are not authorized to edit shift'
            });
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: 'Server Error' });
    }
}


// @desc   Delete a shift
// @route  DELETE /api/shifts/:id
// @access Private
const deleteShift = async (req, res) => {
    const { id } = req.params;  // id is the shift id
    
    try {
        const shift = await Shift.findById(id);

        if (!shift) {
            return res.status(400).json({
                msg: 'No shift found'
            });
        }

        const business = await Business.findById(shift.business).populate('employees').exec();

        if(!business) {
            return res.status(400).json({
                msg: 'No business found'
            });
        }

        // check if logged in user is a manager
        const userEmployee = business.employees.find(employee => employee.user.toString() === req.user._id.toString());

        if ( userEmployee && userEmployee.isManager ) {
            await shift.remove();

            return res.status(200).json({msg: 'Shift deleted'});
        } else {
            return res.status(400).json({
                msg: 'You are not authorized to delete shift'
            });
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: 'Server Error' });
    }
}


module.exports = {
    getAllUserShifts,
    getShiftById,
    getAllUserShiftsInSchedule,
    createShift,
    editShift,
    deleteShift
};