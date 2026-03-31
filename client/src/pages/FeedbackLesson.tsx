import React, { useState, useEffect } from 'react';
import { LessonLayout } from '../components/LessonLayout';
import { Bell, AlertTriangle, CheckCircle2, X, Inbox } from 'lucide-react';
import { DevicePreview } from '../components/DevicePreview';

export function FeedbackLesson() {
  const [toastVisible, setToastVisible] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(false);
  const [isEmptyState, setIsEmptyState] = useState(true);

  useEffect(() => {
    if (toastVisible) {
      const timer = setTimeout(() => setToastVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastVisible]);

  useEffect(() => {
    if (snackbarVisible) {
      const timer = setTimeout(() => setSnackbarVisible(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [snackbarVisible]);

  const theory = (
    <div className="space-y-6 text-gray-600">
      <p>
        Users need to know what the system is doing, whether an action succeeded, failed, or is in progress. Good feedback builds trust.
      </p>
      <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Types of Feedback</h3>
      <ul className="space-y-4">
        <li className="flex items-start gap-3">
          <div className="p-2 bg-amber-100 text-amber-600 rounded-lg shrink-0"><AlertTriangle className="w-5 h-5" /></div>
          <div>
            <strong className="block text-gray-900">Alert Banners</strong>
            <span className="text-sm">Persistent messages for important information (e.g., "Your subscription expires in 3 days"). Usually placed at the top of the screen.</span>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <div className="p-2 bg-green-100 text-green-600 rounded-lg shrink-0"><CheckCircle2 className="w-5 h-5" /></div>
          <div>
            <strong className="block text-gray-900">Snackbars</strong>
            <span className="text-sm">Brief, auto-dismissing messages for low-priority feedback (e.g., "Message sent"). Usually float at the bottom center. They often include a single action (like "Undo").</span>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg shrink-0"><Bell className="w-5 h-5" /></div>
          <div>
            <strong className="block text-gray-900">Toasts</strong>
            <span className="text-sm">Similar to snackbars but often used for system-level notifications. Usually appear in the top-right corner on desktop.</span>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <div className="p-2 bg-slate-100 text-slate-600 rounded-lg shrink-0"><Inbox className="w-5 h-5" /></div>
          <div>
            <strong className="block text-gray-900">Empty States</strong>
            <span className="text-sm">What a screen looks like when there is no data yet. A good empty state educates and prompts action rather than just saying "No data."</span>
          </div>
        </li>
      </ul>
    </div>
  );

  const playground = (
    <div className="flex-1 flex flex-col h-full relative overflow-hidden">
      <div className="p-6 border-b border-gray-200 bg-gray-50 flex flex-wrap gap-4 relative z-20">
        <button 
          onClick={() => setToastVisible(true)}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Trigger Toast
        </button>
        <button 
          onClick={() => setSnackbarVisible(true)}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Trigger Snackbar
        </button>
        <button 
          onClick={() => setBannerVisible(!bannerVisible)}
          className={`px-4 py-2 rounded-lg text-sm font-medium border ${bannerVisible ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
        >
          Toggle Banner
        </button>
        <button 
          onClick={() => setIsEmptyState(!isEmptyState)}
          className={`px-4 py-2 rounded-lg text-sm font-medium border ${isEmptyState ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
        >
          Toggle Empty State
        </button>
      </div>

      <DevicePreview>
        {(isMobile) => (
          <div className="flex-1 bg-gray-50 relative flex flex-col h-full">
            {/* Banner */}
            <div className={`bg-amber-500 text-white px-4 py-3 flex items-center justify-between transition-all duration-300 ${bannerVisible ? 'h-auto opacity-100' : 'h-0 opacity-0 overflow-hidden py-0'}`}>
              <div className={`flex items-center gap-2 font-medium ${isMobile ? 'text-xs' : 'text-sm'}`}>
                <AlertTriangle className="w-4 h-4 shrink-0" />
                Your trial expires in 2 days. Upgrade to keep your projects.
              </div>
              <button onClick={() => setBannerVisible(false)} className="text-amber-100 hover:text-white shrink-0 ml-4"><X className="w-4 h-4" /></button>
            </div>

            {/* Main Content Area */}
            <div className={`flex-1 overflow-y-auto ${isMobile ? 'p-4' : 'p-8'}`}>
          {isEmptyState ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-sm mx-auto">
              <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                <Inbox className="w-10 h-10 text-indigo-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No projects yet</h3>
              <p className="text-gray-500 mb-8">Get started by creating your first project. You can invite team members later.</p>
              <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                Create New Project
              </button>
            </div>
          ) : (
            <div className="space-y-4 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Projects</h2>
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">Project Alpha {i}</h4>
                    <p className="text-sm text-gray-500">Updated 2 days ago</p>
                  </div>
                  <button className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100">
                    Open
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

            {/* Toast (Top Right) */}
            <div className={`absolute top-6 right-6 bg-white border border-gray-200 text-gray-900 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 transition-all duration-300 transform z-50 ${toastVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'}`}>
              <Bell className="w-5 h-5 text-indigo-500 shrink-0" />
              <div className="flex flex-col">
                <span className="text-sm font-bold">New Notification</span>
                <span className="text-xs text-gray-500">Your report is ready to view.</span>
              </div>
              <button onClick={() => setToastVisible(false)} className="ml-2 text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>
            </div>

            {/* Snackbar (Bottom Center) */}
            <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-xl flex items-center justify-between gap-8 transition-all duration-300 transform z-50 ${isMobile ? 'w-[calc(100%-2rem)]' : 'min-w-[320px]'} ${snackbarVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
              <span className="text-sm font-medium">Item deleted from your library.</span>
              <button onClick={() => setSnackbarVisible(false)} className="text-sm font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-wider">Undo</button>
            </div>
          </div>
        )}
      </DevicePreview>
    </div>
  );

  return <LessonLayout title="Feedback & Status" description="Keep users informed about what is happening." theory={theory} playground={playground} />;
}
