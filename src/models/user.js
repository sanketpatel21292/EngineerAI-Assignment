const mongoose = require('mongoose');

const User = mongoose.model('users', {
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }
});

module.exports = User;