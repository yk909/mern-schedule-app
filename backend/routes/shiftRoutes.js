const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getAllUserShifts,
    getShiftById,
    createShift,
    editShift,
    deleteShift
} = require('../controllers/shiftControllers');


router.route('/').get(protect, getShiftById).post(protect, createShift).put(protect, editShift).delete(protect, deleteShift);
router.route('/user/:id').get(protect, getAllUserShifts);


module.exports = router;