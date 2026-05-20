import { Zap, CheckCircle, XCircle, TrendingUp, Clock, Target, ChevronRight, ChevronDown, Gauge } from 'lucide-react';
import { useState } from 'react';
import { IntuitSparkleIcon } from './IntuitSparkleIcon';

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
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center border border-slate-200">
            <IntuitSparkleIcon size={14} />
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">AI Suggested Recovery</div>
            <div className="text-xs text-slate-500">Intelligent recommendations for faster resolution</div>
          </div>
        </div>
        <div className="px-2 py-0.5 bg-cyan-50 border border-cyan-200 rounded-md whitespace-nowrap flex items-center h-5">
          <span className="text-[10px] font-semibold text-cyan-700">6 Active</span>
        </div>
      </div>
      
      <div className="space-y-2">
        {suggestions.map((suggestion, idx) => (
          <div 
            key={idx} 
            className={`group bg-white border rounded-lg p-2.5 transition-all duration-300 ${
              expandedIndex === idx 
                ? 'border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.15)]' 
                : 'border-slate-200 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:scale-[1.01]'
            }`}
          >
            {/* Clickable header area */}
            <div 
              className="cursor-pointer"
              onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
            >
              {/* Header with Priority Badge */}
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
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
                  {/* Title */}
                  <div className={`text-xs font-semibold transition-colors ${
                    expandedIndex === idx ? 'text-cyan-700' : 'text-slate-900 group-hover:text-cyan-700'
                  }`}>
                    {suggestion.title}
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className={`px-1.5 py-0.5 rounded text-[9px] font-semibold ${
                    getConfidenceLevel(suggestion.confidence) === 'HIGH'
                      ? 'bg-green-50 text-green-700'
                      : getConfidenceLevel(suggestion.confidence) === 'MEDIUM'
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {getConfidenceLevel(suggestion.confidence)} CONFIDENCE
                  </div>
                  <div className="flex items-center gap-1 px-1.5 py-0.5 bg-cyan-50 rounded">
                    <Gauge className="w-3 h-3 text-cyan-600" />
                    <span className="text-[10px] font-semibold text-cyan-700">{suggestion.confidence}%</span>
                  </div>
                  <div className={`transition-transform duration-200 ${expandedIndex === idx ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              </div>
              
              {/* Description and Impact in compact layout */}
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-xs text-slate-600 leading-snug">
                  {suggestion.description}
                </p>
                <div className="flex items-center gap-1 ml-3 flex-shrink-0">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span className="text-xs font-medium text-slate-500">{suggestion.effort}</span>
                </div>
              </div>
              
              {/* Impact indicator */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-emerald-500 flex-shrink-0"></div>
                  <span className="text-xs text-emerald-700 font-medium">{suggestion.impact}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    className="relative overflow-hidden bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 hover:from-cyan-400 hover:via-blue-400 hover:to-blue-500 text-white px-2.5 py-1 rounded-md text-xs transition-all duration-300 font-semibold flex items-center gap-1"
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
            </div>
            
            {/* Expanded Details */}
            {expandedIndex === idx && (
              <div className="mt-2.5 pt-2.5 border-t border-slate-200 space-y-2.5 animate-in fade-in slide-in-from-top-2 duration-200">
                {/* Detailed Description */}
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-1 h-4 bg-cyan-500 rounded-full"></div>
                    <div className="text-xs font-bold text-slate-900">What This Does</div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-3">
                    {suggestion.detailedDescription}
                  </p>
                </div>
                
                {/* Detailed Impact */}
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-1 h-4 bg-emerald-500 rounded-full"></div>
                    <div className="text-xs font-bold text-slate-900">Expected Impact</div>
                  </div>
                  <p className="text-xs text-emerald-700 leading-relaxed pl-3 font-medium">
                    {suggestion.detailedImpact}
                  </p>
                </div>
                
                {/* Implementation Steps */}
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
                    <div className="text-xs font-bold text-slate-900">Implementation Steps</div>
                  </div>
                  <div className="space-y-1 pl-3">
                    {suggestion.steps.map((step, stepIdx) => (
                      <div key={stepIdx} className="flex items-start gap-2">
                        <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-[9px] font-bold text-slate-600">{stepIdx + 1}</span>
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
        <button className="text-xs font-semibold text-cyan-600 hover:text-cyan-700 transition-colors flex items-center gap-1 mx-auto">
          <span>View all 12 suggestions</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}