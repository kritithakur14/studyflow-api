import express from "express";
import isAuth from "../middleware/isAuth.js";
import { getUserStats } from "../controllers/statsController.js";

const statsRouter = express.Router();

statsRouter.get("/overview", isAuth, getUserStats);

export default statsRouter;
