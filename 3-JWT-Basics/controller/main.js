


const loginPageData = (req, res) => {
    res.status(200).send("Welcome to loginPageData")
}

const registrationPageData = (req, res) => {
    res.status(200).send("Welcome to registrationPageData")
}

const dashboardPageData = (req, res) => {
    res.status(200).send("Welcome to dashboardPageData")
}
 
module.exports = {
    loginPageData,
    registrationPageData,
    dashboardPageData
}