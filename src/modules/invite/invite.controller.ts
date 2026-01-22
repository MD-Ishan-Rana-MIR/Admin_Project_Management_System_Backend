import { Request, Response } from "express";
import { errorResponse, successResponse } from "../../config/response";
import crypto from "crypto";
import inviteModel from "./invite.model";
import { config } from "../../config/config";
import { transporter } from "../../utility/mailer";
import { inviteEmailTemplate } from "../../utility/inviteEmailTemplate";
import userModel from "../auth/auth.modle";


export const inviteUser = async (req: Request, res: Response) => {
  const { email, role } = req.body;
  try {
    const existsUser = await userModel.findOne({ email: email });
    if (existsUser) return errorResponse(res, 400, "User email already exists", null);

    const token = crypto.randomBytes(32).toString("hex");

    const invite = await inviteModel.create({
      email, role, token,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24) // 24h
    })
    const inviteLink = `${config.frontendUrl}/registraiton/accept-invite?token=${token}&email=${email}`;

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
};

export const inviteUserRegistration = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const inviteUser = await inviteModel.findOne({ email: email });

    if (!email || !name || !password) return errorResponse(res, 400, "please enter your email name and password", null);

    const user = await userModel.findOne({ email: email });

    if (user) return errorResponse(res, 409, "User email already exists", null);

    if (inviteUser && inviteUser.email == email) {
      const data = await userModel.create({
        name, email, password, invitedAt: inviteUser?.createdAt
      })
      return successResponse(res, 201, "Registration successfully", null);
    } else {
      return errorResponse(res, 404, "Invite user not found", null);
    }

  } catch (error) {
    return errorResponse(res, 500, "Something went wrong", error);
  }
}