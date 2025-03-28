const mongoose = require("mongoose");

const ThriftStoreSchema = new mongoose.Schema(
    {
      owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
      storeName: { type: String,  },
      storeLogo: { type: String }, 
      description: { type: String },
      contactNumber: { type: String,  },
      address: {
        type: String
      },
      createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
  );
  
const ThriftStoreModel = module.exports = mongoose.model("ThriftStore", ThriftStoreSchema);
module.exports = ThriftStoreModel;
  