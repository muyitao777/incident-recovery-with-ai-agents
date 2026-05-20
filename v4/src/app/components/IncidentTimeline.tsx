import { Clock, AlertTriangle, AlertCircle, CheckCircle, Activity, Users, Database, GitBranch, Terminal, Zap, Box, Circle } from 'lucide-react';

const timelineEvents = [
  {
    time: '14:23 UTC',
    type: 'critical',
    icon: Zap,
    title: 'Incident Detected',
    description: 'Cache layer connection pool exhaustion detected. Error rate spiked to 2.34%.',
    details: 'Automated monitoring system triggered P1 incident based on error rate threshold breach.'
  },
  {
    time: '14:20 UTC',
    type: 'warning',
    icon: AlertCircle,
    title: 'Cache Performance Degradation',
    description: 'Cache hit rate dropped from 98% to 42%. Latency increased significantly.',
    details: 'Redis connection pool approaching capacity limit.'
  },
  {
    time: '14:18 UTC',
    type: 'warning',
    icon: Database,
    title: 'Database Connection Spike',
    description: 'Active database connections increased by 340% in 2 minutes.',
    details: 'Connection pool utilization at 87%. Monitoring for potential exhaustion.'
  },
  {
    time: '14:15 UTC',
    type: 'info',
    icon: Terminal,
    title: 'Deployment: v2.4.0',
    description: 'Cache layer optimization deployed to production by Sarah Chen.',
    details: '+234 -89 lines • Cache configuration changes and connection pool adjustments.'
  },
  {
    time: '13:45 UTC',
    type: 'success',
    icon: CheckCircle,
    title: 'Auto-Scaling Event',
    description: 'Scaled up 4 additional API server instances.',
    details: 'Response to increased load. All instances healthy and serving traffic.'
  },
  {
    time: '12:50 UTC',
    type: 'warning',
    icon: AlertTriangle,
    title: 'Memory Usage Alert',
    description: 'API server memory usage exceeded 85% on 3 instances.',
    details: 'Garbage collection frequency increased. Monitoring for memory leaks.'
  }
];

export function IncidentTimeline() {
  return (
    <div className="bg-white rounded-xl p-6 w-full h-full flex flex-col border border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-semibold text-slate-900">Incident Timeline</h3>
        <span className="text-xs text-slate-500">Last 24 hours</span>
      </div>
      
      <div className="space-y-4 relative flex-1 overflow-y-auto">
        {/* Timeline connector line */}
        <div className="absolute left-2 top-4 bottom-4 w-px bg-slate-200"></div>
        
        {timelineEvents.map((event, idx) => {
          const Icon = event.icon;
          return (
            <div key={idx} className="relative flex items-start gap-4">
              {/* Tech Icon */}
              <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 relative z-10 ${
                event.type === 'critical'
                  ? 'bg-red-100'
                  : event.type === 'warning'
                  ? 'bg-amber-100'
                  : event.type === 'success'
                  ? 'bg-green-100'
                  : 'bg-blue-100'
              }`}>
                <Icon className={`w-2.5 h-2.5 ${
                  event.type === 'critical'
                    ? 'text-red-600'
                    : event.type === 'warning'
                    ? 'text-amber-600'
                    : event.type === 'success'
                    ? 'text-green-600'
                    : 'text-blue-600'
                }`} />
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0 pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono text-slate-500">{event.time}</span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded capitalize ${
                    event.type === 'critical'
                      ? 'bg-red-100 text-red-700'
                      : event.type === 'warning'
                      ? 'bg-amber-100 text-amber-700'
                      : event.type === 'success'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>{event.type}</span>
                </div>
                
                <div className="text-sm font-semibold text-slate-900 mb-1">{event.title}</div>
                <div className="text-xs text-slate-600 leading-relaxed mb-1">{event.description}</div>
                <div className="text-xs text-slate-500">{event.details}</div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* View More */}
      <div className="text-center pt-4 border-t border-slate-200 mt-2">
        <button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
          View full timeline (24 events) →
        </button>
      </div>
    </div>
  );
}