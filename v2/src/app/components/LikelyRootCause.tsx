import { ExternalLink, ChevronDown, AlertTriangle, Database, FileText, Activity, Clock, FileEdit, Sparkles, TrendingUp } from 'lucide-react';
import { useState } from 'react';

export function LikelyRootCause() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['timeline', 'evidence', 'factors'])
  );

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  return (
    <div className="bg-white rounded-[10px] border border-slate-200 shadow-card p-5 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-4 h-4 text-[#155DFC]" strokeWidth={1.5} />
          <div>
            <div className="font-semibold text-slate-900">Likely Root Cause</div>
            <div className="text-xs text-slate-500">AI powered analysis</div>
          </div>
        </div>
        <div className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full border border-emerald-100">
          94% Confidence
        </div>
      </div>

      {/* Title */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-4 h-4 text-red-500" strokeWidth={1.75} />
          <h3 className="text-sm font-semibold text-slate-900">Redis Cache Connection Pool Exhaustion</h3>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          Connection pool hit 100% capacity at 14:23 UTC, causing cascading cache failures and a{' '}
          <span className="text-red-600">2.34% error rate spike</span> across dependent services.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-4 border border-slate-200 rounded-lg overflow-hidden">
        <div className="p-3 border-r border-slate-200">
          <div className="text-[10px] tracking-wider text-slate-400 uppercase mb-1">Detection</div>
          <div className="text-xs text-slate-900">14:23 UTC</div>
        </div>
        <div className="p-3 border-r border-slate-200">
          <div className="text-[10px] tracking-wider text-slate-400 uppercase mb-1">Affected Users</div>
          <div className="text-xs text-red-600">~6,800</div>
        </div>
        <div className="p-3 border-r border-slate-200">
          <div className="text-[10px] tracking-wider text-slate-400 uppercase mb-1">Error Rate</div>
          <div className="text-xs text-red-600">2.34%</div>
        </div>
        <div className="p-3">
          <div className="text-[10px] tracking-wider text-slate-400 uppercase mb-1">P99 Latency</div>
          <div className="text-xs text-amber-600">156ms</div>
        </div>
      </div>

      {/* Incident Timeline */}
      <div className="border border-slate-200 rounded-lg overflow-hidden">
        <button
          onClick={() => toggleSection('timeline')}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-sm font-semibold text-slate-900">Incident Timeline</span>
            <span className="text-xs text-slate-400">· 4 events</span>
          </div>
          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${expandedSections.has('timeline') ? 'rotate-180' : ''}`} />
        </button>

        {expandedSections.has('timeline') && (
          <div className="px-3 pb-3 space-y-2">
            {[
              { time: '14:18', color: 'text-slate-900', dot: '', title: 'Traffic spike detected', sub: '34% increase in request volume' },
              { time: '14:21', color: 'text-amber-600', dot: 'bg-amber-500', title: 'Connection pool at 85%', sub: 'Warnings logged in Redis' },
              { time: '14:23', color: 'text-red-600', dot: 'bg-red-500', title: 'Pool exhaustion', sub: 'All 1,000 connections in use' },
              { time: '14:25', color: 'text-slate-900', dot: '', title: 'Cascading failures', sub: 'Auth Service and API Gateway affected' },
            ].map((e) => (
              <div key={e.time} className="flex items-center gap-3 px-3 py-2.5 border border-slate-200 rounded-md">
                <div className={`text-sm ${e.color} w-12`}>{e.time}</div>
                <div className="w-2 flex justify-center">
                  {e.dot && <div className={`w-1.5 h-1.5 rounded-full ${e.dot}`}></div>}
                </div>
                <div className="flex-1">
                  <div className="text-sm text-slate-900">{e.title}</div>
                  <div className="text-xs text-slate-500">{e.sub}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Supporting Evidence */}
      <div className="border border-slate-200 rounded-lg overflow-hidden">
        <button
          onClick={() => toggleSection('evidence')}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Database className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-sm font-semibold text-slate-900">Supporting Evidence</span>
            <span className="text-xs text-slate-400">· 3 sources</span>
          </div>
          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${expandedSections.has('evidence') ? 'rotate-180' : ''}`} />
        </button>

        {expandedSections.has('evidence') && (
          <div className="px-3 pb-3 space-y-2">
            {[
              { icon: Database, title: 'Connection Pool', sub: 'Active connections at max · 347 pending · 2.3s avg wait', stat: '1,000/1,000 (100%)', color: 'text-red-600' },
              { icon: Activity, title: 'Cache Hit Rate', sub: 'Eviction rate +450% · Response time 156ms (from 12ms)', stat: '42% (from 98%)', color: 'text-amber-600' },
              { icon: FileText, title: 'Error Logs', sub: '73% "Connection pool timeout" · 18% "Redis unavailable"', stat: '2,847 entries', color: 'text-[#155DFC]' },
            ].map((e) => (
              <div key={e.title} className="flex items-center gap-3 px-3 py-2.5 border border-slate-200 rounded-md">
                <e.icon className="w-3.5 h-3.5 text-slate-400" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-slate-900">{e.title}</div>
                  <div className="text-xs text-slate-500 truncate">{e.sub}</div>
                </div>
                <div className={`text-sm ${e.color} whitespace-nowrap`}>{e.stat}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Contributing Factors */}
      <div className="border border-slate-200 rounded-lg overflow-hidden">
        <button
          onClick={() => toggleSection('factors')}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-sm font-semibold text-slate-900">Contributing Factors</span>
            <span className="text-xs text-slate-400">· 3 factors</span>
          </div>
          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${expandedSections.has('factors') ? 'rotate-180' : ''}`} />
        </button>

        {expandedSections.has('factors') && (
          <div className="px-3 pb-3 space-y-2">
            {[
              { icon: TrendingUp, title: 'Traffic Spike', sub: '34% request volume increase during peak hours\nStarted 14:15 UTC · Peak 4,200 RPS · US-West', sev: 'Medium', sevColor: 'text-amber-600' },
              { icon: AlertTriangle, title: 'Memory Leak', sub: 'Gradual memory growth in cache layer over 6 hours\nFirst noticed 08:30 UTC · 4.2GB → 7.8GB', sev: 'Medium', sevColor: 'text-amber-600' },
              { icon: FileEdit, title: 'Config Change', sub: 'Timeout settings modified 3 days ago\nJan 26, 10:45 UTC · Connection timeout 30s → 60s', sev: 'Low', sevColor: 'text-slate-500' },
            ].map((e) => (
              <div key={e.title} className="flex items-start gap-3 px-3 py-2.5 border border-slate-200 rounded-md">
                <e.icon className="w-3.5 h-3.5 text-slate-400 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-slate-900">{e.title}</div>
                  <div className="text-xs text-slate-500 whitespace-pre-line">{e.sub}</div>
                </div>
                <div className={`text-xs ${e.sevColor}`}>{e.sev}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
