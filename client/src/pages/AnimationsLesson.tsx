import React, { useState, useEffect } from 'react';
import { LessonLayout } from '../components/LessonLayout';
import { Play, Square, Circle, Triangle, Check } from 'lucide-react';

export function AnimationsLesson() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedEasing, setSelectedEasing] = useState('linear');

  const easings = [
    { id: 'linear', name: 'Linear', class: 'ease-linear', desc: 'Constant speed. Feels robotic and unnatural.' },
    { id: 'ease-in', name: 'Ease In', class: 'ease-in', desc: 'Starts slow, ends fast. Good for objects exiting the screen.' },
    { id: 'ease-out', name: 'Ease Out', class: 'ease-out', desc: 'Starts fast, ends slow. Good for objects entering the screen.' },
    { id: 'ease-in-out', name: 'Ease In Out', class: 'ease-in-out', desc: 'Slow start and end. Good for objects moving point-to-point on screen.' },
    { id: 'spring', name: 'Spring (Custom)', class: 'ease-[cubic-bezier(0.68,-0.55,0.26,1.55)]', desc: 'Overshoots the target. Adds playfulness and physical weight.' },
  ];

  const triggerAnimation = () => {
    setIsAnimating(false);
    // Small delay to allow React to reset the state before triggering again
    setTimeout(() => setIsAnimating(true), 50);
  };

  const theory = (
    <div className="space-y-6 text-gray-600">
      <p>
        <strong>UI Animation</strong> isn't just for decoration. It provides context, spatial awareness, and feedback, making digital experiences feel more intuitive and physical.
      </p>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Purpose of Animation</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Orientation:</strong> Helps users understand where things come from and where they go (e.g., a menu sliding in from the left).</li>
          <li><strong>Feedback:</strong> Confirms an action was received (e.g., a button pressing down).</li>
          <li><strong>Focus:</strong> Draws attention to important elements (e.g., a subtle pulse on a notification bell).</li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Easing (Timing Functions)</h3>
        <p>
          In the real world, objects don't start and stop instantly; they accelerate and decelerate. Easing mimics this physics to make animations feel natural.
        </p>
      </div>
    </div>
  );

  const playground = (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="p-4 border-b border-gray-200 bg-white flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h3 className="font-semibold text-gray-900">Easing Playground</h3>
          <p className="text-sm text-gray-500">Select an easing curve and play the animation.</p>
        </div>
        <button 
          onClick={triggerAnimation}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Play className="w-4 h-4" /> Play Animation
        </button>
      </div>

      <div className="flex-1 p-6 flex flex-col lg:flex-row gap-8 overflow-y-auto">
        {/* Controls */}
        <div className="w-full lg:w-1/3 space-y-3">
          {easings.map(easing => (
            <button
              key={easing.id}
              onClick={() => {
                setSelectedEasing(easing.id);
                setIsAnimating(false);
                setTimeout(() => setIsAnimating(true), 50);
              }}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                selectedEasing === easing.id 
                  ? 'bg-indigo-50 border-indigo-500 shadow-sm' 
                  : 'bg-white border-gray-200 hover:border-indigo-300'
              }`}
            >
              <div className="font-semibold text-gray-900 mb-1">{easing.name}</div>
              <div className="text-xs text-gray-500">{easing.desc}</div>
            </button>
          ))}
        </div>

        {/* Stage */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-200 shadow-sm p-8 flex flex-col justify-center relative min-h-[300px]">
          
          {/* Track */}
          <div className="relative w-full h-16 border-b-2 border-dashed border-gray-200 mb-12">
            <div className="absolute left-0 bottom-[-8px] w-4 h-4 rounded-full bg-gray-300" />
            <div className="absolute right-0 bottom-[-8px] w-4 h-4 rounded-full bg-gray-300" />
            
            {/* Moving Object */}
            <div 
              className={`absolute bottom-0 w-12 h-12 bg-indigo-600 rounded-xl shadow-lg flex items-center justify-center text-white transform transition-all duration-1000 ${
                easings.find(e => e.id === selectedEasing)?.class
              } ${isAnimating ? 'left-[calc(100%-3rem)] rotate-180' : 'left-0 rotate-0'}`}
            >
              <Square className="w-5 h-5" />
            </div>
          </div>

          {/* UI Example: Modal */}
          <div className="mt-8 border-t border-gray-100 pt-8">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 text-center">UI Context Example (Modal)</h4>
            <div className="relative h-48 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
              <div 
                className={`bg-white p-6 rounded-xl shadow-xl w-64 text-center transform transition-all duration-700 ${
                  easings.find(e => e.id === selectedEasing)?.class
                } ${isAnimating ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'}`}
              >
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6" />
                </div>
                <h5 className="font-bold text-gray-900">Success!</h5>
                <p className="text-xs text-gray-500 mt-1">Your changes have been saved.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );

  return (
    <LessonLayout
      title="Animations"
      description="Bring your UI to life with purposeful motion and easing."
      theory={theory}
      playground={playground}
    />
  );
}

