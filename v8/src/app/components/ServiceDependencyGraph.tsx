import { Folder, Wrench, Flame, Plus, RefreshCw, Minus, Database } from 'lucide-react';
import { useState } from 'react';

const leftNodes = [
  { id: 'idewidgets', name: 'idewidgets', status: 'Unhealthy', percent: '87.24%', health: 'unhealthy',
    children: [
      { id: 'idewidgets-ui', name: 'idewidgets-ui', status: 'Warning', percent: '92.8%', health: 'warning' },
      { id: 'idewidgets-core', name: 'idewidgets-core', status: 'Unhealthy', percent: '82.5%', health: 'unhealthy' }
    ] },
  { id: 'manageconnectionplugin', name: 'manageconnectionplugin', status: 'Warning', percent: '94.21%', health: 'warning',
    children: [
      { id: 'connection-handler', name: 'connection-handler', status: 'Warning', percent: '93.1%', health: 'warning' },
      { id: 'plugin-manager', name: 'plugin-manager', status: 'Healthy', percent: '99.9%', health: 'healthy' }
    ] },
  { id: 'fdpwidgetswebplugin', name: 'fdpwidgetswebplugin', status: 'Healthy', percent: '99.24%', health: 'healthy',
    children: [
      { id: 'web-renderer', name: 'web-renderer', status: 'Healthy', percent: '99.7%', health: 'healthy' },
      { id: 'widget-loader', name: 'widget-loader', status: 'Warning', percent: '95.9%', health: 'warning' }
    ] },
  { id: 'fdpwidgetsui', name: 'fdpwidgetsui', status: 'Healthy', percent: '100%', health: 'healthy',
    children: [
      { id: 'ui-components', name: 'ui-components', status: 'Healthy', percent: '100%', health: 'healthy' },
      { id: 'theme-service', name: 'theme-service', status: 'Healthy', percent: '100%', health: 'healthy' }
    ] }
];

const rightNodes = [
  { id: 'fdp_docservice', name: 'fdp_docservice', status: 'Healthy', percent: '99.99%', health: 'healthy', children: [] },
  { id: 'runservice', name: 'runservice', status: 'Warning', percent: '93.99%', health: 'warning', children: [] },
  { id: 'connectionmanagementsvc', name: 'connectionmanagementsvc', status: 'Unhealthy', percent: '85.29%', health: 'unhealthy', children: [] },
  { id: 'assignmentservice', name: 'assignmentservice', status: 'Healthy', percent: '99.99%', health: 'healthy', children: [] },
  { id: 'pauth', name: 'pauth', status: 'Warning', percent: '94.97%', health: 'warning', children: [] },
  { id: 'profileorchestrationservice', name: 'profileorchestrationservice', status: 'Healthy', percent: '99.99%', health: 'healthy', children: [] },
  { id: 'oilloggingservice', name: 'oilloggingservice', status: 'Healthy', percent: '99.99%', health: 'healthy', children: [] },
  { id: 'vaultapplicationservice', name: 'vaultapplicationservice', status: 'Healthy', percent: '99.99%', health: 'healthy', children: [] },
  { id: 'idxapi', name: 'idxapi', status: 'Healthy', percent: '100%', health: 'healthy', children: [] },
  { id: 'config', name: 'config', status: 'Healthy', percent: '100%', health: 'healthy', children: [] }
];

const TIME_RANGES = ['5m', '15m', '30m', '1h', '6h', '24h'];

const healthColor = (h: string) => {
  switch (h) {
    case 'unhealthy': return '#ef4444';
    case 'warning': return '#f59e0b';
    case 'healthy':
    default: return '#10b981';
  }
};

interface ServiceDependencyGraphProps {
  nodeData?: any;
  selectedNode?: any;
  hoveredNode?: any;
  handleNodeClick?: (nodeId: string) => void;
  setHoveredNode?: (id: string | null) => void;
  getStatusColor?: (status: string) => string;
  getHealthBadgeStyle?: (status: string) => { bg: string; text: string };
}

