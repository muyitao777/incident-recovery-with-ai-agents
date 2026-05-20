import { AlertTriangle, AlertCircle, CheckCircle, TrendingUp, TrendingDown, ExternalLink } from 'lucide-react';

const services = [
  {
    name: 'IdentityGraphQLOrch - Cache Layer',
    environment: 'Production',
    status: 'critical',
    errorRate: '2.34%',
    errorTrend: 'up',
    latency: '156ms',
    latencyTrend: 'up',
    availability: '97.66%',
    lastIncident: '2 min ago',
    description: 'Redis connection pool exhaustion'
  },
  {
    name: 'QuickBooks API Gateway',
    environment: 'Production',
    status: 'warning',
    errorRate: '0.45%',
    errorTrend: 'up',
    latency: '89ms',
    latencyTrend: 'up',
    availability: '99.55%',
    lastIncident: '15 min ago',
    description: 'Elevated timeout rate from cache dependency'
  },
  {
    name: 'TurboTax Auth Service',
    environment: 'Production',
    status: 'warning',
    errorRate: '0.23%',
    errorTrend: 'stable',
    latency: '67ms',
    latencyTrend: 'up',
    availability: '99.77%',
    lastIncident: '1 hour ago',
    description: 'Intermittent authentication failures'
  },
  {
    name: 'Credit Karma User Profile Service',
    environment: 'Production',
    status: 'warning',
    errorRate: '0.18%',
    errorTrend: 'up',
    latency: '78ms',
    latencyTrend: 'up',
    availability: '99.82%',
    lastIncident: '45 min ago',
    description: 'Downstream cache dependency impact'
  },
  {
    name: 'Mint Transaction Database',
    environment: 'Production',
    status: 'healthy',
    errorRate: '0.01%',
    errorTrend: 'stable',
    latency: '12ms',
    latencyTrend: 'stable',
    availability: '99.99%',
    lastIncident: 'None',
    description: 'Normal operations'
  },
  {
    name: 'Mailchimp Notification Service',
    environment: 'Production',
    status: 'healthy',
    errorRate: '0.02%',
    errorTrend: 'down',
    latency: '34ms',
    latencyTrend: 'stable',
    availability: '99.98%',
    lastIncident: '3 days ago',
    description: 'Normal operations'
  },
  {
    name: 'ProConnect Tax Processing',
    environment: 'Production',
    status: 'healthy',
    errorRate: '0.03%',
    errorTrend: 'stable',
    latency: '28ms',
    latencyTrend: 'stable',
    availability: '99.97%',
    lastIncident: '5 days ago',
    description: 'Normal operations'
  },
  {
    name: 'QuickBooks Payment Gateway',
    environment: 'Production',
    status: 'healthy',
    errorRate: '0.01%',
    errorTrend: 'down',
    latency: '45ms',
    latencyTrend: 'down',
    availability: '99.99%',
    lastIncident: '7 days ago',
    description: 'Normal operations'
  },
  {
    name: 'TurboTax Mobile API',
    environment: 'Production',
    status: 'warning',
    errorRate: '0.32%',
    errorTrend: 'up',
    latency: '92ms',
    latencyTrend: 'up',
    availability: '99.68%',
    lastIncident: '12 min ago',
    description: 'Cache miss rate elevated'
  },
  {
    name: 'Intuit Accounts Session Manager',
    environment: 'Production',
    status: 'critical',
    errorRate: '1.89%',
    errorTrend: 'up',
    latency: '234ms',
    latencyTrend: 'up',
    availability: '98.11%',
    lastIncident: '5 min ago',
    description: 'Session store degradation affecting logins'
  },
  {
    name: 'QuickBooks Online Sync Service',
    environment: 'Production',
    status: 'healthy',
    errorRate: '0.04%',
    errorTrend: 'stable',
    latency: '56ms',
    latencyTrend: 'stable',
    availability: '99.96%',
    lastIncident: '2 days ago',
    description: 'Normal operations'
  },
  {
    name: 'Credit Karma Score Updates',
    environment: 'Production',
    status: 'healthy',
    errorRate: '0.02%',
    errorTrend: 'down',
    latency: '41ms',
    latencyTrend: 'stable',
    availability: '99.98%',
    lastIncident: '4 days ago',
    description: 'Normal operations'
  },
  {
    name: 'Mint Budget Recommendation Engine',
    environment: 'Production',
    status: 'warning',
    errorRate: '0.28%',
    errorTrend: 'up',
    latency: '112ms',
    latencyTrend: 'up',
    availability: '99.72%',
    lastIncident: '22 min ago',
    description: 'ML model serving latency spike'
  },
  {
    name: 'TurboTax Document Storage',
    environment: 'Production',
    status: 'healthy',
    errorRate: '0.01%',
    errorTrend: 'stable',
    latency: '23ms',
    latencyTrend: 'stable',
    availability: '99.99%',
    lastIncident: '6 days ago',
    description: 'Normal operations'
  },
  {
    name: 'QuickBooks Payroll Service',
    environment: 'Production',
    status: 'healthy',
    errorRate: '0.03%',
    errorTrend: 'stable',
    latency: '38ms',
    latencyTrend: 'down',
    availability: '99.97%',
    lastIncident: '8 days ago',
    description: 'Normal operations'
  },
  {
    name: 'Intuit Analytics Ingestion',
    environment: 'Production',
    status: 'healthy',
    errorRate: '0.05%',
    errorTrend: 'stable',
    latency: '67ms',
    latencyTrend: 'stable',
    availability: '99.95%',
    lastIncident: '1 day ago',
    description: 'Normal operations'
  },
  {
    name: 'Credit Karma Offers Engine',
    environment: 'Production',
    status: 'warning',
    errorRate: '0.41%',
    errorTrend: 'up',
    latency: '98ms',
    latencyTrend: 'up',
    availability: '99.59%',
    lastIncident: '18 min ago',
    description: 'Partner API timeout rate elevated'
  },
  {
    name: 'Mailchimp Campaign Manager',
    environment: 'Production',
    status: 'healthy',
    errorRate: '0.02%',
    errorTrend: 'stable',
    latency: '29ms',
    latencyTrend: 'stable',
    availability: '99.98%',
    lastIncident: '5 days ago',
    description: 'Normal operations'
  }
];

