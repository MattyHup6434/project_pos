const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const productRoutes = require('./Routers/product');
const authRoutes = require('./Routers/auth');

const app = express();
const port = process.env.PORT ; 

// ✅ Middlewares
app.use(morgan('dev'));   // Logging middleware 
app.use(bodyParser.json());   // Body parser middleware to parse JSON requests  
app.use(cors());      // CORS middleware to allow cross-origin requests

// ✅ Routes
app.use('/products', productRoutes); // Product routes for handling product-related requests
app.use('/auth', authRoutes); // Authentication routes for handling user authentication

// ✅ Server start
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
