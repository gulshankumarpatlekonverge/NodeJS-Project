const jobsData = require('../models/jobs');
const {StatusCodes} = require('http-status-codes')
const { BadRequest, NotFoundError } = require('../errors');
const jobs = require('../models/jobs');

const getAllJobs = async (req, res) => {
    const job = await jobsData.find({ createdBy: req.user.userId}).sort('createdAt');
    res.status(StatusCodes.OK).json({ job, counts: job.length })
}

const getJob = async (req, res) => {
    // const job = await jobsData.findOne({_id: req.params.id, createdBy: req.user.userId});

    const { user: {userId}, params: {id:jobID}} = req;

    const job = await jobsData.findOne({_id: jobID, createdBy: userId});

    if(!job) {
        throw new NotFoundError(`No job with id ${jobID}`)
    }

    res.status(StatusCodes.OK).json({ job })
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await jobsData.create(req.body)
    res.status(StatusCodes.CREATED).json({  status: true, message: 'Created Successfully', data:job })
}

const updateJob = async (req, res) => {
    const { user: {userId}, params: {id:jobID}, body: { company, position, status}} = req;

    if(company === '' || position === ''){
        throw new BadRequest('Company or Position fields cannot be empty.')
    }
    const job = await jobsData.findByIdAndUpdate({_id: jobID, createdBy: userId}, req.body, { new: true, runValidators: true});

    if(!job) {
        throw new NotFoundError(`No job with id ${jobID}`)
    }
    res.status(StatusCodes.OK).json({  status: true, message: 'Updated Successfully', data: job });
}

const deleteJob = async (req, res) => {
    const { user: {userId}, params: {id:jobID}} = req;

   
    const job = await jobsData.findByIdAndRemove({_id: jobID, createdBy: userId});

    if(!job) {
        throw new NotFoundError(`No job with id ${jobID}`)
    }
    res.status(StatusCodes.OK).json({ status: true, message: 'Deleted Successfully', data: job });
}

module.exports ={
    getAllJobs,
    getJob,
    createJob, 
    updateJob,
    deleteJob
}