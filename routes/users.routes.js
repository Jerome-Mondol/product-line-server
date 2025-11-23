import express from 'express'
import { getDB } from '../mongo.js';
const router = express.Router();

router.post('/create-user', async (req, res) => {
    try {
    const { displayName, email, uid } = req.body;
    if(!displayName || !email || !uid) res.status(400).json({ message: "Missing credentials" });
    const db = getDB();


    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
        return;
    }


    const user = await db.collection('users').insertOne({
        name: displayName,
        email,
        firebaseUid: uid,
        createdAt: new Date().toISOString()
    })

    res.status(200).send(user)
    }
    catch (err) {
        res.status(400).json({ message: "Internal server error" })
    }
})

router.post('/logout', (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
        })
        res.status(200).json({ message: "Token removed successfully" })
    }
    catch(err) {
        res.status(500).json({ message: "Internal server error" })
    }
})

export default router;