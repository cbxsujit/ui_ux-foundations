import React, { useState } from 'react';
import { LessonLayout } from '../components/LessonLayout';
import { ChevronRight, Home, Info, Folder, FileText } from 'lucide-react';
import { DevicePreview } from '../components/DevicePreview';

export function BreadcrumbsLesson() {
  const [pathLength, setPathLength] = useState(4);

  const fullPath = [
    { label: 'Home', icon: <Home className="w-4 h-4" /> },
    { label: 'Products', icon: <Folder className="w-4 h-4" /> },
    { label: 'Electronics', icon: <Folder className="w-4 h-4" /> },
    { label: 'Laptops', icon: <Folder className="w-4 h-4" /> },
    { label: 'MacBook Pro', icon: <FileText className="w-4 h-4" /> },
  ];

  const currentPath = fullPath.slice(0, pathLength);

  const theory = (
    <div className="space-y-6 text-gray-600">
      <p>
        <strong>Breadcrumbs</strong> are a secondary navigation scheme that reveals the user's location in a website or web application. They are crucial for hierarchical structures.
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Why use Breadcrumbs?</h3>
      <ul className="space-y-4">
        <li className="flex items-start gap-3">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg shrink-0"><Info className="w-5 h-5" /></div>
          <div>
            <strong className="block text-gray-900">Wayfinding</strong>
            <span className="text-sm">They show users exactly where they are and how the current page relates to higher-level pages.</span>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg shrink-0"><ChevronRight className="w-5 h-5" /></div>
          <div>
            <strong className="block text-gray-900">Easy Upward Navigation</strong>
            <span className="text-sm">They provide one-click access to higher-level categories, reducing the need to use the browser's back button.</span>
          </div>
        </li>
      </ul>

      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mt-6">
        <h4 className="text-amber-900 font-semibold mb-2">UX Tip: Current Page</h4>
        <p className="text-sm text-amber-800">
          The last item in the breadcrumb trail represents the current page. It should not be a link, and it should be visually distinct (e.g., bold or a different color) to indicate it's the active state.
        </p>
      </div>
    </div>
  );

  const playground = (
    <div className="flex-1 flex flex-col h-full bg-gray-50">
      <div className="p-6 border-b border-gray-200 bg-white flex flex-wrap gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Path Depth: {pathLength}</label>
          <input type="range" min="2" max="5" step="1" value={pathLength} onChange={(e) => setPathLength(parseInt(e.target.value))} className="w-32 accent-indigo-600" />
        </div>
      </div>

      <DevicePreview>
        {(isMobile) => (
          <div className={`flex-1 flex flex-col items-center justify-start ${isMobile ? 'p-4 bg-white' : 'p-10 bg-gray-50'}`}>
            <div className={`w-full max-w-3xl bg-white ${isMobile ? '' : 'rounded-2xl shadow-xl border border-gray-200 p-8'}`}>
              
              <nav className="flex text-sm text-gray-500 mb-8 overflow-x-auto no-scrollbar whitespace-nowrap pb-2">
                <ol className="flex items-center space-x-2">
                  {currentPath.map((item, index) => {
                    const isLast = index === currentPath.length - 1;
                    return (
                      <li key={index} className="flex items-center">
                        {index > 0 && <ChevronRight className="w-4 h-4 mx-2 text-gray-400 shrink-0" />}
                        {isLast ? (
                          <span className="font-semibold text-gray-900 flex items-center gap-1.5" aria-current="page">
                            {item.icon}
                            {item.label}
                          </span>
                        ) : (
                          <a href="#" className="hover:text-indigo-600 transition-colors flex items-center gap-1.5">
                            {item.icon}
                            {item.label}
                          </a>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </nav>

              <div className="mt-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{currentPath[currentPath.length - 1].label}</h1>
                <div className="h-32 bg-gray-100 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400">
                  Content for {currentPath[currentPath.length - 1].label}
                </div>
              </div>

            </div>
            
            <div className="mt-10 p-4 bg-indigo-50 rounded-xl border border-indigo-100 max-w-md flex gap-3">
              <Info className="w-5 h-5 text-indigo-500 shrink-0" />
              <p className="text-xs text-indigo-700 leading-relaxed">
                <strong>UX Insight:</strong> On mobile, if the breadcrumb trail is too long, allow it to scroll horizontally or truncate middle steps with an ellipsis (...).
              </p>
            </div>
          </div>
        )}
      </DevicePreview>
    </div>
  );

  return <LessonLayout title="Breadcrumbs" description="Show users where they are and how they got there." theory={theory} playground={playground} />;
}
