const userData = require('../models/auth');
const { StatusCodes } = require('http-status-codes');
const {BadRequest} = require('../errors');
const bcrypt = require('bcryptjs');


const registerController = async (req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password){
        throw new BadRequest('Please Provide Name, Emai, Password');
    }
    const user = await userData.create({...req.body})
    res.status(StatusCodes.CREATED).json({ user })
}

const loginController = (req, res) => {
   res.status(200).send("Login");
}



module.exports ={
    loginController,
    registerController
}