const mongoose = require("mongoose");


const ProductSchema = new mongoose.Schema(
    {
      addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "ThriftStore", required: true },
      name: { type: String, },
      description: { type: String },
      price: { type: Number, },
      category: { type: String,}, 
      image: { type: String }, 
      stock: { type: Number,  default: 1 }, 
      status: { type: String, enum: ["available", "sold"], default: "a`vailable" }, 
      createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
  );
  
  const ProductModel = module.exports = mongoose.model("Product", ProductSchema);
  module.exports = ProductModel;
  