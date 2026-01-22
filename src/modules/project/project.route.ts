import express from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { createProject } from "./project.controller";

const projectRoute = express.Router();

projectRoute.post("/projects",authMiddleware,createProject);



export default projectRoute;