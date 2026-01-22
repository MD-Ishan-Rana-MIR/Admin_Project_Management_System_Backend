import { Request, Response } from "express";
import userModel from "../user/user.model";
import { errorResponse, successResponse } from "../../config/response";
import crypto from "crypto";
import inviteModel from "./invite.model";
import { config } from "../../config/config";
import { transporter } from "../../utility/mailer";
import { inviteEmailTemplate } from "../../utility/inviteEmailTemplate";


export const inviteUser = async (req:Request,res:Response)=>{
    const {email,role} = req.body;
    try {
        const existsUser = await userModel.findOne({email:email});
        if(existsUser) return errorResponse(res,400,"User email already exists",null);

          const token = crypto.randomBytes(32).toString("hex");

          const invite = await inviteModel.create({
            email,role,token,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24) // 24h
          })
        const inviteLink = `${config.frontendUrl}/accept-invite?token=${token}`;

    // send email 

    await transporter.sendMail({
      from: `<${process.env.EMAIL_USER}>`,
      to: email,
      subject: "You have been invited",
      html: inviteEmailTemplate(inviteLink, role),
    });

    return successResponse(res, 200, "Invitation sent successfully", invite);   
    } catch (error) {
        return errorResponse(res, 500, "Something went wrong", error);

    }
}