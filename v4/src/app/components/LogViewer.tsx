import { AlertTriangle, AlertCircle, Info, Search } from 'lucide-react';

interface LogEntry {
  timestamp: string;
  level: 'error' | 'warn' | 'info' | 'debug';
  service: string;
  message: string;
  metadata?: Record<string, any>;
}

const logs: LogEntry[] = [
  {
    timestamp: '15:42:13.234',
    level: 'info',
    service: 'api-gateway',
    message: 'Incoming request: GET /api/users/profile',
    metadata: { request_id: 'req_8f3e9a2c', user_id: 'usr_7f8a9b2c' }
  },
  {
    timestamp: '15:42:13.246',
    level: 'info',
    service: 'auth-service',
    message: 'Validating JWT token for user usr_7f8a9b2c',
    metadata: { request_id: 'req_8f3e9a2c' }
  },
  {
    timestamp: '15:42:13.291',
    level: 'info',
    service: 'auth-service',
    message: 'Token validation successful',
    metadata: { request_id: 'req_8f3e9a2c', duration_ms: 45 }
  },
  {
    timestamp: '15:42:13.323',
    level: 'info',
    service: 'cache-layer',
    message: 'Attempting cache lookup for key: user:profile:usr_7f8a9b2c',
    metadata: { request_id: 'req_8f3e9a2c', cache_key: 'user:profile:usr_7f8a9b2c' }
  },
  {
    timestamp: '15:42:13.334',
    level: 'warn',
    service: 'cache-layer',
    message: 'Redis connection pool at capacity, waiting for available connection',
    metadata: { 
      request_id: 'req_8f3e9a2c',
      pool_size: 100,
      active_connections: 100,
      idle_connections: 0,
      queue_depth: 47
    }
  },
  {
    timestamp: '15:42:13.557',
    level: 'warn',
    service: 'redis-cache',
    message: 'Connection acquisition timeout warning (223ms elapsed)',
    metadata: { request_id: 'req_8f3e9a2c', elapsed_ms: 223 }
  },
  {
    timestamp: '15:42:13.891',
    level: 'warn',
    service: 'redis-cache',
    message: 'Connection acquisition timeout warning (557ms elapsed)',
    metadata: { request_id: 'req_8f3e9a2c', elapsed_ms: 557 }
  },
  {
    timestamp: '15:42:14.234',
    level: 'warn',
    service: 'redis-cache',
    message: 'Connection acquisition timeout warning (900ms elapsed)',
    metadata: { request_id: 'req_8f3e9a2c', elapsed_ms: 900 }
  },
  {
    timestamp: '15:42:14.657',
    level: 'warn',
    service: 'redis-cache',
    message: 'Connection acquisition timeout warning (1323ms elapsed)',
    metadata: { request_id: 'req_8f3e9a2c', elapsed_ms: 1323 }
  },
  {
    timestamp: '15:42:14.954',
    level: 'error',
    service: 'redis-cache',
    message: 'Connection pool exhausted - timeout after 1620ms',
    metadata: { 
      request_id: 'req_8f3e9a2c',
      error: 'ConnectionPoolExhausted',
      timeout_ms: 1620,
      pool_stats: {
        total: 100,
        active: 100,
        idle: 0,
        pending: 52
      }
    }
  },
  {
    timestamp: '15:42:14.977',
    level: 'error',
    service: 'cache-layer',
    message: 'Cache operation failed: ConnectionPoolExhausted',
    metadata: { 
      request_id: 'req_8f3e9a2c',
      operation: 'GET',
      key: 'user:profile:usr_7f8a9b2c',
      error_type: 'ConnectionPoolExhausted',
      duration_ms: 1654
    }
  },
  {
    timestamp: '15:42:14.989',
    level: 'warn',
    service: 'cache-layer',
    message: 'Falling back to database query due to cache failure',
    metadata: { request_id: 'req_8f3e9a2c' }
  },
  {
    timestamp: '15:42:15.001',
    level: 'info',
    service: 'user-service',
    message: 'Executing database query: SELECT * FROM users WHERE id = $1',
    metadata: { request_id: 'req_8f3e9a2c', user_id: 'usr_7f8a9b2c' }
  },
  {
    timestamp: '15:42:15.079',
    level: 'info',
    service: 'user-service',
    message: 'Database query completed successfully',
    metadata: { request_id: 'req_8f3e9a2c', rows_returned: 1, duration_ms: 78 }
  },
  {
    timestamp: '15:42:15.081',
    level: 'error',
    service: 'api-gateway',
    message: 'Request completed with degraded performance due to cache failure',
    metadata: { 
      request_id: 'req_8f3e9a2c',
      status_code: 200,
      total_duration_ms: 1847,
      cache_miss: true,
      fallback_used: true
    }
  }
];

export function LogViewer() {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'error':
        return 'text-red-600';
      case 'warn':
        return 'text-amber-600';
      case 'info':
        return 'text-blue-600';
      default:
        return 'text-slate-600';
    }
  };

  return (
    <div className="space-y-3">
      {/* Simple search bar */}
      <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded px-3 py-2">
        <Search className="w-4 h-4 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search logs..."
          className="flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
        />
      </div>

      {/* Log entries */}
      <div className="bg-white border border-slate-200 rounded overflow-hidden">
        <div className="max-h-[500px] overflow-y-auto font-mono text-xs">
          {logs.map((log, idx) => (
            <div 
              key={idx} 
              className="flex gap-3 px-3 py-2 hover:bg-slate-50 border-b border-slate-100 last:border-b-0"
            >
              <span className="text-slate-500 flex-shrink-0">{log.timestamp}</span>
              <span className={`font-semibold flex-shrink-0 w-12 ${getLevelColor(log.level)}`}>
                {log.level.toUpperCase()}
              </span>
              <span className="text-slate-700 flex-shrink-0 w-28">{log.service}</span>
              <span className="text-slate-900 flex-1">{log.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}