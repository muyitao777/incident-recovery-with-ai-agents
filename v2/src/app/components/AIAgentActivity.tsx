import { CheckCircle2, Loader2, Clock, FileText, ChevronDown, ChevronRight, Filter, BarChart3 } from 'lucide-react';
import { useState } from 'react';

interface AgentAction {
  id: string;
  timestamp: string;
  action: string;
  status: 'completed' | 'in-progress' | 'pending';
  details: string;
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="text-[11px] text-emerald-600">Completed</span>;
      case 'in-progress':
        return (
          <span className="flex items-center gap-1 text-[11px] text-blue-600">
            <Loader2 className="w-2.5 h-2.5 animate-spin" />
            In Progress
          </span>
        );
      case 'pending':
        return <span className="text-[11px] text-slate-500">Pending</span>;
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
    <div className="bg-white rounded-[10px] p-8 border border-slate-200 shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.433 14.7484L3.30904 14.0908L5.37585 10.5269C5.63229 10.0847 6.08971 9.82176 6.59926 9.82368C7.10881 9.8256 7.56424 10.0919 7.81734 10.5361L9.85727 14.1155L8.72839 14.7646L6.68846 11.1852C6.64753 11.1132 6.54237 11.1117 6.5009 11.1845L4.43409 14.7484L4.433 14.7484Z" fill="#236CFF"/>
              <path d="M12.0365 14.53L9.31649 11.4405C8.97944 11.0575 8.87344 10.5382 9.03602 10.0529C9.19752 9.56756 9.59201 9.21713 10.0916 9.11483L14.1159 8.29229L14.3745 9.57303L10.3503 10.3956C10.309 10.4039 10.2828 10.4276 10.2694 10.4678C10.2561 10.508 10.2633 10.5429 10.2912 10.5747L13.0113 13.6642L12.0365 14.53Z" fill="#236CFF"/>
              <path d="M10.8577 8.15932C10.5672 8.15688 10.2807 8.0619 10.035 7.88015C9.62557 7.57615 9.41498 7.09088 9.4724 6.58172L9.93625 2.4835L11.2285 2.6305L10.7646 6.72873C10.7599 6.77007 10.7748 6.80395 10.8082 6.82819C10.8416 6.85243 10.8784 6.85709 10.9165 6.83999L14.6817 5.19361L15.2007 6.39148L11.4355 8.03787C11.2484 8.12014 11.0518 8.15878 10.8577 8.15714L10.8577 8.15932Z" fill="#236CFF"/>
              <path d="M7.4008 6.5038C7.20674 6.5038 7.0105 6.46242 6.82403 6.37966L3.07286 4.70162L3.60193 3.50816L7.3531 5.1862C7.39104 5.20362 7.4279 5.19926 7.46151 5.17531C7.49512 5.15026 7.5103 5.11759 7.50596 5.07622L7.07555 0.972053L8.36895 0.835938L8.79827 4.93792C8.8514 5.44645 8.63673 5.92993 8.22476 6.23157C7.97757 6.41233 7.69027 6.5038 7.39972 6.5038H7.4008Z" fill="#236CFF"/>
              <path d="M3.04108 11.8823L2.08339 10.9976L4.86312 7.96172C4.89163 7.93153 4.8996 7.89568 4.88702 7.85525C4.87443 7.81592 4.84759 7.79058 4.80758 7.78144L0.800133 6.88282L1.08369 5.60737L5.09111 6.50817C5.58865 6.62019 5.97624 6.97824 6.12825 7.46664C6.28026 7.95503 6.16526 8.47108 5.82079 8.84855L3.04106 11.8844L3.04108 11.8823Z" fill="#236CFF"/>
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-900">AI Agent Activity</h3>
            <p className="text-xs text-slate-500">Real-time investigation progress</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowStats(!showStats)}
            className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
            title="Toggle statistics"
          >
            <BarChart3 className="w-4 h-4 text-slate-400" />
          </button>
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-purple-50 to-purple-100 rounded-full border border-purple-200">
            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-purple-700">Active {inProgressCount}</span>
          </div>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-1.5 mb-4 flex-wrap">
        {([
          { id: 'all', label: 'All' },
          { id: 'completed', label: 'Completed' },
          { id: 'in-progress', label: 'In Progress' },
          { id: 'pending', label: 'Pending' },
        ] as const).map((f) => {
          const active = filterStatus === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setFilterStatus(f.id)}
              className={`px-2.5 py-1 text-xs rounded-full border transition-colors ${
                active
                  ? 'bg-blue-50 text-[#155DFC] border-blue-200'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Statistics Panel */}
      {showStats && (
        <div className="mb-4 p-3 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border border-purple-200">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs text-slate-600 mb-0.5">Total Processing Time</div>
              <div className="text-base font-bold text-slate-900">{Math.floor(totalDuration / 60)}m {totalDuration % 60}s</div>
            </div>
            <div>
              <div className="text-xs text-slate-600 mb-0.5">Average Confidence</div>
              <div className="text-base font-bold text-slate-900">
                {Math.round(agentActions.filter(a => a.confidence).reduce((acc, a) => acc + (a.confidence || 0), 0) / agentActions.filter(a => a.confidence).length)}%
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-600 mb-0.5">Data Sources</div>
              <div className="text-base font-bold text-slate-900">3 systems</div>
            </div>
            <div>
              <div className="text-xs text-slate-600 mb-0.5">Total Actions</div>
              <div className="text-base font-bold text-slate-900">{agentActions.length}</div>
            </div>
          </div>
        </div>
      )}

      {/* Activity Feed */}
      <div className="space-y-3 max-h-[900px] overflow-y-auto pr-2">
        {filteredActions.map((action, index) => (
          <div key={action.id}>
            <button
              onClick={() => setExpandedAction(expandedAction === action.id ? null : action.id)}
              className={`group w-full flex flex-col gap-1 px-3 py-2 transition-all text-left bg-white hover:bg-slate-50 border border-slate-200 ${expandedAction === action.id ? 'rounded-t-lg border-b-0' : 'rounded-lg'}`}
            >
              {/* Top row: title + status */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <h4 className="text-sm font-semibold text-slate-900 truncate">{action.action}</h4>
                  {action.duration && (
                    <span className="text-xs text-slate-400 flex-shrink-0">· {action.duration}</span>
                  )}
                </div>
                {getStatusBadge(action.status)}
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-snug line-clamp-2">{action.details}</p>

              {/* Footer row: confidence + meta */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {action.confidence && (
                    <>
                      <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden max-w-[100px]">
                        <div
                          className="h-full rounded-full bg-[#155DFC]"
                          style={{ width: `${action.confidence}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-slate-600">{action.confidence}%</span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span className="text-xs text-slate-400">{action.timestamp}</span>
                  {action.expandedDetails && (
                    expandedAction === action.id ? (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    )
                  )}
                </div>
              </div>
            </button>

            {/* Expanded Details */}
            {expandedAction === action.id && action.expandedDetails && (
              <div className="p-4 bg-white rounded-b-lg border-t-0 border border-slate-200">
                {action.expandedDetails.findings && (
                  <div className="mb-4">
                    <div className="text-xs font-medium text-slate-900 mb-2">Key Findings</div>
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
                    <div className="text-xs font-medium text-slate-900 mb-1.5">Analysis Details</div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {action.expandedDetails.dataPoints.map((point, idx) => (
                        <div key={idx} className="bg-slate-50 rounded p-1.5">
                          <div className="text-xs text-slate-500">{point.label}</div>
                          <div className="text-xs font-medium text-slate-900">{point.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {action.expandedDetails.artifacts && (
                  <div>
                    <div className="text-xs font-medium text-slate-900 mb-1.5">Related Artifacts</div>
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
        ))}
      </div>
    </div>
  );
}