import React, { useState } from 'react';
import { LessonLayout } from '../components/LessonLayout';
import { Globe, Languages, AlignLeft, AlignRight, Info } from 'lucide-react';

export function LocalizationLesson() {
  const [language, setLanguage] = useState<'en' | 'es' | 'ar'>('en');

  const content = {
    en: {
      title: 'Welcome',
      subtitle: 'Discover the world with us.',
      button: 'Get Started',
      dir: 'ltr',
    },
    es: {
      title: 'Bienvenido',
      subtitle: 'Descubre el mundo con nosotros.',
      button: 'Empezar',
      dir: 'ltr',
    },
    ar: {
      title: 'مرحباً',
      subtitle: 'اكتشف العالم معنا.',
      button: 'ابدأ الآن',
      dir: 'rtl',
    },
  };

  const theory = (
    <div className="space-y-6 text-gray-600">
      <p>
        Localization (l10n) and Internationalization (i18n) ensure your product is usable and culturally appropriate for users worldwide. It goes beyond simple translation.
      </p>

      <div className="space-y-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
            <Languages className="w-4 h-4 text-indigo-500" />
            Text Expansion
          </h4>
          <p className="text-sm">Translated text can be up to 30% longer (e.g., German) or shorter than English. UIs must be flexible enough to accommodate these changes without breaking.</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
            <AlignRight className="w-4 h-4 text-emerald-500" />
            Right-to-Left (RTL)
          </h4>
          <p className="text-sm">Languages like Arabic and Hebrew read right-to-left. The entire UI layout, including icons and navigation, must be mirrored.</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Cultural Considerations</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Color Meanings:</strong> Red means danger in Western cultures but prosperity in China.</li>
          <li><strong>Date/Time Formats:</strong> MM/DD/YYYY vs DD/MM/YYYY, 12-hour vs 24-hour clocks.</li>
          <li><strong>Iconography:</strong> Ensure icons are universally understood (e.g., a mailbox might look different globally).</li>
        </ul>
      </div>
    </div>
  );

  const playground = (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-indigo-500" />
          <h3 className="font-semibold text-gray-900">Localization Lab</h3>
        </div>
        
        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl border border-gray-200">
          <button 
            onClick={() => setLanguage('en')}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${language === 'en' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            English
          </button>
          <button 
            onClick={() => setLanguage('es')}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${language === 'es' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Español
          </button>
          <button 
            onClick={() => setLanguage('ar')}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${language === 'ar' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            العربية
          </button>
        </div>
      </div>

      <div className="flex-1 p-8 flex items-center justify-center relative overflow-hidden">
        
        {/* Localized Card */}
        <div 
          className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8 transition-all duration-500"
          dir={content[language].dir}
        >
          <div className="flex items-start justify-between mb-6">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
              <Globe className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              {content[language].dir === 'rtl' ? <AlignRight className="w-4 h-4" /> : <AlignLeft className="w-4 h-4" />}
            </div>
          </div>
          
          <h4 className="text-3xl font-bold text-gray-900 mb-2">{content[language].title}</h4>
          <p className="text-gray-500 mb-8">{content[language].subtitle}</p>
          
          <button className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
            {content[language].button}
          </button>
        </div>
      </div>

      <div className="p-4 bg-gray-900 text-white flex items-center gap-3">
        <Info className="w-5 h-5 text-indigo-400 shrink-0" />
        <p className="text-xs text-gray-400">
          <strong>UX Insight:</strong> Notice how the layout mirrors when switching to Arabic (RTL). The icon moves to the right, and text alignment changes. Also observe how the button text length changes between English and Spanish.
        </p>
      </div>
    </div>
  );

  return (
    <LessonLayout
      title="Localization & i18n"
      description="Designing interfaces that adapt to different languages, cultures, and regions."
      theory={theory}
      playground={playground}
    />
  );
}
