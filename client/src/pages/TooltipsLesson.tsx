import React, { useState } from 'react';
import { LessonLayout } from '../components/LessonLayout';
import { HelpCircle, MessageSquare, Info, Settings, Trash2, Share2 } from 'lucide-react';
import { DevicePreview } from '../components/DevicePreview';

export function TooltipsLesson() {
  const [showTooltips, setShowTooltips] = useState(true);
  const [activePopover, setActivePopover] = useState<string | null>(null);

  const theory = (
    <div className="space-y-6 text-gray-600">
      <p>
        Providing help without cluttering the main interface is a delicate balance. Tooltips and Popovers are your best friends here.
      </p>
      <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">When to use which?</h3>
      <ul className="space-y-4">
        <li className="flex items-start gap-3">
          <div className="p-2 bg-purple-100 text-purple-600 rounded-lg shrink-0"><Info className="w-5 h-5" /></div>
          <div>
            <strong className="block text-gray-900">Tooltips (Hover)</strong>
            <span className="text-sm">Small, text-only boxes that appear on hover. Use them to explain ambiguous icons or provide brief context. *Never put critical information in a tooltip, as mobile users cannot hover.*</span>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <div className="p-2 bg-purple-100 text-purple-600 rounded-lg shrink-0"><MessageSquare className="w-5 h-5" /></div>
          <div>
            <strong className="block text-gray-900">Popovers (Click)</strong>
            <span className="text-sm">Larger boxes triggered by a click. They can contain rich content, links, or actions (like a mini-profile or a settings menu).</span>
          </div>
        </li>
      </ul>
    </div>
  );

  const playground = (
    <div className="flex-1 flex flex-col h-full relative">
      <div className="p-6 border-b border-gray-200 bg-gray-50 flex gap-4">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
          <input 
            type="checkbox" 
            checked={showTooltips} 
            onChange={(e) => setShowTooltips(e.target.checked)} 
            className="rounded text-indigo-600" 
          />
          Enable Tooltips on Hover
        </label>
      </div>

      <DevicePreview>
        {(isMobile) => (
          <div className={`flex-1 flex items-center justify-center relative ${isMobile ? 'bg-white' : 'p-10 bg-gray-50'}`} onClick={() => setActivePopover(null)}>
            <div className={`bg-white flex ${isMobile ? 'w-full justify-around p-4 border-t border-gray-200 absolute bottom-0 inset-x-0' : 'p-6 rounded-2xl shadow-sm border border-gray-200 gap-6'}`} onClick={e => e.stopPropagation()}>
              
              {/* Icon 1: Settings (Popover) */}
          <div className="relative group">
            <button 
              onClick={() => setActivePopover(activePopover === 'settings' ? null : 'settings')}
              className="p-3 rounded-xl hover:bg-gray-100 text-gray-600 transition-colors"
            >
              <Settings className="w-6 h-6" />
            </button>
            {showTooltips && !isMobile && activePopover !== 'settings' && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                Settings
              </div>
            )}
            {activePopover === 'settings' && (
              <div className={`absolute w-48 bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-10 animate-in fade-in ${isMobile ? 'bottom-full mb-2 right-0' : 'top-full mt-2 left-1/2 -translate-x-1/2 slide-in-from-top-2'}`}>
                <h4 className="font-semibold text-gray-900 mb-2 text-sm">Quick Settings</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-gray-600"><input type="checkbox" className="rounded" /> Dark Mode</label>
                  <label className="flex items-center gap-2 text-sm text-gray-600"><input type="checkbox" className="rounded" /> Notifications</label>
                </div>
              </div>
            )}
          </div>

          {/* Icon 2: Share (Tooltip only) */}
          <div className="relative group">
            <button className="p-3 rounded-xl hover:bg-gray-100 text-gray-600 transition-colors">
              <Share2 className="w-6 h-6" />
            </button>
            {showTooltips && !isMobile && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                Share Document
              </div>
            )}
          </div>

          {/* Icon 3: Delete (Tooltip only) */}
          <div className="relative group">
            <button className="p-3 rounded-xl hover:bg-red-50 text-red-600 transition-colors">
              <Trash2 className="w-6 h-6" />
            </button>
            {showTooltips && !isMobile && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-red-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                Delete (Irreversible)
              </div>
            )}
          </div>

            </div>
          </div>
        )}
      </DevicePreview>
    </div>
  );

  return <LessonLayout title="Tooltips & Popovers" description="Provide contextual help without cluttering the UI." theory={theory} playground={playground} />;
}
