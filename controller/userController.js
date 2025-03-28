const UserModel = require("../models/userModel");
const ThriftStoreModel = require("../models/thriftStoreModel"); 


const register = async (req, res) => {
    console.log(req.body);
    
    try {
        const user = await UserModel.find({ email: req.body.email });
        console.log(user);
        
        if (user.length > 0) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const hashedPassword = await UserModel.encyptPassword(req.body.password);
        const newUser = await UserModel.create({ ...req.body, password: hashedPassword });
        if(newUser.role == "store") {
            await ThriftStoreModel.create({ owner: newUser._id });
        }
        res.status(201).json({ message: "User created successfully", user: newUser });

    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: "Error creating user" });
    }
}

const login = async (req, res) => {
    
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isMatch = await UserModel.comparePassword(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        let store;
        if(user.role === 'store') {
            store = await ThriftStoreModel.findOne({ owner: user._id });
        }

        
        const token = await UserModel.generateToken(user, store);
        console.log({ message: "User logged in successfully", token });
        
        res.status(200).json({ message: "User logged in successfully", token });
        
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: "Error logging in" });
        
    }
}


module.exports = {
    register,
    login
}