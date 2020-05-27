const express = require('express');
const User = require('./models/user');

const router = express.Router();

// Create User
router.post('/user', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();

        res.status(201).send();
    } catch (e) {
        let errorMessage;
        if (e.errors.email) {
            errorMessage = e.errors.email.message;
        }

        res.status(400).send(errorMessage);
    }
});

// Get Users
router.get('/users', async (req, res) => {
    try {
        let page = 1;
        if (req.query.page && Number.isInteger(parseInt(req.query.page))) page = req.query.page;

        const users = await User.find({}, {}, {
            limit: 3,
            skip: (parseInt(page) - 1) * 3
        });

        res.send(users);
    } catch (e) {
        res.status(400).send();
    }
});

// Get User By Id
router.get('/user/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).send('User not found!');
        }

        res.send(user);
    } catch (e) {
        res.status(400).send();
    }
});

// Update User By Id
router.patch('/user/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body);

        if (!user) {
            return res.status(404).send('User not found!');
        }

        res.send(user);
    } catch (e) {
        res.status(400).send();
    }
});

// Delete User By Id
router.delete('/user/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).send('User not found!');
        }

        res.send(user);
    } catch (e) {
        res.status(400).send();
    }
});

// Typeahead API
router.get('/typeahead/:input', async (req, res) => {
    try {
        const users = await User.find({
            $or: [
                { firstName: { $regex: '.*' + req.params.input + '.*' } },
                { lastName: { $regex: '.*' + req.params.input + '.*' } },
                { email: { $regex: '.*' + req.params.input + '.*' } }
            ]
        });

        res.send(users);
    } catch (e) {
        res.status(400).send();
    }
});

module.exports = router;