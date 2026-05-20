import { Bell, ChevronRight, ExternalLink, Grid3x3, AlertCircle, Clock, Users, MapPin, Server, User, ChevronLeft, MessageCircle, Phone, Search, BarChart3, Settings, Sun, Shield } from 'lucide-react';
import { useState } from 'react';
import { InvestigationCanvasExperience } from '@/app/components/InvestigationCanvasExperience';
import { RecoverySummaryContent } from '@/app/components/RecoverySummaryContent';
import { OverviewTabContent } from '@/app/components/OverviewTabContent';
import { InvestigateTabContent } from '@/app/components/InvestigateTabContent';
import { AiIcon } from '@/app/components/AiIcon';

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
  const [showRecoveryAssist, setShowRecoveryAssist] = useState(false);
  const [recoveryTab, setRecoveryTab] = useState<'summary' | 'canvas'>('summary');

  const teamMembers = [
    {
      name: 'Priya Patel',
      role: 'Incident Commander',
      avatar: 'PP',
      status: 'active',
    },
    {
      name: 'James Chen',
      role: 'SRE Lead',
      avatar: 'JC',
      status: 'active',
    },
    {
      name: 'Maria Rodriguez',
      role: 'Backend Engineer',
      avatar: 'MR',
      status: 'active',
    },
    {
      name: 'Raj Krishnan',
      role: 'DevOps Engineer',
      avatar: 'RK',
      status: 'active',
    },
    {
      name: 'Alex Thompson',
      role: 'Database Engineer',
      avatar: 'AT',
      status: 'active',
    },
    {
      name: 'Nina Patel',
      role: 'Platform Engineer',
      avatar: 'NP',
      status: 'active',
    },
  ];

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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div>
                <div className="text-blue-600 font-medium text-base tracking-wide uppercase">Intuit</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider">Development Portal</div>
              </div>
            </div>
            
            {/* Navigation Links */}
            <div className="flex items-center gap-1">
              <button className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 rounded-lg transition-colors">
                Create
              </button>
              <button className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 rounded-lg transition-colors">
                Manage
              </button>
              <button className="px-4 py-2 text-sm text-[#236CFF] relative font-medium">
                Monitor
                <div className="absolute inset-x-2 -bottom-[5px] h-[2px] bg-[#236CFF] rounded-full"></div>
              </button>
              <button className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 rounded-lg transition-colors">
                Discover
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search" 
                className="w-64 px-4 py-1.5 pl-9 text-sm bg-white border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            
            {/* Intuit Assist Button */}
            <button className="flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-300 rounded-full hover:bg-slate-50 transition-colors">
              <AiIcon className="w-4 h-4" />
              <span className="text-sm font-medium text-slate-700">Intuit Assist</span>
            </button>
            
            {/* Icon Buttons */}
            <button className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded-full transition-colors">
              <Clock className="w-[18px] h-[18px] text-slate-500" />
            </button>
            
            <button className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded-full transition-colors relative">
              <Bell className="w-[18px] h-[18px] text-slate-500" />
            </button>

            <button className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded-full transition-colors">
              <div className="w-8 h-8 rounded-full bg-[#3B82F6] flex items-center justify-center">
                <span className="text-white text-xs font-semibold">JD</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Left Navigation Sidebar */}
      <div className="fixed left-0 top-[73px] bottom-0 w-16 bg-white border-r border-slate-200 flex flex-col items-center py-6 z-40">
        <button className="w-10 h-10 flex items-center justify-center bg-slate-100 text-slate-800 rounded-xl transition-colors mb-4">
          <BarChart3 className="w-5 h-5" />
        </button>
        <button className="w-10 h-10 flex items-center justify-center bg-white text-slate-400 hover:bg-slate-50 rounded-xl transition-colors mb-4">
          <Settings className="w-5 h-5" />
        </button>
        <button className="w-10 h-10 flex items-center justify-center bg-white text-slate-400 hover:bg-slate-50 rounded-xl transition-colors mb-4">
          <Sun className="w-5 h-5" />
        </button>
        <div className="flex-1"></div>
        <button className="w-10 h-10 flex items-center justify-center bg-white text-slate-400 hover:bg-slate-50 rounded-xl transition-colors">
          <Shield className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content */}
      <div className="pt-20 pl-16 pb-6 pr-6">
        {showRecoveryAssist ? (
          <div className="space-y-6 pl-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-slate-600 mt-6">
              <button onClick={() => setShowRecoveryAssist(false)} className="text-sm font-normal text-cyan-600 hover:text-cyan-700 underline cursor-pointer transition-colors">
                INC1789966
              </button>
              <ChevronRight className="w-4 h-4 text-slate-400" />
              <button onClick={() => setShowRecoveryAssist(false)} className="text-sm font-normal text-cyan-600 hover:text-cyan-700 underline cursor-pointer transition-colors">
                Investigate
              </button>
              <ChevronRight className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-normal text-slate-600">Recovery Assist</span>
            </div>

            {/* Incident Header Card */}
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              {/* Title Row */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-rose-50 flex items-center justify-center flex-shrink-0 border border-rose-200">
                    <span className="text-rose-600 font-medium text-xs">P1</span>
                  </div>
                  <h1 className="text-2xl text-slate-900">INC1789966</h1>
                  <span className="px-2.5 py-1 bg-red-50 text-red-700 text-xs font-semibold rounded-md border border-red-200">
                    ONGOING
                  </span>
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs ml-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span>32 minutes elapsed</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors">
                    <ExternalLink className="w-3.5 h-3.5" />
                    SNOW
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors">
                    <ExternalLink className="w-3.5 h-3.5" />
                    SLACK
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors">
                    <ExternalLink className="w-3.5 h-3.5" />
                    ZOOM
                  </button>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-700 mb-4 text-sm">Cache layer connection pool exhaustion causing elevated error rates and service degradation</p>

              {/* Metrics Grid */}
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-red-600" />
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Users Affected</span>
                  </div>
                  <div className="text-2xl font-medium text-slate-900">24,300</div>
                  <div className="text-xs text-red-600 font-medium mt-1">↑ 340% increase</div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Error Rate</span>
                  </div>
                  <div className="text-2xl font-medium text-slate-900">2.34%</div>
                  <div className="text-xs text-slate-600 mt-1">Normal: 0.02%</div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-cyan-600" />
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Regions</span>
                  </div>
                  <div className="text-lg font-medium text-slate-900">US-West, US-East</div>
                  <div className="text-xs text-slate-600 mt-1">2 regions impacted</div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Detected At</span>
                  </div>
                  <div className="text-lg font-medium text-slate-900">14:23 UTC</div>
                  <div className="text-xs text-slate-600 mt-1">32 minutes ago</div>
                </div>
              </div>

              {/* Metadata Pills */}
              <div className="flex items-center flex-wrap gap-2">
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 rounded-md border border-slate-200">
                  <Server className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-xs text-slate-500">Asset:</span>
                  <span className="text-xs font-semibold text-slate-900">IdentityGraphQLOrch</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 rounded-md border border-slate-200">
                  <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                  <span className="text-xs text-slate-500">Environment:</span>
                  <span className="text-xs font-semibold text-slate-400">Production</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 rounded-md border border-slate-200">
                  <User className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-xs text-slate-500">Assignee:</span>
                  <span className="text-xs font-semibold text-slate-900">Sarah Chen</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 rounded-md border border-slate-200">
                  <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                  <span className="text-xs text-slate-500">Tier:</span>
                  <span className="text-xs font-semibold text-slate-900">Tier 1</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 rounded-md border border-slate-200">
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-xs text-slate-500">Related:</span>
                  <span className="text-xs font-semibold text-slate-900">2 similar incidents</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 border-b border-slate-200">
              <button 
                onClick={() => setRecoveryTab('summary')}
                className={`pb-3 relative text-sm font-medium transition-colors ${
                  recoveryTab === 'summary' 
                    ? 'text-blue-600' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Summary
                {recoveryTab === 'summary' && (
                  <div className="absolute inset-x-0 -bottom-px h-0.5 bg-blue-600 rounded-full"></div>
                )}
              </button>
              <button 
                onClick={() => setRecoveryTab('canvas')}
                className={`pb-3 relative text-sm font-medium transition-colors ${
                  recoveryTab === 'canvas' 
                    ? 'text-blue-600' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Investigation Canvas
                {recoveryTab === 'canvas' && (
                  <div className="absolute inset-x-0 -bottom-px h-0.5 bg-blue-600 rounded-full"></div>
                )}
              </button>
            </div>

            {/* Tab Content */}
            {recoveryTab === 'summary' ? (
              <RecoverySummaryContent />
            ) : (
              <InvestigationCanvasExperience />
            )}
          </div>
        ) : (
          <div className="flex gap-6 pl-6">
            {/* Left Panel - Incident Card */}
            <div className="w-80 flex-shrink-0">
              {/* Breadcrumb */}
              <div className="flex items-center gap-1 text-sm text-slate-600 mb-4 mt-3">
                <ChevronLeft className="w-4 h-4 text-cyan-600 cursor-pointer hover:text-cyan-700 transition-colors" />
                <span className="text-sm font-normal text-cyan-600 underline cursor-pointer hover:text-cyan-700 transition-colors">All Incidents</span>
              </div>
              
              <div className="bg-white rounded-xl p-6 border border-slate-200 sticky top-22 max-h-[calc(100vh-6rem)] overflow-y-auto">
                {/* Title Row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-rose-50 flex items-center justify-center flex-shrink-0 border border-rose-200">
                      <span className="text-rose-600 font-medium text-xs">P1</span>
                    </div>
                    <h1 className="text-2xl text-slate-900">INC1789966</h1>
                  </div>
                </div>

                <span className="inline-block px-2.5 py-1 bg-red-50 text-red-700 text-xs font-semibold rounded-md border border-red-200 mb-2">
                  ONGOING
                </span>
                <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-4">
                  <Clock className="w-3.5 h-3.5" />
                  <span>32 minutes elapsed</span>
                </div>

                {/* Description */}
                <p className="text-slate-700 mb-4 text-sm">Cache layer connection pool exhaustion causing elevated error rates and service degradation</p>

                {/* Divider */}
                <div className="border-t border-slate-200 mb-4"></div>

                {/* Metrics Grid */}
                <div className="space-y-3 mb-4">
                  <div className="bg-white rounded-lg p-3 border border-slate-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="w-4 h-4 text-red-600" />
                      <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Users Affected</span>
                    </div>
                    <div className="text-xl font-medium text-slate-900">24,300</div>
                    <div className="text-xs text-red-600 font-medium mt-1">↑ 340% increase</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-slate-200">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertCircle className="w-4 h-4 text-red-600" />
                      <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Error Rate</span>
                    </div>
                    <div className="text-xl font-medium text-slate-900">2.34%</div>
                    <div className="text-xs text-slate-600 mt-1">Normal: 0.02%</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-slate-200">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="w-4 h-4 text-cyan-600" />
                      <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Regions</span>
                    </div>
                    <div className="text-base font-medium text-slate-900">US-West, US-East</div>
                    <div className="text-xs text-slate-600 mt-1">2 regions impacted</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-slate-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-amber-600" />
                      <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Detected At</span>
                    </div>
                    <div className="text-base font-medium text-slate-900">14:23 UTC</div>
                    <div className="text-xs text-slate-600 mt-1">32 minutes ago</div>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-200 mb-4"></div>

                {/* External Links */}
                <div className="flex flex-col gap-2 mb-4">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors justify-center">
                    <ExternalLink className="w-3.5 h-3.5" />
                    SNOW
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors justify-center">
                    <ExternalLink className="w-3.5 h-3.5" />
                    SLACK
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors justify-center">
                    <ExternalLink className="w-3.5 h-3.5" />
                    ZOOM
                  </button>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-200 mb-4"></div>

                {/* Metadata Pills */}
                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 rounded-md border border-slate-200">
                    <Server className="w-3.5 h-3.5 text-slate-500" />
                    <span className="text-xs text-slate-500">Asset:</span>
                    <span className="text-xs font-semibold text-slate-900">IdentityGraphQLOrch</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 rounded-md border border-slate-200">
                    <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                    <span className="text-xs text-slate-500">Environment:</span>
                    <span className="text-xs font-semibold text-slate-400">Production</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 rounded-md border border-slate-200">
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    <span className="text-xs text-slate-500">Assignee:</span>
                    <span className="text-xs font-semibold text-slate-900">Sarah Chen</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 rounded-md border border-slate-200">
                    <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                    <span className="text-xs text-slate-500">Tier:</span>
                    <span className="text-xs font-semibold text-slate-900">Tier 1</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 rounded-md border border-slate-200">
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                    <span className="text-xs text-slate-500">Related:</span>
                    <span className="text-xs font-semibold text-slate-900">2 similar incidents</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-200 mb-4"></div>

                {/* Involved People */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-slate-900">Involved People</h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span>6 active</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    {teamMembers.map((member, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition-colors">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          {/* Avatar */}
                          <div className="relative flex-shrink-0">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-xs ${
                              idx === 0 ? 'bg-red-100 text-red-700' :
                              idx === 1 ? 'bg-blue-100 text-blue-700' :
                              idx === 2 ? 'bg-purple-100 text-purple-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                              {member.avatar}
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white bg-green-500"></div>
                          </div>
                          
                          {/* Info */}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <span className="text-xs font-semibold text-slate-900 truncate">{member.name}</span>
                              {idx === 0 && (
                                <span className="text-[10px] px-1.5 py-0.5 bg-red-100 text-red-700 rounded font-semibold flex-shrink-0">
                                  CMD
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-slate-600 truncate">{member.role}</div>
                          </div>
                        </div>
                        
                        {/* Actions */}
                        <div className="flex items-center gap-0.5 flex-shrink-0 ml-1">
                          <button className="w-6 h-6 rounded-md hover:bg-slate-100 flex items-center justify-center transition-colors">
                            <MessageCircle className="w-3 h-3 text-slate-600" />
                          </button>
                          <button className="w-6 h-6 rounded-md hover:bg-slate-100 flex items-center justify-center transition-colors">
                            <Phone className="w-3 h-3 text-slate-600" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Add Member Button */}
                  <button className="w-full py-2 border-2 border-dashed border-slate-300 rounded-lg text-xs font-medium text-slate-600 hover:border-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    Add Team Member
                  </button>
                </div>
              </div>
            </div>

            {/* Right Panel - Tabs and Content */}
            <div className="flex-1 space-y-6">
              {/* Tabs */}
              <div className="flex items-center gap-8 mt-6 border-b border-slate-200">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'summary', label: 'Automated Recovery' },
                  { id: 'canvas', label: 'Investigation Canvas' },
                  { id: 'investigate', label: 'Recovery Deep Dive' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`relative pb-2 text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'text-blue-600'
                        : 'text-slate-900 hover:text-slate-700'
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-blue-600 rounded-full" />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              {activeTab === 'overview' && <OverviewTabContent />}
              {activeTab === 'investigate' && (
                <InvestigateTabContent
                  nodeData={nodeData}
                  selectedNode={selectedNode}
                  hoveredNode={hoveredNode}
                  handleNodeClick={handleNodeClick}
                  setHoveredNode={setHoveredNode}
                  getStatusColor={getStatusColor}
                  getHealthBadgeStyle={getHealthBadgeStyle}
                  activeMetricTab={activeMetricTab}
                  setActiveMetricTab={setActiveMetricTab}
                />
              )}
              {activeTab === 'summary' && <RecoverySummaryContent />}
              {activeTab === 'canvas' && <InvestigationCanvasExperience />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}