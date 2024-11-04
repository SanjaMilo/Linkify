import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel.js';

export const requireAuth = async (err, req, res, next) => {
    // request headers Authorization
    const tokenWithBearer = req.headers.authorization;

    const token = tokenWithBearer.split(" ")[1]; // part of the sting after 'Bearer' and the empty string (split argument " ")

    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expired. Please log in again.' });
    }
    next(err);

    if (token) {
        const { _id } = jwt.verify(token, process.env.SECRET); 
        // Attaching the "user" property on the request object
        req.user = await UserModel.findOne({ _id });

        const currentDate = new Date();
    
        if (req.user.firstRequestDate) {
            const daysSinceFirstRequest = (currentDate - req.user.firstRequestDate) / (1000 * 60 * 60 * 24);
            if (daysSinceFirstRequest > 30) {
                return res.status(403).json({ message: "Request period has expired." });
            }
        } else {
            req.user.firstRequestDate = currentDate; // Set the "firstRequestDate" property's value 
        }

        next();

    } else {
        return res.status(401).json({error: 'Request is not authorized!'});
    }
};
