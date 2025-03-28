const express = require('express');
const app = express();

// database
const { mongoose } = require('mongoose');

// essentials
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config()
app.use(express.json());
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true,
    }
));


// routes
const authRoute = require('./routes/authRoute');
const storeRoute = require('./routes/storeRoute');
const productRoute = require('./routes/productRoute');

app.use('/api/auth', authRoute);
app.use('/api/stores', storeRoute);
app.use('/api/products', productRoute);




// SERVER START
app.listen(8000, async () => {
   try {
       await mongoose.connect(process.env.MONGO_URI);
       console.log("Connected to DB");
       console.log("Server is running on port 8000...");
   } catch (error) {
       console.log(error);
   }
});    