import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';

// mongoose data base connection
connectDB();

const PORT = process.env.PORT || 5001;
const app = express();
app.use(express.json());


// productRoutes is a middleware
app.use('/api/products', productRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})