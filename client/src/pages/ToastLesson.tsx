import React, { useState, useEffect } from 'react';
import { LessonLayout } from '../components/LessonLayout';
import { Bell, CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { DevicePreview } from '../components/DevicePreview';

export function ToastLesson() {
  const [toasts, setToasts] = useState<{ id: number; type: 'success' | 'error' | 'info'; message: string }[]>([]);
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('success');

  const addToast = () => {
    const newToast = {
      id: Date.now(),
      type: toastType,
      message: toastType === 'success' ? 'Changes saved successfully.' : toastType === 'error' ? 'Failed to save changes.' : 'New update available.',
    };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        removeToast(toasts[0].id);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toasts]);

  const theory = (
    <div className="space-y-6 text-gray-600">
      <p>
        <strong>Toasts</strong> are non-disruptive messages that appear on the screen to provide brief feedback about an operation. They are usually auto-dismissing.
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">When to use Toasts?</h3>
      <ul className="space-y-4">
        <li className="flex items-start gap-3">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg shrink-0"><CheckCircle2 className="w-5 h-5" /></div>
          <div>
            <strong className="block text-gray-900">Success Confirmations</strong>
            <span className="text-sm">Confirming an action was successful (e.g., "Profile updated", "Message sent").</span>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg shrink-0"><AlertCircle className="w-5 h-5" /></div>
          <div>
            <strong className="block text-gray-900">Non-Critical Errors</strong>
            <span className="text-sm">Informing the user of a minor issue that doesn't require immediate action or block their workflow.</span>
          </div>
        </li>
      </ul>

      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mt-6">
        <h4 className="text-amber-900 font-semibold mb-2">UX Tip: Placement</h4>
        <p className="text-sm text-amber-800">
          On desktop, toasts usually appear in the top-right or bottom-right corner. On mobile, they are often centered at the top or bottom to ensure they are noticed but don't block critical UI.
        </p>
      </div>
    </div>
  );

  const playground = (
    <div className="flex-1 flex flex-col h-full bg-gray-50">
      <div className="p-6 border-b border-gray-200 bg-white flex flex-wrap gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Toast Type</label>
          <div className="flex bg-gray-100 p-1 rounded-xl">
            {(['success', 'error', 'info'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setToastType(type)}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${toastType === type ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <button 
          onClick={addToast}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 self-end mb-1"
        >
          Trigger Toast
        </button>
      </div>

      <DevicePreview>
        {(isMobile) => (
          <div className={`flex-1 flex flex-col items-center justify-start relative overflow-hidden ${isMobile ? 'p-4 bg-white' : 'p-10 bg-gray-50'}`}>
            <div className={`w-full max-w-2xl bg-white h-96 flex items-center justify-center ${isMobile ? '' : 'rounded-2xl shadow-xl border border-gray-200'}`}>
              <p className="text-gray-400">Main Content Area</p>
            </div>

            {/* Toast Container */}
            <div className={`absolute ${isMobile ? 'top-4 left-4 right-4 flex flex-col items-center' : 'top-10 right-10 flex flex-col items-end'} gap-2 z-50 pointer-events-none`}>
              {toasts.map((toast) => (
                <div 
                  key={toast.id} 
                  className={`pointer-events-auto bg-white border border-gray-200 text-gray-900 px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 transition-all duration-300 animate-in slide-in-from-top-2 fade-in ${isMobile ? 'w-full max-w-sm' : 'min-w-[300px]'}`}
                >
                  {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />}
                  {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />}
                  {toast.type === 'info' && <Info className="w-5 h-5 text-blue-500 shrink-0" />}
                  
                  <div className="flex flex-col flex-1">
                    <span className="text-sm font-bold capitalize">{toast.type}</span>
                    <span className="text-xs text-gray-500">{toast.message}</span>
                  </div>
                  <button onClick={() => removeToast(toast.id)} className="ml-2 text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
            
            <div className="mt-10 p-4 bg-indigo-50 rounded-xl border border-indigo-100 max-w-md flex gap-3">
              <Info className="w-5 h-5 text-indigo-500 shrink-0" />
              <p className="text-xs text-indigo-700 leading-relaxed">
                <strong>UX Insight:</strong> Keep toast messages short and concise. If an error requires the user to take multiple steps to fix it, use a modal or an inline alert instead of a toast.
              </p>
            </div>
          </div>
        )}
      </DevicePreview>
    </div>
  );

  return <LessonLayout title="Toasts" description="Provide brief, non-disruptive feedback." theory={theory} playground={playground} />;
}
