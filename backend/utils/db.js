import mongoose from "mongoose";
import process from "node:process";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `${process.env.MONGO_URL}`
    );
    console.log(`✅ MongoDB se Connect Hogyaa!!: ${conn.connection.host}`);
  } catch (err) {
    console.error(`❌ Error aa gya: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
