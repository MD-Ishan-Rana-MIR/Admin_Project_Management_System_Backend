import mongoose from "mongoose";
import { Schema, model, Document, Types } from "mongoose";

export type ProjectStatus = "ACTIVE" | "ARCHIVED" | "DELETED";

export interface IProject extends Document {
  name: string;
  description?: string;
  status: ProjectStatus;
  isDeleted: boolean;
  createdBy: Types.ObjectId; // ref: User
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String
    },
    status: {
      type: String,
      enum: ["ACTIVE", "ARCHIVED", "DELETED"],
      default: "ACTIVE"
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true,versionKey:false }
);

const projectModel = model<IProject>("Project", projectSchema);

export default projectModel;