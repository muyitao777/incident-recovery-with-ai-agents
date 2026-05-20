import React, { useState, useRef, useEffect } from 'react';
import { X, Send, ThumbsUp, MessageCircle, User, Sparkles, AlertCircle, TrendingUp, Database, Network, Clock, Play } from 'lucide-react';
import { IntuitAssistIcon } from './IntuitAssistIcon';

interface ThreadMessage {
  id: string;
  author: string;
  avatar: string;
  timestamp: string;
  content: string;
  type: 'user' | 'ai' | 'system';
}

interface ThreadDialogueProps {
  isOpen: boolean;
  onClose: () => void;
  topic: string;
  context: string;
  onMessageCountChange?: (count: number) => void;
}

export function ThreadDialogue({ isOpen, onClose, topic, context, onMessageCountChange }: ThreadDialogueProps) {
  const [newMessage, setNewMessage] = useState('');
  const [executingAction, setExecutingAction] = useState(false);
  const [actionExecuted, setActionExecuted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<ThreadMessage[]>([
    {
      id: '1',
      author: 'AI Assistant',
      avatar: 'AI',
      timestamp: '2 mins ago',
      content: `I've analyzed the ${topic.toLowerCase()} and found several key insights. Let me break this down for you.`,
      type: 'ai'
    },
    {
      id: '2',
      author: 'AI Assistant',
      avatar: 'AI',
      timestamp: '2 mins ago',
      content: context,
      type: 'ai'
    }
  ]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: ThreadMessage = {
      id: Date.now().toString(),
      author: 'You',
      avatar: 'YO',
      timestamp: 'Just now',
      content: newMessage,
      type: 'user'
    };

    setMessages([...messages, userMessage]);
    const questionText = newMessage;
    setNewMessage('');

    // Simulate AI response with contextual answers
    setTimeout(() => {
      let aiResponseContent = '';
      
      // Check for common question patterns and provide detailed responses
      if (questionText.toLowerCase().includes('how') || questionText.toLowerCase().includes('why')) {
        aiResponseContent = `Great question. Based on the incident analysis:\n\n• The connection pool exhaustion occurred because request volume increased by 34% starting at 14:15 UTC, while the pool was configured with a fixed limit of 1,000 connections.\n\n• This was compounded by a gradual memory leak (4.2GB → 7.8GB over 6 hours) that slowed down connection cleanup.\n\n• The cache hit rate dropped from 98% to 42%, forcing more database queries and further straining the connection pool.\n\nWould you like me to explain any of these factors in more detail?`;
      } else if (questionText.toLowerCase().includes('fix') || questionText.toLowerCase().includes('resolve') || questionText.toLowerCase().includes('solution')) {
        aiResponseContent = `Here are the recommended steps to resolve this:\n\n1. **Immediate**: Scale connection pool from 1,000 to 1,500 (ETA: 5-8 min)\n2. **Short-term**: Investigate and patch the memory leak in the cache service\n3. **Medium-term**: Implement auto-scaling for the connection pool based on load\n4. **Long-term**: Add connection pool monitoring alerts at 70% utilization\n\nThe primary recovery action is available above. Would you like to execute it now?`;
      } else if (questionText.toLowerCase().includes('impact') || questionText.toLowerCase().includes('affect') || questionText.toLowerCase().includes('user')) {
        aiResponseContent = `Impact assessment:\n\n**User Impact**: Approximately 6,800 active users experienced degraded performance or timeouts\n\n**Service Impact**:\n• Auth Service: 2.34% error rate spike\n• API Gateway: Cascading failures detected\n• Cache Service: 340% increase in cache misses\n\n**Performance Impact**:\n• P95 latency: 45ms → 156ms (247% increase)\n• Error rate: 2.34% above baseline\n• Connection timeout rate: 2.34%\n\nThe incident is currently ongoing and affecting production traffic.`;
      } else if (questionText.toLowerCase().includes('when') || questionText.toLowerCase().includes('start') || questionText.toLowerCase().includes('timeline')) {
        aiResponseContent = `Incident timeline:\n\n**14:18 UTC** - Traffic spike detected (34% increase)\n**14:21 UTC** - Connection pool at 85% capacity, warnings logged\n**14:23 UTC** - Pool exhaustion: All 1,000 connections in use\n**14:25 UTC** - Cascading failures to Auth Service and API Gateway\n**14:27 UTC** - Incident detected and escalated (current time)\n\nTotal elapsed time: 9 minutes from initial spike to detection.`;
      } else if (questionText.toLowerCase().includes('similar') || questionText.toLowerCase().includes('past') || questionText.toLowerCase().includes('before')) {
        aiResponseContent = `Similar incidents found:\n\n**INC-2847** (Jan 18, 2026): Database connection pool exhaustion during traffic spike. Resolved by scaling pool. Duration: 23 minutes.\n\n**INC-2698** (Dec 4, 2025): Redis cache service degradation due to memory leak. Required service restart. Duration: 1.2 hours.\n\n**Common patterns**: Both incidents occurred during unexpected traffic spikes and involved connection/resource exhaustion. Previous resolutions support scaling approach.`;
      } else {
        aiResponseContent = `I understand you're asking about "${questionText}".\n\nBased on the current incident context, here's what I can share:\n\n• Root cause: Redis Cache Connection Pool Exhaustion at 14:23 UTC (94% confidence)\n• Impact: ~6,800 users affected, 2.34% error rate, P95 latency increased to 156ms\n• Recommended action: Scale connection pool from 1,000 to 1,500 connections\n\nWhat specific aspect would you like me to elaborate on? I can provide details about:\n- Technical details and metrics\n- Impact assessment\n- Recovery actions\n- Similar past incidents`;
      }
      
      const aiResponse: ThreadMessage = {
        id: (Date.now() + 1).toString(),
        author: 'AI Assistant',
        avatar: 'AI',
        timestamp: 'Just now',
        content: aiResponseContent,
        type: 'ai'
      };
      setMessages(prev => [...prev, aiResponse]);
      if (onMessageCountChange) {
        onMessageCountChange(prev.length + 1);
      }
    }, 1000);
  };

  const handleExecuteAction = () => {
    setExecutingAction(true);
    
    const executionMessage: ThreadMessage = {
      id: Date.now().toString(),
      author: 'System',
      avatar: 'SY',
      timestamp: 'Just now',
      content: 'Initiating connection pool scaling from 1,000 to 1,500 connections...',
      type: 'system'
    };
    
    setMessages(prev => [...prev, executionMessage]);

    // Simulate execution progress
    setTimeout(() => {
      const progressMessage: ThreadMessage = {
        id: (Date.now() + 1).toString(),
        author: 'System',
        avatar: 'SY',
        timestamp: 'Just now',
        content: 'Scaling in progress... Connection pool now at 1,250 connections (83% complete)',
        type: 'system'
      };
      setMessages(prev => [...prev, progressMessage]);
    }, 2000);

    setTimeout(() => {
      const completionMessage: ThreadMessage = {
        id: (Date.now() + 2).toString(),
        author: 'System',
        avatar: 'SY',
        timestamp: 'Just now',
        content: '✓ Successfully scaled connection pool to 1,500 connections. Error rate decreasing. Monitoring for 5 minutes to confirm stability.',
        type: 'system'
      };
      setMessages(prev => [...prev, completionMessage]);
      setExecutingAction(false);
      setActionExecuted(true);
    }, 5000);
  };

  const handleQuickAction = (action: string) => {
    const userMessage: ThreadMessage = {
      id: Date.now().toString(),
      author: 'You',
      avatar: 'YO',
      timestamp: 'Just now',
      content: action,
      type: 'user'
    };
    setMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
      let responseContent = '';

      if (action === 'View detailed metrics timeline') {
        responseContent = `Here's the detailed metrics timeline for this incident:\n\n**14:00 UTC** — Baseline stable\n• P95 latency: 45ms | Error rate: 0.02% | Connection pool: 62%\n\n**14:15 UTC** — Traffic spike begins\n• Request volume increases 34% above normal\n• Connection pool climbs to 78%\n\n**14:18 UTC** — Early warning signals\n• Cache hit rate drops from 98% → 87%\n• Memory usage: 4.2GB → 5.1GB\n\n**14:21 UTC** — Connection pool warning threshold\n• Pool utilization: 85% (850/1,000)\n• P95 latency: 45ms → 78ms\n• First timeout errors logged\n\n**14:23 UTC** — Pool exhaustion\n• Pool utilization: 100% (1,000/1,000)\n• P95 latency: 156ms | Error rate: 2.34%\n• Cache hit rate: 42%\n\n**14:25 UTC** — Cascading failures\n• Auth Service error rate spikes to 3.1%\n• API Gateway returning 503s\n• Memory usage: 7.8GB\n\n**14:27 UTC** — Incident detected & escalated\n• ~6,800 users impacted\n• All downstream services degraded`;
      } else if (action === 'Check service dependencies') {
        responseContent = `Service dependency analysis:\n\n**Directly Affected (Tier 1):**\n• **Redis Cache Service** — Primary source of failure. Connection pool exhausted at 1,000/1,000.\n• **Auth Service** — Depends on Redis for session tokens. Error rate: 3.1%\n• **API Gateway** — Routing failures due to upstream timeouts. 503 error rate: 2.8%\n\n**Indirectly Affected (Tier 2):**\n• **User Profile Service** — Cache misses causing 4x DB load increase\n• **Payment Service** — Elevated latency (P95: 230ms, normally 35ms)\n• **Notification Service** — Queue backlog growing (est. 12,000 pending)\n\n**Unaffected:**\n• CDN / Static Assets\n• Logging & Monitoring Pipeline\n• Batch Processing Jobs\n\n**Dependency Chain:**\nAPI Gateway → Auth Service → Redis Cache → PostgreSQL (fallback)\n\nThe critical path runs through Redis. Restoring cache service will unblock all Tier 1 and Tier 2 services.`;
      } else if (action === 'Review similar past incidents') {
        responseContent = `Found 3 similar past incidents:\n\n**INC-2847** — Jan 18, 2026\n• *Redis connection pool exhaustion during flash sale*\n• Root cause: Fixed pool size couldn't handle 2.5x traffic surge\n• Resolution: Manually scaled pool from 800 → 1,200\n• Duration: 23 minutes | Impact: ~4,200 users\n• **Similarity: 94%**\n\n**INC-2698** — Dec 4, 2025\n• *Cache service degradation from memory leak*\n• Root cause: Unbounded cache entries in session store\n• Resolution: Service restart + memory limit config\n• Duration: 1.2 hours | Impact: ~8,500 users\n• **Similarity: 78%**\n\n**INC-2501** — Oct 12, 2025\n• *Database connection timeout cascade*\n• Root cause: Long-running queries blocking pool\n• Resolution: Query timeout limits + pool scaling\n• Duration: 45 minutes | Impact: ~3,100 users\n• **Similarity: 71%**\n\n**Pattern:** All 3 incidents involved resource pool exhaustion under elevated load. Auto-scaling was recommended after each but not yet implemented.`;
      }

      const aiResponse: ThreadMessage = {
        id: (Date.now() + 1).toString(),
        author: 'AI Assistant',
        avatar: 'AI',
        timestamp: 'Just now',
        content: responseContent,
        type: 'ai'
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 800);
  };

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  const isRecoveryThread = topic.toLowerCase().includes('recovery') || topic.toLowerCase().includes('execute');

  return (
    <div className="bg-white h-full flex flex-col animate-slide-in">
      {/* Header */}
      <div className="sticky top-0 z-10 flex-shrink-0 px-6 pt-4 pb-3 border-b border-slate-200/40 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-[0_2px_4px_-1px_rgba(0,0,0,0.06),0_1px_2px_-1px_rgba(0,0,0,0.04)] border border-slate-200">
              <IntuitAssistIcon className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-900">{topic}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="flex gap-3">
            <div className="flex-shrink-0">
              {message.type === 'ai' ? (
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-[0_2px_4px_-1px_rgba(0,0,0,0.06),0_1px_2px_-1px_rgba(0,0,0,0.04)] border border-slate-200">
                  <IntuitAssistIcon className="w-4 h-4" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center text-[10px] font-semibold text-slate-700">
                  {message.avatar}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-xs font-semibold text-slate-900">{message.author}</span>
                <span className="text-[10px] text-slate-500">{message.timestamp}</span>
              </div>
              <div className="text-sm text-slate-700 leading-relaxed">
                {message.type === 'ai' ? (
                  <FormattedContent content={message.content} />
                ) : (
                  message.content
                )}
              </div>
              
              {/* Message actions */}
              <div className="flex items-center gap-3 mt-2">
                <button className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-slate-700 transition-colors">
                  <ThumbsUp className="w-3 h-3" />
                  <span>Helpful</span>
                </button>
                <button className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-slate-700 transition-colors">
                  <MessageCircle className="w-3 h-3" />
                  <span>Reply</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Related Insights Card */}
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-cyan-600" />
            <h3 className="text-xs font-semibold text-slate-900">Related Insights</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <TrendingUp className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-slate-600">Error rate has been trending upward for the past 15 minutes</p>
            </div>
            <div className="flex items-start gap-2">
              <Database className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-slate-600">Similar pattern detected in last month's database incident</p>
            </div>
            <div className="flex items-start gap-2">
              <Network className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-slate-600">3 dependent services are now showing degraded performance</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <h3 className="text-xs font-semibold text-slate-900 mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <button
              onClick={() => handleQuickAction('View detailed metrics timeline')}
              className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200"
            >
              View detailed metrics timeline
            </button>
            <button
              onClick={() => handleQuickAction('Check service dependencies')}
              className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200"
            >
              Check service dependencies
            </button>
            <button
              onClick={() => handleQuickAction('Review similar past incidents')}
              className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200"
            >
              Review similar past incidents
            </button>
          </div>
        </div>
        
        {/* Execute Recovery Action - only show for recovery threads */}
        {isRecoveryThread && !actionExecuted && (
          <div className="bg-white rounded-lg p-4 border border-cyan-200">
            <div className="flex items-start gap-3 mb-3">
              <Database className="w-4 h-4 text-cyan-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-semibold text-slate-900 mb-1">Primary Recovery Action</h3>
                <p className="text-xs text-slate-700 mb-2">Scale Redis connection pool: 1,000 → 1,500 connections</p>
                <div className="flex items-center gap-2 text-[10px] text-slate-600">
                  <Clock className="w-3 h-3" />
                  <span>ETA: 5-8 minutes</span>
                  <span>•</span>
                  <span>Success rate: 87%</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleExecuteAction}
              disabled={executingAction}
              className="w-full px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-xs font-medium rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
            >
              {executingAction ? (
                <>
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Executing...
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  Execute recovery
                </>
              )}
            </button>
          </div>
        )}

        {actionExecuted && (
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-[10px]">✓</span>
              </div>
              <h3 className="text-xs font-semibold text-green-900">Action Executed Successfully</h3>
            </div>
            <p className="text-xs text-green-700">Connection pool scaled. System is stabilizing. Continue monitoring metrics.</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 px-6 pt-1.5 pb-2 border-t border-slate-200/40 bg-white">
        <div className="flex items-center gap-2.5">
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask a question about this topic..."
              className="w-full px-4 py-3 pr-9 text-sm bg-white border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/30 focus:border-cyan-300 transition-all placeholder:text-slate-400"
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all flex-shrink-0 ${
              newMessage.trim()
                ? 'bg-gradient-to-r from-cyan-400 to-blue-600 text-white shadow-sm hover:shadow-md'
                : 'bg-slate-100 text-slate-300 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

// Render inline **bold** and *italic* within a string
function renderInlineBold(text: string): React.ReactNode {
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <span key={i} className="font-semibold text-slate-800">{part.slice(2, -2)}</span>;
    }
    if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
      return <span key={i} className="italic text-slate-500">{part.slice(1, -1)}</span>;
    }
    return part;
  });
}

// Rich formatted content renderer for AI messages
function FormattedContent({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed === '') continue;

    // Bold heading line (starts with **)
    const headingMatch = trimmed.match(/^\*\*(.+?)\*\*\s*[—–\-:]?\s*(.*)/);
    if (headingMatch) {
      // Collect bullet items that follow this heading
      const bullets: string[] = [];
      let j = i + 1;
      while (j < lines.length) {
        const nextTrimmed = lines[j].trim();
        if (nextTrimmed.startsWith('•') || nextTrimmed.startsWith('- ')) {
          bullets.push(nextTrimmed.replace(/^[•\-]\s*/, ''));
          j++;
        } else if (nextTrimmed === '') {
          j++;
          const peekIdx = lines.findIndex((l, idx) => idx >= j && l.trim() !== '');
          if (peekIdx >= 0 && (lines[peekIdx].trim().startsWith('•') || lines[peekIdx].trim().startsWith('- '))) {
            continue;
          }
          break;
        } else {
          break;
        }
      }

      if (bullets.length > 0) {
        elements.push(
          <div key={key++} className="mb-2.5">
            <div className="text-xs font-semibold text-slate-800 mb-1.5 flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-cyan-500 flex-shrink-0"></div>
              <span>{renderInlineBold(headingMatch[1])}{headingMatch[2] ? ` — ${headingMatch[2]}` : ''}</span>
            </div>
            <div className="ml-3 space-y-1 border-l-2 border-slate-100 pl-3">
              {bullets.map((b, bi) => (
                <div key={bi} className="text-xs text-slate-600 leading-relaxed">
                  {renderInlineBold(b)}
                </div>
              ))}
            </div>
          </div>
        );
        i = j - 1;
        continue;
      } else {
        elements.push(
          <div key={key++} className="mb-1.5">
            <div className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-cyan-500 flex-shrink-0"></div>
              <span>{renderInlineBold(headingMatch[1])}{headingMatch[2] ? ` — ${headingMatch[2]}` : ''}</span>
            </div>
          </div>
        );
        continue;
      }
    }

    // Standalone bullet line
    if (trimmed.startsWith('•') || trimmed.startsWith('- ')) {
      const bulletText = trimmed.replace(/^[•\-]\s*/, '');
      elements.push(
        <div key={key++} className="text-xs text-slate-600 leading-relaxed ml-3 mb-1 flex items-start gap-1.5">
          <span className="text-slate-300 mt-0.5 flex-shrink-0">•</span>
          <span>{renderInlineBold(bulletText)}</span>
        </div>
      );
      continue;
    }

    // Numbered list item
    const numberedMatch = trimmed.match(/^(\d+)\.\s+(.+)/);
    if (numberedMatch) {
      elements.push(
        <div key={key++} className="text-xs text-slate-600 leading-relaxed ml-1 mb-1.5 flex items-start gap-2">
          <span className="text-[10px] font-semibold text-cyan-600 bg-cyan-50 w-4 h-4 rounded flex items-center justify-center flex-shrink-0 mt-0.5">{numberedMatch[1]}</span>
          <span>{renderInlineBold(numberedMatch[2])}</span>
        </div>
      );
      continue;
    }

    // Regular paragraph text
    elements.push(
      <p key={key++} className="text-xs text-slate-600 leading-relaxed mb-1.5">
        {renderInlineBold(trimmed)}
      </p>
    );
  }

  return <div className="space-y-0.5">{elements}</div>;
}