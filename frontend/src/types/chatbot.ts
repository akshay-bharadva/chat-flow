export type ChatbotStatus = "active" | "draft" | "archived";

export interface Chatbot {
  id: string;
  name: string;
  status: ChatbotStatus;
  description: string | null;
  conversations: number;
  accuracy: number;
  lastUpdated: string; // From alias="last_updated"
  greeting: string | null;
  primaryColor: string | null;
  position: string | null;
  showAvatar: boolean | null;
  analytics: Record<string, any> | null;
  placeholder?: string;
  size?: string;
  enableTyping?: boolean;
  responseDelay?: number;
}

// Type for updating a chatbot's settings
export interface ChatbotUpdate {
  name?: string;
  description?: string;
  greeting?: string;
  primary_color?: string;
  position?: string;
  show_avatar?: boolean;
  placeholder?: string;
  size?: string;
  enableTyping?: boolean;
  responseDelay?: number;
}