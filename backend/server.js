import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import products from './data/products.js';

// mongoose data base connection
connectDB();

const PORT = process.env.PORT || 5001;
const app = express();

app.get('/', (req, res) => {
    res.send('Server is ready');
}
);

app.get('/api/products', (req, res) => {
    res.json(products);
})

app.get('/api/products/:id', (req, res) => {
    const product = products.find((id) => id._id === req.params.id);
    res.json(product);
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})