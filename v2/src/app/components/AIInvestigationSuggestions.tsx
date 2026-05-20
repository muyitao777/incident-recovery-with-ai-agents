import { Zap, CheckCircle, XCircle, TrendingUp, Clock, Target, ChevronRight, ChevronDown, Gauge } from 'lucide-react';
import { useState } from 'react';

const suggestions = [
  {
    priority: 'HIGH',
    title: 'Increase Redis Connection Pool',
    description: 'Scale pool from 1K to 2.5K connections',
    detailedDescription: 'Scale connection pool from 1,000 to 2,500 connections to handle peak traffic. This will prevent connection exhaustion during high load periods and ensure stable cache performance.',
    impact: '80% error reduction',
    detailedImpact: 'Expected to reduce error rate by 80% and improve cache hit rate to 95%. Prevents connection timeout errors during traffic spikes.',
    effort: '5 min',
    confidence: 92,
    steps: ['Update redis.conf pool settings', 'Deploy configuration change', 'Monitor connection metrics']
  },
  {
    priority: 'HIGH',
    title: 'Deploy Memory Leak Fix',
    description: 'Apply patch v2.4.1 for cache layer',
    detailedDescription: 'Apply patch v2.4.1 that addresses gradual memory consumption in the cache layer. This fix has been tested in staging environment and resolves the memory leak issue.',
    impact: 'Stabilizes performance',
    detailedImpact: 'Prevents future memory-related degradation, stabilizes cache performance, and eliminates gradual memory growth that leads to OOM crashes.',
    effort: '15 min',
    confidence: 88,
    steps: ['Pull latest patch from repository', 'Run automated test suite', 'Deploy to production with blue-green strategy']
  },
  {
    priority: 'MEDIUM',
    title: 'Implement Circuit Breaker',
    description: 'Prevent cascade failures with graceful degradation',
    detailedDescription: 'Add circuit breaker to prevent cascade failures when cache is unavailable. Requests will temporarily bypass cache with graceful degradation, protecting downstream services.',
    impact: '60% error reduction',
    detailedImpact: 'Reduces error propagation to downstream services by 60% and maintains partial functionality during cache outages.',
    effort: '30 min',
    confidence: 85,
    steps: ['Implement circuit breaker pattern', 'Configure fallback behavior', 'Set threshold values', 'Deploy and test']
  },
  {
    priority: 'MEDIUM',
    title: 'Enable Redis Auto-Scaling',
    description: 'Dynamic capacity based on utilization metrics',
    detailedDescription: 'Configure auto-scaling rules to dynamically adjust Redis cluster capacity based on connection pool utilization and throughput metrics.',
    impact: '99.9% availability',
    detailedImpact: 'Prevents future capacity issues during traffic spikes, maintains 99.9% availability, and optimizes resource costs.',
    effort: '20 min',
    confidence: 81,
    steps: ['Define scaling policies', 'Configure CloudWatch metrics', 'Set min/max capacity limits', 'Enable auto-scaling']
  },
  {
    priority: 'LOW',
    title: 'Optimize Cache Eviction',
    description: 'Tune LRU settings for current patterns',
    detailedDescription: 'Optimize LRU eviction settings to better handle the current usage patterns. Analysis shows 15% of cached items are evicted prematurely.',
    impact: '12% hit rate increase',
    detailedImpact: 'Increases cache hit rate by 12%, reduces database load, and improves overall response times.',
    effort: '10 min',
    confidence: 76,
    steps: ['Analyze current eviction patterns', 'Adjust maxmemory-policy settings', 'Monitor hit rate improvements']
  },
  {
    priority: 'LOW',
    title: 'Add Cache Monitoring Alerts',
    description: 'Proactive alerts for pool saturation',
    detailedDescription: 'Set up proactive alerts for connection pool saturation, memory usage thresholds, and eviction rate anomalies to catch issues earlier.',
    impact: '40% faster detection',
    detailedImpact: 'Reduces mean time to detection (MTTD) by 40% for cache-related incidents, enabling faster response times.',
    effort: '25 min',
    confidence: 79,
    steps: ['Create CloudWatch alarms', 'Configure notification channels', 'Set threshold values', 'Test alert flow']
  }
];

