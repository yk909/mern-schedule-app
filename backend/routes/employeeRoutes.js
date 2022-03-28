const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getCompanyEmployees,
    getBusinessEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
} = require('../controllers/employeeControllers');


router.route('/company/:id').get(protect, getCompanyEmployees).post(protect, createEmployee);
router.route('/business/:id').get(protect, getBusinessEmployees);
router.route('/:id').get(protect, getEmployeeById).put(protect, updateEmployee).delete(protect, deleteEmployee);


module.exports = router;