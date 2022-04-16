const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getCompanyEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee
} = require('../controllers/employeeControllers');


router.route('/')
    .post(protect, createEmployee);
router.route('/company/:id')
    .get(protect, getCompanyEmployees);
router.route('/:id')
    .put(protect, updateEmployee)
    .delete(protect, deleteEmployee);


module.exports = router;