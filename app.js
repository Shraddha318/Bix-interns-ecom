const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorMiddleware');
const cors = require('cors');

// Load environment variables
dotenv.config({ path: './.env' });

// Connect to the database
connectDB();

const app = express();

// Body parser
app.use(express.json());
// const allowedOrigins = ['https://tikunteck-web-git-main-marotis-projects.vercel.app'];

const corsOptions = {
  origin: 'https://tikunteck-web-git-main-marotis-projects.vercel.app', // Replace with your front-end URL
  methods: ['GET', 'POST'], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
};

app.use(cors());
// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/product', require('./routes/v1/productRoutes'));
app.use('/api/v1/order', require('./routes/v1/orderRoutes'));
app.use('/api/v1/user', require('./routes/v1/userRoutes'));

// Error handling middleware
app.use(errorHandler);

module.exports = app;
