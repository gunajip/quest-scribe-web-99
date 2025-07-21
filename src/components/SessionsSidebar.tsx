import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Plus, 
  MessageSquare, 
  Trash2, 
  Clock,
  MoreHorizontal
} from "lucide-react";

interface Session {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: Date;
  messageCount: number;
}

interface SessionsSidebarProps {
  currentSessionId?: string;
  onSessionSelect: (sessionId: string) => void;
  onNewSession: () => void;
}

const SessionsSidebar = ({ currentSessionId, onSessionSelect, onNewSession }: SessionsSidebarProps) => {
  const [sessions] = useState<Session[]>([
    {
      id: '1',
      name: 'Document Analysis',
      lastMessage: 'Can you explain the policy changes?',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      messageCount: 12
    },
    {
      id: '2', 
      name: 'Technical Questions',
      lastMessage: 'How does the authentication work?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      messageCount: 8
    },
    {
      id: '3',
      name: 'Project Planning',
      lastMessage: 'What are the next steps for implementation?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      messageCount: 15
    }
  ]);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays}d ago`;
    } else if (diffHours > 0) {
      return `${diffHours}h ago`;
    } else {
      return 'Just now';
    }
  };

  return (
    <Card className="shadow-card border-border/50 h-[600px] flex flex-col">
      <CardHeader className="border-b border-border">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Chat Sessions</CardTitle>
          <Button 
            onClick={onNewSession}
            size="sm" 
            className="h-8 w-8 p-0"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-0">
        <div className="p-4 border-b border-border">
          <Button 
            onClick={onNewSession}
            className="w-full justify-start"
            variant="outline"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Session
          </Button>
        </div>

        <ScrollArea className="h-[400px]">
          <div className="p-2 space-y-1">
            {sessions.map((session) => (
              <div
                key={session.id}
                onClick={() => onSessionSelect(session.id)}
                className={`p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
                  currentSessionId === session.id ? 'bg-muted' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2 min-w-0 flex-1">
                    <MessageSquare className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-medium truncate">{session.name}</h4>
                      <p className="text-xs text-muted-foreground truncate mt-1">
                        {session.lastMessage}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{formatTime(session.timestamp)}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {session.messageCount}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle delete session
                    }}
                  >
                    <MoreHorizontal className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-border">
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Total Sessions</span>
              <Badge variant="secondary">{sessions.length}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Active Session</span>
              <Badge className="bg-success text-success-foreground">
                {currentSessionId ? 'Connected' : 'None'}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SessionsSidebar;