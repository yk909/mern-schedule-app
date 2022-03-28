const mongoose = require('mongoose');
const Business = require('./businessModel');

const employeeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    position: {
        type: String,
        default: 'Employee'
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
    isAdmin: {
        type: Boolean,
        default: false
    },
    isManager: {
        type: Boolean,
        default: false
    },
    isEmployee: {
        type: Boolean,
        default: true
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

        if (!business) {
            return next(new Error('Business not found'));
        }

        business.employees.pull(this._id);
        await business.save();
        
        next();
    } catch (err) {
        next(err);
    }
});


// add employee to business on create
employeeSchema.post('save', async function () {
    const business = await Business.findById(this.business);
    business.employees.push(this._id);
    business.save();
})


module.exports = mongoose.model('Employee', employeeSchema);