const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    createShift,
    editShift,
    getAllBusinessShifts,
    deleteShift
} = require('../controllers/shiftControllers');


router.route('/')
    .get(protect, getAllBusinessShifts)
    .post(protect, createShift);

router.route('/:id')
    .put(protect, editShift)
    .delete(protect, deleteShift);


module.exports = router;