const GlobalMessage = require('../models/globalMessage');
const Employee = require('../models/employee');
const Company = require('../models/employee');
const Shift = require('../models/shift');


// @route   GET api/globalMessage/sender
// @desc    Get a global message where user is sender
// @access  Private
const getSenderGlobalMessage = async (req, res) => {
    try {
        const senderGlobalMessage = await GlobalMessage.find({ sender: req.user.id, status: 'pending' });

        return res.status(200).json(senderGlobalMessage);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
};


// @route   GET api/globalMessage?business=:businessId&company=:companyId
// @desc    Get all global messages
// @access  Private
const getAllGlobalMessages = async (req, res) => {
    try {
        const businessGlobalMessage = await GlobalMessage.find({ business: req.query.business, messageTo: 'business', status: 'pending' });
        const companyGlobalMessage = await GlobalMessage.find({ company: req.query.company, messageTo: 'company', status: 'pending' });

        return res.status(200).json({ businessGlobalMessage, companyGlobalMessage });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
}


// @route   POST api/globalMessage
// @desc    Create a global message
// @access  Private
const createGlobalMessage = async (req, res) => {
    try {
        if(req.body.messageTo === 'business') {
            const employee = await Employee.findOne({ user: req.user._id, business: req.body.business, isManager: true });

            if(!employee) {
                return res.status(400).json({ msg: 'You are not an manager of this business' });
            }

            const globalMessage = await GlobalMessage.create(req.body);

            return res.status(200).json(globalMessage);
        } else if(req.body.messageTo === 'company') {
            const company = await Company.findById(req.body.company);

            if(!company || (company && (!company.oweners.includes(req.user._id) || company.user.toString() !== req.user._id.toString()))) {
                return res.status(400).json({ msg: 'You are not an owener of this company' });
            }

            const globalMessage = await GlobalMessage.create(req.body);

            return res.status(200).json(globalMessage);
        } else {
            return res.status(400).json({ msg: 'Invalid message receiver' });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
}


// @route   PUT api/globalMessage/:id
// @desc    Update a global message
// @access  Private
const updateGlobalMessage = async (req, res) => {
    try {
        const globalMessage = await GlobalMessage.findById(req.params.id);

        if(!globalMessage) {
            return res.status(400).json({ msg: 'Global message not found' });
        }

        if(!globalMessage.shift) {
            return res.status(400).json({msg: 'There is no shift to update'});
        }

        const shift = await Shift.findById(globalMessage.shift);

        if(!shift || shift.employee) {
            return res.status(400).json({msg: 'Shift not found, or shift is already assigned'});
        }

        shift.user = req.user._id;
        await shift.save();

        globalMessage.status = 'accepted';
        await globalMessage.save();

        return res.status(200).json(globalMessage);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
}


// @route   DELETE api/globalMessage/:id
// @desc    Delete a global message
// @access  Private
const deleteGlobalMessage = async (req, res) => {
    try {
        const globalMessage = await GlobalMessage.findById(req.params.id);

        if(!globalMessage) {
            return res.status(400).json({ msg: 'Global message not found' });
        }

        if(globalMessage.sender !== req.user._id) {
            return res.status(400).json({ msg: 'You are not the sender of this global message' });
        }

        await globalMessage.remove();

        return res.status(200).json(globalMessage);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
}


module.exports = {
    getSenderGlobalMessage,
    getAllGlobalMessages,
    createGlobalMessage,
    updateGlobalMessage,
    deleteGlobalMessage,
};