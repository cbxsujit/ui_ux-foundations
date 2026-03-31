import React, { useState } from 'react';
import { LessonLayout } from '../components/LessonLayout';
import { motion } from 'framer-motion';
import { CreditCard, Wifi, Zap, Droplet } from 'lucide-react';

type StyleType = 'flat' | 'neumorphism' | 'glassmorphism' | 'claymorphism' | 'skeuomorphism';

export function DesignStylesLesson() {
  const [activeStyle, setActiveStyle] = useState<StyleType>('glassmorphism');

  const theory = (
    <div className="space-y-6 text-gray-600">
      <p>
        UI design trends evolve constantly. Understanding different <strong>design styles</strong> helps you choose the right visual language for your product's brand and audience.
      </p>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Neumorphism (Soft UI)</h3>
        <p className="mb-2">
          A minimalist style that uses subtle shadows and highlights to make elements look like they are extruded from or pressed into the background.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Characteristics:</strong> Low contrast, monochromatic, soft inner and outer shadows.</li>
          <li><strong>Pros:</strong> Very clean, futuristic, and soft.</li>
          <li><strong>Cons:</strong> Can have severe accessibility and contrast issues.</li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Glassmorphism</h3>
        <p className="mb-2">
          Emphasizes translucency and background blur to create a "frosted glass" effect, often placed over colorful, vibrant backgrounds.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Characteristics:</strong> Background blur, semi-transparent white fills, light borders, vivid backgrounds.</li>
          <li><strong>Pros:</strong> Creates depth, highly modern, visually striking.</li>
          <li><strong>Cons:</strong> Can be visually noisy if overused.</li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Claymorphism</h3>
        <p className="mb-2">
          A playful, 3D-like style that makes UI elements look like they are made of fluffy, matte clay.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Characteristics:</strong> Large border radii, double inner shadows (light top, dark bottom), soft drop shadows.</li>
          <li><strong>Pros:</strong> Friendly, tactile, and highly engaging.</li>
          <li><strong>Cons:</strong> May not fit serious or enterprise applications.</li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">4. Skeuomorphism</h3>
        <p className="mb-2">
          Designing digital elements to mimic their real-world counterparts in texture, lighting, and shape (e.g., a digital compass that looks like real metal and glass).
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Characteristics:</strong> Realistic textures (leather, metal), strong gradients, harsh shadows, bevels.</li>
          <li><strong>Pros:</strong> Highly intuitive for new users (affordance is obvious).</li>
          <li><strong>Cons:</strong> Can feel dated or visually heavy compared to modern flat design.</li>
        </ul>
      </div>
    </div>
  );

  // Styles mapping
  const stylesConfig = {
    flat: {
      bg: 'bg-gray-50',
      card: 'bg-white border border-gray-200 shadow-sm rounded-2xl',
      text: 'text-gray-900',
      subtext: 'text-gray-500',
      iconBg: 'bg-indigo-100 text-indigo-600',
    },
    neumorphism: {
      bg: 'bg-[#e0e5ec]',
      card: 'bg-[#e0e5ec] rounded-3xl shadow-[9px_9px_16px_rgb(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)]',
      text: 'text-gray-700',
      subtext: 'text-gray-500',
      iconBg: 'bg-[#e0e5ec] text-indigo-500 shadow-[inset_4px_4px_8px_rgb(163,177,198,0.6),inset_-4px_-4px_8px_rgba(255,255,255,0.5)]',
    },
    glassmorphism: {
      bg: 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500',
      card: 'bg-white/20 backdrop-blur-lg border border-white/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-3xl',
      text: 'text-white',
      subtext: 'text-white/80',
      iconBg: 'bg-white/20 text-white border border-white/30',
    },
    claymorphism: {
      bg: 'bg-[#f0f4f8]',
      card: 'bg-[#f0f4f8] rounded-[2rem] shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff,inset_0px_6px_10px_rgba(255,255,255,0.8),inset_0px_-6px_10px_rgba(0,0,0,0.05)] border-4 border-white/50',
      text: 'text-slate-700',
      subtext: 'text-slate-500',
      iconBg: 'bg-[#f0f4f8] text-blue-500 shadow-[inset_0px_4px_6px_rgba(255,255,255,0.8),inset_0px_-4px_6px_rgba(0,0,0,0.05)]',
    },
    skeuomorphism: {
      bg: 'bg-[#2c2c2c] bg-[url("https://www.transparenttextures.com/patterns/dark-leather.png")]',
      card: 'bg-gradient-to-b from-[#e6e6e6] to-[#cccccc] border border-[#999] rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.5),inset_0_2px_1px_rgba(255,255,255,0.8),inset_0_-2px_1px_rgba(0,0,0,0.2)]',
      text: 'text-gray-800 drop-shadow-[0_1px_0_rgba(255,255,255,0.8)]',
      subtext: 'text-gray-600',
      iconBg: 'bg-gradient-to-b from-gray-100 to-gray-300 text-gray-700 border border-gray-400 shadow-[0_2px_4px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.9)]',
    }
  };

  const currentStyle = stylesConfig[activeStyle];

  const playground = (
    <div className="flex flex-col h-full">
      {/* Controls */}
      <div className="p-4 border-b border-gray-100 bg-white overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {(Object.keys(stylesConfig) as StyleType[]).map((style) => (
            <button
              key={style}
              onClick={() => setActiveStyle(style)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                activeStyle === style
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      {/* Canvas */}
      <div className={`flex-1 p-8 flex items-center justify-center transition-all duration-500 ${currentStyle.bg}`}>
        {/* The Component */}
        <motion.div 
          layout
          className={`w-full max-w-sm p-8 transition-all duration-500 ${currentStyle.card}`}
        >
          <div className="flex items-center justify-between mb-8">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${currentStyle.iconBg}`}>
              <CreditCard className="w-6 h-6" />
            </div>
            <Wifi className={`w-6 h-6 transition-colors duration-500 ${currentStyle.text}`} />
          </div>

          <div className="space-y-1 mb-8">
            <h2 className={`text-3xl font-bold tracking-tight transition-colors duration-500 ${currentStyle.text}`}>
              $12,450.00
            </h2>
            <p className={`text-sm font-medium transition-colors duration-500 ${currentStyle.subtext}`}>
              Available Balance
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className={`py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-500 hover:scale-105 active:scale-95 ${currentStyle.iconBg}`}>
              <Zap className="w-4 h-4" /> Send
            </button>
            <button className={`py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-500 hover:scale-105 active:scale-95 ${currentStyle.iconBg}`}>
              <Droplet className="w-4 h-4" /> Request
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );

  return (
    <LessonLayout
      title="Modern UI Styles"
      description="Explore Neumorphism, Glassmorphism, Claymorphism, and Skeuomorphism."
      theory={theory}
      playground={playground}
    />
  );
}
