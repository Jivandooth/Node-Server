const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const router = express.Router();
const User = mongoose.model('user');
const requireToken = require('../middleware/requireToken');

router.post('/login', async (req, res) => {
    const { mobile } = req.body;
    console.log(req.body)
    const userExist = await User.findOne({ mobile: mobile });
    if (!userExist) {
        try{
            const user = new User({ mobile: mobile });
            await user.save();
            const token = jwt.sign({userId: user._id}, 'secret');
            res.send({ token: token })
        }
        catch(error){
            return res.send({message: error.message});
        }
    }
    else{
        try{
            const token = jwt.sign({userId: userExist._id}, 'secret');
            if (userExist.fname) {
                res.send({ token: token, role: userExist.role, fname: userExist.fname, lname: userExist.lname, bloodGroup: userExist.bloodGroup, address: userExist.address, city: userExist.city, accidents: userExist.accidents });
            }
            else{
                res.send({ token: token });
            }
        }
        catch(error){
            return res.send({message: error.message});
        }
    }
});

router.post('/info', requireToken, async (req, res) => {
    mongoose.set('useFindAndModify', false);
    console.log(req.body, "body")
    try{
        await User.findOneAndUpdate({ _id: req.user._id }, req.body);
        res.send({ success: "done" });
    }
    catch(error){
        return res.send({message: error.message});
    }
});
// router.post('/signin', async (req, res) => {
//     const { mobile } = req.body;
//     if(!mobile){
//         return res.status(422).send({ error: "Provide Mobile Number and password" });
//     }
//     const user = await User.findOne({ mobile: mobile });
//     if (!user) {
//         return res.status(422).send({ error: "Invalid Mobile Number or password" });
//     }
//     try{
//         const token = jwt.sign({userId: user._id}, 'secret');
//         res.send({token: token});
//     }
//     catch{
//         return res.status(422).send({ error: "Invalid Mobile Number or password" });
//     }
    
// })

module.exports = router;