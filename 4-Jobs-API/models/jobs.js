const { timeStamp } = require('console');
const mongoose = require('mongoose');
const { schema } = require('./auth');

const JobsSchema = new mongoose.Schema({
    company:{
        type: String,
        required: [true, 'please provide company name'],
        maxlength: 50
    },
    position:{
        type: String,
        required: [true, 'please provide position name'],
        maxlength: 50
    },
    status:{
        type: String,
        enum: ['Interview', 'Declined', 'Pending'],
        default: 'Pending'
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'please provide user']

    }
}, {timeStamp: true})

module.exports = mongoose.model('Jobs', JobsSchema)