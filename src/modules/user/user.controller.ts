import { Request, Response } from "express";
import userModel from "../auth/auth.modle";

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
