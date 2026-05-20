import { CheckCircle2, Loader2, Clock, AlertCircle, CheckCircle, Database, Terminal, Zap, AlertTriangle, Brain, Network, FileText, ChevronDown, ChevronRight, SlidersHorizontal, BarChart3, Plus, User, Send, X, Image, Link2, Upload } from 'lucide-react';
import { useState } from 'react';
import { IntuitSparkleIcon } from './IntuitSparkleIcon';

interface TimelineEvent {
  id: string;
  time: string;
  type: 'timeline' | 'agent' | 'user';
  // Timeline specific
  eventType?: 'critical' | 'warning' | 'info' | 'success';
  icon?: any;
  title?: string;
  description?: string;
  details?: string;
  // Agent specific
  action?: string;
  status?: 'completed' | 'in-progress' | 'pending';
  duration?: string;
  confidence?: number;
  expandedDetails?: {
    findings?: string[];
    dataPoints?: { label: string; value: string }[];
    artifacts?: { name: string; type: string }[];
  };
  // User update specific
  author?: string;
}

const allEvents: TimelineEvent[] = [
  {
    id: 'a1',
    time: '14:55',
    type: 'agent',
    action: 'Root Cause Identified',
    status: 'completed',
    description: 'Redis connection pool exhaustion in Cache Layer identified as primary cause',
    duration: '45s',
    confidence: 94,
    expandedDetails: {
      findings: [
        'Connection pool reached 100% capacity at 14:23 UTC',
        'Timeout errors correlated with pool exhaustion',
        'Similar pattern observed in 2 previous incidents'
      ],
      dataPoints: [
        { label: 'Analysis Method', value: 'Multi-variate correlation' },
        { label: 'Data Sources', value: 'Metrics, Logs, Traces' },
        { label: 'Processing Time', value: '45 seconds' }
      ]
    }
  },
  {
    id: 'a2',
    time: '14:54',
    type: 'agent',
    action: 'Pattern Recognition Analysis',
    status: 'in-progress',
    description: 'Comparing incident with 2 similar cases: INC1765432, INC1723891',
    confidence: 67,
    expandedDetails: {
      findings: [
        'Analyzing historical incident patterns from last 90 days',
        'Matching error signatures and service topology',
        'Calculating similarity scores and remediation effectiveness'
      ],
      dataPoints: [
        { label: 'Historical Incidents', value: '2 similar cases found' },
        { label: 'Time Period', value: 'Last 90 days' },
        { label: 'Similarity Score', value: '87% match' }
      ]
    }
  },
  {
    id: 'a3',
    time: '14:53',
    type: 'agent',
    action: 'Deployment Correlation',
    status: 'completed',
    description: 'Linked to v2.4.0 deployment at 14:18 UTC with cache config changes',
    duration: '1m 8s',
    confidence: 89,
    expandedDetails: {
      findings: [
        'Deployment v2.4.0 occurred 5 minutes before incident',
        'Cache configuration changes detected in deployment',
        'Connection pool settings modified from 1500 to 1000'
      ],
      dataPoints: [
        { label: 'Deployment Version', value: 'v2.4.0' },
        { label: 'Deployment Time', value: '14:18 UTC' },
        { label: 'Config Changes', value: '3 cache-related changes' }
      ],
      artifacts: [
        { name: 'deployment-manifest.yaml', type: 'Config' },
        { name: 'cache-config-diff.txt', type: 'Diff' }
      ]
    }
  },
  {
    id: 'a4',
    time: '14:53',
    type: 'agent',
    action: 'Log Analysis Complete',
    status: 'completed',
    description: 'Processed 2.4M log entries, identified 348 error patterns across 7 services',
    duration: '2m 12s',
    confidence: 97,
    expandedDetails: {
      findings: [
        'Connection timeout errors: 2,547 occurrences',
        'Redis unavailable errors: 300 occurrences',
        'Error spike started at 14:23:17 UTC'
      ],
      dataPoints: [
        { label: 'Logs Processed', value: '2.4M entries' },
        { label: 'Time Range', value: 'Last 60 minutes' },
        { label: 'Error Patterns', value: '348 unique patterns' },
        { label: 'Affected Services', value: '7 services' }
      ]
    }
  },
  {
    id: 't1',
    time: '14:23',
    type: 'timeline',
    eventType: 'critical',
    icon: Zap,
    title: 'Incident Detected',
    description: 'Cache layer connection pool exhaustion detected. Error rate spiked to 2.34%.',
    details: 'Automated monitoring system triggered P1 incident based on error rate threshold breach.'
  },
  {
    id: 't2',
    time: '14:20',
    type: 'timeline',
    eventType: 'warning',
    icon: AlertCircle,
    title: 'Cache Performance Degradation',
    description: 'Cache hit rate dropped from 98% to 42%. Latency increased significantly.',
    details: 'Redis connection pool approaching capacity limit.'
  },
  {
    id: 't3',
    time: '14:18',
    type: 'timeline',
    eventType: 'warning',
    icon: Database,
    title: 'Database Connection Spike',
    description: 'Active database connections increased by 340% in 2 minutes.',
    details: 'Connection pool utilization at 87%. Monitoring for potential exhaustion.'
  },
  {
    id: 't4',
    time: '14:15',
    type: 'timeline',
    eventType: 'info',
    icon: Terminal,
    title: 'Deployment: v2.4.0',
    description: 'Cache layer optimization deployed to production by Sarah Chen.',
    details: '+234 -89 lines • Cache configuration changes and connection pool adjustments.'
  },
  {
    id: 'a5',
    time: '14:52',
    type: 'agent',
    action: 'Service Dependencies Mapped',
    status: 'completed',
    description: 'Generated topology graph with 12 services and 24 dependency links',
    duration: '18s',
    expandedDetails: {
      findings: [
        'Cache Layer has 8 downstream dependencies',
        'Critical path includes Auth Service and API Gateway',
        'Identified potential cascade failure points'
      ],
      dataPoints: [
        { label: 'Total Services', value: '12 services' },
        { label: 'Dependency Links', value: '24 connections' },
        { label: 'Critical Services', value: '4 high-priority' }
      ]
    }
  },
  {
    id: 'a6',
    time: '14:52',
    type: 'agent',
    action: 'Anomaly Detection',
    status: 'completed',
    description: 'Detected 5 anomalies: latency spike, error rate increase, connection pool saturation',
    duration: '1m 5s',
    confidence: 91,
    expandedDetails: {
      findings: [
        'P95 latency increased 247% above baseline',
        'Error rate jumped from 0.02% to 2.34%',
        'Connection pool utilization at 100%',
        'Memory usage anomaly detected (+45%)',
        'Cache hit rate dropped from 98% to 42%'
      ],
      dataPoints: [
        { label: 'Anomalies Detected', value: '5 critical anomalies' },
        { label: 'Detection Method', value: 'Statistical modeling' },
        { label: 'Baseline Period', value: 'Last 7 days' }
      ]
    }
  },
  {
    id: 'a7',
    time: '14:51',
    type: 'agent',
    action: 'Metric Correlation',
    status: 'completed',
    description: 'Analyzed 47 metrics across services, found 12 correlated patterns',
    duration: '56s',
    confidence: 88,
    expandedDetails: {
      findings: [
        'Strong correlation between pool saturation and error rate (r=0.94)',
        'Latency increase followed pool capacity by 2 minutes',
        'Cache miss rate inversely correlated with hit rate'
      ],
      dataPoints: [
        { label: 'Metrics Analyzed', value: '47 metrics' },
        { label: 'Correlated Patterns', value: '12 patterns' },
        { label: 'Correlation Strength', value: 'High (r>0.85)' }
      ]
    }
  },
  {
    id: 'a8',
    time: '14:50',
    type: 'agent',
    action: 'Data Collection',
    status: 'completed',
    description: 'Queried Prometheus, Elasticsearch, and Jaeger for 24h historical data',
    duration: '2m 34s',
    expandedDetails: {
      findings: [
        'Retrieved 47 time-series metrics from Prometheus',
        'Collected 2.4M log entries from Elasticsearch',
        'Fetched 125K trace spans from Jaeger'
      ],
      dataPoints: [
        { label: 'Data Sources', value: '3 systems queried' },
        { label: 'Time Range', value: 'Last 24 hours' },
        { label: 'Total Data Points', value: '~2.5M records' }
      ]
    }
  },
  {
    id: 't5',
    time: '13:45',
    type: 'timeline',
    eventType: 'success',
    icon: CheckCircle,
    title: 'Auto-Scaling Event',
    description: 'Scaled up 4 additional API server instances.',
    details: 'Response to increased load. All instances healthy and serving traffic.'
  },
  {
    id: 't6',
    time: '12:50',
    type: 'timeline',
    eventType: 'warning',
    icon: AlertTriangle,
    title: 'Memory Usage Alert',
    description: 'API server memory usage exceeded 85% on 3 instances.',
    details: 'Garbage collection frequency increased. Monitoring for memory leaks.'
  }
];

