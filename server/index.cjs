const express = require('express');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { plants, users } = require('./data.cjs');

const app = express();
const PORT = 5000;
const SECRET_KEY = 'evergreen_luxury_secret';

app.use(cors({
    origin: 'http://localhost:5173', // Vite default port
    credentials: true
}));

app.use(bodyParser.json());
app.use(session({
    secret: SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// --- AUTH ROUTES ---

app.post('/api/register', (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const exists = users.find(u => u.username === username || u.email === email);
    if (exists) {
        return res.status(409).json({ message: "User or Email already exists" });
    }
    users.push({ username, password, email, favorites: [] });
    res.status(201).json({ message: "Registration successful" });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    req.session.user = { username: user.username };
    res.status(200).json({ message: "Login successful", token, username: user.username });
});

// --- PLANT ROUTES ---

app.get('/api/plants', (req, res) => {
    res.status(200).json(plants);
});

app.get('/api/plants/:id', (req, res) => {
    const { id } = req.params;
    let found = null;
    plants.forEach(cat => {
        const p = cat.plants.find(item => item.id === id);
        if (p) found = p;
    });
    if (found) {
        res.status(200).json(found);
    } else {
        res.status(404).json({ message: "Plant not found" });
    }
});

// --- USER ROUTES (FAVORITES) ---

app.post('/api/favorites', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Please login first" });
    }
    const { plantId } = req.body;
    const user = users.find(u => u.username === req.session.user.username);
    if (!user.favorites.includes(plantId)) {
        user.favorites.push(plantId);
    }
    res.status(200).json({ favorites: user.favorites });
});

app.get('/api/favorites', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Please login first" });
    }
    const user = users.find(u => u.username === req.session.user.username);
    res.status(200).json({ favorites: user.favorites });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
