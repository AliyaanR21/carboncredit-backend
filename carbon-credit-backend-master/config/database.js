import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // <-- This is CRUCIAL

const { MONGODB_URI } = process.env;

const SetupDataBaseConnection = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB Atlas');
  } catch (error) {
    console.error('❌ ERROR - Unable to connect to the database:', error);
  }
};

export default SetupDataBaseConnection;
