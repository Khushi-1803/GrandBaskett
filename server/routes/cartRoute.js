import express from "express";  // Import express, not mongoose
import authUser from "../middleware/authUser.js";
import { updateCart } from "../controllers/cartController.js";

const cartRouter = express.Router();  // Create router using express.Router()

cartRouter.post('/update', authUser, updateCart);

export default cartRouter;
