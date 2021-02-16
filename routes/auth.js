const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const router = express.Router();
const User = mongoose.model('user');

router.post('/signup', async (req, res) => {
    const { fname, lname, mobile, password, email, bloodGroup, address, city } = req.body;
    try{
        const user = new User({ fname, lname, mobile, password, email, bloodGroup, address, city });
        await user.save();
        const token = jwt.sign({userId: user._id}, 'secret');
        res.send({token: token});
    }
    catch(error){
        return res.status(422).send(error.message.toString().includes('duplicate') ? "This Mobile Number Already Registered" : error.message)
    }
});

router.post('/signin', async (req, res) => {
    const { mobile, password } = req.body;
    if(!mobile || !password){
        return res.status(422).send({ error: "Provide Mobile Number and password" });
    }
    const user = await User.findOne({ mobile: mobile });
    if (!user) {
        return res.status(422).send({ error: "Invalid Mobile Number or password" });
    }
    try{
        await user.comparePassword(password);
        const token = jwt.sign({userId: user._id}, 'secret');
        res.send({token: token});
    }
    catch{
        return res.status(422).send({ error: "Invalid Mobile Number or password" });
    }
    
})

module.exports = router;