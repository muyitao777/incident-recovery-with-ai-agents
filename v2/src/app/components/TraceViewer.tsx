import { useState } from 'react';
import { ChevronRight, ChevronDown, AlertTriangle, CheckCircle, Clock, Hash, Layers } from 'lucide-react';

interface TraceSpan {
  id: string;
  service: string;
  operation: string;
  duration: number;
  startTime: number;
  status: 'success' | 'error' | 'warning';
  children?: TraceSpan[];
  tags?: Record<string, string>;
  logs?: { timestamp: number; message: string }[];
}

const traceData: TraceSpan[] = [
  {
    id: 'span-1',
    service: 'api-gateway',
    operation: 'HTTP GET /api/users/profile',
    duration: 2347,
    startTime: 0,
    status: 'error',
    tags: {
      'http.method': 'GET',
      'http.url': '/api/users/profile',
      'http.status_code': '500',
      'error': 'true',
      'client.ip': '192.168.1.45',
    },
    children: [
      {
        id: 'span-2',
        service: 'rate-limiter',
        operation: 'check_rate_limit',
        duration: 8,
        startTime: 5,
        status: 'success',
        tags: { 'user_id': 'usr_7f8a9b2c', 'limit': '1000/min', 'current': '234' },
      },
      {
        id: 'span-3',
        service: 'auth-service',
        operation: 'validate_token',
        duration: 45,
        startTime: 18,
        status: 'success',
        tags: { 'user_id': 'usr_7f8a9b2c', 'auth.method': 'JWT', 'token.expires': '2026-04-10T15:42:13Z' },
      },
      {
        id: 'span-4',
        service: 'permission-service',
        operation: 'check_permissions',
        duration: 32,
        startTime: 68,
        status: 'success',
        tags: { 'user_id': 'usr_7f8a9b2c', 'resource': 'user.profile', 'action': 'read', 'allowed': 'true' },
      },
      {
        id: 'span-5',
        service: 'cache-layer',
        operation: 'redis.get',
        duration: 1654,
        startTime: 105,
        status: 'error',
        tags: {
          'cache.key': 'user:profile:usr_7f8a9b2c',
          'cache.hit': 'false',
          'error.type': 'ConnectionPoolExhausted',
        },
        logs: [
          { timestamp: 105,  message: 'Attempting to acquire connection from pool' },
          { timestamp: 250,  message: 'Pool exhausted, waiting for available connection…' },
          { timestamp: 1759, message: 'Connection timeout after 1654ms' },
        ],
        children: [
          {
            id: 'span-6',
            service: 'redis-cache',
            operation: 'connection.acquire',
            duration: 1620,
            startTime: 115,
            status: 'error',
            tags: { 'pool.size': '100', 'pool.active': '100', 'pool.idle': '0', 'error': 'ConnectionPoolExhausted' },
          },
        ],
      },
      {
        id: 'span-7',
        service: 'user-service',
        operation: 'get_user_profile',
        duration: 452,
        startTime: 1785,
        status: 'success',
        tags: { 'user_id': 'usr_7f8a9b2c', 'fallback': 'true' },
        children: [
          {
            id: 'span-8',
            service: 'user-service',
            operation: 'db.query.getUserProfile',
            duration: 78,
            startTime: 1790,
            status: 'success',
            tags: { 'db.type': 'postgres', 'db.statement': 'SELECT * FROM users WHERE id = $1', 'db.rows': '1' },
          },
          {
            id: 'span-9',
            service: 'user-service',
            operation: 'db.query.getUserPreferences',
            duration: 65,
            startTime: 1875,
            status: 'success',
            tags: { 'db.type': 'postgres', 'db.statement': 'SELECT * FROM preferences WHERE user_id = $1', 'db.rows': '1' },
          },
          {
            id: 'span-10',
            service: 'media-service',
            operation: 'get_avatar_url',
            duration: 145,
            startTime: 1945,
            status: 'success',
            tags: { 'user_id': 'usr_7f8a9b2c', 'cdn.url': 'https://cdn.example.com/avatars/usr_7f8a9b2c.jpg' },
            children: [
              {
                id: 'span-11',
                service: 'cdn-service',
                operation: 'generate_signed_url',
                duration: 12,
                startTime: 1950,
                status: 'success',
                tags: { 'cdn.bucket': 'user-avatars', 'cdn.key': 'usr_7f8a9b2c.jpg', 'expiry': '3600s' },
              },
              {
                id: 'span-12',
                service: 'cdn-service',
                operation: 'check_file_exists',
                duration: 89,
                startTime: 1968,
                status: 'success',
                tags: { 'cdn.bucket': 'user-avatars', 'cdn.key': 'usr_7f8a9b2c.jpg', 'exists': 'true' },
              },
            ],
          },
          {
            id: 'span-13',
            service: 'activity-service',
            operation: 'get_recent_activity',
            duration: 156,
            startTime: 2095,
            status: 'success',
            tags: { 'user_id': 'usr_7f8a9b2c', 'limit': '10' },
            children: [
              {
                id: 'span-14',
                service: 'activity-service',
                operation: 'db.query.getActivities',
                duration: 142,
                startTime: 2105,
                status: 'success',
                tags: { 'db.type': 'postgres', 'db.statement': 'SELECT * FROM activities WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2', 'db.rows': '10' },
              },
            ],
          },
        ],
      },
      {
        id: 'span-15',
        service: 'analytics-service',
        operation: 'track_profile_view',
        duration: 23,
        startTime: 2260,
        status: 'success',
        tags: { 'user_id': 'usr_7f8a9b2c', 'event': 'profile.view', 'async': 'true' },
      },
      {
        id: 'span-16',
        service: 'logging-service',
        operation: 'log_request',
        duration: 15,
        startTime: 2290,
        status: 'success',
        tags: { 'log.level': 'info', 'request_id': 'req_8f3e9a2c' },
      },
    ],
  },
];

