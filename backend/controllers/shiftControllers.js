const Shift = require('../models/shiftModel');
const User = require('../models/userModel');


// @desc   Get all shifts for a user
// @route  GET /api/shift/user/:id
// @access Private
const getAllUserShifts = async (req, res) => {
    const { id } = req.params;  // id is the user id

    const shift = await Shift.find({ user: id });

    if (!shift) {
        return res.status(400).json({
            msg: 'No shift found'
        });
    }

    res.status(200).json({shift});
};


// @desc   Get a shift by id
// @route  GET /api/shift/:id
// @access Private
const getShiftById = async (req, res) => {
    const { id } = req.params;  // id is the shift id

    const shift = await Shift.findById(id);

    if (!shift) {
        return res.status(400).json({
            msg: 'No shift found'
        });
    }

    res.status(200).json({shift});
}


// @desc   Create a shift
// @route  POST /api/shift/user/:id
// @access Private
const createShift = async (req, res) => {
    const { id } = req.params;  // id is the user id
    const { business, date, startTime, endTime } = req.body;

    if(!business || !date || !startTime || !endTime) {
        return res.status(400).json({
            msg: 'Please enter all fields'
        });
    }

    const user = await User.findById(id);

    if (!user) {
        return res.status(400).json({
            msg: 'No user found'
        });
    }

    const shift = await Shift.create({
        user: id,
        business,
        date,
        startTime,
        endTime
    });

    res.status(200).json({shift});
}


// @desc   Update a shift
// @route  PUT /api/shift/:id
// @access Private
const editShift = async (req, res) => {
    const { id } = req.params;  // id is the shift id
    const { user, business, date, startTime, endTime } = req.body;

    if(!user || !business || !date || !startTime || !endTime) {
        return res.status(400).json({
            msg: 'Please enter all fields'
        });
    }

    const shift = await Shift.findByIdAndUpdate(id, {
        user,
        business,
        date,
        startTime,
        endTime
    }, { new: true });

    if (!shift) {
        return res.status(400).json({
            msg: 'No shift found'
        });
    }

    res.status(200).json({shift});
}


// @desc   Delete a shift
// @route  DELETE /api/shift/:id
const deleteShift = async (req, res) => {
    const { id } = req.params;  // id is the shift id

    const shift = await Shift.findByIdAndDelete(id);

    if (!shift) {
        return res.status(400).json({
            msg: 'No shift found'
        });
    }

    res.status(200).json({msg: 'Shift deleted'});
}


module.exports = {
    getAllUserShifts,
    getShiftById,
    createShift,
    editShift,
    deleteShift
};