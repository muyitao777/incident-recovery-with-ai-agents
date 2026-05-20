import { Clock, AlertTriangle, CheckCircle, ChevronRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';

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
      'client.ip': '192.168.1.45'
    },
    children: [
      {
        id: 'span-2',
        service: 'rate-limiter',
        operation: 'check_rate_limit',
        duration: 8,
        startTime: 5,
        status: 'success',
        tags: {
          'user_id': 'usr_7f8a9b2c',
          'limit': '1000/min',
          'current': '234'
        }
      },
      {
        id: 'span-3',
        service: 'auth-service',
        operation: 'validate_token',
        duration: 45,
        startTime: 18,
        status: 'success',
        tags: {
          'user_id': 'usr_7f8a9b2c',
          'auth.method': 'JWT',
          'token.expires': '2026-01-29T15:42:13Z'
        }
      },
      {
        id: 'span-4',
        service: 'permission-service',
        operation: 'check_permissions',
        duration: 32,
        startTime: 68,
        status: 'success',
        tags: {
          'user_id': 'usr_7f8a9b2c',
          'resource': 'user.profile',
          'action': 'read',
          'allowed': 'true'
        }
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
          'error.type': 'ConnectionPoolExhausted'
        },
        logs: [
          { timestamp: 105, message: 'Attempting to acquire connection from pool' },
          { timestamp: 250, message: 'Pool exhausted, waiting for available connection...' },
          { timestamp: 1759, message: 'Connection timeout after 1654ms' }
        ],
        children: [
          {
            id: 'span-6',
            service: 'redis-cache',
            operation: 'connection.acquire',
            duration: 1620,
            startTime: 115,
            status: 'error',
            tags: {
              'pool.size': '100',
              'pool.active': '100',
              'pool.idle': '0',
              'error': 'ConnectionPoolExhausted'
            }
          }
        ]
      },
      {
        id: 'span-7',
        service: 'user-service',
        operation: 'get_user_profile',
        duration: 452,
        startTime: 1785,
        status: 'success',
        tags: {
          'user_id': 'usr_7f8a9b2c',
          'fallback': 'true'
        },
        children: [
          {
            id: 'span-8',
            service: 'user-service',
            operation: 'db.query.getUserProfile',
            duration: 78,
            startTime: 1790,
            status: 'success',
            tags: {
              'db.type': 'postgres',
              'db.statement': 'SELECT * FROM users WHERE id = $1',
              'db.rows': '1'
            }
          },
          {
            id: 'span-9',
            service: 'user-service',
            operation: 'db.query.getUserPreferences',
            duration: 65,
            startTime: 1875,
            status: 'success',
            tags: {
              'db.type': 'postgres',
              'db.statement': 'SELECT * FROM preferences WHERE user_id = $1',
              'db.rows': '1'
            }
          },
          {
            id: 'span-10',
            service: 'media-service',
            operation: 'get_avatar_url',
            duration: 145,
            startTime: 1945,
            status: 'success',
            tags: {
              'user_id': 'usr_7f8a9b2c',
              'cdn.url': 'https://cdn.example.com/avatars/usr_7f8a9b2c.jpg'
            },
            children: [
              {
                id: 'span-11',
                service: 'cdn-service',
                operation: 'generate_signed_url',
                duration: 12,
                startTime: 1950,
                status: 'success',
                tags: {
                  'cdn.bucket': 'user-avatars',
                  'cdn.key': 'usr_7f8a9b2c.jpg',
                  'expiry': '3600s'
                }
              },
              {
                id: 'span-12',
                service: 'cdn-service',
                operation: 'check_file_exists',
                duration: 89,
                startTime: 1968,
                status: 'success',
                tags: {
                  'cdn.bucket': 'user-avatars',
                  'cdn.key': 'usr_7f8a9b2c.jpg',
                  'exists': 'true'
                }
              }
            ]
          },
          {
            id: 'span-13',
            service: 'activity-service',
            operation: 'get_recent_activity',
            duration: 156,
            startTime: 2095,
            status: 'success',
            tags: {
              'user_id': 'usr_7f8a9b2c',
              'limit': '10'
            },
            children: [
              {
                id: 'span-14',
                service: 'activity-service',
                operation: 'db.query.getActivities',
                duration: 142,
                startTime: 2105,
                status: 'success',
                tags: {
                  'db.type': 'postgres',
                  'db.statement': 'SELECT * FROM activities WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2',
                  'db.rows': '10'
                }
              }
            ]
          }
        ]
      },
      {
        id: 'span-15',
        service: 'analytics-service',
        operation: 'track_profile_view',
        duration: 23,
        startTime: 2260,
        status: 'success',
        tags: {
          'user_id': 'usr_7f8a9b2c',
          'event': 'profile.view',
          'async': 'true'
        }
      },
      {
        id: 'span-16',
        service: 'logging-service',
        operation: 'log_request',
        duration: 15,
        startTime: 2290,
        status: 'success',
        tags: {
          'log.level': 'info',
          'request_id': 'req_8f3e9a2c'
        }
      }
    ]
  }
];

