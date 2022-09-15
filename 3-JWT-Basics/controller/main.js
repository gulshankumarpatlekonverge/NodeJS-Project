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
    const authHeaders = req.headers.authorization;

    if(!authHeaders || !authHeaders.startsWith('Bearer ')){
        throw new CustomAPIError({msg: 'No JWT Token Provided'}, 401)
    }

    const token = authHeaders.split(' ')[1];
    console.log(token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded)
        const randomNumber = Math.floor(Math.random() * 100);

        res.status(200).json({msg: `Hello, ${decoded.username}`, secret: `Here is your authorized data, your number is ${randomNumber}`});
    } catch (error) {
        throw new CustomAPIError('Not authorized to access this route', 401);
    }

}
 
const registrationPageData = (req, res) => {
    res.status(200).send("Welcome to registrationPageData")
}

module.exports = {
    loginPageData,
    registrationPageData,
    dashboardPageData
}