export function AIInvestigationSuggestions() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const getConfidenceLevel = (confidence: number) => {
    if (confidence >= 85) return 'HIGH';
    if (confidence >= 80) return 'MEDIUM';
    return 'LOW';
  };

  return (
    <div className="bg-white rounded-[10px] p-4 border border-slate-200 shadow-card">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
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
            <div className="text-sm font-medium text-slate-900">AI Suggested Recovery</div>
            <div className="text-xs text-slate-500">Intelligent recommendations for faster resolution</div>
          </div>
        </div>
        <div className="px-2 py-0.5 bg-cyan-50 border border-cyan-200 rounded-md whitespace-nowrap">
          <span className="text-xs font-medium text-cyan-700">6 Active</span>
        </div>
      </div>
      
      <div className="space-y-2">
        {suggestions.map((suggestion, idx) => (
          <div 
            key={idx} 
            className={`group bg-white border rounded-lg px-3 py-2 transition-all ${
              expandedIndex === idx 
                ? 'border-blue-400 bg-blue-50/40 shadow-sm ring-1 ring-blue-200' 
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            {/* Clickable header area */}
            <div 
              className="cursor-pointer"
              onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
            >
              {/* Header with Priority Badge */}
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2 min-w-0">
                  <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${
                    suggestion.priority === 'HIGH'
                      ? 'bg-green-50'
                      : suggestion.priority === 'MEDIUM'
                      ? 'bg-amber-50'
                      : 'bg-slate-100'
                  }`}>
                    <span className={`text-[10px] font-bold ${
                      suggestion.priority === 'HIGH'
                        ? 'text-green-700'
                        : suggestion.priority === 'MEDIUM'
                        ? 'text-amber-700'
                        : 'text-slate-600'
                    }`}>
                      {idx + 1}
                    </span>
                  </div>
                  <div className={`text-sm font-semibold truncate transition-colors ${
                    expandedIndex === idx ? 'text-cyan-800' : 'text-slate-950 group-hover:text-cyan-800'
                  }`}>
                    {suggestion.title}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                    getConfidenceLevel(suggestion.confidence) === 'HIGH'
                      ? 'bg-green-50 text-green-700'
                      : getConfidenceLevel(suggestion.confidence) === 'MEDIUM'
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {getConfidenceLevel(suggestion.confidence)} CONFIDENCE
                  </div>
                  <div className="flex items-center gap-1 px-1.5 py-0.5 bg-cyan-50 rounded">
                    <Gauge className="w-3 h-3 text-cyan-400" />
                    <span className="text-[10px] font-semibold text-cyan-700">{suggestion.confidence}%</span>
                  </div>
                  <div className={`transition-transform duration-200 ${expandedIndex === idx ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              </div>
              
              {/* Description and Impact in compact layout */}
              <div className="flex items-center gap-3 mb-1">
                <p className="text-xs text-slate-600 leading-snug">
                  {suggestion.description}
                </p>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <div className="w-1 h-1 rounded-full bg-emerald-500 flex-shrink-0"></div>
                  <span className="text-xs text-emerald-700 font-medium">{suggestion.impact}</span>
                </div>
              </div>
              
            </div>

            {/* Effort + Action row */}
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-1 text-slate-500">
                <Clock className="w-3 h-3" />
                <span className="text-xs font-medium">{suggestion.effort}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  className="relative overflow-hidden bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 hover:from-cyan-400 hover:via-blue-400 hover:to-blue-500 text-white px-2.5 py-1 rounded-md text-xs transition-all duration-300 font-medium hover:scale-105 flex items-center gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="relative z-10">Apply Fix</span>
                  <ChevronRight className="w-3 h-3 relative z-10" />
                </button>
                <button
                  className="bg-white hover:bg-slate-50 text-slate-600 px-2 py-1 rounded-md text-xs transition-all duration-200 border border-slate-200 font-medium hover:border-slate-400"
                  onClick={(e) => e.stopPropagation()}
                >
                  Skip
                </button>
              </div>
            </div>

            {/* Expanded Details */}
            {expandedIndex === idx && (
              <div className="mt-3 pt-3 border-t border-slate-200 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                {/* Detailed Description */}
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="w-1 h-4 bg-cyan-500 rounded-full"></div>
                    <div className="text-xs font-bold text-slate-900">What This Does</div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-3">
                    {suggestion.detailedDescription}
                  </p>
                </div>
                
                {/* Detailed Impact */}
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="w-1 h-4 bg-emerald-500 rounded-full"></div>
                    <div className="text-xs font-bold text-slate-900">Expected Impact</div>
                  </div>
                  <p className="text-xs text-emerald-700 leading-relaxed pl-3 font-medium">
                    {suggestion.detailedImpact}
                  </p>
                </div>
                
                {/* Implementation Steps */}
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
                    <div className="text-xs font-bold text-slate-900">Implementation Steps</div>
                  </div>
                  <div className="space-y-1.5 pl-3">
                    {suggestion.steps.map((step, stepIdx) => (
                      <div key={stepIdx} className="flex items-start gap-2">
                        <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-[9px] font-semibold text-slate-600">{stepIdx + 1}</span>
                        </div>
                        <span className="text-xs text-slate-600 leading-relaxed">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
          </div>
        ))}
      </div>
      
      {/* View More */}
      <div className="text-center mt-3 pt-3 border-t border-slate-200">
        <button className="text-xs font-medium text-cyan-600 hover:text-cyan-700 transition-colors flex items-center gap-1 mx-auto">
          <span>View all 12 suggestions</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}