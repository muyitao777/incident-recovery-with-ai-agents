import { Zap, CheckCircle, XCircle, TrendingUp, Clock, Target, ChevronRight, ChevronDown, Activity, ExternalLink, Share2, Search, Loader2, Play } from 'lucide-react';
import { useState, useEffect } from 'react';
import { IntuitAssistIcon } from './IntuitAssistIcon';
import { useUpdates } from '@/app/contexts/UpdatesContext';
import { ShareUpdateModal } from './ShareUpdateModal';

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

interface AIInvestigationSuggestionsProps {
  onInvestigate?: (title: string, context: string) => void;
}

export function AIInvestigationSuggestions({ onInvestigate }: AIInvestigationSuggestionsProps = {}) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareContent, setShareContent] = useState({ title: '', content: '' });
  const { addUpdate, setHighlightedAgentIds, setShowApprovalNotification } = useUpdates();
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionStep, setExecutionStep] = useState(0);
  const [executionProgress, setExecutionProgress] = useState(0);
  const [executionComplete, setExecutionComplete] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const executionSteps = [
    { label: 'Validating recovery plan...', detail: 'Checking prerequisites' },
    { label: 'Scaling Redis connection pool...', detail: '1,000 → 2,500 connections' },
    { label: 'Deploying memory leak patch v2.4.1...', detail: 'Blue-green deployment' },
    { label: 'Configuring circuit breakers...', detail: 'Setting thresholds' },
    { label: 'Running health checks...', detail: 'Verifying services' },
  ];

  // Execution animation progression
  useEffect(() => {
    if (!isExecuting) return;

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setExecutionProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    // Step progression
    const stepTimers: NodeJS.Timeout[] = [];
    executionSteps.forEach((_, idx) => {
      const timer = setTimeout(() => {
        setExecutionStep(idx);
        if (idx > 0) {
          setCompletedSteps(prev => [...prev, idx - 1]);
        }
      }, idx * 700);
      stepTimers.push(timer);
    });

    // Complete all steps, then show approval
    const completeTimer = setTimeout(() => {
      setCompletedSteps(prev => [...prev, executionSteps.length - 1]);
      setExecutionComplete(true);
      setTimeout(() => {
        setShowApprovalNotification(true);
      }, 600);
    }, executionSteps.length * 700);
    stepTimers.push(completeTimer);

    return () => {
      clearInterval(progressInterval);
      stepTimers.forEach(t => clearTimeout(t));
    };
  }, [isExecuting]);

  const handleShareClick = () => {
    const highPrioritySuggestions = suggestions.filter(s => s.priority === 'HIGH');
    const content = `AI Recovery Recommendations: ${highPrioritySuggestions.length} high-priority suggestions available. Top recommendations: ${highPrioritySuggestions.map(s => `${s.title} (${s.impact}, ${s.effort})`).join(', ')}. Confidence scores range from 76% to 92%.`;
    setShareContent({
      title: 'AI Suggested Recovery',
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
    // Highlight agent a1 (Root Cause Identified) as it provides the foundation for recovery suggestions
    setHighlightedAgentIds(['a1']);
    
    setTimeout(() => {
      const agentActivity = document.querySelector('[data-agent-id=\"a1\"]');
      if (agentActivity) {
        agentActivity.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const handleExecuteRecovery = () => {
    setIsExecuting(true);
  };

  const getConfidenceLevel = (confidence: number) => {
    if (confidence >= 85) return 'HIGH';
    if (confidence >= 80) return 'MEDIUM';
    return 'LOW';
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-[0_2px_4px_-1px_rgba(0,0,0,0.06),0_1px_2px_-1px_rgba(0,0,0,0.04)] border border-slate-200">
            <IntuitAssistIcon className="w-4 h-4" />
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
              <div className="flex items-center justify-between mb-1">
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
                  <div className={`text-sm font-semibold transition-colors ${
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
                  <div className="flex items-center gap-1 px-1.5 py-0.5 bg-slate-50 rounded">
                    <Activity className="w-3 h-3 text-slate-400" />
                    <span className="text-[10px] font-medium text-slate-500">{suggestion.confidence}%</span>
                  </div>
                  <div className={`transition-transform duration-200 ${expandedIndex === idx ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              </div>

              {/* Compact single-row: description + impact + time + buttons */}
              <div className="flex items-center gap-2">
                <p className="text-xs text-slate-500 truncate flex-1">{suggestion.description}</p>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <div className="w-1 h-1 rounded-full bg-emerald-500"></div>
                  <span className="text-xs text-emerald-700 font-medium whitespace-nowrap">{suggestion.impact}</span>
                </div>
                <div className="flex items-center gap-0.5 flex-shrink-0 text-slate-400">
                  <Clock className="w-3 h-3" />
                  <span className="text-xs">{suggestion.effort}</span>
                </div>
              </div>
            </div>
            
            {/* Expanded Details */}
            {expandedIndex === idx && (
              <div className="mt-2.5 pt-2.5 border-t border-slate-200 space-y-2.5 animate-in fade-in slide-in-from-top-2 duration-200">
                {/* Detailed Description */}
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-1 h-4 bg-slate-200 rounded-full"></div>
                    <div className="text-xs font-semibold text-slate-700">What This Does</div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-3">
                    {suggestion.detailedDescription}
                  </p>
                </div>
                
                {/* Detailed Impact */}
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-1 h-4 bg-slate-200 rounded-full"></div>
                    <div className="text-xs font-semibold text-slate-700">Expected Impact</div>
                  </div>
                  <p className="text-xs text-emerald-700 leading-relaxed pl-3 font-medium">
                    {suggestion.detailedImpact}
                  </p>
                </div>
                
                {/* Implementation Steps */}
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="w-1 h-4 bg-slate-200 rounded-full"></div>
                    <div className="text-xs font-semibold text-slate-700">Implementation Steps</div>
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
            
            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-1.5 mt-1.5">
              <button 
                className="relative overflow-hidden bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-700 text-white px-2.5 py-1 rounded-md text-xs transition-all duration-300 font-semibold hover:scale-105 flex items-center gap-1"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="relative z-10">Apply Fix</span>
                <ChevronRight className="w-3.5 h-3.5 relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </button>
              <button 
                className="bg-white hover:bg-slate-50 text-slate-600 px-2 py-1 rounded-md text-xs transition-all duration-200 border border-slate-200 font-medium hover:border-slate-400"
                onClick={(e) => e.stopPropagation()}
              >
                Skip
              </button>
            </div>
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
      
      {/* Action Buttons */}
      <div className="mt-3 flex items-center gap-2 pt-3 border-t border-slate-200">
        <button 
          className={`relative overflow-hidden text-white px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap ${
            isExecuting 
              ? 'bg-gradient-to-r from-cyan-500 to-blue-700 cursor-not-allowed' 
              : 'bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-700 hover:scale-105'
          }`} 
          onClick={handleExecuteRecovery}
          disabled={isExecuting}
        >
          {isExecuting ? (
            <>
              <Loader2 className="w-3.5 h-3.5 relative z-10 animate-spin" />
              <span className="relative z-10">Executing...</span>
            </>
          ) : (
            <>
              <span className="relative z-10">Execute the recovery</span>
              <ChevronRight className="w-3.5 h-3.5 relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700"></div>
            </>
          )}
        </button>
        <button 
          onClick={handleSeeAgentActivity}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200 whitespace-nowrap"
        >
          <Activity className="w-3.5 h-3.5" />
          See what agent checked
        </button>
        <button 
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200 whitespace-nowrap"
          onClick={handleShareClick}
        >
          <Share2 className="w-3.5 h-3.5" />
          Share as update
        </button>
        <button 
          onClick={() => onInvestigate?.('AI Suggested Recovery', 'Explore detailed recovery recommendations from AI analysis. The system has identified 6 active suggestions prioritized by confidence scores (76%-92%) and impact potential. High-priority actions include scaling the Redis connection pool (5 min, 80% error reduction, 92% confidence) and deploying memory leak fix v2.4.1 (15 min, stabilizes performance, 88% confidence). Medium-priority recommendations focus on implementing circuit breakers and enabling auto-scaling for long-term resilience. Each suggestion includes implementation steps, expected impact analysis, and validation from similar past incidents.')}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200 whitespace-nowrap"
        >
          <Search className="w-3.5 h-3.5" />
          Investigate further
        </button>
      </div>

      {/* Recovery Execution Animation Overlay */}
      {isExecuting && (
        <div className="mt-3 rounded-lg border border-cyan-200 bg-gradient-to-br from-cyan-50/80 to-blue-50/80 overflow-hidden">
          {/* Progress bar */}
          <div className="h-1 bg-slate-200">
            <div 
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-600 transition-all duration-100 ease-linear"
              style={{ width: `${executionProgress}%` }}
            />
          </div>

          <div className="p-3">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="relative">
                  {!executionComplete && (
                    <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping opacity-30"></div>
                  )}
                  {executionComplete ? (
                    <CheckCircle className="w-4 h-4 text-emerald-500 relative" />
                  ) : (
                    <div className="relative w-4 h-4 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                  )}
                </div>
                <span className="text-xs font-semibold text-slate-900">
                  {executionComplete ? 'Recovery Plan Ready' : 'Executing Recovery Plan'}
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">
                {executionComplete ? '100%' : `${Math.min(executionProgress, 99)}%`}
              </span>
            </div>

            {/* Steps */}
            <div className="space-y-1.5">
              {executionSteps.map((step, idx) => {
                const isActive = idx === executionStep && !executionComplete;
                const isDone = completedSteps.includes(idx);

                return (
                  <div 
                    key={idx} 
                    className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-md transition-all duration-300 ${
                      isActive 
                        ? 'bg-white/80 shadow-sm border border-cyan-200' 
                        : isDone 
                        ? 'bg-white/40' 
                        : 'opacity-40'
                    }`}
                  >
                    {/* Step indicator */}
                    <div className="flex-shrink-0">
                      {isDone ? (
                        <CheckCircle className="w-3 h-3 text-emerald-500" />
                      ) : isActive ? (
                        <Loader2 className="w-3 h-3 text-cyan-600 animate-spin" />
                      ) : (
                        <div className="w-3 h-3 rounded-full border border-slate-300" />
                      )}
                    </div>

                    {/* Step text */}
                    <div className="flex-1 min-w-0">
                      <span className={`text-[11px] font-medium ${
                        isDone ? 'text-slate-500' : isActive ? 'text-slate-900' : 'text-slate-400'
                      }`}>
                        {step.label}
                      </span>
                    </div>

                    {/* Detail badge */}
                    <span className={`text-[9px] font-mono flex-shrink-0 ${
                      isDone ? 'text-emerald-600' : isActive ? 'text-cyan-600' : 'text-slate-400'
                    }`}>
                      {isDone ? 'Done' : isActive ? step.detail : ''}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Completion message */}
            {executionComplete && (
              <div className="mt-2.5 pt-2.5 border-t border-cyan-200/50 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-medium text-emerald-700">
                  All recovery actions validated — awaiting approval
                </span>
              </div>
            )}
          </div>
        </div>
      )}

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