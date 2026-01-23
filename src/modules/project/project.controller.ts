import { Request, Response } from "express";
import { errorResponse, successResponse } from "../../config/response";
import projectModel from "./project.model";


export const createProject = async (req:Request,res:Response)=>{
    const {name,description} = req.body;
    const id = req.headers.id;
    console.log(id);
    try {

        if(!name || !description) return errorResponse(res,400,"Please enter project name and description",null);

        const data = await projectModel.create({
            name,description,createdBy:id
        })
        return successResponse(res,201,"Project create successfully",data);
    } catch (error) {
        return errorResponse(res,500,"Something went wrong",error);
    }
};


export const allProjects = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { search } = req.query;

    // Build aggregation pipeline
    const pipeline: any[] = [
      // Filter only isDeleted = false
      { $match: { isDeleted: false, status : "ACTIVE" } },
      
      // Optional search filter
      ...(search
        ? [
            {
              $match: {
                name: { $regex: search as string, $options: "i" },
              },
            },
          ]
        : []),

      // Lookup user details
      {
        $lookup: {
          from: "users", // collection name in MongoDB
          localField: "createdBy", // field in projectModel
          foreignField: "_id", // field in userModel
          as: "user",
        },
      },

      // Unwind user array
      { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          status : 1,
          name: 1,
          description: 1,
          createdAt: 1,
          updatedAt: 1,
          "user.name": 1, // only user name
        },
      },

      // Sort by createdAt descending
      { $sort: { createdAt: -1 } },

      // Pagination
      { $skip: skip },
      { $limit: limit },
    ];

    // Execute aggregation
    const projects = await projectModel.aggregate(pipeline);

    // Total count (with same filters)
    const countPipeline = [
      { $match: { isDeleted: false } },
      ...(search
        ? [
            {
              $match: {
                name: { $regex: search as string, $options: "i" },
              },
            },
          ]
        : []),
      { $count: "total" },
    ];


    const totalResult = await projectModel.aggregate(countPipeline);
    const total = totalResult[0]?.total || 0;

    res.status(200).json({
      data: projects,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch projects",
    });
  }
};



export const projectDelte = async (req:Request,res:Response)=>{
  const id = req.params.id;
   try {
    const project = await projectModel.findById({_id : id});
    if (!project) {
      return errorResponse(res, 404, "Project not found", null);
    }

    // Toggle isDeleted flag
    project.isDeleted = !project.isDeleted;

    await project.save();

    return successResponse(res, 200, "Project delete status updated successfully", {
      id: project._id,
      isDeleted: project.isDeleted,
    });
  } catch (error) {
    console.error(error);
    return errorResponse(res, 500, "Something went wrong", error);
  }
};


export const projectUpdate = async (req: Request, res: Response) => {
  const { name, description, status } = req.body;
  const { id } = req.params;

  try {
    // build update object (only update provided fields)
    const updateData: any = {};

    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (status) updateData.status = status;

    const project = await projectModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!project) {
      return errorResponse(res, 404, "Project not found");
    }

    return successResponse(res, 200, "Project updated successfully", project);

  } catch (error) {
    return errorResponse(res, 500, "Something went wrong", error);
  }
};