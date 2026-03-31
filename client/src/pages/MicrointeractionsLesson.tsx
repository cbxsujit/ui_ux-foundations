import React, { useState } from 'react';
import { LessonLayout } from '../components/LessonLayout';
import { Heart, Download, Check, Loader2, Send } from 'lucide-react';

export function MicrointeractionsLesson() {
  // Like Button State
  const [isLiked, setIsLiked] = useState(false);
  const [likeAnimating, setLikeAnimating] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeAnimating(true);
    setTimeout(() => setLikeAnimating(false), 300);
  };

  // Download Button State
  const [downloadState, setDownloadState] = useState<'idle' | 'downloading' | 'done'>('idle');
  const [progress, setProgress] = useState(0);

  const handleDownload = () => {
    if (downloadState !== 'idle') return;
    setDownloadState('downloading');
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setDownloadState('done');
          setTimeout(() => setDownloadState('idle'), 2000);
          return 100;
        }
        return p + 5;
      });
    }, 50);
  };

  // Submit Button State
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = () => {
    if (submitState !== 'idle') return;
    setSubmitState('loading');
    setTimeout(() => {
      setSubmitState('success');
      setTimeout(() => setSubmitState('idle'), 2000);
    }, 1500);
  };

  // Toggle State
  const [isToggled, setIsToggled] = useState(false);

  const theory = (
    <div className="space-y-6 text-gray-600">
      <p>
        <strong>Micro-interactions</strong> are subtle, single-purpose events found throughout interfaces. Their primary purpose is to delight the user, provide feedback, and communicate status.
      </p>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">The Four Parts</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Trigger:</strong> What initiates the micro-interaction (e.g., clicking a button, receiving a message).</li>
          <li><strong>Rules:</strong> What happens once the micro-interaction is triggered.</li>
          <li><strong>Feedback:</strong> How the system lets the user know what's happening (e.g., an animation, a sound).</li>
          <li><strong>Loops & Modes:</strong> What happens to the micro-interaction over time or under different conditions.</li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Why they matter</h3>
        <p>
          They improve navigation, make it easier for users to interact with your product, provide instant and relevant feedback about a completed action, and communicate information about certain elements (like whether it's interactive).
        </p>
      </div>
    </div>
  );

  const playground = (
    <div className="flex flex-col h-full bg-gray-50 p-6 overflow-y-auto">
      <div className="max-w-3xl mx-auto w-full space-y-8">
        
        {/* Like Button */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h4 className="font-semibold text-gray-900 mb-4">1. The "Like" Animation</h4>
          <p className="text-sm text-gray-500 mb-6">Provides immediate, satisfying visual feedback for a simple action.</p>
          
          <div className="flex items-center justify-center p-8 bg-gray-50 rounded-xl border border-gray-100">
            <button 
              onClick={handleLike}
              className={`p-4 rounded-full transition-colors ${isLiked ? 'bg-red-50 text-red-500' : 'bg-white text-gray-400 hover:bg-gray-100 shadow-sm border border-gray-200'}`}
            >
              <Heart 
                className={`w-8 h-8 transition-transform duration-300 ${isLiked ? 'fill-current' : ''} ${likeAnimating ? 'scale-125' : 'scale-100'}`} 
              />
            </button>
          </div>
        </div>

        {/* Download Button */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h4 className="font-semibold text-gray-900 mb-4">2. Progress Feedback</h4>
          <p className="text-sm text-gray-500 mb-6">Keeps the user informed during a process that takes time.</p>
          
          <div className="flex items-center justify-center p-8 bg-gray-50 rounded-xl border border-gray-100">
            <button 
              onClick={handleDownload}
              disabled={downloadState !== 'idle'}
              className={`relative overflow-hidden w-48 h-12 rounded-xl font-medium transition-all duration-300 ${
                downloadState === 'done' ? 'bg-green-500 text-white' : 
                downloadState === 'downloading' ? 'bg-indigo-100 text-indigo-700' : 
                'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md'
              }`}
            >
              {/* Progress Bar Background */}
              {downloadState === 'downloading' && (
                <div 
                  className="absolute left-0 top-0 bottom-0 bg-indigo-200 transition-all duration-75"
                  style={{ width: `${progress}%` }}
                />
              )}
              
              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-center gap-2 z-10">
                {downloadState === 'idle' && <><Download className="w-4 h-4" /> Download</>}
                {downloadState === 'downloading' && <span>{progress}%</span>}
                {downloadState === 'done' && <><Check className="w-4 h-4" /> Complete</>}
              </div>
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h4 className="font-semibold text-gray-900 mb-4">3. State Transformation</h4>
          <p className="text-sm text-gray-500 mb-6">The button itself transforms to show the current state of the action.</p>
          
          <div className="flex items-center justify-center p-8 bg-gray-50 rounded-xl border border-gray-100">
            <button 
              onClick={handleSubmit}
              disabled={submitState !== 'idle'}
              className={`h-12 flex items-center justify-center font-medium transition-all duration-300 ${
                submitState === 'idle' ? 'w-32 bg-gray-900 text-white rounded-xl hover:bg-gray-800 shadow-md' :
                submitState === 'loading' ? 'w-12 bg-gray-100 text-gray-500 rounded-full border-2 border-gray-200' :
                'w-12 bg-green-500 text-white rounded-full shadow-md'
              }`}
            >
              {submitState === 'idle' && <span className="flex items-center gap-2"><Send className="w-4 h-4" /> Send</span>}
              {submitState === 'loading' && <Loader2 className="w-5 h-5 animate-spin" />}
              {submitState === 'success' && <Check className="w-5 h-5 animate-in zoom-in" />}
            </button>
          </div>
        </div>

        {/* Toggle Switch */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h4 className="font-semibold text-gray-900 mb-4">4. The Toggle Switch</h4>
          <p className="text-sm text-gray-500 mb-6">Smooth color and position transitions provide clear state indication.</p>
          
          <div className="flex items-center justify-center p-8 bg-gray-50 rounded-xl border border-gray-100">
            <button 
              onClick={() => setIsToggled(!isToggled)}
              className={`w-16 h-8 rounded-full p-1 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                isToggled ? 'bg-indigo-500' : 'bg-gray-300'
              }`}
            >
              <div 
                className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
                  isToggled ? 'translate-x-8' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

      </div>
    </div>
  );

  return (
    <LessonLayout
      title="Micro-Interactions"
      description="Small animations that provide feedback and delight users."
      theory={theory}
      playground={playground}
    />
  );
}
