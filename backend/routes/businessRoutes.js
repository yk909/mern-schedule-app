const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getAllBusinesses,
    getBusiness,
    createBusiness,
    editBusiness,
    deleteBusiness
} = require('../controllers/businessControllers');


router.route('/company/:id')
    .get(protect, getAllBusinesses)
router.route('/')
    .post(protect, createBusiness)
router.route('/:id')
    .get(protect, getBusiness)
    .put(protect, editBusiness)
    .delete(protect, deleteBusiness);

module.exports = router;