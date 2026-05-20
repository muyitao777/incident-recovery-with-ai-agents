import { MergedIncidentUpdates } from './MergedIncidentUpdates';
import { Plus } from 'lucide-react';
import { useState } from 'react';

export function RightPanel() {
  const [showAddUpdate, setShowAddUpdate] = useState(false);

  return (
    <div className="w-96 flex-shrink-0 fixed right-6 top-[92px] bottom-6 overflow-y-auto z-40">
      <div className="bg-white border border-slate-200 rounded-xl shadow-[0_1px_8px_0_rgba(0,0,0,0.03)]">
        {/* Section Header - Sticky */}
        <div className="sticky top-0 bg-white z-20 flex items-center justify-between px-5 pt-5 pb-4 border-b border-slate-200 rounded-t-xl">
          <h2 className="text-sm font-semibold text-slate-900">Incident Updates</h2>
          <button
            onClick={() => setShowAddUpdate(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Update
          </button>
        </div>

        {/* Merged Content */}
        <div className="px-5 pb-5 pt-3">
          <MergedIncidentUpdates showAddUpdate={showAddUpdate} setShowAddUpdate={setShowAddUpdate} />
        </div>
      </div>
    </div>
  );
}