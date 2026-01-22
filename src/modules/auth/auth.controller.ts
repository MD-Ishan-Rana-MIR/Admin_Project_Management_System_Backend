import { Request, Response } from "express";
import userModel, { IUser } from "../user/user.model";
import { errorResponse, successResponse } from "../../config/response";
import bcrypt from "bcrypt"
import { generateToken } from "../../config/token";

export const login = async (req:Request,res:Response)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password) return errorResponse(res,400,"Email or password missing",null);
        const user = await userModel.findOne({email:email}).lean<IUser>().exec();

        if(!user){
            return errorResponse(res,401,"Invalid credentials",null);
        }
        if(user.status=="INACTIVE"){
            return errorResponse(res,403,"User is deactivated",null);
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return errorResponse(res,403,"Invalid credentials",null)
        }
        const token = generateToken({userId: user._id.toString(),role: user.role});
        return successResponse(res,201,"Login successfully",{token:token,id:user?._id,name:user?.name,role:user?.role,email:user?.email})
    }   
    catch (error) {
        console.log(error);
        return errorResponse(res,500,"Something went wrong",error);
        
    }
};

export const userCreate = async (req:Request,res:Response)=>{
    try {
        const reqBody = req.body;
        const data = await userModel.create(reqBody);
        return successResponse(res,201,"User create successfully",data);
    } catch (error) {
        return errorResponse(res,500,"Something went wrong",error);
        
    }
}