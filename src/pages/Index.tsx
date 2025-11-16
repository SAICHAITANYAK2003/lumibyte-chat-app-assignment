import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';
import { ChatMessage } from '@/components/ChatMessage';
import { ChatInput } from '@/components/ChatInput';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ScrollArea } from '@/components/ui/scroll-area';
import { mockApi } from '@/services/mockApi';
import { ChatSession } from '@/types/chat';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { toast } = useToast();

  // Load sessions on mount
  useEffect(() => {
    loadSessions();
  }, []);

  // Load session from URL
  useEffect(() => {
    const sessionId = searchParams.get('session');
    if (sessionId) {
      loadSession(sessionId);
    } else {
      setCurrentSession(null);
    }
  }, [searchParams]);

  const loadSessions = async () => {
    try {
      const loadedSessions = await mockApi.getSessions();
      setSessions(loadedSessions);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load sessions',
        variant: 'destructive'
      });
    }
  };

  const loadSession = async (sessionId: string) => {
    try {
      const session = await mockApi.getSession(sessionId);
      setCurrentSession(session);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load session',
        variant: 'destructive'
      });
    }
  };

  const handleNewChat = async () => {
    try {
      setIsLoading(true);
      const newSession = await mockApi.createSession();
      setSessions([newSession, ...sessions]);
      setCurrentSession(newSession);
      setSearchParams({ session: newSession.id });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create new chat',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSession = (sessionId: string) => {
    setSearchParams({ session: sessionId });
  };

  const handleSendMessage = async (message: string) => {
    if (!currentSession) {
      await handleNewChat();
      // Wait a bit for state to update
      await new Promise(resolve => setTimeout(resolve, 100));
      const sessionId = searchParams.get('session');
      if (!sessionId) return;
      
      try {
        setIsLoading(true);
        await mockApi.askQuestion(sessionId, message);
        await loadSession(sessionId);
        await loadSessions();
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to send message',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
      return;
    }

    try {
      setIsLoading(true);
      await mockApi.askQuestion(currentSession.id, message);
      await loadSession(currentSession.id);
      await loadSessions();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedback = async (messageId: string, feedback: 'like' | 'dislike') => {
    if (!currentSession) return;

    try {
      await mockApi.updateFeedback(currentSession.id, messageId, feedback);
      await loadSession(currentSession.id);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update feedback',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      <Sidebar
        sessions={sessions}
        currentSessionId={currentSession?.id || null}
        onNewChat={handleNewChat}
        onSelectSession={handleSelectSession}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-background">
          <h1 className="text-lg font-semibold text-foreground">
            {currentSession?.title || 'ChatAI'}
          </h1>
          <ThemeToggle />
        </header>

        {!currentSession ? (
          <WelcomeScreen />
        ) : (
          <ScrollArea className="flex-1">
            <div className="min-h-full">
              {currentSession.messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  onFeedback={handleFeedback}
                />
              ))}
              {isLoading && (
                <div className="py-8 px-4 flex justify-center">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              )}
            </div>
          </ScrollArea>
        )}

        <ChatInput onSend={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
};

export default Index;
