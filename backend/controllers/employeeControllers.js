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
// @route  POST /api/employees
// @access Private
const createEmployee = async (req, res) => {
    const { firstName, lastName, wage, position } = req.body;

    try {
        const business = await Business.findById(req.body.business).populate('company').populate('managers').exec();

        if (!business) {
            return res.status(400).json({
                msg: 'Business not found'
            });
        }

        // Check if user is a manager
        const isManager = business.managers.find(manager => manager.user.toString() === req.user._id.toString());
        const isOwner = business.company.owners.find(owner => owner.toString() === req.user._id.toString());
        if (isManager || isOwner) // If user is a manager
        {
            const newEmployee = new Employee({
                firstName,
                lastName,
                company: business.company,
                business,
                wage,
                position
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

        const business = await Business.findById(employee.business).populate('company').populate('employees').populate('managers').exec();

        if (!business) {
            return res.status(400).json({
                msg: 'Business not found'
            });
        }

        // Check if logged in user is a manager or company owner
        const isManager = business.managers.find(manager => manager.user.toString() === req.user._id.toString());
        const isOwner = business.company.owners.find(owner => owner.toString() === req.user._id.toString());
        if (isManager || isOwner) // If user is a manager
        {
            if (req.body.business !== employee.business.toString()) {
                const newBusiness = await Business.findById(req.body.business).populate('employees').populate('managers').exec();
                if (!newBusiness) {
                    return res.status(400).json({
                        msg: 'Business not found'
                    });
                }

                business.employees.pull(employee);
                newBusiness.employees.push(employee);
                const a = await business.save();
                const b = await newBusiness.save();

                await Employee.findByIdAndUpdate(id, req.body, {new: true});
                return res.status(200).json([a, b]);
            } else {
                await Employee.findByIdAndUpdate(id, req.body, {new: true});
                return res.status(200).json([business]);
            }
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

        const business = await Business.findById(employee.business).populate('company').populate('managers').exec();

        if (!business) {
            return res.status(400).json({
                msg: 'Business not found'
            });
        }

        // Check if logged in user is a manager or company owner
        const isManager = business.managers.find(manager => manager.user.toString() === req.user._id.toString());
        const isOwner = business.company.owners.find(owner => owner.toString() === req.user._id.toString());
        if (isManager || isOwner) // If user is a manager
        {
            const deletedEmployee = employee;
            await employee.remove();
            
            return res.status(200).json(deletedEmployee);
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