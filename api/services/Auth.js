import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

const authMiddleware = (req, res, next) => {
    // Get the token from the request headers
    const token = req.headers.authorization;
    
    

    // Check if token exists
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify the token using the secret key from dotenv
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        

        // Attach the decoded user information to the request object
        req.userId = decoded.userId;
       

        // Call the next middleware or route handler
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

export default authMiddleware;


