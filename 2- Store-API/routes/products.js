const express = require('express');
const router = express.Router();

const {
    getAllProduct,
    getAllStaticProduct
} = require('../controller/products');

router.get('/', getAllProduct)

router.get('/static', getAllStaticProduct)

module.exports = router;
