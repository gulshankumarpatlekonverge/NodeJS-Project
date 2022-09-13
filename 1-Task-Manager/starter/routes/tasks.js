const express = require('express');
const router = express.Router();
const {
    getAllTasksData,
    getTasksData,
    createTasksData,
    updateTasksData,
    deleteTasksData
    } = require('../controller/tasks');

router.get('/', getAllTasksData);
router.get('/:id', getTasksData);
router.post('/', createTasksData);
router.patch('/:id', updateTasksData);
router.delete('/:id', deleteTasksData);

module.exports = router;


// ways to setting up the routes

// router.get('/', (req, res) =>{
//     res.send("Hello World");
// })

// router.route('/').get((req, res) =>{
//     res.send("Hello World");
// })


