import express, { Request, Response } from "express";
import cors from "cors";
import authRouter from "./modules/auth/auth.route";
import inviteRouter from "./modules/invite/invite.route";
import { config } from "./config/config";
import userRouter from "./modules/user/user.route";

const app = express();





app.use(express.json());

app.use(express.urlencoded({ extended: true }));



app.use(
  cors({
    origin: config.frontendUrl || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);











app.get("/", async (_req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    msg: "Server is running successfully",
  });
});



// router 

app.use("/api/v1", authRouter);


// invite router 

app.use("/api/v1", inviteRouter);


// user router 


app.use("/api/v1", userRouter);





export default app;
