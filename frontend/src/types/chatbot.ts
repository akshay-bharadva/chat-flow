export type ChatbotStatus = "active" | "draft" | "archived";

export interface Chatbot {
  id: string;
  name: string;
  status: ChatbotStatus;
  description: string;
  conversations: number;
  accuracy: number;
  lastUpdated: string;
}