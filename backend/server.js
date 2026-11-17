
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

app.use(express.json());
app.use(cors());

// Import routes
const clubRoutes = require('./routes/clubRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Connect routes
app.use('/api/clubs', clubRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to CLUB-GRID Backend!');
});

const PORT = Number(process.env.PORT) || 5000;

const startServer = async () => {
    try {
        await connectDB();
    } catch (error) {
        const reason = error.code === 'MONGO_URI_MISSING'
            ? 'MONGO_URI is not configured.'
            : `MongoDB connection failed (${error.name || 'UnknownError'}).`;

        console.error(`${reason} HTTP server was not started.`);
        process.exitCode = 1;
        return;
    }

    const server = app.listen(PORT, () => {
        console.log(`CLUB-GRID server running on port ${PORT}`);
    });

    server.on('error', (error) => {
        console.error(`CLUB-GRID server failed to listen (${error.code || error.name}).`);
        process.exitCode = 1;
    });
};

startServer();
