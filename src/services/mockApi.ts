import { ChatSession, Message, TableData } from '@/types/chat';

// Mock data generator
const mockTableData: Record<string, TableData> = {
  'programming languages': {
    headers: ['Language', 'Year Created', 'Primary Use', 'Popularity'],
    rows: [
      ['JavaScript', '1995', 'Web Development', 'Very High'],
      ['Python', '1991', 'Data Science & AI', 'Very High'],
      ['Java', '1995', 'Enterprise Applications', 'High'],
      ['TypeScript', '2012', 'Web Development', 'High'],
      ['Go', '2009', 'Backend Services', 'Medium']
    ],
    description: 'Here\'s a comprehensive overview of popular programming languages, their creation years, primary applications, and current popularity in the industry.'
  },
  'ai models': {
    headers: ['Model', 'Developer', 'Release Year', 'Parameters'],
    rows: [
      ['GPT-4', 'OpenAI', '2023', '1.7T (estimated)'],
      ['Claude 3', 'Anthropic', '2024', 'Not disclosed'],
      ['Gemini', 'Google', '2023', 'Multiple versions'],
      ['LLaMA 2', 'Meta', '2023', '7B to 70B'],
      ['Mistral', 'Mistral AI', '2023', '7B to 8x7B']
    ],
    description: 'A comparison of leading AI language models, showcasing the rapid advancement in artificial intelligence technology and the diverse approaches taken by different organizations.'
  },
  'web frameworks': {
    headers: ['Framework', 'Language', 'Type', 'Learning Curve'],
    rows: [
      ['React', 'JavaScript', 'Library', 'Moderate'],
      ['Vue.js', 'JavaScript', 'Framework', 'Easy'],
      ['Angular', 'TypeScript', 'Framework', 'Steep'],
      ['Svelte', 'JavaScript', 'Compiler', 'Easy'],
      ['Next.js', 'React/TS', 'Meta-Framework', 'Moderate']
    ],
    description: 'An overview of modern web development frameworks and libraries, highlighting their characteristics and accessibility for developers at different skill levels.'
  },
  'cloud providers': {
    headers: ['Provider', 'Market Share', 'Key Services', 'Founded'],
    rows: [
      ['AWS', '32%', 'EC2, S3, Lambda', '2006'],
      ['Azure', '23%', 'VMs, Storage, Functions', '2010'],
      ['Google Cloud', '10%', 'Compute Engine, Cloud Storage', '2008'],
      ['Alibaba Cloud', '4%', 'ECS, OSS', '2009'],
      ['IBM Cloud', '3%', 'Virtual Servers, Object Storage', '2013']
    ],
    description: 'Market analysis of major cloud service providers, showing their relative market positions and core infrastructure offerings.'
  },
  'default': {
    headers: ['Category', 'Value', 'Status', 'Priority'],
    rows: [
      ['Data Analysis', '85%', 'Active', 'High'],
      ['Development', '92%', 'Active', 'High'],
      ['Testing', '78%', 'In Progress', 'Medium'],
      ['Deployment', '65%', 'Pending', 'Medium'],
      ['Monitoring', '88%', 'Active', 'High']
    ],
    description: 'General overview of project metrics and status across different categories.'
  }
};

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Generate mock response based on question
const generateMockResponse = (question: string): TableData => {
  const lowerQuestion = question.toLowerCase();
  
  if (lowerQuestion.includes('programming') || lowerQuestion.includes('language')) {
    return mockTableData['programming languages'];
  } else if (lowerQuestion.includes('ai') || lowerQuestion.includes('model')) {
    return mockTableData['ai models'];
  } else if (lowerQuestion.includes('framework') || lowerQuestion.includes('web')) {
    return mockTableData['web frameworks'];
  } else if (lowerQuestion.includes('cloud') || lowerQuestion.includes('provider')) {
    return mockTableData['cloud providers'];
  }
  
  return mockTableData['default'];
};

// Generate session title from first question
const generateTitle = (question: string): string => {
  const words = question.split(' ').slice(0, 5).join(' ');
  return words.length > 40 ? words.substring(0, 40) + '...' : words;
};

class MockAPIService {
  private sessions: Map<string, ChatSession> = new Map();

  constructor() {
    // Load from localStorage
    const stored = localStorage.getItem('chatSessions');
    if (stored) {
      const data = JSON.parse(stored);
      this.sessions = new Map(
        data.map((session: any) => [
          session.id,
          {
            ...session,
            createdAt: new Date(session.createdAt),
            updatedAt: new Date(session.updatedAt),
            messages: session.messages.map((msg: any) => ({
              ...msg,
              timestamp: new Date(msg.timestamp)
            }))
          }
        ])
      );
    }
  }

  private saveSessions() {
    const data = Array.from(this.sessions.values());
    localStorage.setItem('chatSessions', JSON.stringify(data));
  }

  async createSession(): Promise<ChatSession> {
    await delay(300);
    
    const session: ChatSession = {
      id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.sessions.set(session.id, session);
    this.saveSessions();
    
    return session;
  }

  async askQuestion(sessionId: string, question: string): Promise<Message> {
    await delay(800);
    
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error('Session not found');
    }

    // Add user message
    const userMessage: Message = {
      id: `msg_${Date.now()}_user`,
      role: 'user',
      content: question,
      timestamp: new Date()
    };
    session.messages.push(userMessage);

    // Generate assistant response
    const tableData = generateMockResponse(question);
    const assistantMessage: Message = {
      id: `msg_${Date.now()}_assistant`,
      role: 'assistant',
      content: tableData.description,
      tableData,
      feedback: null,
      timestamp: new Date()
    };
    session.messages.push(assistantMessage);

    // Update session title if this is the first question
    if (session.messages.filter(m => m.role === 'user').length === 1) {
      session.title = generateTitle(question);
    }

    session.updatedAt = new Date();
    this.saveSessions();

    return assistantMessage;
  }

  async getSessions(): Promise<ChatSession[]> {
    await delay(200);
    return Array.from(this.sessions.values()).sort(
      (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
    );
  }

  async getSession(sessionId: string): Promise<ChatSession | null> {
    await delay(200);
    return this.sessions.get(sessionId) || null;
  }

  async updateFeedback(sessionId: string, messageId: string, feedback: 'like' | 'dislike'): Promise<void> {
    await delay(100);
    
    const session = this.sessions.get(sessionId);
    if (!session) return;

    const message = session.messages.find(m => m.id === messageId);
    if (message) {
      message.feedback = message.feedback === feedback ? null : feedback;
      this.saveSessions();
    }
  }
}

export const mockApi = new MockAPIService();
