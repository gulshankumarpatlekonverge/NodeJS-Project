const CustomAPIError = require('../errors/custom-error')
const jwt = require('jsonwebtoken');
require('dotenv').config();

const loginPageData = (req, res) => {
    const {username, password} = req.body;

    if(!username || !password){
        throw new CustomAPIError('Please Provide Email and Password', 400);
    } 
    const id = new Date().getDate();
    const token = jwt.sign({
        id, username
    }, process.env.JWT_SECRET, {expiresIn: '30d'});

    res.status(200).json({msg: 'User Created.', token});
}

const dashboardPageData = (req, res) => {
    console.log(req.headers);
    const randomNumber = Math.floor(Math.random() * 100);
    res.status(200).json({msg: `Hello, Gulshan`, secret: `Here is your authorized data, your number is ${randomNumber}`});
}
 
const registrationPageData = (req, res) => {
    res.status(200).send("Welcome to registrationPageData")
}

module.exports = {
    loginPageData,
    registrationPageData,
    dashboardPageData
}