import { Zap, CheckCircle, XCircle, TrendingUp, Clock, Target, ChevronRight, ChevronDown, Gauge } from 'lucide-react';
import { useState } from 'react';
import { AiIcon } from './AiIcon';

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
    <div className="bg-white rounded-lg p-4 border border-slate-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
            <AiIcon className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-sm font-medium text-slate-900">AI Suggested Recovery</div>
            <div className="text-xs text-slate-500">Intelligent recommendations for faster resolution</div>
          </div>
        </div>
        <div className="px-2 py-0.5 bg-cyan-50 border border-cyan-200 rounded-md whitespace-nowrap">
          <span className="text-xs font-semibold text-cyan-700">6 Active</span>
        </div>
      </div>
      
      <div className="space-y-1.5">
        {suggestions.map((suggestion, idx) => (
          <div 
            key={idx} 
            className={`group bg-white border rounded-lg px-3 py-3 transition-all ${
              expandedIndex === idx 
                ? 'border-cyan-300 shadow-md' 
                : 'border-slate-200 hover:border-cyan-300 hover:shadow-md'
            }`}
          >
            {/* Clickable header area */}
            <div 
              className="cursor-pointer"
              onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
            >
              {/* Row 1: number + title + badges + chevron */}
              <div className="flex items-center gap-2 mb-1.5">
                <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${
                  suggestion.priority === 'HIGH' 
                    ? 'bg-green-50' 
                    : suggestion.priority === 'MEDIUM'
                    ? 'bg-amber-50'
                    : 'bg-slate-100'
                }`}>
                  <span className={`text-xs font-bold ${
                    suggestion.priority === 'HIGH' 
                      ? 'text-green-700' 
                      : suggestion.priority === 'MEDIUM'
                      ? 'text-amber-700'
                      : 'text-slate-600'
                  }`}>{idx + 1}</span>
                </div>
                <div className={`text-sm font-medium flex-1 transition-colors ${
                  expandedIndex === idx ? 'text-cyan-700' : 'text-slate-900 group-hover:text-cyan-700'
                }`}>
                  {suggestion.title}
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <div className={`px-2 py-0.5 rounded text-xs font-semibold ${
                    getConfidenceLevel(suggestion.confidence) === 'HIGH'
                      ? 'bg-green-50 text-green-700'
                      : getConfidenceLevel(suggestion.confidence) === 'MEDIUM'
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {getConfidenceLevel(suggestion.confidence)}
                  </div>
                  <div className="flex items-center gap-0.5 px-2 py-0.5 bg-cyan-50 rounded">
                    <Gauge className="w-3 h-3 text-cyan-600" />
                    <span className="text-xs font-semibold text-cyan-700">{suggestion.confidence}%</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${expandedIndex === idx ? 'rotate-180' : ''}`} />
                </div>
              </div>

              {/* Row 2: description + impact + effort + buttons all inline */}
              <div className="flex items-center gap-3">
                <p className="text-sm text-slate-500 flex-1 truncate">{suggestion.description}</p>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  <span className="text-xs text-emerald-700 font-medium whitespace-nowrap">{suggestion.impact}</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400 flex-shrink-0">
                  <Clock className="w-3 h-3" />
                  <span className="text-xs">{suggestion.effort}</span>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                  <button className="relative overflow-hidden bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 hover:from-cyan-400 hover:via-blue-400 hover:to-blue-500 text-white px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1 transition-all duration-200">
                    Apply Fix <ChevronRight className="w-3 h-3" />
                  </button>
                  <button className="bg-white hover:bg-slate-50 text-slate-500 px-2.5 py-1 rounded-md text-xs border border-slate-200 font-medium transition-all duration-200">
                    Skip
                  </button>
                </div>
              </div>
            </div>
            
            {/* Expanded Details */}
            {expandedIndex === idx && (
              <div className="mt-2.5 pt-2.5 border-t border-slate-200 space-y-2.5 animate-in fade-in slide-in-from-top-2 duration-200">
                {/* Detailed Description */}
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-1 h-3 bg-cyan-500 rounded-full"></div>
                    <div className="text-sm font-medium text-slate-900">What This Does</div>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed pl-3">{suggestion.detailedDescription}</p>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-1 h-3 bg-emerald-500 rounded-full"></div>
                    <div className="text-sm font-medium text-slate-900">Expected Impact</div>
                  </div>
                  <p className="text-sm text-emerald-700 leading-relaxed pl-3 font-medium">{suggestion.detailedImpact}</p>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="w-1 h-3 bg-blue-500 rounded-full"></div>
                    <div className="text-sm font-medium text-slate-900">Implementation Steps</div>
                  </div>
                  <div className="space-y-1 pl-3">
                    {suggestion.steps.map((step, stepIdx) => (
                      <div key={stepIdx} className="flex items-start gap-2">
                        <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-[10px] font-medium text-slate-600">{stepIdx + 1}</span>
                        </div>
                        <span className="text-sm text-slate-600 leading-relaxed">{step}</span>
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
        <button className="text-xs font-semibold text-cyan-600 hover:text-cyan-700 transition-colors flex items-center gap-1 mx-auto">
          <span>View all 12 suggestions</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}