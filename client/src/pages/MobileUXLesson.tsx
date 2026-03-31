import React, { useState } from 'react';
import { LessonLayout } from '../components/LessonLayout';
import { Smartphone, MousePointer2, Move, Info, Compass, Target, Maximize, TouchpadOff } from 'lucide-react';

export function MobileUXLesson() {
  const [showThumbZone, setShowThumbZone] = useState(false);

  const theory = (
    <div className="space-y-6 text-gray-600">
      <p>
        Mobile UX is defined by <strong>physical constraints</strong>. Designing for thumbs, limited screen space, and varied lighting conditions is critical.
      </p>

      <div className="space-y-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
            <Target className="w-4 h-4 text-indigo-500" />
            Touch Targets
          </h4>
          <p className="text-sm">Minimum touch target size should be <strong>44x44px</strong> to prevent "fat finger" errors.</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
            <Move className="w-4 h-4 text-pink-500" />
            Gestural Navigation
          </h4>
          <p className="text-sm">Use common gestures like swipe-to-delete or pull-to-refresh to save screen space and feel native.</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">The Thumb Zone</h3>
        <p className="text-sm mb-4">Most users hold their phones with one hand. Critical actions should be placed in the "Natural" zone (bottom 2/3 of the screen).</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Bottom Navigation:</strong> Easier to reach than top menus.</li>
          <li><strong>Floating Action Buttons:</strong> Perfect for primary actions.</li>
          <li><strong>Avoid Top Corners:</strong> These are "Danger Zones" for one-handed use.</li>
        </ul>
      </div>

      <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
        <h4 className="font-bold text-indigo-900 mb-2">Ready to experiment?</h4>
        <p className="text-sm text-indigo-700 mb-4">Toggle the "Thumb Zone" overlay in the lab to see where you should place your most important buttons.</p>
        <button className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all lg:hidden">
          Open Interactive Lab
        </button>
      </div>
    </div>
  );

  const playground = (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-indigo-500" />
          <h3 className="font-semibold text-gray-900">Mobile Interaction Lab</h3>
        </div>
        <button 
          onClick={() => setShowThumbZone(!showThumbZone)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${showThumbZone ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          {showThumbZone ? 'Hide Thumb Zone' : 'Show Thumb Zone'}
        </button>
      </div>

      <div className="flex-1 p-8 flex items-center justify-center">
        {/* Phone Mockup */}
        <div className="relative w-[320px] h-[600px] bg-gray-900 rounded-[3rem] border-8 border-gray-800 shadow-2xl overflow-hidden">
          {/* Screen Content */}
          <div className="absolute inset-0 bg-white overflow-hidden flex flex-col">
            {/* Status Bar */}
            <div className="h-6 bg-white flex justify-between px-6 items-center">
              <span className="text-[10px] font-bold">9:41</span>
              <div className="flex gap-1">
                <div className="w-3 h-2 bg-black rounded-sm"></div>
              </div>
            </div>

            {/* App Header */}
            <div className="p-4 flex items-center justify-between">
              <h4 className="font-black text-xl italic tracking-tighter">FITNESS</h4>
              <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              <div className="bg-indigo-600 p-6 rounded-3xl text-white">
                <div className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Today's Goal</div>
                <div className="text-3xl font-black">8,432 steps</div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">Calories</div>
                  <div className="text-lg font-bold">420 kcal</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">Active</div>
                  <div className="text-lg font-bold">45 min</div>
                </div>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-sm">Recent Workouts</h5>
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-2xl shadow-sm">
                    <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center text-pink-500">
                      <Move className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold">Morning Run</div>
                      <div className="text-[10px] text-gray-400">3.2 miles • 24 min</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Navigation */}
            <div className="h-20 bg-white border-t border-gray-100 flex items-center justify-around px-4 pb-4">
              <div className="p-2 text-indigo-600"><Compass className="w-6 h-6" /></div>
              <div className="p-2 text-gray-300"><Target className="w-6 h-6" /></div>
              <div className="p-2 text-gray-300"><Maximize className="w-6 h-6" /></div>
              <div className="p-2 text-gray-300"><TouchpadOff className="w-6 h-6" /></div>
            </div>

            {/* Thumb Zone Overlay */}
            {showThumbZone && (
              <div className="absolute inset-0 pointer-events-none z-50">
                {/* Hard to reach (Top) */}
                <div className="absolute top-0 left-0 w-full h-[30%] bg-red-500/20 flex items-center justify-center">
                  <span className="text-[10px] font-black text-red-700 bg-white/80 px-2 py-1 rounded-full uppercase">Hard to Reach</span>
                </div>
                {/* OK to reach (Middle) */}
                <div className="absolute top-[30%] left-0 w-full h-[20%] bg-amber-500/20 flex items-center justify-center">
                  <span className="text-[10px] font-black text-amber-700 bg-white/80 px-2 py-1 rounded-full uppercase">Stretch</span>
                </div>
                {/* Natural (Bottom) */}
                <div className="absolute bottom-0 left-0 w-full h-[50%] bg-green-500/20 flex items-center justify-center">
                  <span className="text-[10px] font-black text-green-700 bg-white/80 px-2 py-1 rounded-full uppercase">Natural Zone</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Home Indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-200 rounded-full"></div>
        </div>
      </div>

      <div className="p-4 bg-gray-900 text-white flex items-center gap-3">
        <Info className="w-5 h-5 text-indigo-400 shrink-0" />
        <p className="text-xs text-gray-400">
          <strong>UX Insight:</strong> Designing for the "Thumb Zone" is why we see more apps moving their search bars and navigation to the bottom of the screen. It significantly improves one-handed usability.
        </p>
      </div>
    </div>
  );

  return (
    <LessonLayout
      title="Mobile Interactions"
      description="Design for physical constraints, touch targets, and the thumb zone."
      theory={theory}
      playground={playground}
    />
  );
}