export function ImpactedServicesTable() {
  return (
    <div className="bg-white rounded-[10px] overflow-hidden w-full flex flex-col border border-slate-200 shadow-card">
      <div className="px-6 py-3.5 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-slate-900">Impacted Services</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <span className="text-slate-600 font-medium">Critical (2)</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <div className="w-2 h-2 rounded-full bg-amber-500"></div>
              <span className="text-slate-600 font-medium">Warning (6)</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-slate-600 font-medium">Healthy (8)</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto flex-1">
        <table className="w-full">
          <thead className="bg-white border-b border-slate-200">
            <tr>
              <th className="px-6 py-1.5 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Service</th>
              <th className="px-6 py-1.5 text-left text-xs font-medium text-slate-600 uppercase tracking-wider min-w-[18rem]">Description</th>
              <th className="px-6 py-1.5 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Environment</th>
              <th className="px-6 py-1.5 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-1.5 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Error Rate</th>
              <th className="px-6 py-1.5 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Latency</th>
              <th className="px-6 py-1.5 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Availability</th>
              <th className="px-6 py-1.5 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Last Incident</th>
              <th className="px-6 py-1.5 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {services.map((service, idx) => (
              <tr key={idx} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-1.5">
                  <div className="flex items-center gap-2">
                    {service.status === 'critical' ? (
                      <div className="w-6 h-6 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="w-3 h-3 text-red-400" />
                      </div>
                    ) : service.status === 'warning' ? (
                      <div className="w-6 h-6 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="w-3 h-3 text-amber-400" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-3 h-3 text-green-400" />
                      </div>
                    )}
                    <div className="text-sm font-normal text-slate-900">{service.name}</div>
                  </div>
                </td>
                <td className="px-6 py-1.5 min-w-[18rem]">
                  <span className="text-xs text-slate-600">{service.description}</span>
                </td>
                <td className="px-6 py-1.5">
                  <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md font-medium">
                    {service.environment}
                  </span>
                </td>
                <td className="px-6 py-1.5">
                  <span className={`text-xs px-2 py-0.5 rounded-md font-semibold ${
                    service.status === 'critical'
                      ? 'bg-red-50 text-red-700'
                      : service.status === 'warning'
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-green-50 text-green-700'
                  }`}>
                    {service.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className={`text-sm font-normal ${
                      parseFloat(service.errorRate) > 1 ? 'text-red-600' :
                      parseFloat(service.errorRate) > 0.2 ? 'text-amber-600' :
                      'text-slate-700'
                    }`}>
                      {service.errorRate}
                    </span>
                    {service.errorTrend === 'up' && (
                      <TrendingUp className="w-3 h-3 text-red-500" />
                    )}
                    {service.errorTrend === 'down' && (
                      <TrendingDown className="w-3 h-3 text-green-500" />
                    )}
                  </div>
                </td>
                <td className="px-6 py-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className={`text-sm font-normal ${
                      parseInt(service.latency) > 100 ? 'text-red-600' :
                      parseInt(service.latency) > 50 ? 'text-amber-600' :
                      'text-slate-700'
                    }`}>
                      {service.latency}
                    </span>
                    {service.latencyTrend === 'up' && (
                      <TrendingUp className="w-3 h-3 text-amber-500" />
                    )}
                    {service.latencyTrend === 'down' && (
                      <TrendingDown className="w-3 h-3 text-green-500" />
                    )}
                  </div>
                </td>
                <td className="px-6 py-1.5">
                  <span className={`text-sm font-normal ${
                    parseFloat(service.availability) < 99 ? 'text-red-600' :
                    parseFloat(service.availability) < 99.9 ? 'text-amber-600' :
                    'text-green-600'
                  }`}>
                    {service.availability}
                  </span>
                </td>
                <td className="px-6 py-1.5">
                  <span className="text-xs text-slate-600">{service.lastIncident}</span>
                </td>
                <td className="px-6 py-1.5">
                  <button className="w-6 h-6 flex items-center justify-center hover:bg-slate-100 rounded-lg transition-colors">
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}