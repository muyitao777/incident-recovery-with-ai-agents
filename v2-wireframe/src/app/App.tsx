import { Bell, ChevronRight, Clock, Users, Activity, ExternalLink, Sparkles, X, Brain, Search, Lightbulb, CheckCircle, Database, FileText, GitBranch, AlertTriangle, Zap } from 'lucide-react';
import { useState } from 'react';
import { InvestigationCanvasExperience } from '@/app/components/InvestigationCanvasExperience';

interface NodeData {
  id: string;
  name: string;
  status: 'healthy' | 'warning' | 'critical' | 'na';
  requests: string;
  latency: string;
  errorRate: string;
  healthPercent: string;
  dependencies: string[];
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'investigate' | 'summary' | 'canvas'>('overview');
  const [activeMetricTab, setActiveMetricTab] = useState<'metrics' | 'trace' | 'logs'>('metrics');
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const nodeData: Record<string, NodeData> = {
    api: {
      id: 'api',
      name: 'API Gateway',
      status: 'healthy',
      requests: '1.2M/hr',
      latency: '45ms',
      errorRate: '0.02%',
      healthPercent: '100%',
      dependencies: ['auth', 'db', 'cache']
    },
    auth: {
      id: 'auth',
      name: 'Auth Service',
      status: 'warning',
      requests: '850K/hr',
      latency: '23ms',
      errorRate: '0.01%',
      healthPercent: '92.59%',
      dependencies: ['users']
    },
    db: {
      id: 'db',
      name: 'Database',
      status: 'healthy',
      requests: '2.3M/hr',
      latency: '12ms',
      errorRate: '0.00%',
      healthPercent: '100%',
      dependencies: ['queue']
    },
    cache: {
      id: 'cache',
      name: 'Cache Layer',
      status: 'critical',
      requests: '3.1M/hr',
      latency: '156ms',
      errorRate: '2.34%',
      healthPercent: '100%',
      dependencies: ['redis']
    },
    users: {
      id: 'users',
      name: 'User Service',
      status: 'healthy',
      requests: '680K/hr',
      latency: '34ms',
      errorRate: '0.01%',
      healthPercent: '100%',
      dependencies: []
    },
    queue: {
      id: 'queue',
      name: 'Message Queue',
      status: 'warning',
      requests: '1.8M/hr',
      latency: '89ms',
      errorRate: '0.45%',
      healthPercent: '92.59%',
      dependencies: []
    },
    redis: {
      id: 'redis',
      name: 'Redis Cache',
      status: 'na',
      requests: '4.2M/hr',
      latency: '178ms',
      errorRate: '3.12%',
      healthPercent: 'N/A',
      dependencies: []
    }
  };

  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(nodeData[nodeId]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return '#10b981';
      case 'warning': return '#f59e0b';
      case 'critical': return '#ef4444';
      case 'na': return '#94a3b8';
      default: return '#94a3b8';
    }
  };

  const getHealthBadgeStyle = (status: string) => {
    switch (status) {
      case 'healthy':
        return { bg: '#e2e8f0', text: '#64748b' };
      case 'warning':
        return { bg: '#fef3c7', text: '#92400e' };
      case 'na':
        return { bg: '#cbd5e1', text: '#64748b' };
      default:
        return { bg: '#e2e8f0', text: '#64748b' };
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 flex flex-col gap-4 relative overflow-hidden">
      {/* Animated Background Shapes */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-cyan-100/30 to-blue-200/30 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-blue-100/30 to-cyan-100/30 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '1s' }}></div>
      
      {/* Header */}
      <div className="bg-white p-3 border-b border-slate-200 fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div>
                <div className="text-blue-600 font-bold text-lg tracking-tight">INTUIT</div>
                <div className="text-xs text-slate-500 tracking-wide">DEVELOPMENT PORTAL</div>
              </div>
            </div>
            

            
            {/* Navigation Links */}
            <div className="flex items-center gap-6 ml-2">
              <button className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Create</button>
              <button className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Manage</button>
              <button className="text-sm text-blue-600 hover:text-blue-700 transition-colors border-b-2 border-blue-600 pb-1">Monitor</button>
              <button className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Discover</button>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search" 
                className="w-64 h-8 pl-9 pr-3 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            {/* Intuit Assist Button */}
            <button className="flex items-center gap-2 px-3 h-8 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Intuit Assist</span>
            </button>
            
            {/* Icon Buttons */}
            <button className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors">
              <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
            
            <button className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors">
              <Bell className="w-4 h-4 text-slate-500" />
            </button>
            
            <button className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors">
              <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout with Left Nav and Content */}
      <div className="flex-1 flex gap-4 pt-16">
        {/* Left Navigation */}
        <div className="w-16 bg-white p-3 flex flex-col border-r border-slate-200 fixed left-0 top-16 bottom-0 z-40">
          {/* Back Arrow */}
          <button className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 rounded transition-colors cursor-pointer mb-4">
            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          
          {/* Analytics/Chart Icon - Active */}
          <button className="w-10 h-10 flex items-center justify-center bg-slate-100 rounded transition-colors cursor-pointer mb-3">
            <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </button>
          
          {/* Settings Icon */}
          <button className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 rounded transition-colors cursor-pointer mb-3">
            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          
          {/* Sun/Theme Icon */}
          <button className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 rounded transition-colors cursor-pointer mb-3">
            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </button>
          
          {/* Spacer */}
          <div className="flex-1"></div>
          
          {/* Shield Icon at Bottom */}
          <button className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 rounded transition-colors cursor-pointer">
            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </button>
        </div>

        {/* Main Content */}
      <div className="bg-white rounded-xl p-4 flex-1 relative z-10 ml-20">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm font-normal mb-4">
              <span className="text-slate-600">INC1789966</span>
              <ChevronRight className="w-4 h-4 text-slate-600" />
              <span className="text-slate-600">
                {activeTab === 'overview' ? 'Overview' : activeTab === 'investigate' ? 'Recovery Deep Dive' : activeTab === 'summary' ? 'Automated Recovery' : 'Investigation Canvas'}
              </span>
            </div>

            {/* Incident Detail */}
            <div className="bg-white border border-slate-200 rounded-lg p-2 mb-4 shadow-xs">
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-start gap-4">
                  <div className="bg-red-50 text-red-600 font-extrabold text-base rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 border border-red-200">
                    P1
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="text-base font-medium text-slate-900">INC1789966</div>
                      <div className="inline-block bg-red-50 text-red-700 px-1.5 py-0.5 rounded border border-red-200" style={{ fontSize: '10px' }}>
                        ONGOING
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">Asset:</span>
                        <span className="text-xs text-slate-700">IdentityGraphQLOrch</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">Environment:</span>
                        <span className="text-xs text-slate-700">Production</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 flex-shrink-0">
                    <button className="flex items-center gap-1 px-3 py-1.5 text-xs text-slate-600 border border-slate-300 rounded hover:bg-slate-50 transition-colors">
                      SNOW
                      <ExternalLink className="w-3 h-3" />
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 text-xs text-slate-600 border border-slate-300 rounded hover:bg-slate-50 transition-colors">
                      SLACK
                      <ExternalLink className="w-3 h-3" />
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 text-xs text-slate-600 border border-slate-300 rounded hover:bg-slate-50 transition-colors">
                      ZOOM
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 mb-4 border-b border-slate-200">
              {([
                { key: 'overview', label: 'Overview' },
                { key: 'summary', label: 'Automated Recovery' },
                { key: 'canvas', label: 'Investigation Canvas' },
                { key: 'investigate', label: 'Recovery Deep Dive' },
              ] as const).map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`pb-2 border-b-2 relative text-sm transition-colors ${
                    activeTab === tab.key
                      ? 'border-blue-600 text-slate-900'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.key && <div className="absolute inset-x-0 -bottom-px h-0.5 bg-blue-600"></div>}
                </button>
              ))}
            </div>

        {/* Tab Content */}
        {activeTab === 'summary' ? (
              /* Summary Content */
              <div className="grid grid-cols-3 gap-4">
              {/* Left Column - 2/3 width */}
              <div className="col-span-2 space-y-4">
                {/* Likely Root Cause */}
                <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-lg p-4 shadow-xs">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                    <div className="text-xs uppercase tracking-wider text-slate-500">Likely root cause</div>
                    <div className="ml-auto text-xs text-slate-400">AI Analysis</div>
                  </div>
                  
                  {/* Root Cause Information */}
                  <div className="space-y-4">
                    {/* Main Cause Card */}
                    <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-lg p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-100 flex items-center justify-center flex-shrink-0">
                          <Sparkles className="w-4 h-4 text-cyan-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-24 h-3 bg-slate-300 rounded-full"></div>
                            <span className="text-xs px-2 py-0.5 bg-gradient-to-r from-cyan-50 to-blue-50 text-cyan-700 border border-cyan-100 rounded">Confidence: High</span>
                          </div>
                          <div className="space-y-1.5">
                            <div className="w-full h-2 bg-slate-300 rounded-full"></div>
                            <div className="w-5/6 h-2 bg-slate-300 rounded-full"></div>
                            <div className="w-3/4 h-2 bg-slate-300 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Evidence Indicators */}
                      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-200">
                        <Database className="w-3 h-3 text-cyan-500" />
                        <div className="w-16 h-2 bg-slate-300 rounded-full"></div>
                        <Activity className="w-3 h-3 text-cyan-500 ml-2" />
                        <div className="w-20 h-2 bg-slate-300 rounded-full"></div>
                        <FileText className="w-3 h-3 text-cyan-500 ml-2" />
                        <div className="w-12 h-2 bg-slate-200 rounded-full"></div>
                      </div>
                    </div>

                    {/* Contributing Factors */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-white border border-slate-200 rounded p-2">
                        <div className="flex items-center gap-1 mb-2">
                          <div className="w-1 h-1 rounded-full bg-cyan-400"></div>
                          <div className="w-3 h-3 rounded bg-slate-300"></div>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 rounded-full mb-1"></div>
                        <div className="w-2/3 h-1.5 bg-slate-200 rounded-full"></div>
                      </div>
                      <div className="bg-white border border-slate-200 rounded p-2">
                        <div className="flex items-center gap-1 mb-2">
                          <div className="w-1 h-1 rounded-full bg-cyan-400"></div>
                          <div className="w-3 h-3 rounded bg-slate-300"></div>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 rounded-full mb-1"></div>
                        <div className="w-3/4 h-1.5 bg-slate-200 rounded-full"></div>
                      </div>
                      <div className="bg-white border border-slate-200 rounded p-2">
                        <div className="flex items-center gap-1 mb-2">
                          <div className="w-1 h-1 rounded-full bg-cyan-400"></div>
                          <div className="w-3 h-3 rounded bg-slate-300"></div>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 rounded-full mb-1"></div>
                        <div className="w-1/2 h-1.5 bg-slate-200 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Investigation Suggestions */}
                <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-lg p-4 shadow-xs">
                  <div className="text-xs uppercase tracking-wider text-slate-500 mb-4">AI Investigation Suggestions</div>
                  
                  <div className="space-y-3">
                    {[
                      { priority: 'HIGH', bars: [100, 85, 70] },
                      { priority: 'MEDIUM', bars: [90, 75] },
                      { priority: 'MEDIUM', bars: [95, 80, 60] }
                    ].map((suggestion, idx) => (
                      <div key={idx} className="bg-white border border-slate-200 rounded-lg p-3">
                        {/* Priority Badge */}
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`text-xs px-2 py-0.5 rounded border font-semibold ${
                            suggestion.priority === 'HIGH' 
                              ? 'bg-red-50 text-red-700 border-red-200' 
                              : suggestion.priority === 'MEDIUM'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-slate-50 text-slate-600 border-slate-200'
                          }`}>
                            {suggestion.priority}
                          </div>
                          <div className="flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-blue-500" />
                            <span className="text-xs text-slate-400">AI Generated</span>
                          </div>
                        </div>
                        
                        {/* Wireframe Content */}
                        <div className="space-y-1.5 mb-3">
                          {suggestion.bars.map((width, barIdx) => (
                            <div 
                              key={barIdx} 
                              className="h-2 bg-slate-200 rounded-full" 
                              style={{ width: `${width}%` }}
                            ></div>
                          ))}
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-3 py-1.5 rounded-md text-xs transition-all font-semibold shadow-xs">
                            Apply Fix
                          </button>
                          <button className="bg-white hover:bg-slate-50 text-slate-600 px-3 py-1.5 rounded-md text-xs transition-colors border border-slate-300 font-semibold">
                            Dismiss
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* View More */}
                  <div className="text-center mt-3">
                    <button className="text-sm text-blue-600 hover:text-blue-700">View all suggestions (12)</button>
                  </div>
                </div>

                {/* Quick Remediation */}
                <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-lg p-4 shadow-xs">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-xs uppercase tracking-wider text-slate-500">Quick Remediation</div>
                    <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-3 py-1 rounded text-xs transition-all shadow-xs">
                      Rollback
                    </button>
                  </div>
                  
                  {/* Deployment Timeline */}
                  <div className="bg-white border border-slate-200 rounded-lg p-4 mb-4">
                    <div className="text-xs text-slate-600 font-semibold mb-3">Deployment Timeline</div>
                    
                    {/* Timeline visualization */}
                    <div className="space-y-3 mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-14 h-2 bg-slate-200 rounded-full"></div>
                        <div className="flex-1 h-10 bg-slate-100 rounded flex items-center px-2 gap-2">
                          <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                          <div className="flex-1 space-y-1">
                            <div className="w-12 h-2 bg-slate-300 rounded-full"></div>
                            <div className="w-20 h-1.5 bg-slate-200 rounded-full"></div>
                          </div>
                        </div>
                        <div className="w-16 h-2 bg-slate-200 rounded-full"></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-14 h-2 bg-slate-200 rounded-full"></div>
                        <div className="flex-1 h-10 bg-red-50 rounded flex items-center px-2 gap-2 border border-red-200">
                          <div className="w-3 h-3 rounded-full bg-red-400"></div>
                          <div className="flex-1 space-y-1">
                            <div className="w-12 h-2 bg-slate-300 rounded-full"></div>
                            <div className="w-20 h-1.5 bg-slate-200 rounded-full"></div>
                          </div>
                        </div>
                        <div className="w-16 h-2 bg-slate-200 rounded-full"></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-14 h-2 bg-slate-200 rounded-full"></div>
                        <div className="flex-1 h-10 bg-slate-100 rounded flex items-center px-2 gap-2">
                          <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                          <div className="flex-1 space-y-1">
                            <div className="w-12 h-2 bg-slate-300 rounded-full"></div>
                            <div className="w-20 h-1.5 bg-slate-200 rounded-full"></div>
                          </div>
                        </div>
                        <div className="w-16 h-2 bg-slate-200 rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-3 text-xs">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                        <div className="w-12 h-2 bg-slate-200 rounded-full"></div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-red-400"></div>
                        <div className="w-12 h-2 bg-slate-200 rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Changes */}
                  <div>
                    <div className="text-xs text-slate-600 font-semibold mb-3">Recent Changes</div>
                    <div className="space-y-3">
                      {[
                        { status: 'failed' },
                        { status: 'success' },
                        { status: 'success' }
                      ].map((change, idx) => (
                        <div key={idx} className="bg-white border border-slate-200 rounded-lg p-3 hover:shadow-sm transition-shadow">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center gap-2">
                                <div className="w-16 h-2.5 bg-slate-300 rounded-full"></div>
                                <div className={`w-14 h-4 rounded ${
                                  change.status === 'failed' 
                                    ? 'bg-red-200 border border-red-300' 
                                    : 'bg-green-200 border border-green-300'
                                }`}></div>
                              </div>
                              <div className="w-24 h-2 bg-slate-200 rounded-full"></div>
                              <div className="w-14 h-2 bg-slate-100 rounded-full"></div>
                            </div>
                            <button className={`px-3 py-1 rounded text-xs transition-all ${
                              change.status === 'failed'
                                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-xs'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                            }`}>
                              {change.status === 'failed' ? 'Rollback' : 'Revert'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Metrics Insights */}
                <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-lg p-4 shadow-xs">
                  <div className="text-xs uppercase tracking-wider text-slate-500 mb-3">Metrics insights</div>
                  <div className="space-y-3">
                    {/* Insight 1 - Error Rate Spike */}
                    <div className="bg-white border border-slate-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                          <span className="text-xs text-slate-600 font-semibold">Error Rate</span>
                        </div>
                        <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-500 rounded">Critical</span>
                      </div>
                      <div className="flex items-end gap-1 h-12 mb-2">
                        <div className="flex-1 bg-slate-100 rounded-t" style={{ height: '30%' }}></div>
                        <div className="flex-1 bg-slate-100 rounded-t" style={{ height: '35%' }}></div>
                        <div className="flex-1 bg-slate-100 rounded-t" style={{ height: '40%' }}></div>
                        <div className="flex-1 bg-slate-200 rounded-t" style={{ height: '85%' }}></div>
                        <div className="flex-1 bg-slate-300 rounded-t" style={{ height: '95%' }}></div>
                        <div className="flex-1 bg-slate-300 rounded-t" style={{ height: '100%' }}></div>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <div className="w-16 h-2 bg-slate-100 rounded-full"></div>
                        <div className="w-12 h-2 bg-slate-200 rounded-full"></div>
                      </div>
                    </div>

                    {/* Insight 2 - Response Time */}
                    <div className="bg-white border border-slate-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                          <span className="text-xs text-slate-600 font-semibold">Response Time</span>
                        </div>
                        <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-500 rounded">Warning</span>
                      </div>
                      <div className="flex items-end gap-1 h-12 mb-2">
                        <div className="flex-1 bg-slate-100 rounded-t" style={{ height: '40%' }}></div>
                        <div className="flex-1 bg-slate-100 rounded-t" style={{ height: '45%' }}></div>
                        <div className="flex-1 bg-slate-200 rounded-t" style={{ height: '65%' }}></div>
                        <div className="flex-1 bg-slate-200 rounded-t" style={{ height: '75%' }}></div>
                        <div className="flex-1 bg-slate-200 rounded-t" style={{ height: '70%' }}></div>
                        <div className="flex-1 bg-slate-100 rounded-t" style={{ height: '50%' }}></div>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <div className="w-16 h-2 bg-slate-100 rounded-full"></div>
                        <div className="w-12 h-2 bg-slate-200 rounded-full"></div>
                      </div>
                    </div>

                    {/* Insight 3 - Traffic Volume */}
                    <div className="bg-white border border-slate-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                          <span className="text-xs text-slate-600 font-semibold">Traffic Volume</span>
                        </div>
                        <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-500 rounded">Normal</span>
                      </div>
                      <div className="flex items-end gap-1 h-12 mb-2">
                        <div className="flex-1 bg-slate-100 rounded-t" style={{ height: '60%' }}></div>
                        <div className="flex-1 bg-slate-100 rounded-t" style={{ height: '55%' }}></div>
                        <div className="flex-1 bg-slate-100 rounded-t" style={{ height: '65%' }}></div>
                        <div className="flex-1 bg-slate-100 rounded-t" style={{ height: '58%' }}></div>
                        <div className="flex-1 bg-slate-100 rounded-t" style={{ height: '62%' }}></div>
                        <div className="flex-1 bg-slate-100 rounded-t" style={{ height: '60%' }}></div>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <div className="w-16 h-2 bg-slate-100 rounded-full"></div>
                        <div className="w-12 h-2 bg-slate-200 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - 1/3 width */}
              <div className="col-span-1">
                <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-lg p-4 shadow-xs">
                  <div className="text-xs uppercase tracking-wider text-slate-500 mb-4">Analysis timeline</div>
                  
                  {/* AI Agent Thinking Timeline */}
                  <div className="space-y-3 relative">
                    {/* Timeline connector line */}
                    <div className="absolute left-4 top-6 bottom-6 w-px bg-slate-200"></div>
                    
                    {/* Step 1: Initial Detection */}
                    <div className="relative">
                      <div className="flex items-start gap-3">
                        <div className="relative z-10 w-8 h-8 rounded-full bg-red-100 border-2 border-red-300 flex items-center justify-center flex-shrink-0">
                          <AlertTriangle className="w-4 h-4 text-red-600" />
                        </div>
                        <div className="flex-1 bg-white border border-slate-200 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-3 h-3 text-blue-500" />
                            <span className="text-xs text-slate-400">AI Agent</span>
                          </div>
                          <div className="space-y-1.5">
                            <div className="w-full h-2 bg-slate-200 rounded-full"></div>
                            <div className="w-2/3 h-2 bg-slate-200 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                      <div className="ml-11 mt-1 text-xs text-slate-400">Just now</div>
                    </div>
                    
                    {/* Step 2: Analyzing Metrics */}
                    <div className="relative">
                      <div className="flex items-start gap-3">
                        <div className="relative z-10 w-8 h-8 rounded-full bg-blue-100 border-2 border-blue-300 flex items-center justify-center flex-shrink-0">
                          <Brain className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1 bg-white border border-slate-200 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-3 h-3 text-blue-500" />
                            <span className="text-xs text-slate-400">AI Agent</span>
                          </div>
                          <div className="space-y-1.5">
                            <div className="w-full h-2 bg-slate-200 rounded-full"></div>
                            <div className="w-3/4 h-2 bg-slate-200 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                      <div className="ml-11 mt-1 text-xs text-slate-400">1m ago</div>
                    </div>
                    
                    {/* Step 3: Querying Database */}
                    <div className="relative">
                      <div className="flex items-start gap-3">
                        <div className="relative z-10 w-8 h-8 rounded-full bg-indigo-100 border-2 border-indigo-300 flex items-center justify-center flex-shrink-0">
                          <Database className="w-4 h-4 text-indigo-600" />
                        </div>
                        <div className="flex-1 bg-white border border-slate-200 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-3 h-3 text-blue-500" />
                            <span className="text-xs text-slate-400">AI Agent</span>
                          </div>
                          <div className="space-y-1.5">
                            <div className="w-5/6 h-2 bg-slate-200 rounded-full"></div>
                            <div className="w-full h-2 bg-slate-200 rounded-full"></div>
                            <div className="w-1/2 h-2 bg-slate-200 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                      <div className="ml-11 mt-1 text-xs text-slate-400">3m ago</div>
                    </div>
                    
                    {/* Step 4: Searching Logs */}
                    <div className="relative">
                      <div className="flex items-start gap-3">
                        <div className="relative z-10 w-8 h-8 rounded-full bg-amber-100 border-2 border-amber-300 flex items-center justify-center flex-shrink-0">
                          <Search className="w-4 h-4 text-amber-600" />
                        </div>
                        <div className="flex-1 bg-white border border-slate-200 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-3 h-3 text-blue-500" />
                            <span className="text-xs text-slate-400">AI Agent</span>
                          </div>
                          <div className="space-y-1.5">
                            <div className="w-4/5 h-2 bg-slate-200 rounded-full"></div>
                            <div className="w-full h-2 bg-slate-200 rounded-full"></div>
                            <div className="w-2/3 h-2 bg-slate-200 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                      <div className="ml-11 mt-1 text-xs text-slate-400">5m ago</div>
                    </div>
                    
                    {/* Step 5: Checking Dependencies */}
                    <div className="relative">
                      <div className="flex items-start gap-3">
                        <div className="relative z-10 w-8 h-8 rounded-full bg-violet-100 border-2 border-violet-300 flex items-center justify-center flex-shrink-0">
                          <GitBranch className="w-4 h-4 text-violet-600" />
                        </div>
                        <div className="flex-1 bg-white border border-slate-200 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-3 h-3 text-blue-500" />
                            <span className="text-xs text-slate-400">AI Agent</span>
                          </div>
                          <div className="space-y-1.5">
                            <div className="w-full h-2 bg-slate-200 rounded-full"></div>
                            <div className="w-4/5 h-2 bg-slate-200 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                      <div className="ml-11 mt-1 text-xs text-slate-400">7m ago</div>
                    </div>
                    
                    {/* Step 6: Investigating Patterns */}
                    <div className="relative">
                      <div className="flex items-start gap-3">
                        <div className="relative z-10 w-8 h-8 rounded-full bg-purple-100 border-2 border-purple-300 flex items-center justify-center flex-shrink-0">
                          <Activity className="w-4 h-4 text-purple-600" />
                        </div>
                        <div className="flex-1 bg-white border border-slate-200 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-3 h-3 text-blue-500" />
                            <span className="text-xs text-slate-400">AI Agent</span>
                          </div>
                          <div className="space-y-1.5">
                            <div className="w-full h-2 bg-slate-200 rounded-full"></div>
                            <div className="w-5/6 h-2 bg-slate-200 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                      <div className="ml-11 mt-1 text-xs text-slate-400">9m ago</div>
                    </div>
                    
                    {/* Step 7: Analyzing Changes */}
                    <div className="relative">
                      <div className="flex items-start gap-3">
                        <div className="relative z-10 w-8 h-8 rounded-full bg-cyan-100 border-2 border-cyan-300 flex items-center justify-center flex-shrink-0">
                          <FileText className="w-4 h-4 text-cyan-600" />
                        </div>
                        <div className="flex-1 bg-white border border-slate-200 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-3 h-3 text-blue-500" />
                            <span className="text-xs text-slate-400">AI Agent</span>
                          </div>
                          <div className="space-y-1.5">
                            <div className="w-3/4 h-2 bg-slate-200 rounded-full"></div>
                            <div className="w-full h-2 bg-slate-200 rounded-full"></div>
                            <div className="w-5/6 h-2 bg-slate-200 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                      <div className="ml-11 mt-1 text-xs text-slate-400">11m ago</div>
                    </div>
                    
                    {/* Step 8: Correlating Events */}
                    <div className="relative">
                      <div className="flex items-start gap-3">
                        <div className="relative z-10 w-8 h-8 rounded-full bg-orange-100 border-2 border-orange-300 flex items-center justify-center flex-shrink-0">
                          <Zap className="w-4 h-4 text-orange-600" />
                        </div>
                        <div className="flex-1 bg-white border border-slate-200 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-3 h-3 text-blue-500" />
                            <span className="text-xs text-slate-400">AI Agent</span>
                          </div>
                          <div className="space-y-1.5">
                            <div className="w-full h-2 bg-slate-200 rounded-full"></div>
                            <div className="w-3/5 h-2 bg-slate-200 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                      <div className="ml-11 mt-1 text-xs text-slate-400">13m ago</div>
                    </div>
                    
                    {/* Step 9: Generating Suggestions */}
                    <div className="relative">
                      <div className="flex items-start gap-3">
                        <div className="relative z-10 w-8 h-8 rounded-full bg-emerald-100 border-2 border-emerald-300 flex items-center justify-center flex-shrink-0">
                          <Lightbulb className="w-4 h-4 text-emerald-600" />
                        </div>
                        <div className="flex-1 bg-white border border-slate-200 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-3 h-3 text-blue-500" />
                            <span className="text-xs text-slate-400">AI Agent</span>
                          </div>
                          <div className="space-y-1.5">
                            <div className="w-3/4 h-2 bg-slate-200 rounded-full"></div>
                            <div className="w-full h-2 bg-slate-200 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                      <div className="ml-11 mt-1 text-xs text-slate-400">15m ago</div>
                    </div>
                    
                    {/* Step 10: Analysis Complete */}
                    <div className="relative">
                      <div className="flex items-start gap-3">
                        <div className="relative z-10 w-8 h-8 rounded-full bg-green-100 border-2 border-green-400 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="flex-1 bg-white border border-green-200 rounded-lg p-3 bg-green-50">
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-3 h-3 text-blue-500" />
                            <span className="text-xs text-green-600 font-semibold">Analysis Complete</span>
                          </div>
                          <div className="space-y-1.5">
                            <div className="w-2/3 h-2 bg-green-200 rounded-full"></div>
                            <div className="w-4/5 h-2 bg-green-200 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                      <div className="ml-11 mt-1 text-xs text-slate-400">17m ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            ) : activeTab === 'canvas' ? (
              /* Investigation Canvas Tab */
              <InvestigationCanvasExperience />
            ) : activeTab === 'overview' ? (
          <>
            {/* Impact Section */}
            <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-lg p-4 mb-4 shadow-xs">
              <div className="text-xs uppercase tracking-wider text-slate-500 mb-3">Impact</div>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: 'Severity', value: 'High', color: 'text-red-600' },
                  { label: 'Services', value: '12', color: 'text-blue-600' },
                  { label: 'Duration', value: '45m', color: 'text-amber-600' },
                  { label: 'Users Affected', value: '2.3K', color: 'text-purple-600' }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 rounded-lg p-3 hover:shadow-sm transition-shadow">
                    <div className="text-xs text-slate-500 mb-1">{item.label}</div>
                    <div className={`text-xl ${item.color}`}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-3 gap-4">
              {/* Impacted Services */}
              <div className="col-span-2 bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-lg p-4 shadow-xs">
                <div className="text-xs uppercase tracking-wider text-slate-500 mb-3">Impacted Services</div>
                <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs text-slate-600 font-medium">Service</th>
                        <th className="px-3 py-2 text-left text-xs text-slate-600 font-medium">Status</th>
                        <th className="px-3 py-2 text-left text-xs text-slate-600 font-medium">Impact</th>
                        <th className="px-3 py-2 text-left text-xs text-slate-600 font-medium">Since</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <tr key={num} className="hover:bg-slate-50 transition-colors">
                          <td className="px-3 py-2">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-red-500"></div>
                              <span className="text-sm text-slate-700">Service {num}</span>
                            </div>
                          </td>
                          <td className="px-3 py-2">
                            <div className="w-16 h-2 bg-slate-200 rounded-full"></div>
                          </td>
                          <td className="px-3 py-2">
                            <div className="w-20 h-2 bg-slate-200 rounded-full"></div>
                          </td>
                          <td className="px-3 py-2">
                            <div className="w-12 h-2 bg-slate-200 rounded-full"></div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="text-center mt-3">
                  <button className="text-sm text-blue-600 hover:text-blue-700">View all services</button>
                </div>
              </div>

              {/* Incident Timeline */}
              <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-lg p-4 shadow-xs">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <span className="text-xs uppercase tracking-wider text-slate-500">Incident Timeline</span>
                </div>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((num) => (
                    <div key={num} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        {num !== 4 && <div className="w-px h-6 bg-slate-200"></div>}
                      </div>
                      <div className="flex-1 pb-2">
                        <div className="w-full h-2 bg-slate-200 rounded-full mb-1.5"></div>
                        <div className="w-3/4 h-2 bg-slate-100 rounded-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-3">
                  <button className="text-sm text-blue-600 hover:text-blue-700">View full timeline</button>
                </div>
              </div>

              {/* Involved People */}
              <div className="col-span-2 bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-lg p-4 shadow-xs">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-4 h-4 text-slate-500" />
                  <span className="text-xs uppercase tracking-wider text-slate-500">Involved People</span>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  {[1, 2, 3].map((num) => (
                    <div key={`row1-${num}`} className="bg-white border border-slate-200 rounded-lg p-3 flex items-center gap-2 hover:shadow-sm transition-shadow">
                      <div className="w-10 h-10 bg-slate-300 rounded-full flex items-center justify-center text-white">
                        <Users className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="w-20 h-2.5 bg-slate-300 rounded-full mb-1.5"></div>
                        <div className="w-16 h-2 bg-slate-200 rounded-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[1, 2, 3].map((num) => (
                    <div key={`row2-${num}`} className="bg-white border border-slate-200 rounded-lg p-3 flex items-center gap-2 hover:shadow-sm transition-shadow">
                      <div className="w-10 h-10 bg-slate-300 rounded-full flex items-center justify-center text-white">
                        <Users className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="w-20 h-2.5 bg-slate-300 rounded-full mb-1.5"></div>
                        <div className="w-16 h-2 bg-slate-200 rounded-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-3">
                  <button className="text-sm text-blue-600 hover:text-blue-700">View all team members</button>
                </div>
              </div>

              {/* Status Update */}
              <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-lg p-4 shadow-xs">
                <div className="flex items-center gap-2 mb-3">
                  <Bell className="w-4 h-4 text-slate-500" />
                  <span className="text-xs uppercase tracking-wider text-slate-500">Status Update</span>
                </div>
                <div className="space-y-3">
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="bg-white border border-slate-200 rounded-lg p-3">
                      <div className="w-full h-2 bg-slate-300 rounded-full mb-1.5"></div>
                      <div className="w-4/5 h-2 bg-slate-200 rounded-full mb-1.5"></div>
                      <div className="w-3/5 h-2 bg-slate-100 rounded-full"></div>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-3">
                  <button className="text-sm text-blue-600 hover:text-blue-700">View all updates</button>
                </div>
              </div>
            </div>
          </>
        ) : (
          // Investigate Tab Content
          <div className="grid grid-cols-3 gap-4">
            {/* Left Column - Dependency Graph and Metrics */}
            <div className="col-span-2 space-y-4">
              {/* Dependency Graph */}
              <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-lg p-4 shadow-xs">
                <div className="flex justify-between items-center mb-3">
                  <div className="text-xs uppercase tracking-wider text-slate-500">Dependency Graph</div>
                  <div className="text-xs text-slate-400">Click nodes to see details</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-lg p-6 h-96 flex items-center justify-center relative overflow-hidden">
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                        <circle cx="5" cy="5" r="0.5" fill="#94a3b8" />
                      </pattern>
                      <rect width="100" height="100" fill="url(#grid)" />
                    </svg>
                  </div>
                  
                  {/* Graph visualization */}
                  <svg className="w-full h-full relative z-10" viewBox="0 0 1800 1000">
                    {/* Connection lines - thin gray lines */}
                    <g className={selectedNode ? 'opacity-30' : ''} opacity="0.6">
                      {/* Left side connections to center */}
                      <path d="M 390 140 L 700 500" stroke="#94a3b8" strokeWidth="3" fill="none" />
                      <path d="M 390 300 L 700 500" stroke="#94a3b8" strokeWidth="3" fill="none" />
                      <path d="M 390 460 L 700 500" stroke="#94a3b8" strokeWidth="3" fill="none" />
                      <path d="M 390 620 L 700 500" stroke="#94a3b8" strokeWidth="3" fill="none" />
                      <path d="M 390 780 L 700 500" stroke="#94a3b8" strokeWidth="3" fill="none" />
                      <path d="M 390 940 L 700 500" stroke="#94a3b8" strokeWidth="3" fill="none" />
                      
                      {/* Center to right side connections */}
                      <path d="M 1180 500 L 1420 120" stroke="#94a3b8" strokeWidth="3" fill="none" />
                      <path d="M 1180 500 L 1420 280" stroke="#94a3b8" strokeWidth="3" fill="none" />
                      <path d="M 1180 500 L 1420 440" stroke="#94a3b8" strokeWidth="3" fill="none" />
                      <path d="M 1180 500 L 1420 600" stroke="#94a3b8" strokeWidth="3" fill="none" />
                      <path d="M 1180 500 L 1420 760" stroke="#94a3b8" strokeWidth="3" fill="none" />
                      <path d="M 1180 500 L 1420 920" stroke="#94a3b8" strokeWidth="3" fill="none" />
                    </g>
                    
                    {/* Left Column Nodes */}
                    <g 
                      className={`cursor-pointer transition-all ${hoveredNode === 'payment' ? 'opacity-100' : 'opacity-90'}`}
                      onClick={() => handleNodeClick('auth')}
                      onMouseEnter={() => setHoveredNode('payment')}
                      onMouseLeave={() => setHoveredNode(null)}
                    >
                      <rect x="50" y="100" width="340" height="80" rx="12" fill="white" stroke="#e2e8f0" strokeWidth="3" />
                      <circle cx="85" cy="140" r="8" fill="#94a3b8" />
                      <rect x="105" y="130" width="150" height="20" rx="4" fill="#cbd5e1" />
                      <rect x="285" y="122" width="70" height="36" rx="6" fill="#cbd5e1" />
                    </g>
                    
                    <g 
                      className={`cursor-pointer transition-all ${hoveredNode === 'webacct' ? 'opacity-100' : 'opacity-90'}`}
                      onClick={() => handleNodeClick('auth')}
                      onMouseEnter={() => setHoveredNode('webacct')}
                      onMouseLeave={() => setHoveredNode(null)}
                    >
                      <rect x="50" y="260" width="340" height="80" rx="12" fill="#fef2f2" stroke="#ef4444" strokeWidth="3" />
                      <circle cx="85" cy="300" r="8" fill="#ef4444" />
                      <rect x="105" y="290" width="150" height="20" rx="4" fill="#cbd5e1" />
                      <rect x="285" y="282" width="70" height="36" rx="6" fill="#fee2e2" />
                    </g>
                    
                    <g 
                      className={`cursor-pointer transition-all ${hoveredNode === 'shopping' ? 'opacity-100' : 'opacity-90'}`}
                      onClick={() => handleNodeClick('auth')}
                      onMouseEnter={() => setHoveredNode('shopping')}
                      onMouseLeave={() => setHoveredNode(null)}
                    >
                      <rect x="50" y="420" width="340" height="80" rx="12" fill="white" stroke="#e2e8f0" strokeWidth="3" />
                      <circle cx="85" cy="460" r="8" fill="#94a3b8" />
                      <rect x="105" y="450" width="150" height="20" rx="4" fill="#cbd5e1" />
                      <rect x="285" y="442" width="70" height="36" rx="6" fill="#cbd5e1" />
                    </g>
                    
                    <g 
                      className={`cursor-pointer transition-all ${hoveredNode === 'search' ? 'opacity-100' : 'opacity-90'}`}
                      onClick={() => handleNodeClick('auth')}
                      onMouseEnter={() => setHoveredNode('search')}
                      onMouseLeave={() => setHoveredNode(null)}
                    >
                      <rect x="50" y="580" width="340" height="80" rx="12" fill="#fef2f2" stroke="#ef4444" strokeWidth="3" />
                      <circle cx="85" cy="620" r="8" fill="#ef4444" />
                      <rect x="105" y="610" width="150" height="20" rx="4" fill="#cbd5e1" />
                      <rect x="285" y="602" width="70" height="36" rx="6" fill="#fee2e2" />
                    </g>
                    
                    <g 
                      className={`cursor-pointer transition-all ${hoveredNode === 'version' ? 'opacity-100' : 'opacity-90'}`}
                      onClick={() => handleNodeClick('auth')}
                      onMouseEnter={() => setHoveredNode('version')}
                      onMouseLeave={() => setHoveredNode(null)}
                    >
                      <rect x="50" y="740" width="340" height="80" rx="12" fill="white" stroke="#e2e8f0" strokeWidth="3" />
                      <circle cx="85" cy="780" r="8" fill="#94a3b8" />
                      <rect x="105" y="770" width="150" height="20" rx="4" fill="#cbd5e1" />
                      <rect x="285" y="762" width="70" height="36" rx="6" fill="#cbd5e1" />
                    </g>
                    
                    <g 
                      className={`cursor-pointer transition-all ${hoveredNode === 'webasync' ? 'opacity-100' : 'opacity-90'}`}
                      onClick={() => handleNodeClick('redis')}
                      onMouseEnter={() => setHoveredNode('webasync')}
                      onMouseLeave={() => setHoveredNode(null)}
                    >
                      <rect x="50" y="900" width="340" height="80" rx="12" fill="white" stroke="#e2e8f0" strokeWidth="3" />
                      <circle cx="85" cy="940" r="8" fill="#94a3b8" />
                      <rect x="105" y="930" width="150" height="20" rx="4" fill="#cbd5e1" />
                      <rect x="285" y="922" width="70" height="36" rx="6" fill="#cbd5e1" />
                    </g>
                    
                    {/* Center Node - API Gateway */}
                    <g 
                      className={`cursor-pointer transition-all ${hoveredNode === 'api' || selectedNode?.id === 'api' ? 'opacity-100' : 'opacity-90'}`}
                      onClick={() => handleNodeClick('api')}
                      onMouseEnter={() => setHoveredNode('api')}
                      onMouseLeave={() => setHoveredNode(null)}
                    >
                      <rect x="700" y="450" width="480" height="100" rx="16" fill="white" stroke="#3b82f6" strokeWidth="4" />
                      <circle cx="745" cy="500" r="10" fill="#94a3b8" />
                      <rect x="770" y="485" width="290" height="30" rx="6" fill="#cbd5e1" />
                      <rect x="1090" y="472" width="70" height="36" rx="8" fill="#cbd5e1" />
                    </g>
                    
                    {/* Right Column Nodes */}
                    <g 
                      className={`cursor-pointer transition-all ${hoveredNode === 'billing' ? 'opacity-100' : 'opacity-90'}`}
                      onClick={() => handleNodeClick('queue')}
                      onMouseEnter={() => setHoveredNode('billing')}
                      onMouseLeave={() => setHoveredNode(null)}
                    >
                      <rect x="1420" y="80" width="380" height="80" rx="12" fill="white" stroke="#e2e8f0" strokeWidth="3" />
                      <circle cx="1460" cy="120" r="8" fill="#94a3b8" />
                      <rect x="1480" y="110" width="180" height="20" rx="4" fill="#cbd5e1" />
                      <rect x="1720" y="102" width="70" height="36" rx="6" fill="#fef3c7" />
                    </g>
                    
                    <g 
                      className={`cursor-pointer transition-all ${hoveredNode === 'identity' ? 'opacity-100' : 'opacity-90'}`}
                      onClick={() => handleNodeClick('auth')}
                      onMouseEnter={() => setHoveredNode('identity')}
                      onMouseLeave={() => setHoveredNode(null)}
                    >
                      <rect x="1420" y="240" width="380" height="80" rx="12" fill="#fef2f2" stroke="#ef4444" strokeWidth="3" />
                      <circle cx="1460" cy="280" r="8" fill="#ef4444" />
                      <rect x="1480" y="270" width="180" height="20" rx="4" fill="#cbd5e1" />
                      <rect x="1720" y="262" width="70" height="36" rx="6" fill="#fee2e2" />
                    </g>
                    
                    <g 
                      className={`cursor-pointer transition-all ${hoveredNode === 'authdecision' ? 'opacity-100' : 'opacity-90'}`}
                      onClick={() => handleNodeClick('queue')}
                      onMouseEnter={() => setHoveredNode('authdecision')}
                      onMouseLeave={() => setHoveredNode(null)}
                    >
                      <rect x="1420" y="400" width="380" height="80" rx="12" fill="white" stroke="#e2e8f0" strokeWidth="3" />
                      <circle cx="1460" cy="440" r="8" fill="#94a3b8" />
                      <rect x="1480" y="430" width="180" height="20" rx="4" fill="#cbd5e1" />
                      <rect x="1720" y="422" width="70" height="36" rx="6" fill="#fef3c7" />
                    </g>
                    
                    <g 
                      className={`cursor-pointer transition-all ${hoveredNode === 'identityprivate' ? 'opacity-100' : 'opacity-90'}`}
                      onClick={() => handleNodeClick('auth')}
                      onMouseEnter={() => setHoveredNode('identityprivate')}
                      onMouseLeave={() => setHoveredNode(null)}
                    >
                      <rect x="1420" y="560" width="380" height="80" rx="12" fill="#fef2f2" stroke="#ef4444" strokeWidth="3" />
                      <circle cx="1460" cy="600" r="8" fill="#ef4444" />
                      <rect x="1480" y="590" width="180" height="20" rx="4" fill="#cbd5e1" />
                      <rect x="1720" y="582" width="70" height="36" rx="6" fill="#fee2e2" />
                    </g>
                    
                    <g 
                      className={`cursor-pointer transition-all ${hoveredNode === 'grant' ? 'opacity-100' : 'opacity-90'}`}
                      onClick={() => handleNodeClick('queue')}
                      onMouseEnter={() => setHoveredNode('grant')}
                      onMouseLeave={() => setHoveredNode(null)}
                    >
                      <rect x="1420" y="720" width="380" height="80" rx="12" fill="white" stroke="#e2e8f0" strokeWidth="3" />
                      <circle cx="1460" cy="760" r="8" fill="#94a3b8" />
                      <rect x="1480" y="750" width="180" height="20" rx="4" fill="#cbd5e1" />
                      <rect x="1720" y="742" width="70" height="36" rx="6" fill="#fef3c7" />
                    </g>
                    
                    <g 
                      className={`cursor-pointer transition-all ${hoveredNode === 'orchestrator' ? 'opacity-100' : 'opacity-90'}`}
                      onClick={() => handleNodeClick('auth')}
                      onMouseEnter={() => setHoveredNode('orchestrator')}
                      onMouseLeave={() => setHoveredNode(null)}
                    >
                      <rect x="1420" y="880" width="380" height="80" rx="12" fill="white" stroke="#e2e8f0" strokeWidth="3" />
                      <circle cx="1460" cy="920" r="8" fill="#94a3b8" />
                      <rect x="1480" y="910" width="180" height="20" rx="4" fill="#cbd5e1" />
                      <rect x="1720" y="902" width="70" height="36" rx="6" fill="#cbd5e1" />
                    </g>
                  </svg>
                  
                  {/* Legend */}
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 flex gap-4 text-xs shadow-xs border border-slate-200">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-400"></div>
                      <div className="w-10 h-2 bg-slate-200 rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                      <div className="w-10 h-2 bg-slate-200 rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                      <div className="w-10 h-2 bg-slate-200 rounded-full"></div>
                    </div>
                  </div>

                  {/* Node Details Panel */}
                  {selectedNode && (
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md rounded-lg shadow-md border border-slate-200 p-4 w-64 z-20">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="w-32 h-3 bg-slate-300 rounded-full mb-2"></div>
                          <div className="flex items-center gap-2 mt-1">
                            <div 
                              className="w-2 h-2 rounded-full" 
                              style={{ backgroundColor: getStatusColor(selectedNode.status) }}
                            ></div>
                            <div className="w-12 h-2 bg-slate-200 rounded-full"></div>
                          </div>
                        </div>
                        <button 
                          onClick={(e) => { e.stopPropagation(); setSelectedNode(null); }}
                          className="text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="space-y-2.5">
                        <div className="flex justify-between items-center">
                          <div className="w-12 h-2 bg-slate-200 rounded-full"></div>
                          <div className="w-16 h-2 bg-slate-300 rounded-full"></div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="w-12 h-2 bg-slate-200 rounded-full"></div>
                          <div className="w-16 h-2 bg-slate-300 rounded-full"></div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="w-12 h-2 bg-slate-200 rounded-full"></div>
                          <div className="w-16 h-2 bg-slate-300 rounded-full"></div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="w-12 h-2 bg-slate-200 rounded-full"></div>
                          <div className="w-16 h-2 bg-slate-300 rounded-full"></div>
                        </div>
                        
                        {selectedNode.dependencies.length > 0 && (
                          <>
                            <div className="border-t border-slate-200 my-2 pt-2">
                              <div className="w-16 h-2 bg-slate-200 rounded-full mb-2"></div>
                              <div className="flex flex-wrap gap-1">
                                {selectedNode.dependencies.map((dep) => (
                                  <div key={dep} className="w-12 h-5 bg-slate-100 rounded"></div>
                                ))}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      
                      <button className="w-full mt-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-3 py-2 rounded text-xs transition-all shadow-xs">
                        View Detailed Metrics
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Metrics Section */}
              <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-lg p-4 shadow-xs">
                {/* Metric Tabs */}
                <div className="flex gap-6 mb-4 border-b border-slate-200">
                  <button 
                    onClick={() => setActiveMetricTab('metrics')}
                    className={`pb-2 border-b-2 text-xs uppercase tracking-wider transition-colors ${
                      activeMetricTab === 'metrics' 
                        ? 'border-blue-600 text-slate-900' 
                        : 'border-transparent text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    Metrics
                  </button>
                  <button 
                    onClick={() => setActiveMetricTab('trace')}
                    className={`pb-2 border-b-2 text-xs uppercase tracking-wider transition-colors ${
                      activeMetricTab === 'trace' 
                        ? 'border-blue-600 text-slate-900' 
                        : 'border-transparent text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    Trace
                  </button>
                  <button 
                    onClick={() => setActiveMetricTab('logs')}
                    className={`pb-2 border-b-2 text-xs uppercase tracking-wider transition-colors ${
                      activeMetricTab === 'logs' 
                        ? 'border-blue-600 text-slate-900' 
                        : 'border-transparent text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    Logs
                  </button>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <div key={num} className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div className="w-20 h-2.5 bg-slate-300 rounded-full"></div>
                        <div className="w-10 h-2 bg-slate-200 rounded-full"></div>
                      </div>
                      
                      {/* Large value display */}
                      <div className="w-16 h-4 bg-slate-400 rounded-full mb-3"></div>
                      
                      {/* Simple bar chart wireframe */}
                      <div className="mb-3">
                        <div className="flex items-end gap-1 h-12">
                          <div className="w-full bg-slate-200 rounded-t" style={{ height: '40%' }}></div>
                          <div className="w-full bg-slate-200 rounded-t" style={{ height: '35%' }}></div>
                          <div className="w-full bg-slate-200 rounded-t" style={{ height: '50%' }}></div>
                          <div className="w-full bg-slate-200 rounded-t" style={{ height: '45%' }}></div>
                          <div className="w-full bg-slate-200 rounded-t" style={{ height: '70%' }}></div>
                          <div className="w-full bg-slate-200 rounded-t" style={{ height: '65%' }}></div>
                          <div className="w-full bg-slate-200 rounded-t" style={{ height: '85%' }}></div>
                          <div className="w-full bg-slate-200 rounded-t" style={{ height: '90%' }}></div>
                        </div>
                      </div>
                      
                      {/* Time range label */}
                      <div className="w-16 h-2 bg-slate-100 rounded-full"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - AI Suggestions and Quick Remediation */}
            <div className="space-y-4">
              {/* AI Investigation Suggestions */}
              <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-lg p-4 shadow-xs">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-xs uppercase tracking-wider text-slate-500">AI Investigation Suggestions</div>
                </div>
                
                <div className="space-y-3">
                  {[
                    { priority: 'HIGH', bars: [100, 85, 70] },
                    { priority: 'MEDIUM', bars: [90, 75] },
                    { priority: 'MEDIUM', bars: [95, 80, 60] },
                    { priority: 'LOW', bars: [85, 70, 65, 50] }
                  ].map((suggestion, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 rounded-lg p-3">
                      {/* Priority Badge */}
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`text-xs px-2 py-0.5 rounded border font-semibold ${
                          suggestion.priority === 'HIGH' 
                            ? 'bg-red-50 text-red-700 border-red-200' 
                            : suggestion.priority === 'MEDIUM'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-slate-50 text-slate-600 border-slate-200'
                        }`}>
                          {suggestion.priority}
                        </div>
                        <div className="flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-blue-500" />
                          <span className="text-xs text-slate-400">AI Generated</span>
                        </div>
                      </div>
                      
                      {/* Wireframe Content */}
                      <div className="space-y-1.5 mb-3">
                        {suggestion.bars.map((width, barIdx) => (
                          <div 
                            key={barIdx} 
                            className="h-2 bg-slate-200 rounded-full" 
                            style={{ width: `${width}%` }}
                          ></div>
                        ))}
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-3 py-1.5 rounded-md text-xs transition-all font-semibold shadow-xs">
                          Apply Fix
                        </button>
                        <button className="bg-white hover:bg-slate-50 text-slate-600 px-3 py-1.5 rounded-md text-xs transition-colors border border-slate-300 font-semibold">
                          Dismiss
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* View More */}
                <div className="text-center mt-3">
                  <button className="text-sm text-blue-600 hover:text-blue-700">View all suggestions (12)</button>
                </div>
              </div>

              {/* Quick Remediation */}
              <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-lg p-4 shadow-xs">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-xs uppercase tracking-wider text-slate-500">Quick Remediation</div>
                  <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-3 py-1 rounded text-xs transition-all shadow-xs">
                    Rollback
                  </button>
                </div>
                
                {/* Deployment Timeline */}
                <div className="bg-white border border-slate-200 rounded-lg p-4 mb-4">
                  <div className="text-xs text-slate-600 font-semibold mb-3">Deployment Timeline</div>
                  
                  {/* Timeline visualization */}
                  <div className="space-y-3 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-14 h-2 bg-slate-200 rounded-full"></div>
                      <div className="flex-1 h-10 bg-slate-100 rounded flex items-center px-2 gap-2">
                        <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                        <div className="flex-1 space-y-1">
                          <div className="w-12 h-2 bg-slate-300 rounded-full"></div>
                          <div className="w-20 h-1.5 bg-slate-200 rounded-full"></div>
                        </div>
                      </div>
                      <div className="w-16 h-2 bg-slate-200 rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-14 h-2 bg-slate-200 rounded-full"></div>
                      <div className="flex-1 h-10 bg-red-50 rounded flex items-center px-2 gap-2 border border-red-200">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="flex-1 space-y-1">
                          <div className="w-12 h-2 bg-slate-300 rounded-full"></div>
                          <div className="w-20 h-1.5 bg-slate-200 rounded-full"></div>
                        </div>
                      </div>
                      <div className="w-16 h-2 bg-slate-200 rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-14 h-2 bg-slate-200 rounded-full"></div>
                      <div className="flex-1 h-10 bg-slate-100 rounded flex items-center px-2 gap-2">
                        <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                        <div className="flex-1 space-y-1">
                          <div className="w-12 h-2 bg-slate-300 rounded-full"></div>
                          <div className="w-20 h-1.5 bg-slate-200 rounded-full"></div>
                        </div>
                      </div>
                      <div className="w-16 h-2 bg-slate-200 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-3 text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                      <div className="w-12 h-2 bg-slate-200 rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-red-400"></div>
                      <div className="w-12 h-2 bg-slate-200 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Recent Changes */}
                <div>
                  <div className="text-xs text-slate-600 font-semibold mb-3">Recent Changes</div>
                  <div className="space-y-3">
                    {[
                      { status: 'failed' },
                      { status: 'success' },
                      { status: 'success' }
                    ].map((change, idx) => (
                      <div key={idx} className="bg-white border border-slate-200 rounded-lg p-3 hover:shadow-sm transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-2.5 bg-slate-300 rounded-full"></div>
                              <div className={`w-14 h-4 rounded ${
                                change.status === 'failed' 
                                  ? 'bg-red-200 border border-red-300' 
                                  : 'bg-green-200 border border-green-300'
                              }`}></div>
                            </div>
                            <div className="w-24 h-2 bg-slate-200 rounded-full"></div>
                            <div className="w-14 h-2 bg-slate-100 rounded-full"></div>
                          </div>
                          <button className={`px-3 py-1 rounded text-xs transition-all ${
                            change.status === 'failed'
                              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-xs'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                          }`}>
                            {change.status === 'failed' ? 'Rollback' : 'Revert'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}