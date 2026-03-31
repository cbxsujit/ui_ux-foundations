import React, { useState } from 'react';
import { LessonLayout } from '../components/LessonLayout';
import { Lock, ShieldCheck, FileText, ToggleLeft, ToggleRight, Info, CheckCircle2 } from 'lucide-react';

export function PrivacySecurityLesson() {
  const [permissions, setPermissions] = useState({
    location: false,
    camera: false,
    notifications: false,
  });
  const [showConsent, setShowConsent] = useState(true);

  const togglePermission = (key: keyof typeof permissions) => {
    setPermissions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const theory = (
    <div className="space-y-6 text-gray-600">
      <p>
        Data privacy and security UX involves designing clear, transparent, and user-friendly ways to manage consent, permissions, and sensitive information.
      </p>

      <div className="space-y-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Clear Consent
          </h4>
          <p className="text-sm">Consent forms (like cookie banners) must be explicit, easy to understand, and offer a clear "Reject All" option alongside "Accept All".</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-500" />
            Just-in-Time Permissions
          </h4>
          <p className="text-sm">Ask for permissions (like camera or location) only when the user attempts an action that requires them, rather than immediately upon app launch.</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Best Practices</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Explain Why:</strong> Always tell the user *why* you need a specific permission or piece of data.</li>
          <li><strong>Granular Control:</strong> Allow users to opt-in or opt-out of specific data collection categories.</li>
          <li><strong>Easy Revocation:</strong> Make it simple for users to change their minds and revoke permissions later in settings.</li>
        </ul>
      </div>
    </div>
  );

  const playground = (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="p-4 border-b border-gray-200 bg-white flex items-center gap-2">
        <Lock className="w-5 h-5 text-indigo-500" />
        <h3 className="font-semibold text-gray-900">Privacy & Permissions Lab</h3>
      </div>

      <div className="flex-1 p-8 flex flex-col items-center justify-center relative overflow-hidden">
        
        {/* Settings Panel */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h4 className="text-xl font-bold text-gray-900">Privacy Settings</h4>
            <p className="text-sm text-gray-500 mt-1">Manage what data you share with us.</p>
          </div>
          
          <div className="divide-y divide-gray-100">
            {Object.entries(permissions).map(([key, value]) => (
              <div key={key} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div>
                  <p className="font-medium text-gray-900 capitalize">{key}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {key === 'location' && 'Used to show nearby events.'}
                    {key === 'camera' && 'Used to scan QR codes.'}
                    {key === 'notifications' && 'Used for important alerts.'}
                  </p>
                </div>
                <button 
                  onClick={() => togglePermission(key as keyof typeof permissions)}
                  className={`p-1 rounded-full transition-colors ${value ? 'text-emerald-500' : 'text-gray-300'}`}
                >
                  {value ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Cookie Banner Overlay */}
        {showConsent && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-900 text-white shadow-2xl animate-in slide-in-from-bottom duration-500">
            <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex-1">
                <h4 className="font-bold mb-1">We value your privacy</h4>
                <p className="text-sm text-gray-400">We use cookies to enhance your browsing experience and analyze our traffic. Please choose your preferences.</p>
              </div>
              <div className="flex gap-3 shrink-0">
                <button 
                  onClick={() => setShowConsent(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                >
                  Reject All
                </button>
                <button 
                  onClick={() => setShowConsent(false)}
                  className="px-4 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-gray-900 text-white flex items-center gap-3">
        <Info className="w-5 h-5 text-indigo-400 shrink-0" />
        <p className="text-xs text-gray-400">
          <strong>UX Insight:</strong> The cookie banner provides equal weight to "Accept" and "Reject" (though "Accept" is styled as primary, "Reject" is easily accessible). The settings panel clearly explains <em>why</em> each permission is needed.
        </p>
      </div>
    </div>
  );

  return (
    <LessonLayout
      title="Data Privacy & Security UX"
      description="Designing transparent consent flows and managing user permissions."
      theory={theory}
      playground={playground}
    />
  );
}
