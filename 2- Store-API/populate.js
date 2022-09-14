require('dotenv').config();
const { connectDB } = require('./db/db');
const Product = require('./models/product');

const jsonProducts = require('./product.json');

const start = async () => {
    try {
        const URL = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@ac-g4jgilm-shard-00-00.hzdipzw.mongodb.net:27017,ac-g4jgilm-shard-00-01.hzdipzw.mongodb.net:27017,ac-g4jgilm-shard-00-02.hzdipzw.mongodb.net:27017/${process.env.DATABASE_NAME}?ssl=true&replicaSet=atlas-11ek8w-shard-0&authSource=admin&retryWrites=true&w=majority`;

        await connectDB(URL);
        await Product.deleteMany();
        await  Product.create(jsonProducts);
        console.log("sucess")
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

start();