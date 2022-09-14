const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'product name must be provided.']
    },
    price: {
        type: Number,
        required: [true,'product price must be provided.']
    },
    company: {
        type: String,
        enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: '{value} is not supported'
        }
        //enum : ['ikea', 'liddy', 'caressa', 'marcos']
    },
    rating:{
        type: Number,
        required: true,
        default: 1
    },
    featured:{
        type: Boolean,
        default: false
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Product', productSchema);