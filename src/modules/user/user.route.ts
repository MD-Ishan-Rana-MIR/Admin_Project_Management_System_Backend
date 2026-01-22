
import express from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { requireRole } from '../../middlewares/roleMiddleware';
import { getALLUsers, singleUser, updateUserRole, userStatusUpdate } from './user.controller';


const userRouter = express.Router();


userRouter.get("/users-pagination", authMiddleware, requireRole("ADMIN"), getALLUsers);
userRouter.get("/single-user/:id", authMiddleware, requireRole("ADMIN"), singleUser);
userRouter.patch("/users/:id/status", authMiddleware, requireRole("ADMIN"), userStatusUpdate);
userRouter.patch("/users/:id/role", authMiddleware, requireRole("ADMIN"), updateUserRole);



export default userRouter;