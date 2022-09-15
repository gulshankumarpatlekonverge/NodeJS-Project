const { BadRequest } = require('../errors')
const jwt = require('jsonwebtoken');
require('dotenv').config();

const loginPageData = (req, res) => {
    const {username, password} = req.body;

    if(!username || !password){
        throw new BadRequest('Please Provide Email and Password');
    } 
    const id = new Date().getDate();
    const token = jwt.sign({
        id, username
    }, process.env.JWT_SECRET, {expiresIn: '30d'});

    res.status(200).json({msg: 'User Created.', token});
}

const dashboardPageData = (req, res) => {
    
    const randomNumber = Math.floor(Math.random() * 100);
    const username = req.user.username;
    res.status(200).json({msg: `Hello, ${username}`, secret: `Here is your authorized data, your number is ${randomNumber}`});

}
 
const registrationPageData = (req, res) => {
    res.status(200).send("Welcome to registrationPageData")
}

module.exports = {
    loginPageData,
    registrationPageData,
    dashboardPageData
}