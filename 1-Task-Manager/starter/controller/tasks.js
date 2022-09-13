// routes functions 
 const getAllTasksData = (req, res) =>{
    res.send("Get All Task");
 }

 const createTasksData = (req, res) =>{
    res.send("Create A Task");
 }
 
 const getTasksData = (req, res) =>{
    res.send("Get Single Task");
 }

 const updateTasksData = (req, res) =>{
    res.send("Update Task");
 }

 const deleteTasksData = (req, res) =>{
    res.send("Delete Task");
 }

 module.exports = {
    getAllTasksData,
    getTasksData,
    createTasksData,
    updateTasksData,
    deleteTasksData
 }