const mongoose = require('mongoose');
const Business = require('./businessModel');
const Shift = require('./scheduleModel');

// create a new schema
const scheduleSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    shifts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shift',
    }],
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
        required: true
    },
    isArchived: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });


// remove schedule from business when schedule is deleted
scheduleSchema.pre('remove', async function (next) {
    try {
        const business = await Business.findById(this.business);

        if (!business) {
            return next(new Error('Business not found'));
        }

        if (this.shifts.length > 0) {
            // find and remove all shifts that belong to this schedule
            const shifts = await Shift.find({ schedule: this._id });

            shifts.map(async shift => {
                await shift.remove();
            });
        }

        // remove schedule from business
        business.schedules.pull(this._id);
        await business.save();
        
        next();
    } catch (err) {
        next(err);
    }
});


// add schedule to business when schedule is created
scheduleSchema.post('save', async function () {
    const business = await Business.findById(this.business);
    business.schedules.push(this._id);
    business.save();
})


module.exports = mongoose.model('Schedule', scheduleSchema);