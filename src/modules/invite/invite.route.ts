import express from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { requireRole } from "../../middlewares/roleMiddleware";
import { inviteUser } from "./invite.controller";
const inviteRouter = express.Router();

inviteRouter.post("/auth/invite",authMiddleware,requireRole("ADMIN"),inviteUser);

export default inviteRouter;