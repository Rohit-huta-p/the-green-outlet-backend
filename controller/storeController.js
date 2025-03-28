const ThriftStoreModel = require("../models/thriftStoreModel");


const get_store_details = async (req, res) => {
    const {userId} = req.user;

    try {
        const store = await ThriftStoreModel.findOne({owner: userId});
        console.log(store);
        res.status(200).json({ message: "Thrift Store fetched successfully", store });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Thrift Store fetched successfully", store });

    }
}

const updateStore = async (req, res) => {
    const {userId} = req.user;
    try {
        console.log(req.body);
        
        let store = await ThriftStoreModel.findOne({owner: userId});
        if(!store){
            store = await ThriftStoreModel.create({...req.body, owner: userId});
        }
        res.status(201).json({ message: "Thrift Store Updated successfully", store});
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: "Error creating store" });
        
    }
}



module.exports = {
    get_store_details,
    updateStore
} 