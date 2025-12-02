import express from "express";
import isAuth from "../middleware/isAuth.js";
import { getRecentActivity } from "../controllers/activityController.js";

const router = express.Router();
router.get("/", isAuth, getRecentActivity);

export default router;
