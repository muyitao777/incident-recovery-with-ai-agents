import { MergedIncidentUpdates } from './MergedIncidentUpdates';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface RightPanelProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function RightPanel({ isCollapsed, onToggleCollapse }: RightPanelProps) {
  const [showAddUpdate, setShowAddUpdate] = useState(false);

  if (isCollapsed) {
    return (
      <div className="w-12 flex-shrink-0 h-[calc(100vh-100px)]">
        <div className="h-full flex items-start pt-3">
          <button
            onClick={onToggleCollapse}
            className="w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl hover:bg-white hover:shadow-sm transition-all"
            title="Expand Incident Updates"
          >
            <ChevronLeft className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-96 flex-shrink-0 h-[calc(100vh-100px)] mt-3">
      <div className="h-full bg-white rounded-2xl border border-slate-200/60 shadow-[0_2px_12px_0_rgba(0,0,0,0.04)] overflow-y-auto">
        {/* Section Header - Fixed at top */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm px-4 pt-3 pb-3 z-20 border-b border-slate-200/60">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-700">Incident Updates</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAddUpdate(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-700 rounded-full shadow-sm transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Update
              </button>
              <button
                onClick={onToggleCollapse}
                className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200/50 rounded-xl hover:bg-slate-50 transition-all"
                title="Collapse Incident Updates"
              >
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Merged Content */}
        <div className="px-4 pt-4 pb-4">
          <MergedIncidentUpdates showAddUpdate={showAddUpdate} setShowAddUpdate={setShowAddUpdate} />
        </div>
      </div>
    </div>
  );
}