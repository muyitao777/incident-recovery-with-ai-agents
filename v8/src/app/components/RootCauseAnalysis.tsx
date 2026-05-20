import { Database, Activity, FileText, Server, AlertTriangle, ChevronDown, ExternalLink, Clock, TrendingUp, GitBranch, ClipboardCheck } from 'lucide-react';
import { useState } from 'react';
import { IntuitSparkleIcon } from './IntuitSparkleIcon';

export function RootCauseAnalysis() {
  const [expandedEvidence, setExpandedEvidence] = useState(true);
  const [expandedTimeline, setExpandedTimeline] = useState(true);
  const [expandedContributingFactors, setExpandedContributingFactors] = useState(true);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-[0_2px_4px_-1px_rgba(0,0,0,0.06),0_1px_2px_-1px_rgba(0,0,0,0.04)] border border-slate-200">
            <IntuitSparkleIcon size={16} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Likely Root Cause</h3>
            <p className="text-xs text-slate-500">AI-powered analysis</p>
          </div>
        </div>
        <div className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full border border-emerald-200">
          94% Confidence
        </div>
      </div>

      {/* Root Cause Title */}
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
        <span className="text-sm font-semibold text-slate-900">Redis Cache Connection Pool Exhaustion</span>
        <button className="text-slate-400 hover:text-cyan-600 transition-colors" title="View detailed documentation">
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Description */}
      <p className="text-xs text-slate-600 leading-relaxed mb-4">
        Connection pool hit 100% capacity at <span className="font-medium text-slate-800">14:23 UTC</span>, causing cascading cache failures and a <span className="font-semibold text-red-600">2.34% error rate spike</span> across dependent services.
      </p>

      {/* Metrics Row */}
      <div className="grid grid-cols-4 divide-x divide-slate-200 border border-slate-200 rounded-lg mb-1 overflow-hidden">
        <div className="px-4 py-3">
          <div className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-1">Detection</div>
          <div className="text-sm font-semibold text-slate-900">14:23 UTC</div>
        </div>
        <div className="px-4 py-3">
          <div className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-1">Affected Users</div>
          <div className="text-sm font-semibold text-red-500">~6,800</div>
        </div>
        <div className="px-4 py-3">
          <div className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-1">Error Rate</div>
          <div className="text-sm font-semibold text-red-500">2.34%</div>
        </div>
        <div className="px-4 py-3">
          <div className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-1">P95 Latency</div>
          <div className="text-sm font-semibold text-amber-500">156ms</div>
        </div>
      </div>

      {/* Collapsible Sections */}
      <div>
        {/* Incident Timeline */}
        <div className="border-t border-slate-200 pt-3 mt-3">
          <button
            onClick={() => setExpandedTimeline(!expandedTimeline)}
            className="w-full flex items-center justify-between mb-0"
          >
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs font-semibold text-slate-700">Incident Timeline</span>
              <span className="text-xs text-slate-400">· 4 events</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${expandedTimeline ? '' : '-rotate-90'}`} />
          </button>

          {expandedTimeline && (
            <div className="mt-2.5 space-y-1.5">
              {[
                { time: '14:18', timeColor: 'text-slate-500', dotColor: 'bg-slate-300', title: 'Traffic spike detected', desc: '34% increase in request volume' },
                { time: '14:21', timeColor: 'text-amber-500', dotColor: 'bg-amber-400', title: 'Connection pool at 85%', desc: 'Warnings logged in Redis' },
                { time: '14:23', timeColor: 'text-red-600',   dotColor: 'bg-red-500',   title: 'Pool exhaustion',          desc: 'All 1,000 connections in use' },
                { time: '14:25', timeColor: 'text-slate-500', dotColor: 'bg-slate-300', title: 'Cascading failures',        desc: 'Auth Service and API Gateway affected' },
              ].map((event, i) => (
                <div key={i} className="flex items-center gap-3 px-3 py-2.5 border border-slate-200 rounded-lg">
                  <span className={`text-xs font-semibold w-9 flex-shrink-0 ${event.timeColor}`}>{event.time}</span>
                  <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${event.dotColor}`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-slate-900">{event.title}</div>
                    <div className="text-xs text-slate-500">{event.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Supporting Evidence */}
        <div className="border-t border-slate-200 pt-3 mt-3">
          <button
            onClick={() => setExpandedEvidence(!expandedEvidence)}
            className="w-full flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <ClipboardCheck className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs font-semibold text-slate-700">Supporting Evidence</span>
              <span className="text-xs text-slate-400">· 3 sources</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${expandedEvidence ? '' : '-rotate-90'}`} />
          </button>

          {expandedEvidence && (
            <div className="mt-2.5 space-y-1.5">
              <div className="flex items-center gap-3 px-3 py-2.5 border border-slate-200 rounded-lg">
                <Database className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-slate-900">Connection Pool</div>
                  <div className="text-xs text-slate-500">Active connections at max · 347 pending · 2.3s avg wait</div>
                </div>
                <span className="text-xs font-semibold text-red-500 flex-shrink-0">1,000/1,000 (100%)</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2.5 border border-slate-200 rounded-lg">
                <Activity className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-slate-900">Cache Hit Rate</div>
                  <div className="text-xs text-slate-500">Eviction rate +450% · Response time 156ms (from 12ms)</div>
                </div>
                <span className="text-xs font-semibold text-amber-500 flex-shrink-0">42% (from 98%)</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2.5 border border-slate-200 rounded-lg">
                <FileText className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-slate-900">Error Logs</div>
                  <div className="text-xs text-slate-500">73% "Connection pool timeout" · 18% "Redis unavailable"</div>
                </div>
                <span className="text-xs font-semibold text-blue-600 flex-shrink-0">2,847 entries</span>
              </div>
            </div>
          )}
        </div>

        {/* Contributing Factors */}
        <div className="border-t border-slate-200 pt-3 mt-3">
          <button
            onClick={() => setExpandedContributingFactors(!expandedContributingFactors)}
            className="w-full flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs font-semibold text-slate-700">Contributing Factors</span>
              <span className="text-xs text-slate-400">· 3 factors</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${expandedContributingFactors ? '' : '-rotate-90'}`} />
          </button>

          {expandedContributingFactors && (
            <div className="mt-2.5 space-y-1.5">
              <div className="flex items-start gap-3 px-3 py-2.5 border border-slate-200 rounded-lg">
                <Server className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-slate-900">Traffic Spike</div>
                  <div className="text-xs text-slate-500">34% request volume increase during peak hours</div>
                  <div className="text-xs text-slate-500">Started 14:15 UTC · Peak 4,200 RPS · US-West</div>
                </div>
                <span className="text-xs font-semibold text-amber-500 flex-shrink-0">Medium</span>
              </div>
              <div className="flex items-start gap-3 px-3 py-2.5 border border-slate-200 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-slate-900">Memory Leak</div>
                  <div className="text-xs text-slate-500">Gradual memory growth in cache layer over 6 hours</div>
                  <div className="text-xs text-slate-500">First noticed 08:30 UTC · 4.2GB → 7.8GB</div>
                </div>
                <span className="text-xs font-semibold text-amber-500 flex-shrink-0">Medium</span>
              </div>
              <div className="flex items-start gap-3 px-3 py-2.5 border border-slate-200 rounded-lg">
                <GitBranch className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-slate-900">Config Change</div>
                  <div className="text-xs text-slate-500">Timeout settings modified 3 days ago</div>
                  <div className="text-xs text-slate-500">Jan 26, 10:45 UTC · Connection timeout 30s → 60s</div>
                </div>
                <span className="text-xs font-semibold text-slate-400 flex-shrink-0">Low</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
