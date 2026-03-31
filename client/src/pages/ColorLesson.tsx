import React, { useState } from 'react';
import { LessonLayout } from '../components/LessonLayout';
import { motion } from 'motion/react';
import { AlertTriangle, CheckCircle2, Info } from 'lucide-react';

// Helper to calculate relative luminance
function getLuminance(hex: string) {
  const rgb = parseInt(hex.slice(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;

  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

// Helper to calculate contrast ratio
function getContrastRatio(hex1: string, hex2: string) {
  const lum1 = getLuminance(hex1);
  const lum2 = getLuminance(hex2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

export function ColorLesson() {
  const [bgColor, setBgColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#000000');

  const contrast = getContrastRatio(bgColor, textColor);
  const isPass = contrast >= 4.5;
  const isLargePass = contrast >= 3.0;

  const theory = (
    <div className="space-y-6 text-gray-600">
      <p>
        Color is more than just decoration. It communicates meaning, establishes brand identity, and most importantly, ensures your content is readable.
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Contrast is King</h3>
      <p>
        The most common mistake beginners make is using low-contrast colors (like light gray text on a white background). This makes reading difficult, especially for users with visual impairments or those viewing screens in bright sunlight.
      </p>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
        <h4 className="text-blue-900 font-semibold mb-2 flex items-center gap-2">
          <Info className="w-4 h-4" /> The WCAG Standard
        </h4>
        <p className="text-sm text-blue-800">
          The Web Content Accessibility Guidelines (WCAG) recommend a minimum contrast ratio of <strong>4.5:1</strong> for normal text and <strong>3.0:1</strong> for large text (like headings).
        </p>
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Color Psychology</h3>
      <ul className="space-y-3">
        <li className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-red-500" />
          <span><strong>Red:</strong> Urgency, error, danger, passion.</span>
        </li>
        <li className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-green-500" />
          <span><strong>Green:</strong> Success, growth, safe to proceed.</span>
        </li>
        <li className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-blue-500" />
          <span><strong>Blue:</strong> Trust, calm, corporate, links.</span>
        </li>
      </ul>
    </div>
  );

  const playground = (
    <div className="flex-1 flex flex-col">
      {/* Controls */}
      <div className="p-6 border-b border-gray-200 bg-gray-50 flex flex-wrap gap-6 items-center justify-between">
        <div className="flex gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Background Color</label>
            <div className="flex items-center gap-3">
              <input 
                type="color" 
                value={bgColor} 
                onChange={(e) => setBgColor(e.target.value)}
                className="w-10 h-10 rounded cursor-pointer border-0 p-0"
              />
              <span className="font-mono text-sm text-gray-500 uppercase">{bgColor}</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Text Color</label>
            <div className="flex items-center gap-3">
              <input 
                type="color" 
                value={textColor} 
                onChange={(e) => setTextColor(e.target.value)}
                className="w-10 h-10 rounded cursor-pointer border-0 p-0"
              />
              <span className="font-mono text-sm text-gray-500 uppercase">{textColor}</span>
            </div>
          </div>
        </div>

        {/* Contrast Score */}
        <div className="flex flex-col items-end">
          <div className="text-sm font-medium text-gray-500 mb-1">Contrast Ratio</div>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold font-mono text-gray-900">{contrast.toFixed(2)}</span>
            {isPass ? (
              <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Pass (AA)
              </div>
            ) : isLargePass ? (
              <div className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" /> Large Text Only
              </div>
            ) : (
              <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" /> Fail
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div 
        className="flex-1 p-10 flex items-center justify-center transition-colors duration-300"
        style={{ backgroundColor: bgColor }}
      >
        <div 
          className="max-w-md w-full p-8 rounded-2xl shadow-2xl transition-colors duration-300"
          style={{ backgroundColor: bgColor, color: textColor, border: `1px solid ${textColor}20` }}
        >
          <h2 className="text-3xl font-bold mb-4" style={{ color: textColor }}>
            Hello, World!
          </h2>
          <p className="text-lg leading-relaxed opacity-90 mb-6">
            This is a preview of how your selected colors look together. Adjust the colors above to see the contrast ratio change in real-time.
          </p>
          <button 
            className="px-6 py-3 rounded-lg font-semibold transition-transform hover:scale-105"
            style={{ backgroundColor: textColor, color: bgColor }}
          >
            Call to Action
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <LessonLayout
      title="Color & Contrast"
      description="Learn how to choose accessible colors that guide users and convey meaning."
      theory={theory}
      playground={playground}
    />
  );
}
