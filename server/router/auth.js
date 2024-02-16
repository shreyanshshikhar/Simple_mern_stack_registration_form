const express = require('express');
const router = express.Router();
const User = require('../model/userSchema');
const bcrypt = require('bcryptjs');

router.get('/', (req, res) => {
    res.send('hello');
});

router.post('/register', async(req, res) => {
    try {
        const { name, email, phone, work, password, cPassword } = req.body;

        if (!name || !email || !phone || !work || !password || !cPassword) {
            return res.status(422).json({ error: "Please fill in all fields" });
        }

        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ error: "Email already exists" });
        }

        const user = new User({ name, email, phone, work, password, cPassword });
        const userRegistered = await user.save();

        if (userRegistered) {
            res.status(201).json({ message: "User registered successfully😀" })
        } else {
            res.status(500).json({ error: "Failed to register" })
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to register 🥲" });
    }
});

router.post('/signin', async(req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Please fill the data " });
        }

        const userLogin = await User.findOne({ email: email });

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            if (!isMatch) {
                return res.status(400).json({ error: "Invalid credential" });
            } else {
                // Assuming `generateAuthToken` is a method in the user schema to generate JWT token
                const token = await userLogin.generateAuthToken();
                console.log("Token:", token);

                res.cookie("jwt-token", token, {
                    expires: new Date(Date.now() + 25892000000), // 30 days from login time
                    httpOnly: true
                });

                res.json({ message: "User signin successfully" });
            }
        } else {
            return res.status(400).json({ error: "Invalid credential" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to sign in 🥲" });
    }
});

router.get('/about', (req, res) => {
    res.send('hello about');
});

router.get('/contact', (req, res) => {
    res.send('hello contact');
});

router.get('/signin', (req, res) => {
    res.send('hello login');
});

router.get('/signup', (req, res) => {
    res.send('hello register');
});

module.exports = router;