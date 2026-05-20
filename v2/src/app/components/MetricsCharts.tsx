import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { Activity, Clock, TrendingUp } from 'lucide-react';

const errorRateData = [
  { time: '09:00', rate: 0.02, threshold: 0.5 },
  { time: '09:30', rate: 0.03, threshold: 0.5 },
  { time: '10:00', rate: 0.05, threshold: 0.5 },
  { time: '10:30', rate: 0.08, threshold: 0.5 },
  { time: '11:00', rate: 0.12, threshold: 0.5 },
  { time: '11:30', rate: 0.18, threshold: 0.5 },
  { time: '12:00', rate: 0.25, threshold: 0.5 },
  { time: '12:30', rate: 0.34, threshold: 0.5 },
  { time: '13:00', rate: 0.52, threshold: 0.5 },
  { time: '13:30', rate: 0.89, threshold: 0.5 },
  { time: '14:00', rate: 1.45, threshold: 0.5 },
  { time: '14:30', rate: 2.12, threshold: 0.5 },
  { time: '15:00', rate: 2.34, threshold: 0.5 },
  { time: '15:30', rate: 2.41, threshold: 0.5 },
  { time: '16:00', rate: 2.38, threshold: 0.5 },
  { time: '16:30', rate: 2.29, threshold: 0.5 },
  { time: '17:00', rate: 2.15, threshold: 0.5 },
  { time: '17:30', rate: 1.95, threshold: 0.5 },
];

const latencyData = [
  { time: '09:00', p50: 45, p95: 120, p99: 250 },
  { time: '09:30', p50: 48, p95: 125, p99: 260 },
  { time: '10:00', p50: 52, p95: 132, p99: 285 },
  { time: '10:30', p50: 58, p95: 148, p99: 320 },
  { time: '11:00', p50: 67, p95: 165, p99: 375 },
  { time: '11:30', p50: 78, p95: 189, p99: 425 },
  { time: '12:00', p50: 89, p95: 218, p99: 492 },
  { time: '12:30', p50: 103, p95: 256, p99: 568 },
  { time: '13:00', p50: 121, p95: 298, p99: 645 },
  { time: '13:30', p50: 138, p95: 342, p99: 728 },
  { time: '14:00', p50: 149, p95: 365, p99: 782 },
  { time: '14:30', p50: 155, p95: 378, p99: 815 },
  { time: '15:00', p50: 156, p95: 380, p99: 820 },
  { time: '15:30', p50: 154, p95: 375, p99: 808 },
  { time: '16:00', p50: 148, p95: 362, p99: 785 },
  { time: '16:30', p50: 142, p95: 345, p99: 752 },
  { time: '17:00', p50: 135, p95: 328, p99: 718 },
  { time: '17:30', p50: 128, p95: 310, p99: 682 },
];

const requestVolumeData = [
  { time: '09:00', requests: 3250, failed: 65 },
  { time: '09:30', requests: 3420, failed: 103 },
  { time: '10:00', requests: 3890, failed: 195 },
  { time: '10:30', requests: 4120, failed: 330 },
  { time: '11:00', requests: 4450, failed: 534 },
  { time: '11:30', requests: 4680, failed: 842 },
  { time: '12:00', requests: 4920, failed: 1230 },
  { time: '12:30', requests: 5050, failed: 1717 },
  { time: '13:00', requests: 5180, failed: 2694 },
  { time: '13:30', requests: 5340, failed: 4753 },
  { time: '14:00', requests: 5420, failed: 7859 },
  { time: '14:30', requests: 5280, failed: 11194 },
  { time: '15:00', requests: 5150, failed: 12051 },
  { time: '15:30', requests: 4980, failed: 12004 },
  { time: '16:00', requests: 4820, failed: 11476 },
  { time: '16:30', requests: 4650, failed: 10649 },
  { time: '17:00', requests: 4480, failed: 9632 },
  { time: '17:30', requests: 4310, failed: 8405 },
];

export function MetricsCharts() {
  return (
    <div className="space-y-3">
      {/* Error Rate Chart */}
      <div className="bg-white border border-slate-200 rounded-[10px] p-5 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-red-400" />
            <span className="text-sm font-normal text-slate-900">Error Rate Over Time</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Last 24h</span>
            <div className="flex items-center gap-1 px-2 py-0.5 bg-red-50 border border-red-200 rounded">
              <TrendingUp className="w-3 h-3 text-red-600" />
              <span className="text-xs font-medium text-red-700">+234%</span>
            </div>
          </div>
        </div>
        
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={errorRateData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="time" 
                stroke="#64748b" 
                style={{ fontSize: '11px' }}
                tick={{ fill: '#64748b' }}
              />
              <YAxis 
                stroke="#64748b" 
                style={{ fontSize: '11px' }}
                tick={{ fill: '#64748b' }}
                label={{ value: 'Error Rate (%)', angle: -90, position: 'insideLeft', style: { fill: '#64748b', fontSize: '11px' } }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <ReferenceLine y={0.5} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: 'Threshold', fill: '#f59e0b', fontSize: 11 }} />
              <Area 
                type="monotone" 
                dataKey="rate" 
                stroke="#ef4444" 
                strokeWidth={1.5}
                fill="none" 
                name="Error Rate %"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Latency Chart */}
      <div className="bg-white border border-slate-200 rounded-[10px] p-5 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-sm font-normal text-slate-900">Latency Percentiles</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Last 24h</span>
            <div className="flex items-center gap-1 px-2 py-0.5 bg-amber-50 border border-amber-200 rounded">
              <TrendingUp className="w-3 h-3 text-amber-600" />
              <span className="text-xs font-medium text-amber-700">+247%</span>
            </div>
          </div>
        </div>
        
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={latencyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="time" 
                stroke="#64748b" 
                style={{ fontSize: '11px' }}
                tick={{ fill: '#64748b' }}
              />
              <YAxis 
                stroke="#64748b" 
                style={{ fontSize: '11px' }}
                tick={{ fill: '#64748b' }}
                label={{ value: 'Latency (ms)', angle: -90, position: 'insideLeft', style: { fill: '#64748b', fontSize: '11px' } }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Legend 
                wrapperStyle={{ fontSize: '11px' }}
                iconType="line"
              />
              <Line 
                type="monotone" 
                dataKey="p50" 
                stroke="#10b981" 
                strokeWidth={1.5}
                dot={false}
                name="P50 (Median)"
              />
              <Line 
                type="monotone" 
                dataKey="p95" 
                stroke="#f59e0b" 
                strokeWidth={1.5}
                dot={false}
                name="P95"
              />
              <Line 
                type="monotone" 
                dataKey="p99" 
                stroke="#ef4444" 
                strokeWidth={1.5}
                dot={false}
                name="P99"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Request Volume Chart */}
      <div className="bg-white border border-slate-200 rounded-[10px] p-5 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-sm font-normal text-slate-900">Request Volume</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Last 24h</span>
          </div>
        </div>
        
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={requestVolumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="time" 
                stroke="#64748b" 
                style={{ fontSize: '11px' }}
                tick={{ fill: '#64748b' }}
              />
              <YAxis 
                stroke="#64748b" 
                style={{ fontSize: '11px' }}
                tick={{ fill: '#64748b' }}
                label={{ value: 'Requests/sec', angle: -90, position: 'insideLeft', style: { fill: '#64748b', fontSize: '11px' } }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="requests" 
                stroke="#3b82f6" 
                strokeWidth={1.5}
                fill="none" 
                name="Requests/sec"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}