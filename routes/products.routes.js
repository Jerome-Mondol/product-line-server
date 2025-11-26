import express from 'express'
import { getDB } from '../mongo.js';
import { verifyToken } from '../middlewares/verifyJWT.middleware.js';
import { ObjectId } from 'mongodb';

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

router.post('/my-products', async (req, res) => {
  const userEmail = req.body.email;
  const db = getDB();

  try {
    const result = await db.collection('products').find({ sellerEmail: userEmail }).toArray();

    res.send(result);
  }
  catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }

})


router.get('/:id', async (req, res) => {
  const { id } = await req.params;
  const db = getDB();

  try {
    // Validate if id is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const product = await db.collection('products').findOne({ _id: new ObjectId(id) });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});




export default router;
