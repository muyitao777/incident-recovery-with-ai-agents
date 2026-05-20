import { Database, Activity, FileText, Server, AlertTriangle, ChevronDown, ChevronRight, ExternalLink, Clock, TrendingUp, GitBranch, ClipboardList, Share2, Search } from 'lucide-react';
import { useState } from 'react';
import { IntuitAssistIcon } from './IntuitAssistIcon';
import { useUpdates } from '@/app/contexts/UpdatesContext';
import { ShareUpdateModal } from './ShareUpdateModal';

interface RootCauseAnalysisProps {
  onInvestigate?: (title: string, context: string) => void;
}

export function RootCauseAnalysis({ onInvestigate }: RootCauseAnalysisProps = {}) {
  const [expandedEvidence, setExpandedEvidence] = useState(false);
  const [expandedTimeline, setExpandedTimeline] = useState(false);
  const [expandedContributingFactors, setExpandedContributingFactors] = useState(false);
  const { addUpdate, setHighlightedAgentIds } = useUpdates();
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareContent, setShareContent] = useState({ title: '', content: '' });

  const handleShareClick = () => {
    const content = 'Root Cause Identified: Redis Cache Connection Pool Exhaustion at 14:23 UTC with 94% confidence. Peak connection count exceeded configured limit of 1,000, causing 2.34% error rate spike and affecting ~6,800 users. Cache misses increased by 340%, elevating P95 latency from 45ms to 156ms.';
    setShareContent({
      title: 'Likely Root Cause',
      content: content
    });
    setShareModalOpen(true);
  };

  const handleShare = (content: string) => {
    const now = new Date();
    const timeString = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    addUpdate({
      id: `update-${Date.now()}`,
      time: timeString,
      author: 'Alex Rodriguez',
      title: shareContent.title,
      content: content,
    });
  };

  const handleSeeAgentActivity = () => {
    // Highlight agent a1 (Root Cause Identified)
    setHighlightedAgentIds(['a1']);
    
    setTimeout(() => {
      const agentActivity = document.querySelector('[data-agent-id="a1"]');
      if (agentActivity) {
        agentActivity.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-[0_2px_4px_-1px_rgba(0,0,0,0.06),0_1px_2px_-1px_rgba(0,0,0,0.04)] border border-slate-200">
            <IntuitAssistIcon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-semibold text-slate-900">Likely Root Cause</h3>
            <p className="text-xs text-slate-500">AI-powered analysis</p>
          </div>
        </div>
        <div className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full border border-emerald-200">
          94% Confidence
        </div>
      </div>
      
      {/* Root Cause */}
      <div className="space-y-3">
        {/* Title row */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <span className="text-xs font-semibold text-slate-900">Redis Cache Connection Pool Exhaustion</span>
            <button className="text-slate-400 hover:text-slate-600 transition-colors" title="View detailed documentation">
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Connection pool hit <span className="text-red-600">100% capacity at 14:23 UTC</span>, causing cascading cache failures and a <span className="text-red-600">2.34% error rate spike</span> across dependent services.
          </p>
        </div>

        {/* Metric strip */}
        <div className="grid grid-cols-4 border border-slate-200 rounded-lg overflow-hidden">
          <div className="px-3 py-2 border-r border-slate-200">
            <div className="text-[11px] tracking-wider text-slate-500 uppercase mb-1">Detection</div>
            <div className="text-xs font-semibold text-slate-900">14:23 UTC</div>
          </div>
          <div className="px-3 py-2 border-r border-slate-200">
            <div className="text-[11px] tracking-wider text-slate-500 uppercase mb-1">Affected Users</div>
            <div className="text-xs font-semibold text-red-600">~6,800</div>
          </div>
          <div className="px-3 py-2 border-r border-slate-200">
            <div className="text-[11px] tracking-wider text-slate-500 uppercase mb-1">Error Rate</div>
            <div className="text-xs font-semibold text-red-600">2.34%</div>
          </div>
          <div className="px-3 py-2">
            <div className="text-[11px] tracking-wider text-slate-500 uppercase mb-1">P95 Latency</div>
            <div className="text-xs font-semibold text-red-600">156ms</div>
          </div>
        </div>

        {/* Incident Timeline */}
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setExpandedTimeline(!expandedTimeline)}
            className="w-full flex items-center justify-between px-3 py-2 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2 text-xs">
              <Clock className="w-4 h-4 text-cyan-600" />
              <span className="font-semibold text-slate-900">Incident Timeline</span>
              <span className="text-xs text-slate-500">· 4 events</span>
            </div>
            {expandedTimeline ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
          </button>

          {expandedTimeline && (
            <div className="border-t border-slate-200 divide-y divide-slate-200">
              {[
                { time: '14:18', dot: 'bg-slate-300', timeColor: 'text-slate-500', title: 'Traffic spike detected', detail: '34% increase in request volume' },
                { time: '14:21', dot: 'bg-amber-400', timeColor: 'text-amber-600', title: 'Connection pool at 85%', detail: 'Warnings logged in Redis' },
                { time: '14:23', dot: 'bg-red-500', timeColor: 'text-red-600', title: 'Pool exhaustion', detail: 'All 1,000 connections in use' },
                { time: '14:25', dot: 'bg-slate-300', timeColor: 'text-slate-500', title: 'Cascading failures', detail: 'Auth Service and API Gateway affected' },
              ].map((e) => (
                <div key={e.time} className="flex items-center gap-3 px-3 py-2">
                  <div className={`text-xs font-semibold tabular-nums w-12 flex-shrink-0 ${e.timeColor}`}>{e.time}</div>
                  <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${e.dot}`}></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-slate-900">{e.title}</div>
                    <div className="text-xs text-slate-500">{e.detail}</div>
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
            className="w-full flex items-center justify-between px-3 py-2 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2 text-xs">
              <ClipboardList className="w-4 h-4 text-cyan-600" />
              <span className="font-semibold text-slate-900">Supporting Evidence</span>
              <span className="text-xs text-slate-500">· 3 sources</span>
            </div>
            {expandedEvidence ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
          </button>

          {expandedEvidence && (
            <div className="border-t border-slate-200 divide-y divide-slate-200">
              {[
                { Icon: Database, name: 'Connection Pool', detail: 'Active connections at max · 347 pending · 2.3s avg wait', value: '1,000/1,000 (100%)', color: 'text-red-600' },
                { Icon: Activity, name: 'Cache Hit Rate', detail: 'Eviction rate +450% · Response time 156ms (from 12ms)', value: '42% (from 98%)', color: 'text-amber-600' },
                { Icon: FileText, name: 'Error Logs', detail: '73% "Connection pool timeout" · 18% "Redis unavailable"', value: '2,847 entries', color: 'text-blue-600' },
              ].map((e) => (
                <div key={e.name} className="flex items-center gap-3 px-3 py-2">
                  <e.Icon className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-slate-900">{e.name}</div>
                    <div className="text-xs text-slate-500 truncate">{e.detail}</div>
                  </div>
                  <div className={`text-xs font-semibold flex-shrink-0 ${e.color}`}>{e.value}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contributing Factors */}
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setExpandedContributingFactors(!expandedContributingFactors)}
            className="w-full flex items-center justify-between px-3 py-2 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2 text-xs">
              <TrendingUp className="w-4 h-4 text-cyan-600" />
              <span className="font-semibold text-slate-900">Contributing Factors</span>
              <span className="text-xs text-slate-500">· 3 factors</span>
            </div>
            {expandedContributingFactors ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
          </button>

          {expandedContributingFactors && (
            <div className="border-t border-slate-200 divide-y divide-slate-200">
              {[
                { Icon: Server, name: 'Traffic Spike', detail: '34% request volume increase during peak hours', sub: 'Started 14:15 UTC · Peak 4,200 RPS · US-West', severity: 'Medium', sevColor: 'text-amber-600' },
                { Icon: AlertTriangle, name: 'Memory Leak', detail: 'Gradual memory growth in cache layer over 6 hours', sub: 'First noticed 08:30 UTC · 4.2GB → 7.8GB', severity: 'Medium', sevColor: 'text-amber-600' },
                { Icon: GitBranch, name: 'Config Change', detail: 'Timeout settings modified 3 days ago', sub: 'Jan 26, 10:45 UTC · Connection timeout 30s → 60s', severity: 'Low', sevColor: 'text-slate-500' },
              ].map((f) => (
                <div key={f.name} className="flex items-start gap-3 px-3 py-2">
                  <f.Icon className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-slate-900">{f.name}</div>
                    <div className="text-xs text-slate-600">{f.detail}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{f.sub}</div>
                  </div>
                  <div className={`text-xs font-semibold flex-shrink-0 ${f.sevColor}`}>{f.severity}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="mt-4 flex items-center gap-2 pt-4 border-t border-slate-200">
        <button 
          onClick={handleSeeAgentActivity}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200"
        >
          <Activity className="w-3.5 h-3.5" />
          See what agent checked
        </button>
        <button
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200"
          onClick={handleShareClick}
        >
          <Share2 className="w-3.5 h-3.5" />
          Share as update
        </button>
        <button
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200"
          onClick={() => onInvestigate && onInvestigate('Redis Cache Connection Pool Exhaustion', 'Peak connection count exceeded configured limit of 1,000, causing 2.34% error rate spike and affecting ~6,800 users. Cache misses increased by 340%, elevating P95 latency from 45ms to 156ms.')}
        >
          <Search className="w-3.5 h-3.5" />
          Investigate further
        </button>
      </div>

      {/* Share Update Modal */}
      <ShareUpdateModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        onShare={handleShare}
        title={shareContent.title}
        defaultContent={shareContent.content}
        author="Alex Rodriguez"
      />
    </div>
  );
}