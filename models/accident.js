const mongoose = require('mongoose');

const accidentreport = new mongoose.Schema({
    location: {
        type: Object,
        required: true,
    },
    reportedby: {
        type: Object,
        required: true,
    }
});

mongoose.model('accidents', accidentreport);