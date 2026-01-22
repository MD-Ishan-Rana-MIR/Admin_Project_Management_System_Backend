import express from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { requireRole } from "../../middlewares/roleMiddleware";
import { inviteUser, inviteUserRegistration } from "./invite.controller";
const inviteRouter = express.Router();

inviteRouter.post("/auth/invite", authMiddleware, requireRole("ADMIN"), inviteUser);
inviteRouter.post("/auth/register-via-invite", inviteUserRegistration);

export default inviteRouter;