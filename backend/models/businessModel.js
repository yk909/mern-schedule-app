const mognoose = require('mongoose');
const Company = require('./companyModel');

const businessSchema = new mognoose.Schema({
    name: {
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
    company: {
        type: mognoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    owner: {
        type: mognoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    employees: [{
        type: mognoose.Schema.Types.ObjectId,
        ref: 'Employee'
    }],
    schedules: [{
        type: mognoose.Schema.Types.ObjectId,
        ref: 'Schedule'
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


module.exports = mognoose.model('Business', businessSchema);