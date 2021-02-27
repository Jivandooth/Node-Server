const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const router = express.Router();
const User = mongoose.model('user');
const Accidents = mongoose.model('accidents');
const requireToken = require('../middleware/requireToken');

router.post('/accident', requireToken, async (req, res) => {
    mongoose.set('useFindAndModify', false);
    console.log(req.body, "ACCIDENT");
    // res.send({ success: "done" });
    try{
        const accidents = new Accidents({ reportedby: req.user, location: req.body.location });
        await accidents.save();
        await User.findOneAndUpdate({ _id: req.user._id }, { $push: { accidents: req.body.location } });
        return res.send({ message: "Reported One Accident" });
    }
    catch(error){
        console.log(error);
        return res.send({message: error.message});
    }
});
module.exports = router;