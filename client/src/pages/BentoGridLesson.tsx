import React, { useState } from 'react';
import { LessonLayout } from '../components/LessonLayout';
import { LayoutGrid, Info, Grid, Maximize, Smartphone, Monitor } from 'lucide-react';
import { DevicePreview } from '../components/DevicePreview';

export function BentoGridLesson() {
  const [gap, setGap] = useState(4);
  const [rounded, setRounded] = useState(24);

  const items = [
    { id: 1, title: 'Main Feature', subtitle: 'The core of our product', color: 'bg-indigo-500', span: 'col-span-2 row-span-2', icon: <Maximize className="w-8 h-8" /> },
    { id: 2, title: 'Analytics', subtitle: 'Real-time data', color: 'bg-purple-500', span: 'col-span-1 row-span-1', icon: <Grid className="w-6 h-6" /> },
    { id: 3, title: 'Security', subtitle: 'Always safe', color: 'bg-pink-500', span: 'col-span-1 row-span-1', icon: <Info className="w-6 h-6" /> },
    { id: 4, title: 'Mobile App', subtitle: 'On the go', color: 'bg-amber-500', span: 'col-span-2 row-span-1', icon: <Smartphone className="w-6 h-6" /> },
  ];

  const theory = (
    <div className="space-y-6 text-gray-600">
      <p>
        <strong>Bento Grids</strong> are a modern layout trend inspired by Japanese bento boxes. They use irregular grid spans to create a visually interesting and hierarchical way to display features or content.
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Why use Bento Grids?</h3>
      <ul className="space-y-4">
        <li className="flex items-start gap-3">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg shrink-0"><LayoutGrid className="w-5 h-5" /></div>
          <div>
            <strong className="block text-gray-900">Visual Hierarchy</strong>
            <span className="text-sm">By making some items larger (spanning multiple columns or rows), you naturally guide the user's eye to the most important features.</span>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg shrink-0"><Maximize className="w-5 h-5" /></div>
          <div>
            <strong className="block text-gray-900">Information Density</strong>
            <span className="text-sm">Bento grids allow you to pack a lot of information into a compact space while maintaining a clean, organized look.</span>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg shrink-0"><Monitor className="w-5 h-5" /></div>
          <div>
            <strong className="block text-gray-900">Responsive Versatility</strong>
            <span className="text-sm">On mobile, bento grids easily collapse into a single column, making them highly adaptable across different screen sizes.</span>
          </div>
        </li>
      </ul>

      <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg mt-6">
        <h4 className="text-indigo-900 font-semibold mb-2">Design Tip: Consistency</h4>
        <p className="text-sm text-indigo-800">
          Maintain consistent gaps and border radii across all bento items to ensure the layout feels like a single, cohesive unit.
        </p>
      </div>
    </div>
  );

  const playground = (
    <div className="flex-1 flex flex-col h-full bg-gray-50">
      <div className="p-6 border-b border-gray-200 bg-white flex flex-wrap gap-8">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Grid Gap: {gap}px</label>
          <input type="range" min="0" max="24" step="4" value={gap} onChange={(e) => setGap(parseInt(e.target.value))} className="w-32 accent-indigo-600" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Corner Radius: {rounded}px</label>
          <input type="range" min="0" max="48" step="8" value={rounded} onChange={(e) => setRounded(parseInt(e.target.value))} className="w-32 accent-indigo-600" />
        </div>
      </div>

      <DevicePreview>
        {(isMobile) => (
          <div className={`flex-1 flex flex-col items-center justify-center ${isMobile ? 'p-4 bg-white' : 'p-10 bg-gray-50'}`}>
            <div 
              className={`w-full max-w-2xl grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3 grid-rows-3'} transition-all`}
              style={{ gap: `${gap}px` }}
            >
              {items.map((item) => (
                <div 
                  key={item.id} 
                  className={`${isMobile ? 'col-span-1 row-span-1' : item.span} ${item.color} p-6 text-white flex flex-col justify-between shadow-lg shadow-indigo-200/20 hover:scale-[1.02] transition-all cursor-pointer group`}
                  style={{ borderRadius: `${rounded}px` }}
                >
                  <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-black mb-1">{item.title}</h3>
                    <p className="text-sm font-medium text-white/80">{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 p-4 bg-indigo-50 rounded-xl border border-indigo-100 max-w-md flex gap-3">
              <Info className="w-5 h-5 text-indigo-500 shrink-0" />
              <p className="text-xs text-indigo-700 leading-relaxed">
                <strong>UX Insight:</strong> Bento grids are most effective when you have a <strong>primary feature</strong> to highlight. Use the largest span for your most important content.
              </p>
            </div>
          </div>
        )}
      </DevicePreview>
    </div>
  );

  return <LessonLayout title="Bento Grids" description="Create hierarchical, modern layouts using irregular grid spans." theory={theory} playground={playground} />;
}
