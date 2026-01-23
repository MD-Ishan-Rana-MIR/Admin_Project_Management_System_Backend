import express from "express";
import { login, userCreate, userProfile } from "./auth.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";


const authRouter = express.Router();

authRouter.post("/create-user", userCreate);

authRouter.post("/auth/login", login);


authRouter.get("/user-profile", authMiddleware,userProfile);


export default authRouter;