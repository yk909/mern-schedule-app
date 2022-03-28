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


router.route('/').get(protect, getScheduleById).post(protect, createSchedule).put(protect, editSchedule).delete(protect, deleteSchedule);
router.route('/business/:id').get(protect, getAllSchedules);


module.exports = router;