import mongoose from "mongoose";

export const connectDB = () => {
  try {
    const mongo_url = process.env.MONGO_CLIENT;
    mongoose.set("strictQuery", true);
    const conn = mongoose.connect(mongo_url);
    conn && console.log("Mongodb connected");
  } catch (error) {
    console.log(error.message);
  }
};
