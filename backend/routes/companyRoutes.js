const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
    getCompany,
    getUserCompany,
    createCompany, 
    editCompany, 
    deleteCompany,
    addRemoveOwner
} = require('../controllers/companyControllers');


router.route('/').post(protect, createCompany);
router.route('/user').get(protect, getUserCompany);
router.route('/:id').get(protect, getCompany).put(protect, editCompany).delete(protect, deleteCompany);
router.route('/:id/owners').post(protect, addRemoveOwner);


module.exports = router;