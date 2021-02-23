const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

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
    }
});

// userSchema.pre('save', function(next){
//     const user = this;
//     if (!user.isModified('password')) {
//         return next();
//     }
//     bcrypt.genSalt(20, (err, salt) => {
//         if (err) {
//             return next(err)
//         }
//         bcrypt.hash(user.password, salt, (err, hash) => {
//             if (err) {
//                 return next(err);
//             }
//             user.password = hash;
//             next();
//         })
//     })
// })

// userSchema.methods.comparePassword = function(candidatePassword){
//     const user = this;
//     return new Promise((resolve, reject) => {
//         bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
//             if(err){
//                 return reject(err);
//             }
//             if (!isMatch) {
//                 return reject(err)
//             }
//             resolve(true);
//         })
//     })
// }

mongoose.model('user', userSchema);