const productData = require('../models/product');

const getAllStaticProduct = async (req, res) =>{
    const products = await productData.find({}).select('name price');
    // find({ name: 'vase table', featured: true})
    res.status(200).json({ products, nbHits: products.length })
}

const  getAllProduct = async (req, res) =>{
    const queryObject = {};
    const { featured, company, name, sort, fields } = req.query;

    if(featured) {
        queryObject.featured = featured === 'true' ? true : false;  
    }
    if(company) {
        queryObject.company = company ;
    }
    if(name){
        queryObject.name = { $regex: name, $options: 'i'}
    }
    let result = productData.find(queryObject);
    // sort
    if(sort){
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList)
    } else{
        result = result.sort('createdAt')
    }

    // select
    if(fields){
        const fieldsList = fields.split(',').join(' ');
        result = result.select(fieldsList)
    }
    const products = await result;
    res.status(200).json({ products , nbHits: products.length })
}

module.exports ={
    getAllProduct,
    getAllStaticProduct
}