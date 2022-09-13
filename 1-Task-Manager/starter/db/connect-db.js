const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://patlegulshanknkonverge:patlegulshankn@nodeexpressprojects.hzdipzw.mongodb.net/1-TASK-MANAGER?retryWrites=true&w=majority&ssl=true';

// Lower version of node in MongoDB 2.2.12 and later
// 'mongodb://patlegulshanknkonverge:patlegulshankn@ac-g4jgilm-shard-00-00.hzdipzw.mongodb.net:27017,ac-g4jgilm-shard-00-01.hzdipzw.mongodb.net:27017,ac-g4jgilm-shard-00-02.hzdipzw.mongodb.net:27017/?ssl=true&replicaSet=atlas-11ek8w-shard-0&authSource=admin&retryWrites=true&w=majority';

// to use higher version you need VPN open to establish the connect 

// 'mongodb+srv://patlegulshanknkonverge:patlegulshankn@nodeexpressprojects.hzdipzw.mongodb.net/1-TASK-MANAGER?retryWrites=true&w=majority'

// 'mongodb+srv://patlegulshanknkonverge:patlegulshankn@nodeexpressprojects.hzdipzw.mongodb.net/1-TASK-MANAGER?retryWrites=true&w=majority&ssl=true'

mongoose.connect(connectionString
    /*these are not supported in current version*/
    // ,{
    //     useNewUrlParse: true,
    //     useCreateIndex: true,
    //     useFindAndModify: false,
    //     useUnifiedTopology: true
    // }
).then(() => {
    console.log('Connected to the Database');
}).catch((err) => {
    console.log(err)
});