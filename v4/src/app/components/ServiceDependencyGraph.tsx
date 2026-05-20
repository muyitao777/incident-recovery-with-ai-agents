import { Folder, Wrench, Database, Flame, RefreshCw, Plus, Minus } from 'lucide-react';
import { useState } from 'react';

const leftNodes = [
  {
    id: 'idewidgets',
    name: 'idewidgets',
    status: 'Unhealthy',
    percent: '87.24%',
    health: 'unhealthy',
    children: [
      { id: 'idewidgets-ui', name: 'idewidgets-ui', status: 'Warning', percent: '92.8%', health: 'warning' },
      { id: 'idewidgets-core', name: 'idewidgets-core', status: 'Unhealthy', percent: '82.5%', health: 'unhealthy' },
    ],
  },
  {
    id: 'manageconnectionplugin',
    name: 'manageconnectionplugin',
    status: 'Warning',
    percent: '94.21%',
    health: 'warning',
    children: [
      { id: 'connection-handler', name: 'connection-handler', status: 'Warning', percent: '93.1%', health: 'warning' },
      { id: 'plugin-manager', name: 'plugin-manager', status: 'Healthy', percent: '99.9%', health: 'healthy' },
    ],
  },
  {
    id: 'fdpwidgetswebplugin',
    name: 'fdpwidgetswebplugin',
    status: 'Healthy',
    percent: '99.24%',
    health: 'healthy',
    children: [
      { id: 'web-renderer', name: 'web-renderer', status: 'Healthy', percent: '99.7%', health: 'healthy' },
      { id: 'widget-loader', name: 'widget-loader', status: 'Warning', percent: '95.9%', health: 'warning' },
    ],
  },
  {
    id: 'fdpwidgetsui',
    name: 'fdpwidgetsui',
    status: 'Healthy',
    percent: '100%',
    health: 'healthy',
    children: [
      { id: 'ui-components', name: 'ui-components', status: 'Healthy', percent: '100%', health: 'healthy' },
      { id: 'theme-service', name: 'theme-service', status: 'Healthy', percent: '100%', health: 'healthy' },
    ],
  },
];

const rightNodes = [
  { id: 'fdp_docservice', name: 'fdp_docservice', status: 'Healthy', percent: '99.99%', health: 'healthy' },
  { id: 'runservice', name: 'runservice', status: 'Warning', percent: '93.99%', health: 'warning' },
  { id: 'connectionmanagementsvc', name: 'connectionmanagementsvc', status: 'Unhealthy', percent: '85.29%', health: 'unhealthy' },
  { id: 'assignmentservice', name: 'assignmentservice', status: 'Healthy', percent: '99.99%', health: 'healthy' },
  { id: 'pauth', name: 'pauth', status: 'Warning', percent: '94.97%', health: 'warning' },
  { id: 'profileorchestrationservice', name: 'profileorchestrationservice', status: 'Healthy', percent: '99.99%', health: 'healthy' },
  { id: 'oilloggingservice', name: 'oilloggingservice', status: 'Healthy', percent: '99.99%', health: 'healthy' },
  { id: 'vaultapplicationservice', name: 'vaultapplicationservice', status: 'Healthy', percent: '99.99%', health: 'healthy' },
  { id: 'idxapi', name: 'idxapi', status: 'Healthy', percent: '100%', health: 'healthy' },
  { id: 'config', name: 'config', status: 'Healthy', percent: '100%', health: 'healthy' },
];

// Layout constants
const LEFT_X = 24;
const LEFT_W = 200;
const NODE_H = 44;
const CHILD_H = 38;
const LEFT_START_Y = 60;
const LEFT_SIBLING_GAP = 56;    // gap between left siblings (collapsed)
const LEFT_CHILD_TOP_GAP = 8;   // gap between parent and first child
const LEFT_CHILD_GAP = 5;       // gap between children
const LEFT_EXPAND_BOTTOM_GAP = 10; // extra gap after last child before next sibling

const CENTER_X = 332;
const CENTER_W = 152;
const CENTER_H = 50;

const RIGHT_X = 560;
const RIGHT_W = 216;
const RIGHT_H = 40;
const RIGHT_START_Y = 4;
const RIGHT_GAP = 6;

// Fixed center mid Y based on collapsed state (constant)
// Left nodes (collapsed): 60, 160, 260, 360 → centers: 82, 182, 282, 382 → avg = 232
const FIXED_CENTER_MID_Y = 232;
const FIXED_CENTER_Y = FIXED_CENTER_MID_Y - CENTER_H / 2; // 207

