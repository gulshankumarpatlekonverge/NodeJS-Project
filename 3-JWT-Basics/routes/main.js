const express = require('express');
const router = express.Router();
const {
    loginPageData,
    registrationPageData,
    dashboardPageData
} = require('../controller/main');

router.post('/login', loginPageData);
router.post('/register', registrationPageData);
router.get('/dashboard', dashboardPageData)



module.exports = router;




