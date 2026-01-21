import express, { Request, Response } from "express";
import authRouter from "./modules/auth/auth.route";

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




export default app;
