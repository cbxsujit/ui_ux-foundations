import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Palette, Type, Layout, Layers, Sparkles, Menu, X, ChevronDown, AppWindow, MousePointerClick, FileText, Bell, LayoutGrid, Hourglass, HelpCircle, Search, PanelLeftClose, PanelLeftOpen, Brain, Users, Network, GitMerge, Smartphone, Compass, Zap, PlayCircle, Rocket, Ghost, Eye, CheckCircle, BarChart, Component, Bot, PieChart, Table, ListChecks, SunMoon, GalleryHorizontal, List, ChevronRight, Circle, CheckCircle2, Grid, Box, Mic, ShieldAlert, Lock, Globe, Trophy, Inbox, Repeat, BellRing, SearchX, ScanSearch } from 'lucide-react';
import { LESSONS } from '../constants';
import { LessonId, Lesson } from '../types';

interface SidebarProps {
  activeLesson: LessonId;
  onSelectLesson: (id: LessonId) => void;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  completedLessons: Set<LessonId>;
}

const iconMap: Record<string, React.ElementType> = {
  BookOpen,
  Palette,
  Type,
  Layout,
  Layers,
  ChevronDown,
  AppWindow,
  MousePointerClick,
  FileText,
  Bell,
  LayoutGrid,
  Hourglass,
  HelpCircle,
  Brain,
  Search,
  Users,
  Network,
  GitMerge,
  Smartphone,
  Compass,
  Zap,
  PlayCircle,
  Rocket,
  Ghost,
  Eye,
  CheckCircle,
  BarChart,
  Component,
  Bot,
  PieChart,
  Table,
  ListChecks,
  SunMoon,
  GalleryHorizontal,
  List,
  ChevronRight,
  Circle,
  CheckCircle2,
  Grid,
  Box,
  Mic,
  ShieldAlert,
  Lock,
  Globe,
  Trophy,
  Inbox,
  Repeat,
  BellRing,
  ScanSearch,
};

export function Sidebar({ activeLesson, onSelectLesson, isOpen, onToggle, onClose, completedLessons }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        // Don't trigger if user is typing in an input (unless they specifically want to focus search)
        const activeTag = document.activeElement?.tagName;
        if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') {
          // If they are already in the search input, let default behavior happen
          if (document.activeElement === searchInputRef.current) return;
          // Otherwise, prevent default and focus search
        }
        
        e.preventDefault();
        if (!isOpen) {
          onToggle();
        }
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 100);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onToggle]);

  const filteredLessons = LESSONS.filter(lesson => 
    lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    lesson.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group lessons by category
  const groupedLessons = filteredLessons.reduce((acc, lesson) => {
    if (!acc[lesson.category]) {
      acc[lesson.category] = [];
    }
    acc[lesson.category].push(lesson);
    return acc;
  }, {} as Record<string, Lesson[]>);

  const progressPercentage = Math.round((completedLessons.size / LESSONS.length) * 100);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 z-50 bg-gray-900 border-r border-gray-800 transform transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0 lg:w-20'} flex flex-col shadow-2xl lg:shadow-none`}
      >
        <div className={`p-6 pb-4 flex items-center ${isOpen ? 'justify-between' : 'justify-center'} transition-all`}>
          {isOpen ? (
            <div className="flex items-center gap-2 text-white font-bold text-xl tracking-tight">
              <div className="bg-indigo-500 p-1.5 rounded-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span>UI/UX Master</span>
            </div>
          ) : (
            <div className="bg-indigo-500 p-2 rounded-xl hidden lg:block">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <button onClick={onToggle} className="hidden lg:flex text-gray-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-gray-800" title={isOpen ? "Collapse sidebar" : "Expand sidebar"}>
              {isOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
            </button>
            <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-gray-800">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="px-4 pb-4 animate-in fade-in duration-300">
            {/* Progress Bar */}
            <div className="mb-4 bg-gray-800/50 rounded-xl p-3 border border-gray-700/50">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Course Progress</span>
                <span className="text-xs font-bold text-indigo-400">{progressPercentage}%</span>
              </div>
              <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-500 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            <div className="relative group">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
              <input 
                ref={searchInputRef}
                type="text" 
                placeholder="Search lessons..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-12 py-2.5 bg-gray-800/50 border border-gray-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-gray-800 transition-all"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-medium text-gray-400 bg-gray-800 border border-gray-700 rounded-md">⌘K</kbd>
              </div>
            </div>
          </div>
        )}

        <nav className="flex-1 px-3 space-y-6 overflow-y-auto custom-scrollbar pb-6 mt-2">
          {filteredLessons.length === 0 && isOpen ? (
            <div className="px-3 py-8 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-300">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mb-3">
                <SearchX className="w-6 h-6 text-gray-500" />
              </div>
              <p className="text-sm font-medium text-gray-300 mb-1">No lessons found</p>
              <p className="text-xs text-gray-500">Try adjusting your search term.</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-4 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 active:scale-95 text-gray-300 text-xs font-medium rounded-lg transition-all"
              >
                Clear Search
              </button>
            </div>
          ) : (
            Object.entries(groupedLessons).map(([category, categoryLessons]) => (
              <div key={category} className="space-y-1">
                {isOpen && (
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 px-3">
                    {category}
                  </div>
                )}
                {categoryLessons.map((lesson) => {
                  const Icon = iconMap[lesson.icon];
                  const isActive = activeLesson === lesson.id;
                  const isCompleted = completedLessons.has(lesson.id);
                  
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => {
                        onSelectLesson(lesson.id);
                        if (window.innerWidth < 1024) onClose();
                      }}
                      title={!isOpen ? lesson.title : undefined}
                      className={`w-full flex items-center ${isOpen ? 'gap-3 px-3 py-3' : 'justify-center p-3'} rounded-xl transition-all duration-200 text-left group relative active:scale-[0.98] ${
                        isActive 
                          ? 'bg-indigo-500/10 text-indigo-400 font-medium border border-indigo-500/20' 
                          : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200 border border-transparent'
                      }`}
                    >
                      {isActive && !isOpen && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-500 rounded-r-full" />
                      )}
                      
                      <div className="relative">
                        <Icon className={`shrink-0 ${isOpen ? 'w-5 h-5' : 'w-6 h-6'} ${isActive ? 'text-indigo-400' : 'text-gray-500 group-hover:text-gray-300'} transition-colors`} />
                        {isCompleted && !isOpen && (
                          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-gray-900" />
                        )}
                      </div>
                      
                      {isOpen && (
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <div className={`text-sm truncate ${isActive ? 'text-indigo-300 font-semibold' : 'text-gray-300'}`}>
                              {lesson.title}
                            </div>
                            {isCompleted && (
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            )}
                          </div>
                          <div className={`text-xs truncate mt-0.5 ${isActive ? 'text-indigo-400/70' : 'text-gray-500'}`}>
                            {lesson.description}
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </nav>
      </aside>
    </>
  );
}
