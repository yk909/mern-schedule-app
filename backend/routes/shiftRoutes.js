const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    createShift,
    editShift,
    getAllBusinessShifts,
    deleteShift,
    copyPreviousWeekShifts
} = require('../controllers/shiftControllers');


router.route('/')
    .get(protect, getAllBusinessShifts)
    .post(protect, createShift);

router.route('/:id')
    .put(protect, editShift)
    .delete(protect, deleteShift);

router.route('/copy/:id')
    .put(protect, copyPreviousWeekShifts);


module.exports = router;