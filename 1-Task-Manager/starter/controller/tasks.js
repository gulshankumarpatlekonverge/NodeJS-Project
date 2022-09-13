const tasksModel = require('../models/tasks')

// routes functions 
 const getAllTasksData = async(req, res) =>{
    const getTask = await tasksModel.find({});
    res.status(200).json({ status: true, data : getTask})
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
 
 const getTasksData = async(req, res) =>{
    try {
        const {id: taskId} = req.params;
        const getTaskById = await tasksModel.findOne({_id : taskId})
        if(!getTaskById){
            return res.status(404).json({status: false, Message: `No tasks with the ${taskId}`}) 
        }
        res.status(200).json({status: true, data: getTaskById})
    } catch (error) {
        res.status(500).json({status: false, Message: error})
    }
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