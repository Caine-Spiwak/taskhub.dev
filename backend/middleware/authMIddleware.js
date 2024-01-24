import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

// Protect Routes 
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read the jwt from cookie 
  token = req.cookies.jwt

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select('-password');
      next()
    } catch (error) {
      console.log(error)
      res.status(401);
      throw new Error('Not Authorized, Token Failed');
    }
  } else {
      res.status(401)
      throw new Error('Not Authorized, No Token')
  }
})

// Admin Middleware
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401);
    throw new Error('Not Authorized as Admin')
  }
}

export { protect, admin }