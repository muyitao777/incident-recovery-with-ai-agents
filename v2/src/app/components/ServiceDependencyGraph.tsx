import { useState } from 'react';

const leftNodes = [
  { id: 'versiontwo',         name: 'versiontwo',         errors: '0',   uptime: '99.99%', health: 'healthy' },
  { id: 'websacctdgcons',     name: 'websacctdgcons',     errors: '14',  uptime: '87.3%',  health: 'error'   },
  { id: 'sorchapi',           name: 'sorchapi',           errors: '0',   uptime: '100%',   health: 'healthy' },
  { id: 'websasyncapiclient', name: 'websasyncapiclient', errors: '3',   uptime: '94.1%',  health: 'warning' },
  { id: 'mdaeventconsumer',   name: 'mdaeventconsumer',   errors: 'N/A', uptime: 'N/A',    health: 'healthy' },
  { id: 'websaccountapi',     name: 'websaccountapi',     errors: 'N/A', uptime: 'N/A',    health: 'healthy' },
];

const rightNodes = [
  { id: 'dgorchestrator',             name: 'dgorchestrator',             errors: '0',  uptime: '99.99%', health: 'healthy' },
  { id: 'identityapi',                name: 'identityapi',                errors: '27', uptime: '81.5%',  health: 'error'   },
  { id: 'authzdecisionservice',       name: 'authzdecisionservice',       errors: '0',  uptime: '100%',   health: 'healthy' },
  { id: 'identityapiprivate',         name: 'identityapiprivate',         errors: '8',  uptime: '91.2%',  health: 'warning' },
  { id: 'grantservice',               name: 'grantservice',               errors: '0',  uptime: '100%',   health: 'healthy' },
  { id: 'topicmanagementservice',     name: 'topicmanagementservice',     errors: '0',  uptime: '100%',   health: 'healthy' },
  { id: 'worldwideenterprisebilling', name: 'worldwideenterprisebilling', errors: '0',  uptime: '100%',   health: 'healthy' },
];

const centerNode = {
  id: 'worldwideenterpriseaccount',
  name: 'worldwideenterpriseaccount',
  errors: '41',
  uptime: '85.7%',
  health: 'error' as const,
};

// ── SVG coordinate constants ──────────────────────────────────────────────────
const VB_W  = 980;
const VB_H  = 580;
const NW    = 200;   // node width
const NH    = 58;    // node height
const NR    = 8;     // node border-radius

// Left column
const LX    = 48;           // node left edge
const LRE   = LX + NW;     // node right edge  = 248
const LBX   = 22;           // "+" button cx

// Right column
const RX    = 732;          // node left edge
const RBX   = 958;          // "+" button cx

// Centre node
const CX    = 390;          // node left edge
const CY    = 261;          // node top
const CMY   = CY + NH / 2; // vertical mid = 290
const CLE   = CX;           // left  edge = 390
const CRE   = CX + NW;     // right edge = 590

const BTN_R = 12;

// Y-centres of left nodes  (6 nodes, visual mid = 290, spacing = 88)
// avg = c0 + 2.5*88 = 290  →  c0 = 70
const LCY = Array.from({ length: 6 }, (_, i) => 70 + i * 88);
// → [70, 158, 246, 334, 422, 510]

// Y-centres of right nodes (7 nodes, node[3] centred at 290, spacing = 76)
// c[3] = c0 + 3*76 = 290  →  c0 = 62
const RCY = Array.from({ length: 7 }, (_, i) => 62 + i * 76);
// → [62, 138, 214, 290, 366, 442, 518]

// ── Sub-components ────────────────────────────────────────────────────────────

interface NodeProps {
  node: { name: string; errors: string; uptime: string; health?: string };
  x: number;
  y: number;
  isCenter?: boolean;
}

function GraphNode({ node, x, y, isCenter = false }: NodeProps) {
  const isError   = node.health === 'error';
  const isWarning = node.health === 'warning';

  const borderColor  = isCenter ? '#3b82f6' : isError ? '#ef4444' : isWarning ? '#f59e0b' : '#dde3ea';
  const borderWidth  = isCenter || isError || isWarning ? 2 : 1.5;
  const bgColor      = isError ? '#fff5f5' : isWarning ? '#fffbeb' : 'white';
  const badgeBg      = isError ? '#fee2e2' : isWarning ? '#fef3c7' : '#e9ecf0';
  const badgeText    = isError ? '#dc2626' : isWarning ? '#d97706' : '#64748b';
  const nameColor    = isError ? '#dc2626' : isWarning ? '#b45309' : '#475569';

  return (
    <g>
      <rect
        x={x} y={y} width={NW} height={NH} rx={NR}
        fill={bgColor}
        stroke={borderColor}
        strokeWidth={borderWidth}
        filter="url(#cardShadow)"
      />

      {/* Error pulse ring for error nodes */}
      {(isError || isWarning) && !isCenter && (
        <rect
          x={x - 2} y={y - 2} width={NW + 4} height={NH + 4} rx={NR + 2}
          fill="none"
          stroke={isError ? '#fca5a5' : '#fcd34d'}
          strokeWidth="1"
          opacity="0.6"
        />
      )}

      {/* Gear icon (symbol ref) */}
      <use href="#gearIcon" x={x + 11} y={y + 12} width={15} height={15} />

      {/* Node name */}
      <text
        x={x + 31} y={y + 22}
        fontSize="11.5"
        fill={nameColor}
        fontFamily="'Avenir Next', 'Inter', sans-serif"
        fontWeight={isError || isWarning ? '500' : '400'}
        style={{ letterSpacing: '-0.01em' }}
      >
        {node.name.length > 20 ? node.name.slice(0, 20) + '…' : node.name}
      </text>

      {/* Error badge */}
      <rect x={x + 11} y={y + 32} width={30} height={16} rx={4} fill={badgeBg} />
      <text x={x + 26} y={y + 43.5} textAnchor="middle" fontSize="10" fill={badgeText} fontWeight={isError || isWarning ? '600' : '400'}>
        {node.errors}
      </text>

      {/* Uptime badge */}
      <rect x={x + 46} y={y + 32} width={46} height={16} rx={4} fill={badgeBg} />
      <text x={x + 69} y={y + 43.5} textAnchor="middle" fontSize="10" fill={badgeText}>
        {node.uptime}
      </text>
    </g>
  );
}