// Compute left node positions dynamically
function computeLeftPositions(expandedNodes: string[]) {
  const positions: { parentY: number; childYs: number[] }[] = [];
  let currentY = LEFT_START_Y;

  for (const node of leftNodes) {
    const isExpanded = expandedNodes.includes(node.id);
    const childCount = node.children?.length ?? 0;
    const childYs: number[] = [];

    if (isExpanded && childCount > 0) {
      let cy = currentY + NODE_H + LEFT_CHILD_TOP_GAP;
      for (let i = 0; i < childCount; i++) {
        childYs.push(cy);
        cy += CHILD_H + LEFT_CHILD_GAP;
      }
      positions.push({ parentY: currentY, childYs });
      currentY = cy + LEFT_EXPAND_BOTTOM_GAP + LEFT_SIBLING_GAP;
    } else {
      positions.push({ parentY: currentY, childYs });
      currentY += NODE_H + LEFT_SIBLING_GAP;
    }
  }

  return positions;
}

// Health styles helper
function getHealthStyles(health: string) {
  switch (health) {
    case 'unhealthy':
      return {
        borderAccent: '#ef4444',  // red-500
        statusBg: '#fef2f2',
        statusText: '#dc2626',
        dotColor: '#ef4444',
      };
    case 'warning':
      return {
        borderAccent: '#f59e0b',  // amber-500
        statusBg: '#fffbeb',
        statusText: '#d97706',
        dotColor: '#f59e0b',
      };
    case 'healthy':
    default:
      return {
        borderAccent: '#e2e8f0',  // slate-200
        statusBg: '#f8fafc',
        statusText: '#64748b',
        dotColor: '#22c55e',
      };
  }
}

interface ServiceDependencyGraphProps {
  nodeData?: unknown;
  selectedNode?: unknown;
  hoveredNode?: unknown;
  handleNodeClick?: (nodeId: string) => void;
  setHoveredNode?: (id: string | null) => void;
  getStatusColor?: (status: string) => string;
  getHealthBadgeStyle?: (status: string) => { bg: string; text: string };
}

