const { string } = require('joi');
const mongoose = require('mongoose');

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
        required: [true, 'Please Provide Password.'],
        maxlength: 12,
        minlength: 6
    }
})

module.exports = mongoose.model('User', UserSchema)
