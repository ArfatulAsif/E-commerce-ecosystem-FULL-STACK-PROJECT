const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');  // Import database connection
const routes = require('./routes/userRoute');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

const PORT = process.env.PORT || 8000;

// Connect to MongoDB
connectDB();

app.use('/auth', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
