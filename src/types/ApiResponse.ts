import { Message } from "@/model/User.model"

export interface ApiResponse {
  success: boolean;
  message: string;

  // messages
  messages?: Array<Message>;

  // message acceptance
  isAcceptingMessages?: boolean;
  accepting?: boolean; // unify naming if possible

  // AI suggestions
  suggestions?: string[];

  // optional error details
  error?: string;
}
