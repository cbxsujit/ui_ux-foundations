import React, { useState } from 'react';
import { LessonLayout } from '../components/LessonLayout';
import { motion } from 'motion/react';
import { Layers, Eye, ArrowDown, MousePointer2 } from 'lucide-react';

export function HierarchyLesson() {
  const [prominence, setProminence] = useState<'low' | 'medium' | 'high'>('medium');

  const theory = (
    <div className="space-y-6 text-gray-600">
      <p>
        Visual hierarchy is the arrangement of elements in a way that implies importance. It guides the user's eye from the most important information to the least important.
      </p>

      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-900 tracking-tight">How to Create Hierarchy</h3>
        <p className="text-gray-500 leading-relaxed">
          You can make an element stand out using several techniques that leverage human perception:
        </p>
      </section>

      <div className="grid gap-4 mt-8">
        <div className="group p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all hover:border-indigo-100">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-lg mb-1">Size & Weight</h4>
              <p className="text-sm text-gray-500 leading-relaxed">Bigger and bolder elements draw the eye first. This is why headlines are large and bold compared to body text.</p>
            </div>
          </div>
        </div>

        <div className="group p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all hover:border-indigo-100">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-lg mb-1">Color & Contrast</h4>
              <p className="text-sm text-gray-500 leading-relaxed">Bright colors stand out against muted backgrounds. A primary action button should be the most colorful thing on the screen.</p>
            </div>
          </div>
        </div>

        <div className="group p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all hover:border-indigo-100">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <ArrowDown className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-lg mb-1">Position & Whitespace</h4>
              <p className="text-sm text-gray-500 leading-relaxed">Elements placed at the top or surrounded by generous empty space feel more important and authoritative.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-rose-50 to-orange-50 border border-rose-100 p-6 rounded-2xl mt-10 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
          <Eye className="w-12 h-12 text-rose-600" />
        </div>
        <h4 className="text-rose-900 font-bold text-lg mb-2 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-rose-500"></span>
          The "Squint Test"
        </h4>
        <p className="text-sm text-rose-800 leading-relaxed relative z-10">
          Squint your eyes while looking at a design. The elements that stand out the most should be the most important ones. If everything blurs together, your hierarchy is weak.
        </p>
      </div>
    </div>
  );

  const playground = (
    <div className="flex-1 flex flex-col h-full">
      {/* Controls */}
      <div className="p-6 border-b border-gray-200 bg-gray-50 flex flex-col gap-4">
        <label className="text-sm font-medium text-gray-700">Primary Button Prominence</label>
        <div className="flex bg-white border border-gray-300 rounded-lg overflow-hidden max-w-md">
          <button 
            onClick={() => setProminence('low')}
            className={`flex-1 p-3 text-sm font-medium flex justify-center ${prominence === 'low' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            Low
          </button>
          <button 
            onClick={() => setProminence('medium')}
            className={`flex-1 p-3 text-sm font-medium flex justify-center border-x border-gray-300 ${prominence === 'medium' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            Medium
          </button>
          <button 
            onClick={() => setProminence('high')}
            className={`flex-1 p-3 text-sm font-medium flex justify-center ${prominence === 'high' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            High
          </button>
        </div>
        <p className="text-xs text-gray-500">
          Adjust the prominence to see how the primary action competes with or dominates the secondary action.
        </p>
      </div>

      {/* Preview Area */}
      <div className="flex-1 p-10 overflow-y-auto bg-gray-100 flex items-center justify-center">
        <div 
          className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-6">
            <MousePointer2 className="w-8 h-8" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Upgrade to Pro</h2>
          <p className="text-gray-500 mb-8">
            Get access to advanced features, priority support, and unlimited projects.
          </p>
          
          <div className="w-full flex flex-col gap-3">
            {/* Primary Button */}
            <button 
              className={`w-full rounded-xl font-semibold transition-all duration-300 ${
                prominence === 'low' 
                  ? 'bg-gray-100 text-gray-700 py-3 hover:bg-gray-200' 
                  : prominence === 'medium'
                    ? 'bg-indigo-100 text-indigo-700 py-3 hover:bg-indigo-200'
                    : 'bg-indigo-600 text-white py-4 shadow-lg hover:bg-indigo-700 scale-105'
              }`}
            >
              Upgrade Now
            </button>
            
            {/* Secondary Button */}
            <button className="w-full py-3 text-gray-500 font-medium hover:text-gray-700 transition-colors">
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <LessonLayout
      title="Visual Hierarchy"
      description="Learn how to guide the user's eye to the most important elements on the screen."
      theory={theory}
      playground={playground}
    />
  );
}
