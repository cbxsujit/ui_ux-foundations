import React, { useState } from 'react';
import { LessonLayout } from '../components/LessonLayout';
import { SplitSquareHorizontal, CheckCircle2, XCircle, MousePointerClick, Clock, AlertTriangle } from 'lucide-react';

export function TestingLesson() {
  const [activeVariant, setActiveVariant] = useState<'A' | 'B'>('A');
  const [hasClicked, setHasClicked] = useState(false);

  const theory = (
    <div className="space-y-6 text-gray-600">
      <p>
        <strong>Usability Testing</strong> is the practice of testing how easy a design is to use with a group of representative users. It usually involves observing users as they attempt to complete tasks.
      </p>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Types of Testing</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Moderated:</strong> A researcher sits with the participant, guiding them and asking questions in real-time.</li>
          <li><strong>Unmoderated:</strong> Participants complete tasks independently using a testing platform, often recording their screen and voice.</li>
          <li><strong>A/B Testing:</strong> Comparing two versions of a web page or app against each other to determine which one performs better.</li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">What to Measure</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Task Success Rate:</strong> Did they complete the goal?</li>
          <li><strong>Time on Task:</strong> How long did it take?</li>
          <li><strong>Error Rate:</strong> How many mistakes were made along the way?</li>
          <li><strong>Subjective Satisfaction:</strong> How did the user feel about the experience?</li>
        </ul>
      </div>
    </div>
  );

  const playground = (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="p-4 border-b border-gray-200 bg-white flex items-center gap-2">
        <SplitSquareHorizontal className="w-5 h-5 text-indigo-600" />
        <h3 className="font-semibold text-gray-900">A/B Testing Simulator</h3>
      </div>

      <div className="flex-1 p-6 flex flex-col items-center overflow-y-auto">
        
        <div className="w-full max-w-3xl mb-8 bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex justify-center gap-4">
          <button
            onClick={() => { setActiveVariant('A'); setHasClicked(false); }}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${activeVariant === 'A' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            Variant A (Control)
          </button>
          <button
            onClick={() => { setActiveVariant('B'); setHasClicked(false); }}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${activeVariant === 'B' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            Variant B (Test)
          </button>
        </div>

        {/* Simulated App Screen */}
        <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden relative">
          
          {/* Header */}
          <div className="bg-gray-900 text-white p-4 text-center font-bold">
            SaaS Pricing
          </div>

          {/* Content */}
          <div className="p-8 text-center space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Pro Plan</h2>
            <div className="text-4xl font-extrabold text-gray-900">$29<span className="text-lg text-gray-500 font-normal">/mo</span></div>
            <ul className="text-left space-y-3 text-gray-600 mb-8">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500" /> Unlimited Projects</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500" /> 24/7 Support</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500" /> Custom Domain</li>
            </ul>

            {/* The A/B Test Element */}
            {activeVariant === 'A' ? (
              <button 
                onClick={() => setHasClicked(true)}
                className="w-full py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors"
              >
                Sign Up Now
              </button>
            ) : (
              <button 
                onClick={() => setHasClicked(true)}
                className="w-full py-3 bg-green-500 text-white font-bold text-lg rounded-full shadow-lg hover:bg-green-600 hover:scale-105 transition-all"
              >
                Start 14-Day Free Trial
              </button>
            )}
          </div>

          {/* Success Overlay */}
          {hasClicked && (
            <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center animate-in fade-in zoom-in">
              <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Conversion Recorded!</h3>
            </div>
          )}
        </div>

        {/* Simulated Metrics Dashboard */}
        <div className="w-full max-w-3xl mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 text-gray-500 mb-2">
              <MousePointerClick className="w-4 h-4" /> Conversion Rate
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {activeVariant === 'A' ? '2.4%' : '8.7%'}
            </div>
            <div className={`text-sm mt-1 ${activeVariant === 'B' ? 'text-green-500' : 'text-gray-400'}`}>
              {activeVariant === 'B' ? '+262% improvement' : 'Baseline'}
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 text-gray-500 mb-2">
              <Clock className="w-4 h-4" /> Time to Click
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {activeVariant === 'A' ? '12.5s' : '4.2s'}
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 text-gray-500 mb-2">
              <AlertTriangle className="w-4 h-4" /> Bounce Rate
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {activeVariant === 'A' ? '68%' : '42%'}
            </div>
          </div>
        </div>

      </div>
    </div>
  );

  return (
    <LessonLayout
      title="Usability Testing"
      description="Validate your designs by watching real people use them."
      theory={theory}
      playground={playground}
    />
  );
}
