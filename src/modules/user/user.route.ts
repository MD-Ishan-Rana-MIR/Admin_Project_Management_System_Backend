
import express from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { requireRole } from '../../middlewares/roleMiddleware';
import { getALLUsers } from './user.controller';


const userRouter = express.Router();


userRouter.get("/users-pagination", authMiddleware, requireRole("ADMIN"), getALLUsers);



export default userRouter;