export function MergedIncidentUpdates({ showAddUpdate, setShowAddUpdate }: { showAddUpdate: boolean; setShowAddUpdate: (show: boolean) => void }) {
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'timeline' | 'agent'>('all');
  const [aiSummaryExpanded, setAiSummaryExpanded] = useState(true);
  const [userEvents, setUserEvents] = useState<TimelineEvent[]>([]);
  const [newUpdateText, setNewUpdateText] = useState('');
  const [attachedImages, setAttachedImages] = useState<Array<{ name: string; size: string; preview: string }>>([]);
  const [attachedLinks, setAttachedLinks] = useState<Array<{ url: string; title: string }>>([]);
  const [showImageInput, setShowImageInput] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkTitle, setLinkTitle] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleFiles(files);
    }
  };

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const size = file.size < 1024 * 1024 
            ? `${(file.size / 1024).toFixed(1)} KB`
            : `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
          
          setAttachedImages(prev => [...prev, {
            name: file.name,
            size: size,
            preview: e.target?.result as string
          }]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handlePostUpdate = () => {
    if (!newUpdateText.trim()) return;
    
    const now = new Date();
    const timeString = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    const newUpdate: TimelineEvent = {
      id: `user-${Date.now()}`,
      time: timeString,
      type: 'user',
      author: 'You',
      description: newUpdateText,
    };
    
    setUserEvents([newUpdate, ...userEvents]);
    setNewUpdateText('');
    setAttachedImages([]);
    setAttachedLinks([]);
    setShowImageInput(false);
    setShowLinkInput(false);
    setShowAddUpdate(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="flex items-center gap-1 px-1.5 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-medium rounded-full border border-emerald-200">
            <CheckCircle2 className="w-2.5 h-2.5" />
            Completed
          </span>
        );
      case 'in-progress':
        return (
          <span className="flex items-center gap-1 px-1.5 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-medium rounded-full border border-blue-200">
            <Loader2 className="w-2.5 h-2.5 animate-spin" />
            In Progress
          </span>
        );
      case 'pending':
        return (
          <span className="flex items-center gap-1 px-1.5 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-medium rounded-full border border-slate-200">
            <Clock className="w-2.5 h-2.5" />
            Pending
          </span>
        );
      default:
        return null;
    }
  };

  const filteredEvents = filterType === 'all' 
    ? [...userEvents, ...allEvents] 
    : [...userEvents, ...allEvents].filter(e => e.type === filterType);

  return (
    <div>
      {/* Modal Overlay */}
      {showAddUpdate && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setShowAddUpdate(false)}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-900">Add Update</h3>
                  <p className="text-xs text-slate-600">Post an update to the incident timeline</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowAddUpdate(false);
                  setNewUpdateText('');
                }}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5">
              <div className="mb-3">
                <label className="block text-xs font-semibold text-slate-900 mb-2">Update Message</label>
                <textarea
                  className="w-full h-32 px-3 py-2.5 text-sm text-slate-700 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent resize-none"
                  value={newUpdateText}
                  onChange={(e) => setNewUpdateText(e.target.value)}
                  placeholder="Describe what's happening, any actions taken, or observations about the incident..."
                  autoFocus
                ></textarea>
              </div>

              {/* Attachment Buttons */}
              <div className="flex items-center gap-2 mb-3">
                <button
                  onClick={() => setShowImageInput(!showImageInput)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 rounded-lg border border-slate-300 transition-colors"
                >
                  <Image className="w-3.5 h-3.5" />
                  Add Image
                </button>
                <button
                  onClick={() => setShowLinkInput(!showLinkInput)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 rounded-lg border border-slate-300 transition-colors"
                >
                  <Link2 className="w-3.5 h-3.5" />
                  Add Link
                </button>
              </div>

              {/* Image Input */}
              {showImageInput && (
                <div className="mb-3">
                  <label className="block text-xs font-semibold text-slate-900 mb-2">Upload Images</label>
                  
                  {/* Drag and Drop Area */}
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`relative border-2 border-dashed rounded-lg p-6 transition-all ${
                      isDragging
                        ? 'border-cyan-400 bg-cyan-50'
                        : 'border-slate-300 bg-slate-50 hover:border-slate-400'
                    }`}
                  >
                    <input
                      type="file"
                      id="file-upload"
                      accept="image/*"
                      multiple
                      onChange={handleFileSelect}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center gap-2 pointer-events-none">
                      <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                        <Upload className="w-5 h-5 text-slate-600" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-slate-900">
                          {isDragging ? 'Drop images here' : 'Drag & drop images'}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">or click to browse</p>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-xs text-slate-500">Supports: PNG, JPG, GIF</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Link Input */}
              {showLinkInput && (
                <div className="mb-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <label className="block text-xs font-semibold text-slate-900 mb-2">Link Details</label>
                  <div className="space-y-2">
                    <input
                      type="text"
                      className="w-full px-3 py-1.5 text-xs text-slate-700 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                      value={linkTitle}
                      onChange={(e) => setLinkTitle(e.target.value)}
                      placeholder="Link title (e.g., Grafana Dashboard)"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="flex-1 px-3 py-1.5 text-xs text-slate-700 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        placeholder="https://example.com"
                      />
                      <button
                        onClick={() => {
                          if (linkUrl.trim() && linkTitle.trim()) {
                            setAttachedLinks([...attachedLinks, { url: linkUrl, title: linkTitle }]);
                            setLinkUrl('');
                            setLinkTitle('');
                            setShowLinkInput(false);
                          }
                        }}
                        className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 rounded-lg border border-slate-300 transition-all"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Display Attached Images */}
              {attachedImages.length > 0 && (
                <div className="mb-3">
                  <label className="block text-xs font-semibold text-slate-900 mb-2">Attached Images ({attachedImages.length})</label>
                  <div className="grid grid-cols-2 gap-2">
                    {attachedImages.map((img, idx) => (
                      <div key={idx} className="relative group">
                        <div className="aspect-video bg-slate-100 rounded-lg border border-slate-200 overflow-hidden">
                          <img 
                            src={img.preview} 
                            alt={img.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="mt-1 px-2">
                          <p className="text-xs font-medium text-slate-900 truncate">{img.name}</p>
                          <p className="text-xs text-slate-500">{img.size}</p>
                        </div>
                        <button
                          onClick={() => setAttachedImages(attachedImages.filter((_, i) => i !== idx))}
                          className="absolute top-1 right-1 w-6 h-6 bg-slate-900/70 hover:bg-slate-900 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3.5 h-3.5 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Display Attached Links */}
              {attachedLinks.length > 0 && (
                <div className="mb-3">
                  <label className="block text-xs font-semibold text-slate-900 mb-2">Attached Links</label>
                  <div className="space-y-2">
                    {attachedLinks.map((link, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-200">
                        <Link2 className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold text-slate-900 truncate">{link.title}</div>
                          <div className="text-xs text-slate-500 truncate">{link.url}</div>
                        </div>
                        <button
                          onClick={() => setAttachedLinks(attachedLinks.filter((_, i) => i !== idx))}
                          className="w-5 h-5 flex items-center justify-center rounded hover:bg-slate-200 transition-colors"
                        >
                          <X className="w-3 h-3 text-slate-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 rounded-lg p-3 border border-slate-200">
                <Clock className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                <span>Your update will appear in the incident timeline with the current timestamp.</span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-2 p-5 border-t border-slate-200 bg-slate-50/50 rounded-b-xl">
              <button
                onClick={() => {
                  setShowAddUpdate(false);
                  setNewUpdateText('');
                }}
                className="px-4 py-2 text-sm font-medium text-slate-600 bg-white hover:bg-slate-100 rounded-lg border border-slate-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePostUpdate}
                disabled={!newUpdateText.trim()}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-3.5 h-3.5" />
                Post Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Summary Section */}
      <div className="mb-4">
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <button 
            onClick={() => setAiSummaryExpanded(!aiSummaryExpanded)}
            className="w-full flex items-start gap-3 mb-4 pb-3 border-b border-slate-200"
          >
            <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center border border-slate-300 flex-shrink-0">
              <IntuitSparkleIcon size={14} />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-sm font-semibold text-slate-900">AI-Generated Summary</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <p className="text-xs text-slate-600">Live analysis • Updated in real-time</p>
              </div>
            </div>
            <div className="flex-shrink-0 mt-1">
              {aiSummaryExpanded ? (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-slate-400" />
              )}
            </div>
          </button>
          
          {aiSummaryExpanded && (
            <div className="space-y-3.5">
              <div className="bg-white rounded-lg p-3 border border-slate-200/80">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-cyan-600" />
                  <h4 className="text-xs font-semibold text-slate-900">What Happened</h4>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  At <span className="font-semibold text-slate-900">14:23 UTC</span>, a critical incident was detected due to Redis connection pool exhaustion in the Cache Layer, causing error rates to spike to <span className="font-semibold text-red-600">2.34%</span>. This occurred approximately 5 minutes after deployment <span className="font-semibold text-slate-900">v2.4.0</span> at 14:18 UTC, which included cache configuration changes.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-3 border border-slate-200/80">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Brain className="w-3.5 h-3.5 text-purple-600" />
                  <h4 className="text-xs font-semibold text-slate-900">Root Cause Analysis</h4>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  AI identified that the deployment modified connection pool settings from <span className="font-semibold text-slate-900">1,500</span> to <span className="font-semibold text-slate-900">1,000</span> connections, creating a bottleneck. The pool reached <span className="font-semibold text-red-600">100% capacity</span>, correlating directly with timeout errors across <span className="font-semibold text-slate-900">7 affected services</span> and <span className="font-semibold text-slate-900">12 dependencies</span>.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-3 border border-slate-200/80">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
                  <h4 className="text-xs font-semibold text-slate-900">Investigation Progress</h4>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed mb-2.5">
                  AI agents have processed <span className="font-semibold text-slate-900">2.4M log entries</span>, analyzed <span className="font-semibold text-slate-900">47 metrics</span>, mapped service dependencies, and identified the root cause with <span className="font-semibold text-emerald-600">94% confidence</span>. Currently comparing this incident with 2 similar historical cases (INC1765432, INC1723891) to recommend proven remediation strategies.
                </p>
                
                <div className="flex items-center gap-4 pt-2 border-t border-slate-200/50">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm"></div>
                    <span className="text-xs font-medium text-slate-700">8 completed</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-sm"></div>
                    <span className="text-xs font-medium text-slate-700">1 in progress</span>
                  </div>
                  <div className="ml-auto">
                    <div className="flex items-center gap-1">
                      <div className="h-1 w-16 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full w-[89%] bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"></div>
                      </div>
                      <span className="text-xs font-semibold text-slate-700">89%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {!aiSummaryExpanded && (
            <div className="pt-1">
              <p className="text-xs text-slate-700 leading-relaxed">
                Redis connection pool exhaustion detected at <span className="font-semibold text-slate-900">14:23 UTC</span> after deployment v2.4.0. Pool settings reduced from 1,500 to 1,000 connections, reaching <span className="font-semibold text-red-600">100% capacity</span>. Root cause identified with <span className="font-semibold text-emerald-600">94% confidence</span>.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Filter Buttons - Sticky */}
      <div className="sticky top-[69px] bg-white pb-3 mb-3 border-b border-slate-200 z-10">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
          <div className="flex gap-1">
            <button
              onClick={() => setFilterType('all')}
              className={`px-2.5 py-0.5 text-xs font-medium rounded-full transition-all ${
                filterType === 'all'
                  ? 'bg-slate-100 text-slate-700 border border-slate-300'
                  : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              All Updates
            </button>
            <button
              onClick={() => setFilterType('timeline')}
              className={`px-2.5 py-0.5 text-xs font-medium rounded-full transition-all ${
                filterType === 'timeline'
                  ? 'bg-slate-100 text-slate-700 border border-slate-300'
                  : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              Events
            </button>
            <button
              onClick={() => setFilterType('agent')}
              className={`px-2.5 py-0.5 text-xs font-medium rounded-full transition-all ${
                filterType === 'agent'
                  ? 'bg-slate-100 text-slate-700 border border-slate-300'
                  : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              AI Activity
            </button>
          </div>
        </div>
      </div>

      {/* Unified Timeline */}
      <div className="space-y-2 relative">
        {/* Timeline connector line */}
        <div className="absolute left-[13px] top-0 bottom-0 w-px bg-slate-200"></div>
        
        {filteredEvents.map((event) => {
          if (event.type === 'timeline') {
            return (
              <div key={event.id} className="relative flex items-start gap-3">
                {/* Icon Badge - matching AI Activity style */}
                <div className={`w-5 h-5 rounded-lg flex items-center justify-center border flex-shrink-0 relative z-10 ml-1 ${
                  event.eventType === 'critical'
                    ? 'bg-red-50 border-red-200'
                    : event.eventType === 'warning'
                    ? 'bg-amber-50 border-amber-200'
                    : event.eventType === 'success'
                    ? 'bg-green-50 border-green-200'
                    : 'bg-blue-50 border-blue-200'
                }`}>
                  {event.icon && <event.icon className={`w-3 h-3 ${
                    event.eventType === 'critical'
                      ? 'text-red-600'
                      : event.eventType === 'warning'
                      ? 'text-amber-600'
                      : event.eventType === 'success'
                      ? 'text-green-600'
                      : 'text-blue-600'
                  }`} />}
                </div>
                
                {/* Content - Card Style */}
                <div className="flex-1 min-w-0 pb-2">
                  <button
                    onClick={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}
                    className={`w-full flex items-start gap-2.5 p-3 transition-all text-left bg-white hover:bg-slate-50 border border-slate-200 ${expandedEvent === event.id ? 'rounded-t-lg border-b-0' : 'rounded-lg'}`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-slate-500">{event.time} UTC</span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full capitalize border ${
                          event.eventType === 'critical'
                            ? 'bg-red-50 text-red-700 border-red-200'
                            : event.eventType === 'warning'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : event.eventType === 'success'
                            ? 'bg-green-50 text-green-700 border-green-200'
                            : 'bg-blue-50 text-blue-700 border-blue-200'
                        }`}>{event.eventType}</span>
                      </div>
                      
                      <h4 className="text-sm font-semibold text-slate-900 mb-1">{event.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-light">{event.description}</p>
                    </div>

                    {/* Expand Icon */}
                    {event.details && (
                      <div className="flex-shrink-0 mt-1">
                        {expandedEvent === event.id ? (
                          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                        )}
                      </div>
                    )}
                  </button>

                  {/* Expanded Details */}
                  {expandedEvent === event.id && event.details && (
                    <div className="p-4 bg-white rounded-b-lg border-t-0 border border-slate-200">
                      <div className="text-xs text-slate-700">{event.details}</div>
                    </div>
                  )}
                </div>
              </div>
            );
          } else if (event.type === 'agent') {
            // Agent activity
            return (
              <div key={event.id} className="relative flex items-start gap-3">
                {/* AI Icon Badge - Smaller with white background */}
                <div className="w-5 h-5 rounded-lg bg-white flex items-center justify-center border border-slate-200 flex-shrink-0 relative z-10 ml-1">
                  <IntuitSparkleIcon size={12} />
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0 pb-2">
                  <button
                    onClick={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}
                    className={`w-full flex items-start gap-2.5 p-3 transition-all text-left rounded-lg ${expandedEvent === event.id ? 'bg-white border border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.15)] rounded-t-lg' : 'bg-white border border-slate-200 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]'}`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-slate-500">{event.time} UTC</span>
                        <span className="text-xs text-slate-400">•</span>
                        {event.status && getStatusBadge(event.status)}
                      </div>
                      <h4 className="text-sm font-semibold text-slate-900 mb-1">{event.action}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed mb-1.5 font-light">{event.description}</p>
                      
                      {event.duration && event.status === 'completed' && (
                        <span className="text-xs text-slate-500">Completed in {event.duration}</span>
                      )}
                      
                      {event.confidence && event.status === 'in-progress' && (
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <div className="flex-1 h-1 bg-slate-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full transition-all bg-gradient-to-r from-cyan-500 to-blue-600"
                              style={{ width: `${event.confidence}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium text-slate-600">{event.confidence}%</span>
                        </div>
                      )}
                    </div>

                    {/* Expand Icon */}
                    {event.expandedDetails && (
                      <div className="flex-shrink-0 mt-1">
                        {expandedEvent === event.id ? (
                          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                        )}
                      </div>
                    )}
                  </button>

                  {/* Expanded Details */}
                  {expandedEvent === event.id && event.expandedDetails && (
                    <div className="p-4 bg-white rounded-b-lg border-t-0 border border-purple-200/50">
                      {event.expandedDetails.findings && (
                        <div className="mb-4">
                          <div className="text-xs font-semibold text-slate-900 mb-2">Key Findings</div>
                          <ul className="space-y-1">
                            {event.expandedDetails.findings.map((finding, idx) => (
                              <li key={idx} className="text-xs text-slate-700 flex items-start gap-1.5">
                                <span className="text-purple-500 mt-0.5">•</span>
                                <span>{finding}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {event.expandedDetails.dataPoints && (
                        <div className="mb-3">
                          <div className="text-xs font-semibold text-slate-900 mb-1.5">Analysis Details</div>
                          <div className="grid grid-cols-2 gap-1.5">
                            {event.expandedDetails.dataPoints.map((point, idx) => (
                              <div key={idx} className="bg-slate-50 rounded p-1.5">
                                <div className="text-xs text-slate-500">{point.label}</div>
                                <div className="text-xs font-semibold text-slate-900">{point.value}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {event.expandedDetails.artifacts && (
                        <div>
                          <div className="text-xs font-semibold text-slate-900 mb-1.5">Related Artifacts</div>
                          <div className="flex flex-wrap gap-1.5">
                            {event.expandedDetails.artifacts.map((artifact, idx) => (
                              <button
                                key={idx}
                                className="flex items-center gap-1.5 px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded border border-slate-200 transition-colors"
                              >
                                <FileText className="w-3 h-3 text-slate-600" />
                                <span className="text-xs text-slate-700">{artifact.name}</span>
                                <span className="text-xs text-slate-500">({artifact.type})</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          } else {
            // User update
            return (
              <div key={event.id} className="relative flex items-start gap-3">
                {/* User Icon Badge */}
                <div className="w-5 h-5 rounded-lg bg-white flex items-center justify-center border border-slate-200 flex-shrink-0 relative z-10 ml-1">
                  <User className="w-3 h-3 text-slate-600" />
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0 pb-2">
                  <button
                    onClick={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}
                    className={`w-full flex items-start gap-2.5 p-3 transition-all text-left rounded-lg ${expandedEvent === event.id ? 'bg-white border border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.15)] rounded-t-lg' : 'bg-white border border-slate-200 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]'}`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-slate-500">{event.time} UTC</span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full capitalize border bg-slate-50 text-slate-700 border-slate-200">User</span>
                      </div>
                      <h4 className="text-sm font-semibold text-slate-900 mb-1">{event.author}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed mb-1.5 font-light">{event.description}</p>
                    </div>

                    {/* Expand Icon */}
                    {event.expandedDetails && (
                      <div className="flex-shrink-0 mt-1">
                        {expandedEvent === event.id ? (
                          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                        )}
                      </div>
                    )}
                  </button>

                  {/* Expanded Details */}
                  {expandedEvent === event.id && event.expandedDetails && (
                    <div className="p-4 bg-white rounded-b-lg border-t-0 border border-purple-200/50">
                      {event.expandedDetails.findings && (
                        <div className="mb-4">
                          <div className="text-xs font-semibold text-slate-900 mb-2">Key Findings</div>
                          <ul className="space-y-1">
                            {event.expandedDetails.findings.map((finding, idx) => (
                              <li key={idx} className="text-xs text-slate-700 flex items-start gap-1.5">
                                <span className="text-purple-500 mt-0.5">•</span>
                                <span>{finding}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {event.expandedDetails.dataPoints && (
                        <div className="mb-3">
                          <div className="text-xs font-semibold text-slate-900 mb-1.5">Analysis Details</div>
                          <div className="grid grid-cols-2 gap-1.5">
                            {event.expandedDetails.dataPoints.map((point, idx) => (
                              <div key={idx} className="bg-slate-50 rounded p-1.5">
                                <div className="text-xs text-slate-500">{point.label}</div>
                                <div className="text-xs font-semibold text-slate-900">{point.value}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {event.expandedDetails.artifacts && (
                        <div>
                          <div className="text-xs font-semibold text-slate-900 mb-1.5">Related Artifacts</div>
                          <div className="flex flex-wrap gap-1.5">
                            {event.expandedDetails.artifacts.map((artifact, idx) => (
                              <button
                                key={idx}
                                className="flex items-center gap-1.5 px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded border border-slate-200 transition-colors"
                              >
                                <FileText className="w-3 h-3 text-slate-600" />
                                <span className="text-xs text-slate-700">{artifact.name}</span>
                                <span className="text-xs text-slate-500">({artifact.type})</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}