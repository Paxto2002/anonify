// src/types/Message.ts
export interface Message {
  _id: string;
  content: string;
  isRead: boolean;
  createdAt: string; // Date is serialized to string in JSON
}