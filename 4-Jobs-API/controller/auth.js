const userData = require('../models/auth');
const { StatusCodes } = require('http-status-codes');
const {BadRequest} = require('../errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const registerController = async (req, res) => {
    
    const user = await userData.create({...req.body})
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ user:{ user: user.name }, token })
}

const loginController = (req, res) => {
   res.status(200).send("Login");
}



module.exports ={
    loginController,
    registerController
}