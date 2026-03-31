import React, { useState } from 'react';
import { LessonLayout } from '../components/LessonLayout';
import { motion } from 'motion/react';
import { Layout, Maximize, Minimize, Box } from 'lucide-react';

export function SpacingLesson() {
  const [padding, setPadding] = useState(16);
  const [gap, setGap] = useState(8);
  const [borderRadius, setBorderRadius] = useState(8);

  const theory = (
    <div className="space-y-6 text-gray-600">
      <p>
        Spacing (or whitespace) is the empty space between and around elements. It's not "wasted space"—it's the glue that holds a design together.
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">The Law of Proximity</h3>
      <p>
        Things that are close together are perceived as related. Things that are far apart are perceived as separate. This is the fundamental rule of layout.
      </p>

      <ul className="space-y-4">
        <li className="flex items-start gap-3">
          <div className="p-2 bg-green-100 text-green-600 rounded-lg shrink-0"><Box className="w-5 h-5" /></div>
          <div>
            <strong className="block text-gray-900">Padding (Inside)</strong>
            <span className="text-sm">The space inside an element, between its content and its border. It gives content room to breathe.</span>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <div className="p-2 bg-green-100 text-green-600 rounded-lg shrink-0"><Maximize className="w-5 h-5" /></div>
          <div>
            <strong className="block text-gray-900">Margin/Gap/Gutter (Outside)</strong>
            <span className="text-sm">The space outside an element, pushing other elements away. A <strong>Gutter</strong> specifically refers to the space between columns or rows in a grid layout.</span>
          </div>
        </li>
      </ul>

      <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg mt-6">
        <h4 className="text-indigo-900 font-semibold mb-2">The 8pt Grid System</h4>
        <p className="text-sm text-indigo-800">
          Professional designers often use multiples of 8 (8, 16, 24, 32, 48, 64) for all spacing and sizing. It creates a consistent, mathematical rhythm that feels "right" to the eye.
        </p>
      </div>
    </div>
  );

  const playground = (
    <div className="flex-1 flex flex-col h-full">
      {/* Controls */}
      <div className="p-6 border-b border-gray-200 bg-gray-50 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700 flex justify-between">
            <span>Padding (Inside)</span>
            <span className="text-indigo-600 font-mono">{padding}px</span>
          </label>
          <input 
            type="range" 
            min="0" max="64" step="4"
            value={padding} 
            onChange={(e) => setPadding(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700 flex justify-between">
            <span>Gap / Gutter</span>
            <span className="text-indigo-600 font-mono">{gap}px</span>
          </label>
          <input 
            type="range" 
            min="0" max="48" step="4"
            value={gap} 
            onChange={(e) => setGap(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700 flex justify-between">
            <span>Border Radius</span>
            <span className="text-indigo-600 font-mono">{borderRadius}px</span>
          </label>
          <input 
            type="range" 
            min="0" max="32" step="4"
            value={borderRadius} 
            onChange={(e) => setBorderRadius(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
          />
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 p-10 overflow-y-auto bg-gray-100 flex items-center justify-center">
        <div 
          className="bg-white shadow-xl transition-all duration-300 w-full max-w-md"
          style={{ 
            padding: `${padding}px`,
            borderRadius: `${borderRadius}px`,
            display: 'flex',
            flexDirection: 'column',
            gap: `${gap}px`
          }}
        >
          {/* Header Area */}
          <div className="flex items-center gap-4">
            <div 
              className="w-12 h-12 bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0"
              style={{ borderRadius: `${borderRadius / 2}px` }}
            >
              <Layout className="w-6 h-6" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: `${gap / 2}px` }}>
              <h3 className="text-lg font-bold text-gray-900 leading-none">Design System</h3>
              <p className="text-sm text-gray-500 leading-none">Updated 2 hours ago</p>
            </div>
          </div>

          {/* Content Area */}
          <div 
            className="bg-gray-50 border border-gray-100"
            style={{ 
              padding: `${padding * 0.75}px`,
              borderRadius: `${borderRadius * 0.75}px`,
              display: 'flex',
              flexDirection: 'column',
              gap: `${gap}px`
            }}
          >
            <p className="text-gray-700 text-sm">
              Notice how the spacing affects the relationship between elements. When padding is 0, the content touches the edges and feels cramped. When the gap is 0, the elements blend together.
            </p>
            
            {/* Action Area */}
            <div 
              style={{ 
                display: 'flex', 
                gap: `${gap}px`,
                marginTop: `${gap}px`
              }}
            >
              <button 
                className="flex-1 bg-white border border-gray-300 text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors"
                style={{ 
                  padding: `${padding * 0.5}px`,
                  borderRadius: `${borderRadius * 0.5}px`
                }}
              >
                Cancel
              </button>
              <button 
                className="flex-1 bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-700 transition-colors"
                style={{ 
                  padding: `${padding * 0.5}px`,
                  borderRadius: `${borderRadius * 0.5}px`
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <LessonLayout
      title="Spacing & Layout"
      description="Learn how whitespace groups related items and creates a clean, organized interface."
      theory={theory}
      playground={playground}
    />
  );
}
