import { useState } from 'react';
import { MetricsCharts } from './MetricsCharts';
import { DetailedMetrics } from './DetailedMetrics';
import { TraceViewer } from './TraceViewer';
import { LogViewer } from './LogViewer';
import { AIInvestigationSuggestions } from './AIInvestigationSuggestions';
import { QuickRemediation } from './QuickRemediation';
import { ServiceDependencyGraph } from './ServiceDependencyGraph';
import { Activity, AlertTriangle, AlertCircle, CheckCircle, Folder, Wrench, Flame, Plus, RefreshCw, ChevronRight } from 'lucide-react';

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

interface InvestigateTabProps {
  nodeData: Record<string, NodeData>;
  selectedNode: NodeData | null;
  hoveredNode: string | null;
  handleNodeClick: (nodeId: string) => void;
  setHoveredNode: (id: string | null) => void;
  getStatusColor: (status: string) => string;
  getHealthBadgeStyle: (status: string) => { bg: string; text: string };
  activeMetricTab: 'metrics' | 'trace' | 'logs';
  setActiveMetricTab: (tab: 'metrics' | 'trace' | 'logs') => void;
}

export function InvestigateTabContent({
  nodeData,
  selectedNode,
  hoveredNode,
  handleNodeClick,
  setHoveredNode,
  getStatusColor,
  getHealthBadgeStyle,
  activeMetricTab,
  setActiveMetricTab
}: InvestigateTabProps) {
  const [selectedTimeRange, setSelectedTimeRange] = useState('15m');

  const timeRanges = [
    { id: '5m', label: '5m' },
    { id: '15m', label: '15m' },
    { id: '30m', label: '30m' },
    { id: '1h', label: '1h' },
    { id: '3h', label: '3h' },
    { id: '6h', label: '6h' },
    { id: '24h', label: '24h' }
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Left Column - Dependency Graph */}
      <div className="col-span-2 space-y-4">
        {/* Dependency Graph */}
        <div className="bg-slate-50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-bold text-slate-900">Service Dependency Graph</div>
            
            {/* Time Range Chips */}
            <div className="flex items-center gap-1">
              {timeRanges.map((range) => (
                <button
                  key={range.id}
                  onClick={() => setSelectedTimeRange(range.id)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-full transition-all ${
                    selectedTimeRange === range.id
                      ? 'bg-slate-100 text-slate-700 border border-slate-300'
                      : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-200'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Service Topology Visualization */}
          <ServiceDependencyGraph
            nodeData={nodeData}
            selectedNode={selectedNode}
            hoveredNode={hoveredNode}
            handleNodeClick={handleNodeClick}
            setHoveredNode={setHoveredNode}
            getStatusColor={getStatusColor}
            getHealthBadgeStyle={getHealthBadgeStyle}
          />

          {/* Legend */}
          <div className="flex items-center justify-center gap-5 mt-3 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
              <span className="text-slate-600">Healthy</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
              <span className="text-slate-600">Warning</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
              <span className="text-slate-600">Critical</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-400"></div>
              <span className="text-slate-600">Unknown</span>
            </div>
          </div>
        </div>

        {/* Metrics Section with Tabs */}
        <div className="bg-white rounded-[10px] border border-slate-200 shadow-card">
          {/* Tabs */}
          <div className="flex border-b border-slate-200">
            {[
              { id: 'metrics', label: 'Metrics', icon: Activity },
              { id: 'trace', label: 'Traces', icon: Activity },
              { id: 'logs', label: 'Logs', icon: Activity }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveMetricTab(tab.id as 'metrics' | 'trace' | 'logs')}
                className={`px-6 py-3 text-sm font-semibold transition-colors relative ${
                  activeMetricTab === tab.id
                    ? 'text-blue-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
                {activeMetricTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-4">
            {activeMetricTab === 'metrics' && (
              <MetricsCharts />
            )}
            {activeMetricTab === 'trace' && (
              <TraceViewer />
            )}
            {activeMetricTab === 'logs' && (
              <LogViewer />
            )}
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-4">
        <AIInvestigationSuggestions />
        <QuickRemediation />
      </div>
    </div>
  );
}