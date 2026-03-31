import React, { useState } from 'react';
import { LessonLayout } from '../components/LessonLayout';
import { motion } from 'motion/react';
import { Type, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

export function TypographyLesson() {
  const [fontFamily, setFontFamily] = useState('Inter');
  const [fontSize, setFontSize] = useState(16);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [alignment, setAlignment] = useState<'left' | 'center' | 'right'>('left');

  const theory = (
    <div className="space-y-6 text-gray-600">
      <p>
        Typography is the art of arranging text to make written language legible, readable, and appealing. Good typography is invisible; bad typography screams at you.
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">The Golden Rules</h3>
      <ul className="space-y-4">
        <li className="flex items-start gap-3">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg shrink-0"><Type className="w-5 h-5" /></div>
          <div>
            <strong className="block text-gray-900">Font Families</strong>
            <span className="text-sm">Use modern Sans-Serifs (like <strong>Inter</strong> or <strong>Outfit</strong>) for clean digital interfaces. Use Serifs (like <strong>Playfair Display</strong>) for editorial elegance. Use Monospace (like <strong>JetBrains Mono</strong>) for technical data or code. Display fonts (like <strong>Space Grotesk</strong>) are great for bold, tech-forward headings.</span>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg shrink-0"><span className="font-bold text-lg leading-none">A</span></div>
          <div>
            <strong className="block text-gray-900">Hierarchy</strong>
            <span className="text-sm">Use size, weight (boldness), and color to show what's most important. Headings should be noticeably larger than body text.</span>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg shrink-0"><AlignLeft className="w-5 h-5" /></div>
          <div>
            <strong className="block text-gray-900">Line Height & Length</strong>
            <span className="text-sm">Lines that are too long are hard to track. Lines that are too tight feel cramped. A line height of 1.4 to 1.6 is ideal for body text.</span>
          </div>
        </li>
      </ul>

      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mt-6">
        <h4 className="text-amber-900 font-semibold mb-2">Pro Tip</h4>
        <p className="text-sm text-amber-800">
          Don't use more than two font families in a single design. Usually, one is enough if you use different weights (bold, regular, light).
        </p>
      </div>
    </div>
  );

  const playground = (
    <div className="flex-1 flex flex-col h-full">
      {/* Controls */}
      <div className="p-6 border-b border-gray-200 bg-gray-50 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Font Family</label>
          <select 
            value={fontFamily} 
            onChange={(e) => setFontFamily(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Inter">Inter (Modern Sans)</option>
            <option value="Outfit">Outfit (Geometric Sans)</option>
            <option value="Playfair Display">Playfair Display (Serif)</option>
            <option value="Space Grotesk">Space Grotesk (Display)</option>
            <option value="JetBrains Mono">JetBrains Mono (Mono)</option>
            <option value="Comic Sans MS">Comic Sans (Don't)</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Base Size ({fontSize}px)</label>
          <input 
            type="range" 
            min="12" max="24" 
            value={fontSize} 
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Line Height ({lineHeight})</label>
          <input 
            type="range" 
            min="1" max="2.5" step="0.1"
            value={lineHeight} 
            onChange={(e) => setLineHeight(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Alignment</label>
          <div className="flex bg-white border border-gray-300 rounded-lg overflow-hidden">
            <button 
              onClick={() => setAlignment('left')}
              className={`flex-1 p-2 flex justify-center ${alignment === 'left' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <AlignLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setAlignment('center')}
              className={`flex-1 p-2 flex justify-center border-x border-gray-300 ${alignment === 'center' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <AlignCenter className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setAlignment('right')}
              className={`flex-1 p-2 flex justify-center ${alignment === 'right' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <AlignRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 p-10 overflow-y-auto bg-white flex justify-center">
        <div 
          className="max-w-2xl w-full transition-all duration-300"
          style={{ 
            fontFamily, 
            fontSize: `${fontSize}px`, 
            lineHeight,
            textAlign: alignment 
          }}
        >
          <h1 className="font-bold text-gray-900 mb-4" style={{ fontSize: '2.5em', lineHeight: 1.2 }}>
            The Art of Readable Text
          </h1>
          <h2 className="font-medium text-gray-600 mb-6" style={{ fontSize: '1.5em', lineHeight: 1.3 }}>
            Why typography matters more than you think.
          </h2>
          
          <p className="text-gray-800 mb-6">
            Typography is the visual component of the written word. A text is a sequence of words. A text stays the same no matter how it's rendered. Consider the sentence "I like apples." The meaning is the same whether it's printed in a book, displayed on a screen, or carved into stone.
          </p>
          
          <p className="text-gray-800 mb-6">
            However, typography is not just about making text legible. It's about establishing a visual hierarchy, guiding the reader's eye, and setting the tone or mood of the content. Good typography makes reading effortless. Bad typography makes it a chore.
          </p>

          <blockquote className="border-l-4 border-indigo-500 pl-6 py-2 my-8 text-gray-600 italic" style={{ fontSize: '1.2em' }}>
            "Typography is what language looks like."
          </blockquote>

          <p className="text-gray-800">
            Experiment with the controls above. Notice how increasing the line height makes the text breathe, but too much makes the lines feel disconnected. See how different fonts completely change the personality of this article.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <LessonLayout
      title="Typography"
      description="Master the art of arranging text to make it legible, readable, and appealing."
      theory={theory}
      playground={playground}
    />
  );
}
