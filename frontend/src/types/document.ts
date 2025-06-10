export type DocumentStatus = "processing" | "completed" | "failed";
export type SourceType = "file" | "url" | "text";

export interface Document {
  id: string;
  chatbot_id: string;
  source_type: SourceType;
  source_name: string;
  status: DocumentStatus;
  lastUpdated: string;
}