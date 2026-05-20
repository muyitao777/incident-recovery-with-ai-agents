import { Database, Folder, Wrench, Plus, Minus, ThumbsUp } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

type Health = 'unhealthy' | 'warning' | 'healthy';

interface Node {
  id: string;
  name: string;
  percent: string;
  health: Health;
  children?: { id: string; name: string; percent: string; health: Health }[];
}

const leftNodes: Node[] = [
  {
    id: 'idewidgets', name: 'idewidgets', percent: '87.24%', health: 'unhealthy',
    children: [
      { id: 'idewidgets-ui', name: 'idewidgets-ui', percent: '92.8%', health: 'warning' },
      { id: 'idewidgets-core', name: 'idewidgets-core', percent: '82.5%', health: 'unhealthy' },
    ],
  },
  {
    id: 'manageconnectionplugin', name: 'manageconnectionplugin', percent: '94.21%', health: 'warning',
    children: [
      { id: 'connection-handler', name: 'connection-handler', percent: '93.1%', health: 'warning' },
      { id: 'plugin-manager', name: 'plugin-manager', percent: '99.9%', health: 'healthy' },
    ],
  },
  {
    id: 'fdpwidgetswebplugin', name: 'fdpwidgetswebplugin', percent: '99.24%', health: 'healthy',
    children: [
      { id: 'web-renderer', name: 'web-renderer', percent: '99.7%', health: 'healthy' },
      { id: 'widget-loader', name: 'widget-loader', percent: '95.9%', health: 'warning' },
    ],
  },
  {
    id: 'fdpwidgetsui', name: 'fdpwidgetsui', percent: '100%', health: 'healthy',
    children: [
      { id: 'ui-components', name: 'ui-components', percent: '100%', health: 'healthy' },
      { id: 'theme-service', name: 'theme-service', percent: '100%', health: 'healthy' },
    ],
  },
];

const rightNodes: { id: string; name: string; percent: string; health: Health }[] = [
  { id: 'fdp_docservice', name: 'fdp_docservice', percent: '99.99%', health: 'healthy' },
  { id: 'runservice', name: 'runservice', percent: '93.99%', health: 'unhealthy' },
  { id: 'connectionmanagementsvc', name: 'connectionmanagementsvc', percent: '85.29%', health: 'unhealthy' },
  { id: 'assignmentservice', name: 'assignmentservice', percent: '99.99%', health: 'healthy' },
  { id: 'pauth', name: 'pauth', percent: '94.97%', health: 'warning' },
  { id: 'profileorchestrationservice', name: 'profileorchestrationservice', percent: '99.99%', health: 'healthy' },
  { id: 'oilloggingservice', name: 'oilloggingservice', percent: '99.99%', health: 'healthy' },
  { id: 'vaultapplicationservice', name: 'vaultapplicationservice', percent: '99.99%', health: 'healthy' },
  { id: 'idxapi', name: 'idxapi', percent: '100%', health: 'healthy' },
  { id: 'config', name: 'config', percent: '100%', health: 'healthy' },
];

const healthColors: Record<Health, { stripe: string; dot: string; stroke: string; label: string; labelText: string; cardBorder: string; cardBg: string }> = {
  unhealthy: { stripe: 'bg-red-500', dot: 'bg-red-500', stroke: '#ef4444', label: 'Unhealthy', labelText: 'text-red-600', cardBorder: 'border-red-300', cardBg: 'bg-red-50/60' },
  warning: { stripe: 'bg-amber-400', dot: 'bg-amber-400', stroke: '#f59e0b', label: 'Warning', labelText: 'text-amber-600', cardBorder: 'border-amber-300', cardBg: 'bg-amber-50/60' },
  healthy: { stripe: 'bg-emerald-500', dot: 'bg-emerald-500', stroke: '#10b981', label: 'Healthy', labelText: 'text-emerald-600', cardBorder: 'border-slate-200', cardBg: 'bg-white' },
};