export function ServiceDependencyGraph(_props: ServiceDependencyGraphProps) {
  const [expandedNodes, setExpandedNodes] = useState<string[]>([]);
  const [activeRange, setActiveRange] = useState('15m');
  const [filterAnomalous, setFilterAnomalous] = useState(false);

  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev => prev.includes(nodeId) ? prev.filter(id => id !== nodeId) : [...prev, nodeId]);
  };

  const statusPillStyles = (h: string) => {
    switch (h) {
      case 'unhealthy': return 'bg-red-50 text-red-600';
      case 'warning': return 'bg-amber-50 text-amber-600';
      case 'healthy':
      default: return 'bg-emerald-50 text-emerald-600';
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 relative" style={{ minHeight: '560px' }}>
      {/* Header */}
      <div className="flex items-center justify-end mb-2">
        <div className="flex items-center gap-1 bg-slate-50 rounded-lg p-0.5">
          {TIME_RANGES.map(r => (
            <button
              key={r}
              onClick={() => setActiveRange(r)}
              className={`px-2.5 py-1 rounded-md text-xs transition-colors ${
                activeRange === r ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Sub header with controls + legend */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button className="w-7 h-7 flex items-center justify-center hover:bg-slate-50 rounded-lg border border-slate-200 transition-colors">
            <RefreshCw className="w-3.5 h-3.5 text-slate-600" />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600">Filter anomalous paths</span>
            <button
              onClick={() => setFilterAnomalous(!filterAnomalous)}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${filterAnomalous ? 'bg-blue-500' : 'bg-slate-200'}`}
            >
              <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm transition-transform ${filterAnomalous ? 'translate-x-[18px]' : 'translate-x-1'}`}></span>
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500"></span>Unhealthy</div>
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500"></span>Warning</div>
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"></span>Healthy</div>
        </div>
      </div>

      {/* Graph area */}
      <div className="relative" style={{ height: '440px' }}>
        {/* SVG curves */}
        <svg viewBox="0 0 1000 440" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none">
          {leftNodes.map((node, idx) => {
            const total = leftNodes.length;
            const startX = 430, startY = 220;
            const endX = 280;
            const endY = ((idx + 0.5) / total) * 440;
            const c1x = startX - 80;
            return (
              <path
                key={`L-${node.id}`}
                d={`M ${startX} ${startY} C ${c1x} ${startY}, ${endX + 80} ${endY}, ${endX} ${endY}`}
                fill="none"
                stroke={healthColor(node.health)}
                strokeWidth="1.5"
                strokeDasharray={node.health === 'unhealthy' ? '4 4' : 'none'}
                opacity="0.7"
              />
            );
          })}
          {rightNodes.map((node, idx) => {
            const total = rightNodes.length;
            const startX = 570, startY = 220;
            const endX = 720;
            const endY = ((idx + 0.5) / total) * 440;
            const c1x = startX + 80;
            return (
              <path
                key={`R-${node.id}`}
                d={`M ${startX} ${startY} C ${c1x} ${startY}, ${endX - 80} ${endY}, ${endX} ${endY}`}
                fill="none"
                stroke={healthColor(node.health)}
                strokeWidth="1.5"
                strokeDasharray={node.health === 'unhealthy' ? '4 4' : 'none'}
                opacity="0.7"
              />
            );
          })}
        </svg>

        {/* Center node */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="bg-white border-2 border-blue-500 rounded-lg px-3 py-2 shadow-md flex items-center gap-2 min-w-[160px]">
            <Database className="w-4 h-4 text-blue-500 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-sm text-slate-900">com</div>
              <div className="text-[10px] text-slate-500">Central Service</div>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">N/A</span>
            <Flame className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
          </div>
        </div>

        {/* Left nodes column */}
        <div className="absolute left-0 top-0 bottom-0 w-[260px] flex flex-col justify-around py-2">
          {leftNodes.map((node) => {
            const isExpanded = expandedNodes.includes(node.id);
            const color = healthColor(node.health);
            return (
              <div key={node.id}>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleNode(node.id)}
                    className="w-5 h-5 flex items-center justify-center hover:bg-blue-50 rounded-full border border-blue-300 bg-white flex-shrink-0"
                  >
                    {isExpanded ? <Minus className="w-2.5 h-2.5 text-blue-600" /> : <Plus className="w-2.5 h-2.5 text-blue-600" />}
                  </button>
                  <div
                    className="bg-white border border-slate-200 rounded-md px-2.5 py-1.5 shadow-sm hover:shadow transition-shadow flex items-center gap-2 flex-1 relative overflow-hidden"
                  >
                    <span className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: color }}></span>
                    <Folder className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 ml-1" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-slate-900 truncate">{node.name}</div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${statusPillStyles(node.health)}`}>{node.status}</span>
                        <span className="text-[10px] text-slate-500">{node.percent}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {isExpanded && node.children && (
                  <div className="ml-7 mt-1.5 space-y-1">
                    {node.children.map((child) => {
                      const cColor = healthColor(child.health);
                      return (
                        <div key={child.id} className="bg-white border border-slate-200 rounded-md px-2 py-1 shadow-sm flex items-center gap-2 relative overflow-hidden">
                          <span className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: cColor }}></span>
                          <Folder className="w-3 h-3 text-slate-400 flex-shrink-0 ml-1" />
                          <div className="flex-1 min-w-0">
                            <div className="text-[11px] text-slate-700 truncate">{child.name}</div>
                            <div className="flex items-center gap-1 mt-0.5">
                              <span className={`text-[9px] px-1 py-0.5 rounded ${statusPillStyles(child.health)}`}>{child.status}</span>
                              <span className="text-[9px] text-slate-500">{child.percent}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right nodes column */}
        <div className="absolute right-0 top-0 bottom-0 w-[240px] flex flex-col justify-around py-1">
          {rightNodes.map((node) => {
            const color = healthColor(node.health);
            return (
              <div key={node.id} className="bg-white border border-slate-200 rounded-md px-2.5 py-1 shadow-sm hover:shadow transition-shadow flex items-center gap-2">
                <Wrench className="w-3 h-3 text-slate-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-slate-900 truncate">{node.name}</div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className={`text-[10px] ${node.health === 'unhealthy' ? 'text-red-600' : node.health === 'warning' ? 'text-amber-600' : 'text-emerald-600'}`}>{node.status}</span>
                    <span className="text-[10px] text-slate-500">{node.percent}</span>
                  </div>
                </div>
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }}></span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom legend */}
      <div className="flex items-center justify-center gap-5 mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600">
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>Healthy</div>
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>Warning</div>
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>Critical</div>
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>Unknown</div>
      </div>
    </div>
  );
}