export function TraceViewer() {
  const [expandedSpans, setExpandedSpans] = useState<Set<string>>(new Set(['span-1', 'span-5']));

  const toggleSpan = (spanId: string) => {
    const newExpanded = new Set(expandedSpans);
    if (newExpanded.has(spanId)) {
      newExpanded.delete(spanId);
    } else {
      newExpanded.add(spanId);
    }
    setExpandedSpans(newExpanded);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-3.5 h-3.5 text-green-600" />;
      case 'error':
        return <AlertTriangle className="w-3.5 h-3.5 text-red-600" />;
      default:
        return <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-cyan-500';
      case 'error':
        return 'bg-purple-500';
      default:
        return 'bg-orange-500';
    }
  };

  const getServiceColor = (service: string) => {
    // Muted professional color palette with soft, desaturated tones
    if (service.includes('gateway')) return 'bg-blue-400';
    if (service.includes('auth') || service.includes('permission')) return 'bg-violet-400';
    if (service.includes('cache') || service.includes('redis')) return 'bg-pink-400';
    if (service.includes('user-service')) return 'bg-emerald-400';
    if (service.includes('media') || service.includes('cdn')) return 'bg-orange-300';
    if (service.includes('activity')) return 'bg-teal-400';
    if (service.includes('analytics')) return 'bg-purple-400';
    if (service.includes('logging')) return 'bg-cyan-400';
    if (service.includes('rate')) return 'bg-sky-400';
    return 'bg-slate-400';
  };

  const renderSpan = (span: TraceSpan, depth: number = 0) => {
    const isExpanded = expandedSpans.has(span.id);
    const hasChildren = span.children && span.children.length > 0;
    const spanWidthPercent = (span.duration / traceData[0].duration) * 100;
    const spanLeftPercent = (span.startTime / traceData[0].duration) * 100;

    return (
      <div key={span.id}>
        <div 
          className="flex items-center gap-3 px-3 py-1.5 hover:bg-slate-50 border-b border-slate-100 cursor-pointer"
          style={{ paddingLeft: `${depth * 24 + 12}px` }}
          onClick={() => hasChildren && toggleSpan(span.id)}
        >
          {/* Service and operation */}
          <div className="flex items-center gap-2 min-w-[280px]">
            {hasChildren ? (
              isExpanded ? 
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" /> : 
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            ) : (
              <div className="w-3.5" />
            )}
            {getStatusIcon(span.status)}
            <span className="text-xs font-semibold text-slate-900">{span.service}</span>
            <span className="text-xs text-slate-500">·</span>
            <span className="text-xs text-slate-600 truncate">{span.operation}</span>
          </div>
          
          {/* Duration */}
          <div className="text-xs font-mono text-slate-700 min-w-[60px]">
            {span.duration}ms
          </div>
          
          {/* Timeline bar */}
          <div className="flex-1 h-4 bg-slate-100 rounded relative">
            <div 
              className={`absolute h-full rounded ${getServiceColor(span.service)}`}
              style={{ 
                left: `${spanLeftPercent}%`,
                width: `${Math.max(spanWidthPercent, 1)}%`
              }}
            />
          </div>
        </div>

        {/* Tags */}
        {isExpanded && span.tags && (
          <div className="px-3 py-2 bg-slate-50 border-b border-slate-100 text-xs font-mono" style={{ paddingLeft: `${(depth + 1) * 24 + 12}px` }}>
            {Object.entries(span.tags).map(([key, value]) => (
              <div key={key} className="text-slate-600">
                <span className="text-slate-500">{key}:</span> {value}
              </div>
            ))}
          </div>
        )}

        {/* Logs */}
        {isExpanded && span.logs && (
          <div className="px-3 py-2 bg-amber-50 border-b border-slate-100 text-xs font-mono" style={{ paddingLeft: `${(depth + 1) * 24 + 12}px` }}>
            {span.logs.map((log, idx) => (
              <div key={idx} className="text-slate-700">
                <span className="text-amber-600">[+{log.timestamp}ms]</span> {log.message}
              </div>
            ))}
          </div>
        )}

        {/* Children */}
        {isExpanded && hasChildren && span.children!.map(child => 
          renderSpan(child, depth + 1)
        )}
      </div>
    );
  };

  return (
    <div className="space-y-3">
      {/* Simple header */}
      <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border border-slate-200 rounded text-xs">
        <span className="font-mono text-slate-700">Trace ID: trace_8f3e9a2c1b5d</span>
        <span className="text-slate-600">Duration: 2,347ms · 16 spans · 2 errors</span>
      </div>

      {/* Trace waterfall */}
      <div className="bg-white border border-slate-200 rounded overflow-hidden max-h-[500px] overflow-y-auto">
        {traceData.map(span => renderSpan(span))}
      </div>
    </div>
  );
}