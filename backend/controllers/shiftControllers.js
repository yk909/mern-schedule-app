const Shift = require('../models/shiftModel');
const User = require('../models/userModel');
const Employee = require('../models/employeeModel');
const Business = require('../models/businessModel');
const Company = require('../models/companyModel');


// @desc   GET all shifts for a business
// @route  GET /api/shifts/?business=:business&fromDate=:fromDate&toDate=:toDate
// @access Private
const getAllBusinessShifts = async (req, res) => {
    const { fromDate, toDate, business } = req.query;

    try {
        const employees = await Employee.find({business: business});

        if (!employees) {
            return res.status(400).json({
                msg: 'Employees not found'
            });
        }
        const shifts = await Shift.find(
            {
                business: business, 
                date: {
                    $gte: new Date(fromDate).setHours(0,0,0,0),
                    $lte: new Date(toDate).setHours(0,0,0,0)
                }
            }
        );

        if (!shifts) {
            return res.status(400).json({ msg: 'No shifts found' });
        }

        return res.status(200).json({ shifts, employees });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: 'Server Error' });
    }
};


// @desc   Create a shift
// @route  POST /api/shifts/
// @access Private
const createShift = async (req, res) => {
    const { date, startTime, endTime, business, employee, position } = req.body;

    if(!date || !startTime || !endTime || !business) {
        return res.status(400).json({
            msg: 'Please enter all fields'
        });
    }

    try {
        const businessObj = await Business.findById(business).populate('company');

        if (!businessObj) {
            return res.status(400).json({
                msg: 'Business not found'
            });
        }

        // Check if user is a manager
        const userEmployee = await Employee.findOne({ user: req.user._id, business: business });

        if(!userEmployee) {
            return res.status(400).json({
                msg: 'You are not authorized to update this employee'
            });
        }


        // Check if logged in user is a manager or company owner
        if (userEmployee.isManager || businessObj.company.owners.includes(req.user._id))
        {
            const shift = await Shift.create({
                employee,
                scheduledBy: userEmployee,
                business,
                date,
                position,
                startTime,
                endTime,
            })

            return res.status(200).json(shift);
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


// @desc   Edit a shift
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

        const business = await Business.findById(shift.business).populate('company');

        if (!business) {
            return res.status(400).json({
                msg: 'Business not found'
            });
        }

        // Check if user is a manager
        const userEmployee = await Employee.findOne({ user: req.user._id, business: shift.business });

        if(!userEmployee) {
            return res.status(400).json({
                msg: 'You are not authorized to update this employee'
            });
        }

        // Check if logged in user is a manager or company owner
        if (userEmployee.isManager || business.company.owners.includes(req.user._id))
        {
            const editedShift = await Shift.findByIdAndUpdate(id, req.body, { new: true });

            return res.status(200).json(editedShift);
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

        const business = await Business.findById(shift.business).populate('company');

        if (!business) {
            return res.status(400).json({
                msg: 'Business not found'
            });
        }

        // Check if user is a manager
        const userEmployee = await Employee.findOne({ user: req.user._id, business: shift.business });

        if(!userEmployee) {
            return res.status(400).json({
                msg: 'You are not authorized to update this employee'
            });
        }

        // Check if logged in user is a manager or company owner
        if (userEmployee.isManager || business.company.owners.includes(req.user._id))
        {
            const deletedShift = await shift.remove();

            return res.status(200).json(deletedShift);
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


// @desc   Copy previous week's shifts
// @route  POST /api/shifts/copy/:business
// @access Private
const copyPreviousWeekShifts = async (req, res) => {
    const { business } = req.params;
    const { fromDate, toDate } = req.body;

    try {
        const businessObj = await Business.findById(business).populate('company');

        if (!businessObj) {
            return res.status(400).json({
                msg: 'Business not found'
            });
        }

        // Check if user is a manager
        const userEmployee = await Employee.findOne({ user: req.user._id, business: business });

        if(!userEmployee) {
            return res.status(400).json({
                msg: 'You are not authorized to update this employee'
            });
        }

        // Check if logged in user is a manager or company owner
        if (userEmployee.isManager || businessObj.company.owners.includes(req.user._id))
        {
            const previousWeekShifts = await Shift.find(
                { business, 
                    date: { 
                        $gte: new Date(fromDate).setHours(0,0,0,0),
                        $lte: new Date(toDate).setHours(0,0,0,0)
                    } 
                }).sort({ date: -1 });

            if(previousWeekShifts.length === 0) {
                return res.status(400).json({
                    msg: 'No shifts found'
                });
            }

            // Add one week to each shift date
            const newShifts = previousWeekShifts.map(shift => {
                shift.date = new Date(shift.date.getTime() + 7 * 24 * 60 * 60 * 1000);
                return shift;
            });

            const newShiftsObj = await Shift.create(newShifts);

            return res.status(200).json(newShiftsObj);
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


module.exports = {
    getAllBusinessShifts,
    createShift,
    editShift,
    deleteShift,
    copyPreviousWeekShifts
};