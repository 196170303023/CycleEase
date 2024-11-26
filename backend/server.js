const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const path = require('path');

dotenv.config();

if (!process.env.MONGO_URI) {
    console.error('Error: MONGO_URI is not set in the environment variables');
    process.exit(1);
}

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, '../frontend')));

app.use('/api/auth', authRoutes);

app.get('/exercise', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'exercise.html'));
});

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'signup.html'));
});

app.get('/tracker', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'tracker.html'));
});

app.get('*', (req, res) => {
    console.log(`404 Not Found: ${req.url}`);
    res.status(404).send('404 Not Found');
});

app.use((err, req, res, next) => {
    console.error('Unexpected error:', err);
    res.status(500).send('Internal Server Error');
});

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Database connection error:', err);
    process.exit(1);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
