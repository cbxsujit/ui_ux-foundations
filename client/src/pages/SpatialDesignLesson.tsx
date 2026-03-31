import React, { useState } from 'react';
import { LessonLayout } from '../components/LessonLayout';
import { Box, Layers, Maximize, Move3d, Info, Eye, MousePointer2 } from 'lucide-react';

export function SpatialDesignLesson() {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const [is3D, setIs3D] = useState(false);

  const theory = (
    <div className="space-y-6 text-gray-600">
      <p>
        Spatial Design (for AR/VR and spatial computing) moves beyond flat screens, utilizing the <strong>Z-axis (depth)</strong> to create immersive and intuitive experiences.
      </p>

      <div className="space-y-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-500" />
            Depth & Hierarchy
          </h4>
          <p className="text-sm">Use depth to indicate importance. Elements closer to the user demand immediate attention, while background elements provide context.</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
            <Maximize className="w-4 h-4 text-emerald-500" />
            Field of View (FOV)
          </h4>
          <p className="text-sm">Keep primary interactions within the user's natural field of view (approx. 60 degrees) to minimize neck strain.</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Key Principles</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Glassmorphism:</strong> Use translucent materials to blend UI with the physical environment.</li>
          <li><strong>Gaze & Pinch:</strong> Design for eye-tracking (gaze to focus) and hand gestures (pinch to select).</li>
          <li><strong>Spatial Audio:</strong> Use sound to guide attention to elements outside the immediate FOV.</li>
        </ul>
      </div>
    </div>
  );

  const playground = (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Box className="w-5 h-5 text-indigo-500" />
          <h3 className="font-semibold text-gray-900">Spatial UI Lab</h3>
        </div>
        
        <button 
          onClick={() => setIs3D(!is3D)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${is3D ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          <Move3d className="w-4 h-4" />
          {is3D ? '2D View' : '3D View'}
        </button>
      </div>

      <div className="flex-1 p-8 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-300">
        {/* Simulated Environment Background */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay" />

        <div className={`relative w-full max-w-2xl h-96 transition-all duration-1000 ease-in-out ${is3D ? 'perspective-1000' : ''}`}>
          
          {/* Background Layer (Context) */}
          <div 
            className={`absolute inset-0 bg-white/40 backdrop-blur-xl border border-white/50 rounded-3xl p-8 shadow-2xl transition-all duration-700 ease-out ${is3D ? 'transform -translate-z-24 rotate-x-12 rotate-y-[-10deg] opacity-60' : ''} ${activeLayer === 0 ? 'ring-4 ring-indigo-500/50' : ''}`}
            onMouseEnter={() => setActiveLayer(0)}
            onMouseLeave={() => setActiveLayer(null)}
          >
            <div className="flex justify-between items-start mb-8 opacity-50">
              <div className="w-32 h-8 bg-gray-400/30 rounded-lg" />
              <div className="w-12 h-12 bg-gray-400/30 rounded-full" />
            </div>
            <div className="space-y-4 opacity-50">
              <div className="w-full h-24 bg-gray-400/20 rounded-xl" />
              <div className="w-3/4 h-24 bg-gray-400/20 rounded-xl" />
            </div>
          </div>

          {/* Middle Layer (Content) */}
          <div 
            className={`absolute inset-4 bg-white/60 backdrop-blur-md border border-white/60 rounded-2xl p-6 shadow-xl transition-all duration-700 ease-out ${is3D ? 'transform translate-z-12 rotate-x-12 rotate-y-[-10deg]' : ''} ${activeLayer === 1 ? 'ring-4 ring-indigo-500/50 scale-[1.02]' : ''}`}
            onMouseEnter={() => setActiveLayer(1)}
            onMouseLeave={() => setActiveLayer(null)}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Spatial Computing</h2>
            <p className="text-gray-600 mb-6">Notice how elements separate in 3D space. The background provides context, while interactive elements float closer to you.</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="h-32 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center">
                <Eye className="w-8 h-8 text-indigo-500/50" />
              </div>
              <div className="h-32 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center">
                <MousePointer2 className="w-8 h-8 text-emerald-500/50" />
              </div>
            </div>
          </div>

          {/* Foreground Layer (Interaction) */}
          <div 
            className={`absolute bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-4 transition-all duration-700 ease-out cursor-pointer hover:bg-indigo-600 ${is3D ? 'transform translate-z-48 rotate-x-12 rotate-y-[-10deg] scale-110' : ''} ${activeLayer === 2 ? 'ring-4 ring-indigo-500/50 scale-105' : ''}`}
            onMouseEnter={() => setActiveLayer(2)}
            onMouseLeave={() => setActiveLayer(null)}
          >
            <Box className="w-5 h-5" />
            <span className="font-bold tracking-wide">Enter Experience</span>
          </div>

        </div>
      </div>

      <div className="p-4 bg-gray-900 text-white flex items-center gap-3">
        <Info className="w-5 h-5 text-indigo-400 shrink-0" />
        <p className="text-xs text-gray-400">
          <strong>UX Insight:</strong> In spatial design, use "glassmorphism" (translucent, blurred backgrounds) so users remain aware of their physical surroundings. Depth (Z-axis) replaces traditional 2D drop shadows to indicate hierarchy.
        </p>
      </div>
    </div>
  );

  return (
    <LessonLayout
      title="Spatial Design (AR/VR)"
      description="Designing 3D interfaces for spatial computing and mixed reality."
      theory={theory}
      playground={playground}
    />
  );
}
