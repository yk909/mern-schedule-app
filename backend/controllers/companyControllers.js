const Company = require('../models/companyModel');
const User = require('../models/userModel');


// @desc   Get company
// @route  GET /api/companies/:id
// @access Private
const getCompany = async (req, res) => {
    const { id } = req.params;

    try {
        const company = await Company.findById(id);

        if (!company) {
            return res.status(400).json({
                msg: 'Company not found'
            });
        }
    
        return res.status(200).json(company);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error'});
    }
}


// @desc   Create company
// @route  POST /api/companies
// @access Private
const createCompany = async (req, res) => {
    const { name, email, logo } = req.body;

    if(!name || !email ) {
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
        email,
        logo,
    });

    // Add user to company as its owner
    company.owners.push(user);

    await company.save();

    // Make user an owner of the company
    user.isOwner = true;
    await user.save();

    return res.status(200).json(company);
}


// @desc   Update company
// @route  PUT /api/companies/:id
// @access Private
const editCompany = async (req, res) => {
    const { id } = req.params;

    try {
        const company = await Company.findById(id);

        if (!company) {
            return res.status(400).json({
                msg: 'Company not found'
            });
        }

        if(!company.owners.includes(req.user._id)) {
            return res.status(400).json({
                msg: 'You are not authorized to edit this company'
            });
        }

        const updatedCompany = await Company.findByIdAndUpdate(id, req.body, {new: true});

        return res.status(200).json(updatedCompany);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error'});
    }
}


// @desc   Delete company
// @route  DELETE /api/companies/:id
// @access Private
const deleteCompany = async (req, res) => {
    const { id } = req.params;

    try {
        const company = await Company.findByIdAndDelete(id);

        if (!company) {
            return res.status(400).json({
                msg: 'Company not found'
            });
        }

        if(!company.owners.includes(req.user._id)) {
            return res.status(400).json({
                msg: 'You are not authorized to delete this company'
            });
        }

        return res.status(200).json(company);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error'});
    }
}


// @desc   Add or Remove owner from company
// @route  POST /api/companies/:id/owners
// @access Private
const addRemoveOwner = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    try {
        const company = await Company.findById(id);

        if(!company) {
            return res.status(400).json({
                msg: 'Company not found'
            });
        }

        if(!company.owners.includes(req.user._id)) {
            return res.status(400).json({
                msg: 'You are not authorized for this action'
            });
        }

        // Check if user exists
        const user = await User.findById(userId);

        if(!user) {
            return res.status(400).json({
                msg: 'User not found'
            });
        }

        // Add user to company as its owner
        if(!company.owners.includes(user._id)) {
            company.owners.push(user);
        } else {
            company.owners.pull(user);
        }

        await company.save();

        return res.status(200).json(company);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error'});
    }
}


module.exports = {
    getCompany,
    createCompany,
    editCompany,
    deleteCompany,
    addRemoveOwner
}