export function ServiceDependencyGraph(_props: ServiceDependencyGraphProps) {
  const [expandedNodes, setExpandedNodes] = useState<string[]>([]);

  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev =>
      prev.includes(nodeId) ? prev.filter(id => id !== nodeId) : [...prev, nodeId]
    );
  };

  const leftPositions = computeLeftPositions(expandedNodes);

  // Compute SVG dimensions
  const lastLeft = leftPositions[leftPositions.length - 1];
  const lastLeftNode = leftNodes[leftNodes.length - 1];
  const lastLeftIsExpanded = expandedNodes.includes(lastLeftNode.id);
  const lastLeftChildCount = lastLeftNode.children?.length ?? 0;
  const leftBottom = lastLeft.parentY + NODE_H
    + (lastLeftIsExpanded && lastLeftChildCount > 0
      ? LEFT_CHILD_TOP_GAP + lastLeftChildCount * (CHILD_H + LEFT_CHILD_GAP)
      : 0);

  const rightBottom = RIGHT_START_Y + rightNodes.length * (RIGHT_H + RIGHT_GAP) - RIGHT_GAP;
  const SVG_H = Math.max(leftBottom, rightBottom) + 28;

  // Connection anchor points
  const leftEdgeRight = LEFT_X + LEFT_W;       // 224
  const centerLeftEdge = CENTER_X;              // 332
  const centerRightEdge = CENTER_X + CENTER_W;  // 484
  const rightEdgeLeft = RIGHT_X;               // 560

  return (
    <div className="bg-white rounded-xl overflow-hidden">
      {/* Header toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100 bg-slate-50">
        <button className="w-7 h-7 flex items-center justify-center hover:bg-slate-200 rounded-md transition-colors">
          <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
        </button>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Filter anomalous paths</span>
          <button className="relative inline-flex h-4.5 w-8 items-center rounded-full bg-slate-200 transition-colors hover:bg-slate-300 focus:outline-none">
            <span className="inline-block h-3 w-3 transform rounded-full bg-white shadow-sm transition-transform translate-x-0.5" />
          </button>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
            Unhealthy
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
            Warning
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-slate-300 inline-block" />
            Healthy
          </span>
        </div>
      </div>

      {/* SVG Graph */}
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 800 ${SVG_H}`}
          style={{ width: '100%', height: SVG_H, display: 'block', minWidth: 600, background: 'white' }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="sdg-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" />
              <feOffset dx="0" dy="1" result="offset" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.08" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ── Connections: left nodes → center ── */}
          {leftPositions.map((pos, idx) => {
            const node = leftNodes[idx];
            const nodeStyles = getHealthStyles(node.health);
            const fromY = pos.parentY + NODE_H / 2;
            const toY = FIXED_CENTER_MID_Y;
            const cp1x = leftEdgeRight + 40;
            const cp2x = centerLeftEdge - 40;
            return (
              <path
                key={`lc-${node.id}`}
                d={`M ${leftEdgeRight} ${fromY} C ${cp1x} ${fromY} ${cp2x} ${toY} ${centerLeftEdge} ${toY}`}
                fill="none"
                stroke={node.health === 'healthy' ? '#cbd5e1' : nodeStyles.borderAccent}
                strokeWidth={node.health === 'healthy' ? 1.2 : 1.5}
                opacity={node.health === 'healthy' ? 0.5 : 0.65}
                strokeDasharray={node.health === 'unhealthy' ? '4 2' : undefined}
              />
            );
          })}

          {/* ── Connections: center → right nodes ── */}
          {rightNodes.map((node, idx) => {
            const nodeY = RIGHT_START_Y + idx * (RIGHT_H + RIGHT_GAP);
            const nodeStyles = getHealthStyles(node.health);
            const fromY = FIXED_CENTER_MID_Y;
            const toY = nodeY + RIGHT_H / 2;
            const cp1x = centerRightEdge + 35;
            const cp2x = rightEdgeLeft - 35;
            return (
              <path
                key={`cr-${node.id}`}
                d={`M ${centerRightEdge} ${fromY} C ${cp1x} ${fromY} ${cp2x} ${toY} ${rightEdgeLeft} ${toY}`}
                fill="none"
                stroke={node.health === 'healthy' ? '#cbd5e1' : nodeStyles.borderAccent}
                strokeWidth={node.health === 'healthy' ? 1.2 : 1.5}
                opacity={node.health === 'healthy' ? 0.4 : 0.6}
                strokeDasharray={node.health === 'unhealthy' ? '4 2' : undefined}
              />
            );
          })}

          {/* ── Center Node ── */}
          <g>
            <rect
              x={CENTER_X}
              y={FIXED_CENTER_Y}
              width={CENTER_W}
              height={CENTER_H}
              rx={8}
              fill="white"
              stroke="#3b82f6"
              strokeWidth={2}
              filter="url(#sdg-shadow)"
            />
            {/* left accent stripe */}
            <rect x={CENTER_X} y={FIXED_CENTER_Y + 2} width={4} height={CENTER_H - 4} rx={2} fill="#3b82f6" />
            <foreignObject x={CENTER_X + 6} y={FIXED_CENTER_Y} width={CENTER_W - 6} height={CENTER_H}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  height: '100%',
                  paddingLeft: 6,
                  paddingRight: 10,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Database style={{ width: 14, height: 14, color: '#3b82f6', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 12, color: '#1e293b', lineHeight: 1.2 }}>com</div>
                    <div style={{ fontSize: 10, color: '#94a3b8', lineHeight: 1.2 }}>Central Service</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span
                    style={{
                      fontSize: 9,
                      padding: '2px 6px',
                      borderRadius: 4,
                      background: '#f1f5f9',
                      color: '#64748b',
                    }}
                  >
                    N/A
                  </span>
                  <Flame style={{ width: 13, height: 13, color: '#f97316' }} />
                </div>
              </div>
            </foreignObject>
          </g>

          {/* ── Left Nodes ── */}
          {leftPositions.map((pos, idx) => {
            const node = leftNodes[idx];
            const styles = getHealthStyles(node.health);
            const isExpanded = expandedNodes.includes(node.id);

            return (
              <g key={node.id}>
                {/* Expand/collapse button */}
                <g
                  transform={`translate(${LEFT_X - 20}, ${pos.parentY + NODE_H / 2 - 9})`}
                  onClick={() => toggleNode(node.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <circle cx={9} cy={9} r={9} fill="white" stroke="#93c5fd" strokeWidth={1.2} />
                  {isExpanded
                    ? <Minus x={3} y={3} width={12} height={12} color="#3b82f6" strokeWidth={2} />
                    : <Plus x={3} y={3} width={12} height={12} color="#3b82f6" strokeWidth={2} />}
                </g>

                {/* Parent node card */}
                <rect
                  x={LEFT_X}
                  y={pos.parentY}
                  width={LEFT_W}
                  height={NODE_H}
                  rx={7}
                  fill="white"
                  stroke="#e2e8f0"
                  strokeWidth={1}
                  filter="url(#sdg-shadow)"
                />
                {/* left accent stripe */}
                <rect
                  x={LEFT_X}
                  y={pos.parentY + 2}
                  width={3.5}
                  height={NODE_H - 4}
                  rx={1.75}
                  fill={styles.borderAccent}
                />
                <foreignObject x={LEFT_X + 5} y={pos.parentY} width={LEFT_W - 5} height={NODE_H}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      height: '100%',
                      paddingLeft: 4,
                      paddingRight: 8,
                    }}
                  >
                    <Folder style={{ width: 13, height: 13, color: '#94a3b8', flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 11, color: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {node.name}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                        <span
                          style={{
                            fontSize: 9,
                            padding: '1px 5px',
                            borderRadius: 20,
                            background: styles.statusBg,
                            color: styles.statusText,
                          }}
                        >
                          {node.status}
                        </span>
                        <span style={{ fontSize: 9, color: '#94a3b8' }}>{node.percent}</span>
                      </div>
                    </div>
                  </div>
                </foreignObject>

                {/* Children when expanded */}
                {isExpanded &&
                  pos.childYs.map((childY, ci) => {
                    const child = node.children[ci];
                    const cs = getHealthStyles(child.health);
                    return (
                      <g key={child.id}>
                        {/* Connector line from parent to child */}
                        <line
                          x1={LEFT_X + 12}
                          y1={pos.parentY + NODE_H}
                          x2={LEFT_X + 12}
                          y2={childY + CHILD_H / 2}
                          stroke="#cbd5e1"
                          strokeWidth={1}
                          strokeDasharray="3 2"
                        />
                        <line
                          x1={LEFT_X + 12}
                          y1={childY + CHILD_H / 2}
                          x2={LEFT_X + 20}
                          y2={childY + CHILD_H / 2}
                          stroke="#cbd5e1"
                          strokeWidth={1}
                        />
                        <rect
                          x={LEFT_X + 20}
                          y={childY}
                          width={LEFT_W - 20}
                          height={CHILD_H}
                          rx={6}
                          fill="white"
                          stroke="#e2e8f0"
                          strokeWidth={1}
                          filter="url(#sdg-shadow)"
                        />
                        {/* child accent stripe */}
                        <rect
                          x={LEFT_X + 20}
                          y={childY + 2}
                          width={3}
                          height={CHILD_H - 4}
                          rx={1.5}
                          fill={cs.borderAccent}
                        />
                        <foreignObject x={LEFT_X + 24} y={childY} width={LEFT_W - 24} height={CHILD_H}>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 5,
                              height: '100%',
                              paddingLeft: 4,
                              paddingRight: 6,
                            }}
                          >
                            <Folder style={{ width: 11, height: 11, color: '#b0bec5', flexShrink: 0 }} />
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontSize: 10, color: '#334155', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {child.name}
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginTop: 1 }}>
                                <span
                                  style={{
                                    fontSize: 8,
                                    padding: '1px 4px',
                                    borderRadius: 20,
                                    background: cs.statusBg,
                                    color: cs.statusText,
                                  }}
                                >
                                  {child.status}
                                </span>
                                <span style={{ fontSize: 8, color: '#94a3b8' }}>{child.percent}</span>
                              </div>
                            </div>
                          </div>
                        </foreignObject>
                      </g>
                    );
                  })}
              </g>
            );
          })}

          {/* ── Right Nodes ── */}
          {rightNodes.map((node, idx) => {
            const nodeY = RIGHT_START_Y + idx * (RIGHT_H + RIGHT_GAP);
            const styles = getHealthStyles(node.health);
            return (
              <g key={node.id}>
                <rect
                  x={RIGHT_X}
                  y={nodeY}
                  width={RIGHT_W}
                  height={RIGHT_H}
                  rx={6}
                  fill="white"
                  stroke="#e2e8f0"
                  strokeWidth={1}
                  filter="url(#sdg-shadow)"
                />
                {/* left accent stripe */}
                <rect
                  x={RIGHT_X}
                  y={nodeY + 2}
                  width={3.5}
                  height={RIGHT_H - 4}
                  rx={1.75}
                  fill={styles.borderAccent}
                />
                <foreignObject x={RIGHT_X + 5} y={nodeY} width={RIGHT_W - 5} height={RIGHT_H}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      height: '100%',
                      paddingLeft: 4,
                      paddingRight: 8,
                    }}
                  >
                    <Wrench style={{ width: 12, height: 12, color: '#94a3b8', flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 11, color: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {node.name}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                        <span
                          style={{
                            fontSize: 9,
                            padding: '1px 5px',
                            borderRadius: 20,
                            background: styles.statusBg,
                            color: styles.statusText,
                          }}
                        >
                          {node.status}
                        </span>
                        <span style={{ fontSize: 9, color: '#94a3b8' }}>{node.percent}</span>
                      </div>
                    </div>
                    {/* Health dot */}
                    <span
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        background: styles.dotColor,
                        flexShrink: 0,
                      }}
                    />
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}