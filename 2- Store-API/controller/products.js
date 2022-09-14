const productData = require('../models/product');

const getAllStaticProduct = async (req, res) =>{
    const products = await productData.find({});
    // find({ name: 'vase table', featured: true})
    res.status(200).json({ products, nbHits: products.length })
}

const  getAllProduct = async (req, res) =>{
    const queryObject = {};
    const { featured, company, name } = req.query;

    if(featured) {
        queryObject.featured = featured === 'true' ? true : false;  
    }
    if(company) {
        queryObject.company = company ;
    }
    if(name){
        queryObject.name = { $regex: name, $options: 'i'}
    }
    const products = await productData.find(queryObject);
    res.status(200).json({ products , nbHits: products.length })
}

module.exports ={
    getAllProduct,
    getAllStaticProduct
}