import { Clock, X } from 'lucide-react';
import { useUpdates } from '@/app/contexts/UpdatesContext';

export function ApprovalNotificationBanner() {
  const { showApprovalNotification, setShowApprovalNotification } = useUpdates();

  if (!showApprovalNotification) return null;

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top duration-300">
      <div className="bg-white rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-amber-200 px-5 py-3 min-w-[600px] max-w-2xl">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <Clock className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <h3 className="text-sm font-semibold text-slate-900">
                Waiting for Accountable Leader Approval
              </h3>
              <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-semibold rounded-full">
                Pending
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Recovery execution has been initiated and is pending approval from <span className="font-semibold text-slate-900">David Kim</span> (Accountable Leader)
            </p>
          </div>
          
          {/* Close Button */}
          <button
            onClick={() => setShowApprovalNotification(false)}
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>
      </div>
    </div>
  );
}