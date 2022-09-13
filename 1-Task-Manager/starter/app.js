const express = require('express');
const app = express();
const taskRoutes = require('./routes/tasks');

// middleware
app.use(express.json());

app.use(express.static('./public'));

app.use('/api/v1/tasks', taskRoutes);

app.listen(3000, ()=>{
    console.log("Server Listening on Port 3000");
});