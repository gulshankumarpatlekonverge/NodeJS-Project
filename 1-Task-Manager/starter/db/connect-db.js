const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://patlegulshanknkonverge:patlegulshankn@nodeexpressprojects.hzdipzw.mongodb.net/1-TASK-MANAGER?retryWrites=true&w=majority&ssl=true';

const connectDB = (url) => {
    return mongoose.connect(connectionString);
}

module.exports = { connectDB }
