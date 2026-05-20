import { TrendingUp, TrendingDown, AlertCircle, Clock, Users, Activity, DollarSign, ChevronDown, Server } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useState, useMemo } from 'react';

const sparklineData = {
  '5m': [
    { users: 22900, requests: 1590, duration: 24, revenue: 23100, availability: 97.85, services: 6 },
    { users: 23200, requests: 1620, duration: 26, revenue: 24500, availability: 97.80, services: 7 },
    { users: 23600, requests: 1650, duration: 28, revenue: 25800, availability: 97.75, services: 7 },
    { users: 24100, requests: 1680, duration: 30, revenue: 27200, availability: 97.70, services: 8 },
    { users: 24300, requests: 1720, duration: 32, revenue: 28700, availability: 97.66, services: 8 },
  ],
  '15m': [
    { users: 18700, requests: 1280, duration: 12, revenue: 9800, availability: 98.3, services: 4 },
    { users: 20100, requests: 1380, duration: 16, revenue: 13200, availability: 98.1, services: 5 },
    { users: 21500, requests: 1520, duration: 18, revenue: 16500, availability: 98.0, services: 5 },
    { users: 22400, requests: 1590, duration: 22, revenue: 20100, availability: 97.9, services: 6 },
    { users: 23200, requests: 1640, duration: 26, revenue: 24000, availability: 97.8, services: 7 },
    { users: 23800, requests: 1680, duration: 30, revenue: 27400, availability: 97.7, services: 7 },
    { users: 24300, requests: 1720, duration: 32, revenue: 28700, availability: 97.66, services: 8 },
  ],
  '30m': [
    { users: 2400, requests: 120, duration: 0, revenue: 0, availability: 100, services: 0 },
    { users: 2350, requests: 115, duration: 0, revenue: 0, availability: 100, services: 0 },
    { users: 2500, requests: 125, duration: 0, revenue: 0, availability: 100, services: 0 },
    { users: 2420, requests: 118, duration: 0, revenue: 0, availability: 99.99, services: 1 },
    { users: 2380, requests: 122, duration: 0, revenue: 0, availability: 99.98, services: 1 },
    { users: 5200, requests: 340, duration: 2, revenue: 850, availability: 99.5, services: 2 },
    { users: 8900, requests: 580, duration: 5, revenue: 2400, availability: 99.1, services: 3 },
    { users: 14300, requests: 920, duration: 8, revenue: 5200, availability: 98.7, services: 4 },
    { users: 18700, requests: 1280, duration: 12, revenue: 9800, availability: 98.3, services: 5 },
    { users: 21500, requests: 1520, duration: 16, revenue: 14500, availability: 98.0, services: 6 },
    { users: 23800, requests: 1650, duration: 20, revenue: 19200, availability: 97.8, services: 7 },
    { users: 22900, requests: 1590, duration: 24, revenue: 23100, availability: 97.85, services: 7 },
    { users: 24100, requests: 1680, duration: 28, revenue: 26800, availability: 97.7, services: 8 },
    { users: 24300, requests: 1720, duration: 32, revenue: 28700, availability: 97.66, services: 8 },
    { users: 23700, requests: 1640, duration: 32, revenue: 28700, availability: 97.68, services: 8 },
  ],
  '1h': [
    { users: 2300, requests: 115, duration: 0, revenue: 0, availability: 100, services: 0 },
    { users: 2400, requests: 120, duration: 0, revenue: 0, availability: 100, services: 0 },
    { users: 2350, requests: 118, duration: 0, revenue: 0, availability: 100, services: 0 },
    { users: 2500, requests: 125, duration: 0, revenue: 0, availability: 100, services: 0 },
    { users: 2480, requests: 122, duration: 0, revenue: 0, availability: 99.99, services: 1 },
    { users: 2420, requests: 119, duration: 0, revenue: 0, availability: 99.99, services: 1 },
    { users: 3200, requests: 180, duration: 1, revenue: 420, availability: 99.8, services: 2 },
    { users: 5200, requests: 340, duration: 2, revenue: 850, availability: 99.5, services: 2 },
    { users: 8900, requests: 580, duration: 5, revenue: 2400, availability: 99.1, services: 3 },
    { users: 12800, requests: 820, duration: 8, revenue: 4800, availability: 98.8, services: 4 },
    { users: 16400, requests: 1100, duration: 11, revenue: 7900, availability: 98.5, services: 5 },
    { users: 19200, requests: 1320, duration: 14, revenue: 11200, availability: 98.2, services: 6 },
    { users: 21800, requests: 1480, duration: 18, revenue: 15600, availability: 98.0, services: 6 },
    { users: 23400, requests: 1620, duration: 24, revenue: 21800, availability: 97.8, services: 7 },
    { users: 24100, requests: 1690, duration: 28, revenue: 26400, availability: 97.7, services: 8 },
    { users: 24300, requests: 1720, duration: 32, revenue: 28700, availability: 97.66, services: 8 },
  ],
  '4h': [
    { users: 2200, requests: 110, duration: 0, revenue: 0, availability: 100, services: 0 },
    { users: 2350, requests: 118, duration: 0, revenue: 0, availability: 100, services: 0 },
    { users: 2280, requests: 115, duration: 0, revenue: 0, availability: 100, services: 0 },
    { users: 2400, requests: 120, duration: 0, revenue: 0, availability: 100, services: 0 },
    { users: 2320, requests: 116, duration: 0, revenue: 0, availability: 100, services: 0 },
    { users: 2450, requests: 123, duration: 0, revenue: 0, availability: 99.99, services: 1 },
    { users: 2380, requests: 119, duration: 0, revenue: 0, availability: 99.99, services: 1 },
    { users: 2500, requests: 125, duration: 0, revenue: 0, availability: 99.99, services: 1 },
    { users: 4100, requests: 240, duration: 1, revenue: 580, availability: 99.7, services: 2 },
    { users: 7800, requests: 480, duration: 4, revenue: 1850, availability: 99.3, services: 3 },
    { users: 11900, requests: 760, duration: 7, revenue: 4200, availability: 98.9, services: 4 },
    { users: 16200, requests: 1050, duration: 10, revenue: 7600, availability: 98.6, services: 5 },
    { users: 19800, requests: 1340, duration: 15, revenue: 12400, availability: 98.3, services: 6 },
    { users: 22400, requests: 1550, duration: 21, revenue: 18900, availability: 97.9, services: 7 },
    { users: 23900, requests: 1670, duration: 27, revenue: 25100, availability: 97.75, services: 7 },
    { users: 24300, requests: 1720, duration: 32, revenue: 28700, availability: 97.66, services: 8 },
  ],
  '24h': [
    { users: 2100, requests: 105, duration: 0, revenue: 0, availability: 100, services: 0 },
    { users: 2250, requests: 113, duration: 0, revenue: 0, availability: 100, services: 0 },
    { users: 2200, requests: 110, duration: 0, revenue: 0, availability: 100, services: 0 },
    { users: 2350, requests: 118, duration: 0, revenue: 0, availability: 100, services: 0 },
    { users: 2280, requests: 114, duration: 0, revenue: 0, availability: 100, services: 0 },
    { users: 2400, requests: 120, duration: 0, revenue: 0, availability: 100, services: 0 },
    { users: 2320, requests: 116, duration: 0, revenue: 0, availability: 100, services: 0 },
    { users: 2450, requests: 123, duration: 0, revenue: 0, availability: 99.99, services: 1 },
    { users: 2380, requests: 119, duration: 0, revenue: 0, availability: 99.99, services: 1 },
    { users: 2500, requests: 125, duration: 0, revenue: 0, availability: 99.99, services: 1 },
    { users: 2420, requests: 121, duration: 0, revenue: 0, availability: 99.99, services: 1 },
    { users: 5800, requests: 360, duration: 2, revenue: 920, availability: 99.6, services: 2 },
    { users: 10200, requests: 650, duration: 6, revenue: 3100, availability: 99.2, services: 3 },
    { users: 15800, requests: 1020, duration: 10, revenue: 6900, availability: 98.7, services: 4 },
    { users: 20500, requests: 1410, duration: 17, revenue: 13800, availability: 98.2, services: 6 },
    { users: 23200, requests: 1610, duration: 25, revenue: 22400, availability: 97.85, services: 7 },
    { users: 24100, requests: 1700, duration: 30, revenue: 27200, availability: 97.7, services: 8 },
    { users: 24300, requests: 1720, duration: 32, revenue: 28700, availability: 97.66, services: 8 },
  ],
};

