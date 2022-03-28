const Company = require('../models/companyModel');
const User = require('../models/userModel');


// @desc   Get company
// @route  GET /api/companies/:id
// @access Private
const getCompany = async (req, res) => {
    const { id } = req.params;
    const company = await Company.findById(id);

    if (!company) {
        return res.status(400).json({
            msg: 'Company not found'
        });
    }

    return res.status(200).json(company);
}


// @desc   Create company
// @route  POST /api/companies
// @access Private
const createCompany = async (req, res) => {
    const { name, email, logo } = req.body;

    if(!name || !email || !logo ) {
        return res.status(400).json({
            msg: 'Please enter all fields'
        });
    }

    // Check if user exists
    const user = await User.findById(req.user);

    if(!user) {
        return res.status(400).json({
            msg: 'User not found'
        });
    }

    const company = new Company({
        name,
        owners,
        email,
        logo,
        locations
    });

    // Add user to company as its owner
    company.owners.push(user);

    await company.save();

    return res.status(200).json(company);
}


// @desc   Update company
// @route  PUT /api/companies/:id
// @access Private
const editCompany = async (req, res) => {
    const  { id } = req.params;

    const company = await Company.findByIdAndUpdate(id, req.body)

    if (!company) {
        return res.status(400).json({
            msg: 'Company not found'
        });
    }

    return res.status(200).json(company);
}


// @desc   Delete company
// @route  DELETE /api/companies/:id
// @access Private
const deleteCompany = async (req, res) => {
    const { id } = req.params;

    const company = await Company.findByIdAndDelete(id);

    if (!company) {
        return res.status(400).json({
            msg: 'Company not found'
        });
    }

    return res.status(200).json(company);
}


module.exports = {
    getCompany,
    createCompany,
    editCompany,
    deleteCompany
}