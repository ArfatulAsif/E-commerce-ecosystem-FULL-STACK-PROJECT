const mongoose = require('mongoose');


const connectDB = async () => {
  try {
    
    const connection = await mongoose.connect(process.env.MONGO_DB, {});
    console.log('MongoDB Connected:', connection.connection.host);
  } catch (error) {       
    console.error('MongoDB Connection Error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;


module.exports = connectDB;
