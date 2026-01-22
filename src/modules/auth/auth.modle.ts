import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt"
export type UserRole = "ADMIN" | "MANAGER" | "STAFF";
export type UserStatus = "ACTIVE" | "INACTIVE";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    status: UserStatus;
    invitedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["ADMIN", "MANAGER", "STAFF"],
            default: "STAFF"
        },
        status: {
            type: String,
            enum: ["ACTIVE", "INACTIVE"],
            default: "ACTIVE"
        },
        invitedAt: {
            type: Date,
        }
    },
    { timestamps: true, versionKey: false }
);

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

const userModel = model<IUser>("User", userSchema);

export default userModel;
