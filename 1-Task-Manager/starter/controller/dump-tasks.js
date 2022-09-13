// PostMan APIS with modified responses

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
        res.status(500).json({status: false, message: error})
    }    
 }
 
 const getTasksData = async(req, res) =>{
    try {
        const {id: taskId} = req.params;
        const getTaskById = await tasksModel.findOne({_id : taskId})
        if(!getTaskById){
            return res.status(404).json({status: false, message: `No tasks with the ${taskId}`}) 
        }
        res.status(200).json({status: true, data: getTaskById})
    } catch (error) {
        res.status(500).json({status: false, message: error})
    }
 }

 const updateTasksData = async(req, res) =>{
    try {
        const {id: taskId} = req.params;
        const {name, completed} = req.body;
        
        const updateTask = await tasksModel.findOneAndUpdate({_id: taskId}, req.body,
            {
                new: true,
                runValidators: true
            });

        if(!updateTask){
            return res.status(404).json({status: false, message: `No tasks with the ${taskId}`}) 
        }
        res.status(200).json({status: true, data: updateTask });
    } catch (error) {
        res.status(500).json({status: false, message: error }) 
    }
 }

 const deleteTasksData = async(req, res) =>{
    try {
        const {id: taskId} = req.params;
        const deleteTask = await tasksModel.findOneAndDelete({_id : taskId})
        if(!deleteTask){
            return res.status(404).json({status: false, message: `No tasks with the ${taskId}`}) 
        }
        res.status(200).json({status: true, data: deleteTask})
    } catch (error) {
        res.status(500).json({status: false, message: error})
    }
 }

 module.exports = {
    getAllTasksData,
    getTasksData,
    createTasksData,
    updateTasksData,
    deleteTasksData
 }