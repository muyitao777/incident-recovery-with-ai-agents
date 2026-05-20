import { Bell, ChevronRight, ExternalLink, Grid3x3, AlertCircle, Clock, Users, MapPin, Server, User, ArrowLeft, BarChart2, Settings, Sun, Shield } from 'lucide-react';
import { useState } from 'react';
import { InvestigationCanvasExperience } from '@/app/components/InvestigationCanvasExperience';
import { RecoverySummaryContent } from '@/app/components/RecoverySummaryContent';
import { OverviewTabContent } from '@/app/components/OverviewTabContent';
import { InvestigateTabContent } from '@/app/components/InvestigateTabContent';

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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between px-6 py-2">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="flex flex-col">
                <span className="text-[#155DFC] font-extrabold text-base tracking-wide leading-tight">INTUIT</span>
                <span className="text-[10px] text-slate-500 tracking-wide uppercase leading-tight">Development Portal</span>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex items-center gap-1">
              <button className="px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900 transition-colors">
                Create
              </button>
              <button className="px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900 transition-colors">
                Manage
              </button>
              <button className="px-3 py-1.5 text-sm text-[#155DFC] relative font-medium">
                Monitor
                <div className="absolute inset-x-0 -bottom-[2px] h-[2px] bg-[#155DFC] rounded-full"></div>
              </button>
              <button className="px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900 transition-colors">
                Discover
              </button>
            </nav>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search" 
                className="w-56 px-4 py-1.5 pl-9 text-sm bg-white border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <svg className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            {/* Intuit Assist Button */}
            <button className="flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-300 rounded-full hover:bg-slate-50 transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.433 14.7484L3.30904 14.0908L5.37585 10.5269C5.63229 10.0847 6.08971 9.82176 6.59926 9.82368C7.10881 9.8256 7.56424 10.0919 7.81734 10.5361L9.85727 14.1155L8.72839 14.7646L6.68846 11.1852C6.64753 11.1132 6.54237 11.1117 6.5009 11.1845L4.43409 14.7484L4.433 14.7484Z" fill="#236CFF"/>
                <path d="M12.0365 14.53L9.31649 11.4405C8.97944 11.0575 8.87344 10.5382 9.03602 10.0529C9.19752 9.56756 9.59201 9.21713 10.0916 9.11483L14.1159 8.29229L14.3745 9.57303L10.3503 10.3956C10.309 10.4039 10.2828 10.4276 10.2694 10.4678C10.2561 10.508 10.2633 10.5429 10.2912 10.5747L13.0113 13.6642L12.0365 14.53Z" fill="#236CFF"/>
                <path d="M10.8577 8.15932C10.5672 8.15688 10.2807 8.0619 10.035 7.88015C9.62557 7.57615 9.41498 7.09088 9.4724 6.58172L9.93625 2.4835L11.2285 2.6305L10.7646 6.72873C10.7599 6.77007 10.7748 6.80395 10.8082 6.82819C10.8416 6.85243 10.8784 6.85709 10.9165 6.83999L14.6817 5.19361L15.2007 6.39148L11.4355 8.03787C11.2484 8.12014 11.0518 8.15878 10.8577 8.15714L10.8577 8.15932Z" fill="#236CFF"/>
                <path d="M7.4008 6.5038C7.20674 6.5038 7.0105 6.46242 6.82403 6.37966L3.07286 4.70162L3.60193 3.50816L7.3531 5.1862C7.39104 5.20362 7.4279 5.19926 7.46151 5.17531C7.49512 5.15026 7.5103 5.11759 7.50596 5.07622L7.07555 0.972053L8.36895 0.835938L8.79827 4.93792C8.8514 5.44645 8.63673 5.92993 8.22476 6.23157C7.97757 6.41233 7.69027 6.5038 7.39972 6.5038H7.4008Z" fill="#236CFF"/>
                <path d="M3.04108 11.8823L2.08339 10.9976L4.86312 7.96172C4.89163 7.93153 4.8996 7.89568 4.88702 7.85525C4.87443 7.81592 4.84759 7.79058 4.80758 7.78144L0.800133 6.88282L1.08369 5.60737L5.09111 6.50817C5.58865 6.62019 5.97624 6.97824 6.12825 7.46664C6.28026 7.95503 6.16526 8.47108 5.82079 8.84855L3.04106 11.8844L3.04108 11.8823Z" fill="#236CFF"/>
              </svg>
              <span className="text-sm text-slate-700">Intuit Assist</span>
            </button>
            
            {/* Icon Buttons */}
            <button className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded-full transition-colors">
              <svg className="w-4.5 h-4.5 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
              </svg>
            </button>
            
            <button className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded-full transition-colors relative">
              <Bell className="w-[18px] h-[18px] text-slate-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <button className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs">
              JD
            </button>
          </div>
        </div>
      </div>

      {/* Left Navigation */}
      <div className="fixed left-0 top-[49px] bottom-0 w-16 bg-white border-r border-slate-200 flex flex-col items-center py-6 z-40">
        {/* Top Icons */}
        <div className="flex flex-col gap-6">
          <button className="w-10 h-10 flex items-center justify-center bg-slate-100 rounded-lg transition-colors">
            <BarChart2 className="w-5 h-5 text-slate-600" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 rounded-lg transition-colors">
            <Settings className="w-5 h-5 text-slate-400" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 rounded-lg transition-colors">
            <Sun className="w-5 h-5 text-slate-400" />
          </button>
        </div>
        
        {/* Bottom Icon */}
        <div className="mt-auto">
          <button className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 rounded-lg transition-colors">
            <Shield className="w-5 h-5 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-[3.25rem] pl-16 px-6 pb-6 max-w-[1600px] mx-auto">
        <div className="space-y-6">
          {/* Header with Breadcrumb */}
          <div className="flex justify-between items-center mt-6">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span className="text-sm font-normal text-cyan-600 underline cursor-pointer hover:text-cyan-700 transition-colors">All incidents</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-normal text-cyan-600 cursor-pointer hover:text-cyan-700 transition-colors">INC1789966</span>
            </div>
          </div>

          {/* Incident Header Card */}
          <div className="bg-white rounded-[10px] p-6 border border-slate-200 shadow-card">
            {/* Title Row */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-rose-50 flex items-center justify-center flex-shrink-0 border border-rose-200">
                  <span className="text-rose-600 font-semibold text-xs">P1</span>
                </div>
                <h1 className="text-2xl text-slate-900">INC1789966</h1>
                <span className="px-2.5 py-1 bg-red-50 text-red-700 text-xs font-medium rounded-md border border-red-200">
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
                <div className="flex items-center gap-1.5 mb-2">
                  <Users className="w-3.5 h-3.5 text-red-400" />
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Users Affected</span>
                </div>
                <div className="text-xl font-semibold text-slate-900">24,300</div>
                <div className="text-xs text-red-600 font-medium mt-1">↑ 340% increase</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-slate-200">
                <div className="flex items-center gap-1.5 mb-2">
                  <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Error Rate</span>
                </div>
                <div className="text-xl font-semibold text-slate-900">2.34%</div>
                <div className="text-xs text-slate-600 mt-1">Normal: 0.02%</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-slate-200">
                <div className="flex items-center gap-1.5 mb-2">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Regions</span>
                </div>
                <div className="text-xl font-semibold text-slate-900">US-West, US-East</div>
                <div className="text-xs text-slate-600 mt-1">2 regions impacted</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-slate-200">
                <div className="flex items-center gap-1.5 mb-2">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Detected At</span>
                </div>
                <div className="text-xl font-semibold text-slate-900">14:23 UTC</div>
                <div className="text-xs text-slate-600 mt-1">32 minutes ago</div>
              </div>
            </div>

            {/* Metadata Pills */}
            <div className="flex items-center flex-wrap gap-2">
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 rounded-md border border-slate-200">
                <Server className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs text-slate-500">Asset:</span>
                <span className="text-xs font-medium text-slate-900">IdentityGraphQLOrch</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 rounded-md border border-slate-200">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span className="text-xs text-slate-500">Environment:</span>
                <span className="text-xs font-medium text-slate-900">Production</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 rounded-md border border-slate-200">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs text-slate-500">Assignee:</span>
                <span className="text-xs font-medium text-slate-900">Sarah Chen</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 rounded-md border border-slate-200">
                <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                <span className="text-xs text-slate-500">Tier:</span>
                <span className="text-xs font-medium text-slate-900">Tier 1</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 rounded-md border border-slate-200">
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs text-slate-500">Related:</span>
                <span className="text-xs font-medium text-slate-900">2 similar incidents</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-8 border-b border-slate-200">
            {([
              { id: 'overview', label: 'Overview' },
              { id: 'summary', label: 'Automated Recovery' },
              { id: 'canvas', label: 'Investigation Canvas' },
              { id: 'investigate', label: 'Recovery Deep Dive' },
            ] as const).map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative pb-3 text-sm font-normal transition-colors ${
                    isActive ? 'text-[#155DFC]' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <span className="absolute inset-x-0 -bottom-px h-0.5 bg-[#155DFC]"></span>
                  )}
                </button>
              );
            })}
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
    </div>
  );
}