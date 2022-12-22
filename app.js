const express = require('express');
const morgan = require('morgan');
const app = express();

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// middleware (between req and res)
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(express.json()); // this middleware adds req data to req.body
app.use(express.static(`${__dirname}/public`));

// routes

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
