require("dotenv").config(); // Load environment variables
const mongoose = require("mongoose");

const DB_URL = process.env.MONGODB_URL;
if (!DB_URL) {
    console.error("MongoDB connection string is missing!");
    process.exit(1);
}

const ConnectDb = async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log("RadhaKrishna \n ✅ DB Connected...");
    } catch (error) {
        console.error("❌ Database connection failed:", error);
        process.exit(1);
    }
};

module.exports = ConnectDb;
