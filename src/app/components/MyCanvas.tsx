import { Send, Layers, Loader2, ExternalLink, Share2, Search } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { PersonalizedCanvas } from './PersonalizedCanvas';
import { ServiceDependencyGraph } from './ServiceDependencyGraph';
import { AlternativeHypotheses } from './AlternativeHypotheses';
import { IntuitAssistIcon } from './IntuitAssistIcon';

interface MyCanvasProps {
  selectedPersona: 'technical' | 'manager' | 'leader';
  onInvestigate?: (title: string, context: string) => void;
}

interface ChatMessage {
  type: 'user' | 'assistant';
  content: string;
  component?: 'dependency' | 'hypotheses';
  isLoading?: boolean;
}

export function MyCanvas({ selectedPersona, onInvestigate }: MyCanvasProps) {
  const [inputValue, setInputValue] = useState('');
  const [threadOpen, setThreadOpen] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [loadingCard, setLoadingCard] = useState<'dependency' | 'hypotheses' | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      type: 'assistant',
      content: 'personalized-canvas'
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollTargetRef = useRef<HTMLDivElement>(null);
  const prevPersonaRef = useRef(selectedPersona);
  const [scrollToIndex, setScrollToIndex] = useState<number | null>(null);
  const pendingScrollRef = useRef<boolean>(false);
  const skipScrollRef = useRef<boolean>(false);

  // Loading step messages
  const loadingSteps = [
    'Analyzing incident context...',
    'Processing system metrics...',
    'Building personalized insights...',
    'Finalizing workspace...'
  ];

  // Cycle through loading steps
  useEffect(() => {
    if (isInitialLoading || loadingCard) {
      const stepInterval = setInterval(() => {
        setLoadingStep(prev => (prev + 1) % loadingSteps.length);
      }, 400);
      return () => clearInterval(stepInterval);
    }
  }, [isInitialLoading, loadingCard]);

  // Initial loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  // Handle persona change - show loading screen
  useEffect(() => {
    if (prevPersonaRef.current !== selectedPersona) {
      // Reset messages to initial state
      setMessages([
        {
          type: 'assistant',
          content: 'personalized-canvas'
        }
      ]);
      
      // Show loading screen
      setIsInitialLoading(true);
      setLoadingStep(0);
      
      const timer = setTimeout(() => {
        setIsInitialLoading(false);
      }, 1800);
      
      prevPersonaRef.current = selectedPersona;
      return () => clearTimeout(timer);
    }
  }, [selectedPersona]);

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  // Scroll when new messages are added
  useEffect(() => {
    if (skipScrollRef.current) {
      skipScrollRef.current = false;
      return;
    }
    if (pendingScrollRef.current && scrollTargetRef.current) {
      // Scroll to the specific message (the user message before the new content)
      pendingScrollRef.current = false;
      setTimeout(() => {
        scrollTargetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else if (!pendingScrollRef.current) {
      scrollToBottom();
    }
  }, [messages]);

  // Handle loading state for new messages
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.isLoading) {
      const timer = setTimeout(() => {
        setMessages(prev => 
          prev.map((msg, idx) => 
            idx === prev.length - 1 ? { ...msg, isLoading: false } : msg
          )
        );
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  const handleSendMessage = (customMessage?: string) => {
    const messageToSend = customMessage || inputValue.trim();
    if (messageToSend) {
      setMessages([...messages, { type: 'user', content: messageToSend }]);
      console.log('Sending message:', messageToSend);
      if (!customMessage) {
        setInputValue('');
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleLoadHypotheses = () => {
    // Show suggestion loading screen
    setLoadingCard('hypotheses');
    setLoadingStep(0);

    setTimeout(() => {
      setLoadingCard(null);
      setScrollToIndex(null);
      pendingScrollRef.current = false;
      skipScrollRef.current = false;
      setMessages([
        ...messages,
        { type: 'user', content: 'Check out other Hypotheses' },
        { type: 'assistant', content: 'Alternative Hypotheses', component: 'hypotheses' }
      ]);
    }, 1800);
  };

  const handleLoadDependencyGraph = () => {
    // Show suggestion loading screen
    setLoadingCard('dependency');
    setLoadingStep(0);

    setTimeout(() => {
      setLoadingCard(null);
      setScrollToIndex(null);
      pendingScrollRef.current = false;
      skipScrollRef.current = false;
      setMessages([
        ...messages,
        { type: 'user', content: 'Check out the Dependency Graph' },
        { type: 'assistant', content: 'Service Dependency Graph', component: 'dependency' }
      ]);
    }, 1800);
  };

  // Get role-specific suggestions
  const getSuggestions = () => {
    if (selectedPersona === 'technical') {
      return [
        { text: 'View service dependency graph', handler: handleLoadDependencyGraph },
        { text: 'Check alternative hypotheses', handler: handleLoadHypotheses }
      ];
    } else if (selectedPersona === 'manager') {
      return [
        { text: 'View team response timeline', handler: () => handleSendMessage('Show me the team response timeline') },
        { text: 'Review communication updates', handler: () => handleSendMessage('Show communication updates') }
      ];
    } else {
      return [
        { text: 'Show business impact analysis', handler: () => handleSendMessage('Show me detailed business impact analysis') },
        { text: 'View historical incident trends', handler: () => handleSendMessage('Show historical incident trends') }
      ];
    }
  };

  const suggestions = getSuggestions();

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col">
      {/* Canvas Container with white background */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header inside canvas */}
        <div className="px-6 pt-4 pb-3 border-b border-slate-200/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-medium text-slate-700">My Canvas</h2>
              <span className="text-xs text-slate-400">Personalized workspace that adapts to your role</span>
            </div>
          </div>
        </div>

        {/* Scrollable Content Area - Chat History */}
        <div ref={scrollContainerRef} className={`flex-1 overflow-y-auto ${messages.some(m => m.content === 'personalized-canvas') ? '' : 'px-6 py-6'}`}>
          {isInitialLoading ? (
            <div className="space-y-3 mt-6">
              {selectedPersona === 'technical' ? (
                // Technical Responder Loading Skeleton
                <>
                  {/* System Health Overview skeleton */}
                  <div className="bg-white rounded-xl p-5 mx-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <div className="absolute inset-0 bg-cyan-400 rounded animate-ping opacity-20"></div>
                          <div className="relative w-4 h-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded animate-pulse"></div>
                        </div>
                        <div className="h-3.5 w-40 bg-slate-200 rounded animate-pulse"></div>
                      </div>
                      <div className="h-2.5 w-32 bg-slate-100 rounded animate-pulse"></div>
                    </div>
                    
                    {/* 4-column metrics grid */}
                    <div className="grid grid-cols-4 gap-3 mb-4">
                      {[0, 1, 2, 3].map((i) => (
                        <div key={i} className="p-3 bg-slate-50 rounded-lg">
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <div className="w-3.5 h-3.5 bg-slate-200 rounded animate-pulse"></div>
                            <div className="h-2 w-20 bg-slate-200 rounded animate-pulse"></div>
                          </div>
                          <div className="h-6 w-16 bg-slate-300 rounded animate-pulse mb-1.5"></div>
                          <div className="h-2 w-24 bg-slate-100 rounded animate-pulse"></div>
                        </div>
                      ))}
                    </div>

                    {/* Chart skeleton */}
                    <div className="h-48 bg-gradient-to-b from-slate-50 to-slate-100 rounded-lg mb-4 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent animate-[shimmer_2s_infinite]"></div>
                      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-around p-4 gap-2">
                        {[40, 60, 45, 70, 55, 80, 65].map((height, i) => (
                          <div 
                            key={i} 
                            className="w-full bg-slate-200 rounded-t animate-pulse"
                            style={{ height: `${height}%`, animationDelay: `${i * 0.1}s` }}
                          ></div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 pt-4">
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="h-7 w-32 bg-slate-100 rounded-lg animate-pulse" style={{ animationDelay: `${i * 0.15}s` }}></div>
                      ))}
                    </div>
                  </div>

                  {/* Root Cause Analysis skeleton */}
                  <div className="bg-white rounded-xl p-5 mx-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded animate-pulse"></div>
                        <div className="h-3.5 w-48 bg-slate-200 rounded animate-pulse"></div>
                      </div>
                      <div className="h-5 w-20 bg-emerald-100 rounded-full animate-pulse"></div>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div className="h-3 w-full bg-slate-200 rounded animate-pulse"></div>
                      <div className="h-3 w-5/6 bg-slate-200 rounded animate-pulse"></div>
                      <div className="h-3 w-4/5 bg-slate-200 rounded animate-pulse"></div>
                    </div>

                    <div className="space-y-2 mb-4">
                      {[0, 1].map((i) => (
                        <div key={i} className="flex items-start gap-2 p-3 bg-slate-50 rounded-lg">
                          <div className="w-4 h-4 bg-slate-200 rounded animate-pulse mt-0.5"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-2.5 w-3/4 bg-slate-200 rounded animate-pulse"></div>
                            <div className="h-2 w-1/2 bg-slate-100 rounded animate-pulse"></div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 pt-4">
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="h-7 w-32 bg-slate-100 rounded-lg animate-pulse" style={{ animationDelay: `${i * 0.15}s` }}></div>
                      ))}
                    </div>
                  </div>

                  {/* AI Suggestions skeleton */}
                  <div className="bg-white rounded-xl p-5 mx-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-ping opacity-20"></div>
                        <div className="relative w-4 h-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-pulse"></div>
                      </div>
                      <div className="h-3.5 w-44 bg-slate-200 rounded animate-pulse"></div>
                    </div>

                    <div className="grid gap-3">
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="p-4 bg-slate-50 rounded-lg">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-slate-200 rounded animate-pulse"></div>
                            <div className="flex-1 space-y-2">
                              <div className="h-3 w-2/3 bg-slate-300 rounded animate-pulse"></div>
                              <div className="h-2 w-full bg-slate-200 rounded animate-pulse"></div>
                              <div className="h-2 w-4/5 bg-slate-200 rounded animate-pulse"></div>
                            </div>
                            <div className="h-8 w-20 bg-gradient-to-r from-cyan-200 to-blue-200 rounded-lg animate-pulse"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Similar Past Incidents skeleton */}
                  <div className="bg-white rounded-xl p-5 mx-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-4 h-4 bg-purple-200 rounded animate-pulse"></div>
                      <div className="h-3.5 w-36 bg-slate-200 rounded animate-pulse"></div>
                    </div>
                    <div className="space-y-2">
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="p-3 bg-slate-50 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <div className="h-2.5 w-20 bg-slate-300 rounded animate-pulse"></div>
                            <div className="h-4 w-16 bg-emerald-100 rounded-full animate-pulse"></div>
                          </div>
                          <div className="h-2.5 w-3/4 bg-slate-200 rounded animate-pulse mb-2"></div>
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-24 bg-slate-100 rounded animate-pulse"></div>
                            <div className="h-2 w-20 bg-slate-100 rounded animate-pulse"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : selectedPersona === 'manager' ? (
                // Incident Manager Loading Skeleton
                <>
                  {/* Impact Metrics Cards skeleton */}
                  <div className="bg-white rounded-xl p-5 mx-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-cyan-400 rounded animate-ping opacity-20"></div>
                        <div className="relative w-4 h-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded animate-pulse"></div>
                      </div>
                      <div className="h-3.5 w-32 bg-slate-200 rounded animate-pulse"></div>
                    </div>
                    
                    {/* 3-column grid */}
                    <div className="grid grid-cols-3 gap-3">
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="p-4 bg-slate-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-4 h-4 bg-slate-200 rounded animate-pulse"></div>
                            <div className="h-2.5 w-24 bg-slate-200 rounded animate-pulse"></div>
                          </div>
                          <div className="h-7 w-20 bg-slate-300 rounded animate-pulse mb-2"></div>
                          <div className="h-2 w-16 bg-slate-100 rounded animate-pulse"></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Team Response Status skeleton */}
                  <div className="bg-white rounded-xl p-5 mx-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-4 h-4 bg-blue-200 rounded animate-pulse"></div>
                      <div className="h-3.5 w-40 bg-slate-200 rounded animate-pulse"></div>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
                        <div className="w-4 h-4 bg-emerald-200 rounded-full animate-pulse"></div>
                        <div className="flex-1 space-y-1.5">
                          <div className="h-2.5 w-32 bg-slate-200 rounded animate-pulse"></div>
                          <div className="h-2 w-40 bg-slate-100 rounded animate-pulse"></div>
                        </div>
                      </div>
                      
                      {/* Team member cards */}
                      {[0, 1].map((i) => (
                        <div key={i} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-slate-200 animate-pulse"></div>
                            <div className="space-y-1.5">
                              <div className="h-2.5 w-32 bg-slate-200 rounded animate-pulse"></div>
                              <div className="h-2 w-40 bg-slate-100 rounded animate-pulse"></div>
                            </div>
                          </div>
                          <div className="w-2 h-2 rounded-full bg-emerald-200 animate-pulse"></div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 pt-4">
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="h-7 w-28 bg-slate-100 rounded-lg animate-pulse" style={{ animationDelay: `${i * 0.15}s` }}></div>
                      ))}
                    </div>
                  </div>

                  {/* Resolution Timeline skeleton */}
                  <div className="bg-white rounded-xl p-5 mx-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-4 h-4 bg-cyan-200 rounded animate-pulse"></div>
                      <div className="h-3.5 w-36 bg-slate-200 rounded animate-pulse"></div>
                    </div>
                    
                    <div className="space-y-2">
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="flex flex-col items-center">
                            <div className="w-2 h-2 rounded-full bg-emerald-200 animate-pulse"></div>
                            <div className="w-px h-8 bg-slate-200 mt-1"></div>
                          </div>
                          <div className="flex-1 pb-2">
                            <div className="flex items-center justify-between mb-1">
                              <div className="h-2.5 w-28 bg-slate-200 rounded animate-pulse"></div>
                              <div className="h-2 w-16 bg-slate-100 rounded animate-pulse"></div>
                            </div>
                            <div className="h-2 w-3/4 bg-slate-100 rounded animate-pulse"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Communication Log skeleton */}
                  <div className="bg-white rounded-xl p-5 mx-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-4 h-4 bg-slate-200 rounded animate-pulse"></div>
                      <div className="h-3.5 w-36 bg-slate-200 rounded animate-pulse"></div>
                    </div>
                    <div className="space-y-2">
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="p-3 bg-slate-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="h-2.5 w-32 bg-slate-200 rounded animate-pulse"></div>
                            <div className="h-2 w-16 bg-slate-100 rounded animate-pulse"></div>
                          </div>
                          <div className="h-2 w-full bg-slate-100 rounded animate-pulse mb-1"></div>
                          <div className="h-2 w-4/5 bg-slate-100 rounded animate-pulse"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                // Accountable Leader Loading Skeleton
                <>
                  {/* Executive Summary skeleton */}
                  <div className="bg-white rounded-xl p-5 mx-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="relative">
                        <div className="absolute inset-0 bg-cyan-400 rounded animate-ping opacity-20"></div>
                        <div className="relative w-4 h-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded animate-pulse"></div>
                      </div>
                      <div className="h-3.5 w-36 bg-slate-200 rounded animate-pulse"></div>
                    </div>
                    
                    <div className="h-2.5 w-48 bg-slate-100 rounded animate-pulse mb-4"></div>

                    {/* 2x2 Grid of larger metric cards */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {[0, 1].map((i) => (
                        <div key={i} className="p-3 bg-slate-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 bg-slate-200 rounded animate-pulse"></div>
                              <div className="h-2.5 w-28 bg-slate-200 rounded animate-pulse"></div>
                            </div>
                            <div className="h-4 w-12 bg-red-100 rounded animate-pulse"></div>
                          </div>
                          <div className="h-8 w-24 bg-slate-300 rounded animate-pulse mb-1"></div>
                          <div className="h-2 w-36 bg-slate-100 rounded animate-pulse mb-2"></div>
                          
                          {/* Mini chart */}
                          <div className="h-10 bg-gradient-to-r from-slate-100 to-slate-50 rounded mb-2 animate-pulse"></div>
                          
                          <div className="flex items-center justify-between mb-2">
                            <div className="h-2 w-16 bg-slate-100 rounded animate-pulse"></div>
                            <div className="h-2 w-20 bg-slate-100 rounded animate-pulse"></div>
                          </div>
                          
                          <div className="flex items-center justify-between pt-2">
                            <div className="space-y-1">
                              <div className="h-2 w-12 bg-slate-100 rounded animate-pulse"></div>
                              <div className="h-2.5 w-10 bg-slate-200 rounded animate-pulse"></div>
                            </div>
                            <div className="space-y-1">
                              <div className="h-2 w-16 bg-slate-100 rounded animate-pulse"></div>
                              <div className="h-2.5 w-12 bg-slate-200 rounded animate-pulse"></div>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {[0, 1].map((i) => (
                        <div key={i} className="p-3 bg-slate-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 bg-slate-200 rounded animate-pulse"></div>
                              <div className="h-2.5 w-24 bg-slate-200 rounded animate-pulse"></div>
                            </div>
                            <div className="h-4 w-14 bg-amber-100 rounded animate-pulse"></div>
                          </div>
                          <div className="h-8 w-20 bg-slate-300 rounded animate-pulse mb-1"></div>
                          <div className="h-2 w-32 bg-slate-100 rounded animate-pulse mb-2"></div>
                          
                          {/* Mini chart */}
                          <div className="h-10 bg-gradient-to-r from-slate-100 to-slate-50 rounded mb-2 animate-pulse"></div>
                          
                          <div className="flex items-center justify-between mb-2">
                            <div className="h-2 w-16 bg-slate-100 rounded animate-pulse"></div>
                            <div className="h-2 w-24 bg-slate-100 rounded animate-pulse"></div>
                          </div>
                          
                          <div className="flex items-center justify-between pt-2">
                            <div className="space-y-1">
                              <div className="h-2 w-12 bg-slate-100 rounded animate-pulse"></div>
                              <div className="h-2.5 w-10 bg-slate-200 rounded animate-pulse"></div>
                            </div>
                            <div className="space-y-1">
                              <div className="h-2 w-16 bg-slate-100 rounded animate-pulse"></div>
                              <div className="h-2.5 w-12 bg-slate-200 rounded animate-pulse"></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 pt-4">
                      {[0, 1].map((i) => (
                        <div key={i} className="h-7 w-28 bg-slate-100 rounded-lg animate-pulse" style={{ animationDelay: `${i * 0.15}s` }}></div>
                      ))}
                    </div>
                  </div>

                  {/* Strategic Considerations skeleton */}
                  <div className="bg-white rounded-xl p-5 mx-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-4 h-4 bg-slate-200 rounded animate-pulse"></div>
                      <div className="h-3.5 w-44 bg-slate-200 rounded animate-pulse"></div>
                    </div>
                    
                    <div className="space-y-2">
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="p-3 bg-slate-50 rounded-lg">
                          <div className="flex items-start gap-2 mb-2">
                            <div className="w-4 h-4 bg-slate-200 rounded animate-pulse mt-0.5"></div>
                            <div className="h-2.5 w-40 bg-slate-200 rounded animate-pulse"></div>
                          </div>
                          <div className="h-2 w-full bg-slate-100 rounded animate-pulse mb-1"></div>
                          <div className="h-2 w-5/6 bg-slate-100 rounded animate-pulse"></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Business Impact Analysis skeleton */}
                  <div className="bg-white rounded-xl p-5 mx-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-4 h-4 bg-slate-200 rounded animate-pulse"></div>
                      <div className="h-3.5 w-40 bg-slate-200 rounded animate-pulse"></div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {[0, 1, 2, 3].map((i) => (
                        <div key={i} className="p-3 bg-slate-50 rounded-lg">
                          <div className="h-2.5 w-24 bg-slate-200 rounded animate-pulse mb-2"></div>
                          <div className="h-6 w-16 bg-slate-300 rounded animate-pulse mb-1"></div>
                          <div className="h-2 w-20 bg-slate-100 rounded animate-pulse"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Loading status indicator */}
              <div className="mx-6 flex items-center justify-center gap-3 py-4">
                <div className="relative w-5 h-5">
                  <div className="absolute inset-0 border-2 border-cyan-200 rounded-full"></div>
                  <div className="absolute inset-0 border-2 border-cyan-600 rounded-full border-t-transparent animate-spin"></div>
                </div>
                <div className="text-xs font-mono text-slate-600">{loadingSteps[loadingStep]}</div>
              </div>
            </div>
          ) : loadingCard ? (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index}>
                  {message.type === 'user' ? (
                    <div className="flex justify-end mb-4 mr-6">
                      <div className="bg-gradient-to-r from-cyan-400 to-blue-600 text-white px-4 py-2 rounded-lg max-w-md">
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  ) : message.content === 'personalized-canvas' ? (
                    <PersonalizedCanvas 
                      selectedPersona={selectedPersona} 
                      onThreadOpenChange={setThreadOpen}
                      onInvestigate={onInvestigate}
                    />
                  ) : null}
                </div>
              ))}
              
              {/* Loading Card Skeleton */}
              {loadingCard === 'dependency' ? (
                <div className="bg-white rounded-xl p-5 mx-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-3.5 w-48 bg-slate-200 rounded animate-pulse"></div>
                  </div>
                  
                  {/* Graph skeleton */}
                  <div className="h-96 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg relative overflow-hidden mb-4">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent animate-[shimmer_2s_infinite]"></div>
                    
                    {/* Nodes skeleton */}
                    <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-cyan-200 rounded-full animate-pulse"></div>
                    <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-blue-200 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="absolute bottom-1/3 left-1/3 w-14 h-14 bg-purple-200 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    <div className="absolute bottom-1/4 right-1/3 w-10 h-10 bg-slate-200 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                    
                    {/* Connecting lines */}
                    <svg className="absolute inset-0 w-full h-full">
                      <line x1="25%" y1="30%" x2="70%" y2="38%" stroke="#cbd5e1" strokeWidth="2" className="animate-pulse" />
                      <line x1="35%" y1="70%" x2="25%" y2="30%" stroke="#cbd5e1" strokeWidth="2" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
                      <line x1="70%" y1="38%" x2="62%" y2="72%" stroke="#cbd5e1" strokeWidth="2" className="animate-pulse" style={{ animationDelay: '0.4s' }} />
                    </svg>
                  </div>

                  {/* Action buttons skeleton */}
                  <div className="flex items-center gap-2 pt-4 border-t border-slate-200">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="h-7 w-28 bg-slate-100 rounded-lg animate-pulse" style={{ animationDelay: `${i * 0.15}s` }}></div>
                    ))}
                  </div>
                  
                  {/* Loading indicator */}
                  <div className="flex items-center justify-center gap-3 py-4 mt-4">
                    <div className="relative w-5 h-5">
                      <div className="absolute inset-0 border-2 border-cyan-200 rounded-full"></div>
                      <div className="absolute inset-0 border-2 border-cyan-600 rounded-full border-t-transparent animate-spin"></div>
                    </div>
                    <div className="text-xs font-mono text-slate-600">{loadingSteps[loadingStep]}</div>
                  </div>
                </div>
              ) : loadingCard === 'hypotheses' ? (
                <div className="bg-white rounded-xl p-5 mx-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-3.5 w-40 bg-slate-200 rounded animate-pulse"></div>
                  </div>
                  
                  {/* Hypotheses list skeleton */}
                  <div className="space-y-3 mb-4">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="p-4 bg-slate-50 rounded-lg">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-5 h-5 bg-slate-200 rounded animate-pulse mt-0.5"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-3 w-3/4 bg-slate-300 rounded animate-pulse"></div>
                            <div className="h-2 w-full bg-slate-200 rounded animate-pulse"></div>
                            <div className="h-2 w-5/6 bg-slate-200 rounded animate-pulse"></div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 pl-8">
                          <div className="h-4 w-16 bg-emerald-100 rounded animate-pulse"></div>
                          <div className="h-4 w-20 bg-blue-100 rounded animate-pulse"></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action buttons skeleton */}
                  <div className="flex items-center gap-2 pt-4 border-t border-slate-200">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="h-7 w-28 bg-slate-100 rounded-lg animate-pulse" style={{ animationDelay: `${i * 0.15}s` }}></div>
                    ))}
                  </div>
                  
                  {/* Loading indicator */}
                  <div className="flex items-center justify-center gap-3 py-4 mt-4">
                    <div className="relative w-5 h-5">
                      <div className="absolute inset-0 border-2 border-cyan-200 rounded-full"></div>
                      <div className="absolute inset-0 border-2 border-cyan-600 rounded-full border-t-transparent animate-spin"></div>
                    </div>
                    <div className="text-xs font-mono text-slate-600">{loadingSteps[loadingStep]}</div>
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <div className={messages.some(m => m.content === 'personalized-canvas') ? '' : 'space-y-4'}>
              {messages.map((message, index) => (
                <div key={index} ref={index === scrollToIndex ? scrollTargetRef : undefined}>
                  {message.type === 'user' ? (
                    <div className="flex justify-end mb-4 mr-6">
                      <div className="bg-gradient-to-r from-cyan-400 to-blue-600 text-white px-4 py-2 rounded-lg max-w-md">
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-4">
                      {message.content === 'personalized-canvas' ? (
                        <PersonalizedCanvas 
                          selectedPersona={selectedPersona} 
                          onThreadOpenChange={setThreadOpen}
                          onInvestigate={onInvestigate}
                        />
                      ) : message.isLoading ? (
                        <div className="bg-white rounded-xl p-6 border border-slate-200 mx-6">
                          <div className="flex items-start gap-3">
                            <div className="relative">
                              <Loader2 className="w-5 h-5 text-cyan-600 animate-spin" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-medium text-slate-700 mb-1">Thinking...</div>
                              <div className="text-xs text-slate-500">Analyzing your request and preparing the response</div>
                            </div>
                          </div>
                        </div>
                      ) : message.component === 'hypotheses' ? (
                        <div className="bg-white rounded-xl p-5 border border-slate-200 mx-6">
                          <h3 className="text-sm font-semibold text-slate-900 mb-3">Alternative Hypotheses</h3>
                          <AlternativeHypotheses />
                          
                          {/* Action Buttons */}
                          <div className="mt-4 flex items-center gap-2 pt-4 border-t border-slate-200">
                            <button className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors border border-slate-200 whitespace-nowrap">
                              <ExternalLink className="w-3 h-3" />
                              View details
                            </button>
                            <button className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors border border-slate-200 whitespace-nowrap">
                              <Share2 className="w-3 h-3" />
                              Share as update
                            </button>
                            <button className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors border border-slate-200 whitespace-nowrap">
                              <Search className="w-3 h-3" />
                              Investigate further
                            </button>
                          </div>
                        </div>
                      ) : message.component === 'dependency' ? (
                        <div className="bg-white rounded-xl p-5 border border-slate-200 mx-6">
                          <ServiceDependencyGraph showFilters={true} />
                          
                          {/* Action Buttons */}
                          <div className="mt-4 flex items-center gap-2 pt-4 border-t border-slate-200">
                            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200">
                              <ExternalLink className="w-3.5 h-3.5" />
                              View details
                            </button>
                            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200">
                              <Share2 className="w-3.5 h-3.5" />
                              Share as update
                            </button>
                            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200">
                              <Search className="w-3.5 h-3.5" />
                              Investigate further
                            </button>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Sticky Chat Input at Bottom */}
        <div className={`border-t border-slate-200/40 px-6 pt-1.5 pb-2 mt-auto transition-all`}>
          {/* Suggested Actions */}
          <div className="flex items-center gap-2 mb-1.5 mr-3">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#0077c5] animate-pulse"></div>
              <span className="text-xs font-medium text-slate-500 tracking-wide">Suggested</span>
            </div>
            {suggestions.map((suggestion, index) => (
              <button 
                key={index}
                onClick={suggestion.handler}
                className="group relative overflow-hidden px-3 py-1.5 text-xs font-medium text-[#0077c5] bg-blue-50/60 border border-blue-200/60 rounded-full hover:bg-blue-50 hover:border-[#0077c5]/40 hover:shadow-[0_0_12px_rgba(0,119,197,0.15)] transition-all duration-300"
              >
                <span className="relative z-10">{suggestion.text}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            {/* Text Input */}
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask Intuit Assist about this incident..."
                className="w-full px-4 py-3 pr-9 text-sm bg-white border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/30 focus:border-cyan-300 transition-all placeholder:text-slate-400"
              />
              
              {/* AI Sparkles Icon */}
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                <IntuitAssistIcon size={14} className="opacity-50" />
              </div>
            </div>

            {/* Send Button */}
            <button 
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all flex-shrink-0 ${
                inputValue.trim()
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-600 text-white shadow-sm hover:shadow-md'
                  : 'bg-slate-100 text-slate-300 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}