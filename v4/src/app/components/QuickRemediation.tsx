import { GitBranch, Clock, CheckCircle, AlertCircle, XCircle, ArrowRight, User, RotateCcw } from 'lucide-react';
import { AiIcon } from './AiIcon';

const deployments = [
  {
    version: 'v2.4.0',
    time: '14:15 UTC',
    status: 'failed',
    description: 'Cache layer optimization',
    author: 'Sarah Chen',
    changes: '+234 -89 lines',
    commitHash: 'a3f4d21',
    branch: 'main',
    duration: '4m 32s',
    environment: 'production',
    services: 3
  },
  {
    version: 'v2.3.9',
    time: '12:30 UTC',
    status: 'success',
    description: 'Authentication service update',
    author: 'Mike Rodriguez',
    changes: '+156 -42 lines',
    commitHash: 'b7c9e56',
    branch: 'main',
    duration: '3m 18s',
    environment: 'production',
    services: 2
  },
  {
    version: 'v2.3.8',
    time: '10:45 UTC',
    status: 'success',
    description: 'Database query performance',
    author: 'Emily Watson',
    changes: '+89 -31 lines',
    commitHash: 'f1a8d44',
    branch: 'main',
    duration: '2m 54s',
    environment: 'production',
    services: 1
  }
];

export function QuickRemediation() {
  return (
    <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
          <AiIcon className="w-3.5 h-3.5" />
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-900">Quick Remediation</div>
          <div className="text-xs text-slate-500">AI-powered recovery suggestions</div>
        </div>
      </div>
      
      {/* Recommended Action */}
      <div className="mb-3 p-3 bg-white rounded-lg border border-cyan-200 hover:border-cyan-300 transition-all">
        <div className="flex items-start gap-2 mb-2.5">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <div className="text-sm font-medium text-slate-900">Recommended Action</div>
              <div className="px-1.5 py-0.5 bg-cyan-100 text-cyan-700 text-xs rounded font-semibold">AI</div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Rollback to <span className="font-medium text-cyan-700">v2.3.9</span> to restore service health
            </p>
          </div>
        </div>
        
        <div className="flex gap-1.5">
          <button className="relative overflow-hidden bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 hover:from-cyan-400 hover:via-blue-400 hover:to-blue-500 text-white px-3 py-1.5 rounded-md text-xs transition-all duration-300 font-semibold hover:scale-105 flex items-center gap-1.5">
            <span className="relative z-10">Execute Rollback</span>
            <ArrowRight className="w-3 h-3 relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700"></div>
          </button>
          <button className="bg-white hover:bg-slate-50 text-slate-700 px-2.5 py-1.5 rounded-md text-xs transition-all duration-200 border border-slate-200 font-semibold hover:border-slate-400">
            View Diff
          </button>
        </div>
      </div>
      
      {/* Deployment Timeline */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-slate-600" />
            <div className="text-sm font-medium text-slate-900">Recent Deployments</div>
          </div>
          <div className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">Last 24h</div>
        </div>
        
        <div className="space-y-2">
          {deployments.map((deployment, idx) => (
            <div key={idx} className={`group relative flex items-center gap-2.5 p-3 rounded-lg border transition-all ${
              deployment.status === 'failed' 
                ? 'bg-white border-red-200 hover:border-red-300' 
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}>
              {/* Status Icon */}
              <div className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 ${
                deployment.status === 'failed'
                  ? 'bg-red-50'
                  : 'bg-green-50'
              }`}>
                {deployment.status === 'failed' ? (
                  <XCircle className="w-3.5 h-3.5 text-red-600" />
                ) : (
                  <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                )}
              </div>
              
              {/* Deployment Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className={`text-sm font-bold ${
                    deployment.status === 'failed' ? 'text-red-900' : 'text-slate-900'
                  }`}>
                    {deployment.version}
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-500">{deployment.time}</span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-500">{deployment.duration}</span>
                </div>
                
                <div className="text-xs text-slate-600 mb-1.5">{deployment.description}</div>
                
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-slate-500">{deployment.author}</span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-500 font-mono">{deployment.commitHash}</span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-500">{deployment.changes}</span>
                </div>
              </div>
              
              {/* Rollback Button - Always visible on all deployments */}
              <button 
                className="relative overflow-hidden bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 hover:from-cyan-400 hover:via-blue-400 hover:to-blue-500 text-white px-2.5 py-1.5 rounded-md text-xs transition-all duration-300 font-semibold hover:scale-105 flex items-center gap-1.5 flex-shrink-0"
                title={`Rollback to ${deployment.version}`}
              >
                <RotateCcw className="w-3 h-3 relative z-10" />
                <span className="relative z-10">Rollback</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700"></div>
              </button>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}