// ── Service colour palette ────────────────────────────────────────────────────
const SERVICE_COLORS: Record<string, { bar: string; pill: string; text: string }> = {
  'api-gateway':        { bar: 'bg-blue-500',    pill: 'bg-blue-100',    text: 'text-blue-700'    },
  'rate-limiter':       { bar: 'bg-sky-400',     pill: 'bg-sky-100',     text: 'text-sky-700'     },
  'auth-service':       { bar: 'bg-violet-400',  pill: 'bg-violet-100',  text: 'text-violet-700'  },
  'permission-service': { bar: 'bg-violet-400',  pill: 'bg-violet-100',  text: 'text-violet-700'  },
  'cache-layer':        { bar: 'bg-rose-500',    pill: 'bg-rose-100',    text: 'text-rose-700'    },
  'redis-cache':        { bar: 'bg-rose-400',    pill: 'bg-rose-100',    text: 'text-rose-700'    },
  'user-service':       { bar: 'bg-emerald-400', pill: 'bg-emerald-100', text: 'text-emerald-700' },
  'media-service':      { bar: 'bg-amber-400',   pill: 'bg-amber-100',   text: 'text-amber-700'   },
  'cdn-service':        { bar: 'bg-amber-300',   pill: 'bg-amber-100',   text: 'text-amber-700'   },
  'activity-service':   { bar: 'bg-teal-400',    pill: 'bg-teal-100',    text: 'text-teal-700'    },
  'analytics-service':  { bar: 'bg-purple-400',  pill: 'bg-purple-100',  text: 'text-purple-700'  },
  'logging-service':    { bar: 'bg-slate-400',   pill: 'bg-slate-100',   text: 'text-slate-600'   },
};

function getServiceColor(service: string) {
  return SERVICE_COLORS[service] ?? { bar: 'bg-slate-400', pill: 'bg-slate-100', text: 'text-slate-600' };
}

