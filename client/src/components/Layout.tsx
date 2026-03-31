import React, { useState, useContext, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { LessonId } from '../types';
import { Menu, Loader2 } from 'lucide-react';
import { NavigationContext } from '../App';
import { motion, AnimatePresence } from 'motion/react';
import { LESSONS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeLesson: LessonId;
  onSelectLesson: (id: LessonId) => void;
  completedLessons: Set<LessonId>;
}

export function Layout({ children, activeLesson, onSelectLesson, completedLessons }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isLoading } = useContext(NavigationContext);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is interacting with an input, textarea, select, or contenteditable
      const activeElement = document.activeElement;
      const activeTag = activeElement?.tagName;
      const isInputFocused = 
        activeTag === 'INPUT' || 
        activeTag === 'TEXTAREA' || 
        activeTag === 'SELECT' || 
        activeElement?.hasAttribute('contenteditable');
        
      if (isInputFocused) {
        return;
      }

      const currentIndex = LESSONS.findIndex(l => l.id === activeLesson);
      
      if (e.key === 'ArrowRight' || (e.metaKey && e.key === 'ArrowRight')) {
        if (currentIndex < LESSONS.length - 1) {
          onSelectLesson(LESSONS[currentIndex + 1].id);
        }
      } else if (e.key === 'ArrowLeft' || (e.metaKey && e.key === 'ArrowLeft')) {
        if (currentIndex > 0) {
          onSelectLesson(LESSONS[currentIndex - 1].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLesson, onSelectLesson]);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      <Sidebar 
        activeLesson={activeLesson} 
        onSelectLesson={onSelectLesson}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onClose={() => setIsSidebarOpen(false)}
        completedLessons={completedLessons}
      />
      
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Mobile header */}
        <header className="lg:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10">
          <div className="font-bold text-gray-900">UI/UX Master</div>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-5 h-5" />
          </button>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-hidden w-full relative bg-gray-50">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div 
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gray-50/80 backdrop-blur-sm"
              >
                <Loader2 className="w-10 h-10 animate-spin text-indigo-600 mb-4" />
                <p className="text-gray-500 font-medium animate-pulse">Loading lesson...</p>
              </motion.div>
            ) : (
              <motion.div
                key={activeLesson}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="h-full flex flex-col"
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
