const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getAllSchedules,
    getScheduleById,
    createSchedule,
    editSchedule,
    deleteSchedule
} = require('../controllers/scheduleControllers');


router.route('/business/:id').get(protect, getAllSchedules).post(protect, createSchedule);
router.route('/:id').get(protect, getScheduleById).put(protect, editSchedule).delete(protect, deleteSchedule);


module.exports = router;