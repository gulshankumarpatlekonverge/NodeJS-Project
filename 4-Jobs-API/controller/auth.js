const userData = require('../models/auth');
const { StatusCodes } = require('http-status-codes');
const {BadRequest} = require('../errors');
const bcrypt = require('bcryptjs');


const registerController = async (req, res) => {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const tempUser = { name, email, password: hashedPassword};
    const user = await userData.create({...tempUser})
    res.status(StatusCodes.CREATED).json({ user })
}

const loginController = (req, res) => {
   res.status(200).send("Login");
}



module.exports ={
    loginController,
    registerController
}