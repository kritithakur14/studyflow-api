import express from "express";
import isAuth from "../middleware/isAuth.js";
import { getUserProfile } from "../controllers/userController.js";

let userRouter = express.Router()
userRouter.get("/profile", isAuth, getUserProfile)

export default userRouter;