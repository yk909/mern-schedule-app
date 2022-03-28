const Business = require('../models/businessModel');
const Company = require('../models/companyModel');
const User = require('../models/userModel');


// @desc   Get businesses
// @route  GET /api/businesses/:id
// @access Private
const getBusiness = async (req, res) => {
    const { id } = req.params;
    const business = await Business.findById(id);

    if (!business) {
        return res.status(400).json({
            msg: 'Business not found'
        });
    }

    return res.status(200).json(business);
}


// @desc   Create business
// @route  POST /api/businesses/:id
// @access Private
const createBusiness = async (req, res) => {
    const { id } = req.params; // id of the company
    const { name, address, city, state, zip, phone } = req.body;

    if(!name || !address || !city || !state || !zip || !phone) {
        return res.status(400).json({
            msg: 'Please enter all fields'
        });
    }

    // Check if company exists
    const company = await Company.findById(id);

    if(!company) {
        return res.status(400).json({
            msg: 'Company not found'
        });
    }

    const business = new Business({
        name,
        address,
        city,
        state,
        zip,
        phone
    });

    await business.save();

    // Add business to company
    company.locations.push(business);
    await company.save();

    return res.status(200).json(business);
}


// @desc   Update business
// @route  PUT /api/businesses/:id
// @access Private
const updateBusiness = async (req, res) => {
    const { id } = req.params;
    const { name, address, city, state, zip, phone } = req.body;

    if(!name || !address || !city || !state || !zip || !phone) {
        return res.status(400).json({
            msg: 'Please enter all fields'
        });
    }

    const business = await Business.findByIdAndUpdate(id, {
        name,
        address,
        city,
        state,
        zip,
        phone
    });

    if (!business) {
        return res.status(400).json({
            msg: 'Business not found'
        });
    }

    return res.status(200).json(business);
}


// @desc   Delete business
// @route  DELETE /api/businesses/:id
// @access Private
const deleteBusiness = async (req, res) => {
    const { id } = req.params;

    const business = await Business.findByIdAndDelete(id);

    if (!business) {
        return res.status(400).json({
            msg: 'Business not found'
        });
    }

    return res.status(200).json(business);
}


module.exports = {
    getBusiness,
    createBusiness,
    updateBusiness,
    deleteBusiness
}