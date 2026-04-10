const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const connectDB = require('./config/db'); // Import database configuration
const userRouter = require('./routes/userRoute'); // Import user routes
const movieRouter = require('./routes/movieRoute'); // Import movie routes
const theatreRouter = require('./routes/theatreRoute'); // Import theatre routes
const showRouter = require('./routes/showRoute'); // Import show routes
const bookingRouter = require('./routes/bookingRoute'); // Import booking routes

connectDB(); // Connect to database

/** Middleware */
app.use(cors());
app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/movies', movieRouter);
app.use('/api/theatres', theatreRouter);
app.use('/api/shows', showRouter);
app.use('/api/bookings', bookingRouter);

app.listen(8082, () => {
  console.log('Server is Running');
});
