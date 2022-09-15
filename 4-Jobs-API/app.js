const express = require('express');
const app = express();
require('dotenv').config();
require('express-async-errors');
const { connectDB } = require('./db/db')
const authenticateUser = require('./middleware/auth')

const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// extra security packages

const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

app.set('trust proxy', 1);
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
}));

// Swagger
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

app.use(express.json());
app.use(express.static('./public'))
app.use(errorHandlerMiddleware); 
app.use(helmet());
app.use(cors());
app.use(xss())




const authenticationRoutes = require('./routes/auth');
const jobsRoutes = require('./routes/jobs');

// routes
app.use('/api/v1/auth', authenticationRoutes)
app.use('/api/v1/jobs', authenticateUser, jobsRoutes);

app.get('/', (req, res) => {
    res.send('<h1>Jobs API</h1><a href="/api-docs">Documentation</a>');
  });
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(notFound);

const PORT = process.env.PORT || 5000;

const start = async() => {
    try{
        const URL = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@ac-g4jgilm-shard-00-00.hzdipzw.mongodb.net:27017,ac-g4jgilm-shard-00-01.hzdipzw.mongodb.net:27017,ac-g4jgilm-shard-00-02.hzdipzw.mongodb.net:27017/4-JOB-API?ssl=true&replicaSet=atlas-11ek8w-shard-0&authSource=admin&retryWrites=true&w=majority`;

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
