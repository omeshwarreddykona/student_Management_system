import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/StudentManagement")
        console.log("MongoDB Connected Successfully")
    } catch (error) {
        console.log("MongoDB Connection lost")
        process(1);
    }
};

export default connectDB;