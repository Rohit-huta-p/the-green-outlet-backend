const ProductModel = require("../models/ProductModel");

const addProduct = async (req, res) => {
    console.log("In ADD Products");
    
    try {
        const imageUrl = req.file ? req.file.path : ''; 
        console.log(imageUrl);
        
        const product = await ProductModel.create({...req.body, image: imageUrl});
        console.log(product);
        
        res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating product" });
    }
}


const get_all_products_by_id = async (req, res) => {
    try {
        const products = await ProductModel.find({addedBy: req.params.storeId});
        res.status(200).json({ message: "Products fetched successfully", products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching products" });
    }
}

module.exports = {
    addProduct,
    get_all_products_by_id
}