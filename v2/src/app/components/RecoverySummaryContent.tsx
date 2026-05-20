import { ImpactMetricsCards } from './ImpactMetricsCards';
import { LikelyRootCause } from './LikelyRootCause';
import { AIInvestigationSuggestions } from './AIInvestigationSuggestions';
import { QuickRemediation } from './QuickRemediation';
import { AIAgentActivity } from './AIAgentActivity';
import { Sparkles, Brain, AlertTriangle, Database, CheckCircle } from 'lucide-react';

export function RecoverySummaryContent() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Left Column - 2/3 width */}
      <div className="col-span-2 space-y-6">
        <LikelyRootCause />
        <AIInvestigationSuggestions />
        <QuickRemediation />
      </div>

      {/* Right Column - 1/3 width */}
      <div className="col-span-1">
        <AIAgentActivity />
      </div>
    </div>
  );
}