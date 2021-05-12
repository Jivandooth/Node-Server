const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { use } = require('../routes/auth');
const User = mongoose.model('user');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    console.log(authorization, "authorization");
    console.log()
    if (!authorization) {
        return res.status(401).send({error: "You must be logged in"});
    }
    const token = authorization.replace("Token ", "");
    jwt.verify(token, "secret", async (err, payload) => {
        if (err) {
            return res.status(401).send({error: "Invalid token"})
        }
        const { userId } = payload;
        const user = await User.findById(userId);
        req.user=user;
        next();
    });
}