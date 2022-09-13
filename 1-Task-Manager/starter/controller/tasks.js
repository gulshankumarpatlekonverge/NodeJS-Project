const tasksModel = require('../models/tasks')

// routes functions 
 const getAllTasksData = async(req, res) =>{
    try {
        const tasks = await tasksModel.find({});
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ msg: error})
    }   
 }

 const createTasksData = async(req, res) =>{
    try {
        const task = await tasksModel.create({
            name: req.body.name,
            completed : req.body.completed
        }) 
        res.status(200).json({ task })
    } catch (error) {
        res.status(500).json({ error })
    }    
 }
 
 const getTasksData = async(req, res) =>{
    try {
        const {id: taskId} = req.params;
        const task = await tasksModel.findOne({_id : taskId})
        if(!task){
            return res.status(404).json({msg: `No tasks with the ${taskId}`}) 
        }
        res.status(200).json({ task })
    } catch (error) {
        res.status(500).json({ error })
    }
 }

 const updateTasksData = async(req, res) =>{
    try {
        const {id: taskId} = req.params;
        const {name, completed} = req.body;
        
        const task = await tasksModel.findOneAndUpdate({_id: taskId}, req.body,
            {
                new: true,
                runValidators: true
            });

        if(!task){
            return res.status(404).json({msg: `No tasks with the ${taskId}`}) 
        }
        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ error }) 
    }
 }

 const deleteTasksData = async(req, res) =>{
    try {
        const {id: taskId} = req.params;
        const task = await tasksModel.findOneAndDelete({_id : taskId})
        if(!task){
            return res.status(404).json({msg: `No tasks with the ${taskId}`}) 
        }
        res.status(200).json({ task })
    } catch (error) {
        res.status(500).json({ error })
    }
 }

 module.exports = {
    getAllTasksData,
    getTasksData,
    createTasksData,
    updateTasksData,
    deleteTasksData
 }