import { CheckCircle2, Loader2, Clock, TrendingUp, Database, FileText, AlertTriangle, Brain, Network, Zap, GitBranch, ChevronDown, ChevronRight, Filter, BarChart3 } from 'lucide-react';
import { useState } from 'react';
import { AiIcon } from './AiIcon';

interface AgentAction {
  id: string;
  timestamp: string;
  action: string;
  status: 'completed' | 'in-progress' | 'pending';
  details: string;
  icon: 'check' | 'database' | 'file' | 'trend' | 'alert' | 'brain' | 'network' | 'zap' | 'git';
  duration?: string;
  confidence?: number;
  expandedDetails?: {
    findings?: string[];
    dataPoints?: { label: string; value: string }[];
    artifacts?: { name: string; type: string }[];
  };
}

const agentActions: AgentAction[] = [
  {
    id: '1',
    timestamp: '14:55 UTC',
    action: 'Root Cause Identified',
    status: 'completed',
    details: 'Redis connection pool exhaustion in Cache Layer identified as primary cause',
    icon: 'check',
    duration: '45s',
    confidence: 94,
    expandedDetails: {
      findings: [
        'Connection pool reached 100% capacity at 14:23 UTC',
        'Timeout errors correlated with pool exhaustion',
        'Similar pattern observed in 2 previous incidents'
      ],
      dataPoints: [
        { label: 'Analysis Method', value: 'Multi-variate correlation' },
        { label: 'Data Sources', value: 'Metrics, Logs, Traces' },
        { label: 'Processing Time', value: '45 seconds' }
      ]
    }
  },
  {
    id: '2',
    timestamp: '14:54 UTC',
    action: 'Pattern Recognition Analysis',
    status: 'in-progress',
    details: 'Comparing incident with 2 similar cases: INC1765432, INC1723891',
    icon: 'brain',
    confidence: 67,
    expandedDetails: {
      findings: [
        'Analyzing historical incident patterns from last 90 days',
        'Matching error signatures and service topology',
        'Calculating similarity scores and remediation effectiveness'
      ],
      dataPoints: [
        { label: 'Historical Incidents', value: '2 similar cases found' },
        { label: 'Time Period', value: 'Last 90 days' },
        { label: 'Similarity Score', value: '87% match' }
      ]
    }
  },
  {
    id: '3',
    timestamp: '14:53 UTC',
    action: 'Deployment Correlation',
    status: 'completed',
    details: 'Linked to v2.4.0 deployment at 14:18 UTC with cache config changes',
    icon: 'git',
    duration: '1m 8s',
    confidence: 89,
    expandedDetails: {
      findings: [
        'Deployment v2.4.0 occurred 5 minutes before incident',
        'Cache configuration changes detected in deployment',
        'Connection pool settings modified from 1500 to 1000'
      ],
      dataPoints: [
        { label: 'Deployment Version', value: 'v2.4.0' },
        { label: 'Deployment Time', value: '14:18 UTC' },
        { label: 'Config Changes', value: '3 cache-related changes' }
      ],
      artifacts: [
        { name: 'deployment-manifest.yaml', type: 'Config' },
        { name: 'cache-config-diff.txt', type: 'Diff' }
      ]
    }
  },
  {
    id: '4',
    timestamp: '14:53 UTC',
    action: 'Log Analysis Complete',
    status: 'completed',
    details: 'Processed 2.4M log entries, identified 348 error patterns across 7 services',
    icon: 'file',
    duration: '2m 12s',
    confidence: 97,
    expandedDetails: {
      findings: [
        'Connection timeout errors: 2,547 occurrences',
        'Redis unavailable errors: 300 occurrences',
        'Error spike started at 14:23:17 UTC'
      ],
      dataPoints: [
        { label: 'Logs Processed', value: '2.4M entries' },
        { label: 'Time Range', value: 'Last 60 minutes' },
        { label: 'Error Patterns', value: '348 unique patterns' },
        { label: 'Affected Services', value: '7 services' }
      ]
    }
  },
  {
    id: '5',
    timestamp: '14:52 UTC',
    action: 'Service Dependencies Mapped',
    status: 'completed',
    details: 'Generated topology graph with 12 services and 24 dependency links',
    icon: 'network',
    duration: '18s',
    expandedDetails: {
      findings: [
        'Cache Layer has 8 downstream dependencies',
        'Critical path includes Auth Service and API Gateway',
        'Identified potential cascade failure points'
      ],
      dataPoints: [
        { label: 'Total Services', value: '12 services' },
        { label: 'Dependency Links', value: '24 connections' },
        { label: 'Critical Services', value: '4 high-priority' }
      ]
    }
  },
  {
    id: '6',
    timestamp: '14:52 UTC',
    action: 'Anomaly Detection',
    status: 'completed',
    details: 'Detected 5 anomalies: latency spike, error rate increase, connection pool saturation',
    icon: 'alert',
    duration: '1m 5s',
    confidence: 91,
    expandedDetails: {
      findings: [
        'P95 latency increased 247% above baseline',
        'Error rate jumped from 0.02% to 2.34%',
        'Connection pool utilization at 100%',
        'Memory usage anomaly detected (+45%)',
        'Cache hit rate dropped from 98% to 42%'
      ],
      dataPoints: [
        { label: 'Anomalies Detected', value: '5 critical anomalies' },
        { label: 'Detection Method', value: 'Statistical modeling' },
        { label: 'Baseline Period', value: 'Last 7 days' }
      ]
    }
  },
  {
    id: '7',
    timestamp: '14:51 UTC',
    action: 'Metric Correlation',
    status: 'completed',
    details: 'Analyzed 47 metrics across services, found 12 correlated patterns',
    icon: 'trend',
    duration: '56s',
    confidence: 88,
    expandedDetails: {
      findings: [
        'Strong correlation between pool saturation and error rate (r=0.94)',
        'Latency increase followed pool capacity by 2 minutes',
        'Cache miss rate inversely correlated with hit rate'
      ],
      dataPoints: [
        { label: 'Metrics Analyzed', value: '47 metrics' },
        { label: 'Correlated Patterns', value: '12 patterns' },
        { label: 'Correlation Strength', value: 'High (r>0.85)' }
      ]
    }
  },
  {
    id: '8',
    timestamp: '14:50 UTC',
    action: 'Data Collection',
    status: 'completed',
    details: 'Queried Prometheus, Elasticsearch, and Jaeger for 24h historical data',
    icon: 'database',
    duration: '2m 34s',
    expandedDetails: {
      findings: [
        'Retrieved 47 time-series metrics from Prometheus',
        'Collected 2.4M log entries from Elasticsearch',
        'Fetched 125K trace spans from Jaeger'
      ],
      dataPoints: [
        { label: 'Data Sources', value: '3 systems queried' },
        { label: 'Time Range', value: 'Last 24 hours' },
        { label: 'Total Data Points', value: '~2.5M records' }
      ]
    }
  }
];

