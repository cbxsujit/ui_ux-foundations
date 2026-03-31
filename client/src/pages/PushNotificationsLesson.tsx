import React, { useState } from 'react';
import { LessonLayout } from '../components/LessonLayout';
import { BellRing, BellOff, Settings, Info, CheckCircle2, X } from 'lucide-react';

export function PushNotificationsLesson() {
  const [notifications, setNotifications] = useState<{ id: number; type: 'urgent' | 'promo' | 'social'; title: string; body: string }[]>([]);
  const [settings, setSettings] = useState({ urgent: true, promo: false, social: true });

  const sendNotification = (type: 'urgent' | 'promo' | 'social') => {
    if (!settings[type]) return;

    const newNotif = {
      id: Date.now(),
      type,
      title: type === 'urgent' ? 'Security Alert' : type === 'promo' ? '50% Off Sale!' : 'New Message',
      body: type === 'urgent' ? 'New login from unknown device.' : type === 'promo' ? 'Use code SAVE50 today only.' : 'Alex sent you a photo.',
    };

    setNotifications((prev) => [newNotif, ...prev].slice(0, 3));
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const theory = (
    <div className="space-y-6 text-gray-600">
      <p>
        Push notifications are powerful tools for re-engagement, but they are easily abused. Poorly timed or irrelevant notifications lead to users disabling them entirely or uninstalling the app.
      </p>

      <div className="space-y-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
            <BellRing className="w-4 h-4 text-indigo-500" />
            Relevance & Timing
          </h4>
          <p className="text-sm">Only send notifications that are highly relevant to the user's immediate context or interests. Avoid sending them late at night (unless urgent).</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
            <Settings className="w-4 h-4 text-emerald-500" />
            Granular Control
          </h4>
          <p className="text-sm">Never use a single "All or Nothing" toggle. Allow users to choose *which* types of notifications they receive (e.g., Direct Messages vs. Marketing).</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">The "Ask" Strategy</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Don't ask immediately:</strong> Wait until the user has experienced the value of your app before requesting permission.</li>
          <li><strong>Pre-permission prompts:</strong> Use a custom in-app modal to explain *why* you need permission before triggering the native OS prompt.</li>
        </ul>
      </div>
    </div>
  );

  const playground = (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BellRing className="w-5 h-5 text-indigo-500" />
          <h3 className="font-semibold text-gray-900">Notifications Lab</h3>
        </div>
      </div>

      <div className="flex-1 p-8 flex flex-col md:flex-row gap-8 items-start justify-center relative overflow-hidden">
        
        {/* Settings Panel */}
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
            <Settings className="w-4 h-4 text-gray-500" />
            <h4 className="font-bold text-gray-900">Notification Preferences</h4>
          </div>
          
          <div className="divide-y divide-gray-100">
            {(['urgent', 'social', 'promo'] as const).map((type) => (
              <div key={type} className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 capitalize">{type === 'urgent' ? 'Security & Alerts' : type === 'social' ? 'Messages & Social' : 'Promotions & Offers'}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {type === 'urgent' && 'Critical account updates.'}
                    {type === 'social' && 'When friends interact with you.'}
                    {type === 'promo' && 'Sales, discounts, and news.'}
                  </p>
                </div>
                <button 
                  onClick={() => setSettings(s => ({ ...s, [type]: !s[type] }))}
                  className={`w-12 h-6 rounded-full transition-colors relative ${settings[type] ? 'bg-emerald-500' : 'bg-gray-300'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${settings[type] ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Phone Simulation */}
        <div className="w-full max-w-xs h-[500px] bg-gray-900 rounded-[3rem] p-4 shadow-2xl relative border-8 border-gray-800 flex flex-col">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-3xl"></div>
          
          <div className="flex-1 mt-8 space-y-3 relative z-10">
            {notifications.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-500 opacity-50">
                <BellOff className="w-12 h-12 mb-4" />
                <p>No new notifications</p>
              </div>
            ) : (
              notifications.map((n) => (
                <div key={n.id} className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-white animate-in slide-in-from-top-4 fade-in duration-300 relative group">
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-2 h-2 rounded-full ${n.type === 'urgent' ? 'bg-rose-500' : n.type === 'promo' ? 'bg-amber-500' : 'bg-indigo-500'}`} />
                    <h5 className="font-bold text-sm">{n.title}</h5>
                  </div>
                  <p className="text-xs text-gray-300">{n.body}</p>
                  <button 
                    onClick={() => removeNotification(n.id)}
                    className="absolute top-2 right-2 p-1 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Trigger Buttons */}
          <div className="mt-auto bg-gray-800 p-4 rounded-2xl space-y-2">
            <p className="text-xs text-center text-gray-400 font-bold uppercase tracking-wider mb-2">Simulate Server Events</p>
            <div className="grid grid-cols-3 gap-2">
              <button onClick={() => sendNotification('urgent')} className="py-2 bg-rose-500/20 text-rose-400 rounded-lg text-xs font-bold hover:bg-rose-500/30">Alert</button>
              <button onClick={() => sendNotification('social')} className="py-2 bg-indigo-500/20 text-indigo-400 rounded-lg text-xs font-bold hover:bg-indigo-500/30">Message</button>
              <button onClick={() => sendNotification('promo')} className="py-2 bg-amber-500/20 text-amber-400 rounded-lg text-xs font-bold hover:bg-amber-500/30">Promo</button>
            </div>
          </div>
        </div>

      </div>

      <div className="p-4 bg-gray-900 text-white flex items-center gap-3">
        <Info className="w-5 h-5 text-indigo-400 shrink-0" />
        <p className="text-xs text-gray-400">
          <strong>UX Insight:</strong> Try turning off "Promotions" in the settings, then click the "Promo" trigger button. The notification won't appear. Granular control prevents users from disabling ALL notifications just because they hate marketing messages.
        </p>
      </div>
    </div>
  );

  return (
    <LessonLayout
      title="Push Notifications UX"
      description="Designing respectful, relevant, and timely interruptions."
      theory={theory}
      playground={playground}
    />
  );
}
