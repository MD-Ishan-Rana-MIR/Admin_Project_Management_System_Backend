import { Request, Response } from "express";
import userModel from "../auth/auth.modle";
import { errorResponse, successResponse } from "../../config/response";

export const getALLUsers = async (req: Request, res: Response) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const { search, role, status } = req.query; // get role and status from query

        let filter: any = {};

        // Search by name, email, role, status
        if (search) {
            const regex = new RegExp(search as string, "i");
            filter.$or = [
                { name: regex },
                { email: regex },
                { role: regex },
                { status: regex },
            ];
        }

        // Filter by role if provided
        if (role) {
            filter.role = role;
        }

        // Filter by status if provided
        if (status) {
            filter.status = status;
        }

        const [users, total] = await Promise.all([
            userModel
                .find(filter)
                .skip(skip)
                .limit(limit)
                .select("-password")
                .sort({ createdAt: -1 }),
            userModel.countDocuments(filter),
        ]);

        res.status(200).json({
            data: users,
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
            message: "Failed to fetch users",
        });
    }
};


export const singleUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const filter = {
            _id: id
        };

        const user = await userModel.findById(filter).select("-password");
        if (!user) {
            return errorResponse(res, 404, "User not found", null);
        }

        return successResponse(res, 200, "User find successfully", user)

    } catch (error) {
        return errorResponse(res, 500, "Something went wrong", error);
    }
};


export const userStatusUpdate = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;

        const user = await userModel.findById({ _id: userId });

        if (!user) {
            return errorResponse(res, 404, "User not found");
        }

        // Toggle status
        user.status = user.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";

        await user.save();

        return successResponse(res, 200, "User status updated successfully", {
            id: user._id,
            status: user.status
        });
    } catch (error) {
        return errorResponse(res, 500, "Something went wrong", error);
    }
};


export const updateUserRole = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const { role } = req.body;

        // Validate role
        const validRoles = ["ADMIN", "MANAGER", "STAFF"];
        if (!validRoles.includes(role)) {
            return errorResponse(res, 400, `Invalid role. Allowed roles: ${validRoles.join(", ")}`);
        }

        const user = await userModel.findById(userId);

        if (!user) {
            return errorResponse(res, 404, "User not found");
        }





        // Update role
        user.role = role;
        await user.save();

        return successResponse(res, 200, "User role updated successfully", {
            id: user._id,
            role: user.role
        });
    } catch (error) {
        console.log(error)
        return errorResponse(res, 500, "Something went wrong", error);
    }
};