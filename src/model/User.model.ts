import mongoose, { Schema, Document, model, models } from "mongoose";

// ================== Message Interface & Schema ==================
export interface Message extends Document {
  _id: string;
  content: string;
  isRead: boolean; // ✅ helps track read/unread
  createdAt: Date;
}

const messageSchema = new Schema<Message>(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    isRead: {
      type: Boolean,
      default: false, // ✅ default unread
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
export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessages: boolean;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<User>(
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
  (models.Message as mongoose.Model<Message>) ||
  model<Message>("Message", messageSchema);

const UserModel =
  (models.User as mongoose.Model<User>) ||
  model<User>("User", userSchema);

export { MessageModel, UserModel };