function PlusBtn({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g style={{ cursor: 'pointer' }}>
      <circle cx={cx} cy={cy} r={BTN_R} fill="white" stroke="#93c5fd" strokeWidth="1.5" />
      <text
        x={cx} y={cy + 4.5}
        textAnchor="middle"
        fontSize="15"
        fill="#3b82f6"
        fontWeight="300"
        style={{ userSelect: 'none' }}
      >
        +
      </text>
    </g>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export interface ServiceDependencyGraphProps {
  nodeData?: unknown;
  selectedNode?: unknown;
  hoveredNode?: unknown;
  handleNodeClick?: (nodeId: string) => void;
  setHoveredNode?: (id: string | null) => void;
}

export function ServiceDependencyGraph(_props: ServiceDependencyGraphProps) {
  return (
    <div
      className="rounded-[10px] overflow-hidden bg-white border border-slate-200"
      style={{ height: '600px' }}
    >
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Dot-grid background pattern */}
          <pattern id="dotGrid" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="11" cy="11" r="1.1" fill="#dde3ea" />
          </pattern>

          {/* Subtle card drop-shadow */}
          <filter id="cardShadow" x="-10%" y="-20%" width="120%" height="160%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#00000015" />
          </filter>

          {/* Gear / Settings icon as a reusable symbol */}
          <symbol id="gearIcon" viewBox="0 0 24 24">
            <path
              d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
              fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            />
            <circle cx="12" cy="12" r="3" fill="none" stroke="#94a3b8" strokeWidth="2" />
          </symbol>
        </defs>

        {/* ── Background ── */}
        <rect width={VB_W} height={VB_H} fill="white" />
        <rect width={VB_W} height={VB_H} fill="url(#dotGrid)" />

        {/* ── Bezier lines: centre → left nodes ── */}
        {LCY.map((cy, i) => {
          const h = leftNodes[i].health;
          const stroke = h === 'error' ? '#fca5a5' : h === 'warning' ? '#fcd34d' : '#b0bec8';
          const width  = h === 'error' ? 2 : h === 'warning' ? 1.8 : 1.3;
          return (
            <path
              key={`ll-${i}`}
              d={`M ${CLE} ${CMY} C ${(CLE + LRE) / 2} ${CMY} ${LRE} ${cy} ${LRE} ${cy}`}
              fill="none"
              stroke={stroke}
              strokeWidth={width}
              strokeDasharray={h === 'error' ? '5 3' : undefined}
            />
          );
        })}

        {/* ── Bezier lines: centre → right nodes ── */}
        {RCY.map((cy, i) => {
          const h = rightNodes[i].health;
          const stroke = h === 'error' ? '#fca5a5' : h === 'warning' ? '#fcd34d' : '#b0bec8';
          const width  = h === 'error' ? 2 : h === 'warning' ? 1.8 : 1.3;
          return (
            <path
              key={`rl-${i}`}
              d={`M ${CRE} ${CMY} C ${(CRE + RX) / 2} ${CMY} ${RX} ${cy} ${RX} ${cy}`}
              fill="none"
              stroke={stroke}
              strokeWidth={width}
              strokeDasharray={h === 'error' ? '5 3' : undefined}
            />
          );
        })}

        {/* ── Left nodes ── */}
        {leftNodes.map((node, i) => (
          <g key={node.id}>
            <PlusBtn cx={LBX} cy={LCY[i]} />
            <GraphNode node={node} x={LX} y={LCY[i] - NH / 2} />
          </g>
        ))}

        {/* ── Right nodes ── */}
        {rightNodes.map((node, i) => (
          <g key={node.id}>
            <GraphNode node={node} x={RX} y={RCY[i] - NH / 2} />
            <PlusBtn cx={RBX} cy={RCY[i]} />
          </g>
        ))}

        {/* ── Centre node (drawn last so it sits on top) ── */}
        <GraphNode node={centerNode} x={CX} y={CY} isCenter />
      </svg>
    </div>
  );
}