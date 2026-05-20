import { useState } from 'react';
import { ChevronDown, ChevronRight, Clock, Network, Database, TrendingUp, Activity, AlertTriangle, ExternalLink, ClipboardList } from 'lucide-react';
import { IntuitAssistIcon } from './IntuitAssistIcon';

interface HypothesisProps {
  label: string;
  confidence: string;
  confidenceClass: string;
  title: string;
  lead: React.ReactNode;
  metrics: { label: string; value: string; valueClass?: string }[];
  timelineLabel: string;
  timelineEvents: { time: string; dot: string; timeColor: string; title: string; detail: string }[];
  evidence: { Icon: typeof Database; name: string; detail: string; value: string; color: string }[];
  accentStripe: string;
  accentIcon: string;
}

function Hypothesis({ label, confidence, confidenceClass, title, lead, metrics, timelineLabel, timelineEvents, evidence, accentStripe, accentIcon }: HypothesisProps) {
  const [expandedTimeline, setExpandedTimeline] = useState(false);
  const [expandedEvidence, setExpandedEvidence] = useState(false);

  return (
    <div className="pt-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-[0_2px_4px_-1px_rgba(0,0,0,0.06),0_1px_2px_-1px_rgba(0,0,0,0.04)] border border-slate-200">
            <IntuitAssistIcon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-semibold text-slate-900">{label}</h3>
            <p className="text-xs text-slate-500">AI-powered analysis</p>
          </div>
        </div>
        <div className={`px-2.5 py-1 text-xs font-medium rounded-full border ${confidenceClass}`}>
          {confidence}
        </div>
      </div>

      <div className="space-y-3">
        {/* Title row */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className={`w-4 h-4 ${accentIcon}`} />
            <span className="text-xs font-semibold text-slate-900">{title}</span>
            <button className="text-slate-400 hover:text-slate-600 transition-colors" title="View detailed documentation">
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">{lead}</p>
        </div>

        {/* Metric strip */}
        <div className="grid grid-cols-4 border border-slate-200 rounded-lg overflow-hidden">
          {metrics.map((m, i) => (
            <div key={m.label} className={`px-3 py-2 ${i < metrics.length - 1 ? 'border-r border-slate-200' : ''}`}>
              <div className="text-[11px] tracking-wider text-slate-500 uppercase mb-1">{m.label}</div>
              <div className={`text-xs font-semibold ${m.valueClass ?? 'text-slate-900'}`}>{m.value}</div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setExpandedTimeline(!expandedTimeline)}
            className="w-full flex items-center justify-between px-3 py-2 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2 text-xs">
              <Clock className="w-4 h-4 text-cyan-600" />
              <span className="font-semibold text-slate-900">{timelineLabel}</span>
              <span className="text-xs text-slate-500">· {timelineEvents.length} events</span>
            </div>
            {expandedTimeline ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
          </button>

          {expandedTimeline && (
            <div className="border-t border-slate-200 divide-y divide-slate-200">
              {timelineEvents.map((e) => (
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
              <span className="text-xs text-slate-500">· {evidence.length} sources</span>
            </div>
            {expandedEvidence ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
          </button>

          {expandedEvidence && (
            <div className="border-t border-slate-200 divide-y divide-slate-200">
              {evidence.map((e) => (
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
      </div>
    </div>
  );
}

export function AlternativeHypotheses() {
  return (
    <div className="space-y-6">
      <Hypothesis
        label="Hypothesis 2"
        confidence="67% Confidence"
        confidenceClass="bg-purple-50 text-purple-700 border-purple-200"
        accentStripe="bg-purple-500"
        accentIcon="text-red-500"
        title="Network Latency Spike Between Cache Nodes"
        lead={
          <>
            Cross-region RTT increased from 23ms to <span className="text-red-600">68ms at 14:18 UTC</span>, with bandwidth saturation at <span className="text-red-600">92% capacity</span> driving connection timeouts.
          </>
        }
        metrics={[
          { label: 'Detection', value: '14:18 UTC' },
          { label: 'Avg RTT', value: '68ms (+196%)', valueClass: 'text-red-600' },
          { label: 'Packet Loss', value: '0.1%' },
          { label: 'Bandwidth', value: '92%', valueClass: 'text-amber-600' },
        ]}
        timelineLabel="Network Timeline"
        timelineEvents={[
          { time: '14:15', dot: 'bg-slate-300', timeColor: 'text-slate-500', title: 'Baseline established', detail: 'RTT stable at 23ms average' },
          { time: '14:18', dot: 'bg-amber-400', timeColor: 'text-amber-600', title: 'Latency spike detected', detail: 'RTT increased to 68ms, bandwidth at 92%' },
          { time: '14:23', dot: 'bg-red-500', timeColor: 'text-red-600', title: 'Connection timeouts', detail: 'Cache requests timing out' },
        ]}
        evidence={[
          { Icon: Network, name: 'Round Trip Time', detail: 'Jitter 12ms · 8 hops cross-region · baseline 23ms', value: '68ms (+196%)', color: 'text-red-600' },
          { Icon: TrendingUp, name: 'Bandwidth Usage', detail: 'Throughput 2.8/3.0 Gbps · queue depth 247 packets', value: '92% capacity', color: 'text-amber-600' },
          { Icon: Activity, name: 'Connection Quality', detail: 'Retransmissions 0.3% · 23 TCP timeouts in 5min', value: '0.1% loss', color: 'text-blue-600' },
        ]}
      />

      <Hypothesis
        label="Hypothesis 3"
        confidence="52% Confidence"
        confidenceClass="bg-amber-50 text-amber-700 border-amber-200"
        accentStripe="bg-amber-400"
        accentIcon="text-red-500"
        title="Memory Pressure on Cache Nodes"
        lead={
          <>
            Redis memory utilization reached <span className="text-red-600">87% of 8GB across 6 nodes at 14:20 UTC</span>, triggering GC pauses and a <span className="text-red-600">3.2x eviction rate</span> spike.
          </>
        }
        metrics={[
          { label: 'Detection', value: '14:20 UTC' },
          { label: 'Memory Usage', value: '87% (+74%)', valueClass: 'text-amber-600' },
          { label: 'GC Events', value: '12/hr', valueClass: 'text-red-600' },
          { label: 'Eviction Rate', value: '3.2x', valueClass: 'text-red-600' },
        ]}
        timelineLabel="Memory Timeline"
        timelineEvents={[
          { time: '14:10', dot: 'bg-slate-300', timeColor: 'text-slate-500', title: 'Normal operations', detail: 'Memory at 50% baseline' },
          { time: '14:20', dot: 'bg-amber-400', timeColor: 'text-amber-600', title: 'Memory spike', detail: 'Usage jumped to 87%' },
          { time: '14:21', dot: 'bg-red-500', timeColor: 'text-red-600', title: 'GC events', detail: '12 events/hr, 340ms pause time' },
          { time: '14:25', dot: 'bg-slate-300', timeColor: 'text-slate-500', title: 'Eviction started', detail: '3.2x baseline eviction rate' },
        ]}
        evidence={[
          { Icon: Database, name: 'Memory Statistics', detail: '6.96GB of 8GB · baseline 50% · peak 92% at 14:23', value: '87% (6.96GB)', color: 'text-amber-600' },
          { Icon: Activity, name: 'Garbage Collection', detail: 'Avg pause 340ms (from 45ms) · max 890ms', value: '12/hr', color: 'text-red-600' },
          { Icon: TrendingUp, name: 'Eviction Analysis', detail: '~8,400 keys evicted in 10min · cache miss +48%', value: '3.2x baseline', color: 'text-red-600' },
        ]}
      />
    </div>
  );
}
