import { ImpactMetricsCards } from './ImpactMetricsCards';
import { ImpactedServicesTable } from './ImpactedServicesTable';

export function OverviewTabContent() {
  return (
    <div className="w-full space-y-3">
      {/* Impact Metrics Cards */}
      <ImpactMetricsCards />

      {/* Impacted Services */}
      <ImpactedServicesTable />
    </div>
  );
}