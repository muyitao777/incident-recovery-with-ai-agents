import { Database, Activity, FileText, Server, AlertTriangle, ChevronDown, ChevronRight, ExternalLink, Clock, TrendingUp, GitBranch, ClipboardCheck } from 'lucide-react';
import { useState } from 'react';
import { AiIcon } from './AiIcon';

export function RootCauseAnalysis() {
  const [expandedEvidence, setExpandedEvidence] = useState(true);
  const [expandedTimeline, setExpandedTimeline] = useState(true);
  const [expandedContributingFactors, setExpandedContributingFactors] = useState(true);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
            <AiIcon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Likely Root Cause</h3>
            <p className="text-xs text-slate-400">AI-powered analysis</p>
          </div>
        </div>
        <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 text-xs font-medium rounded-full border border-emerald-100">
          94% Confidence
        </span>
      </div>

      {/* Primary Cause */}
      <div className="mb-5">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 w-6 h-6 rounded-md bg-red-50 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-sm font-semibold text-slate-800">Redis Cache Connection Pool Exhaustion</span>
              <button className="text-slate-300 hover:text-slate-500 transition-colors">
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Connection pool hit 100% capacity at <span className="text-slate-700 font-medium">14:23 UTC</span>, causing cascading cache failures and a <span className="text-red-500 font-medium">2.34% error rate spike</span> across dependent services.
            </p>
          </div>
        </div>
      </div>

      {/* Metrics Row - single bordered card with vertical dividers */}
      <div className="grid grid-cols-4 mb-5 border border-slate-200 rounded-lg overflow-hidden divide-x divide-slate-200">
        {[
          { label: 'Detection', value: '14:23 UTC', color: 'text-slate-700' },
          { label: 'Affected Users', value: '~6,800', color: 'text-red-500' },
          { label: 'Error Rate', value: '2.34%', color: 'text-red-500' },
          { label: 'P95 Latency', value: '156ms', color: 'text-amber-500' },
        ].map((m) => (
          <div key={m.label} className="px-4 py-3">
            <div className="text-[10px] text-slate-400 mb-0.5 uppercase tracking-wide">{m.label}</div>
            <div className={`text-sm font-semibold ${m.color}`}>{m.value}</div>
          </div>
        ))}
      </div>

      {/* Sections */}
      <div className="space-y-3">

        {/* Timeline */}
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setExpandedTimeline(!expandedTimeline)}
            className="w-full flex items-center justify-between px-3 py-3 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Incident Timeline</span>
              <span className="text-slate-400 font-normal">· 4 events</span>
            </div>
            {expandedTimeline
              ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
          </button>

          {expandedTimeline && (
            <div className="border-t border-slate-200 divide-y divide-slate-100">
              {[
                { time: '14:18', label: 'Traffic spike detected', desc: '34% increase in request volume', color: 'text-slate-500', dot: 'bg-slate-300' },
                { time: '14:21', label: 'Connection pool at 85%', desc: 'Warnings logged in Redis', color: 'text-amber-500', dot: 'bg-amber-400' },
                { time: '14:23', label: 'Pool exhaustion', desc: 'All 1,000 connections in use', color: 'text-red-500', dot: 'bg-red-400' },
                { time: '14:25', label: 'Cascading failures', desc: 'Auth Service and API Gateway affected', color: 'text-slate-500', dot: 'bg-slate-300' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 px-3 py-2.5">
                  <span className={`text-[11px] font-medium w-11 flex-shrink-0 ${item.color}`}>{item.time}</span>
                  <div className="flex items-center gap-2 flex-1">
                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.dot}`} />
                    <div>
                      <div className="text-xs font-medium text-slate-700">{item.label}</div>
                      <div className="text-[11px] text-slate-400">{item.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Supporting Evidence */}
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setExpandedEvidence(!expandedEvidence)}
            className="w-full flex items-center justify-between px-3 py-3 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            <div className="flex items-center gap-2">
              <ClipboardCheck className="w-3.5 h-3.5 text-slate-400" />
              <span>Supporting Evidence</span>
              <span className="text-slate-400 font-normal">· 3 sources</span>
            </div>
            {expandedEvidence
              ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
          </button>

          {expandedEvidence && (
            <div className="border-t border-slate-200 divide-y divide-slate-100">
              {[
                { icon: Database, label: 'Connection Pool', value: '1,000/1,000 (100%)', valueColor: 'text-red-500', detail: 'Active connections at max · 347 pending · 2.3s avg wait' },
                { icon: Activity, label: 'Cache Hit Rate', value: '42% (from 98%)', valueColor: 'text-amber-500', detail: 'Eviction rate +450% · Response time 156ms (from 12ms)' },
                { icon: FileText, label: 'Error Logs', value: '2,847 entries', valueColor: 'text-blue-500', detail: '73% "Connection pool timeout" · 18% "Redis unavailable"' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 px-3 py-2.5">
                  <item.icon className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <span className="text-xs font-medium text-slate-700">{item.label}</span>
                      <span className={`text-xs font-semibold ${item.valueColor}`}>{item.value}</span>
                    </div>
                    <p className="text-[11px] text-slate-400">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contributing Factors */}
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setExpandedContributingFactors(!expandedContributingFactors)}
            className="w-full flex items-center justify-between px-3 py-3 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
              <span>Contributing Factors</span>
              <span className="text-slate-400 font-normal">· 3 factors</span>
            </div>
            {expandedContributingFactors
              ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
          </button>

          {expandedContributingFactors && (
            <div className="border-t border-slate-200 divide-y divide-slate-100">
              {[
                {
                  icon: Server,
                  label: 'Traffic Spike',
                  severity: 'Medium',
                  severityColor: 'text-amber-500',
                  desc: '34% request volume increase during peak hours',
                  meta: 'Started 14:15 UTC · Peak 4,200 RPS · US-West',
                },
                {
                  icon: AlertTriangle,
                  label: 'Memory Leak',
                  severity: 'Medium',
                  severityColor: 'text-amber-500',
                  desc: 'Gradual memory growth in cache layer over 6 hours',
                  meta: 'First noticed 08:30 UTC · 4.2GB → 7.8GB',
                },
                {
                  icon: GitBranch,
                  label: 'Config Change',
                  severity: 'Low',
                  severityColor: 'text-slate-400',
                  desc: 'Timeout settings modified 3 days ago',
                  meta: 'Jan 26, 10:45 UTC · Connection timeout 30s → 60s',
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 px-3 py-2.5">
                  <item.icon className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <span className="text-xs font-medium text-slate-700">{item.label}</span>
                      <span className={`text-[11px] font-medium ${item.severityColor}`}>{item.severity}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mb-0.5">{item.desc}</p>
                    <p className="text-[11px] text-slate-400">{item.meta}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
