import express from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { allProjects, createProject, projectDelte, projectUpdate } from "./project.controller";
import { requireRole } from "../../middlewares/roleMiddleware";

const projectRoute = express.Router();

projectRoute.post("/projects",authMiddleware,createProject);
projectRoute.get("/projects",allProjects);
projectRoute.post(`/projects/:id`, authMiddleware,requireRole("ADMIN"),projectDelte);
projectRoute.put("/project-update/:id", authMiddleware,requireRole("ADMIN"),projectUpdate);


export default projectRoute;