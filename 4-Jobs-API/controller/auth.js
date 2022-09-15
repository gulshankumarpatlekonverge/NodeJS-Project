
const loginController = (req, res) => {
    return res.status(200).send("Login");
}

const registerController = (req, res) => {
    return res.status(200).send("Registration")
}

module.exports ={
    loginController,
    registerController
}