import { useState } from 'react';
import { User, ChevronDown, ChevronUp, AlertCircle, Clock, TrendingUp, Users, Zap, Activity, Target, Shield, Code, BarChart3, GitBranch, CheckCircle2, AlertTriangle, Database, Server, Network, FileText, ClipboardList, Calendar, Bell, Settings, Sparkles, ExternalLink, ChevronRight, Share2, Search, Briefcase, Play } from 'lucide-react';
import { ImpactMetricsCards } from './ImpactMetricsCards';
import { ImpactedServicesTable } from './ImpactedServicesTable';
import { ServiceDependencyGraph } from './ServiceDependencyGraph';
import { AIInvestigationSuggestions } from './AIInvestigationSuggestions';
import { QuickRemediation } from './QuickRemediation';
import { MetricsCharts } from './MetricsCharts';
import { RootCauseAnalysis } from './RootCauseAnalysis';
import { SuggestedTeamInvites } from './SuggestedTeamInvites';
import { ApprovalRequest } from './ApprovalRequest';
import { IntuitAssistIcon } from './IntuitAssistIcon';
import { useUpdates } from '@/app/contexts/UpdatesContext';
import { useThreads } from '@/app/contexts/ThreadContext';
import { ShareUpdateModal } from './ShareUpdateModal';

type Persona = 'technical' | 'manager' | 'leader';

interface PersonaConfig {
  name: string;
  role: string;
  avatar: string;
  color: string;
}

const personas: Record<Persona, PersonaConfig> = {
  technical: {
    name: 'James Chen',
    role: 'Technical Responder',
    avatar: 'TR',
    color: 'blue'
  },
  manager: {
    name: 'Priya Patel',
    role: 'Incident Manager',
    avatar: 'IM',
    color: 'purple'
  },
  leader: {
    name: 'David Kim',
    role: 'Accountable Leader',
    avatar: 'AL',
    color: 'emerald'
  }
};

interface PersonalizedCanvasProps {
  selectedPersona: Persona;
  onThreadOpenChange?: (isOpen: boolean) => void;
  onInvestigate?: (title: string, context: string) => void;
}

