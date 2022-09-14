
const getAllProduct = (req, res) =>{
    throw Error("testing error")
    res.send("Welcome to All products.")
}

const getAllStaticProduct = (req, res) =>{
    res.send("Welcome to All Static products.")
}

module.exports ={
    getAllProduct,
    getAllStaticProduct
}