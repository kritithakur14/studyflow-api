import express from "express";
import isAuth from "../middleware/isAuth.js";
import { getUserProfile, getAllUsers } from "../controllers/userController.js";

let userRouter = express.Router();
userRouter.get("/profile", isAuth, getUserProfile);
userRouter.get("/", isAuth, getAllUsers);

export default userRouter;
