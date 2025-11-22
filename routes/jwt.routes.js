import express from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();


const router = express.Router();

router.post('/', (req, res) => {
    try {
    const { email, uid } = req.body;    
    if(!email || !uid) {
        return res.status(400).json({ message: "Email or UID not available" });
    }

    const token = jwt.sign({ uid, email }, process.env.JWT_SECRET);

    if(token) res.cookie("token", token, {
        httpOnly: true,
    });

    res.json({ message: "Token issued successfully" });
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
})


export default router;