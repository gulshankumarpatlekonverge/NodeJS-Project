const express = require('express');
const app = express();
const { connectDB } = require('./db/connect-db')
const taskRoutes = require('./routes/tasks');

// middleware
app.use(express.json());

app.use(express.static('./public'));

app.use('/api/v1/tasks', taskRoutes);

const port = 300;

const start = async() => {
    try{
        await connectDB();
        app.listen(port, ()=>{
            console.log(`Server Listening on Port ${port}`);
        });   
    }
    catch(error){
        console.log(error);
    }
}

start();
