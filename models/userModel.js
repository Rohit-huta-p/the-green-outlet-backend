const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, enum: ["customer", "store"], required: true },
    profilePicture: { type: String, default: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKsAAACUCAMAAADbGilTAAAAMFBMVEXk5ueutLenrrHg4+Tn6eqqsLTN0NLT1tjY29zGysy4vcC/xMbJzc/b3t/q7O2xt7pnBWjmAAAD/klEQVR4nO2cW7LbIAxADQiDIcD+d1ucx62TJr6AbIlMOR+dfp4qAiSQO02DwWAwGAwGg8FgMBicAQC3QQkxRmWNMTaoGHs2VmH2Qkqptc5/yuRNyDHmtvoXAHtxQost2dnPtreEgGhdehZ9+CYfIrfeE8G9Fb1H16luQgtqkZ9Vr7pLJ7ZgdoL6kHW2B1lYfhO9MfPLKv9rUH/ygFvVlZmusp45suWqqyynaUVUb7KMaeCrVNec5UqDuBQuqw2GRxasrFYVwrK4qtSgKhxLyhaeAS/oC0MW2PpkvSLpAwvvS8ACyI8EMK2qIpGXMXWnwHNgaU3BtKsKEWhla0+sLcRbQcCEVWjKBgzm5pW1IilPWkCsrBVPGFhoqQQ2JDrVqalq2UK3xUJpj/URukYxItNVCLqau60a3ELXzAS0K1kVCxarKhLVMYsrBm5QtTIwo1U1mesF7Sq/yFWb4XqGK10OfNPa+qY9C+9KdhZ80xmLr100nSug47pQqeZaG+tKV2sjLojuEF4TfVNviE1Y0p4bd5ehSV8NkHdEtJeaqLs32pcjXPlC/RaDWF3UT52YLZb8Pa5926J/7gbTeB4wvBm1bgV64Zgqsl/0xtmWBVQN7Aux4RqWb0Kn9h6Wc+SlsvHSjs00o6pcWVUnqGgT+ccK96Yen1U9t2qmTFbTta47wFyQB8n0MQQLwe+fClr7wP/7PzBiJxFk4hl0+gCAeZ8I+Z/gmObHPgOTWZLWr8PlbjG9zZavwBTWUfjryP51al/7i1U9zuzfyUG0Zs6YoHoM6AZYiSvXv/Upmw1zDoQ1psuNHNr1SxOIXSlff/fFpbc7QUo5a3v4mAdABTv7JPe+L1iXmcj7QWBcZxCVufi0dwpshXX2nQNLgPPu7+ubw+TmibgwAGX97u++E2Dp5kCWDNevnzTiAlYLb0hsP3/9VGWbc+Fs23zqo0UfXE691cimDjtF9hed5vOq2mjR71ovuMs5exioo01XzijDYcIPDbxFHt7e5pbqqCX1ij64b4gnBfXOgbdcOVOPW/3v0IeN8UPx1Uq77EF3nQdMD5bYHvE+d8DQUJks/tXrgFmsUlmHrBBO3gCeZXGRRb6918pi7pKpcvVHtj2yNDvAs2xjygJuoKGNxs961OlHwDvaioMzSsDfSQ3dAn4GqxFX35MrJlWh60sDngxYqZ03pd+uNtS+LqG/zkGgqwLLtrBuVC2viB5wRSEr2kVo/Vb7KCqOWuynj2gqtgL87DiWuTisxKXgG4qLw1Mug+oo3rbqBkPOcS09aNFfvx5A4Rbb8l+hHI4sdGXfBUTxhGTsIAWKx897cC1svLgP2BtFxyzMsgdcUVxVUD1Qojr43/gDTjs3mRf1UggAAAAASUVORK5CYII=" },
    address: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);



  UserSchema.statics.encyptPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.log('Error hashing the password', error);
        throw error;
    }
}

UserSchema.statics.comparePassword = async (password, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        if(isMatch) return true
    } catch (error) {
        console.log("Password does not match", error);
        throw error;
    }
}





UserSchema.statics.generateToken = (user, store) => {
    if(store == null){
        return jwt.sign({ userId: user._id , role: user.role, email: user.email }, process.env.JWT_SECRET, { expiresIn: "2d"} )
    }
    
    
    return jwt.sign({ userId: user._id ,storeId : store._id, role: user.role, email: user.email }, process.env.JWT_SECRET, { expiresIn: "2d"} )
}




const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
