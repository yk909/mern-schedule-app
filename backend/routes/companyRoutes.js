const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
    getCompany,
    createCompany, 
    editCompany, 
    deleteCompany 
} = require('../controllers/companyControllers');


router.route('/').get(protect, getCompany).post(protect, createCompany).put(protect, editCompany).delete(protect, deleteCompany);


module.exports = router;