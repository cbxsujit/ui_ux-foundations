import React, { useState } from 'react';
import { LessonLayout } from '../components/LessonLayout';
import { Sparkles, ArrowRight, X, User, Settings, Bell, Search } from 'lucide-react';

export function OnboardingLesson() {
  const [step, setStep] = useState(0);
  const [showDemo, setShowDemo] = useState(false);

  const startDemo = () => {
    setShowDemo(true);
    setStep(1);
  };

  const endDemo = () => {
    setShowDemo(false);
    setStep(0);
  };

  const theory = (
    <div className="space-y-6 text-gray-600">
      <p>
        <strong>Onboarding UX</strong> is the process of guiding new users to find value in your product as quickly as possible. It sets the tone for the entire user relationship.
      </p>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Key Principles</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Time to Value:</strong> How fast can the user achieve their first "win"? Keep it short.</li>
          <li><strong>Progressive Disclosure:</strong> Don't overwhelm users. Show features only when they are needed.</li>
          <li><strong>Action-Oriented:</strong> Users learn best by doing, not just reading tooltips.</li>
          <li><strong>Skippable:</strong> Always allow experienced users to skip the tutorial.</li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Common Patterns</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Product Tours:</strong> Tooltips pointing to UI elements (use sparingly).</li>
          <li><strong>Welcome Modals:</strong> A quick greeting and value proposition.</li>
          <li><strong>Empty States:</strong> Using empty screens to prompt the first action.</li>
        </ul>
      </div>
    </div>
  );

  const playground = (
    <div className="flex flex-col h-full bg-gray-50 relative overflow-hidden">
      
      {/* Fake App Background */}
      <div className="flex-1 p-6 flex flex-col">
        {/* Fake Header */}
        <header className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between mb-6 relative z-0">
          <div className="font-bold text-indigo-600 text-lg">AcmeCorp</div>
          <div className="flex items-center gap-4 text-gray-400">
            <div className={`p-2 rounded-lg relative ${step === 2 ? 'bg-indigo-50 text-indigo-600 z-50 ring-4 ring-indigo-500/20' : ''}`}>
              <Search className="w-5 h-5" />
            </div>
            <div className="p-2 rounded-lg">
              <Bell className="w-5 h-5" />
            </div>
            <div className={`p-2 rounded-lg relative ${step === 3 ? 'bg-indigo-50 text-indigo-600 z-50 ring-4 ring-indigo-500/20' : ''}`}>
              <Settings className="w-5 h-5" />
            </div>
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
              <User className="w-4 h-4" />
            </div>
          </div>
        </header>

        {/* Fake Content */}
        <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm p-8 relative z-0">
          <div className="max-w-md">
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="space-y-3 mb-8">
              <div className="h-4 bg-gray-100 rounded w-full"></div>
              <div className="h-4 bg-gray-100 rounded w-5/6"></div>
              <div className="h-4 bg-gray-100 rounded w-4/6"></div>
            </div>
            
            <div className={`inline-block relative ${step === 4 ? 'z-50' : ''}`}>
              <button className={`px-6 py-3 rounded-lg font-medium ${step === 4 ? 'bg-indigo-600 text-white ring-4 ring-indigo-500/30 shadow-lg' : 'bg-gray-100 text-gray-400'}`}>
                Create First Project
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Onboarding Overlay & Logic */}
      {!showDemo ? (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Interactive Onboarding</h3>
            <p className="text-gray-500 mb-6 max-w-sm mx-auto">Experience a standard progressive disclosure onboarding flow.</p>
            <button 
              onClick={startDemo}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors"
            >
              Start Demo Flow
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Dark Overlay for focus */}
          <div className="absolute inset-0 bg-gray-900/40 z-40 transition-opacity duration-300" />

          {/* Step 1: Welcome Modal */}
          {step === 1 && (
            <div className="absolute inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in zoom-in duration-300">
              <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden">
                <div className="bg-indigo-600 p-6 text-center text-white">
                  <Sparkles className="w-10 h-10 mx-auto mb-3 text-indigo-200" />
                  <h3 className="text-xl font-bold">Welcome to AcmeCorp!</h3>
                </div>
                <div className="p-6 text-center">
                  <p className="text-gray-600 mb-6">We're so glad you're here. Let's take a quick tour to get you familiar with the workspace.</p>
                  <div className="flex gap-3">
                    <button onClick={endDemo} className="flex-1 py-2.5 text-gray-500 font-medium hover:bg-gray-50 rounded-lg transition-colors">Skip</button>
                    <button onClick={() => setStep(2)} className="flex-1 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-md">Let's Go</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Tooltip on Search */}
          {step === 2 && (
            <div className="absolute top-24 right-32 z-50 w-64 animate-in fade-in slide-in-from-bottom-4">
              <div className="bg-white p-4 rounded-xl shadow-xl border border-gray-100 relative">
                <div className="absolute -top-2 right-12 w-4 h-4 bg-white border-t border-l border-gray-100 rotate-45"></div>
                <h4 className="font-bold text-gray-900 mb-1 text-sm">Global Search</h4>
                <p className="text-xs text-gray-500 mb-4">Find any project, file, or team member instantly from anywhere in the app.</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-400">1 of 3</span>
                  <button onClick={() => setStep(3)} className="text-xs font-bold text-indigo-600 flex items-center gap-1 hover:text-indigo-700">Next <ArrowRight className="w-3 h-3" /></button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Tooltip on Settings */}
          {step === 3 && (
            <div className="absolute top-24 right-16 z-50 w-64 animate-in fade-in slide-in-from-bottom-4">
              <div className="bg-white p-4 rounded-xl shadow-xl border border-gray-100 relative">
                <div className="absolute -top-2 right-6 w-4 h-4 bg-white border-t border-l border-gray-100 rotate-45"></div>
                <h4 className="font-bold text-gray-900 mb-1 text-sm">Workspace Settings</h4>
                <p className="text-xs text-gray-500 mb-4">Customize your notifications, billing, and team permissions here.</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-400">2 of 3</span>
                  <button onClick={() => setStep(4)} className="text-xs font-bold text-indigo-600 flex items-center gap-1 hover:text-indigo-700">Next <ArrowRight className="w-3 h-3" /></button>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Action Prompt */}
          {step === 4 && (
            <div className="absolute top-64 left-12 z-50 w-72 animate-in fade-in slide-in-from-left-4">
              <div className="bg-white p-5 rounded-xl shadow-xl border border-gray-100 relative">
                <div className="absolute top-6 -left-2 w-4 h-4 bg-white border-b border-l border-gray-100 rotate-45"></div>
                <h4 className="font-bold text-gray-900 mb-1 text-sm">Time to build!</h4>
                <p className="text-xs text-gray-500 mb-4">You're all set. The best way to learn is by doing. Create your first project to get started.</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-400">3 of 3</span>
                  <button onClick={endDemo} className="text-xs font-bold text-white bg-indigo-600 px-3 py-1.5 rounded hover:bg-indigo-700 transition-colors">Finish</button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );

  return (
    <LessonLayout
      title="Onboarding UX"
      description="Guide users to value quickly and smoothly."
      theory={theory}
      playground={playground}
    />
  );
}
