import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const connectDb = async (url: any) => {
    // const uri:any = process.env.MONGODB_URI
    await mongoose.connect(url)
}

export default connectDb;