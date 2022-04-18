const Employee = require('../models/employeeModel');
const Business = require('../models/businessModel');
const Invite = require('../models/inviteModel');
const Company = require('../models/companyModel');


// @desc   Get all users invites
// @route  GET /api/invites/
// @access Private
const getUserInvites = async (req, res) => {
    try {
        const invites = await Invite.find({
            receiver: req.user.email,
            status: 'pending'
        })
        .populate('business')


        const invitesSent = await Invite.find({
            sender: req.user._id,
            status: 'pending'
        })
        .populate('business')

        res.status(200).json({invites, invitesSent});
    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: 'Server Error'
        });
    }
}


// @desc   Create invite
// @route  POST /api/invites/
// @access Private
const createInvite = async (req, res) => {
    try {
        const business = await Business.findById(req.body.business);

        if (!business) {
            return res.status(400).json({
                msg: 'Business does not exist'
            });
        }

        const employee = await Employee.findOne({user: req.user._id, business: business});

        if (!employee) {
            return res.status(400).json({
                msg: 'User employee does not exist'
            });
        }

        if (!employee.isOwner || employee.isManager) {
            return res.status(400).json({
                msg: 'You are not allowed to invite employees'
            });
        }

        const invite = await Invite.findOne({ receiver: req.body.receiver, status: 'pending', business: business });

        if (invite) {
            return res.status(400).json({
                msg: 'You have already sent an invite to this user'
            });
        }


        const newInvite = new Invite({
            sender: req.user._id,
            receiver: req.body.receiver,
            business: business,
        });

        await newInvite.save();

        res.status(200).json({
            msg: 'Invite sent successfully',
            invite: newInvite
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: 'Server Error'
        });
    }
}


// @desc   Update invite
// @route  PUT /api/invites/:id
// @access Private
const updateInvite = async (req, res) => {
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({
            msg: 'Please enter status. (pending, accepted, rejected)'
        });
    }

    try {
        const invite = await Invite.findById(req.params.id);

        if (!invite) {
            return res.status(400).json({
                msg: 'Invite does not exist'
            });
        }

        if (invite.receiver !== req.user.email) {
            return res.status(400).json({
                msg: 'You are not allowed to update this invite'
            });
        }

        invite.status = status;

        await invite.save();

        if(invite.status === 'accepted') {
            const business = await Business.findById(invite.business);

            if(!business) {
                return res.status(400).json({
                    msg: 'Business does not exist'
                });
            }

            const employee = await Employee.findOne({user: req.user._id, business: business});

            if(employee) {
                return res.status(400).json({
                    msg: 'You are already an employee of this business'
                });
            }

            const newEmployee = new Employee({
                user: req.user._id,
                company: business.company,
                business: business._id,
                firstName: req.user.firstName,
                lastName: req.user.lastName,
            });

            await newEmployee.save();
        }

        res.status(200).json({
            msg: `Invite ${invite.status} successfully`,
            invite
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: 'Server Error'
        });
    }
}


// @desc   Delete invite
// @route  DELETE /api/invites/:id
// @access Private
const deleteInvite = async (req, res) => {
    try {
        const invite = await Invite.findById(req.params.id);

        if (!invite) {
            return res.status(400).json({
                msg: 'Invite does not exist'
            });
        }

        if (invite.sender.toString() !== req.user._id.toString()) {
            return res.status(400).json({
                msg: 'You are not allowed to delete this invite'
            });
        }

        await invite.remove();

        res.status(200).json(invite);
    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: 'Server Error'
        });
    }
}


module.exports = {
    getUserInvites,
    createInvite,
    updateInvite,
    deleteInvite
}