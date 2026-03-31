import React, { useState } from 'react';
import { LessonLayout } from '../components/LessonLayout';
import { Eye, Keyboard, Ear, MousePointer2, CheckCircle2, XCircle } from 'lucide-react';

export function AccessibilityLesson() {
  const [activeTab, setActiveTab] = useState<'contrast' | 'keyboard'>('contrast');
  
  // Contrast Demo State
  const [bgColor, setBgColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#a3a3a3'); // Default to poor contrast

  // Simple contrast calculation (relative luminance)
  const getLuminance = (hex: string) => {
    const rgb = parseInt(hex.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >>  8) & 0xff;
    const b = (rgb >>  0) & 0xff;
    
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const getContrastRatio = (color1: string, color2: string) => {
    const l1 = getLuminance(color1);
    const l2 = getLuminance(color2);
    const lightest = Math.max(l1, l2);
    const darkest = Math.min(l1, l2);
    return (lightest + 0.05) / (darkest + 0.05);
  };

  const ratio = getContrastRatio(bgColor, textColor);
  const isPassAA = ratio >= 4.5;
  const isPassAAA = ratio >= 7;

  const theory = (
    <div className="space-y-6 text-gray-600">
      <p>
        <strong>Accessibility (a11y)</strong> ensures that digital products are usable by people with a wide range of abilities and disabilities (visual, auditory, motor, cognitive).
      </p>

      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-900 tracking-tight">The POUR Principles</h3>
        <p className="text-gray-500 leading-relaxed">
          The Web Content Accessibility Guidelines (WCAG) are organized under four main principles:
        </p>
      </section>

      <div className="grid gap-4 mt-8">
        <div className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-1">Perceivable</h4>
              <p className="text-sm text-gray-500 leading-relaxed">Information must be presentable to users in ways they can perceive (e.g., alt text for images, sufficient contrast).</p>
            </div>
          </div>
        </div>

        <div className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl shrink-0">
              <Keyboard className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-1">Operable</h4>
              <p className="text-sm text-gray-500 leading-relaxed">User interface components and navigation must be operable (e.g., keyboard accessibility, enough time to read).</p>
            </div>
          </div>
        </div>

        <div className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl shrink-0">
              <Ear className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-1">Understandable</h4>
              <p className="text-sm text-gray-500 leading-relaxed">Information and the operation of user interface must be understandable (e.g., readable text, predictable navigation).</p>
            </div>
          </div>
        </div>

        <div className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-1">Robust</h4>
              <p className="text-sm text-gray-500 leading-relaxed">Content must be robust enough that it can be interpreted reliably by a wide variety of user agents and assistive technologies.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 text-white p-6 rounded-2xl mt-10 shadow-xl shadow-slate-200">
        <h4 className="font-bold text-lg mb-2 flex items-center gap-2 text-indigo-400">
          <MousePointer2 className="w-5 h-5" />
          Color Contrast Standard
        </h4>
        <p className="text-sm text-slate-300 leading-relaxed">
          WCAG requires a contrast ratio of at least <strong className="text-white">4.5:1</strong> for normal text (AA standard) and <strong className="text-white">7:1</strong> for AAA standard. This ensures readability for users with visual impairments.
        </p>
      </div>
    </div>
  );

  const playground = (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="p-4 border-b border-gray-200 bg-white flex gap-2">
        <button
          onClick={() => setActiveTab('contrast')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
            activeTab === 'contrast' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Eye className="w-4 h-4" /> Contrast Checker
        </button>
        <button
          onClick={() => setActiveTab('keyboard')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
            activeTab === 'keyboard' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Keyboard className="w-4 h-4" /> Keyboard Nav
        </button>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        {activeTab === 'contrast' ? (
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-8">
              <div className="flex-1 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Background Color</label>
                  <div className="flex items-center gap-3">
                    <input 
                      type="color" 
                      value={bgColor} 
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-10 h-10 rounded cursor-pointer"
                    />
                    <span className="font-mono text-sm text-gray-500 uppercase">{bgColor}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Text Color</label>
                  <div className="flex items-center gap-3">
                    <input 
                      type="color" 
                      value={textColor} 
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-10 h-10 rounded cursor-pointer"
                    />
                    <span className="font-mono text-sm text-gray-500 uppercase">{textColor}</span>
                  </div>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-center items-center p-6 rounded-xl border border-gray-100" style={{ backgroundColor: bgColor }}>
                <span className="text-2xl font-bold text-center" style={{ color: textColor }}>
                  Sample Text
                </span>
                <span className="text-sm mt-2 text-center" style={{ color: textColor }}>
                  Can you read this easily?
                </span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-4">WCAG Results</h4>
              <div className="flex items-center justify-between mb-6">
                <span className="text-gray-600">Contrast Ratio</span>
                <span className="text-3xl font-bold font-mono text-indigo-600">{ratio.toFixed(2)}:1</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100">
                  <span className="font-medium text-gray-700">AA Standard (4.5:1)</span>
                  {isPassAA ? (
                    <span className="flex items-center gap-1 text-green-600 font-bold"><CheckCircle2 className="w-5 h-5" /> Pass</span>
                  ) : (
                    <span className="flex items-center gap-1 text-red-500 font-bold"><XCircle className="w-5 h-5" /> Fail</span>
                  )}
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100">
                  <span className="font-medium text-gray-700">AAA Standard (7.0:1)</span>
                  {isPassAAA ? (
                    <span className="flex items-center gap-1 text-green-600 font-bold"><CheckCircle2 className="w-5 h-5" /> Pass</span>
                  ) : (
                    <span className="flex items-center gap-1 text-red-500 font-bold"><XCircle className="w-5 h-5" /> Fail</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-indigo-50 text-indigo-800 p-4 rounded-xl text-sm flex items-start gap-3">
              <Keyboard className="w-5 h-5 shrink-0 mt-0.5" />
              <p>
                <strong>Interactive Demo:</strong> Try navigating the form below using <strong>only your keyboard</strong>. Use <kbd className="bg-white px-1.5 py-0.5 rounded border border-indigo-200 shadow-sm">Tab</kbd> to move forward, <kbd className="bg-white px-1.5 py-0.5 rounded border border-indigo-200 shadow-sm">Shift + Tab</kbd> to move backward, and <kbd className="bg-white px-1.5 py-0.5 rounded border border-indigo-200 shadow-sm">Enter</kbd> or <kbd className="bg-white px-1.5 py-0.5 rounded border border-indigo-200 shadow-sm">Space</kbd> to interact.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Support</h3>
              
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow" 
                    placeholder="Jane Doe"
                  />
                </div>
                
                <div>
                  <label htmlFor="issue" className="block text-sm font-medium text-gray-700 mb-1">Issue Type</label>
                  <select 
                    id="issue" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow bg-white"
                  >
                    <option>Login Problem</option>
                    <option>Billing Inquiry</option>
                    <option>Bug Report</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="urgent" 
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor="urgent" className="text-sm text-gray-700">This is an urgent issue</label>
                </div>

                <button 
                  type="button"
                  className="w-full py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/30 transition-all"
                  onClick={() => alert('Form submitted!')}
                >
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <LessonLayout
      title="Accessibility (a11y)"
      description="Design for everyone. Ensure your product is usable by people of all abilities."
      theory={theory}
      playground={playground}
    />
  );
}
