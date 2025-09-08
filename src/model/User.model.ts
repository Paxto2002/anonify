import mongoose, { Schema, Document, model, models } from "mongoose";

// ================== Message Interface & Schema ==================
export interface MessageDocument extends Document {
  _id: mongoose.Types.ObjectId; // fix: no longer unknown
  content: string;
  isRead: boolean;
  createdAt: Date;
}

// Plain type (frontend-friendly, no Mongoose methods)
export interface Message {
  _id: string; // serialized as string for API/frontend
  content: string;
  isRead: boolean;
  updatedAt: string;
  createdAt: string;
}

const messageSchema = new Schema<MessageDocument>(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  { _id: true }
);

// ================== User Interface & Schema ==================
export interface UserDocument extends Document {
  _id: mongoose.Types.ObjectId; // ✅ fix: no longer unknown
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessages: boolean;
  messages: MessageDocument[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      unique: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please use a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    verifyCode: {
      type: String,
      required: [true, "Verify Code is required"],
    },
    verifyCodeExpiry: {
      type: Date,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAcceptingMessages: {
      type: Boolean,
      default: true,
    },
    messages: [messageSchema],
  },
  { timestamps: true }
);

// ================== Models ==================
const MessageModel =
  (models.Message as mongoose.Model<MessageDocument>) ||
  model<MessageDocument>("Message", messageSchema);

const UserModel =
  (models.User as mongoose.Model<UserDocument>) ||
  model<UserDocument>("User", userSchema);

export { MessageModel, UserModel };
