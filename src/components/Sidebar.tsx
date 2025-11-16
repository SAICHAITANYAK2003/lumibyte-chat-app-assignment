import { ChatSession } from '@/types/chat';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Plus, MessageSquare, ChevronLeft, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  sessions: ChatSession[];
  currentSessionId: string | null;
  onNewChat: () => void;
  onSelectSession: (sessionId: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({
  sessions,
  currentSessionId,
  onNewChat,
  onSelectSession,
  isCollapsed,
  onToggleCollapse
}: SidebarProps) {
  return (
    <aside
      className={cn(
        'flex flex-col bg-sidebar border-r border-sidebar-border transition-smooth',
        isCollapsed ? 'w-0 md:w-16' : 'w-full md:w-64'
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!isCollapsed && (
          <Button onClick={onNewChat} className="flex-1 mr-2">
            <Plus className="w-4 h-4 mr-2" />
            New Chat
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="shrink-0"
        >
          <ChevronLeft className={cn('w-4 h-4 transition-transform', isCollapsed && 'rotate-180')} />
        </Button>
      </div>

      {!isCollapsed && (
        <>
          <ScrollArea className="flex-1 p-2">
            <div className="space-y-1">
              {sessions.map((session) => (
                <Button
                  key={session.id}
                  variant={currentSessionId === session.id ? 'secondary' : 'ghost'}
                  className="w-full justify-start text-left h-auto py-3 px-3"
                  onClick={() => onSelectSession(session.id)}
                >
                  <MessageSquare className="w-4 h-4 mr-2 shrink-0" />
                  <span className="truncate text-sm">{session.title}</span>
                </Button>
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-sidebar-accent">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <User className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">User</p>
                <p className="text-xs text-muted-foreground truncate">user@example.com</p>
              </div>
            </div>
          </div>
        </>
      )}
    </aside>
  );
}
