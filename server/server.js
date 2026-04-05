const express = require('express');
const app = express();
require('dotenv').config(); // Load environment variables

const connectDB = require('./config/db'); // Import database configuration
const userRouter = require('./routes/userRoute'); // Import user routes

connectDB(); // Connect to database

/** Routes */
app.use(express.json());
app.use('/api/users', userRouter);

app.listen(8082, () => {
  console.log('Server is Running');
});
