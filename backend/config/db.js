import mongoose from 'mongoose';

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI);
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.log(`Error: ${error.message}`);
//     process.exit(1);
//   }
// };
const PORT = process.env.PORT || 5001;

const connectDB = async () => {
  try {
    const conn = await mongoose
      .connect('mongodb://localhost:27017/proshop')
      .then(() => {
        console.log(`MongoDb Local Server running on ${PORT}`);
      });
    //console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
