import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Thread {
  id: string;
  topic: string;
  context: string;
  messageCount: number;
  lastActivity: string;
}

interface ThreadContextType {
  threads: Thread[];
  addThread: (topic: string, context: string) => void;
  updateThread: (id: string, messageCount: number) => void;
  getThreadCount: () => number;
}

const ThreadContext = createContext<ThreadContextType | undefined>(undefined);

export function ThreadProvider({ children }: { children: ReactNode }) {
  const [threads, setThreads] = useState<Thread[]>([]);

  const addThread = (topic: string, context: string) => {
    const threadId = `thread-${Date.now()}`;
    const newThread: Thread = {
      id: threadId,
      topic,
      context,
      messageCount: 2, // Initial AI messages
      lastActivity: new Date().toISOString(),
    };
    
    // Check if thread with same topic already exists
    const existingThread = threads.find(t => t.topic === topic);
    if (!existingThread) {
      setThreads(prev => [...prev, newThread]);
    }
  };

  const updateThread = (id: string, messageCount: number) => {
    setThreads(prev =>
      prev.map(thread =>
        thread.id === id
          ? { ...thread, messageCount, lastActivity: new Date().toISOString() }
          : thread
      )
    );
  };

  const getThreadCount = () => threads.length;

  return (
    <ThreadContext.Provider value={{ threads, addThread, updateThread, getThreadCount }}>
      {children}
    </ThreadContext.Provider>
  );
}

export function useThreads() {
  const context = useContext(ThreadContext);
  if (context === undefined) {
    throw new Error('useThreads must be used within a ThreadProvider');
  }
  return context;
}
