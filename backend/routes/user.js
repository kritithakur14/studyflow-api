import express from "express";
import isAuth from "../middleware/isAuth.js";
import { getUserProfile, getAllUsers, deleteUser } from "../controllers/userController.js";

let userRouter = express.Router();
userRouter.get("/profile", isAuth, getUserProfile);
userRouter.get("/", isAuth, getAllUsers);
userRouter.delete("/:id", isAuth,  deleteUser);

export default userRouter;
