import React, { useState } from 'react';
import { LessonLayout } from '../components/LessonLayout';
import { ChevronDown, ChevronRight, Home } from 'lucide-react';
import { DevicePreview } from '../components/DevicePreview';

export function NavigationLesson() {
  const [chevronPos, setChevronPos] = useState<'left' | 'right'>('right');
  const [openItem, setOpenItem] = useState<number | null>(1);
  const [path, setPath] = useState<string[]>(['Home', 'Settings', 'Security', 'Passwords']);

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  const theory = (
    <div className="space-y-6 text-gray-600">
      <p>
        Navigation components like Accordions and Dropdowns use <strong>Progressive Disclosure</strong>. This means hiding complex or secondary information until the user asks for it.
      </p>
      
      <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Breadcrumbs</h3>
      <p>
        Breadcrumbs are a secondary navigation scheme that reveals the user's location in a website or application. They are crucial for deep hierarchical structures.
      </p>
      <ul className="space-y-4">
        <li className="flex items-start gap-3">
          <div className="p-2 bg-slate-100 text-slate-600 rounded-lg shrink-0"><ChevronRight className="w-5 h-5" /></div>
          <div>
            <strong className="block text-gray-900">Separators</strong>
            <span className="text-sm">Use a right-pointing chevron (›) or slash (/) to separate levels.</span>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <div className="p-2 bg-slate-100 text-slate-600 rounded-lg shrink-0"><Home className="w-5 h-5" /></div>
          <div>
            <strong className="block text-gray-900">Current Page</strong>
            <span className="text-sm">The last item represents the current page. It should not be a clickable link and is often styled differently (e.g., bolder or darker).</span>
          </div>
        </li>
      </ul>

      <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">The Mighty Chevron</h3>
      <p>
        The chevron (an arrow-like icon) is the universal symbol for "there is more content here." 
      </p>
      <ul className="space-y-4">
        <li className="flex items-start gap-3">
          <div className="p-2 bg-slate-100 text-slate-600 rounded-lg shrink-0"><ChevronRight className="w-5 h-5" /></div>
          <div>
            <strong className="block text-gray-900">Pointing Right</strong>
            <span className="text-sm">Usually means "this will take you to a new page or deeper level."</span>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <div className="p-2 bg-slate-100 text-slate-600 rounded-lg shrink-0"><ChevronDown className="w-5 h-5" /></div>
          <div>
            <strong className="block text-gray-900">Pointing Down</strong>
            <span className="text-sm">Usually means "this will expand downwards to reveal content right here."</span>
          </div>
        </li>
      </ul>
    </div>
  );

  const items = [
    { id: 1, title: 'What is progressive disclosure?', content: 'It is an interaction design pattern that sequences information and actions across several screens to reduce feelings of overwhelm.' },
    { id: 2, title: 'Where should the chevron go?', content: 'Placing it on the right makes it easy to scan down the right edge. Placing it on the left keeps it close to the text. Both are valid, but right-aligned is more common for full-width accordions.' },
    { id: 3, title: 'Should other items close automatically?', content: 'This is called an "Accordion" (auto-closes others) vs a "Disclosure Group" (independent). Use an Accordion when you want to keep the page short.' },
  ];

  const fullPath = ['Home', 'Settings', 'Security', 'Passwords'];

  const playground = (
    <div className="flex-1 flex flex-col h-full">
      <div className="p-6 border-b border-gray-200 bg-gray-50 flex gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Chevron Position (Accordion)</label>
          <div className="flex bg-white border border-gray-300 rounded-lg overflow-hidden">
            <button 
              onClick={() => setChevronPos('left')}
              className={`px-4 py-2 text-sm font-medium ${chevronPos === 'left' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              Left
            </button>
            <button 
              onClick={() => setChevronPos('right')}
              className={`px-4 py-2 text-sm font-medium border-l border-gray-300 ${chevronPos === 'right' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              Right
            </button>
          </div>
        </div>
      </div>

      <DevicePreview>
        {(isMobile) => (
          <div className={`flex-1 overflow-y-auto flex flex-col items-center justify-start gap-8 ${isMobile ? 'p-4 bg-white' : 'p-10 bg-gray-50'}`}>
            
            {/* Breadcrumbs Playground */}
            <div className={`w-full max-w-md bg-white ${isMobile ? '' : 'p-6 rounded-xl shadow-sm border border-gray-200'}`}>
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Breadcrumbs</h4>
          <nav className="flex text-sm text-gray-500 font-medium" aria-label="Breadcrumb">
            <ol className="inline-flex items-center flex-wrap gap-y-2">
              {path.map((item, index) => {
                const isLast = index === path.length - 1;
                return (
                  <li key={item} className="inline-flex items-center">
                    {index > 0 && <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />}
                    <button
                      onClick={() => setPath(path.slice(0, index + 1))}
                      disabled={isLast}
                      className={`inline-flex items-center ${isLast ? 'text-gray-900 cursor-default' : 'hover:text-indigo-600 transition-colors'}`}
                    >
                      {index === 0 && <Home className="w-4 h-4 mr-1.5" />}
                      {item}
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>
          {path.length < fullPath.length && (
            <button 
              onClick={() => setPath(fullPath.slice(0, path.length + 1))}
              className="mt-6 px-4 py-2 bg-indigo-50 text-indigo-600 text-sm font-medium rounded-lg hover:bg-indigo-100 transition-colors"
            >
              Navigate Deeper
            </button>
          )}
        </div>

        {/* Accordion Playground */}
        <div className={`w-full max-w-md bg-white overflow-hidden divide-y divide-gray-100 ${isMobile ? 'border-t border-b border-gray-200' : 'rounded-xl shadow-sm border border-gray-200'}`}>
          <div className="p-4 bg-gray-50 border-b border-gray-100">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Accordion</h4>
          </div>
          {items.map((item) => {
            const isOpen = openItem === item.id;
            return (
              <div key={item.id} className="flex flex-col">
                <button 
                  onClick={() => toggleItem(item.id)}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
                >
                  {chevronPos === 'left' && (
                    <ChevronDown className={`w-5 h-5 text-gray-400 mr-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : '-rotate-90'}`} />
                  )}
                  <span className="font-medium text-gray-900 flex-1">{item.title}</span>
                  {chevronPos === 'right' && (
                    <ChevronDown className={`w-5 h-5 text-gray-400 ml-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
                  )}
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="p-4 pt-0 text-gray-600 text-sm leading-relaxed">
                    {item.content}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

          </div>
        )}
      </DevicePreview>
    </div>
  );

  return <LessonLayout title="Navigation & Chevrons" description="Master accordions, breadcrumbs, and directional icons." theory={theory} playground={playground} />;
}
