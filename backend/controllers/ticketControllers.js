const Ticket = require('../models/ticketModel');
const Business = require('../models/businessModel');
const Employee = require('../models/employeeModel');


// @route   GET api/ticket/manager
// @desc    Get all tickets where user is manager
// @access  Private
const getAllManagerTickets = async (req, res) => {
    try {
        const employee = await Employee.find({ user: req.user._id, isManager: true });

        if(!employee) {
            return res.status(400).json({ msg: 'No employee found' });
        }

        const managerTickets = await Ticket.find({ business: {
            $in: employee.map(employee => employee.business)
        } }).sort({ createdAt: -1 }).limit(10);

        return res.status(200).json(managerTickets);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
}


// @route   GET api/ticket/employee
// @desc    Get all tickets where user is employee
// @access  Private
const getAllEmployeeTickets = async (req, res) => {
    try {
        const employee = await Employee.find({ user: req.user._id, isManager: false });

        const employeeTickets = await Ticket.find({ targetEmployee: {
            $in: employee.map(employee => employee._id)
        } }).sort({ createdAt: -1 }).limit(10);


        return res.status(200).json(employeeTickets);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
}


// @route   POST api/ticket
// @desc    Create a ticket
// @access  Private
const createTicket = async (req, res) => {
    try {
        const employeeSender = await Employee.findById(req.body.employee);

        if(!employeeSender) {
            return res.status(400).json({ msg: 'No employee found' });
        }

        const business = await Business.findById(req.body.business).populate('company');
        
        if(!business) {
            return res.status(404).json({ msg: 'Business not found' });
        }

        if(req.body.targetEmployee && employeeSender.isManager === true) {
            const targetEmployee = await Employee.findById(req.body.targetEmployee);

            if(!targetEmployee) {
                return res.status(400).json({ msg: 'No employee found' });
            }

            if(targetEmployee.business.toString() !== business._id.toString()) {
                return res.status(400).json({ msg: 'Employee is not part of this business' });
            }

            const ticket = new Ticket({
                createdBy: employeeSender._id,
                business: business._id,
                message: req.body.message,
                type: req.body.type,
                status: 'Pending',
                targetEmployee: targetEmployee._id
            });

            await ticket.save();

            return res.status(200).json(ticket);
        } else {
            const ticket = new Ticket({
                createdBy: employeeSender._id,
                business: business._id,
                message: req.body.message,
                type: req.body.type,
                status: 'Pending'
            });

            await ticket.save();

            return res.status(200).json(ticket);
        }

    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
}


// @route   PUT api/ticket/:id
// @desc    Update a ticket
// @access  Private
const updateTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);

        if(!ticket) {
            return res.status(404).json({ msg: 'Ticket not found' });
        }

        if(ticket.createdBy.toString() !== req.user._id.toString() || (ticket.targetEmployee && ticket.targetEmployee.toString() !== req.user._id.toString())) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        
        ticket.status = req.body.status;

        await ticket.save();

        return res.status(200).json(ticket);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
}


// @route   DELETE api/ticket/:id
// @desc    Delete a ticket
// @access  Private
const deleteTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);

        if(!ticket) {
            return res.status(404).json({ msg: 'Ticket not found' });
        }

        if(ticket.createdBy.toString() !== req.user._id.toString() || (ticket.targetEmployee && ticket.targetEmployee.toString() !== req.user._id.toString())) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await ticket.remove();

        return res.status(200).json(ticket);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
}


module.exports = {
    getAllManagerTickets,
    getAllEmployeeTickets,
    createTicket,
    updateTicket,
    deleteTicket
}