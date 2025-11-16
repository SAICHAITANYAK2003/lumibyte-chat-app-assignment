import { MessageSquare, Sparkles, Zap, Shield } from 'lucide-react';

export function WelcomeScreen() {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-8 text-center">
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <MessageSquare className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">Welcome to ChatAI</h1>
          <p className="text-lg text-muted-foreground">
            Start a conversation and get intelligent responses with structured data
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="p-6 rounded-lg border border-border bg-card space-y-3">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-card-foreground">Smart Responses</h3>
            <p className="text-sm text-muted-foreground">
              Get intelligent answers with structured tabular data
            </p>
          </div>

          <div className="p-6 rounded-lg border border-border bg-card space-y-3">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-card-foreground">Fast & Efficient</h3>
            <p className="text-sm text-muted-foreground">
              Quick responses with organized information
            </p>
          </div>

          <div className="p-6 rounded-lg border border-border bg-card space-y-3">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-card-foreground">Session History</h3>
            <p className="text-sm text-muted-foreground">
              All your conversations saved and accessible
            </p>
          </div>
        </div>

        <div className="pt-8">
          <p className="text-sm text-muted-foreground">
            Click "New Chat" to start a conversation
          </p>
        </div>
      </div>
    </div>
  );
}
