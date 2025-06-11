export type ChatbotStatus = "active" | "draft" | "archived";

export interface Chatbot {
  id: string;
  name: string;
  status: ChatbotStatus;
  description: string | null;
  conversations: number;
  accuracy: number;
  lastUpdated: string;
  greeting: string | null;
  primaryColor: string | null;
  position: string | null;
  showAvatar: boolean | null;
  analytics: Record<string, any> | null;
  placeholder?: string | null;
  size: string | null;
  enableTyping: boolean | null;
  responseDelay: number | null;
  allowedDomain: string | null;
}

export interface ChatbotUpdate {
  name?: string;
  description?: string;
  greeting?: string;
  primaryColor?: string;
  position?: string;
  showAvatar?: boolean;
  placeholder?: string;
  size?: string;
  enableTyping?: boolean;
  responseDelay?: number;
  allowedDomain?: string;
}