export function PersonalizedCanvas({ selectedPersona, onThreadOpenChange, onInvestigate }: PersonalizedCanvasProps) {
  const currentPersona = personas[selectedPersona];
  const [expandedAltHypotheses, setExpandedAltHypotheses] = useState(false);
  const [expandedH2Timeline, setExpandedH2Timeline] = useState(false);
  const [expandedH2Evidence, setExpandedH2Evidence] = useState(false);
  const [expandedH3Timeline, setExpandedH3Timeline] = useState(false);
  const [expandedH3Evidence, setExpandedH3Evidence] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareContent, setShareContent] = useState({ title: '', content: '', author: '' });
  const [threadOpen, setThreadOpen] = useState(false);
  const [threadTopic, setThreadTopic] = useState({ title: '', context: '' });
  const { addSharedUpdate, setHighlightedAgentIds } = useUpdates();
  const { addThread, getThreadCount } = useThreads();

  const handleShareClick = (title: string, content: string) => {
    setShareContent({ 
      title, 
      content, 
      author: currentPersona.name 
    });
    setShareModalOpen(true);
  };

  const handleShareConfirm = (editedContent: string) => {
    addSharedUpdate({
      title: shareContent.title,
      content: editedContent,
      author: shareContent.author,
      cardType: 'shared'
    });
  };

  const handleInvestigateClick = (title: string, context: string) => {
    setThreadTopic({ title, context });
    setThreadOpen(true);
    onThreadOpenChange?.(true);
    onInvestigate?.(title, context);
    addThread(title, context);
  };

  const handleSeeAgentActivity = () => {
    setHighlightedAgentIds(['a2']);
    setTimeout(() => {
      const agentActivity = document.querySelector('[data-agent-id="a2"]');
      if (agentActivity) {
        agentActivity.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const handleSeeAgentActivityRootCause = () => {
    setHighlightedAgentIds(['a1']);
    setTimeout(() => {
      const agentActivity = document.querySelector('[data-agent-id="a1"]');
      if (agentActivity) {
        agentActivity.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const handleSeeAgentActivityLogs = () => {
    setHighlightedAgentIds(['a4']);
    setTimeout(() => {
      const agentActivity = document.querySelector('[data-agent-id="a4"]');
      if (agentActivity) {
        agentActivity.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const handleSeeAgentActivityDeployment = () => {
    setHighlightedAgentIds(['a3']);
    setTimeout(() => {
      const agentActivity = document.querySelector('[data-agent-id="a3"]');
      if (agentActivity) {
        agentActivity.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const renderTechnicalView = () => (
    <div className="space-y-3">
      {/* System Health Header - top aligned with My Canvas header */}
      <div className="px-3 pt-1 pb-1 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-slate-400" />
          <h3 className="text-sm font-semibold text-slate-900">Real-Time System Health</h3>
        </div>
        <div className="text-xs text-slate-400">Last updated: 2 sec ago</div>
      </div>
      {/* System Health Overview */}
      <div className="bg-white rounded-xl p-5 border border-slate-200">
        <div className="grid grid-cols-4 gap-3 mb-4">
          <div className="p-3 bg-white border border-slate-200 rounded-lg">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Database className="w-3.5 h-3.5 text-slate-400" />
              <div className="text-[10px] font-medium text-slate-500 uppercase tracking-wide">Connection Pool</div>
            </div>
            <div className="text-xl font-semibold text-slate-900 mb-1.5">100%</div>
            <div className="h-0.5 bg-red-400 rounded-full"></div>
          </div>
          
          <div className="p-3 bg-white border border-slate-200 rounded-lg">
            <div className="flex items-center gap-1.5 mb-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
              <div className="text-[10px] font-medium text-slate-500 uppercase tracking-wide">Error Rate</div>
            </div>
            <div className="text-xl font-semibold text-slate-900 mb-1">2.34%</div>
            <div className="text-[10px] text-slate-500">Normal: 0.02%</div>
          </div>
          
          <div className="p-3 bg-white border border-slate-200 rounded-lg">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <div className="text-[10px] font-medium text-slate-500 uppercase tracking-wide">P95 Latency</div>
            </div>
            <div className="text-xl font-semibold text-slate-900 mb-1">156ms</div>
            <div className="text-[10px] text-red-500">↑ 247% increase</div>
          </div>
          
          <div className="p-3 bg-white border border-slate-200 rounded-lg">
            <div className="flex items-center gap-1.5 mb-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
              <div className="text-[10px] font-medium text-slate-500 uppercase tracking-wide">Cache Hit Rate</div>
            </div>
            <div className="text-xl font-semibold text-slate-900 mb-1">42%</div>
            <div className="text-[10px] text-red-500">↓ 57% decrease</div>
          </div>
        </div>

        <MetricsCharts />
        
        <div className="mt-4 flex items-center gap-2 pt-4 border-t border-slate-200">
          <button 
            onClick={handleSeeAgentActivityLogs}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200"
          >
            <Activity className="w-3.5 h-3.5" />
            See what agent checked
          </button>
          <button 
            onClick={() => handleShareClick('Real-Time System Health', 'System health metrics show critical issues: Connection Pool at 100% capacity, Error Rate at 2.34% (normal: 0.02%), P95 Latency at 156ms (↑247% increase), and Cache Hit Rate at 42% (↓57% decrease).')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share as update
          </button>
          <button 
            onClick={() => handleInvestigateClick('Real-Time System Health', 'The system is experiencing critical health issues. Connection pool is at maximum capacity (100%), which is preventing new requests from being processed. Error rate has spiked to 2.34% from a normal baseline of 0.02%, indicating widespread failures. P95 latency has increased by 247% to 156ms, significantly impacting user experience. Cache hit rate has dropped by 57% to just 42%, putting additional load on the database. These metrics suggest a cascading failure pattern that requires immediate attention.')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200"
          >
            <Search className="w-3.5 h-3.5" />
            Investigate further
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 border border-slate-200">
        <RootCauseAnalysis onInvestigate={handleInvestigateClick} />
      </div>

      <div className="space-y-3">
        <div className="bg-white rounded-xl p-5 border border-slate-200">
          <AIInvestigationSuggestions onInvestigate={handleInvestigateClick} />
        </div>
        
        <div className="bg-white rounded-xl p-5 border border-slate-200">
          <QuickRemediation />
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 border border-slate-200">
        <div className="flex items-center gap-2 mb-4">
          <GitBranch className="w-4 h-4 text-slate-400" />
          <h3 className="text-sm font-semibold text-slate-900">Similar Past Incidents</h3>
        </div>
        <div className="space-y-2">
          <div className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="flex items-center justify-between mb-1">
              <div className="text-xs font-semibold text-slate-900">INC1765432</div>
              <div className="px-2 py-0.5 bg-green-50 text-green-700 rounded-full text-[10px] font-semibold border border-green-200">87% match</div>
            </div>
            <div className="text-xs text-slate-700 mb-2">Redis pool exhaustion after deployment</div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-0.5 bg-green-50 text-green-700 rounded border border-green-200">Resolved in 45m</span>
              <span className="text-xs text-slate-500">• 3 weeks ago</span>
            </div>
          </div>
          
          <div className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="flex items-center justify-between mb-1">
              <div className="text-xs font-semibold text-slate-900">INC1723891</div>
              <div className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-[10px] font-semibold border border-blue-200">72% match</div>
            </div>
            <div className="text-xs text-slate-700 mb-2">Connection pool capacity exceeded during peak traffic</div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-0.5 bg-green-50 text-green-700 rounded border border-green-200">Resolved in 1h 12m</span>
              <span className="text-xs text-slate-500">• 6 weeks ago</span>
            </div>
          </div>
          
          <div className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="flex items-center justify-between mb-1">
              <div className="text-xs font-semibold text-slate-900">INC1698234</div>
              <div className="px-2 py-0.5 bg-cyan-50 text-cyan-700 rounded-full text-[10px] font-semibold border border-cyan-200">68% match</div>
            </div>
            <div className="text-xs text-slate-700 mb-2">Database connection timeout after config change</div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-0.5 bg-green-50 text-green-700 rounded border border-green-200">Resolved in 38m</span>
              <span className="text-xs text-slate-500">• 8 weeks ago</span>
            </div>
          </div>
          
          <div className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="flex items-center justify-between mb-1">
              <div className="text-xs font-semibold text-slate-900">INC1645678</div>
              <div className="px-2 py-0.5 bg-slate-50 text-slate-700 rounded-full text-[10px] font-semibold border border-slate-200">54% match</div>
            </div>
            <div className="text-xs text-slate-700 mb-2">Memory leak causing service degradation</div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-0.5 bg-green-50 text-green-700 rounded border border-green-200">Resolved in 2h 5m</span>
              <span className="text-xs text-slate-500">• 12 weeks ago</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex items-center gap-2 pt-4 border-t border-slate-200">
          <button 
            onClick={handleSeeAgentActivity}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200"
          >
            <Activity className="w-3.5 h-3.5" />
            See what agent checked
          </button>
          <button 
            onClick={() => handleShareClick('Similar Past Incidents', 'Pattern analysis found 4 similar incidents: INC1765432 (87% match, resolved in 45m), INC1723891 (72% match, resolved in 1h12m), INC1698234 (68% match, resolved in 38m), INC1645678 (54% match, resolved in 2h5m). Historical patterns suggest connection pool scaling as primary resolution.')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share as update
          </button>
          <button 
            onClick={() => handleInvestigateClick('Similar Past Incidents', 'AI analysis has identified 4 similar historical incidents with high confidence matches. INC1765432 shows an 87% pattern match and was resolved in 45 minutes by scaling the connection pool. INC1723891 (72% match) took 1 hour 12 minutes to resolve with similar scaling adjustments. INC1698234 (68% match) was resolved in 38 minutes, and INC1645678 (54% match) took 2 hours 5 minutes. All incidents shared common characteristics: sudden connection pool exhaustion, elevated error rates, and latency spikes. The most effective resolution across all cases was proactive connection pool scaling combined with cache optimization.')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200"
          >
            <Search className="w-3.5 h-3.5" />
            Investigate further
          </button>
        </div>
      </div>
    </div>
  );

  const renderManagerView = () => (
    <div className="space-y-3">
      <ImpactMetricsCards onInvestigate={handleInvestigateClick} />

      <div className="bg-white rounded-xl p-5 border border-slate-200">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-4 h-4 text-slate-400" />
          <h3 className="text-sm font-semibold text-slate-900">Team Response Status</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <div>
              <div className="text-sm text-slate-700">All hands on deck</div>
              <div className="text-xs text-slate-500">6 team members actively responding</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 border border-slate-200 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-semibold">JC</div>
                <div>
                  <div className="text-xs font-semibold text-slate-900">James Chen (SRE Lead)</div>
                  <div className="text-xs text-slate-600">Leading technical response</div>
                </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
            
            <div className="flex items-center justify-between p-2 border border-slate-200 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-semibold">MR</div>
                <div>
                  <div className="text-xs font-semibold text-slate-900">Maria Rodriguez (Backend)</div>
                  <div className="text-xs text-slate-600">Analyzing deployment changes</div>
                </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex items-center gap-2 pt-4 border-t border-slate-200">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200">
            <ExternalLink className="w-3.5 h-3.5" />
            View details
          </button>
          <button 
            onClick={() => handleShareClick('Team Response Status', 'All hands on deck with 6 team members actively responding. James Chen (SRE Lead) leading technical response, Maria Rodriguez analyzing deployment changes. Team coordination in progress.')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share as update
          </button>
          <button 
            onClick={() => handleInvestigateClick('Team Response Status', 'The incident response team is fully mobilized with 6 active members coordinating across multiple workstreams. James Chen, our SRE Lead, is directing the technical investigation and implementing immediate remediation steps. Maria Rodriguez from the DevOps team is conducting a deep dive analysis of recent deployment changes to identify potential triggers. Sarah Johnson is monitoring system metrics in real-time, while Tom Anderson is coordinating with affected service teams. The team has established clear communication channels and is following the incident response playbook with regular status updates every 15 minutes.')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200"
          >
            <Search className="w-3.5 h-3.5" />
            Investigate further
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 border border-slate-200">
        <SuggestedTeamInvites />
      </div>

      <div className="bg-white rounded-xl p-5 border border-slate-200">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-4 h-4 text-slate-400" />
          <h3 className="text-sm font-semibold text-slate-900">Resolution Timeline</h3>
        </div>
        <div className="space-y-2">
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <div className="w-px h-full bg-slate-200 mt-1"></div>
            </div>
            <div className="flex-1 pb-2">
              <div className="flex items-center justify-between mb-1">
                <div className="text-xs font-semibold text-slate-900">Incident Detected</div>
                <div className="text-xs text-slate-500">14:32 UTC</div>
              </div>
              <div className="text-xs text-slate-600">Automated monitoring triggered SEV-1 alert</div>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <div className="w-px h-full bg-slate-200 mt-1"></div>
            </div>
            <div className="flex-1 pb-2">
              <div className="flex items-center justify-between mb-1">
                <div className="text-xs font-semibold text-slate-900">Response Team Assembled</div>
                <div className="text-xs text-slate-500">14:35 UTC</div>
              </div>
              <div className="text-xs text-slate-600">6 team members joined war room</div>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <div className="w-px h-full bg-slate-200 mt-1"></div>
            </div>
            <div className="flex-1 pb-2">
              <div className="flex items-center justify-between mb-1">
                <div className="text-xs font-semibold text-slate-900">Root Cause Identified</div>
                <div className="text-xs text-slate-500">14:48 UTC</div>
              </div>
              <div className="text-xs text-slate-600">Redis connection pool exhaustion confirmed</div>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <div className="text-xs font-semibold text-slate-900">Mitigation In Progress</div>
                <div className="text-xs text-cyan-600 font-semibold">NOW</div>
              </div>
              <div className="text-xs text-slate-600">Scaling connection pool capacity</div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex items-center gap-2 pt-4 border-t border-slate-200">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200">
            <ExternalLink className="w-3.5 h-3.5" />
            View full timeline
          </button>
          <button 
            onClick={() => handleShareClick('Resolution Timeline', 'Timeline update: Incident detected at 14:32 UTC, response team assembled by 14:35, root cause identified at 14:48 (Redis connection pool exhaustion). Currently mitigating by scaling connection pool capacity.')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share as update
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 border border-slate-200">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-4 h-4 text-slate-400" />
          <h3 className="text-sm font-semibold text-slate-900">Stakeholder Communication</h3>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <div>
                <div className="text-xs font-semibold text-slate-900">Status Page Updated</div>
                <div className="text-xs text-slate-600">Public status page updated with incident details</div>
              </div>
            </div>
            <div className="text-xs text-slate-500">2 min ago</div>
          </div>
          
          <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <div>
                <div className="text-xs font-semibold text-slate-900">Executive Notification Sent</div>
                <div className="text-xs text-slate-600">C-suite notified via priority channel</div>
              </div>
            </div>
            <div className="text-xs text-slate-500">8 min ago</div>
          </div>
          
          <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-amber-600" />
              <div>
                <div className="text-xs font-semibold text-slate-900">Next Update Due</div>
                <div className="text-xs text-slate-600">15-minute update cadence established</div>
              </div>
            </div>
            <div className="text-xs text-amber-600 font-semibold">In 7 minutes</div>
          </div>
        </div>
        
        <div className="mt-4 flex items-center gap-2 pt-4 border-t border-slate-200">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-700 rounded-lg transition-all">
            <Bell className="w-3.5 h-3.5" />
            Send update now
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200">
            <ExternalLink className="w-3.5 h-3.5" />
            View all communications
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 border border-slate-200">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-4 h-4 text-slate-400" />
          <h3 className="text-sm font-semibold text-slate-900">Key Metrics</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-white border border-slate-200 rounded-lg">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-600" />
              <div className="text-[10px] font-medium text-slate-700 uppercase tracking-wide">Time to Detect</div>
            </div>
            <div className="text-xl font-semibold text-slate-900">3m 12s</div>
            <div className="text-[10px] text-green-600">↓ 45% faster</div>
          </div>
          
          <div className="p-3 bg-white border border-slate-200 rounded-lg">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Users className="w-3.5 h-3.5 text-slate-600" />
              <div className="text-[10px] font-medium text-slate-700 uppercase tracking-wide">Time to Assemble</div>
            </div>
            <div className="text-xl font-semibold text-slate-900">3m 0s</div>
            <div className="text-[10px] text-green-600">Within SLA</div>
          </div>
          
          <div className="p-3 bg-white border border-slate-200 rounded-lg">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Search className="w-3.5 h-3.5 text-slate-600" />
              <div className="text-[10px] font-medium text-slate-700 uppercase tracking-wide">Time to Identify</div>
            </div>
            <div className="text-xl font-semibold text-slate-900">16m 0s</div>
            <div className="text-[10px] text-amber-600">Target: 15m</div>
          </div>
          
          <div className="p-3 bg-white border border-slate-200 rounded-lg">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Activity className="w-3.5 h-3.5 text-slate-600" />
              <div className="text-[10px] font-medium text-slate-700 uppercase tracking-wide">Current Duration</div>
            </div>
            <div className="text-xl font-semibold text-slate-900">22m 30s</div>
            <div className="text-[10px] text-slate-600">Ongoing</div>
          </div>
        </div>
        
        <div className="mt-4 flex items-center gap-2 pt-4 border-t border-slate-200">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200">
            <ExternalLink className="w-3.5 h-3.5" />
            View detailed metrics
          </button>
          <button 
            onClick={() => handleShareClick('Key Metrics', 'Incident metrics: Time to Detect: 3m 12s (45% faster), Time to Assemble: 3m (within SLA), Time to Identify: 16m (target: 15m), Current Duration: 22m 30s and ongoing.')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share as update
          </button>
        </div>
      </div>

      <ImpactedServicesTable onInvestigate={handleInvestigateClick} />
    </div>
  );

  const renderExecutiveView = () => (
    <div className="space-y-3">
      <div className="bg-white rounded-xl p-5 border border-slate-200 space-y-4">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-4 h-4 text-cyan-600" />
            <h3 className="text-base font-semibold text-slate-900">Executive Summary</h3>
          </div>
          <div className="text-sm text-slate-600 ml-6">Incident INC1789966 • P1 Severity</div>
        </div>

        {/* 2x2 Grid of Metric Cards */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { Icon: Users, iconColor: 'text-red-500', title: 'Customer Impact', badge: '+340%', badgeClass: 'bg-emerald-50 text-emerald-600 border-emerald-100', value: '24.3K', sub: 'Users experiencing issues', stroke: '#ef4444', trendLabel: 'Increasing', trendColor: 'text-red-600', trendArrow: '↑', context: '6 regions affected', leftLabel: 'Baseline', leftValue: '7.1K', leftClass: 'text-slate-900', rightLabel: 'Peak Impact', rightValue: '28.9K', rightClass: 'text-red-600' },
            { Icon: TrendingUp, iconColor: 'text-amber-500', title: 'Financial Impact', badge: 'Critical', badgeClass: 'bg-red-50 text-red-600 border-red-100', value: '$12.4K', sub: 'Revenue loss per hour', stroke: '#f59e0b', trendLabel: 'Increasing', trendColor: 'text-amber-600', trendArrow: '↑', context: 'SLA breach in 28m', leftLabel: 'Total Loss', leftValue: '$6.6K', leftClass: 'text-slate-900', rightLabel: 'Projected 4h', rightValue: '$49.6K', rightClass: 'text-slate-900' },
            { Icon: Clock, iconColor: 'text-blue-500', title: 'Response Time', badge: 'Active', badgeClass: 'bg-blue-50 text-blue-600 border-blue-100', value: '32min', sub: 'Current duration', stroke: '#3b82f6', trendLabel: 'Increasing', trendColor: 'text-blue-600', trendArrow: '↑', context: 'Target: 1h MTTRes', leftLabel: 'Started', leftValue: '14:23 UTC', leftClass: 'text-slate-900', rightLabel: 'First Response', rightValue: '2m 15s', rightClass: 'text-emerald-600' },
            { Icon: Shield, iconColor: 'text-emerald-500', title: 'Team Coverage', badge: 'Optimal', badgeClass: 'bg-emerald-50 text-emerald-600 border-emerald-100', value: '100%', sub: 'Full incident response', stroke: '#10b981', trendLabel: 'Stable', trendColor: 'text-emerald-600', trendArrow: '–', context: 'Eng, SRE, PM, IC', leftLabel: 'Responders', leftValue: '5 of 5', leftClass: 'text-slate-900', rightLabel: 'On-Call', rightValue: 'All Active', rightClass: 'text-emerald-600' },
          ].map((c) => (
            <div key={c.title} className="p-2.5 border border-slate-200 rounded-lg bg-white">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <c.Icon className={`w-3.5 h-3.5 ${c.iconColor}`} />
                  <span className="text-xs text-slate-700">{c.title}</span>
                </div>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium border ${c.badgeClass}`}>{c.badge}</span>
              </div>
              <div className="text-lg font-semibold text-slate-900 leading-tight">{c.value}</div>
              <div className="text-[11px] text-slate-500 mb-2">{c.sub}</div>

              <div className="h-6 mb-1">
                <svg width="100%" height="100%" viewBox="0 0 300 32" preserveAspectRatio="none">
                  <path d="M 0 26 Q 80 24, 150 18 T 300 6" fill="none" stroke={c.stroke} strokeWidth="1.5" opacity="0.85" />
                </svg>
              </div>

              <div className="flex items-center justify-between text-[11px] mb-2">
                <span className={c.trendColor}>{c.trendArrow} {c.trendLabel}</span>
                <span className="text-slate-500">{c.context}</span>
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                <div className="bg-slate-50 rounded px-2 py-1.5">
                  <div className="text-[10px] text-slate-500">{c.leftLabel}</div>
                  <div className={`text-xs font-semibold ${c.leftClass}`}>{c.leftValue}</div>
                </div>
                <div className="bg-slate-50 rounded px-2 py-1.5">
                  <div className="text-[10px] text-slate-500">{c.rightLabel}</div>
                  <div className={`text-xs font-semibold ${c.rightClass}`}>{c.rightValue}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* What's Happening */}
        <div className="p-4 border border-slate-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-3 h-3 rounded-full border-2 border-cyan-500 bg-white" />
            <h4 className="text-sm font-semibold text-slate-900">What's Happening</h4>
          </div>
          <p className="text-xs text-slate-600 mb-2 ml-5">
            Redis connection pool exhaustion in our cache layer is affecting 24,300 users across US-West and US-East regions.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 ml-5">
            <Clock className="w-3 h-3" />
            <span>Started at 14:23 UTC following deployment v2.4.0</span>
          </div>
        </div>

        {/* Response Status */}
        <div className="p-4 border border-slate-200 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-3 h-3 rounded-full border-2 border-emerald-500 bg-white" />
            <h4 className="text-sm font-semibold text-slate-900">Response Status</h4>
          </div>

          <div className="space-y-2.5 ml-1">
            {[
              { ringColor: 'border-emerald-500', title: 'Root Cause Identified', detail: 'Deployment reduced pool capacity from 1,500 to 1,000 connections (94% confidence)' },
              { ringColor: 'border-emerald-500', title: 'Full Team Response', detail: '6 engineers actively working on resolution' },
              { ringColor: 'border-cyan-500', title: 'Fix in Progress', detail: 'Scaling connection pool, ETA 15-20 minutes' },
              { ringColor: 'border-emerald-500', title: 'Historical Success', detail: '2 similar incidents resolved successfully (avg 58 min)' },
            ].map((s) => (
              <div key={s.title} className="flex items-start gap-2">
                <span className={`w-3 h-3 rounded-full border-2 ${s.ringColor} bg-white mt-0.5 flex-shrink-0`} />
                <div>
                  <div className="text-xs font-semibold text-slate-900">{s.title}</div>
                  <div className="text-xs text-slate-500">{s.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-4 flex items-center gap-2 pt-4 border-t border-slate-200">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200">
            <ExternalLink className="w-3.5 h-3.5" />
            View full details
          </button>
          <button 
            onClick={() => handleShareClick('Executive Summary', 'SEV-1 incident affecting 24.3K users (↑340%) with $12.4K/hour revenue impact. Response time: 32min (target: 1h MTTRes). Team coverage: 100% optimal with 5 of 5 responders active. Root cause: Redis connection pool exhaustion from deployment v2.4.0 at 14:23 UTC.')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share as update
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-red-600" />
            <h3 className="text-sm font-semibold text-slate-900">Impact Trend</h3>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 bg-red-50 border border-red-200 rounded-full">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-semibold text-red-700 uppercase tracking-wide">Escalating</span>
          </div>
        </div>

        {/* Critical Alert Banner */}
        <div className="p-4 bg-white border border-slate-200 rounded-lg mb-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="text-sm font-semibold text-slate-900 mb-3">Impact Escalating</div>
              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-xs text-slate-600">~2K users/min growth rate</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-xs text-slate-600">Payment failures ↑347%</span>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-200">
                <div className="text-xs text-slate-600">
                  <span className="font-semibold text-slate-900">15-min projection:</span> 65K users affected • $305K revenue loss
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          {/* Current Metrics Grid */}
          <div>
            <div className="text-xs font-medium text-slate-600 mb-2">Current Impact</div>
            <div className="grid grid-cols-3 gap-3">
              <div className="p-2 bg-white border border-slate-200 rounded-lg">
                <div className="flex items-center gap-1.5 mb-1">
                  <Users className="w-3.5 h-3.5 text-red-600" />
                  <div className="text-[10px] font-medium text-slate-700 uppercase tracking-wide">Affected Users</div>
                </div>
                <div className="text-lg font-semibold text-red-600 mb-0">45K</div>
                <div className="flex items-center gap-1 text-[10px] text-red-600">
                  <TrendingUp className="w-3 h-3" />
                  <span className="font-medium">Growing</span>
                </div>
              </div>
              
              <div className="p-2 bg-white border border-slate-200 rounded-lg">
                <div className="flex items-center gap-1.5 mb-1">
                  <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                  <div className="text-[10px] font-medium text-slate-700 uppercase tracking-wide">Error Rate</div>
                </div>
                <div className="text-lg font-semibold text-red-600 mb-0">2.34%</div>
                <div className="text-[10px] text-slate-600">117x normal</div>
              </div>
              
              <div className="p-2 bg-white border border-slate-200 rounded-lg">
                <div className="flex items-center gap-1.5 mb-1">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
                  <div className="text-[10px] font-medium text-slate-700 uppercase tracking-wide">Revenue Loss</div>
                </div>
                <div className="text-lg font-semibold text-amber-600 mb-0">$184K</div>
                <div className="text-[10px] text-slate-600">Last 22 min</div>
              </div>
            </div>
          </div>
          
          {/* Service Health Indicator */}
          <div className="p-3 bg-white border border-slate-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-slate-600" />
                <span className="text-xs font-medium text-slate-700">Service Health</span>
              </div>
              <span className="text-xs font-semibold text-red-600">23% degraded</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-red-500 to-amber-500 rounded-full" style={{ width: '23%' }}></div>
            </div>
            <div className="flex items-center justify-between mt-1.5 text-[10px] text-slate-500">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex items-center gap-2 pt-4 border-t border-slate-200">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200">
            <ExternalLink className="w-3.5 h-3.5" />
            View trend analysis
          </button>
          <button 
            onClick={() => handleShareClick('Impact Trend', 'Impact escalating: 45K users affected and growing at ~2K/min. Error rate at 2.34% (117x normal). Revenue loss: $184K (last 22 min). Projection: 65K users and $305K loss if unresolved in 15 min. Service health 23% degraded.')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share as update
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 border border-slate-200">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-4 h-4 text-cyan-600" />
          <h3 className="text-sm font-semibold text-slate-900">Historical Context</h3>
        </div>
        
        {/* Similar Incidents Section */}
        <div className="mb-4">
          <div className="text-xs text-slate-600 mb-2">Similar Incidents (Last 90 Days)</div>
          <div className="text-2xl font-semibold text-slate-900 mb-1">4 cases</div>
          <div className="text-xs text-slate-700 mb-4">All resolved successfully • Avg resolution: 52 minutes</div>
          
          <div className="space-y-3">
            {/* Incident 1 */}
            <div className="p-2.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm font-semibold text-slate-900">INC1765432</div>
                <span className="px-2 py-0.5 bg-green-50 text-green-700 rounded text-xs font-semibold border border-green-200">87% match</span>
              </div>
              <div className="text-xs text-slate-700 mb-1">Redis pool exhaustion after deployment</div>
              <span className="inline-block px-2 py-0.5 bg-green-50 text-green-700 rounded text-xs border border-green-200">Resolved in 45m</span>
            </div>
            
            {/* Incident 2 */}
            <div className="p-2.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm font-semibold text-slate-900">INC1723891</div>
                <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-semibold border border-blue-200">82% match</span>
              </div>
              <div className="text-xs text-slate-700 mb-1">Connection pool config change impact</div>
              <span className="inline-block px-2 py-0.5 bg-green-50 text-green-700 rounded text-xs border border-green-200">Resolved in 1h 12m</span>
            </div>
            
            {/* Incident 3 */}
            <div className="p-2.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm font-semibold text-slate-900">INC1698234</div>
                <span className="px-2 py-0.5 bg-cyan-50 text-cyan-700 rounded text-xs font-semibold border border-cyan-200">68% match</span>
              </div>
              <div className="text-xs text-slate-700 mb-1">Database connection timeout during traffic spike</div>
              <span className="inline-block px-2 py-0.5 bg-green-50 text-green-700 rounded text-xs border border-green-200">Resolved in 38m</span>
            </div>
            
            {/* Incident 4 */}
            <div className="p-2.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm font-semibold text-slate-900">INC1645821</div>
                <span className="px-2 py-0.5 bg-purple-50 text-purple-700 rounded text-xs font-semibold border border-purple-200">61% match</span>
              </div>
              <div className="text-xs text-slate-700 mb-1">Cache layer capacity exceeded post-deploy</div>
              <span className="inline-block px-2 py-0.5 bg-green-50 text-green-700 rounded text-xs border border-green-200">Resolved in 50m</span>
            </div>
          </div>
        </div>
        
        {/* Incident Frequency Trend Section */}
        <div className="mb-4 p-2.5 bg-white border border-slate-200 rounded-lg">
          <div className="text-xs text-slate-600 mb-1">Incident Frequency Trend</div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-5 h-5 text-green-600 rotate-180" />
            <div className="text-lg font-semibold text-green-600">23%</div>
          </div>
          <div className="text-xs text-slate-700">Compared to previous quarter</div>
        </div>
        
        {/* MTTR Section */}
        <div className="p-2.5 bg-white border border-slate-200 rounded-lg">
          <div className="text-xs text-slate-600 mb-1">MTTR (Mean Time To Resolve)</div>
          <div className="text-lg font-semibold text-slate-900 mb-1">45 min</div>
          <div className="text-xs text-slate-700">P1 incidents - Last 30 days</div>
        </div>
        
        <div className="mt-4 flex items-center gap-2 pt-4 border-t border-slate-200">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200">
            <ExternalLink className="w-3.5 h-3.5" />
            View incident history
          </button>
          <button 
            onClick={() => handleShareClick('Historical Context', '4 similar incidents found in last 90 days (avg 52min resolution): INC1765432 (87% match, 45m), INC1723891 (82% match, 1h12m), INC1698234 (68% match, 38m), and INC1645821 (61% match, 50m). Incident frequency down 23% vs previous quarter. MTTR for P1 incidents: 45min (last 30 days).')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share as update
          </button>
        </div>
      </div>

      <ApprovalRequest />
    </div>
  );

  const renderDeveloperView = () => (
    <div className="space-y-3">
      <div className="bg-white rounded-xl p-5 border border-slate-200">
        <div className="flex items-center gap-2 mb-4">
          <Code className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm font-semibold text-slate-900">Deployment Analysis</h3>
        </div>
        {/* Deployment content placeholder */}
      </div>
    </div>
  );

  return (
    <div className="flex gap-3">
      {/* Main Content */}
      <div className="transition-all duration-300 overflow-y-auto max-h-[calc(100vh-5rem-106px)] p-3 w-full">
        {selectedPersona === 'technical' && renderTechnicalView()}
        {selectedPersona === 'manager' && renderManagerView()}
        {selectedPersona === 'leader' && renderExecutiveView()}
      </div>
      
      <ShareUpdateModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        onShare={handleShareConfirm}
        title={shareContent.title}
        defaultContent={shareContent.content}
        author={shareContent.author}
      />
    </div>
  );
}