const ranges = ['5m', '15m', '30m', '1h', '6h', '24h'];

interface ServiceDependencyGraphProps {
  showFilters?: boolean;
}

const NodeCard = ({
  name,
  percent,
  health,
  Icon = Folder,
  showDot = false,
  iconColor = 'text-slate-400',
}: {
  name: string;
  percent: string;
  health: Health;
  Icon?: typeof Folder;
  showDot?: boolean;
  iconColor?: string;
}) => {
  const c = healthColors[health];
  return (
    <div className={`relative ${c.cardBg} border ${c.cardBorder} rounded-md px-2 py-1 shadow-sm flex items-center gap-1.5 w-[160px] overflow-hidden`}>
      <Icon className={`w-3 h-3 flex-shrink-0 ${iconColor}`} />
      <div className="flex-1 min-w-0">
        <div className={`text-[10px] font-semibold truncate ${health === 'healthy' ? 'text-slate-900' : c.labelText}`}>{name}</div>
        <div className="text-[9px] text-slate-500">{percent}</div>
      </div>
      {showDot && <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.dot}`} />}
    </div>
  );
};

export function ServiceDependencyGraph({ showFilters = false }: ServiceDependencyGraphProps) {
  const [filterAnomalous, setFilterAnomalous] = useState(showFilters);
  const [activeRange, setActiveRange] = useState('15m');
  const [expanded, setExpanded] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const BASE_W = 720;
  const BASE_H = 400;

  useEffect(() => {
    if (!wrapperRef.current) return;
    const el = wrapperRef.current;
    const update = () => {
      const w = el.clientWidth;
      setScale(Math.min(1, w / BASE_W));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const toggle = (id: string) =>
    setExpanded((e) => (e.includes(id) ? e.filter((x) => x !== id) : [...e, id]));

  return (
    <div>
      {/* Top row: title (left) | range buttons (right) */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-900">Service Dependency Graph</h3>
        <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-0.5">
          {ranges.map((r) => (
            <button
              key={r}
              onClick={() => setActiveRange(r)}
              className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors ${
                activeRange === r ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Graph (scales to canvas width via transform; line endpoints stay aligned because the inner box keeps its base size) */}
      <div ref={wrapperRef} className="w-full" style={{ height: BASE_H * scale }}>
        <div
          className="relative mx-auto rounded-lg"
          style={{
            width: BASE_W,
            height: BASE_H,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            backgroundImage: 'radial-gradient(circle, rgb(203 213 225 / 0.5) 1px, transparent 1px)',
            backgroundSize: '14px 14px',
          }}
        >
        {/* Layout constants matching the absolutely-positioned nodes below */}
        {(() => null)()}
        {/* Connection lines (SVG sized to container in real px since no viewBox) */}
        <svg width="720" height="400" className="absolute inset-0 pointer-events-none overflow-visible" style={{ maxWidth: '100%' }}>
          {(() => {
            const W = 720;
            const H = 400;
            const leftColTotal = 4 * 32 + 3 * 24; // 200
            const leftTopOffset = (H - leftColTotal) / 2;
            const cardW = 160;
            const buttonGutter = 24;
            const leftCardRight = buttonGutter + cardW;
            const rightCardLeft = W - cardW - 28;
            const leftRowStride = 56;
            const rightRowStride = 40;
            const leftCardCenterY = (i: number) => leftTopOffset + 16 + i * leftRowStride;
            const rightCardCenterY = (i: number) => 18 + i * rightRowStride;
            const centerLeftX = W / 2 - 75;
            const centerRightX = W / 2 + 75;
            const centerY = H / 2;

            return (
              <>
                {leftNodes.map((node, idx) => {
                  const c = healthColors[node.health];
                  const sx = centerLeftX, sy = centerY;
                  const ex = leftCardRight, ey = leftCardCenterY(idx);
                  const mx = (sx + ex) / 2;
                  return (
                    <path
                      key={`l-${node.id}`}
                      d={`M ${sx} ${sy} C ${mx} ${sy}, ${mx} ${ey}, ${ex} ${ey}`}
                      fill="none"
                      stroke={c.stroke}
                      strokeWidth="1.5"
                      strokeDasharray={node.health === 'healthy' ? '0' : '4 3'}
                      opacity={node.health === 'healthy' ? 0.5 : 0.85}
                    />
                  );
                })}
                {rightNodes.map((node, idx) => {
                  const c = healthColors[node.health];
                  const sx = centerRightX, sy = centerY;
                  const ex = rightCardLeft, ey = rightCardCenterY(idx);
                  const mx = (sx + ex) / 2;
                  return (
                    <path
                      key={`r-${node.id}`}
                      d={`M ${sx} ${sy} C ${mx} ${sy}, ${mx} ${ey}, ${ex} ${ey}`}
                      fill="none"
                      stroke={c.stroke}
                      strokeWidth="1.5"
                      strokeDasharray={node.health === 'healthy' ? '0' : '4 3'}
                      opacity={node.health === 'healthy' ? 0.5 : 0.85}
                    />
                  );
                })}
              </>
            );
          })()}
        </svg>

        {/* Center Node */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="bg-indigo-50/60 border-2 border-indigo-300 rounded-md px-2 py-1.5 shadow-md flex items-center gap-1.5" style={{ width: 150 }}>
            <Database className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-semibold text-indigo-700 truncate">com</div>
              <div className="text-[9px] text-indigo-400">Central Service</div>
            </div>
            <span className="text-[9px] px-1 py-0.5 rounded bg-white text-slate-500 border border-slate-200">N/A</span>
            <ThumbsUp className="w-3 h-3 text-emerald-500 flex-shrink-0" />
          </div>
        </div>

        {/* Left nodes */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col" style={{ gap: '24px' }}>
          {leftNodes.map((node) => {
            const isOpen = expanded.includes(node.id);
            return (
              <div key={node.id}>
                <div className="flex items-center gap-2">
                  {node.children ? (
                    <button
                      onClick={() => toggle(node.id)}
                      className="w-5 h-5 flex items-center justify-center rounded-full border border-slate-300 bg-white hover:bg-slate-50 transition-colors flex-shrink-0"
                    >
                      {isOpen ? <Minus className="w-2.5 h-2.5 text-slate-600" /> : <Plus className="w-2.5 h-2.5 text-slate-600" />}
                    </button>
                  ) : (
                    <span className="w-5 h-5 flex-shrink-0" />
                  )}
                  <NodeCard name={node.name} percent={node.percent} health={node.health} />
                </div>
                {isOpen && node.children && (
                  <div className="ml-7 mt-1.5 space-y-1.5">
                    {node.children.map((child) => (
                      <NodeCard key={child.id} name={child.name} percent={child.percent} health={child.health} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right nodes */}
        <div className="absolute right-0 top-0 flex flex-col gap-1">
          {rightNodes.map((node) => (
            <div key={node.id} className="flex items-center gap-2">
              <NodeCard name={node.name} percent={node.percent} health={node.health} Icon={Wrench} showDot />
              <button
                className="w-5 h-5 flex items-center justify-center rounded-full border border-slate-300 bg-white hover:bg-slate-50 transition-colors flex-shrink-0"
              >
                <Plus className="w-2.5 h-2.5 text-slate-600" />
              </button>
            </div>
          ))}
        </div>
        </div>
      </div>

      {/* Bottom legend */}
      <div className="mt-4 flex items-center justify-center gap-5 text-[11px]">
        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /><span className="text-slate-600">Healthy</span></span>
        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" /><span className="text-slate-600">Warning</span></span>
        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-red-500" /><span className="text-slate-600">Critical</span></span>
        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-slate-300" /><span className="text-slate-600">Unknown</span></span>
      </div>
    </div>
  );
}
