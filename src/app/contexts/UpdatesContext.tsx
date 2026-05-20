import { createContext, useContext, useState, ReactNode } from 'react';

export interface SharedUpdate {
  id: string;
  time: string;
  type: 'user';
  author: string;
  title: string;
  content: string;
  cardType: string;
  timestamp: number;
}

interface UpdatesContextType {
  sharedUpdates: SharedUpdate[];
  addSharedUpdate: (update: Omit<SharedUpdate, 'id' | 'time' | 'type' | 'timestamp'>) => void;
  highlightedAgentIds: string[];
  setHighlightedAgentIds: (ids: string[]) => void;
  showApprovalNotification: boolean;
  setShowApprovalNotification: (show: boolean) => void;
}

const UpdatesContext = createContext<UpdatesContextType | undefined>(undefined);

export function UpdatesProvider({ children }: { children: ReactNode }) {
  const [sharedUpdates, setSharedUpdates] = useState<SharedUpdate[]>([]);
  const [highlightedAgentIds, setHighlightedAgentIds] = useState<string[]>([]);
  const [showApprovalNotification, setShowApprovalNotification] = useState(false);

  const addSharedUpdate = (update: Omit<SharedUpdate, 'id' | 'time' | 'type' | 'timestamp'>) => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    
    const newUpdate: SharedUpdate = {
      ...update,
      id: `shared-${Date.now()}`,
      time: `${hours}:${minutes}`,
      type: 'user',
      timestamp: Date.now(),
    };

    setSharedUpdates(prev => [newUpdate, ...prev]);
  };

  return (
    <UpdatesContext.Provider value={{ sharedUpdates, addSharedUpdate, highlightedAgentIds, setHighlightedAgentIds, showApprovalNotification, setShowApprovalNotification }}>
      {children}
    </UpdatesContext.Provider>
  );
}

export function useUpdates() {
  const context = useContext(UpdatesContext);
  if (context === undefined) {
    throw new Error('useUpdates must be used within an UpdatesProvider');
  }
  return context;
}