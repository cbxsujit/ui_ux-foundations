import React, { useState, useEffect } from 'react';
import { LessonLayout } from '../components/LessonLayout';
import { ChevronLeft, ChevronRight, Info, MousePointer2, Smartphone, Monitor } from 'lucide-react';
import { DevicePreview } from '../components/DevicePreview';

export function CarouselLesson() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const [showIndicators, setShowIndicators] = useState(true);

  const slides = [
    { id: 1, title: 'Summer Collection', subtitle: 'Up to 50% off', color: 'bg-indigo-600', image: 'https://picsum.photos/seed/summer/800/400' },
    { id: 2, title: 'New Arrivals', subtitle: 'Explore the latest trends', color: 'bg-purple-600', image: 'https://picsum.photos/seed/new/800/400' },
    { id: 3, title: 'Limited Edition', subtitle: 'Exclusive designs only', color: 'bg-pink-600', image: 'https://picsum.photos/seed/limited/800/400' },
  ];

  useEffect(() => {
    if (autoPlay) {
      const timer = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % slides.length);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [autoPlay, slides.length]);

  const theory = (
    <div className="space-y-6 text-gray-600">
      <p>
        <strong>Carousels</strong> (or Sliders) are used to display multiple pieces of content in a single space. They are popular for hero sections but can be controversial if not implemented correctly.
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Best Practices</h3>
      <ul className="space-y-4">
        <li className="flex items-start gap-3">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg shrink-0"><MousePointer2 className="w-5 h-5" /></div>
          <div>
            <strong className="block text-gray-900">User Control</strong>
            <span className="text-sm">Always provide clear navigation (arrows or dots). If using auto-play, pause it when the user hovers or interacts with the slide.</span>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg shrink-0"><ChevronRight className="w-5 h-5" /></div>
          <div>
            <strong className="block text-gray-900">Indicators</strong>
            <span className="text-sm">Show users how many slides there are and which one is currently active. This reduces the "mystery" of what's coming next.</span>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg shrink-0"><Smartphone className="w-5 h-5" /></div>
          <div>
            <strong className="block text-gray-900">Mobile Swiping</strong>
            <span className="text-sm">On mobile devices, ensure the carousel supports touch gestures (swiping left and right).</span>
          </div>
        </li>
      </ul>

      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mt-6">
        <h4 className="text-amber-900 font-semibold mb-2">UX Warning: Banner Blindness</h4>
        <p className="text-sm text-amber-800">
          Many users ignore carousels because they look like advertisements. Keep your content relevant and ensure the first slide is the most important.
        </p>
      </div>
    </div>
  );

  const playground = (
    <div className="flex-1 flex flex-col h-full bg-gray-50">
      <div className="p-6 border-b border-gray-200 bg-white flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
          <input type="checkbox" checked={autoPlay} onChange={(e) => setAutoPlay(e.target.checked)} className="rounded text-indigo-600" />
          Auto-play
        </label>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
          <input type="checkbox" checked={showIndicators} onChange={(e) => setShowIndicators(e.target.checked)} className="rounded text-indigo-600" />
          Show Indicators
        </label>
      </div>

      <DevicePreview>
        {(isMobile) => (
          <div className={`flex-1 flex flex-col items-center justify-center ${isMobile ? 'p-4 bg-white' : 'p-10 bg-gray-50'}`}>
            <div className={`w-full max-w-2xl bg-white overflow-hidden relative group ${isMobile ? '' : 'rounded-3xl shadow-2xl border border-gray-200'}`}>
              
              {/* Slides Container */}
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {slides.map((slide) => (
                  <div key={slide.id} className="w-full shrink-0 relative aspect-[2/1] overflow-hidden">
                    <img 
                      src={slide.image} 
                      alt={slide.title} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8 text-white">
                      <h3 className="text-3xl font-black mb-1">{slide.title}</h3>
                      <p className="text-lg font-medium text-white/80">{slide.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button 
                onClick={() => setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length)}
                className={`absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={() => setActiveIndex((prev) => (prev + 1) % slides.length)}
                className={`absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Indicators */}
              {showIndicators && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={`h-1.5 rounded-full transition-all ${activeIndex === i ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'}`}
                    />
                  ))}
                </div>
              )}
            </div>
            
            <div className="mt-10 p-4 bg-indigo-50 rounded-xl border border-indigo-100 max-w-md flex gap-3">
              <Info className="w-5 h-5 text-indigo-500 shrink-0" />
              <p className="text-xs text-indigo-700 leading-relaxed">
                <strong>UX Insight:</strong> Carousels are best for <strong>visual discovery</strong>. Avoid putting critical information or primary calls-to-action solely in a carousel, as many users won't see past the first slide.
              </p>
            </div>
          </div>
        )}
      </DevicePreview>
    </div>
  );

  return <LessonLayout title="Carousels" description="Display multiple pieces of content in a single space." theory={theory} playground={playground} />;
}
