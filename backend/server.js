const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

// connect to database
connectDB();

// Initialize express
const app = express();

// Body parser
app.use(express.json({limit: '2mb'}));
app.use(express.urlencoded({ limit: '2mb', extended: false }));

// Router
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/companies', require('./routes/companyRoutes'));
app.use('/api/businesses', require('./routes/businessRoutes'));
app.use('/api/employees', require('./routes/employeeRoutes'));
app.use('/api/shifts', require('./routes/shiftRoutes'));
app.use('/api/invites', require('./routes/inviteRoutes'));

// NEW UNTESTED ROUTE
app.use('/api/globalMessage', require('./routes/globalMessageRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));
app.use('/api/taskLists', require('./routes/taskListRoutes'));
app.use('/api/taskItems', require('./routes/taskItemRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

// server connection
app.listen(port, () => {
    console.log(`Server is runnig on port ${port}`);
});