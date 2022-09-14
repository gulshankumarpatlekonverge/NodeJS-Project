const productData = require('../models/product');

const getAllStaticProduct = async (req, res) =>{
    const products = await productData.find({});
    // find({ name: 'vase table', featured: true})
    res.status(200).json({ products, nbHits: products.length })
}

const  getAllProduct = async (req, res) =>{
    const products = await productData.find(req.query);
    res.status(200).json({ products , nbHits: products.length })
}

module.exports ={
    getAllProduct,
    getAllStaticProduct
}