import { CheckCircle2, Clock, FileText, ChevronRight, AlertCircle, Calendar, TrendingUp, Target, DollarSign, Users, MessageSquare, Shield, Briefcase } from 'lucide-react';
import { useState, useEffect } from 'react';

export function ApprovalRequest() {
  const [showRequest, setShowRequest] = useState(false);
  const [approved, setApproved] = useState(false);
  const [approving, setApproving] = useState(false);
  const [showRCA, setShowRCA] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Show approval request after 2 seconds to simulate it arriving
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRequest(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleApprove = () => {
    setApproving(true);
    
    setTimeout(() => {
      setApproving(false);
      setIsTransitioning(true);
      
      // Fade out before showing approved state
      setTimeout(() => {
        setApproved(true);
        setIsTransitioning(false);
        
        // Show RCA card after a brief delay
        setTimeout(() => {
          setIsTransitioning(true);
          setTimeout(() => {
            setShowRCA(true);
            setIsTransitioning(false);
          }, 500);
        }, 2500);
      }, 500);
    }, 2000);
  };

  // Show loading skeleton initially
  if (!showRequest) {
    return (
      <div className="bg-white rounded-xl p-5">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-400 rounded animate-ping opacity-20"></div>
              <div className="relative w-4 h-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded animate-pulse"></div>
            </div>
            <div className="h-3.5 w-48 bg-slate-200 rounded animate-pulse"></div>
          </div>

          {/* Description lines */}
          <div className="space-y-2">
            <div className="h-2.5 w-full bg-slate-200 rounded animate-pulse"></div>
            <div className="h-2.5 w-4/5 bg-slate-200 rounded animate-pulse"></div>
          </div>

          {/* Content section */}
          <div className="space-y-3 pt-1">
            <div className="h-2.5 w-32 bg-slate-200 rounded animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-2 w-full bg-slate-200 rounded animate-pulse"></div>
              <div className="h-2 w-3/4 bg-slate-200 rounded animate-pulse"></div>
            </div>
            
            {/* Grid */}
            <div className="grid grid-cols-2 gap-2">
              {[0, 1].map((i) => (
                <div key={i} className="p-3 bg-slate-50 rounded-lg">
                  <div className="h-2 w-16 bg-slate-200 rounded animate-pulse mb-1.5"></div>
                  <div className="h-2.5 w-20 bg-slate-300 rounded animate-pulse mb-1.5"></div>
                  <div className="h-1.5 w-24 bg-slate-100 rounded animate-pulse"></div>
                </div>
              ))}
            </div>

            {/* Info box */}
            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
              <div className="w-3.5 h-3.5 bg-slate-200 rounded animate-pulse flex-shrink-0"></div>
              <div className="h-2 flex-1 bg-slate-200 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 pt-3 border-t border-slate-200">
            <div className="h-7 w-36 bg-gradient-to-r from-slate-100 to-slate-200 rounded-lg animate-pulse"></div>
            <div className="h-7 w-24 bg-slate-100 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  // Transitioning state with loading spinner
  if (isTransitioning) {
    return (
      <div className="bg-white rounded-xl p-5">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-400 rounded animate-ping opacity-20"></div>
              <div className="relative w-4 h-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded animate-pulse"></div>
            </div>
            <div className="h-3.5 w-48 bg-slate-200 rounded animate-pulse"></div>
          </div>

          {/* Description lines */}
          <div className="space-y-2">
            <div className="h-2.5 w-full bg-slate-200 rounded animate-pulse"></div>
            <div className="h-2.5 w-4/5 bg-slate-200 rounded animate-pulse"></div>
          </div>

          {/* Content section */}
          <div className="space-y-3 pt-1">
            <div className="h-2.5 w-32 bg-slate-200 rounded animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-2 w-full bg-slate-200 rounded animate-pulse"></div>
              <div className="h-2 w-3/4 bg-slate-200 rounded animate-pulse"></div>
            </div>
            
            {/* Grid */}
            <div className="grid grid-cols-2 gap-2">
              {[0, 1].map((i) => (
                <div key={i} className="p-3 bg-slate-50 rounded-lg">
                  <div className="h-2 w-16 bg-slate-200 rounded animate-pulse mb-1.5"></div>
                  <div className="h-2.5 w-20 bg-slate-300 rounded animate-pulse mb-1.5"></div>
                  <div className="h-1.5 w-24 bg-slate-100 rounded animate-pulse"></div>
                </div>
              ))}
            </div>

            {/* Info box */}
            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
              <div className="w-3.5 h-3.5 bg-slate-200 rounded animate-pulse flex-shrink-0"></div>
              <div className="h-2 flex-1 bg-slate-200 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 pt-3 border-t border-slate-200">
            <div className="h-7 w-36 bg-gradient-to-r from-slate-100 to-slate-200 rounded-lg animate-pulse"></div>
            <div className="h-7 w-24 bg-slate-100 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (showRCA) {
    return (
      <div className={`space-y-3 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {/* Incident Resolved Banner */}
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-sm font-semibold text-slate-900">Incident Resolved</h3>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-semibold rounded-full">
                  COMPLETED
                </span>
              </div>
              <p className="text-xs text-slate-600 mb-2">
                Recovery action approved and executed successfully. All systems restored to normal operation.
              </p>
              <div className="flex items-center gap-4 text-xs text-slate-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Total Duration: 38 minutes</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Resolved at {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })} UTC</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Prepare RCA Document Card */}
        <div className="bg-white rounded-xl p-5 border border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-4 h-4 text-slate-500" />
            <h3 className="text-sm font-semibold text-slate-900">Prepare RCA Document</h3>
          </div>

          <div className="text-sm text-slate-600 mb-4">
            Schedule and conduct a thorough post-incident review within the next 48 hours
          </div>

          <div className="space-y-2 mb-4">
            <div className="text-sm font-semibold text-slate-900 mb-2">RCA Document Sections:</div>
            
            <div className="flex items-center justify-between p-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <div>
                  <div className="text-sm font-semibold text-slate-900">Incident Timeline</div>
                  <div className="text-xs text-slate-600">Auto-generated from incident data</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>

            <div className="flex items-center justify-between p-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <div>
                  <div className="text-sm font-semibold text-slate-900">Root Cause Summary</div>
                  <div className="text-xs text-slate-600">Redis connection pool exhaustion identified</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>

            <div className="flex items-center justify-between p-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <div>
                  <div className="text-sm font-semibold text-slate-900">Impact Analysis</div>
                  <div className="text-xs text-slate-600">24.3K users affected, $12.4K revenue loss</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>

            <div className="flex items-center justify-between p-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-500" />
                <div>
                  <div className="text-sm font-semibold text-slate-900">Action Items & Prevention</div>
                  <div className="text-xs text-slate-600">Requires team input and review</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>

            <div className="flex items-center justify-between p-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-500" />
                <div>
                  <div className="text-sm font-semibold text-slate-900">Lessons Learned</div>
                  <div className="text-xs text-slate-600">To be completed during review meeting</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-4 border-t border-slate-200">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-700 rounded-lg transition-all">
              <FileText className="w-3.5 h-3.5" />
              Start RCA Document
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200">
              <Calendar className="w-3.5 h-3.5" />
              Schedule Review Meeting
            </button>
          </div>
        </div>

        {/* Leadership Action Items Card */}
        <div className="bg-white rounded-xl p-5 border border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="w-4 h-4 text-cyan-600" />
            <h3 className="text-sm font-semibold text-slate-900">Leadership Action Items</h3>
          </div>

          <div className="text-sm text-slate-600 mb-4">
            Strategic decisions and executive actions required following this incident
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
              <div className="w-6 h-6 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <MessageSquare className="w-3.5 h-3.5 text-cyan-700" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className="text-sm font-semibold text-slate-900">Stakeholder Communication</div>
                  <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-semibold rounded-full">
                    URGENT
                  </span>
                </div>
                <div className="text-sm text-slate-600 mb-2">
                  Notify affected enterprise customers (24.3K users) and prepare executive summary for board. Customer success teams need guidance on compensation strategy.
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <div className="text-slate-600">
                    <span className="font-semibold text-slate-900">Impact:</span> $12.4K revenue loss
                  </div>
                  <div className="text-slate-600">
                    <span className="font-semibold text-slate-900">Due:</span> Next 24 hours
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
              <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-700" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className="text-sm font-semibold text-slate-900">Infrastructure Budget Approval</div>
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-semibold rounded-full">
                    HIGH PRIORITY
                  </span>
                </div>
                <div className="text-sm text-slate-600 mb-2">
                  Approve $85K budget increase for Redis auto-scaling and redundancy improvements. ROI analysis shows 3-month payback period based on incident prevention.
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <div className="text-slate-600">
                    <span className="font-semibold text-slate-900">ROI:</span> Prevent $300K+ annual losses
                  </div>
                  <div className="text-slate-600">
                    <span className="font-semibold text-slate-900">Review:</span> CFO approval needed
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Users className="w-3.5 h-3.5 text-blue-700" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className="text-sm font-semibold text-slate-900">SRE Team Capacity Review</div>
                  <span className="px-2 py-0.5 bg-cyan-100 text-cyan-700 text-[10px] font-semibold rounded-full">
                    STRATEGIC
                  </span>
                </div>
                <div className="text-sm text-slate-600 mb-2">
                  Authorize 2 additional SRE hires to improve on-call rotation and reduce burnout. Current team handled 47 incidents in Q4, exceeding sustainable capacity.
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <div className="text-slate-600">
                    <span className="font-semibold text-slate-900">Cost:</span> $320K annually
                  </div>
                  <div className="text-slate-600">
                    <span className="font-semibold text-slate-900">Timeline:</span> Begin hiring in Feb 2026
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
              <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Shield className="w-3.5 h-3.5 text-purple-700" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className="text-sm font-semibold text-slate-900">Compliance & Risk Assessment</div>
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-semibold rounded-full">
                    REQUIRED
                  </span>
                </div>
                <div className="text-sm text-slate-600 mb-2">
                  Review incident against SLA commitments and SOC 2 requirements. Legal needs to assess customer contract obligations and potential penalties.
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <div className="text-slate-600">
                    <span className="font-semibold text-slate-900">Stakeholders:</span> Legal, Security
                  </div>
                  <div className="text-slate-600">
                    <span className="font-semibold text-slate-900">Deadline:</span> 1 week
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-200">
            <div className="text-xs text-slate-600">
              <span className="font-semibold text-slate-900">4 action items</span> requiring executive decision
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-700 rounded-lg transition-all">
              Review All Items
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (approved) {
    return (
      <div className={`bg-white border border-slate-200 rounded-xl p-5 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-sm font-semibold text-slate-900">Approval Confirmed</h3>
              <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-semibold rounded-full">
                EXECUTING
              </span>
            </div>
            <p className="text-xs text-slate-600 mb-3">
              Recovery action has been approved and is now being executed. System recovery in progress...
            </p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full animate-pulse" style={{ width: '75%' }}></div>
              </div>
              <span className="text-xs font-semibold text-slate-700">75%</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200">
      <div className="flex items-center gap-2 mb-4">
        <AlertCircle className="w-4 h-4 text-slate-500" />
        <h3 className="text-sm font-semibold text-slate-900">Recovery Action Approval Required</h3>
      </div>

      <div className="text-sm text-slate-600 mb-4">
        The incident response team has identified a recovery action and is waiting for your approval to proceed
      </div>

      <div className="mb-4">
        <div className="text-sm font-semibold text-slate-900 mb-2">Requested Action:</div>
        <div className="text-sm text-slate-700 mb-3">
          Scale Redis connection pool from 1,000 to 2,000 connections to resolve exhaustion issue
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="p-2.5 bg-white rounded-lg border border-slate-200">
            <div className="text-xs text-slate-500 mb-0.5">Requested By</div>
            <div className="text-sm font-semibold text-slate-900">James Chen</div>
            <div className="text-xs text-slate-600">Technical Responder</div>
          </div>
          <div className="p-2.5 bg-white rounded-lg border border-slate-200">
            <div className="text-xs text-slate-500 mb-0.5">Expected Impact</div>
            <div className="text-sm font-semibold text-green-700">Full Recovery</div>
            <div className="text-xs text-slate-600">ETA: 5-8 minutes</div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 p-2.5 bg-white rounded-lg border border-slate-200">
          <CheckCircle2 className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
          <div className="text-sm text-slate-700">
            <span className="font-semibold">Confidence: 94%</span> • Based on 2 similar past incidents resolved successfully
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-4 border-t border-slate-200">
        <button
          onClick={handleApprove}
          disabled={approving}
          className={`relative overflow-hidden flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            approving
              ? 'bg-slate-200 text-slate-500 cursor-wait'
              : 'bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-700 text-white hover:scale-105'
          }`}
        >
          {approving ? (
            <>
              <Clock className="w-3.5 h-3.5 animate-spin" />
              <span>Approving...</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Approve Recovery Action</span>
            </>
          )}
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200">
          View Details
        </button>
      </div>
    </div>
  );
}