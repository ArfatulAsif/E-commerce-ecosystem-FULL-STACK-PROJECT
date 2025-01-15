const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db"); // Import database connection
const routes = require("./routes/userRoute");


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

const PORT = process.env.PORT || 8000;




// Connect to MongoDB
connectDB();

// Serve static images
app.use("/images", express.static("images"));

app.use("/auth", routes);
app.use("/product", routes);
app.use("/buy", routes);
app.use("/bank", routes);
app.use("/supply", routes);
app.use("/get", routes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
