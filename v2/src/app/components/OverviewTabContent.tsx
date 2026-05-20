import { ImpactMetricsCards } from './ImpactMetricsCards';
import { ImpactedServicesTable } from './ImpactedServicesTable';
import { IncidentTimeline } from './IncidentTimeline';
import { InvolvedPeople } from './InvolvedPeople';

export function OverviewTabContent() {
  return (
    <div className="space-y-6">
      {/* Impact Metrics Cards */}
      <ImpactMetricsCards />

      {/* Bottom Grid */}
      <div className="grid grid-cols-3 gap-6 items-start">
        {/* Impacted Services */}
        <div className="col-span-2 flex">
          <ImpactedServicesTable />
        </div>

        {/* Incident Timeline */}
        <div className="flex">
          <IncidentTimeline />
        </div>
      </div>

      {/* Involved People - Same width as Impacted Services */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <InvolvedPeople />
        </div>
      </div>
    </div>
  );
}