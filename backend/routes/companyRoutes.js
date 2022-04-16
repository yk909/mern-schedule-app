const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
    getUserCompany,
    createCompany, 
    editCompany, 
    deleteCompany,
} = require('../controllers/companyControllers');


router.route('/').post(protect, createCompany);
router.route('/user').get(protect, getUserCompany);
router.route('/:id').put(protect, editCompany).delete(protect, deleteCompany);


module.exports = router;