// ── Count all spans recursively ───────────────────────────────────────────────
function countSpans(spans: TraceSpan[]): { total: number; errors: number } {
  return spans.reduce(
    (acc, s) => {
      acc.total++;
      if (s.status === 'error') acc.errors++;
      if (s.children) {
        const child = countSpans(s.children);
        acc.total += child.total;
        acc.errors += child.errors;
      }
      return acc;
    },
    { total: 0, errors: 0 },
  );
}

// ── Timeline tick labels ──────────────────────────────────────────────────────
const TICK_PCTS = [0, 25, 50, 75, 100];

// ── Main component ────────────────────────────────────────────────────────────
export function TraceViewer() {
  const [expanded, setExpanded]     = useState<Set<string>>(new Set(['span-1', 'span-5', 'span-7']));
  const [selected, setSelected]     = useState<string | null>('span-5');

  const TOTAL = traceData[0].duration;
  const stats = countSpans(traceData);

  const toggle = (id: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // ── Span row renderer ───────────────────────────────────────────────────────
  const renderSpan = (span: TraceSpan, depth: number, isLast: boolean, ancestorIsLast: boolean[]): React.ReactNode => {
    const isExpanded   = expanded.has(span.id);
    const hasChildren  = !!span.children?.length;
    const isSelected   = selected === span.id;
    const isError      = span.status === 'error';
    const colors       = getServiceColor(span.service);
    const barLeft      = (span.startTime / TOTAL) * 100;
    const barWidth     = Math.max((span.duration / TOTAL) * 100, 0.4);

    return (
      <div key={span.id}>
        {/* ── Row ── */}
        <div
          className={`group flex items-stretch border-b border-slate-100 cursor-pointer transition-colors ${
            isSelected ? 'bg-blue-50/60' : 'hover:bg-slate-50/80'
          } ${isError ? 'border-l-2 border-l-red-400' : 'border-l-2 border-l-transparent'}`}
          onClick={() => { setSelected(span.id === selected ? null : span.id); if (hasChildren) toggle(span.id); }}
        >
          {/* Left panel – service + operation */}
          <div className="w-[360px] flex-shrink-0 flex items-center gap-0 pr-3 py-[7px]">
            {/* Depth indentation with tree guides */}
            <div className="flex items-center flex-shrink-0" style={{ width: depth * 18 }}>
              {Array.from({ length: depth }).map((_, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 h-full"
                  style={{ width: 18 }}
                >
                  {/* Vertical tree line */}
                  {!ancestorIsLast[i] && (
                    <div className="mx-auto w-px h-full bg-slate-200" style={{ marginLeft: 9 }} />
                  )}
                </div>
              ))}
            </div>

            {/* Expand / leaf chevron */}
            <div className="w-5 flex-shrink-0 flex items-center justify-center text-slate-400">
              {hasChildren ? (
                isExpanded
                  ? <ChevronDown className="w-3.5 h-3.5" />
                  : <ChevronRight className="w-3.5 h-3.5" />
              ) : (
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              )}
            </div>

            {/* Status dot */}
            <div className="flex-shrink-0 mx-1.5">
              {isError
                ? <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                : <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              }
            </div>

            {/* Service pill */}
            <span className={`flex-shrink-0 text-[10px] px-1.5 py-0.5 rounded ${colors.pill} ${colors.text} mr-2 max-w-[100px] truncate`}>
              {span.service}
            </span>

            {/* Operation */}
            <span className="text-xs text-slate-600 truncate">{span.operation}</span>
          </div>

          {/* Right panel – timeline */}
          <div className="flex-1 relative flex items-center px-3 py-[7px]">
            {/* Bar */}
            <div className="absolute inset-y-2 left-3 right-14 pointer-events-none">
              <div
                className={`absolute h-full rounded-sm ${isError ? 'bg-red-400' : colors.bar} opacity-80`}
                style={{ left: `${barLeft}%`, width: `${barWidth}%` }}
              />
            </div>

            {/* Duration label – right-aligned */}
            <div className={`absolute right-3 text-[11px] font-mono ${isError ? 'text-red-500' : 'text-slate-500'}`}>
              {span.duration >= 1000 ? `${(span.duration / 1000).toFixed(2)}s` : `${span.duration}ms`}
            </div>
          </div>
        </div>

        {/* ── Expanded detail panel ── */}
        {isSelected && (
          <div className="border-b border-slate-100 bg-slate-50/70">
            {/* Tags */}
            {span.tags && (
              <div className="px-4 pt-2.5 pb-2 grid grid-cols-2 gap-x-6 gap-y-1">
                {Object.entries(span.tags).map(([k, v]) => (
                  <div key={k} className="flex items-baseline gap-2 min-w-0">
                    <span className="text-[10px] font-mono text-slate-400 flex-shrink-0">{k}</span>
                    <span className={`text-[10px] font-mono truncate ${
                      k === 'error' || k === 'error.type' ? 'text-red-600' : 'text-slate-700'
                    }`}>{v}</span>
                  </div>
                ))}
              </div>
            )}
            {/* Logs */}
            {span.logs && (
              <div className="mx-4 mb-2.5 mt-1 rounded-md bg-slate-50 border border-slate-200 px-3 py-2 space-y-1">
                {span.logs.map((log, i) => (
                  <div key={i} className="flex items-start gap-2 text-[11px] font-mono">
                    <span className="text-amber-600 flex-shrink-0">+{log.timestamp}ms</span>
                    <span className="text-slate-600">{log.message}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Children ── */}
        {isExpanded && hasChildren &&
          span.children!.map((child, idx) =>
            renderSpan(
              child,
              depth + 1,
              idx === span.children!.length - 1,
              [...ancestorIsLast, isLast],
            )
          )
        }
      </div>
    );
  };

  return (
    <div className="space-y-3">
      {/* ── Trace summary header ── */}
      <div className="flex items-center gap-4 px-4 py-3 bg-white border border-slate-200 rounded-[10px] shadow-card">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Hash className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-mono text-slate-700">trace_8f3e9a2c1b5d</span>
        </div>
        <div className="h-4 w-px bg-slate-200" />
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-mono text-slate-700">{TOTAL.toLocaleString()}ms</span>
        </div>
        <div className="h-4 w-px bg-slate-200" />
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Layers className="w-3.5 h-3.5 text-slate-400" />
          <span>{stats.total} spans</span>
        </div>
        <div className="h-4 w-px bg-slate-200" />
        <div className="flex items-center gap-3 ml-auto">
          <span className="text-xs px-2 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200">
            {stats.errors} error{stats.errors !== 1 ? 's' : ''}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
            {stats.total - stats.errors} success
          </span>
        </div>
      </div>

      {/* ── Waterfall ── */}
      <div className="bg-white border border-slate-200 rounded-[10px] shadow-card overflow-hidden">
        {/* Column headers + ruler */}
        <div className="flex items-stretch border-b border-slate-200 bg-slate-50">
          {/* Left header */}
          <div className="w-[360px] flex-shrink-0 flex items-center px-3 py-2 border-r border-slate-200">
            <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400">Service · Operation</span>
          </div>
          {/* Timeline ruler */}
          <div className="flex-1 relative px-3 py-2">
            <div className="relative h-full">
              {TICK_PCTS.map(pct => (
                <div
                  key={pct}
                  className="absolute top-0 flex flex-col items-center"
                  style={{ left: `${pct}%`, transform: pct === 100 ? 'translateX(-100%)' : pct > 0 ? 'translateX(-50%)' : undefined }}
                >
                  <span className="text-[10px] font-mono text-slate-400 leading-none">
                    {Math.round((pct / 100) * TOTAL)}ms
                  </span>
                </div>
              ))}
              {/* Tick lines overlay */}
              {TICK_PCTS.filter(p => p > 0 && p < 100).map(pct => (
                <div
                  key={pct}
                  className="absolute top-0 bottom-0 w-px bg-slate-200"
                  style={{ left: `${pct}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Span rows */}
        <div className="overflow-y-auto max-h-[440px]">
          {traceData.map((span, idx) =>
            renderSpan(span, 0, idx === traceData.length - 1, [])
          )}
        </div>
      </div>
    </div>
  );
}