import { UserPlus, CheckCircle2, Clock, Users } from 'lucide-react';
import { useState } from 'react';

interface SuggestedMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  color: string;
}

const suggestedMembers: SuggestedMember[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Database Specialist - Redis Expert',
    avatar: 'SJ',
    color: 'cyan'
  },
  {
    id: '2',
    name: 'Tom Anderson',
    role: 'Infrastructure Engineer - Cloud Scaling',
    avatar: 'TA',
    color: 'emerald'
  },
  {
    id: '3',
    name: 'Lisa Wang',
    role: 'Platform SRE - Cache Layer',
    avatar: 'LW',
    color: 'violet'
  },
  {
    id: '4',
    name: 'James Chen',
    role: 'SRE Lead - Incident Response',
    avatar: 'JC',
    color: 'blue'
  }
];

export function SuggestedTeamInvites() {
  const [invitedMembers, setInvitedMembers] = useState<Set<string>>(new Set());
  const [sendingInvite, setSendingInvite] = useState<string | null>(null);

  const handleInvite = (memberId: string) => {
    setSendingInvite(memberId);
    
    // Simulate sending invite
    setTimeout(() => {
      setInvitedMembers(prev => new Set([...prev, memberId]));
      setSendingInvite(null);
    }, 800);
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      cyan: { bg: 'bg-cyan-100', text: 'text-cyan-700' },
      emerald: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
      violet: { bg: 'bg-violet-100', text: 'text-violet-700' },
      blue: { bg: 'bg-blue-100', text: 'text-blue-700' }
    };
    return colors[color] || colors.cyan;
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-4 h-4 text-purple-600" />
        <h3 className="text-sm font-semibold text-slate-900">Recommended Team Members</h3>
      </div>

      <div className="space-y-2">
        {suggestedMembers.map((member) => {
          const isInvited = invitedMembers.has(member.id);
          const isSending = sendingInvite === member.id;
          const colorClasses = getColorClasses(member.color);

          return (
            <div 
              key={member.id}
              className="flex items-center justify-between p-2 border border-slate-200 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full ${colorClasses.bg} ${colorClasses.text} flex items-center justify-center text-xs font-semibold`}>
                  {member.avatar}
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-900">{member.name}</div>
                  <div className="text-xs text-slate-600">{member.role}</div>
                </div>
              </div>

              {isInvited ? (
                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-xs font-semibold">Invited</span>
                </div>
              ) : (
                <button
                  onClick={() => handleInvite(member.id)}
                  disabled={isSending}
                  className={`relative overflow-hidden px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 ${
                    isSending
                      ? 'bg-slate-200 text-slate-500 cursor-wait'
                      : 'bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 hover:from-cyan-400 hover:via-blue-400 hover:to-blue-500 text-white hover:scale-105'
                  }`}
                >
                  {isSending ? (
                    <>
                      <Clock className="w-3.5 h-3.5 animate-spin" />
                      <span className="relative z-10">Sending...</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3.5 h-3.5 relative z-10" />
                      <span className="relative z-10">Send Invite</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    </>
                  )}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}