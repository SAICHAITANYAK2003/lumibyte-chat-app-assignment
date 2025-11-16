export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  tableData?: TableData;
  feedback?: 'like' | 'dislike' | null;
  timestamp: Date;
}

export interface TableData {
  headers: string[];
  rows: string[][];
  description: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}
