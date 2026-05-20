import { AlertTriangle, CheckCircle, MessageSquare, Plus, Search, Lightbulb, Send, XCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { IntuitAssistIcon } from './IntuitAssistIcon';

export function InvestigationCanvasExperience() {
  const [hypotheses, setHypotheses] = useState([
    {
      id: 1,
      text: 'Database latency is being caused by a runaway query in the reporting service',
      status: 'active',
      confidence: 'HIGH'
    },
    {
      id: 2,
      text: 'Cache Layer memory exhaustion is causing increased response times',
      status: 'investigating',
      confidence: 'MEDIUM'
    },
    {
      id: 3,
      text: 'Network connectivity issues between API Gateway and downstream services',
      status: 'rejected',
      confidence: 'LOW'
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
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [selectedHypothesis, setSelectedHypothesis] = useState<number>(2);
  const [executingAction, setExecutingAction] = useState<string | null>(null);
  const [completedActions, setCompletedActions] = useState<string[]>([]);
  const [reviewingAction, setReviewingAction] = useState<string | null>(null);

  const handleExecuteAction = (actionId: string) => {
    setExecutingAction(actionId);
    
    // Simulate execution time
    setTimeout(() => {
      setExecutingAction(null);
      setCompletedActions([...completedActions, actionId]);
      
      // Add AI message about successful execution
      const actionMessages: { [key: string]: string } = {
        'kill-query': 'Query RPT_447 has been successfully terminated. Database response time is returning to normal.',
        'restart-cache': 'Cache service has been restarted. Memory usage dropped to 42%. Error rate is normalizing.',
        'restart-lb': 'Load balancer has been restarted. Network latency has improved significantly.',
        'add-index': 'Index on created_at column has been created successfully. Query performance improved by 85%.',
        'optimize-query': 'Query optimization with caching has been applied. Response time reduced from 8.4s to 1.2s.',
        'scale-instances': 'Cache instances scaled from 3 to 6. Memory utilization normalized to 52%.',
        'update-ttl': 'Cache TTL updated to 1800s. Memory pressure reduced significantly.',
        'add-targets': 'Successfully added 3 healthy targets to load balancer. Capacity restored to 8/8.',
        'route-update': 'Routing optimization applied. Network latency reduced by 60%.'
      };
      
      if (actionMessages[actionId]) {
        setChatMessages([...chatMessages, {
          type: 'ai',
          message: actionMessages[actionId]
        }]);
      }
    }, 2500);
  };

  const handleReviewAction = (actionId: string) => {
    setReviewingAction(actionId);
  };

  const handleConfirmAction = (actionId: string) => {
    setReviewingAction(null);
    handleExecuteAction(actionId);
  };

  const handleCardClick = (cardId: string) => {
    setSelectedNode(cardId);
    setHoveredCard(hoveredCard === cardId ? null : cardId);
  };

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

  const getReviewDetails = (actionId: string) => {
    const details: { [key: string]: any } = {
      'add-index': {
        title: 'Add Database Index',
        description: 'Create an index on the created_at column to improve query performance',
        details: [
          { label: 'Table', value: 'reports', type: 'info' },
          { label: 'Column', value: 'created_at', type: 'info' },
          { label: 'Index Type', value: 'B-tree', type: 'info' },
          { label: 'Estimated Time', value: '~3 minutes', type: 'warning' },
          { label: 'Lock Required', value: 'CONCURRENT', type: 'success' },
          { label: 'Expected Improvement', value: '85%', type: 'success' }
        ],
        impact: 'This will significantly improve query performance for time-based queries. The CONCURRENT lock means the table remains available during index creation.',
        risks: 'Minimal - concurrent index creation allows read/write operations'
      },
      'optimize-query': {
        title: 'Optimize Query with Caching',
        description: 'Add result caching layer to reduce database load',
        details: [
          { label: 'Query ID', value: 'RPT_447', type: 'info' },
          { label: 'Current Runtime', value: '8.4s', type: 'warning' },
          { label: 'Expected Runtime', value: '1.2s', type: 'success' },
          { label: 'Cache TTL', value: '300s', type: 'info' },
          { label: 'Memory Required', value: '~180MB', type: 'info' },
          { label: 'Improvement', value: '85%', type: 'success' }
        ],
        impact: 'Caching will dramatically reduce database load and improve response times for repeated queries.',
        risks: 'Cache warming period may cause slight delay for first requests'
      },
      'scale-instances': {
        title: 'Scale Cache Instances',
        description: 'Increase cache instances from 3 to 6 for better capacity',
        details: [
          { label: 'Current Instances', value: '3', type: 'warning' },
          { label: 'Target Instances', value: '6', type: 'success' },
          { label: 'Memory per Instance', value: '16GB', type: 'info' },
          { label: 'Total Memory', value: '48GB → 96GB', type: 'success' },
          { label: 'Estimated Time', value: '~8 minutes', type: 'info' },
          { label: 'Additional Cost', value: '+$42/day', type: 'warning' }
        ],
        impact: 'Doubling capacity will provide significant headroom for peak traffic and prevent memory exhaustion.',
        risks: 'Additional cost of $42/day. Consider scaling down during low-traffic periods.'
      },
      'update-ttl': {
        title: 'Update Cache TTL Configuration',
        description: 'Reduce time-to-live to prevent memory buildup',
        details: [
          { label: 'Current TTL', value: '3600s (1 hour)', type: 'warning' },
          { label: 'Suggested TTL', value: '1800s (30 min)', type: 'success' },
          { label: 'Memory Reduction', value: '~40%', type: 'success' },
          { label: 'Cache Hit Impact', value: 'Minimal (-2%)', type: 'info' },
          { label: 'Apply Time', value: 'Immediate', type: 'success' }
        ],
        impact: 'Shorter TTL will reduce memory pressure while maintaining good cache hit rates.',
        risks: 'Slightly increased cache misses, but within acceptable range'
      },
      'add-targets': {
        title: 'Add Load Balancer Targets',
        description: 'Register 3 additional healthy targets to restore capacity',
        details: [
          { label: 'Current Targets', value: '5/8 healthy', type: 'warning' },
          { label: 'New Targets', value: '3 instances', type: 'success' },
          { label: 'Final Capacity', value: '8/8 healthy', type: 'success' },
          { label: 'Target IPs', value: '10.0.1.47, 10.0.1.48, 10.0.1.49', type: 'info' },
          { label: 'Health Check', value: 'Passing', type: 'success' },
          { label: 'Registration Time', value: '~2 minutes', type: 'info' }
        ],
        impact: 'Restoring full capacity will improve load distribution and reduce individual target strain.',
        risks: 'None - targets are pre-verified and healthy'
      },
      'route-update': {
        title: 'Optimize Network Routing',
        description: 'Update routing configuration to reduce network latency',
        details: [
          { label: 'Current Latency', value: '240ms avg', type: 'warning' },
          { label: 'Expected Latency', value: '96ms avg', type: 'success' },
          { label: 'Improvement', value: '-60%', type: 'success' },
          { label: 'Route Changes', value: '4 paths optimized', type: 'info' },
          { label: 'Downtime', value: 'None (rolling update)', type: 'success' },
          { label: 'Apply Time', value: '~5 minutes', type: 'info' }
        ],
        impact: 'Optimized routing will significantly reduce network latency and improve user experience.',
        risks: 'Minimal - rolling update ensures zero downtime'
      }
    };
    return details[actionId];
  };

  const getHypothesisStyle = (status: string) => {
    switch (status) {
      case 'active':
        return {
          iconColor: 'text-green-600',
          textColor: 'text-slate-900',
          badgeBg: 'bg-green-50',
          badgeText: 'text-green-700',
          icon: CheckCircle,
          statusText: 'Validated',
          statusColor: 'text-green-600'
        };
      case 'investigating':
        return {
          iconColor: 'text-blue-600',
          textColor: 'text-slate-900',
          badgeBg: 'bg-amber-50',
          badgeText: 'text-amber-700',
          icon: Search,
          statusText: 'Analyzing',
          statusColor: 'text-blue-600'
        };
      case 'rejected':
        return {
          iconColor: 'text-slate-400',
          textColor: 'text-slate-600',
          badgeBg: 'bg-slate-100',
          badgeText: 'text-slate-600',
          icon: XCircle,
          statusText: 'Dismissed',
          statusColor: 'text-slate-500'
        };
      default:
        return {
          iconColor: 'text-blue-600',
          textColor: 'text-slate-900',
          badgeBg: 'bg-slate-100',
          badgeText: 'text-slate-600',
          icon: Lightbulb,
          statusText: 'Pending',
          statusColor: 'text-slate-600'
        };
    }
  };

  return (
    <div className="w-full space-y-3">
      {/* Three Hypothesis Boxes */}
      <div className="grid grid-cols-3 gap-3">
        {hypotheses.map((hypothesis) => {
          const style = getHypothesisStyle(hypothesis.status);
          const Icon = style.icon;
          
          return (
            <div 
              key={hypothesis.id}
              className={`bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all cursor-pointer ${
                selectedHypothesis === hypothesis.id ? 'border border-cyan-400' : 'border border-slate-200'
              }`}
              onClick={() => setSelectedHypothesis(hypothesis.id)}
            >
              <div className="flex items-center gap-3 mb-3">
                <Icon className={`w-4 h-4 ${style.iconColor}`} />
                <div className="flex-1">
                  <div className="text-xs text-slate-500">Hypothesis {hypothesis.id}</div>
                </div>
                <div className={`text-xs px-2 py-0.5 rounded ${style.badgeBg} ${style.badgeText} font-medium`}>
                  {hypothesis.confidence}
                </div>
              </div>
              
              {/* Hypothesis text */}
              <div className="mb-3">
                <p className={`text-sm ${style.textColor} leading-relaxed`}>{hypothesis.text}</p>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                <div className="text-xs text-slate-500">AI Generated</div>
                <div className={`text-xs font-medium ${style.statusColor}`}>
                  {style.statusText}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content: Canvas */}
      <div className="grid grid-cols-1 gap-4">
        {/* Investigation Canvas */}
        <div className="bg-slate-50 rounded-xl p-8 relative overflow-auto" style={{ height: '800px' }}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="text-sm font-semibold text-slate-900 mb-1">Investigation Flow</div>
              <div className="text-xs text-slate-500">Visual timeline of incident analysis</div>
            </div>
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-cyan-300 text-cyan-700 rounded-lg hover:bg-cyan-50 transition-all shadow-xs text-xs font-medium">
              <Plus className="w-3.5 h-3.5" />
              Add Node
            </button>
          </div>
          
          {/* Nodes */}
          <div className="relative" style={{ zIndex: 1 }}>
            {/* STEP 1: Incident Trigger */}
            <div className="mb-4">
              <div className="text-xs text-slate-500 mb-3 text-center">Step 1: Incident Trigger</div>
              <div className="flex justify-center">
                <div className="bg-white border border-slate-200 rounded-lg p-4 w-80 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <div className="text-sm font-semibold text-slate-900">
                      {selectedHypothesis === 1 && "Database Latency Spike"}
                      {selectedHypothesis === 2 && "Cache Service Error Spike"}
                      {selectedHypothesis === 3 && "Network Timeout Errors"}
                    </div>
                  </div>
                  <div className="space-y-2 mb-3">
                    {selectedHypothesis === 1 && (
                      <>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">Query Time</div>
                          <div className="text-xs font-medium text-red-600">2,847ms</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">Started</div>
                          <div className="text-xs font-medium text-slate-900">14:23 UTC</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">Duration</div>
                          <div className="text-xs font-medium text-slate-900">22 minutes</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">Affected Queries</div>
                          <div className="text-xs font-medium text-orange-600">~180/min</div>
                        </div>
                      </>
                    )}
                    {selectedHypothesis === 2 && (
                      <>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">Error Rate</div>
                          <div className="text-xs font-medium text-red-600">2.34%</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">Started</div>
                          <div className="text-xs font-medium text-slate-900">14:23 UTC</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">Duration</div>
                          <div className="text-xs font-medium text-slate-900">18 minutes</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">Affected Users</div>
                          <div className="text-xs font-medium text-orange-600">~2,400</div>
                        </div>
                      </>
                    )}
                    {selectedHypothesis === 3 && (
                      <>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">Timeout Rate</div>
                          <div className="text-xs font-medium text-red-600">8.2%</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">Started</div>
                          <div className="text-xs font-medium text-slate-900">14:20 UTC</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">Duration</div>
                          <div className="text-xs font-medium text-slate-900">25 minutes</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">Failed Requests</div>
                          <div className="text-xs font-medium text-orange-600">~1,240</div>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="pt-2 border-t border-slate-200">
                    <div className="inline-block px-2 py-0.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded">
                      Critical Severity
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Connector Line 1 to 2 */}
            <div className="flex justify-center mb-4">
              <div className="w-px h-8 border-l-2 border-dotted border-slate-400"></div>
            </div>

            {/* STEP 2: Service Health Check */}
            <div className="mb-4">
              <div className="text-xs text-slate-500 mb-3 text-center">Step 2: Service Health Check</div>
              <div className="grid grid-cols-3 gap-3">
                {/* Different services based on selected hypothesis */}
                {selectedHypothesis === 1 && (
                  <>
                    {/* Database Card */}
                    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        <div className="text-sm font-medium text-slate-900">Database</div>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">Query Time</div>
                          <div className="text-xs font-medium text-red-600">2,847ms</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">CPU Usage</div>
                          <div className="text-xs font-medium text-orange-600">89%</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">Slow Queries</div>
                          <div className="text-xs font-medium text-red-600">47</div>
                        </div>
                      </div>
                    </div>

                    {/* Reporting Service Card */}
                    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <Search className="w-4 h-4 text-slate-700" />
                        <div className="text-sm font-medium text-slate-900">Reporting</div>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">Active Jobs</div>
                          <div className="text-xs font-medium text-orange-600">142</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">Latency</div>
                          <div className="text-xs font-medium text-red-600">3,200ms</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">Queue Depth</div>
                          <div className="text-xs font-medium text-orange-600">847</div>
                        </div>
                      </div>
                    </div>

                    {/* Cache Layer - Healthy */}
                    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <div className="text-sm font-medium text-slate-900">Cache Layer</div>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">Memory</div>
                          <div className="text-xs font-medium text-green-600">58%</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">Hit Rate</div>
                          <div className="text-xs font-medium text-green-600">96%</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">Latency</div>
                          <div className="text-xs font-medium text-green-600">8ms</div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {selectedHypothesis === 2 && (
                  <>
                    {/* Auth Service - Healthy */}
                    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <div className="text-sm font-medium text-slate-900">Auth Service</div>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">Error Rate</div>
                          <div className="text-xs font-medium text-green-600">0.02%</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">Latency</div>
                          <div className="text-xs font-medium text-green-600">42ms</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">Requests/s</div>
                          <div className="text-xs font-medium text-green-600">1,240</div>
                        </div>
                      </div>
                    </div>

                    {/* Database - Healthy */}
                    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <div className="text-sm font-medium text-slate-900">Database</div>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">Connections</div>
                          <div className="text-xs font-medium text-green-600">Normal</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">Query Time</div>
                          <div className="text-xs font-medium text-green-600">18ms</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">CPU Usage</div>
                          <div className="text-xs font-medium text-green-600">34%</div>
                        </div>
                      </div>
                    </div>

                    {/* Cache Layer - Issue */}
                    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        <div className="text-sm font-medium text-slate-900">Cache Layer</div>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">Memory</div>
                          <div className="text-xs font-medium text-orange-600">94%</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">Hit Rate</div>
                          <div className="text-xs font-medium text-red-600">62%</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">Evictions</div>
                          <div className="text-xs font-medium text-red-600">High</div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {selectedHypothesis === 3 && (
                  <>
                    {/* API Gateway - Issue */}
                    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        <div className="text-sm font-medium text-slate-900">API Gateway</div>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">Timeout Rate</div>
                          <div className="text-xs font-medium text-red-600">8.2%</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">Latency</div>
                          <div className="text-xs font-medium text-red-600">4,200ms</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">Failed Req</div>
                          <div className="text-xs font-medium text-orange-600">1,240</div>
                        </div>
                      </div>
                    </div>

                    {/* Load Balancer - Warning */}
                    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <Search className="w-4 h-4 text-slate-700" />
                        <div className="text-sm font-medium text-slate-900">Load Balancer</div>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">Health</div>
                          <div className="text-xs font-medium text-orange-600">Degraded</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">Active Conn</div>
                          <div className="text-xs font-medium text-orange-600">8,420</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">Unhealthy</div>
                          <div className="text-xs font-medium text-red-600">3/8</div>
                        </div>
                      </div>
                    </div>

                    {/* Backend Services - Healthy */}
                    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <div className="text-sm font-medium text-slate-900">Backend</div>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">Error Rate</div>
                          <div className="text-xs font-medium text-green-600">0.04%</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">Response</div>
                          <div className="text-xs font-medium text-green-600">120ms</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">CPU</div>
                          <div className="text-xs font-medium text-green-600">42%</div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Connector Line 2 to 3 */}
            <div className="flex justify-center mb-4">
              <div className="w-px h-8 border-l-2 border-dotted border-slate-400"></div>
            </div>

            {/* STEP 3: Component Analysis */}
            <div className="mb-4">
              <div className="text-xs text-slate-500 mb-3 text-center">Step 3: Component Analysis</div>
              <div className="grid grid-cols-4 gap-3">
                {selectedHypothesis === 1 && (
                  <>
                    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        <div className="text-sm font-medium text-slate-900">Query</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-red-600">ID: RPT_447</div>
                        <div className="text-xs text-slate-500">8.4s runtime</div>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                        <div className="text-sm font-medium text-slate-900">Table Scan</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-orange-600">Full scan</div>
                        <div className="text-xs text-slate-500">2.4M rows</div>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                        <div className="text-sm font-medium text-slate-900">Index</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-orange-600">Missing</div>
                        <div className="text-xs text-slate-500">created_at</div>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                        <div className="text-sm font-medium text-slate-900">Lock</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-green-600">None</div>
                        <div className="text-xs text-slate-500">0 waiting</div>
                      </div>
                    </div>
                  </>
                )}

                {selectedHypothesis === 2 && (
                  <>
                    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                        <div className="text-sm font-medium text-slate-900">Redis</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-slate-500">Conn: 450/500</div>
                        <div className="text-xs text-green-600">Stable</div>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-orange-500" />
                        <div className="text-sm font-medium text-slate-900">Memory</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-orange-600">15.8GB/16GB</div>
                        <div className="text-xs text-red-600">Critical</div>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                        <div className="text-sm font-medium text-slate-900">Query</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-slate-500">Avg: 8ms</div>
                        <div className="text-xs text-green-600">Normal</div>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <div className="text-sm font-medium text-slate-900">Pool</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-slate-500">Active: 89%</div>
                        <div className="text-xs text-green-600">Healthy</div>
                      </div>
                    </div>
                  </>
                )}

                {selectedHypothesis === 3 && (
                  <>
                    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        <div className="text-sm font-medium text-slate-900">Network</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-red-600">High latency</div>
                        <div className="text-xs text-slate-500">240ms avg</div>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                        <div className="text-sm font-medium text-slate-900">DNS</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-orange-600">Slow</div>
                        <div className="text-xs text-slate-500">180ms</div>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <div className="text-sm font-medium text-slate-900">Packet Loss</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-red-600">4.2%</div>
                        <div className="text-xs text-slate-500">Critical</div>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <div className="text-sm font-medium text-slate-900">SSL</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-green-600">Normal</div>
                        <div className="text-xs text-slate-500">42ms</div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Connector Line 3 to 4 */}
            <div className="flex justify-center mb-4">
              <div className="w-px h-8 border-l-2 border-dotted border-slate-400"></div>
            </div>

            {/* STEP 4: Analysis */}
            <div className="mb-4">
              <div className="text-xs text-slate-500 mb-3 text-center">Step 4: Root Cause Analysis</div>
              <div className="grid grid-cols-3 gap-3">
                {selectedHypothesis === 1 && (
                  <>
                    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <div className="text-sm font-medium text-slate-900">Query Pattern</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-slate-600">Heavy aggregation</div>
                        <div className="text-xs text-amber-600">No caching</div>
                        <div className="text-xs text-slate-500">Started 14:15</div>
                      </div>
                    </div>

                    <div className="bg-white border border-red-300 rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        <div className="text-sm font-medium text-slate-900">Root Cause</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-slate-700">Runaway Query</div>
                        <div className="text-xs text-red-600">Missing index</div>
                        <div className="text-xs text-slate-500">Confidence: 94%</div>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                        <div className="text-sm font-medium text-slate-900">Impact</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-slate-600">180 queries/min</div>
                        <div className="text-xs text-orange-600">DB overload</div>
                        <div className="text-xs text-slate-500">14:15-14:37</div>
                      </div>
                    </div>
                  </>
                )}

                {selectedHypothesis === 2 && (
                  <>
                    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <div className="text-sm font-medium text-slate-900">Time Series</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-slate-600">Memory Trend</div>
                        <div className="text-xs text-amber-600">Spike at 14:23</div>
                        <div className="text-xs text-slate-500">+42% in 3min</div>
                      </div>
                    </div>

                    <div className="bg-white border border-red-300 rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        <div className="text-sm font-medium text-slate-900">Root Cause</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-slate-700">Memory Exhaustion</div>
                        <div className="text-xs text-red-600">94% capacity</div>
                        <div className="text-xs text-slate-500">Confidence: 96%</div>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                        <div className="text-sm font-medium text-slate-900">Event Logs</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-slate-600">2,847 entries</div>
                        <div className="text-xs text-blue-600">Timeouts</div>
                        <div className="text-xs text-slate-500">14:23-14:41</div>
                      </div>
                    </div>
                  </>
                )}

                {selectedHypothesis === 3 && (
                  <>
                    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <div className="text-sm font-medium text-slate-900">Trace Data</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-slate-600">Route analysis</div>
                        <div className="text-xs text-amber-600">Path delays</div>
                        <div className="text-xs text-slate-500">240ms avg</div>
                      </div>
                    </div>

                    <div className="bg-white border border-red-300 rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        <div className="text-sm font-medium text-slate-900">Root Cause</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-slate-700">Network Issue</div>
                        <div className="text-xs text-red-600">Packet loss 4.2%</div>
                        <div className="text-xs text-slate-500">Confidence: 78%</div>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                        <div className="text-sm font-medium text-slate-900">Logs</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-slate-600">1,240 timeouts</div>
                        <div className="text-xs text-orange-600">Gateway</div>
                        <div className="text-xs text-slate-500">14:20-14:45</div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Connector Line 4 to 5 */}
            <div className="flex justify-center mb-4">
              <div className="w-px h-8 border-l-2 border-dotted border-slate-400"></div>
            </div>

            {/* STEP 5: Remediation Actions */}
            <div className="mb-4">
              <div className="text-xs text-slate-500 mb-3 text-center">Step 5: Remediation</div>
              <div className="grid grid-cols-3 gap-3">
                {selectedHypothesis === 1 && (
                  <>
                    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="w-4 h-4 text-slate-600" />
                        <div className="text-sm font-medium text-slate-900">Kill Query</div>
                      </div>
                      <div className="space-y-1.5 mb-3">
                        <div className="text-xs text-slate-500">Terminate runaway query</div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">Impact</div>
                          <div className="text-xs font-medium text-green-600">Immediate</div>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleExecuteAction('kill-query')}
                        disabled={executingAction === 'kill-query' || completedActions.includes('kill-query')}
                        className={`relative overflow-hidden w-full px-3 py-1.5 rounded text-xs transition-all duration-300 font-medium ${
                          completedActions.includes('kill-query')
                            ? 'bg-green-500 text-white cursor-default'
                            : executingAction === 'kill-query'
                            ? 'bg-gradient-to-r from-cyan-400 to-blue-600 text-white cursor-wait'
                            : 'bg-gradient-to-r from-cyan-400 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-700'
                        }`}
                      >
                        {completedActions.includes('kill-query') ? (
                          <span className="flex items-center justify-center gap-1.5">
                            <CheckCircle className="w-3.5 h-3.5" />
                            Completed
                          </span>
                        ) : executingAction === 'kill-query' ? (
                          <span className="flex items-center justify-center gap-1.5">
                            <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Executing...
                          </span>
                        ) : (
                          'Execute'
                        )}
                      </button>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="w-4 h-4 text-slate-600" />
                        <div className="text-sm font-medium text-slate-900">Add Index</div>
                      </div>
                      <div className="space-y-1.5 mb-3">
                        <div className="text-xs text-slate-500">Create created_at index</div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">Time</div>
                          <div className="text-xs font-medium text-slate-900">~3 min</div>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleReviewAction('add-index')}
                        className="w-full px-3 py-1.5 bg-white border border-slate-300 text-slate-700 rounded text-xs hover:bg-slate-50 transition-all font-medium">
                        Review
                      </button>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="w-4 h-4 text-slate-600" />
                        <div className="text-sm font-medium text-slate-900">Optimize Query</div>
                      </div>
                      <div className="space-y-1.5 mb-3">
                        <div className="text-xs text-slate-500">Add result caching</div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">Improvement</div>
                          <div className="text-xs font-medium text-cyan-600">~85%</div>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleReviewAction('optimize-query')}
                        className="w-full px-3 py-1.5 bg-white border border-slate-300 text-slate-700 rounded text-xs hover:bg-slate-50 transition-all font-medium">
                        Review
                      </button>
                    </div>
                  </>
                )}

                {selectedHypothesis === 2 && (
                  <>
                    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="w-4 h-4 text-slate-600" />
                        <div className="text-sm font-medium text-slate-900">Restart Cache</div>
                      </div>
                      <div className="space-y-1.5 mb-3">
                        <div className="text-xs text-slate-500">Clear memory & reset</div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">Est. Time</div>
                          <div className="text-xs font-medium text-slate-900">2 min</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">Impact</div>
                          <div className="text-xs font-medium text-amber-600">Low</div>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleExecuteAction('restart-cache')}
                        disabled={executingAction === 'restart-cache' || completedActions.includes('restart-cache')}
                        className={`relative overflow-hidden w-full px-3 py-1.5 rounded text-xs transition-all duration-300 font-medium ${
                          completedActions.includes('restart-cache')
                            ? 'bg-green-500 text-white cursor-default'
                            : executingAction === 'restart-cache'
                            ? 'bg-gradient-to-r from-cyan-400 to-blue-600 text-white cursor-wait'
                            : 'bg-gradient-to-r from-cyan-400 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-700'
                        }`}
                      >
                        {completedActions.includes('restart-cache') ? (
                          <span className="flex items-center justify-center gap-1.5">
                            <CheckCircle className="w-3.5 h-3.5" />
                            Completed
                          </span>
                        ) : executingAction === 'restart-cache' ? (
                          <span className="flex items-center justify-center gap-1.5">
                            <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Executing...
                          </span>
                        ) : (
                          'Execute'
                        )}
                      </button>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="w-4 h-4 text-slate-600" />
                        <div className="text-sm font-medium text-slate-900">Scale Instances</div>
                      </div>
                      <div className="space-y-1.5 mb-3">
                        <div className="text-xs text-slate-500">3 → 6 instances</div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">Est. Time</div>
                          <div className="text-xs font-medium text-slate-900">8 min</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">Cost</div>
                          <div className="text-xs font-medium text-slate-900">+$42/day</div>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleReviewAction('scale-instances')}
                        className="w-full px-3 py-1.5 bg-white border border-slate-300 text-slate-700 rounded text-xs hover:bg-slate-50 transition-all font-medium">
                        Review
                      </button>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="w-4 h-4 text-slate-600" />
                        <div className="text-sm font-medium text-slate-900">Update TTL</div>
                      </div>
                      <div className="space-y-1.5 mb-3">
                        <div className="text-xs text-slate-500">Review cache config</div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">Current TTL</div>
                          <div className="text-xs font-medium text-slate-900">3600s</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">Suggested</div>
                          <div className="text-xs font-medium text-cyan-600">1800s</div>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleReviewAction('update-ttl')}
                        className="w-full px-3 py-1.5 bg-white border border-slate-300 text-slate-700 rounded text-xs hover:bg-slate-50 transition-all font-medium">
                        Review
                      </button>
                    </div>
                  </>
                )}

                {selectedHypothesis === 3 && (
                  <>
                    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="w-4 h-4 text-slate-600" />
                        <div className="text-sm font-medium text-slate-900">Restart LB</div>
                      </div>
                      <div className="space-y-1.5 mb-3">
                        <div className="text-xs text-slate-500">Reset load balancer</div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">Time</div>
                          <div className="text-xs font-medium text-slate-900">1 min</div>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleExecuteAction('restart-lb')}
                        disabled={executingAction === 'restart-lb' || completedActions.includes('restart-lb')}
                        className={`relative overflow-hidden w-full px-3 py-1.5 rounded text-xs transition-all duration-300 font-medium ${
                          completedActions.includes('restart-lb')
                            ? 'bg-green-500 text-white cursor-default'
                            : executingAction === 'restart-lb'
                            ? 'bg-gradient-to-r from-cyan-400 to-blue-600 text-white cursor-wait'
                            : 'bg-gradient-to-r from-cyan-400 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-700'
                        }`}
                      >
                        {completedActions.includes('restart-lb') ? (
                          <span className="flex items-center justify-center gap-1.5">
                            <CheckCircle className="w-3.5 h-3.5" />
                            Completed
                          </span>
                        ) : executingAction === 'restart-lb' ? (
                          <span className="flex items-center justify-center gap-1.5">
                            <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Executing...
                          </span>
                        ) : (
                          'Execute'
                        )}
                      </button>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="w-4 h-4 text-slate-600" />
                        <div className="text-sm font-medium text-slate-900">Add Targets</div>
                      </div>
                      <div className="space-y-1.5 mb-3">
                        <div className="text-xs text-slate-500">Register 3 targets</div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">Current</div>
                          <div className="text-xs font-medium text-orange-600">5/8</div>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleReviewAction('add-targets')}
                        className="w-full px-3 py-1.5 bg-white border border-slate-300 text-slate-700 rounded text-xs hover:bg-slate-50 transition-all font-medium">
                        Review
                      </button>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="w-4 h-4 text-slate-600" />
                        <div className="text-sm font-medium text-slate-900">Route Update</div>
                      </div>
                      <div className="space-y-1.5 mb-3">
                        <div className="text-xs text-slate-500">Optimize routing</div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">Latency</div>
                          <div className="text-xs font-medium text-cyan-600">-60%</div>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleReviewAction('route-update')}
                        className="w-full px-3 py-1.5 bg-white border border-slate-300 text-slate-700 rounded text-xs hover:bg-slate-50 transition-all font-medium">
                        Review
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {reviewingAction && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setReviewingAction(null)}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-auto m-4" onClick={(e) => e.stopPropagation()}>
            {(() => {
              const details = getReviewDetails(reviewingAction);
              if (!details) return null;
              
              return (
                <>
                  {/* Header */}
                  <div className="p-6 border-b border-slate-200">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-slate-900 mb-1">{details.title}</h2>
                        <p className="text-sm text-slate-600">{details.description}</p>
                      </div>
                      <button
                        onClick={() => setReviewingAction(null)}
                        className="text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="p-6 space-y-6">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900 mb-3">Configuration Details</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {details.details.map((item: any, index: number) => (
                          <div key={index} className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                            <div className="text-xs text-slate-500 mb-1">{item.label}</div>
                            <div className={`text-sm font-medium ${
                              item.type === 'success' ? 'text-green-600' :
                              item.type === 'warning' ? 'text-orange-600' :
                              item.type === 'error' ? 'text-red-600' :
                              'text-slate-900'
                            }`}>
                              {item.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Impact Section */}
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900 mb-2">Expected Impact</h3>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-sm text-slate-700">{details.impact}</p>
                      </div>
                    </div>

                    {/* Risks Section */}
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900 mb-2">Risks & Considerations</h3>
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                        <p className="text-sm text-slate-700">{details.risks}</p>
                      </div>
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="p-6 border-t border-slate-200 flex items-center justify-end gap-3">
                    <button
                      onClick={() => setReviewingAction(null)}
                      className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleConfirmAction(reviewingAction)}
                      className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-cyan-400 to-blue-600 text-white rounded-lg hover:from-cyan-500 hover:to-blue-700 transition-all shadow-sm"
                    >
                      Confirm & Execute
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
