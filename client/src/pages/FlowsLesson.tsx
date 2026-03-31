import React, { useState } from 'react';
import { LessonLayout } from '../components/LessonLayout';
import { GitMerge, Play, RotateCcw, Check } from 'lucide-react';

type Step = 'start' | 'decision' | 'login' | 'signup' | 'dashboard';

export function FlowsLesson() {
  const [activeStep, setActiveStep] = useState<Step | null>(null);
  const [visited, setVisited] = useState<Set<Step>>(new Set());

  const handleStep = (step: Step) => {
    setActiveStep(step);
    setVisited(prev => new Set(prev).add(step));
  };

  const reset = () => {
    setActiveStep(null);
    setVisited(new Set());
  };

  const theory = (
    <div className="space-y-6 text-gray-600">
      <p>
        A <strong>User Flow</strong> is a visual representation of the path a user takes to achieve a specific goal within a product.
      </p>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Why are they important?</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Clarity:</strong> They help you understand the complete journey before designing individual screens.</li>
          <li><strong>Efficiency:</strong> Identify bottlenecks, unnecessary steps, or dead ends early in the process.</li>
          <li><strong>Communication:</strong> Easily explain the logic and requirements to developers and stakeholders.</li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Common Flowchart Shapes</h3>
        <ul className="space-y-4 mt-4">
          <li className="flex items-center gap-4">
            <div className="w-12 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center text-[10px] font-bold shrink-0">Start</div>
            <span className="text-sm"><strong>Pills:</strong> Entry and exit points.</span>
          </li>
          <li className="flex items-center gap-4">
            <div className="w-12 h-8 border-2 border-gray-400 flex items-center justify-center text-[10px] font-bold shrink-0">Step</div>
            <span className="text-sm"><strong>Rectangles:</strong> Screens, actions, or processes.</span>
          </li>
          <li className="flex items-center gap-4">
            <div className="w-8 h-8 border-2 border-gray-400 rotate-45 flex items-center justify-center shrink-0 ml-2 mr-2"><span className="-rotate-45 text-[10px] font-bold">?</span></div>
            <span className="text-sm"><strong>Diamonds:</strong> Decisions or conditional logic.</span>
          </li>
        </ul>
      </div>
    </div>
  );

  const Node = ({ id, label, type, x, y, width, height }: any) => {
    const isActive = activeStep === id;
    const isVisited = visited.has(id);
    
    let shapeClass = '';
    if (type === 'pill') shapeClass = 'rounded-full';
    if (type === 'rect') shapeClass = 'rounded-lg';
    if (type === 'diamond') shapeClass = 'rotate-45';

    const contentClass = type === 'diamond' ? '-rotate-45 text-center leading-tight' : 'text-center';

    const bgClass = isActive ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200 z-20' 
                  : isVisited ? 'bg-indigo-50 text-indigo-700 border-indigo-300 z-10' 
                  : 'bg-white text-gray-500 border-gray-200 hover:border-indigo-300 hover:text-indigo-500 z-10';

    return (
      <button 
        className={`absolute border-2 font-medium text-xs sm:text-sm transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center ${shapeClass} ${bgClass}`}
        style={{ left: `${(x / 1000) * 100}%`, top: `${(y / 600) * 100}%`, width: `${width}px`, height: `${height}px` }}
        onClick={() => handleStep(id)}
      >
        <div className={contentClass}>{label}</div>
      </button>
    );
  };

  const isPathActive = (from: Step, to: Step) => {
    return visited.has(from) && visited.has(to);
  };

  const playground = (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GitMerge className="w-5 h-5 text-indigo-600" />
          <h3 className="font-semibold text-gray-900">Interactive User Flow</h3>
        </div>
        <button 
          onClick={reset}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-100"
        >
          <RotateCcw className="w-4 h-4" /> Reset
        </button>
      </div>

      <div className="flex-1 p-6 flex flex-col items-center justify-center relative overflow-hidden">
        
        <div className="w-full max-w-4xl aspect-[5/3] relative bg-white rounded-2xl border border-gray-200 shadow-sm">
          
          {/* Instructions */}
          {!activeStep && visited.size === 0 && (
            <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg animate-bounce z-30 flex items-center gap-2">
              <Play className="w-4 h-4" /> Click 'App Launch' to start
            </div>
          )}

          {/* SVG Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 600">
            <defs>
              <marker id="arrow-gray" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#e5e7eb" />
              </marker>
              <marker id="arrow-indigo" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
              </marker>
            </defs>
            
            {/* Start -> Decision */}
            <path d="M 200 300 L 330 300" fill="none" stroke={visited.has('decision') ? '#6366f1' : '#e5e7eb'} strokeWidth="3" markerEnd={`url(#arrow-${visited.has('decision') ? 'indigo' : 'gray'})`} className="transition-all duration-500" />
            
            {/* Decision -> Login (Yes) */}
            <path d="M 400 240 L 400 150 L 570 150" fill="none" stroke={isPathActive('decision', 'login') ? '#6366f1' : '#e5e7eb'} strokeWidth="3" markerEnd={`url(#arrow-${isPathActive('decision', 'login') ? 'indigo' : 'gray'})`} className="transition-all duration-500" />
            
            {/* Decision -> Signup (No) */}
            <path d="M 400 360 L 400 450 L 570 450" fill="none" stroke={isPathActive('decision', 'signup') ? '#6366f1' : '#e5e7eb'} strokeWidth="3" markerEnd={`url(#arrow-${isPathActive('decision', 'signup') ? 'indigo' : 'gray'})`} className="transition-all duration-500" />

            {/* Login -> Dashboard */}
            <path d="M 730 150 L 900 150 L 900 265" fill="none" stroke={isPathActive('login', 'dashboard') ? '#6366f1' : '#e5e7eb'} strokeWidth="3" markerEnd={`url(#arrow-${isPathActive('login', 'dashboard') ? 'indigo' : 'gray'})`} className="transition-all duration-500" />

            {/* Signup -> Dashboard */}
            <path d="M 730 450 L 900 450 L 900 335" fill="none" stroke={isPathActive('signup', 'dashboard') ? '#6366f1' : '#e5e7eb'} strokeWidth="3" markerEnd={`url(#arrow-${isPathActive('signup', 'dashboard') ? 'indigo' : 'gray'})`} className="transition-all duration-500" />
          </svg>

          {/* Branch Labels */}
          <div className={`absolute text-xs font-bold px-2 py-1 bg-white rounded border transition-colors duration-300 ${isPathActive('decision', 'login') ? 'text-indigo-600 border-indigo-200' : 'text-gray-400 border-gray-100'}`} style={{ left: '42%', top: '22%' }}>
            Yes
          </div>
          <div className={`absolute text-xs font-bold px-2 py-1 bg-white rounded border transition-colors duration-300 ${isPathActive('decision', 'signup') ? 'text-indigo-600 border-indigo-200' : 'text-gray-400 border-gray-100'}`} style={{ left: '42%', top: '72%' }}>
            No
          </div>

          {/* Nodes */}
          <Node id="start" label="App Launch" type="pill" x={140} y={300} width={120} height={50} />
          <Node id="decision" label="Has Account?" type="diamond" x={400} y={300} width={100} height={100} />
          <Node id="login" label="Login Screen" type="rect" x={650} y={150} width={160} height={60} />
          <Node id="signup" label="Sign Up Screen" type="rect" x={650} y={450} width={160} height={60} />
          <Node id="dashboard" label="Dashboard" type="pill" x={900} y={300} width={120} height={50} />

        </div>

        {/* Status Message */}
        <div className="mt-8 text-center h-12">
          {activeStep === 'start' && <p className="text-gray-600 animate-in fade-in slide-in-from-bottom-2">User opens the app. Next step: Check if they have an account.</p>}
          {activeStep === 'decision' && <p className="text-gray-600 animate-in fade-in slide-in-from-bottom-2">System checks authentication state. Choose a path: Login or Sign Up.</p>}
          {activeStep === 'login' && <p className="text-gray-600 animate-in fade-in slide-in-from-bottom-2">User enters credentials to log in. Next: Go to Dashboard.</p>}
          {activeStep === 'signup' && <p className="text-gray-600 animate-in fade-in slide-in-from-bottom-2">User creates a new account. Next: Go to Dashboard.</p>}
          {activeStep === 'dashboard' && (
            <div className="flex items-center justify-center gap-2 text-green-600 font-medium animate-in fade-in slide-in-from-bottom-2">
              <Check className="w-5 h-5" /> Flow Complete!
            </div>
          )}
        </div>

      </div>
    </div>
  );

  return (
    <LessonLayout
      title="User Flows"
      description="Map out the step-by-step path a user takes to complete a task."
      theory={theory}
      playground={playground}
    />
  );
}
