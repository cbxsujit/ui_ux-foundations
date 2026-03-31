import React, { useState } from 'react';
import { LessonLayout } from '../components/LessonLayout';
import { Palette, Type, Layout, Component, Search, Bell, User } from 'lucide-react';

export function SystemsLesson() {
  const [primaryColor, setPrimaryColor] = useState('#4f46e5'); // Indigo 600
  const [borderRadius, setBorderRadius] = useState('0.5rem'); // rounded-lg
  const [fontFamily, setFontFamily] = useState('Inter, sans-serif');

  const theory = (
    <div className="space-y-6 text-gray-600">
      <p>
        A <strong>Design System</strong> is a complete set of standards intended to manage design at scale using reusable components and patterns.
      </p>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Core Elements</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Design Tokens:</strong> The smallest indivisible pieces (colors, typography, spacing, radii) represented as variables.</li>
          <li><strong>Components:</strong> Reusable UI elements built from tokens (buttons, inputs, cards).</li>
          <li><strong>Patterns:</strong> Combinations of components that solve specific user problems (navigation bars, forms).</li>
          <li><strong>Guidelines:</strong> Rules on how and when to use the above.</li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Why use them?</h3>
        <p>
          They ensure visual consistency across a product, drastically speed up development and design time, and create a single source of truth for cross-functional teams.
        </p>
      </div>
    </div>
  );

  const playground = (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="p-4 border-b border-gray-200 bg-white flex items-center gap-2">
        <Component className="w-5 h-5 text-indigo-600" />
        <h3 className="font-semibold text-gray-900">Design System Builder</h3>
      </div>

      <div className="flex-1 p-6 flex flex-col lg:flex-row gap-8 overflow-y-auto" style={{ fontFamily }}>
        
        {/* Tokens Panel */}
        <div className="w-full lg:w-1/3 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6 h-fit">
          <div>
            <h4 className="flex items-center gap-2 font-bold text-gray-900 mb-4 border-b pb-2">
              <Palette className="w-4 h-4" /> Design Tokens
            </h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
                <div className="flex gap-2">
                  {['#4f46e5', '#16a34a', '#ea580c', '#db2777', '#000000'].map(color => (
                    <button
                      key={color}
                      onClick={() => setPrimaryColor(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-transform ${primaryColor === color ? 'scale-110 border-gray-400' : 'border-transparent hover:scale-105'}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Border Radius</label>
                <select 
                  value={borderRadius}
                  onChange={(e) => setBorderRadius(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="0px">Sharp (0px)</option>
                  <option value="0.25rem">Small (4px)</option>
                  <option value="0.5rem">Medium (8px)</option>
                  <option value="1rem">Large (16px)</option>
                  <option value="9999px">Pill (Full)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Typography</label>
                <select 
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="Inter, sans-serif">Inter (Sans)</option>
                  <option value="Georgia, serif">Georgia (Serif)</option>
                  <option value="'Courier New', monospace">Courier (Mono)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Components Preview */}
        <div className="flex-1 space-y-6">
          <h4 className="flex items-center gap-2 font-bold text-gray-900 mb-2">
            <Layout className="w-4 h-4" /> Component Library Preview
          </h4>
          
          {/* Buttons */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h5 className="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wider">Buttons</h5>
            <div className="flex flex-wrap gap-4">
              <button 
                className="px-6 py-2.5 text-white font-medium transition-opacity hover:opacity-90"
                style={{ backgroundColor: primaryColor, borderRadius }}
              >
                Primary Button
              </button>
              <button 
                className="px-6 py-2.5 bg-white font-medium border-2 transition-colors hover:bg-gray-50"
                style={{ borderColor: primaryColor, color: primaryColor, borderRadius }}
              >
                Secondary Button
              </button>
              <button 
                className="px-6 py-2.5 bg-transparent font-medium hover:bg-gray-50"
                style={{ color: primaryColor, borderRadius }}
              >
                Ghost Button
              </button>
            </div>
          </div>

          {/* Inputs */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h5 className="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wider">Form Elements</h5>
            <div className="max-w-md space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 border border-gray-300 outline-none transition-shadow"
                  style={{ borderRadius, focusRing: `2px solid ${primaryColor}` }}
                  onFocus={(e) => { e.target.style.boxShadow = `0 0 0 2px ${primaryColor}40`; e.target.style.borderColor = primaryColor; }}
                  onBlur={(e) => { e.target.style.boxShadow = 'none'; e.target.style.borderColor = '#d1d5db'; }}
                />
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 border-gray-300"
                  style={{ accentColor: primaryColor, borderRadius: borderRadius === '9999px' ? '4px' : borderRadius }}
                  defaultChecked
                />
                <label className="text-sm text-gray-700">Subscribe to newsletter</label>
              </div>
            </div>
          </div>

          {/* Complex Pattern (Card) */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h5 className="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wider">Pattern: User Card</h5>
            <div className="border border-gray-200 p-4 max-w-sm" style={{ borderRadius }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gray-100 flex items-center justify-center" style={{ borderRadius }}>
                  <User className="w-6 h-6 text-gray-500" />
                </div>
                <div>
                  <h6 className="font-bold text-gray-900">Jane Doe</h6>
                  <p className="text-sm text-gray-500">Product Designer</p>
                </div>
              </div>
              <button 
                className="w-full py-2 text-white font-medium transition-opacity hover:opacity-90"
                style={{ backgroundColor: primaryColor, borderRadius }}
              >
                View Profile
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );

  return (
    <LessonLayout
      title="Design Systems"
      description="Build consistent, scalable interfaces using tokens and components."
      theory={theory}
      playground={playground}
    />
  );
}
