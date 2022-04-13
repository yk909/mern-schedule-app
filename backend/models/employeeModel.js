const mongoose = require('mongoose');
const Business = require('./businessModel');
const Company = require('./companyModel');

const employeeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    position: {
        type: String,
        default: 'Employee'
    },
    wage: {
        type: Number,
        default: 0
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
}, { timestamps: true });


// remove employee from business when employee is deleted
employeeSchema.pre('remove', async function (next) {
    try {
        const business = await Business.findById(this.business);
        const company = await Company.findById(this.company);

        if (!business) {
            return next(new Error('Business not found'));
        }

        if (!company) {
            return next(new Error('Company not found'));
        }

        business.employees.pull(this._id);
        company.employees.pull(this._id);
        await business.save();
        await company.save();
        
        next();
    } catch (err) {
        next(err);
    }
});


// add employee to business on create
employeeSchema.post('save', async function () {
    try {
        const business = await Business.findById(this.business);
        const company = await Company.findById(this.company);

        if (!business) {
            return next(new Error('Business not found'));
        }

        if (!company) {
            return next(new Error('Company not found'));
        }

        business.employees.push(this._id);
        company.employees.push(this._id);
        business.save();
        company.save();
    } catch (err) {
        next(err);
    }
})


module.exports = mongoose.model('Employee', employeeSchema);