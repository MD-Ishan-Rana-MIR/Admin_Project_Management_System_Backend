import express from "express";
import { login, userCreate } from "./auth.controller";


const authRouter = express.Router();

authRouter.post("/create-user",userCreate);
authRouter.post("/login",login);



export default authRouter;