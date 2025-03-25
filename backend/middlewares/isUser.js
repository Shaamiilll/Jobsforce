import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const isUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Bearer
  console.log(token);
  

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token using secret
    console.log(decoded);
    
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    req.user = user; // Attach user to request object
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

export default isUser;
