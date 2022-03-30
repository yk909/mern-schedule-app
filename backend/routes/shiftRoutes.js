const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getAllUserShifts,
    getShiftById,
    getAllUserShiftsInSchedule,
    createShift,
    editShift,
    deleteShift
} = require('../controllers/shiftControllers');


router.route('/user/:userId/schedule/:scheduleId').get(protect, getAllUserShiftsInSchedule).post(protect, createShift);
router.route('/user/:id').get(protect, getAllUserShifts);
router.route('/:id').get(protect, getShiftById).put(protect, editShift).delete(protect, deleteShift);


module.exports = router;