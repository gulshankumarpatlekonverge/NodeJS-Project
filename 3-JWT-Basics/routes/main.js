const express = require('express');
const router = express.Router();
const {
    loginPageData,
    registrationPageData,
    dashboardPageData
} = require('../controller/main');

const authorizationMiddleware = require('../middleware/auth');

router.post('/login', loginPageData);

router.get('/dashboard', authorizationMiddleware, dashboardPageData)

router.post('/register', registrationPageData);

module.exports = router;




