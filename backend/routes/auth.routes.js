import express from "express";
import { login, logout, signin } from "../controller/auth.controller.js";

const router = express.Router();
console.log("1")
router.post("/signin", signin);
router.post("/login",login);
router.post("/logout", logout);




export default router;