const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');

const userRouter = require('./routes/userRouter');
const adsRouter = require('./routes/adsRouter');
const adminRouter = require('./routes/adminRouter');
const globalErrorHandler = require('./middleware/ErrorHandlerMiddleware');
const AppError = require('./utils/AppErrorClass');

const app = express();
// Middleware that sets HTTP headers
app.use(helmet());
// Rate Limit middleware
const limiter = rateLimit({
  // Number of request
  max: 100,
  // Number of seconds between requests
  windowMs: 60 * 60 * 1000, // 1 hour
  message: `Too many request from this IP, Try again in a 1 hour`,
});
app.use('/api', limiter);

// Middleware that performs data sanitization againts XXS
app.use(xss());
// Middleware that performs body Parsering, reading data from the request body and storing it in req.body
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/user/', userRouter);
app.use('/api/v1/ads/', adsRouter);
app.use('/api/v1/admin/', adminRouter);

// Handling unhandled endpoints
app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: `fail`,
  //   message: `404 ${req.originalUrl} not found on the server.`,
  // });
  next(new AppError(`Cant find ${req.originalUrl} on the server.`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
