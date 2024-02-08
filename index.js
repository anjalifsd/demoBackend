const express = require('express');
const connectDB = require('./db');
const authRoutes = require('./src/routes/auth');
const userRoutes = require('./src/routes/user');
const productRoutes = require('./src/routes/product')
const app = express();
const cors= require("cors");
app.use(cors());
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Parse JSON request body
app.use(express.json());
app.get("/", (req,res)=>{
    res.json("hey, I'm working:)")
})
// Define authentication routes
app.use('/auth', authRoutes);

// Define user routes
app.use('/api/user', userRoutes);

// Define product routes
app.use("/api/products",productRoutes)

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
