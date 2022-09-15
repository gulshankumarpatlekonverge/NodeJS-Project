const userData = require('../models/auth');
const { StatusCodes } = require('http-status-codes');
const {BadRequest, UnauthenticatedError} = require('../errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const registerController = async (req, res) => {
    
    const user = await userData.create({...req.body})
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ user:{ user: user.name }, token })
}

const loginController = async (req, res) => {
   const { email, password } = req.body;

   if(!email || !password){
    throw new BadRequest("please Provide Email and Password");
   }

   const user = await userData.findOne({email});
   if(!user){
    throw new UnauthenticatedError('Invalid Credential');
   }
   
   const isPasswordCorrect = await user.comparePassword(password);
   if(!isPasswordCorrect){
    throw new UnauthenticatedError('Invalid Credential');
   }
   const token = user.createJWT();
   res.status(StatusCodes.OK).json({ user:{ user: user.name }, token })
}



module.exports ={
    loginController,
    registerController
}