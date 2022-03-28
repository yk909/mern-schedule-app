const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getBusiness,
    createBusiness,
    editBusiness,
    deleteBusiness
} = require('../controllers/businessControllers');


router.route('/').get(protect, getBusiness).post(protect, createBusiness).put(protect, editBusiness).delete(protect, deleteBusiness);


module.exports = router;