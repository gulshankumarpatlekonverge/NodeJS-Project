const express = require('express');
const router = express.Router();
const {
    getAllJobs,
    getJob,
    createJob,
    updateJob, 
    deleteJob
} =require('../controller/jobs')

router.get('/', getAllJobs);
router.get('/:id', getAllJobs);
router.post('/', getAllJobs);
router.patch('/:id', getAllJobs);
router.delete('/:id', getAllJobs);


module.exports = router