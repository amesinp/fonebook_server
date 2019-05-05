import 'dotenv/config';
import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const token = req.headers["x-private-access-token"];
    
    if (!token) return res.status(401).send("Access denied");

    try {
        req.user = jwt.verify(token, process.env.PRIVATE_KEY_ADMIN);
        next();
    }
    catch (err) {
        return res.status(400).send("Invalid or expired token");
    }
}