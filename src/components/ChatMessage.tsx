import { Message } from '@/types/chat';
import { Button } from './ui/button';
import { ThumbsUp, ThumbsDown, User, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: Message;
  onFeedback?: (messageId: string, feedback: 'like' | 'dislike') => void;
}

export function ChatMessage({ message, onFeedback }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={cn('py-8 px-4', isUser ? 'bg-background' : 'bg-muted/30')}>
      <div className="max-w-3xl mx-auto">
        <div className="flex gap-4">
          <div
            className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center shrink-0',
              isUser ? 'bg-primary' : 'bg-accent'
            )}
          >
            {isUser ? (
              <User className="w-4 h-4 text-primary-foreground" />
            ) : (
              <Bot className="w-4 h-4 text-accent-foreground" />
            )}
          </div>

          <div className="flex-1 space-y-4">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p className="text-foreground leading-relaxed">{message.content}</p>
            </div>

            {message.tableData && (
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      {message.tableData.headers.map((header, idx) => (
                        <th
                          key={idx}
                          className="px-4 py-3 text-left font-semibold text-foreground"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {message.tableData.rows.map((row, rowIdx) => (
                      <tr
                        key={rowIdx}
                        className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                      >
                        {row.map((cell, cellIdx) => (
                          <td key={cellIdx} className="px-4 py-3 text-foreground">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {!isUser && onFeedback && (
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onFeedback(message.id, 'like')}
                  className={cn(
                    'gap-2',
                    message.feedback === 'like' && 'bg-accent text-accent-foreground'
                  )}
                >
                  <ThumbsUp className="w-4 h-4" />
                  {message.feedback === 'like' && 'Liked'}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onFeedback(message.id, 'dislike')}
                  className={cn(
                    'gap-2',
                    message.feedback === 'dislike' && 'bg-accent text-accent-foreground'
                  )}
                >
                  <ThumbsDown className="w-4 h-4" />
                  {message.feedback === 'dislike' && 'Disliked'}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
