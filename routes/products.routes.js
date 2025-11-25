import express from 'express'
import { getDB } from '../mongo.js';
import { verifyToken } from '../middlewares/verifyJWT.middleware.js';

const router = express.Router();

router.post('/add-products', verifyToken, async (req, res) => {
    try {
        const { formData } = req.body;
        const db = getDB()
        if(!formData) return res.status(400).json({ message: "Missing credentials" });
        
        const product = await db.collection('products').insertOne(formData);

        res.json(product);

    }
    catch(err) {
        res.status(500).json({ message: "internal server error" });
    }
})

router.get('/all-products', async (req, res) => {
    try {
        const db = getDB();
        const products = await db.collection('products').find({ }).toArray();

        res.json(products);
    }
    catch(err) {
        res.status(500).json({ message: "internal server error" })
    }
})



export default router;
