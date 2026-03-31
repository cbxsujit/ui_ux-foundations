import React, { useState, useEffect } from 'react';
import { LessonLayout } from '../components/LessonLayout';
import { Zap, Timer, Eye, Info, Layout, Image as ImageIcon, FileText, User } from 'lucide-react';

export function PerformanceUXLesson() {
  const [loadingState, setLoadingState] = useState<'none' | 'spinner' | 'skeleton'>('none');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (loadingState !== 'none') {
      setIsLoaded(false);
      const timer = setTimeout(() => setIsLoaded(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [loadingState]);

  const theory = (
    <div className="space-y-6 text-gray-600">
      <p>
        Performance UX isn't just about how fast your app <em>is</em>, but how fast it <strong>feels</strong>. This is known as Perceived Performance.
      </p>

      <div className="space-y-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
            <Layout className="w-4 h-4 text-indigo-500" />
            Skeleton Screens
          </h4>
          <p className="text-sm">Use placeholders that mimic the layout of the content to reduce the feeling of waiting.</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
            <Zap className="w-4 h-4 text-pink-500" />
            Optimistic UI
          </h4>
          <p className="text-sm">Update the UI immediately before the server confirms the action (e.g., "liking" a post).</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Key Strategies</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Progressive Loading:</strong> Load critical content first, then secondary assets.</li>
          <li><strong>Meaningful Feedback:</strong> If a task takes &gt;1s, show a progress indicator. If &gt;10s, show a progress bar.</li>
          <li><strong>Idle Pre-fetching:</strong> Load data for the next likely action while the user is idle.</li>
        </ul>
      </div>

      <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
        <h4 className="font-bold text-indigo-900 mb-2">Ready to experiment?</h4>
        <p className="text-sm text-indigo-700 mb-4">Compare the "Spinner" vs "Skeleton" loading states in the lab. Which one feels faster to you?</p>
        <button className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all lg:hidden">
          Open Interactive Lab
        </button>
      </div>
    </div>
  );

  const playground = (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-indigo-500" />
          <h3 className="font-semibold text-gray-900">Perceived Speed Lab</h3>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200">
          <button 
            onClick={() => setLoadingState('spinner')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${loadingState === 'spinner' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Spinner
          </button>
          <button 
            onClick={() => setLoadingState('skeleton')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${loadingState === 'skeleton' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Skeleton
          </button>
        </div>
      </div>

      <div className="flex-1 p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          {loadingState === 'none' ? (
            <div className="text-center p-12 bg-white rounded-3xl border border-dashed border-gray-300">
              <Timer className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h4 className="text-lg font-bold text-gray-900 mb-2">Select a Loading State</h4>
              <p className="text-gray-500 text-sm">Choose between Spinner or Skeleton to see the difference in perceived performance.</p>
            </div>
          ) : !isLoaded ? (
            loadingState === 'spinner' ? (
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Loading Content...</p>
              </div>
            ) : (
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 space-y-6 min-h-[400px]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full animate-pulse"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-gray-100 rounded-full animate-pulse w-1/2"></div>
                    <div className="h-3 bg-gray-50 rounded-full animate-pulse w-1/4"></div>
                  </div>
                </div>
                <div className="w-full h-48 bg-gray-100 rounded-2xl animate-pulse"></div>
                <div className="space-y-3">
                  <div className="h-3 bg-gray-100 rounded-full animate-pulse"></div>
                  <div className="h-3 bg-gray-100 rounded-full animate-pulse"></div>
                  <div className="h-3 bg-gray-50 rounded-full animate-pulse w-2/3"></div>
                </div>
              </div>
            )
          ) : (
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Alex Rivera</h4>
                  <p className="text-xs text-gray-500">Product Designer • 2h ago</p>
                </div>
              </div>
              <img 
                src="https://picsum.photos/seed/performance/800/400" 
                alt="Post" 
                className="w-full h-48 object-cover rounded-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-3">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Just finished implementing skeleton screens in our new dashboard. The perceived performance boost is incredible! Users feel like the app is 2x faster.
                </p>
              </div>
              <div className="flex gap-4 pt-2">
                <button className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Like</button>
                <button className="text-xs font-bold text-gray-400 uppercase tracking-widest">Comment</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 bg-gray-900 text-white flex items-center gap-3">
        <Info className="w-5 h-5 text-indigo-400 shrink-0" />
        <p className="text-xs text-gray-400">
          <strong>UX Insight:</strong> Skeleton screens are superior to spinners because they focus the user's attention on the <em>content</em> being loaded rather than the <em>waiting</em> itself. They also prevent "layout shift" once the data arrives.
        </p>
      </div>
    </div>
  );

  return (
    <LessonLayout
      title="Performance UX"
      description="Master perceived performance through skeletons, optimistic UI, and loading states."
      theory={theory}
      playground={playground}
    />
  );
}