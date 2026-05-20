import { Database, Activity, FileText, Server, AlertTriangle, ChevronDown, ChevronRight, ExternalLink, Clock, TrendingUp, GitBranch, ClipboardCheck } from 'lucide-react';
import { useState } from 'react';

export function RootCauseAnalysis() {
  const [expandedEvidence, setExpandedEvidence] = useState(false);
  const [expandedTimeline, setExpandedTimeline] = useState(false);
  const [expandedContributingFactors, setExpandedContributingFactors] = useState(false);

  return (
    <div className="bg-white border border-slate-200 rounded-[10px] p-8 shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
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
            <h3 className="text-sm font-medium text-slate-900">Likely Root Cause</h3>
            <p className="text-xs text-slate-500">AI-powered analysis with 94% confidence</p>
          </div>
        </div>
        <div className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full border border-emerald-200">
          94% Confidence
        </div>
      </div>
      
      {/* Root Cause Information */}
      <div className="space-y-4">
        {/* Main Cause Card */}
        <div className="bg-white border border-slate-200 rounded-lg p-5">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-orange-500" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-base font-semibold text-slate-900">Redis Cache Connection Pool Exhaustion</span>
                <button 
                  className="text-cyan-600 hover:text-cyan-700 transition-colors"
                  title="View detailed documentation"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                Redis cache layer experienced connection pool exhaustion at <strong>14:23 UTC</strong>, causing cascading failures in the cache service. Peak connection count exceeded configured limit of 1,000, resulting in <strong className="text-red-600">2.34% error rate spike</strong>.
              </p>
              
              {/* Impact Highlight Box */}
              <div className="bg-white border border-amber-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-amber-900 mb-1">Business Impact</div>
                    <div className="text-xs text-slate-700 leading-relaxed">
                      Cache misses increased by <strong>340%</strong>, forcing direct database queries and elevating P95 latency from 45ms to 156ms. Approximately <strong>6,800 active users</strong> experienced degraded performance or timeouts.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-4 gap-3 mb-4">
            <div className="bg-white rounded-lg p-3 border border-slate-200">
              <div className="text-xs text-slate-500 mb-1">Detection Time</div>
              <div className="text-sm font-semibold text-slate-900">14:23 UTC</div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-slate-200">
              <div className="text-xs text-slate-500 mb-1">Users Affected</div>
              <div className="text-sm font-semibold text-red-600">~6,800</div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-slate-200">
              <div className="text-xs text-slate-500 mb-1">Error Rate</div>
              <div className="text-sm font-semibold text-red-600">2.34%</div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-slate-200">
              <div className="text-xs text-slate-500 mb-1">Latency P95</div>
              <div className="text-sm font-semibold text-amber-600">156ms</div>
            </div>
          </div>
          
          {/* Timeline Section */}
          <div className="border-t border-slate-200 pt-4">
            <button
              onClick={() => setExpandedTimeline(!expandedTimeline)}
              className="w-full flex items-center justify-between text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors group"
            >
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>Incident Timeline</span>
                <span className="text-xs text-slate-500 font-normal">(4 events)</span>
              </div>
              {expandedTimeline ? (
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
              ) : (
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
              )}
            </button>

            {/* Expandable Timeline */}
            {expandedTimeline && (
              <div className="mt-4 space-y-3 pl-6 border-l-2 border-slate-200">
                <div className="flex items-start gap-3 group">
                  <div className="text-xs text-slate-500 w-20 flex-shrink-0 font-medium">14:18 UTC</div>
                  <div className="flex-1 bg-white rounded-lg p-2 border border-slate-200 hover:border-cyan-300 transition-colors">
                    <div className="text-xs font-medium text-slate-900 mb-0.5">Traffic spike detected</div>
                    <div className="text-xs text-slate-600">34% increase in request volume</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 group">
                  <div className="text-xs text-slate-500 w-20 flex-shrink-0 font-medium">14:21 UTC</div>
                  <div className="flex-1 bg-white rounded-lg p-2 border border-amber-200 hover:border-amber-300 transition-colors">
                    <div className="text-xs font-medium text-amber-900 mb-0.5">Connection pool at 85%</div>
                    <div className="text-xs text-slate-600">Warnings logged in Redis</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 group">
                  <div className="text-xs text-red-600 w-20 flex-shrink-0 font-semibold">14:23 UTC</div>
                  <div className="flex-1 bg-white rounded-lg p-2 border border-red-300">
                    <div className="text-xs font-medium text-red-900 mb-0.5">Pool exhaustion</div>
                    <div className="text-xs text-red-700">All 1,000 connections in use, new requests failing</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 group">
                  <div className="text-xs text-slate-500 w-20 flex-shrink-0 font-medium">14:25 UTC</div>
                  <div className="flex-1 bg-white rounded-lg p-2 border border-slate-200 hover:border-cyan-300 transition-colors">
                    <div className="text-xs font-medium text-slate-900 mb-0.5">Cascading failures</div>
                    <div className="text-xs text-slate-600">Auth Service and API Gateway affected</div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Evidence Section */}
          <div className="mt-4 pt-4 border-t border-slate-200">
            <button
              onClick={() => setExpandedEvidence(!expandedEvidence)}
              className="w-full flex items-center justify-between text-sm font-medium text-slate-700 mb-3 hover:text-slate-900 transition-colors group"
            >
              <div className="flex items-center gap-2">
                <ClipboardCheck className="w-4 h-4 text-slate-400" />
                <span>Supporting Evidence</span>
                <span className="text-xs text-slate-500 font-normal">(3 sources)</span>
              </div>
              {expandedEvidence ? (
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
              ) : (
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
              )}
            </button>
            
            {/* Evidence Cards */}
            <div className="grid grid-cols-3 gap-3">
              <button className="flex items-center gap-2 bg-white rounded-lg p-3 hover:bg-slate-50 transition-colors cursor-pointer border border-slate-200 hover:border-cyan-300 text-left">
                <Database className="w-5 h-5 text-slate-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-slate-900">Connection Pool</div>
                  <div className="text-xs text-red-600 font-medium">1,000/1,000 (100%)</div>
                </div>
              </button>
              <button className="flex items-center gap-2 bg-white rounded-lg p-3 hover:bg-slate-50 transition-colors cursor-pointer border border-slate-200 hover:border-cyan-300 text-left">
                <Activity className="w-5 h-5 text-slate-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-slate-900">Cache Hit Rate</div>
                  <div className="text-xs text-amber-600 font-medium">42% (from 98%)</div>
                </div>
              </button>
              <button className="flex items-center gap-2 bg-white rounded-lg p-3 hover:bg-slate-50 transition-colors cursor-pointer border border-slate-200 hover:border-cyan-300 text-left">
                <FileText className="w-5 h-5 text-slate-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-slate-900">Error Logs</div>
                  <div className="text-xs text-blue-600 font-medium">2,847 entries</div>
                </div>
              </button>
            </div>

            {/* Expanded Evidence Details */}
            {expandedEvidence && (
              <div className="mt-3 p-4 bg-white rounded-lg border border-slate-200">
                <div className="space-y-3">
                  <div className="pb-3 border-b border-slate-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Database className="w-4 h-4 text-slate-400" />
                      <div className="text-xs font-bold text-slate-900">Connection Pool Metrics</div>
                    </div>
                    <div className="text-xs text-slate-700 leading-relaxed space-y-1 pl-6">
                      <div>• Active connections: <strong className="text-red-600">1,000/1,000 (100% utilization)</strong></div>
                      <div>• Wait queue: <strong>347 pending requests</strong></div>
                      <div>• Connection timeout rate: <strong className="text-red-600">2.34%</strong></div>
                      <div>• Average wait time: <strong>2.3 seconds</strong></div>
                    </div>
                  </div>
                  <div className="pb-3 border-b border-slate-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-4 h-4 text-slate-400" />
                      <div className="text-xs font-bold text-slate-900">Cache Performance</div>
                    </div>
                    <div className="text-xs text-slate-700 leading-relaxed space-y-1 pl-6">
                      <div>• Hit rate dropped from <strong>98% to 42%</strong> at 14:23 UTC</div>
                      <div>• Eviction rate increased <strong className="text-amber-600">450%</strong></div>
                      <div>• Average response time: <strong>156ms</strong> (up from 12ms)</div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4 text-slate-400" />
                      <div className="text-xs font-bold text-slate-900">Error Analysis</div>
                    </div>
                    <div className="text-xs text-slate-700 leading-relaxed space-y-1 pl-6">
                      <div>• <strong>2,847 error log entries</strong> in last 30 minutes</div>
                      <div>• Most common: <strong>"Connection pool timeout"</strong> (73%)</div>
                      <div>• Secondary: <strong>"Redis unavailable"</strong> (18%)</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Contributing Factors */}
        <div className="border-t border-slate-200 pt-4">
          <button
            onClick={() => setExpandedContributingFactors(!expandedContributingFactors)}
            className="w-full flex items-center justify-between text-sm font-medium text-slate-700 mb-3 hover:text-slate-900 transition-colors group"
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-slate-400" />
              <span>Contributing Factors</span>
              <span className="text-xs text-slate-500 font-normal">(3 factors)</span>
            </div>
            {expandedContributingFactors ? (
              <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
            ) : (
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
            )}
          </button>

          {expandedContributingFactors && (
            <div className="grid grid-cols-3 gap-3">
              {/* Traffic Spike */}
              <div className="bg-white border rounded-lg p-4 border-slate-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                  <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center">
                    <Server className="w-4 h-4 text-amber-400" />
                  </div>
                  <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">Medium</span>
                </div>
                <div className="text-sm font-bold text-slate-900 mb-1">Traffic Spike</div>
                <div className="text-xs text-slate-600 leading-relaxed mb-3">34% increase in request volume during peak hours</div>
                <div className="space-y-2 pt-3 border-t border-slate-200">
                  <div className="flex items-center gap-2 text-xs text-slate-700 bg-white rounded p-2 border border-slate-100">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span><strong>Started:</strong> 14:15 UTC</span>
                  </div>
                  <div className="text-xs text-slate-700 leading-relaxed bg-white rounded p-2 space-y-1 border border-slate-100">
                    <div>• Peak RPS: <strong>4,200</strong> (normal: 3,100)</div>
                    <div>• Duration: <strong>20+ minutes</strong></div>
                    <div>• Region: <strong>US-West primarily</strong></div>
                  </div>
                </div>
              </div>
              
              {/* Memory Leak */}
              <div className="bg-white border rounded-lg p-4 border-slate-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                  <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                  </div>
                  <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">Medium</span>
                </div>
                <div className="text-sm font-bold text-slate-900 mb-1">Memory Leak</div>
                <div className="text-xs text-slate-600 leading-relaxed mb-3">Gradual memory consumption in cache layer over 6 hours</div>
                <div className="space-y-2 pt-3 border-t border-slate-200">
                  <div className="flex items-center gap-2 text-xs text-slate-700 bg-white rounded p-2 border border-slate-100">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span><strong>First noticed:</strong> 08:30 UTC</span>
                  </div>
                  <div className="text-xs text-slate-700 leading-relaxed bg-white rounded p-2 space-y-1 border border-slate-100">
                    <div>• Memory grew from <strong>4.2GB to 7.8GB</strong></div>
                    <div>• Rate: <strong>~600MB per hour</strong></div>
                    <div>• Related to <strong>session caching logic</strong></div>
                  </div>
                </div>
              </div>
              
              {/* Config Change */}
              <div className="bg-white border rounded-lg p-4 border-slate-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                  <div className="w-8 h-8 rounded-lg bg-yellow-50 border border-yellow-200 flex items-center justify-center">
                    <GitBranch className="w-4 h-4 text-yellow-600" />
                  </div>
                  <span className="text-xs font-semibold text-yellow-700 bg-yellow-50 px-2 py-0.5 rounded-full border border-yellow-200">Low</span>
                </div>
                <div className="text-sm font-bold text-slate-900 mb-1">Config Change</div>
                <div className="text-xs text-slate-600 leading-relaxed mb-3">Timeout settings modified 3 days ago</div>
                <div className="space-y-2 pt-3 border-t border-slate-200">
                  <div className="flex items-center gap-2 text-xs text-slate-700 bg-white rounded p-2 border border-slate-100">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span><strong>Changed:</strong> Jan 26, 10:45 UTC</span>
                  </div>
                  <div className="text-xs text-slate-700 leading-relaxed bg-white rounded p-2 space-y-1 border border-slate-100">
                    <div>• Connection timeout: <strong>30s → 60s</strong></div>
                    <div>• Max retries: <strong>3 → 5</strong></div>
                    <div>• May have <strong>masked earlier issues</strong></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}