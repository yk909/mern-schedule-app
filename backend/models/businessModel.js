const mongoose = require('mongoose');
const Company = require('./companyModel');

const businessSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    positions: [{
        type: String,
        required: false
    }],
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    employees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    }],
    managers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    }],
    owners: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
}, { timestamps: true });


// remove business from company when is deleted
businessSchema.pre('remove', async function (next) {
    try {
        const company = await Company.findById(this.company);

        if (!company) {
            return next(new Error('Company not found'));
        }

        company.businesses.pull(this._id);
        await company.save();
        
        next();
    } catch (err) {
        next(err);
    }
});


// add business to company on create
businessSchema.post('save', async function () {
    const company = await Company.findById(this.company);
    company.businesses.push(this._id);
    company.save();
})


module.exports = mongoose.model('Business', businessSchema);