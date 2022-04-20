const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    createShift,
    editShift,
    getAllBusinessShifts,
    getUserShifts,
    deleteShift,
    copyPreviousWeekShifts,
    pickUpShift,
} = require('../controllers/shiftControllers');


router.route('/')
    .get(protect, getAllBusinessShifts)
    .post(protect, createShift);

router.route('/:id')
    .put(protect, editShift)
    .delete(protect, deleteShift);

router.route('/copy/:business')
    .put(protect, copyPreviousWeekShifts);

router.route('/user')
    .get(protect, getUserShifts);

router.route('/pickup/:id')
    .post(protect, pickUpShift);



module.exports = router;