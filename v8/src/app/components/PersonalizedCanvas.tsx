import { useState } from 'react';
import { User, ChevronDown, AlertCircle, Clock, TrendingUp, Users, Zap, Activity, Target, Shield, Code, BarChart3, GitBranch, CheckCircle2, AlertTriangle, Database, Server, Network, LineChart, FileText, ClipboardList, Calendar, Bell, Settings } from 'lucide-react';
import { ImpactMetricsCards } from './ImpactMetricsCards';
import { ImpactedServicesTable } from './ImpactedServicesTable';
import { ServiceDependencyGraph } from './ServiceDependencyGraph';
import { AIInvestigationSuggestions } from './AIInvestigationSuggestions';
import { QuickRemediation } from './QuickRemediation';
import { MetricsCharts } from './MetricsCharts';
import { RootCauseAnalysis } from './RootCauseAnalysis';

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
}

export function PersonalizedCanvas({ selectedPersona }: PersonalizedCanvasProps) {
  const currentPersona = personas[selectedPersona];

  const renderTechnicalView = () => (
    <div className="space-y-3">
      {/* System Health Overview */}
      <div className="bg-white rounded-xl p-5 border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-600" />
            <h3 className="text-sm font-semibold text-slate-900">Real-Time System Health</h3>
          </div>
          <div className="text-xs text-slate-500">Last updated: 2 sec ago</div>
        </div>
        <div className="grid grid-cols-4 gap-3 mb-4 items-start">
          <div className="p-3 bg-white border border-slate-200 rounded-lg">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Database className="w-3.5 h-3.5 text-red-600" />
              <div className="text-[10px] font-medium text-slate-700 uppercase tracking-wide">Connection Pool</div>
            </div>
            <div className="text-xl font-semibold text-slate-900 mb-1.5">100%</div>
            <div className="h-0.5 bg-red-500 rounded-full"></div>
          </div>
          
          <div className="p-3 bg-white border border-slate-200 rounded-lg">
            <div className="flex items-center gap-1.5 mb-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-red-600" />
              <div className="text-[10px] font-medium text-slate-700 uppercase tracking-wide">Error Rate</div>
            </div>
            <div className="text-xl font-semibold text-slate-900 mb-1">2.34%</div>
            <div className="text-[10px] text-slate-600">Normal: 0.02%</div>
          </div>
          
          <div className="p-3 bg-white border border-slate-200 rounded-lg">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <div className="text-[10px] font-medium text-slate-700 uppercase tracking-wide">P95 Latency</div>
            </div>
            <div className="text-xl font-semibold text-slate-900 mb-1">156ms</div>
            <div className="text-[10px] text-red-600">↑ 247% increase</div>
          </div>
          
          <div className="p-3 bg-white border border-slate-200 rounded-lg">
            <div className="flex items-center gap-1.5 mb-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-yellow-600" />
              <div className="text-[10px] font-medium text-slate-700 uppercase tracking-wide">Cache Hit Rate</div>
            </div>
            <div className="text-xl font-semibold text-slate-900 mb-1">42%</div>
            <div className="text-[10px] text-red-600">↓ 57% decrease</div>
          </div>
        </div>

        {/* Live Metrics Chart */}
        <MetricsCharts />
      </div>

      {/* Root Cause */}
      <div className="bg-white rounded-xl p-5 border border-slate-200">
        <RootCauseAnalysis />
      </div>

      {/* AI Suggestions & Remediation */}
      <div className="space-y-3">
        <div className="bg-white rounded-xl p-5 border border-slate-200">
          <AIInvestigationSuggestions />
        </div>
        
        <div className="bg-white rounded-xl p-5 border border-slate-200">
          <QuickRemediation />
        </div>
      </div>

      {/* Similar Past Incidents */}
      <div className="bg-white rounded-xl p-5 border border-slate-200">
        <div className="flex items-center gap-2 mb-4">
          <GitBranch className="w-4 h-4 text-purple-600" />
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
            </div>
          </div>
          
          <div className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="flex items-center justify-between mb-1">
              <div className="text-xs font-semibold text-slate-900">INC1723891</div>
              <div className="px-2 py-0.5 bg-cyan-50 text-cyan-700 rounded-full text-[10px] font-semibold border border-cyan-200">82% match</div>
            </div>
            <div className="text-xs text-slate-700 mb-2">Connection pool config change impact</div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-0.5 bg-green-50 text-green-700 rounded border border-green-200">Resolved in 1h 12m</span>
            </div>
          </div>
        </div>
      </div>

      {/* Impacted Services */}
      <ImpactedServicesTable />

      {/* Service Health Overview */}
      <div className="bg-white rounded-xl p-5 border border-slate-200">
        <div className="flex items-center gap-2 mb-4">
          <Network className="w-4 h-4 text-purple-600" />
          <h3 className="text-sm font-semibold text-slate-900">Service Health Overview</h3>
        </div>
        <ServiceDependencyGraph />
      </div>
    </div>
  );

  const renderManagerView = () => (
    <div className="space-y-3">
      {/* Business Impact Summary */}
      <ImpactMetricsCards />

      {/* Team Response Status */}
      <div className="bg-white rounded-xl p-5 border border-slate-200">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-4 h-4 text-blue-600" />
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

            <div className="flex items-center justify-between p-2 border border-slate-200 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-semibold">RK</div>
                <div>
                  <div className="text-xs font-semibold text-slate-900">Raj Krishnan (DevOps)</div>
                  <div className="text-xs text-slate-600">Preparing rollback plan</div>
                </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>

            <div className="flex items-center justify-between p-2 border border-slate-200 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-semibold">AT</div>
                <div>
                  <div className="text-xs font-semibold text-slate-900">Alex Thompson (Database)</div>
                  <div className="text-xs text-slate-600">Monitoring DB performance</div>
                </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Resolution Timeline */}
      <div className="bg-white rounded-xl p-5 border border-slate-200">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-cyan-600" />
          <h3 className="text-sm font-semibold text-slate-900">Resolution Timeline</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-semibold text-slate-900">Root cause identified</div>
              <div className="text-xs text-slate-600">Redis connection pool exhaustion (94% confidence)</div>
            </div>
            <div className="text-xs text-slate-500">14:55</div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <div className="w-4 h-4 rounded-full border-2 border-blue-400 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
              </div>
            </div>
            <div className="flex-1">
              <div className="text-xs font-semibold text-slate-900">Fix in progress</div>
              <div className="text-xs text-slate-600">Scaling connection pool to 1,500</div>
            </div>
            <div className="text-xs text-slate-500">Now</div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <Clock className="w-4 h-4 text-slate-300" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-semibold text-slate-500">Estimated resolution</div>
              <div className="text-xs text-slate-600">Based on similar incidents: 15-20 min</div>
            </div>
            <div className="text-xs text-slate-500">~15:15</div>
          </div>
        </div>
      </div>

      {/* Stakeholder Communication */}
      <div className="bg-white rounded-xl p-5 border border-slate-200">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-4 h-4 text-cyan-600" />
          <h3 className="text-sm font-semibold text-slate-900">Stakeholder Communication</h3>
        </div>
        <div className="space-y-2.5">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-xs font-medium text-slate-900">Status page updated</div>
              <div className="text-xs text-slate-500 mt-0.5">Users notified of degraded performance • 2 min ago</div>
            </div>
          </div>
          
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-xs font-medium text-slate-900">Slack war room active</div>
              <div className="text-xs text-slate-500 mt-0.5">#incident-1789966 • 24 messages • 6 participants</div>
            </div>
          </div>
          
          <div className="flex items-start gap-2.5">
            <Clock className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-xs font-medium text-slate-900">Leadership notification scheduled</div>
              <div className="text-xs text-slate-500 mt-0.5">VP Engineering will be notified if not resolved in 10 min</div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="bg-white rounded-xl p-5 border border-slate-200">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-4 h-4 text-cyan-600" />
          <h3 className="text-sm font-semibold text-slate-900">Key Metrics</h3>
        </div>
        <MetricsCharts />
      </div>

      {/* Impacted Services */}
      <ImpactedServicesTable />
    </div>
  );

  const renderExecutiveView = () => (
    <div className="space-y-3">
      {/* Executive Summary */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <div className="flex items-start justify-between mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-5 h-5 text-cyan-600" />
              <h3 className="text-base font-semibold text-slate-900">Executive Summary</h3>
            </div>
            <div className="text-sm text-slate-600">Incident INC1789966 • P1 Severity</div>
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-2 gap-3 mb-3 items-start">
          {/* Customer Impact */}
          <div className="p-3 bg-white border border-slate-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-red-500" />
                <div className="text-xs font-medium text-slate-700">Customer Impact</div>
              </div>
              <span className="px-1.5 py-0.5 bg-green-50 text-green-700 text-[10px] font-semibold rounded-full border border-green-200">+340%</span>
            </div>
            <div className="text-xl font-semibold text-slate-900">24.3K</div>
            <div className="text-xs text-slate-500 mb-2">Users experiencing issues</div>
            <div className="mb-1.5">
              <svg width="100%" height="20" viewBox="0 0 300 20" preserveAspectRatio="none">
                <path d="M0 17 Q50 15 100 13 T200 8 T300 3" stroke="#ef4444" strokeWidth="1.5" fill="none" />
              </svg>
            </div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-[11px] font-medium text-red-500">↑ Increasing</div>
              <div className="text-[11px] text-slate-500">6 regions affected</div>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <div className="p-1.5 bg-slate-50 rounded-md">
                <div className="text-[10px] text-slate-500">Baseline</div>
                <div className="text-xs font-semibold text-slate-900">7.1K</div>
              </div>
              <div className="p-1.5 bg-slate-50 rounded-md">
                <div className="text-[10px] text-slate-500">Peak Impact</div>
                <div className="text-xs font-semibold text-red-600">28.9K</div>
              </div>
            </div>
          </div>

          {/* Financial Impact */}
          <div className="p-3 bg-white border border-slate-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
                <div className="text-xs font-medium text-slate-700">Financial Impact</div>
              </div>
              <span className="px-1.5 py-0.5 bg-red-50 text-red-700 text-[10px] font-semibold rounded-full border border-red-200">Critical</span>
            </div>
            <div className="text-xl font-semibold text-slate-900">$12.4K</div>
            <div className="text-xs text-slate-500 mb-2">Revenue loss per hour</div>
            <div className="mb-1.5">
              <svg width="100%" height="20" viewBox="0 0 300 20" preserveAspectRatio="none">
                <path d="M0 18 Q75 17 150 12 T225 7 T300 2" stroke="#f59e0b" strokeWidth="1.5" fill="none" />
              </svg>
            </div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-[11px] font-medium text-amber-500">↑ Increasing</div>
              <div className="text-[11px] text-slate-500">SLA breach in 28m</div>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <div className="p-1.5 bg-slate-50 rounded-md">
                <div className="text-[10px] text-slate-500">Total Loss</div>
                <div className="text-xs font-semibold text-slate-900">$6.6K</div>
              </div>
              <div className="p-1.5 bg-slate-50 rounded-md">
                <div className="text-[10px] text-slate-500">Projected 4h</div>
                <div className="text-xs font-semibold text-slate-900">$49.6K</div>
              </div>
            </div>
          </div>

          {/* Response Time */}
          <div className="p-3 bg-white border border-slate-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-500" />
                <div className="text-xs font-medium text-slate-700">Response Time</div>
              </div>
              <span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-semibold rounded-full border border-blue-200">Active</span>
            </div>
            <div className="text-xl font-semibold text-slate-900">32min</div>
            <div className="text-xs text-slate-500 mb-2">Current duration</div>
            <div className="mb-1.5">
              <svg width="100%" height="20" viewBox="0 0 300 20" preserveAspectRatio="none">
                <path d="M0 17 Q50 15 100 13 T200 9 T300 5" stroke="#3b82f6" strokeWidth="1.5" fill="none" />
              </svg>
            </div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-[11px] font-medium text-blue-500">↑ Increasing</div>
              <div className="text-[11px] text-slate-500">Target: 1h MTTRes</div>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <div className="p-1.5 bg-slate-50 rounded-md">
                <div className="text-[10px] text-slate-500">Started</div>
                <div className="text-xs font-semibold text-slate-900">14:23 UTC</div>
              </div>
              <div className="p-1.5 bg-slate-50 rounded-md">
                <div className="text-[10px] text-slate-500">First Response</div>
                <div className="text-xs font-semibold text-green-600">2m 15s</div>
              </div>
            </div>
          </div>

          {/* Team Coverage */}
          <div className="p-3 bg-white border border-slate-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-green-500" />
                <div className="text-xs font-medium text-slate-700">Team Coverage</div>
              </div>
              <span className="px-1.5 py-0.5 bg-green-50 text-green-700 text-[10px] font-semibold rounded-full border border-green-200">Optimal</span>
            </div>
            <div className="text-xl font-semibold text-slate-900">100%</div>
            <div className="text-xs text-slate-500 mb-2">Full incident response</div>
            <div className="mb-1.5">
              <svg width="100%" height="20" viewBox="0 0 300 20" preserveAspectRatio="none">
                <path d="M0 5 Q75 4 150 4 T225 4 T300 4" stroke="#10b981" strokeWidth="1.5" fill="none" />
              </svg>
            </div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-[11px] font-medium text-green-500">– Stable</div>
              <div className="text-[11px] text-slate-500">Eng, SRE, PM, IC</div>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <div className="p-1.5 bg-slate-50 rounded-md">
                <div className="text-[10px] text-slate-500">Responders</div>
                <div className="text-xs font-semibold text-slate-900">5 of 5</div>
              </div>
              <div className="p-1.5 bg-slate-50 rounded-md">
                <div className="text-[10px] text-slate-500">On-Call</div>
                <div className="text-xs font-semibold text-green-600">All Active</div>
              </div>
            </div>
          </div>
        </div>

        {/* What's Happening */}
        <div className="bg-white rounded-lg p-4 border border-slate-200 mb-3">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="text-sm font-semibold text-slate-900 mb-2">What's Happening</div>
              <p className="text-sm text-slate-700 leading-relaxed mb-3">
                Redis connection pool exhaustion in our cache layer is affecting 24,300 users across US-West and US-East regions.
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <Clock className="w-3.5 h-3.5" />
                <span>Started at 14:23 UTC following deployment v2.4.0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Response Status */}
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <div className="text-sm font-semibold text-slate-900">Response Status</div>
          </div>
          <div className="space-y-3.5">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-sm font-medium text-slate-900 mb-0.5">Root Cause Identified</div>
                <div className="text-xs text-slate-600">Deployment reduced pool capacity from 1,500 to 1,000 connections (94% confidence)</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-sm font-medium text-slate-900 mb-0.5">Full Team Response</div>
                <div className="text-xs text-slate-600">6 engineers actively working on resolution</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-sm font-medium text-slate-900 mb-0.5">Fix in Progress</div>
                <div className="text-xs text-slate-600">Scaling connection pool, ETA 15-20 minutes</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-sm font-medium text-slate-900 mb-0.5">Historical Success</div>
                <div className="text-xs text-slate-600">2 similar incidents resolved successfully (avg 58 min)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trends & Historical Context */}
      <div className="space-y-3">
        <div className="bg-white rounded-xl p-5 border border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <LineChart className="w-4 h-4 text-purple-600" />
            <h3 className="text-sm font-semibold text-slate-900">Impact Trend</h3>
          </div>
          <MetricsCharts />
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-4 h-4 text-cyan-600" />
            <h3 className="text-sm font-semibold text-slate-900">Historical Context</h3>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-white border border-slate-200 rounded-lg">
              <div className="text-xs text-slate-600 mb-1">Similar Incidents (Last 90 Days)</div>
              <div className="text-xl font-semibold text-slate-900">2 cases</div>
              <div className="text-xs text-slate-600 mt-1">Both resolved successfully • Avg resolution: 58 minutes</div>
              
              <div className="mt-3 space-y-2">
                <div className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-xs font-semibold text-slate-900">INC1765432</div>
                    <div className="px-2 py-0.5 bg-green-50 text-green-700 rounded-full text-[10px] font-semibold border border-green-200">87% match</div>
                  </div>
                  <div className="text-xs text-slate-700 mb-1">Redis pool exhaustion after deployment</div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 bg-green-50 text-green-700 rounded border border-green-200">Resolved in 45m</span>
                  </div>
                </div>
                
                <div className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-xs font-semibold text-slate-900">INC1723891</div>
                    <div className="px-2 py-0.5 bg-cyan-50 text-cyan-700 rounded-full text-[10px] font-semibold border border-cyan-200">82% match</div>
                  </div>
                  <div className="text-xs text-slate-700 mb-1">Connection pool config change impact</div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 bg-green-50 text-green-700 rounded border border-green-200">Resolved in 1h 12m</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-white border border-slate-200 rounded-lg">
              <div className="text-xs text-slate-600 mb-1">Incident Frequency Trend</div>
              <div className="text-xl font-semibold text-green-600">↓ 23%</div>
              <div className="text-xs text-slate-600 mt-1">Compared to previous quarter</div>
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-lg">
              <div className="text-xs text-slate-600 mb-1">MTTR (Mean Time To Resolve)</div>
              <div className="text-xl font-semibold text-slate-900">45 min</div>
              <div className="text-xs text-slate-600 mt-1">P1 incidents - Last 30 days</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Actions */}
      <div className="bg-white rounded-xl p-5 border border-slate-200">
        <div className="flex items-center gap-2 mb-4">
          <ClipboardList className="w-4 h-4 text-cyan-600" />
          <h3 className="text-sm font-semibold text-slate-900">Recommended Follow-up Actions</h3>
        </div>
        <div className="space-y-3">
          <div className="relative p-4 bg-white rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 opacity-100 rounded-lg"></div>
            <div className="absolute inset-[1px] bg-white rounded-lg"></div>
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-cyan-500" />
                <div className="text-sm font-semibold text-slate-900">Post-Incident Review</div>
              </div>
              <div className="text-xs text-slate-600 mb-3">Schedule within 48 hours to analyze deployment process gaps</div>
              <button className="px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg transition-all">
                Schedule Meeting
              </button>
            </div>
          </div>
          
          <div className="p-4 bg-white border border-slate-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Bell className="w-4 h-4 text-purple-500" />
              <div className="text-sm font-semibold text-slate-900">Monitoring Enhancement</div>
            </div>
            <div className="text-xs text-slate-600">Add alerts for connection pool capacity thresholds (&gt;80%)</div>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Settings className="w-4 h-4 text-slate-500" />
              <div className="text-sm font-semibold text-slate-900">Process Improvement</div>
            </div>
            <div className="text-xs text-slate-600">Review deployment checklist for critical infrastructure changes</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDeveloperView = () => (
    <div className="space-y-3">
      {/* Deployment Analysis */}
      <div className="bg-white rounded-xl p-5 border border-slate-200">
        <div className="flex items-center gap-2 mb-4">
          <Code className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm font-semibold text-slate-900">Deployment Analysis</h3>
        </div>
        <div className="space-y-3">
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-semibold text-slate-900">Deployment v2.4.0</div>
              <div className="text-xs px-2 py-0.5 bg-red-200 text-red-700 rounded font-medium">Suspected Root Cause</div>
            </div>
            <div className="text-xs text-slate-700 mb-2">Cache configuration changes • 14:18 UTC (5 min before incident)</div>
            <div className="bg-slate-900 rounded p-3 font-mono text-xs overflow-x-auto">
              <div className="text-slate-400 mb-2"># config/cache.yaml</div>
              <div className="text-red-400">- maxConnections: 1500</div>
              <div className="text-green-400">+ maxConnections: 1000</div>
              <div className="text-slate-400 mt-2">- connectionTimeout: 5000</div>
              <div className="text-green-400">+ connectionTimeout: 3000</div>
            </div>
            <div className="mt-2 flex gap-2">
              <button className="px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg transition-all">
                View Full Diff
              </button>
              <button className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                Rollback PR
              </button>
            </div>
          </div>
          
          <div className="p-3 border border-slate-200 rounded-lg">
            <div className="text-xs font-semibold text-slate-900 mb-2">Changed Files (3)</div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-12 px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded text-center font-mono">M</div>
                <span className="text-slate-700">src/config/cache.yaml</span>
                <span className="text-slate-500 ml-auto">+2 -2</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-12 px-1.5 py-0.5 bg-green-100 text-green-700 rounded text-center font-mono">A</div>
                <span className="text-slate-700">src/utils/pool-manager.ts</span>
                <span className="text-slate-500 ml-auto">+84</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-12 px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded text-center font-mono">M</div>
                <span className="text-slate-700">src/services/redis-client.ts</span>
                <span className="text-slate-500 ml-auto">+12 -8</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error Analysis */}
      <div className="grid grid-cols-2 gap-3 items-start">
        <div className="bg-white rounded-xl p-5 border border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <h3 className="text-sm font-semibold text-slate-900">Error Patterns</h3>
          </div>
          <div className="space-y-2">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <div className="text-xs font-semibold text-slate-900">ConnectionTimeoutError</div>
                <div className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded font-medium">2,547</div>
              </div>
              <div className="bg-slate-900 rounded p-2 mt-2 font-mono text-xs text-slate-300 overflow-x-auto">
                Error: Connection pool exhausted
                <br />
                at RedisClient.connect (redis-client.ts:45)
                <br />
                Waiting for available connection...
              </div>
            </div>
            
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <div className="text-xs font-semibold text-slate-900">RedisUnavailableError</div>
                <div className="text-xs px-2 py-0.5 bg-amber-100 text-amber-700 rounded font-medium">300</div>
              </div>
              <div className="bg-slate-900 rounded p-2 mt-2 font-mono text-xs text-slate-300 overflow-x-auto">
                Error: Redis server connection failed
                <br />
                Falling back to database...
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <GitBranch className="w-4 h-4 text-purple-600" />
            <h3 className="text-sm font-semibold text-slate-900">Affected Services</h3>
          </div>
          <div className="space-y-2">
            <div className="p-3 border border-red-200 bg-red-50 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <div className="text-xs font-semibold text-slate-900">Cache Layer</div>
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
              </div>
              <div className="text-xs text-slate-700 mb-2">Primary failure point</div>
              <div className="flex items-center gap-2">
                <div className="text-xs text-red-600">Error Rate: 2.34%</div>
                <div className="text-xs text-slate-400">•</div>
                <div className="text-xs text-red-600">Pool: 100%</div>
              </div>
            </div>
            
            <div className="p-3 border border-amber-200 bg-amber-50 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <div className="text-xs font-semibold text-slate-900">Auth Service</div>
                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
              </div>
              <div className="text-xs text-slate-700 mb-2">Downstream impact</div>
              <div className="flex items-center gap-2">
                <div className="text-xs text-amber-600">Error Rate: 0.45%</div>
                <div className="text-xs text-slate-400">•</div>
                <div className="text-xs text-amber-600">Latency: +89ms</div>
              </div>
            </div>
            
            <div className="p-3 border border-slate-200 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <div className="text-xs font-semibold text-slate-900">API Gateway</div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              <div className="text-xs text-slate-700 mb-2">Healthy with retries</div>
              <div className="flex items-center gap-2">
                <div className="text-xs text-green-600">Error Rate: 0.02%</div>
                <div className="text-xs text-slate-400">•</div>
                <div className="text-xs text-slate-600">Normal</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics & Dependencies */}
      <div className="grid grid-cols-2 gap-3 items-start">
        <div className="bg-white rounded-xl p-5 border border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-cyan-600" />
            <h3 className="text-sm font-semibold text-slate-900">Performance Metrics</h3>
          </div>
          <MetricsCharts />
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <Network className="w-4 h-4 text-purple-600" />
            <h3 className="text-sm font-semibold text-slate-900">Service Dependencies</h3>
          </div>
          <ServiceDependencyGraph />
        </div>
      </div>

      {/* Root Cause & Quick Actions */}
      <div className="grid grid-cols-2 gap-3 items-start">
        <div className="bg-white rounded-xl p-5 border border-slate-200">
          <RootCauseAnalysis />
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-4 h-4 text-cyan-600" />
            <h3 className="text-sm font-semibold text-slate-900">Quick Actions</h3>
          </div>
          <div className="space-y-2">
            <button className="w-full p-3 border border-cyan-400 bg-cyan-50 rounded-lg hover:bg-cyan-100 transition-colors text-left">
              <div className="flex items-center gap-2 mb-1">
                <FileText className="w-3.5 h-3.5 text-cyan-600" />
                <div className="text-xs font-semibold text-slate-900">View Live Logs</div>
              </div>
              <div className="text-xs text-slate-700">Tail cache layer error logs in real-time</div>
            </button>
            
            <button className="w-full p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-left">
              <div className="flex items-center gap-2 mb-1">
                <GitBranch className="w-3.5 h-3.5 text-slate-600" />
                <div className="text-xs font-semibold text-slate-900">Compare Config</div>
              </div>
              <div className="text-xs text-slate-700">Diff v2.4.0 vs v2.3.9 configurations</div>
            </button>
            
            <button className="w-full p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-left">
              <div className="flex items-center gap-2 mb-1">
                <Code className="w-3.5 h-3.5 text-slate-600" />
                <div className="text-xs font-semibold text-slate-900">Prepare Rollback</div>
              </div>
              <div className="text-xs text-slate-700">Generate rollback PR for v2.4.0</div>
            </button>

            <button className="w-full p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-left">
              <div className="flex items-center gap-2 mb-1">
                <Database className="w-3.5 h-3.5 text-slate-600" />
                <div className="text-xs font-semibold text-slate-900">Check DB Queries</div>
              </div>
              <div className="text-xs text-slate-700">Analyze slow queries during cache fallback</div>
            </button>
          </div>
        </div>
      </div>

      {/* AI Suggestions */}
      <div className="bg-white rounded-xl p-5 border border-slate-200">
        <AIInvestigationSuggestions />
      </div>

      {/* Impacted Services */}
      <ImpactedServicesTable />
    </div>
  );

  return (
    <div>
      {/* Persona-specific Content */}
      {selectedPersona === 'technical' && renderTechnicalView()}
      {selectedPersona === 'manager' && renderManagerView()}
      {selectedPersona === 'leader' && renderExecutiveView()}
    </div>
  );
}