export function AIAgentActivity() {
  const [expandedAction, setExpandedAction] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'in-progress' | 'pending'>('all');
  const [showStats, setShowStats] = useState(false);

  const getIconComponent = (icon: string, status: string) => {
    const iconClass = status === 'completed' ? 'w-4 h-4 text-emerald-600' : 
                      status === 'in-progress' ? 'w-4 h-4 text-blue-600' : 
                      'w-4 h-4 text-slate-400';
    
    switch (icon) {
      case 'check':
        return <CheckCircle2 className={iconClass} />;
      case 'database':
        return <Database className={iconClass} />;
      case 'file':
        return <FileText className={iconClass} />;
      case 'trend':
        return <TrendingUp className={iconClass} />;
      case 'alert':
        return <AlertTriangle className={iconClass} />;
      case 'brain':
        return <Brain className={iconClass} />;
      case 'network':
        return <Network className={iconClass} />;
      case 'zap':
        return <Zap className={iconClass} />;
      case 'git':
        return <GitBranch className={iconClass} />;
      default:
        return <CheckCircle2 className={iconClass} />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="text-[10px] font-medium text-emerald-600">Completed</span>;
      case 'in-progress':
        return <span className="text-[10px] font-medium text-blue-600">In Progress</span>;
      case 'pending':
        return <span className="text-[10px] font-medium text-slate-500">Pending</span>;
      default:
        return null;
    }
  };

  const filteredActions = filterStatus === 'all' 
    ? agentActions 
    : agentActions.filter(a => a.status === filterStatus);

  const completedCount = agentActions.filter(a => a.status === 'completed').length;
  const inProgressCount = agentActions.filter(a => a.status === 'in-progress').length;
  const pendingCount = agentActions.filter(a => a.status === 'pending').length;

  const totalDuration = agentActions
    .filter(a => a.duration)
    .reduce((acc, a) => {
      const match = a.duration?.match(/(\d+)m?\s*(\d+)?s?/);
      if (match) {
        const mins = parseInt(match[1]) || 0;
        const secs = parseInt(match[2]) || 0;
        return acc + (mins * 60) + secs;
      }
      return acc;
    }, 0);

  return (
    <div className="bg-white rounded-xl p-8 border border-slate-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
            <AiIcon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">AI Agent Activity</h3>
            <p className="text-xs text-slate-500">Real-time investigation progress</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowStats(!showStats)}
            className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
            title="Toggle statistics"
          >
            <BarChart3 className="w-4 h-4 text-slate-600" />
          </button>
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-purple-50 to-purple-100 rounded-full border border-purple-200">
            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-purple-700">Active {inProgressCount}</span>
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex items-center gap-1.5 mb-4">
        {[
          { id: 'all' as const, label: 'All', count: agentActions.length },
          { id: 'completed' as const, label: 'Completed', count: completedCount },
          { id: 'in-progress' as const, label: 'In Progress', count: inProgressCount },
          { id: 'pending' as const, label: 'Pending', count: pendingCount },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilterStatus(f.id)}
            className={`px-2.5 py-1 text-xs font-medium rounded-full transition-colors ${
              filterStatus === f.id
                ? 'bg-blue-50 text-blue-600 border border-blue-200'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-transparent'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Statistics Panel */}
      {showStats && (
        <div className="mb-4 p-3 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border border-purple-200">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs text-slate-600 mb-0.5">Total Processing Time</div>
              <div className="text-base font-medium text-slate-900">{Math.floor(totalDuration / 60)}m {totalDuration % 60}s</div>
            </div>
            <div>
              <div className="text-xs text-slate-600 mb-0.5">Average Confidence</div>
              <div className="text-base font-medium text-slate-900">
                {Math.round(agentActions.filter(a => a.confidence).reduce((acc, a) => acc + (a.confidence || 0), 0) / agentActions.filter(a => a.confidence).length)}%
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-600 mb-0.5">Data Sources</div>
              <div className="text-base font-medium text-slate-900">3 systems</div>
            </div>
            <div>
              <div className="text-xs text-slate-600 mb-0.5">Total Actions</div>
              <div className="text-base font-medium text-slate-900">{agentActions.length}</div>
            </div>
          </div>
        </div>
      )}

      {/* Activity Feed */}
      <div className="space-y-2 max-h-[900px] overflow-y-auto pr-2">
        {filteredActions.map((action, index) => {
          const isExpanded = expandedAction === action.id;
          return (
          <div key={action.id} className="bg-white border border-slate-200 rounded-md overflow-hidden hover:border-slate-300 transition-colors">
            <button
              onClick={() => setExpandedAction(isExpanded ? null : action.id)}
              className="w-full px-3 py-2.5 text-left"
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="flex items-baseline gap-1.5 min-w-0">
                  <h4 className="text-xs font-semibold text-slate-900 leading-tight">{action.action}</h4>
                  {action.duration && (
                    <span className="text-[10px] text-slate-400 flex-shrink-0">· {action.duration}</span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {getStatusBadge(action.status)}
                  {action.expandedDetails && (
                    isExpanded
                      ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                      : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-snug mb-2">{action.details}</p>

              <div className="flex items-center gap-2">
                {action.confidence ? (
                  <>
                    <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-blue-500"
                        style={{ width: `${action.confidence}%` }}
                      ></div>
                    </div>
                    <span className="text-[10px] font-medium text-blue-600 flex-shrink-0">{action.confidence}%</span>
                  </>
                ) : (
                  <div className="flex-1" />
                )}
                <span className="text-[10px] text-slate-400 flex-shrink-0">{action.timestamp}</span>
              </div>
            </button>

            {/* Expanded Details */}
            {isExpanded && action.expandedDetails && (
              <div className="px-4 py-3.5 bg-slate-50/60 border-t border-slate-200">
                {action.expandedDetails.findings && (
                  <div className="mb-4">
                    <div className="text-xs font-semibold text-slate-900 mb-2">Key Findings</div>
                    <ul className="space-y-1">
                      {action.expandedDetails.findings.map((finding, idx) => (
                        <li key={idx} className="text-xs text-slate-700 flex items-start gap-1.5">
                          <span className="text-purple-500 mt-0.5">•</span>
                          <span>{finding}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {action.expandedDetails.dataPoints && (
                  <div className="mb-3">
                    <div className="text-xs font-semibold text-slate-900 mb-1.5">Analysis Details</div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {action.expandedDetails.dataPoints.map((point, idx) => (
                        <div key={idx} className="bg-slate-50 rounded p-1.5">
                          <div className="text-xs text-slate-500">{point.label}</div>
                          <div className="text-xs font-semibold text-slate-900">{point.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {action.expandedDetails.artifacts && (
                  <div>
                    <div className="text-xs font-semibold text-slate-900 mb-1.5">Related Artifacts</div>
                    <div className="flex flex-wrap gap-1.5">
                      {action.expandedDetails.artifacts.map((artifact, idx) => (
                        <button
                          key={idx}
                          className="flex items-center gap-1.5 px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded border border-slate-200 transition-colors"
                        >
                          <FileText className="w-3 h-3 text-slate-600" />
                          <span className="text-xs text-slate-700">{artifact.name}</span>
                          <span className="text-xs text-slate-500">({artifact.type})</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          );
        })}
      </div>
    </div>
  );
}