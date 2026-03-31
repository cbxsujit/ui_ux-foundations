import React, { useState, useEffect } from 'react';
import { LessonLayout } from '../components/LessonLayout';
import { Info, CheckCircle2, AlertTriangle, X } from 'lucide-react';
import { DevicePreview } from '../components/DevicePreview';

export function SnackbarLesson() {
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [message, setMessage] = useState('Item archived.');
  const [actionLabel, setActionLabel] = useState('Undo');

  const triggerSnackbar = () => {
    setSnackbarVisible(true);
  };

  useEffect(() => {
    if (snackbarVisible) {
      const timer = setTimeout(() => {
        setSnackbarVisible(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [snackbarVisible]);

  const theory = (
    <div className="space-y-6 text-gray-600">
      <p>
        <strong>Snackbars</strong> provide brief messages about app processes at the bottom of the screen. They are similar to Toasts but often include a single action.
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Snackbars vs. Toasts</h3>
      <ul className="space-y-4">
        <li className="flex items-start gap-3">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg shrink-0"><CheckCircle2 className="w-5 h-5" /></div>
          <div>
            <strong className="block text-gray-900">Snackbars (Actionable)</strong>
            <span className="text-sm">Often placed at the bottom center. Usually contain a brief message and a single action (like "Undo" or "Retry"). They should not interrupt the user's experience.</span>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg shrink-0"><AlertTriangle className="w-5 h-5" /></div>
          <div>
            <strong className="block text-gray-900">Toasts (Informational)</strong>
            <span className="text-sm">Often placed at the top right (desktop) or top center (mobile). Primarily used for system-level notifications where no immediate action is required.</span>
          </div>
        </li>
      </ul>

      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mt-6">
        <h4 className="text-amber-900 font-semibold mb-2">UX Tip: Auto-Dismissal</h4>
        <p className="text-sm text-amber-800">
          Snackbars should automatically disappear after a short timeout (usually 4-10 seconds) unless they contain a critical action that the user must see.
        </p>
      </div>
    </div>
  );

  const playground = (
    <div className="flex-1 flex flex-col h-full bg-gray-50">
      <div className="p-6 border-b border-gray-200 bg-white flex flex-wrap gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Message</label>
          <input 
            type="text" 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Action Label</label>
          <input 
            type="text" 
            value={actionLabel} 
            onChange={(e) => setActionLabel(e.target.value)} 
            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
          />
        </div>
        <button 
          onClick={triggerSnackbar}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 self-end mb-1"
        >
          Show Snackbar
        </button>
      </div>

      <DevicePreview>
        {(isMobile) => (
          <div className={`flex-1 flex flex-col items-center justify-start relative overflow-hidden ${isMobile ? 'p-4 bg-white' : 'p-10 bg-gray-50'}`}>
            <div className={`w-full max-w-2xl bg-white h-96 flex items-center justify-center ${isMobile ? '' : 'rounded-2xl shadow-xl border border-gray-200'}`}>
              <p className="text-gray-400">Main Content Area</p>
            </div>

            {/* Snackbar */}
            <div 
              className={`absolute bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-xl flex items-center justify-between gap-8 transition-all duration-300 transform z-50 ${isMobile ? 'w-[calc(100%-2rem)]' : 'min-w-[320px]'} ${snackbarVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}
            >
              <span className="text-sm font-medium">{message}</span>
              {actionLabel && (
                <button 
                  onClick={() => setSnackbarVisible(false)} 
                  className="text-sm font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-wider"
                >
                  {actionLabel}
                </button>
              )}
            </div>
            
            <div className="mt-10 p-4 bg-indigo-50 rounded-xl border border-indigo-100 max-w-md flex gap-3">
              <Info className="w-5 h-5 text-indigo-500 shrink-0" />
              <p className="text-xs text-indigo-700 leading-relaxed">
                <strong>UX Insight:</strong> Ensure the snackbar does not cover important UI elements like floating action buttons or bottom navigation bars.
              </p>
            </div>
          </div>
        )}
      </DevicePreview>
    </div>
  );

  return <LessonLayout title="Snackbars" description="Provide brief, actionable feedback at the bottom of the screen." theory={theory} playground={playground} />;
}
