import { Sparkles, AlertTriangle, CheckCircle, MessageSquare, Plus, Search, Brain, Lightbulb, Send, XCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export function InvestigationCanvasExperience() {
  const [hypotheses, setHypotheses] = useState([
    {
      id: 1,
      text: 'Database latency is being caused by a runaway query in the reporting service',
      status: 'active',
      confidence: 'High'
    },
    {
      id: 2,
      text: 'Cache Layer memory exhaustion is causing increased response times',
      status: 'investigating',
      confidence: 'Medium'
    },
    {
      id: 3,
      text: 'Network connectivity issues between API Gateway and downstream services',
      status: 'rejected',
      confidence: 'Low'
    }
  ]);

  const [chatMessages, setChatMessages] = useState([
    {
      type: 'ai',
      message: 'Hello! I\'m analyzing the current incident. Let me start by checking system health.'
    },
    {
      type: 'user',
      message: 'What services are affected?'
    },
    {
      type: 'ai',
      message: 'I\'ve detected anomalies in the cache layer. The error rate has spiked significantly in the last 15 minutes.'
    },
    {
      type: 'user',
      message: 'Can you investigate the cache layer?'
    },
    {
      type: 'ai',
      message: 'Expanding cache layer analysis now. I\'m checking Redis connections, memory usage, and query performance metrics.'
    },
    {
      type: 'user',
      message: 'What did you find?'
    },
    {
      type: 'ai',
      message: 'Memory usage is at 94% capacity. This is abnormal and correlates directly with the incident start time at 14:23 UTC.'
    },
    {
      type: 'user',
      message: 'What about the database?'
    },
    {
      type: 'ai',
      message: 'Database connections are healthy. Auth service is operating normally with 0.02% error rate. The issue is isolated to cache memory exhaustion.'
    },
    {
      type: 'user',
      message: 'Is this the root cause?'
    },
    {
      type: 'ai',
      message: 'Yes, I\'ve identified the root cause. Cache memory exhaustion is causing cascade failures. I\'ve added this to the investigation map.'
    },
    {
      type: 'user',
      message: 'What should we do to fix it?'
    },
    {
      type: 'ai',
      message: 'Based on the analysis, I recommend three remediation steps: 1) Restart cache service to clear memory, 2) Scale up cache instances, 3) Review cache TTL configuration.'
    },
    {
      type: 'user',
      message: 'Add those actions to the panel'
    },
    {
      type: 'ai',
      message: 'Remediation actions have been added to Step 5. You can execute the restart immediately, or review the scaling and config changes first.'
    },
    {
      type: 'user',
      message: 'I\'ll review the scaling options'
    },
    {
      type: 'ai',
      message: 'Great. The scaling recommendation increases cache instances from 3 to 6. This should provide adequate headroom for peak traffic.'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [selectedNode, setSelectedNode] = useState<string | null>('cache');

  const sendMessage = () => {
    if (chatInput.trim()) {
      setChatMessages([...chatMessages, { type: 'user', message: chatInput }]);
      setChatInput('');
      // Simulate AI response
      setTimeout(() => {
        setChatMessages(prev => [...prev, { 
          type: 'ai', 
          message: 'I can add a node to the canvas for network logs. Would you like me to proceed?' 
        }]);
      }, 1000);
    }
  };

  const getHypothesisStyle = (status: string) => {
    switch (status) {
      case 'active':
        return {
          border: 'border-green-300',
          bg: 'from-green-50 to-emerald-50',
          iconBg: 'bg-green-100',
          iconColor: 'text-green-600',
          textColor: 'text-green-900',
          badgeBg: 'bg-green-100',
          badgeText: 'text-green-700',
          icon: CheckCircle
        };
      case 'investigating':
        return {
          border: 'border-blue-200',
          bg: 'from-blue-50 to-cyan-50',
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600',
          textColor: 'text-blue-900',
          badgeBg: 'bg-blue-100',
          badgeText: 'text-blue-700',
          icon: Search
        };
      case 'rejected':
        return {
          border: 'border-slate-200',
          bg: 'from-slate-50 to-slate-100',
          iconBg: 'bg-slate-100',
          iconColor: 'text-slate-500',
          textColor: 'text-slate-600',
          badgeBg: 'bg-slate-100',
          badgeText: 'text-slate-600',
          icon: XCircle
        };
      default:
        return {
          border: 'border-blue-200',
          bg: 'from-blue-50 to-cyan-50',
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600',
          textColor: 'text-blue-900',
          badgeBg: 'bg-blue-100',
          badgeText: 'text-blue-700',
          icon: Lightbulb
        };
    }
  };

  return (
    <div className="space-y-4">
      {/* Three Hypothesis Boxes */}
      <div className="grid grid-cols-3 gap-4">
        {hypotheses.map((hypothesis) => {
          const style = getHypothesisStyle(hypothesis.status);
          const Icon = style.icon;
          
          return (
            <div 
              key={hypothesis.id}
              className={`bg-white border-2 ${style.border} rounded-lg p-3 shadow-xs`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-5 h-5 rounded ${style.iconBg} border ${style.border} flex items-center justify-center`}>
                  <Icon className={`w-3 h-3 ${style.iconColor}`} />
                </div>
                <div className="text-xs text-slate-500 uppercase tracking-wide">Hypothesis {hypothesis.id}</div>
                <div className={`ml-auto text-xs px-2 py-0.5 rounded border ${style.border} ${style.badgeBg} ${style.badgeText}`}>
                  {hypothesis.confidence}
                </div>
              </div>
              
              {/* Wireframe text lines instead of textarea */}
              <div className="space-y-1.5 mb-2">
                <div className={`h-1.5 ${style.iconBg} rounded-full`} style={{ width: '100%' }}></div>
                <div className={`h-1.5 ${style.iconBg} rounded-full`} style={{ width: '85%' }}></div>
              </div>
              
              <div className="flex items-center gap-2 pt-1.5 border-t border-slate-200">
                <Brain className="w-2.5 h-2.5 text-slate-400" />
                <div className="h-1 bg-slate-200 rounded-full flex-1"></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content: Canvas + AI Sidebar */}
      <div className="grid grid-cols-[1fr_380px] gap-4">
        {/* Investigation Canvas */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 relative overflow-auto" style={{ height: '800px' }}>
          <div className="text-xs uppercase tracking-wider text-slate-500 mb-6">Investigation Map</div>
          
          {/* Nodes */}
          <div className="relative max-w-3xl mx-auto" style={{ zIndex: 1 }}>
            {/* STEP 1: Incident Trigger - Red Box at Top */}
            <div className="flex justify-center mb-2">
              <div className="bg-white border-2 border-red-400 rounded p-3 w-48">
                <div className="flex items-center gap-2 mb-2">
                  <div className="px-1.5 py-0.5 bg-red-100 text-red-800 text-xs rounded">STEP 1</div>
                  <AlertTriangle className="w-3 h-3 text-red-600" />
                  <div className="text-xs font-semibold text-slate-700">Incident</div>
                </div>
                <div className="space-y-1">
                  <div className="h-1.5 bg-red-100 rounded-full w-full"></div>
                  <div className="h-1.5 bg-red-100 rounded-full w-3/4"></div>
                </div>
              </div>
            </div>

            {/* Connector Line 1 to 2 */}
            <div className="flex justify-center mb-2">
              <div className="w-0.5 h-12 border-l-2 border-dashed border-slate-300"></div>
            </div>

            {/* STEP 2: Service Health Verification */}
            <div className="mb-2">
              <div className="text-xs text-slate-500 mb-2 flex items-center gap-2">
                <div className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">STEP 2</div>
                <span className="text-xs">Service Health</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {/* Auth Service - Green (Healthy) */}
                <div 
                  className="bg-white border border-green-400 rounded p-2 cursor-pointer hover:border-green-500 transition-colors"
                  onClick={() => setSelectedNode('auth')}
                >
                  <div className="flex items-center gap-1 mb-1">
                    <CheckCircle className="w-2.5 h-2.5 text-green-600" />
                    <div className="text-xs text-slate-700">Auth</div>
                  </div>
                  <div className="space-y-1">
                    <div className="h-1 bg-green-100 rounded-full w-full"></div>
                    <div className="h-1 bg-green-100 rounded-full w-4/5"></div>
                  </div>
                </div>

                {/* Database - Green (Healthy) */}
                <div 
                  className="bg-white border border-green-400 rounded p-2 cursor-pointer hover:border-green-500 transition-colors"
                  onClick={() => setSelectedNode('database')}
                >
                  <div className="flex items-center gap-1 mb-1">
                    <CheckCircle className="w-2.5 h-2.5 text-green-600" />
                    <div className="text-xs text-slate-700">Database</div>
                  </div>
                  <div className="space-y-1">
                    <div className="h-1 bg-green-100 rounded-full w-full"></div>
                    <div className="h-1 bg-green-100 rounded-full w-5/6"></div>
                  </div>
                </div>

                {/* Cache Layer - Purple (Active Investigation) */}
                <div 
                  className={`bg-white border-2 ${selectedNode === 'cache' ? 'border-purple-600' : 'border-purple-400'} rounded p-2 cursor-pointer transition-all`}
                  onClick={() => setSelectedNode('cache')}
                >
                  <div className="flex items-center gap-1 mb-1">
                    <Search className="w-2.5 h-2.5 text-purple-600" />
                    <div className="text-xs text-slate-700">Cache</div>
                  </div>
                  <div className="space-y-1">
                    <div className="h-1 bg-purple-200 rounded-full w-full"></div>
                    <div className="h-1 bg-purple-200 rounded-full w-3/4"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Connector Line 2 to 3 */}
            {selectedNode === 'cache' && (
              <div className="flex justify-center mb-2">
                <div className="w-0.5 h-12 border-l-2 border-dashed border-purple-300"></div>
              </div>
            )}

            {/* STEP 3: Deep Investigation Area */}
            {selectedNode === 'cache' && (
              <div className="mb-2">
                <div className="text-xs text-slate-500 mb-2 flex items-center gap-2">
                  <div className="px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded text-xs">STEP 3</div>
                  <span className="text-xs">Component Analysis</span>
                </div>
                <div className="border border-dashed border-purple-300 rounded p-2 bg-purple-50/20">
                  <div className="grid grid-cols-4 gap-2">
                    {/* Redis Connection */}
                    <div className="bg-white border border-slate-300 rounded p-1.5">
                      <div className="flex items-center gap-1 mb-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                        <div className="text-xs text-slate-700">Redis</div>
                      </div>
                      <div className="space-y-0.5">
                        <div className="h-1 bg-slate-100 rounded-full w-full"></div>
                        <div className="h-1 bg-slate-100 rounded-full w-3/4"></div>
                      </div>
                    </div>

                    {/* Memory Usage */}
                    <div className="bg-white border-2 border-orange-400 rounded p-1.5">
                      <div className="flex items-center gap-1 mb-1">
                        <AlertCircle className="w-2.5 h-2.5 text-orange-600" />
                        <div className="text-xs text-orange-700">Memory</div>
                      </div>
                      <div className="space-y-0.5">
                        <div className="h-1 bg-orange-200 rounded-full w-full"></div>
                        <div className="h-1 bg-orange-200 rounded-full w-5/6"></div>
                      </div>
                    </div>

                    {/* Query Performance */}
                    <div className="bg-white border border-slate-300 rounded p-1.5">
                      <div className="flex items-center gap-1 mb-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                        <div className="text-xs text-slate-700">Query</div>
                      </div>
                      <div className="space-y-0.5">
                        <div className="h-1 bg-slate-100 rounded-full w-full"></div>
                        <div className="h-1 bg-slate-100 rounded-full w-3/4"></div>
                      </div>
                    </div>

                    {/* Connection Pool */}
                    <div className="bg-white border border-slate-300 rounded p-1.5">
                      <div className="flex items-center gap-1 mb-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                        <div className="text-xs text-slate-700">Pool</div>
                      </div>
                      <div className="space-y-0.5">
                        <div className="h-1 bg-slate-100 rounded-full w-full"></div>
                        <div className="h-1 bg-slate-100 rounded-full w-4/5"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Connector Line 3 to 4 */}
            {selectedNode === 'cache' && (
              <div className="flex justify-center mb-2">
                <div className="w-0.5 h-12 border-l-2 border-dashed border-slate-300"></div>
              </div>
            )}

            {/* STEP 4: Metrics & Log Analysis */}
            <div className="mb-2">
              <div className="text-xs text-slate-500 mb-2 flex items-center gap-2">
                <div className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">STEP 4</div>
                <span className="text-xs">Analysis</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {/* Time Series Metrics */}
                <div className="bg-white border border-slate-300 rounded p-2">
                  <div className="text-xs text-slate-700 mb-1">Time Series</div>
                  <div className="space-y-1">
                    <div className="h-1 bg-slate-200 rounded-full w-full"></div>
                    <div className="h-1 bg-slate-200 rounded-full w-4/5"></div>
                  </div>
                </div>

                {/* Root Cause Identified */}
                <div className="bg-white border-2 border-red-400 rounded p-2">
                  <div className="flex items-center gap-1 mb-1">
                    <AlertCircle className="w-2.5 h-2.5 text-red-600" />
                    <div className="text-xs text-red-900 font-semibold">Root Cause</div>
                  </div>
                  <div className="space-y-1">
                    <div className="h-1 bg-red-200 rounded-full w-full"></div>
                    <div className="h-1 bg-red-200 rounded-full w-2/3"></div>
                  </div>
                </div>

                {/* Event Logs */}
                <div className="bg-white border border-slate-300 rounded p-2">
                  <div className="text-xs text-slate-700 mb-1">Event Logs</div>
                  <div className="space-y-1">
                    <div className="h-1 bg-slate-200 rounded-full w-full"></div>
                    <div className="h-1 bg-slate-200 rounded-full w-3/4"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Connector Line 4 to 5 */}
            <div className="flex justify-center mb-2">
              <div className="w-0.5 h-12 border-l-2 border-dashed border-slate-300"></div>
            </div>

            {/* STEP 5: Remediation Actions */}
            <div className="mb-4">
              <div className="text-xs text-slate-500 mb-2 flex items-center gap-2">
                <div className="px-1.5 py-0.5 bg-green-100 text-green-700 rounded text-xs">STEP 5</div>
                <span className="text-xs">Remediation</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {/* Restart Service */}
                <div className="bg-white border border-green-300 rounded p-2">
                  <div className="flex items-center gap-1 mb-1">
                    <Lightbulb className="w-2.5 h-2.5 text-green-600" />
                    <div className="text-xs text-slate-700">Restart</div>
                  </div>
                  <div className="space-y-0.5 mb-1.5">
                    <div className="h-1 bg-green-100 rounded-full w-full"></div>
                    <div className="h-1 bg-green-100 rounded-full w-4/5"></div>
                  </div>
                  <button className="w-full px-2 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded text-xs hover:from-cyan-600 hover:to-blue-700 transition-all">
                    Execute
                  </button>
                </div>

                {/* Scale Up */}
                <div className="bg-white border border-green-300 rounded p-2">
                  <div className="flex items-center gap-1 mb-1">
                    <Lightbulb className="w-2.5 h-2.5 text-green-600" />
                    <div className="text-xs text-slate-700">Scale Up</div>
                  </div>
                  <div className="space-y-0.5 mb-1.5">
                    <div className="h-1 bg-green-100 rounded-full w-full"></div>
                    <div className="h-1 bg-green-100 rounded-full w-5/6"></div>
                  </div>
                  <button className="w-full px-2 py-1 bg-white border border-green-300 text-green-700 rounded text-xs hover:bg-green-50 transition-all">
                    Review
                  </button>
                </div>

                {/* Update Config */}
                <div className="bg-white border border-green-300 rounded p-2">
                  <div className="flex items-center gap-1 mb-1">
                    <Lightbulb className="w-2.5 h-2.5 text-green-600" />
                    <div className="text-xs text-slate-700">Config</div>
                  </div>
                  <div className="space-y-0.5 mb-1.5">
                    <div className="h-1 bg-green-100 rounded-full w-full"></div>
                    <div className="h-1 bg-green-100 rounded-full w-3/4"></div>
                  </div>
                  <button className="w-full px-2 py-1 bg-white border border-green-300 text-green-700 rounded text-xs hover:bg-green-50 transition-all">
                    Review
                  </button>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="absolute bottom-2 right-2">
              <button className="flex items-center gap-1.5 px-2 py-1.5 bg-white border border-cyan-300 text-cyan-700 rounded hover:bg-cyan-50 transition-colors text-xs">
                <Plus className="w-3 h-3" />
                Add Node
              </button>
            </div>
          </div>
        </div>

        {/* AI Sidebar */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col" style={{ height: '800px' }}>
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200">
            <Brain className="w-4 h-4 text-cyan-600" />
            <div className="text-xs uppercase tracking-wider text-slate-500">AI Assistant</div>
          </div>
          
          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto space-y-3 mb-4">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`flex gap-2 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.type === 'ai' && (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-100 to-blue-100 border border-cyan-200 flex items-center justify-center flex-shrink-0">
                    <Brain className="w-3.5 h-3.5 text-cyan-600" />
                  </div>
                )}
                <div className={`rounded-lg px-3 py-2 max-w-[280px] ${
                  msg.type === 'ai' 
                    ? 'bg-slate-50 border border-slate-200' 
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                }`}>
                  <div className={`text-xs leading-relaxed ${msg.type === 'ai' ? 'text-slate-700' : 'text-white'}`}>
                    {msg.message}
                  </div>
                </div>
                {msg.type === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-3.5 h-3.5 text-slate-600" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mb-3 space-y-1.5">
            <div className="text-xs text-slate-500 mb-2">Suggestions</div>
            <button className="w-full text-left px-2 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-700 hover:bg-slate-100 transition-colors">
              Add memory metrics node
            </button>
            <button className="w-full text-left px-2 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-700 hover:bg-slate-100 transition-colors">
              Show cache error logs
            </button>
          </div>

          {/* Input Area */}
          <div className="pt-3 border-t border-slate-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask AI to help investigate..."
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-cyan-400 focus:bg-white transition-colors"
              />
              <button
                onClick={sendMessage}
                className="px-3 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded hover:from-cyan-600 hover:to-blue-700 transition-all shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
