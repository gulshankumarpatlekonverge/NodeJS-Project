const express = require('express');
const app = express();
const { connectDB } = require('./db/connect-db');
require('dotenv').config();
const taskRoutes = require('./routes/tasks');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler')
// middleware
app.use(express.json());

app.use(express.static('./public'));

app.use('/api/v1/tasks', taskRoutes);

app.use('*', notFound)
app.use(errorHandlerMiddleware);
const port = 3000;

const start = async() => {
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(port, ()=>{
            console.log(`Server Listening on Port ${port}`);
        });   
    }
    catch(error){
        console.log(error);
    }
}

start();
