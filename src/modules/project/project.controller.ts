import { Request, Response } from "express";
import { errorResponse, successResponse } from "../../config/response";
import projectModel from "./project.model";

export const createProject = async (req:Request,res:Response)=>{
    const {name,description} = req.body;
    const id = req.headers.id;
    console.log(id);
    try {

        if(!name || description) return errorResponse(res,400,"Please enter project name and description",null);

        const data = await projectModel.create({
            name,description,createdBy:id
        })
        return successResponse(res,201,"Project create successfully",data);
    } catch (error) {
        return errorResponse(res,500,"Something went wrong",error);
    }
}