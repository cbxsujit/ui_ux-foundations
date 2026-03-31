import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { NavigationContext } from '../App';
import { LESSONS } from '../constants';

interface LessonLayoutProps {
  title: string;
  description: string;
  theory: React.ReactNode;
  playground: React.ReactNode;
}

export function LessonLayout({ title, description, theory, playground }: LessonLayoutProps) {
  const { activeLesson, setActiveLesson, markLessonCompleted, completedLessons } = useContext(NavigationContext);
  const [activeTab, setActiveTab] = React.useState<'theory' | 'playground'>('theory');
  const [readingProgress, setReadingProgress] = React.useState(0);
  const theoryRef = React.useRef<HTMLDivElement>(null);
  
  const handleScroll = () => {
    if (!theoryRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = theoryRef.current;
    const windowHeight = scrollHeight - clientHeight;
    const progress = windowHeight === 0 ? 0 : (scrollTop / windowHeight) * 100;
    setReadingProgress(progress);
  };

  React.useEffect(() => {
    setReadingProgress(0);
    if (theoryRef.current) {
      theoryRef.current.scrollTop = 0;
    }
  }, [activeLesson]);
  
  const currentIndex = LESSONS.findIndex(l => l.id === activeLesson);
  const currentLesson = LESSONS[currentIndex];
  const prevLesson = currentIndex > 0 ? LESSONS[currentIndex - 1] : null;
  const nextLesson = currentIndex < LESSONS.length - 1 ? LESSONS[currentIndex + 1] : null;
  const isCompleted = completedLessons.has(activeLesson);

  const handleNext = () => {
    if (!isCompleted) {
      markLessonCompleted(activeLesson);
    }
    if (nextLesson) {
      setActiveLesson(nextLesson.id);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col lg:flex-row bg-slate-50"
    >
      {/* Mobile Tabs */}
      <div className="lg:hidden flex border-b border-gray-200 bg-white sticky top-0 z-30 relative">
        {(['theory', 'playground'] as const).map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-4 text-sm font-bold transition-colors relative ${activeTab === tab ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
          >
            {tab === 'theory' ? 'Theory' : 'Interactive Lab'}
            {activeTab === tab && (
              <motion.div
                layoutId="mobileTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Theory Section */}
      <div className={`w-full lg:w-[420px] xl:w-[500px] bg-white border-r border-gray-200 shrink-0 z-10 shadow-[8px_0_32px_rgba(0,0,0,0.03)] flex-col relative ${activeTab === 'theory' ? 'flex flex-1 lg:flex-none' : 'hidden lg:flex'}`}>
        {/* Reading Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 z-50">
          <div 
            className="h-full bg-indigo-500 transition-all duration-150 ease-out"
            style={{ width: `${readingProgress}%` }}
          />
        </div>

        {/* Scrollable Content */}
        <div 
          ref={theoryRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto p-6 lg:p-12 relative"
        >
          <div className="max-w-md mx-auto flex-1 w-full mt-2">
            {/* Breadcrumbs */}
            <nav className="flex text-xs font-medium text-gray-400 mb-6" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-2">
                <li className="inline-flex items-center">
                  <span className="hover:text-gray-600 transition-colors">{currentLesson?.category}</span>
                </li>
                <li>
                  <div className="flex items-center">
                    <ChevronRight className="w-3 h-3 mx-1" />
                    <span className="text-gray-900">{title}</span>
                  </div>
                </li>
              </ol>
            </nav>

            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider">
                  <span className={`w-1.5 h-1.5 rounded-full ${isCompleted ? 'bg-emerald-500' : 'bg-indigo-600 animate-pulse'}`}></span>
                  {isCompleted ? 'Lesson Completed' : 'Lesson Module'}
                </div>
                {!isCompleted && (
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => markLessonCompleted(activeLesson)}
                    className="text-xs font-bold text-gray-500 hover:text-emerald-600 transition-colors flex items-center gap-1 bg-gray-50 hover:bg-emerald-50 px-3 py-1.5 rounded-full border border-gray-200 hover:border-emerald-200"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    Mark Complete
                  </motion.button>
                )}
              </div>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">{title}</h1>
              <p className="text-xl text-gray-500 leading-relaxed font-medium">{description}</p>
            </div>
            
            <div className="prose prose-indigo prose-sm sm:prose-base max-w-none">
              {theory}
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between gap-4">
            {prevLesson ? (
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveLesson(prevLesson.id)}
                className="group flex items-center gap-3 px-5 py-2.5 text-sm font-semibold text-gray-600 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-colors shadow-sm"
              >
                <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <div className="text-left">
                  <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold leading-none mb-1 flex items-center gap-1">
                    Previous <kbd className="hidden sm:inline-block px-1 py-0.5 text-[8px] font-medium text-gray-400 bg-gray-100 border border-gray-200 rounded">←</kbd>
                  </div>
                  <div className="truncate max-w-[100px] sm:max-w-[140px]">{prevLesson.title}</div>
                </div>
              </motion.button>
            ) : <div />}
            
            {nextLesson ? (
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNext}
                className="group flex-1 flex items-center justify-between gap-3 px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-lg shadow-indigo-200"
              >
                <div className="text-left">
                  <div className="text-[10px] uppercase tracking-widest text-indigo-200 font-bold leading-none mb-1 flex items-center gap-1">
                    {isCompleted ? 'Next Lesson' : 'Complete & Next'}
                    <kbd className="hidden sm:inline-block px-1 py-0.5 text-[8px] font-medium text-indigo-300 bg-indigo-800/50 border border-indigo-500/30 rounded">→</kbd>
                  </div>
                  <div className="truncate max-w-[140px]">{nextLesson.title}</div>
                </div>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.button>
            ) : (
              !isCompleted && (
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => markLessonCompleted(activeLesson)}
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-lg shadow-emerald-200"
                >
                  <CheckCircle className="w-4 h-4" />
                  Finish Course
                </motion.button>
              )
            )}
          </div>
        </div>

        {/* Back to Top Button */}
        <AnimatePresence>
          {readingProgress > 20 && (
            <motion.button
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => theoryRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
              className="absolute bottom-8 right-8 z-50 p-2 bg-white border border-gray-200 shadow-lg rounded-full text-gray-500 hover:text-indigo-600 hover:border-indigo-200 transition-colors"
              aria-label="Back to top"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Playground Section */}
      <div className={`flex-1 flex flex-col h-full overflow-hidden relative bg-slate-50 ${activeTab === 'playground' ? 'block' : 'hidden lg:flex'}`}>
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="flex-1 p-6 lg:p-12 overflow-y-auto relative z-10 flex flex-col">
          <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <span className="bg-indigo-600 text-white p-2 rounded-xl shadow-lg shadow-indigo-200">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  Interactive Lab
                </h2>
                <p className="text-gray-500 mt-1 ml-11 font-medium">Experiment with the concepts in real-time</p>
              </div>
            </div>
            <div className="flex-1 bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-200/40 border border-gray-200/80 overflow-hidden flex flex-col relative">
              {playground}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
