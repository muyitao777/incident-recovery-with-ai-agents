import { Users, MessageCircle, Phone, Mail, Clock } from 'lucide-react';

const teamMembers = [
  {
    name: 'Priya Patel',
    role: 'Incident Commander',
    avatar: 'PP',
    status: 'active',
    lastActive: 'Active now',
    contact: { slack: '@priya.patel', email: 'priya_patel@intuit.com' }
  },
  {
    name: 'James Chen',
    role: 'SRE Lead',
    avatar: 'JC',
    status: 'active',
    lastActive: 'Active now',
    contact: { slack: '@james.chen', email: 'james_chen@intuit.com' }
  },
  {
    name: 'Maria Rodriguez',
    role: 'Backend Engineer',
    avatar: 'MR',
    status: 'active',
    lastActive: '2 min ago',
    contact: { slack: '@maria.rodriguez', email: 'maria_rodriguez@intuit.com' }
  },
  {
    name: 'Raj Krishnan',
    role: 'DevOps Engineer',
    avatar: 'RK',
    status: 'active',
    lastActive: '5 min ago',
    contact: { slack: '@raj.krishnan', email: 'raj_krishnan@intuit.com' }
  },
  {
    name: 'Alex Thompson',
    role: 'Product Manager',
    avatar: 'AT',
    status: 'away',
    lastActive: '15 min ago',
    contact: { slack: '@alex.thompson', email: 'alex_thompson@intuit.com' }
  },
  {
    name: 'Sarah Kim',
    role: 'Infrastructure Lead',
    avatar: 'SK',
    status: 'active',
    lastActive: '8 min ago',
    contact: { slack: '@sarah.kim', email: 'sarah_kim@intuit.com' }
  },
  {
    name: 'Michael O\'Brien',
    role: 'Security Engineer',
    avatar: 'MO',
    status: 'active',
    lastActive: '12 min ago',
    contact: { slack: '@michael.obrien', email: 'michael_obrien@intuit.com' }
  }
];

export function InvolvedPeople() {
  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-[0_1px_8px_0_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-slate-700">Involved People</h3>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span>6 active</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {teamMembers.map((member, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
                  idx === 0 ? 'bg-red-100 text-red-700' :
                  idx === 1 ? 'bg-blue-100 text-blue-700' :
                  idx === 2 ? 'bg-purple-100 text-purple-700' :
                  idx === 3 ? 'bg-green-100 text-green-700' :
                  idx === 4 ? 'bg-amber-100 text-amber-700' :
                  idx === 5 ? 'bg-cyan-100 text-cyan-700' :
                  'bg-pink-100 text-pink-700'
                }`}>
                  {member.avatar}
                </div>
                <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                  member.status === 'active' ? 'bg-green-500' : 'bg-amber-500'
                }`}></div>
              </div>
              
              {/* Info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-base font-medium text-slate-800 truncate">{member.name}</span>
                  {idx === 0 && (
                    <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded font-semibold flex-shrink-0">
                      COMMANDER
                    </span>
                  )}
                </div>
                <div className="text-sm text-slate-600 truncate">{member.role}</div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
              <button className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center transition-colors">
                <MessageCircle className="w-3.5 h-3.5 text-slate-600" />
              </button>
              <button className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center transition-colors">
                <Phone className="w-3.5 h-3.5 text-slate-600" />
              </button>
              <button className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center transition-colors">
                <Mail className="w-3.5 h-3.5 text-slate-600" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Add Member Button */}
      <button className="w-full mt-3 py-2 border-2 border-dashed border-slate-300 rounded-lg text-sm font-medium text-slate-600 hover:border-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
        <Users className="w-4 h-4" />
        Add Team Member
      </button>
    </div>
  );
}