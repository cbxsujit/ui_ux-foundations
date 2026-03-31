import React, { useState } from 'react';
import { LessonLayout } from '../components/LessonLayout';
import { SunMoon, Sun, Moon, Palette, Info, Layout, Type, CheckCircle2 } from 'lucide-react';

export function ThemingLesson() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [accentColor, setAccentColor] = useState('#6366f1');

  const accents = [
    { name: 'Indigo', color: '#6366f1' },
    { name: 'Emerald', color: '#10b981' },
    { name: 'Rose', color: '#f43f5e' },
    { name: 'Amber', color: '#f59e0b' },
  ];

  const theory = (
    <div className="space-y-6 text-gray-600">
      <p>
        Theming and personalization allow users to adapt the interface to their <strong>environment</strong> and <strong>preferences</strong>.
      </p>

      <div className="space-y-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
            <SunMoon className="w-4 h-4 text-indigo-500" />
            Dark Mode
          </h4>
          <p className="text-sm">Reduces eye strain in low-light environments and can save battery life on OLED screens.</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
            <Palette className="w-4 h-4 text-pink-500" />
            Personalization
          </h4>
          <p className="text-sm">Allowing users to choose accent colors or layouts creates a sense of ownership and comfort.</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Design Challenges</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Contrast:</strong> Ensure text remains legible in both light and dark modes (WCAG standards).</li>
          <li><strong>Semantic Colors:</strong> Use names like "surface", "on-surface", and "primary" instead of "white" or "black".</li>
          <li><strong>Image Adaptation:</strong> Some images or illustrations may need to be swapped or filtered for dark mode.</li>
        </ul>
      </div>

      <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
        <h4 className="font-bold text-indigo-900 mb-2">Ready to experiment?</h4>
        <p className="text-sm text-indigo-700 mb-4">Toggle between light and dark modes and change the accent color in the lab.</p>
        <button className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all lg:hidden">
          Open Interactive Lab
        </button>
      </div>
    </div>
  );

  const playground = (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SunMoon className="w-5 h-5 text-indigo-500" />
          <h3 className="font-semibold text-gray-900">Theming Lab</h3>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200">
            <button 
              onClick={() => setTheme('light')}
              className={`p-2 rounded-lg transition-all ${theme === 'light' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Sun className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setTheme('dark')}
              className={`p-2 rounded-lg transition-all ${theme === 'dark' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Moon className="w-4 h-4" />
            </button>
          </div>

          <div className="flex gap-2">
            {accents.map(acc => (
              <button 
                key={acc.name}
                onClick={() => setAccentColor(acc.color)}
                className="w-6 h-6 rounded-full border-2 border-white shadow-sm transition-transform hover:scale-110 flex items-center justify-center"
                style={{ backgroundColor: acc.color }}
              >
                {accentColor === acc.color && <CheckCircle2 className="w-3 h-3 text-white" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={`flex-1 p-8 flex items-center justify-center transition-colors duration-500 ${theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50'}`}>
        <div className={`w-full max-w-md p-8 rounded-[2.5rem] shadow-2xl transition-all duration-500 border ${
          theme === 'dark' ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-100 text-gray-900'
        }`}>
          <div className="flex items-center justify-between mb-8">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: accentColor }}>
              <Layout className="w-6 h-6" />
            </div>
            <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
              theme === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-500'
            }`}>
              Settings
            </div>
          </div>

          <h4 className="text-2xl font-bold mb-2">Personalize your view</h4>
          <p className={`text-sm mb-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            Choose a theme that matches your style and environment.
          </p>

          <div className="space-y-4">
            <div className={`p-4 rounded-2xl border transition-colors ${
              theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-100'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Type className="w-4 h-4" style={{ color: accentColor }} />
                  <span className="text-sm font-bold">Typography</span>
                </div>
                <div className="w-10 h-5 bg-gray-300 rounded-full relative">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
              <div className={`h-2 w-full rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <div className="h-full w-2/3 rounded-full" style={{ backgroundColor: accentColor }}></div>
              </div>
            </div>

            <button 
              className="w-full py-4 rounded-2xl font-bold text-white shadow-xl transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ backgroundColor: accentColor, boxShadow: `0 10px 25px -5px ${accentColor}40` }}
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-900 text-white flex items-center gap-3">
        <Info className="w-5 h-5 text-indigo-400 shrink-0" />
        <p className="text-xs text-gray-400">
          <strong>UX Insight:</strong> Dark mode is not just "inverting colors." You should use elevation (lighter grays for elements closer to the user) and reduce the saturation of accent colors to maintain legibility and comfort.
        </p>
      </div>
    </div>
  );

  return (
    <LessonLayout
      title="Theming & Personalization"
      description="Design flexible interfaces that adapt to user environments and tastes."
      theory={theory}
      playground={playground}
    />
  );
}