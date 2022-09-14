const tasksModel = require('../models/tasks');
const asyncWrapper = require('../middleware/async');
const {customAPIError, createCustomError} = require('../error/custom-error');
// routes functions 
 const getAllTasksData = asyncWrapper(async(req, res) =>{
  
        const tasks = await tasksModel.find({});
        res.status(200).json({ tasks });
      
 })

 const createTasksData = asyncWrapper(async(req, res) =>{
 
        const task = await tasksModel.create({
            name: req.body.name,
            completed : req.body.completed
        }) 
        res.status(200).json({ task })
  
 })
 
 const getTasksData = asyncWrapper(async(req, res) =>{
    
        const {id: taskId} = req.params;
        const task = await tasksModel.findOne({_id : taskId})
        if(!task){
            return next(createCustomError(`No tasks with the ${taskId}`, 404));
        }
        res.status(200).json({ task })
   
 })

 const updateTasksData = asyncWrapper(async(req, res) =>{
  
        const {id: taskId} = req.params;
        const {name, completed} = req.body;
        
        const task = await tasksModel.findOneAndUpdate({_id: taskId}, req.body,
            {
                new: true,
                runValidators: true
            });

        if(!task){
            return next(createCustomError(`No tasks with the ${taskId}`, 404));
        }
        res.status(200).json({ task });
    
 })

 const deleteTasksData = asyncWrapper(async(req, res) =>{
   
        const {id: taskId} = req.params;
        const task = await tasksModel.findOneAndDelete({_id : taskId})
        if(!task){
            return next(createCustomError(`No tasks with the ${taskId}`, 404));
        }
        res.status(200).json({ task })
    
 })

 module.exports = {
    getAllTasksData,
    getTasksData,
    createTasksData,
    updateTasksData,
    deleteTasksData
 }