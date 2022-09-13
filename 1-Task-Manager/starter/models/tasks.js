const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must Provide Name'],
        trim: true,
        maxlength: [50, 'Name cant be more than 50 characters']
    }, 
    completed: {
        type : Boolean,
        default: false
    } 
})

module.exports = mongoose.model('Task', TaskSchema);