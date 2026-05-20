import { RootCauseAnalysis } from './RootCauseAnalysis';
import { AIInvestigationSuggestions } from './AIInvestigationSuggestions';
import { QuickRemediation } from './QuickRemediation';

export function RecoverySummaryContent() {
  return (
    <div className="w-full space-y-3">
      <RootCauseAnalysis />
      <AIInvestigationSuggestions />
      <QuickRemediation />
    </div>
  );
}