const metricsData = {
  '5m': {
    users: { current: '24.3K', baseline: '23.5K', change: '+3.4%', duration: '5 min' },
    requests: { current: '1,720', baseline: '1,600', change: '+7.5%' },
    duration: { current: '32 min', startTime: '14:23 UTC' },
    revenue: { current: '$28.7K', description: 'last 5 min' },
    availability: { current: '97.66%', baseline: '97.85%', change: '-0.19%' },
    services: { current: '8', baseline: '2', description: '6 newly impacted' },
  },
  '15m': {
    users: { current: '24.3K', baseline: '18.7K', change: '+29.9%', duration: '15 min' },
    requests: { current: '1,720', baseline: '1,280', change: '+34.4%' },
    duration: { current: '32 min', startTime: '14:23 UTC' },
    revenue: { current: '$28.7K', description: 'last 15 min' },
    availability: { current: '97.66%', baseline: '98.3%', change: '-0.64%' },
    services: { current: '8', baseline: '4', description: '4 newly impacted' },
  },
  '30m': {
    users: { current: '24.3K', baseline: '2.4K', change: '+892%', duration: '30 min' },
    requests: { current: '1,720', baseline: '120', change: '+1333%' },
    duration: { current: '32 min', startTime: '14:23 UTC' },
    revenue: { current: '$28.7K', description: 'projected loss' },
    availability: { current: '97.66%', baseline: '100%', change: '-2.34%' },
    services: { current: '8', baseline: '0', description: '8 services' },
  },
  'current': {
    users: { current: '24.3K', baseline: '7.1K', change: '+340%' },
    requests: { current: '2.34%', baseline: '0.02%', change: '+11,600%' },
    duration: { current: '32 min', startTime: '14:23 UTC' },
    revenue: { current: '$28.7K', description: 'projected loss' },
    availability: { current: '97.66%', baseline: '100%', change: '-2.34%' },
    services: { current: '8', baseline: '0', description: '8 services' },
  },
  '1h': {
    users: { current: '24.3K', baseline: '2.3K', change: '+956%', duration: '1 hour' },
    requests: { current: '2.34%', baseline: '0.02%', change: '+11,600%' },
    duration: { current: '32 min', startTime: '14:23 UTC' },
    revenue: { current: '$28.7K', description: 'last hour' },
    availability: { current: '97.66%', baseline: '100%', change: '-2.34%' },
    services: { current: '8', baseline: '0', description: '8 services' },
  },
  '4h': {
    users: { current: '24.3K', baseline: '2.2K', change: '+1004%', duration: '4 hours' },
    requests: { current: '2.34%', baseline: '0.02%', change: '+11,600%' },
    duration: { current: '32 min', startTime: '14:23 UTC' },
    revenue: { current: '$28.7K', description: 'last 4 hours' },
    availability: { current: '97.66%', baseline: '100%', change: '-2.34%' },
    services: { current: '8', baseline: '0', description: '8 services' },
  },
  '24h': {
    users: { current: '24.3K', baseline: '2.1K', change: '+1057%', duration: '24 hours' },
    requests: { current: '2.34%', baseline: '0.02%', change: '+11,600%' },
    duration: { current: '32 min', startTime: '14:23 UTC' },
    revenue: { current: '$28.7K', description: 'last 24 hours' },
    availability: { current: '97.66%', baseline: '100%', change: '-2.34%' },
    services: { current: '8', baseline: '0', description: '8 services' },
  },
};

