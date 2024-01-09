import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import connectDB from './config/db.js';
import productRoutes from './Routes/productRoutes.js';
import userRoutes from './Routes/userRoutes.js';
import { notFound,errorHandler } from './middleware/errorMiddleware.js';


// mongoose data base connection
connectDB();

const PORT = process.env.PORT || 5001;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));


// productRoutes is a middleware
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// error handling middleware
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})