import React, { useState } from 'react';
import { LessonLayout } from '../components/LessonLayout';
import { Smartphone, Tablet, Monitor, Menu } from 'lucide-react';

export function ResponsiveLesson() {
  const [viewportWidth, setViewportWidth] = useState(100); // Percentage 0-100
  
  // Calculate actual pixel width based on percentage (min 320px, max 1000px for demo)
  const minWidth = 320;
  const maxWidth = 1000;
  const currentWidth = minWidth + (viewportWidth / 100) * (maxWidth - minWidth);

  // Determine breakpoint
  let breakpoint = 'desktop';
  if (currentWidth < 640) breakpoint = 'mobile';
  else if (currentWidth < 800) breakpoint = 'tablet';

  const theory = (
    <div className="space-y-6 text-gray-600">
      <p>
        <strong>Responsive Design</strong> ensures that a web application looks and functions well on a variety of devices and window or screen sizes.
      </p>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Core Concepts</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Fluid Grids:</strong> Elements are sized in relative units (like percentages) rather than absolute units (like pixels).</li>
          <li><strong>Flexible Images:</strong> Images scale within their containing elements to prevent them from displaying outside their container.</li>
          <li><strong>Media Queries:</strong> CSS techniques used to apply different styles based on the device's characteristics (most commonly width).</li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Mobile-First Approach</h3>
        <p>
          Designing for the smallest screen first, then progressively enhancing the experience for larger screens. This ensures the core content and functionality are prioritized.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Common Breakpoints</h3>
        <div className="space-y-2 mt-2">
          <div className="flex justify-between text-sm border-b pb-1">
            <span className="font-medium text-gray-900">Mobile</span>
            <span className="text-gray-500 font-mono">{'<'} 640px</span>
          </div>
          <div className="flex justify-between text-sm border-b pb-1">
            <span className="font-medium text-gray-900">Tablet</span>
            <span className="text-gray-500 font-mono">640px - 1024px</span>
          </div>
          <div className="flex justify-between text-sm border-b pb-1">
            <span className="font-medium text-gray-900">Desktop</span>
            <span className="text-gray-500 font-mono">{'>'} 1024px</span>
          </div>
        </div>
      </div>
    </div>
  );

  const playground = (
    <div className="flex flex-col h-full bg-gray-50 overflow-hidden">
      {/* Controls */}
      <div className="p-4 border-b border-gray-200 bg-white shadow-sm z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Smartphone className={`w-5 h-5 ${breakpoint === 'mobile' ? 'text-indigo-600' : 'text-gray-400'}`} />
            <Tablet className={`w-5 h-5 ${breakpoint === 'tablet' ? 'text-indigo-600' : 'text-gray-400'}`} />
            <Monitor className={`w-5 h-5 ${breakpoint === 'desktop' ? 'text-indigo-600' : 'text-gray-400'}`} />
            <span className="ml-2 font-mono text-sm font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded">
              {Math.round(currentWidth)}px
            </span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setViewportWidth(0)} className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-gray-600">Mobile</button>
            <button onClick={() => setViewportWidth(50)} className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-gray-600">Tablet</button>
            <button onClick={() => setViewportWidth(100)} className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-gray-600">Desktop</button>
          </div>
        </div>
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={viewportWidth} 
          onChange={(e) => setViewportWidth(Number(e.target.value))}
          className="w-full accent-indigo-600"
        />
      </div>

      {/* Resizable Container */}
      <div className="flex-1 p-4 sm:p-8 flex justify-center overflow-y-auto bg-gray-200/50">
        <div 
          className="bg-white shadow-xl border border-gray-300 transition-all duration-300 ease-out overflow-hidden flex flex-col"
          style={{ width: `${currentWidth}px`, minHeight: '400px' }}
        >
          {/* Simulated App Header */}
          <header className="bg-indigo-600 text-white p-4 flex items-center justify-between shrink-0">
            <div className="font-bold tracking-tight">Brand</div>
            {breakpoint === 'mobile' ? (
              <Menu className="w-6 h-6" />
            ) : (
              <nav className="flex gap-4 text-sm font-medium text-indigo-100">
                <span className="hover:text-white cursor-pointer">Home</span>
                <span className="hover:text-white cursor-pointer">Features</span>
                <span className="hover:text-white cursor-pointer">Pricing</span>
                <span className="hover:text-white cursor-pointer">Contact</span>
              </nav>
            )}
          </header>

          {/* Simulated App Content */}
          <div className="p-6 flex-1 overflow-y-auto">
            {/* Hero Section */}
            <div className={`mb-8 ${breakpoint !== 'mobile' ? 'flex items-center gap-6' : ''}`}>
              <div className={`flex-1 ${breakpoint === 'mobile' ? 'mb-4 text-center' : ''}`}>
                <h1 className={`font-bold text-gray-900 mb-2 ${breakpoint === 'mobile' ? 'text-2xl' : 'text-3xl'}`}>
                  Build faster, together.
                </h1>
                <p className="text-gray-500 mb-4 text-sm leading-relaxed">
                  The ultimate platform for modern teams to collaborate and ship products at lightning speed.
                </p>
                <button className={`bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-indigo-700 ${breakpoint === 'mobile' ? 'w-full' : ''}`}>
                  Get Started
                </button>
              </div>
              <div className={`bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-300 ${breakpoint === 'mobile' ? 'h-40 w-full' : 'h-48 flex-1'}`}>
                Image/Video
              </div>
            </div>

            {/* Grid Section */}
            <div className="mb-4">
              <h2 className="font-bold text-gray-900 mb-4">Features</h2>
              <div className={`grid gap-4 ${
                breakpoint === 'desktop' ? 'grid-cols-3' : 
                breakpoint === 'tablet' ? 'grid-cols-2' : 
                'grid-cols-1'
              }`}>
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="w-8 h-8 bg-indigo-100 rounded-lg mb-3"></div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">Feature {i}</h3>
                    <p className="text-xs text-gray-500">A short description of this amazing feature.</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <LessonLayout
      title="Responsive Design"
      description="Design interfaces that adapt beautifully to any screen size."
      theory={theory}
      playground={playground}
    />
  );
}
