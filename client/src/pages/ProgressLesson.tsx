import React, { useState, useEffect } from 'react';
import { LessonLayout } from '../components/LessonLayout';
import { Hourglass, Loader2, LayoutTemplate } from 'lucide-react';
import { DevicePreview } from '../components/DevicePreview';

export function ProgressLesson() {
  const [loadingState, setLoadingState] = useState<'idle' | 'spinner' | 'skeleton' | 'progress' | 'loaded'>('loaded');
  const [progressValue, setProgressValue] = useState(0);

  const triggerLoad = (type: 'spinner' | 'skeleton' | 'progress') => {
    setLoadingState(type);
    if (type === 'progress') {
      setProgressValue(0);
      let val = 0;
      const interval = setInterval(() => {
        val += Math.random() * 15 + 5;
        if (val >= 100) {
          val = 100;
          setProgressValue(val);
          clearInterval(interval);
          setTimeout(() => setLoadingState('loaded'), 500);
        } else {
          setProgressValue(val);
        }
      }, 300);
    } else {
      setTimeout(() => {
        setLoadingState('loaded');
      }, 3000);
    }
  };

  const theory = (
    <div className="space-y-6 text-gray-600">
      <p>
        When things take time, users get anxious. Good UX manages that anxiety by setting expectations and providing visual feedback.
      </p>
      <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Types of Loading</h3>
      <ul className="space-y-4">
        <li className="flex items-start gap-3">
          <div className="p-2 bg-slate-100 text-slate-600 rounded-lg shrink-0"><Hourglass className="w-5 h-5" /></div>
          <div>
            <strong className="block text-gray-900">Determinate vs. Indeterminate</strong>
            <span className="text-sm">Use a <strong>determinate progress bar</strong> when you can calculate the exact progress (e.g., file uploads) or when an action takes longer than 10 seconds. It gives users a sense of completion. Use an <strong>indeterminate spinner</strong> for quick actions (under 10 seconds) where calculating progress is impossible.</span>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <div className="p-2 bg-slate-100 text-slate-600 rounded-lg shrink-0"><LayoutTemplate className="w-5 h-5" /></div>
          <div>
            <strong className="block text-gray-900">Skeleton Screens</strong>
            <span className="text-sm">Showing a grayed-out mockup of the layout while data loads. This makes the app feel significantly faster than a simple spinner because the user's brain starts processing the layout before the data arrives.</span>
          </div>
        </li>
      </ul>
    </div>
  );

  const playground = (
    <div className="flex-1 flex flex-col h-full">
      <div className="p-6 border-b border-gray-200 bg-gray-50 flex flex-wrap gap-4">
        <button 
          onClick={() => triggerLoad('spinner')}
          disabled={loadingState !== 'loaded' && loadingState !== 'idle'}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Load with Spinner
        </button>
        <button 
          onClick={() => triggerLoad('progress')}
          disabled={loadingState !== 'loaded' && loadingState !== 'idle'}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Load with Progress Bar
        </button>
        <button 
          onClick={() => triggerLoad('skeleton')}
          disabled={loadingState !== 'loaded' && loadingState !== 'idle'}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
        >
          Load with Skeleton
        </button>
      </div>

      <DevicePreview>
        {(isMobile) => (
          <div className={`flex-1 flex items-center justify-center ${isMobile ? 'p-4 bg-white' : 'p-10 bg-gray-50'}`}>
            <div className={`bg-white flex flex-col ${isMobile ? 'w-full h-full pt-4' : 'p-8 rounded-2xl shadow-sm border border-gray-200 w-full max-w-md min-h-[300px]'}`}>
              
              {loadingState === 'spinner' && (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mb-4" />
              <p>Loading your profile...</p>
            </div>
          )}

          {loadingState === 'progress' && (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-500 w-full px-8">
              <p className="mb-4 font-medium text-gray-700">Downloading assets...</p>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-600 transition-all duration-300 ease-out"
                  style={{ width: `${progressValue}%` }}
                ></div>
              </div>
              <p className="mt-2 text-sm text-gray-400">{Math.round(progressValue)}%</p>
            </div>
          )}

          {loadingState === 'skeleton' && (
            <div className="flex-1 animate-pulse flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full shrink-0"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-5 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
              <div className="mt-auto h-11 bg-gray-200 rounded-lg w-full"></div>
            </div>
          )}

          {loadingState === 'loaded' && (
            <div className="flex-1 flex flex-col gap-6 animate-in fade-in duration-500">
              <div className="flex items-center gap-4">
                <img src="https://picsum.photos/seed/avatar/100/100" alt="Avatar" className="w-16 h-16 rounded-full object-cover" referrerPolicy="no-referrer" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Alex Designer</h3>
                  <p className="text-sm text-gray-500">Senior UI/UX Engineer</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Passionate about creating intuitive and accessible digital experiences. Believes that good design is invisible and bad design screams at you.
              </p>
              <button className="mt-auto w-full py-2.5 bg-indigo-50 text-indigo-700 font-medium rounded-lg hover:bg-indigo-100 transition-colors">
                Edit Profile
              </button>
            </div>
          )}

            </div>
          </div>
        )}
      </DevicePreview>
    </div>
  );

  return <LessonLayout title="Progress & Loading" description="Manage user anxiety during wait times." theory={theory} playground={playground} />;
}
