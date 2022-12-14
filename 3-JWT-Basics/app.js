const express = require('express');
const app = express();
require('dotenv').config();
require('express-async-errors');
const { connectDB } = require('./db/db')
const mainRoutes = require('./routes/main');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
app.use(express.static('./public'))
app.use(errorHandlerMiddleware); 

app.get('/', (req, res) => {
    res.send("Hello World");
})

app.use('/api/v1', mainRoutes);
app.use(notFound);

const PORT = process.env.PORT || 5000;

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
