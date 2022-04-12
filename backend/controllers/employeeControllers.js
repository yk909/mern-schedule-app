const Employee = require('../models/employeeModel');
const Business = require('../models/businessModel');
const Company = require('../models/companyModel');
const User = require('../models/userModel');


// @desc   Get all employees for a company
// @route  GET /api/employees/company/:id
// @access Private
const getCompanyEmployees = async (req, res) => {
    const { id } = req.params; // company id

    try {
        const company = await Company.findById(id);
    
        if (!company) {
            return res.status(400).json({
                msg: 'Company not found'
            });
        }

        const employees = await Employee.find({ company: company._id });

        if (!employees) {
            return res.status(400).json({
                msg: 'Employees not found'
            });
        }

        return res.status(200).json(employees);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error'});
    }
}


// @desc   Get all employee for a business
// @route  GET /api/employees/business/:id
// @access Private
const getBusinessEmployees = async (req, res) => {
    const { id } = req.params; // business id

    try {
        const business = await Business.findById(id);

        if (!business) {
            return res.status(400).json({
                msg: 'Business not found'
            });
        }

        const employees = await Employee.find({ business: business._id });

        if (!employees) {
            return res.status(400).json({
                msg: 'Employees not found'
            });
        }

        return res.status(200).json(employees);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error'});
    }
}


// @desc   Get employee
// @route  GET /api/employees/:id
// @access Private
const getEmployeeById = async (req, res) => {
    const { id } = req.params; // employee id

    try {
        const employee = await Employee.findById(id);

        if (!employee) {
            return res.status(400).json({
                msg: 'Employee not found'
            });
        }

        return res.status(200).json(employee);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error'});
    }
}


// @desc   Create employee
// @route  POST /api/employees/business/:id
// @access Private
const createEmployee = async (req, res) => {
    const { id } = req.params; // business id
    const { userId } = req.body; // user id

    try {
        const business = await Business.findById(id).populate('company').populate('employees').exec();

        if (!business) {
            return res.status(400).json({
                msg: 'Business not found'
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                msg: 'User not found'
            });
        }

        // Check if user is a manager
        const userEmployee = business.managers.find(manager => manager.user.toString() === req.user._id.toString());
        if (
            (userEmployee) || // If user is a manager
            business.employees.filter(employee => employee.user._id.toString() === user._id.toString()).length === 0 // Check if user is not already an employee
        ) {
            const newEmployee = new Employee({
                user: user,
                firstName: user.firstName,
                lastName: user.lastName,
                company: business.company,
                business: business
            });

            await newEmployee.save();

            return res.status(200).json(newEmployee);
        } else {
            return res.status(400).json({
                msg: 'You are not authorized to create an employee'
            });
        }

    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error'});
    }
}


// @desc   Update employee
// @route  PUT /api/employees/:id
// @access Private
const updateEmployee = async (req, res) => {
    const { id } = req.params;

    try {
        const employee = await Employee.findById(id);

        if (!employee) {
            return res.status(400).json({
                msg: 'Employee not found'
            });
        }

        const business = await Business.findById(employee.business).populate('company').populate('employees').exec();
        const userEmployee = business.employees.find(employee => employee.user.toString() === req.user._id.toString());

        if (!business) {
            return res.status(400).json({
                msg: 'Business not found'
            });
        }

        // Check if logged in user is a manager or company owner
        if (
            business.company.owners.includes(req.user._id) || 
            ( userEmployee && userEmployee.isManager )
        ) {
            const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, {new: true});
            return res.status(200).json(updatedEmployee);
        } else {
            return res.status(400).json({
                msg: 'You are not authorized to update an employee'
            });
        }

    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error'});
    }
}


// @desc   Delete employee
// @route  DELETE /api/employees/:id
// @access Private
const deleteEmployee = async (req, res) => {
    const { id } = req.params;

    try {
        const employee = await Employee.findById(id);

        if (!employee) {
            return res.status(400).json({
                msg: 'Employee not found'
            });
        }

        const business = await Business.findById(employee.business).populate('company').populate('employees').exec();
        const userEmployee = business.employees.find(employee => employee.user.toString() === req.user._id.toString());

        if (!business) {
            return res.status(400).json({
                msg: 'Business not found'
            });
        }

        // Check if logged in user is a manager or company owner
        if (
            business.company.owners.includes(req.user._id) || 
            ( userEmployee && userEmployee.isManager )
        ) {
            const deleteEmployee = await Employee.findById(id);
            await deleteEmployee.remove();
            return res.status(200).json(deleteEmployee);
        } else {
            return res.status(400).json({
                msg: 'You are not authorized to update an employee'
            });
        }


    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error'});
    }
}


module.exports = {
    getCompanyEmployees,
    getBusinessEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
}