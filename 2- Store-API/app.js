const express = require('express');
const app = express();
require('dotenv').config();
const { connectDB } = require('./db/db')

app.get('/', (req, res) => {
    res.send("Hello World");
})

const PORT = 3000;

const start = async() => {
    try{
        const URL = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@ac-g4jgilm-shard-00-00.hzdipzw.mongodb.net:27017,ac-g4jgilm-shard-00-01.hzdipzw.mongodb.net:27017,ac-g4jgilm-shard-00-02.hzdipzw.mongodb.net:27017/${process.env.DATABASE_NAME}?ssl=true&replicaSet=atlas-11ek8w-shard-0&authSource=admin&retryWrites=true&w=majority`;

        await connectDB(URL)
        app.listen(PORT, ()=>{
            console.log(`Server Listening on Port ${PORT}`);
        });   
    }
    catch(error){
        console.log(error);
    }
}

start();
