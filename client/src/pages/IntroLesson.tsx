import React from 'react';
import { LessonLayout } from '../components/LessonLayout';
import { motion } from 'motion/react';
import { Sparkles, Palette, Type, Layout, MousePointer2, ArrowRight } from 'lucide-react';

interface IntroLessonProps {
  onNext: () => void;
}

export function IntroLesson({ onNext }: IntroLessonProps) {
  const theory = (
    <div className="space-y-6 text-gray-600">
      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-900 tracking-tight">The Foundation</h3>
        <p className="text-gray-500 leading-relaxed">
          Welcome to your journey into UI/UX design! You don't need to be an artist or a programmer to understand what makes a digital product feel "right."
        </p>
      </section>
      
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 p-6 rounded-2xl text-white shadow-lg shadow-indigo-100">
        <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-300" />
          What's the difference?
        </h4>
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="w-1 h-auto bg-indigo-400 rounded-full"></div>
            <div>
              <strong className="block text-white">UI (User Interface)</strong>
              <p className="text-sm text-indigo-100">How things look. The colors, fonts, and layout. It's the paint and furniture of a house.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-1 h-auto bg-indigo-400 rounded-full"></div>
            <div>
              <strong className="block text-white">UX (User Experience)</strong>
              <p className="text-sm text-indigo-100">How things work. The flow, logic, and ease of use. It's the floor plan and plumbing of a house.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Core Principles We'll Cover:</h3>
        <div className="grid gap-3">
          <div className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
            <div className="p-2 bg-pink-50 text-pink-600 rounded-lg shrink-0"><Palette className="w-5 h-5" /></div>
            <div>
              <strong className="block text-gray-900 text-sm">Color & Contrast</strong>
              <span className="text-xs text-gray-500">Using color to guide attention and ensure readability.</span>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0"><Type className="w-5 h-5" /></div>
            <div>
              <strong className="block text-gray-900 text-sm">Typography</strong>
              <span className="text-xs text-gray-500">Choosing fonts that are legible and establish hierarchy.</span>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg shrink-0"><Layout className="w-5 h-5" /></div>
            <div>
              <strong className="block text-gray-900 text-sm">Spacing & Layout</strong>
              <span className="text-xs text-gray-500">Using whitespace to group related items and reduce clutter.</span>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg shrink-0"><MousePointer2 className="w-5 h-5" /></div>
            <div>
              <strong className="block text-gray-900 text-sm">Visual Hierarchy</strong>
              <span className="text-xs text-gray-500">Making the most important things stand out.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const playground = (
    <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
        
        <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
          <Sparkles className="w-10 h-10" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to start?</h2>
        <p className="text-gray-500 mb-8">
          Begin your journey into UI/UX design by exploring the core principles.
        </p>
        
        <button 
          onClick={onNext}
          className="w-full py-3.5 bg-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
        >
          Start Learning <ArrowRight className="w-5 h-5" />
        </button>
      </motion.div>
    </div>
  );

  return (
    <LessonLayout
      title="Introduction to UI/UX"
      description="Understand the basics of User Interface and User Experience design."
      theory={theory}
      playground={playground}
    />
  );
}
