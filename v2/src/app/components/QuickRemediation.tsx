import { GitBranch, Clock, CheckCircle, AlertCircle, XCircle, ArrowRight, User, RotateCcw } from 'lucide-react';

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
    <div className="bg-white rounded-[10px] p-4 border border-slate-200 shadow-card">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
          <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.433 14.7484L3.30904 14.0908L5.37585 10.5269C5.63229 10.0847 6.08971 9.82176 6.59926 9.82368C7.10881 9.8256 7.56424 10.0919 7.81734 10.5361L9.85727 14.1155L8.72839 14.7646L6.68846 11.1852C6.64753 11.1132 6.54237 11.1117 6.5009 11.1845L4.43409 14.7484L4.433 14.7484Z" fill="#236CFF"/>
            <path d="M12.0365 14.53L9.31649 11.4405C8.97944 11.0575 8.87344 10.5382 9.03602 10.0529C9.19752 9.56756 9.59201 9.21713 10.0916 9.11483L14.1159 8.29229L14.3745 9.57303L10.3503 10.3956C10.309 10.4039 10.2828 10.4276 10.2694 10.4678C10.2561 10.508 10.2633 10.5429 10.2912 10.5747L13.0113 13.6642L12.0365 14.53Z" fill="#236CFF"/>
            <path d="M10.8577 8.15932C10.5672 8.15688 10.2807 8.0619 10.035 7.88015C9.62557 7.57615 9.41498 7.09088 9.4724 6.58172L9.93625 2.4835L11.2285 2.6305L10.7646 6.72873C10.7599 6.77007 10.7748 6.80395 10.8082 6.82819C10.8416 6.85243 10.8784 6.85709 10.9165 6.83999L14.6817 5.19361L15.2007 6.39148L11.4355 8.03787C11.2484 8.12014 11.0518 8.15878 10.8577 8.15714L10.8577 8.15932Z" fill="#236CFF"/>
            <path d="M7.4008 6.5038C7.20674 6.5038 7.0105 6.46242 6.82403 6.37966L3.07286 4.70162L3.60193 3.50816L7.3531 5.1862C7.39104 5.20362 7.4279 5.19926 7.46151 5.17531C7.49512 5.15026 7.5103 5.11759 7.50596 5.07622L7.07555 0.972053L8.36895 0.835938L8.79827 4.93792C8.8514 5.44645 8.63673 5.92993 8.22476 6.23157C7.97757 6.41233 7.69027 6.5038 7.39972 6.5038H7.4008Z" fill="#236CFF"/>
            <path d="M3.04108 11.8823L2.08339 10.9976L4.86312 7.96172C4.89163 7.93153 4.8996 7.89568 4.88702 7.85525C4.87443 7.81592 4.84759 7.79058 4.80758 7.78144L0.800133 6.88282L1.08369 5.60737L5.09111 6.50817C5.58865 6.62019 5.97624 6.97824 6.12825 7.46664C6.28026 7.95503 6.16526 8.47108 5.82079 8.84855L3.04106 11.8844L3.04108 11.8823Z" fill="#236CFF"/>
          </svg>
        </div>
        <div>
          <div className="text-sm font-medium text-slate-900">Quick Remediation</div>
          <div className="text-xs text-slate-500">AI-powered recovery suggestions</div>
        </div>
      </div>
      
      {/* Recommended Action */}
      <div className="mb-3 p-3 bg-white rounded-lg border border-cyan-200 hover:border-cyan-300 transition-all">
        <div className="flex items-start gap-2 mb-2.5">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <div className="text-sm font-bold text-slate-900">Recommended Action</div>
              <div className="px-1.5 py-0.5 bg-cyan-100 text-cyan-700 text-xs rounded font-medium">AI</div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Rollback to <span className="font-semibold text-cyan-700">v2.3.9</span> to restore service health
            </p>
          </div>
        </div>
        
        <div className="flex gap-1.5">
          <button className="relative overflow-hidden bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 hover:from-cyan-400 hover:via-blue-400 hover:to-blue-500 text-white px-3 py-1.5 rounded-lg text-xs transition-all duration-300 font-medium hover:scale-105 flex items-center gap-1.5">
            <span className="relative z-10">Execute Rollback</span>
            <ArrowRight className="w-3 h-3 relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700"></div>
          </button>
          <button className="bg-white hover:bg-slate-50 text-slate-700 px-2.5 py-1.5 rounded-lg text-xs transition-all duration-200 border border-slate-200 font-medium hover:border-slate-400">
            View Diff
          </button>
        </div>
      </div>
      
      {/* Deployment Timeline */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <div className="text-sm font-semibold text-slate-900">Recent Deployments</div>
          </div>
          <div className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">Last 24h</div>
        </div>
        
        <div className="space-y-2">
          {deployments.map((deployment, idx) => (
            <div key={idx} className={`group relative flex items-center gap-2.5 px-3 py-2 rounded-lg border transition-all ${
              deployment.status === 'failed'
                ? 'bg-white border-red-200 hover:border-red-300'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}>
              {/* Status Icon */}
              {deployment.status === 'failed' ? (
                <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              ) : (
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
              )}

              {/* Deployment Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-sm font-semibold ${
                    deployment.status === 'failed' ? 'text-red-900' : 'text-slate-900'
                  }`}>
                    {deployment.version}
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-500">{deployment.time}</span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-500">{deployment.duration}</span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-600">{deployment.description}</span>
                </div>

                <div className="flex items-center gap-2 flex-wrap mt-0.5">
                  <span className="text-xs text-slate-500">{deployment.author}</span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-500 font-mono">{deployment.commitHash}</span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-500">{deployment.changes}</span>
                </div>
              </div>
              
              {/* Rollback Button - Always visible on all deployments */}
              <button 
                className="relative overflow-hidden bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 hover:from-cyan-400 hover:via-blue-400 hover:to-blue-500 text-white px-2.5 py-1.5 rounded-lg text-xs transition-all duration-300 font-medium hover:scale-105 flex items-center gap-1.5 flex-shrink-0"
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