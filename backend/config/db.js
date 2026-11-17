const mongoose = require('mongoose');

const connectDB = async () => {
    const uri = process.env.MONGO_URI;
    if (!uri) {
        const error = new Error('MONGO_URI is not configured.');
        error.code = 'MONGO_URI_MISSING';
        throw error;
    }

    const conn = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
    return conn;
};

module.exports = connectDB;
