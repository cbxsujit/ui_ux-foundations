import React, { useState } from 'react';
import { LessonLayout } from '../components/LessonLayout';
import { Layout, Smartphone, Monitor, Tablet, Info } from 'lucide-react';
import { DevicePreview } from '../components/DevicePreview';

export function TabsLesson() {
  const [activeTab, setActiveTab] = useState('profile');
  const [tabStyle, setTabStyle] = useState<'underline' | 'pills' | 'segmented'>('underline');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <Layout className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Monitor className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notifications', icon: <Smartphone className="w-4 h-4" /> },
    { id: 'security', label: 'Security', icon: <Tablet className="w-4 h-4" /> },
  ];

  const theory = (
    <div className="space-y-6 text-gray-600">
      <p>
        <strong>Tabs</strong> allow users to navigate between related views of content within the same context. They are a powerful way to organize information without leaving the page.
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Tab Styles</h3>
      <ul className="space-y-4">
        <li className="flex items-start gap-3">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg shrink-0"><div className="w-5 h-5 border-b-2 border-current" /></div>
          <div>
            <strong className="block text-gray-900">Underline</strong>
            <span className="text-sm">The classic style. Clean and minimal. Best for high-level navigation where you want to keep the focus on content.</span>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg shrink-0"><div className="w-5 h-5 bg-current opacity-20 rounded" /></div>
          <div>
            <strong className="block text-gray-900">Pills</strong>
            <span className="text-sm">More visual weight. Great for filtering or secondary navigation where tabs need to stand out as interactive elements.</span>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg shrink-0"><div className="w-5 h-5 border border-current rounded" /></div>
          <div>
            <strong className="block text-gray-900">Segmented Control</strong>
            <span className="text-sm">Best for toggling between 2-4 options. Often used in mobile apps to switch views (e.g., "List" vs "Map").</span>
          </div>
        </li>
      </ul>

      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mt-6">
        <h4 className="text-amber-900 font-semibold mb-2">UX Tip: Scrollable Tabs</h4>
        <p className="text-sm text-amber-800">
          On mobile, if you have more than 3-4 tabs, allow them to scroll horizontally. Never wrap tabs to a second line as it breaks the mental model of "parallel views."
        </p>
      </div>
    </div>
  );

  const playground = (
    <div className="flex-1 flex flex-col h-full bg-gray-50">
      <div className="p-6 border-b border-gray-200 bg-white flex flex-wrap gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Tab Style</label>
          <div className="flex bg-gray-100 p-1 rounded-xl">
            {(['underline', 'pills', 'segmented'] as const).map((style) => (
              <button
                key={style}
                onClick={() => setTabStyle(style)}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${tabStyle === style ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {style.charAt(0).toUpperCase() + style.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <DevicePreview>
        {(isMobile) => (
          <div className={`flex-1 flex flex-col items-center justify-start ${isMobile ? 'p-4 bg-white' : 'p-10 bg-gray-50'}`}>
            <div className={`w-full max-w-md bg-white overflow-hidden ${isMobile ? '' : 'rounded-2xl shadow-xl border border-gray-200'}`}>
              
              {/* Tab Header */}
              <div className={`px-4 border-b border-gray-100 ${tabStyle === 'segmented' ? 'py-4' : ''}`}>
                <div className={`flex ${isMobile ? 'overflow-x-auto no-scrollbar' : ''} ${tabStyle === 'segmented' ? 'bg-gray-100 p-1 rounded-xl' : 'gap-6'}`}>
                  {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    
                    if (tabStyle === 'underline') {
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`py-4 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${isActive ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                        >
                          {tab.label}
                        </button>
                      );
                    }
                    
                    if (tabStyle === 'pills') {
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`my-3 px-4 py-2 text-sm font-bold rounded-full transition-all whitespace-nowrap ${isActive ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}
                        >
                          {tab.label}
                        </button>
                      );
                    }

                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${isActive ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                    {tabs.find(t => t.id === activeTab)?.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 capitalize">{activeTab} Settings</h3>
                    <p className="text-sm text-gray-500">Manage your account {activeTab} here.</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="h-4 bg-gray-100 rounded-full w-3/4" />
                  <div className="h-4 bg-gray-100 rounded-full w-full" />
                  <div className="h-4 bg-gray-100 rounded-full w-5/6" />
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-indigo-50 rounded-xl border border-indigo-100 max-w-md flex gap-3">
              <Info className="w-5 h-5 text-indigo-500 shrink-0" />
              <p className="text-xs text-indigo-700 leading-relaxed">
                <strong>UX Insight:</strong> Use <strong>Underline</strong> for primary navigation, <strong>Pills</strong> for secondary filtering, and <strong>Segmented Controls</strong> for view switching.
              </p>
            </div>
          </div>
        )}
      </DevicePreview>
    </div>
  );

  return <LessonLayout title="Tabs" description="Organize related content into parallel views." theory={theory} playground={playground} />;
}
