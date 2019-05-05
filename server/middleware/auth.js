import 'dotenv/config';
import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const token = req.headers['x-access-token'] || req.headers['authorization'];
    
    if (!token) return res.status(401).send("User not logged in");

    try {
        req.user = jwt.verify(token, process.env.PRIVATE_KEY);
        next();
    }
    catch (err) {
        return res.status(400).send("Could not authenticate user");
    }
}