export function ImpactMetricsCards() {
  const [timeFrame, setTimeFrame] = useState<'5m' | '15m' | '30m' | '1h' | '4h' | '24h'>('30m');

  const timeIntervals = [
    { label: '5m', value: '5m' as const },
    { label: '15m', value: '15m' as const },
    { label: '30m', value: '30m' as const },
    { label: '1h', value: '1h' as const },
    { label: '4h', value: '4h' as const },
    { label: '24h', value: '24h' as const },
  ];

  const currentData = useMemo(() => sparklineData[timeFrame], [timeFrame]);
  const currentMetrics = useMemo(() => metricsData[timeFrame], [timeFrame]);

  console.log('Current timeFrame:', timeFrame);
  console.log('Current metrics:', currentMetrics);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      {/* Time Frame Filter */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-slate-900">Impact Metrics</h2>
        <div className="flex items-center gap-1">
          {timeIntervals.map((interval) => (
            <button
              key={interval.value}
              onClick={() => setTimeFrame(interval.value)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                timeFrame === interval.value
                  ? 'bg-slate-100 text-slate-700 border border-slate-300'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {interval.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {/* Affected Users Card */}
        <div className="bg-white rounded-xl p-3 border border-slate-200 hover:border-slate-300 transition-all duration-200 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-20 h-20 bg-purple-50 rounded-full blur-3xl -mr-10 -mt-10 opacity-50"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-semibold text-slate-700">Affected Users</span>
              </div>
              <div className="flex items-center gap-1 px-1.5 py-0.5 bg-red-50 rounded-md border border-red-100">
                <TrendingUp className="w-3 h-3 text-red-600" />
                <span className="text-xs font-semibold text-red-600">{currentMetrics.users.change}</span>
              </div>
            </div>
            
            <div className="mb-2">
              <div className="flex items-end gap-2">
                <div className="text-xl font-semibold text-slate-900">{currentMetrics.users.current}</div>
                <div className="text-[10px] text-slate-500">from {currentMetrics.users.baseline} baseline</div>
              </div>
            </div>
            
            <div className="h-16">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={currentData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} vertical={false} />
                  <XAxis 
                    stroke="#94a3b8" 
                    tick={{ fontSize: 10, fill: '#94a3b8' }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#94a3b8" 
                    tick={{ fontSize: 10, fill: '#94a3b8' }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="users" 
                    stroke="#a855f7" 
                    strokeWidth={2}
                    fill="none" 
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Failed Requests Card */}
        <div className="bg-white rounded-xl p-3 border border-slate-200 hover:border-slate-300 transition-all duration-200 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-20 h-20 bg-red-50 rounded-full blur-3xl -mr-10 -mt-10 opacity-50"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-red-600" />
                <span className="text-xs font-semibold text-slate-700">Failed Requests</span>
              </div>
              <div className="flex items-center gap-1 px-1.5 py-0.5 bg-red-50 rounded-md border border-red-100">
                <TrendingUp className="w-3 h-3 text-red-600" />
                <span className="text-xs font-semibold text-red-600">{currentMetrics.requests.change}</span>
              </div>
            </div>
            
            <div className="mb-2">
              <div className="flex items-end gap-2">
                <div className="text-xl font-semibold text-slate-900">{currentMetrics.requests.current}</div>
                <div className="text-[10px] text-slate-500">from {currentMetrics.requests.baseline} baseline</div>
              </div>
            </div>
            
            <div className="h-16">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={currentData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} vertical={false} />
                  <XAxis 
                    stroke="#94a3b8" 
                    tick={{ fontSize: 10, fill: '#94a3b8' }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#94a3b8" 
                    tick={{ fontSize: 10, fill: '#94a3b8' }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="requests" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    fill="none" 
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Duration Card */}
        <div className="bg-white rounded-xl p-3 border border-slate-200 hover:border-slate-300 transition-all duration-200 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-20 h-20 bg-amber-50 rounded-full blur-3xl -mr-10 -mt-10 opacity-50"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-semibold text-slate-700">Duration</span>
              </div>
              <div className="flex items-center gap-1 px-2 py-0.5 bg-red-50 rounded-md border border-red-100">
                <TrendingUp className="w-3 h-3 text-red-600" />
                <span className="text-xs font-semibold text-red-600">Ongoing</span>
              </div>
            </div>
            
            <div className="mb-2">
              <div className="flex items-center gap-2">
                <div className="text-xl font-semibold text-slate-900">{currentMetrics.duration.current}</div>
                <div className="text-[10px] text-slate-500">since {currentMetrics.duration.startTime}</div>
              </div>
            </div>
            
            <div className="h-16">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={currentData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} vertical={false} />
                  <XAxis 
                    stroke="#94a3b8" 
                    tick={{ fontSize: 10, fill: '#94a3b8' }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#94a3b8" 
                    tick={{ fontSize: 10, fill: '#94a3b8' }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="duration" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    fill="none" 
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Est. Revenue Impact Card */}
        <div className="bg-white rounded-xl p-3 border border-slate-200 hover:border-slate-300 transition-all duration-200 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-20 h-20 bg-rose-50 rounded-full blur-3xl -mr-10 -mt-10 opacity-50"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-rose-600" />
                <span className="text-xs font-semibold text-slate-700">Revenue Impact</span>
              </div>
              <div className="flex items-center gap-1 px-2 py-0.5 bg-red-50 rounded-md border border-red-100">
                <TrendingUp className="w-3 h-3 text-red-600" />
                <span className="text-xs font-semibold text-red-600">Loss</span>
              </div>
            </div>
            
            <div className="mb-2">
              <div className="flex items-end gap-2">
                <div className="text-xl font-semibold text-slate-900">{currentMetrics.revenue.current}</div>
                <div className="text-[10px] text-slate-500">{currentMetrics.revenue.description}</div>
              </div>
            </div>
            
            <div className="h-16">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={currentData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} vertical={false} />
                  <XAxis 
                    stroke="#94a3b8" 
                    tick={{ fontSize: 10, fill: '#94a3b8' }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#94a3b8" 
                    tick={{ fontSize: 10, fill: '#94a3b8' }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#f43f5e" 
                    strokeWidth={2}
                    fill="none" 
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Availability Card */}
        <div className="bg-white rounded-xl p-3 border border-slate-200 hover:border-slate-300 transition-all duration-200 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-full blur-3xl -mr-10 -mt-10 opacity-50"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-semibold text-slate-700">Availability</span>
              </div>
              <div className="flex items-center gap-1 px-2 py-0.5 bg-red-50 rounded-md border border-red-100">
                <TrendingDown className="w-3 h-3 text-red-600" />
                <span className="text-xs font-semibold text-red-600">{currentMetrics.availability.change}</span>
              </div>
            </div>
            
            <div className="mb-2">
              <div className="flex items-end gap-2">
                <div className="text-xl font-semibold text-slate-900">{currentMetrics.availability.current}</div>
                <div className="text-[10px] text-slate-500">from {currentMetrics.availability.baseline} baseline</div>
              </div>
            </div>
            
            <div className="h-16">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={currentData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} vertical={false} />
                  <XAxis 
                    stroke="#94a3b8" 
                    tick={{ fontSize: 10, fill: '#94a3b8' }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#94a3b8" 
                    tick={{ fontSize: 10, fill: '#94a3b8' }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="availability" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    fill="none" 
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Services Card */}
        <div className="bg-white rounded-xl p-3 border border-slate-200 hover:border-slate-300 transition-all duration-200 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gray-50 rounded-full blur-3xl -mr-10 -mt-10 opacity-50"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-slate-600" />
                <span className="text-xs font-semibold text-slate-700">Services Impacted</span>
              </div>
              <div className="flex items-center gap-1 px-2 py-0.5 bg-red-50 rounded-md border border-red-100">
                <TrendingUp className="w-3 h-3 text-red-600" />
                <span className="text-xs font-semibold text-red-600">{currentMetrics.services.current}</span>
              </div>
            </div>
            
            <div className="mb-2">
              <div className="flex items-end gap-2">
                <div className="text-xl font-semibold text-slate-900">{currentMetrics.services.current}</div>
                <div className="text-[10px] text-slate-500">from {currentMetrics.services.baseline} baseline</div>
              </div>
            </div>
            
            <div className="h-16">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={currentData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} vertical={false} />
                  <XAxis 
                    stroke="#94a3b8" 
                    tick={{ fontSize: 10, fill: '#94a3b8' }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#94a3b8" 
                    tick={{ fontSize: 10, fill: '#94a3b8' }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="services" 
                    stroke="#9ca3af" 
                    strokeWidth={2}
                    fill="none" 
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}