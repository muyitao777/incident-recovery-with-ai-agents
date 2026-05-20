import { AlertTriangle, AlertCircle, CheckCircle, TrendingUp, TrendingDown, ExternalLink, GripVertical, Server, Share2, Search } from 'lucide-react';
import { useState } from 'react';
import { useUpdates } from '@/app/contexts/UpdatesContext';
import { ShareUpdateModal } from './ShareUpdateModal';

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

interface ImpactedServicesTableProps {
  onInvestigate?: (title: string, context: string) => void;
}

export function ImpactedServicesTable({ onInvestigate }: ImpactedServicesTableProps = {}) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const { addUpdate } = useUpdates();
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareContent, setShareContent] = useState({ title: '', content: '' });

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (index: number) => {
    setDragOverIndex(index);
  };

  const handleDrop = () => {
    if (draggedIndex !== null && dragOverIndex !== null && draggedIndex !== dragOverIndex) {
      const newServices = [...services];
      const [draggedService] = newServices.splice(draggedIndex, 1);
      newServices.splice(dragOverIndex, 0, draggedService);
      setDraggedIndex(null);
      setDragOverIndex(null);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleShareClick = () => {
    const criticalServices = services.filter(s => s.status === 'critical');
    const warningServices = services.filter(s => s.status === 'warning');
    const content = `Service Impact Summary: ${criticalServices.length} critical services (${criticalServices.map(s => s.name).join(', ')}), ${warningServices.length} warning services. Critical issues: ${criticalServices.map(s => `${s.name} - ${s.description} (Error: ${s.errorRate}, Latency: ${s.latency}, Availability: ${s.availability})`).join('; ')}.`;
    setShareContent({
      title: 'Impacted Services',
      content: content
    });
    setShareModalOpen(true);
  };

  const handleShare = (content: string) => {
    const now = new Date();
    const timeString = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    addUpdate({
      id: `update-${Date.now()}`,
      time: timeString,
      author: 'Alex Rodriguez',
      title: shareContent.title,
      content: content,
    });
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden w-full flex flex-col border border-slate-200 max-h-[600px]">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-200 bg-white sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-cyan-600" />
            <h3 className="text-sm font-semibold text-slate-900">Impacted Services</h3>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <span className="text-slate-600 font-medium">Critical (2)</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 rounded-full bg-amber-500"></div>
              <span className="text-slate-600 font-medium">Warning (6)</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-slate-600 font-medium">Healthy (8)</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto overflow-y-auto flex-1">
        <table className="w-full">
          <thead className="bg-white border-b border-slate-200">
            <tr>
              <th className="px-6 py-2 text-left text-xs font-normal text-slate-600 uppercase tracking-wider">Service</th>
              <th className="px-6 py-2 text-left text-xs font-normal text-slate-600 uppercase tracking-wider min-w-[300px]">Description</th>
              <th className="px-6 py-2 text-left text-xs font-normal text-slate-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-2 text-left text-xs font-normal text-slate-600 uppercase tracking-wider">Error Rate</th>
              <th className="px-6 py-2 text-left text-xs font-normal text-slate-600 uppercase tracking-wider">Latency</th>
              <th className="px-6 py-2 text-left text-xs font-normal text-slate-600 uppercase tracking-wider">Availability</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {services.map((service, idx) => (
              <tr key={idx} className="hover:bg-slate-50 transition-colors"
                draggable
                onDragStart={() => handleDragStart(idx)}
                onDragOver={() => handleDragOver(idx)}
                onDrop={handleDrop}
                onDragEnd={handleDragEnd}
              >
                <td className="px-6 py-2">
                  <div className="flex items-center gap-3">
                    {service.status === 'critical' ? (
                      <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                      </div>
                    ) : service.status === 'warning' ? (
                      <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                      </div>
                    )}
                    <div className="text-xs text-slate-900">{service.name}</div>
                  </div>
                </td>
                <td className="px-6 py-2">
                  <span className="text-xs text-slate-600">{service.description}</span>
                </td>
                <td className="px-6 py-2">
                  <span className={`text-[10px] px-2.5 py-1 rounded-md font-semibold ${
                    service.status === 'critical'
                      ? 'bg-red-50 text-red-700'
                      : service.status === 'warning'
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-green-50 text-green-700'
                  }`}>
                    {service.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-2">
                  <div className="flex items-center gap-2.5">
                    <span className={`text-xs font-normal ${
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
                <td className="px-6 py-2">
                  <div className="flex items-center gap-2.5">
                    <span className={`text-xs font-normal ${
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
                <td className="px-6 py-2">
                  <span className={`text-xs font-normal ${
                    parseFloat(service.availability) < 99 ? 'text-red-600' :
                    parseFloat(service.availability) < 99.9 ? 'text-amber-600' :
                    'text-green-600'
                  }`}>
                    {service.availability}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Action Buttons */}
      <div className="px-5 py-4 border-t border-slate-200 flex items-center gap-2">
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200">
          <ExternalLink className="w-3.5 h-3.5" />
          View details
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200" onClick={handleShareClick}>
          <Share2 className="w-3.5 h-3.5" />
          Share as update
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200" onClick={() => onInvestigate && onInvestigate('Impacted Services', 'Investigate the current impact on services')}>
          <Search className="w-3.5 h-3.5" />
          Investigate further
        </button>
      </div>

      {/* Share Update Modal */}
      <ShareUpdateModal 
        isOpen={shareModalOpen} 
        onClose={() => setShareModalOpen(false)} 
        onShare={handleShare} 
        title={shareContent.title}
        defaultContent={shareContent.content}
        author="Alex Rodriguez"
      />
    </div>
  );
}