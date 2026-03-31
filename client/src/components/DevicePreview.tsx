import React, { useState } from 'react';
import { Monitor, Smartphone } from 'lucide-react';

interface DevicePreviewProps {
  children: (isMobile: boolean) => React.ReactNode;
}

export function DevicePreview({ children }: DevicePreviewProps) {
  const [view, setView] = useState<'desktop' | 'mobile'>('desktop');

  return (
    <div className="flex-1 flex flex-col bg-gray-100 overflow-hidden">
      <div className="flex justify-center p-3 border-b border-gray-200 bg-gray-200/50">
        <div className="flex bg-gray-300/50 p-1 rounded-lg">
          <button
            onClick={() => setView('desktop')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${view === 'desktop' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Monitor className="w-4 h-4" /> Desktop
          </button>
          <button
            onClick={() => setView('mobile')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${view === 'mobile' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Smartphone className="w-4 h-4" /> Mobile
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto flex items-center justify-center p-4 sm:p-8">
        {view === 'desktop' ? (
          <div className="w-full max-w-4xl h-full max-h-[600px] bg-white rounded-xl shadow-xl border border-gray-300 flex flex-col overflow-hidden transition-all duration-300">
            <div className="h-10 bg-gray-100 border-b border-gray-200 flex items-center px-4 gap-2 shrink-0">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="flex-1 overflow-y-auto relative bg-white flex flex-col">
              {children(false)}
            </div>
          </div>
        ) : (
          <div className="w-[375px] h-[667px] bg-white rounded-[2.5rem] shadow-2xl border-[12px] border-gray-900 flex flex-col overflow-hidden relative transition-all duration-300 shrink-0">
            <div className="absolute top-0 inset-x-0 h-6 bg-gray-900 rounded-b-xl w-40 mx-auto z-50"></div>
            <div className="flex-1 overflow-y-auto relative pt-8 bg-white flex flex-col">
              {children(true)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
