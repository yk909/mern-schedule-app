const Employee = require('../models/employeeModel');
const Business = require('../models/businessModel');
const User = require('../models/userModel');


// @desc   Get all employees for a company
// @route  GET /api/employees/company/:id
// @access Private
const getCompanyEmployees = async (req, res) => {
    const { id } = req.params; // company id
    const employees = await Employee.find({ company: id });

    if (!employees) {
        return res.status(400).json({
            msg: 'Employees not found'
        });
    }

    return res.status(200).json(employees);
}


// @desc   Get all employee for a business
// @route  GET /api/employees/business/:id
// @access Private
const getBusinessEmployees = async (req, res) => {
    const { id } = req.params; // business id
    const employees = await Employee.find({ business: id });

    if (!employees) {
        return res.status(400).json({
            msg: 'Employees not found'
        });
    }

    return res.status(200).json(employees);
}


// @desc   Get employee
// @route  GET /api/employees/:id
// @access Private
const getEmployeeById = async (req, res) => {
    const { id } = req.params;
    const employee = await Employee.findById(id);

    if (!employee) {
        return res.status(400).json({
            msg: 'Employee not found'
        });
    }

    return res.status(200).json(employee);
}


// @desc   Create employee
// @route  POST /api/employees/business/:id
// @access Private
const createEmployee = async (req, res) => {
    const { id } = req.params; // business id
    const { userId } = req.body; // user id

    const business = await Business.findById(id);

    if (!business) {
        return res.status(400).json({
            msg: 'Business not found'
        });
    }

    const user = await User.findById(user);

    if (!user) {
        return res.status(400).json({
            msg: 'User not found'
        });
    }

    const employee = new Employee({
        user: user,
        business: business
    });

    await employee.save();

    // Add employee to business
    business.employees.push(employee);
    await business.save();

    return res.status(200).json(employee);
}


// @desc   Update employee
// @route  PUT /api/employees/:id
// @access Private
const updateEmployee = async (req, res) => {
    const { id } = req.params;

    const employee = await Employee.findByIdAndUpdate(id, req.body, {new: true});

    if (!employee) {
        return res.status(400).json({
            msg: 'Employee not found'
        });
    }

    return res.status(200).json(employee);
}


// @desc   Delete employee
// @route  DELETE /api/employees/:id
// @access Private
const deleteEmployee = async (req, res) => {
    const { id } = req.params;

    const employee = await Employee.findByIdAndDelete(id);

    if (!employee) {
        return res.status(400).json({
            msg: 'Employee not found'
        });
    }

    return res.status(200).json(employee);
}


module.exports = {
    getCompanyEmployees,
    getBusinessEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
}