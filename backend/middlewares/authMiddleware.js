import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";
import Bus from "../models/busModel.js";

const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  // Read JWT from 'jwt' cookie
  token = req.cookies.jwt;
  // console.log(`token from authMiddleware => `, token);

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("User not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("User not authorized, no token");
  }
});

const authenticateBus = asyncHandler(async (req, res, next) => {
  let token;

  // Read JWT from 'busJwt' cookie
  token = req.cookies.bus_jwt;
  // console.log(`token from authMiddleware => `, token);

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(`decoded => `, decoded);
      req.bus = await Bus.findById(decoded.busId).select("-password");
      // console.log(`req.bus => `, req.bus);
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized as bus, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized as bus, no token");
  }
});

// Check admin authentication
const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not authorized as admin!!!");
  }
};

export { authenticate, authenticateBus, authorizeAdmin };
