const productData = require('../models/product');

const getAllStaticProduct = async (req, res) =>{
    const products = await productData.find({}).sort('-name').select('name price')
    //.limit(10).skip(5);
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

    // limit and skip - pagination
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    const products = await result;
    res.status(200).json({ products , nbHits: products.length })
}

module.exports ={
    getAllProduct,
    getAllStaticProduct
}