import { Schema, model, Document } from "mongoose";

export type InviteRole = "ADMIN" | "MANAGER" | "STAFF";

export interface IInvite extends Document {
  email: string;
  role: InviteRole;
  token: string;
  expiresAt: Date;
  acceptedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const inviteSchema = new Schema<IInvite>(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    role: {
      type: String,
      enum: ["ADMIN", "MANAGER", "STAFF"],
      required: true
    },
    token: {
      type: String,
      required: true,
      unique: true
    },
    expiresAt: {
      type: Date,
      required: true
    },
    acceptedAt: {
      type: Date
    }
  },
  { timestamps: true, versionKey:false }
);

const inviteModel = model<IInvite>("Invite", inviteSchema);

export default inviteModel;
