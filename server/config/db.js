const mongoose = require("mongoose");

const MONGO_URI = "mongodb://127.0.0.1:27017/EducaLearnDatabase"; // For local MongoDB


const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
