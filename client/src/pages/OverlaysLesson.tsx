import React, { useState } from 'react';
import { LessonLayout } from '../components/LessonLayout';
import { AppWindow, X, AlertCircle, PanelLeftClose } from 'lucide-react';
import { DevicePreview } from '../components/DevicePreview';

export function OverlaysLesson() {
  const [overlayType, setOverlayType] = useState<'modal' | 'drawer' | 'sidebar'>('modal');
  const [isOpen, setIsOpen] = useState(false);
  const [blurBackdrop, setBlurBackdrop] = useState(true);

  const theory = (
    <div className="space-y-6 text-gray-600">
      <p>
        Overlays sit on top of the main content. They are used to grab the user's attention or provide context without leaving the current page.
      </p>
      <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Modals vs. Drawers</h3>
      <ul className="space-y-4">
        <li className="flex items-start gap-3">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg shrink-0"><AlertCircle className="w-5 h-5" /></div>
          <div>
            <strong className="block text-gray-900">Modals (Dialogs)</strong>
            <span className="text-sm">Appear in the center. Highly disruptive. Use them for critical confirmations (e.g., "Delete Account") or short, focused tasks.</span>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg shrink-0"><AppWindow className="w-5 h-5" /></div>
          <div>
            <strong className="block text-gray-900">Drawers (Right Panel)</strong>
            <span className="text-sm">Slide in from the edge. Less disruptive. Great for complex settings, filters, or details where the user still wants to see the main page context.</span>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg shrink-0"><PanelLeftClose className="w-5 h-5" /></div>
          <div>
            <strong className="block text-gray-900">Sidebars (Left Navigation)</strong>
            <span className="text-sm">Slide in from the left. Used primarily for global app navigation. On mobile, they overlay the screen; on desktop, they often push content aside.</span>
          </div>
        </li>
      </ul>
    </div>
  );

  const playground = (
    <div className="flex-1 flex flex-col h-full relative overflow-hidden">
      <div className="p-6 border-b border-gray-200 bg-gray-50 flex flex-wrap gap-6 relative z-10">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Overlay Type</label>
          <div className="flex bg-white border border-gray-300 rounded-lg overflow-hidden">
            <button onClick={() => { setOverlayType('modal'); setIsOpen(true); }} className={`px-4 py-2 text-sm font-medium ${overlayType === 'modal' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500 hover:bg-gray-50'}`}>Modal</button>
            <button onClick={() => { setOverlayType('drawer'); setIsOpen(true); }} className={`px-4 py-2 text-sm font-medium border-l border-gray-300 ${overlayType === 'drawer' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500 hover:bg-gray-50'}`}>Drawer</button>
            <button onClick={() => { setOverlayType('sidebar'); setIsOpen(true); }} className={`px-4 py-2 text-sm font-medium border-l border-gray-300 ${overlayType === 'sidebar' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500 hover:bg-gray-50'}`}>Sidebar</button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Backdrop Blur</label>
          <button onClick={() => setBlurBackdrop(!blurBackdrop)} className={`px-4 py-2 text-sm font-medium rounded-lg border ${blurBackdrop ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-white border-gray-300 text-gray-600'}`}>
            {blurBackdrop ? 'Enabled' : 'Disabled'}
          </button>
        </div>
      </div>

      {/* Fake App Content */}
      <DevicePreview>
        {(isMobile) => (
          <div className="flex-1 p-10 bg-gray-100 relative overflow-hidden flex flex-col">
            <div className="max-w-2xl mx-auto space-y-4 w-full">
              <div className="h-8 w-1/3 bg-gray-300 rounded mb-8"></div>
              <div className="h-32 bg-white rounded-xl shadow-sm border border-gray-200"></div>
              <div className="h-32 bg-white rounded-xl shadow-sm border border-gray-200"></div>
              <div className="h-32 bg-white rounded-xl shadow-sm border border-gray-200"></div>
              <button onClick={() => setIsOpen(true)} className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium shadow-md hover:bg-indigo-700">
                Open {overlayType.charAt(0).toUpperCase() + overlayType.slice(1)}
              </button>
            </div>

            {/* Overlay Container */}
            {isOpen && (
              <div className={`absolute inset-0 z-50 flex ${overlayType === 'modal' ? 'items-center justify-center p-4' : overlayType === 'sidebar' ? 'justify-start' : 'justify-end'} transition-all duration-300`}>
                {/* Backdrop */}
                <div 
                  className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${blurBackdrop ? 'backdrop-blur-sm' : ''}`}
                  onClick={() => setIsOpen(false)}
                />
                
                {/* Content */}
                {overlayType === 'modal' ? (
                  <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 transform transition-all scale-100 animate-in zoom-in-95 duration-200">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold text-gray-900">Delete Project?</h3>
                      <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
                    </div>
                    <p className="text-gray-600 mb-6">Are you sure you want to delete this project? This action cannot be undone.</p>
                    <div className="flex justify-end gap-3">
                      <button onClick={() => setIsOpen(false)} className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg">Cancel</button>
                      <button onClick={() => setIsOpen(false)} className="px-4 py-2 bg-red-600 text-white font-medium hover:bg-red-700 rounded-lg">Delete</button>
                    </div>
                  </div>
                ) : overlayType === 'drawer' ? (
                  <div className="relative bg-white shadow-2xl w-full max-w-sm h-full flex flex-col transform transition-transform animate-in slide-in-from-right duration-300">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                      <h3 className="text-lg font-bold text-gray-900">Filters</h3>
                      <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
                    </div>
                    <div className="p-6 flex-1 overflow-y-auto space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <select className="w-full border border-gray-300 rounded-lg p-2"><option>All Categories</option></select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                        <div className="space-y-2">
                          <label className="flex items-center gap-2"><input type="checkbox" className="rounded text-indigo-600" /> Active</label>
                          <label className="flex items-center gap-2"><input type="checkbox" className="rounded text-indigo-600" /> Archived</label>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 border-t border-gray-100 bg-gray-50">
                      <button onClick={() => setIsOpen(false)} className="w-full px-4 py-2 bg-indigo-600 text-white font-medium hover:bg-indigo-700 rounded-lg">Apply Filters</button>
                    </div>
                  </div>
                ) : (
                  <div className="relative bg-white shadow-2xl w-64 h-full flex flex-col transform transition-transform animate-in slide-in-from-left duration-300">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-indigo-600 text-white">
                      <h3 className="text-lg font-bold">App Menu</h3>
                      <button onClick={() => setIsOpen(false)} className="text-indigo-200 hover:text-white"><X className="w-5 h-5" /></button>
                    </div>
                    <div className="p-4 flex-1 overflow-y-auto space-y-2">
                      {['Dashboard', 'Projects', 'Team', 'Settings'].map((item, i) => (
                        <button key={item} className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${i === 0 ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                          {item}
                        </button>
                      ))}
                    </div>
                    <div className="p-4 border-t border-gray-100">
                      <button className="w-full text-left px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium">Log out</button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </DevicePreview>
    </div>
  );

  return <LessonLayout title="Drawers, Modals & Sidebars" description="Understand when to block the user and when to slide in context." theory={theory} playground={playground} />;
}
