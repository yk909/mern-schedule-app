const mongoose = require('mongoose');
const TaskList = require('./taskListModel');


const taskItemSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    taskList: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TaskList',
        required: true
    },
    note: {
        type: String,
        required: false
    },
    images: [{
        type: String,
        required: false
    }],
    videos: [{
        type: String,
        required: false
    }],
    canComplete: {
        type: Boolean,
        required: true,
        default: true
    },
}, { timestamps: true });


// remove business from company when is deleted
taskItemSchema.pre('remove', async function (next) {
    try {
        const taskList = await TaskList.findById(this.taskList);

        if (!taskList) {
            return next(new Error('Task list not found'));
        }

        taskList.taskitems.pull(this._id);
        await taskList.save();
        
        next();
    } catch (err) {
        next(err);
    }
});


module.exports = mongoose.model('TaskItem', taskItemSchema);