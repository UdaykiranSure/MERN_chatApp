import express from 'express';
import protectRoute from "../middleware/protectRoute.js"
import getUsersforSidebar from "../controller/user.controller.js"

const router = express.Router();

router.get("/",protectRoute,getUsersforSidebar);

export default router;
