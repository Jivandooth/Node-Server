const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
    },
    lname: {
        type: String,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true
    },
    bloodGroup: {
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    location: {
        type: Object,
    },
    accidents: {
       type: Array,
    },
    contacts: {
        type: Array,
    },
    notificationToken: {
        type: String
    }
});

mongoose.model('user', userSchema);