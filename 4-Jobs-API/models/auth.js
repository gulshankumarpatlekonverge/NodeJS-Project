const { string } = require('joi');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { JsonWebTokenError } = require('jsonwebtoken');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Provide Name.'],
        maxlength: 50,
        minlength: 3
    },
    email: {
        type: String,
        required: [true, 'Please Provide Email.'],      
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please Provide Valid Email.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please Provide Password.']
    }
})


UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
    // in mongoose 5.x and later you can remove next
})

UserSchema.methods.createJWT = function () {
    return jwt.sign({userId: this._id, name: this.name}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME});
}

UserSchema.methods.comparePassword = async function (candidatePasssword){
    const isMatch = await bcrypt.compare(candidatePasssword, this.password)
    return isMatch;
}
module.exports = mongoose.model('User', UserSchema)
