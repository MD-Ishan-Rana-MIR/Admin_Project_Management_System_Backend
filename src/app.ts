import express, { Request, Response } from "express";
import authRouter from "./modules/auth/auth.route";
import inviteRouter from "./modules/invite/invite.route";

const app = express();





app.use(express.json());

app.use(express.urlencoded({ extended: true }));










app.get("/", async (_req: Request, res: Response) => {
  res.status(200).json({
    status : "success",
    msg: "Server is running successfully",
  });
});



// router 

app.use("/api/v1",authRouter);


// invite router 

app.use("/api/v1",inviteRouter);




export default app;
