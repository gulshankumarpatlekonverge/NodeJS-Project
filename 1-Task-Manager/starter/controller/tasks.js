const tasksModel = require('../models/tasks')

// routes functions 
 const getAllTasksData = (req, res) =>{
    res.send("Get All Task");
 }

 const createTasksData = async(req, res) =>{
    try {
        const task = await tasksModel.create({
            name: req.body.name,
            completed : req.body.completed
        }) 
        res.status(200).json({ status: true, data : task})
    } catch (error) {
        res.status(500).json({status: false, Message: error})
    }    
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